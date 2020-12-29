# Configuring the Asset Pipeline<a name="asset-pipeline-configuring"></a>

**Important**  
The Asset Builder SDK is now preferred over the legacy `rc.exe` program for adding asset types to the pipeline\. Instead of using the `rc.exe` program, make a builder module that you derive from the `BuilderSDK`\. These modules are self configuring\. For instructions and examples on how to write builders that process your own asset types, see the [Creating a Custom Asset Builder](asset-builder-custom.md)\. We recommend that you do not rely on the old `rc.exe` pipeline, although it's still available if you have legacy code\.

You can configure the Lumberyard asset pipeline by editing the `\dev\AssetProcessorPlatformConfig.ini` file that `rc.exe` program uses\. You can add your own asset types to it by modifying the sections of the file described in this document\. When you check in your changes to the config file, the version of the assets on your collaborators' computers is updated automatically\. This removes the need for you to manually refresh the cache on each coworker's computer\.

The `AssetProcessorPlatformConfig.ini` consists of six sections\. The `.ini` file uses standard Qt/Windows `.ini` file formatting rules\. Comments are preceded by a semicolon, and named sections are designated by square brackets\.

**Important**  
Backslashes in `.ini` files have a special meaning\. To use a regular backslash character, you must prefix it with another backslash\. To avoid problems with file paths, the asset processor and asset pipeline use forward slashes for path names\. However, if you need to use backslashes in regular expressions, you must also escape them so that they can be recognized by the regex system\. For example, you must specify the regular expression `.*\/Levels\/.*` like this:  

```
.*\\/Levels\\/.*
```

In addition to the `AssetProcessorPlatformConfig.ini` file \(located in the `/lumberyard_version/dev` directory\), you can also add the following:
+ `AssetProcessorGamePlatformConfig.ini` – Add this file to your game project folder to override any configurations that are specific to a project\. The final configuration is the result of merging both files\. The `AssetProcessorGamePlatformConfig.ini` file is read last and therefore takes priority\.
+ `AssetProcessorGemConfig.ini` – Add this file to the gem folder to allow your enabled gem to affect the asset processor configuration\. The impact is similar to editing the root file but without making permanent changes to the root file\. For example, you can add an `AssetProcessorGemConfig.ini` file for the Cloud gem to the `/lumberyard_version/dev/Gems/Clouds` directory\.

  The final configuration is the result of merging the following files in order:
  + `dev/AssetProcessorPlatformConfig.ini`
  + `dev/Gems/GEM_NAME1/AssetProcessorGemConfig.ini`
  + `dev/Gems/GEM_NAME2/AssetProcessorGemConfig.ini`
  + `dev/Gems/GEM_NAME3/AssetProcessorGemConfig.ini`
  + `your_project_folder/AssetProcessorGamePlatformConfig.ini`

## Platforms Section<a name="asset-pipeline-configuring-platforms-section"></a>

The `Platforms` section contains two subsections:
+ `Platform Definition` – Defines which platforms exist when you use the `[Platform platformName]` section header\.
+ `Platforms` – Defines which of the platforms are enabled by default in your project\.

### Platform Definition Subsection<a name="asset-pipeline-configuring-platform-definition-subsection"></a>

Use the following subsections to define an operating system and its attributes\. The name of the operating system appears in the section header, for example, `pc` or `ios`\.

```
[Platform pc]
tags=tools,renderer
```

```
[Platform ios]
tags=mobile,renderer
```

You can define the `tags` attribute and assign tags to an operating system\. This allows you to control behavior based on the tags\. For example, you can choose to compile textures on all operating systems with the mobile tag rather than naming operating systems individually\. Should you add mobile operating systems to your configuration, you can use the mobile tag to include them when modifying behavior\. This removes the necessity of recompiling and modifying all rules and builders to include the new operating systems\.

### Platforms Subsection<a name="asset-pipeline-configuring-platform-subsection"></a>

