# Order\-Independent Transparency<a name="graphics-rendering-order-independent-transparency"></a>

Order\-independent transparency \(OIT\) corrects the display of transparent objects that are drawn out of order\.

![\[OIT example animation for Amazon Lumberyard.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/shared-OIT-example-animation.gif)

OIT is useful when creating the following:
+ Concave geometry – When you create concave geometry, such as a glass, wine glass, or glass sculpture, some triangles may cover the same pixels and are drawn on top of each other\. OIT solves the out\-of\-order issues that appear from certain angles\.
+ Intersecting geometry – When you create intersecting geometry, such as hair planes, some triangles may intersect in separate draws\. OIT properly orders the triangles for each pixel\.
+ Transparent objects inside transparent objects – This includes liquids inside of glasses, holograms, or x\-ray style effects\.

To further demonstrate, see the following images\.


****  

|  |  |  |  | 
| --- |--- |--- |--- |
| OIT is not needed in the following example\. Drawing object 1, then object 2, and finally object 3 works\. | OIT is needed in the following example\. Drawing object 1 and then object 2 will not work because certain pixels from object 1 must be in front of pixels from object 2 \(and vice versa\)\. | OIT is needed in the following example\. Object 2 is long and its center point is in front of object 1, but it must draw behind object 1\. | OIT is needed in the following example\. Certain parts of object 1 draw behind other parts of the object, and you cannot control which draws first\. | 
|  ![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/oit_not_needed.png)  |  ![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/oit_needed_01.png)  |  ![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/oit_needed_02.png)  |  ![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/oit_needed_03.png)  | 

## Configuring Order\-Independent Transparency for Lumberyard<a name="configuring-order-independent-transparency-for-Amazon-Lumberyard"></a>

You can configure OIT with the console or create a level configuration file with this setting\. 

Specify the value for `r_AlphaBlendLayerCount` to the number of transparency layers that OIT can solve\. A value of 1 is sufficient to solve most out\-of\-order transparency issues\.

Valid values: 0 – 4

0 = Disables OIT
+ Specify the value for the `r_AlphaBlendLayerCount` console variable
+ Specify the value for the `level.cfg` file in the `lumberyard_version\dev\project_name\Levels\level_name` directory\.

For more information, see [Configuring Console Variables](console-intro.md#configuring-console-variables-cvars)\.

OIT requires the following:
+ Hardware requirements: DirectX 12\_1 feature level compatible graphics card \(NVIDIA Maxwell & Pascal, 4th generation Intel core processors\)\.
+ Software requirements: DirectX 11\.3 and 12 runtime on Windows 10 compiled with Windows 10 SDK\.

**To set the Windows 10 SDK for Lumberyard**

1. With a text editor, open the `user_settings.options` file in the `lumberyard_version\dev\_WAF_` directory\.

1. Under the `[Windows Options]` section, set `win_vs2017_winkit` to your version of the Windows 10 SDK \(for example, *10\.1\.17134\.12*\)\. 

1. Build your game project\. For more information, see [Building Lumberyard projects](game-build-intro.md)\.
**Note**  
Windows 7 does not support OIT\. However, if you build your game project on Windows 7 with an installed and configured version of the Windows 10 SDK, this generates a binary file that can support OIT on Windows 10\. This allows you to use older versions of Windows to build DirectX 11\.3 features\.