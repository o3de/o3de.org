# Using Texture Atlases to Reduce UI Draw Calls<a name="ui-editor-texture-atlases-using-texture-atlases-to-reduce-ui-draw-calls"></a>

The UI shader can combine draw calls that use up to a maximum of 16 textures\. If this limit is exceeded, you can use texture atlases to reduce the number of draw calls\.

Deciding which textures to add to a texture atlas is a two\-part process:

1. Find out which canvases have draw calls that might be reduced by using texture atlases\.

1. Determine which textures to place in specific texture atlases\.

To gather data to make these determinations, you can use the Lumberyard Editor console\.

**To determine the textures to add to a texture atlas**

1. In the Lumberyard Editor console, set the `ui_DisplayDrawCallData` console variable to **1** to display the draw call information for each loaded canvas, as in the following example\.

   ```
   ui_DisplayDrawCallData 1
   ```

1. In the last column in the display of draw call information, note the values under **XTex**\. The **XTex** column shows the number of draw calls when the shader supported maximum of 16 textures is reached\. To reduce the number of draw calls, use a texture atlas\.  
![\[Location of the XTex column in the draw call information output.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/game_ui_editor/ui-editor-texture-atlases-8.png)

1. In the Lumberyard Editor console, enter the `ui_ReportDrawCalls` console command\. This command outputs a report of the draw calls for all active canvases into a text file\.

1. Open the `lumberyard_version\dev\Cache\your_project_name\pc\user\log\LyShine\drawcallreport.txt` log file\.

1. At the end of the report, examine the following two sections to identify the textures to put into texture atlases\.

   ```
   --------------------------------------------------------------------------------------------
   Textures used on multiple canvases that are causing extra draw calls
   --------------------------------------------------------------------------------------------
   ```

   ```
   --------------------------------------------------------------------------------------------
   Per canvas report of textures used on only that canvas that are causing extra draw calls
   --------------------------------------------------------------------------------------------
   ```

1. When deciding which textures to put into a texture atlas, consider the following points:
   + A texture atlas reduces draw calls only if the textures in the atlas are used on screen at the same time\. Therefore, to reduce draw calls, put textures that are going to be on screen at the same time into the same texture atlas\.

     For example, suppose you have texture sets A and B\. The textures in A appear in one screen state, and the textures in B appear in a different screen state\. In this situation, put the textures in A into one texture atlas and the textures in B into a different texture atlas\.
   + The default maximum size of a texture atlas is `4096x4096`\.

     Because this limits the number of textures in a texture atlas, having the UI load multiple separate texture atlases is a good practice\.

For more information on the `ui_DisplayDrawCallData` and `ui_ReportDrawCalls` commands, see [Debugging UI Canvases](ui-editor-debugging-ui-canvases.md)\.