Use the `Platforms` subsection to enable and disable operating systems for the entire project\. Note that "disabling" means that the game project does not use the specified operating system\. When you disable an operating system, the related assets are removed, and the associated space on your hard drive is freed up\.

In the following example, PC is enabled and other operating systems are commented out\.

```
[Platforms]
pc=enabled
;es3=enabled
;ios=enabled
;osx_gl=enabled
```

Because the default value for an operating system is `disabled`, the operating systems in the example that are commented out are not enabled\.

If you want to enable an operating system that is already listed in the `[Platforms]` subsection, remove the semicolon to uncomment the corresponding line\.

If an entry for a game operating system that you want is not in the list, you can add it\. However, you must also handle OS\-related differences like image formats\. To do so, you must change the code in the asset processor \(and possibly the image compiler and other builders\)\.

If you are using the `rc.exe` pipeline, specified operating systems are passed as parameters to the `rc.exe` program\.

The operating system that Lumberyard runs on is enabled by default, so you can leave that line commented out\. For example, if Lumberyard runs on Mac, you can leave the `osx_gl=enabled` line commented out\.

If you run `AssetProcessor.exe` or `AssetProcessorBatch.exe` on a build server, you can use the following command line parameter to specify which operating systems to enable: `/platforms=comma-separated-list`

Using this command line parameter enables only the specified operating systems, regardless of the host platform that runs the tools\.

You can specify tags for the `platforms` command line parameter, for example: `AssetProcessorBatch.exe /platforms=tools,es3`

## Jobs Section<a name="asset-pipeline-configuring-jobs-section"></a>

Use the `Jobs` section to control how many parallel jobs to run, as in the following example\.

```
; ---- The number of worker jobs, 0 means use the number of logical cores
[Jobs]
minJobs=1
maxJobs=0
```

Setting `maxJobs` to zero specifies using as many cores as are available\. A number other than zero limits the cores used to no more than the number that you specify\.

## MetaDataTypes Section<a name="asset-pipeline-configuring-metadatatypes-section"></a>

Use the `MetaDataTypes` section to tell the asset system that certain file types are associated with other files in the same folder\. These specifications control the compilation of side\-by\-side assets, as in the following example\.

```
[MetaDataTypes]
exportsettings=
animsettings=i_caf
Animations/SkeletonList.xml=i_caf
cbc=abc
fbx.assetinfo=fbx
```

Entries on the left and right sides of the equals sign specify file extensions of asset files in the same folder\. If a file with the extension on the left changes, then the file with the extension on the right must also be rebuilt if it has the same filename\. For example, the line `animsettings=i_caf` means that if a file called `example.animsettings` changes, `example.i_caf` will be recompiled\.

The line `exportsettings=` means that when any file with the extension `.exportsettings` changes, any asset file that has the same filename as the file with the `.exportsettings` extension is invalidated\. For example, a change in the `MyImage.TIF.exportsettings` file invalidates the `MyImage.TIF` file\.

In the example `Animations/SkeletonList.xml=i_caf`, the left side specifies not an extension, but a specific file\. Whenever the `Animations/SkeletonList.xml` file changes \(note that the forward slash indicates a directory path\), all files with the extension `.i_caf` are invalidated\.

**Note**  
If you use the Asset Builder SDK, you can declare your dependencies on other files explicitly\. This makes the `[MetaDataTypes]` section less important\.

## ScanFolder Section<a name="asset-pipeline-configuring-scanfolder-section"></a>

Use the `ScanFolder` section to direct the Asset Processor to monitor the assets in specific folders\. The following example directs the Asset Processor to monitor the `Editor` folder\.

```
[ScanFolder Editor]
watch=@ROOT@/Editor
output=editor
recursive=1
order=30000
```

You can add as many scan folders as you want, but each folder must have a unique name\. Because the scan folders are stored in a hash table using the name specified in square brackets, make sure that the name following `ScanFolder` is unique\.

