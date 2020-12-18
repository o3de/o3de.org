# Using Multiple UV Channels<a name="char-fbx-uv-streams"></a>

You can use the **FBX Settings** tool to import multiple UV channels\. That way, you can apply to your geometry a detail or blend layer map with UV channels that are independent of the diffuse, normal, and spec channels\. With multiple UV channels, you can also apply an animated emittance glow that is independent of other texture maps on a mesh\.

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/shared-multi-uv-support-meshes-example.gif)

**Topics**
+ [Processing Multiple UV Channels](#char-fbx-import-multiple-uv-channels)
+ [Setting up Multiple UV Materials](#char-fbx-setup-multiple-uv-channels)
+ [Using Independent Tiling](#char-fbx-use-independent-tiling)

## Processing Multiple UV Channels<a name="char-fbx-import-multiple-uv-channels"></a>

When a new `.fbx` file is added to your project directory, **Asset Processor** automatically detects the file and imports it as a `.cgf`\. If needed, you can use your DCC tool to rebuild the UV channels\.

The **FBX Settings** tool follows these rules:
+ If the `.fbx` file contains one UV channel on a mesh, that channel is automatically imported\.
+ If the `.fbx` file contains two UV channels on a mesh, both channels are automatically imported\.
+ If the `.fbx` file contains three or more UV channels on any of the meshes, the first two channels are automatically imported, and the remaining channels are ignored\.

## Setting up Multiple UV Materials<a name="char-fbx-setup-multiple-uv-channels"></a>

By default, the **FBX Settings** tool creates materials for your imported mesh\. You must use the **Shader Generation Parameters** in the **Material Editor** to specify how the material should use the second UV channel\.

**To apply the second UV channel**

1. In Lumberyard Editor, choose **Tools** and then **Material Editor**\.

1. In the left pane, navigate to and select the material to use\.

1. In the right pane, under **Shader Generation Params**, do the following to apply the second UV channel to one of these features:
   + Blend Layer – Select **Blendlayer** and **Use uv set 2 for blendlayer maps** to apply the second UV channel to the **Second Diffuse Map**, **Specular**, **Height**, **Bump**, and **Blending Map** texture slots\.
   + Detail Map – Select **Detail mapping** and **Use uv set 2 for detail map** to apply the second UV channel to the **Detail** texture slot\.
   + Emittance Map – Select **Use uv set 2 for emittance map** to apply the second UV channel to the **Emittance** and **Decal** texture slots\.

## Using Independent Tiling<a name="char-fbx-use-independent-tiling"></a>

On the **Second Diffuse Map**, you can set independent values for the blend layer's texture inputs \(tiling, rotation, and oscillation\)\. Changes to these values don't affect the tiling, rotation, and oscillation values on the first **Diffuse Map**\. In addition, these values aren't applied to the **Blend Map**\. You can use the **Blend Mask Tiling** parameter under **Shader Params** to tile the **Blend Map**\.

You can also set independent values for tiling, rotation, and oscillation for the **Detail** and **Emittance** map features\.

**To set independent values for the texture inputs**

1. In Lumberyard Editor, choose **Tools**, **Material Editor**\.

1. In the left pane, navigate to and select the material to use\.

1. In the right pane, do the following:
   + Under **Texture Maps**, modify the values for **Tiling**, **Rotator**, and **Oscillator** for your diffuse maps\.
   + Under **Shader Params**, modify the **Blend Mask Tiling** parameter for your blend map\.