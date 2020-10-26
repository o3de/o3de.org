# 3DSMax – Fur Previsualization<a name="shader-ref-fur-previz3dsmax"></a>

![\[Example of using 3DSMax fur previsualization.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/shaders/shader-ref-fur-21.png)

**To visualize fur on a mesh**

1. Ensure that your renderer is set to **Legacy Direct3D**:

   1. Open the **Preference Settings** dialog\. To do this, navigate to **Customize**, **Preferences**\.

   1. Select the **Viewports** tab\. Under **Display Drivers**, view the currently installed driver\.  
![\[Example selecting the driver to visualize fur for a mesh.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/shaders/shader-ref-fur-22.png)

   1. If it does not display **Direct3D 9\.0**, click **Choose Driver**\. From the drop\-down menu, choose **Legacy Direct3D**\. Click **OK**\.  
![\[Example for displaying driver selection.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/shaders/shader-ref-fur-23.png)

1. Open the **Material Editor**\. To do this, navigate to **Rendering**, **Material Editor**, **Compact Material Editor**\.

1. Select a material that you want to set for fur, and click the button to the right of the submaterial drop\-down menu \(the button might display “Standard”\)\.

   Choose **DirectX Shader**, and choose to discard the old material\.  
![\[Example of selecting a material to set for the fur.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/shaders/shader-ref-fur-24.png)

1. Click in filename box\. Navigate to your Lumberyard install folder, and select `dev\Tools\maxscript\fx\Fur.fx`\.  
![\[Example of selecting the fur file name.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/shaders/shader-ref-fur-25.png)

1. In the **Fur\.cgfx Parameters** section, specify the following, at a minimum:
   + **Enable Fur Combing** \(disabled/unselected if you haven't prepared your mesh with vertex colors for fur combing\)
   + **Use Base Fur Diffuse Map** \(unselected/disabled\)
   + **Color Texture**
   + **Fur Heightmap**

1. In the viewport, select your mesh or sub\-mesh\. In the **Material Editor**, click **Assign Material to Selection**\.  
![\[Select the mesh or sub-mesh material picker.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/shaders/shader-ref-fur-26.png)

**To apply vertex colors on a mesh**

1. With your object selected, go to the **Modify** panel\. From the **Modifier List** drop\-down menu, select **VertexPaint**\.  
![\[Example apply vertex colors for a mesh.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/shaders/shader-ref-fur-27.png)

1. To adjust fur combing, set the **Channel** to **Vertex Color**\.

   To adjust fur length scaling, set the **Channel** to **Vertex Alpha**\.

1. For fur combing:

   1. Click on the color swatch below the eraser button, and select the preferred direction\.

   1. Use the **Paint** or **Paint All** button to apply the combing direction to the mesh\.
**Note**  
The default vertex color for meshes is white, so you may want to begin by using **Painting All** with RGB\(128, 128, 128\)\. This way, you can work from a default "no combing" state\.

1. For fur length scaling:

   1. Click on the color swatch below the eraser button, and set the preferred length scale in the red channel\.

   1. Use the **Paint** or **Paint All** button to apply the length scaling to the mesh\.