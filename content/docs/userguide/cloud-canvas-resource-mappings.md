# Resource Mappings<a name="cloud-canvas-resource-mappings"></a>

Resource mappings map the friendly names used in a game's [Resource Definitions](cloud-canvas-resource-definitions.md) to the actual names of the resources created for one or more specific [Resource Deployments](cloud-canvas-resource-deployments.md)\. For example, a DynamoDB table name like `LeaderboardTable` would get mapped to a name like the following:

```
CloudGemSamples-CGSamplesDeployment-CloudGemLeaderboard-78AIXR0N0O4N-LeaderboardTable-1I1ZC6YO7KU7F
```

In the preceeding example, `CloudGemSamples` is the name of the project stack, `CGSamplesDeployment` is the name of the deployment, and `CloudGemLeaderboard` is the name of the resource group\. The `78AIXR0N0O4N` and `1I1ZC6YO7KU7F` parts of the resource name are inserted by AWS CloudFormation to guarantee that the resource name is unique over time\. Thus, even if a resource is deleted and a new one with the same logical name is created, the physical resource ID will be different\.

Usually different deployments, and consequently different mappings, are used for game development and for the released version of a game\. Furthermore, different development, test, and other teams often work with their own deployments so that each team has distinct mappings\.

The deployment used by default during development is specified in the [**project\-settings\.json**](cloud-canvas-resource-deployments.md#cloud-canvas-project-settings) file\. The file is located in the Amazon S3 configuration bucket at `/s3/buckets/<projectname>-configuration-<ID>/project-settings.json`\. The file can be overridden for each user by the `dev\Cache\{project}\pc\user\AWS\`[user\-settings\.json](cloud-canvas-resource-definitions.md#cloud-canvas-user-settings) file\. You can change the default deployment by using the `lmbr_aws` [deployment default](cloud-canvas-command-line.md#cloud-canvas-command-line-deployment-default) command or by using the [Cloud Canvas Resource Manager](cloud-canvas-ui-select-deployment.md#cloud-canvas-ui-select-deployment-default)\.

The mappings that are used during development when the game is launched from the Lumberyard IDE by pressing **Ctrl\+G** are stored in the [user\-settings\.json](cloud-canvas-resource-definitions.md#cloud-canvas-user-settings) file\. This file is updated automatically when the default deployment changes, when the default deployment is updated, and when Lumberyard Editor is started\. To refresh it manually, you can use the `lmbr_aws` [mappings update](cloud-canvas-command-line.md#cloud-canvas-command-line-mappings-update) command\.

When a game launcher application created in Lumberyard launches a release build of a game, the mappings for the player and server roles are stored in the `dev\{project}\Config\` directory\. These mappings can be updated manually using the `lmbr_aws` [`mappings update --release`](cloud-canvas-command-line.md#cloud-canvas-command-line-mappings-update) command\. The command creates a `<deployment_name>.player.awsLogicalMappings.json` file for the player role and a `<deployment_name>.server.awsLogicalMappings.json` file for the server role\. You can specify the deployment for the release mappings by using the `--deployment {deployment_name}` argument of the `lmbr_aws mappings update` command\.

## The Mappings Component<a name="cloud-canvas-resource-mappings-mappings-component"></a>

As of Lumberyard 1\.11, the mapping functionality is implemented by a Mappings component within the Cloud Gem Framework Gem\. The Mappings component \(`dev\Gems\CloudGemFramework\vN\Code\Source\MappingsComponent.h`\) is a required system component that replaces the former implementation in `\dev\Code\CryEngine\LmbrAWS\Configuration\ClientManagerImpl`\. The Mappings component loads the `<deployment_name>.player.awsLogicalMappings.json` and `<deployment_name>.server.awsLogicalMappings.json` files from disk\.

### The Mappings Component EBus<a name="cloud-canvas-resource-mappings-mappings-component-ebus"></a>

The mappings component implements an [EBus](ebus-intro.md) found at `dev\Code\CryEngine\CryCommon\CloudCanvas\CloudCanvasMappingsBus.h`\. When the Cloud Gem Framework makes calls to a service API, it uses this EBus to translate the service name to the ARN\. This EBus provides access to the mapping calls described in the following code\. 

```
// Given the friendly name of the resource, return the ARN (physical name).
virtual AZStd::string GetLogicalToPhysicalResourceMapping(const AZStd::string& logicalResourceName) = 0;

// Set a friendly (logical) to ARN (physical) mapping for the specified resource type.
virtual void SetLogicalMapping(AZStd::string resourceType, AZStd::string logicalName, AZStd::string physicalName) = 0;

// Return all mappings that have the specified type (for example, AWS::Lambda::Function or Custom::ServiceApi).
virtual AZStd::vector<AZStd::string> GetMappingsOfType(const AZStd::string& resourceType) = 0;

// Return all mapping data.
virtual MappingData GetAllMappings() = 0;

// Load mappings from disk.
virtual bool LoadLogicalMappingsFromFile(const AZStd::string& mappingsFileName) = 0; 

// If the protected flag is set in the mapping, the following function returns true.  
// Because protected resources are likely to be live and customer facing, users should be 
// warned accordingly and given the option not to connect.
virtual bool IsProtectedMapping() = 0;

// Set the mapping to protected.
 virtual void SetProtectedMapping(bool isProtected) = 0;
```

In general, you should not have to access the low level mappings\. Both ScriptCanvas and FlowNodes accept friendly names and translate them to ARNs before they make requests to AWS\. 

## Using Mappings in AWS Flow Nodes<a name="cloud-canvas-using-mappings-in-aws-flow-nodes"></a>

 AWS flow nodes that define `TableName` \(DynamoDB\), `FunctionName` \(Lambda\), `QueueName` \(Amazon SQS\), `TopicARN` \(Amazon SNS\), or `BucketName` \(Amazon S3\) ports work with mappings\. Set the port to a value like *\{resource\-group\}*\.*\{resource\}* where *\{resource\-group\}* is the name of the resource group that defines the resource, and where *\{resource\}* is the name of the resource that appears in the *Resources* section of the resource group's `resource-template.json` file\.

## Using Mappings in Lambda Functions<a name="cloud-canvas-using-mappings-in-lambda-functions"></a>

 Lambda function resources defined as part of a resource group often need to access other resources defined by that resource group\. To do this, the function code needs a way to map a friendly resource name to the actual resource name used in AWS API calls\. The `LambdaConfiguration` resource provides a way to such mappings, as well as other settings, to the lambda code\. For more information, see [LambdaConfiguration](cloud-canvas-custom-resources.md#cloud-canvas-custom-resources-lambda-configuration)\.