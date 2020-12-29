# Cloud Canvas Built\-In Roles and Policies<a name="cloud-canvas-built-in-roles-and-policies"></a>

You can use the built\-in Cloud Canvas roles and policies to manage resource and deployment permissions for your project\.

## Built\-In Roles<a name="cloud-canvas-rm-security-roles-policies-roles"></a>

You can use the [AWS::IAM:Role](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-role.html) resource to define roles in your `project-template.json` or `deployment-access-template.json` files\. Cloud Canvas Resource Manager defines the following roles for you\.

### DeploymentAdmin<a name="cloud-canvas-built-in-roles-deploymentadmin"></a>

Grants restricted access to the deployment\. Similar to the `DeploymentOwner` role, but cannot create or delete resource group stacks\. This is a convenience role that is safer than `DeploymentOwner`\. To add additional restrictions to the `DeploymentAdmin` role, edit the `DeploymentAdminRestrictions` policy definition\. 


****  

| Policy Type | Description | 
| --- | --- | 
| Assume role | Can be assumed by principles defined in the same AWS account, as allowed by their permissions\.  | 
| Attached | DeploymentAccess, DeploymentOwnerAccess, and DeploymentAdminRestrictions\. | 
| Inline | Added and removed by the Custom::AccessControl resource handler based on abstract role mappings\. | 

File location: `\project_name\deployment_name\deployment-access-template.json`\.

### DeploymentOwner<a name="cloud-canvas-built-in-roles-deploymentowner"></a>

Grants full access to all the resources in a deployment\. To modify the default permissions granted by this role, edit the `DeploymentOwnerAccess` policy definition\.


****  

| Policy Type | Description | 
| --- | --- | 
| Assume role | Can be assumed by principles defined in the same AWS account, as allowed by their permissions\.  | 
| Attached | DeploymentAccess and DeploymentOwnerAccess\. | 
| Inline | Added and removed by the Custom::AccessControl resource handler based on abstract role mappings\. | 

File location: `\project_name\deployment_name\deployment-access-template.json`\.

**Note**  
Permissions added to `DeploymentOwnerAccess` are also granted to `DeploymentAdmin` unless they are denied by `DeploymentAdminRestrictions`\.

### Player<a name="cloud-canvas-built-in-roles-player"></a>

Grants players limited access to specific resources in a deployment as determined by permissions metadata on those resources\.


****  

| Policy Type | Description | 
| --- | --- | 
| Assume role | Can be assumed by cognito\-identity\.amazonaws\.com\. | 
| Attached | None\. | 
| Inline | Added and removed by the Custom::AccessControl resource handler based on abstract role mappings\. | 

File location: `\project_name\deployment_name\deployment-access-template.json`\.

### ProjectAdmin<a name="cloud-canvas-built-in-roles-projectadmin"></a>

Grants project administrators restricted access to all the project's deployments\. Similar to the `ProjectOwner` role, but cannot create, update, or delete deployments with names that start with "Release\." This is a convenience role that is safer than `ProjectOwner`\. To add additional restrictions to the `ProjectAdmin` role, edit the `ProjectAdminRestrictions` definition\.


****  

| Policy Type | Description | 
| --- | --- | 
| Assume role | Can be assumed by [principals](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_principal.html) defined in the same AWS account, as allowed by their permissions\. | 
| Attached | ProjectAccess, ProjectOwnerAccess, and ProjectAdminRestrictions\. | 
| Inline | Added and removed by the Custom::AccessControl resource handler based on abstract role mappings\. | 

File location: `\project_name\project-template.json`\.

**Warning**  
The intent of this role is to securely "sandbox" user actions so that they don't accidentally impact other projects\. However, anyone who can assume the `ProjectAdmin` role can grant themselves additional permissions\. Because a `ProjectAdmin` user can escalate the privilege for the role, the `ProjectAdmin` role should still be considered an account administrator role and therefore a potential security concern\.

### ProjectOwner<a name="cloud-canvas-built-in-roles-projectowner"></a>

Grants project administrators full access to all the project's resources\. To modify the default permissions granted by this role, edit the `ProjectOwnerAccess` policy definition\.


****  

| Policy Type | Description | 
| --- | --- | 
| Assume role | Can be assumed by [principals](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_principal.html) defined in the same AWS account, as allowed by their permissions\. | 
| Attached | ProjectAccess and ProjectOwnerAccess\.  | 
| Inline | Added and removed by the Custom::AccessControl resource handler based on abstract role mappings\. | 

File location: `\project_name\project-template.json`\.

