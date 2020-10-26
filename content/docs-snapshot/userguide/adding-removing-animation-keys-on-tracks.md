# Adding and Removing Animation Keys on Tracks<a name="adding-removing-animation-keys-on-tracks"></a>

You can add a keyframe to a track in the timeline with one of the following:

**Double\-click the track**  
This is the quickest way to add an animation key to the track\. This adds a key exactly where you click and stores the data at the exact point in the timeline\.

**Add Keys**  
In the **Keys** toolbar, click the **Add Keys** icon ![\[Add Keys button\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cinematics/cinematic-add-keys-track-view-editor.png) and then click the timeline\. This is useful if you need to add many keys to the timeline\. To stop adding keys, choose the move, scale, or slide icon ![\[Move, scale, and slide buttons\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cinematics/cinematics-move-scale-slide-keys-icon-track-view-editor.png)\.

**Record Mode**  
In the **Play** toolbar, click the **Record Mode** icon ![\[Record button\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cinematics/cinematics-record-icon-track-view-editor.png) and then makes changes directly to your components\.   
When you enter record mode, you can update the component entities that are part of the sequence in the viewport\. Animation keys are added automatically to the appropriate node tracks in the timeline, based on the current location of the timeline playhead\.   
For example, if you specify a different value for the **Transform** component at three seconds, the key for this update appears in the timeline\.  
To specify an animation to play over time, move the playhead to different places along the timeline\. Otherwise, you will overwrite the keys at the same location of the timeline as you update the component entities in the level\.  
To stop recording, click the **Record Mode** icon again\.  
For more information, see [Using Record Mode](cinematics-using-record-mode.md)\.

You can delete individual keys or click and drag to select multiple animation keys\.

**To delete keys from your timeline**

1. In the timeline, select a key\.

1.  Do one of the following:
   + Right\-click the key and choose **Delete**\.
   + Press **Delete** on your keyboard\.
   + In the **Keys** toolbar, click the **Delete Keys** icon ![\[Delete keys button\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cinematics/cinematics-delete-keys-icon-track-view-editor.png)\.