You can use the aliases `@root@` and `@gamename@` as placeholders to enable portability to the computers of other users who are working on the same project\.

To make the scan folder OS\-specific, use the keywords `include` and `exclude`\. Both keywords can contain platform tags and/or platform identifiers\. If you do not specify a keyword, all enabled operating systems are included by default\.

The `ScanFolder` section has the following parameters\.


****  

| Entry | Description | 
| --- | --- | 
| watch=<foldername> | Watch this specific folder for assets\. | 
| output=<foldername> | Put the contents of this watch folder into the subfolder of the @assets@ folder called <foldername>\. | 
| recursive=1 | Recurse into subfolders\. | 
| order=30000 |  Declares a priority order\. The lower the number, the more "important" a folder is\. The game folder for your project is always considered 0, the most important\.  The `order` parameter affects only assets with the same name\. For example, suppose you have an asset called `MyTexture.TIF` in two separate scan folders\. If both asset files map to the same output file, then the asset file with the lower order number overrides the one with the higher\.   | 
| include=<comma\-separated platform tags or identifiers> | Contains the list of platforms or platform tags to include for the scan folder\. Only enabled platforms are included\. If you include a disabled platform, it will not be considered for the scan folder\. | 
| exclude==<comma separated platform tags or identifiers> | Contains the list of platforms or platform tags to exclude for the scan folder\. | 

**Notes**
+ In most cases, you do not need to specify an output folder\. The output folder remaps source folders into subfolders of the cache\. Usually folders that contain assets go into the cache directly, without requiring a subfolder\.
+ It is not considered an error if a scan folder is missing\. This behavior is by design because it lets you have optional folders for assets\. For example, this might be useful for test cases\.
+ Removing folders from the `ScanFolder` sections removes any corresponding assets from the cache\. If the assets specified were overriding other assets, the overridden assets are reinstated and become primary assets again\.

## Exclude Section<a name="asset-pipeline-configuring-exclude-section"></a>

Use the `Exclude` section to add file path patterns to ignore\. As in the rest of the `.ini` file, backslashes must be prefixed with an extra backslash to escape them from `.ini` file processing\.

