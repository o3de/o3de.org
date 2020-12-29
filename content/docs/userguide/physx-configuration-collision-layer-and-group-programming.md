# Creating Collision Layers and Groups Programmatically<a name="physx-configuration-collision-layer-and-group-programming"></a>

The API for collision layers and groups is defined in the `Collision.h` and `CollisionBus.h` headers\. The following code shows example include statements\.

```
// Main API
#include <AzFramework/Physics/Collision.h>

// Bus API
#include <AzFramework/Physics/CollisionBus.h> 

// For the rest of the examples:
using namespace AzFramework;
using namespace Physics;
```

For source code, see the `lumberyard_version\dev\Code\Framework\AzFramework\AzFramework\Physics\Collision.*` files\.

## Retrieving Layers and Groups<a name="physx-configuration-programming-creating-layers-and-groups"></a>

You can use the `layer(`*layer\_name*`)` and `group(`*group\_name*`)` methods to retrieve instances of collision layers and groups [that you created in Lumberyard Editor](physx-configuration-collision-groups.md)\. These methods perform a lookup of the definitions defined in the **PhysX Configuration** tool\. If no collision layer is found that matches the name, the default layer \(`0`\) is returned\.

```
CollisionLayer layer("MyLayer");
CollisionGroup group("MyGroup");
```

You can also use a bus to look up layers and groups, as in the following code:

```
CollisionLayer layer;
CollisionRequestBus::BroadcastResult(layer, &Physics::CollisionRequests::GetCollisionLayerByName, layerName);
CollisionGroup group;
CollisionRequestBus::BroadcastResult(group, &Physics::CollisionRequests::GetCollisionGroupByName, groupName);
```

## Creating Collision Groups in Code<a name="physx-configuration-programming-adhoc-collision-groups"></a>

Unlike the predefined collision groups that you create in Lumberyard Editor, you can use code to create collision groups at runtime\. This is useful when you don’t know the layers involved in advance at therefore must define a collision group at runtime\. 

The following example code creates a collision group at runtime that contains an `Enemy` layer and a `Tree` layer\. This handles the situation in which the identity of the tree and the enemy are not known prior to the start of gameplay\.

```
CollisionLayer layer1("Enemy"), layer2("Tree");
CollisionGroup group = AzFramework::Physics::CollisionGroup::None;
group.SetLayer(layer1, true);
group.SetLayer(layer2, true);
```

If all the layers required to construct the collision group are known at the same time, you can use overloaded operators, as in the following example:

```
CollisionGroup group = CollisionLayer("Layer1") | CollisionLayer("Layer2") | CollisionLayer("Layer3");
```