# Level of Detail<a name="shader-ref-fur-features-levelofdetail"></a>

Fur rendering level of detail uses many of the same mechanics as mesh level of detail\. 

For fur rendering, the number of shell passes drawn decreases over a distance\. You can define the maximum number of passes using the [console variable](shader-ref-fur-consolevariables.md) `r_FurShellPassCount`\.

The starting distance for beginning to decrease shell passes is mesh dependent\. This distance is determined by the mesh’s parameters **View distance multiplier** and **LOD distance ratio**\. You can find these parameters for the [mesh](component-static-mesh.md) or [skinned mesh](component-static-mesh.md) in the [**Entity Inspector**](component-entity-inspector.md)'s **Options** section\. The ending distance, after which no fur shells are drawn, is determined by the [console variable](shader-ref-fur-consolevariables.md) `r_FurMaxViewDist`\.