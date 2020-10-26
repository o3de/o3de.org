# VR Lua Functions<a name="lua-scripting-ref-vr"></a>

You can use Lua bindings to interact programmatically with head\-mounted display \(HMD\) devices that provide Virtual Reality \(VR\) experiences\.

For general information on configuring your Lumberyard game project for VR, see [Create virtual reality projects in Lumberyard](virtual-reality.md)\.

## Global Functions<a name="lua-scripting-ref-vr-global-functions"></a>

 The following functions provide programming interfaces for HMD devices\. 


****  

| Function  | Description  | 
| --- | --- | 
| HMDDeviceRequestBusSender HMDDeviceRequestBusSender\(EntityId\) | Returns an HMDDeviceRequestBusSender object that is connected to the specified entity\. For more information, see [HMDDeviceRequestBus](#lua-scripting-ref-vr-hmddevicerequestbussender-object)\.  | 
| ControllerRequestBusSender ControllerRequestbusSender\(EntityId\) | Returns a ControllerRequestBusSender object that is connected to the specified entity\. For more information, see [ControllerRequestBus](#lua-scripting-ref-vr-controllerrequestbussender-object)\.  | 

## HMDDeviceRequestBus<a name="lua-scripting-ref-vr-hmddevicerequestbussender-object"></a>

Contains functions that return information about an HMD and control its pose and tracking level\. 


****  

| Function | Description | 
| --- | --- | 
| Bool IsInitialized\(\) | Returns true if an HMD has successfully initialized on the bus\. Returns false if no HMD is connected or failed to initialize\. | 
| Void RecenterPose\(\) | Causes the direction that the HMD is currently facing to be considered forward’\. | 
| Void OutputHMDInfo\(\) | Outputs the information about the currently connected HMD \(contained in the HMDDeviceInfo object\) to the console and log file\. | 
| Void SetTrackingLevel\(int\) | Sets the tracking level for the HMD\. 0 specifies head level tracking \(the player is standing\); 1 is floor level tracking \(the player is seated or on the floor\)\. | 
| HMDDeviceInfo GetDeviceInfo\(\) | Returns an HMDDeviceInfo object that contains device information about a connected HMD\. For more information, see [struct HMDDeviceInfo](#lua-scripting-ref-vr-struct-hmddeviceinfo)\. | 
| TrackingState GetTrackingState\(\) | Returns a TrackingState object that contains the most recent tracking information about a connected HMD\. For more information, see [struct TrackingState](#lua-scripting-ref-vr-struct-trackingstate)\. | 

## ControllerRequestBus<a name="lua-scripting-ref-vr-controllerrequestbussender-object"></a>

Returns status information about an HMD controller\. 


****  

| Function | Description | 
| --- | --- | 
| Bool IsConnected\(int controllerIndex\) | Returns true if the given controller is connected, false if a controller is not connected\. Pass 0 for the left controller, pass 1 for the right controller\. | 
| TrackingState GetTrackingState\(int controllerIndex\) | Returns a TrackingState object that contains tracking info about a connected controller\. Pass 0 for the left controller, pass 1 for the right controller\. For more information, see [struct TrackingState](#lua-scripting-ref-vr-struct-trackingstate)\. | 

## struct HMDDeviceInfo<a name="lua-scripting-ref-vr-struct-hmddeviceinfo"></a>

Contains information about a device that displays on the screen when the device is detected\. 


****  

| Field | Description | 
| --- | --- | 
| String productName | Name of the connected HMD\. The default is nullptr\. | 
| String manufacturer | Name of the company that manufactured the connected HMD\. The default is nullptr\. | 
| Int renderWidth | The render width for the HMD in pixels\. This is normally half the full resolution of the device \(rendering is per eye\)\. The default is 0\. | 
| Int renderHeight | The render height in pixels for a single eye of the HMD\. The default is 0\. | 
| Float fovH | The horizontal field of view for both eyes in radians\. The default is 0\.0f\. | 
| Float fovV | The vertical field of view in radians\. The default is 0\.0f\. | 

## struct TrackingState<a name="lua-scripting-ref-vr-struct-trackingstate"></a>

Stores position and connection state information about the HMD\. When an HMD is in use, certain parts of the device can go offline or online\. For example, a controller can be disconnected, or the HMD can temporarily lose rotational tracking\. You can use the `TrackingState` to determine what part of the pose is currently valid\. 


****  

| Field | Description | 
| --- | --- | 
| PoseState pose | The position and orientation in object space of the HMD\. For more information, see [struct PoseState](#lua-scripting-ref-vr-struct-posestate)\. | 
| DynamicsState dynamics | Contains the current state of the physics dynamics for the current device such as linear velocity, angular velocity, and acceleration\. For more information, see [struct DynamicsState](#lua-scripting-ref-vr-struct-dynamicsstate)\. | 
| Int statusFlags | Bit field that describes the current tracking state\. For bit flags, see the [enum HMDStatus](#lua-scripting-ref-vr-enum-hmdstatus)\. | 

## struct PoseState<a name="lua-scripting-ref-vr-struct-posestate"></a>

A specific pose of the HMD device\. Each HMD device has its own way of representing its current pose in three dimensional space\. This structure acts as a common data set between a connected device and the rest of the system\. All data is in a local coordinate space\. 


****  

| Field | Description | 
| --- | --- | 
| Quaternion orientation | A quaternion representing the current orientation in object space of the HMD\. | 
| Vector3 position | A three dimensional vector representing the current position of the HMD in object space as an offset from the centered pose\. | 

## struct DynamicsState<a name="lua-scripting-ref-vr-struct-dynamicsstate"></a>

Dynamics \(accelerations and velocities\) of the current HMD\. Many HMDs have the ability to track the current movements of VR devices for prediction\. Not all devices support velocities and accelerations\. All data is in a local coordinate space\. 


****  

| Field | Description | 
| --- | --- | 
| Vector3 angularVelocity | A three dimensional vector representing angular velocity in object space\. | 
| Vector3 angularAcceleration | A three dimensional vector representing angular acceleration in object space\. | 
| Vector3 linearVelocity | A three dimensional vector representing linear velocity in object space\. | 
| Vector3 linearAcceleration | A three dimensional vector representing linear acceleration in object space\. | 

## enum HMDStatus<a name="lua-scripting-ref-vr-enum-hmdstatus"></a>

The following code shows the status flags for HMDStatus\. 

```
enum HMDStatus
{
    HMDStatus_OrientationTracked = BIT(1),
    HMDStatus_PositionTracked = BIT(2),
    HMDStatus_CameraPoseTracked = BIT(3),
    HMDStatus_PositionConnected = BIT(4),
    HMDStatus_HmdConnected = BIT(5),
    HMDStatus_IsUsable = HMDStatus_HmdConnected | HMDStatus_OrientationTracked,
    HMDStatus_ControllerValid = HMDStatus_OrientationTracked | HMDStatus_PositionConnected,
};
```