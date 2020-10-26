# Controlling Access to Resources<a name="cloud-canvas-setting-access-permissions"></a>

Setting access permissions correctly is key to ensuring that Cloud Canvas Resource Manager manages your project's cloud\-connected features securely\.

## Access Scenarios and ProjectResourceHandler<a name="cloud-canvas-setting-access-permissions-access-scenarios-and-projectresourcehandler"></a>

Cloud Canvas Resource Manager requires that the following access scenarios be supported\. Additional roles with more nuanced permissions can be created, but the table below describes the core access requirements\.

![\[Cloud Canvas core access requirement\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-setting-access-permissions-core-access-reqs.png)

A project team member must be able to create resource group stacks that contain arbitrary resources, but not be able to create or modify roles and policies\. This introduces a significant complexity\. Some resources like Lambda functions require that the game developer also provide a role that is assumed by the resource\. The game developer must be able to create such roles and manage their policies\. However, granting IAM permissions such as these directly to team members would effectively make them administrators\.

To enable the required functionality while still limiting what a project team member can do directly, Cloud Canvas Resource Manager uses AWS CloudFormation custom resources\. The custom resource handlers for Cloud Canvas Resource Manager are implemented in the `ProjectResourceHandler` Lambda function in the project stack\. The Lambda function's execution role \(`ProjectResourceHandlerExecution`\) grants permissions that Cloud Canvas Resource Manager requires\. These permissions are not granted to project team members\.

For example, the `Custom::AccessControl` resource, described in detail later in this document, is responsible for managing inline policies on various roles\. It can perform these actions on the project team member's behalf\. However, the `Custom::AccessControl` handler also must know what to put into these policies\. It can't trust the project team member to provide this information directly\. Instead, it must construct the information from trusted sources\. To do this, `AccessControl` uses metadata on resource definitions from AWS CloudFormation\. It also constructs ARNs for the stack's resources identified by AWS CloudFormation\. In this way, only a user with permission to update the stack can influence the policies that are constructed for the resources in that stack\.

![\[Cloud Canvas flow of permissions\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-setting-access-permissions-flow.png)

## Using the Custom::AccessControl Resource<a name="cloud-canvas-setting-access-permissions-access-control"></a>

As described above, Cloud Canvas Resource Manager security depends on IAM roles and the credentials used from assuming such roles\. The [Access Scenarios and ProjectResourceHandler](#cloud-canvas-setting-access-permissions-access-scenarios-and-projectresourcehandler) section earlier in this topic explains why Cloud Canvas Resource Manager has the responsibility of managing the inline policies attached to these roles\.

This section describes the data used by the `Custom::AccessControl` resource handler to configure the project's roles\. A `Custom::AccessControl` resource must be defined in the following templates:


****  

| Template | Description | 
| --- | --- | 
| project\-template\.json | Causes policies on the roles defined in the project\-template\.json file to be updated\. These roles can provide access to any resource defined in any resource groups across all deployments\. | 
| deployment\-access\-template\.json | Causes policies on the roles defined in the deployment\-access\-template\.json file to be updated\. These roles can provide access to any resource in any resource of a given deployment\. | 
| resource\-group\-template\.json | Causes policies on the roles defined in the project\-template\.json and deployment\-access\-template\.json files to be updated\. Only permissions for the resource defined in the resource\-group\-template\.json file are updated\. For roles defined in the deployment\-access\-template\.json file, only the instances of those roles for the deployment that contains the resource group stack are updated\. | 

This process is illustrated in the following diagram\. The diagram shows the metadata that is read and roles that are updated when a resource group stack, deployment access stack, or project stack is updated\.

![\[Configuration of project roles\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-setting-access-permissions-project-role-cfg.png)

### Custom::AccessControl Resource Definitions<a name="cloud-canvas-setting-access-permissions-custom-access-control-resource-definitions"></a>

The `Custom::AccessControl` resource supports the following properties:


****  

| Property | Description | 
| --- | --- | 
| ConfigurationBucket | The name of the project's configuration bucket\. This property must be provided\. | 
| ConfigurationKey | Identifies the location in the configuration bucket where data for the stack operation is stored\. However, the custom resource handler depends on this value changing on each update\. Property changes such as this cause AWS CloudFormation to invoke the custom resource handler on each stack operation\. | 
| ServiceToken | Identifies the Lambda function that is invoked for the custom resource\. This should be the project global ProjectResourceHandler Lambda function that is defined in the project\-template\.json file\. | 

The `DependsOn` attribute of the `Custom::AccessControl` resource definition must list the following resources\.
+ All the resources in the `project-template.json`, `deployment-access-template.json`, or `resource-group-template.json` files that provide permissions metadata\.

   
+ All the `AWS::IAM::Role` resources that have `RoleMapping` metadata\.

   
+ Any custom resources that create implicit roles, such as `Custom::LambdaConfiguration` and `Custom::ServiceApi` resources\.

   

When you use the AWS CLI to manage roles and permissions, these resources are listed for you\. However, if you edit these files yourself, it is important that you maintain these dependencies\. Without these dependencies, the `Custom::AccessControl` resource might be updated before the other resources have been updated\. If this occurs, the `Custom::AccessControl` no longer has access to the latest metadata from the resources, and the changes that were intended might not be made\.

### Setting Access Permissions<a name="cloud-canvas-setting-access-permissions-metadata-link"></a>

For information on setting `Custom::AccessControl` permissions, see [Permissions Metadata for Resource Definitions](permissions-metadata-for-resource-definitions.md)\.