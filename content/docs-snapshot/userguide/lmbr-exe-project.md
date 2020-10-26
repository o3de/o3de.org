# Projects Commands<a name="lmbr-exe-project"></a>

Use the following commands to create and modify game projects\.

**list**  
Lists all projects in the current engine directory\.  

```
lmbr projects list
```

**create**  
Creates a new project using `EmptyTemplate`, which is located at `dev\ProjectTemplates\EmptyTemplate`, as a template\.  

```
lmbr projects create project_name
```

**get\-active**  
Displays the name of the active project\.  

```
lmbr projects get-active
```

**set\-active**  
Sets the active project for building and executing Lumberyard\. This command modifies `_WAF_\user_settings.options` and `bootstrap.cfg` to reference the specified project\.  

```
lmbr projects set-active project_name
```

**populate\-appdescriptors**  
Populates the appdescriptors files from the gems list\. If you use the Project Configurator to change gems, Lumberyard automatically updates the application descriptor files\. If you manually edit a `gems.json` file, run this command to update these two application descriptor files in a project's asset directory:  
+ `dev/project_asset_directory/Config/Game.xml`
+ `dev/project_asset_directory/Config/Editor.xml`

```
lmbr projects populate-appdescriptors
```