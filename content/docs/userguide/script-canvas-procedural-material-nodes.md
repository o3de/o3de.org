# Procedural Material Nodes<a name="script-canvas-procedural-material-nodes"></a>

Lumberyard supports [Allegorithmic Substance](https://www.allegorithmic.com/) for working with procedurally\-generated materials\. Procedural materials are materials in which you can modify their textures during runtime\.

You can use the Allegorithmic Substance Designer to author procedural materials and then import them into Lumberyard Editor\. You can then use the **Script Canvas** editor or Lua to modify the procedural material's textures at runtime\. 

To enable this feature, you must enable the Allegorithmic Substance gem\. For more information, see [Add modular features and assets with Gems](gems-system-gems.md)\.

For more information, see [Working with Substances](mat-substances.md) and [Lumberyard Substance Integration](https://aws.amazon.com/blogs/gametech/lumberyard-substance-integration)\.

**To work with procedural materials in scripts**

1. **Reference the procedural material file**

   To reference the procedural material, use the **[Find by Name](find-by-name-procedural-material-node.md)** or **[Find by Name and Index](find-by-name-and-index-node.md)** node\.

1. **Modify the parameter values for the procedural material**

   Use the **Set Input <Type>** nodes to modify the parameter values for the procedural material\. The values that you specify in the nodes modify the parameters that update the procedural material's textures\. You can modify parameters for multiple procedural materials in a single frame\. 
**Note**  
*Input parameters* are the parameters that you modify for the procedural material\. You can find the parameters for a material in the **Substance Editor**\. For example, the sample procedural material `brickWall_04` has input parameters such as **Age**, **Mortar**, and **Depth**\.   
To modify these input parameters during runtime, specify the parameter name and its value in a node such as **[Set Input Number](set-input-number-node.md)**\.

1. **Render the procedural materials**

   After you specify the changes that you want, use the **[Render Asynchronous](render-asynchronous-node.md)** or **[Render Synchronous](render-synchronous-node.md)** node to update the procedural material's texture\. The render node applies to all procedural materials in which their parameters have changed, so at most, call a render node once per frame\.

**Example**  
The Allegorithmic Substance gem includes a sample procedural material named `brickWall_04`\. You can import this file into Lumberyard and write a script that dynamically changes the **Age** and **Mortar** input parameter values, so that the wall appears to erode over time\. <a name="example-brick-wall-render-asynchronous-script"></a>

See the following example script to enable this effect\.

![\[Example Script Canvas script that shows the erosion for a brick wall.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-procedural-material-example.png)

1. The **Find by Name and Index** node \(1\) retrieves the `brickWall_04` procedural material and sends the material to all **Set Input Number** nodes \(3, 4, 6, 7\)\.

1. The **Duration** node \(2\) runs the aging process for four seconds through the **Out** pin, which is triggered every frame\. The node finalizes the aging process through the **Done** pin\.

1. The first **Set Input Number** node \(3\) transitions the **Age** parameter from `0` to `0.5` over four seconds\. 

1. The second **Set Input Number** node \(4\) transitions the **Mortar** parameter from `0` to `1` over four seconds\.

1. The **Render Asynchronous** node \(5\) applies these changes to the procedural material's textures\.

1. For the **Duration** node \(2\), the **Done** pin triggers one last update with the final **Age** value of `0.5` \(node 6\) and the **Mortar** value of `1.0` \(node 7\)\.

1. With the **Force** parameter enabled, the **Render Asynchronous** node \(8\) applies these changes to the procedural material's textures\.
**Note**  
Steps 6 and 7 are not always required, but are examples of how you can use the **Render Asynchronous** node's **Force** parameter to guarantee that a final update is applied\. For more information, see **[Render Asynchronous](render-asynchronous-node.md)**\.

**Topics**
+ [Find by Name](find-by-name-procedural-material-node.md)
+ [Find by Name and Index](find-by-name-and-index-node.md)
+ [Get Input Color](get-input-color-node.md)
+ [Get Input Number](get-input-number-node.md)
+ [Get Input String](get-input-string-node.md)
+ [Get Input Vector2](get-input-vector2-node.md)
+ [Get Input Vector3](get-input-vector3-node.md)
+ [Get Input Vector4](get-input-vector4-node.md)
+ [On Render Finished](on-render-finished-node.md)
+ [Render Asynchronous](render-asynchronous-node.md)
+ [Render Synchronous](render-synchronous-node.md)
+ [Set Input Color](set-input-color-node.md)
+ [Set Input Number](set-input-number-node.md)
+ [Set Input String](set-input-string-node.md)
+ [Set Input Vector2](set-input-vector2-node.md)
+ [Set Input Vector3](set-input-vector3-node.md)
+ [Set Input Vector4](set-input-vector4-node.md)