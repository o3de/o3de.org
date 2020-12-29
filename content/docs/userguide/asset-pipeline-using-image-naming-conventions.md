# Using Image Naming Conventions<a name="asset-pipeline-using-image-naming-conventions"></a>

You can use any existing or created [image processing presets](asset-pipeline-creating-image-processing-presets.md)\. To do this, append the suffix to the end of the file name before you add it to your Lumberyard directory\.

**Example**  
If you create an image that you want to use as a decal, add the `_decal` suffix to the file name before the extension\. For example, to convert `scorchmark.tif` as a decal, rename it to `scorchmark_decal.tif`\. You then add it to your Lumberyard directory, so that Asset Processor automatically processes the file\.

There are a number of existing presets that you can use\. For a full list, see the `rc.ini` file in the `lumberyard_version\dev\Bin64vc141\rc` directory\.

Some of the existing presets include the following:
+ `_diff` – Albedo
+ `_spec`, `_refl` – Specular textures
+ `_ddn` – Normal map texture
+ `_ddna` – Normal map texture with smoothness in alpha
+ `_bump` – Converts grayscale texture to normal map
+ `_displ` – Displacement map
+ `_decal` – Decal
+ `_detail` – Merged detail maps
+ `_cm`, `_cubemap` – HDR reflection textures
+ `_cch` – Color chart
+ `_mask` – Grayscale mask
+ `_sss`, `_trans`, `_opac` – Opacity