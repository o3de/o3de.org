# Deleting Cloud Canvas Deployments and Their Resources<a name="cloud-canvas-how-to-delete-deployments"></a>

To remove Cloud Canvas functionality from your Lumberyard project and the AWS resources related to it, you can use **Cloud Canvas Resource Manager** or the Cloud Canvas command line\. 

**Warning**  
Only administrators should perform these actions\. If you remove all AWS resources managed by Cloud Canvas for your Lumberyard project, the players of your game will not be able to access any of the Cloud Canvas resource groups that implement your game's cloud connected features\.

**To use Cloud Canvas Resource Manager to delete Cloud Canvas deployments and their resources**

1. If you have checked Lumberyard into source control, ensure that the `<root>\<game>\AWS\project-settings.json` file has been checked out and is writeable\.

1. In Lumberyard Editor, choose **AWS**, **Cloud Canvas**, **Cloud Canvas Resource Manager**\.

1. In the **Cloud Canvas configuration** navigation pane, expand **Administration \(advanced\)**, and then expand **Deployments**\. The list of the deployments in the project appears\.

1. Select the deployment to delete and click **Delete deployment**\.  
![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-ui-rm-delete-test-deployment.png)

1. When prompted to confirm, click **Yes** to start the process of deleting the deployment’s resources from AWS\. The process might take a few minutes\.

1. To remove all of the project's resources from AWS, follow the same steps to delete each of the project’s deployments\.

**To use the command line to delete Cloud Canvas deployments and their resources**

1. If you have checked Lumberyard into source control, ensure that the `<root>\<game>\AWS\project-settings.json` file has been checked out and is writeable\.

1. Open a command line prompt and change to your the Lumberyard `\dev` directory\.

1.  Determine the project’s deployment names by entering the following command: 

   ```
   lmbr_aws deployment list
   ```

1. Enter the following command for each of the deployments that you want to delete:

   ```
   lmbr_aws deployment delete --deployment <deployment name>
   ```
**Note**  
To remove all Cloud Canvas functionality from your project, use the `delete-deployment` command to delete all of deployments that were listed by `list-deployments`\. Then remove the project stack as described in the step that follows\.

1. After you have deleted all deployments, you can delete the resources that Cloud Canvas uses to manage your project by entering the following command: 

   ```
   lmbr_aws project delete
   ```

This removes all AWS resources that are related to your Cloud Canvas project\. 