# Using the Track Editor<a name="ui-animation-track-editor"></a>

The **Track Editor** displays all the tracks in your current animation sequence\. The **Track Editor** enables you to do the following:
+ Move, delete, copy, and paste keys
+ Change the timeline of the animation
+ Control the animation preview range

**To display the Track Editor**
+ In the [**Animation Editor**](ui-animation.md), choose **View**, **Track Editor** or **View**, **Both**\.

**To zoom in or out**
+ Scroll the mouse wheel

**To pan the view**
+ With the mouse in the **Track Editor**, drag using the middle mouse button

**Topics**
+ [Working with Keys in the Track Editor](#ui-animation-track-editor-keys)
+ [Moving the Play or Record Point in the Track Editor](#ui-animation-track-editor-play-record)
+ [Previewing in the Track Editor](#ui-animation-track-editor-preview)

## Working with Keys in the Track Editor<a name="ui-animation-track-editor-keys"></a>

When you create an animation, key values are automatically recorded\. Using the **Track Editor**, you can move, delete, copy, and paste keys\. Keys are represented by a green circle on the timeline of each track\.

**To move a key**
+ Click a key and drag it to a new time on the timeline\.

**To constrain movement to time only**
+ Hold **Shift** as you drag the key to a new time on the timeline\.

**To scale the selected keyframes while moving a key**
+ Hold **Alt** as you drag the key to a new time on the timeline\.

**To delete a key**
+ Right\-click a key and click **Delete**\.

**To copy a key**
+ Right\-click a key and click **Copy**\.

**To paste a key**
+ Right\-click in the timeline and click **Paste**\. Move the key to the desired point on the timeline, then click to place\.

The **Track Editor**'s toolbar features a variety of tools to improve your workflow efficiency when editing tracks\. Pause over each icon to reveal the tooltips\.

Some of the toolbar functions require you to select multiple keys\.

**To select multiple keys**
+ In the **Track Editor**, drag to select multiple keys\. The selected keys appear as white circles\.

You can also use the Track Editor toolbar to select, move, and snap keys\. When moving keys, you can choose to snap them to other keys, to frames, or to second ticks\. 


**Working with Keys in the Track Editor Toolbar**  

| Toolbar icon | Function | 
| --- | --- | 
| Go to previous key | Selects the key directly before the currently selected key\. | 
| Go to next key | Selects the key directly after the currently selected key\. | 
| Slide keys | Moves the currently selected key and slides all the keys after it to the new point on the timeline while maintaining the original spacing\. | 
| Move keys | Moves the currently selected key\(s\) to the new point on the timeline without affecting other keys\. | 
| Scale keys |  Functions only with multiple keys selected to increase or decrease the space between the selected keys proportionally\.  | 
| Magnet Snapping | Snaps to keys in other tracks as you get close to them; allows you to place the key anywhere but indicates a red circle on the key you want to snap to\. | 
| Frame Snapping | Snaps to frames\. | 
| Tick Snapping | Snaps to second ticks\. | 

## Moving the Play or Record Point in the Track Editor<a name="ui-animation-track-editor-play-record"></a>

The play or record point of the animation sequence is shown as a vertical magenta slider on the timeline\. Move the play or record point, and the properties of the UI elements in the [**Animation Editor**](ui-animation.md) change to the values specified by the animation tracks\.

**To move the play or record point in the Track Editor**
+ Click or drag the vertical magenta slider in the timeline\.

## Previewing in the Track Editor<a name="ui-animation-track-editor-preview"></a>

The **Track Editor** features a timeline along its top edge\. To preview your entire animation, simply click the **Play** button to play your animation at its normal speed\. You can also change the speed of preview by clicking the arrow beside the play button and selecting 2, 1, ½, ¼, or ⅛\. You can also limit your animation preview, as it plays, to a specific time frame\.

**To limit play preview in the Track Editor**

1. In the timeline, at the start of your preferred preview time, right\-click to mark the time with a red triangle\.

1. In the timeline, at the end of your preferred preview time, right\-click again to mark the end time with a red triangle\.

1. Click the **Play** button to preview your animation in the time frame specified\.

**Note**  
When you preview an animation or move the playback position on the timeline, it moves the UI elements in the **UI Editor**\. This means that, if you then save the canvas, these UI elements will be saved in this position\.   
Reposition the timeline or preview a different sequence to position the UI elements at the positions in which you want them to load before you save the canvas\.