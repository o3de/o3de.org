# Rain Gem<a name="gems-system-gem-rain"></a>


****  

|  | 
| --- |
| This topic references tools and features that are [legacy](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#legacy)\. If you want to use legacy tools in Lumberyard Editor, disable the [CryEntity Removal gem](https://docs.aws.amazon.com/lumberyard/latest/userguide/gems-system-cryentity-removal-gem.html) using the [Project Configurator](https://docs.aws.amazon.com/lumberyard/latest/userguide/configurator-intro.html) or the [command line](https://docs.aws.amazon.com/lumberyard/latest/userguide/lmbr-exe.html)\. To learn more about legacy features, see the [Lumberyard Legacy Reference](https://d3bqhfbip4ze4a.cloudfront.net/lumberyard-legacy.pdf)\. | 

The Rain Gem creates realistic rain effects in your levels, including rain drops, puddles, mist, wet surfaces, and splashes\. To enable the Rain Gem in your project, see [Add modular features and assets with Gems](gems-system-gems.md)\.

This gem is a game object extension\. On initialization, it preloads all textures listed in the `raintextures.xml` file\.

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/gems/gems-system-gem-rain.png)

**Note**  
Place only a single Rain entity in your scene\.

## Placing Rain<a name="placing-rain"></a>

You can place rain and customize it for your level by modifying properties for amount of puddles, strength and frequence of puddle ripples, quantity of rain, size and speed of the rain drops, and more\.

**To add rain to your level**

1. In the **Rollup Bar**, click **Entity**\.

1. Under **Browser**, expand **Environment**\.

1. Drag the **Rain** entity into your scene\.

## Configuring Rain<a name="configuring-rain"></a>

You can configure the rain's properties under [https://docs.aws.amazon.com/lumberyard/latest/legacyreference/entities-params-entity-params.html](https://docs.aws.amazon.com/lumberyard/latest/legacyreference/entities-params-entity-params.html) and **Entity Properties**\.


**Rain Entity Properties**  

| Properties | Description | 
| --- | --- | 
| Amount | Sets overall amount of the rain entity's various effects | 
| DiffuseDarkening | Sets the degree to which the rain darkens the surface diffuse  | 
| DisableOcclusion | Turns off checking whether an object is under cover and should be occluded from rain | 
| Enabled | Toggles the rain effect | 
| IgnoreVisareas | Continue to render rain when player is inside a vis area | 
| PuddlesAmount | Sets the size and number of puddles that the rain creates | 
| PuddlesMaskAmount | Sets the strength of the puddle mask to balance different puddle results | 
| PuddlesRippleAmount | Sets the height and frequency of ripples in rain puddles | 
| Radius | Sets the area on which rain falls | 
| RainDropsAmount | Sets the number of rain drops | 
| RainDropsLighting | Sets the brightness of the rain drops | 
| RainDropsSpeed | Sets the rate at which rain falls | 
| SplashesAmount | Sets the degree of splashing on a surface | 

## Using Console Variables for Rain<a name="rain-console-variables"></a>

You can use the following console variables for the rain entity\.


**Rain Entity Console Variables**  

| Variable | Description | 
| --- | --- | 
| r\_Rain | Enables rain rendering | 
| r\_RainAmount | Sets rain amount | 
| r\_RainDistMultiplier | Multiplier for the rain layer's distance from the camera | 
| r\_RainDropsEffect | Enables rain drops effect | 
| r\_RainIgnoreNearest | Disables the layer showing the reflection of objects in rainy or wet areas nearest objects | 
| r\_RainMaxViewDist | Sets the maximum distance at which rain is visible | 
| r\_RainMaxViewDist\_Deferred | Sets maximum distance \(in meters\) at which the deferred rain reflection layer is visible | 
| r\_RainOccluderSizeThreshold | Blocks rain for objects bigger than this value | 

## Using the Rain Sample<a name="gems-rain-sample"></a>

The Rain Sample uses the Rain, Clouds, and LightningArc gems to demonstrate how to use rain as an environment special effects \(FX\) in a level\. The Lightning entity \(from the LightningArc gem\) shows how the lightning FX can enhance a rain storm with flashes of light and random strikes of lightning on the ground\. The clouds are enabled to show how they can fill a scene\.

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/shared-gem-sample-rain.gif)