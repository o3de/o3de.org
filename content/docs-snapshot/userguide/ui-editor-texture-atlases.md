# Using Texture Atlases<a name="ui-editor-texture-atlases"></a>

To reduce draw calls, you can add individual textures to a texture atlas and then add one or more texture atlases to a UI canvas\.

## Characteristics<a name="ui-editor-texture-atlases-characteristics"></a>

UI canvases and texture atlases have the following characteristics:
+ Each UI canvas contains a list of texture atlases to be loaded\.
+ Texture atlases are loaded when the UI canvas loads\. They're unloaded when the UI canvas unloads\.
+ If multiple UI canvases load the same texture atlas, the texture atlas is loaded only once\.
+ UI elements that render textures preferentially use textures from a loaded texture atlas, if available\.
+ The texture atlas is only unloaded when all UI canvases that loaded it are unloaded\.

## Advantages<a name="ui-editor-texture-atlases-advantages"></a>

The principle advantages of texture atlases are the following:
+ Draw calls are significantly reduced\.
+ Enhanced compression\. Although source textures whose dimensions aren't multiples of four aren't compressed, texture atlases are always compressed\.
+ Forced preloading of texture groups\. When the canvas loads, it also loads its texture atlases\.

To see examples of texture atlases, open the **UITextureAtlasSample** level in the Lumberyard SamplesProject\.

**Topics**
+ [Characteristics](#ui-editor-texture-atlases-characteristics)
+ [Advantages](#ui-editor-texture-atlases-advantages)
+ [Creating a Texture Atlas](ui-editor-texture-atlases-creating.md)
+ [Adding Texture Atlases to a UI Canvas](ui-editor-texture-atlases-adding-texture-atlases-to-a-ui-canvas.md)
+ [Using Texture Atlases to Reduce UI Draw Calls](ui-editor-texture-atlases-using-texture-atlases-to-reduce-ui-draw-calls.md)