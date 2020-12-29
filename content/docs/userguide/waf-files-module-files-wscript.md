# Waf Module Files \(wscript\)<a name="waf-files-module-files-wscript"></a>

Wscript files are Python source files that have a fixed name and defined rules for the project folder\. Waf picks up and processes the wscript file in each folder\. Files can recurse into one or more subdirectories, define the build script for one or more modules, or both\.

Wscript files are the main project script files for projects and can include the following:
+ Specialized behavior for various Waf commands
+ Different module types and entries
+ Build rules for the folder
+ Project\- or target platform\-specific definitions for compile, link, or other settings

Lumberyard includes a wscript file at the root folder that is used for the following:
+ Loading all supported modules and tools relevant to a platform
+ Importing all scripts necessary for configuring and building the engine
+ Setting the available options that can be passed through the command line or in the default user options file located at `_WAF_/user_settings.options`
+ Recursing into the `Code` and `Engine` folders at the root level

At the root is a compiled python script called `lmbr_waf.bat` that executes the Waf commands through the root `wscript` file\.

## Lumberyard Engine Build Modules<a name="lumberyard-engine-build-modules"></a>

The Lumberyard Waf system includes the following predefined build modules that can help define the build rules for system modules:


****  

| Build Module | Description | Consumers | Project Type | 
| --- | --- | --- | --- | 
| CryConsoleApplication | Build module for generic console applications | ShaderCacheGen | Executable | 
| CryDedicatedServer | Build module for dedicated \(server\) game project launchers | FeaturesTestsDedicatedLauncher | Executable | 
| CryEditor | Build module for Lumberyard Editor project | Editor | Executable | 
| CryEngineModule | Build definition for CryEngine modules\. Standard CryEngine modules autogenerate an RC file, if applicable\. | Cry3DEngine, CryAction, CryAISystem, CryAnimation, CryEntitySystem, CryFont, CryInput, CryLiveCreate, CryMovie, CryNetwork, CryLobby, CryPhysics, CryScriptSystem, CrySoundSystem, CryAudioImplMiles, CryAudioImplNoSound, CryAudioImplSDLMixer, CryAudioImplWwise, CrySystem, CryRenderD3D11, CryRenderOpenGL, CryRenderNULL, CryD3DCompilerStub | Shared Library \(non\-release\), Static Library \(performance, release\) | 
| CryEngineNonRCModule | Version of the CryEngineModule that does not attempt to create an RC file | CrySoundUnitTests, LyShine, AssetTaggingTools | Shared Library | 
| CryEngineStaticModule | Build module to create static libraries | lua, md5, LZSS, Lzma, expat, DBAPI, zlib, lz4, PRT | Static Library | 
| CryFileContainer | Build module that acts as a placeholder for source files | CryCommon, CryAudioCommon, EditorAudioControlsBrowser | Non | 
| CryLauncher | Build module for game project launchers | FeaturesTestsLauncher | Executable | 
| CryPipelineModule | Build module for pipeline components | CryExport2014, CryExport2015, CryExport2016, MayaCryExport22014, MayaCryExport22015, MayaCryExport22016 | Custom | 
| CryPlugin | Build module for Lumberyard Editor plugins | AssetTagging, CryDesigner, EditorDesc, EditorAnimation, EditorFbxImport, EditorGameDatabase, SchematycPlugin | Shared Library | 
| CryPluginModule | Build module for Lumberyard Editor plugin modules | EditorCommon, PerforcePlugin | Shared Library | 
| CryResourceCompiler | Build module for the resource compiler application | ResourceCompiler | Executable | 
| CryResourceCompilerModule | Build module for resource compiler modules | CryPhysicsRC, CryXML, CryPerforce, ResourceCompilerABC, ResourceCompilerFBX, ResourceCompilerImage, ResourceCompilerPC, ResourceCompilerXML | Shared Library | 
| CryStandAlonePlugin | Build module for Lumberyard Editor standalone plugins \(does not link to any engine shared libraries\) | EditorAudioControlsBrowser,EditorMiles, EditorNoSound,EditorWwise, FBXPlugin, FFMPEGPlugin, MetricsPlugin, PrototypeEditorPlugin, StateMachineEditorPlugin, UiEditor | Shared Library | 
| CryUnitTestLauncher | Build module for unit test launchers | UnitTestLauncher | Executable | 