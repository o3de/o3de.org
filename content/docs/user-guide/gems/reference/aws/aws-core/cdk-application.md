---
title: Deploying the CDK Application
description: Learn how to deploy the optional Python AWS CDK application in Open 3D Engine.
weight: 200
toc: true
---

The [Cloud Development Kit](https://docs.aws.amazon.com/cdk/v2/guide/home.html) (CDK) is a software development framework from AWS for defining cloud infrastructure for your project and provisioning it through **AWS CloudFormation**.

{{< note >}}
The AWS Gems have been updated to support CDK v2, the new long term CDK version. CDK v1 entered maintenance on June 1, 2022, and will now receive only critical bug fixes and security patches. 

For those still using the CDK v1, a legacy snapshot of the sample applications are available in a `cdkv1` folder inside each Gem. See the [CDK migration Guide](https://docs.aws.amazon.com/cdk/v2/guide/migrating-v2.html) for advice about how to migrate legacy CDK applications to the CDK v2. 
{{< /note >}}

The AWS Core Gem includes an optional Python CDK application that provides two stacks:

1. A core stack to use as the basis for a project's CDK application.
2. An example stack with example resources that can be connected to **ScriptBehavior** samples in Core.

The Python project is set up like a standard Python project. The initialization process uses virtual environments, created with `virtualenv` and stored under the `.venv` directory.

To create the virtual environment, you must have a `python3` executable (or `python` for Windows) in your path with access to the `venv` package. If the automatic creation of the `virtualenv` fails, you can create the `virtualenv` manually.


## Prerequisites

* AWS credentials configured. Refer to the steps shown in [Configuring AWS Credentials](./configuring-credentials/).
* [AWS Cloud Development Kit](https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html#getting_started_install) (CDK) installed.
* O3DE project built.

## Working with the CDK application

There are a few one-time set up steps to prepare for your first CDK deployment. The following commands should all be run from the `cdk` directory of the Gem you're working with.

### 1. Set up Python environment

_For the latest instructions, refer to the `README.MD` located in `<engine root>\Gems\AWSCore\cdk`._

Open a command prompt to the `cdk` directory of the Gem you're working with.

```cmd
cd <ENGINE_ROOT>\Gems\<AWS_GEM>\cdk
```

* Example when deploying the CDK application for AWS Core:

    ```cmd
    cd <ENGINE_ROOT>\Gems\AWSCore\cdk
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

### 2. Set environment variables or accept defaults

| Variable | Description |
| --- | --- |
| `O3DE_AWS_DEPLOY_REGION` | The region to deploy the stacks into, will default to CDK_DEFAULT_REGION. |
| `O3DE_AWS_DEPLOY_ACCOUNT` | The account to deploy stacks into, will default to CDK_DEFAULT_ACCOUNT. |
| `O3DE_AWS_PROJECT_NAME` | The name of the O3DE project that stacks should be deployed for, will default to AWS-PROJECT. |

See [Environments](https://docs.aws.amazon.com/cdk/v2/guide/environments.html) in the AWS CDK Developer Guide for more information including how to pass parameters to use for environment variables.

### 3. Bootstrap the environment

An AWS environment is a combination of an AWS account and region and must be bootstrapped to provision common CDK resources used for deployment. This only needs to happen once.

Use the CDK `bootstrap` command to bootstrap one or more AWS environments. 

```cmd
cdk bootstrap aws://ACCOUNT-NUMBER-1/REGION-1 aws://ACCOUNT-NUMBER-2/REGION-2 ...
```

For example:

```cmd
cdk bootstrap aws://123456789012/us-east-1
```

For more information about the bootstrap provisioning process, see the [Bootstrapping](https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping.html) section of the AWS CDK Developer Guide.

### 4. Synthesize the project

At this point you can now synthesize the AWS CloudFormation template. Use the CDK `synth` command from the `cdk` directory of the Gem whose application you are deploying.

```cmd
cdk synth
```

To add additional dependencies, such as other CDK libraries, just add them to your `requirements.txt` file and rerun the `pip install -r requirements.txt` command.

### 5. Deploy the project

To deploy the CDK application, use the CDK `deploy` command from the `cdk` directory of the Gem whose application you are deploying.

```cmd
cdk deploy
```

The deploy command displays progress information as your stack is deployed.

## Useful commands

| Command | Description |
| --- | --- |
| `cdk ls` | List all stacks in the app. |
| `cdk synth` | Emits the synthesized CloudFormation template. |
| `cdk deploy` | Deploy this stack to your default AWS account/region. |
| `cdk diff` | Compare deployed stack with current state. |
| `cdk docs` | Open CDK documentation. |

## Troubleshooting

For help troubleshooting, see [Troubleshooting Common AWS CDK Issues](https://docs.aws.amazon.com/cdk/v2/guide/troubleshooting.html) in the AWS CDK Developer Guide.
