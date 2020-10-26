# Snow Gem<a name="gems-system-gem-snow"></a>


****  

|  | 
| --- |
| This topic references tools and features that are [legacy](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#legacy)\. If you want to use legacy tools in Lumberyard Editor, disable the [CryEntity Removal gem](https://docs.aws.amazon.com/lumberyard/latest/userguide/gems-system-cryentity-removal-gem.html) using the [Project Configurator](https://docs.aws.amazon.com/lumberyard/latest/userguide/configurator-intro.html) or the [command line](https://docs.aws.amazon.com/lumberyard/latest/userguide/lmbr-exe.html)\. To learn more about legacy features, see the [Lumberyard Legacy Reference](https://d3bqhfbip4ze4a.cloudfront.net/lumberyard-legacy.pdf)\. | 

The Snow Gem creates realistic snow effects in your levels, including snowflake and surface effects, such as snow buildup\. To enable the Snow Gem in your project, see [Add modular features and assets with Gems](gems-system-gems.md)\.

**Note**  
Place only a single **Snow** entity in your scene\.

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/gems/gems-system-gem-snow.png)

## Placing Snow<a name="placing-snow"></a>

You can place your snow and customize it to your level by modifying properties for brightness, gravity, size and quantity of snow flakes, how much snow and frost builds on a surface, and more\.

**To add snow to your level**

1. In the **Rollup Bar**, click **Entity**\.

1. Under **Browser**, expand **Environment**\.

1. Drag the **Snow** entity into your scene\.

## Configuring Snow<a name="configuring-snow"></a>

You can configure the snow's properties under [https://docs.aws.amazon.com/lumberyard/latest/legacyreference/entities-params-entity-params.html](https://docs.aws.amazon.com/lumberyard/latest/legacyreference/entities-params-entity-params.html) and **Entity Properties**\.


**Snow Entity Properties**  

| Properties | Description | 
| --- | --- | 
| Enabled | Enables snow effect | 
| Radius | Sets the area on which snow falls | 
| SnowFall |  | 
| Brightness | Sets the brightness of the snow effect | 
| GravityScale | Sets the gravity strength, which determines the rate at which snow falls | 
| SnowFlakeCount | Sets the quantity of snowflakes | 
| SnowFlakeSize | Sets size of individual snowflakes | 
| TurbulenceFreq | Sets the frequency of the turbulence affecting the snow | 
| TurbulenceStrength | Sets the strength of the turbulence affecting the snow | 
| WindScale | Determines the impact of wind on the falling snow | 
| Surface |  | 
| FrostAmount | Sets the amount of frost on a surface | 
| SnowAmount | Sets the amount of snow on a surface | 
| SurfaceFreezing | Sets the degree to which surfaces appear frozen | 

## Using Console Variables for Snow<a name="snow-console-variables"></a>

You can use the following console variables [console variables](console-intro.md) for the snow entity\.


**Snow Entity Console Variables**  

| Variable | Description | 
| --- | --- | 
| r\_Snow | Enables snow rendering | 
| r\_SnowDisplacement | Enables displacement for snow accumulation | 
| r\_SnowFlakeClusters | Number of snow flake clusters | 
| r\_SnowHalfRes | When enabled, renders snow at half resolution to conserve fill rate | 

## Using the Snow Sample<a name="gems-snow-sample"></a>

The Snow Sample uses the Snow and Clouds gems to demonstrate how to use the Snow entity as an environment special effects in a level\. The Snow entity shows how snow falls and provides properties that you can set to randomly change the snow fall over time, creating a more dynamic weather experience\.

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/shared-gem-sample-snow.gif)