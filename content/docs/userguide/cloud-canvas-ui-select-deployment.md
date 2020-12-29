# Making a Cloud Canvas Deployment Active<a name="cloud-canvas-ui-select-deployment"></a>

You can select the deployment that you want Lumberyard Editor to consider active\. The active deployment is the deployment that you work with in Lumberyard Editor\. Lumberyard Editor uses the active deployment's resources when you launch your game\. When you select the [Working with Resource Groups](cloud-canvas-ui-rm-resource-groups.md) node or an [Managing Individual Resource Groups](cloud-canvas-ui-rm-resource-groups.md#cloud-canvas-ui-rm-individual-resource-group) node in the **Cloud Canvas ****Resource Manager** navigation pane, the status information that appears corresponds to the active deployment\.

You can also select the deployment that you want to be active by default for all team members\.

**Note**  
To select a deployment, you must have initialized **Cloud Canvas ****Resource Manager** to work with your AWS account and created a deployment\. For more information, see [Initializing Cloud Canvas Resource Manager](cloud-canvas-ui-rm-initialize.md) and [Create Deployment ](cloud-canvas-ui-rm-deployments.md#cloud-canvas-ui-rm-create-deployment)\. 

## Making a Deployment Active<a name="cloud-canvas-ui-select-deployment-active"></a>

You have several ways to make a deployment active in **Cloud Canvas Resource Manager**\.

**To make a deployment active**
+ To make a deployment active, do one of the following:
  +  In Lumberyard Editor, click **AWS**, **Cloud Canvas**, **Select a deployment**\.   
![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-ui-select-deployment.png)
  +  In the **Cloud Canvas Resource Manager** toolbar, click the name of the current deployment, or click **\(none\)** if none is configured:  
![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-ui-rm-current-deployment-none.png)

    When prompted, choose the deployment that you want to make active:  
![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-ui-rm-select-deployment-dev.png)

    One or more of the deployments may be marked **protected**\. For more information, see [Using Protected Deployments ](cloud-canvas-protected-deployments.md)\.
  + In the **Cloud Canvas Resource Manager** navigation pane, right\-click the deployment that you want to make active, and then click **Make active deployment**:   
![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-ui-select-deployment-rm-active.png)

## Making a Deployment the Default<a name="cloud-canvas-ui-select-deployment-default"></a>

You can use the **Cloud Canvas Resource Manager** to make a deployment the default\.

**To make a deployment active by default for all team members**

1.  In Lumberyard Editor, click **AWS**, **Cloud Canvas**, **Cloud Canvas Resource Manager**\.   
![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-ui-rm-open.png)

1.  In the **Cloud Canvas configuration** navigation tree, expand **Administration \(advanced\)**, and then expand **Deployments**\. 

1. Right\-click the deployment that you want to make the default, and then click **Make default deployment**:  
![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-ui-select-deployment-rm-default.png)

**To use the command line to make a deployment the default**
+ To use the command line to make a deployment the default, enter the following command:

  ```
  lmbr_aws deployment default --set <deployment name>
  ```