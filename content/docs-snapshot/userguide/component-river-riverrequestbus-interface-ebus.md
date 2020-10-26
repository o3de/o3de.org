# River Request Bus Interface<a name="component-river-riverrequestbus-interface-ebus"></a>

The **River** component uses two event bus \(EBus\) interfaces, the `RiverRequestBus` and the `RoadsandRiversGeometryRequestsBus`, which is shared with the **Road** component\.

For information about the `RoadsandRiversGeometryRequestsBus`, see [RoadsAndRiversGeometryRequestsBus Interface](component-road.md#component-roadsandriversgeometryrequestsbus-ebus)\.

Use the following request functions with the `RoadsAndRiversGeometryRequestsBus` to communicate with other components of your game\.

For more information, see [Working with the Event Bus \(EBus\) system](ebus-intro.md)\.


****  

| Request Name | Description | Parameters | Return | Scriptable | 
| --- | --- | --- | --- | --- | 
| SetWaterVolumeDepth | Sets the water volume depth of the river in meters\. | Float | None | Yes | 
| GetWaterVolumeDepth | Returns the setting for the water volume depth of the river in meters\. | None | Float | Yes | 
| SetTileWidth | Sets the river's tile width in meters\. | Float | None | Yes | 
| GetTileWidth | Returns the setting for the river's tile width in meters\. | None | Float | Yes | 
| SetWaterCapFogAtVolumeDepth | Sets whether to enable capping the fog at the depth of the river\. | Boolean | None | Yes | 
| GetWaterCapFogAtVolumeDepth | Returns whether fog setting for the Cap at Depth parameter is enabled\. | None | Boolean | Yes | 
| SetWaterFogDensity | Sets the density of the fog in the water\. | Float | None | Yes | 
| GetWaterFogDensity | Returns the setting for the density of the fog in the water\. | None | Float | Yes | 
| SetFogColor | Sets the color of the fog in the water\. | AZ::Color | None | Yes | 
| GetFogColor | Returns the setting for the color of the fog in the water\. | None | AZ::Color | Yes | 
| SetFogColorAffectedBySun | Sets whether the sun affects the fog color\. | Boolean | None | Yes | 
| GetFogColorAffectedBySun | Returns whether the fog setting for the Affected by Sun parameter is enabled\. | None | Boolean | Yes | 
| SetWaterFogShadowing | Sets the shadow's darkness on the surface of the river\. | Float | None | Yes | 
| GetWaterFogShadowing | Returns the setting for the shadow's darkness on the surface of the river\. | None | Float | Yes | 
| SetWaterCaustics | Sets whether to enable caustics\. | Boolean | None | Yes | 
| GetWaterCaustics | Returns whether caustic setting is enabled\. | None | Boolean | Yes | 
| SetWaterCausticIntensity | Sets the intensity of normals during caustic generation\. | Float | None | Yes | 
| GetWaterCausticIntensity | Returns the setting for the caustic Intensity parameter\. | None | Float | Yes | 
| SetWaterCausticHeight | Sets the distance above the water's surface that caustics are visible\. | Float | None | Yes | 
| GetWaterCausticHeight | Returns the setting for the distance above the water's surface that caustics are visible\. | None | Float | Yes | 
| SetWaterCausticTiling | Sets the tiling of normals during caustics generation\. | Float | None | Yes | 
| GetWaterCausticTiling | Returns the setting for the tiling of normals during caustics generation\. | None | Float | Yes | 
| SetPhysicalize | Sets whether to enable Physics \(binds river with CryPhysics\)\. | Boolean | None | Yes | 
| GetPhysicalize | Returns the setting for whether Physics is enabled\. | None | Boolean | Yes | 
| SetWaterStreamSpeed | Sets the speed at which physicalized objects are moved along the river\. Negative values move objects in the opposite direction\. | Float | None | Yes | 
| GetWaterStreamSpeed | Returns the setting for the speed at which physicalized objects are moved along the river\. | None | Float | Yes | 