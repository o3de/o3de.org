# Recording Animation Data<a name="ui-animation-recording"></a>

Recording animation typically involves three steps: 

1. Create a new animation sequence\.

1. Add a UI element to that sequence\.

1. Turn on animation recording to capture changes in the element properties\.

Adding a UI element also adds a node to the sequence\. After that any time that you enter record mode, a track is automatically added to your animation for any change you make to this UI element\. You do not need to manually add tracks\. For more information, see [Using the Node Pane](ui-animation-using-node-pane.md)\.

You can create an animation sequence from the **Animation Editor** menu or toolbar\.

**To create a new animation sequence**  
In the [**Animation Editor**](ui-animation.md), do one of the following:
+ From the **Sequence** menu, choose **New Sequence**\.
+ Click the **Add Sequence** icon on the toolbar\.

**To add a UI element to the sequence**

1. In the [**UI Editor**](ui-editor-using.md), select the UI element that you want to animate\.

1. In the **Animation Editor**, right\-click the sequence that you created and click **Add Selected UI Element\(s\)**\.

**To record an animation sequence**

1. In the **Animation Editor** toolbar, click the **Record** icon\.

1. In the **UI Editor**, use either the **Properties** pane or viewport pane to make changes to the selected UI element\.

1. After making all changes, click the **Stop** icon in the **Animation Editor** toolbar\.

**Note**  
In the current release, not all component properties can be recorded\. For example, enumerated values, such as the image type of an image component, cannot be animated\.

After you record a track, it appears beneath its UI element\. The node pane lists your current animation sequences\. For more information on the **Node Pane**, see [Using the Node Pane](ui-animation-using-node-pane.md)