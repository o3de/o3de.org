# Adding Detail Bending Effects<a name="vegetation-bending-detail-intro"></a>

Detail bending refers to the procedural movement of larger foliage caused by wind or other similar effects\. You control the motion by the use of vertex colors in your DCC tool\. 

When you use detail bending, make sure the distribution of polygons on foliage geometry is regular and properly tessellated\. Otherwise you may see visual artifacts\.

**Contents**
+ [Defining Vegetation Vertex Colors with a DCC Tool](#vegetation-bending-detail-vertex-colors)
+ [Setting the Detail Bending Parameter](#vegetation-bending-detail-params)

## Defining Vegetation Vertex Colors with a DCC Tool<a name="vegetation-bending-detail-vertex-colors"></a>

Vegetation objects use vertex colors to specify detail bending\. Lumberyard uses all three RGB channels to control the movement of the geometry\. Use your DCC tool to edit and view each channel separately\.

When painting the vertices, begin with the blue channel so that you can block in the overall motion of the vegetation object\. Next, paint the red channel with the vertex color mode set to additive\. Use a low opacity so that you can slowly build up the effect\. Finally, edit the green channel with vertex color mode set to additive\. Use a low opacity so that you can slowly build up the effect\.


****  

| Color | RGB Values | Bending Influence | 
| --- | --- | --- | 
| Red | 255/0/0 |  Irregular bending at the outsides – movement of smaller shapes\. Random sinusoidal noise with a high frequency\. The red channel works only if the surface normals of the vegetation face horizontally\. If the leaf is flat and all normals face up, the red channel has no effect\.  | 
| Green | 0/255/0 | Delays the start of the movement – used to create variations\.Random sinusoidal noise with a high frequency\.Values less than 0, 255, 0 delay the start of the sinusoidal noise\. | 
| Blue | 0/0/255 |  Bends the leaves up and down – movement of the big shapes\. Random sinusoidal noise with a low frequency\. Values less than `0`, `0`, `255` introduce a greater amount of the noise\. Only the blue channel can stop all movement\. You can use the blue channel for the unmoving parts of vegetation, such as the base of a blade of grass or where a leaf attaches to its stem\. Also use the blue channel on tree trunks so that they sway in the wind\.  | 

Once you have painted all of the channels, export your asset as an `.fbx` file\. Your result might look like the following\.

**Example**  

![\[Example of painted channels final image.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/vegetation/vegetation-bending-channels.png)

## Setting the Detail Bending Parameter<a name="vegetation-bending-detail-params"></a>

Once you define the vertex colors, you must set the **Bending** parameter for detail bending\. This value controls the procedural bending for vegetation\. Its value ranges from `0` to `100`\. A value of `0` means no bending effect\. A value of `100` indicates the maximum effect when receiving environmental wind\. 

For more information, see, [Adding Global Wind](weather-wind-global.md)\.

**To set the vegetation detail bending parameter**

1. In Lumberyard Editor, choose **Tools**, **Terrain Tool** and then choose **Vegetation**\.

1. In the **Vegetation** section, click the first icon ![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/vegetation/vegetation-editor-object-icon.png) to add a vegetation object\.

1. In the dialog box, select your vegetation object and click **OK**\.

1. In the **Vegetation** section, select the asset that you want to modify, and then set the **Bending** parameter from `0.0` to `100`\.  
![\[Example of a tree object with detail bending parameter set.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/vegetation/vegetation-editor-object-select.png)

1. Select your vegetation object, click **Paint Objects**, and then in the viewport, click to place the vegetation object\. 

1. To modify the vegetation material, in the **Vegetation** section, right\-click the asset and choose **Go To Object Material**\. 

   This opens the **Material Editor**, where you can edit the material and its [Vegetation Shader](shader-ref-vegetation.md)\.

1. In the **Material Editor**, select the material that is applied to the asset on which you painted vertex colors in your DCC\. 

   Under **Shader Generation Params**, select the following options:
   + **Detail bending**
   + **Leaves** or **Grass**, depending on your use

   After you check these options, several new **Shader Params** appear\.

1. Adjust the following parameters to achieve the effect that you want\.
   + **Bending branch amplitude** – Affects the amplitude of the vertices painted blue\.
   + **Bending edges amplitude** – Affects the amplitude of the vertices painted red\.
   + **Detail bending frequency** – Affects the frequency of the detail bending\.

   The following example uses the `am_aspen_01_group.cfg` file in Starter Game\.  
**Example**    
[\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/vegetation-bending-detail-intro.html)  
**Example**  