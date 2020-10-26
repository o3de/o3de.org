# Working with Resource Groups<a name="cloud-canvas-ui-rm-resource-groups"></a>

Resource groups define the AWS resources that cloud\-connected game features such as high score tables require\. You define the resource groups locally and then upload them to AWS, where the features you specify are created in the cloud\.

You can use the **Cloud Canvas Resource Manager** to manage resource groups collectively or individually\. You can create a resource group locally, specify the AWS resources that you want the resource group to have, and then upload the resource group definition to have it created in AWS\. This document shows you how to use **Cloud Canvas Resource Manager** to perform these and other resource group\-related tasks\.

## Managing Resource Groups<a name="cloud-canvas-ui-rm-resource-groups-detail-pane"></a>

To see the status of the resource groups that belong to your project's current deployment, click **Resource Groups** in the **Cloud Canvas configuration** navigation pane \. Note the following: 
+ If you select **Resource Groups** and no AWS profile is configured, Lumberyard prompts you to provide one\. A profile is required for Lumberyard to display the status of your project’s resources\. For more information, see [Managing Cloud Canvas Profiles](cloud-canvas-ui-credentials-manager.md)\. 
+ If you select **Resource Groups** and deployments exist but no deployment is active, Lumberyard prompts you to select one\. For more information, see [Making a Cloud Canvas Deployment Active](cloud-canvas-ui-select-deployment.md)\. 

The **Resource Groups **detail pane lists the resource groups in your current deployment: 

