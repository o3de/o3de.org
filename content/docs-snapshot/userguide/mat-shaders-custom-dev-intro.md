# Developing a Custom Shader<a name="mat-shaders-custom-dev-intro"></a>

Most visual effects in Lumberyard are produced by shaders, which employ a number of standard and advanced lighting models like Blinn, Cook\-Torrance, Oren\-Naye, Kajiya\-Kay, and some custom models\. 

There are two types of shaders used: lighting shaders that interact with scene illumination, and regular shaders that don't calculate any lighting information and are used for post\-processing effects\. All lighting shaders have a common structure and make use of a unified shading interface\. This interface should always be used to ensure proper usage of the lighting pipeline, minimize code duplication and save a lot of work\.

Lumberyard uses an ubershader system with compile\-time defines to handle the many different shader permutations that are required for combining numerous shader features\. The shader format used that is very similar to High\-Level Shader Language \(HLSL\), DirectX FX, and CgFX\.

Shader development is a programming discipline onto itself and requires expert knowledge to optimize as shader code can be performance\-critical and platform\-dependent\. 

The easiest way to create new shaders is with a text editor\. 

**To create a new shader**

1. Using a text editor, copy an existing `.ext` extension file and associated `.cfx` effect file\. 

1. Add the shader's file name to the `lumberyard_version/dev/Editor/Materials/ShaderList.xml` file\. 

1. Restart the **Material Editor**\. The new shader appears and you can assign it to a material\.

**Topics**
+ [Shader Development Best Practices](material-shaders-custom-development-best-practices.md)
+ [Shader Rendering Pipeline](mat-shaders-custom-dev-pipeline.md)
+ [Hot Reloading of Shaders](mat-shaders-custom-dev-hot-reloading.md)
+ [Remote Shader Compiler](mat-shaders-custom-dev-remote-compiler.md)
+ [Generating Shader Combinations](mat-shaders-custom-dev-combinations.md)