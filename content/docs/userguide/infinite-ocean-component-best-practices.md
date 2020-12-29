# Best Practices Working with the Infinite Ocean Component<a name="infinite-ocean-component-best-practices"></a>

See the following best practices when working with the **Infinite Ocean** component\.
+ You can use the default parameters for the **Infinite Ocean** component and the `ocean_default.mtl` material to create a default ocean, but you can change the settings as needed\. 
**Note**  
Changing the `ocean_default.mlt` material affects any level that has an ocean that uses the material\. 
+ You can change the colors that contribute to how the ocean appears\.
  + For the **Infinite Ocean** component, use the **Color** and **Near Fog Color** parameters\. For more information, see [Fog](infinite-ocean-component-properties.md#infinite-ocean-component-properties-fog)\.
  + For the water material \(`ocean_default.mlt`\), use the **Diffuse Color** and **Specular Color** parameters\. For more information, see [Water Shader Material for the Infinite Ocean Component](infinite-ocean-component-water-shader-material.md)\.
+ Use both reflections and the underwater fog to achieve the water appearance that you want\. For more information, see [Reflection](infinite-ocean-component-properties.md#infinite-ocean-component-properties-reflection) and [Fog](infinite-ocean-component-properties.md#infinite-ocean-component-properties-fog)\.
+ If your environment looks dull, you'll get dull reflections in the water\. Create an interesting sky look and skyline gradient\. If you are creating a night scene, use bright spots such as city lights\.
+ Use foam effects sparingly\.
+ Ocean reflection draw distance is tied to the terrain detail draw distance\.

**To customize the ocean appearance for a specific level, do the following:**

1. Navigate to the `lumberyard_version/dev/Engine/EngineAssets/Materials/Water/ocean_default.mtl` directory and copy the `ocean_default.mtl` file to create another file\.

1. Specify the new file for the **Infinite Ocean** component\. See [General](infinite-ocean-component-properties.md#infinite-ocean-component-properties-general)\.

1. In the Material Editor, customize the material settings for your current level\.

**Tip**  
For best performance, we recommend the following:  
If your level doesn't require sun reflection, disable these parameters\.
If your level doesn't require foam, disable this parameter\.
If you don’t need caustic rendering, set the **Caustic Multiplier** parameter to `0` to disable it\. 