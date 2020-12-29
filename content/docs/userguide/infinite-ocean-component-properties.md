# Infinite Ocean Component Properties<a name="infinite-ocean-component-properties"></a>

Use the following parameters for the **Infinite Ocean** component to change how the ocean appears\.

**Contents**
+ [General](#infinite-ocean-component-properties-general)
+ [Animation](#infinite-ocean-component-properties-animation)
+ [Fog](#infinite-ocean-component-properties-fog)
+ [Caustic](#infinite-ocean-component-properties-caustic)
+ [Reflection](#infinite-ocean-component-properties-reflection)
+ [Advanced](#infinite-ocean-component-properties-advanced)
+ [Tessellation Examples](#infinite-ocean-component-tessellation-examples)

## General<a name="infinite-ocean-component-properties-general"></a>

See the following general parameters\.

**Enable Ocean Bottom**  
Toggle the infinite plane below the ocean\.  
Default value: `True`

**Water Material**  
Render the ocean with this assigned material\. The material must be a water shader\.   
You can find the default material in the `lumberyard_version/dev/Engine/EngineAssets/Materials/Water/ocean_default.mtl` directory\.  
Default value: `ocean_default.mtl`

## Animation<a name="infinite-ocean-component-properties-animation"></a>

Use the following animation parameters to control the movement of the waves and the scrolling of the water texture, with the wind speed and direction\.

**Waves Amount**  
Specify the frequency of ocean waves\. Higher values create waves that appear smaller and closer together\.  
Default value: `0.75`  
Valid values: `0.20` to `5.0`

**Waves Size**  
Specify the height of ocean waves\.   
For **Wave Size**, higher values work better with lower values for **Waves Amount**\.
Default value: `1.25`  
Valid values: `0` to `3.0`

**Waves Speed**  
Specify the speed of ocean wave movement\.  
Default value: `1.0`  
Valid values: `0` to `5.0`

**Wind Direction**  
Specify the direction of the ocean wind, in radians\.  
Default value: `1.0`  
Valid values: `0` to `6.28`

**Wind Speed**  
Specify the speed of the ocean wind\.  
Default value: `40.0`  
Valid values: `0` to `1000`

## Fog<a name="infinite-ocean-component-properties-fog"></a>

Use the following fog parameters to control the density and color of the ocean \(underwater fog\)\. This simulates how light bounces off, is absorbed by, and scatters with the particulate matter in the water\.

**Color**  
Specify the color to render the underwater fog\.  
Default value: `5`, `36`, `32`

**Color Multiplier**  
Influence the intensity of the underwater fog color with this multiplier\.  
Default value: `0.15`  
Valid values: `0` to `1.0`

**Density**  
Specify the density of the underwater fog\. Higher values make transparency fall more quickly\.  
Default value: `0.07`  
Valid values: `0` to `1.0`

**Near Fog Color**  
Reduce the underwater fog color to this color near shallow depths\.   
Keep the default value or specify a near\-black color\.
Default value: `1`, `7`, `5`

**Example Low Density**  
In the following example, the value for the **Density** parameter is low\. This makes the water more transparent, so that you can see the legs of the pier and the sand\.  

![\[Example Infinite Ocean component with low fog density.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/infiniteocean/infinite-ocean-component-3.png)

**Example High Density**  
In the following example, the value for the **Density** parameter is high\. This makes the water appear cloudier and obscures details like the legs of the pier and sand\.  

![\[Example Infinite Ocean component with high fog density.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/infiniteocean/infinite-ocean-component-4.png)

## Caustic<a name="infinite-ocean-component-properties-caustic"></a>

The following caustic parameters control how the refracted rays of light animate and project on objects below the ocean surface\.

**Enable Caustics**  
Apply the caustic effect of the ocean on geometry below the ocean surface\.   
Default value: `True`

**Depth**  
Maximum depth below the ocean height at which caustic effects still appear, in meters\.  
Default value: `8`  
Valid values: `0` to `100.0`

**Intensity**  
Specify the intensity of the light in the ocean caustic effect\. A value of `0` turns off caustic effects\. Near\-zero values show caustic effects strongly\. For example, a value of `0` to `0.01` is a sudden change\.  
Default value: `1`  
Valid values: `0` to `10.0`

**Tiling**  
Specify the amount of ocean caustic effect that is tiled\. Lower values spread out the effect and higher values tighten the detail\.  
Default value: `2`  
Valid values: `0.10` to `10.0`

**Distance Attenuation**  
Specify the attenuation distance \(from the camera\) that caustic effects of the ocean are applied\.   
Lower values apply caustic effects closer to the camera\.  
Larger values apply caustic effects farther from the camera\.  
Default value: `10`\.  
Valid values: `0` to `100.0`

**Example Caustics**  
The following is an example of how light interacts with the water below the surface\.  

![\[Example Infinite Ocean component with the caustic parameters.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/infiniteocean/infinite-ocean-component-2.png)

## Reflection<a name="infinite-ocean-component-properties-reflection"></a>

The following reflection parameters are set for the resolution of the reflection texture map \(this is based on screen size \* resolution scale\) and a set of flags that the reflection system uses when the camera is above the ocean\. 

**Resolution Scale**  
Scale of the screen resolution that is used to render ocean reflections\.  
Default value: `0.50`  
Valid values: `0` to `1.0`

**Reflect Entities**  
Specify whether entities are included when reflections are rendered in the ocean\.  
Default value: `True`

**Reflect Objects**  
Specify whether entities with the **Mesh** component attached are included when reflections are rendered in the ocean\.  
Default value: `True`

**Reflect Terrain**  
Specify whether terrain detail materials are included when reflections are rendered in the ocean\.  
Default value: `True`

**Reflect Particles**  
Specify whether particles are included when reflections are rendered in the ocean\. For example, if your level has a flame particle effect on a torch, a value of `false` means that the torch flame does not reflect into the ocean\.  
Default value: `True`

## Advanced<a name="infinite-ocean-component-properties-advanced"></a>

In most cases, you don't need to change the values for the advanced parameters\. For example, you should set the **Tessellation** parameter once and not during runtime updates\.

**Tessellation**  
Specify the amount of ocean water surface geometry tessellation\. For more information, see [Tessellation Examples](#infinite-ocean-component-tessellation-examples)\.  
The **Tessellation** parameter affects the 3D mesh for the ocean triangles\. Higher values create more polygons and a smoother ocean surface, at a higher performance cost\.
Default value: `85`  
Valid values: `10` to `500`

**Godrays Enabled**  
Enable god rays \(or sun beams\) to appear below the ocean surface\.  
Default value: `True`

**Underwater Distortion**  
Specify the amount of the scene that is distorted when it renders while the camera is underwater\. For best practice, specify a value less than `10`\.   
Default value: `1`  
Valid values: `0` to ∞

## Tessellation Examples<a name="infinite-ocean-component-tessellation-examples"></a>

The **Infinite Ocean** component has controls for setting the level of tessellation \(number of vertices and polygons\) for the generated mesh that defines the surface of the ocean\.

**Note**  
We recommend that you set and configure the **Tessellation** parameter once to achieve the desired look and feel for your level\. Although you can change this value at run time, this forces Lumberyard to rebuild the mesh, which can cause an undesirable hitch in performance\. If you must change the tessellation value during run time, we recommend that you do so under controlled conditions where you can hide the changes\.

**Example Tessellation = 10, low setting**  

![\[Example Infinite Ocean component with low value for tessellation.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/infiniteocean/infinite-ocean-component-8.png)
At lower settings, there is a noticeable impact on the visual quality\.   

![\[Example Infinite Ocean component with low value for tessellation as it renders in-game.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/infiniteocean/infinite-ocean-component-11.png)
In the following example, the lower visual quality is more noticeable with higher values for **Waves Size** parameter\. There are fewer vertices to displace in the simulation, so the waves are not well\-defined\.  

![\[ExampleInfinite Ocean component with low tessellation and waves.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/infiniteocean/infinite-ocean-component-14.png)

**Example Tessellation = 85, default setting**  

![\[Example Infinite Ocean component with default value for tessellation.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/infiniteocean/infinite-ocean-component-9.png)
In most cases, the default settings for the **Tessellation** parameter are sufficient\.  

![\[Example Infinite Ocean component with default value for tessellation as it renders in-game.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/infiniteocean/infinite-ocean-component-12.png)
Specifying lower values for the **Waves Amount** parameter works better with higher values on the **Waves Size** parameter, but the higher tessellation smooths out the ocean surface\.  

![\[Example Infinite Ocean component with default values for tessellation and waves.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/infiniteocean/infinite-ocean-component-15.png)

**Example Tessellation = 500, high setting**  

![\[Example Infinite Ocean component with high value for tessellation.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/infiniteocean/infinite-ocean-component-10.png)
In the following example, higher values for the **Tessellation** parameter minimally impact the visual quality\.  

![\[Example Infinite Ocean component with high value for tessellation as it renders in-game.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/infiniteocean/infinite-ocean-component-13.png)
Specifying a high value for the **Waves Amount** parameter creates a choppier ocean surface, so it's helpful to increase the value for the **Tessellation** parameter\.  

![\[Example Infinite Ocean component with high value for tessellation and waves.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/infiniteocean/infinite-ocean-component-16.png)