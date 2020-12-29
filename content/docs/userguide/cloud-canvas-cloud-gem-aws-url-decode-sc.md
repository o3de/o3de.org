# Decoding a URL with Script Canvas<a name="cloud-canvas-cloud-gem-aws-url-decode-sc"></a>

You can use the **AWSBehaviorURL** **Decode** node in Script Canvas to decode an encoded URL, as in the following example:

```
http%3A%2F%2Fdocs.aws.amazon.com%2Flumberyard%2Flatest%2Fuserguide%2Fcloud-canvas-intro.html   
```

When the URL is decoded, the escape characters are converted to normal characters, as in the following example:

```
https://docs.aws.amazon.com/lumberyard/latest/userguide/cloud-canvas-intro.html
```

**Topics**
+ [Step 1: Add Nodes to Decode a URL](#cloud-canvas-cloud-gem-aws-url-decode-sc-add-nodes)
+ [Step 2: Add Nodes to Display the Result](#cloud-canvas-cloud-gem-aws-url-decode-sc-display-result)
+ [Step 3: Test the URL Decoder](#cloud-canvas-cloud-gem-aws-url-decode-sc-test)

## Step 1: Add Nodes to Decode a URL<a name="cloud-canvas-cloud-gem-aws-url-decode-sc-add-nodes"></a>

The following procedure shows you how to create a Script Canvas graph that decodes a URL\.

**To create a graph that decodes a URL node**

1. In Lumberyard Editor, choose **Tools**, **Script Canvas**\.

1. In the **Node Palette**, expand **Utilities** and drag the **On Graph Start** node to the canvas\.

1. On the right, in **Variable Manager**, click **Create Variable**\.

1. In the **Variable Type** search box, enter **AWSBehaviorURL**, or scroll down to **AWSBehaviorURL**\.

1. Click **AWSBehaviorURL**\. In **Node Inspector**, **AWSBehaviorURL Variable** appears\. The default name of the variable is **Variable 1**\.

1. In the **Node Inspector**, expand **AWSBehaviorURL** to show the **URL** box\. For **URL**, which is the input field for the variable, enter an encoded URL \(for example, `http%3A%2F%2Fdocs.aws.amazon.com%2Flumberyard%2Flatest%2Fuserguide%2Fcloud-canvas-intro.html`\)\.

1. From the **Variable Manager**, press **Shift** and drag **Variable 1 AWSBehaviorURL** to the canvas to create the **Get Variable 1** node\. \(You can also drag **AWSBehaviorURL** to the canvas and then select **Get Variable** from the drop\-down menu\.\)

1. Connect the **Out** pin of the **On Graph Start** node to the **In** pin of the **Get Variable 1** node\.

1. In the **Node Palette**, expand **AWS**, **AWSBehaviorURL**\.

1. Drag the **Decode** node to the right of the **Get Variable 1** node on the canvas\.

1. Connect the **Out** pin of the **Get Variable 1** node to the **In** pin of the **Decode** node\.

1. Connect the **AWSBehavioralURL** pin of the **Get Variable 1** node to the **AWSBehavioralURL:0** pin of the **Decode** node\.

## Step 2: Add Nodes to Display the Result<a name="cloud-canvas-cloud-gem-aws-url-decode-sc-display-result"></a>

At this point, if you saved the graph and started the level, the **Get Variable** node would pass its value to the **Decode** node, which would decode it\. However, you wouldn't see the result\. To see the result, you must add **AWSBehaviorURLNotificationBus** nodes and a **Print** node to the graph\. These nodes monitor for `AWSBehaviorURL` events and show you the decoding results in the Lumberyard console window\.

**To display the decoded URL in the console window**

1. In the **Node Palette**, expand **AWS, AWSBehaviorURLNotificationBus**\.

1. Drag **OnError** to the canvas\. Place the node under the three nodes that are already connected\.

1. Drag **OnSuccess** to the canvas and place it under the **OnError** node\.

1. In the **Node Palette**, expand **Utilities**, **Debug** and then drag **Print** to the right of the two **AWSBehaviorURLNotificationBus** nodes on the canvas\. The **Print** node displays messages in the Lumberyard Editor console\.

1. Connect the **Out** pins of the **AWSBehaviorURLNotificationBus OnError** and **OnSuccess** nodes to the **In** pin of the **Print** node\.

1. Connect the **String** pins of the **AWSBehaviorURLNotificationBus OnError** and **OnSuccess** nodes to the **Value** pin on the **Print** node\. Your canvas should look similar to the following image:  
![\[A Script Canvas graph that decodes a URL\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-aws-url-decode-sc-1.png)

1. Save the canvas with a name like `MyUrlDecoder.scriptcanvas`\. The default file location is the `lumberyard_version\dev\project_name\scriptcanvas` directory\.

1. Exit the Script Canvas editor\.

## Step 3: Test the URL Decoder<a name="cloud-canvas-cloud-gem-aws-url-decode-sc-test"></a>

Now you are ready to attach the script canvas to an entity and test it\.

**To test the URL decoder**

1. In Lumberyard Editor, right\-click the viewport and choose **Create entity**\.

1. In **Entity Inspector**, click **Add Component**\.

1. Under **Scripting**, click **Script Canvas** to add a **[Script Canvas](component-script-canvas.md)** component to the entity\.

1. Under **Script Canvas**, click the browse button \(**\.\.\.**\)\.

1. In the **Pick Script Canvas** dialog box, choose the canvas that you created – for example, **myurldecoder \(Script Canvas\)**, and then click **OK**\.

1. If the Lumberyard console window is not already open, press **`** or choose **Tools**, **Console** to open the console window\. If the console window is already open and you want to clear it, press **Ctrl\+Shift\+C**\.

1. Press **Ctrl\+G** to start the level\. The decoded URL appears in the console, as in the following example\. The relevant output is bold text\.

   ```
   general.enter_game_mode
   Returned:
   (Found resource management based identity pool %s.) - us-east-1:guid
   (Found resource management based identity pool %s for authenticated access.) - us-east-1:guid
   (CloudCanvas) - Anonymous Credentials pulled successfully for identity pool us-east-1:guid.
   Disable Accelerators
   (Script Canvas) - http://docs.aws.amazon.com/lumberyard/latest/userguide/cloud-canvas-intro.html
   SetGlobalState 11->2 'LEVEL_LOAD_TEXTURES'->'RUNNING' 69.1 seconds
   general.exit_game_mode
   ```