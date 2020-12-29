# Ebus Request Bus Interface<a name="vegetation-layer-spawner-ebus"></a>

The **Vegetation Layer Spawner** component uses `Vegetation::SpawnerRequestBus` and `Vegetation::AreaInfoBus` interfaces\.

For more information about using the event bus \(EBus\) interface, see [Working with the Event Bus \(EBus\) system](ebus-intro.md)\.

Use the following request functions with the EBus interface to communicate with other components of your game\.

Use the following EBus requests with the `Vegetation::SpawnerRequestBus` interface\.


****  

| Request Name | Description | Parameters | Return | Scriptable? | 
| --- | --- | --- | --- | --- | 
| GetAreaPriority | Get the priority \(in the layer\) of the vegetation area\. Higher numbers have higher priority\. | None | Float | Yes | 
| SetAreaPriority | Set the priority \(in the layer\) of the vegetation area\. | Float | None | Yes | 
| GetAreaLayer | Get the layer of the vegetation area\. | None | Float | Yes | 
| SetAreaLayer | Set the layer of the vegetation area\. | AreaLayer | None | Yes | 
| GetAreaProductCount | Get the number of currently spawned instances in the vegetation area\. | AZ::u32 | None | Yes | 
| GetInheritBehavior | Get the Inherit Behavior setting, which controls whether shapes, modifiers, and filters of a parent entity affect this area\. | Bool | None | Yes | 
| SetInheritBehavior | Set the Inherit Behavior setting\. | None | Bool | Yes | 
| GetAllowEmptyMeshes | Get the Allow Empty Meshes setting, which controls whether empty meshes in the Vegetation Asset List are spawned as empty spaces\. | Bool | None | Yes | 
| SetAllowEmptyMeshes | Set the Allow Empty Meshes setting\. | None | Bool | Yes | 
| GetFilterStage | Get the filter stage\. PreProcess means that vegetation filters are applied before vegetation modifiers\. PostProcess means that they're applied afterwards\.  | FilterStage | None | Yes | 
| SetFilterStage | Set the filter stage\. | None | FilterStage | Yes | 

Use the following EBus requests with the `Vegetation::AreaInfoBus` interface\.


****  

| Request Name | Description | Parameters | Return | Scriptable? | 
| --- | --- | --- | --- | --- | 
| GetPriority | Get the combined layer and area priority value as a single combined global priority\. | None | Float | Yes | 
| GetEncompassingAabb | Get the axis\-aligned bounding box for the entire vegetation area\. | None | AZ::Aabb | Yes | 
| GetProductCount | Get the number of currently spawned instances in the vegetation area\. Same as GetAreaProductCount\. | None | AZ::u32 | Yes | 
| GetChangeIndex | Get an incrementing number that represents the number of times that the spawner area has been refreshed since creation\. | None | AZ::u32 | Yes | 