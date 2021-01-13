---
description: ' Learn how to work with &cloud; deployments in &cloud; Resource Manager. '
title: Working with Deployments
---
# Working with Deployments {#cloud-canvas-ui-rm-deployments}

**Topics**
- [Working with Deployments {#cloud-canvas-ui-rm-deployments}](#working-with-deployments)
  - [Create Deployment {#cloud-canvas-ui-rm-create-deployment}](#create-deployment)
  - [Deployment Status Table {#cloud-canvas-ui-rm-deployment-status-table}](#deployment-status-table)
  - [Individual Deployment Nodes {#cloud-canvas-ui-rm-individual-deployment}](#individual-deployment-nodes)
    - [Individual Deployment Status Table {#cloud-canvas-ui-rm-individual-deployment-status-table}](#individual-deployment-status-table)
    - [Upload All Resources {#cloud-canvas-ui-rm-upload-all-resources}](#upload-all-resources)
    - [Delete Deployment {#cloud-canvas-ui-rm-delete-deployment}](#delete-deployment)
    - [Stack Resources Table {#cloud-canvas-ui-rm-deployment-stack-resources-table}](#stack-resources-table)

A deployment is an independent copy of the AWS resources that your game uses\. Deployments are useful for maintaining a safe separation among game lifecycle phases such as development, test, and production\. In the resource manager navigation pane, the **Deployments** node shows you the status of your project’s deployments\. You can also use it to create a new deployment\. 

![\[Deployments\]](/images/userguide/cloud_canvas/cloud-canvas-ui-rm-deployments-node.png)

 **Note**: If the **Deployments** node is selected when no AWS profile is configured, Lumberyard prompts you to provide a profile\. The status of the project’s deployments cannot be displayed unless a profile is provided\. For more information, see [Managing Cloud Canvas Profiles](/docs/userguide/gems/cloud-canvas/ui-credentials-manager.md)\. 

## Create Deployment {#cloud-canvas-ui-rm-create-deployment}

Click **Create deployment** to start the creation of a deployment: 

![\[Create deployment\]](/images/userguide/cloud_canvas/cloud-canvas-ui-rm-create-deployment-simple.png)

When uploading resources for the first time, you may see this version of the dialog: 

![\[Create deployment message\]](/images/userguide/cloud_canvas/cloud-canvas-ui-rm-create-deployment-must.png)

Provide a name for **Deployment name**\. Lumberyard appends this name to the project stack name to create an AWS CloudFormation stack for the deployment\. 

To start the deployment creation process, click **OK**\. In the resource manager navigation pane, a node for the deployment appears under **Deployments**\. In the detail pane, the [Viewing the Cloud Canvas Progress Log](/docs/userguide/gems/cloud-canvas/ui-rm-progress-log.md) provides details about the creation process\.

## Deployment Status Table {#cloud-canvas-ui-rm-deployment-status-table}

The **Deployment status** table shows the status of the AWS CloudFormation stack for each deployment\. **Deployment** shows the deployment name\. For descriptions of the remaining fields in this table, see [Stack Resources Table](/docs/userguide/gems/cloud-canvas/ui-rm-project-stack#cloud-canvas-ui-rm-stack-resources-table) in the [Working with Project Stacks ](/docs/userguide/gems/cloud-canvas/ui-rm-project-stack.md) section\. 

## Individual Deployment Nodes {#cloud-canvas-ui-rm-individual-deployment}

The child nodes of the **Deployment** node each represent one of the Lumberyard project’s deployments\. When a **Deployment** node is selected, the detail pane shows the current status of the selected deployment\. 

![\[Deployment detail pane\]](/images/userguide/cloud_canvas/cloud-canvas-ui-rm-dev-deployment-node.png)

**Note**  
If a **Deployment** node is selected when no AWS profile is configured, Lumberyard prompts you to provide a profile\. The status of the project’s deployments cannot be displayed unless a profile is provided\. For more information, see [Managing Cloud Canvas Profiles](/docs/userguide/gems/cloud-canvas/ui-credentials-manager.md)\. 

### Individual Deployment Status Table {#cloud-canvas-ui-rm-individual-deployment-status-table}

The **<Deployment Name> deployment status** table shows the status of the AWS CloudFormation stack for the selected deployment\. For descriptions of the contents of this table, see [Project Stack Status Table](/docs/userguide/gems/cloud-canvas/ui-rm-project-stack#cloud-canvas-ui-rm-project-stack-status-table) in the [Working with Project Stacks ](/docs/userguide/gems/cloud-canvas/ui-rm-project-stack.md) section\. 

### Upload All Resources {#cloud-canvas-ui-rm-upload-all-resources}

Click **Upload all resources** to start the process of modifying, creating, or deleting resources in the current AWS deployment so that they match your local definitions for all resource groups\. 

### Delete Deployment {#cloud-canvas-ui-rm-delete-deployment}

Click **Delete deployment** to start the process of deleting the deployment’s resources from AWS\. The resources defined by all resource groups will be deleted\. 

![\[Delete deployment\]](/images/userguide/cloud_canvas/cloud-canvas-ui-rm-delete-deployment.png)

For more information about deleting deployments, see [Deleting Cloud Canvas Deployments and Their Resources](/docs/userguide/gems/cloud-canvas/how-to-delete-deployments.md)\.

### Stack Resources Table {#cloud-canvas-ui-rm-deployment-stack-resources-table}

The **Stack resources** table shows the status of each of the resources defined by all the resource groups for the selected deployment\. For descriptions of the fields in this table, see [Stack Resources Table](/docs/userguide/gems/cloud-canvas/ui-rm-project-stack#cloud-canvas-ui-rm-stack-resources-table) in the [Working with Project Stacks ](/docs/userguide/gems/cloud-canvas/ui-rm-project-stack.md) section\. 
