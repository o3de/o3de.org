---
linkTitle: Create Jobs
title: Python Asset Builder Create Jobs
description: Create process job information for Asset Processor with Create Jobs in Python Asset Builder. 
weight: 300
toc: true
---

Create Jobs generates asset processing jobs for **Asset Processor**. When Asset Processor detects a new or updated source asset and determines the appropriate **Asset Builder** to process the source asset, it sends a `CreateJobsRequest` that contains information about the source asset, including its path, to the Asset Builder. The Asset Builder responds with a `CreateJobsResponse` that contains `JobDescriptor` structures, and source and job dependencies.

## CreateJobsRequest

`azlmbr.asset.builder.CreateJobsRequest` is a class that provides information about the job request. It is sent by Asset Processor to the Asset Builder. It provides data that is used to create a `JobDescriptor` to process the source asset for a specific target platform.

| Field | Type | Description |
| - | - | - |
| `builderId` | `azlmbr.math.Uuid` | identifies the Asset Builder |
| `watchFolder` | String | contains the subdirectory of the source asset |
| `sourceFile` | String | the source asset path that is relative to the scan directory |
| `sourceFileUUID` | `azlmbr.math.Uuid` | the source asset's UUID, which is used as part of its product asset ID |
| `enabledPlatforms` | List[`azlmbr.asset.builder.PlatformInfo`] | information about the host and target platforms |

### PlatformInfo

`azlmbr.asset.builder.PlatformInfo` is a class that provides information about the host and target platforms that have been enabled for the project.

| Field | Type | Description |
| - | - | - |
| `identifier` | String | the ID of the platform such as 'pc' or 'ios' |
| `tags` | List[String] | the tags available for the platform |

## CreateJobsResponse

`azlmbr.asset.builder.CreateJobsResponse` is a class that determines how to process the source asset. It creates a `JobDescriptor` for each source asset and for each host and target platform. It also provides information about source dependencies, and the result of the `CreateJobsRequest`.

| Field | Type | Description |
| - | - | - |
| `result` | `azlmbr.asset.builder.CreateJobsResponse Return Code` | the result code from the `CreateJobsRequest` |
| `sourceFileDependencyList` | List[`SourceFileDependency`] | dependencies required to run the process job for the source asset |
| `createJobOutputs` | List[`JobDescriptor`] | a list of `JobDescriptor` structures for each source asset, and each host and target platform |

### CreateJobsResponse Return Code

`CreateJobsResponse result` contains one of the following `azlmbr.asset.builder.CreateJobsResponse` Return Codes from the `CreateJobs` request.

| Return Code | Description |
| - | - |
| `azlmbr.asset.builder.CreateJobsResponse_ResultFailed` | job creation failed |
| `azlmbr.asset.builder.CreateJobsResponse_ResultShuttingDown` | the Asset Builder is shutting down |
| `azlmbr.asset.builder.CreateJobsResponse_ResultSuccess` | job creation succeeded |

### SourceFileDependency

`azlmbr.asset.builder.SourceFileDependency` is a class that contains the path and ID of a source file dependency.

| Field | Type | Description |
| - | - | - |
| `sourceFileDependencyPath` | String | path (relative to the assets directory or absolute) to the dependency |
| `sourceFileDependencyUUID` | `azlmbr.math.Uuid` | UUID (without the sub ID) of the dependency |
| `sourceDependencyType` | `azlmbr.asset.builder.SourceFileDependency Type` | absolute dependency or wildcard match (`azlmbr.asset.builder.SourceFileDependency_Absolute` is the default) |

{{< note >}}
The Asset Builder does not need to provide both the `sourceFileDependencyUUID` and the `sourceFileDependencyPath` info to **Asset Processor**. Either one is sufficient.
{{< /note >}}

### SourceFileDependency Type

`azlmbr.asset.builder.SourceFileDependency Type` specifies an absolute dependency or a wildcard match.

| Type | Description |
| - | - |
| `azlmbr.asset.builder.SourceFileDependency_Absolute` | an absolute source file dependency |
| `azlmbr.asset.builder.SourceFileDependency_Wildcards` | allow wildcard matches |

## JobDescriptor

`azlmbr.asset.builder.JobDescriptor` is a class used by the Asset Builder to store job-related information.

