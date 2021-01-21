---
description: ' Customize &emotionfx; objects in the &ALY; &animation-editor;. '
title: Customizing &emotionfx; Objects
---
# Customizing EMotion FX Objects {#animation-editor-customizing-emotionfx-objects}


****

|  |
| --- |
| This feature is in [preview](/docs/userguide/ly-glos-chap#preview) release and is subject to change\.  |

The EMotion FX API supports registering custom object types, including state machine nodes, blend tree nodes, transitions, and conditions\. You can define custom object types in your game code or a custom gem\. This allows you to have granular control of the Lumberyard animation system\.

## Registering Custom Objects {#animation-editor-registering-custom-objects}

Before registering custom objects, activate the EMotion FX `SystemComponent` to ensure the EMotion FX runtime is initialized correctly\. Then use an EBus call to the `EMotionFXRequestBus::Events::RegisterAnimGraphObjectType` method\. You can ensure that EMotion FX runtime is activated by registering your custom node from a component that has a dependency on `EmotionFXAnimationService`\. You do not need to manually instantiate the EMotion FX `SystemComponent` and call `Activate`; component dependencies handle these tasks\.

**To register your custom node**

1. In your custom gem or game project code, define your subclass of `EMotionFX::AnimGraphObject`\.

1. Create a subclass of `AZ::Component`\.

1. In your component's `GetDependentServices()` method, add the dependency to `EmotionFXAnimationService`:

   ```
   dependent.push_back(AZ_CRC("EmotionFXAnimationService", 0x3f8a6369));
   ```

1. In your component's `Activate()` method, register your node type:

   ```
   EmotionFXAnimation::EMotionFXRequestBus::Broadcast(
     &EmotionFXAnimation::EMotionFXRequestBus::Events::RegisterAnimGraphNodeType,
       MyCustomNode::Create(nullptr)
   );
   ```

## Implementing AnimGraphObject Subclasses {#animation-editor-implementing-animgraphobject-subclasses}

`AnimGraphObject` is the base class for all objects in the animation graph\. The constructor on the base class is protected; instead, objects are instantiated with the `Create()` method\. The Lumberyard animation system \(EMotion FX\) uses an instance of `AnimGraphObject` to create other instances by calling the `Clone()` method\.

Each `AnimGraphObject` subclass has a unique type ID that is used to serialize an object to and unserialize an object from an `.animgraph` file\. You use a public anonymous enum with a `TYPE_ID` member to declare the type ID for an object\.

When implementing an `AnimGraphObject` subclass, you must define the following methods:


| Method | Description |
| --- | --- |
| uint32 GetBaseType\(\) const | Defines the base type of an object\. There are three base types: nodes, transitions, and conditions\. |
| const char\* GetTypeString\(\) const | Defines the string version of the object type name\. |
| const char\* GetPaletteName\(\) const | Defines the name that is displayed in the UI\. |
| AnimGraphObject::ECategory GetPaletteCategory\(\) const | Defines where in the UI palette or tab the object should appear\. |
| AnimGraphObject\* Clone\(AnimGraph\* animGraph\) | Creates a new instance of the same object type, with the clone's animation graph set to animGraph\. |
| AnimGraphObjectData\* CreateObjectData\(\) | Creates a new instance of an AnimGraphObjectData instance\. This represents data that is unique to each type of node in an AnimGraphInstance\. |