# Bending<a name="shader-ref-fur-features-bending"></a>

In addition to fur combing by vertex normal, Lumberyard provides three additional types of bending: **Wind Bending**, **Gravity Bending**, and **Motion Bending**\. You can control the strength of the bending by adjusting the [Material Parameter](shader-ref-fur-materialsettings.md) **Stiffness**\. This parameter specifies the amount to which the fur is resistant to change\.

## Gravity Bending<a name="shader-ref-fur-features-bending-gravity"></a>

Gravity bending is controlled by adjusting the [shader parameter](shader-ref-fur-materialsettings.md) **Fur Maximum Gravity**\. Gravity is applied most where the fur sprouts away from the world's surface\. It is also applied more strongly to the ends of the fur pieces\.

For example, the following image shows a fur ball with a very low gravity applied\. The second image shows the same fur ball with a higher maximum gravity applied\.

![\[Example fur sphere with high maximum gravity applied.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/shaders/shader-ref-fur-11.png)

![\[Example fur object with low gravity applied.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/shaders/shader-ref-fur-12.png)