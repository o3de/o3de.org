# Flagging Dynamic Slices<a name="ui-editor-working-slices-dynamic"></a>

A slice flagged as a dynamic slice can be used like any other slice, but it can also be instantiated at runtime\.

You can flag a slice as dynamic in the **Asset Browser**\. 

**To flag a slice as dynamic**
+ Right\-click the `.slice` file and choose **Set Dynamic Slice**\.

To instantiate a UI slice at runtime, use the **UiSpawner** component on a UI element\. This causes the system to automatically spawn a dynamic slice on activation\. It also exposes a bus to Lua and C\+\+ that allows the slice to be instantiated whenever needed\.