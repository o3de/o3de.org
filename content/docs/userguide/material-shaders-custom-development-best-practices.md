# Shader Development Best Practices<a name="material-shaders-custom-development-best-practices"></a>

Shaders add flexibility to the modern rendering effects seen in games today\. To save you the trouble of managing multiple shader permutations, the shader compiler automatically creates the permutations for you when it parses the code, hiding the complexity\. However, this process requires high memory performance and requires long compile times\.

See the following guidelines and best practices when you develop a custom shader for Lumberyard:
+ Before creating a new shader, make sure that you can't reuse or parameterize one of the existing shaders\. 
+ Precompute as much as possible\. Place the shaders in either textures or in the vertex shader and pass the data to vertex interpolators\. 
+ For performances reasons, try to reduce the usage of sincos \(8 ALU\), normalize \(3 ALU\), pow \(3–9 ALU\), divisions \(3 ALU\), and smoothstep because of their higher execution cost\. 
+ Pack as much data as possible in each texture instead of doing multiple texture lookups\. Texture lookups are expensive on consoles and older hardware\.
+ Shader code is compiled depending on permutation flags that can come from various sources, such as material and runtime flags\. These flags are defined in the following files:
  + `runtime.ext` – This file contains all runtime flags that can be shared by all shaders\. You can review the file to better understand how to add flags and apply to any newly added shader that requires an existing runtime flag\.
  + `shader_name.ext`– These files define shader\-specific flags that are exposed in the **Material Editor**\.
+ Having many flags leads to many shader permutations\. For best results, try to keep the number of flags relatively small\.

**Compiling Shaders in Debug Mode**  
To debug shaders in applications such as RenderDoc, Nsight, or Pix, it's important to enable shader debugging information\. By default, shaders are optimized and don't output potentially useful debugging information\. You can use the `r_ShadersDebug` console variable to enable debug information when needed\.  

**To enable shader debug compiler options**

1. To ensure a clean compile, we recommend that you first delete your `lumberyard_version\dev\Cache\your_game\platform_type\user\cache\shaders` directory\.

1. In a text editor, navigate to the `lumberyard_version\dev\system_windows_pc.cfg` file\.

1. Add the following console variable to the file\. 

   ```
   r_ShadersDebug=3
   ```

   The console variable will change the DX11 compile flags in order to disable optimizations \(`/Od`\) and enable debugging information \(`/Zi`\)\.

1. Save the file\. Lumberyard will automatically compile new shaders\.
You can modify some console variables at runtime\. However, we recommend that you add this console variable to the `system_windows_pc.cfg` file\. For more information, see [Using the Console Window](console-intro.md)\.