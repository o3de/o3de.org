# Default dependencies for Lumberyard projects<a name="asset-bundler-default-dependencies"></a>

 Throughout your Lumberyard project you'll use assets across multiple levels, or find those that need to be included whether or not they're a strict dependency\. To handle these use cases, Lumberyard supports *default dependency files* which define assets that are always required when bundling your project\. Default dependencies are also used by Gems to make sure their own critical assets are always included\. 

 Default dependencies give you a convenient way to list assets that should be bundled as part of your whole project, and can be applied when generating any asset list by using `--addDefaultSeedListFiles`\. When you use this argument as part of an asset bundler command, it picks up the default dependencies for the Lumberyard engine, included gems, and your project\. 

## Default dependency file locations<a name="asset-bundler-default-dependencies-locations"></a>

 There are four levels of default dependency files available\. All paths are relative to `lumberyard_install\dev`:


****  

| Default dependency | File path | Description | 
| --- | --- | --- | 
| Engine | Engine\\Engine\_Dependencies\.xml | The dependencies packaged for every Lumberyard project\. Only edit this file when you use the same installation to create multiple projects that need to include a specific resource which even basic game functionality depends on\. | 
| Gems | Gems\\gem\_name\\Assets\\gem\_name\_Dependencies\.xml | The required dependencies for the named gem\. When creating a new gem, include any resources that are required regardless of whether they're used explicitly within a project here\. Never edit the default dependency file for a gem which you aren't writing or customizing\. | 
| Project | project\_name\\project\_name\_Dependencies\.xml | Project\-wide dependencies\. This is the default dependency file that you'll be editing most frequently, and should include things like game\-wide audio, configuration information for pre\-loading resources at launch time, or other assets that must always be included with your project\. When you create a new project, the dependency file is created from the ProjectTemplates\\DefaultTemplate\\$\{ProjectName\}\\$\{ProjectName\}\_Dependencies\.xml template\. | 

**Important**  
 These files are **not** seed lists, and can't be manipulated with commands that modify seed lists\. Default dependencies are built by the Asset Processor to create seed lists in the cache\. These seed lists are then picked up by the Asset Bundler when you use the `--addDefaultSeedListFiles` flag\.  
Another important consequence of this is that every time you change a default dependencies file, it must be built by the Asset Processor to generate an updated seed list for the Asset Bundler\.

## Default dependencies file format<a name="asset-bundler-default-dependencies-format"></a>

Default dependencies files are written in XML and consist of only two elements: `EngineDependencies` and `Dependency`\. The root element of a default dependency file should always be `<EngineDependencies version="1.0.0">`, including this specific value for the `version` attribute\. `Dependency` elements are the only children of the `EngineDependencies` node, and require two attributes: `path` and `optional`\. `Dependency` elements have no children, including no text content\.

How each `Dependency` node is treated depends on the attribute values:
+ `optional` – This value is either `true` or `false`, and describes whether or not the listed asset is absolutely required by the asset bundling process\. Most often you'll want to use `true` for asset paths without wildcards, and `false` for paths which contain a wildcard\.
+ `path` – This value is the path to the asset\(s\) to include, and accepts the use of the `*` wildcard character\. Wildcards search all subdirectories recursively\.

  Because wildcard matching may catch files that you don't want to include as default assets, you can add *exclusion paths*: Dependencies where the path starts with a `:` character\. Assets in an exclusion path are not included as a default dependency\. 

The following is an example of a default dependency list for a project, commented to make it clear which dependencies are processed by each node:

```
<EngineDependencies versionnumber="1.0.0">
    <Dependency path="libs/particles/preloadlibs.txt" optional="true" />        <!-- Include particle pre-loads if present -->
    <Dependency path="libs/gameaudio/wwise/*.xml" optional="false" />           <!-- Include all XML files under project_name\libs\gameaudio\wwise and its subdirectories... -->
    <Dependency path=":libs/gameaudio/wwise/levels/*.xml" optional="false" />   <!-- ...unless they're under project_name\libs\gameaudio\wwise\levels or its subdirectories. -->
</EngineDependencies>
```