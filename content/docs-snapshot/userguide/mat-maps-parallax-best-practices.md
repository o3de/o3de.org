# Parallax Mapping Best Practices<a name="mat-maps-parallax-best-practices"></a>

For best results, use the following best practices when creating POM or SPOM parallax mapping\.

**Content Creation Practices**
+ Place the displacement map in the alpha channel of your texture\. The RGB values are not used for this map type and can be left empty\.
+ Use the suffix \_displ\. For example, `road.tif` would be `road_displ.tif`\.
+ If your project requires file names other than those listed here, use the Resource Compiler \(RC\) Open Image tool to specify other conventions for Asset Processor to recognize\. For textures not using the \_displ suffix, choose the **DisplacementMap** preset to generate the correct `.dds` file\. Height maps are converted to A8 textures\. If you do not see any displacement, preview the file in the **Material Editor**\. If the image isn't in A8 format, you can fix the preset, save, and reload\. For textures using non\-standard naming, the tool generates an `.exportsetting` file that Asset Processor uses to generate the displacement map\. 
+ By default, Asset Processor recognizes the \_displ suffix and writes the correct metadata to a `.dds` file\.

**Game Implementation Practices in Lumberyard**
+ In Lumberyard Editor, set the performance to **High** or **Very High** for your target platform\. 

**To set the graphics performance for your target platform**

  1. In Lumberyard Editor, choose **Edit**, **Editor Settings**, **Graphics Performance**\.

  1. Select your platform and then select the performance setting\.
+ In the **Material Editor**, you must first assign textures for both the **Normal Map** and the **Height Map** parameters\. Then, under **Shader Generation Params**, select the **Parallax occlusion mapping** parameter\.
+ You can assign POM maps to the **Height Map** parameter located under **Texture Maps**\.