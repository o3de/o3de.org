# Finding the Material Parameter Name<a name="material-param-names"></a>

You can specify material parameter names for some **Script Canvas** editor nodes\. In the **Material Editor**, you can find the material parameter names in the following sections:
+ **Opacity Settings**
+ **Lighting Settings**
+ **Shader Params**

You can find common parameters in the **Opacity Settings** and **Lighting Settings** sections\. You can find parameters that are specific to the selected shader in the **Shader Params** section\.

![\[Find material parameter names in the Material Editor in Lumberyard Editor.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-opacity-lighting-settings-material-params.png)

**To find the material parameter name**

1. In Lumberyard Editor, choose **Tools**, **Material Editor**\.

1. In the **Material Editor**, navigate to the material file\.

1. In the **Opacity Settings**, **Lighting Settings**, and **Shader Params** sections, pause on a parameter to find the script parameter name\.  
**Example**  

   For **Diffuse Color \(Tint\)**, the script parameter name is **diffuse**\.  
![\[Find script parameter names in the Material Editor in Lumberyard Editor.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-script-param-name-diffuse.png)  
**Example**  

   For **Emittance Map Gamma**, the script parameter name is **EmmitanceMapGamma**\.  
![\[Find shader-specific script parameter names in the Material Editor.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-custom-param-name.png)

The following parameter names are commonly available and built in all materials\.


**Material Param Names**  

| Param | Type | Display Name | Description | 
| --- | --- | --- | --- | 
| opacity | Float | Opacity | Sets the transparency amount\. Uses 0 to 99 to set Alpha Blend and 100 for Opaque and Alpha Test\. | 
| alpha | Float | AlphaTest | Uses the alpha mask and refines the transparent edge\. Uses 0 to 50 to bias toward white or 50 to 100 to bias toward black\. | 
| diffuse | Color | Diffuse Color \(Tint\) | Tints the material diffuse color\. Physically based materials should be left at white\. | 
| specular | Color | Specular Color | Shininess and color of reflective highlights\. | 
| shininess | Float | Smoothness | Smoothness or glossiness simulating how light bounces off the surface\. | 
| emissive\_intensity | Float | Emissive Intensity \(kcd/m2\) | Brightness simulating light emitting from the surface, making an object glow\. | 
| emissive\_color | Color | Emissive Color | Tints the emissive color\. | 