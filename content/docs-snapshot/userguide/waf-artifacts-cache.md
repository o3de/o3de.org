# Using the Waf Artifacts Cache<a name="waf-artifacts-cache"></a>

The Waf artifacts cache is for Waf\-generated files\. The cache speeds up Waf build time by caching previously built artifacts and retrieving them when the task signature hasn't changed\. To calculate the task signature, Lumberyard uses MD5 hashes of the task's run function, source file, dependencies, and build environment\.

## Improvements in Build Time<a name="waf-artifacts-cache-improvements-in-build-time"></a>

The Waf artifacts cache can significantly improve clean, non\-incremental build time\. The following table shows, in minutes, typical differences in build times for packaging jobs\.


****  

| Operating System or Device | Clean Build Time Without Cache | Clean Build Time with Cache | 
| --- | --- | --- | 
| PC | 75 | 14 | 
| macOS | 163 | 25 | 

## Supported File Types<a name="waf-artifacts-cache-supported-file-types"></a>

Unlike the normal compiler cache, which caches only `.obj` files, the Waf artifacts cache caches all files that Waf generates\. It supports the following file extensions: `.h`, `.cpp`, `.json`, `.o`, `.obj`, `.inl`, `.inline`, `.rc`, `.res`, `.moc`, `.lib`, `.dll`, `.exp`, `.pdb`, `.manifest`, and `.exe`\.

## Limitations and Notes<a name="waf-artifacts-cache-notes-and-limitations"></a>

Keep in mind the following limitations and considerations about the Waf artifacts cache\.
+ The Waf artifacts cache can be used among multiple machines that have different build paths\. However, to correctly retrieve files from the cache, all builds must use the same version compiler and linker\.
+ The Waf artifacts cache doesn't support the `/Zi` compiler flag\. Use the `/Z7` compiler flag instead\.

  The Waf artifacts cache is implemented at the Waf level, not at the compiler/linker level\. When you use the `/Zi` flag, the compiler generates a separate `.pdb` file for the `.obj` file\. However, because Waf does not know the `.pdb` file name in advance, it cannot upload or retrieve the `.pdb` files\. When you use the `/Z7` flag instead, the symbolic debugging information is stored in the `.obj` file itself\.
