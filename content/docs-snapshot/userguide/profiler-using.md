# Profiler Tutorial<a name="profiler-using"></a>

****  
Profiler is in preview release and is subject to change\. 

You can register an application in GridHub and use Profiler to capture, inspect, play back, and export the data that you collect\.

**Topics**
+ [Registering Your Application](#profiler-registering-application)
+ [Launching Profiler](#profiler-launching)
+ [Capturing Data](#profiler-capturing-data)
+ [Inspecting Data](#profiler-inspecting-data)
+ [Playing Back Data](#profiler-playing-back-data)
+ [Exporting Data](#profiler-exporting-data)

## Registering Your Application<a name="profiler-registering-application"></a>

To enable Profiler to capture information from your application, you must first register the application in GridHub\. To do so, add `AzFramework::TargetManagementComponent` to the application’s `SystemComponent`\. 

**Note**: Lumberyard's built\-in applications already have this component added by default\. 

## Launching Profiler<a name="profiler-launching"></a>

Unlike many Lumberyard utilities, you launch Profiler from its own executable file\.

**To launch profiler**
+ From the Lumberyard `dev\Bin64\` directory, run `Profiler.exe`\.  
![\[Profiler initial window\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/profiler-launched.png)

## Capturing Data<a name="profiler-capturing-data"></a>

Profiler has two main modes of use: *capture mode* and *inspection mode*\. 

To use capture mode, perform the following steps\. 

**To capture data**

1. Click **Target**\.   
![\[Target button\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/profiler-target-button.png)

   Profiler shows you the applications that are available for profiling:   
![\[Applications available for profiling\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/profiler-target-button-app-list.png)

1. Select a target application\. 

   After you have selected a target, the target selector shows the state of the connection to the target\. The next time you launch Profiler, it automatically selects your target for you, if it's available\.   
![\[Application selected for data capture\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/profiler-target-app-display.png)

   The window is divided horizontally into channels that have associated Profiler instances\. A channel is a collection of Profiler instances that relate to a specific system\. 

1. Each Profiler instance in a channel has a unique color\. A Profiler instance is active when its color is solid:   
![\[Active profiler instances\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/profiler-gridmate-channel-active.png)

   Click the color next to a Profiler instance\. The color is no longer solid, showing that the Profiler instance is inactive:  
![\[Inactive profiler instances\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/profiler-gridmate-channel-inactive.png)

   Click the color again to turn on the display and activate the instance again\.

1. After you have selected a target and chosen the Profiler instances that you want to see, click **Capture**\.   
![\[Capture button\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/profiler-capture-button.png)

   After the capture begins, data begins to populate the channels\.   
![\[Capture begin\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/profiler-capture-begin.png)

1. To stop the data capture, click **Stop Capture**\.   
![\[Stop Capture button\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/profiler-stop-capture-button.png)

1. When prompted, save the captured data to disk\. Profiler saves the data in a binary format file with a `.drl` extension, reloads the data from disk, and switches to inspection mode\. 
**Note**  
If you do not save the data, it will be discarded\. 

## Inspecting Data<a name="profiler-inspecting-data"></a>

You can use profiler to examine the data that you have captured\. 

**To inspect captured data**

1. In Profiler, click **File**, **Open Data**, or press **Ctrl\+O**:   
![\[Open Data\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/profiler-inspecting-open-data.png)

1. Navigate to the `.drl` file that contains your saved data and open it\. 

   The main screen of the Profiler provides an overview of the channels of system information\. This example uses a file that has 1162 frames of data:   
![\[Profiler main screen\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/profiler-inspecting-channels.png)

   You can use this main view to discover anomalies across channels, or to examine particular areas of interest at a high level\. 

   When you open the main window, the scroll box at the bottom is on the right because the playback stopped at the end of the captured data\. 

   Notice the red vertical line on the right\. 

1. Click in the channels area of the window\.   
![\[Click the window\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/profiler-inspecting-click-middle.png)

   The red vertical line moves to where you clicked\. The frame indicator shows the new position of the red line\. You can place the red line, which is called the *scrubber*, on any frame that you want to examine in detail\. For finer control over the position of the scrubber, you can enter a number in the **Frame** indicator\.   
![\[Frame indicator\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/profiler-inspecting-frame-indicator.png)

   The scrubber moves accordingly\. 

1. To view detailed information about a frame on which the scrubber rests, the click the **Detailed Profiling Information** icon next to the profiler instance whose data you would like to see:   
![\[Detailed Profiling Information\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/profiler-inspecting-details-icon.png)

   Profiler instance information appears in a detail window\.  
![\[Detail window\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/profiler-inspecting-detail-window-replica-activity.png)

   Individual profilers present details in different ways, so their detail windows can look different\. For information on system\-specific detail windows in Profiler, see [Using Profiler for Networking](network-profilers.md), [Using the Profiler for CPU Usage](profiler-cpu.md), and [Using Profiler for VRAM](profiler-vram.md)\.

1. To return to capture mode from inspection mode, click the **LIVE** tab\.  
![\[Click LIVE to return to capture mode\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/profiler-returning-to-capture-mode.png)

## Playing Back Data<a name="profiler-playing-back-data"></a>

You can mark and play back a subset of your captured data\.

Notice that after you moved the scrubber the first time, a yellow vertical line appeared on the right at the end of the data: 

![\[Yellow marker at the end\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/profiler-playing-back-yellow-line-on-right.png)

This yellow marker is movable and marks the end of your desired playback range\. By default, it is at the end of the captured data but may be obscured by the red scrubber\. 

1. Scroll the window all the way to the left, to the beginning of the capture range\.  
![\[Yellow marker at beginning\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/profiler-playing-back-scroll-tab-left.png)

   Now a yellow marker also appears at the beginning of the data\. You can use these two yellow markers, which by default are at the beginning and end of the capture range, to restrict the range of playback to an area of data that you are interested in\. You will use these shortly\. 

   If you have many frames of data \(as in this example\), the initial view does not show you all frames by default\. 

1. To see all frames at once, click the **Frame Count Selector**, which determines the number of frames visible, and choose **All frames**:   
![\[Choose all frames\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/profiler-playing-back-choose-all-frames.png)

   Now you can see the entire range of captured data, with the yellow markers at the beginning and at the end:   
![\[All frames\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/profiler-playing-back-all-frames-shown.png)

1. Drag the two yellow markers to an area of data that you want to play back\. You can ignore the position of the scrubber for now\.   
![\[\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/profiler-playing-back-restricted-range.png)

1. Click **Play** to start the playback:   
![\[Play recorded data\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/profiler-playing-back-click-play.png)

   As the data plays back, the scrubber moves from the first yellow marker to the second, and then loops back to the first\. 

   Here are some tips to keep in mind:
   + If the playback speed is too fast \(the default is 60\), use the **Playback Speed** option to adjust it from 1 through 60\. 
   + If you click a location in the playback window during playback, the playback stops and moves the scrubber to the location that you clicked\.
   + You can place the scrubber on a frame that you are interested in and click the detail button for a profiler instance to see the detail window for the frame\. 
   + For greater convenience and visibility, leave the profiler instance detail window open to see the data change in the detail window as the scrubber loops between markers\.   
![\[Detail window and main window open\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/profiler-playing-back-restricted-with-details-window.png)

1. Click **Stop** to stop the playback\.

## Exporting Data<a name="profiler-exporting-data"></a>

Some Profiler instances have an export option that you can use to save data to a `.csv` file\.

**To export data from a Profiler instance to a `.csv` file**

1. Click the **Save to CSV** icon for the Profiler instance whose data you want to save:   
![\[Click Save to CSV\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/profiler-exporting-save-to-csv-icon.png)
**Note**  
Not all profilers have the data export option\. 

1. To choose the fields that you want to export, click **Customize** in the export dialog box\.  
![\[Customize export fields\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/profiler-exporting-customize.png)