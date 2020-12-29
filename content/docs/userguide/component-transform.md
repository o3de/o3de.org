# Transform<a name="component-transform"></a>

The **Transform** component controls the translation, rotation, and scale information of an entity in the 3D world\. When you create an entity in Lumberyard Editor, the **Transform** component is automatically added\. The translation is the coordinate location \(x, y, and z axes\) of the entity\. The rotation is the degree in which the entity is rotated around its center\. The scale is the dimension of the entity in comparison to its original size\.

*World space* refers to the entity's absolute translation, rotation, and scale in the level\. If a child is attached to a parent entity, *local space* refers to the entity's translation, rotation, and scale relative to its parent entity\.

## Transform Component Properties<a name="component-transform-properties"></a>

The **Transform** component has the following properties:

**Parent entity**  
The entity assigned as the parent\. If a parent entity is specified, the **Transform** component follows the parent entity\.

### Values<a name="component-transform-properties-values"></a>

The **Transform** component has the following values:

**Translate**  
The local position \(relative to the parent\) in meters\.

**Rotate**  
The local rotation \(relative to the parent\) in degrees\.

**Scale**  
The local scale\. 

**Parent activation**  
Configures transform behavior when the parent entity activates\.

**Static**  
Entities that can't be moved at run time\. Some systems in Lumberyard treat static entities differently than movable entities \(for example, the renderer can optimize static entities, making them less resource intensive to draw\)\.

### Network Sync<a name="component-transform-properties-network-sync"></a>

The **Transform** component has following network sync options:

**Sync to replicas**  
Transform component syncs in a networked game\. If you enable this option, you must also add the [Network Binding](component-network-binding.md) component\. Otherwise, the entity is not replicated and the interpolation options don't apply\. 

**Position Interpolation**  
The smoothing of position between network updates and interruptions\. This is useful if your objects change location and you notice visual jitter or sudden changes in orientation due to network conditions\. 

**Rotation Interpolation**  
The smoothing of rotation between network updates and interruptions\. This is useful if your objects rotate and you notice visual jitter or sudden changes in orientation due to network conditions\. 

**Note**  
Scale interpolation is not supported in the **Transform** component\.

## EBus Request Bus Interface<a name="component-transform-ebusrequest"></a>

**TransformBus** is the request bus for the **Transform** component\. An entity's transform is the translation, rotation, and scale information\.

For more information about using the event bus \(EBus\) interface, see [Working with the Event Bus \(EBus\) system](ebus-intro.md)\.

Use the following request functions with the EBus interface to communicate with other components of your game\.

### GetLocalTM<a name="transform-ebus-get-local-tm"></a>

Returns the entity's local transform\. Doesn't include the parent entity's transform\.

**Parameters**  
None

**Return**  
Entity's local transform\.

### SetLocalTM<a name="transform-ebus-set-local-tm"></a>

Sets the entity's local transform, relative to its parent entity, and notifies all listeners\.

**Parameters**  
Entity's local transform\.

**Return**  
None

### GetWorldTM<a name="transform-ebus-get-world-tm"></a>

Returns the entity's world transform, including the parent entity's transform\.

**Parameters**  
None

**Return**  
Entity's world transform\.

### SetWorldTM<a name="transform-ebus-set-world-tm"></a>

Sets the world transform and notifies all listeners\.

**Parameters**  
Entity's world transform\.

**Return**  
None

### GetLocalAndWorld<a name="transform-ebus-get-local-world"></a>

Retrieves the entity's local and world transforms\.

**Parameters**  
Transform \[out\] – Local transform, relative to parent entity\.  
Transform \[out\] – World transform\.

**Return**  
None

### SetWorldTranslation<a name="transform-ebus-set-world-translation"></a>

Sets the entity's world space translation\.

**Parameters**  
New world space location, in x, y, and z coordinates\.  
Type: Vector3

**Return**  
None

### SetLocalTranslation<a name="transform-ebus-set-local-translation"></a>

Sets the entity's local space translation, which is relative to its parent entity\.

**Parameters**  
New local space location, in x, y, and z coordinates\.  
Type: Vector3

**Return**  
None

### GetWorldTranslation<a name="transform-ebus-get-world-translation"></a>

Gets the entity's world space translation\.

**Parameters**  
None

**Return**  
Entity's world space, in x, y, and z coordinates\.  
Type: Vector3

### GetLocalTranslation<a name="transform-ebus-get-local-translation"></a>

Gets the entity's local space translation, which is relative to its parent entity\.

**Parameters**  
None

**Return**  
Entity's local space, in x, y, and z coordinates\.  
Type: Vector3

### MoveEntity<a name="transform-ebus-move-entity"></a>

Moves the entity within world space\.

**Parameters**  
Offset in world space, in x, y, and z coordinates\.  
Type: Vector3

**Return**  
None

### SetWorldX<a name="transform-ebus-set-world-x"></a>

