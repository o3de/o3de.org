# Using Heatmap Analytics<a name="cloud-canvas-cloud-gem-game-metrics-heatmap-analytics-intro"></a>

You can use heatmaps to view data that's generated from the Game Metrics Cloud Gem and for any metric type that a game client sends\. In the Cloud Gem Portal, the heatmap appears as an overlay on an image of the game map\. You can see information such as the majority of player movement and where most player deaths occur\.

![\[Example of a heatmap overlay on an image of a game map in the Amazon Lumberyard Cloud Gem Portal.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/heatmap-analytics-cloud-gem-overview.png)

You can also expand heatmap functionality to use other gems that provide metrics, such as the Defect Reporter Cloud Gem\. When used with this gem, you can see where bugs are generated\.

To use heatmaps in the Cloud Gem Portal, you must generate events with positional data and select that event type in the heatmap tool\.

**Topics**
+ [Prerequisites](#cloud-gem-game-metrics-heatmap-analytics-prerequisites)
+ [Creating Heatmaps with the Heatmap Tool](#cloud-gem-game-metrics-creating-heatmaps-with-heatmap-tool)
+ [Creating Screenshots of Your Level](#cloud-gem-game-metrics-heatmaps-creating-screenshots-of-game-level)

## Prerequisites<a name="cloud-gem-game-metrics-heatmap-analytics-prerequisites"></a>

This tutorial assumes the following:
+ You are using a Lumberyard project that has the **Cloud Gem Game Metrics** enabled\. For more information, see [Enabling Gems](gems-system-using-project-configurator.md)\.
+ You have created a project stack and deployment stack in the [Cloud Canvas Resource Manager](cloud-canvas-ui-rm-overview.md)\.
+ You have sent test events with the Metrics Sample level or your level\. You can find the Metrics Sample level in the `lumberyard_version\dev\CloudGemSamples\Levels` directory\.
  + Use the WASD keys to move the controllable entity around the level\.
  + Click **Send Position** to record the coordinates of the controllable entity\.

  For more information, see [Using the Game Metrics Cloud Gem Portal](using-the-cloud-gem-metrics-portal.md) and [Sending Test Metrics with the Metrics Sample Level](send-test-events-for-the-cloud-canvas-game-metrics-gem.md)\.

## Creating Heatmaps with the Heatmap Tool<a name="cloud-gem-game-metrics-creating-heatmaps-with-heatmap-tool"></a>

After you complete the prerequisites, you can create a heatmap to view your data in the Cloud Gem Portal\.

**To create a heatmap**

1. In Lumberyard Editor, choose **AWS**, **Open Cloud Gem Portal**\.

1. In the Cloud Gem Portal, on the **Cloud Gems** page, under **Analytics**, choose **Heatmap**\.  
![\[Choose Heatmap under Analytics in the Amazon Lumberyard Cloud Gem Portal.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-gem-portal-heatmap-option.png)

1. On the **Heatmaps** page, click **Create Heatmap**\.  
![\[Click the Create Heatmap button on the Heatmaps page in the Amazon Lumberyard Cloud Gem Portal.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-gem-portal-create-heatmap-button.png)

1. For **Name**, enter a name to identify your heatmap\.

1. For **Level Screenshot**, upload a top\-down screenshot of your level\. Use the mouse wheel or **\+/\-** buttons to resize the image\. Move the image to fill the gray image box\.
**Note**  
Lumberyard includes a sample screenshot in the `lumberyard_version\dev\CloudGemSamples\Levels\MetricsSample\cloud_gem_portal_heatmap_image.png` directory\.  
You can also create your own screenshot\. For more information, see [Creating Screenshots of Your Level](#cloud-gem-game-metrics-heatmaps-creating-screenshots-of-game-level)\.  
![\[Example of a top-down screenshot of a level in the gray image box in the Amazon Lumberyard Cloud Gem Portal.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-create-heatmap-resize-image.png)

1. For **Max Zoom Scale**, set the minimum and maximum values\. You can adjust these values to change how the aggregated data points appear as heat spots on the map\.

1. For **Game World Coordinates**, enter the xy coordinates for the bottom left and bottom right of the viewport screenshot\. This is necessary to properly map the data points that are captured in the game to the top\-down screenshot of your level\.

   Lumberyard includes a text file with the xy coordinates of the sample screenshot\. You can find the `cloud_gem_portal_heatmap_global_coordinates.txt` file in the `lumberyard_version\dev\CloudGemSamples\Levels\MetricsSample` directory\.

   If you're using the sample screenshot, enter the following xy coordinates:
   + **Lower Left**: **X**=`0.39` \| **Y**=`4.05`
   + **Lower Right**: **X**=`126.96` \| **Y**=`3.15`

   If you created your own screenshot, you need to identify the xy coordinates\. For more information, see [Creating Screenshots of Your Level](#cloud-gem-game-metrics-heatmaps-creating-screenshots-of-game-level)\.

1. For **Event**, select an event type from the drop\-down list\. This event type is the data source for the heatmap and should include positional data\.
**Note**  
If you're using the Metrics Sample level, the event type is called **translation**\.

1. For **X Axis**, select the x position of the event type that you selected\.

1. For **Y Axis**, select the y position of the event type that you selected\.

1. \(Optional\) You can filter search results to show metrics on the heatmap for a specified time range or that meet certain SQL filters\.  
**Example**  

   You can filter the search results to show metrics for user IDs that match XYZ \(`uid = 'XYZ'`\) or for iOS devices only \(`platform_identifier = 'iOS'`\)\.  
![\[Specify SQL filters to show specific metrics on your heatmap in the Amazon Lumberyard Cloud Gem Portal.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-heatmap-metrics-custom-filter.png)

1. Click **Save**\.

## Creating Screenshots of Your Level<a name="cloud-gem-game-metrics-heatmaps-creating-screenshots-of-game-level"></a>

You can create a top\-down screenshot of your level to use with the heatmap overlay\.

**To create a top\-down screenshot of your level**

1. In Lumberyard Editor, open your level\.

1. In the **Entity Outliner**, select your controllable entity\. For example, in the Metrics Sample level, under **Player**, select **followcam**\.  
![\[Choose the controllable entity's camera in the Lumberyard Entity Outliner.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-metrics-sample-level-player-followcam.png)

1. In the **Entity Inspector**, do the following:

   1. Under **Camera**, click **Be this camera**\.  
![\[Click Be this camera in the Lumberyard Entity Inspector.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-metrics-sample-level-followcam-be-this-camera.png)

   1. Under **Transform**, for **Rotate**, set **X** to **270** degrees\. This rotates the camera orthogonal to the level\.  
![\[For the Rotate parameter, set X to 270 degrees in the Lumberyard Entity Inspector.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-metrics-sample-level-followcam-rotate.png)

1. In the viewport, do the following:

   1. Click anywhere to deselect the entity\.

   1. Adjust the viewport dimensions to match your level dimensions\. For example, if your level has a square geometry, adjust the viewport into a square shape\.

   1. Use the mouse wheel to scroll out\.

   1. Use the WASD and QE keys to adjust the view\. Your level should cover the bottom left and right of the viewport\.

1. Use your preferred tool to capture and save a screenshot of the viewport\.
**Note**  
You'll specify the path to your screenshot on the **Create Heatmap** page in the Cloud Gem Portal\.  
![\[Example top-down screenshot of the Metrics Sample level in the Amazon Lumberyard viewport.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-metrics-sample-level-followcam-viewport-screenshot.png)

1. Pause on the bottom left of the viewport\.
**Important**  
The pointer must touch the terrain, not the void space\.  
![\[Example of the pointer touching the terrain on the bottom left of the Amazon Lumberyard viewport.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-metrics-sample-level-pointer-bottom-left-viewport.png)

1. In the bottom toolbar, locate the xy coordinates for the bottom left of the viewport\.
**Note**  
If the xy coordinates aren't updating as you move the pointer, you can use the right mouse button to rotate the camera slightly\.  
**Example**  

   The following image shows the pointer at **X: 7\.05**, **Y: 75\.10**\.  
![\[Locate the xy coordinates for the bottom corners of the viewport for creating your heatmap in the Lumberyard Cloud Gem Portal.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-metrics-sample-level-pointer-xy-coordinates.png)

1. Repeat steps 6 and 7 for the bottom right of the viewport\.
**Note**  
You'll specify these xy coordinates for the heatmap **Game World Coordinates** in the Cloud Gem Portal\.