description: ' Process jobs in Python Asset Builder to create custom asset builders
  for your &ALYlong; project. '
slug: python-asset-builder-process-job
title: Process job with Python Asset Builder
---
# Process job with Python Asset Builder<a name="python-asset-builder-process-job"></a>

**Asset Processor** calls the registered callback when it has a job for the builder to begin processing\. The callback processes the source asset file, performs all the work inside the temporary directory, creates at least one product asset file, registers the product asset files via a `JobProduct` entry inside a `ProcessJobResponse` instance, and returns a success value inside the `ProcessJobResponse`\. 

**Contents**
+ [ProcessJobRequest](#python-asset-builder-process-job-request)
+ [ProcessJobResponse](#python-asset-builder-process-job-response)
+ [ProcessJobResponse ResultCode](#python-asset-builder-process-job-response-result)
+ [JobProduct](#python-asset-builder-job-product)
+ [ProductDependency](#python-asset-builder-product-dependency)
+ [ProductPathDependency](#python-asset-builder-product-path-dependency)
+ [ProductPathDependency Type](#python-asset-builder-product-path-dependency-type)
+ [Example: Process](#python-asset-builder-process-job-example)

## ProcessJobRequest<a name="python-asset-builder-process-job-request"></a>

This is the input into the `OnProcessJobRequest` function to perform the steps that are needed to process a source asset file\. This contains the input data that's needed to process the job for the source asset file\. 

The `jobDescription` field contains the job parameters that the `OnCreateJobs` step created for this job\. 

The `tempDirPath` field is the path to the temporary directory that the builder uses to write out intermediate and final product asset files output by this job\. The output files are stored inside the temporary directory relative to where the final product asset file will be placed in the cache and pak files\. 

The `sourceFileUUID` field is both the unique ID of the source asset file, and the first part of the Asset ID that is used for all the product files output by this job\. The only way to differentiate the product files is the `subId` used in the `JobProduct` structure\. 

**azlmbr\.asset\.builder\.ProcessJobRequest** 

```
class azlmbr.asset.builder.ProcessJobRequest
- sourceFile (str) Relative source file name
- watchFolder (str) Watch folder for this source file
- fullPath (str) Full source file name
- builderGuid (azlmbr.math.Uuid) Builder id
- jobDescription (azlmbr.asset.builder.JobDescriptor) Job descriptor for this job created in OnCreateJobs
- tempDirPath (str) Temp directory that the builder should use to create job outputs for this job request
- platformInfo (azlmbr.asset.builder.PlatformInfo) The information about the platform that this job was emitted for
- sourceFileDependencyList (list of azlmbr.asset.builder.SourceFileDependency) Source file dependency information
- sourceFileUUID (azlmbr.math.Uuid) The UUID of the source file
- jobId (number) Job id for this job, this is also the address for the JobCancelListener
```

## ProcessJobResponse<a name="python-asset-builder-process-job-response"></a>

This is the class that the `OnProcessJobRequest` callback returns to describe the job's results\. The `ProcessJobResponse` contains job data that indicates the outputs from the job in the `outputProducts` field, the result code, and schedule sources to be reprocessed\. 

The `resultCode` field defaults to `azlmbr.asset.builder.ProcessJobResponse_Failed`\. Returning an empty `ProcessJobResponse` indicates that the job failed\. 

The `outputProducts` field indicates what product files need to be copied to the project cache folder\. If this is empty, it indicates that the job failed\. 

The `sourcesToReprocess` field triggers a rebuild of source assets \(via absolute paths\) due to the work performed in this job\. To reprocess these sources, the builder updates `fingerprints` in `CreateJobs` of those builders that process them, like changing source dependencies\. 

**azlmbr\.asset\.builder\.ProcessJobResponse** 

```
class azlmbr.asset.builder.ProcessJobResponse
- resultCode (azlmbr.asset.builder.ProcessJobResponse ResultCode) baz
- outputProducts (list of azlmbr.asset.builder.JobProduct) List of job product files
- requiresSubIdGeneration (bool) Used to determine if legacy RC products need sub ids generated for them
- sourcesToReprocess (list of str) List of absolute source paths to trigger rebuilds
```

## ProcessJobResponse ResultCode<a name="python-asset-builder-process-job-response-result"></a>

The process job response result code has both a 'Success' and a 'Failure', but it also has some specific failure cases, such as detecting a crash or network issues\. 

**azlmbr\.asset\.builder\.ProcessJobResponse ResultCode** 

```
# When everything was processed correctly the job should return ProcessJobResponse_Success
azlmbr.asset.builder.ProcessJobResponse_Success
 
# If the job did not create ALL of the expected outputs it should return ProcessJobResponse_Failed
azlmbr.asset.builder.ProcessJobResponse_Failed
 
# If a tool or internal API returned an exception it should return ProcessJobResponse_Crashed
azlmbr.asset.builder.ProcessJobResponse_Crashed
 
# If the job detected a cancellation during processing it should return ProcessJobResponse_Cancelled
azlmbr.asset.builder.ProcessJobResponse_Cancelled
 
# If the job could not reach a remote service or resource it should return ProcessJobResponse_NetworkIssue
azlmbr.asset.builder.ProcessJobResponse_NetworkIssue
```

## JobProduct<a name="python-asset-builder-job-product"></a>

A successful processing of a source asset returns one or more `JobProduct` entries in the `ProcessJobResponse`'s `outputProducts` field\. 

The `productSubID` field is a stable and unique product identifier for each product file created by this process job for the source asset file\. It can be any unsigned 32\-bit integer that disambiguates different outputs from the same source\. If builder source asset files produce only one product, the builder can use 0\. 

The `productAssetType` field maps to a C\+\+ `AZ::Data::AssetData` type ID\. 

One way to determine the asset type ID from Python is to call the `AssetCatalogRequestBus` using the asset's display name: 

```
assetType = azlmbr.asset.AssetCatalogRequestBus(azlmbr.bus.Broadcast, 'GetAssetTypeByDisplayName', "Font")
print(f'Asset type {assetType}')
```

`dependenciesHandled` indicates to the **Asset Processor** that the builder has output all possible dependencies for this source asset file for this job product file\. This can be true if there are no output product files\. This should be set to `True` only if the builder outputs its dependencies or the output product doesn't have dependencies\. When set to `False`, **Asset Processor** emits a warning that dependencies have not been handled\. 

The `JobProduct` constructor takes in a product file name \(relative to the source asset path\), an asset type \(Uuid\), and a product sub\-ID number\. 

**azlmbr\.asset\.builder\.JobProduct** 

```
class azlmbr.asset.builder.JobProduct
- productFileName (str) Relative or absolute product file path
- productAssetType (azlmbr.math.Uuid) The asset type ID this product file loads into the asset catalog
- productSubID (number) A stable product identifier
- productDependencies (list of ProductDependency) Product assets this source asset depends on
- pathDependencies (set of ProductPathDependency) Specifies dependencies by relative path to source assets
- dependenciesHandled (bool) Indicates that the builder has output all possible dependencies
+ JobProduct(productFileName:str, productAssetType:azlmbr.math.Uuid, productSubID:number) A constructor to set a job product
```

## ProductDependency<a name="python-asset-builder-product-dependency"></a>

The product dependency information that the builder sends to **Asset Processor** to indicate that a product asset depends on another product asset during load\. 

**azlmbr\.asset\.builder\.ProductDependency** 

```
class azlmbr.asset.builder.ProductDependency
- dependencyId (azlmbr.math.Uuid) Asset ID of this product asset dependency
```

## ProductPathDependency<a name="python-asset-builder-product-path-dependency"></a>

The `ProductPathDpendency` represents the product's dependency information that the builder detected on another product file \(relative to the source asset path\)\. If the source asset ID can be determined, we recommend that you use the `productDependencies` instead to indicate the product's dependency information in terms of asset IDs\. It's preferable to depend on product files whenever possible, to avoid introducing unintended dependencies\. 

The `dependencyType` field indicates if the path points to a source file or a product file\. 

**azlmbr\.asset\.builder\.ProductPathDependency** 

```
class azlmbr.asset.builder.ProductPathDependency
- dependencyPath (str) Relative path to the asset dependency
- dependencyType (azlmbr.asset.builder.ProductPathDependency Type) Indicates if the dependency path points to a source file or a product file
```

## ProductPathDependency Type<a name="python-asset-builder-product-path-dependency-type"></a>

`ProductPathDependency Type` indicates how to use the dependency path in the `ProductPathDependency`\. A dependency on a source file is converted into dependencies on all product files produced from the source\. It's preferred to depend on product files whenever possible, to avoid introducing unintended dependencies\. 

**azlmbr\.asset\.builder\.ProductPathDependency Type** 

```
# If the source asset depends on another product asset file the value should be SourceFile
azlmbr.asset.builder.ProductPathDependency_ProductFile
 
# If the source asset depends on another source asset the value should be ProductFile
azlmbr.asset.builder.ProductPathDependency_SourceFile
```

## Example: Process<a name="python-asset-builder-process-job-example"></a>

This is a simple example of how the asset builder might process a job when Asset Processor detects a new or changed source asset file in the watch folders of the registered pattern\. 

```
# Using the incoming 'request' find the type of job via 'jobKey' to determine what to do
def on_process_job(args):
    try:
        # Get request information
        request = args[0]
         
        # Prepare output folder
        basePath, _ = os.path.split(request.sourceFile)
        outputPath = os.path.join(request.tempDirPath, basePath)
        os.makedirs(outputPath)
 
        # Write out a simple file
        productFileNameOnly = 'myfile.txt'
        filename = os.path.join(outputPath, productFileNameOnly)
        file = open(filename, "w+")
        file.write('some data')
        file.close()
 
        # Prepare output entry data
        productOutputs = []
        basePath, sceneFile = os.path.split(request.sourceFile)
        assetProductName = os.path.join(basePath, productFileNameOnly)
        outputFilename = os.path.join(request.tempDirPath, assetinfoFilename)
 
        # Create job product entry
        assetType = azlmbr.math.Uuid_CreateString('{F67CC648-EA51-464C-9F5E-4A9CE41A7F86}', 0)
        product = azlmbr.asset.builder.JobProduct(assetProductName, assetType, 0)
        product.dependenciesHandled = True
        productOutputs.append(product)
 
        # Fill out response object
        response = azlmbr.asset.builder.ProcessJobResponse()
        response.outputProducts = productOutputs
        response.resultCode = azlmbr.asset.builder.ProcessJobResponse_Success
        return response
    except:
        # An exception should record a proper failure
        response = azlmbr.asset.builder.ProcessJobResponse()
        response.resultCode = azlmbr.asset.builder.ProcessJobResponse_Crashed
        return response
```