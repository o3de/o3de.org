# Cloud Gem Framework Resource Manager Hooks<a name="cloud-canvas-cloud-gem-framework-ccrm-hooks"></a>

The Cloud Canvas Resource Manager ensures that the AWS resources that the game uses match the definitions of those resources in the game's source code\. However, you might need to add functionality to these processes\. For example, for the Dynamic Content Cloud Gem, you must upload any default packages for the project immediately after you create a new deployment\.

The resource manager provides some Python hook modules for cloud gems\. The code for these modules is located in the `resource-manager-code` directory found in the cloud gem's AWS directory \(for example, `\dev\Gems\CloudGemDynamicContent\AWS\resource-manager-code`\)\.

The following modules are supported:
+ `update.py` – Contains functions that are called before and after stack update operations\. For more information, see [Update Hook Functions](#cloud-canvas-cloud-gem-framework-ccrm-hooks-update-hook-functions)\.
+ `command.py` – Contains functions that add new CLI and GUI support to the resource manager\. For more information, see [Command Hook Functions](#cloud-canvas-cloud-gem-framework-ccrm-hooks-command-hook-functions)\.

## Hook Function Parameters<a name="cloud-canvas-cloud-gem-framework-ccrm-hooks-function-parameters"></a>

All hook functions are called with the following:
+ A parameter that represents the hook function
+ Some keyword arguments that are specific to each hook function

The parameter that represents the hook function is a [`HookModule` object](#cloud-canvas-cloud-gem-framework-ccrm-hooks-hookmodule-object)\. The most important property provided by the `HookModule` object is `context`, which is a [Context Object](#cloud-canvas-cloud-gem-framework-ccrm-hooks-context-object)\. The `Context` object gives your hook function access to the Cloud Canvas Resource Manager configuration data for the project\.

### Futureproofing Your Functions<a name="cloud-canvas-cloud-gem-framework-ccrm-hooks-futureproofing-your-functions"></a>

When you write a hook function, always add Python's `**kwargs` construct as the last argument\. That way your function can gracefully accept \(and ignore\) arguments that future versions of resource manager might add after your function is written\.

For example, suppose resource manager passes `arg_a` and `arg_b` arguments to your hook function\. You declare the hook function as follows:

```
def a_hook(hook, arg_a, arg_b, **kwargs)
```

Later, when resource manager adds an `arg_c` argument, your hook function does not break\. Your function still accepts `arg_a` and `arg_b` but can ignore `arg_c` because `arg_c` was passed through the `kwargs` parameter\.

## Cloud Canvas Resource Manager Objects<a name="cloud-canvas-cloud-gem-framework-ccrm-hooks-resource-manager-objects"></a>

Cloud Canvas Resource Manager includes Python objects that you can use to access project configuration data and perform various project operations\.

**Note**  
The source code for these objects is located in the Lumberyard `dev\Tools\lmbr_aws\AWSResourceManager` directory\.

### Context Object<a name="cloud-canvas-cloud-gem-framework-ccrm-hooks-context-object"></a>

The `Context` object has properties that provide access to project configuration and that perform operations such as adding resource definitions to a resource group template\.

You can get a `Context` object instance from the `context` property of the `HookModule` object instance passed to hook functions\.


****  

| Name | Description | 
| --- | --- | 
| aws | An AWSContext object\. | 
| config | A ConfigContext object\. | 
| gem | A GemContext object\. | 
| hooks | A HookContext object\. | 
| resource\_groups | A ResourceGroupContext object\. | 
| stack | A StackContext object\. | 
| view | A ViewContext object\. | 

Other properties or functions of this object are internal to resource manager and should not be used\.

### AWSContext Object<a name="cloud-canvas-cloud-gem-framework-ccrm-hooks-awscontext-object"></a>

The `AWSContext` object has helper functions and properties related to AWS clients and credentials\.

You can get an `AWSContext` object instance from the `aws` property of a `Context` object\.


****  

| `Name` | Description | 
| --- | --- | 
| assume\_role\(logical\_role\_id, deployment\_name\) |  Assumes a role that uses the current AWS credentials\. New clients that were created from the `client` function use the temporary credentials that were created by assuming the role\. These credentials have a 3600 second \(5 minute\) lifetime\. The `logical_role_id` parameter can be the logical name of a `AWS::IAM::Role` resource defined in the `project-template.json` or `deployment-access-template.json` files\. In the case of a role that is defined in the `deployment-access-template.json` file, the `deployment_name` identifies the actual role that will be assumed\.  | 
| client\(service\_name, region=None, use\_role=True\) |  Creates a Python AWS API \(boto3\) client for the specified AWS service\. If `use_role` is `True`, the client uses the credentials that are created when `assume_role` was called\. The returned object is a wrapper around the actual boto3 client object\. The wrapper logs all API call attempts and responses when the `--verbose` option is passed to `lmbr_aws`\. This aids in debugging\. The client wrapper also performs retries with exponential back off\.  | 
| get\_credentials\_file\_path\(\) | Returns the full path to the \.aws/credentials file\. | 
| get\_default\_profile\(\) | Gets the AWS credentials profile name that is used by default when clients are created\. | 
| get\_temporary\_credentials\(logical\_role\_id, deployment\_name, duration\_seconds\) |  Creates temporary credentials by using the current credentials to assume a role\. The `logical_role_id` parameter can be the logical name of a `AWS::IAM::Role` resource defined in the `project-template.json` or `deployment-access-template.json` files\. In the case of a role defined in the `deployment-access-template.json` file, the `deployment_name` identifies the actual role that will be assumed\. The return value is a Python `dict` with the following properties: `AccessKeyId` `SecretAccessKey` `SessionToken`  | 
| load\_credentials\(\) | Returns an AWSCredentials object that contains the data read from the \.aws/credentials file\. | 
| profile\_exists\(profile\_name\) | Determines whether the specified profile exists in the \.aws/credentials file\. | 
| save\_credentials\(credentials\) | Saves a modified AWSCredentials object into the \.aws/credentials file\. | 
| session | The boto3 session object that is used by client\(\)\. | 
| set\_default\_profile | Sets the AWS credentials profile that is used when clients are created\. This resets the session property\. | 

Other properties or functions of this object are internal to resource manager and should not be used\.

### AWSCredentials Object<a name="cloud-canvas-cloud-gem-framework-ccrm-hooks-awscredentials-object"></a>

The `AWSCredentials` object contains AWS credential information that is read from the `.aws/credentials` file\. This is essentially a wrapper around a Python `ConfigParser` object\. The `AWSCredentials` object handles the AWS credential file's use of the `default` section, which conflicts with how `ConfigParser` handles defaults\.

To get an `AWSCredentials` object instance, use the `load_credentials` function on an `AWSContext` object\.


****  

| Name | Description | 
| --- | --- | 
| add\_section\(section\_name\) | Adds a section\. | 
| get\(section\_name, option\_name\) | Gets the value of an option in a section\. | 
| has\_option\(section\_name, option\_name\) | Determines whether an option exists in a section\. | 
| has\_section\(section\_name\) | Determines whether a section exists\. | 
| items\(section\_name\) | Returns a list of name value pairs of the options in a section\. | 
| options\(section\_name\) | Returns a list of options in a section\. | 
| read\(path\) | Reads credentials from a file with the specified path\. | 
| remove\_option\(section\_name, option\_name\) | Removes an option from a section\. | 
| remove\_section\(section\_name\) | Removes a section\. | 
| sections\(\) | Returns a list of section names\. Each profile is represented by a section\. | 
| set\(section\_name, option\_name, value\) | Sets an option value\. | 
| write\(path\) | Writes credentials to a file with the specified path\. | 

Other properties or functions of this object are internal to resource manager and should not be used\.

### ConfigContext Object<a name="cloud-canvas-cloud-gem-framework-ccrm-hooks-configcontext-object"></a>

The `ConfigContext` object has properties and functions that provide access to project and deployment configuration data\.

You can get a `ConfigContext` object instance from the `config` property of a `Context` object\.


****  

| Name | Description | 
| --- | --- | 
| aws\_directory\_path  | The full path to the currently enabled game project \(as determined by the bootstrap\.cfg file or options passed to lmbr\_aws\)\. | 
| base\_resource\_group\_directory\_path | The directory where resource groups that are defined by the project \(as opposed to those defined by gems\) are located\. This is typically the resource\-group subdirectory that is found in the directory identified by aws\_directory\_path\. | 
| clear\_user\_default\_deployment\(\) | Clears the default deployment setting\. | 
| clear\_user\_default\_profile\(\) | Clears the default AWS credentials profile name\. This does not update the \.aws/credentials file\. The name of the default profile is saved in the Cloud Canvas Resource Manager's user settings file\. | 
| configuration\_bucket\_name | The name of the project's Configuration Amazon S3 bucket\. | 
|  `copy_default_lambda_function_content` `(destination_path)`  | Copies the default Lambda function content to the specified location\. | 
| copy\_default\_project\_content\(destination\_path\) | Copies the content from the default project AWS directory to the specified location\. | 
| copy\_default\_resource\_group\_content\(destination\_path\) | Copies the content from the default resource group to the specified location\. | 
| copy\_example\_resource\_group\_content\(destination\_path\) | Copies the content from the example resource group to the specified location\. | 
| default\_deployment | The name of the deployment that is the default for the current user if a default name has been specified\. If a default has been specified, the value is that of user\_default\_deployment; otherwise, it is that of project\_default\_deployment\. | 
| deployment\_access\_template | A Python object that contains the content of the deployment access template file\. | 
| deployment\_access\_template\_path | The full path to the project's deployment\-access\-template\.json file\. | 
| deployment\_names | A list that contains the names of the project's deployments\. | 
| deployment\_stack\_exists\(deployment\_name\) | Determines whether a deployment stack exists\. | 
| finalize\_deployment\_stack\_ids\(deployment\_name\) | Commits the pending deployment and deployment access stack IDs as the deployment's actual stack IDs\. See set\_pending\_deployment\_stack\_id and set\_pending\_deployment\_access\_stack\_id\. | 
| game\_directory\_path  | The full path to the currently enabled game project \(as determined by the bootstrap\.cfg file or the options that are passed to lmbr\_aws\)\. | 
| gem\_directory\_path  | The full path to the directory where gems are defined\. This is the Gems subdirectory of the directory identified by root\_directory\_path\. | 
| get\_default\_deployment\_stack\_name\(deployment\_name\) | Gets the default stack name for a deployment with the specified name\. | 
| get\_deployment\_access\_stack\_id\(deployment\_name, optional=False\) | Gets the ARN of a deployment access stack\. If the specified deployment stack doesn't exist, raises a HandledError or returns None if optional is True\. | 
| get\_deployment\_stack\_id\(deployment\_name, optional=False\) | Gets the ARN of a deployment stack\. If the specified deployment stack doesn't exist, raises a HandledError or returns None if optional is True\. | 
| get\_game\_directory\_name\(\) | Gets the name of the game directory from the bootstrap\.cfg file\. | 
| get\_project\_stack\_name\(\) | Gets the name of the project stack\. | 
| get\_protected\_depolyment\_names\(\) | Returns a list of the protected deployment names\. For more information, see protect\_deployment and unprotected\_deployment\. | 
| get\_resource\_group\_stack\_id\(deployment\_name, resource\_group\_name, optional=False\) | Gets the ARN of a resource group stack\. If the specified resource group stack doesn't exist, raises a HandledError or returns None if optional is True\. | 
| local\_project\_settings\_path | Full path to the file that stores project's settings that are kept in a source\-controlled file \(as opposed to project settings stored in AWS\)\. Typically, this is the local\-project\-settings\.json file in the directory that is identified by aws\_directory\_path\. | 
| no\_prompt | When True, specifies that the \-\-no\-prompt option was passed to lmbr\_aws\. This option is typically used when calling lmbr\_aws from scripts\. When this option is set, the hook function should raise an error instead of prompting the user\. | 
| project\_code\_path | The path to the project's project\-code directory\. | 
| project\_default\_deployment | The name of the deployment that has been designated as the default for the project, if any\. See also user\_default\_deployment and default\_deployment\. | 
| project\_initialized | True if the project has been initialized and project\_stack\_id has a value; False otherwise\. | 
| project\_resource\_handler\_id | The ARN of the ProjectResourceHandler Lambda function\. Cloud Canvas–defined resource templates require that this value be provided as the ProjectResourceHandler parameter value\. | 
| project\_settings | A ProjectSettings object that contains project settings that are loaded from AWS \(as opposed to the content of local\_project\_settings\)\. | 
| project\_stack\_id | The project stack ID, if the project stack has been created\. | 
| project\_template | A Python object that contains the content of the project template file\. | 
| project\_template\_path | The full path to the project's project\-template\.json file\. | 
| protect\_deployment\(deployment\_name\) | Marks a deployment as protected\. It requires special confirmation before you can connect debug builds of the game to protected deployments\. See also unprotect\_deployment and get\_protected\_deployment\_names\. | 
| refresh\_user\_settings\(\) | A function that reloads the user\_settings object from the user settings file\. | 
| release\_deployment | The name of the deployment that has been designed as the release deployment of the project\. | 
| remove\_deployment\(deployment\_name\) | Removes a deployment from the project's configuration\. | 
| root\_directory\_path  | The full path to the Lumberyard root directory \(the \\dev directory\), which contains project\-specific directories\. | 
| save\_deployment\_access\_template\(\) | Saves the current deployment\_access\_template object to the project's deployment\-access\-template\.json file\. | 
| save\_deployment\_template\(\) | Saves the current deployment\_template object to the project's deployment\-template\.json file\. | 
| save\_project\_template\(\) | A function that saves the current project\_template object to the project's project\-template\.json file\. | 
| set\_pending\_deployment\_access\_stack\_id\(deployment\_name, deployment\_access\_stack\_id\) | Sets the ID for a deployment access stack that is being created\. For more information, see finalize\_deployment\_stack\_ids and set\_pending\_deployment\_stack\_id\. | 
| set\_pending\_deployment\_stack\_id\(deployment\_name, deployment\_stack\_id\) | Sets the ID for a deployment stack that is being created\. For more information, see finalize\_deployment\_stack\_ids and set\_pending\_deployment\_access\_stack\_id\. | 
| set\_project\_default\_deployment\(deployment\_name\) | Sets the default deployment for the project\. Overridden by the value for user's default deployment if one is specified\. | 
| set\_release\_deployment\(deployment\_name\) | Sets the release deployment for the project\. | 
| set\_user\_default\_deployment\(deployment\_name\) | Sets the default deployment for the user\. After it is set, overrides the project default deployment\. | 
| set\_user\_default\_profile\(profile\_name\) | Sets the user's default AWS credentials profile\. This does not update the user's \.aws/credentials file; the name of the default profile is saved in the Cloud Canvas Resource Manager's user settings file\. | 
| unprotect\_deployment\(deployment\_name\) | Reverses the action of protect\_deployment\. | 
| user\_default\_deployment | The name of the deployment that has been designated as the default by the current user\. For more information, see project\_default\_deployment and default\_deployment\. | 
| user\_default\_profile | The user's default AWS profile name as read from user settings\. | 
| user\_directory\_path | The full path to the user directory in the Lumberyard cache directory\. This is where user\-specific configuration is stored\. | 
| user\_settings  | A Python object that contains the contents of the user settings file\. | 
| user\_settings\_path  | The full path to the JSON format text file that resource manager uses to store user\-specific configuration\. This configuration includes default deployment and AWS credentials profile names\. This path is typically the user\-settings\.json file in the directory specified by user\_directory\_path\. | 

Other properties or functions of this object are internal to resource manager and should not be used\.

### Gem Object<a name="cloud-canvas-cloud-gem-framework-ccrm-hooks-gem-object"></a>

The `Gem` object provides access to gem\-specific configuration data\. To get `Gem` object instances, use the `enabled_gems` property of a `GemContext` object\.


****  

| Name | Description | 
| --- | --- | 
| aws\_directory | The full path to the gem's AWS directory\. | 
| aws\_directory\_exists | True if the gem's AWS directory exists\. | 
| display\_name | The gem display name\. | 
| file\_object | A Python object that contains the contents of the gem's gem\.json file\. | 
| name | The name of the gem\. | 
| project\_resources | Project resource definitions that are inserted into the project's stack template before the template is uploaded\. These definitions are read from a project\-template\.json file in the gem's AWS directory\. | 
| resource\_group\_name | The gem's resource group name, if any\. A gem has a resource group name only if it has a resource\-template\.json file\. | 
| root\_directory | The full path to the gem's directory\. | 
| uuid | The unique ID of the gem\. | 

Other properties or functions of this object are internal to the resource manager and should not be used\.

### GemContext Object<a name="cloud-canvas-cloud-gem-framework-ccrm-hooks-gemcontext-object"></a>

The properties and methods of the `GemContext` object provide access to the project's gem configuration\.

You can get a `GemContext` object instance using the `gems` property of a `Context` object\.


****  

| Name | Description | 
| --- | --- | 
| enabled\_gems | A list containing a gem object for each gem that is enabled for the project\. | 
| get\_by\_resource\_group\_name\(resource\_group\_name\) | Returns the gem object associated with the specified resource group, or None if the resource group doesn't exist or isn't associated with a gem\. By default the resource group name is the same as the gem name, but a ResoruceGroupAlias property can be put in the gem's gem\.json file to override this default\. | 

Other properties or functions of this object are internal to resource manager and should not be used\.

### HandledError Object<a name="cloud-canvas-cloud-gem-framework-ccrm-hooks-handlederror-object"></a>

A `HandledError` object is Python `Exception` object\. You can use it in a hook function to cause an expected error to be displayed without producing a stack trace\. In general, the resource manager considers other kinds of exceptions to be unexpected errors and might show additional debug information that users should not see for expected errors\.

The **HandledError** class is defined in the `AWSResourceManager.errors` module \(`\dev\Tools\lmbr_aws\AWSResourceManager\errors.py`\)\. To create an instance, see the following example\.

```
from AWSResourceManager.errors import HandledError

def my_function():
    if something_is_wrong:
        raise HandledError('Something is wrong.')
```

### HookModule Object<a name="cloud-canvas-cloud-gem-framework-ccrm-hooks-hookmodule-object"></a>

The first argument \(and the only positional argument\) passed to a hook function is a `HookModule` object that represents the hook module itself\. This object's properties give you access to project configuration data\.


****  

| Name | Description | 
| --- | --- | 
| context  | Provides access to a Context object\. | 
| hook\_name  | The name of the cloud gem that defines the hook module\. | 
| hook\_path  | The full path to the cloud gem's AWS directory where the hook module is defined\. | 

Other properties or functions of this object are internal to resource manager and should not be used\.

### HookContext Object<a name="cloud-canvas-cloud-gem-framework-ccrm-hooks-hookcontext-object"></a>

The `HookContext` object provides functionality for working with Cloud Canvas Resource Manager hooks\.

You can get a `HookContext` object instance from the `hooks` property of the `Context` object\.


****  

| Name | Description | 
| --- | --- | 
| call\_module\_handlers\(module\_name, handler\_name, args=\(\), kwargs=\{\}, deprecated=False\) | Calls the hook function identified by handler\_name in the module identified by module\_name\. Use the kwargs parameter to pass keyword arguments to the handler function\. The args parameter can only be used if deprecated is True\. If deprecated is True, a warning regarding the deprecated function is displayed\. | 
| call\_single\_module\_handler\(module\_name, handler\_name, defining\_module\_name, args=\(\), kwargs=\{\}, deprecated=False\) | Calls a hook function defined by the gem or resource group that is specified by the defining\_module\_name parameter\. For a description of the other parameters, see call\_module\_handlers\. | 

Other properties or functions of this object are internal to resource manager and should not be used\.

### ProjectSettings Object<a name="cloud-canvas-cloud-gem-framework-ccrm-hooks-projectsettings-object"></a>

The `ProjectSettings` object manages the project configuration data that is stored in the `project-settings.json` file in the project's Amazon S3 `Configuration` bucket\.


****  

| Name | Description | 
| --- | --- | 
| get\_deployment\(deployment\_name\) |  Returns the configuration dictionary for the specified deployment\. The dictionary contains the following keys: `DeploymentStackId` – The ARN of the deployment stack\. `DeploymentAccessStackId` – The ARN of the deployment access stack\. `resource-group` – The resource group configuration dictionary for the deployment\. For a description of this value, see `get_resource_group_settings`\.  | 
| get\_deployments\(\) | Returns the entire configuration dictionary for deployments\. The deployment name is the key\. The special deployment name \*, which contains settings for all deployments, can be present\. For a description of the value dictionary, see get\_deployment\. | 
| get\_project\_default\_deployment\(\) | Returns the default deployment for the project\. | 
| get\_release\_deployment\(\) | Returns the release deployment for the project\. | 
| get\_resource\_group\_settings\(deployment\_name\) |  Returns a dictionary containing the resource group configuration for the specified deployment\. The resource group name is the key\. The special resource group name `*`, which contains settings for all resource groups, can be present\. Each value is a dictionary with the following key: `parameter` – A dictionary containing parameter values for the resource group template\.  | 
| remove\_deployment\(deployment\_name\) | Removes the configuration for the specified deployment name\. To commit this change, call save\. | 
| remove\_project\_default\_deployment\(\) | Clears the default deployment for the project\. To commit this change, call save\. | 
| remove\_release\_deployment\(\) | Clears the release deployment for the project\. To commit this change, call save\. | 
| save\(\) | Saves the current configuration to the Amazon S3 bucket\. | 
| set\_project\_default\_deployment\(deployment\_name\) | Sets the default deployment for the project\. To commit this change, call save\. | 
| set\_release\_deployment\(deployment\_name\) | Sets the release deployment for the project\. To commit this change, call save\. | 

Other properties or functions of this object are internal to resource manager and should not be used\.

### ResourceGroup Object<a name="cloud-canvas-cloud-gem-framework-ccrm-hooks-resourcegroup-object"></a>

The `ResourceGroup` object encapsulates a resource group's configuration\. If multiple resource group stacks for a given resource group exist, each resource group stack is associated with a single deployment\.

To get `ResourceGroup` object instances, use a `ResourceGroupContext` object\.


****  

| Name | Description | 
| --- | --- | 
| add\_output\(logical\_id, description, value, force=False\) | Adds an output value to the resource group's resource template\. If force is False, an existing output that has the same name is not replaced but is replaced if force is True\. To save the changes, call save\_template\. Returns True if outputs are added\. | 
| add\_parameters\(parameter\_definitions, force=False\) | Adds parameter definitions to the resource group's resource template\. The parameter\_definitions parameter is a dictionary that is merged into the parameter definitions in the template\. If force is False, existing definitions are not replaced but are replaced if force is True\. To save the changes, call save\_template\. Returns True if parameter definitions are added\. | 
| add\_resources\(resource\_definitions, force=False, dependencies=None\) |  Adds resource definitions to the resource group's resource template\. The `resource_definitions` parameter is a dictionary that is merged into the template's current `Resources` object value\. If `force` is `False`, existing definitions are not be replaced but are replaced if `force` is `True`\. The `dependencies` parameter can be a dictionary that specifies a list of values that are added to the existing resources `DependsOn` list\. New resources are always added to the `AccessControl` resource's `DependsOn` list even if the `dependencies` parameter is not specified\. To save the changes, call `save_template`\. Returns `True` if resource definitions are added\.  | 
| copy\_directory\(source\_path, relative\_destination\_path='\.', force=False\) | Copies the contents of a specified directory into the resource group's directory\. If a value for relative\_destination\_path is specified, the content is written into the specified subdirectory in the resource group directory\. If force is False, existing files are not replaced, but are replaced if force is True\. Returns True if any files are copied\. | 
| copy\_file\(source\_path, relative\_destination\_path, force=False\) | Copies a file to the resource group directory\. The relative\_destination\_path parameter can contain the destination file name or a destination path and file name\. If force is False, existing files are not replaced but are replaced if force is True\. Returns True if the file is copied\. | 
| create\_file\(relative\_destination\_path, initial\_content, force=False\) | Creates a file in the resource group directory\. The relative\_destination\_path parameter can contain the destination file name or a destination path and file name\. The initial\_content parameter should contain the initial text content for the file\. If force is False, existing files are not replaced but are replaced if force is True\. Returns True if the file is created\. | 
| directory\_path | The full path to the resource group directory\. | 
| game\_cpp\_code\_path | The full path to the directory where the C\+\+ code associated with the resource group should be written\. This parameter is used when service API client code is generated\. | 
| get\_pending\_resource\_status\(deployment\_name\) | Gets a dictionary that describes the resource group's pending resource status\. The status is determined by comparing the configured resource definitions, Lambda code, and parameter values to the current definitions, code, and values\. | 
| get\_stack\_id\(deployment\_name, optional=False\) | Gets the resource group's stack ID for the specified deployment\. If no stack exists for the resource group, raises a HandledError or returns None if optional is True\. | 
| get\_stack\_parameters\(deployment\_name, uploader\) | Get stack parameter for the specified deployment\. The uploader parameter must be an Uploader object, which is used to determine the values for the ConfigurationBucket and ConfigurationKey parameters\. | 
| get\_template\_with\_parameters\(deployment\) | Returns a Python object that contains the contents of the resource group's resource\-template\.json file\. The template's default parameter values are set according to the parameter configuration for the specified deployment\. | 
| is\_gem | True if the resource group is defined by a gem; False if the resource group is defined in the project's resource\-group directory\. | 
| name | The name of the resource group\. | 
| remove\_output\(logical\_id\) | Removes an output value from the resource group's resource template\. Returns True if the output value existed and was removed\. To save the changes, call save\_template\. | 
| remove\_parameters\(parameter\_names\) | Removes parameter definitions from the resource group's resource template\. The parameter\_names parameter must be a list of the names of the parameters to remove\. Returns True if the parameter definitions are removed\. | 
| remove\_resources\(resource\_names\) | Removes resource definitions from the resource group's resource template\. The resource\_names parameter must be a list of the logical names of the resources to remove\. Returns True if the resource definitions are removed\. To save the changes, call save\_template\. | 
| save\_template\(\) | Saves the current value of the template property to the resource group's resource\-template\.json file\. | 
| template | A Python object that contains the content of the resource group's resource\-template\.json file\. | 
| template\_path | The full path to the resource group's resource\-template\.json file\. | 

Other properties or functions of this object are internal to resource manager and should not be used\.

### ResourceGroupContext Object<a name="cloud-canvas-cloud-gem-framework-ccrm-hooks-resourcegroupcontext-object"></a>

The `ResourceGroupContext` object provides access to resource group configuration data\. To get a `ResourceGroupContext` object, use the `resource_groups` property of the `Context` object\.


****  

| Name | Description | 
| --- | --- | 
| get\(name, optional=False\) | Returns a ResourceGroup object for the specified resource group\. If the resource group doesn't exist, raises a HandledError or none if optional is True\. | 
| keys\(\) | Returns the names of the resource groups in a list\. | 
| values\(\) | Returns a list of ResourceGroup objects\. | 

Other properties or functions of this object are internal to resource manager and should not be used\.

### StackContext Object<a name="cloud-canvas-cloud-gem-framework-ccrm-hooks-stackcontext-object"></a>

The `StackContext` object provides a number of helper functions that are useful when working with AWS CloudFormation stacks\. To get a `StackContext` object instance, use the `stack` property of the `Context` object\.


****  

| Name | Description | 
| --- | --- | 
| confirm\_stack\_operation\(stack\_id, stack\_description, args, pending\_resource\_status, ignore\_resource\_types = \[\]\) |  Displays pending changes and a confirmation prompt for the pending stack operation\. The `args` parameter should be the parsed command line arguments for the command\. It is used to avoid displaying prompts if the necessary `--confirm-...` options are provided\. The `ignore_resource_types` parameter is a list of resource types that are not included in the list of changes shown to the user\. This parameter filters changes to the `Custom::EmptyDeployment` resource\.  | 
| create\_using\_template\(stack\_name, template\_body, region, created\_callback=None, capabilities=\[\]\) | Uses the provided template to start a stack creation operation\. Displays stack events until the create operation is complete\. If the value for created\_callback is not None, the value must be a called function that has the created stack ID as its only parameter\. | 
| create\_using\_url\(stack\_name, template\_url, region, parameters=None, created\_callback=None, capabilities=\[\]\) | Uses a template identified by a URL to start a stack creation operation\. Displays stack events until the create operation is complete\. If the value for created\_callback is not None, the value must be a called function that has the created stack ID as its only parameter\. | 
| delete\(stack\_id, pending\_resource\_status=None\) |  Starts a stack delete operation and displays stack events until the delete operation is complete\. If provided, the `pending_resource_status` parameter specifies the resources to be deleted from an Amazon S3 bucket in preparation for deletion of the bucket itself\. To retrieve a value for this parameter, use the `get_pending_resource_status` function on a `ResourceGroup` object, or use the `get_pending_resource_status` function on the `StackContext` object\. Preparing an S3 bucket for deletion deletes all the objects from the bucket unless the bucket specifies a `DeletionPolicy` property value of `Retain`\.  | 
| describe\_resources\(stack\_id, recursive=True, optional=False\) |  Uses the AWS CloudFormation `describe_stack_resources` API to return a description of a stack's resources\. The content of the `StackResources` structure is converted to a dictionary keyed on the resource's logical ID\. If `recursive` is `True`, the descriptions of the resources in the nested stacks are also returned\. In this case the resource's logical ID has the form *<nested\-stack\-logical\-id>*\.*<nested\-resource\-logical\-id>*\. If the stack does not exist, a `HandledError` is raised if `optional` is `False`\. Otherwise, an empty dictionary is returned\.  | 
| describe\_stack\(stack\_id, optional=False\) | Returns a dictionary that contains the data returned by a call to the AWS CloudFormation describe\_stacks API\. If the stack does not exist, raises a HandledError or returns None if optional is True\. | 
| get\_current\_parameters\(stack\_id\) | Gets a stack's current AWS CloudFormation template parameter values\. | 
| get\_current\_template\(stack\_id\) | Gets a Python object that contains the stack's current AWS CloudFormation template\. | 
| get\_pending\_resource\_status\(stack\_id, new\_template=\{\}, new\_parameter\_values=\{\}, new\_content\_paths=\{\}\) |  Gets a dictionary that describes a stack's pending resource status\. The status is determined by comparing the configured resource definitions, Lambda code, and parameter values to the current definitions, code, and values\. The `new_template` parameter is the resource definition template to which the stack's current template will be compared\. The `new_parameter_values` parameter is a dictionary of parameter values that will be compared to the stack's current parameter values\. The `new_content_paths` parameter is a dictionary that maps logical resource names to a list of full directory or file paths\. The paths specify where content related to each resource is stored\. A resource has pending update status if any of these files have changed since the last resource status update\.  | 
| get\_physical\_resource\_id\(stack\_id, logical\_resource\_id, expected\_type=None, optional=False\) | Gets the physical ID of a resource in the specified stack\. If expected\_type is specified, the resource type is verified to be that type\. If the type returned is not the type specified, raises a HandledError\. If the specified resource does not exist, raises a HandledError or returns None if optional is True\. | 
| get\_resource\_arn\(stack\_id, logical\_resource\_id\) | Gets the ARN for a resource in the specified stack\. | 
| get\_stack\_status\(stack\_id\) | Gets status information for the stack\. This function calls the AWS CloudFormation describe\_stacks API and returns the StackStatus property of the first entry in the Stacks array of the response\. | 
| id\_exists\(stack\_id\) | Determines whether a stack with the specified ID \(ARN\) exists\. | 
| name\_exists\(stack\_name, region\) | Determines whether a stack with the specified name exists in the specified region\. | 
| update\(stack\_id, template\_url, parameters=\{\}, pending\_resource\_status=\{\}, capabilities=\{\}\) |  Starts a stack update operation and displays stack events until the update operation is complete\. If provided, the `pending_resource_status` parameter specifies the resources to be deleted from an S3 bucket in preparation for deletion of the bucket itself\. To retrieve a value for this parameter, use the `get_pending_resource_status` function on a `ResourceGroup` object\. Or use the `get_pending_resource_status` function on the `StackContext` object\. Preparing an S3 bucket for deletion deletes all the objects from the bucket unless the bucket specifies a `DeletionPolicy` property value of `Retain`\.  | 

Other properties or functions of this object are internal to resource manager and should not be used\.

### ViewContext Object<a name="cloud-canvas-cloud-gem-framework-ccrm-hooks-viewcontext-object"></a>

The `ViewContext` object contains methods that produce Cloud Canvas Resource Manager output messages\. Hook functions typically do not require these functions\. For more information, see the source code for this object\.

### Uploader Object<a name="cloud-canvas-cloud-gem-framework-ccrm-hooks-uploader-object"></a>

You can use an `Uploader` object function to upload content to the project global area of the project's `Configuration` bucket\. You pass `Uploader` object instances to the hook functions `before_project_update`, `after_project_update`, `before_resource_group_update`, and `after_resoruce_group_update`\.


****  

| Name | Description | 
| --- | --- | 
| context | The current Context object\. | 
| bucket | The name of the project's Configuration bucket\. | 
| key | The object name prefix that is used when naming uploaded objects\. | 
| upload\_content\(name, content, description\) | Uploads the specified content using key \+ '/' \+ name as the object name\. A description of the upload is shown to the user\. | 
| upload\_file\(name,path\) | Uploads a file using key \+ '/' \+ name as the object name\. | 
| upload\_dir\(name, path, alternate\_root = None\) | Uses key \+ '/' \+ name as the base object name to recursively upload the contents of a directory\. If alternate\_root is not None, the value specified is used as the object name prefix instead of key\. | 
| zip\_and\_upload\_directory\(directory\_path, file\_name=None, aggregated\_directories=None, aggregated\_content=None\) |  Recursively compresses the contents of a directory into a `.zip` file\. It uses *key* \+ '/' \+ *directory\-name*\.zip as the object name to upload the file\. The `directory-name` is the name of the directory at the end of `directory_path`\. You can use the `file_name` argument to override the *directory\-name*\.zip part of the object name\. The `aggregated_directories` argument can be an optional dictionary that specifies the paths of additional directories whose contents are included in the `.zip` file\. The keys are the path location in the `.zip` file where the content is put\. The `aggregated_content` argument can be a dictionary that contains additional content to include in the `.zip` file\. The keys are the path location in the `.zip` file where the content is put\.  | 

## Update Hook Functions<a name="cloud-canvas-cloud-gem-framework-ccrm-hooks-update-hook-functions"></a>

Update hooks are implemented in a cloud gem's `Gem\<gem-name>\AWS\resource-manager-code\update.py` file\. If update hooks are defined in the module, the resource manager uses the parameters that are described in the [Hook Function Parameters](#cloud-canvas-cloud-gem-framework-ccrm-hooks-function-parameters) section to call the following functions\.

### after\_project\_updated<a name="cloud-canvas-cloud-gem-framework-ccrm-hooks-after-project-updated-hook-function"></a>

The `after_project_updated` hook function is called after a project stack update operation finishes successfully\.


****  

| Parameter | Description | 
| --- | --- | 
| project\_uploader | An Uploader object that you can use to upload additional data\. | 

### after\_resource\_group\_updated<a name="cloud-canvas-cloud-gem-framework-ccrm-hooks-after-resource-group-updated-hook-function"></a>

The `after_resource_group_updated` hook function is called after a resource group stack update operation finishes successfully\.


****  

| Parameter | Description | 
| --- | --- | 
| deployment\_name | The name of the deployment that was updated\. | 
| resource\_group\_name | The name of the resource group that was updated\. | 
| resource\_group\_uploader | An Uploader object that you can use to upload additional data\. | 

### before\_project\_updated<a name="cloud-canvas-cloud-gem-framework-ccrm-hooks-before-project-updated-hook-function"></a>

The `before_project_updated` hook function is called before a project stack update operation begins\.


****  

| Parameter | Description | 
| --- | --- | 
| project\_uploader | An Uploader object that you can use to upload data for the operation\. | 

### before\_resource\_group\_updated<a name="cloud-canvas-cloud-gem-framework-ccrm-hooks-before-resource-group-updated-hook-function"></a>

The `before_resource_group_updated` hook function is called before a resource group stack update operation begins\.


****  

| Parameter | Description | 
| --- | --- | 
| deployment\_name | The name of the deployment being updated\. | 
| resource\_group\_name | The name of the resource group being updated\. | 
| resource\_group\_uploader | An Uploader object that can be used to upload additional data\. | 

### gather\_writable\_check\_list<a name="cloud-canvas-cloud-gem-framework-ccrm-hooks-gather-writable-check-list-hook-function"></a>

The `gather_writable_check_list` hook function is called before an update operation to gather a list of writable files\. If any of the local files to be updated are read\-only, the resource manager gives the user an opportunity to make the files writable \(for example, with a source control system\)\.


****  

| Parameter | Description | 
| --- | --- | 
| check\_list | A list of the full paths of writeable files\. | 

## Command Hook Functions<a name="cloud-canvas-cloud-gem-framework-ccrm-hooks-command-hook-functions"></a>

If the following command line hook functions exist in a module, they are defined in a cloud gem's `Gem\<gem-name>\AWS\resource-manager-code\command.py` file\. The resource manager uses the parameters in the [Hook Function Parameters](#cloud-canvas-cloud-gem-framework-ccrm-hooks-function-parameters) section to call the following functions\.

### add\_cli\_commands<a name="cloud-canvas-cloud-gem-framework-ccrm-hooks-add-cli-commands-hook-function"></a>

Adds additional commands to the command line parser\. Called before command line argument parsing\. Cloud Canvas Resource Manager uses the Python [https://docs.python.org/3/library/argparse.html](https://docs.python.org/3/library/argparse.html) module for command line parsing\. All commands are grouped into a number of different subparsers\. For example, the commands `lmbr_aws project list-resources` and `lmbr_aws deployment list` contain the subparsers `project` and `deployment`, which define a `list-resources` and `list` command, respectively\.


****  

| Parameter | Description | 
| --- | --- | 
| subparsers | The subparser collection object returned by the argparse add\_subparsers function\. Use the hook function to add a subparser to the collection\. Then, add the commands to the subparser\. | 
| add\_common\_args |  Adds a set of common arguments to a command\. This function adds the following arguments\. For a description of these arguments, see [Using the Cloud Canvas Command Line](cloud-canvas-command-line.md)\. `--aws-access-key` `--aws-secret-key` `--profile` `--assume-role` `--root-directory` `--game-directory` `--aws-directory` `--user-directory` `--verbose` `--no-prompt` The common arguments are processed by `lmbr_aws`\. The hook does not typically process these options\. This function can take the following parameters: `parser` – The `argparse` defined parser object to which the arguments are added\. `no_assume_role` – `True` specifies that the `--assume-role` common argument is not added; `False` specifies that it is\.  | 

### add\_cli\_view\_commands<a name="cloud-canvas-cloud-gem-framework-ccrm-hooks-add-cli-view-commands-hook-function"></a>

Adds additional methods to the `ViewContext` object\. Called before other command line commands\.


****  

| Parameter | Description | 
| --- | --- | 
| view\_context | A ViewContext object\. | 

### add\_gui\_commands<a name="cloud-canvas-cloud-gem-framework-ccrm-hooks-add-gui-commands-hook-function"></a>

Adds commands to the Cloud Canvas Resource Manager in Lumberyard Editor\. When the resource manager window is first opened, Lumberyard Editor initializes the resource manager Python subsystem, which calls `add_gui_commands`\.


****  

| Parameter | Description | 
| --- | --- | 
| handlers | A dictionary that maps user interface command names to the handler functions that process them\. The command names are passed to Python from the user interface\. | 

### add\_gui\_view\_commands<a name="cloud-canvas-cloud-gem-framework-ccrm-hooks-add-gui-view-commands-hook-function"></a>

Adds additional methods to the `ViewContext` object\. Called before a GUI command is executed\.


****  

| Parameter | Description | 
| --- | --- | 
| view\_context | A ViewContext object\. | 