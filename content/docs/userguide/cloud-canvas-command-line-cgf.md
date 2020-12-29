# Using the Cloud Gem Framework Command Line<a name="cloud-canvas-command-line-cgf"></a>

You can use the `lmbr_aws cloud-gem-framework` command line for working with Cloud Canvas [Cloud Gems](cloud-canvas-cloud-gems-intro.md), the [Cloud Gem Portal](cloud-canvas-cloud-gem-portal.md), and the [Cloud Gem Framework Service API](cloud-canvas-cgf-service-api.md)\. 

**Note**  
For general information on the `lmbr_aws` command line tool, including common syntax, configuration, and arguments, see [Using the Cloud Canvas Command Line](cloud-canvas-command-line.md)\.

## Commands<a name="cloud-canvas-command-line-cgf-commands"></a>

Following are details of the `lmbr_aws cloud-gem-framework` commands\.

### add\-service\-api\-resources<a name="cloud-canvas-command-line-cgf-add-service-api-resources"></a>

Adds the resources to implement a `swagger.json` file\-based service API to a resource group\. 

The `add-service-api-resources` command accepts the following arguments:
+ `--resource-group {resource-group-name}` or `-r {resource-group-name}`

  Required\. The name of the resource group or cloud gem\.
+ `--force`

  Optional\. Forces the replacement of existing resource definitions\. By default, existing resource definitions with the same names are not changed\.

For more information about the `add-service-api-resources` command, see [Resources](cloud-canvas-cgf-service-api-resources.md) in the [Cloud Gem Framework Service API](cloud-canvas-cgf-service-api.md) documentation and [Getting Started with the Cloud Gem Framework](cloud-canvas-cgf-getting-started.md)\.

### create\-portal\-administrator<a name="cloud-canvas-command-line-cgf-create-portal-administrator"></a>

Creates a Cloud Gem Portal administrator account if none is present\.

The `create-portal-administrator` command accepts the following argument:
+ `--silent-create-admin` – Runs the command without outputs\.

### generate\-service\-api\-code<a name="cloud-canvas-command-line-cgf-generate-service-api-code"></a>

Generates component and Lambda function code to support a service API that is described in a gem or resource group `swagger.json` file\. The generated code is created in subdirectories under the `\dev\Gems\<gem-name>\Code` directory\.

The `generate-service-api-code` command accepts the following arguments:
+ `--gem {gem-path}` or `-g {gem-path}`, `--resource-group {resource-group-path}` or `-r {resource-group-path}`

  Required\. The path of a cloud gem or resource group subdirectory that provides the `swagger.json` file that is used to generate the code \(for example, `C:\lumberyard_version\dev\Gems\MyCloudGem\v1`\)\.
+ `--component-client-path {component-client-path}`

  Optional\. The output path for the component client code files `<gem-name>ClientComponent.h` and `<gem-name>ClientComponent.cpp`\. The default location is the `\dev\Gems\{cloud-gem-name}\vN\Code\AWS\ServiceApi` directory\.
+ `--update-waf-files`

  Optional\. Adds the generated `.h` and `.cpp` code files to the `.waf_files` file that is in the gem's `\dev\Gems\<gem name>\Code` subdirectory\. The `.waf_files` file is a manifest file for the Waf build of the gem\.

  The following sample `.waf_files` file is for a gem called `MyCloudGem`\. Its full path is `\dev\Gems\MyCloudGem\Code\mycloudgem.waf_files`\. 

  ```
  {
      "auto": {
          "Include": [
              "Include/MyCloudGem/MyCloudGemBus.h", 
              "AWS/ServiceApi/MyCloudGemClientComponent.h"
          ], 
          "Source": [
              "Source/MyCloudGemModule.cpp", 
              "Source/MyCloudGemSystemComponent.cpp", 
              "Source/MyCloudGemSystemComponent.h", 
              "AWS/ServiceApi/MyCloudGemClientComponent.cpp"
          ]
      }, 
      "none": {
          "Source": [
              "Source/StdAfx.cpp", 
              "Source/StdAfx.h"
          ]
      }
  }
  ```

