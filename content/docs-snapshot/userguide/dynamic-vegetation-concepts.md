# Dynamic Vegetation Concepts<a name="dynamic-vegetation-concepts"></a>

The dynamic vegetation system operates around the following ideas:
+ **What** – To specify the type of vegetation that appears, you must have prebuilt vegetation assets, such as `.cgf` or `.fbx` files\. If you don't have your own, you can use Lumberyard's vegetation assets, which are in the Starter Game project\.
+ **Where** – You can create small patches of flowers or populate a massive area with convincing varieties of plants and objects\. To do this, use local area clusters in the foreground layer or coverage areas in the background layers, respectively\.

  Using vegetation filters, you can set up rules that specify the surface angles, altitudes, distances from objects, and surface types where vegetation grows\. 

  Vegetation blockers block out areas of vegetation\. For example, to create a border free of vegetation around a house, use a vegetation blocker that is slightly larger than the base of the house\.
+ **How** – Pairing vegetation modifiers with an appropriate gradient makes vegetation appear random in position, scale, rotation, and alignment to the slope\. Gradients also customize how frequently each vegetation asset appears when you use multiple assets for one area\.
+ **If** – You can use surface tag emitters to tag certain types of surfaces, such as roads, rivers, oceans, and meshes\. The dynamic vegetation system reads the tags to recognize these surfaces and acts on a set of rules that you create in the form of inclusion and exclusion lists\. For example, to make water lilies to appear on all water surfaces, add the water volume surface tag to the inclusion list\. To ensure that they never appear on roads, add the road surface tag to the exclusion list\.

**Example**  
The following image shows grass excluded from the river and road surfaces, and pebble clusters included only on road surfaces\.  

![\[Grass is excluded from the river and road surfaces, and pebble clusters appear only on road surfaces.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/vegetation/dynamic/dynamic-vegetation-concepts-lilies.png)

You can customize your vegetation in the following ways:
+ Assign priorities to your vegetation areas\. Priorities determine the order in which the vegetation system fills the areas\.
+ Use customizable gradients such as the **Perlin Noise Gradient** to mimic the types of vegetation groupings often found in nature\.
+ Save your customized vegetation areas as slices so that you can easily reuse them in other levels or share them with collaborators\. Use slice overrides to make small or large changes to individual instances of the slice\.

## Dynamic Vegetation Components<a name="dynamic-vegetation-concepts-components"></a>

The common workflow for creating a new vegetation area starts with creating an entity and adding a **Vegetation Layer Spawner** component to it\. Then you add to that entity the two required components, which define the area's shape and the assets to display\. From there, you can add optional components such as vegetation filters and modifiers\.

Any other components that further modify the vegetation area, such as gradients, blockers, and blenders, must be contained on separate entities\. These separate entities can be sibling or child entities of the entity that has the **Vegetation Layer Spawner** component\.

The following table summarizes the functions of dynamic vegetation components and the components that they typically interact with\. The most commonly used components are at the top of the table\. Components that appear in a category, such as vegetation filters, are referenced as such rather than individually named\. The optional and incompatible columns aren't comprehensive of all components from every category, only those related to dynamic vegetation\.


****  

| Primary Component Attached to an Entity | Description | Required Components | Optional Components | Incompatible Components | 
| --- | --- | --- | --- | --- | 
| Vegetation Layer Spawner | Primary component for creating a vegetation area\. Determines layer priority and filter stage\. | [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/dynamic-vegetation-concepts.html) | [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/dynamic-vegetation-concepts.html) | [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/dynamic-vegetation-concepts.html) | 
| Gradients category \(only one per entity\) | Creates a gradient that other components such as the **Vegetation Distribution Filter** and the **Vegetation Asset Weight Selector** can reference\. Provides a gradient that the referencing components use to distribute vegetation or other environmental ornaments\. Gradient types include Perlin noise, white noise, image, and so on\. | Some components in this category require another component\. For example: [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/dynamic-vegetation-concepts.html) | You can add certain Gradient Modifier components alongside the Gradient component\. | Certain Gradient Modifier components are incompatible\. For a better workflow, add Gradient Modifier components to a separate entity and then reference the Gradient entity ID\. | 
| Gradient Modifiers category \(only one per entity\) | Modifies a gradient\. Reference the Gradient entity ID in the Gradient Modifiers component's properties\. | Some components in this category require another component\. For example: [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/dynamic-vegetation-concepts.html) | None | [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/dynamic-vegetation-concepts.html) | 