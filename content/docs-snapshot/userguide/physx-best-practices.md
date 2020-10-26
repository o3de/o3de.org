# PhysX Best Practices<a name="physx-best-practices"></a>

See the following best practices when working with PhysX\.
+ Colliders intersecting with terrain can result in unexpected behavior\. For example, the object might rocket into space, jitter, or slow down performance\. Avoid intersecting colliders with terrain\. If you need to intersect a collider with terrain, use a small value for the collider size\. These scenarios can be mitigated by clearing the **Persistent Contact Manifold** check box in the **Global Configuration** tab in the **PhysX Configuration** tool\. 
+ The **PhysX Character Controller component** must be on the same entity as the **Actor** component in order to work with the **Animation Editor**\. 
+ If you select the **Static** check box in the **Transform** component for an entity that also has a **PhysX Rigid Body** component, the rigid body behaves statically and a warning appears about the incompatibility of the **PhysX Rigid Body** component and the **Static** transform option\. 
+ When adding the **PhysX Collider** component to entities, prefer a primitive shape \(box, capsule, or sphere\) for the collider\. These shape colliders offer better performance and should be used when possible\. 
**Warning**  
Avoid non\-uniform scaling on entities that have PhysX components\.   
If you must apply a non\-uniform scale to an entity that has PhysX components, do the following:   
Create a child entity under the entity with the PhysX components\. 
On the child entity, add a **Mesh** component\. 
Ensure that the **Transform** component uses non\-uniform scaling\. 
Update the **PhysX Collider** dimensions as needed\. 
Update the center of mass so that it is the center of the object\. 