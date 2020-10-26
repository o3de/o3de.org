# Particles Attribute<a name="particle-editor-reference-particles"></a>

In the **Particles** attribute, specify how to control the particle's basic appearance\. 

**Note**  
We recommend that you set up the **Particles** attribute first because it includes the **Texture** file, which is used for most particles\.

![\[Particles attribute in the Particle Editor.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/particles/particle-editor-particles.png)


**Particles Attribute Parameters**  

| Name | Description | 
| --- | --- | 
| Particle Life Time | Specifies the lifetime of individual particles\. After an emitter's lifetime has expired, spawned particles live out their own lifetime\. Valid values: `0+` | 
| Remain While Visible | Indicates that particles do not die until the entire emitter is out of view\. This is typically used for emitters that move through space quickly and die to avoid particle pooling and other unintended consequences\. Default value: false | 
| Facing | Determines how the sprite or geometry is oriented in space\. You can further modify texture orientation using the following rotational parameters\. [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/particle-editor-reference-particles.html)Default value: **Camera** | 
| Blend Type | Applies to 2D particles only and determines how the sprite blends with the background\. [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/particle-editor-reference-particles.html)Default value: **Alpha Based** | 
| Material |  Opens the **Asset Browser** for you to assign a material for the 2D sprite particles\. Different shaders are uniquely affected by the lighting and environment\.  Default value: Empty  | 
| Sorting Method | \(GPU only\) Enables intra\-GPU emitter sorting\. [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/particle-editor-reference-particles.html)Default value: None | 
| Sorting Convergence | \(GPU only\) Sorts convergence per frame for an odd to even merge sort\. Default value: `1` | 
| Texture | Opens the Asset Browser to specify a texture for the 2D sprite particles\. When you pause on the input box, a preview of the texture appears\. Default value: `/Editor/Plugins/ParticleEditorPlugin/defaultparticle.dds` | 
| Normal Map |  \(GPU only\) Opens the **Asset Browser** to specify a normal map for the 2D GPU particles\.  | 
| Glow Map |  \(GPU only\) Opens the **Asset Browser** to specify a glow map for the 2D GPU particles\.   You must specify a positive value for the **[Emissive Lighting](particle-editor-reference-lighting.md#emissive-lighting-parameter)** parameter for the glow map to be visible\.   | 
| Texture Tiling | Splits the texture into tiles for variation and animation\. [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/particle-editor-reference-particles.html) | 
| Color |  Selects the color and alpha to apply to a particle\.  [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/particle-editor-reference-particles.html)  | 
| Alpha clip |  \(CPU only\) Customizes how the particle **Alpha** value controls opacity or alpha test values\. Each parameter has two values that correspond when particle **Alpha** = `0` and `1`\. They are interpolated for each particle with its **Alpha** value and used in the shader with the following equation:  FinalOpacity = saturate\( \(TextureAlpha \- SourceMin\) / min\(SourceWidth, 1 \- SourceMin\) \) \* Scale  [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/particle-editor-reference-particles.html)  | 
| Tessellation | Enables tessellation, rendering more vertices in the sprite\. You must have a minimum of DirectX 11\. This parameter is useful when Receive Shadows is set, increasing the resolution of shadows\. It is also useful when Tail Length or Connection are set, creating smoother curves in connected particles\. This produces more accurate lighting when receiving light from point lights\. Default value: false | 
| Soft Particles | Applies rendering that softens the intersection between sprites and nearby objects to prevent unnatural seams\. Use sparingly on particles that need it, such as smoke, because this is slightly more expensive\. Use the Softness parameter to define the amount of rendering to apply\.Default value: false | 
| Motion Blur | \(GPU only\) Simulates motion blur on GPU particles\. Use Blur Strength to set the strength of the blur effect\. | 
| Geometry | \(CPU only\) Opens the Asset Browser window to select a 3D object to use for the particles\. Default value: empty | 
| Geometry in Pieces | \(CPU only\) Emits the geometry in pieces, originating at each piece's location in the asset\. This applies only if the Geometry asset contains multiple subobjects\. [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/particle-editor-reference-particles.html)Default value: **Whole**This parameter requires that you provide specific names for the nodes in the Maya outliner\. The following show examples of acceptable node names:![\[Node names in the Maya outliner.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/particles/geometry_in_pieces_01.png)In these examples, the groups and individual nodes have a `_group` suffix\. As a result, the Maya exporter assumes there is no geometry\. If you receive a "group has no geometry" error, you can safely ignore it\. | 
| Geometry No Offset | \(CPU only\) Uses the geometry pivot for centering geometry particles\. Default value: false | 
| Octagonal Shape | \(CPU only\) Renders sprites as octagons instead of quads, reducing pixel cost\. Only use with textures that fit within an octagon; otherwise clipping occurs\. Default value: false | 