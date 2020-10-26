# Using Container Types \(Arrays and Maps\)<a name="script-canvas-containers"></a>

Script Canvas has support for arrays and maps\.

## Arrays<a name="script-canvas-containers-arrays"></a>

Arrays provide a dynamic continuous area of memory that can hold storage of a given type\.

**To create an array variable**

1. In the **Variable Manager**, do one of the following:
   + Click **Create Variable**, and then click **Array**\.

   or
   + In the **Variable Type** search box, type **Array**, and then click **Array**\.  
![\[Creating an array variable in Script Canvas.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-containers-1.png)

1. Enter information to create your array, and then click **Create**\.  
![\[Enter information to create your array.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/shared-script-canvas-containers-2.png)
   + For **Variable Name**, enter the name for your array variable\.
   + For **Container Type**, use **Array**\.
   + For **Type**, choose the data type for the array\.
   + \(Optional\) To pin the array to the list of variables in the **Variable Manager**, select **Pin To Variable List**\. Then, when you click **Create Variable**, the array appears in the list as **Array<*data\_type*>**\. This is useful when you reuse the same type frequently\.  
![\[Array variable pinned to the variable list in Variable Manager.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-containers-3.png)

### Array Pin Icons<a name="script-canvas-containers-array-pin-icons"></a>

Some nodes, like **OnEntitiesSpawned** or **Get String Array**, provide data as arrays\. The data pins for the arrays on such nodes have a square icon\. The color of the icon shows the data type for the array\.

![\[Array data pins color-coded by data type.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-containers-4.png)

### Array Operation Nodes<a name="script-canvas-containers-array-operation-nodes"></a>

In the **Node Palette**, the **Containers** section has nodes that you can use to add, get, and remove elements from arrays\.

![\[Container node operations.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-containers-5.png)
+ **Add Element at End** – Adds the element at the end of the container\.
+ **Clear All Elements** – Removes all elements from the container\.
+ **Erase** – Erases the element at the specified index or key\.
+ **For Each** – Iterates through each element of a container\.
+ **Get Element** – Returns the element at the specified index or key\.
+ **Get First Element** – Returns the first element in the container\.
+ **Get Last Element** – Returns the last element in the container\.
+ **Get Size** – Returns the number of elements in the container\.
+ **Insert** – Inserts an element into the container at the specified index or key\.
+ **Is Empty** – Returns whether the container is empty\.

All container operation nodes have an **In** pin and a **Source** pin\.

All pins have an **Out** pin except **For Each**, which has an **Each** pin that is signalled after each element in the container\. The **For Each** node also has a **Break** pin and a **Finished** pin\. The **Break** pin stops the iteration when signalled\. The **Finished** pin is signalled when all of the elements in the container have been iterated over or the iteration is stopped by the **Break** pin\.

![\[For Each node connection pins.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-containers-6.png)

#### Automatic Data Pin Typing<a name="script-canvas-containers-automatic-data-pin-typing"></a>

The pins on container operation are context\-sensitive\. Data input and output pins automatically take on the data type of the pin to which they are connected\.

**Example**  
In the following example, the array type is `string`\.  

![\[Connecting a Get container node to a container operation node.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-containers-7.png)
When you connect the **Array<String>** pin to the **Source** pin on the **Add Element at End** node, the following changes occur automatically:  
+ The **Source** pin changes to the `string` type\.
+ The **Add Element at End** node box expands to include a **String** text box where you can enter a string value\.
+ The pin icon and line colors change to the color of the data type that you are using \(in the case of this example, blue\)\.
+ A **Container** pin for chaining output appears on the target node\.

![\[Example of automatic data pin typing.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-containers-8.png)

#### Chaining Array Operation Nodes<a name="script-canvas-containers-chaining-array-operation-nodes"></a>

Array operation nodes typically have a **Container** output pin\. You can use this output pin to chain several operations on the same array, as the following image shows\.

![\[Chained array operation nodes.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-containers-9.png)

## Maps<a name="script-canvas-containers-maps"></a>

Maps are containers of key\-value pairs\. Maps in the **Variable Manager** have a small split rectangular icon\.

![\[A map variable in the Script Canvas Variable Manager.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-containers-10.png)

**To create a map variable**

1. In the **Variable Manager**, do one of the following:
   + Click **Create Variable**, and then click **Map**\.

   or
   + In the **Variable Type** search box, type **Map**, and then click **Map**\.  
![\[Creating a map variable in Script Canvas.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-containers-11.png)

1. Enter information to create your map, and then click **Create**\.  
![\[Enter information to create a key-value pair map.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/shared-script-canvas-containers-12.png)
   + For **Variable Name**, enter the name for your map variable\.
   + For **Container Type**, use **Map**\.
   + For **Key**, choose a data type for the key\.
   + For **Value**, choose a data type for the value\.
   + \(Optional\) To pin the map to the list of variables in the **Variable Manager**, select **Pin To Variable List**\. Then, when you click **Create Variable**, the map appears in the list as **Map<*key\_data\_type*,*value\_data\_type*>**\. This is useful when you reuse the same key pair combination frequently\.  
![\[A map variable pinned to the variable list in the Variable Manager.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-containers-13.png)

### Map Pin Icons<a name="script-canvas-containers-map-pin-icons"></a>

You can use **Get** or **Set** nodes to get values from a map or make changes to the map\. The data pins for the maps have square icons with two colors\. One color represents the data type for the key, the other for the value\.

![\[Dual-color map data pin icons.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-containers-14.png)

### Map Operation Nodes, Data Pin Typing, and Chaining<a name="script-canvas-containers-map-operation-nodes-data-pin-typing-and-chaining"></a>

Maps use the same container operation nodes as arrays\. As with arrays, data pins automatically take on the data types of the map to which they are connected, as the following image shows\.

![\[Container operations for maps.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-containers-15.png)

As with arrays, maps provide a data output pin that you can use to chain operations on the same map\.

![\[Chained map operations.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-containers-16.png)