**Warning**  
The intent of this role is to securely "sandbox" user actions so that they don't accidentally impact other projects\. However, anyone who can assume the `ProjectOwner` role can grant themselves additional permissions\. Because a `ProjectOwner` user can escalate the privilege for the role, the `ProjectOwner` role should still be considered an account administrator role and therefore a potential security concern\.
Permissions added to `ProjectOwnerAccess` are also granted to `ProjectAdmin` unless they are denied by `ProjectAdminRestrictions`\.

### ProjectResourceHandlerExecution<a name="cloud-canvas-built-in-roles-projectresourcehandlerexecution"></a>

Grants the `ProjectResourceHandler` Lambda function runtime execution permissions\. This role grants permissions for Cloud Canvas Resource Manager to use AWS CloudFormation custom resources for stack operations\. For more information, see [Access Scenarios and the ProjectResourceHandler](cloud-canvas-setting-access-permissions.md)\. 


****  

| Policy Type | Description | 
| --- | --- | 
| Assume role | Can be assumed by the AWS Lambda service\. | 
| Attached | None\. | 
| Inline | ProjectAccess\. | 

File location: `\project_name\project-template.json`\.

### Server<a name="cloud-canvas-built-in-roles-server"></a>

Grants Lumberyard dedicated server builds access to select deployment resources, as determined by permissions metadata on those resources\.


****  

| Policy Type | Description | 
| --- | --- | 
| Assume role | Can be assumed by cognito\-identity\.amazonaws\.com\. | 
| Attached | None\. | 
| Inline | Added and removed by the Custom::AccessControl resource handler based on abstract role mappings\. | 

File location: `\project_name\deployment_name\deployment-access-template.json`\.

## Role Scope<a name="cloud-canvas-security-roles-policies-file-scope"></a>

The configuration file in which you define a role determines the resources to which the role provides access\.


****  

| File | Scope | 
| --- | --- | 
| project\-template\.json | Applies to all resources in all resource groups for all deployments\. Only a single instance of the role is created for the entire project\. | 
| deployment\-template\.json | Applies to all resources in all resource groups for a specific deployment\. A separate instance of the role is created for each deployment\. | 

You can use the `lmbr_aws` command line tool to manage the role definitions in the `project-template.json` and `deployment-access-template.json` files\. For more information, see [Using the Cloud Canvas Command Line to Manage Roles and Permissions](cloud-canvas-rm-security-lmbr-aws.md)\.

## Implicit Roles<a name="cloud-canvas-rm-security-roles-policies-implicit-roles"></a>

