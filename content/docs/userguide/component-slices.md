# Working with Slices<a name="component-slices"></a>

A slice is a collection of configured [entities](component-intro.md) that is stored as a single unit in a reusable asset\. You can use slices to conveniently group entities and other slices for reuse\. Slices are similar to [prefabs](https://docs.aws.amazon.com/lumberyard/latest/legacyreference/entities-prefabs-intro.html) but are part of the new component entity system\. Slices can contain component entities, whereas prefabs cannot\. Unlike prefabs, slices can be nested into a fully cascading hierarchy\. For example, a level, a house, a car, and an entire world are all slices that depend on \(cascade\) from a number of other slices\.

You can generate a slice asset that contains any number of entities that you have placed and configured\. These entities can have arbitrary relationships\. For example, they can exist in a parent/child transform hierarchy, although this is not required\.

A slice can contain instances of other slices\. Modifications of a slice instance within another slice causes the changes to be stored in the instance as overrides \(in the form of a data differential or delta\)\. The modifications stored can be changes such as entity additions, entity removals, or component property changes\. 

When you build a level, you place certain items repeatedly, such as a prop, furniture, or a piece of landscaping\. To create multiples of an item, you could copy and paste it throughout your level\. Doing this would result in each item having its own independent properties\. If you wanted to change one property, such as making all the motorbikes blue instead of red, you would have to modify each one\. This is time consuming and inefficient\.

With Lumberyard's slices, you can modify one instance of the item and then save that change to all the other instances of your item within the game project\. Saving changes to the other instances is not an automatic process\. This means that you can modify a slice instance and then not save the changes\. This makes that instance unique\. You can also detach a slice instance so that it does not inherit saved modifications\. That detached slice instance becomes a regular entity with individual properties\.

Slices contain entities, including their components and properties, and may also contain instances of other slices\. This ability to nest slices without flattening the hierarchy is a feature unique to Lumberyard\. 

Slices are saved as `.slice` files within your game project directory\.

**Example**  
In the **Entity Outliner**, you can identify different entities by their icon and color\.  

![\[Slices in the Entity Outliner.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/shared-working_with_slices.png)<a name="identify-slices"></a>


****  

| Icon | Description | 
| --- | --- | 
|  ![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/entity-outliner-standalone-entity.png)  |  Entities that are white are standalone\. They are not part of a slice instance\.  | 
|  ![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/entity-outliner-source-slice.png)   | Entities that are blue are part of a slice instance\. | 
| ![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/entity-outliner-hierarchy-slices.png)  | Entities with lines indicate a hierarchy with a parent and child\. In this example, the parent and child entities are part of a slice instance\. | 
|  ![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/entity-outliner-override-slice.png)  |  Entities that are orange have overrides, which means they have different component property values than the source slice\.  | 
|  ![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/entity-outliner-dot-parent-slice.png)  | Parent entities that appear with a dot indicate that a child entity has an override\. In this example, the **DoorWay\_Parent** entity has three children, which each have overrides\. | 
|  ![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/entity-outliner-source-slices-hierarchy.png)  |  Entities that are shaded are the slice roots\. In this example, the **TimerParent** entity and its grandchildren are slice roots\.  | 

**Topics**
+ [Anatomy of a Slice](dynamic-slices-overview-anatomy.md)
+ [Creating a Slice](component-slices-creating.md)
+ [Instantiating a Slice](component-instantiating-slice.md)
+ [Creating Nested Slices](component-inheriting-slice.md)
+ [Modifying a Slice and Saving Changes](component-slice-push-changes.md)
+ [Detaching Entities and Slice Instances](component-slice-detaching.md)
+ [Reverting and Forcing Overrides](component-slice-override.md)
+ [Slice Reloading](component-slice-reloading.md)
+ [Working with Dynamic Slices](dynamic-slices-what-is.md)
+ [Slice Favorites](component-slice-favorites.md)
+ [Converting Slices with the Slice Upgrade Pipeline](component-slice-upgrade-process.md)

The sections in this chapter use the following terminology to describe working with slices\.

**Source Slice**  
The source slice is the `.slice` asset that is saved in the game project directory when you create a slice\.

**Owning Slice**  
Entities in a slice instance originate from an owning slice\. For example, a tire entity from an instance of `wheel.slice` is owned by `wheel.slice`\. Slices automatically pass down changes to any slice instance entities that they own\. For example, say that you update the material reference on a tire entity that is owned by a `wheel.slice` instance\. When you push that change to the source `wheel.slice`, Lumberyard updates all other tire entities of `wheel.slice`\.  
Entities can have more than one owning slice\. To continue the example, `motorcycle.slice` owns two instances of `wheel.slice`\. The tire entity within the two `wheel.slice` instances, which is within `motorcycle.slice`, inherits from both the wheel slice and the motorcycle slice\.

**Slice Instance**  
A slice instance is a distinct instantiation of a source slice\. The slice instance inherits entities and properties from its source slice \(the `.slice` file\) and is updated when the source slice changes\.  
You can modify one slice instance\. To apply those modifications to all instances of the source slice, you can save the changes to the source slice asset\.  
When you work with one instance of a slice, those changes are exclusive to that slice until you push the changes to the source slice\.

**Slice Entity**  
Entities that are owned by a slice are called slice entities\. A slice entity inherits from its source slice\. The **Entity Outliner** distinguishes slice entities from non\-slice entities by color\. Slice entities are blue, and non\-slice entities are white\.

**Saving Slice Overrides**  
Saving slice overrides means to commit entity modifications from an instance to a source slice\. When you use the **Save slice overrides** command, Lumberyard prompts you to choose which modifications or overrides to save\. For a nested slice, you can also choose which slice in the hierarchy receives the overrides\.  
After you save overrides, Lumberyard automatically updates all instances of that slice\. If any of those slice instances have unsaved overrides or modifications, it does not accept updates to those overrides\. You can revert a slice's entities and properties to resync to the source slice\.   
For more information, see [Modifying a Slice and Saving Changes](component-slice-push-changes.md)\.  
Lumberyard does not save the **Translate** value in the **Transform** component to the slice\. This value determines an entity's position in the level and as such is excluded from affecting other slice instances\.

**Overriding**  
Changing any part of a slice, such as adding a component or modifying a property, results in an override or modification\. This means that the slice instance is different from the source slice\. Overrides to component properties are marked in a bold orange font in the **Entity Inspector** to distinguish it from properties that haven't changed\.  
If you save those overrides, they are saved to all the slice instances\. This means they are no longer overrides and the font returns to normal\. Overrides that you don't save to the slice are maintained for that instance even when other changes are received from the source slice\.  
You can also force an override for a property that you haven't yet modified, as well as revert overrides to an entity, component, or property\.   
For more information, see [Reverting and Forcing Overrides](component-slice-override.md)\.

**Detaching**  
You can detach an entity within a slice\. This removes it from that slice instance, and that entity no longer receives updates when changes are saved to the source slice\.  
You can also detach any slice instance\. This means that it no longer receives any changes saved to the slice\.  
For more information, see [Detaching Entities and Slice Instances](component-slice-detaching.md)\. 

**Nesting**  
When a slice instance is nested, that means that it is a child of another slice instance\.  
If you push a nested slice instance to its parent's source slice, then the nested slice instance inherits from both its original source slice and any source slices that own its parents\.  
A nested slice instance shares a transform hierarchy with its parent\. For more information, see **Transform Hierarchy**\.

**Inheriting**  
Slice instances inherit data from all source slices in their hierarchy\. When a slice instance inherits from multiple source slices, inheritance priority occurs from top to bottom in the outliner hierarchy\.  
A slice instance can lose its inheritance\. If you modify a slice instance and then don't save those changes to the source slice, that slice instance loses its inheritance\. To restore the inheritance, you must either reset the slice instance or save the changes\.

**Transform Hierarchy**  
A transform hierarchy defines movement, rotation, and scaling of entities in both the editor and at run time\. A child entity shares the transform data of its parent\. This means that you can move, rotate, or scale a parent, and its children always follow\. You can, however, move, rotate, and scale a child independent of its parent\.

**Slice Hierarchy**  
A slice hierarchy defines a slice instance's relationship to its source slices\. An entity inside of a nested slice can potentially inherit from multiple source slices\. When this happens, slice data at the top of the slice hierarchy overrides slice data at the bottom of that hierarchy\.

**Data Patch**  
Generically speaking, a data patch captures the difference between two serializable objects, such that when you take the first object and apply the patch, you get the second object as a result\. With respect to slices, when you edit an instance of a slice in the Editor and create an override, a data patch is generated and saved to a slice file\. A data patch stored in a slice preserves the information needed to modify the source slice to create a slice with overrides\. This may be as simple as changing a value in a field, or something more complex such as adding or removing components or entire entities\.