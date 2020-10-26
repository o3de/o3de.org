# Vegetation Layer Spawner<a name="component-vegetation-layer-spawner"></a>

Use the **Vegetation Layer Spawner** component to define areas and rules for procedurally placing dynamic vegetation or other static meshes in your Lumberyard level\.

To use the **Vegetation Layer Spawner** component, you must enable the **Vegetation** gem\.

With the **Vegetation Layer Spawner** component, you can do the following:
+ Create vegetation within a user\-defined area at runtime
+ Configure layer settings to determine the depth or relative ordering in which to apply vegetation layers
+ \(Optional\) Add modifier and filter components to add variation to placed vegetation
+ \(Optional\) Use selector components to determine which vegetation assets to place at a given location
+ Control the preview settings for attached components
+ Inherit behavior from a parent **Vegetation Layer Blenders** component

Add the following required components when using the **Vegetation Layer Spawner** component:
+ A **Shape** or **Vegetation Reference Shape** component to define the vegetation's spawn area
+ The **Vegetation Asset List** component to list mesh assets, material assets, and other settings for the vegetation

The following optional components change the **Vegetation Layer Spawner** component's behavior:
+ **Vegetation Filter** components use various conditions to determine whether to create vegetation
+ **Vegetation Modifier** components change the appearance of generated vegetation
+ **Vegetation Selector** components determine which asset descriptors are selected for creation

For information on how to use the **Vegetation Layer Spawner**, see [Dynamic vegetation](dynamic-vegetation-intro.md)\.