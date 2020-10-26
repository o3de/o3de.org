# Scale to Device<a name="ui-editor-transform-scale"></a>

The **Scale to Device** property helps build game UIs that can display on multiple screen resolutions\. You can preview your canvas at different resolutions in the UI Editor in **Preview Mode**\.

A device scale is computed by using the ratio of the authored canvas size to the runtime canvas size\. The device scale is then adjusted based on the selected **Scale to Device** setting\. When you select any **Scale to Device** setting other than **None**, the device scale is multiplied with the **Transform2D** component's **Scale** property to get the final local scale for the element\.

The following **Scale to Device** settings are available:


****  

| Property | Description | 
| --- | --- | 
| None | Does not scale with the device resolution\. | 
| Scale to fit \(uniformly\) | Scales to fit while maintaining the aspect ratio\. The final device scale for both X and Y is the minimum of the width and height ratios between the authored canvas size to the viewport size\. | 
| Scale to fill \(uniformly\) | Scales to fill while maintaining the aspect ratio\. The final device scale for both X and Y is the maximum of the width and height ratios between the authored canvas size to the viewport size\. | 
| Scale to fit X \(uniformly\) | Scales to fit horizontally while maintaining the aspect ratio\. The final device scale for both X and Y is the ratio between the authored canvas width to the viewport width\. | 
| Scale to fit Y \(uniformly\) | Scales to fit vertically while maintaining the aspect ratio\. The final device scale for both X and Y is the ratio between the authored canvas height to the viewport height\. | 
| Stretch to fill \(non\-uniformly\) | Stretches to fill horizontally and vertically without maintaining the aspect ratio\. The final device scale is the ratio between the authored canvas size to the viewport size\. | 
| Stretch to fit X \(non\-uniformly\) | Stretches to fit horizontally, but doesn't stretch vertically\. The final device scale for X is the ratio between the authored canvas width to the viewport width\. Y doesn't scale with the device resolution\. | 
| Stretch to fit Y \(non\-uniformly\) | Stretches to fit vertically, but doesn't stretch horizontally\. The final device scale for Y is the ratio between the authored canvas height to the viewport height\. X doesn't scale with the device resolution\. | 

When using the **Scale to Device** setting, note the following:
+ Scaling is performed about the element's pivot\.
+ Scaling an element doesn't affect the value of its offsets from its anchors\.
+ The element's final scale includes any scale inherited from its parents\. Set the **Scale to Device** property on a UI element whose child elements that you also want to scale with the device resolution\.
+ Setting **Scale to Device** on a UI element and a descendant element results in double scaling on the descendant element\.
+ Avoid setting **Scale to Device** on a UI element that doesn't have its anchors together\. Doing so can result in undesired behavior\. This is because the anchors affect the size of the element relative to its parent, and the **Scale to Device** scale is applied on top of that\.  
**Example**  

  The element's size matches the viewport's size if you set the anchors to the following values:
  + Left = 0%
  + Top = 0%
  + Right = 100%
  + Bottom = 100%

  However, if you then add a scale on top of these anchor values, the element size no longer matches the viewport size\.

## Scale to Device Examples<a name="ui-editor-transform-scale-examples"></a>

Each of the following examples demonstrates a different **Scale to Device** setting\.

In each example, the background image covers the whole screen and uses the following settings:
+ Anchors \(apart\): Left = 0%, Top = 0%, Right = 100%, Bottom = 100%
+ Image type: Tiled
+ Scale to Device: None

### Uniform Scaling<a name="ui-editor-transform-scale-uniform"></a>

In this uniform scaling example, the UI parent element has a fixed aspect ratio and is centered and fitted to the screen that it's displayed on\.

The background image is a texture with simple [settings](#ui-editor-transform-scale-uniform)\.

The elements that make up the UI are all contained in a parent element and has the following settings\.


**Parent UI element settings**  

| Property | Values | 
| --- | --- | 
| Anchor | Left = 50%, Top = 50%, Right = 50%, Bottom = 50% | 
| Pivot | Default settings: X = 0\.5, Y = 0\.5 | 
| Width and Height | Matches the authored canvas size \(for example, 1280x720\) | 
| Scale to device | Scale to fit \(uniformly\) | 

![\[Scale to fit uniformly example.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/game_ui_editor/ui-editor-transform-scale-1.gif)

### Scale to Fit Y<a name="ui-editor-transform-scale-fit-y"></a>

In this uniform scale to fit Y example, the layout column and its buttons are uniformly scaled so that they fit vertically on the screen regardless of its resolution\.

The background image is a texture with simple [settings](#ui-editor-transform-scale-uniform)\.

The elements that make up the buttons are contained in a layout column element\. The layout column element contains the UI buttons and has the following settings\.


**Layout Column element settings for uniform scaling to fit Y**  

| Property | Values | 
| --- | --- | 
| Anchors | Left = 50%, Top = 50%, Right = 50%, Bottom = 50% | 
| Pivot | Default settings: X = 0\.5, Y = 0\.5 | 
| Scale to device | Scale to fit Y \(uniformly\) | 

![\[Scale to fit Y uniformly example.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/game_ui_editor/ui-editor-transform-scale-2.gif)

## Uniform Scaling While Maintaining Relative Position<a name="ui-editor-transform-scale-uniform-position"></a>

In this example, the **Scale to Device** setting scales the health bar and speed indicator depending on the screen resolution\. Anchor settings maintain their positions so that the health bar always appears in the right corner and the speed indicator always appears in the center\.

The background image is a texture with simple [settings](#ui-editor-transform-scale-uniform)\.

The health bar element has the following settings\. The anchor values keep it on the upper right corner of the screen\.


**Health bar element settings**  

| Property | Values | 
| --- | --- | 
| Anchors | Left = 100%, Top = 0%, Right = 100%, Bottom = 0% | 
| Pivot | X = 1\.0, Y = 0\.0 | 
| Scale to device | Scale to fit \(uniformly\) | 

The speed indicator element has the following settings\. The anchor values keep it in the top center of the screen\.


**Health bar element settings**  

| Property | Values | 
| --- | --- | 
| Anchors | Left = 50%, Top = 0%, Right = 50%, Bottom = 0% | 
| Pivot | X = 0\.5, Y = 0\.0 | 
| Scale to device | Scale to fit \(uniformly\) | 

The following images show how the health bar and speed indicator scales based on the screen resolution while maintaining their position on the screen\.

**Note**  
The indicated resolutions are not shown to scale\.

![\[Example of scaling elements while maintaining relative positions.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/game_ui_editor/ui-editor-transform-scale-uniform-position.png)