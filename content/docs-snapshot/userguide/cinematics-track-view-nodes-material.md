# Material Node<a name="cinematics-track-view-nodes-material"></a>

**Material** nodes help you animate commonly used material properties that you would normally set in the **Material Editor**\. You can add **Material** nodes through a sequence or from the **Director** node\.

**Note**  
The name of the **Material** node must be the full path of the material that you want to animate, as shown in the **Material Editor**\.

A recommended workflow is to select the material inside the **Material Editor** that you want to animate\.

**To add a Material node in the Track View**

1. In Lumberyard Editor, choose **Tools**, **Material Editor**\.

1. Navigate to the material that you want to animate\.

1. Right\-click the selected material and choose **Copy Path to Clipboard**\. If the material is in a material group, select the group and copy the group name to the clipboard\.  
![\[Copy the material name path in the Material Editor.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cinematics/cinematics-track-view-nodes-material-4.png)

1. Choose **Tools**, **Track View**\. 

1. Create or select an existing sequence or **Director** node that you want to contain the animation\. 

1. In the node tree, right\-click and choose **Add Material Node** and then in the **Material Name** dialog box, press **Ctrl\+V** to paste the full path to the material that you copied in step 3 and then click **OK**\.

1. If the material is in a material group, the text appears red on the **Material** node in the Track View\. This means that a submaterial hasn't been selected\. 

   To add a submaterial, do the following:

   1. In the Track View, right\-click the **Material** node\.

   1. Select the submaterial that you want to animate\.

   1. The **Material** node text should no longer appear in red\.

1. To add tracks to the **Material** node, right\-click the node name and choose **Add Track**\. See the following table for the available tracks\.


**Material Node Tracks**  

| Track | Key Property | Description | 
| --- | --- | --- | 
| Diffuse  | Color \(RGB\) |  RGB values to specify the base color of a material\.  | 
| Emissive Color  | Color \(RGB\) |  RGB values to enable objects to emit light and be visible in the dark\.  | 
| Emissive Intensity | Float \(0\.00 to 1\.0\) |  Float value that controls the brightness simulating light emitting from the surface that makes an object glow\.  | 
| Emittance Map Gamma | Float \(1\.0 to 2\.0\) |  Float value that expands the lower range of the emittance map\. This makes darker colors appear less bright\.  | 
| Glossiness  | Float \(0 to 255\) | Acuity or sharpness of the specular reflection\. Values of `10` or less create a scattered reflection\. Values greater than `10` create a sharp reflection\.  | 
| Indirect Color | Color \(RBG\) |  RGB values to specify that tints the bounce light from global illumination\.  | 
| Opacity  | Float \(0\.00 to 1\.0\) | Degree of transparency\. Values less than `50` fall more to the white end of the alpha channel map\. Values greater than `50` fall more to the black end of the alpha channel map\. | 
| SSSIndex  | Float \(0\.00 to 3\.99\) |  Controls subsurface scattering profile and amount\.  For marble, specify a value between `0.01` to `0.99`\.  For skin, specify a value between `1.00` to `1.99`\.  | 
| Specular  | Color \(RGB\) |  Reflective brightness and color of a material when light shines on the object\. The greater the value, the shinier the material\.  To apply reflections in degrees of black and white, specify the same values for R, G, and B\. For colored reflections, specify different values for each\.  | 