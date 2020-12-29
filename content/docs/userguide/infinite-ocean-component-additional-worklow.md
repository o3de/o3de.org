# Additional Workflow<a name="infinite-ocean-component-additional-worklow"></a>

See the following when working with the **Infinite Ocean** component\.

**Note**  
The `e_VolumetricFog` console variable is currently not compatible with the **Infinite Ocean** component and can cause rendering issues for underwater fog\.

## Slices<a name="infinite-ocean-component-working-with-slices"></a>
+ You can create a slice that contains an entity with an **Infinite Ocean** component; however, not all slice features are supported at this time\.
+ You can dynamically spawn a slice that contains an **Infinite Ocean** component; however, asynchronous loading of the **Infinite Ocean** component is not supported at this time\.
+ Only one **Infinite Ocean** component can be active at a time\. If you create a second **Infinite Ocean** component in your level or place a slice that contains another **Infinite Ocean** component, an error appears in the console\.
+ You can load more than one **Infinite Ocean** component in a scene, but you must manage which entity has the active component\.

  For example, in the **Entity Inspector**, use the **Start Active** parameter to toggle the active state of the entity to which the **Infinite Ocean** component is attached\.

  This allows you to have multiple **Infinite Ocean** components, each with a different look and feel, set their starting states \(activate one and disable the others\), and then toggle the active state during run time to control which ocean is rendered\.

## Parent and Child Entities<a name="infinite-ocean-component-working-with-parent-child-entities"></a>
+ You can use the entity's **[Transform](component-transform.md)** component to control the surface height of the **Infinite Ocean** component\.
+ Specify the z\-axis of the **Transform** component to set the **Infinite Ocean** component's height\.
+ The **Infinite Ocean** component respects the hierarchical transforms, so if the entity is a child nested within a hierarchy, the parent transform above it contributes to the height of the **Infinite Ocean** component\.

## Ocean Bottom<a name="infinite-ocean-component-working-with-ocean-bottom"></a>

The ocean bottom feature toggles on an infinite plane that draws below the ocean\. The plane draws black, and its main purpose is to fix the depth buffer behind the water in areas beyond the level geometry\. 
+ If you are using the ocean bottom, the parent transform of the **Infinite Ocean** component sets the ocean's height\. If the height of the ocean is near or below `0` and you are using the ocean bottom, there can be some visual anomalies\. 
+ Normally, the ocean bottom height is set to `0` \(z\-axis is `0`\)\. This setting is not controlled by the parent transform\. 
+ Since the ocean level can be freely transformed, including negative heights below `0`, the ocean bottom is configured to always draw at least `5` meters below the height of the ocean surface\.
**Note**  
Currently, you can change the ocean bottom only in the code\.   
Navigate to the `lumberyard_version/dev/Engine/Shaders/HWScripts/CryFX` directory\.
For the `WaterOceanBottom.cfg` shader, specify a value for the `MIN_WATER_DEPTH` parameter\.
+ If you want a better looking ocean bottom near the visible playable area, we recommend that you create a large bottom ocean geometry with a material assignment to match the look and feel of your level\.