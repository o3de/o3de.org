# Downloading a File from Amazon S3 with Script Canvas<a name="cloud-canvas-cloud-gem-aws-s3-download-sc"></a>

You can use the **AWSBehaviorS3Download** node in Script Canvas to download a file from an Amazon S3 bucket\.

**Topics**
+ [Step 1: Prepare a Test File for Download](#cloud-canvas-cloud-gem-aws-s3-download-sc-prepare)
+ [Step 2: Add Nodes to Download a File from Amazon S3](#cloud-canvas-cloud-gem-aws-s3-download-sc-add-nodes)
+ [Step 3: Add Nodes to Display the Result](#cloud-canvas-cloud-gem-aws-s3-download-sc-display-result)
+ [Step 4: Test Download the File from Amazon S3](#cloud-canvas-cloud-gem-aws-s3-download-sc-test)

## Step 1: Prepare a Test File for Download<a name="cloud-canvas-cloud-gem-aws-s3-download-sc-prepare"></a>

The following procedure shows you how to upload a file to Amazon S3 that you can later download with a Script Canvas script\.

**To prepare a test file for download from Amazon S3**

1. In a text editor, create a plain text file and save it as `downloadtest.txt`\.

1. In a text editor, open the `lumberyard_version\dev\Cache\CloudGemSamples\pc\user\AWS\user-settings.json` file\.

1. In the `user-settings.json` file, locate the Amazon S3 name for the `CloudGemAWSScriptBehaviors.s3nodeexamples` bucket\. The Amazon S3 bucket name is in the string for the `PhysicalResourceId` attribute, as in the following example:

   ```
   "CloudGemAWSScriptBehaviors.s3nodeexamples": {
       "PhysicalResourceId": "cgsamples14-221-cgsamples14-221dep-s3nodeexamples-16ud5gt53zjx7", 
       "ResourceType": "AWS::S3::Bucket"
   ```

1. In Lumberyard Editor, choose **AWS**, **Open AWS Console**, **S3**\.

1. In the Amazon S3 management console, open the bucket that you identified in step 3\.

1. Click **Upload** to upload the `downloadtest.txt` to the bucket that is mapped to `CloudGemAWSScriptBehaviors.s3nodeexamples`\.

## Step 2: Add Nodes to Download a File from Amazon S3<a name="cloud-canvas-cloud-gem-aws-s3-download-sc-add-nodes"></a>

Now you can create a Script Canvas script that downloads the file\.

**To create a Script Canvas script to download a file from Amazon S3**

1. In Lumberyard Editor, click **Tools**, **Script Canvas**\.

1. In the **Node Palette**, expand **Utilities** and drag **On Graph Start** to the canvas\.

1. On the right, in **Variable Manager**, click **Create Variable**\.

1. In the **Variable Type** search box, enter **AWSBehaviorS3Download**, or scroll down to **AWSBehaviorS3Download**\.

1. Click **AWSBehaviorS3Download**\. In **Node Inspector**, **AWSBehaviorS3Download** **Variable** appears\. The default name of the variable is **Variable 1**\.

1. In **Node Inspector**, expand **AWSBehaviorS3Download** to show the input fields\. Type the values in the following table into the corresponding boxes\.  
****    
[\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/cloud-canvas-cloud-gem-aws-s3-download-sc.html)

1. From the **Variable Manager**, press **Shift** and drag **Variable 1 AWSBehaviorS3Download** to the canvas to create the **Get Variable 1** node\. \(You can also drag **AWSBehaviorS3Download** to the canvas and then select **Get Variable** from the drop\-down menu\.\)

1. Connect the **Out** pin of the **On Graph Start** node to the **In** pin of the **Get Variable 1** node\.

1. In the **Node Palette**, expand **AWS**, **AWSBehaviorS3Download**\.

1. Drag the **Download** node to the right of the **Get Variable 1** node on the canvas\.

1. Connect the **Out** pin of the **Get Variable 1** node to the **In** pin of the **Download** node\.

1. Connect the **AWSBehaviorS3Download** pin of the **Get Variable 1** node to the **AWSBehaviorS3Download:0** pin of the **Download** node\.

## Step 3: Add Nodes to Display the Result<a name="cloud-canvas-cloud-gem-aws-s3-download-sc-display-result"></a>

Next, to see the success or failure of the operation, you add **AWSBehaviorS3DownloadNotificationBus** nodes and a **Print** node to the graph\. The nodes monitor for `AWSBehaviorS3DownloadNotificationBus` events and show you the result in the Lumberyard console window\.

**To display the success or failure of the download operation in the console window**

1. In the **Node Palette**, expand **AWS, AWSBehaviorS3DownloadNotificationBus**\.

1. Drag **OnError** to the canvas and place the node under the three nodes that are already connected\.

1. Drag **OnSuccess** to the canvas and place it under the **OnError** node\.

1. In the **Node Palette**, expand **Utilities**, **Debug** and drag **Print** to the right of the two **AWSBehaviorS3DownloadNotificationBus** nodes on the canvas\. The **Print** node displays messages in the Lumberyard Editor console\.

1. Connect the **Out** pins of the **AWSBehaviorS3DownloadNotificationBus** **OnError** and **OnSuccess** nodes to the **In** pin of the **Print** node\.

1. Connect the **String** pins of the **AWSBehaviorS3DownloadNotificationBus** **OnError** and **OnSuccess** nodes to the **Value** pin on the **Print** node\. Your canvas should look similar to the following image:  
![\[A Script Canvas graph that downloads a file from Amazon S3\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-aws-s3-download-sc-1.png)

1. Save the canvas with a name like `MyS3DownloadTest.scriptcanvas`\. The default file location is the `lumberyard_version\dev\project_name\scriptcanvas` directory\.

1. Exit the **Script Canvas** editor\.

## Step 4: Test Download the File from Amazon S3<a name="cloud-canvas-cloud-gem-aws-s3-download-sc-test"></a>

Now you are ready to attach the script canvas to an entity and test it\.

**To test downloading a file from Amazon S3**

1. In Lumberyard Editor, right\-click the viewport and choose **Create entity**\.

1. In **Entity Inspector**, click **Add Component**\.

1. Under **Scripting**, click **Script Canvas** to add a **[Script Canvas](component-script-canvas.md)** component to the entity\.

1. Under **Script Canvas**, click the browse button \(**\.\.\.**\)\.

1. In the **Pick Script Canvas** dialog box, choose the canvas that you created \- for example, **mys3downloadtest \(Script Canvas\)**, and then click **OK**\.

1. If the Lumberyard console window is not already open, press \~ or choose **Tools**, **Console** to open the console window\. If the console window is already open and you want to clear it, press **Ctrl\+Shift\+C**\.

1. Press **Ctrl\+G** to start the level\. The console reports the success of the operation as follows\.

   ```
   (Script Canvas) - File Downloaded
   ```

   The file `s3downloadtest` file is downloaded to the `lumberyard_version\dev` directory\.