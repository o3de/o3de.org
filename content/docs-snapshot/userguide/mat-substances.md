# Working with Substances<a name="mat-substances"></a>

Substances are procedural materials created using Allegorithmic's Substance Designer\. Lumberyard has the ability to import Substance `.sbsar` files using the Substance Editor\.

## Creating Substances for Lumberyard<a name="mat-substances-creating"></a>

When creating Substances for Lumberyard using Allegorithmic’s Substance Designer, it is recommended to use the **PBR Specular/Glossiness** substance as the base\. This will involve less adjustments to your default outputs for substances\. However, you will need to delete the **Glossiness** output and save the **Gloss** map into the alpha channel for the **Normal** map output in Substance Designer\.

If you want to use a **PBR Metallic/Roughness** Substance and convert it for use in Lumberyard, follow these steps:
+ Change the **BaseColor** output node to **Diffuse**\.
+ Create a **Specular** output node in the Substance Graph\.
+ Create a **RGB\-A Merge** node in the Substance Graph\.
  + Connect the node that was originally going into the **Normal** map into the **RGB** input\.
  + Note that the **A \(Alpha\)** input for this node will be connected later on\.
  + Connect the output of this merge node into the input for the **Normal** output node\.
+ Create a **BaseColor/Metallic/Roughness** converter node in the Substance Graph\.
  + Connect the node that was originally going into the **BaseColor/Diffuse** map into the **BaseColor** input for this converter node\.
  + Connect the node that was originally going into the **Roughness** map into the **Roughness** input for this converter node\.
  + Connect the node that was originally going into the **Metallic** map into the **Metallic** input for this converter node\.
  + Connect the **Diffuse** output of this converter node into the input for the **Diffuse** output node\.
  + Connect the **Specular** output of this converter node into the input for the **Specular** output node\.
  + Connect the **Glossiness** output of this converter node into the **A \(Alpha\)** input for the **RGB\-A Merge** node\.
+ Delete the **Roughness** output node\.
+ Delete the **Metallic** output node\.
+ Save the changes to your Substance and then publish the `.sbs` as a `.sbsar` to be imported into Lumberyard\.

## Exporting Substances for Lumberyard<a name="mat-substances-exporting"></a>

When using Allegorithmic’s Substance Designer to export textures to Lumberyard, take extra care to select the correct file type\. The following file types export correctly: `.tif`, `.tga`, `.bmp`\. Avoid exporting with the following common file types: `.png`, `.jpg`, `.psd`\.

**To export textures in Substance Designer for Lumberyard**

1. In the **File** menu, click **Export Textures**\.

1. Click the **Configuration** tab, and then under **Presets**, select **Amazon Lumberyard**\. 

1. Click the **Export** tab\. In the file type drop\-down menu \(upper right corner\), select one of the following file types:
   + `.tif`
   + `.tga`
   + `.bmp`

1. Click **Export**\.

## Working with Substance in Lumberyard<a name="mat-substances-working"></a>

Using Substance Editor, you can edit Substance material properties and visualize substances on objects in real\-time\. Substance Editor also has the ability to generate and export static textures from Substances\.

![\[\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mat-substance-editor.png)

Here are some things to keep in mind when working with Substances in Substance Editor:
+ The Substance Gem needs to be enabled first for the project using [Creating Lumberyard projects](configurator-intro.md)\. For more information on Gems, see [Add modular features and assets with Gems](gems-system-gems.md)\.
+ When importing substance files, you must restart Lumberyard Editor before substance textures are rendered correctly\.
+ A `.smtl` \(substance material\) file and a `.sub` \(substance texture\) file are generated in the same directory location as the imported `.sbsar` for applying the substance material or substance textures to objects\.
+ By default, an `.smtl` file will inherit the `.sub` files in the appropriately matching channels based on the outputs in the published `.sbsar` from Substance Designer\. For example, a diffuse output texture will map into the diffuse channel for the `.smtl` file\.

**To use Substance Editor**

1. Open Lumberyard Editor and select **Tools**, **Plug\-Ins**, **Substance Editor**\. You can also click the Substance icon in the main toolbar of Lumberyard Editor\.

1. To update imported `.sbsar` files, click **Edit**, **Reimport Substance**\. Current changes will not be overwritten\.

1. To remove a substance, click **File**, `Delete Substance`\.
**Note**  
This permanently removes the substance and all associated assets from the `.sbsar` project, which cannot be recovered using the Windows Recycle Bin\. 

## Console Variables for Substances<a name="mat-substances-cvars"></a>

To control how Substances are handled by CPU and memory, you can set the following CVars in your `system_windows_pc.cfg` file or `editor.cfg` file\.

**`substance_engineLibrary`**  
Enables substances to run on the GPU instead of the CPU, permitting the output of higher resolution textures\. Specifies the engine to load for substance plugin\. Possible values are PC: \[`sse2`\|`d3d10`\|`d3d11`\]\. The default is `sse2`, which specifies CPU\. 

**`substance_commitRenderOptions`**  
Applies CPU and memory changes immediately, rather than waiting for the next render call\. 

**`substance_coreCount`**  
Sets how many CPU cores are used for Substance rendering\. A value of `32` specifies all cores\. This setting is relevant only when using CPU based engines\. 

**`substance_memoryBudget`**  
Sets, in megabytes, the amount of memory used for Substance rendering\. The default is 512\. 