For more information about the `generate-service-api-code` command, see [Generating a Game Client](cloud-canvas-cgf-service-api-game-clients.md#cloud-canvas-cgf-service-api-game-clients-generating) and [Getting Started with the Cloud Gem Framework](cloud-canvas-cgf-getting-started.md) For more information about Waf, see [Using the Waf Build System](waf-intro.md)\.

### open\-cloud\-gem\-portal, open\-portal, cloud\-gem\-portal<a name="cloud-canvas-command-line-cgf-open-cloud-gem-portal"></a>

Generate a presigned URL and open the Cloud Gem Portal in the default browser using the presigned URL\. 

The `open-cloud-gem-portal` command and its equivalents accept the following arguments:
+ `--deployment {deployment-name}` or `-d {deployment-name}`

  Optional\. If the *\{role\-name\}* that is specified in the `--role` argument is a deployment access role, identifies the deployment used\. If the `--deployment` argument is not specified, the default deployment for the project is used\.
+ `--duration-seconds {duration-in-seconds}`

  Optional\. Specifies the number of seconds before the URL and temporary credentials expire\. You can use this argument to override the session length\.
+ `--show-current-encryption-object`

  Optional\. Displays the active Cloud Gem Portal AES passphrase and initialization vector without generating a new encrypted payload\.
+ `--show-encryption-object`

  Optional\. Displays the newly generated AES passphrase and initialization vector of the encryption object that the Cloud Gem Portal uses for decrypting data that Lumberyard sends\.
+ `--role {role-name}`

   Specifies an IAM role to be assumed by the Cloud Gem Portal website\. Can be `ProjectOwner`, `DeploymentOwner`, or any other project or deployment access role\. The credentials taken from the `~/.aws/credentials` file must be able to assume the role that is specified\. 

### remove\-service\-api\-resources<a name="cloud-canvas-command-line-cgf-remove-service-api-resources"></a>

Remove the resources that implement a `swagger.json` file–based service API operation from a resource group\.

The `remove-service-api-resources` command accepts the following arguments:
+ `--resource-group {resource-group-name}` or `-r {resource-group-name}`

  Required\. The name of the resource group\.

### service\-api\-process\-swagger<a name="cloud-canvas-command-line-cgf-deployment-service-api-process-swagger"></a>

Processes the Cloud Canvas extension objects that are defined in a `swagger.json` file and produces swagger definitions that can be imported into Amazon API Gateway\.

The `service-api-process-swagger` command accepts the following arguments:
+ `--resource-group {resource-group-name}` or `-r {resource-group-name}`

  Required\. The name of the resource group\.
+ `--input {file-path}`

  Optional\. The file from which the `swagger` JSON is read\. For the cloud gems that are included with Lumberyard, the default is `dev\Gems\{gem-name}\swagger.json`\.
+ `--output {file-path}`

  Optional\. The file to which the processed swagger JSON is written\. By default, the output is written to `stdout` \(the command line console window\)\.

For more information about the `service-api-process-swagger` command, see [Cloud Gem Framework Extension Object](cloud-canvas-cgf-service-api-cgf-extension-object.md)\.

### upload\-cloud\-gem\-portal, upload\-portal<a name="cloud-canvas-command-line-cgf-upload-cloud-gem-portal"></a>

Upload all Cloud Gem Portal content\.

The `upload-cloud-gem-portal` command and its `upload-portal` equivalent accept the following arguments:
+ `--deployment {deployment-name}` or `-d {deployment-name}`

  Optional\. The name of the deployment for which portal content will be uploaded\. If not specified, the default deployment is updated\.
+ `--resource-group {resource-group-name}` or `-r {resource-group-name}`

  Optional\. The name of the resource group to which portal content will be uploaded\. The default is to upload portal content for all resource groups\.
+ `--project`

  Optional\. Specifies that the global portal content of the project will be updated instead of the deployment and resource group content\.