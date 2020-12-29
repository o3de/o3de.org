# Vegetation Layer Spawner Properties<a name="vegetation-layer-spawner-properties"></a>

The **Vegetation Layer Spawner** component has the following properties:


****  

| Name | Description | 
| --- | --- | 
| Override Preview Settings | Controls whether user\-specified settings or default settings are used to display the preview\. Select this option to expose additional related properties\. | 
| Pin Preview to Shape | Specified shape entity determines the preview position and size\. Remove the target entity to expose Preview Position and Preview Size\. | 
| Preview Position | Specifies an offset for the world space location at the center of the box\. This box is used for sampling values that the preview window displays\. | 
| Preview Size | Specifies a scale for the world space dimensions of the box that is used for sampling values that the preview windows display\. | 
| Constrain to Shape | When enabled, forces preview widgets to display only content that is in the component's shape instead of the filling the entire image\. | 
| Layer Priority | Defines a high\-level priority or depth for vegetation to be sorted and processed relative to other layers\. All foreground layers are processed and can plant vegetation before all background layers\. | 
| Sub Priority | Defines a priority that is used to sort and apply vegetation areas in the same layer\. Vegetation layers with higher priorities are applied before those with lower priorities\. | 
| Inherit Behavior | Enables certain vegetation layer components to use the filters and modifiers that are attached to a parent entity in a vegetation layer blender hierarchy\. | 
| Allow Empty Meshes | Enables unspecified or invalid meshes to plant and claim space\.Spawners typically plant only visible vegetation instances, which claim space and prevent other vegetation from being planted\. By default, unspecified or invalid meshes are skipped\. | 
| Filter Stage | Defines when vegetation filters are processed\. Individual vegetation filters can override this setting\. For more information, see the text following this table\.  | 

For the **Filter Stage** property, the **PreProcess** option results in faster processing than the **PostProcess** option, which ensures accuracy\.
+ **PreProcess** – Processes vegetation filters before modifiers\. This means that fewer instances are processed for modifiers, which generally process faster\. However, modifiers that affect slope, altitude, and so on might affect the criteria that would have filtered out the instance\. Running the filters first means that the modified data isn't checked by the filter\.
+ **PostProcess** – Processes vegetation modifiers before filters\. This means that modifiers process every potential instance before filters remove them\. Because of the added calculations, this method is slower but ensures correct filtering out of vegetation whose filter criteria has been modified\.

**Example**  
A **Vegetation Altitude Filter** is set to filter out vegetation below 32 meters\. A **Vegetation Position Modifier** is set to shift vegetation left by 5 meters\. The initial **Vegetation Layer Spawner** is placed in a box sitting at 32 meters\. With the **PreProcess** option \(A\), the filter is applied first, and then the modifier shifts vegetation left into the canyon\. With the **PostProcess** option \(B\), the modifier shifts vegetation left into the canyon first\. The filter is then applied, which removes the vegetation below 32 meters\.  

![\[Filter Stage with PreProcess option and PostProcess option.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/vegetation/component-vegetation-layer-spawner-prepostprocess.png)