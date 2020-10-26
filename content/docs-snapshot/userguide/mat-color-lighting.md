# Setting Material Lighting and Color Settings<a name="mat-color-lighting"></a>

You can use the Material Editor to specify color, specular reflection, and lighting effects such as specularity, glossiness, and glow\.

Specify the diffuse, specular, or emissive color values in RGB format, or select the values using the **Colors** dialog box\. Click the color square next to the parameter to open the **Colors** dialog box\. You can then use the color picker to select standard or custom colors for the hue, saturation, and luminance values\.

**To set lighting and color settings for a material**

1. In Lumberyard Editor, click **Tools**, **Material Editor**\. 

1. In the left pane, select the asset that you want to modify\. 

1. Under **Lighting Settings**, set values for the following parameters: 


**Material Lighting and Color Settings**  

| Parameter | Description | 
| --- | --- | 
| Diffuse Color | The base color of a material\. | 
| Specular Color | The reflective brightness and color of a material when light shines on the object\. The greater the value, the shinier the material\. Gray\-scale values affect reflective brightness levels\. To tint the specular color, use the color picker to select the desired tint\. | 
| Smoothness | The acuity or sharpness of a specular reflection\. For values of 10 or less, there is a scattered reflection\. For values greater than 10, there is a sharp reflection\. You cannot have glossiness without specular color \(reflection\), as glossiness determines the sharpness of the reflection\.  | 
| Emissive Color | Enable objects to emit light and be visible in the dark\. Use this parameter to add brightness to objects\. Unlike glow, this parameter does not emit light onto other objects\. It does not work with deferred shading\. | 
| Emissive Intensity | Enable objects to glow, and simulate light that emits from extremely bright surfaces\. Use this parameter in dark scenes for computer monitors, lamps, fire, neon lights, and similar objects\. Unlike emissive color, this parameter emits light onto other objects\. You can use a diffuse texture RGB channel to specify glow color, and a diffuse texture alpha channel to specify glow mapping\. This allows you to mask the pixels where you want less \(or no\) glow\. You can use glow with the Cloth, HumanSkin, and Illum shaders\. To enable or disable glow, use the r\_Glow console variable\.  | 