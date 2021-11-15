---
linkTitle: Resource Management
title: AWS GameLift Gem Resource Management
description: "Learn about the sample CDK application with the AWS GameLift Gem in O3DE"
toc: true
weight: 900
---

The AWS GameLift Gem provides a sample CDK application that can be used to model and deploy the following Amazon GameLift resources:

*   A list of [GameLift fleets](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-fleet.html) to host game servers.
*   (Optional) A list of [GameLift builds](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-build.html) used for GameLift fleet generation.
*   (Optional) An [Alias](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-alias.html) for each GameLift fleet destination.
*   (Optional) A [game session queue](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-gamesessionqueue.html) that processes requests for new game sessions. Queues are recommend as the primary mechanism to place game sessions. For more information, refer to the [Amazon GameLift Queues Intro](https://docs.aws.amazon.com/gamelift/latest/developerguide/queues-intro.html) documentation.

## Prerequisites

To deploy the CDK application, you must have the following:

- [AWS CLI](https://aws.amazon.com/cli/) and [AWS Cloud Development Kit](https://aws.amazon.com/cdk/) (CDK) installed on your local machine. 
- Your AWS credentials set up. For instructions on setting up AWS credentials, refer to [Configuring AWS Credentials for O3DE](/docs/user-guide/gems/reference/aws/aws-core/configuring-credentials/).

## Setup

To learn how to set up a virtual environment and available environment variables, refer to the AWS GameLift Gem's README located at `/Gems/AWSGameLift/cdk/README/`.

## Prepare a server package

Prepare a server package that you can upload to GameLift. For more information, refer to [AWS GameLift Gem Build Packaging for Windows](build-packaging-for-windows/).

## Update the fleet configuration

Before deploying the AWS CDK application, you must update the fleet configuration defined at `/Gems/AWSGameLift/cdk/aws_gamelift/fleet_configurations.py`.

You can find descriptions for each field in the code comments or in the [Amazon GameLift resource type reference](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/AWS_GameLift.html) in the AWS CloudFormation User Guide.

For best practices on configuring GameLift fleets to suit your application, refer to the [GameLift fleet design guide](https://docs.aws.amazon.com/gamelift/latest/developerguide/fleets-design.html) in the Amazon GameLift Developer Guide.


### Fleet alias

To more easily switch player traffic from one fleet to another, you can define an alias for each GameLift fleet destination.

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


### GameLift build

To create a fleet, you can provide one of the following in the fleet configuration:
- An existing GameLift build ID
- A path to a zipped local server package

##### Use an existing GameLift build

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

{{< caution >}}
If you're deploying your server to an Amazon Linux 2 instance, you must specify `AMAZON_LINUX_2` as the operating system.
{{< /caution >}}

### Runtime configuration

To run multiple game server processes per instance, you can set up the fleet's runtime configuration. The [AWS GameLift Gem Advanced Topics](advanced-topics/) page covers the benefits of this setup, as well as the launch parameters required to support a unique log path for each server process.

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

## (Optional) Update FlexMatch configuration

If your game supports FlexMatch, you need to update the FlexMatch configuration defined at `/Gems/AWSGameLift/cdk/aws_gamelift/flexmatch/flexmatch_configurations.py` before deploying the AWS CDK application.

### Rule set body

A collection of matchmaking rules, formatted as a JSON string, such as the example below.

For instructions on designing Matchmaking rule sets, please check [Design a FlexMatch rule set](https://docs.aws.amazon.com/gamelift/latest/flexmatchguide/match-design-ruleset.html).

```bash
RULE_SET_BODY = '{"ruleLanguageVersion":"1.0","teams":[{"name":"Players","maxPlayers":4,"minPlayers":2}]}'
```

### Acceptance required

A flag that determines whether a match that was created with this configuration must be accepted by the matched players. To require acceptance, set to True.

### Required timeout

The maximum duration, in seconds, that a matchmaking ticket can remain in process before timing out.

### Additional player count

The number of player slots in a match to keep open for future players.

### Backfill mode

The method used to backfill game sessions that are created with this matchmaking configuration. 

Specify MANUAL when your game manages backfill requests manually or does not use the match backfill feature.
Specify AUTOMATIC to have GameLift create a StartMatchBackfill request whenever a game session has one or more open slots.

```bash
BACKFILL_MODE = 'AUTOMATIC'
```


## Navigate to the AWS CDK application folder

To set up the Python environment and deploy the AWS CDK application, open a command line window and navigate to the `cdk` folder of the AWS GameLift Gem.

```cmd
$ cd o3de\Gems\AWSGameLift\cdk
```


## Synthesize stacks

To create an AWS CloudFormation template after updating the fleet configuration, you must synthesize the stack(s) defined in the AWS CDK application. The synthesis step catches logical errors in defining AWS resources.


### Use an existing GameLift build

If there is an existing GameLift build ID in the fleet configuration file, you can synthesize the stack(s) by running the following AWS CLI command under the AWS CDK application root folder:

```cmd
$ cdk synth
```


### Enable optional features


#### Upload with support stack

If you need the AWS CDK application to upload a local package and create a GameLift build accordingly, you must enable the `upload-with-support-stack` context variable:

```cmd
$ cdk synth -c upload-with-support-stack=true --all
```


When this optional feature is enabled, an additional CloudFormation stack will be deployed. The additional stack contains the AWS resources that are required to support the build upload and creation. The `--all` argument tells the CDK application to synthesize all the available stacks.


#### Create game session queue

It is recommended you create the optional game session queue using this CDK application by providing the `create_game_session_queue` context variable when synthesizing stack(s). The following example command synthesizes the application with this optional features enabled:

```cmd
$ cdk synth -c create_game_session_queue=true
```


#### Create FlexMatch resources

You can also create matchmaking configuration and matchmaking rule set using this CDK application by providing the `flex_match` context variable when synthesizing stack(s). The following example command synthesizes the application with this optional features enabled:

```cmd
$ cdk synth -c flex_match=true
```


## Deploy AWS resources

### Deploy with an existing GameLift build

If you provide an existing GameLift build ID in the fleet configuration file, you can deploy the AWS CDK application, which defines all of the AWS resources. To deploy the CDK application, run the following AWS CLI command under the application root folder:

```cmd
$ cdk deploy
```


### Deploy optional features

Similar to using the `synth` command, if you want the AWS CDK application to upload a local package and create a GameLift build automatically, you must provide the context variables `create_game_session_queue` and `--all`:

```cmd
$ cdk deploy -c upload-with-support-stack=true --all
```

To deploy this CDK application with optional features enabled, you must provide the corresponding context variables when deploying stack(s). The following example command deploys the application with all the optional features enabled:

```cmd
$ cdk deploy -c upload-with-support-stack=true -c create_game_session_queue=true -c flex_match=true --all
```


## Update the AWS CDK application

To update the existing AWS CDK application, re-run the same commands that you used to synthesize and deploy the application.


## Destroy the AWS CDK application

To destroy all of the AWS resources that the AWS CDK application (which uses an existing GameLift build) deployed, run the following AWS CLI command:

```cmd
$ cdk destroy
```

If you have any of the optional feature enabled, you can destroy the CDK application with all the optional features enabled by providing the corresponding context variables and the `--all` argument. The following command destroys the CDK application with all the optional features enabled:

```cmd
$ cdk -c upload-with-support-stack=true -c create_game_session_queue=true -c flex_match=true --all
```
