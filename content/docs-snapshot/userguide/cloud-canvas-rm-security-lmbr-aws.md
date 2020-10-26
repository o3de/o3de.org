# Using the Cloud Canvas Command Line to Manage Roles and Permissions<a name="cloud-canvas-rm-security-lmbr-aws"></a>

You can use the `lmbr_aws` command line tool to manage Cloud Canvas Resource Manager access control\. For example, you can use the tool to assume a role when you run a command, or to manage roles, permissions, and role mappings\.

## Assuming a Role<a name="cloud-canvas-rm-security-lmbr-aws-assuming-a-role"></a>

Most `lmbr_aws` commands support an *\-\-assume\-role *<role\-name>** argument\. You can use this argument to assume a role when you run a command\.

If specified, `<role-name>` must be the logical resource ID of an IAM role resource defined in either the `project-template.json` or `deployment-access-template.json` files\.

**Note**  
You should avoid defining roles that have the same name in both files\. If you do, the role from the deployment file takes precedence\.

If you specify a deployment access role, the actual role used depends on the deployment on which the command is operating\. If the `--deployment` argument has been specified, then the specified deployment is used\. If the `--deployment` argument has not been specified and the user has specified a default deployment, the default deployment is used\. If a default deployment has not been specified, the project’s default deployment is used\.

