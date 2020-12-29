# Using the Gradient Editor<a name="particle-gradient-editor"></a>

Use the **Gradient Editor** to apply color ranges to an emitter and configure additional subparameters\.

**To use the Gradient Editor**

1. In Lumberyard Editor, choose **Tools**, **Particle Editor**\.

1. In the **Libraries** panel, select an emitter\.

1. In the **Attributes** panel, under **Particles**, expand **Color**\.

1. Click the color swatch for the **Strength Over Emitter Lifetime** or **Strength Over Particle Lifetime** parameter\.  
![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/particles/particle-gradient-editor-2.png)

## Gradient Editor UI Options<a name="particle-gradient-editor-ui-options"></a>

The **Gradient Editor** includes the following:
+ **Location** – Sets the location value range from 0% – 100%\.
+ **Color** – Opens the **Color Picker**\.
+ **Gradient box** – Applies the combined gradient and alpha\.
+ Gradient viewport
  + The x\-axis represents the gradient generator of the color change over the full gradient\.
  + The y\-axis represents 0 – 100% alpha of the gradient color\.
+ **Default Library**, alpha curve – Provides alpha curves to use as a starting point\.
+ **Default Library**, gradient – Provides gradients to use as a starting point\.

## Working with Color Gradients<a name="particle-gradient-editor-gradient"></a>

When you select a gradient from the **Default Library**, it displays with the alpha curve in the **Gradient Editor** viewport\. You can do the following when selecting a gradient:

**To change the gradient color**
+ Click the triangle keyframes and select a new color from the **Color Picker**\.

**To add a color to the gradient**
+ Double\-click the X\-axis to generate a color keyframe\. The color in the color thumbnail is added to the gradient viewport\. Any adjustments you make to the gradient is reflected in the gradient viewport\.

**To display the RGBA values**
+ Pause on the color keyframe\.

**To delete a color keyframe**
+ Select the keyframe and press **Delete**\. The selected keyframe has an orange outline\.

**To adjust the alpha curve**
+ Click and drag the circle \(alpha keyframe\) in the gradient viewport\. Move the circle up \(towards 100%\) or down \(towards 0%\) to adjust the alpha percentage\. Moving the circle left or right adjusts the curve based on the curve endpoints\.

**To display the alpha curve context menu**
+ Right\-click the alpha curve keyframe\. The following options are available: **Delete selected keys**, **Create flat or linear curves**, **Adjust the in\-and\-out tangent of the curve to be linear or flat**, **Add a created curve to the library or preset list**, and **Reset the curve to defaults**\.

**To add an alpha key**
+ Double\-click the curve in the gradient viewport\.

**To delete an alpha key**
+ Select the circle key and press **Delete**\.

**To add a generated alpha curve to the preset list**
+ Click the **\+** button\.

**To add a generated gradient to the gradient preset list**
+ Click the **\+** button\.

**To delete a curve or gradient preset**
+ Right\-click the gradient or curve and click **Remove**\.