The following example excludes [alembic](https://en.wikipedia.org/wiki/Alembic_(computer_graphics)) compression templates and temporary animation compression files\.

```
[Exclude AlembicCompressionTemplates]
pattern=.*Presets\\/GeomCache\\/.*

[Exclude TmpAnimationCompression]
pattern=.*Editor\\/Tmp\\/AnimationCompression\\/.*
```

**Notes**
+ The regular expressions are standard `STD::regex` in extended format\. Standard `STD::regex` rules apply\.
+ The input paths are always absolute paths\. If you don't want to filter by absolute path, start your regular expressions with `.*`, as in the example\.
+ If you want to add new exclude rules, give them a unique name\. The actual name does not matter as long as each is unique\.

## RC Section<a name="asset-pipeline-configuring-rc-section"></a>

Use the `RC` section to specify files to be processed by the `rc.exe` program or to be copied as\-is into the asset cache without processing\. The `RC` section is only for use by legacy RC modules and for specifying simple file copies to cache\. 

The `RC` section consists of a series of *recognizer descriptors*\. Each descriptor specifies a set of files \(by glob or by pattern\) and what to do with the specified files\. Changing the fields of the recognizer invalidates assets according to the change made\.

**Important**  
Because they do not use the legacy `rc.exe` program, builders implemented as builder modules do not use the `RC` section\. Instead, they derive their configuration programmatically or read it from a custom config file\. If you create your own `BuilderSDK` builder, do not add anything to the `RC` section\.

The following code block shows the syntax of the `RC` section\.

```
[RC (recognizer name)]
; ---- Choose either pattern or glob. You cannot choose both.
pattern=(pattern to use to recognize these files)
glob=(glob to use to recognize these files)
params=(command line params/copy/skip)
(platformname)=(params)
lockSource=(true/false)
priority=(0...n) ; Higher numbers are more important.
critical=(true, false)
version=(0...n)
```

The following table describes each parameter and its options\.


****  

| `Parameter` | Description | 
| --- | --- | 
| pattern | A regular expression that specifies the files to process\. When you use regular expressions, remember to escape any backslashes\. | 
| glob | A wildcard expression like \*\.tif that specifies binary glob files to process\. | 
| params | The `params` parameter can take one of the following three options\. [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/asset-pipeline-configuring.html) If you omit the params, platform params, or tag params sections, the `rc.exe` program processes the file using default options\. To process the file on specific operating systems, set the `params` parameter to `skip` and then specify the desired platforms\. If you pass parameters to the `rc.exe` program, you can pass `p` \(as in `/p=pc`\) to force the program to process the asset as if it were the PC\. You can pass the appropriate parameter for the desired platform\.  | 
| \(platformname\)=\(params\) | Specifies OS\-specific parameters\. You can use the params parameter to specify default parameters, and then override them for specific operating systems when required by using platformname=params\. For example, the statement pc=/TEST overrides the default parameters for PC and passes the parameter /TEST to the rc\.exe program\.Can be `true` or `false`\. When `true`, causes the job to wait until it can gain an exclusive read/write lock on the source file\. | 
| \(tagname\)=\(params\) | Specifies tag\-specific parameters, which are generally better than platform\-specific parameters\. For example, the following statement causes all platforms to use the default parameters when processing `.tiff` files\. However, a platform with the `server` tag is skipped\.<pre>[RC tif]<br />pattern=.*\\.tiff? <br />server=skip</pre> | 
| lockSource | The following statement passes `/p=pc` to invocations of the `rc.exe` program: `server=/p=pc`\. This allows the program to process assets \(such as textures\) as if it were the PC, even on the server\. The default behavior is to pass /p=server, which the rc\.exe program may not understand\.  The `lockSource` parameter is useful for dealing with applications that hold onto a file and then slowly stream data into it\. For example, if a program creates very large files over a long period of time, you can set `lockSource=true` to avoid processing an asset until the other application releases it\. Use of this parameter is relatively rare and is generally expensive, so you should avoid using it unless absolutely required\. | 
| priority | Specifies job priority\. A larger number gives a job greater priority in the queue\. Normally, you should assign a larger number to assets that are likely to be needed from the start or that affect gameplay\. This ensures that they get compiled sooner\.  `params` `copy` jobs have an default priority of 1\.  | 
| critical | Can be `true` or `false`\. Critical jobs cause the editor splash screen to continue displaying and pause the startup of the runtime until every critical job has been completed\. Marking jobs as critical ensures they are complete before the editor is allowed to start\. You can specify entire types of assets as critical\. This can be useful for files that are used during startup, cause bad behavior if they are not ready during bootstrap, or cannot be reloaded live\.  Because critical jobs can delay the startup of the editor for the first time, not having critical jobs is always the preferred choice\. Alternative approaches include:   Making the editor or runtime capable of reloading the asset live after it is compiled\.   Making a call to compile the asset on demand using the asset system bus\. You can use the public function `CompileAssetSync` to do this\. See the Lumberyard source code for examples\.     `params` `copy` jobs are critical by default\.  | 
| version | An arbitrary versioning number\. The default is 0\. Changing the version number invalidates the assets specified and causes them to be rebuilt\. The `version` parameter provides a convenient way to cause a rebuild of all assets of a particular kind\. For example, you might make changes to the compiler that builds a particular kind of asset\. Then, when you check in your changes to the `.ini` file, local assets of workers receiving the update are rebuilt for them automatically\. | 

The following example specifies how `.tiff` files are to be processed\.

```
[RC tif]
pattern=.*\\.tiff?
params=/imagecompressor=CTSquish /streaming=1
es3=/imagecompressor=CTSquish /streaming=0
ios=/imagecompressor=CTSquish /streaming=0
; Streaming = 1 splits files.
lockSource=true
```

The example has the following characteristics\.
+ It declares a `recognizer` called `tif` \(because `[RC tif]` is the name\)\.
+ The `pattern` specifies all files which match the regex expression `.*\.tiff?`\. Note that the example escapes the backslash\.
+ The `params` parameter specifies the default parameters with which to invoke `rc.exe`\. In the example, `.tiff` files will be compiled into the `/imagecompressor=CTSquish /streaming=1` format\.
+ For ES3 and iOS, streaming is turned off, overriding the default that was specified in the `params` parameter\.
+ `lockSource` is set to `true` to avoid conflict with external tools that create a zero byte file, pause for many seconds, and then fill it with data\.

The following example specifies how `.tiff` files in the `GoldenImages` subfolder are to be processed\.

```
; Feature tests use the raw .tif files for the golden image comparison.
[RC goldenimages]
pattern=.*GoldenImages\\/.*\\.tif
params=copy
```

The example has the following characteristics\.
+ It declares a `recognizer` called `goldenimages` which apples to any `.tiff` file in the `GoldenImages` subfolder\.
+ The `params` parameter specifies `copy`, so any `.tiff` file in the `GoldenImages` subfolder is copied to the cache without processing\.

**Notes**

The two example RC sections are both in the same file\. This has the following important consequences:
+ The multiple rules that match the files all apply simultaneously\. They are not exclusive\. If you have two rules that apply to the same file, both rules are run\. For example, the rules in the two examples would both apply to a file called `\dev\SamplesProject\textures\GoldenImages\myfile.tif`\. The rules would produce both a `.dds` compressed version of `myfile.tif` and an uncompressed `myfile.tif` file that is copied into the cache\.
+ If you want to specify an exclusive subfolder rule, you must use inverse regex selectors to create exclusion patterns\.

  The following example shows a set of rules that apply exclusively to `.png` files\. The two rules are written so that any `.png` file matches only one of the rules\.

  ```
  ;Example: Use the specified parameters to process all .png files except those in the libs/ui folder.
  [RC png-normal]
  pattern=(?!.*libs\\/ui\\/).*\\.png
  params=/imagecompressor=CTSquish /streaming=0
  lockSource=true
  ```

  ```
  ;Example: Process all .png files in the libs/ui folder using linear color space.
  [RC png-ui]
  pattern=(.*libs\\/ui\\/).*\\.png
  params=/imagecompressor=CTSquish /streaming=0 /colorspace=linear,linear
  lockSource=true
  ```

  For more examples, see the default `\dev\AssetProcessorPlatformConfig.ini` file\.

## Common Problems<a name="asset-pipeline-configuring-common-problems"></a>

When troubleshooting, be aware of the following pitfalls\.
+ Not escaping your regular expressions with two backslashes\. Remember that one of the slashes is removed when the `.ini` file is processed\.
+ Duplicating a rule without changing its name\. The rule `[RC png]` has a name of `png`\. These names are inserted into an unordered hash\. If you specify another section with the name of `png`, the second section overwrites the other in random order\. This behavior is by design\. For example, you can use it to allow your game version of the `.ini` file to override particular sections or specify `skip` to skip them\. Otherwise, if you want to add new rules, give them a unique name\. The actual name does not matter as long as each is unique\. This is especially true for named sections like the `Exclude` and `ScanFolder` sections\.
+ Not understanding that `all` recognizers that match apply, not just the first one\.
+ Forgetting to prefix your regular expressions with `.*`\. By default, the input files that you specify are considered absolute paths\. This behavior is by design because it lets you exclude or include files based on absolute paths, if that is your intent\. Use the `.*` prefix if you want to use relative paths\.