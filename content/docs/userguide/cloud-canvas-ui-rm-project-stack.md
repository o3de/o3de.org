# Working with Project Stacks<a name="cloud-canvas-ui-rm-project-stack"></a>

When you select the **Project stack** node in the **Cloud Canvas Resource Manager** navigation pane, the detail pane shows information about the AWS CloudFormation stack that Cloud Canvas is using\. 

![\[Project stack\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-project-stack.png)

Note the following: 
+ If you select a project stack node and no AWS profile is configured, Lumberyard prompts you to provide one\. A profile is required for Lumberyard to display the status of your project’s resources\. For more information, see [Managing Cloud Canvas Profiles](cloud-canvas-ui-credentials-manager.md)\. 
+ If you select the **Project stack** node when the project has not been initialized for use with Cloud Canvas, Lumberyard prompts you to initialize the project and create a project stack\. For more information, see [Initializing Cloud Canvas Resource Manager](cloud-canvas-ui-rm-initialize.md)\. 

## Project Stack Status Table<a name="cloud-canvas-ui-rm-project-stack-status-table"></a>

The **Project stack status** table shows the status of the AWS CloudFormation stack that contains the resources used by your project's resource groups\. 

This table has the following columns: 

**Pending** – Indicates when changes have been made to the local stack templates or code but not yet uploaded to AWS\. Pausing your mouse pointer on a value in this column displays the reason why the change is pending\. Following are the possible values: 
+ **Create** – The stack is defined locally but has not been created in AWS\.
+ **Update** – The stack's template and/or Lambda function code has been changed locally but not yet uploaded to AWS\.
+ **Delete** – The stack has been removed from the local definitions but has not been deleted in AWS\. If you are using a source control system, this status can indicate that a new stack has been added to the project\. However, your local copy of the source control is out of date and doesn't contain the definition for the new stack\.
+  **\-\-** – No change is pending\. 

**Status** – The status of the AWS CloudFormation stack\. See [Understanding Resource Status Descriptions](cloud-canvas-ui-rm-resource-status-descriptions.md) for a description of the values this column can have\. To see additional status information, pause your pointer on the status indicator\. 

 **Created** – The time the stack was created\. 

 **Updated** – The time the stack status was updated\. 

 **ID** \- A truncated version of the AWS ID for the stack\. To see the full ID, pause your pointer on the truncated ID\. 

## Upload Resources<a name="cloud-canvas-ui-rm-upload-resources"></a>

Click **Upload resources** to start the process of modifying, creating, or deleting resources in AWS so that they match your local definitions of them\. A dialog box shows the changes that will be applied\.

![\[Upload resources\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-project-stack-update-dialog.png)

The table of changes has the same columns as the stack resource status table but also includes a column for **Impacts**\. If a change has the potential to affect the security of your project, the **Impacts** column contains the text **Security**\. Before you can start an operation that has a security impact, you must select the option **It is OK that this will impact resource SECURITY**\. Review any security changes carefully before you apply them\. 

Similarly, before you can start an operation that deletes one or more resources, you must select the option **It is OK that this will permanently DELETE resources**\. 

## Stack Resources Table<a name="cloud-canvas-ui-rm-stack-resources-table"></a>

The **Stack resources** table shows the status of the resources that your project is using\. 

This table has the following columns: 

**Pending** – Indicates that changes have been made locally but not yet uploaded to AWS\. Pausing your mouse on a value in this column displays the reason why the change is pending\. Following are the possible values: 
+ **Create** – The resource is defined locally but has not been created in AWS\.
+ **Update** – The resource has been changed locally but not yet uploaded to AWS\.
+ **Delete** – The resource has been removed from the local definitions but has not been deleted on AWS\. If you are using a source control system, this status can indicate that a new resource has been added to the project\. However, your local copy of the source control is out of date and doesn't contain the definition for the new resource\.
+  **\-\-** – No change is pending\. 

 **Resource Name** – The logical name of the resource\. 

 **Type** – The type of the resource \(for example, a Lambda function, Amazon S3 bucket, or a custom resource\)\. 

 **Status** – The current condition of the resource\. For a description of the possible status values, see [Understanding Resource Status Descriptions](cloud-canvas-ui-rm-resource-status-descriptions.md)\. To see additional status information, pause your pointer on the status\. 

 **Timestamp** – The time of the most recent change\. 

 **ID** \- A truncated version of the AWS ID for the stack\. To see the full ID, pause your pointer on the truncated ID\. 