| Field | Type | Description |
| - | - | - |
| `jobParameters` | `JobParameterMap` | Asset Builder specific parameters to pass to the `ProcessJobRequest` |
| `additionalFingerprintInfo` | String | additional info that should be taken into account when fingerprinting this job |
| `jobKey` | String | job specific key, for example, TIFF Job |
| `priority` | Integer | priority value for the jobs within the job queue |
| `checkExclusiveLock` | Boolean | attempt to get an exclusive lock file for before processing the job |
| `checkServer` | Boolean | check the server for the outputs of this job before processing the job |
| `jobDependencyList` | List[`azlmbr.asset.builder.JobDependency`] | required for jobs that want to declare job dependencies on other jobs |
| `failOnError` | Boolean | errors, asserts, and exceptions automatically cause the job to fail when true |
| `set_platform_identifier(platformIdentifier:string)` | Method | sets the identifier for the build platform |
| `get_platform_identifier()` | Method | returns the identifier for the build platform |

The `priority` field is the value for the jobs within the job queue. A priority value less than `0` means the job's priority is not considered. A priority value of `0` or greater prioritizes the job by value. The higher the value, the higher priority.

{{< note >}}
Priorities for critical and non-critical jobs are set separately.
{{< /note >}}

The `checkExclusiveLock` field is a flag to determine whether Asset Processor needs to check the source asset file for exclusive lock before processing the job. Asset Processor will lock and unlock the source asset file to ensure it is not opened by another process. This prevents premature processing of some source asset files that are opened for writing, but have zero bytes for longer than the modification threshold. This will time out if the Asset Processor cannot get an exclusive lock.

The `checkServer` field determines whether Asset Processor needs to check the server for the outputs of this job before starting to process the job locally. If Asset Processor is running in server mode, then this is used to determine whether it needs to store the outputs of this job on the server.

If the `failOnError` field is set to `True`, then all reported errors, asserts, and exceptions cause the job to fail, even if the result code is `ProcessJobResult_Success`.

The `setplatformidentifier` and `getplatformidentifier` methods set and retrieve the platform identifier such as 'pc' or 'android' for the job description. It is the identifier of the platform from the `PlatformInfo` struct.

### JobParameterMap

The `JobParameterMap` is a map data structure that holds parameters that are passed into a job for `ProcessJob` requests. These parameters can optionally be set during the `CreateJobs` function of the builder so that they are passed along to the `ProcessJobFunction`. The values (key and value) are arbitrary and it is up to the Asset Builder how to use them.

#### Example: JobParameterMap

```python
jobParameterMap = {1 : "MyValue", 2 : "Another Value"}
```

### JobDependency

`azlmbr.asset.builder.JobDependency` is a class containing job dependency information that the builder sends to the Asset Processor.

| Field | Type | Description |
| - | - | - |
| sourceFile | `azlmbr.asset.builder.SourceFileDependency` | source file dependency information that the Asset Builder sends to Asset Processor |
| jobKey | String | job key of the dependent job |
| platformIdentifier | String | platform identifier of the dependent job |
| type | `azlmbr.asset.builder.JobDependency Type` | type of `JobDependency` (order or fingerprint) |


#### JobDependency Type

`azlmbr.asset.builder.JobDependency Type` specifies the `azlmbr.asset.builder.JobDependency` type that determines when the job dependency should be processed.

| Type | Description |
| - | - |
| `azlmbr.asset.builder.JobDependency_Fingerprint` | The dependent job should get processed by Asset Processor when the fingerprint of job it depends on changes. |
| `azlmbr.asset.builder.JobDependency_Order` | The dependent job should only run after the job it depends on is processed by Asset Processor. |
| `azlmbr.asset.builder.JobDependency_OrderOnce` | The dependent job should only run after the job it depends on is processed by Asset Processor and only if the dependencies have never been processed by Asset Processor. |

## Example: Create Jobs

The example below demonstrates how the Asset Builder might create jobs when **Asset Processor** detects a new or changed source asset with the registered pattern in a scan directory.

```python
# Creates a single job to compile for each platform
def on_create_jobs(args):
    # get the request from the 'args'
    request = args[0]

    # Create job descriptor for each platform
    jobDescriptorList = []
    for platformInfo in request.enabledPlatforms:
        jobDesc = azlmbr.asset.builder.JobDescriptor()
        jobDesc.jobKey = 'My New Asset Job'
        jobDesc.priority = 1
        jobDesc.set_platform_identifier(platformInfo.identifier)
        jobDescriptorList.append(jobDesc)

    response = azlmbr.asset.builder.CreateJobsResponse()
    response.result = azlmbr.asset.builder.CreateJobsResponse_ResultSuccess
    response.createJobOutputs = jobDescriptorList
    return response
```
