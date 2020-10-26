# Water Shader Material for the Infinite Ocean Component<a name="infinite-ocean-component-water-shader-material"></a>

The **Infinite Ocean** component is compatible only with a material that uses the water shader, such as the default `ocean_default.mtl` file\. The water shader is a dedicated shader that Lumberyard uses only to render the ocean, and adds effects such as reflection, ripple, and foam\. 

**Example Water Shader**  
The following is an example of how you can configure the water shader material in the **Material Editor**\.  

![\[Example Infinite Ocean component with the caustic parameters.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/infiniteocean/infinite-ocean-component-5.png)

**Note**  
When you set up water materials for the ocean, disable the **Water Volume** parameter\.  
When you set up water material for other types of water volumes, such as lakes and rivers, enable the **Water Volume** parameter\.

For more information, see [Water Shader](shader-ref-water.md)\.

For lakes, rivers, and other bodies of water, use the [WaterVolume Shader](shader-ref-watervolume.md)\.