# Material Variables<a name="script-canvas-variable-material-node"></a>

When you use a node such as **[Find by Name](material-find-by-name-node.md)**, **[Load by Name](material-load-by-name-node.md)**, or **[Clone](material-clone-node.md)**, the script can only use the material for that one frame\. After the frame, the material is then invalid\. If you want to reuse the material in your script, you can store the material in a **Variable Material** node\. You can also use this node when you want to find or load a material only once when the game starts\.

For more information about creating variable nodes, see [Managing Script Canvas Variables](script-canvas-managing-variables.md)\.

**Note**  
To use a material variable node, you must assign the variable to a valid material with a node such as **[Find by Name](material-find-by-name-node.md)**, **[Load by Name](material-load-by-name-node.md)**, or **[Clone](material-clone-node.md)**\.

**Contents**
+ [Get Material Variable Node](#get-material-variable-node)
  + [Inputs](#script-canvas-variable-get-material-node-input)
  + [Outputs](#script-canvas-variable-get-material-node-output)
+ [Set Material Variable Node](#set-material-variable-node)
  + [Inputs](#script-canvas-variable-set-material-node-input)
  + [Outputs](#script-canvas-variable-set-material-node-output)
+ [Material Variable Node Example](#script-canvas-variable-material-example)

## Get Material Variable Node<a name="get-material-variable-node"></a>

![\[getmaterialvariablenode, variablematerial, materialvariable\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-get-material-variable-node.png)

### Inputs<a name="script-canvas-variable-get-material-node-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 

### Outputs<a name="script-canvas-variable-get-material-node-output"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event |  Sends when the node is finished\.  | 
| Material |  Material  |  Sends the variable's current material\.  | 

## Set Material Variable Node<a name="set-material-variable-node"></a>

![\[setmaterialvariablenode, variablematerial, materialvariable\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-set-material-variable-node.png)

### Inputs<a name="script-canvas-variable-set-material-node-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 
| Material | Material | Sets the variable's current material\. | 

### Outputs<a name="script-canvas-variable-set-material-node-output"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event |  Sends when the node is finished\.  | 

## Material Variable Node Example<a name="script-canvas-variable-material-example"></a>

The following example uses a material variable node to make a material flash red\.

1. The **Variable Manager** defines a variable material node named *MyMaterial*\.

1. The **[Load by Name](material-load-by-name-node.md)** node specifies the `materials/gettingstartedmaterials/grid` material file and the result of the node is stored in a variable with a **Set MyMaterial** node\.

1. Every 0\.5 seconds, the **Get MyMaterial** node uses the variable with the **[Set Param Color](script-canvas-material-set-param-color-node.md)** node to change the material's **diffuse** parameter from red to white\.

![\[Example Script Canvas editor script that uses the variable material node.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-material-variable-node-example.png)

**Example**  
One entity has the `primitive_cylinder.cfg` mesh and the other entity has the `primitive_sphere.cfg` mesh\. Both entities share the same `grid.mtl` material file\. When the Script Canvas graph runs, it changes the appearance of every entity that has this material applied\.  

![\[Example Script Canvas editor script that uses the variable material node to change the color of the object\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-material-variable-node-example-3.gif)