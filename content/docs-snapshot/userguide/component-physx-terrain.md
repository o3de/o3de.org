# PhysX Terrain<a name="component-physx-terrain"></a>

The **PhysX Terrain** component exports and saves the terrain as an asset that loads at runtime\. The **PhysX Terrain** component is required for games in which physics interacts with the terrain\. For example, you can create a terrain collider so that your entities can interact with it, such as a barrel that falls to the ground and then rolls to a stop\.

For more information about using PhysX components, see [Simulating physics behavior with the PhysX system](physx-intro.md)\.

**Topics**
+ [PhysX Terrain Component Properties](#physx-terrain-component-properties)
+ [Creating a PhysX Terrain Collider](#creating-physx-terrain-collider)

## PhysX Terrain Component Properties<a name="physx-terrain-component-properties"></a>

![\[PhysX Terrain component properties.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/physx/phsx-terrain-component-properties.png)


| Property | Description | 
| --- | --- | 
| Collision Layer |  Specifies on which **Collision Layer** the terrain exists\. You can configure **Collision Layer** settings in the **PhysX Configuration** window\.  See [Configuring the PhysX System](physx-configuration.md)\.  | 
| Collision Group |  Specifies the group of layers in which the terrain collides\. You can configure **Collision Group** settings in the **PhysX Configuration** window\.  See [Configuring the PhysX System](physx-configuration.md)\.  | 
| HeightField Asset |  A read\-only parameter that specifies the height field asset that contains the terrain\. This property can't be changed\.  | 
| Terrain In Editor |  If set, terrain physics exist while editing\. This means raycasts can be performed in Lumberyard Editor and can be viewed in the PhysX Visual Debugger\. For more information, see [Debugger Configuration](physx-configuration-debugger.md)\.  | 

## Creating a PhysX Terrain Collider<a name="creating-physx-terrain-collider"></a>

As a best practice, create a top\-level entity in your level and add the **PhysX Terrain** component\. You only need one entity with the **PhysX Terrain** attached for your level\.

**To create a PhysX Terrain Collider**

1. In Lumberyard Editor, create an entity\. For more information, see [Creating an Entity](creating-entity.md)\.

1. Enter a name for the entity, such as *terrain*\.

1. In the **Entity Inspector**, choose **Add Component** and then select a **PhysX Terrain** component\. The terrain collider appears in the viewport\.
**Note**  
The **Transform** component for the entity is ignored and doesn't affect the position of the terrain\.

1. To have an entity interact with the terrain collider, you can create a dynamic entity so that the two entities interact\. For more information, see [Creating a Dynamic PhysX Entity](component-physx-rigid-body-physics.md#example-creating-dynamic-game-entity)\.

1. After you create your dynamic entity, press **Ctrl**\+**G** to enter gameplay mode\. The dynamic entity falls and then collides with the terrain collider\. 

1. Press **Esc** to leave gameplay mode\.

**Note**  
In some cases, performance can be impacted when a large body intersects the terrain\. To overcome this issue, you can clear the **Persistent Contact Manifold** option in the [World Configuration](physx-configuration-global.md#physx-configuration-global-world)\. If you clear this option, keep the size of the colliders that intersect the terrain small\.