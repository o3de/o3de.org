---
description: ' Create jobs in Python Asset Builder to create custom asset builders
  for your Open 3D Engine project. '
title: Create jobs with Python Asset Builder
weight: 400
---

{{< preview-migrated >}}

When you create a job with the Python Asset Builder, the callback for `OnCreateJobsRequest` will be called with a `CreateJobsRequest` in a tuple. The callback will return a `CreateJobsResponse` as the response using the data inside the request.

**Contents**
- [Create jobs with Python Asset Builder {#python-asset-builder-create-job}](#create-jobs-with-python-asset-builder-python-asset-builder-create-job)
  - [CreateJobsRequest {#python-asset-builder-create-jobs-request}](#createjobsrequest-python-asset-builder-create-jobs-request)
  - [CreateJobsResponse {#python-asset-builder-create-jobs-response}](#createjobsresponse-python-asset-builder-create-jobs-response)
  - [Example: Create jobs {#python-asset-builder-create-jobs-example}](#example-create-jobs-python-asset-builder-create-jobs-example)

## CreateJobsRequest 

`CreateJobsRequest` provides data for operations related to the enabled platforms. This data is used to build the output `JobDescriptor` for a specific enabled platform. The `CreateJobsRequest` data contains input job data that is sent by **Asset Processor** to the builder for creating jobs.

**azlmbr.asset.builder.CreateJobsRequest**

```
class azlmbr.asset.builder.AssetBuilderDesc
- builderId (azlmbr.math.Uuid) The builder id to identify which builder will process this job request
- watchFolder (str) Contains the sub-folder that the source file came from, out of all the folders being watched by the asset processor
- sourceFile (str) The source file path that is relative to the watch folder (watchFolder)
- sourceFileUUID (azlmbr.math.Uuid) The source file's UUID; will be used for its Asset ID
- enabledPlatforms (list of azlmbr.asset.builder.PlatformInfo) Information about each platform the builder is expected to build
```

**PlatformInfo**

This structure indicates the platform that has been enabled for the project.

**azlmbr.asset.builder.PlatformInfo**

```
class azlmbr.asset.builder.PlatformInfo
- identifier (str) The ID of the platform such as 'pc' or 'ios'
- tags (set of strings) The tags available for the platform
```

## CreateJobsResponse 

The response from the callback determines what work to process for the source asset file. In most cases, the builder creates a job descriptor for each source asset and for each enabled platform.

**azlmbr.asset.builder.CreateJobsResponse**

```
class azlmbr.asset.builder.CreateJobsResponse
- result (azlmbr.asset.builder.CreateJobsResponse Return Code) The result code from the create jobs request
- sourceFileDependencyList (list of SourceFileDependency) This is required for source files that want to declare dependencies on other source files
- createJobOutputs (list of JobDescriptor) JobDescriptor is used by the builder to store job related information
```

**CreateJobsResultCode**

These are the possible result codes from `CreateJobs` request.

**azlmbr.asset.builder.CreateJobsResponse Return Code**

```
# Jobs failed to be created.
azlmbr.asset.builder.CreateJobsResponse_ResultFailed

# The builder is in the process of shutting down.
azlmbr.asset.builder.CreateJobsResponse_ResultShuttingDown

# Jobs were created successfully.
azlmbr.asset.builder.CreateJobsResponse_ResultSuccess
```

**SourceFileDependency**

This structure defines source asset file dependency information that the builder will send to **Asset Processor**.

The `sourceFileDependencyPath` field can be either be a relative path from the assets folder, or an absolute path.

The `sourceFileDependencyUUID` field is the source asset file UUID part of the asset ID, without the sub-id.

**Important**
The builder does not need to provide both the `sourceFileDependencyUUID` and the `sourceFileDependencyPath` info to **Asset Procesor**. Either one will be sufficient.

**azlmbr.asset.builder.SourceFileDependency**

```
class azlmbr.asset.builder.SourceFileDependency
- sourceFileDependencyPath (str) Filepath on which the source file depends
- sourceFileDependencyUUID (azlmbr.math.Uuid) UUID of the file on which the source file depends
- sourceDependencyType (azlmbr.asset.builder.SourceFileDependency Type) Defaults to azlmbr.asset.builder.SourceFileDependency_Absolute
```

**SourceFileDependency Type**

**azlmbr.asset.builder.SourceFileDependency Type**

```
# Source file depends on other source file
azlmbr.asset.builder.SourceFileDependency_Absolute

# Allow wildcard matches using LIKE
azlmbr.asset.builder.SourceFileDependency_Wildcards
```

**JobDescriptor**

`JobDescriptor` is used by the builder to store job-related information.

The `priority` field is the value for the jobs within the job queue. A priority value less than **0** means the job's priority is not considered. A priority value of **0** or greater prioritizes the job by value. The higher the value, the higher priority.

**Note**
Priorities for critical and non-critical jobs are set separately.

The `checkExclusiveLock` field is a flag to determine whether **Asset Processor** needs to check the source asset file for exclusive lock before processing the job. **Asset Processor** will lock and unlock the source asset file to ensure it is not opened by another process. This prevents premature processing of some source asset files that are opened for writing, but have zero bytes for longer than the modification threshold. This will time out if the **Asset Processor** cannot get an exclusive lock.

The `checkServer` field determines whether **Asset Processor** needs to check the server for the outputs of this job before starting to process the job locally. If **Asset Processor** is running in server mode, then this is used to determine whether it needs to store the outputs of this job on the server.

If the `failOnError` field is set to **True**, then all reported errors, asserts, and exceptions cause the job to fail, even if the result code is `ProcessJobResult_Success`.

The `setplatformidentifier` and `getplatformidentifier` methods set and retrieve the platform identifier such as `pc` or `android` for the job description. It is the identifier of the platform from the `PlatformInfo` struct.

**azlmbr.asset.builder.JobDescriptor**

```
class azlmbr.asset.builder.JobDescriptor
- jobParameters (JobParameterMap) Any builder specific parameters to pass to the Process Job Request
- additionalFingerprintInfo (str) Any additional info that should be taken into account during fingerprinting for this job
- jobKey (str) Job specific key, e.g. TIFF Job
- priority (int) Priority value for the jobs within the job queue
- checkExclusiveLock (bool) Attempt to get an exclusive lock file for before we process the job
- checkServer (bool) Check the server for the outputs of this job before we start processing the job
- jobDependencyList (list of azlmbr.asset.builder.JobDependency) This is required for jobs that want to declare job dependency on other jobs
- failOnError (bool) Reported errors, asserts, and exceptions will automatically cause the job to fail
+ set_platform_identifier(platformIdentifier:str) -> None; Sets platform identifier
+ get_platform_identifier() -> platformIdentifier:str; Gets platform identifier
```

**JobParameterMap**

The `JobParameterMap` is a `Dictionary` of `Numbers` to `Strings`. This is a map data structure that holds parameters that are passed into a job for `ProcessJob` requests. These parameters can optionally be set during the create job function of the builder so that they are passed along to the `ProcessJobFunction`. The values (key and value) are arbitrary and it is up to the builder on how to use them.

**Example:**

```
jobParameterMap = {1 : "MyValue", 2 : "Another Value"}
```

**JobDependency**

Job dependency information that the builder sends to the **Asset Processor**.

**azlmbr.asset.builder.JobDependency**

```
class azlmbr.asset.builder.JobDependency
- sourceFile (azlmbr.asset.builder.SourceFileDependency) Source file dependency information that the builder will send to the asset processor
- jobKey (str) JobKey of the dependent job
- platformIdentifier (str) Platform Identifier of the dependent job
- type (azlmbr.asset.builder.JobDependency Type) Type of Job Dependency (order or fingerprint)
```

**JobDependency Type**

**azlmbr.asset.builder.JobDependency Type**

```
# This implies that the dependent job should get processed by Asset Processor, if the fingerprint of job it depends on changes.
azlmbr.asset.builder.JobDependency_Fingerprint

# This implies that the dependent job should only run after the job it depends on is processed by Asset Processor.
azlmbr.asset.builder.JobDependency_Order

# This is similar to Order where the dependent job should only run after all the jobs it depends on are processed by the Asset Processor.
# The difference is that here only those dependent jobs matter that have never been processed by Asset Processor.
# Also important to note is the fingerprint of the dependent jobs do not alter the fingerprint of the job.
azlmbr.asset.builder.JobDependency_OrderOnce
```

## Example: Create jobs 

This is a simple example of how the asset builder might create jobs when **Asset Processor** detects a new or changed source asset file in the watch folders of the registered pattern.

```
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
