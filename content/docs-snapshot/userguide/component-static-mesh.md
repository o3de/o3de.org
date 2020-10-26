# Mesh<a name="component-static-mesh"></a>

You can add the **Mesh** component to an entity to provide visual geometry on an entity\. The **Mesh** component has key controls and options for Lumberyard's basic rendering features\. The supported geometry type is meshes \(`.cgf`\)\.

## Mesh Component Properties<a name="component-static-mesh-properties"></a>

![\[Mesh component properties in Lumberyard Editor\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/component-mesh-component-properties.png)

The **Mesh** component has the following properties:


****  

| Property | Description | 
| --- | --- | 
| Visible |  Entity is visible\.  | 
| Mesh asset |  Specifies the asset file for the mesh entity\.  | 
| Material override |  Specifies an override material\.  | 
| Opacity |  The entity's degree of transparency\.  | 
| Max view distance |  Maximum distance from which this entity can be viewed\.  | 
| View distance multiplier |  Adjusts the maximum view distance\. If set to `1.0`, then the default maximum view distance is used\. For example, `1.1` extends the default by 10%\.  | 
| LOD distance ratio |  Sets the level of detail \(LOD\) ratio over distance\.  | 
| Cast shadows |  Casts shadow maps\.  | 
| Use VisAreas |  Allows vis areas to control the component's visibility\.  | 

### Advanced<a name="static-mesh-properties-advanced"></a>

The **Mesh** component has different advanced properties that depend on whether your mesh is static or dynamic\.
+ A mesh is dynamic when the **Static** property is not set on the **Transform** component\. This is the default setting when you create an entity\. Dynamic meshes do not affect nav meshes\. 
+ A mesh is static when the **Static** property is set on the **Transform** component\. You can use static objects for more optimal paths during rendering and processing\. We recommend that you create static meshes whenever possible\. A static mesh can move or deform only when the **Receive Wind** or **Deformable Mesh** properties are set\. 

For more information, see [Transform Component Properties](component-transform.md#component-transform-properties)\.

#### Advanced Properties for Dynamic Meshes<a name="dynamic-mesh-advanced-properties"></a>

If your mesh is dynamic, the **Mesh** component has the following advanced properties\.

![\[Advanced Mesh component properties for a dynamic mesh in Lumberyard Editor\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/component-mesh-component-properties-3.png)


****  

| Property | Description | 
| --- | --- | 
| Receive wind |  Affected by wind\.  | 
| Accept decals |  Receives decals\.  | 
| Deformable mesh |  Allows static mesh assets to deform that have specific dynamic data\. For example, you can have a mesh deform asset that is stationary\.  | 

#### Advanced Properties for Static Meshes<a name="static-mesh-advanced-properties"></a>

If the mesh is static, the **Mesh** component has the following advanced properties\.

![\[Advanced Mesh component properties for a static mesh in Lumberyard Editor\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/component-mesh-component-properties-2.png)


****  

| Property | Description | 
| --- | --- | 
| Rain occluder |  Blocks or stops dynamic raindrops\.  | 
| Affect dynamic water |  Generates ripples in dynamic water\.  | 
| Receive wind |  Affected by wind\.  | 
| Accept decals |  Receives decals\.  | 
| Affect navmesh |  Affects navmesh generation\.  | 
| Visibility occluder |  Blocks visibility of other objects\.  | 
| Deformable mesh |  Allows static mesh assets to deform that have specific dynamic data\. For example, you can have a mesh deform asset that is stationary\.  | 
| Affects GI |  Affects global illumination results\.  | 

**Note**  
If you select the **Receive wind** or **Deformable mesh** settings, the entity's **Transform** component remains **Static**, but the mesh is considered dynamic\.