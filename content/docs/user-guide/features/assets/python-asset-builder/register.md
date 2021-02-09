---
description: ' Register your Python Asset Builder for your Amazon Lumberyard project. '
title: Register a Python Asset Builder
---
# Register a Python Asset Builder {#python-asset-builder-register}

 A Python Asset Builder script must register a file pattern and unique builder ID for the asset builder\. To describe the asset builder, use `azlmbr.asset.builder.AssetBuilderDesc`\. To bind the script to the asset building process, use `azlmbr.asset.builder.PythonAssetBuilderRequestBus`\. You can register the asset builder by a file extension pattern such as `*.myasset` or by a folder and file regular expression pattern such as `^[a-zA-Z]:\\MyAssets[\\\S|*\S]?.*$)`\.

When the Python Asset Builder is successfully registered, a handler for the builder ID is used to handle asset builder events to create jobs and process jobs\. The script creates a `azlmbr.asset.builder.PythonBuilderNotificationBusHandler` in the module to add the callback handlers\.

**Contents**
+ [PythonAssetBuilderRequestBus](#python-asset-builder-request-bus)
+ [AssetBuilderPattern](#python-asset-builder-pattern)
+ [AssetBuilderDesc](#python-asset-builder-desc)
+ [PythonBuilderNotificationBusHandler](#python-asset-builder-notification-bus-handler)
+ [Example: Register an asset builder](#python-asset-builder-register-example)

## PythonAssetBuilderRequestBus {#python-asset-builder-request-bus}

The PythonAssetBuilderRequestBus is a singleton EBus that serves methods to enable Python asset builders\.

**azlmbr\.asset\.builder\.PythonAssetBuilderRequestBus**

```
# Registers an asset builder using a builder descriptor.
# input: azlmbr.asset.builder.AssetBuilderDesc
# output: Outcome_bool
'RegisterAssetBuilder'

# Fetches the current executable folder.
# input: N/A
# output: Outcome_string
'GetExecutableFolder'
```

## AssetBuilderPattern {#python-asset-builder-pattern}

The AssetBuilderPattern is a structure that defines the type of pattern to use to watch for source asset files\.

**azlmbr\.asset\.builder\.AssetBuilderPattern**

```
class azlmbr.asset.builder.AssetBuilderPattern
 - type (azlmbr.asset.builder.AssetBuilderPattern Type) How to use the pattern to watch source assets
 - pattern (str) The file path pattern to use
```

**AssetBuilderPattern Type**

The pattern type can be either *Wildcard* or *Regex*\. This informs the asset builder registration how to use the *pattern* field\.

```
# The pattern is a file wildcard pattern (glob).
azlmbr.asset.builder.AssetBuilderPattern_Wildcard

# The pattern is a regular expression pattern.
azlmbr.asset.builder.AssetBuilderPattern_Regex
```

## AssetBuilderDesc {#python-asset-builder-desc}

`AssetBuilderDesc` describes the asset builder for the **Asset Processor** so it can invoke callbacks for the *create jobs* event and the *process job* events for the patterns being that you are registering with the source asset watching system\.

The *name* field is a human readable name that is used to trace how the product asset was processed\.

The *version* field should be incremented if all the source assets for this builder should be reprocessed, for example, when the product asset contents are redefined\.

The `busId` should be in the form of a `azlmbr.math.Uuid`, which can be created once via Python or other methods\. You can use Visual Studio's GUID tool, or create one with Python 3:

**Create a UUID with Python 3**

```
> python
>>> import uuid
>>> uuid.uuid4()
UUID('639f403e-1b7e-4cfe-a250-90e6767247cb')
```

**azlmbr\.asset\.builder\.AssetBuilderDesc**

```
class azlmbr.asset.builder.AssetBuilderDesc
 - busId (azlmbr.math.Uuid) The builder unique ID
 - name (str) The name of the Builder
 - patterns (list of AssetBuilderPattern) The collection of file patterns that the builder will use to determine if a file will be processed by that builder
 - version (number) Changing this version number will cause all your assets to be re-submitted to the builder for job creation and rebuilding
```

## PythonBuilderNotificationBusHandler {#python-asset-builder-notification-bus-handler}

The notification bus handler is used by Python Asset Builder to call back to the Python script to handle asset building events such as *create jobs* and *process job* to process source asset files\. The handler must be created in the global module scope so that the callbacks can stay active\.

**azlmbr\.asset\.builder\.PythonBuilderNotificationBusHandler**

```
# Callback function type for creating jobs from job requests.
# input: tuple(azlmbr.asset.builder.CreateJobsRequest)
# output: azlmbr.asset.builder.CreateJobsResponse
'OnCreateJobsRequest'

# Callback function type for processing jobs from process job requests.
# input: azlmbr.asset.builder.ProcessJobRequest
# output: azlmbr.asset.builder.ProcessJobResponse
'OnProcessJobRequest'
```

## Example: Register an asset builder {#python-asset-builder-register-example}

This example code shows how to register an asset builder\. The `on_create_jobs` and `on_process_job` functions are stubbed out\. See the subsequent topics for information on creating and processing jobs\.

```
import azlmbr.asset
import azlmbr.asset.builder
import azlmbr.bus
import azlmbr.math

busId = azlmbr.math.Uuid_CreateString('{CF5C74D1-9ED4-4851-85B1-9B15090DBEC7}', 0)

def on_create_jobs(args):
    # TODO: create jobs logic.
    return azlmbr.asset.builder.CreateJobsResponse()

def on_process_job(args):
    # TODO: process job logic.
    return azlmbr.asset.builder.ProcessJobResponse()

# register asset builder
def register_asset_builder():
    assetPattern = azlmbr.asset.builder.AssetBuilderPattern()
    assetPattern.pattern = '*.newasset'
    assetPattern.type = azlmbr.asset.builder.AssetBuilderPattern_Wildcard

    builderDescriptor = azlmbr.asset.builder.AssetBuilderDesc()
    builderDescriptor.name = "New Asset"
    builderDescriptor.patterns = [assetPattern]
    builderDescriptor.busId = busId
    builderDescriptor.version = 1

    outcome = azlmbr.asset.builder.PythonAssetBuilderRequestBus(azlmbr.bus.Broadcast, 'RegisterAssetBuilder', builderDescriptor)
    if outcome.IsSuccess():
        # created the asset builder to hook into the notification bus
        h = azlmbr.asset.builder.PythonBuilderNotificationBusHandler()
        h.connect(busId)
        h.add_callback('OnCreateJobsRequest', on_create_jobs)
        h.add_callback('OnProcessJobRequest', on_process_job)
        return h

# the module global asset builder handler
handler = register_asset_builder()
```