# Creating a Cloud Gem<a name="cloud-canvas-cgf-getting-started-create-gem"></a>

Lumberyard includes some cloud gems, such as leaderboards and dynamic content distribution, that provide full\-featured services\. You can use these gems in your games with a minimum of effort\. Because the full source code for these cloud gems is included with Lumberyard, you can customize them or use them as examples for developing your own cloud gems\.

You can develop your own cloud gems to create discrete packages of custom, cloud\-connected functionality to enhance your game\. Cloud gems leverage the power of AWS, benefit from the security model of AWS and Lumberyard, and can communicate with one another to create a seamless gaming experience\.

You can easily create your own cloud gem by using the `lmbr_aws cloud-gem create` command\.

**Prerequisites**

1. Ensure that the Cloud Gem Framework gem is enabled for your project\. Do one of the following:
   + Use the [Enabling Gems](gems-system-using-project-configurator.md) to enable the **Cloud Gem Framework** gem\.

     OR
   + From the `\dev\Tools\LmbrSetup\Win` directory, enter the following command\. Replace *<projectname>* with the name of your project\.

     ```
     lmbr gems enable <projectname> CloudGemFramework
     ```

1. Ensure that your project's Cloud Gem Framework resources correspond to the latest version of the Cloud Gem Framework gem\. From a command prompt window on the `\dev` directory, enter the following command :

   ```
   lmbr_aws project update-framework-version
   ```

1. If your cloud gem will use the [Cloud Gem Framework Service API](cloud-canvas-cgf-service-api.md), do one of the following:
   + In [Running Lumberyard Setup Assistant](lumberyard-launcher-using.md), choose **Compile the game code**

     OR
   + From a command prompt window on the `\dev\Tools\LmbrSetup\Win` directory, enter the following command:

     ```
     lmbr capabilities enable compilegame
     ```

**To create a cloud gem**
+ From the `\dev` directory, enter the `lmbr_aws cloud-gem create` command\. Use the following syntax:

  ```
  lmbr_aws cloud-gem create --gem {gem-name} --initial-content {content-option} --enable
  ```

  The syntax options are as follows\.
  + `--gem {gem-name}` – Specifies the name of the cloud gem\.
  + `--initial-content {content-option}` – Specifies the starter content for the cloud gem\. For a list of content options, see [cloud\-gem create](cloud-canvas-command-line.md#cloud-canvas-command-line-cloud-gem-create)\.
  + `--enable` – Enables the cloud gem in your project\. 

**Example**  
The following command example creates a cloud gem called `MyCloudGem` that is enabled in the current project and has Amazon API Gateway and AWS Lambda function resources\. 

  ```
  lmbr_aws cloud-gem create --gem MyCloudGem --initial-content api-lambda --enable
  ```

**Results of the Command**  
Depending on the parameter that you choose for the `--initial-content` option, the `cloud-gem create` command can do much of the initial cloud gem code work for you\. For example, choosing the `api-lambda` parameter creates the following resources locally:
  + A `\dev\Gems\{gem-name}\vN\ gem.json` file that declares a dependency on the Cloud Gem Framework\.
  + A `\dev\Gems\{gem-name}\vN\AWS` directory that includes the following items: 
    + A `cgp-resource-code` directory that contains skeleton resource code for your [Cloud Gem Portal](cloud-canvas-cloud-gem-portal.md)\.
    + A `lambda-code` directory that contains skeleton `ServiceLambda` API code\. `ServiceLambda` is an AWS Lambda function that implements your cloud gem's functionality\.
    + A `swagger.json` file that describes the API for the cloud gem\. For more information about the `swagger.json` file, see [Cloud Gem Framework Service API](cloud-canvas-cgf-service-api.md)\.
    + A [resource\-template\.json](cloud-canvas-resource-definitions.md#cloud-canvas-resource-template) file that defines the initial resources for the cloud gem\. In the `api-lambda` example, the `resource-template.json` file specifies the following: 
      + `ServiceApi`, `ServiceLambda`, and `ServiceLambdaConfiguration` resources\.
      + An output for the service API URL\.
      + An `AccessControl` resource configured as described in [Controlling Access to Resources](cloud-canvas-setting-access-permissions.md)\.
  +  A `\dev\Gems\{gem-name}\vN\Code\` directory with skeleton code that was automatically generated from the `swagger.json` file\. The `Code` directory contains generated [Using the Waf Build System](waf-intro.md) files and the following subdirectories: 
    + `\AWS\ServiceAPI\` – Contains `{gem-name}ClientComponent.h` and `{gem-name}ClientComponent.cpp` files\. Use the skeleton code in these files to implement a Lumberyard component that you can use to invoke the cloud gem's service API operations from C\+\+ or Lua\.
    + `\Include\{gem-name}\` – Contains a `{gem-name}Bus.h` [EBus](ebus-intro.md)  file\.
    + `\Source\` – Contains skeleton component, gem module and system component files\.
    + `\Tests\` – Contains a skeleton `{gem-name}Test.cpp` file

## Developing your Cloud Gem<a name="cloud-canvas-cgf-getting-started-developing-your-cloud-gem"></a>

After you use the `lmbr_aws cloud-gem create` command, you can further develop your cloud gem by doing the following:
+ Add resource definitions that the cloud gem requires to the `resource-template.json` file\. In Cloud Canvas **Resource Manager**, click **Upload all resources** to create and deploy the AWS resources that are defined in your `resource-template.json` file\.
+ Implement the cloud gem's functionality by adding code to the `lambda-code` directory\.
+ Add paths and operations to the `swagger.json` file that expose the functionality of your cloud gem\. For more information, see [Cloud Gem Framework Service API](cloud-canvas-cgf-service-api.md)\.
+ Use Lumberyard components, [EBus](ebus-intro.md), and other features to implement game client functionality for the gem\. Place the code in the cloud gem's `\dev\Gems\<gem-name>\vN\Code` directory\. You can use the generated service API client to access the functionality in the cloud gem's `ServiceLambda` Lambda function\.