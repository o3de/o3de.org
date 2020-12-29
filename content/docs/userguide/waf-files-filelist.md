# Waf File Lists \(\*\.waf\_files\)<a name="waf-files-filelist"></a>

In standard Waf, the source files to include for a build is specified directly as a list of files using the keyword `Source`\. However, the list of source files does not provide support for the following features in Lumberyard:
+ **Uber Files**

  Uber files provide a way to group files into a single compilable unit\. This grouping offers the benefits of improving build speed and creating smaller binaries\. However, it is not always possible to combine all files together successfully without changing the source code\. The `.waf_files` file list provides a way to manually group files and avoid potential collisions\.
+ **Visual Studio Filters**

  The `.waf_files` mechanism also provides a way to declare the source files that are included in a Microsoft Visual Studio filter\. Visual Studio's solution explorer does not always accurately represent the files and their directory hierarchy on disk, so it uses filters\. Cases exist in Lumberyard where multiple projects share a subset of source code outside of individual project directories\. The ability to manually specify filters lets Lumberyard maintain this file sharing\.

The paths to the source files specified in a `.waf_files` file are relative to the location of the `.waf_files` file itself\. It is also possible to use [aliases](waf-third-party-library-configurations.md#waf-third-party-library-configurations-using-aliases) to third\-party directories for situations in which a third\-party library consists of source code\.

## File Structure<a name="waf-files-filelist-structure"></a>

A `.waf_files` file is organized into three levels:
+ **Level 1 – Uber file grouping**

  When uber files are enabled for the build, Waf uses this dictionary of uber file name keys to generate the uber files\. The uber files combine the files specified in the group\. Because uber files are relevant only for C\+\+ source, the names of the uber files must have a C\+\+ source file extension \(for example, `.cpp` or `.cc`\) and must be unique within the list\.

  Level 1 key names can also include the following special key words:
  + **none** – Files under the `none` grouping are not combined into any uber file, even if uber mode is enabled\.
  + **auto** – Files are combined automatically into uber files based on a set uber file size limit\.
+ **Level 2 – Visual Studio filter specification**

  The key names for this dictionary represent the directory filters in the generated Visual Studio projects from Waf\. The name supports a path\-like definition that uses '/' delimiters that you can use to specify directory structures for the filter\. If the source files are intended to reside in the root level of the project in Visual Studio, the reserved key name `Root` is used\.
+ **Level 3 – List of source files**

  The list of source files relative to the location of the `.waf_files` file to be listed under the Visual Studio filter key name\. Waf file lists also support file globbing\. For more information, see the File Globbing section in this topic\.

## Using Uber Mode<a name="waf-files-filelist-uber-mode"></a>

Uber mode is specified in the `user_settings.options` file under the `use_uber_files` attribute, as shown in the following example:

```
use_uber_files = False
```

When uber mode is enabled, Waf uses the Level 1 grouping information to create uber files to combine for compiling\.

In deciding how to use uber mode, consider the following suggestions:
+ If you do not want to create an uber file and want to compile the files individually, specify `none` for the group of files\.
+ If you want Waf to automatically place files into uber files, specify `auto`\.
+ If you want to specify an uber source file to group the source files, specify the name of that uber source file\.

The following example shows this structure\.

```
{
    "none": {
        "Source Files": [
           ...
        ],
     ..
     },
     "auto": {
        "Source Files": [
           ...
        ],
     ..
     },
     "my_uber_file.cpp": [
        "Source Files": [
           ...
        ],
     ..
     }
}
```

### Limiting the Uber File Byte Size<a name="waf-files-filelist-auto-file-byte-size-limit"></a>

When you specify `auto`, Waf limits the size of the uber file to the byte limit specified in the `user_settings.options` file `uber_file_size` attribute, as in the following example:

```
uber_file_size = 307200
```

## File Globbing<a name="waf-files-filelist-file-globbing"></a>

The source file definitions support limited [ant pattern\-based file matching](https://ant.apache.org/manual/dirtasks.html), or "globbing"\. This allows you to group related files together based on file extension instead of listing files individually\. To enable globbing, use a globbing pattern instead of a file path in the source file\. The following shows examples of file globbing\.

```
{
    "none": {
        "Root": [
            "*.cpp"
        ],
        "Single": [
            "Single/*.cpp"
        ],
        "Nested": [
            "Nested/**/*.cpp"
        ]
    }
    ...
}
```

The example showcases the following globbing patterns:


****  

| Globbing Pattern | Description | 
| --- | --- | 
| \*\.cpp | Add all files with the \.cpp extension in the current directory only\. | 
| Single/\*\.cpp | Add all files with the \.cpp extension in the Source directory only\. | 
| Nested/\*\*/\*\.cpp | Recursively add all files with the \.cpp extension in the Source directory\. | 

### Custom Globbing Rules<a name="waf-files-filelist-file-globbing-custom-rules"></a>

You can create some custom globbing rules by specifying a dictionary for the glob search\. For example, the following dictionary includes all files in the directory except for files with a `.res` extension:

```
{
    "none": {
        "Root": [
            {
                "pattern" : "**/*.*",
                "excl" : "*.res"
            }
        ]
    }
}
```

Dictionary specifications support the following keys:
+ **pattern** – \(Required\) The globbing pattern to apply to the search\.
+ **excl** – An exclusion pattern to filter out of the results\.
+ **maxdepth** – For a recursive search, limit the depth of the search\.
+ **ignorecase** – Ignore case when using the globbing pattern\.

### Globbing at Configure Time and Build Time<a name="waf-files-filelist-file-globbing-at-configure-time-and-build-time"></a>

Because globbing is an expensive operation, it is not recommended on large sets of files\. Globbing can be done either at configure time, or at both configure and build time\. Doing globbing only at configure time improves the build performance\. It reuses the glob result that was created at the time of the last configure\. The disadvantage is that it does not pick up any files that are added or removed until another configure is done\. Doing globbing at both configure and build time picks up file additions and removals for every build, but can be expensive\.

#### Enabling Build Time Globbing<a name="waf-files-filelist-file-globbing-enabling-build-time-globbing"></a>

To enable or disable build time globbing, set the `enable_dynamic_file_globbing` attribute in the `user_settings.options` file to `True` or `False`, as shown in the following example:

```
enable_dynamic_file_globbing = False
```