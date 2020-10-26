# Maya – Fur Previsualization<a name="shader-ref-fur-previzmaya"></a>

![\[Example Maya fur visualization.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/shaders/shader-ref-fur-14.png)

**To visualize fur on a mesh**

1. Verify that the **Cgfx Shader** is enabled\.

   In Maya, navigate to **Windows**, **Settings/Preferences**, **Plug\-in Manager**\.

   Find `cgfxShader.mll` in the list, and then verify that both **Loaded** and **Auto load** are selected\.

   If you made any changes, restart Maya\.  
![\[Example for setting the cgfxShader parameter.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/shaders/shader-ref-fur-15.png)

1. Open the **Hypershade** editor by navigating to **Rendering Editors**, **Hypershade**\.  
![\[Example Hypershade editor.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/shaders/shader-ref-fur-16.png)

1. Create a new material\. To do this, in the **Hypershade** window, navigate to **Create**, **Materials**, **Cgfx Shader**\.  
![\[Example of creating a new material in the Hypershade editor.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/shaders/shader-ref-fur-17.png)

1. In the **Property Editor**, click the folder icon next to the **CgFX File** text box\.
**Note**  
If the **Property Editor** is not visible, navigate to **Windows**, **Property Editor**\.  
![\[Example of navigating to the .cgfx file.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/shaders/shader-ref-fur-18.png)

1. Navigate to your Lumberyard install folder, and then select `dev\Tools\Maya\fx\Fur.cgfx`\.

1. In the **Fur\.cgfx Parameters** section, specify the following, at a minimum:
   + **Enable Fur Combing** \(disabled/unselected if you haven’t prepared your mesh with vertex colors for fur combing\)
   + **Use Base Fur Diffuse Map** \(selected/enabled\)
   + **ColorSampler**
   + **FurHeightmapSampler**  
![\[Example fur height map sampler parameters.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/shaders/shader-ref-fur-19.png)

1. Select the mesh or sub\-mesh on which you want to visualize fur, and then right\-click hold on the CgFX shader material in **Hypershade**\. Select **Assign Material to Selection**\.

1. In the main viewport, press 6 to ensure that **Shaded Display \(with texture maps\)** is enabled\.

1. Adjust fur settings on the material as preferred\.

**To apply vertex colors on a mesh**

1. Enable fur combing on the material\. To do this, on the **Fur\.cgfx Parameters**, select **Enable Fur Combing**\.  
![\[Example of enabling fur combing.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/shaders/shader-ref-fur-20.png)

1. Open the **Paint Vertex Color Tool**\. To do this, click the square box next to **Color**, **Paint Vertex Color Tool**\.

1. Since Maya does not permit painting alpha only on a RGBA color set, begin by painting RGBA to specify fur length scaling:

   1. In the **Color** section of the tool, select **RGBA** for the **Channels**\.

   1. Click the color swatch next to **Color value**\. Specify `0.5`, `0.5`, `0.5` as the color using the mode **RGB, 0\.0 to 1\.0**\.

   1. Set the alpha value to your desired fur scaling setting\.

   1. Set other tool settings as needed, and apply fur scaling to your mesh\.

1. Now paint RGB only to apply combing:

   1. In the **Color** section of the tool, select **RGB** as the **Channels**\.

   1. Click the color swatch next to **Color value**\. Select the preferred direction\. 

   1. Set other tool settings as needed, and apply fur scaling to your mesh\.