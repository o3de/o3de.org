# Tutorial: Using Console Variables to Tune Cascade Shadows<a name="rendering-graphics-shadows-tuning"></a>

This topic shows you how to use console variables \(CVARs\) to tune the shadows in a scene\. The sample is a 2k island test level that was generated with World Machine\.

**Topics**
+ [Prerequisite: Disable Rendering Features](#rendering-graphics-shadows-tuning-disable-rendering-features)
+ [Step 1: Enable Cascade Shadows](#rendering-graphics-shadows-tuning-enable-cascade-shadows)
+ [Step 2: Enable Cascades Debug Mode](#rendering-graphics-shadows-tuning-enable-cascades-debug-mode)
+ [Step 3: Maximize the Number of Cascades](#rendering-graphics-shadows-tuning-maximize-the-number-of-cascades)
+ [Step 4: Change the Size of the Root Cascade](#rendering-graphics-shadows-tuning-change-the-size-of-the-root-cascade)
+ [Step 5: Change the Step Size](#rendering-graphics-shadows-tuning-change-the-step-size)
+ [Step 6: Enable Shadows Debug Mode](#rendering-graphics-shadows-tuning-enable-shadows-debug-mode)

## Prerequisite: Disable Rendering Features<a name="rendering-graphics-shadows-tuning-disable-rendering-features"></a>

Before you begin, disable rendering features like fog\. Rendering features like fog can obscure the view of shadows at a distance\. To disable fog, enter the following command:

```
e_Fog=0
```

## Step 1: Enable Cascade Shadows<a name="rendering-graphics-shadows-tuning-enable-cascade-shadows"></a>

By default, shadow cascades are disabled for terrain, as the following image shows\.

![\[Shadow cascades disabled.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/rendering/rendering-graphics-shadows-tuning-1.png)

To enable cascade shadows from terrain, enter the following command:

```
e_GsmCastFromTerrain=1
```

The left side of the cliff in the foreground now has shadows\.

![\[Shadow cascades enabled.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/rendering/rendering-graphics-shadows-tuning-2.png)

To disable cascade shadows, set `e_GsmCastFromTerrain` to `0`\.

```
e_GsmCastFromTerrain=0
```

## Step 2: Enable Cascades Debug Mode<a name="rendering-graphics-shadows-tuning-enable-cascades-debug-mode"></a>

You can use debug mode to better see the cascades and the effects of shadow\-related console variables\. To enable debug mode, enter the following command:

```
e_ShadowsCascadesDebug=1
```

In debug mode, each cascade is assigned a separate color\. In the following example, the nearest cascade is in red and the farthest in pink\.

```
Cascade 0: Red
Cascade 1: Green
Cascade 2: Blue
Cascade 3: Yellow
Cascade 4: Pink
```

This information is displayed in the viewport, as the following image shows\. Areas that do not have these special colorings do not have shadows\.

![\[Cascades debug mode enabled.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/rendering/rendering-graphics-shadows-tuning-3.png)

## Step 3: Maximize the Number of Cascades<a name="rendering-graphics-shadows-tuning-maximize-the-number-of-cascades"></a>

To create the highest quality shadows, start by maximizing the number of cascades and then scale back as needed\. To maximize the number of cascades, enter the `e_GsmLodsNum` console variable, which specifies the number of gradient shadow map levels of detail \(LOD\)\. The default is `5`\.

**Note**  
The default of `5` is true even when the `sys_spec_shadows` group console variable is set to its highest value \(`8`\)\.

To increase the number of cascades to 7, enter the following command:

```
e_GsmLodsNum=7
```

In the example, this command expands the set of debug cascade colors to the following:

```
Cascade 0: Red
Cascade 1: Green
Cascade 2: Blue
Cascade 3: Yellow
Cascade 4: Pink
Cascade 5: Light Blue
Cascade 6: Red Orange
```

**Note**  
The additional cascade numbers and corresponding colors are not listed in the upper left of the viewport but do appear on the terrain\.

The light blue color shows that the shadow range has been extended much further into the distance\.

![\[Increasing the number of cascades.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/rendering/rendering-graphics-shadows-tuning-4.png)

## Step 4: Change the Size of the Root Cascade<a name="rendering-graphics-shadows-tuning-change-the-size-of-the-root-cascade"></a>

In a scene, the terrain scales away from the root cascade 0 in the foreground to higher numbered cascades in the background\. To specify the size of the root cascade 0 in meters, use the `e_GsmRange` console variable\. The examples in this section show how `e_GsmRange` values affect shadows\.

The first example sets `e_GsmRange` to `0.5`\.

```
e_GsmRange=0.5
```

The resulting image shows that Cascade 0 \(red\) is not yet visible\. Cascades 1 through 6 \(green, blue, yellow, pink, light blue, and red\-orange\) are successively visible the farther one looks into the distance\. Beyond the last cascade, the mountain has its usual brownish color\.

![\[Root cascade set to 0.5.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/rendering/rendering-graphics-shadows-tuning-5.png)

The following command increases the range of the root cascade to 1 meter\.

```
e_GsmRange=1.0
```

At this setting, Cascade 0 is visible in the foreground in red\. The range has increased to include the distant mountain in Cascade 6 \(red\-orange\)\.

![\[Root cascade set to 1 meter.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/rendering/rendering-graphics-shadows-tuning-6.png)

The following command changes the range of the root cascade to 3 meters, which is the default\.

```
e_GsmRange=3.0
```

In the example, this setting expands the area of the red Cascade 0 in the foreground\. The other cascades are pushed farther back\. The mountain in the distance, which was Cascade 6 \(red\-orange\) is now Cascade 5 \(light blue\), and Cascade 6 is no longer visible\.

![\[Root cascade set to the default of 3 meters.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/rendering/rendering-graphics-shadows-tuning-7.png)

At this point, you can reduce the number of cascades from 7 to 6 with the following command\.

```
e_GsmLodsNum=6
```

As the following image shows, the command has no visual impact on the range of shadows\.

![\[Number of cascades set to 6.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/rendering/rendering-graphics-shadows-tuning-7.png)

## Step 5: Change the Step Size<a name="rendering-graphics-shadows-tuning-change-the-step-size"></a>

The range step size specifies how much the next cascade changes\. The following command specifies a range of 3, which is the default\.

```
e_GsmRangeStep=3
```

The following command changes the range to 1\.5\.

```
e_GsmRangeStep=1.5
```

The following image shows how this significantly reduces the range\. In the example, the number of cascades is still 6 \(`e_GsmLodsNum=6`\) and the root cascade is still at 3 meters \(`e_GsmRange=3.0`\)\. However, the mountains in the distance no longer have shadows\.

![\[Range step size set to 1.5.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/rendering/rendering-graphics-shadows-tuning-8.png)

The next example maintains the same settings but changes the range step to 2\.7\.

```
e_GsmRangeStep=2.7
```

This scales the cascades out again so that they fall just short of the furthest mountain in the distance\.

![\[Range step size set to 2.7.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/rendering/rendering-graphics-shadows-tuning-9.png)

The following example lowers the number of cascades from 6 to 5 but increases the range step to 3\.5\.

```
e_GsmLodsNum=5
e_GsmRange=3.0
e_GsmRangeStep=3.5
```

Because of the increase in range step, the reduced number of cascades covers approximately the same amount of terrain as in the previous example\. The area which was previously Cascade 5 \(light blue\) is now Cascade 4 \(pink\)\.

![\[Fewer cascades with a greater range step.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/rendering/rendering-graphics-shadows-tuning-10.png)

## Step 6: Enable Shadows Debug Mode<a name="rendering-graphics-shadows-tuning-enable-shadows-debug-mode"></a>

The `e_ShadowsDebug` debug mode, unlike the `e_ShadowsCascadesDebug` console variable presented earlier, shows you information about each cascade in individual windows in the viewport\. To enable shadows debug mode, enter the following command:

```
e_ShadowsDebug=1
```

The following image shows the viewport with shadows debug mode enabled\.

![\[Shadows debug mode enabled\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/rendering/rendering-graphics-shadows-tuning-11.png)

The following example in shadows debug mode uses the maximum number of cascades \(7\) but adjusts their reach by tuning the range step to 2\.25\.

```
e_ShadowsDebug=1
e_GsmLodsNum=7
e_GsmRange=3.0
e_GsmRangeStep=2.25
```

![\[Shadows debug mode with 7 cascades and a range step of 2.25.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/rendering/rendering-graphics-shadows-tuning-12.png)