---
linktitle: Resource Mapping
title: Resource Mapping Tool & APIs
description: Learn how to use the AWS Resource Mapping Tool in Open 3D Engine.
weight: 250
toc: true
---

{{< preview-new >}}

This project is set up like a standard Python project. The initialization process also creates a virtualenv within this project, stored under the `.env` directory. To create the virtualenv it assumes that there is a `python3` executable (`python` for Windows) in your path with access to the `venv` package. If for any reason the automatic creation of the virtualenv fails, you can create the virtualenv manually.

## Launching the resource mapping tool

### Setup python environment

{{< todo >}}
Remove this setup step after Integrating with O3DE python environment.
{{< /todo >}}

To manually create a virtualenv on MacOS and Linux:

```cmd
python -m venv .env
```

Once the virtualenv is created, you can use the following step to activate your virtualenv.

```cmd
source .env/bin/activate
```

On a Windows platform, activate the virtualenv like this:

```cmd
.env\Scripts\activate.ba
```

Once the virtualenv is activated, you can install the required dependencies.

```cmd
pip install -r requirements.txt
```

### Setup AWS config and credential

Resource Mapping Tool uses **boto3** to interact with AWS services:

* Follow boto3 [Configuration](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/configuration.html) to setup default aws region.
* Follow boto3 [Credentials](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/credentials.html) to setup default profile or credential keys.

Or follow AWS CLI configuration which can be reused by boto3 lib:

* Follow [Quick configuration with aws configure](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html#cli-configure-quickstart-config)

{{< todo >}}
In Progress - Override default aws profile in resource mapping tool
{{< /todo >}}

### Launch options

At this point you can launch the Resource Mapping Tool like any other standard python project.

```cmd
python resource_mapping_tool.py
```

{{< todo >}}
Remove this step after Integrating with O3DE python environment.
{{< /todo >}}

To launch the Resource Mapping Tool from batch script/Editor, update `resource\_mapping\_tool.cmd` with your virtualenv full path.

**VIRTUALENV_PATH**: Fill this variable with your virtualenv full path. Then you can launch the Resource Mapping Tool by running the batch script directly.

```cmd
resource_mapping_tool.cmd
```

Or you can launch the resource mapping tool from the menu action **Cloud services - AWS Resource Mapping Tool...**

## Resource Mapping Tool usage

* Create empty resource mapping config file.
* Load data from resource mapping config file.
* Modify data in resource mapping config file.
* Save changed data into resource mapping config file.
* Search and Import resources from AWS. Import specific resource type or Import resources from CloudFormation stack.

## Resource mapping APIs

### AWSResourceMappingRequestBus

* `AZStd::string GetDefaultAccountId() const`
* `AZStd::string GetDefaultRegion() const`
* `AZStd::string GetResourceAccountId(const AZStd::string& resourceKeyName) const`
* `AZStd::string GetResourceNameId(const AZStd::string& resourceKeyName) const`
* `AZStd::string GetResourceRegion(const AZStd::string& resourceKeyName) const`
* `AZStd::string GetResourceType(const AZStd::string& resourceKeyName) const`
* `AZStd::string GetServiceUrlByServiceName(const AZStd::string& serviceName) const`
* `AZStd::string GetServiceUrlByRESTApiIdAndStage(const AZStd::string& restApiIdKeyName, const AZStd::string& restApiStageKeyName) const`
* `void ReloadConfigFile(bool isReloadingConfigFileName)`
* **(Planning)** `AZStd::unordered_map<AZStd::string, AZStd::string> GetResourceNameIdByNamePrefix(const AZStd::string& resourceKeyNamePrefix) const`
