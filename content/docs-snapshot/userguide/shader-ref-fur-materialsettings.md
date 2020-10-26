# Material Settings<a name="shader-ref-fur-materialsettings"></a>

Using fur material parameters, you can fine\-tune the look of the fur\. 

Fur rendering supports the following textures:


****  

| Parameter Name | Description | 
| --- | --- | 
| Diffuse | The texture used for the mesh\. | 
| Normal Map | Adjustments for per\-vertex normals\. Note that a busy normal map may reduce the appearance of anisotropic specular highlights, as the normals do not align across the mesh as well\. | 
| Specular | Specularity of the mesh\. | 
| Fur Heightmap | A grayscale texture that specifies how fur fades out at different frequencies over the mesh\. Without this texture, fur appears blurry and without definition to strands\. | 

![\[Example shader parameters for fur rendering.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/shaders/shader-ref-fur-13-1.png)

Default fur **Shader Params** are as follows:


****  

| Parameter Name | Value Range | Description | 
| --- | --- | --- | 
| Fur Fins Alpha Test | \[0\.0, 1\.0\] | Alpha test value used for fin and shadow passes, if enabled\. | 
| Fur Length \(cm\) | \[0\.0, 100\.0\] | Maximum length of fur, in centimeters\. | 
| Fur Maximum Gravity | \[0\.0, 5\.0\] | Maximum amount of gravity to apply to fur\. | 
| Fur Stiffness | \[0\.0, 1\.0\] | Rigidity of the fur\. Higher values cause less bending to occur\. | 
| Indirect bounce color | Color | Tint for bounce light from global illumination\. | 
| SSS Falloff | \[0\.0, 5\.0\] | Falloff speed for subsurface scattering influence\. | 
| SSS Strength | \[0\.0, 5\.0\] | Initial strength of subsurface scattering influence\. | 
| Threshold for writing depth | \[0\.0, 1\.0\] | For alpha blended fur, the alpha threshold for writing depth\. Using this, alpha blended fur works well with post effects such as depth of field\. | 

When you enable **Fur Color Data** under **Shader Generation Params**, the following additional parameters appear:


****  

| Parameter Name | Value Range | Description | 
| --- | --- | --- | 
| Fur Base Intrusion | \[0\.0, 1\.0\] | Percentage of scaled fur length per vertex to move the base mesh in the negative normal direction\. With this parameter, a mesh can provide a similar silhouette with or without fur\. | 
| Fur Combing Bias | \[0\.0, 5\.0\] | Defines how quickly fur combs from the normal direction to the per\-vertex combing direction\. | 
| Wind Scale | \[0\.0, 1\.0\] | Scale of local wind speed to apply to the fur\. | 

When you enable **Wind bending** under **Shader Generation Param**, the following additional parameters appear in **Shader Params**:


****  

| Parameter Name | Value Range | Description | 
| --- | --- | --- | 
| Wind Frequency | \[0\.0, 10\.0\] | Speed at which the wind moves through a set pattern of amplitudes\. | 
| Wind Phase | \[0\.0, 10\.0\] | Phase offset for wind applied to this material\. | 
| Wind Scale | \[0\.0, 1\.0\] | Scale of local wind speed to apply to the fur\. | 

When you enable **Fur Blendlayer** or **Fur Blend color** under **Shader Generation Params**, the following additional parameters appear in **Shader Params**:

**Note**  
If both **Fur Blendlayer** and **Fur Blend color** are enabled, Lumberyard uses only **Fur Blendlayer**\.


****  

| Parameter Name | Value Range | Description | 
| --- | --- | --- | 
| Fur Self Shadowing Bias | \[0\.0, 5\.0\] | Defines how quickly the blendlayer or blend color fades to the primary diffuse texture color\. | 
| Fur Self Shadowing Color | Color | With Fur Blend color, the color to apply at the base of the fur\. | 
| Fur Self Shadowing Map | Texture | With Fur Blendlayer, the texture to apply at the base of the fur\. Uses the same UV set as the diffuse texture\. | 

When you enable **Scale fur length** under **Shader Generation Params**, the entity's scale is factored into the fur length used by the mesh\. 

When you enable **Model Space Z Up** under **Shader Generation Params**, fur combing is computed as Z\-up instead of Y\-up\.

**Note**  
For materials that use the **Fur** shader, Lumberyard ignores settings for **Opacity** \(under **Opacity Settings**\) and **Emissive Intensity \(kcd/m2\)** \(under **Lighting Settings**\)\.