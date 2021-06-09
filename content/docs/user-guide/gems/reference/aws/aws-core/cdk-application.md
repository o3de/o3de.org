---
title: Deploying the CDK Application
description: Learn how to deploy the optional AWS CDK application in Open 3D Engine.
weight: 200
toc: true
---

{{< preview-new >}}

Cloud Development Kit (CDK) is a software development framework from AWS for defining cloud infrastructure in your project and provisioning it through **AWS Cloud Formation**.

AWS Core includes an optional CDK application that provides two stacks:

* A core stack to use as the basis for a project's CDK application.
* An example stack with example resources that can be connected to **ScriptBehavior** samples in Core.

This project is set up like a standard Python project. The initialization process also creates a virtualenv within this project, stored under the `.env` directory.

To create the virtualenv it assumes that there is a `python3` executable (`python` for Windows) in your path with access to the `venv` package. If the automatic creation of the virtualenv fails, you can create the virtualenv manually.

## Prerequisites

Follow the prerequisite instructions in [AWS CDK: Getting Started](https://docs.aws.amazon.com/cdk/latest/guide/getting_started.html#getting-started-prerequisites) to prepare for use of the CDK in your project.

### Setup python environment

To manually create a virtualenv on MacOS and Linux:

```cmd
python -m venv .env
```

Once the virtualenv is created, you can use the following step to activate your virtualenv.

```cmd
source .env/bin/activate
```

On a Windows platform, you would activate the virtualenv like this:

```cmd
.env\Scripts\activate.ba
```

Once the virtualenv is activated, you can install the required dependencies.

```cmd
pip install -r requirements.txt
```

## Deploy the CDK

### Set environment variables or accept defaults

| Variable | Description |
| --- | --- |
| `O3D_AWS_DEPLOY_REGION` | The region to deploy the stacks into, will default to CDK_DEFAULT_REGION. |
| `O3D_AWS_DEPLOY_ACCOUNT` | The account to deploy stacks into, will default to CDK_DEFAULT_ACCOUNT. |
| `O3D_AWS_PROJECT_NAME` | The name of the O3DE project stacks should be deployed for, will default to AWS-PROJECT. |

See [https://docs.aws.amazon.com/cdk/latest/guide/environments.html](https://docs.aws.amazon.com/cdk/latest/guide/environments.html) for more information including how to pass parameters to use for environment variables.

### Bootstrap the environment

An environment needs to be bootstrapped since this CDK application uses assets like a local directory that contains the handler code for the AWS Lambda functions.

Use the following `cdk` bootstrap command to bootstrap one or more AWS environments.

TODO: Which is the correct command line?

```cmd
cdk bootstrap ACCOUNT-NUMBER-1/REGION-1 ACCOUNT-NUMBER-2/REGION-2 [...]
cdk bootstrap aws://ACCOUNT-NUMBER-1/REGION-1 aws://ACCOUNT-NUMBER-2/REGION-2 ...
```

See [https://docs.aws.amazon.com/cdk/latest/guide/bootstrapping.html](https://docs.aws.amazon.com/cdk/latest/guide/bootstrapping.html) for more information about bootstrapping.

### Synthesize the project

At this point you can now synthesize the CloudFormation template for this code.

```cmd
cdk synth
```

You may need to do a one-time bootstrap, once per account, per region. The CDK application will prompt you about this.
  
To add additional dependencies, such as other CDK libraries, just add them to your `requirements.txt` file and rerun the `pip install -r requirements.txt` command.

### Deploy the project

To deploy the CDK application, using the following `cdk` command.

```cmd
cdk deploy
```

### Useful commands

| Command | Description |
| --- | --- |
| `cdk ls` | List all stacks in the app.
| `cdk synth` | Emits the synthesized CloudFormation template. |
| `cdk deploy` | Deploy this stack to your default AWS account/region. |
| `cdk diff` | Compare deployed stack with current state. |
| `cdk docs` | Open CDK documentation. |

## Troubleshooting

See [https://docs.aws.amazon.com/cdk/latest/guide/troubleshooting.html](https://docs.aws.amazon.com/cdk/latest/guide/troubleshooting.html).
