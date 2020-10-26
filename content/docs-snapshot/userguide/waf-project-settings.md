# Waf Project Settings<a name="waf-project-settings"></a>

When defining a project's build settings \(wscript\), you can specify several different project settings for the build modules to configure the correct parameters for the project\.

The following table provides the valid attributes for the different build modules\.


**Build attributes**  

| Attribute | Description | Target to Platform or Configuration | 
| --- | --- | --- | 
| additional\_manifests | Additional manifests to add to MSVC applications | Y | 
| additional\_settings | Container that groups compile settings and acts upon them recursively; useful for specifying options for particular files in a project For example, you can disable precompiled headers for a specific file using the following: <pre>...<br />additional_settings = Settings ( files = 'my_file.cpp', disable_pch=True )</pre> | Y | 
| build\_in\_dedicated | True by default; if False, the module will not be built when building in dedicated server mode | N | 
| cflags | Additional C flags to pass to the compiler | Y | 
| cxxflags | Additional CXX flags to pass to the compiler | Y | 
| defines | List of additional pre\-processor defines for the project | Y | 
| enable\_rtti | Enable RTTI for a particular module  | Y | 
| export\_defines | List of definitions to add to the module that has a 'use' dependency on the current module  | Y | 
| export\_definitions | List of export definitions to export using the /DEF: compiler option | Y | 
| export\_includes | List of Additional include paths to add to the module that has a 'use' dependency on the current module  | Y | 
| features | Additional custom features to apply to the project during the build | Y | 
| file\_list | List of file specs that contain the files to include in the project | Y | 
| files | List of files to include for the module  | N | 
| force\_dynamic\_crt | Forces the use of dynamic runtime CRT for the project | N | 
| force\_static\_crt | Forces the use of static runtime CRT for the project | N | 
| framework | \(Darwin\) Specifies the framework to use | Y | 
| frameworkpath | \(Darwin\) Specifies additional paths to search for frameworks | Y | 
| includes | Additional include paths for the module | Y | 
| lib | Additional input libraries to link against | Y | 
| libpath | Additional library paths for the module | Y | 
| linkflags | Additional linker flags to pass to the linker | Y | 
| meta\_includes | Additional meta includes for WinRT using the /AI compiler option | Y | 
| need\_deploy | Hint to deploy the module before debugging in Visual Studio | N | 
| output\_sub\_folder | Optional subfolder under the target output folder in which to copy the module binary | N | 
| pch | Specifies the precompiled header \(PCH\) file, if in use  | N | 
| platforms | List of platforms to restrict the module to build on; if missing, a specific platform will not be targeted at the project definition level | N | 
| priority\_includes | Same as the includes paths, except this include list is added prior to the ones defined in the includes paths | N | 
| source | List of source files to add directly to the project | N | 
| target | Project name of the target | N | 
| use | List of static library modules that are part of the Waf build to which you can add dependencies and static links | Y | 
| uselib | Add a dependency on a 3rd party library by name | Y | 
| vs\_filter | Folder filter in the generated solution file where this project exists | N | 

## Platform and Configuration Targeting<a name="platform-configuration-targeting"></a>

If allowed \(refer to the third column in the table above\), you can set an attribute value to apply only under certain target platforms and configurations\. Each attribute can be universal for all builds or targeted specifically to a platform/configuration combination:
+ **\[Attribute\]** – Applies to any target platform/configuration for the attribute
+ **\[target\_platform\]\_\[attribute\]** – Applies to any configuration for a specific target platform for the attribute
+ **\[configuration\]\_\[attribute\]** – Applies to a specific configuration for any target platform for the attribute
+ **\[target\_platform\]\_\[configuration\]\_\[attribute\]** – Applies to a specific target platform and configuration for the attribute

## Features<a name="waf-project-features"></a>

The Lumberyard Waf system allows the use of custom features to add functionality to a project's build pipeline\.


**Build features**  

| Feature | Description | 
| --- | --- | 
| qt5 | Passes files through the QT5 moc processor | 
| generate\_rc\_file | Creates an RC file and copies the resources, such as the icon file; win\_x64 only | 
| wwise | Sets the following for building and linking against Wwise: environment, includes, libraries, and library paths  | 
| GoogleMock | Sets the following for building and linking against Google Mock: environment, includes, libraries, and library paths | 
| AWSNativeSDK | Sets the following for building and linking against the AWS Native SDK library: environment, includes, libraries, and library paths | 
| AWSGameLift | Sets the following for building and linking against the AWS GameLift library: environment, includes, libraries, and library paths | 
| GridMate | Sets the following for building and linking against the GridMate library: environment, includes, libraries, and library paths | 