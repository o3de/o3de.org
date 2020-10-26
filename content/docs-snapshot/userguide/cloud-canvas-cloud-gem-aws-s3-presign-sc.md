# Generating an Amazon S3 Presigned URL With Script Canvas<a name="cloud-canvas-cloud-gem-aws-s3-presign-sc"></a>

You can use [presigned URLs](https://docs.aws.amazon.com/AmazonS3/latest/dev/ShareObjectPreSignedURL.html) to share Amazon S3 objects with others\. The **Presign** node in Script Canvas generates a presigned URL that links to an Amazon S3 object that you specify\.

## Add Nodes that Generate a Presigned URL<a name="cloud-canvas-cloud-gem-aws-s3-presign-sc-add-nodes"></a>

**To use the **Presign** node to presign a URL**

1. Upload a plain text file named `presigntest.txt` to the `s3nodeexamples` bucket\.

1. In Lumberyard Editor, choose **Tools**, **Script Canvas**\.

1. In the **Node Palette**, expand **Utilities** and drag **On Graph Start** to the canvas\.

1. In **Variable Manager**, click **Create Variable**\.

1. In the **Variable Type** search box, enter **AWSBehaviorS3Presign**, or scroll down to **AWSBehaviorS3Presign**\.

1. Click **AWSBehaviorS3Presign**\. In **Node Inspector**, **AWSBehaviorS3Presign Variable** appears\. The default name of the variable is **Variable 1**\.

1. In **Node Inspector**, expand **AWSBehaviorS3Presign** to show the input fields\. Type or choose the values in the following table\.  
****    
[\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/cloud-canvas-cloud-gem-aws-s3-presign-sc.html)

1. From the **Variable Manager**, press **Shift** and drag **Variable 1 AWSBehaviorS3Presign** to the canvas to create the **Get Variable 1** node\. \(You can also drag **AWSBehaviorS3Presign** to the canvas and then select **Get Variable** from the drop\-down menu\.\)

1. Connect the **Out** pin of the **On Graph Start** node to the **In** pin of the **Get Variable 1** node\.

1. In the **Node Palette**, expand **AWS**, **AWSBehaviorS3Presign**\.

1. Drag the **Presign** node to the right of the **Get Variable 1** node on the canvas\.

1. Connect the **Out** pin of the **Get Variable 1** node to the **In** pin of the **Presign** node\.

1. Connect the **AWSBehaviorS3Presign** pin of the **Get Variable 1** node to the **AWSBehaviorS3Presign:0** pin of the **Presign** node\.

## Add Nodes to Display the Result<a name="cloud-canvas-cloud-gem-aws-s3-presign-sc-display-result"></a>

Next, to see the success or failure of the operation, you add **AWSBehaviorS3PresignNotificationBus** nodes and a **Print** node to the graph\. The nodes monitor for `AWSBehaviorS3PresignNotificationBus` events and show you the result in the Lumberyard console window\.

**To display the success or failure of the presign operation in the console window**

1. In the **Node Palette**, expand **AWS, AWSBehaviorS3PresignNotificationBus**\.

1. Drag **OnError** to the canvas\. Place the node under the three nodes that are already connected\.

1. Drag **OnSuccess** to the canvas and place it under the **OnError** node\.

1. In the **Node Palette**, expand **Utilities**, **Debug** and drag **Print** to the right of the two **AWSBehaviorS3PresignNotificationBus** nodes on the canvas\. The **Print** node displays messages in the Lumberyard Editor console\.

1. Connect the **Out** pins of the **AWSBehaviorS3PresignNotificationBus OnError** and **OnSuccess** nodes to the **In** pin of the **Print** node\.

1. Connect the **String** pins of the **AWSBehaviorS3PresignNotificationBus OnError** and **OnSuccess** nodes to the **Value** pin on the **Print** node\. Your canvas should look similar to the following image:  
![\[A Script Canvas graph that presigns a URL for an object in Amazon S3\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-aws-s3-presign-sc-1.png)

1. Save the canvas with a name like `MyS3PresignTest.scriptcanvas`\. The default file location is the `lumberyard_version\dev\project_name\scriptcanvas` directory\.

1. Exit the Script Canvas editor\.

## Test Generate a Presigned URL<a name="cloud-canvas-cloud-gem-aws-s3-presign-sc-test"></a>

Now you are ready to attach the script canvas to an entity and test it\.

**To test the presigned Amazon S3 URL**

1. In Lumberyard Editor, right\-click the viewport and choose **Create entity**\.

1. In **Entity Inspector**, click **Add Component**\.

1. Under **Scripting**, click **Script Canvas** to add a **[Script Canvas](component-script-canvas.md)** component to the entity\.

1. Under **Script Canvas**, click the browse button \(**\.\.\.**\)\.

1. In the **Pick Script Canvas** dialog box, choose the canvas that you created – for example, **mys3presigntest \(Script Canvas\)**, and then click **OK**\.

1. If the Lumberyard console window is not already open, press **`** or choose **Tools**, **Console** to open the console window\. If the console window is already open and you want to clear it, press **Ctrl\+Shift\+C**\.

1. Press **Ctrl\+G** to start the level\. The console reports the success of the operation, as in the following example\.

   ```
   (Script Canvas) - https://s3.amazonaws.com//presigntest.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential={string} 
   ```