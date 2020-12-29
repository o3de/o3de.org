# Collision Groups<a name="physx-configuration-collision-groups"></a>

Use collision groups to define the layers that a collider interacts with\. A collision group is similar to a mask with specific bits set in which each bit corresponds to a collision layer\.

Two colliders interact if their collision layers are in each other's collision group\. If one collision layer is not present in the other layer's collision group, the colliders don't interact\.

**To create a collision group**

1. In Lumberyard Editor, choose **Tools**, **PhysX Configuration**\.

1. Click the **Collision Groups** tab\. The layers that are configured on the **Layers** tab appear here as columns\.

1. Click **Add**, and then enter the name of the group into the text box\.  
![\[Adding Collision Groups in the PhysX Configuration tool.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/physx/physx-configuration-4.png)

1. Select or clear the check boxes to specify the layers to include in each collision group\.

1. Close the configuration tool\. The configuration tool must be closed for changes to the groups to take effect\.

**To assign a collision group to a collider**

1. In the Lumberyard Editor viewport, select the entity that has the collider\.

1. In the **Entity Inspector**, in the **PhysX Collider** component, for **Collides With**, choose one of the collision groups that you created from the drop\-down list\.  
![\[Choosing a collision group for the PhysX Collider component in the Entity Inspector.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/physx/physx-configuration-5.png)

## Example Collision Group Configuration<a name="physx-configuration-collision-groups-example"></a>

The following example defines **Player**, **Enemy**, **Bullet**, **Foliage**, and **Terrain** layers, and the following collision groups:
+ **PlayerBullet** – Collides with **Enemy** and **Terrain**\.
+ **EnemyBullet** – Collides with **Player** and **Terrain**\.
+ **TerrainCollision** – Collides with **Player**, **Enemy**, **Bullet**, and **Terrain**\.
+ **PlayerCollision** – Collides with **Enemy**, **Bullet**, and **Terrain**\.

![\[An example collision group configuration.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/physx/physx-configuration-6.png)

A bullet fired by the player has the following layer and group:
+ Layer: **Bullet**
+ Group: **PlayerBullet**

A bullet fired by the enemy has the following layer and group:
+ Layer: **Bullet**
+ Group: **EnemyBullet**

**Note**  
You don't have to define an "enemy bullet" or a "player bullet" layer\. Instead, you have a single **Bullet** layer and create separate collision groups to specify the objects that it collides with\.