`lmbr_aws` uses your configured AWS credentials to assume the specified role\. See [Configuration](cloud-canvas-command-line.md#cloud-canvas-command-line-configuration) for a description of how the credentials are determined\. The credentials must have permission to assume the role\. For more information, see [Granting a User Permission to Switch Roles](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_permissions-to-switch.html)\.

Before assuming the role, the `lmbr_aws` tool uses credentials to read project configuration data from AWS\. The `ProjectAccess` managed policy in the `project-template.json file` and the `DeploymentAccess` managed policy in the `deployment-access-template.json` file grant the permissions necessary to read this information\. You can attach the corresponding managed policy to any IAM user that works on a project or deployment\.

Note that administrative users created for an AWS account normally have permissions to assume roles and read project configuration\. Administrative users typically have permission to perform any action on any resource owned by an account\.

## Role Management Commands<a name="cloud-canvas-rm-security-lmbr-aws-role-management-commands"></a>

Role management commands manage the [AWS::IAM::Role](cloud-canvas-built-in-roles-and-policies.md) resource definitions in the `project-template.json` and `deployment-access-template.json` files\. After you use these commands to make changes, you must update the project or deployment access stacks for the changes to take effect\. For information about the permissions to perform this action, see [Controlling Access to Resources](cloud-canvas-setting-access-permissions.md)\.

### lmbr\_aws role add<a name="cloud-canvas-rm-security-lmbr-aws-role-add"></a>

Adds an AWS IAM role resource definition to the `project-template.json file` or `deployment-access-template.json` file\.


****  

| Argument | Description | 
| --- | --- | 
| ‑‑role <role‑name> | Required\. The name of the role resource definition\. | 
| ‑‑project | Optional\. When present, specifies that the role resource definition be added to the project\-template\.json file\. Otherwise, the role resource definition is added to the deployment\-access\-template\.json file\. | 

### lmbr\_aws role remove<a name="cloud-canvas-rm-security-lmbr-aws-role-remove"></a>

Removes an AWS IAM role resource definition from the `project-template.json file` or `deployment-access-template.json` file\.


****  

| Argument | Description | 
| --- | --- | 
| ‑‑role <role‑name> | Required\. The name of the role resource definition\. | 
| ‑‑project | Optional\. When present, specifies that the role resource definition be removed from the project\-template\.json file\. Otherwise, the role resource definition is removed from the deployment\-access\-template\.json file\. | 

### lmbr\_aws role list<a name="cloud-canvas-rm-security-lmbr-aws-role-list"></a>

Lists the AWS IAM role definitions in the `project-template.json` and/or `deployment-access-template.json` files\.


****  

| Argument | Description | 
| --- | --- | 
| ‑‑deployment | Optional\. Either \-\-deployment or \-\-project can be specified\. If \-\-deployment is specified, only the roles in the deployment\-access\-template\.json file are listed\. | 
| ‑‑project | Optional\. Either \-\-deployment or \-\-project can be specified\. If \-\-project is specified, only the roles in the project\-template\.json file are listed\. | 

#### Output<a name="cloud-canvas-rm-security-lmbr-aws-role-list-output"></a>

The output is similar to the following example\.

```
Scope      Name
---------- -------------------------------------------
Deployment DeploymentAdmin
Deployment DeploymentOwner
Deployment Player
Deployment PlayerLoginRole
Project    ProjectAdmin
Project    ProjectOwner
Project    PlayerAccessTokenExchangeExecution
Project    ProjectResourceHandlerExecution
```


****  

| Column | Description | 
| --- | --- | 
| Scope | Indicates whether the role is defined in the deployment\-access\-template\.json or project\-template\.json file\. | 
| Name | Shows the resource definition name\. This is the "logical" resource name, not the "physical" resource name which identifies an actual instance of the role\. To see the physical resource names, use the lmbr\_aws project list\-resources or lmbr\_aws deployment list\-resources command\. | 

## Permission Metadata Management<a name="cloud-canvas-rm-security-lmbr-aws-permission-metadata-management"></a>

The permission metadata management commands manage CloudCanvas [`Permissions` metadata](permissions-metadata-for-resource-definitions.md) on resource definitions in the `resource-group-template.json` files\. After you use these commands to make changes, you must update the project or deployment access stacks for the changes to take effect\. For information about the permissions to perform this action, see [Controlling Access to Resources](cloud-canvas-setting-access-permissions.md)\.

### lmbr\_aws permission add<a name="cloud-canvas-rm-security-lmbr-aws-permission-add"></a>

Adds Cloud Canvas `Permissions` metadata to an resource definition in a `resource-group-template.json` file\.


****  

| Argument | Description | 
| --- | --- | 
| ‑‑resource‑group <resource‑group‑name> | Required\. The name of a resource group\. The metadata will be added to a resource definition in that resource group's resource\-group\-template\.json file\. | 
| ‑‑resource <resource‑name> | Required\. The name of the resource definition in the resource\-group\-template\.json file\. | 
| ‑‑role <abstract\-role‑name> | Required\. Identifies the role that is granted the permission\. | 
| ‑‑action <action> \[<action> \.\.\.\] | Required\. The action that is allowed\. You can specify more than one action\. | 
| ‑‑suffix <suffix> \[<suffix> \.\.\.\] | Optional\. A string appended to the resource ARN\. You can specify more than one suffix\. | 

### lmbr\_aws permission remove<a name="cloud-canvas-rm-security-lmbr-aws-permission-remove"></a>

Removes Cloud Canvas `Permissions` metadata from a resource definition in a `resource-group-template.json` file\.


****  

| Argument | Description | 
| --- | --- | 
| ‑‑resource‑group <resource‑group‑name> | Required\. The name of a resource group\. The metadata is removed from a resource definition in the specified resource group's resource\-group\-template\.json file\. | 
| ‑‑resource <resource‑name> | Required\. The name of the resource definition in the resource\-group\-template\.json file\. | 
| ‑‑role <abstract‑role‑name> | Required\. Identifies the roles from which permissions are removed\. | 
| ‑‑action <action> \[<action> \.\.\.\] | Optional\. The action that is removed\. You can specify more than one action\. If not specified, all permissions for the role are removed\. | 
| ‑‑suffix <suffix> \[<suffix> \.\.\.\] | Optional\. A string appended to the resource ARN, which is removed\. You can specify more than one suffix\. | 

### lmbr\_aws permission list<a name="cloud-canvas-rm-security-lmbr-aws-permission-list"></a>

Removes Cloud Canvas `Permissions` metadata from an resource definition in a `resource-group-template.json` file\.


****  

| Argument | Description | 
| --- | --- | 
| ‑‑resource‑group <resource‑group‑name> | Optional\. Lists the metadata from resource definitions in the resource group's resource\-group\-template\.json file\. The default lists permissions from all resource groups\. | 
| ‑‑resource <resource‑name> | Optional\. The name of the resource definition in the resource\-group\-template\.json file\. The default lists metadata from all resource definitions\. | 
| ‑‑role <abstract‑role‑name> | Optional\. Lists metadata for the specified abstract role\. The default lists metadata for all abstract roles\. | 

#### Output<a name="cloud-canvas-rm-security-lmbr-aws-permission-list-output"></a>

The output is similar to the following example\.

```
Resource Group Resource             Resource Type         Roles          Actions                                              ARN Suffixes
-------------- -------------------- --------------------- -------------- ---------------------------------------------------- ------------
DynamicContent ContentBucket        AWS::S3::Bucket       ServiceLambda  s3:GetObject                                         /*
DynamicContent ContentBucket        AWS::S3::Bucket       ContentRequest s3:*                                                 /*
DynamicContent ContentRequest       AWS::Lambda::Function Player         lambda:InvokeFunction
DynamicContent ServiceLambda        AWS::Lambda::Function ServiceApi     lambda:InvokeFunction
DynamicContent StagingSettingsTable AWS::DynamoDB::Table  ServiceLambda  dynamodb:GetItem, dynamodb:Scan, dynamodb:UpdateItem
DynamicContent StagingSettingsTable AWS::DynamoDB::Table  ContentRequest dynamodb:GetItem
```


****  

| Column | Description | 
| --- | --- | 
| Resource Group | Shows the resource group where the permission metadata was found\. | 
| Resource | Shows the name of the resource definition with the metadata\. | 
| Resource Type | Shows the type of the resource definition with the metadata\. | 
| Roles | Shows the abstract roles specified by the permission metadata\. | 
| Actions | Shows the actions specified by the permission metadata\. | 
| ARN Suffixes | Shows the suffix added to the resource ARN, as specified by the permission metadata\. | 

**Tip**  
To see all the resources players have access to through the game client, use the command:

```
lmbr_aws permission list --role Player
```

## Role Mapping Metadata Management<a name="cloud-canvas-rm-security-lmbr-aws-role-mapping-metadata-management"></a>

Role mapping metadata management commands manage CloudCanvas `RoleMappings` metadata on `AWS::IAM:Role` resource definitions in the `project-template.json` and `deployment-access-template.json` files\. After you use these commands to make changes, you must update the project or deployment access stacks for the changes to take effect\. For information about the permissions to perform this action, see [Controlling Access to Resources](cloud-canvas-setting-access-permissions.md)\.

### lmbr\_aws role\-mapping add<a name="cloud-canvas-rm-security-lmbr-aws-role-mapping-add"></a>

Adds Cloud Canvas `RoleMappings` metadata to an AWS IAM role definition in the `project-template.json` or `deployment-access-template.json` file\.


****  

| Argument | Description | 
| --- | --- | 
| ‑‑role <role‑name> | Required\. The name of the role resource definition\. | 
| ‑‑pattern <abstract‑role‑pattern> | Identifies the abstract roles mapped to the role\. Has the form <resource\-group\-name>\.<abstract\-role\-name>, where <resource\-group\-name> can be \*\. | 
| ‑‑allow  | Either \-\-allow or \-\-deny must be specified\. Indicates that the permissions requested for the abstract role are allowed\. | 
| ‑‑deny | Either \-\-allow or \-\-deny must be specified\. Indicates that the permissions requested for the abstract role are denied\. | 
| ‑‑project | Optional\. Indicates that the role definition is in the project\-template\.json file\. The default is for the role definition to be in the deployment\-access\-template\.json file\. | 

### lmbr\_aws role\-mapping remove<a name="cloud-canvas-rm-security-lmbr-aws-role-mapping-remove"></a>

Removes an AWS IAM role resource definition from the `project-template.json file` or `deployment-access-template.json` file\.


****  

| Argument | Description | 
| --- | --- | 
| ‑‑role <role‑name>  | Required\. The name of the role resource definition\. | 
| ‑‑pattern <abstract‑role‑pattern> | Identifies the abstract roles mapped to the role\. Has the form <resource\-group\-name>\.<abstract\-role\-name>, where <resource\-group\-name> can be \*\. | 
| ‑‑project | Optional\. Indicates that the role definition is in the project\-template\.json file\. The default is for the role definition to be in the deployment\-access\-template\.json file\. | 

### lmbr\_aws role\-mapping list<a name="cloud-canvas-rm-security-lmbr-aws-mapping-list"></a>

Lists the AWS IAM role definitions in the `project-template.json` and/or `deployment-access-template.json` files\.


****  

| Argument | Description | 
| --- | --- | 
| ‑‑role <role‑name> | Required\. The role definition with the metadata to list\. The default is to list metadata from all role definitions\. | 
| ‑‑pattern <abstract‑role‑pattern> | The abstract role pattern specified by the metadata listed\. The default is to list metadata with any abstract role pattern\. | 
| ‑‑deployment | Optional\. Either \-\-deployment or \-\-project can be specified\. Lists metadata from role definitions in the deployment\-access\-template\.json file\. The default is to list metadata from role definitions in the project\-template\.json and deployment\-access\-template\.json files\. | 
| ‑‑project | Optional\. Either \-\-deployment or \-\-project can be specified\. Lists metadata from role definitions in the project\-template\.json file\. The default is to list metadata from role definitions in the project\-template\.json and deployment\-access\-template\.json files\. | 

#### Output<a name="cloud-canvas-rm-security-lmbr-aws-mapping-list-output"></a>

The output is similar to the following example\.

```
Scope      Actual Role                     Abstract Role                 Effect
---------- ------------------------------- ----------------------------- ------
Deployment DeploymentAdmin                 *.DeploymentAdmin             Allow
Deployment DeploymentOwner                 *.DeploymentAdmin             Allow
Deployment DeploymentOwner                 *.DeploymentOwner             Allow
Deployment Player                          *.Player                      Allow
Project    ProjectAdmin                    *.ProjectAdmin                Allow
Project    ProjectOwner                    *.ProjectAdmin                Allow
Project    ProjectOwner                    *.ProjectOwner                Allow
```


****  

| Column | Description | 
| --- | --- | 
| Scope | Shows whether the role mapping came from the project\-template\.json or deployment\-access\-template\.json files\. | 
| Actual Role | Shows the name of the role resource definition with the mapping metadata\. | 
| Abstract Role | Shows the abstract roles \(as specified on permission metadata\) that map to the role\. | 
| Effect | Shows whether the permissions requested for the abstract role are allowed or denied\. | 