+ The compiler assumes the same compilation environment when you use a `.pch` file\. Therefore, caching precompiled headers across different workspace paths is not supported\. For more information, see [Precompiled Header Consistency Rules](https://docs.microsoft.com/en-us/cpp/build/creating-precompiled-header-files?view=vs-2017#precompiled-header-consistency-rules) in the Microsoft Visual Studio documentation\.
+ When caching for different workspace paths is enabled, builds with and without Waf artifacts caching have different task signatures\. Thus, if you run a build with Waf cache and then run another build without Waf cache, all files are recompiled\.

### Waf Options<a name="waf-artifacts-cache-waf-options"></a>

The Waf artifacts cache feature has the following Waf options:

**\-\-artifacts\-cache** – Specifies a string that represents the artifacts cache path\. The cache path can be any directory path on local disk or on a net share\. The default value is the empty string \(""\)\. If the option is not set or empty, the artifacts cache is not used\.

**\-\-artifacts\-cache\-restore** – If true, the task's target output files are copied from the artifacts cache before the task is run\. The default value is false\.

**\-\-artifacts\-cache–upload** – If true, the task's target output files are uploaded to the artifacts cache after the task is finished\. The default value is false\.

**Example**  
The following command specifies the artifacts cache path as `E:\waf_artifacts_cache` and restores artifacts from cache on cache hit\. On cache miss, the command uploads the task's target output files to the artifacts cache after the task is finished\.

```
lmbr_Waf build_win_x64_vs2017_fullprofile -p all --artifacts-cache="E:\waf_artifacts_cache" --artifacts-cache-restore=True --artifacts-cache-upload=True
```

To build using Visual Studio, update the `dev/_WAF_/user_settings.options` file to enable the artifacts cache as in the following example:

```
artifacts_cache = E:/artifacts_cache
artifacts_cache_restore = True
artifacts_cache_upload = True
```

#### Deleting State Artifacts<a name="waf-artifacts-cache-deleting-stale-artifacts"></a>

Use the `clean_stale_cached_artifacts` Waf command to delete stale artifacts from the cache\. The command has the following options:

**\-\-artifacts\-cache\-days\-to\-keep** – Number of days to keep the artifacts before they are considered stale\.

**\-\-artifacts\-cache\-wipeout** – If true, deletes all artifacts from the cache\.

**Examples**  
The following example specifies that artifacts in the cache location `E:\waf_artifacts_cache` be kept for four days\.

```
lmbr_waf clean_stale_cached_artifacts --artifacts-cache="E:\waf_artifacts_cache" --artifacts-cache-days-to-keep=4
```

The following example deletes all artifacts from the cache location `E:\waf_artifacts_cache`\.

```
lmbr_waf clean_stale_cached_artifacts --artifacts-cache="E:\waf_artifacts_cache" --artifacts-cache-wipeout=True
```

## How the Waf Artifacts Cache Works<a name="waf-artifacts-cache-how-the-waf-artifacts-cache-works"></a>

The Waf cache feature helps ensure that the proper task `uid` and `env` signatures are used\.

### Waf Pickle File<a name="waf-artifacts-cache-waf-pickle-file"></a>

The Waf pickle file stores information about Waf targets\.

For a clean build, the Waf cache feature uses a signature calculated before `run()` is called to decide the task's runnable status\. However, because of changes in node dependencies, outputs or build environment, the task's signature can change between the calls to `run()` and `post_run()`\. Merging the cached Waf pickle file with the local Waf pickle file helps to ensure that Waf can get the right dependencies for a task\. It also helps to ensure that Waf can get the signature that matches the task signature from cache\.

The Waf pickle file has the following attributes\.


****  

| Attribute | Description | Type | 
| --- | --- | --- | 
| root | The node that represents the root of the file system\. | Node\. | 
| node\_deps | Implicit dependencies\. | Dictionary mapping of a task\-computed uid to nodes\. | 
| raw\_deps | Implicit file dependencies that could not be resolved\. | Dictionary mapping of a task\-computed uid to any serializable type\. | 
| task\_sigs | Signature of the tasks that are run\. | Dictionary mapping of a task\-computed uid to a hash that represents the task's signature\. | 
| azcg | Data for AzCodeGen tasks\. | Dictionary mapping of a task\-computed uid to a list of AzCodeGen saved data\. | 
| cached\_engine\_path | Engine path for the build that created the cached pickle file\. | String | 
| cached\_tp\_root\_path | Third\-party path for the build that created the cached pickle file\. | String | 

#### Loading Data from a Waf Pickle File<a name="waf-artifacts-cache-loading-pickle-file-data"></a>

To use the Waf artifacts cache, Waf must have the latest build pickle data from a cached pickle file\. It then must merge that data with the local build pickle data\. If an entry with the task `uid` key appears in both local data and cached data, then the local one is used\. If the data merged from both pickle files contains node instances from the cached build which are unusable in current build, those node instances are recreated for the current build\.

The following diagram shows this workflow\.

![\[Waf pickle file data loading sequence\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/waf/waf-artifacts-cache-1.png)

### Overriding the Task's `uid` and `env` Signatures<a name="waf-artifacts-cache-overriding-task-uid-and-env-signatures"></a>

When using the Waf artifacts cache feature across multiple machines with different paths, the task's `uid` and `env` signature shouldn't depend on an absolute path\. When the Waf artifacts cache is enabled, the calculation of task's `uid` and `env` signatures is overridden and the absolute path is converted to a relative path\.

### Executing Tasks<a name="waf-artifacts-cache-executing-tasks"></a>

When the Waf artifacts cache is enabled, it tries to retrieve the target files from the cache before it runs a task\. If a cache miss or an error occurs during the file transfer, it runs the task and uploads the generated target files to the Waf artifacts cache after `post_run()` is called\.

When the target files are successfully copied from the Waf artifacts cache, Waf skips the `run` function and calls `post_run()`\. Because Lumberyard customizes the `run` and `post_run` functions for each task type, it can update a task's dependencies, outputs, or build environment\. This changes the task's signature\. When the `run` function is skipped, Lumberyard updates the task's dependencies, outputs, or build environment in the `post_run` function to keep the signature consistent\.

For example, during the `run` function, the `AzCodeGen` task updates the task's `INCPATHS` and creates new linking tasks\. If the `AzCodeGen` task's target output files are retrieved from cache successfully, the run function is skipped\. Then Lumberyard uses the `post_run` function to update the task's `INCPATHS` and create new linking tasks\.

The following diagram shows this workflow\.

![\[Waf artifacts cache task execution workflow\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/waf/waf-artifacts-cache-2.png)