# Particle Emitter<a name="ui-editor-components-visual-particle-emitter"></a>

You can use a **Particle Emitter** component to emit two\-dimensional particles from an element\.

**To see in\-game examples of completed canvases with a **Particle Emitter** component**

1. In Lumberyard Editor, in the [Samples Project](sample-project-samples.md), open the UiFeatures level\.

1. Press **Ctrl\+G** to play the game and then choose in order **Components**, **Visual Components**, and **Particle Emitter**\. 

   You can view particle emitter examples that create a variety of spark effects and trail effects\.

1. Press **Esc** to exit the game\.

To view these same canvases in the **UI Editor**, navigate to the `lumberyard_version\dev\Gems\LyShineExamples\Assets\UI\Canvases\LyShineExamples\Comp\ParticleEmitter` directory\.

You can open the following canvases:
+ `ParticleEmitter.uicanvas`
+ `ParticleEmitterSparks.uicanvas`
+ `ParticleEmitterTrails.uicanvas`

Use the **Properties** pane of the [UI Editor](https://docs.aws.amazon.com/lumberyard/latest/userguide/ui-editor-using.html) to configure the following settings for the **Particle Emitter** component\.


**Emitter Settings**  

| Name | Description | 
| --- | --- | 
| Emit on activate | Start emitting when the component is activated\. | 
| Hit particle count on activate | Emit and process the average number of particles when the emitter starts emitting\. | 
| Infinite life time | Make the lifetime of the emitter infinite\. | 
| Emitter life time | Enter the number of seconds that the emitter is active during\. When the end of the lifetime is reached, the emitter stops emitting\. This option is available when Infinite life time isn't set\. | 
| Emit rate | Enter the number of particles to emit per second\. | 
| Emitter shape |  Select one of the following: [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/ui-editor-components-visual-particle-emitter.html)  | 
| Particle count limit | Use the Active particle limit value to limit the number of active particles\. | 
| Active particles limit | This option is available when Particle Count Limit is set\. Type the maximum number of active particles\. When the maximum number is reached, additional particles are emitted only after existing particles are removed\. The maximum value is 9999\. | 
| Fixed random seed | Specify a fixed random seed for the emitter\. When not selected, a random seed is generated each time the emitter starts emitting\. | 
| Random seed | This option is available when Fixed random seed is set\. Enter the numerical seed to use for the particle emitter when Fixed random seed is selected\. The field accepts a maximum nine\-digit negative or positive integer\. | 
| Emit on edge | This option is available when Emitter shape is Circle or Quad\. Emit particles on the edge of the specified shape\. | 
| Emit inside distance | This option is available when Emit on Edge is set\. Enter the distance inside the edge that the particles are emitted from\. | 
| Emit outside distance | Type the distance outside the edge that the particles are emitted from\. | 
| Initial direction type |  This option is available when **Emitter shape** is **Circle** or **Quad**\. Select one of the following to specify how the initial direction is calculated: [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/ui-editor-components-visual-particle-emitter.html)  | 
| Emit angle | Enter the number of degrees vertical that particles are emitted from\. | 
| Emit angle variation | Enter a number or use the slider to specify, in degrees, the variation of the emit angle\. Valid values are from 0 through 180\. A value of 10 specifies a variation range of plus or minus 10 degrees\. | 


**Particle Settings**  

| Name | Description | 
| --- | --- | 
| Infinite life time | Make the particle lifetime infinite\. | 
| Life time | Enter the number of seconds that the emitted particles are initially active during\. | 
| Life time variation | Enter the number of seconds that the lifetime of the emitted particles can vary\. | 
| Sprite pathname | Click the ellipsis \(\.\.\.\) to open the Pick Texture dialog box and select a sprite image file\. | 
| Animated sprite sheet | This option is available when the selected sprite is a sprite sheet \(has more than one cell\)\. Select to change the sprite sheet cell index on each particle over time\. | 
| Loop sprite sheet animation | This option is available when Animated sprite sheet is set\. Select to loop the sprite sheet cell animation\. | 
| Random sprite sheet index | This option is available when the selected sprite is a sprite sheet \(has more than one cell\)\. Select to randomly choose the initial sprite sheet cell index\. | 
| Sprite sheet index | This option is available when the selected sprite is a sprite sheet \(has more than one cell\) and Random sprite sheet index isn't set\. Select the sprite sheet index that is used for the emitted particles\. | 
| Sprite sheet start frame | This option is available when the selected sprite is a sprite sheet \(has more than one cell\) and Random sprite sheet index is set\. Select the starting frame of the sprite sheet range for sprite sheet animation or randomly choosing the index\. | 
| Sprite sheet end frame | This option is available when the selected sprite is a sprite sheet \(has more than one cell\) and Random sprite sheet index is set\. Sets the end frame of the sprite sheet range for sprite sheet animation or randomly choosing the index\. | 
| Sprite sheet frame delay | This option is available when Animated sprite sheet is set\. Type the number of seconds of delay between each sprite sheet frame\. | 
| Blend mode |  Select one of the following: [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/ui-editor-components-visual-particle-emitter.html)  | 


**Particle Movement**  

| Name | Description | 
| --- | --- | 
| Relative to emitter | Move particles relative to the element to which the Particle Emitter component is attached\. When this option isn't selected, the element leaves a trail of particles as the emitter moves around the canvas\. | 
| Movement co\-ordinate type |  Select the type of coordinate space for particle movement: [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/ui-editor-components-visual-particle-emitter.html)  | 
| Speed | This option is available when Movement co\-ordinate type is set to Cartesian\. Enter a number that specifies the initial speed of the emitted particles when the emit direction is calculated\. | 
| Speed variation | This option is available when Movement co\-ordinate type is set to Cartesian\. Enter a number that specifies the variation in initial speed of the emitted particles when the emit direction is calculated\. | 
| Initial velocity | This option is available when Movement co\-ordinate type is set to Polar\. Enter X and Y values that specify the initial velocity of the emitted particles\. | 
| Initial velocity variation | This option is available when Movement co\-ordinate type is set to Polar\. Enter X and Y values that specify the variation in the initial velocity of the emitted particles\. | 
| Acceleration co\-ordinate type |  Select the type of coordinate space that is used for particle acceleration: [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/ui-editor-components-visual-particle-emitter.html)  | 
| Acceleration | Enter X and Y values that specify the acceleration of each emitted particle\. | 
| Orientation velocity based | Point the top of each particle toward the current velocity vector\. | 
| Initial orientation velocity based | Point the top of each particle toward the initial velocity vector\. | 
| Initial rotation | Enter the number of degrees of the initial rotation clockwise from vertical\. | 
| Initial rotation variation | Enter the number of degrees in the variation of the initial rotation\. A value of 10 specifies a variation range of plus or minus 10 degrees around the specified initial rotation\. | 
| Rotation speed | Enter the rotation speed in degrees clockwise per second\. | 
| Rotation speed variation | Type the variation in rotation speed in degrees clockwise per second\. A value of 10 specifies a variation range of plus or minus 10 degrees in the specified rotation speed\. | 


**Particle Size**  

| Name | Description | 
| --- | --- | 
| Lock aspect ratio | Locks the width and height of the emitted particles into the current aspect ratio\. | 
| Pivot | Enter X and Y values that specify the pivot for the particles from \(0,0\) at the top left to \(1,1\) at the bottom right\. | 
| Size | Enter X and Y values that specify the size of each emitted particle\. | 
| Size variation | Enter X and Y values that specify the variation in size of each emitted particle\. | 


**Particle Color**  

| Name | Description | 
| --- | --- | 
| Color | Enter RGB values that specify the color of each emitted particle or click the white square to use the Select Color dialog box\. | 
| Color brightness variation | Enter a decimal number between 0 and 1 that specifies the variation in brightness of each emitted particle\. | 
| Color tint variation | Enter a decimal number between 0 and 1 that specifies the tint variation of each emitted particle\. | 
| Alpha | Enter a decimal number between 0 and 1 that specifies the alpha that is used for the emitted particles\. | 


**Timelines**  

| Name | Description | 
| --- | --- | 
| Speed multiplier | Click the plus sign \(\+\) to add keyframes that control a curve to multiply the particle speed over its lifetime\. | 
| Width multiplier |  This option is available when **Lock aspect ratio** \(in **Particle Size**\) isn't set\.  Click the plus sign \(**\+**\) to add keyframes that control a curve to multiply the particle width over its lifetime\.  | 
| Height multiplier |  This option is available when **Lock aspect ratio** \(in **Particle Size**\) isn't set\.  Click the plus sign \(**\+**\) to add keyframes that control a curve to multiply the particle height over its lifetime\.  | 
| Size multiplier | Click the plus sign \(\+\) to add keyframes that control a curve to multiply the particle size over its lifetime\. | 
| Color multiplier | Click the plus sign \(\+\) to add keyframes that control a curve to multiply the particle color over its lifetime\. | 
| Alpha multiplier | Click the plus sign \(\+\) to add keyframes that control a curve to multiply the particle alpha over its lifetime\. | 
| Time |  Enter a value between `0` and `1` that specifies when the keyframe occurs during the particle lifetime\.  A value of `0` is the start of the particle lifetime and `1` is the end of the particle lifetime\.  | 
| Multiplier |  Specify a value from `-100` through `100` to multiply against the value that this timeline controls\.  For example, if the speed value is `50.0` and the speed multiplier for a specific keyframe is `2.0`, the value of speed at the specified keyframe is `100`\.  | 
| In tangent |  Controls the in tangent for the current keyframe\. Select one of the following:  [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/ui-editor-components-visual-particle-emitter.html)  | 
| Out tangent |  Controls the out tangent for the current keyframe\. Select one of the following:  [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/ui-editor-components-visual-particle-emitter.html)  | 
| Ease In |  Specifies a gradual approach of a curve to a flat tangent\.  For example, a keyframe that specifies **Ease In** for **In tangent** and **Ease Out** for **Out tangent** looks like the flattened tangent of an x3 \(x\-cubed\) curve at its origin\.  | 
| Ease Out |  Specifies a gradual retreat of a curve from a flat tangent\.  For example, a keyframe that specifies **Ease In** for **In tangent** and **Ease Out** for **Out tangent** looks like the flattened tangent of an x3 \(x\-cubed\) curve at its origin\.  | 
| Linear | Specifies that the curve moves linearly from the keyframe towards the next or previous keyframe\. | 
| Step | Specifies that the curve jumps from the current keyframe value to the next or previous keyframe value\. | 