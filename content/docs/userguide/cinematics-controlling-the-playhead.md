# Controlling the Playhead<a name="cinematics-controlling-the-playhead"></a>

The Track View's **Play** toolbar contains the main controls for controlling the playhead for the sequence timeline\.

![\[Control the playhead in the Track View.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cinematics/cinematics-track-view-editor-play-toolbar.png)

The **Play** toolbar has the following controls\.


****  

| Toolbar Options | Description | 
| --- | --- | 
|  **Go to start of sequence**  |  Playhead is moved to the **In** marker of your sequence\. For more information, see [Setting the In and Out Markers](#setting-the-in-out-markers)\.  | 
|  **Play**  |  Activates play mode and moves the playhead forward through the sequence timeline\. Click the drop\-down menu to control the play speed\.  The default is **1x** speed\. Other options include **2x**, **1/2x**, **1/4x**, and **1/8x**\.  | 
|  **Stop**  |  Stops the playhead\. Click the drop\-down menu to specify the default **Stop** or **Stop with Hard Reset**, which returns the playhead to the start of the sequence\.  | 
|  **Pause**  |  During play mode, holds the playhead at the current point in the timeline\. When selected again, the sequence resumes playing\.  | 
|  **Go to end of sequence**  |  Playhead is moved to the **Out** marker of the sequence\.  For more information, see [Setting the In and Out Markers](#setting-the-in-out-markers)\.  | 
|  **Start Animation Recording**  |  Also known as record mode, you can manipulate objects within the level and the animation keys are automatically added to the sequence\.  For more information, see [Using Record Mode](cinematics-using-record-mode.md)\.  | 
|  **Start Auto Recording**  |  When selected, also activates record mode\. The playhead automatically moves in the timeline based on the setting specified in the drop\-down menu\.  The default is **1 sec**\. Other options include **1/2 sec**, **1/5 sec**, **1/10 sec**, **1/25** sec, **1/50** sec, and **1/100** sec\.  | 
| Loop |  During play mode, when the playhead reaches the **End** marker it returns to the **In** marker of the sequence and continues playing the sequence again\.  | 
|  **Playhead Location**  |  Shows information about the playhead's current location in the timeline and the assigned frame rate\.  | 
|  **Frame Rate**  |  Assigns the frame rate for the sequence\. This number is also used for frame snapping\.  | 
|  **Active Camera/Camera Name**  |  Camera name is updated to show which camera is active from the **Director Node** only if the **Editor Viewport Camera** is set to **Sequence Camera**\.  | 
|  **Undo**  |  Reverts the previous action\.  | 
|  **Redo**  |  Applies the previous action\.  | 

**Note**  
You can also manually adjust the playhead along the timeline\. At the top of the sequence timeline, select and drag the playhead to your preferred location\.

## Setting the In and Out Markers<a name="setting-the-in-out-markers"></a>

The **In** and **Out** markers are small red triangles at the top of the sequence timeline\. By default, the **In** and **Out** markers are set to the beginning and end of the sequence\. You can move the markers by right\-clicking at the top of the timeline where the frames/seconds are listed\. Depending on where you right\-click, the Track View identifies which marker is closest to the mouse cursor and moves that one\.

For example, if a sequence is 300 frames long, and you right\-click at the 50 frame tick, the **In** marker will move to that spot\. If you right\-click at the 200 frame tick, the **Out** marker will move to that spot\.

![\[Set the in and out markers in the timeline for a sequence.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cinematics/cinematics-track-view-editor-timeline.png)

**Note**  
When you move the **In** and **Out** markers, this will apply the updated range to the **Go to start of sequence**, **Play**, **Go to end of Sequence**, and **Loop** settings\. For example, if you change the **In** marker to the two second mark, the **Go to start of sequence** icon will now move the playhead to the two second mark\.