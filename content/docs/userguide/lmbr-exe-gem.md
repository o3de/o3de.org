# Gems Commands<a name="lmbr-exe-gem"></a>

Use the following commands to create gems and modify a project's use of gems\.

**list**  
Lists all gems that are installed or enabled in the specified project\.  

```
lmbr gems list (-project project_name)
```

**disable**  
Disables the specified gem in the specified project\. If `-disable-deps` is specified, all dependencies of the gem are also disabled\.  

```
lmbr gems disable project_name gem_name (-disable-deps)
```

**enable**  
Enables the specified gem in the specified project\. If a version is specified, it's used, otherwise the latest version installed is used\.  

```
lmbr gems enable project_name gem_name  (-version version)
```

**create**  
Creates a gem with the given name\. If you specify `id` or `version`, those values are used\. If you do not specify `-out-folder`, `name` is used\.  

```
lmbr gems create gem_name (-version version) (-out-folder gems\relative_folder)
```