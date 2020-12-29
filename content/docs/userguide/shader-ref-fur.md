# Fur Shader<a name="shader-ref-fur"></a>

Lumberyard's **Fur** shader renders fur in real time\. You can apply this shader to any mesh and adjust its properties to customize the fur's appearance and behavior\.

**Topics**
+ [Fur Combing](shader-ref-fur-combing.md)
+ [Fur Features](shader-ref-fur-features.md)
+ [Material Settings](shader-ref-fur-materialsettings.md)
+ [Fur Console Variables](shader-ref-fur-consolevariables.md)
+ [Maya – Fur Previsualization](shader-ref-fur-previzmaya.md)
+ [3DSMax – Fur Previsualization](shader-ref-fur-previz3dsmax.md)

To use the fur shader, create a new material and, from the **Shader** drop\-down, select **Fur**\. Apply this new material to your mesh object\.

![\[Creating a new fur shader material to apply to your mesh object.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/shaders/shader-ref-fur-1.png)

You set a [Fur Heightmap](shader-ref-fur-materialsettings.md) to define where fur appears, how it clumps together, and to provide non\-uniformity of strands across a mesh\. A fur heightmap is a grayscale texture, as shown in the following image\.

![\[Example fur heightmap texture.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/shaders/shader-ref-fur-2.png)

Brighter values at a UV result in longer fur at that point\. Under **Shader Params**, adjust **Fur Length \(cm\)** to modify the length of the fur\. The following image shows objects with different fur lengths\.

![\[Example fur material shaders with varying fur lengths.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/shaders/shader-ref-fur-3.png)