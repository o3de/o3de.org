# Generating Mip Maps<a name="asset-pipeline-generating-mipmaps"></a>

[Mip maps](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#mip_map) are a sequence of optimized images made from one image\. Each image is lower in resolution than the previous image by a power of two\. Mip maps reduce the time and processing power it takes to render an image in a game\. Lower resolution mip maps are used when the viewing distance is great enough that the loss of detail is not noticeable\. Higher resolution mip maps are used when an object is close to the camera and needs to be displayed in detail\.

When you enable mip maps in Lumberyard, Resource Compiler automatically generates six mip maps for that image\. The largest mip map is the original size of your image, and each progressive mip map is smaller by a power of two\. 

**Example**  
If your original image is 1024x1024, then you will have mip maps that are 1024x1024, 512x512, 256x256, 128x128, 64x64, and 32x32\.   

![\[For an image with a resolution of 1024x1024, the generated mip maps will be 1024x1024, 512x512, 256x256, 128x128, 64x64, and 32x32.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/assets/pipeline/asset-pipeline-images-mipmaps-1.png)

**Example**  
If your original image is 4096x4096, then you will have mip maps that are 4096x4096, 2048x2048, 1024x1024, 512x512, 256x256, and 128x128\.  

![\[For an image with a resolution of 4096x4096, the generated mip maps will be 4096x4096, 2048x2048, 1024x1024, 512x512, 256x256, and 128x128.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/assets/pipeline/asset-pipeline-images-mipmaps-2.png)

**Note**  
For most of the existing presets, mip maps are enabled by default\. If you create your own presets, you must enable mip maps\. 

If mip maps are not enabled, then on the **MIP Control** tab, under **Mip maps**, **none \(0\)** appears\.

![\[If mip maps are not enabled for a particular image processing preset, then under Mip Control, Mip maps, none (0) appears.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/assets/pipeline/asset-pipeline-images-mipmaps-3.png)

**To enable mip maps for an image processing preset**

1. In a text editor, open the `rc.ini` file, located in the `lumberyard_version\dev\Bin64vc141\rc` directory\.

   For more information, see [Creating Image Processing Presets](asset-pipeline-creating-image-processing-presets.md)\.

1. Add `mipmaps=1` to the definition\.  
**Example**  

   ```
   ...
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
   ...
   ```

   To disable mip maps, specify `mipmaps=0`\.

## Adjusting Alpha Test on Mip Maps<a name="asset-pipeline-mipmaps-adjusting-alphatest"></a>

You can adjust the Alpha Test value for each mip map in the **MIP Control** tab of the Resource Compiler image tool\.

**To adjust Alpha Test for each mip map**

1. For each mip map, adjust the sliders or enter a number in the box\.

1. Select **Maintain alphatest coverage** to maintain shape and opacity from a distance when working with certain types of objects, such as leaves on a tree\. If you don't select this option, the tree leaves may lose their silhouette in the lower resolution mip maps\.  
![\[Select the MIP Control tab and adjust the sliders or enter a number to define the AlphaTest value for each mip map.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/assets/pipeline/asset-pipeline-images-mipmaps-alphatest.png)