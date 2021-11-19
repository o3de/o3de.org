---
linkTitle: Process Job
title: Python Asset Builder Process Job
description: Process Job in Python Asset Builder produces job information for Asset Processor and generates product assets. 
weight: 300
toc: true
---

**Asset Processor** calls the registered callback when it has a job for the **Asset Builder** to process. The callback does the following:

* Processes the source asset.
* Generates at least one product asset in a temporary directory.
* Registers the product assets via a `JobProduct` entry inside a `ProcessJobResponse` instance.
* Returns a success value inside the `ProcessJobResponse`.

## ProcessJobRequest

`azlmbr.asset.builder.ProcessJobRequest` is the input into the `OnProcessJobRequest` function that processes a source asset. It contains the input data that's needed for the process job.

| Field | Type | Description |
| - | - | - |
| `sourceFile` | String | Source asset name. |
| `watchFolder` | String | Scan directory for the source asset. |
| `fullPath` | String | Source asset path. |
| `builderGuid` | `azlmbr.math.Uuid` | Asset Builder ID. |
| `jobDescription` | `azlmbr.asset.builder.JobDescriptor` | Job descriptor for this job created in `OnCreateJobs`. |
| `tempDirPath` | String | Temp directory that the Asset Builder uses to create job outputs for this job request. |
| `platformInfo` | `azlmbr.asset.builder.PlatformInfo` | Information about the platform for this job. |
| `sourceFileDependencyList` | List[`azlmbr.asset.builder.SourceFileDependency`] | Source asset dependency information. |
| `sourceFileUUID` | `azlmbr.math.Uuid` | The universal unique identifier (UUID) of the source asset. |
| `jobId` | Number | Job ID for this job that also serves as the address for the `JobCancelListener`. |

The `jobDescription` field contains the job parameters that the `OnCreateJobs` step created for this job.

The `tempDirPath` field is the path to the temporary directory that the Asset Builder uses to write out intermediate and final product assets for this job. The output product assets are stored in the temporary directory relative to where the final product asset will be placed in the **Asset Cache** and `.pak` files.

The `sourceFileUUID` field is both the unique ID of the source asset, and the first part of the Asset ID for all the product assets output by this job. The product assets are differentiated by the `subId` used in the `JobProduct` structure.

## ProcessJobResponse 

`azlmbr.asset.builder.ProcessJobResponse` is the class that the `OnProcessJobRequest` callback returns to describe the job's results. The `ProcessJobResponse` contains job data that indicates the outputs from the job in the `outputProducts` field, the result code, and schedules sources to be reprocessed.

| Field | Type | Description |
| - | - | - |
| `resultCode` | `azlmbr.asset.builder.ProcessJobResponse Result Code` | The result of the process job. |
| `outputProducts` | List[`azlmbr.asset.builder.JobProduct`] | List of job product assets. |
| `requiresSubIdGeneration` | Boolean | Determines if legacy product assets need sub IDs generated. |
| `sourcesToReprocess` | List[String] | Absolute source asset paths to trigger rebuilds. |

The `resultCode` field defaults to `azlmbr.asset.builder.ProcessJobResponse_Failed`. An empty `ProcessJobResponse` indicates that the job failed.

The `outputProducts` field indicates what product assets need to be copied to the Asset Cache. An empty `outputProducts` list indicates that the job failed.

The `sourcesToReprocess` field triggers a rebuild of source assets (via absolute paths) due to the work performed in this job. To reprocess these source assets, the builder updates the fingerprints in `CreateJobs` of those Asset Builders that process them, like changing source dependencies.

### ProcessJobResponse Result Code 

`azlmbr.asset.builder.ProcessJobResponse Result Code` has a 'Success', a 'Failed', and three specific failure cases.

| Result Code | Description |
| - | - |
| `azlmbr.asset.builder.ProcessJobResponse_Success` | The process job has succeeded. |
| `azlmbr.asset.builder.ProcessJobResponse_Failed` | The process job has not generated all expected product assets and data. |
| `azlmbr.asset.builder.ProcessJobResponse_Crashed` | A tool or internal API has thrown an exception during the process job. |
| `azlmbr.asset.builder.ProcessJobResponse_Cancelled` | The process job was canceled during processing. |
| `azlmbr.asset.builder.ProcessJobResponse_NetworkIssue` | The process job could not reach a remote service or resource. |

