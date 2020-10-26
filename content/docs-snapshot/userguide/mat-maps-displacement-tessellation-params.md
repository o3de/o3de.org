# Setting Tessellation Parameters<a name="mat-maps-displacement-tessellation-params"></a>

To apply tessellation to an object and set parameter values, complete this procedure\.

**To apply tessellation to an object**

1. In Material Editor, click **Tools**, **Material Editor**\. 

1. In the left tree, click to select the desired asset\.

1. In the right pane, under **Shader Generation Params**, select either **Phong tessellation** or **PN triangles tessellation**\.

1. Under **Shader Params**, adjust the values of the following parameters\.


**Tessellation Parameters**  

| Parameter | Description | 
| --- | --- | 
| Tessellation face cull | Specifies the extent to which vertices are culled\. Because tessellation uses its own face culling, it takes the original \(non\-tessellated\) triangle and checks if it's facing the camera; if not it discards it\. This can also be used for 2\-sided sorting of polygons\. In this case, the **2 Sided** check box must also be selected under **Advanced** in the Material Editor\. An issue may arise when there is displacement that is visible from the camera\. For example, a bump on a cube that is rotating is still visible for a while, even though the cube face is no longer facing the camera\. Setting this parameter to `0` means no face culling at all, while setting it to `1` will cull anything not facing the camera\.  | 
| Tessellation factor | Specifies the density of the mesh triangles | 
| Tessellation factor max | Used for objects that are at a fixed distance or range from the camera to get rid of geometry “popping” artifacts\. This is useful for cutscenes\. | 
| Tessellation factor min | Setting this value to 1 means that it will be always tessellated at level 1, even if the object is far away from camera\. | 