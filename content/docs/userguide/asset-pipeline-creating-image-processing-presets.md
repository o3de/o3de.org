# Creating Image Processing Presets<a name="asset-pipeline-creating-image-processing-presets"></a>

Lumberyard contains an existing set of image processing presets\. You apply these presets on your source image file names before you add them in your Lumberyard directory for processing\. Based on the appended suffix for the file name, Asset Processor converts them into `.dds` files with specific settings and adds them to the `lumberyard_version\dev\Cache` directory\.

You can define presets in two ways:

**\(Recommended method\) `ImageCompiler.cpp` and `rc.ini`**  
The `ImageCompiler.cpp` file contains the code that finds a file name suffix match, and points to another file for the specific settings\. The `rc.ini` file defines those specific settings for the matched suffix\.

**`AssetProcessorPlatformConfig.ini`**  
The `AssetProcessorPlatformConfig.ini` file matches file name suffix patterns and then calls functions to process the file based on its matches\.

**Topics**
+ [Creating Presets with ImageCompiler\.cpp and rc\.ini](#asset-pipeline-creating-presets-imagecompiler-rc)
+ [Creating Presets with AssetProcessorPlatformConfig\.ini](#asset-pipeline-creating-presets-with-assetprocessorplatformconfig-ini)

## Creating Presets with ImageCompiler\.cpp and rc\.ini<a name="asset-pipeline-creating-presets-imagecompiler-rc"></a>

The following snippet is from `ImageCompiler.cpp`, located in the `lumberyard_version\dev\Code\Tools\RC\ResourceCompilerImage` directory\. Part of this code finds file names appended with `_bump`, and then calls the `presetName` function `defaultBump`, which derives its settings from `NormalsFromDisplacement` \(defined in `rc.ini`\)\.

```
...
static string AutoselectPreset(const ConvertContext& CC, const uint32 width, const uint32 height, const bool hasAlpha)
{
    const char* const defaultColorchart = "ColorChart";
    const char* const defaultBump       = "NormalsFromDisplacement";
    const char* const defaultNormalmap  = "Normals";
...

    const string fileName = CC.config->GetAsString("overwritefilename", CC.sourceFileNameOnly, CC.sourceFileNameOnly);

    string presetName;

    if (SuffixUtil::HasSuffix(fileName.c_str(), '_', "cch"))
    {
        presetName = defaultColorchart;
    }
    else if (SuffixUtil::HasSuffix(fileName.c_str(), '_', "bump"))
    {
        presetName = defaultBump;
    }
    else if (SuffixUtil::HasSuffix(fileName.c_str(), '_', "ddn"))
    {
        presetName = defaultNormalmap;
    }
...
```

The `rc.ini` file \(located in the `lumberyard_version\dev\Bin64vc141\rc` directory\) contains the following setup information:
+ Asset presets for operating systems\.
+ Image preset aliases \(profile mapping from a legacy preset\)\.
+ Image format settings, such as compression method, pixel format, and so on\.
+ Mip map settings\.
+ Naming convention presets: Image suffixes such as `_diff`, `spec/refl`, `_disp`, `_ddna`, `_ddn`, `_bump`, `cm/cubemap`, `detail`, and so on\.

**Example**  
The following snippet from the `rc.ini` file defines `NormalsFromDisplacement`\. It includes pixel formats for each operating system, maximum texture size, [mip map settings](asset-pipeline-generating-mipmaps.md), colorspace, and so on\.  

```
...
; converts greyscale texture to normal map, normal map textures (signed BC5)
[NormalsFromDisplacement]
pixelformat=BC5s
;pixelformat:es3=ASTC_5x5
pixelformat:es3=EAC_RG11
;pixelformat:ios=PVRTC4
pixelformat:ios=EAC_RG11
maxtexturesize:es3=1024
maxtexturesize:ios=1024 
bumptype=1
powof2=1
mipnormalize=1
mipmaps=1
mipgentype=average
colorspace=linear,linear
filemasks=*_bump*
...
```

You can edit `ImageCompiler.cpp` and `rc.ini` to add your own image presets\.

**To add your own image processing presets**

1. In a text editor, open `ImageCompiler.cpp`, located in the `lumberyard_version\dev\Code\Tools\RC\ResourceCompilerImage` directory\.

1. Specify the appropriate lines of code to define your new preset\. 

1. Save and close `ImageCompiler.cpp`\.

1. In a text editor, open `rc.ini`, located in the `lumberyard_version\dev\Bin64vc141\rc` directory\.

1. Add your new definition\.

1. Specify the settings for the new definition\.

1. Save and close `rc.ini`\.

**Example**  
If you want to add a line of code that searches for file names that end in `_awesome`, you might add the following lines to your `ImageCompiler.cpp`\.  

```
const char* const defaultAwesomeSuffix    = "AwesomeImage";
```

**Example**  

```
else if (SuffixUtil::HasSuffix(fileName.c_str(), '_', "awesome"))
    {
        presetName = defaultAwesomeSuffix;
    }
```

You would also add to a definition of `AwesomeImage` to the `rc.ini` file\.

**Example**  

```
[AwesomeImage]
pixelformat=BC1
pixelformat:es3=ETC2
pixelformat:ios=PVRTC2
;pixelformat:es3=ASTC_4x4
;pixelformat:ios=ASTC_6x6
rgbweights=ciexyz
powof2=1
mipmaps=1
colorspace=sRGB,auto
;discardalpha=1
filemasks=*_awesome*
```

## Creating Presets with AssetProcessorPlatformConfig\.ini<a name="asset-pipeline-creating-presets-with-assetprocessorplatformconfig-ini"></a>

You can also add presets in the `AssetProcessorPlatformConfig.ini` file, located in the `lumberyard_version\dev` directory\.

**Example**  
The following snippet from `AssetProcessorPlatformConfig.ini` shows two rules, both of which match a file that ends in `_awesome.tiff`\. The image is processed for each rule that it matches\. In this example, multiple results \(assets\) would be produced for each image\.  

```
...
[RC uitextures]
pattern=.*\\.(bmp|gif|jpg|jpeg|tga|png)
params=/imagecompressor=CTSquish /streaming=0
lockSource=false
server=skip
...
```

```
...
[RC special images]
pattern=.*(_awesome)\\.tif?
...
```

**To add image processing presets**

1. In a text editor, open the `AssetProcessorPlatformConfig.ini` file, located in the `lumberyard_version\dev` directory\.

1. Specify the appropriate lines of code to define your new preset\. 

1. Save and close the file\.