Sets the entity's translation x\-axis coordinate in world space\.

**Parameters**  
X\-axis coordinate in world space\.  
Type: Float

**Return**  
None

### SetWorldY<a name="transform-ebus-set-world-y"></a>

Sets the entity's translation y\-axis coordinate in world space\.

**Parameters**  
Y\-axis coordinate in world space\.  
Type: Float

**Return**  
None

### SetWorldZ<a name="transform-ebus-set-world-z"></a>

Sets the entity's translation z\-axis coordinate in world space\.

**Parameters**  
Z\-axis coordinate in world space\.  
Type: Float

**Return**  
None

### GetWorldX<a name="transform-ebus-get-world-x"></a>

Gets the entity's translation x\-axis coordinate in world space\.

**Parameters**  
None

**Return**  
X\-axis coordinate in world space\.  
Type: Float

### GetWorldY<a name="transform-ebus-get-world-y"></a>

Gets the entity's translation y\-axis coordinate in world space\.

**Parameters**  
None

**Return**  
Y\-axis coordinate in world space\.  
Type: Float

### GetWorldZ<a name="transform-ebus-get-world-z"></a>

Sets the entity's translation z\-axis coordinate in world space\.

**Parameters**  
None

**Return**  
Z\-axis coordinate in world space\.  
Type: Float

### SetLocalX<a name="transform-ebus-set-local-x"></a>

Sets the entity's translation x\-axis coordinate in local space\.

**Parameters**  
X\-axis coordinate in local space\.  
Type: Float

**Return**  
None

### SetLocalY<a name="transform-ebus-set-local-y"></a>

Sets the entity's translation y\-axis coordinate in local space\.

**Parameters**  
Y\-axis coordinate in local space\.  
Type: Float

**Return**  
None

### SetLocalZ<a name="transform-ebus-set-local-z"></a>

Sets the entity's translation z\-axis coordinate in local space\.

**Parameters**  
Z\-axis coordinate in local space\.  
Type: Float

**Return**  
None

### GetLocalX<a name="transform-ebus-get-local-x"></a>

Gets the entity's translation x\-axis coordinate in local space\.

**Parameters**  
None

**Return**  
X\-axis coordinate in local space\.  
Type: Float

### GetLocalY<a name="transform-ebus-get-local-y"></a>

Gets the entity's y\-axis coordinate in local space\.

**Parameters**  
None

**Return**  
Y\-axis coordinate in local space\.  
Type: Float

### GetLocalZ<a name="transform-ebus-get-local-z"></a>

Gets the entity's z\-axis coordinate in local space\.

**Parameters**  
None

**Return**  
Z\-axis coordinate in local space\.  
Type: Float

### GetWorldRotation<a name="transform-ebus-get-world-rotation"></a>

Gets the angles in radians for each principle axis around which the world transform is rotated in the following order: z\-axis, y\-axis, x\-axis\.

**Parameters**  
None

**Return**  
The Euler angles in radians, which indicate the degree of rotation around each principle axis\.  
Type: Vector3

### GetWorldRotationQuaternion<a name="transform-ebus-get-world-quartnion"></a>

Gets the quaternion that represents the world rotation\.

**Parameters**  
None

**Return**  
The quaternion that represents the world rotation\.  
Type: Quaternion

### SetLocalRotation<a name="transform-ebus-set-local-rotation"></a>

Sets the local rotation around each principle axes in the following order: z\-axis, y\-axis, x\-axis\.

**Parameters**  
The Vector3 denoting radian angles of the rotations around each principle axis\.  
Type: Vector3

**Return**  
None

### SetLocalRotationQuaternion<a name="transform-ebus-set-rotation-quaternion"></a>

Sets the local rotation matrix using a quaternion\.

**Parameters**  
The local rotation matrix\.  
Type: Quaternion

**Return**  
None

### RotateAroundLocalX<a name="transform-ebus-rotate-around-local-x"></a>

Rotates around the local x\-axis for a radian angle\.

**Parameters**  
The radian angle to rotate around the local x\-axis\.  
Type: Float

**Return**  
None

### RotateAroundLocalY<a name="transform-ebus-rotate-around-local-y"></a>

Rotates around the local y\-axis for a radian angle\.

**Parameters**  
The radian angle to rotate around the local y\-axis\.  
Type: Float

**Return**  
None

### RotateAroundLocalZ<a name="transform-ebus-rotate-around-local-z"></a>

Rotates around the local z\-axis for a radian angle\.

**Parameters**  
The radian angle to rotate around the local z\-axis\.  
Type: Float

**Return**  
None

### GetLocalRotation<a name="transform-ebus-get-local-rotation"></a>

Gets angles in radian for each principle axis around which the local transform is rotated in the following order: z\-axis, y\-axis, x\-axis\.

**Parameters**  
None

**Return**  
Indicates how much in radian is rotated around each principle axis\.  
Type: Vector3

