# Creating Motion Events<a name="char-animation-editor-custom-events-parameters-creating-motion-events"></a>

The `EMotionFX::MotionEvent` class inherits `EMotionFX::Event` and describes an event that happens at a specified time or range of time during a motion\.

A motion event could be a footstep sound to play, a particle system to spawn, or a script to execute\. Because motion events are completely generic, EMotion FX doesn't handle them for you\. You must create and handle the events that your game requires\.

Each motion event has a list of [`EventData`](char-animation-editor-custom-events-parameters-creating-eventdata-types.md) instances that are attached to the event\. An event handler uses the `EventData` list to perform the required actions\.

All motion events are stored in a motion event table\. The motion event table \(see `Motion.h`\) contains data for the event types and parameters that can be shared between events\.

To listen to motion events, connect to the `ActorNotificationBus` and implement `OnMotionEvent()`\.

For information on creating `EventData` instances and adding motion events to a motion, see [Creating EventData Types](char-animation-editor-custom-events-parameters-creating-eventdata-types.md)\.

**Topics**
+ [MotionEvent Public Member Functions](char-animation-editor-custom-events-parameters-motionevent-public-member-functions.md)