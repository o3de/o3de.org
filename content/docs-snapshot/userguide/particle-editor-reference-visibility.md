# Visibility Attribute<a name="particle-editor-reference-visibility"></a>

In the **Visibility** attribute, specify how to control the particle's visibility\.

![\[Visibility attributes in the Particle Editor.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/particles/particle-editor-visibility.png)


**Visibility Attribute Parameters**  

| Name | Description | 
| --- | --- | 
| Camera Non Facing Fade |  When enabled, this parameter adjusts the transparency of each particle based on its angle relative to the camera\. You can specify this parameter to fade out particles at sharp angles, which hides the appearance of thin polygons\. You can adjust the level of fade according to the angle with the **Fade Curve** tool\. Default value: false  | 
| View Distance Adjust | Multiplies the automatically computed fade\-out camera distance\. Valid values: `0`\+Default value: `1` | 
| Camera Min/Max Distance | Determines the camera range that particles render in\. A default value of 0 indicates an unlimited range\. Valid values: `0`\+Default value: `0` | 
| Camera Distance Offset | Offsets the emitter away from the camera\. Valid values: anyDefault value: `0`  | 
| Fade Strength Min/Max Distance | \(GPU only\) Specifies the distance from the camera at which particles fade\. [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/particle-editor-reference-visibility.html)Default value: `0`, `0` | 
| Sort Offset | Bias the distance used for sorting\. You can customize the sort order in an emitter tree\. By default, subemitters render in the order they are listed in the effect\. A bias of 0\.01 or greater overrides that order\. You can use larger biases to adjust the sorting order, with respect to other transparent objects in the level\. Valid values: anyDefault value: `0` | 
| Sort Bounds Scale | Specifies the emitter point for sorting\. `1` = bounds nearest \| `0` = origin \| `-1` = bounds farthestValid values: anyDefault value: `0`  | 
| Draw Near | Renders particles in a near first\-person space \(with weapons\)\. Default value: false  | 
| Draw on Top | Renders particles on top of everything \(no depth test\)\. Default value: false | 
| Visible Indoors | For use in vis areas\.[\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/particle-editor-reference-visibility.html) Default value: Both | 
| Visible Underwater | For use with ocean and water volumes\.[\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/particle-editor-reference-visibility.html) Default value: Both | 