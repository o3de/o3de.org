# Debugging UI Canvases<a name="ui-editor-debugging-ui-canvases"></a>

You can use the following console commands and console variables to display debug information for the UI when your game is running\.

[ui\_DisplayCanvasData](#ui-editor-debugging-ui-canvases-display-canvas-data)

[ui\_DisplayDrawCallData](#ui-editor-debugging-ui-canvases-display-draw-call-data)

[ui\_DisplayElemBounds](#ui-editor-debugging-ui-canvases-display-elem-bounds)

[ui\_DisplayTextureData](#ui-editor-debugging-ui-canvases-display-texture-data)

[ui\_ReportDrawCalls](#ui-editor-debugging-ui-canvases-report-draw-calls)

## ui\_DisplayCanvasData<a name="ui-editor-debugging-ui-canvases-display-canvas-data"></a>

Displays canvas data for enabled or loaded canvases\.


****  

| Value | Description | 
| --- | --- | 
| 0 | Off\. | 
| 1 | Displays a line of information for each loaded canvas\. | 
| 2 | Displays information only for canvases that are enabled\. | 

The following example displays data for five loaded UI canvases\.

![\[Canvas data for five loaded UI canvases.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/game_ui_editor/ui-editor-debugging-ui-canvases-1.png)

The following table describes each column\.


****  

| **Column** | **Description** | 
| --- | --- | 
| NN | The index number of the canvas in the list\. The canvases are listed in the order that they're drawn in\. | 
| Name | The leaf canvas name\. | 
| En | Whether the canvas is enabled\. | 
| Po | Whether the canvas accepts positional inputs \(for example, mouse input\)\. | 
| Na | Whether the canvas has navigation enabled\. | 
| DO | The draw order, which is used to sort the list of loaded canvases\. | 
| nElem | The number of UI elements in the canvas\. | 
| nEnab | The number of enabled UI elements in the canvas\. If a parent isn't enabled, the element isn't counted\. | 
| nRend | The number of enabled renderable elements in the canvas \(how many images, text and particle effects are being rendered\)\. | 
| nRCtrl | The number of enabled "render control" elements in THE canvas \(masks and faders\)\. | 
| nImg | The number of enabled UI elements with UiImageComponents\. | 
| nText | The number of enabled UI elements with UiTextComponents\. | 
| nMask | The number of enabled UI elements with UiMaskComponents\. | 
| nFadr | The number of enabled UI elements with UiFaderComponents\. | 
| nIntr | The number of enabled UI elements with interactable components \(Button, Slider, TextInput, and so on\)\. | 
| nUpdt | Number of enabled UI elements with components that listen for updates \(that is, that potentially do something every frame\)\. | 
| ActiveInt | The name of the active interactable on this canvas \(if any\)\. | 
| HoverInt | The name of the current hover interactable on this canvas \(if any\)\. | 

## ui\_DisplayDrawCallData<a name="ui-editor-debugging-ui-canvases-display-draw-call-data"></a>

Displays the number of draw calls used to render UI canvases\. This variable is useful for performance tuning and debugging\.


****  

| Value | Description | 
| --- | --- | 
| 0 | Turns off the display\. | 
| 1 | Turns on the display\. | 

The following example data shows draw call information for four UI canvases\.

![\[Draw call information for four UI canvases.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/game_ui_editor/ui-editor-debugging-ui-canvases-2.png)

The following table describes each column\.


****  

| Column | Description | 
| --- | --- | 
| NN | The index number of the canvas in the list\. The canvases are listed in the order that they're drawn in\. | 
| Name | The leaf canvas name\. | 
| nDraw | The number of draw calls\. | 
| nPrim | The number of primitives \(for example, images and text strings\)\. | 
| nTris | The number of triangles rendered for the UI\. | 
| nMask | The number of mask render nodes in the render graph\. | 
| nRTs | The number of render target render nodes in the render graph\. | 
| nUTex | The number of unique textures being rendered in the canvas in this frame\. | 
| XMask | The number of draw calls caused by the use of masks\.  One mask can cause up to four extra draw calls\.  | 
| XRT | The number of draw calls caused by render targets\. | 
| XBlnd | The number of draw calls caused by a change in blend mode\. | 
| XSrgb | The number of draw calls caused by a change in Srgb write\. This data point appears only for render targets \(for example, playing video\)\. | 
| XMaxV | The number of draw calls caused by a render node that requires more than 65536 vertices or 16384 quads\. This case is uncommon\. For example, more than 16000 characters of text would be required for a value to appear\. | 
| XTex | The number of draw calls that occur when the shader supported maximum of 16 textures is reached\. To reduce the number of these calls, you can use a texture atlas\. For more information, see [Using Texture Atlases](ui-editor-texture-atlases.md)\. | 

## ui\_DisplayElemBounds<a name="ui-editor-debugging-ui-canvases-display-elem-bounds"></a>

This console command displays an overlay on the screen that shows the rectangles of elements\. By default, it shows the rectangular bounds of every UI element for each enabled UI canvas\.

If you have several enabled UI canvases and want to see the rectangular bounds for only one canvas, use the `ui_DisplayElemBoundsCanvasIndex` console variable\. To use the `ui_DisplayElemBoundsCanvasIndex` console variable, specify the index of the canvas whose bounds you want to display\. To find the index for an enabled canvas, use the `ui_DisplayCanvasData 2` setting\.

The following example shows the rectangular bounds of nested scrollboxes\.

![\[Rectangular bounds displayed for nested scrollboxes.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/game_ui_editor/ui-editor-debugging-ui-canvases-3.png)

## ui\_DisplayTextureData<a name="ui-editor-debugging-ui-canvases-display-texture-data"></a>

Displays the textures that the UI is using\.

The display shows the dimensions, data size, texture format, and pathname of each texture that the UI system is using in the current frame\. The textures are sorted in descending order by the amount of memory that they use\.

The following example shows data for 13 unique textures in the current frame\.

![\[Data for 13 unique textures in the current frame.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/game_ui_editor/ui-editor-debugging-ui-canvases-4.png)

## ui\_ReportDrawCalls<a name="ui-editor-debugging-ui-canvases-report-draw-calls"></a>

Writes a report of draw calls to a log file\.

The command output displays the location of the log file, as in the following example\.

![\[Entering the ui_ReportDrawCalls command.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/game_ui_editor/ui-editor-debugging-ui-canvases-5.png)

The log file is written to `lumberyard_version\dev\Cache\project_name\pc\user\log\LyShine\drawcallreport.txt`\.

The log file lists all of the draw calls for each enabled canvas\. The report can be useful for determining how to reduce the number of draw calls\.

For more information, see [Using Texture Atlases to Reduce UI Draw Calls](ui-editor-texture-atlases-using-texture-atlases-to-reduce-ui-draw-calls.md)\.