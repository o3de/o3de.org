---
description: ' Use &ALYlong;''s remote shade compiler for game consoles that can''t
  compile shaders locally. '
title: Remote Shader Compiler
---
# Remote Shader Compiler<a name="mat-shaders-custom-dev-remote-compiler"></a>

Lumberyard's remote shader compiler application provides a convenient way to compile shaders during development\. You can install the shader compiler on a PC or Mac local network server that can communicate over TCP\. The server receives the shader source file from a computer running Lumberyard, compiles it, and sends back the shader\. Almost all renderers require a remote shader compiler\. The exception is a PC running DX11, for which a remote shader compiler is optional for local development\.

The remote shader compiler is used to store all the shader combinations that have been requested by the game so far\. Ideally, during development, you set up a remote shader compiler server for all designers, developers, and testers to connect to while building the game\. This builds a comprehensive shader list \(`ShaderList.txt`\), which you then use to generate the shaders and compress them into `.pak` files for the game to use\.

If preferred, you can also set up the shader compiler locally on a PC rather than setting up a central remote shader compile server\.

Lumberyard also generates its own `ShaderList.txt`, which records all of the shader combinations requested on that particular instance of Lumberyard\. When preparing the game for release, Lumberyard's local `ShaderList.txt` for shader generation is sufficient if the game is developed solely on one instance of Lumberyard\. Otherwise, if a team is developing multiple levels or using a very large map, some shaders may be missed by using the `ShaderList.txt` in the Lumberyard application's file system\.

