# Capturing Image Frames<a name="cinematics-image-capture"></a>

You can capture image frames using render output, a capture track, or console variables\.

**Topics**
+ [Capturing Image Frames with Render Output](#cinematics-image-capture-render-output)
+ [Capturing Image Frames using a Capture Track](#cinematics-image-capture-track)
+ [Capturing Image Frames with Console Variables](#cinematics-image-capture-cvar)

## Capturing Image Frames with Render Output<a name="cinematics-image-capture-render-output"></a>

You can use the **Render Output** tool in the Track View to capture image frames\. 

**To capture image frames using Render Output**

1. In Lumberyard Editor, choose **Tools**, **Track View**\.

1. In the Track View, click **Tools**, **Render Output**\.

1. In **Render Output**, set the input and out properties, and then click **Add**\. You will see the capture added under **Batch**\.

1. Click **Start** to start the capture\.

**Note**  
You may need to adjust the aspect ratio for captured image frames\.

**To change the aspect ratio for image frame captures**

1. In Lumberyard Editor, choose **Edit**, **Editor Settings**, **Global Preferences**\.

1. In **Preferences**, click **Viewports**\.

1. Under **General Viewport Settings**, change the value for **Perspective View Aspect Ratio**\. The default value is `1.3333`\.

## Capturing Image Frames using a Capture Track<a name="cinematics-image-capture-track"></a>

You can capture image frames when a sequence is played in game mode\.

**To capture image frames using a capture track**

1. In Lumberyard Editor, choose **Tools**, **Track View**\.

1. In the Track View, right\-click the **Director** node and choose **Add Track**, **Capture**\.

1. Double\-click the created track to add a capture keyframe\. You can set the following key properties:  
****    
[\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/cinematics-image-capture.html)

1. Set up a Script Canvas graph to play the sequence on game start\. 

## Capturing Image Frames with Console Variables<a name="cinematics-image-capture-cvar"></a>

Capture image frames with the following console variables\. For more information, see [Using the Console Window](console-intro.md)\.


**Capture Image Frames Console Variables**  

| Console Variable | Description | 
| --- | --- | 
| fixed\_time\_step |  Lowers the game speed to achieve a constant frame rate throughout the sequence\. For example, a time step value of `0.04` specifies a 25 fps gameplay speed\. Default value: `0.0`  | 
| capture\_frames |  Enables frame capture, if the value is set to `1`\.  | 
| capture\_file\_format |  Sets the output format for the images\. Valid values: `.jpg`, `.tga`, `.tif`  | 
| capture\_file\_prefix |  Sets a file name prefix to use for captured frames\. Default: `Frame`  | 
| capture\_buffer |  Sets the type of buffer to capture\. Valid values:  `0` = Color \(RGB pixels\) `1` = Color with Alpha \(RGBA pixels where the alpha channel is set to 255 where geometry exists\)  | 