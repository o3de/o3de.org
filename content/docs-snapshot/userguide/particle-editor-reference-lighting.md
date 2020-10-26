# Lighting Attribute<a name="particle-editor-reference-lighting"></a>

In the **Lighting** attribute, specify how to control the particle lighting\.

![\[Lighting attributes in the Particle Editor.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/particles/particle-editor-lighting.png)


**Lighting Attribute Parameters**  

| Name | Description | 
| --- | --- | 
| Light Source | \(CPU only\) Causes each particle to create a deferred light, where color is equal to the Color value\.[\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/particle-editor-reference-lighting.html)Valid values: `0+`Default value: false, `0`, `0` | 
| Diffuse Lighting | Multiplies the particle color for dynamic \(diffuse\) lighting\. Valid values: `0+`Default value: `1` | 
| Diffuse Backlighting | Specifies the fraction of diffuse lighting that is applied to unlit particle directions\.Valid values: `0` \(standard diffuse and normals facing the light are lit the most\) to `1` \(omnidirectional diffuse and light affects all normals equally\)\.Default value: `0` | 
| Emissive Lighting | Multiplies the particle color for constantly emitting light\. You can add a value to make a particle appear as if it's glowing\. Valid values: `0+`Default value: `0` | 
| Environment Probe Lighting | \(CPU only\) Controls the amount of diffuse lighting that is contributed from environment probes\.Valid values: `0` to `1`Default value: `0` | 
| Receive Shadows | \(CPU only\) Allows shadows to cast on the particles\. Default value: false | 
| Cast Shadows | \(GPU and geometry particles only\) Allows particles to cast shadows\. Default value: false | 
| Not Affected by Fog | \(CPU only\) Causes particles to ignore scene fog\. Default value: false | 

**Note**  
When there is a single light source, some or all particles can appear unlit \(black\)\. To address this:  
Add an environment probe to the scene to create indirect lighting\. For more information, see the **[Environment Probe](component-environment-probe.md)** component\.
Specify a value for the **Environment Probe Lighting** parameter to enable environment probe lighting on the particle system\. For example, a value of `0.5` applies light from the environment probe at half intensity\.