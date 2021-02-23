---
description: ' Use the missing dependency scanner in Lumberyard to identify missing asset
  references. '
title: Using the Missing Dependency Scanner
---
# Using the Missing Dependency Scanner {#asset-bundler-missing-dependency-scanner}

Use the `AssetProcessorBatch.exe` tool to scan your files for patterns that look like missing dependencies\. To perform a scan, run the `AssetProcessorBatch.exe` command using the `dependencyScanPattern` \(or `dsp`\) flag\. Because the command performs a SQL query, use search strings compatible with SQL syntax; for example, the wildcard character is `%`, not `*`\.

The following command scans all files with the extension `.txt`\.

```
AssetProcessorBatch.exe /dependencyScanPattern=%.txt
```

The command scans the **ProductName** column in the **Products** table in the asset database\. The scanner performs multiple passes so that it can present only results that are likely to be missing dependencies\. It scans for patterns like paths, asset IDs, and UUIDs that map to existing products in your game\. The results of the scan are stored in the **MissingProductDependencies** table of the asset database\.

## Taking Action {#asset-bundler-missing-dependency-scanner-taking-action}

If a scan of assets in your project returns results, verify that they are true dependencies\.
+ If the results are false positives, use the asset tagging system to mark the files that can be safely ignored in future scans\. Files tagged with the `editoronly` or `shader` flags in the file `exclude.filetag` are skipped by the scanner\. For more information about file tagging, see [Using the File Tagging System to Include or Exclude Assets](/docs/user-guide/features/packaging/asset-bundler/file-tagging.md)\.
+ If the dependencies reported are truly missing, update the builder for your asset to emit a dependency\. For more information, see the [Declare Product Dependencies](/docs/userguide/asset-builder-custom#asset-builder-custom-create-builder-class-optional-declare-product-dependencies) section of the [Creating a Custom Asset Builder](/docs/user-guide/tutorials/assets/custom-builder.md) page\.

### Example {#asset-bundler-missing-dependency-scanner-example-usage}

The following procedures show you how to create an XML file that has a missing dependency\. You then resolve the dependency by creating a new schema\.

**To create a file with a missing dependency**

1. Create a new XML file in your project named `missingdependency.xml`\.

1. Edit the file to include a reference to an asset in your project\. In the following example, `missingDependency` refers to the `project.json` file in the game project\.

   ```
   <missingDependency path="project.json"/>
   ```

1. Run the missing dependency scanner, which processes assets, using syntax, as shown in the following example\. The command uses a wildcard to avoid including a platform or project name in the query\.

   ```
   Bin64vc141\AssetProcessorBatch /dsp=%missingdependency.xml
   ```

   The following example shows a query without a wildcard character\. The query matches the sample project and operating system environment\. Replace *<project\_name>* with the name of your game project\.

   ```
   Bin64vc141\AssetProcessorBatch /dsp=pc/<project_name>/missingdependency.xml
   ```

1. Observe the log output\. The UUID in the following sample might be different from what you see\.

   ```
   AssetProcessor: Scanning for missing dependencies: I:\p4\lyengine\branches\<project_name>\dev\Cache\<project_name>\pc\<project_name>\missingdependency.xml
   AssetProcessor: Missing dependency: String "project.json" matches asset: {B076CDDC-14DF-50F4-A5E9-7518ABB3E851}:0
   ```

   The following image shows sample asset database output\.
![\[Sample output from an asset scan in the asset database.\]](/images/user-guide/assetbundler/asset-bundler-missing-dependency-scanner-1.png)

Next, create a schema to match this file and output, or *emit*, the dependency\.

**To create a schema to emit the dependency**

1. In Lumberyard Editor, choose **Tools**, **Asset Editor**\.

1. In the **Asset Editor**, choose **File**, **New**, **XML Schema**\.
![\[Creating a new schema file in the Asset Editor.\]](/images/user-guide/assetbundler/asset-bundler-missing-dependency-scanner-2.png)

1. For **Matching** Rules, click the plus \(**\+**\) icon to add a rule\.

1. For **File Path Pattern**, enter **missingdependency\.xml**\.

1. For **Dependency Search Rules**, add a dependency search rule and a search definition\.

1. For **Search Rule Structure**, **Name**, enter the name **missingDependency**\.

1. For **Attributes**, add an attribute with the following values\.

   1. For **Name**, enter **path**\.

   1. For **Expected Extension**, enter **\.json**\.

   1. For **Path Dependency Type**, choose **ProductFile**\.

1. Save the file to the location `lumberyard_version\dev\Engine\Schema\missingdependency.xmlschema`\.

1. Save the `missingdependency.xml` again to force it to reprocess\.

1. Verify that the dependency now appears correctly in the asset database, as the following images show:
![\[Dependency appearing correctly in the asset database.\]](/images/user-guide/assetbundler/asset-bundler-missing-dependency-scanner-3.png)

1. Run the missing dependency scanner again, using syntax, as shown in the following example:

   ```
   Bin64vc141\AssetProcessorBatch /dsp=%missingdependency.xml
   ```

1. The scanner should now report no results, as shown in the following sample log entry:

   ```
   AssetProcessor: Scanning for missing dependencies: I:\p4\lyengine\branches\<project_name>\dev\Cache\<project_name>\pc\<project_name>\missingdependency.xml
   AssetProcessor: No assets remain in the build queue. Saving the catalog, and then shutting down.
   ```

## Custom Dependency Scanners {#asset-bundler-missing-dependency-scanner-custom-dependency-scanners}

The missing dependency scanning system supports authoring specialized dependency scanners\. To match specific data types, you can build a custom scanner by inheriting from `SpecializedDependencyScanner`\. Implement the necessary functions and register your scanner with the `MissingDependencyScanner` by calling `RegisterSpecializedScanner`\.

You can specify which scanners are run against which files by changing the call to `MissingDependencyScanner`'s `ScanFile` to use a different match type or force the usage of a particular scanner\.