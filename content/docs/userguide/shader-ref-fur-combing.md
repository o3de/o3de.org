# Fur Combing<a name="shader-ref-fur-combing"></a>

You can apply fur to any mesh\. But by authoring your meshes specifically for fur, you can achieve a more controlled look\. 

![\[Example of applying shader generation parameters to a mesh object.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/shaders/shader-ref-fur-4.png)

To use fur combing, in **Shader Generation Params**, enable **Fur Color Data**\. With this parameter enabled, the engine uses the mesh's vertex color to control the fur direction and length\. The RGB channels correspond to an XYZ combing direction, and the alpha channel scales the fur length\.

For example, a material might have a vertex color of `1`, `0.5`, `0.5`, `0.25` \(X, Y, Z, alpha\)\. These values specify that the fur combs in the positive X direction\. The alpha channel, set at `0.25`, defines the fur length at that vertex as one fourth of the value specified in the material's **Fur Length \(cm\)**\.

Lumberyard provides shaders for [Maya](shader-ref-fur-previzmaya.md) and [3DSMax](shader-ref-fur-previz3dsmax.md)\. These shaders simplify the process of specifying the vertex color data on your mesh\. 

For information on how to use these shaders, see the following topics:
+ [Maya – Fur Previsualization](shader-ref-fur-previzmaya.md)
+ [3DSMax – Fur Previsualization](shader-ref-fur-previz3dsmax.md)