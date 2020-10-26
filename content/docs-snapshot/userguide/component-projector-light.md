# Projector Light<a name="component-projector-light"></a>

Use the **Projector Light** component on an entity to project a light\.

The **Projector Light** component has the following settings:

**Visible**  
Shows the light\.

**On initially**  
Specify if the light is on when created\.

## General Settings<a name="component-projector-light-general-settings"></a>

See the following general settings:

**Color**  
The color of the light\.  
Default value: 0xFFFFFFFF

**Diffuse multiplier**  
Sets the strength of the diffuse color\.  
Default value: 1

**Specular multiplier**  
Sets the strength of the specular brightness\.  
Default value: 1

**Ambient**  
If selected, light acts as a multiplier for cubemap values\.

## Project Light Settings<a name="component-projector-light-settings"></a>

See the following point light settings:

**Max Distance**  
Maximum distance that the projector light extends, in meters\.  
Default value: 5

**Attenuation bulb size**  
Radius before light begins to fade, in meters\.  
Default value: 0

**FOV**  
Projector light's field of view \(FOV\), in degrees\.  
Default value: 90

**Near plane**  
Distance of the near plane to the projector light, in meters\. Objects behind this plane are not affected by the projector light\. 

**Texture**  
Projector light's texture file\. Without a texture, light does not shine\.

**Material**  
Projector light's material file\.

## Options<a name="component-projector-light-options"></a>

See the following options:

**View distance multiplier**  
Adjusts the maximum view distance\. For example, **1\.0** uses the default and **1\.1** is 10% farther than the default\.  
Default value: 1

**Minimum spec**  
The minimum specification value at which this light is enabled\.  
Default value: Low

**Cast shadow spec**  
The minimum specification at which shadows are cast\.  
Default value: Never

**Voxel GI mode**  
Mode for light interaction with voxel global illumination \(GI\)\. Choose **None**, **Static**, or **Dynamic**\.

**Use VisAreas**  
Light is affected by visible areas\. If unselected, light ignores visible areas\.

**Indoor only**  
Light is only rendered indoors\.

**Affects this area only**  
Light affects only the immediate area\.

**Volumetric fog only**  
Light affects only volumetric fog\.

**Volumetric fog**  
Light affects volumetric fog and surrounding area\.

## Shadow Settings<a name="component-projector-light-shadow"></a>

See the following shadow settings:

**Terrain Shadows**  
Includes the terrain in the shadow casters for this light\.

## Animation<a name="component-projector-light-animation"></a>

See the following animation settings:

**Style**  
Enter a number to specify a preset light animation curve to play as defined in the `Light.cfx` file\. Valid values are **0** to **48**\. You can also use values **40** to **48** for testing and debugging\.  
Default value: 0 

**Speed**  
Multiple of the base animation rate\. For example, a value of **2\.0** causes an animation to play twice as fast\.  
Default value: 1

**Phase**  
Animation start offset from **0** to **1**\. A value of **0\.1** is 10% into the animation\.   
For example, you can use this setting to prevent lights in the same scene, with the same animation, from being animated in unison\.  
Default value: 0

## Additional Resources<a name="component-projector-light-additional-links"></a>
+ For more information about the **Projector Light** component, see the following:
  + [Intro to Environment Lighting](https://docs.aws.amazon.com/lumberyard/latest/userguide/enviro-lighting-intro.html)
  + [Getting Started: Using Lighting Tutorial \(video\)](https://www.youtube.com/watch?v=-KdwKZtzzo0)

## EBus Request Bus Interface<a name="component-projector-light-ebusrequest"></a>

Use the following request functions with the EBus interface to communicate with other components of your game\.

For more information about using the event bus \(EBus\) interface, see [Working with the Event Bus \(EBus\) system](ebus-intro.md)\.

All light components share common EBus functions\. For more information, see [Light Components EBus Request Bus Interface](component-area-light.md#component-light-ebusrequest)\.