On a PC, the remote shader compiler can generate shaders for Lumberyard running on the following systems\. For information about the options listed with the systems, see [Game Development Configuration](#mat-shaders-custom-dev-remote-compiler-game)\.
+ PC \(DX11\) with `r_ShadersRemoteCompiler=1`
+ Consoles
+ Android OpenGL ES 3\.1 mobile device with `r_ShadersUseLLVMDirectXCompiler=0`
+ Android OpenGL ES 3\.0 mobile device with `r_ShadersUseLLVMDirectXCompiler=0`
+ Mac with `r_ShadersUseLLVMDirectXCompiler=0`
+ Mac with `r_ShadersUseLLVMDirectXCompiler=1`
+ iOS mobile device with `r_ShadersUseLLVMDirectXCompiler=0`
+ iOS mobile device with `r_ShadersUseLLVMDirectXCompiler=1`

On a Mac, the remote shader compiler can generate shaders for Lumberyard running on the following:
+ Mac with `r_ShadersUseLLVMDirectXCompiler=1`
+ iOS mobile device with `r_ShadersUseLLVMDirectXCompiler=1`

**Important**  
Ensure the server or computer that is running the remote shader compiler is in a controlled environment that restricts incoming network requests to only authorized and trusted users or devices\. Don't run the remote shader compiler with escalated root, admin, or super\-user privileges\.

**Topics**
+ [Running the Remote Shader Compiler](#mat-shaders-custom-dev-remote-compiler-launch)
+ [Location of Specific Shader Compilers](#mat-shaders-custom-dev-remote-compiler-platform)
+ [Shader Cache Lists](#mat-shaders-custom-dev-remote-compiler-lists)
+ [Game Development Configuration](#mat-shaders-custom-dev-remote-compiler-game)
+ [Creating Paks for Server Assets](#create-paks-for-server-assets)

## Running the Remote Shader Compiler<a name="mat-shaders-custom-dev-remote-compiler-launch"></a>

You can find the remote shader compiler, **CrySCompileServer**, in the following directories:
+ PC – `lumberyard_version\dev\Tools\CrySCompileServer\x64\profile\`
+ Mac – `lumberyard_version\dev\Tools\CrySCompileServer\osx\profile\`

A [configuration file](#mat-shaders-custom-dev-remote-compiler-config) is also available for configuring the TCP port that the server application will listen on\.

You can launch the remote shader compiler by starting `CrySCompileServer.exe` manually\. However, usually it makes sense to set it up as a service, so that it always starts with the operating system\.

Because requests for shaders are executed in parallel, you may notice significant delays in acquiring shaders at runtime\.

### Remote Shader Compiler Configuration<a name="mat-shaders-custom-dev-remote-compiler-config"></a>

You configure the remote shader compiler by creating or editing the `config.ini` file, which is located in the following directories:
+ PC: `lumberyard_version\dev\Tools\CrySCompileServer\x64\profile`
+ Mac: `lumberyard_version\dev\Tools\CrySCompileServer\osx\profile`

To configure the remote shader compiler, edit the following parameters\.


****  

| Parameter Name | Description | 
| --- | --- | 
| MailError | Set to an internal company email address to which notifications about compilation errors will be sent\. | 
| TempDir |  The cache directory in which the binary shaders are stored once they are compiled\. This parameter must point to a valid absolute path\.  The default path is `C:\SHADER_CACHE`\.  | 
| port |  TCP port, which must match the setting in the game `system_platform_shader_version.cfg` file\. For examples, see the `system_windows_pc.cfg`, `system_osx_metal.cfg`, or `system_android_es3.cfg` file\.  | 
| MailServer |  Your email server\.  | 
| SCMailAddress |  Email address used in the `From` field of the email sent by the remote shader compiler\.  | 
| PrintCommands |  If set to `1` \(enabled\), the remote shader compiler prints out the commands it uses to generate shaders\.  | 
| PrintWarnings |  If set to `1` \(enabled\), the remote shader compiler prints out all the compilation warnings when shaders are generated\.  | 
| white\_list |  If set to `0.0.0.0/0`, the remote shader compiler authorizes any IP\. Any device can connect to the remote shader compiler\. As this can be a security risk, use this parameter with caution\.  | 
| DumpShaders |  If set to `1` \(enabled\), dumps the output of HLSL, GLSL, and metal shaders\. This outputs shaders into the `Shaders/platform-compiler-shader_language` directory, where: [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/mat-shaders-custom-dev-remote-compiler.html)  | 

**Example**  
The completed `config.ini` file can look like the following\.  

```
MailError = shadererror@your_company.tld
MailInterval = 1
port = 61453
TempDir = C:\SHADER_CACHE
MailServer = your_email_server
SCMailAddress = RemoteShaderCompiler@your_company.tld
PrintWarnings = 1
```

### Creating an allow list for the Remote Shader Compiler<a name="mat-shaders-custom-dev-remote-compiler-allow"></a>

You can use an allow list to specify the IP addresses that are allowed to connect to your remote shader compiler\. If a computer has an IP address that is not in the allow list, the remote shader compiler provides a message that an invalid computer tried to connect and then closes the connection\. This prevents data from being read or sent to an invalid connection\.

**To create an allow list for the remote shader compiler**

1. Create or edit the `config.ini` in the same directory as the remote shader compiler executable\.

1. Add the following parameter to the file\.

   `white_list` – Provide a comma\-separated list of IP addresses in CIDR format\. The remote shader compiler uses this list to validate incoming connection requests\. The remote shader compiler automatically adds the loopback IP address \(127\.0\.0\.1\) and its own IP address\.
**Note**  
To specify multiple IP addresses, specify a comma\-delineated list\. Do not include white space or empty lines\.

**Example**  
The following allows computers or devices with IP addresses matching the allow list to connect to the remote shader compiler\.   

```
white_list=10.53.180.37,10.53.104.220
```
The following allows computers or devices with an IP address of `192.168.0.`\* to connect to the remote shader compiler\. The `/24` specifies a net mask of 24\-bits\. If you specify `/8`, any address that starts with `192` is allowed, given only an 8\-bit net mask\.  

```
white_list=192.168.0.1/24
```

## Location of Specific Shader Compilers<a name="mat-shaders-custom-dev-remote-compiler-platform"></a>

In the root directory of the remote shader compiler, each shader language or render API has its own directory with additional subdirectories for different version numbers\. They are located in the following directory: 

`lumberyard_version\Tools\CrySCompileServer\Compiler` 

You can find information about the path used by the remote shader compiler in the `ShaderCache.cpp` file, under the function `mfGetShaderCompileFlags`\.

Lumberyard provides all appropriate shader compilers for you that match the code of that version\.

## Shader Cache Lists<a name="mat-shaders-custom-dev-remote-compiler-lists"></a>

The remote shader compiler contains different text files of all the combinations requested so far by the game\. These files are important as the shader `.pak` files cannot be generated without them

The shader cache list files are located in the following directories:
+ PC – `lumberyard_version\dev\Tools\CrySCompileServer\x64\profile\Cache\project_name\platform-compiler-shader_language`
+ Mac – `lumberyard_version\dev\Tools\CrySCompileServer\osx\profile\Cache\project_name\platform-compiler-shader_language`

Where:
+ *platform* = `PC`, `Mac`, `iOS`, or `Android`
+ *compiler* = `D3D11_FXC`, `GLSL_HLSL`, `METAL_HLSLcc`, or `METAL_LLVM_DXC`
+ *shader\_language* = `D3D11`, `GL_4`, `GLES3_1`, `GLES3_0`, or `METAL`

The game submits the requests to the remote shader compiler either during actual gameplay or during loading phases, even when remote shader compiling is disabled\. This ensures that all possible shader combinations are collected and that the shader caches, which are generated during the shader cache generation phase, are as complete as possible\.

Lumberyard also generates shaders locally\. These text files are named `ShaderList_platform.txt` \(for example, `ShaderList_DX11.txt`\)\. You can find these files in the `lumberyard_version\dev\cache\project_name\pc\user\cache\shaders` directory\.

## Game Development Configuration<a name="mat-shaders-custom-dev-remote-compiler-game"></a>

A remote shader compiler server can provide a performance benefit as it caches the results and sends them to team members instead of having to compile shaders each time\. In addition, the server keeps track of all shaders used by all people, which can be valuable if you want to make a release build that includes all shaders\.

You can set the following parameters in the `system_platform_shader_version.cfg` file in Lumberyard's root directory, such as `system_android_es3.cfg` or `system_windows_pc.cfg`\.


****  

| Console Variables | Description | 
| --- | --- | 
| r\_ShadersUseLLVMDirectXCompiler=1 |  Turn on the shader compiler that generates metal shaders on Windows and Mac\.  | 
| r\_ShadersRemoteCompiler=1 |  Specifies whether the game enables or disables the remote shader compiler\.  If set to `0`, Lumberyard does not compile remote shaders and will instead compile local shaders\.  | 
| r\_ShaderCompilerServer=IPv4\_of\_PC\_running\_the\_RemoteShaderCompiler |  Specifies the remote shader compiler location\. When the remote shader compiler is enabled, the game needs the location of the remote shader compiler\.  | 
| r\_ShaderCompilerServer=localhost | If you are running on a PC, specify this console variable to use the remote shader compiler locally\. | 
| r\_ShaderCompilerServer=10\.0\.0\.10;10\.0\.0\.11 |  Specifies more than one remote shader compiler\. Separate multiple IP addresses with semicolons\.  It is not possible to use the network name of the server instead of the IP address, because name resolving is not performed\.   | 
| r\_ShaderCompilerPort=portnumber |  If the remote shader compiler server uses a user\-defined port number as specified in the `config.ini` file, you can configure the port number with this console variable\.  | 
| r\_shaderssubmitrequestline=0 |  Disables submit request lines to the remote shader compiler\. This is console variable is useful when you are experimenting with shaders and you don't want to add these combinations to the shader cache\.  | 
| r\_AssetProcessorShaderCompiler=1 | You can use Asset Processor to proxy remote requests to the shader compiler server if a device cannot connect to the shader compiler server\. In this case, set r\_AssetProcessorShaderCompiler=1\. Now, whenever the game would have made a request directly to the shader compiler server, it instead submits the request to Asset Processor \(this can also be over a USB connection\), which then forwards it to the shader compiler server\. | 
| r\_shadersAsyncCompiling=3 |  Allows shaders to stream asynchronously and prevents the game from freezing while waiting for the shaders to compile\.  | 
| r\_ShadersAsyncActivation=1 |  Allows shaders to stream asynchronously\. Set to `0` to prevent the shaders from streaming asynchronously\.  | 

## Creating Paks for Server Assets<a name="create-paks-for-server-assets"></a>

Specify `RC.exe` to build a pak file that contains server assets only\. You generate these assets by using the following command:

```
AssetProcessorBatch.exe /gamefolder=my_game /platforms=server /server)
```

You can update `RC.exe` to look for assets in the `lumberyard_version\dev\cache\MyGame\server` directory, instead of using the PC client assets\.

**Example**  

![\[Specify the server directory instead of the PC directory.\]](/images/userguide/materials/shaders/create-paks-server-assets.png)

**To create paks for server assets**

1. Navigate to the `lumberyard_version\dev\Bin64vc141\rc` directory\.

1. In a text editor, open the `RCJob_Generic_MakePaks.xml` file\.

1. Make a copy of the file and name it `RCJob_Generic_MakePaks_Server.xml`\.

1. Edit the file so that the `src` points to your server assets, instead of the PC client assets\.

------
#### [ Before ]

   ```
    # <DefaultProperties
   
       p="pc"
       game="samplesproject"
       src="cache\${game}\${p}"
       trg="${game}_${p}_paks"
       />
   ```

------
#### [ After ]

   ```
    # <DefaultProperties
   
       p="pc"
       game="samplesproject"
       src="cache\${game}\server"
       trg="${game}_server_paks"
       />
   ```

------

1. Save the file\. 

1. Now when you run `RC.exe`, you can assign the job to the new `xml` file\.  
**Example**  

   ```
   rc.exe /job=path\to\RCJob_Generic_MakePaks_Server.xml /p=pc /game=my_game /trg=BinTemp\server_paks
   ```