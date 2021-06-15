---
title: Deploying the CDK Application
description: Learn how to deploy the optional Python AWS CDK application in Open 3D Engine.
weight: 200
toc: true
---

{{< preview-new >}}

The [Cloud Development Kit](https://docs.aws.amazon.com/cdk/latest/guide/home.html) (CDK) is a software development framework from AWS for defining cloud infrastructure for your project and provisioning it through **AWS CloudFormation**.

The AWS Core Gem includes an optional Python CDK application that provides two stacks:

1. A core stack to use as the basis for a project's CDK application.
1. An example stack with example resources that can be connected to **ScriptBehavior** samples in Core.

The Python project is set up like a standard Python project. The initialization process also creates a virtual environment with `virtualenv`, stored under the `.env` directory.

To create the `virtualenv` you must have a `python3` executable (or `python` for Windows) in your path with access to the `venv` package. If the automatic creation of the `virtualenv` fails, you can create the `virtualenv` manually.

## Prerequisites

You should already have set up AWS credentials for your computer using the steps shown in [Configuring AWS Credentials](./configuring-credentials.md).

## Deploy the CDK

### 1. Set up Python environment

_For the latest instructions, see the `readme.md` file in the AWS Core Gem source directory._

To manually create a `virtualenv` on MacOS and Linux:

```cmd
python -m venv .venv
```

Once the `virtualenv` is created, you can use the following step to activate your `virtualenv`.

```cmd
source .venv/bin/activate
```

On a Windows platform, you would activate the `virtualenv` like this:

```cmd
.venv\Scripts\activate.bat
```

Once the virtualenv is activated, you can install the required dependencies.

```cmd
pip install -r requirements.txt
```

### 2. Set environment variables or accept defaults

| Variable | Description |
| --- | --- |
| `O3DE_AWS_DEPLOY_REGION` | The region to deploy the stacks into, will default to CDK_DEFAULT_REGION. |
| `O3DE_AWS_DEPLOY_ACCOUNT` | The account to deploy stacks into, will default to CDK_DEFAULT_ACCOUNT. |
| `O3DE_AWS_PROJECT_NAME` | The name of the O3DE project that stacks should be deployed for, will default to AWS-PROJECT. |

See [Environments](https://docs.aws.amazon.com/cdk/latest/guide/environments.html) in the AWS CDK Developer Guide for more information including how to pass parameters to use for environment variables.

### 3. Bootstrap the environment

The AWS environment needs to be bootstrapped because this CDK application uses assets in a local directory that contains handler code for the AWS Lambda functions.

Use the CDK `bootstrap` command to bootstrap one or more AWS environments.

```cmd
cdk bootstrap aws://ACCOUNT-NUMBER-1/REGION-1 aws://ACCOUNT-NUMBER-2/REGION-2 ...
```

For example:

```cmd
cdk bootstrap aws://123456789012/us-east-1
```

See [Bootstrapping](https://docs.aws.amazon.com/cdk/latest/guide/bootstrapping.html) in the AWS CDK Developer Guide for more information about the bootstrap provisioning process.

### 4. Synthesize the project

At this point you can now synthesize the AWS CloudFormation template.

```cmd
cdk synth
```

You may need to do a one-time bootstrap, once per account, per region. The CDK application will prompt you about this.
  
To add additional dependencies, such as other CDK libraries, just add them to your `requirements.txt` file and rerun the `pip install -r requirements.txt` command.

### 5. Deploy the project

To deploy the CDK application, use the CDK `deploy` command.

```cmd
cdk deploy
```

The deploy command displays progress information as your stack is deployed.

## Useful commands

| Command | Description |
| --- | --- |
| `cdk ls` | List all stacks in the app.
| `cdk synth` | Emits the synthesized CloudFormation template. |
| `cdk deploy` | Deploy this stack to your default AWS account/region. |
| `cdk diff` | Compare deployed stack with current state. |
| `cdk docs` | Open CDK documentation. |

## Troubleshooting

For help troubleshooting, see [Troubleshooting Common AWS CDK Issues](https://docs.aws.amazon.com/cdk/latest/guide/troubleshooting.html) in the AWS CDK Developer Guide.
