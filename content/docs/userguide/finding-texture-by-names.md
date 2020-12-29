description: ' Find the texture file name to reference for nodes in the &ALYlong;
  &script-canvas; editor. '
slug: finding-texture-by-names
title: Finding the Texture Name
---
# Finding the Texture Name<a name="finding-texture-by-names"></a>


****  

|  | 
| --- |
| This topic references tools and features that are [legacy](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#legacy)\. If you want to use legacy tools in Lumberyard Editor, disable the [CryEntity Removal gem](https://docs.aws.amazon.com/lumberyard/latest/userguide/gems-system-cryentity-removal-gem.html) using the [Project Configurator](https://docs.aws.amazon.com/lumberyard/latest/userguide/configurator-intro.html) or the [command line](https://docs.aws.amazon.com/lumberyard/latest/userguide/lmbr-exe.html)\. To learn more about legacy features, see the [Lumberyard Legacy Reference](https://d3bqhfbip4ze4a.cloudfront.net/lumberyard-legacy.pdf)\. | 

You can specify texture names for nodes in the **Script Canvas** editor\. The texture name is generally the path that starts at the top asset directory\.

**To find the texture name**

1. In Lumberyard Editor, choose **Tools**, **Asset Browser**\. 

1. From the **Asset Browser**, navigate to the texture file\.

1. Right\-click the texture file and choose **Copy Path to Clipboard**\. This copies the path to the file\.

1. Delete parts of the path to get the texture name\.


**Examples**  

| Asset Location | Copied Path | Path to Delete | Texture Name to Reference | 
| --- | --- | --- | --- | 
| Project | lumberyard\_version\\dev\\SamplesProject\\textures\\defaults\\white\.tif | lumberyard\_version\\dev\\SamplesProject\\ | textures\\defaults\\white\.tif | 
| Gem | lumberyard\_version\\dev\\Gems\\Rain\\Assets\\Textures\\Rain\\rainfall\.tif | lumberyard\_version\\dev\\Gems\\Rain\\Assets\\ | Textures\\Rain\\rainfall\.tif | 
| Editor | lumberyard\_version\\dev\\Editor\\Plugins\\ParticleEditorPlugin\\defaults\\feather01\.tif | lumberyard\_version\\dev\\ | Editor\\Plugins\\ParticleEditorPlugin\\defaults\\feather01\.tif | 
| Engine |  lumberyard\_version\\dev\\Engine\\textures\\skys\\night\\half\_moon\.tif | lumberyard\_version\\dev\\Engine\\ | textures\\skys\\night\\half\_moon\.tif  | 