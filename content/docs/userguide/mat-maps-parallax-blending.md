# Using Blend Layers for Parallax Mapping<a name="mat-maps-parallax-blending"></a>

You can use blend layers for parallax mapping\. For both POM and OBM, set the diffuse and normal map as usual\. The `_disp` texture will be loaded automatically as long as the [Applying Parallax Occlusion Mapping \(POM\)](mat-maps-parallax-pom.md) procedure is first completed\.

When using a second blend layer, the diffuse map is placed in the **Custom** texture map slot, the normal map is placed in the **\[1\] Custom** slot, and the height map is placed in the **SubSurface** slot\.

**To use a blend layer for parallax mapping**

1. Complete the [Applying Parallax Occlusion Mapping \(POM\)](mat-maps-parallax-pom.md) procedure\.

1. Under **Shader Generation Params**, select **Parallax occlusion mapping** and **Blendlayer**\. 

1. Under **Texture Maps**, place maps as follows:

   1. Place the height map in **Second Height Map**\.

   1. Place the height map in **Second Diffuse Map**\.

   1. Place the height map in **Second Bump Map**\.

1. Under **Shader Params**, adjust the values of the parameters as needed\. 