### JobProduct 

A successful process job returns one or more `azlmbr.asset.builder.JobProduct` entries in the `outputProducts` field.

The `productSubID` field is a stable and unique product identifier for each product file created by this process job. It can be any unsigned 32-bit integer that disambiguates different output products assets from the same source asset. If the process job for a source asset produces only one product asset, the builder can use `0`.

The `productAssetType` field maps to a C++ `AZ::Data::AssetData` type ID.

One way to determine the asset type ID from Python is to call the `AssetCatalogRequestBus` using the asset's display name:

```python
assetType = azlmbr.asset.AssetCatalogRequestBus(azlmbr.bus.Broadcast, 'GetAssetTypeByDisplayName', "Font")
print(f'Asset type {assetType}')
```

`dependenciesHandled` indicates to Asset Processor that the Asset Builder has output all possible dependencies for this job product asset. This can be true if there are no output product assets. This should be set to `True` only if the Asset Builder outputs its dependencies or the output product doesn't have dependencies. When set to `False`, Asset Processor emits a warning that dependencies have not been handled.

The `JobProduct` constructor takes in a product asset name (relative to the source asset path), an asset type (UUID), and a product sub-ID number.

| Field | Type | Description |
| - | - | - |
| productFileName | String | A relative or absolute product asset path. |
| productAssetType | `azlmbr.math.Uuid` | The asset type ID this product asset adds to the **Asset Catalog**. |
| productSubID | Number | A stable and unique product identifier. |
| productDependencies | List[`ProductDependency`] | Product asset dependencies for this source asset. |
| pathDependencies | Set{`ProductPathDependency`} | Specifies product dependencies by relative path to source assets. |
| dependenciesHandled | Boolean | Indicates whether the Asset Builder has output all possible dependencies. |
| JobProduct | Constructor | Inputs: `productFileName:str`, `productAssetType:azlmbr.math.Uuid`, `productSubID:number` |

### ProductDependency 

`azlmbr.asset.builder.ProductDependency` contains product dependency information that the Asset Builder sends to Asset Processor to indicate that a product asset depends on another product asset when loaded or packaged.

| Field | Type | Description |
| - | - | - |
| `dependencyId` | `azlmbr.math.Uuid` | The asset ID of this product asset dependency. |

### ProductPathDependency 

`azlmbr.asset.builder.ProductPathDependency` represents the product's dependency information that the Asset Builder detected on another product asset (relative to the source asset path). If the source asset ID can be determined, we recommend that you use the `productDependencies` instead to indicate the product's dependency information in terms of asset IDs. It's preferable to depend on product assets whenever possible, to avoid introducing unintended dependencies.

The `dependencyType` field indicates if the path points to a source asset or a product asset.

| Field | Type | Description |
| - | - | - |
| `dependencyPath` | String | Relative path to the asset dependency. |
| `dependencyType` | `azlmbr.asset.builder.ProductPathDependency Type` | Indicates if the dependency path points to a source asset or a product asset. |

### ProductPathDependency Type 

`azlmbr.asset.builder.ProductPathDependency Type` indicates how to use the dependency path in the `ProductPathDependency`. A dependency on a source asset is converted into dependencies on all product assets produced. It's preferable to depend on product assets whenever possible, to avoid introducing unintended dependencies.
 
| Type | Description |
| - | - |
| `azlmbr.asset.builder.ProductPathDependency_ProductFile` | If the source asset depends on another product asset file, the value should be `SourceFile`. |
| `azlmbr.asset.builder.ProductPathDependency_SourceFile` | If the source asset depends on another source asset, the value should be `ProductFile`. |

## Example: Process Job

The example below demonstrates how an Asset Builder might process a job when Asset Processor detects a new or changed source asset with the registered pattern in a scan directory.

```python
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