### GetLocalRotationQuaternion<a name="transform-ebus-get-local-rotation-quaternion"></a>

Gets the quaternion representing the local rotation\.

**Parameters**  
None

**Return**  
The quaternion that represents the local rotation\.  
Type: Quaternion

### SetLocalScale<a name="transform-ebus-set-local-scale"></a>

Sets local scale of the transform\.

**Parameters**  
Local scale of the transform, in x, y, and z coordinates\.  
Type: Vector3

**Return**  
None

### SetLocalScaleX<a name="transform-ebus-set-local-scale-x"></a>

Sets local scale of the transform on the x\-axis\.

**Parameters**  
X\-axis coordinate for the local scale\.  
Type: Float

**Return**  
None

### SetLocalScaleY<a name="transform-ebus-set-local-scale-y"></a>

Sets local scale of the transform on the y\-axis\.

**Parameters**  
Y\-axis coordinate for the local scale\.  
Type: Float

**Return**  
None

### SetLocalScaleZ<a name="transform-ebus-set-local-scale-z"></a>

Sets local scale of the transform on the z\-axis\.

**Parameters**  
Z\-axis coordinate for the local scale\.  
Type: Float

**Return**  
None

### GetLocalScale<a name="transform-ebus-get-local-scale"></a>

Gets the scale value on each axis in local space\.

**Parameters**  
None

**Return**  
Scale value for each axis in local space\.  
Type: Vector3

### GetWorldScale<a name="transform-ebus-get-world-scale"></a>

Gets the scale value on each axis in world space\. Note that the transform is skewed when it is rotated and has a parent transform scale in which the returned world scale from this function is inaccurate\.

**Parameters**  
None

**Return**  
Scale values for each axis in world space\.  
Type: Vector3

### GetParentId<a name="transform-ebus-get-parent-ID"></a>

Returns the parent entity's ID\. If the entity does not have a parent, the entity ID is invalid\.

**Parameters**  
None

**Return**  
EntityID of the parent  
Type: Int

### SetParent<a name="transform-ebus-set-parent"></a>

Sets the entity's parent entity and notifies all listeners\. The entity's local transform is moved into the parent entity's space to preserve the entity's world transform\.

**Parameters**  
EntityId – Parent entity ID  
Type: Int

**Return**  
None

### SetParentRelative<a name="transform-ebus-set-parent-relative"></a>

Sets the entity's parent entity, moves the transform relative to the parent entity, and notifies all listeners\. This function uses the world transform as a local transform and moves the transform relative to the parent entity\.

**Parameters**  
EntityId – Parent entity ID  
Type: Int

**Return**  
None

### GetChildren<a name="transform-ebus-get-children"></a>

Returns the entity IDs of the entity's immediate children\.

**Parameters**  
None

**Return**  
Vector of EntityIds

### GetAllDescendants<a name="transform-ebus-get-all-descendants"></a>

Returns the entity IDs of all descendants of the entity\. The descendants are the entity's children, the children's children, and so on\. The entity IDs are ordered breadth first\.

**Parameters**  
None

**Return**  
Vector of EntityIds

### GetEntityAndAllDescendants<a name="transform-ebus-get-entity-and-all-descendants"></a>

Returns the entity ID of the entity and all its descendants\. The descendants are the entity's children, the children's children, and so on\. The entity IDs are ordered breadth first, and this entity's ID is the first in the list\.

**Parameters**  
None

**Return**  
Vector of EntityIds

### IsStaticTransform<a name="transform-ebus-is-static-transform"></a>

Returns whether the transform is static\. A static transform doesn't move and doesn't respond to requests to move it\.

**Parameters**  
None

**Return**  
Boolean

## EBus Notification Bus Interface<a name="component-transform-ebusnotification"></a>

**TransformNotificationBus** is the notification bus for the **Transform** component\. Use the following notification functions with the EBus interface to communicate with other components of your game\.

For more information about using the event bus \(EBus\) interface, see [Working with the Event Bus \(EBus\) system](ebus-intro.md)\.

### OnTransformChanged<a name="on-transform-changed"></a>

Signals that the local or world transform of the entity changed\.

**Parameters**  
Transform – The new local transform of the entity  
Transform – The new world transform of the entity

### OnParentChanged<a name="on-parent-changed"></a>

Signals that the parent of the entity changed\.

**Parameters**  
EntityId – The entity ID of the previous parent\. The entity ID is invalid if there was no previous parent\.  
EntityId – The entity ID of the new parent\. The entity ID is invalid if there is no new parent\.

### OnChildAdded<a name="on-child-added"></a>

Signals that a child was added to the entity\.

**Parameters**  
EntityId – The entity ID of the added child

### OnChildRemoved<a name="on-child-removed"></a>

Signals that a child was removed from the entity\.

**Parameters**  
EntityId – The entity ID of the removed child