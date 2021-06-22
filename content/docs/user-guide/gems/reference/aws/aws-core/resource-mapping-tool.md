---
title: Using the Resource Mapping Tool
description: Learn how to use the AWS Resource Mapping Tool in Open 3D Engine.
weight: 350
toc: true
---

{{< preview-new >}}

The resource mapping tool helps manage and configure your resource mappings files.

## Prerequisites

Resource mapping tool uses boto3 to interact with backend AWS services. Before using the tool you will need to do the following:

1. Set up your AWS credentials. For help, see [Configuring AWS Credentials](./configuring-credentials.md).
1. Set AWS Core [Project Settings](./getting-started.md#project-settings) to configure the AWS profile name (if using profiles).

## Launching the tool from the Editor

The simplest approach is to launch the tool from the O3DE Editor. Use the **AWS - AWS Resource Mapping tool** menu item to launch the tool.

The tool can also be run independently of the Editor. See the section [Launching the resource mapping tool from command line](launching-the-resource-mapping-tool-from-command-line) for instructions.

## Importing resources

Do the following to import resources into a resource mapping file for your project.

### 1. Select the mapping file

Select an existing mapping file to edit, or generate a new mapping file.

**To generate a new mapping file**

On first launch in a new project, no resource mapping files exist.

![Start a new mapping file using the resource mapping tool](/images/user-guide/gems/reference/aws/aws-core/resource-mapping-new.png)

Choose **Create New** to generate a new mappings file. Then use the **Config File** drop-down box to select the newly created file.

**To open an existing mapping file**

Use the **Config File** drop-down box to select an existing mapping file from <Project>\Config.

### 2. Import resources

You can add or import resources individually, or import them from an AWS CloudFormation stack.

#### Importing individual resources

![Use Import Additional Resources to import AWS resources in the resource mapping tool](/images/user-guide/gems/reference/aws/aws-core/resource-mapping-import.png)

**To import a resource deployed in your account**

1. Open **Import Additional Resources**.
1. Choose **Import AWS Resources**.
1. Select the type of resource to import.
1. Choose **Search**.
1. Select the resource(s) to import.
1. Set the key name.
1. Choose **Save Changes** to save the file.

**To add a resource to a mapping file**

1. Choose **Add Row**.
1. Add a mapping key name.
1. Enter the resource type. Types should be **AWS CloudFormation** types. Example: `AWS::Lambda::Function`.
1. Provide the Name or ID of the item, such as the Lambda function name.
1. Choose **Save Changes**.

#### Importing from an AWS CloudFormation stack

**To import resources from an existing stack**

1. Open **Import Additional Resources**.
1. Choose **Import CFN Stacks**.
1. Choose **Search** to describe the stacks in your account.
1. Select the resource(s) to import.
1. Import the resources.
1. Set the key names for the resources.
1. Choose **Save Changes** to save the file.

## Launching the resource mapping tool from command line

You have two options for which Python runtime to use - your own, or the one included with O3DE.

### Option 1: Set up your own Python virtual environment

This project is set up like a standard Python project. The initialization process also creates a `virtualenv` virtual environment within this project, stored under the `.venv` directory. To create the `virtualenv`, you must have a `python3` executable (or `python` for Windows) in your path with access to the `venv` package. If for any reason the automatic creation of the `virtualenv` fails, you can create the `virtualenv` manually.

Open a command prompt to the resource mapping tool directory.

```cmd
cd <ENGINE_ROOT>\Gems\AWSCore\Code\Tools\ResourceMappingTool
```

Create a `virtualenv`.

```cmd
# Windows
python -m venv .venv

# Mac or Linux
python3 -m venv .venv
```

Activate your `virtualenv`.

```cmd
# Windows
.venv\Scripts\activate.bat

# Mac or Linux
source .venv/bin/activate
```

Install the required dependencies.

```cmd
# Windows
pip install -r requirements.txt

# Mac or Linux
pip3 install -r requirements.txt
```

Launch the resource mapping tool, located in the engine root directory.

```cmd
python resource_mapping_tool.py
```

### Option 2: Use the Python distribution from O3DE

This option requires a build of your project and the O3DE Editor. Refer to the instructions in `README.md` located in `<ENGINE_ROOT>\Gems\AWSCore\Code\Tools\ResourceMappingTool` for details.

Open a command prompt and change the directory to the engine root.

```cmd
cd <ENGINE_ROOT>
```

Launch the resource mapping tool, specifying the path to the project's build folder and to your chosen build configuration.

```cmd
python\python.cmd Gems\AWSCore\Code\Tools\ResourceMappingTool\resource_mapping_tool.py --binaries_path <PATH_TO_BUILD_FOLDER>\bin\<BUILD_CONFIGURATION>\AWSCoreEditorQtBin
```

Example using the **profile** build configuration:

```cmd
python\python.cmd Gems\AWSCore\Code\Tools\ResourceMappingTool\resource_mapping_tool.py --binaries_path C:\MyProject\bin\profile\AWSCoreEditorQtBin
```

## Troubleshooting

For help troubleshooting, check the resource mapping tool logs that are generated in `<ENGINE_ROOT>\Gems\AWSCore\Code\Tools\ResourceMappingTool\resource_mapping_tool.log`.
