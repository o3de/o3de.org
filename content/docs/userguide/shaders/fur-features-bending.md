---
description: ' Use bending for fur materials in Amazon Lumberyard. '
title: Bending
---
# Bending {#shader-ref-fur-features-bending}

In addition to fur combing by vertex normal, Lumberyard provides three additional types of bending: **Wind Bending**, **Gravity Bending**, and **Motion Bending**\. You can control the strength of the bending by adjusting the [Material Parameter](/docs/userguide/shaders/fur-materialsettings.md) **Stiffness**\. This parameter specifies the amount to which the fur is resistant to change\.

## Gravity Bending {#shader-ref-fur-features-bending-gravity}

Gravity bending is controlled by adjusting the [shader parameter](/docs/userguide/shaders/fur-materialsettings.md) **Fur Maximum Gravity**\. Gravity is applied most where the fur sprouts away from the world's surface\. It is also applied more strongly to the ends of the fur pieces\.

For example, the following image shows a fur ball with a very low gravity applied\. The second image shows the same fur ball with a higher maximum gravity applied\.

![\[Example fur sphere with high maximum gravity applied.\]](/images/userguide/shaders/shader-ref-fur-11.png)

![\[Example fur object with low gravity applied.\]](/images/userguide/shaders/shader-ref-fur-12.png)