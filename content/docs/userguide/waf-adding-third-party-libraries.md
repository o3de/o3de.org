# Adding Third\-Party Libraries<a name="waf-adding-third-party-libraries"></a>

[Gems](gems-system-gems.md) are Lumberyard extensions that can be enabled or disabled for any game project\. This modularity is advantageous when you want to add a third\-party library to specific games\. You can add the third\-party library to a new or existing gem, and then enable the gem for the projects that you want\. This narrows the scope of the library to only the games that use the gem\.

Adding a third\-party library to a gem includes the following steps:

1. Determine the location of the library's content files, including its include headers, static libraries, and/or shared libraries\.

1. Create a definition file for the library\.

1. Configure other gems or modules to use the library\.

1. Run `lmbr_waf` configure to process the library definition files\.

In the following example, the steps add a fictional third\-party library to a gem\. The library is a static library called "SuperLibrary" that supports both Windows and macOS\. The gem is called "MyGem"\.

## Step 1\. Determine the Location of the Third\-Party Library<a name="waf-adding-third-party-libraries-determine-the-third-party-library-location"></a>

When you add a third\-party library to a gem, you specify two locations: one for the library defnition, and one for the library contents\.

### Definition File<a name="waf-adding-third-party-libraries-definition-files"></a>

The gem module expects the third\-party SDK `.json` definition file \(in this example, `superlibrary.json`\) to reside in a subdirectory named `3rdParty`\. The following gem directory structure shows the location of the `lumberyard_version\dev\Gems\gem_name\3rdParty` directory\.

```
+---\3rdParty
+---\Assets
+---\Code
|   +---wscript
+---\External
+---gem.json
```

### Library Files<a name="waf-adding-third-party-libraries-library-files"></a>

The library code file location is not predetermined, but a best practice is to place them inside the gem's directory structure in an `External\SDK_name` directory, like this:

`lumberyard_version\dev\Gems\gem_name\External\SDK_name`

The following directory structure shows the `External` directory with the `SuperLibrary` directory inside\.

```
+---\External
    +---\SuperLibrary
        +---\includes
             +---superlibrary.h
        +---\lib
             +---\win32
                 +----superlibrary.lib
             +---\osx
                 +----superlibrary.a
```

## Step 2\. Create a Third\-Party Library Definition File<a name="waf-adding-third-party-libraries-create-a-third-party-library-definition-file"></a>

Create a `.json` definition file for the third\-party library\. Using the directory structure from the previous step, the third\-party definition file `superlibrary.json` looks like this:

```
{
    "name": "SUPERLIBRARY",
    "source": "@GEM@/External/SuperLibrary",
    "description": "My Super Library",
    "includes": [
        "Include"
    ],
    "defines": [],
    "lib_required": "True",
    "platform": {
        "win_x64_vs2017": {
            "libpath": [
                "lib/win32"
            ],
            "lib": [
                "superlibrary.lib"
            ]
        },
        "win_x64_vs2019": "@win_x64_vs2017",
        "darwin_x64": {
            "libpath": [
                "lib/osx"
            ],
            "lib": [
                "superlibrary.a"
            ]
        }
    }
}
```

**Note**  
The `source` key contains an alias called `@GEM@`\. The `@GEM@` alias represents the root path of the current gem\. The `source` key specifies the base of the third\-party library directory on which the other paths specified by keys like `includes` and `libpath` are based\.
The `platform` key sections describe the locations of platform\-specific library files based on the library identifier\. 

For more information, see [Creating Third\-Party Library Configuration Files for Waf](waf-third-party-library-configurations.md)\.

## Step 3\. Apply the Library to Modules or Gems That Require It<a name="waf-adding-third-party-libraries-apply-the-library-to-modules-or-gems-that-require-it"></a>

By default, after the third\-party library definition is set in the gem, it is automatically available to that gem\. In order for this gem to be available in other modules, those modules need to add `SUPERLIBRARY` to their `uselib` list\.

Other gems \(or the game gem\) that require access to the gem\-scoped third\-party library must establish a dependency on the gem that has the library\. For example, if you want a gem called OurGem to have access to the `SuperLibrary` library in MyGem, OurGem's `gem.json` file must define a dependency on MyGem\.

**Example**  
In the `OurGem.gem.json` file, OurGem declares a dependency on MyGem:  

```
{
    "Dependencies": [
        {
            "Uuid": "981435f1646a4ccfbfd7733920c011b6",
            "VersionConstraints": [
                "~>0.1"
            ],
            "_comment": "MyGem"
        }
    ],
    "GemFormatVersion": 3,
    "Uuid": "1daafa0eaa544f64befb74a1cc719a9c",
    "Name": "OurGem",
    "DisplayName": "Our Gem",
    "Version": "0.1.0",
    "LinkType": "Dynamic",
    "Summary": "Our Gem",
    "Tags": ["Animation"],
    "IconPath": "OurGem.png",
    "EditorModule" : true
}
```

In the `lumberyard_version\dev\Gems\OurGem\Code\wscript` file, the `uselib` key must specify `SUPERLIBRARY`:

```
def build(bld):
    bld.DefineGem(
        uselib      = ['SUPERLIBRARY'],
        file_list   = ['our_gem.waf_files']
    )
```

## Step 4\. Configure and Validate the Library Definition<a name="waf-adding-third-party-libraries-configure-and-validate-the-library-definition"></a>

Now you can test your definitions by using the Waf `configure` command, which processes third\-party definitions\. Before you begin, use the Project Configurator to ensure that the gem that has the third\-party library is enabled for the game project\. For more information, see [Enabling Gems](gems-system-using-project-configurator.md)\.

From the engine root path, run the configure command:

```
lmbr_waf configure
```

After the `configure` command completes successfully, the configured values appear in the Waf variant cache files in the `BinTemp\c4che` directory\.

The entries are similar to the following ones in the variant cache file for the Microsoft Visual Studio 2017 profile configuration `lumberyard_version\dev\BinTemp\c4che\win_x64_vs2017_profile_cache.py`\.

```
...
INCLUDES_SUPERLIBRARY = ['C:\\MyProj\\Lumberyard-1.16\\Gems\\MyGem\\External\\Include']
...
STLIBPATH_SUPERLIBRARY = ['C:\\MyProj\\Lumberyard-1.16\\Gems\\MyGem\\External\\lib\\win32']
...
STLIB_SUPERLIBRARY = ['superlibrary']
...
```

## Updating a Third\-Party Library in a Gem<a name="waf-adding-third-party-libraries-updating-a-third-party-library-in-a-gem"></a>

To update a third\-party library that is defined in a gem, you don't have to create a new third\-party definition file\. Instead, you can update the existing definition file\. As a best practice, place the third\-party library files in a version\-named subfolder\. To maintain good dependency tracking, we recommend that you update the gem version when you update a third\-party library\.