---
linkTitle: Setup
title: AWS GameLift Gem Setup
description: "Learn about the sample CDK application with the AWS GameLift Gem in O3DE"
toc: true
---

The AWS GameLift Gem provides a sample CDK application that can be used to model and deploy the following Amazon GameLift resources:

*   (Optional) A list of [GameLift builds](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-build.html) used for GameLift fleet generation.
*   A list of [GameLift fleets](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-fleet.html) to host game servers.
*   (Optional) An [Alias](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-alias.html) for each GameLift fleet destination.
*   (Optional) A [game session queue](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-gamesessionqueue.html) that processes requests for new game sessions. Queues are recommend as the primary mechanism to place game sessions. For more information, read the [Amazon GameLift Queues Intro](https://docs.aws.amazon.com/gamelift/latest/developerguide/queues-intro.html) documentation.

## Prerequisites

To deploy the CDK application, you must have the following:

- [AWS CLI](https://aws.amazon.com/cli/) and [AWS Cloud Development Kit](https://aws.amazon.com/cdk/) (CDK) installed on your local machine. 
- Your AWS credentials set up. For instructions on setting up AWS credentials, read [Configuring AWS Credentials for O3DE](/docs/user-guide/gems/reference/aws/aws-core/configuring-credentials.md).

## Setup

To set up a virtual environment and available environment variables, refer to `o3de/Gems/AWSGameLift/cdk/README.md`.

### Prepare Server Package

Prepare a server package that can be uploaded to GameLift. For more information, read [AWS GameLift Build Packaging for Windows](build-build-packaging-for-windows.md).

### Update Fleet Configuration

Before deploying the CDK application, you must update the fleet configuration defined at `o3de\Gems\AWSGameLift\cdk\aws_gamelift\fleet_configurations.py`.

You can find descriptions for each field in the code comments or in the [Amazon GameLift resource type reference](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/AWS_GameLift.html) page in the AWS CloudFormation documentation.

For best practices on configuring GameLift fleets to suit your application, read the [Amazon GameLift fleet design guide](https://docs.aws.amazon.com/gamelift/latest/developerguide/fleets-design.htm). 

#### Fleet Alias

You have the option to define an alias for each Amazon GameLift fleet destination, which makes it easier to switch player traffic from one fleet to another.

To define a fleet alias, add the following block inside the configuration for a fleet:
```bash
'alias_configuration': {

    # (Required) A descriptive label that is associated with an alias. Alias names do not need to be unique.
    'name': '<alias name>',

    # (Conditional) A type of routing strategy for the GameLift fleet alias if exists.
    # Required if alias_configuration is provided.
    'routing_strategy': {

        # The message text to be used with a terminal routing strategy.
        # If you specify TERMINAL for the Type property, you must specify this property.
        # Required if specify TERMINAL for the Type property,
        'message': '',

        # (Required) A type of routing strategy.
        'type': '<routing strategy type>'

    }
}
```


#### GameLift Build

To create a fleet, you can provide one of the following in the fleet configuration:
- An existing GameLift build id
- A path to a zipped local server package

##### Use an Existing GameLift Build

To specify an existing build id, edit the build configuration for a fleet, such as the example below. 

```bash
'build_configuration': {

    # (Required) A unique identifier for a build to be deployed on the new fleet.
    'build_id': '<existing build id>'

}
```

##### Upload Local Server Package

To upload a zipped server package from disk and create a GameLift build automatically, provide the local file path and the operating system for running the server. This feature has an additional cost due to the S3 usage for storing the package file. 

```bash
'build_configuration': {

    # (Required) The disk location of the local build file(zip).
    'build_path': '<path to the local build file>',

    # (Required) The operating system that the game server binaries are built to run on.
    'operating_system': 'WINDOWS_2012'

}
```

#### Runtime Configuration

You can set up the fleet's runtime configuration to run multiple game server processes per instance. The [AWS GameLift Gem Advanced Topics](usage/advanced-topics/) page goes over the benefits of this setup and the launch parameters required to support a unique log path for each server process. 

The following example runs two Windows server processes on the fleet and writes log files to different subfolders under `C:\game`:

```bash
'server_processes': [
    {
        # (Required) The number of server processes using this configuration that
        # run concurrently on each instance.
        # Provide any integer not less than 1.
        'concurrent_executions': 1,
        
        # (Required) The location of a game build executable that contains the Init() function.
        # Game builds are installed on instances at the root:
        # Windows (custom game builds only): C:\game.
        # Linux: /local/game.
        'launch_path': 'C:\game\bin\server.exe',
        
        # (Optional) An optional list of parameters to pass to the server executable on launch.
        'parameters': '--sv_port 33450 --project-path=C:\game\process1 '
                    '--project-cache-path=C:\game\assets --engine-path=C:\game '
                    '-bg_ConnectToAssetProcessor=0'
    },
    {
        'concurrent_executions': 1,
        'launch_path': 'C:\game\bin\server.exe',
        'parameters': '--sv_port 33451 --project-path=C:\game\process2 '
                    '--project-cache-path=C:\game\assets --engine-path=C:\game '
                    '-bg_ConnectToAssetProcessor=0'
    }

]
```

### Navigate to CDK Application Folder

To set up the Python environment and deploy the CDK application, open a command line window and navigate to the cdk folder of the AWS GameLift Gem. 

```cmd
$ cd o3de\Gems\AWSGameLift\cdk
```

### Synthesize Stacks

To create an AWS CloudFormation template after updating the fleet configuration, you must synthesize the stack(s) defined in the CDK application. The synthesis step catches logical errors in defining AWS resources.

#### Use an Existing GameLift Build

If an existing GameLift build id is provided in the fleet configuration file, you can synthesize the stack(s) by running the following CLI command under the CDK application root folder:

```cmd
$ cdk synth
```

#### Enable Optional Features

If you need the CDK application to upload a local package and create a GameLift build accordingly, you must enable the `upload-with-support-stack` context variable as below:

```cmd
$ cdk synth -c upload-with-support-stack=true --all
```

When this optional feature is enabled, an additional CloudFormation stack will be deployed. The additional stack contains the AWS resources that are required to support the build upload and creation. The `--all` argument tells the CDK application to synthesize all the available stacks.

Optionally, you can create a game session queue resource using this CDK application by providing the `create_game_session_queue` context variable when synthesizing stack(s). The following example command synthesizes the application with all the optional features enabled:

```cmd
$ cdk synth -c upload-with-support-stack=true -c create_game_session_queue=true --all
```

### Deploy AWS Resources

#### Deploy with an Existing GameLift Build

If you provide an existing GameLift build id in the fleet configuration file, you can deploy the CDK application, which defines all of the AWS resources. To deploy the CDK application, run the following CLI command under the CDK application root folder:

```cmd
$ cdk deploy
```

#### Deploy Optional Features

Similar to using the `synth` command, if you want the CDK application to upload a local package and create a GameLift build automatically, you must provide the context variables `create_game_session_queue` and `--all`:

```cmd
$ cdk deploy -c upload-with-support-stack=true --all
```

To deploy a game session queue resource using this CDK application, you must provide the `create_game_session_queue` context variable when deploying stack(s). The following example command deploys the application with all the optional features enabled:

```cmd
$ cdk deploy -c upload-with-support-stack=true -c create_game_session_queue=true --all
```

### Update CDK Application

To update the existing CDK application re-run the exact same commands you used to synthesize and deploy the application.

### Destroy CDK Application

To destroy all of the AWS resources deployed by the CDK application which uses an existing GameLift build, run the following CLI command:

```cmd
$ cdk destroy
```

If you have any of the optional feature enabled, you can destroy the CDK application with all the optional features enabled by providing the context variable and the `--all` argument. The following command destroy the CDK application with all the optional features enabled:

```cmd
$ cdk -c upload-with-support-stack=true -c create_game_session_queue=true --all
```