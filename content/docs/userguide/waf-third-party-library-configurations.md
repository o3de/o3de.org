# Creating Third\-Party Library Configuration Files for Waf<a name="waf-third-party-library-configurations"></a>

Lumberyard's Waf build system has the ability to incorporate third\-party libraries\. Waf's `uselib` mechanism can apply the proper dependency injection of a third\-party library into any project or module\. In the `wscript` file, the `uselib` attribute specifies all\-caps identifiers that represent the third\-party libraries\. The identifiers are defined in the `.json` configuration files that can exist either in the global `_WAF_\3rdParty` directory or in the gem\-specific `3rdParty` directory\. These configuration files provide details for the library, including include paths, library paths, and linkage information\. The files also specify whether the library is shared, dynamic, or header\-only\.

**Topics**
+ [Key Features](#waf-third-party-library-configurations-key-features)
+ [Supported Library Types](#waf-third-party-library-configurations-supported-library-types)
+ [Using Aliases](#waf-third-party-library-configurations-using-aliases)
+ [Creating Entries for Multiple Related Libraries](#waf-third-party-library-configurations-creating-entries-for-multiple-related-libraries)
+ [Third\-Party Library Configuration File Attributes](#waf-third-party-library-configurations-third-party-library-configuration-file-attributes)
+ [Special Reserved Words](#waf-third-party-library-configurations-special-reserved-words)

## Key Features<a name="waf-third-party-library-configurations-key-features"></a>

Key features of the `uselib` mechanism include centralized management and an abstraction layer that makes it easy to use the same libraries across Lumberyard projects and modules\.

### Centralized Management<a name="waf-third-party-library-configurations-centralized-management"></a>

Encapsulating the build details within a single file helps centralize the management of third\-party libraries\. Centralized management in a single file is also beneficial when changes like different include paths or libraries to the third\-party library occur\. These configuration files can be global to the entire engine, or gem\-specific based on the gems that are enabled for the game\.

### Abstraction<a name="waf-third-party-library-configurations-abstraction"></a>

The third\-party identifiers provide an abstraction layer between the third\-party library details and the consuming project or module\. This layer makes it unnecessary to explicitly inject the paths for the library and include headers for each project or module that uses the library\. Instead, the `uselib` mechanism with the third\-party identifier provides the necessary injection of paths, libraries, and custom rules\.

For example, assume you have two third\-party libraries, `StaticLibA` and `DynamicLibB`, that you want to link into test project `ProjectOne`\. Without the `uselib` system, the `wscript` file for `ProjectOne` would look like the following:

**Example**  
**`ProjectOne\wscript`**  

```
def build(bld):
    bld.LumberyardSharedLibrary(
        target = 'ProjectOne',
        ...
        includes = ['3rdParty/StaticLibA/includes',
                    '3rdParty/DynamicLibB/includes'],
        win_stlibpath = ['3rdParty/StaticLibA/win32/lib'],
        darwin_stlibpath = ['3rdParty/StaticLibA/osx/lib'],
        ...
        win_libpath = ['3rdParty/DynamicLibB/win32/bin'],
        darwin_libpath = ['3rdParty/DynamicLibB/osx/bin'],
        ...
        lib = ['staticliba', 'dynamiclibb'],
        ...
        win_copy_dependent_files = ['3rdParty/DynamicLibB/win32/bin/dynamiclibb.dll'],
        darwin_copy_dependent_files = ['3rdParty/DynamicLibB/win32/bin/libdynamiclibb.dylib'],
        ...
    )
```

Instead, you could use the following third\-party configuration files for the two libraries, as in the following examples:

**Example**  
**`StaticLibA.json`**  

```
{
    "name": "STATIC_LIB_A",
    "source": "3rdParty",
    "description": "My Static Library A",
    "includes": "includes",
    "platform": {
        "win_x64_vs2017": {
            "libpath": [
                "win32/lib"
            ],
            "lib": ["staticliba.lib"],
        },
        "darwin_x64": {
            "libpath": [
                "osx/lib"
            ],
            "lib": ["libstaticlibb.a"],
        }
    }
}
```

**Example**  
**`DynamicLibB.json`**  

```
{
    "name": "DYNAMIC_LIB_B",
    "source": "3rdParty",
    "description": "My Dynamic Library B",
    "includes": "includes",
    "platform": {
        "win_x64_vs2017": {
            "importlibpath": [
                "win32/lib"
            ],
            "import": [
                "dynamiclibb.lib"
            ],
            "shared": [
                "dynamiclibb.dll"
            ]
        },
        "darwin_x64": {
            "importlibpath": [
                "osx/lib"
            ],
            "import": [
                "libdynamiclibb.a"
            ],
            "shared": [
                "libdynamiclibb.dylib"
            ]
        }
    }
}
```

This now simplifies the `wscript` declaration for `ProjectOne` to the following:

**Example**  
**`ProjectOne\wscript`**  

```
def build(bld):
    bld.LumberyardSharedLibrary(
        target = 'ProjectOne',
        ...
        uselib = ['STATIC_LIB_A', 'DYNAMIC_LIB_B'],
        ...
    )
```

After you have created these third\-party configuration files, you can apply the same simplification to any project or module in Lumberyard\.

## Supported Library Types<a name="waf-third-party-library-configurations-supported-library-types"></a>

Third\-party configuration files support the following library types:
+ [Header Only](#waf-third-party-library-configurations-header-only-libraries)
+ [Static](#waf-third-party-library-configurations-static-libraries)
+ [Shared/Dynamic](#waf-third-party-library-configurations-shared-libraries)

**Note**  
For simplicity, the rest of this topic refers to shared/dynamic libraries as 'shared'\.

### Header\-only Libraries<a name="waf-third-party-library-configurations-header-only-libraries"></a>

Header\-only libraries provide only the include paths to the dependent project or module\. The following example third\-party library configuration file contains a definition for a header\-only library:

**Example**  
**`rapidxml.json`**  

```
{
    "name": "rapidxml",
    "source": "@3P:rapidxml@",
    "description": "Rapid XML header only library",
    "header_only": "True",
    "includes": [
        "include"
    ],
    "defines": [],
    "lib_required": "False"
}
```

This simple declaration specifies only the `includes` header path which is a subdirectory of the `source` directory\. The `source` directory is defined by the alias pattern `@3P:`*XXX*`@`\. For descriptions of the other attributes in this file, see [Third\-Party Library Configuration File Attributes](#waf-third-party-library-configurations-third-party-library-configuration-file-attributes)\.

### Static Libraries<a name="waf-third-party-library-configurations-static-libraries"></a>

Static third\-party library configuration files declare header include paths, library include paths, and library names for inclusion in a dependent project or module\. The following example third\-party library configuration file contains a declaration for a simple static library\.

**Example**  
**`lz4.json`**  

```
{
    "name": "lz4",
    "source": "@3P:lz4@",
    "description": "LZ4 Compression Library",
    "includes": [
        "lib"
    ],
    "defines": [],
    "lib_required": "True",
    "shared_required": "False",
    "platform": {
        "win_x64_vs2017": {
            "libpath_debug": [
                "build/win_x64/vc140/debug"
            ],
            "libpath_release": [
                "build/win_x64/vc140/release"
            ],
            "lib": [
                "lz4.lib"
            ]
        },
        "win_x64_vs2019": "@win_x64_vs2017", 
        ...
```

#### Platform\-Specific Information<a name="waf-third-party-library-configurations-platform-specific-information"></a>

In addition to the attributes described for header\-only library definition, the preceding example includes platform\-specific values\. The `platform` attribute contains a dictionary of target platform sections\. Each target platform must be specified here\. If a particular target platform is not listed, this third\-party library definition will not apply for that platform when built\. Static libraries must specify the library path \(`libpath`\) and the names of the library file \(`lib`\) against which to link for each platform\. The configuration extension for `libpath` attribute in the preceding example will be described later in this topic\.

### Shared Libraries<a name="waf-third-party-library-configurations-shared-libraries"></a>

Shared libraries are more complex than static libraries\. Shared libraries must declare an include path, import library path, shared library path, shared library file names, and optionally, program database \(`.pdb`\) files\. The following example third\-party library configuration file contains a definition for a shared library\.

**Example**  
**`boostpython.json`**  

```
{
   "name": "boostpython",
   "source": "@3P:boost@",
   "description": "Boost header library including python support libraries",
   "defines": [],
   "lib_required": "False",
   "platform": {
      "win_x64_vs2017": {
         "includes": [
            "."
         ],
         "importlibpath": [
            "lib/windows/x64"
         ],
         "sharedlibpath": [
            "lib/windows/x64"
         ],
         "import_debug": [
            "boost_python-vc140-mt-gd-1_61.lib"
         ],
         "import_release": [
            "boost_python-vc140-mt-1_61.lib"
         ],
         "shared_debug": [
            "boost_python-vc140-mt-gd-1_61.dll"
         ],
         "shared_release": [
            "boost_python-vc140-mt-1_61.dll"
         ],
         "pdb_debug": [
            "boost_python-vc140-mt-gd-1_61.pdb"
         ]
      },
      ....
```

The following table describes the attributes for shared library configuration files\.


****  

| Attribute | Description | 
| --- | --- | 
| importlibpath | Path to the import library that declares the exported symbols against which the dependent project or module links\. | 
| sharedlibpath | Path to the binaries of the shared library \(the \.dll file\)\. | 
| import | File names of the import libraries against which the dependent project or modules will link to get the exported symbols\. | 
| shared | File names of the binaries of the shared libraries\. | 
| pdb | File names of any pdbs that can be optionally copied over with the \.dll file\. | 

Besides providing the paths for header inclusion and linking, Lumberyard Waf also copies the shared library and PDB files to the path where the dependent project or module is built\.

### Mixed Shared and Static Libraries<a name="waf-third-party-library-configurations-mixed-shared-and-static-libraries"></a>

In some cases, the third\-party library is static on some platforms but shared on others\. For cases like these, it is possible to declare mixed static and shared libraries for each platform\.

## Using Aliases<a name="waf-third-party-library-configurations-using-aliases"></a>

The following sections describe how to simplify the configuration file by using aliases for libraries, platforms, and paths\.

### Aliasing Library Lists<a name="waf-third-party-library-configurations-aliasing-library-lists"></a>

The same list of libraries might be needed in different platform sections of the configuration file\. To avoid repetition, you can define and use a list alias that expands to a list of other values\. This is helpful for cases in which you have multiple shared libraries that import libraries of the exact same name\.

You define an alias in the `aliases` node under the root node in the configuration file\. Add the name of the alias to the `aliases` node and a list of strings that the alias represents under the alias name\.

In the following example, the `all_foo_lib_names` alias represents the libraries `foo_library_A` through `foo_library_D`\. The library names must not have any prefixes or extensions\. 

**Note**  
For some platforms, the file name to library name convention is different\. For example, Linux\-based libraries prefix the file name with `lib`, but Windows\-based libraries do not\.

In the `platform` section, the shared library definitions for `import`, `shared`, and `pdb` use the notation `${`*<ALIAS>*`}` to form the entries, where *<ALIAS>* is the name of the alias that was defined in the `aliases` section\.

```
...
"aliases": {
    "all_foo_lib_names": [
        "foo_library_A",
        "foo_library_B",
        "foo_library_C",
        "foo_library_D"
    ]
},
"platform": {
	"win_x64_vs2017": {
		...
		"import": {
			"${all_foo_lib_names}.lib"
		},
		"shared": {
			"${all_foo_lib_names}.dll"
        },
        "pdb": {
			"${all_foo_lib_names}.pdb"
		}
        ...
     },
...
```

### Aliasing Platform Declarations<a name="waf-third-party-library-configurations-aliasing-platform-declarations"></a>

Some different target platforms are binary compatible\. In these cases, you do not have to declare a copy of an existing configuration section\. Instead, you can use the platform attribute string alias `@<platform_name>` instead of another attribute dictionary\.

In the following example, the `win_x64_vs2017` and `win_x64_vs2019` platforms are binary compatible, so the alias `@win_x64_vs2017` is used\.

```
"platform": {
    "win_x64_vs2017": {
        "libpath_debug": [
            "build/win_x64/vc141/debug"
        ],
        "libpath_release": [
            "build/win_x64/vc141/release"
        ],
        "lib": [
            "foo.lib"
        ]
    },
    "win_x64_vs2019": "@win_x64_vs2017",
...
```

### Aliasing Paths<a name="waf-third-party-library-configurations-aliasing-paths"></a>

Path aliasing for the `source` attribute is common within the configuration file\. The alias value is denoted by `@XXXX@`, where the *XXXX* value resolves to an absolute path\. The third\-party configuration file recognizes two different path alias types:
+ `@3P:YYYY@` – This alias refers to a third\-party library that is managed by the Lumberyard Setup Assistant\. These third\-party libraries are globally available to the engine\. Lumberyard Setup Assistant manages the location and version of these libraries independently from the build system\. *YYYY* refers to the SDK identifier used by Lumberyard Setup Assistant and is different from the third\-party `uselib` identifier used by Waf\.
+ `@GEM@` – This alias is valid only for gem\-defined third\-party libraries and refers to the base path of the gem from which the third\-party library is defined\. For information about putting third\-party libraries in gems, see [Adding Third\-Party Libraries](waf-adding-third-party-libraries.md)\.

## Creating Entries for Multiple Related Libraries<a name="waf-third-party-library-configurations-creating-entries-for-multiple-related-libraries"></a>

Your project might have multiple libraries under a shared root source directory that are related but have separate purposes\. This section shows how your configuration files can handle these more complex cases so that you can still take advantage of the `uselib` mechanism\.

### Build Configuration Filtering<a name="waf-third-party-library-configurations-build-configuration-filtering"></a>

Attributes can be constrained by build configuration\. For example, a debug library and a release library might have the same name but exist in two different directories, as in the following example file structure:

```
/StaticLibA/
    /Include
        static_a.h
    /lib
        /debug
            static_a.lib
        /release
            static_a.lib
```

The following example shows the configuration file declaration for this file structure\. Notice that the `lib` attribute is specified once, but the `libpath` attribute is specified twice\.

```
"include": ["Include"],
"libpath_debug": ["lib/debug"],
"libpath_release": ["lib/release"],
"lib": ["static_a.lib"]
```

If the libraries are in the same directory, but named differently, the file structure might look like this:

```
/StaticLibA/
    /Include
        static_a.h
    /lib
        static_aD.lib
        static_a.lib
```

In this case, the value for `libpath` in the configuration file is the same, but there are two values for `lib`:

```
"include": ["Include"],
"libpath": ["lib"],
"lib_debug": ["static_aD.lib"],
"lib_release": ["static_a.lib"]
```

### Specifying Multiple Identifiers<a name="waf-third-party-library-configurations-specifying-multiple-identifiers"></a>

A third\-party library might contain a suite of libraries and be organized by specific categories according to need\. In these cases, the configuration file can define more than one identifier\. As long as the library files are under the same directory that is specified for the `source` attribute, the configuration can specify multiple third\-party identifiers\.

The following example configuration file defines two third\-party identifiers that `uselib` will point to: `water_lib` and `air_lib`\. The `lib` attribute is prefixed with the name of the third\-party identifier\. Both libraries are under the same `elements` library directory and exist individually as `water_lib.lib` and `air_lib.lib`\. Both `water_lib` and `air_lib` require the same base `element_base.lib` library\.

```
{
	"name": [
		"water_lib",
		"air_lib"
	],
	"source": "elements",
	...
	"platform": {
		"win_x64_vs2017": {
			"libpath":	[
				"lib"
			],
			"water_lib/lib": [
				"element_base.lib",
				"water_lib.lib"
			],
			"air_lib/lib": [
				"element_base.lib",
				"air_lib.lib"
			]
			...
		}
	...
}
```

## Third\-Party Library Configuration File Attributes<a name="waf-third-party-library-configurations-third-party-library-configuration-file-attributes"></a>

The following attributes are used in third\-party library definition files\.


****  

| **Attribute** | **Type** | **Description** | 
| --- | --- | --- | 
| name | string/\[string\] | Name of the third\-party identifier\. The value for the identifier set here is represented in Lumberyard in all caps\. If the definition file defines multiple third\-party identifiers, the name attribute contains a list of names\. | 
| source | string \(aliasable\) | Base directory upon which all library paths defined in the configuration file are based\. | 
| description | string | Description for the third\-party definition\. | 
| header\_only | Boolean | Flag that indicates that the file specifies a header\-only library definition\. | 
| includes | \[string\] | List of include paths to apply to any dependent project or module\. | 
| defines | \[string\] | List of additional defines to apply to any dependent project or module\. | 
| engine\_configs | Boolean |  When `false`, specifies that the library's `debug` configuration maps to the `engine debug` configuration and that `release` maps to `profile`, `performance` and `release`\. The default is `false`\. When `true`, accepts custom rules for each engine configuration\. For example, if you want to use specific libraries for profile builds, you can specify values for `libpath_profile` and `lib_profile`\. To copy specific binaries per configuration, you can also use attributes like `copy_extra_debug`, `copy_extra_profile`, and `copy_extra_performance`\.  | 
| lib\_required | Boolean | Flag that instructs the third\-party configuration file parser whether to verify the existence of the declared static library files on disk\. | 
| shared\_required | Boolean | Flag that instructs the third\-party configuration file parser whether to verify the existence of the declared shared library files on disk\. | 
| suppress\_warning | Boolean | Flag that disables warnings related to invalid third\-party configurations\. It is recommended that this flag be set to true for libraries that are optional\. | 
| platform | \{ platform\_def \} | Dictionary of platform\-specific settings \(platform\_def\) that is keyed by the target platform name\. | 
| linkflags | \[ string \] | List of linker flags to pass to the linker\. | 
| libpath | \[ string \] | List of static library search paths to add to the consumers of this library\. The paths are relative to the location specified by the source attribute\. | 
| lib | \[ string \] | List of full static library file names \(including file extensions\) to add to the consumers of this library\. The system validates the existence of the files by searching the locations defined in the libpath attribute\. | 
| sharedlibpath | \[ string \] | List of paths that contain the shared libraries for this uselib definition\. The paths are relative to the location specified by the source attribute\. | 
| shared | \[ string \] | List of the shared library file names for this uselib definition\. These shared libraries are copied to the output directory of the target of the consumer module\. | 
| importlibpath | \[ string \] | Applies to Windows\-based platforms only\. A list of paths that contain import libraries for linking DLLs for this uselib definition\. The paths are relative to the location specified by the source attribute\. | 
| import | \[ string \] | Applies to Windows\-based platforms only\. A list of import library file names that represent this uselib definition\. These libraries are used in the linker command\. | 
| frameworkpath | \[ string \] | Applies to OSx\-based platforms only\. A list of framework paths that contain frameworks for this uselib definition\. The paths are relative to the location specified by the source attribute\. | 
| framework | \[ string \] | Applies to OSx\-based platforms only\. A list of frameworks that represent this uselib definition\. | 
| copy\_extra | \[ string \] | List of additional files to copy from the source to the target directory where the executables that consume this uselib definition reside\. Each item in the list is a colon\-delimited source\-destination pair in the format <source>:<destination>\. <source> specifies the source directory that contains the files relative to the location specified by the source attribute\. <destination> is the directory to which the files are copied relative to the destination directory of the consuming target executable\. | 

## Special Reserved Words<a name="waf-third-party-library-configurations-special-reserved-words"></a>

The following special reserved words are used in third\-party library configuration files\.


****  

| **Reserved Word** | **Description** | 
| --- | --- | 
| @GEM@ | Alias that represents the base directory of the gem\. This is used for third\-party configurations that reside within the gem\. | 
| %LIBPATH\(<libname>\) |  Specifies a macro that resolves to the full path of *<libname>*\. *<libname>* must be defined within the scope of the platform for which the macro is used\. For example, if there is a library called `libmath.lib` whose absolute path is `C:\libs`, `%LIBPATH(libmath.lib)` resolves to `C:\libs\libmath.lib`\. This is useful for linker flags like `--force-load` *<libfullpath>* that can be added as a link flag parameter\. In the following example, `libtomcrypt` requires a force load on its library through its linker flags\. The definition that achieves this is as follows: <pre>...<br />"linkflags": [<br />    "-force_load",<br />    "%LIBPATH(libtomcrypt.a)"<br />]</pre>  | 