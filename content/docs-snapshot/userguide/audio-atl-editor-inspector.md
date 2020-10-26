# Inspector Pane<a name="audio-atl-editor-inspector"></a>

In the **Inspector** pane, you can edit the properties of the control that you selected in the **ATL Controls** pane\. You can modify the control's **Name**, select a **Scope**, and modify the **Connected Controls**\.

![\[Modify controls in the Inspector pane of the Audio Controls Editor.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/audio/audio-atl-editor-inspector.png)

 The following table describes the properties that you can modify in the **Inspector** pane\. 


**Inspector Properties**  

| Property | Description | 
| --- | --- | 
| Name |  Name of the control\. You can customize the name in the **ATL Controls** pane\.   | 
| Scope |  Controls can exist for a global or on a per\-level scope\. A control with a global scope exists as long as the game is running and regardless of whether the control is used in the current level\. When a specific level is defined as the scope, the controls exist only when that level is loaded\. This setting is useful in low\-memory systems because controls are loaded only in levels in which they are needed\.  | 
| Auto Load |  Available only for preloads\. If you select **Auto Load**, the elements preloaded with this control will be reference counted; only one copy of them is created that is shared between all users\.   | 
| Preloaded Soundbanks |  Available only for preloads\. The soundbanks connected with a preload can be different for different platforms\. Different soundbanks can be added to different groups, and then in the **Platforms** field, you can choose which group to load for each platform that you are targeting\.  | 
| Platforms |  Available only for preloads\. You can specify which group of soundbanks to load for each platform\. You can share a group between several platforms\.  | 
| Connected Controls |  Contains the middleware controls connected to your control\.  | 

**Note**  
The **Auto Load**, **Preloaded Soundbanks**, and **Platforms** properties appear only when the control is a **Preload**\.