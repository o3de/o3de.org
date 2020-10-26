# Waf Spec Files \(\*\.json\)<a name="waf-files-spec-file"></a>

You use Waf spec files to specify which modules to include in a build configuration\. All settings are mandatory if not explicitly stated otherwise\. 

A typical spec includes all modules that are required to build a game project\. Lumberyard includes the following with the engine SDK:
+ **`game_and_engine.json`** – Specs to build the sample game and engine
+ **`resource_compiler.json`** – Specs to build the Resource Compiler
+ **`pipeline.json`** – Specs to build the pipeline tools
+ **`all.json`** – Specs to build all projects

The following is an example `*.json` file that illustrates a spec file layout:

```
{
    "description"           : "Configuration to build the my game",
    "visual_studio_name"    : "My Game",
    "comment"               : "This is meant to only compile tools on Windows.",
    "disable_game_projects" : true,
    "platforms" : ["win"],
    "configurations" : ["debug","profile"],

    "modules" :
    [
        "AzCore",
        "AzFramework",        
        "AzToolsFramework",
        "GridMate",
        "LuaIDE",
        "Profiler"
    ]
}
```

**Note**  
The `disable_game_projects` keyword does not compile the games specified in the `project.json` file\. The default value is false, which means the specs compile the game projects by default\.

## Platform\-specific Entry Values<a name="spec-file-entries"></a>

You can apply the entry values in the table to targeted platforms and/or configurations\. For example, a spec can build specific modules for win\_x64 or a spec can build different modules in certain configurations\.
+ **modules** – Includes in the build all modules defined by this key, regardless of platform and configuration\.
+ **win\_x64\_modules** – Includes in the win\_64 build all modules defined by this key, regardless of configuration\.

Overlapping lists are combined into a single list based on the build command\. 

## Spec File Format Specification<a name="spec-file-format"></a>

The general format of the JSON\-based spec file is a dictionary of keyword values\. The following table lists the possible keywords and their description\.


****  

| Keyword Value | Description | 
| --- | --- | 
| comment | Additional comments to add to the spec file\. | 
| configurations | The list of configurations that this spec supports\. In other words, the spec only builds the modules listed in the spec if the current configuration exists in the list of configurations\. This is an AND condition with the platforms value\. | 
| description | Description of the spec file\. | 
| disable\_game\_projects | Flag that indicates that no game projects \(as defined in project\.json\) are included in the build for this spec\. | 
| platforms | The list of platforms that this spec supports\. In other words, the spec only builds the modules listed in the spec if the current target platform exists in this list of platforms\. | 
| platform\_configuration\_defines | [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/waf-files-spec-file.html) | 
| visual\_studio\_name | Name of the generated Visual Studio solution that is used to distinguish this build spec from a build configuration\. | 