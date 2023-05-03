---
linkTitle: Asset Database
title: Asset Database
description: The Asset Database is used by the Asset Processor to track the work it has completed.
weight: 400
toc: true
---

The **Asset Database** is an SQLite database used by the [**Asset Processor**](docs/user-guide/assets/asset-processor) to track the work it has completed. The Asset Database is not used by the Editor or Launchers, which instead use the **Asset Catalog** to track information about available assets.

The Asset Database is located in the [**Asset Cache**](docs/user-guide/assets/pipeline/asset-cache) for a project, in `assetdb.sqlite`.

## Asset Database Overview

The Asset Database is organized into the following eight tables.

### ScanFolders Table

The **ScanFolders** table tracks all folders registered for the project as [Scan Directories,](docs/user-guide/assets/pipeline/scan-directories) folders that can contain assets. This table includes the absolute path on the current machine to that scan folder. The paths might not be identical for different contributors because the paths are unique for each project instance.

### Files Table

The **Files** table tracks all files the Asset Processor finds in [Scan Directories.](docs/user-guide/assets/pipeline/scan-directories) This table tracks the scan folder a file is in, the relative path of the file to the scan folder, the last modification time of the file, and the hash of that file's contents. The mod time and hash are used by the Asset Processor to identify when it needs to re-process files.

### BuilderInfo Table

Files aren't assets unless a builder exists that processes them, so the next table in this process is the **BuilderInfo** table. This table tracks information related to [Asset Builders.](docs/user-guide/assets/pipeline/asset-builders) This has the BuilderID, Guid, and analysis fingerprint of each builder. The file matching patterns are not tracked in the database because they're defined in the code and don't need to be tracked here, however you can best view them in the Builder tab of the Asset Processor. The analysis fingerprint is used by the Asset Processor to know when a builder changes, so it can re-process all assets matching that builder.

### Sources Table

The **Sources** table tracks all files that have been matched to builders, otherwise known as [Source Assets.](docs/user-guide/assets/pipeline/source-assets) This table tracks the scan folder key for the source asset, and the relative path in that scan folder to the source asset. It also tracks the Guid for the source asset, which is how the engine generally references source assets, and is a portion of the asset ID used to track product assets.

### Jobs Table

