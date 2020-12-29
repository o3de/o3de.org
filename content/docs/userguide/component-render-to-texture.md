description: ' Use the Render to Texture component to create render targets in &ALYlong;. '
slug: component-render-to-texture
title: Render to Texture
---
# Render to Texture<a name="component-render-to-texture"></a>


****  

|  | 
| --- |
| This feature is in [preview](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#preview) release and is subject to change\.  | 

You can use the **Render to Texture** component to render the scene from a specific camera to a texture\. You can use this feature to create rear\-view mirrors, security camera screens, and draw 3D models in the viewport\. 

To enable this component, you must enable the [Render to Texture](gems-system-render-to-texture.md) gem\. To enable gems, see [Enabling Gems](gems-system-using-project-configurator.md)\.

![\[Render to Texture gem in the Project Configurator.\]](/images/userguide/shared/gem-render-to-texture.png)

**Topics**
+ [Adding the Render to Texture Component in a Scene](#adding-render-to-texture-to-scene)
+ [Adding a Render Target to a UI Element](#adding-render-target-to-UI-element)
+ [Render to Texture Properties](#component-render-to-texture-properties)
+ [EBus Request Bus Interface](#component-render-to-texture-ebus)
+ [EBus Notification Bus Interface](#component-render-to-texture-notification-ebus)
+ [Known Limitations](#component-render-to-texture-limitations)

## Adding the Render to Texture Component in a Scene<a name="adding-render-to-texture-to-scene"></a>

**Example**  
Entity \(**1**\) has a **[Camera](component-camera.md)** component and a **Render to Texture** component\. This entity faces a game object, entity \(**2**\)\. In entity \(**1**\), the **Render to Texture** component specifies a render target\. A material file references that render target as its diffuse texture\. The material is then added to entity \(**3**\), so that the render target appears in the viewport\.  

![\[Render to Texture component in the viewport.\]](/images/userguide/component/component-render-to-texture-1.png)

**To use the Render to Texture component**

1. In Lumberyard Editor, create an entity in the viewport\. For more information, see [Creating an Entity](creating-entity.md)\.

1. In the **Entity Inspector**, click **Add Component**\.

1. Select the **Camera** component, choose **Be this camera**, and then move the camera entity using the viewport camera controls to look at an object in your level\.

1. In the **Entity Inspector**, click **Add Component**\.

1. Select the **Render to Texture** component\.

1. For **Texture name**, enter a name that starts with the `$` character, such as `$rendertarget`\. 
**Note**  
The `$` character tells Lumberyard that the texture will not be loaded from disk\. If you don't specify the `$` character, Lumberyard will try to locate the texture file from disk, which can impact performance\.

1. To open the **Material Editor**, choose **Tools**, **Material Editor** or press **M**\. 

1. Click the **Add New Item** icon to create a material, enter a name such as `RenderToTexture`, and then click **Save**\.

1. In the **Texture Maps** section, for **Diffuse**, enter the **Texture name** that you specified, such as `$rendertarget`\.

1. In the **Asset Browser**, navigate to `primitive_plane.cgf`, and then select and drag the file into the viewport\.

1. Assign the material to the primitive plane entity\. In the **Mesh** component, for the **Material override** property, specify the material file that you created, such as `RenderToTexture.mtl`\.

   The primitive plane entity now shows the texture from the **Render to Texture** component\.

## Adding a Render Target to a UI Element<a name="adding-render-target-to-UI-element"></a>

You can also specify the render target in an **Image** component for a UI element\. For example, you can add the render target to appear in a button or object that a user can select in a UI menu\. 

For more information, see [Visual Components](ui-editor-components-visual.md)\.

**Example**  
A camera entity \(**1**\) faces the **Render to Texture** entity \(**2**\), which has a **Render to Texture** component attached\. The **Texture name** is `$rendertarget`\.  

![\[Add the render target for the UI Editor.\]](/images/userguide/component/component-render-to-texture-UI-example.png)

**To add a render target to a UI Image component**

1. Complete steps 1 to 6 in the previous procedure\. See [Adding the Render to Texture Component in a Scene](#adding-render-to-texture-to-scene)\.

1. In Lumberyard Editor, choose **Tools**, **UI Editor**\.

1. In the **UI Editor**, create or open a UI canvas\. 

1. Right\-click the canvas and choose **New**, **Element from Slice Library**, **Image**\.

1. In the **Image** component, for **SpriteType**, click the drop\-down menu, and then select **Render target**\.

1. For **Render target name**, enter the same texture name in the **Render to Texture** component, such as `$rendertarget`\. 

   The UI **Image** component displays the render target in the **UI Editor**\.  
![\[Add the render target to the Render target name in an Image component.\]](/images/userguide/component/component-render-to-texture-UI-element.png)

## Render to Texture Properties<a name="component-render-to-texture-properties"></a>

![\[Render to Texture component properties.\]](/images/userguide/component/component-render-to-texture-2.png)

The **Render to Texture** component has the following properties\.


****  

| Name | Description | 
| --- | --- | 
|  **Camera**  |  Entity with a **Camera** component attached to use as the view\. If you specify an entity without a **Camera** component, only the position and orientation will be used from that entity\.  If you don't specify an entity, this property defaults to the entity to which the **Render To Texture** component is attached\.  | 
|  **Texture name**  |  Name of the texture to which to render\. Follow the Lumberyard convention of using a `$` as the first character in the texture name\. This is how Lumberyard denotes render targets\.  | 
|  **Max FPS**  |  Maximum frames per second at which this view updates\.  | 
|  **Width**  |  Width of the render texture, in pixels\.  | 
|  **Height**  |  Height of the render texture, in pixels\.  | 
|  **Apply Gamma**  |  Enables gamma application to the texture\. If you want to use this texture with a material inside the main view, leave this property disabled, because gamma will be applied to the entire scene during post\-processing\.   As a best practice, if you are using render targets in the UI, clear the **Apply Gamma** property and don’t select the **Render Target sRGB** property in the UI **[Image](ui-editor-components-image.md)** component\. However, if the texture appears too dark, you can set either property\.   | 
|  **Alpha Mode**  |  You can specify the following values: [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/component-render-to-texture.html) [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/component-render-to-texture.html)  | 
|  **Enable Ocean**  |  Enables drawing the ocean in the render target\.  | 
|  **Enable Terrain**  |  Enables drawing terrain in the render target\.  | 
|  **Enable Vegetation**  |  Enables drawing vegetation in the render target\.  | 
|  **Enable Shadows**  |  Enables drawing shadows in the render target\.  | 
|  **GSM LODs**  |  Number of global shadow map levels of detail \([LOD](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#lod)\) to use for the render to texture scene\. A value of `-1` will use the current settings for the `e_GsmLodsNum` console variable\.  | 
|  **GSM range**  |  Global shadow map range to use for the render to texture scene\.  A value of `-1` will use the current settings for the `e_GsmRange` console variable\.  | 
|  **GSM range step**  |  Global shadow map range step to use for the render to texture scene\.  A value of `-1` will use the current settings for the `e_GsmRangeStep` console variable\.  | 
|  **Antialiasing Mode**  |  You can specify the following values: [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/component-render-to-texture.html)  | 
|  **Display Debug Image**  | Displays debug overlay images in Lumberyard Editor only\. | 
|  **Update in editor**  |  Enables updating the render target outside of game mode while in Lumberyard Editor\.  | 

## EBus Request Bus Interface<a name="component-render-to-texture-ebus"></a>

You can use the event bus \(EBus\) interface to communicate with other components in your game\.

For more information, see [Working with the Event Bus \(EBus\) system](ebus-intro.md)\.


****  

| Request Name | Description | Parameter | Return | Scriptable | 
| --- | --- | --- | --- | --- | 
|  `GetTextureResourceId`  |  Gets the resource ID of the render target\.  A value of `-1` is an invalid render target\.  |  None  |  integer  |  Yes  | 
|  `SetAlphaMode`  |  Sets the alpha mode for the render target\.  |  `0` = Disabled `1` = Opaque `2` = Depth based  |  None  |  Yes  | 
|  `SetCamera`  |  Sets the entity with a **Camera** component to use for rendering\.  |  `EntityID`  |  None  |  Yes  | 
|  `SetEnabled`  |  Enables or disables rendering to texture\.  |  `0` = Disable `1` = Enable  |  None  |  Yes  | 
|  `SetMaxFPS`  |  Sets the maximum rate at which this render target updates, in frames per second\.  |  `FPS`  |  None  |  Yes  | 
|  `SetWriteGamma`  |  Enables or disables gamma application\.  |  `0` = Disable `1`= Enable  |  None  |  Yes  | 

## EBus Notification Bus Interface<a name="component-render-to-texture-notification-ebus"></a>

You can use the event bus \(EBus\) interface to communicate with other components in your game\.

For more information, see [Working with the Event Bus \(EBus\) system](ebus-intro.md)\.


****  

| Request Name | Description | Parameter | Return | Scriptable | 
| --- | --- | --- | --- | --- | 
|  `OnPreRenderToTexture`  |  Called before rendering to texture begins for each **Render to Texture** component\.  |  None  |  None  |  Yes  | 
|  `OnPostRenderToTexture`  |  Called after rendering to texture is finished for each **Render to Texture** component\.  | None | None |  Yes  | 

## Known Limitations<a name="component-render-to-texture-limitations"></a>

The **Render to Texture** component supports DirectX 11 for Windows\.

### Prevent Graphical Artifacts When Render to Texture is Active with the Following CVARs<a name="prevent-graphical-artifacts"></a>

Forces the object LOD to update at the beginning of the frame instead of the end of the previous frame\. If you don't set this console variable, you may see LOD flickering\.

For more information about setting console variables, see [Using the Console Window](console-intro.md)\.

```
e_LodForceUpdate=1
```

Disables precaching of the streaming system due to common large jumps in the camera position when the render to texture feature is active\.

```
e_AutoPrecacheCameraJumpDist=0
```

Enables subpixel morphological antialiasing \(SMAA\) instead of temporal antialiasing \(TAA\)\.

```
r_AntialiasingMode=2
```

Disables volumetric fog\.

```
e_volumetricFog=0
```

Disables multi\-GPU mode\.

```
r_MultiGPU=0
```

Disables sparse voxel octree global illumination \(SVOGI gem\)\.

```
e_GI=0
```

You might see flickering, black or blurry textures if the streaming system thrashes while the **Render to Texture** component is active\. This can occur in a scene that uses a large amount of texture memory\. 

To fix this, increase the value for `r_TexturesStreamPoolSize`, or set the **Max FPS** property to `0` so that the component updates each frame\. This might help the streaming system balance texture priorities\. 

**Tip**  
To verify if the graphics artifacts are a result of streaming thrashing, set `r_TexturesStreamingDebug` to `2`\. This console variable shows the textures that are streamed in and the memory usage\.

### Unsupported Features in the Render Target<a name="unsupported-for-render-to-texture"></a>

The following features are not supported for the **Render to Texture** component because they don't work with multiple cameras\.
+ TAA and SMAA
+ Lens flares
+ Sun shafts
+ Volumetric fog
+ CBuffer \(constant buffer\) occlusion \(vis areas are supported\)
+ Motion blur
+ Merged mesh vegetation
+ Shadows cache