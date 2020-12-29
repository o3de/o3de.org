# Working with JSON Files<a name="cloud-canvas-ui-rm-json-file-nodes"></a>

Some of the nodes in the **Cloud Canvas Resource Manager** navigation pane represent JSON template or settings files for your project\. The content of these files is described in detail in [Resource Definitions](cloud-canvas-resource-definitions.md)\. When you select one of these nodes in the navigation pane, the detail pane shows the contents of that file\. You can edit the file directly in the resource manager or use an external editor\. For more information, see [Editing Resource Manager Files](cloud-canvas-ui-rm-text-editing.md)\. 

In the navigation pane, some template file nodes have child nodes\. Each of the child nodes represents one section of its parent node template file\. These child nodes make it easier to find and edit the corresponding sections of the parent node template file\. Any changes that you make in a child node are always saved in the corresponding section of the parent template file\. 

The following template is found in each resource group under the **Resource Groups** node: 

## resource\-template\.json<a name="cloud-canvas-ui-rm-resource-template-json"></a>

Each resource group has a **resource\-template\.json** node and a **lambda\-function\-code** child node\. The `resource-template.json` file defines the group’s resources\. For more information, see [resource\-template\.json](cloud-canvas-resource-definitions.md#cloud-canvas-resource-template)\.  In the navigation pane, each of the nodes under **resource\-template\.json** represents one of the resources defined in a section of the `resource-template.json` file\. 

The following templates are found under the **Administration \(advanced\)** node: 

## project\-settings\.json<a name="cloud-canvas-ui-rm-project-settings.json"></a>

The `project-settings.json` file contains project configuration data\. For more information, see [**project\-settings\.json**](cloud-canvas-resource-deployments.md#cloud-canvas-project-settings)\.

## project\-template\.json<a name="cloud-canvas-ui-rm-project-template.json"></a>

The `project-template.json` file defines the resources used by **Cloud Canvas Resource Manager**\. For more information, see [project\-template\.json](cloud-canvas-resource-definitions.md#cloud-canvas-project-template)\.

## deployment\-template\.json<a name="cloud-canvas-ui-rm-deployment-template.json"></a>

The `deployment-template.json` file defines the AWS CloudFormation stack resources for each of the projects resource groups\. For more information, see [deployment\-template\.json](cloud-canvas-resource-definitions.md#cloud-canvas-deployment-template)\.

## deployment\-access\-template\.json<a name="cloud-canvas-ui-rm-deployment-access-template.json"></a>

The `deployment-access-template.json` file defines the AWS CloudFormation stack resources that control access to each deployment’s resources\. For more information, see [deployment\-access\-template\.json](cloud-canvas-resource-definitions.md#cloud-canvas-deployment-access-template) and [Controlling Access to Resources](cloud-canvas-setting-access-permissions.md)\. 

## user\-settings\.json<a name="cloud-canvas-ui-rm-user-settings.json"></a>

The `user-settings.json` file contains user specific settings\. For more information, see [user\-settings\.json](cloud-canvas-resource-definitions.md#cloud-canvas-user-settings)\.