![\[Resource groups details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-resource-groups-detail-pane.png)

The **Resource Groups** detail pane has the following options: 

**Upload all resources**  
Starts the process of modifying your resources in AWS as needed to match all the definitions in all of your local resource groups\. As the update proceeds, resource groups with the **Pending** status of **Create** change to the **Status** of **Create complete**\. The update might take a few minutes\.   

![\[Upload all resources\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-upload-all-resources.png)
Note the following:   
+ If you have not yet initialized your Lumberyard project with an AWS account for the resources that you want to upload, Lumberyard prompts you to do so\. To prepare your Lumberyard project for use with AWS, you must be an administrator of the AWS account that you use\. For more information, see [Initializing Cloud Canvas Resource Manager](cloud-canvas-ui-rm-initialize.md)\. 
+ After you have initialized the project, Lumberyard prompts you to create a deployment for it\. A deployment creates all the AWS resources that are specified in your resource group definition\.  
![\[Create deployment\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-resource-groups-create-deployment.png)

  For more information, see [Create Deployment ](cloud-canvas-ui-rm-deployments.md#cloud-canvas-ui-rm-create-deployment)\.

   

**Add resource group**  
Adds a new resource group definition to your Lumberyard project\. A resource group definition represents a single game feature like a high score system\. The definition specifies the AWS resources that the feature will use\.   
Clicking **Add resource group** opens the **New resource group** dialog:   

![\[New resource group\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-ui-rm-new-resource-group-w-examples.png)
Provide the following information:  
+  **Resource group name** – The name of the resource group\. The name must be alphanumeric\. Lumberyard uses this name to create an AWS CloudFormation stack resource definition in the [deployment\-template\.json](cloud-canvas-resource-definitions.md#cloud-canvas-deployment-template) file\. 
+  **Example resources** – \(Optional\) Choose to include example resources in the resource group\. You can study the examples to see how resources are defined in a resource group, or modify the examples to turn them into a feature for your project\. 

    

**Resource group status**  
Shows the status of the AWS CloudFormation stack of each resource group in the active deployment\. **Resource group** shows the resource group name\. For descriptions of the remaining fields in this table, see [Stack Resources Table](cloud-canvas-ui-rm-project-stack.md#cloud-canvas-ui-rm-stack-resources-table) in the [Working with Project Stacks ](cloud-canvas-ui-rm-project-stack.md) section\.

**Progress log**  
Shows the progress of AWS CloudFormation stack updates\. For more information, see [Viewing the Cloud Canvas Progress Log](cloud-canvas-ui-rm-progress-log.md)\.

## Managing Individual Resource Groups<a name="cloud-canvas-ui-rm-individual-resource-group"></a>

Each child node of **Resource Groups** represents a resource group in your Lumberyard project\. When you select one of these resource groups, the detail pane shows the status of the resource group\. 

![\[Individual resource group\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-ui-rm-individual-resource-group.png)

### Adding Resources to a New Resource Group<a name="cloud-canvas-ui-rm-adding-resources-new-resource-group"></a>

When you create a resource group, the group does not yet have any AWS resource definitions\. Use the **Add resource** option to add one: 

![\[Add resource\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-ui-rm-add-resource-definition-prompt.png)

#### Importing Resources<a name="cloud-canvas-ui-rm-adding-resources-new-resource-group-importing-resources"></a>

You can also click **Import resource** to import an AWS resource that already exists in your AWS account\. For more information, see [ Importing Resource Definitions into Cloud Canvas](cloud-canvas-ui-rm-resource-importer.md)\.

#### Creating Resources in AWS<a name="cloud-canvas-ui-rm-adding-resources-new-resource-group-creating-resources"></a>

The resource definitions that you add are created locally and only describe the AWS resources that you want to use\. The resources themselves are not created in AWS until you click **Create resources**: 

![\[Create resources\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-rm-create-resources.png)

### Individual Resource Group Status<a name="cloud-canvas-ui-rm-individual-resource-group-status"></a>

You can use a resource group's status pane to manage the resource group\.

![\[Resource group status\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-ui-rm-resource-group-detail-pane.png)

In addition to **Add resource** and **Import resource**, the status pane for a resource group has the following options: 

**Upload Lambda code**  
Use this option to upload Lambda function code without updating the entire project stack\.

**Upload resources**  
After you have created one or more resource definitions, you click **Upload resources** to start the process of creating the resources in AWS\. Resource creation follows the local resource definitions that you created with the **Add resource** option\.   

![\[Upload group resources\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-rm-upload-group-resources.png)
As the update proceeds, the resources with the **Pending** status of **Create** change to the **Status** of **Create complete**\. 

**Remove resource group **  
Click **Remove resource group** to remove the selected resource group from your local configuration\.   

![\[Remove resource group\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-rm-remove-resource-group-confirmation.png)
To delete the actual resources from AWS, use the **Delete resources** option as described in the section that follows\.   
The remove resource operation does not remove the resource group's configuration data from the local disk\. As long as that data exists on disk, you can restore the resource group by adding a new resource group with the same name\. 

**Delete resources**  
The **Delete resources** option appears after you have removed a resource group from your local configuration \(for example, by clicking **Remove resource group**\) when the resources defined by the resource group still exist in AWS\.   

![\[Delete resources\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-rm-delete-resources-option.png)
When you click **Delete resources**, Lumberyard prompts you to confirm the deletion of resources in AWS for the deployment that is currently active in Lumberyard Editor\. You must select the **It is OK that this will permanently DELETE resources** check box before you can click **Yes**\.  

![\[Delete group resources\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-ui-rm-delete-group-resources.png)
After you click **Yes**, the deletion operation might take several minutes to complete\. 

**Stack resources**  
The **Stack resources** table shows the status of each of the AWS resources that you defined for the resource group\. For descriptions of the fields in this table, see [Stack Resources Table](cloud-canvas-ui-rm-project-stack.md#cloud-canvas-ui-rm-stack-resources-table) in the [Working with Project Stacks ](cloud-canvas-ui-rm-project-stack.md) section\. 

## resource\-template\.json<a name="cloud-canvas-ui-rm-resource-template-json-link"></a>

For information about this node, see [Working with JSON Files](cloud-canvas-ui-rm-json-file-nodes.md)\. 

## lambda\-function\-code<a name="cloud-canvas-ui-rm-lambda-function-code"></a>

The **lambda\-function\-code** node and its child nodes correspond to the `lambda-function-code` directory in your project\. The `lambda-function-code` directory contains the code that implements the AWS Lambda function resources that are defined by your resource group\. For more information, see [The lambda\-function\-code Directory](cloud-canvas-resource-definitions.md#cloud-canvas-lambda-function-code-subdirectory)\. Also see related information for the [project\-code ](#cloud-canvas-ui-rm-project-code) node\. 

## project\-code<a name="cloud-canvas-ui-rm-project-code"></a>

This node is located at the bottom of the **Administration \(advanced\)** section in the resource manager navigation tree\. The `project-code` directory contains the code that implements the AWS Lambda function resources that **Cloud Canvas Resource Manager** uses\. For more information, see [The project\-code Directory](cloud-canvas-resource-definitions.md#cloud-canvas-project-code-subdirectory)\. The **project\-code** node contains file and directory child nodes\. Click a file node to see or edit its contents in the detail pane\. For more information, see [Editing Resource Manager Files](cloud-canvas-ui-rm-text-editing.md)\. 