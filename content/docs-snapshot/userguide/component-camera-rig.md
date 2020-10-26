# Camera Rig<a name="component-camera-rig"></a>

Use the **Camera Rig** component to add and remove behaviors to drive your camera entity\. To use the camera component, you must first add the [Camera Framework Gem](gems-system-gem-camera.md) to your project\.

## Camera Rig Component Properties<a name="component-camera-rig-properties"></a>

The **Camera Rig** component has the following properties:

[ **Target acquirers**](#target-acquirers)  
Array of behaviors that define how a camera selects a target\. The rig tries each acquirer in the order listed until one successfully finds a target\.

[ **Look\-at behaviors**](#look-at-behaviors)  
Array of behaviors that modify the look\-at target transform\. The rig runs each in order to generate a final target transform\.

[ **Transform behaviors**](#transform-behaviors)  
Array of behaviors that modify the camera transform based on the look\-at target transform\. The rig runs each in order before setting the camera component's transform\.

## Target Acquirers<a name="target-acquirers"></a>

**Target Acquirers** identify valid targets and acquire their transforms for use in other rig behaviors\.

### Acquire By Tag<a name="camera-target-component-acquirer"></a>

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/camera-target-component-acquirer.png)

**AcquireByTag** has the following properties:

**Target tag**  
Find a target by tag\. If multiple entities are found, it uses the first to respond\.

**Use Target Rotation**  
If selected, uses the target's rotation when determining camera behavior\.

**Use Target Position**  
If selected, uses the target's position when determining camera behavior\.

### Acquire By Entity Id<a name="camera-target-component-acquirebyentityid"></a>

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/camera-target-component-acquirebyentityid.png)

**AcquireByEntityId** has the following properties:

**Entity Target**  
Select a specific entity to use as the camera target

**Use Target Rotation**  
If selected, uses the target's rotation when determining camera behavior\.

**Use Target Position**  
If selected, uses the target's position when determining camera behavior\.

## Look\-at Behaviors<a name="look-at-behaviors"></a>

**Look\-at Behaviors** changes the target transform to modify camera behavior\.

### OffsetPosition<a name="offset-position"></a>

Use **OffsetPosition** to change the position of the target's transform\. Positions are often determined from the base of a model\. But suppose, for example, that you want to determine its position 1\.8 meters up from its base\. You can use this property to achieve that positional offset\.

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/offset-position.png)

**Look\-at Behaviors** has the following properties:

**Positional Offset**  
Vector displacement of the target transform's position\.

**Offset Is Relative**  
If selected, uses local coordinates\. If deselected, uses world\-basis vectors for the offset\.

### Rotate Camera Target<a name="rotate-camera-target"></a>

Use **Rotate Camera Target** to rotate the target separately from its source target\. For example, you may want your character to look up and down without pitching\.

**Rotate Camera Target** has the following properties:

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/rotate-camera-look-at.png)

**Axis of Rotation**  
The target cardinal's axis around which the camera rotates\. Select the **X**, **Y**, or **Z** axis\.

**Event Name**  
Name of event that provides the values for the rotation\.

**Invert Axis**  
If selected, inverts the axis of rotation\.

**Rotation Speed Scale**  
Multiplier for new input values to scale the speed of rotation\.

### SlideAlongAxisBasedOnAngle<a name="slide-along-axis-based-on-angle"></a>

Use **SlideAlongAxisBasedOnAngle** to modify the position of the look\-at target based on an angle\. For example, say that you set the target to slide along the forward and backward axis based on pitch\. As the target pitched down, then the position would move ahead of the target\. If the target is attached to the character, then every time the target looked down, it would be ahead of the character\. Every time it looked up, it would be behind the character\.

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/slide-along-axis-based-on-angle.png)

**SlideAlongAxisBasedOnAngle** has the following properties:

**Axis to slide along**  
Select an axis along which the target slides:  
+ **Forwards and Backwards**
+ **Right and Left**
+ **Up and Down**

**Angle Type**  
Select an angle type on which to base the slide:  
+ **Pitch**
+ **Yaw**
+ **Roll**

**Vector Component to Ignore**  
Select a vector component to ignore: **None**, **X**, **Y**, or **Z**\.

**Max Positive Slide Distance**  
The maximum slide along the axis when the angle reaches 90 degrees\.

**Max Negative Slide Distance**  
The maximum slide along the axis when the angle reaches \-90 degrees\.

## Transform Behaviors<a name="transform-behaviors"></a>

**Transform Behaviors** are a critical component of how the camera responds to the target\. For example, you can set the camera to face the target, follow from a distance, or follow the target at a specific angle\.

### FaceTarget<a name="face-target"></a>

**FaceTarget** causes the camera to change the rotation of its transform to look at the target\. To use this feature, simply add it\. There are no additional properties to configure\.

### FollowTargetFromAngle<a name="follow-target-from-angle"></a>

**FollowTargetFromAngle** causes the camera to follow the target from a specified angle\. This feature works well for top\-down, isometric, and side scrolling cameras\.

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/follow-target-from-angle.png)

**Follow Target from Angle** has the following properties:

**Angle**  
Angle at which to follow the target\.

**Rotation Type**  
Rotation type of the angle for following the target: yaw, pitch, or roll\.

**Distance from Target**  
The distance in meters from which the camera follows the target\.

### FollowTargetFromDistance<a name="follow-target-from-distance"></a>

**FollowTargetFromDistance** causes the camera to follow the target from a specified distance\. You can also set named events to trigger the camera to zoom in on or out from a target\.

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/follow-target-from-distance.png)

**FollowTargetFromDistance** has the following properties:

**Follow Distance**  
The distance in meters from which the camera follows the target\.

**Minimum Follow Distance**  
Minimum distance from which the camera follows the target\.

**Maximum Follow Distance**  
Maximum distance from which the camera follows the target\.

**Zoom In Event Name**  
Event name that reduces the current follow distance, in effect zooming in\.

**Zoom Out Event Name**  
Event name that increases the current follow distance, in effect zooming out\.

**Zoom Speed Scale**  
Scale amount for the incoming zoom value\.

**Player Index**  
The index of the player \(device index\) that this feature supports\.

### Offset Position<a name="offset-camera-position"></a>

**Offset Position** sets the camera's position to the target's position with an offset\.

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/offset-camera-position.png)

**Offset Position** has the following properties:

**Offset**  
The vector offset in meters from the target\.

**Is Offset Relative**  
If selected, local basis vectors are used\. If deselected, worldbasis vectors are used\.

### Rotate<a name="camera-rig-rotate"></a>

Use **Rotate** to rotate a camera about one of its axes \(**X**, **Y**, or **Z**\)\.

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/camera-rig-rotate.png)

**Rotate** has the following properties:

**Angle**  
Angle in degrees to rotate the camera\.

**Axis**  
Axis about which to rotate the camera\.