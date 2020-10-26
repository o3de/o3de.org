# Creating Custom Script Canvas Nodes in a Gem<a name="script-canvas-custom-nodes-gem"></a>

To have a gem support custom Script Canvas nodes, you must configure it to take a dependency on Script Canvas and then configure Waf\. The following procedure uses the Starting Point Input Gem as an example\.

**To create a Script Canvas dependency for a gem**

1. Open the gem's `gem.json` file\. \(For reference, see the source at `\dev\Gems\StartingPointInput\gem.json`\.\)

   ```
   {
       "Dependencies": [
           {
               "Uuid": "59b1b2acc1974aae9f18faddcaddac5b",
               "VersionConstraints": [
                   "~>0.1"
               ],
               "_comment": "InputManagementFramework"
           },
           {
               "Uuid" : "869a0d0ec11a45c299917d45c81555e6",
               "VersionConstraints" : [">=0.1.0"],
               "_comment" : "ScriptCanvas"
           }
       ], 
   
       "GemFormatVersion": 3,
       "Uuid": "09f4bedeee614358bc36788e77f97e51",
       "Name": "StartingPointInput",
       "Version": "0.1.0",
       "LinkType": "Dynamic",
       "EditorModule": true,
       "DisplayName": "Starting Point Input",
       "Tags": ["Input","Starting Point"],
       "Summary": "The Starting Point Input Gem works with the Input Management Framework Gem to interpret raw input and convert it to input events such as pressed, released, and held.",
       "IconPath": "preview.png"
   }
   ```

1. In the `Dependencies` key at the beginning of the file, add the following entry for Script Canvas:

   ```
           {
               "Uuid" : "869a0d0ec11a45c299917d45c81555e6",
               "VersionConstraints" : [">=0.1.0"],
               "_comment" : "ScriptCanvas"
           }
   ```
**Note**  
To use this dependency, the Script Canvas Gem must be enabled in the Project Configurator when your gem is enabled\.

1. Configure Waf to find the path to the `AzCodeGeneration` driver\. To see how to do this, you can follow the example of the Starting Point Input Gem's `.wscript` file\.

   The following is the full text of the `.wscript` file\. Substeps are provided after the full text\.

   ```
   def build(bld): 
   ########################################################################################
   # Need to build a /dev relative path; otherwise, a gem/code relative path is used.
   ########################################################################################
       import os
       driver_node = bld.path.find_or_declare('Gems/ScriptCanvas/Code/Include/ScriptCanvas/')
       gem_node = bld.path.find_or_declare('Gems/StartingPointInput/Code/')
       script_canvas_dir = driver_node.path_from(gem_node)
   ######################################################################################## 
       AZ_CODEGEN_ARGS = az_code_gen = [{
                   'files'   : ['Source/InputNode.h',],
                   'scripts' : [os.path.join(script_canvas_dir, 'CodeGen/Drivers/ScriptCanvasNode.py')],
                   'arguments' : [
                                   #'-OnlyRunDiagnosticsOnMainFile=true',
                                   #'-SuppressDiagnostics=false',
                                   #'-SuppressErrorsAsWarnings=false',
                                   #'-output-redirection=file',
                                   '-SuppressIncludeNotFoundError=false',
                               ],
                   'options' : ['PrintOutputRedirectionFile']
               }] 
       bld.DefineGem(
           use    = [ 'AzFramework', 'ScriptCanvas' ],
           includes = [ bld.Path('Code/CryEngine/CryAction'),
                        bld.Path('Code/CryEngine')
                         ],
           export_includes = [bld.Path('Code/CryEngine')], 
           # Suppressing level 1 warning C4351 on windows
           # new behavior: elements of array 'array' will be default initialized
           # https://msdn.microsoft.com/en-us/library/1ywe7hcy.aspx
           win_cxxflags = ['/wd4351'],
           features        = ['az_code_gen'],
           win_defines = [], 
           file_list = [ 'startingpointinput.waf_files' ],
           test_all_file_list  = ['startingpointinput_tests.waf_files'], 
           az_code_gen = AZ_CODEGEN_ARGS, 
           ########################################
           # Editor Gem configuration
           editor = dict( 
               az_code_gen = AZ_CODEGEN_ARGS,
               file_list = [ 'startingpointinput_editor.waf_files' ],
           )
           ########################################
       )
   ```

   1. In the first section of the `.wscript` file, tell AZ Code Generator where to find the Script Canvas drivers and templates\. This section is required\.

      ```
      import os
          driver_node = bld.path.find_or_declare('Gems/ScriptCanvas/Code/Include/ScriptCanvas/')
          gem_node = bld.path.find_or_declare('Gems/StartingPointInput/Code/')
          script_canvas_dir = driver_node.path_from(gem_node)
      ```

   1. In the next section, create a configuration object that specifies the files that you want AZ Code Generator to process\. For build performance, AZ Code Generator runs only on the files that you specify in the wscript file\. Therefore you must add to the `files` section the source files for any new node on which you want to use AZ Code Generator:

      ```
      AZ_CODEGEN_ARGS = az_code_gen = [{
                      'files'   : ['Source/InputNode.h',],
                      'scripts' : [os.path.join(script_canvas_dir, 'CodeGen/Drivers/ScriptCanvasNode.py')],
                  }]
      # Note: Only the files specified in the above 'files' section will be run through AZ Code Generator !
      ```

   1. Configure the gem to use AZ Code Generator\.

      ```
      use             = [ 'AzFramework', 'ScriptCanvas' ],  # Ensures that the core ScriptCanvas code is statically linked.
      features        = ['az_code_gen'], # Enables AZ Code Generator for this gem.
      az_code_gen     = AZ_CODEGEN_ARGS, # Applies the configuration parameters that you previously defined.
      ```

   1. In the last section, provide configuration for the Editor Gem\.

      ```
      editor = dict(
          az_code_gen = AZ_CODEGEN_ARGS,
          file_list = [ 'startingpointinput_editor.waf_files' ],
      )
      ```

      Because Script Canvas is both an edit time tool and a runtime system, it requires that your gem provide an Editor Gem\. This ensures that the proper `.dll` files are loaded with the relevant symbols both when the project is compiled and at run time\.