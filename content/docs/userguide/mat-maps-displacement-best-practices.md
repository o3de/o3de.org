# Displacement Mapping Best Practices<a name="mat-maps-displacement-best-practices"></a>

For best results, use the following best practices when creating displacement maps\.

**Content Creation Practices**
+ Place the displacement map in the alpha channel of your texture\. The RGB values are not used for this map type and can be left empty\.
+ Use the suffix \_displ\. For example, `road.tif` would be `road_displ.tif`\. 

**Game Implementation Practices in Lumberyard**
+ In Lumberyard Editor, set the performance to **High** or **Very High** for your target platform\. 

**To set the graphics performance for your target platform**

  1. In Lumberyard Editor, choose **Edit**, **Editor Settings**, **Graphics Performance**\.

  1. Select your platform and then select the performance setting\.
+ The console variable `e_ShadowsTessellateCascades=1` enables shadows for tessellated geometry\. Use this console variable sparingly, as this feature increases performance costs\.
+ Use the **Displacement Map** preset to store \_displ textures\. Height maps are converted to A8 textures\. If you don't see any displacement, open the texture file in the **Material Editor** and verify the rendering in preview\. If the file isn't in A8 format, fix the preset, save, and reload\.
+ In the **Material Editor**, under **Shader Generation Params**, select the **Displacement mapping** parameter\. Under **Texture Maps**, for the **Height Map** parameter, assign the displacement map\.