The **Jobs** table contains all jobs that have been completed. Jobs are associated with Asset Builders. For more information on jobs, refer to the [Process Job.](docs/user-guide/assets/pipeline/asset-builders#process-job) topic.

SourcePK is the SourceID from the Sources table for the source asset processed. JobKey is a descriptive string registered in CreateJobs for that job. Platform is the intended deployment target for the asset, such as PC or Android. BuilderGuid is the unique identifier for the builder used for the job. Status is the result code of the job: 2 means failed, 3 is failed because the source name was longer than the maximum length, 4 means Completed, and 5 is a failure due to a missing source asset. The job run key is the order the job was created. The number of errors and warnings that occurred in each job is tracked in this table, as well.

### SourceDependency Table

The **SourceDependency** table tracks [Source dependencies.](docs/user-guide/assets/pipeline/asset-dependencies-and-identifiers#source-dependencies) Source dependencies are files that, when modified, will cause the associated job to be re-run.

### Product Table

The **Product** table tracks the product assets generated from those jobs. The JobPK is the Job ID that created this product. The Sub ID is part of the Asset ID used to identify this product asset. The complete Asset ID is this sub ID and the UUID of the source asset.

### ProductDependencies Table

The **ProductDependencies** table tracks the relationship between product assets for runtime and packaging purposes. A [product dependency](docs/user-guide/assets/pipeline/asset-dependencies-and-identifiers#product-dependencies) exists when one product asset references another product asset.

## Updating Asset Processor and the Asset Database

There are two primary workflows for interacting with the Asset Database by making changes to Asset Processor code, [adding a new query,](#NewQuery) and [making changes to the Asset Database.](#UpdateDatabase)

### Adding a New Query {#NewQuery}

Asset Database queries are defined in [AssetDatabaseConnection.cpp](https://github.com/o3de/o3de/blob/development/Code/Framework/AzToolsFramework/AzToolsFramework/AssetDatabase/AssetDatabaseConnection.cpp#L49).

#### 1. Create Static Const Strings for the Query
The first step in adding a new query is creating a few static const strings at the top of [AssetDatabaseConnection.cpp.](https://github.com/o3de/o3de/blob/development/Code/Framework/AzToolsFramework/AzToolsFramework/AssetDatabase/AssetDatabaseConnection.cpp#L49).
1. Add a new static const char\* with the name of the query. By convention, this is named QUERY_\*. These are typically namespaced.
   * Example: `static const char* QUERY_SOURCE_BY_SOURCENAME_SCANFOLDERID = "AzToolsFramework::AssetDatabase::QuerySourceBySourceNameScanFolderID";`
1. A static const with the actual sql of the query. By convention, this is named QUERY_\*_STATEMENT. This is just a standard SQLite query string. Parameters are always provided using parameter binding, to avoid issues with escaping.
   * Example: `static const char* QUERY_SOURCE_BY_SOURCENAME_SCANFOLDERID_STATEMENT = SELECT * FROM Sources WHERE SourceName = :sourcename AND ScanFolderPK = :scanfolderid;";`
   * Typically queries are designed to only return data from 1 table.  There's nothing preventing returning data from multiple tables, it just might require more set up.
   * Queries are expected to return the entire row.  The data gets fed into a C++ struct which is expecting every column to be present, so don't filter the columns. The exception to this is queries that return just a single field, which is allowed.
1. A static const query object. This is a helper class that ties the parameters and query together and helps keep things type-safe. This is created using the MakeSqlQuery function. Each query parameter is added as a parameter to the function using the SqlParam class, with a template type matching the column type and the parameter name passed to the constructor.
   * Example:
```cpp
static const auto s_querySourceBySourcenameScanfolderid = MakeSqlQuery(
    QUERY_SOURCE_BY_SOURCENAME_SCANFOLDERID,
    QUERY_SOURCE_BY_SOURCENAME_SCANFOLDERID_STATEMENT,
    LOG_NAME,
    SqlParam<const char*>(":sourcename"),
    SqlParam<AZ::s64>(":scanfolderid"));
```

#### 2. Register the Query Object
1. The next step is to register the query object with the system. The query object was defined in step 1.3 in the previous section. Most of these are grouped by table. Simply add a call to AddStatement.
   * Example:
```cpp
AddStatement(m_databaseConnection, s_querySourceBySourcenameScanfolderid);
```

#### 3. Add a Query Function
1. Add a query function to make the query usable.
   * These are typically grouped by table and take a set of parameters for your query followed by a handler. The handler is a function that takes an object representing the row from the table and returns a bool, which indicates if the query should continue to the next row.
   * There are already premade handler definitions for each existing table, as well as a combinedHandler for queries that work with all the source/job/product/scanfolder table data. For the most part these should be pretty simple as there are already result handler functions for the typical use cases.
   * Example:
```cpp
bool AssetDatabaseConnection::QuerySourceBySourceNameScanFolderID(const char* exactSourceName, AZ::s64 scanFolderID, sourceHandler handler)
{
    return s_querySourceBySourcenameScanfolderid.BindAndQuery(*m_databaseConnection, handler, &GetSourceResult, exactSourceName, scanFolderID);
}
```

#### 4. Optional - Helper Get Function
1. Add a helper Get function which returns a container of the resulting rows. [AssetDatabase.cpp](https://github.com/o3de/o3de/blob/development/Code/Tools/AssetProcessor/native/AssetDatabase/AssetDatabase.cpp) contains helper functions for retrieving an entire set without having to write a handler every time. Most queries have a helper version added to this class.
   * Example:
```cpp
bool AssetDatabaseConnection::GetSourcesBySourceNameScanFolderId(QString exactSourceName, AZ::s64 scanFolderID, SourceDatabaseEntryContainer& container)
    {
    bool found = false;
    bool succeeded = QuerySourceBySourceNameScanFolderID(exactSourceName.toUtf8().constData(),
        scanFolderID,
        [&](SourceDatabaseEntry& source)
    {
        found = true;
        container.push_back();
        container.back() = AZStd::move(source);
        return true;  // return true to continue iterating over additional results, we are populating a container
    });
    return  found && succeeded;
}
```

### Updating the database structure {#UpdateDatabase}
{{< important >}}
Changes to the Asset Database structure should only be done with careful configuration.

Keep in mind when modifying an existing column what will happen to users with existing databases.  Be aware of possible data loss and handle it if needed.
{{< /important >}}

{{< note >}}
SQLite ALTER TABLE syntax does not support removing an existing column. You may need to accept having the column remain in existing databases, drop the entire table and handle the data loss that comes with it, or migrate the existing data to a new table that does not have the column.
{{< /note >}}

#### 1. Update the Asset Database Version

In [AssetDatabaseConnection.h,](https://github.com/o3de/o3de/blob/development/Code/Framework/AzToolsFramework/AzToolsFramework/AssetDatabase/AssetDatabaseConnection.h#L70) add a new entry that describes your version change.

#### 2. Update the struct definition for the associated table(s)

In [AssetDatabaseConnection.h,](https://github.com/o3de/o3de/blob/development/Code/Framework/AzToolsFramework/AzToolsFramework/AssetDatabase/AssetDatabaseConnection.h#L93) update the struct that represents the table you plan to modify, to match your modifications.

#### 3. Update the struct implementation for the associated table(s)

In [AssetDatabaseConnection.cpp,](https://github.com/o3de/o3de/blob/development/Code/Framework/AzToolsFramework/AzToolsFramework/AssetDatabase/AssetDatabaseConnection.cpp#L999) update the implementation of associated struct functions for the change you are implementing.

#### 4. Update the table creation query

In [AssetDatabase.cpp,](https://github.com/o3de/o3de/blob/development/Code/Tools/AssetProcessor/native/AssetDatabase/AssetDatabase.cpp#L32) update the table creation query based on the change you are implementing.

#### 5. Update the existing table queries

In [AssetDatabase.cpp,](https://github.com/o3de/o3de/blob/development/Code/Tools/AssetProcessor/native/AssetDatabase/AssetDatabase.cpp#L411) update the existing table queries. Look for const variables with names matching `INSERT_*_STATEMENT` and `UPDATE_*_STATEMENT`, replacing the asterisk with the associated table being changed.

These queries are typically grouped together, but it's important to be thorough in searching this file for queries because a missed query could lead to data loss or corruption.

#### 6. Create a new update query

In [AssetDatabase.cpp,](https://github.com/o3de/o3de/blob/development/Code/Tools/AssetProcessor/native/AssetDatabase/AssetDatabase.cpp#L781) add a new upgrade statement to handle modifying an existing database. For examples of existing upgrade queries, search for `ALTER TABLE`.

#### 7. Add update statement to PostOpenDatabase

In [AssetDatabase.cpp,](https://github.com/o3de/o3de/blob/development/Code/Tools/AssetProcessor/native/AssetDatabase/AssetDatabase.cpp#L831) scroll to the bottom of the `AssetDatabaseConnection::PostOpenDatabase()` function definition to the last upgrade statement, and add a new one.

The upgrade block should check against the version of the last upgrade block, execute your statement(s), update the foundVersion to your version, and print out the new version.

Example:
```cpp
if(foundVersion == AssetDatabase::DatabaseVersion::AddedSourceDependencySubIdsAndProductHashes)
{
    if(m_databaseConnection->ExecuteOneOffStatement(INSERT_COLUMN_PRODUCTS_FLAGS))
    {
        foundVersion = AssetDatabase::DatabaseVersion::AddedFlagsColumnToProductTable;
        AZ_TracePrintf(AssetProcessor::ConsoleChannel, "Upgraded Asset Database to version %i (AddedFlagsColumnToProductTable)\n", foundVersion);
    }
}
```

#### 8. Register the upgrade query

In the AssetDatabaseConnection::CreateStatements function in [AssetDatabase.cpp,](https://github.com/o3de/o3de/blob/development/Code/Tools/AssetProcessor/native/AssetDatabase/AssetDatabase.cpp#L831) register the upgrade query.

Example:
```cpp
m_databaseConnection->AddStatement(INSERT_COLUMN_PRODUCTS_FLAGS, INSERT_COLUMN_PRODUCTS_FLAGS_STATEMENT);
```

#### 9. Update existing bind calls

In [AssetDatabase.cpp,](https://github.com/o3de/o3de/blob/development/Code/Tools/AssetProcessor/native/AssetDatabase/AssetDatabase.cpp#L2300) update the existing bind calls.

Example of an existing bind call, what to look for to update:
```cpp
if (!s_UpdateProductQuery.Bind(*m_databaseConnection, autoFinalizer, entry.m_jobPK, entry.m_subID, entry.m_productName.c_str(), entry.m_assetType, entry.m_legacyGuid, entry.m_flags.to_ullong(), entry.m_productID, entry.m_hash))
```

The existing bind calls may be in several places in this file, but there will generally be a compile error for any that haven't been updated.

#### 10. Test and verify your change

In addition to any manual testing you may wish to perform to verify your change, it is recommended to also write automated tests.

Automated C++ tests for the Asset Processor are found [here,](https://github.com/o3de/o3de/tree/development/Code/Tools/AssetProcessor/native/tests), and automated tests for AzToolsFramework are [here.](https://github.com/o3de/o3de/tree/development/Code/Framework/AzToolsFramework/Tests)

Automated Python tests for the Asset Processor are found in the Automated Testing project, [here.](https://github.com/o3de/o3de/tree/development/AutomatedTesting/Gem/PythonTests/assetpipeline/asset_processor_tests)