Some Cloud Canvas custom resources also create roles\. For example, when a Lambda function is executed, it assumes the role that the `Custom::LambdaConfiguration` resource creates\. When API Gateway invokes a Lambda function or accesses other resources, it assumes the role that the `Custom::ServiceApi` resource creates\. Including these custom resources in a `resource-group-template.json` file causes these implicit roles to be created \(and deleted when the resource is deleted\)\. For information on implicit role names, see [Implicit Role Mappings](#cloud-canvas-rm-security-roles-policies-implicit-role-mappings)\.

## Managed Policies<a name="cloud-canvas-rm-security-roles-policies--managed-policies"></a>

You can use `AWS::IAM::ManagedPolicy` resources to define permissions that are shared across any number of roles\. Cloud Canvas defines the following managed policies for you:


****  

| Policy | File | Description | 
| --- | --- | --- | 
| CloudGemPortalUserAccess | project\-template\.json | Grants user\-only access to the Cloud Gem Portal\. Does not grant access to Cloud Gem Portal administrator features like user management or project logs\. | 
| ProjectAccess | project\-template\.json | Defines the permissions needed to access the project and deployment configuration that must be read before a project\-wide role can be assumed\. For more information, see [Assuming a Role](cloud-canvas-rm-security-lmbr-aws.md#cloud-canvas-rm-security-lmbr-aws-assuming-a-role)\. | 
| ProjectOwnerAccess | project\-template\.json | Defines the default permissions granted to the ProjectOwner and ProjectAdmin roles\. | 
| ProjectAdminRestrictions | project\-template\.json | Defines restrictions to the ProjectOwnerAcess policy that apply only to the ProjectAdmin role\. | 
| DeploymentAccess | deployment\-access\-template\.json | Defines the permissions needed to access project and deployment configuration that must be read before a deployment\-specific role can be assumed\. For more information, see [Assuming a Role](cloud-canvas-rm-security-lmbr-aws.md#cloud-canvas-rm-security-lmbr-aws-assuming-a-role)\. | 
| DeploymentOwnerAccess | deployment\-access\-template\.json | Defines the default permissions granted to the DeploymentOwner and DeploymentAdmin roles\. | 
| DeploymentAdminRestrictions | deployment\-access\-template\.json | Defines restrictions to the DeploymentOwnerAccess policy that apply only to the DeploymentAdmin role\. | 

The `ProjectAdmin` and `DeploymentAdmin` roles are granted the same permissions as the `ProjectOwner` and `DeploymentOwner` roles, minus any permissions specifically denied by the `ProjectAdminRestrictions` and `DeploymentAdminRestrictions` managed policies, respectively\. In effect, an "admin" is granted all the permissions of an "owner" minus any special actions that the "admin" should not be able to perform\.

## Role Mapping Metadata<a name="cloud-canvas-rm-security-roles-policies-role-mapping-metadata"></a>

The `AbstractRole` property in the `Permission` metadata object does not directly specify the actual role that receives the described permission\. These values must be mapped to actual IAM roles\. This makes it possible to setup roles in whatever way makes sense for your project\. It also removes the need to modify the permissions defined by individual resource groups\.

The ability to map abstract roles to actual IAM roles is important when you use a cloud gem across multiple projects or from a third party\. Cloud gems acquired from a third party might have roles that are different from the roles that you use in your organization\. \(A cloud gem is a [Lumberyard gem](gems-system-gems.md) that uses the AWS resources defined by a Cloud Canvas Resource Group\. For more information, see [Cloud Gems](cloud-canvas-cloud-gems-intro.md)\.\)

The `Custom::AccessControl` resource looks for CloudCanvas `RoleMappings` metadata on `AWS::IAM::Role` resources to determine which abstract roles map to that physical role\. In the following example, the `CustomerSupport` abstract role from all resource groups is mapped to the `DevOps` physical role\.

```
...
  
"DevOps": {
    "Type": "AWS::IAM::Role",
    "Properties": {
        "Path": { "Fn::Join": [ "", [ "/", { "Ref": "ProjectStack" }, "/", { "Ref": "DeploymentName" }, "/" ]] }
    },
    "Metadata": {
        "CloudCanvas": {
            "RoleMappings": [
                {
                    "AbstractRole": [ "*.CustomerSupport" ],
                    "Effect": "Allow"
                }
            ]
        }
    }
},
 
...
```

Each Cloud Canvas `RoleMapping` metadata object can have the following properties\.


****  

| Property | Description | 
| --- | --- | 
| AbstractRole | Required string or list of strings of the form <resource\-group\-name>\.<abstract\-role\-name>\. To match abstract roles defined in any resource group, use \* for the <resource\-group\-name>\. To match abstract roles defined only in a specific resource group, use an actual resource group name\. | 
| Effect | Required string\. Must be either Allow, to allow an action defined by permission metadata, or Deny to deny an action\. This is used as the [Effect](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements.html#Effect) property in a statement in the policy\. | 

You can use the `lmbr_aws` command line tool to manage `RoleMappings` metadata on role resource definitions in the `project-template.json` and `deployment-access-template.json` files\. For more information, see Using the Cloud Canvas Command Line to Manage Roles and Permissions\.

### Default Role Mappings<a name="cloud-canvas-rm-security-roles-policies-default-role-mappings"></a>

Cloud Canvas defines role mappings for the following roles:


****  

| Role | File | Default Role Mapping | 
| --- | --- | --- | 
| ProjectResourceHandlerExecution | project\-template\.json | none | 
| ProjectOwner | project\-template\.json | \*\.ProjectAdmin \*\.ProjectOwner | 
| ProjectAdmin | project\-template\.json | \*\.ProjectAdmin | 
| DeploymentOwner | deployment\-access\-template\.json | \*\.DeploymentAdmin \*\.DeploymentOwner | 
| DeploymentAdmin | deployment\-access\-template\.json | \*\.DeploymentAdmin | 
| Player | deployment\-access\-template\.json | \*\.Player | 
| Server | deployment\-access\-template\.json | \*\.Server | 

### Implicit Role Mappings<a name="cloud-canvas-rm-security-roles-policies-implicit-role-mappings"></a>

As mentioned in [Implicit Roles](#cloud-canvas-rm-security-roles-policies-implicit-roles), role mappings are automatically defined for the implicit roles created by Cloud Canvas resources like `Custom::LambdaConfiguration`\. These mappings are only used with permission metadata in the same `resource-group-template.json` file as the custom resource that creates the role\. The name of the abstract role used in permission metadata to reference an implicit role depends on the custom resource type\.


****  

| **Resource** | **Implicit Role Name** | 
| --- | --- | 
| Custom::LambdaConfiguration | The name of the Lambda function, as specified by the Function property in the Custom::LambdaConfiguration resource definition\. This is also the logical ID of the AWS::Lambda::Function resource\. | 
| Custom::ServiceApi | The logical ID of the Custom::ServiceApi resource\. | 