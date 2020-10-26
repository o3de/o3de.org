# Shader Compiler Proxy<a name="asset-pipeline-shader-compiler"></a>

Some mobile devices may be connected via a USB TCP/IP tunnel and may not have direct network access to a shader compiler server\. The shader compiler proxy component in Lumberyard allows such devices to forward shader compiler requests through the Asset Processor connection\.

This proxy connection only works for connecting to the shader compiler server on that protocol\. It is not a general purpose network bridge or tunnel\. To use the shader compiler proxy, open the `system_assetsplatform.cfg` file and modify the following values:
+ `r_ShaderCompilerServer = IP address of shader compiler server` – Sets the location of the shader compiler server as seen from the computer running `AssetProcessor.exe`\. For example, **localhost** could be used if both the Asset Processor and the shader compiler server are running on the same computer\.
+ `r_ShadersRemoteCompiler = 1` – Compiles shaders remotely\.
+ `r_AssetProcessorShaderCompiler = 1` – Routes shader compiler through the Asset Processor\. If not set to 1, the device attempts to directly connect to the shader compiler server through the IP set\. 