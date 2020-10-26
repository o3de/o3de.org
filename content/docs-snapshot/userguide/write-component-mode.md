# Step 3: Write a New Component Mode<a name="write-component-mode"></a>

Now that you've updated the header and implementation file, this procedure shows you how to write a new Component Mode\. To do so, you create a `EditorPointLightComponentMode.h` file, which is the interface for Component Mode\.

**To write a new Component Mode**

1. Navigate to the `lumberyard_version\dev\Gems\LmbrCentral\Code\Source\Rendering` directory\.

1. In a text editor, create a file and name it `EditorPointLightComponentMode.h`\.

1. Enter the following code\. This includes the `EditorBaseComponentMode.h` file so that you can inherit from the `EditorBaseComponentMode`\.

   ```
   #include <AzToolsFramework/ComponentMode/EditorBaseComponentMode.h>
   ```

1. Ensure that all Component Modes must inherit from `EditorBaseComponentMode`\.

   ```
   : public AzToolsFramework::ComponentModeFramework::EditorBaseComponentMode
   ```

1. For the `EditorBaseComponentMode`, enter the following code to override the `Refresh` function\.

   ```
   // EditorBaseComponentMode
   void Refresh() override;
   ```

   The `Refresh` function is called after any undo or redo action to ensure that a Component Mode is updated to reflect the current state of the component\. For example, the manipulator positions must be updated after you undo or redo an action\.
**Note**  
The `EditorBaseComponentMode` interface is designed to be as light as possible\. Opt\-in only the parts that you need\.

1. Declare the manipulator to modify a specific property on the component\. The example uses the `LinearManipulator`, so that you can adjust a point along a given axis\.

   ```
   AZStd::shared_ptr<AzToolsFramework::LinearManipulator> m_pointMaxDistanceManipulator; ///< Manipulator for point max distance property.
   ```
**Note**  
You must use an `AZStd::shared_ptr` to manage the lifetime of the `LinearManipulator` property, which the `ManipulatorManager` requires\.
In this procedure, you use only the `LinearManipulator` property, but there are other properties available\. The `PlanarManipulator` allows two degrees of freedom to edit a value, and the `AngularManipulator` can rotate a value\. You can also use aggregate manipulators such as the `TranslationManipulators` and `RotationManipulators`\. You can also create and extend your own manipulators by inheriting from `BaseManipulator`\. However, this is an advanced topic and isn't encouraged because you can achieve most functionality by customizing behavior in the existing manipulator callbacks\. 

1. Save your file\.  
**Example EditorPointLightComponentMode\.h**  

   Your code should look like the following\. Note the light interface\.

   ```
   #pragma once
    
   #include <AzToolsFramework/ComponentMode/EditorBaseComponentMode.h>
    
   namespace AzToolsFramework
   {
       class LinearManipulator;
   }
    
   namespace LmbrCentral
   {
       class EditorPointLightComponentMode
           : public AzToolsFramework::ComponentModeFramework::EditorBaseComponentMode
       {
       public:
           EditorPointLightComponentMode(
               const AZ::EntityComponentIdPair& entityComponentIdPair, AZ::Uuid componentType);
           ~EditorPointLightComponentMode();
    
           // EditorBaseComponentMode
           void Refresh() override;
       private:
           AZStd::shared_ptr<AzToolsFramework::LinearManipulator> m_pointMaxDistanceManipulator; /// Manipulator for point max distance property.
       };
   } // namespace LmbrCentral
   ```

## Implement Component Mode<a name="implement-component-mode"></a>

Now that you've written the interface portion of a Component Mode, create a `EditorPointLightComponentMode.cpp` file\. This file implements a Component Mode for the **Point Light** component\. 

In this procedure, you make the following changes to the file:

1. [Construction](#construct-component-mode)

1. [Manipulator Setup](#set-up-manipulator)

1. [Manipulator Callbacks](#manipulator-callbacks)

**Example EditorPointLightComponentMode\.cpp**  
After you complete this procedure, your `EditorPointLightComponentMode.cpp` file looks like the following\.  

```
#include "LmbrCentral_precompiled.h"
#include "EditorPointLightComponentMode.h"
 
#include <AzCore/Component/TransformBus.h>
#include <AzToolsFramework/Manipulators/LinearManipulator.h>
#include <AzToolsFramework/Manipulators/ManipulatorManager.h>
 
#include <LmbrCentral/Rendering/EditorLightComponentBus.h>
 
namespace LmbrCentral
{
    EditorPointLightComponentMode::EditorPointLightComponentMode(
        const AZ::EntityComponentIdPair& entityComponentIdPair, AZ::Uuid componentType)
        : EditorBaseComponentMode(entityComponentIdPair, componentType)
    {
        AZ::Transform worldFromLocal = AZ::Transform::CreateIdentity();
        AZ::TransformBus::EventResult(
            worldFromLocal, GetEntityId(), &AZ::TransformInterface::GetWorldTM);
 
        m_pointMaxDistanceManipulator = AzToolsFramework::LinearManipulator::MakeShared>(worldFromLocal);
        m_pointMaxDistanceManipulator->AddEntityId(GetEntityId());
        m_pointMaxDistanceManipulator->SetAxis(AZ::Vector3::CreateAxisX());
 
        Refresh();
 
        const AZ::Color manipulatorColor(0.3f, 0.3f, 0.3f, 1.0f);
        const float manipulatorSize = 0.05f;
 
        AzToolsFramework::ManipulatorViews views;
        views.emplace_back(AzToolsFramework::CreateManipulatorViewQuadBillboard(manipulatorColor, manipulatorSize));
        m_pointMaxDistanceManipulator->SetViews(AZStd::move(views));
 
        struct SharedState
        {
            float m_startingPointMaxDistance = 0.0f;
        };
 
        auto sharedState = AZStd::make_shared<SharedState>();
        m_pointMaxDistanceManipulator->InstallLeftMouseDownCallback(
            [this, sharedState] (const AzToolsFramework::LinearManipulator::Action& /*action*/) mutable
        {
            float currentMaxDistance = 0.0f;
            EditorLightComponentRequestBus::EventResult(
                currentMaxDistance, GetEntityId(), &EditorLightComponentRequests::GetPointMaxDistance);
 
            sharedState->m_startingPointMaxDistance = currentMaxDistance;
        });
 
        m_pointMaxDistanceManipulator->InstallMouseMoveCallback(
            [this, sharedState](const AzToolsFramework::LinearManipulator::Action& action)
        {
            const AZ::VectorFloat axisDisplacement = action.LocalPositionOffset().Dot(action.m_fixed.m_axis);
 
            EditorLightComponentRequestBus::Event(
                GetEntityId(), &EditorLightComponentRequests::SetPointMaxDistance,
                (sharedState->m_startingPointMaxDistance + axisDisplacement).GetMax(AZ::VectorFloat(0.1f)));
 
            const AZ::Vector3 localPosition = action.LocalPosition().GetMax(AZ::Vector3(0.1f, 0.0f, 0.0f));
            m_pointMaxDistanceManipulator->SetLocalTransform(AZ::Transform::CreateTranslation(localPosition));
            m_pointMaxDistanceManipulator->SetBoundsDirty();
 
            // ensure property grid values are refreshed
            AzToolsFramework::ToolsApplicationNotificationBus::Broadcast(
                &AzToolsFramework::ToolsApplicationNotificationBus::Events::InvalidatePropertyDisplay,
                AzToolsFramework::Refresh_Values);
        });
 
        m_pointMaxDistanceManipulator->Register(AzToolsFramework::g_mainManipulatorManagerId);
    }
 
    EditorPointLightComponentMode::~EditorPointLightComponentMode()
    {
        m_pointMaxDistanceManipulator->Unregister();
    }
 
    void EditorPointLightComponentMode::Refresh()
    {
        float currentMaxDistance = 0.0f;
        EditorLightComponentRequestBus::EventResult(
            currentMaxDistance, GetEntityId(), &EditorLightComponentRequests::GetPointMaxDistance);
 
        m_pointMaxDistanceManipulator->SetLocalTransform(
            AZ::Transform::CreateTranslation(AZ::Vector3::CreateAxisX() * currentMaxDistance));
    }
} // namespace LmbrCentral
```

**Note**  
Most of the code in the file is related to the manipulator\. Manipulators are low\-level but provide a large degree of control\. 

### Construction<a name="construct-component-mode"></a>

The Component Mode constructor contains the majority of the logic\.

**To construct a Component Mode**

1. Navigate to the `lumberyard_version\dev\Gems\LmbrCentral\Code\Source\Rendering` directory\.

1. In a text editor, create a file and name it `EditorPointLightComponentMode.cpp`\.

1. Call the `EditorBaseComponentMode` constructor and specify the `Entity` and `ComponentId`, along with the `componentType`\.

   ```
   EditorPointLightComponentMode::EditorPointLightComponentMode(
       const AZ::EntityComponentIdPair& entityComponentIdPair, AZ::Uuid componentType)
       : EditorBaseComponentMode(entityComponentIdPair, componentType) // IMPORTANT
   ```

### Manipulator Setup<a name="set-up-manipulator"></a>

Next, set up the manipulator for the component\.

**To set up the manipulator**

1. In the `EditorPointLightComponentMode.cpp` file, identify the `LinearManipulator` in the code\. 

1. Request the world transform of the entity that the component is attached to and pass that value to the constructor of the manipulator\. You must set the space that the manipulator is going to operate in\. With components, this value is usually the entity transform\. If you want the manipulator to operate in world space, you can pass the identity transform here\.

   ```
   AZ::Transform worldFromLocal = AZ::Transform::CreateIdentity();
   AZ::TransformBus::EventResult(
       worldFromLocal, GetEntityId(), &AZ::TransformInterface::GetWorldTM);
   
   m_pointMaxDistanceManipulator = AzToolsFramework::LinearManipulator::MakeShared>(worldFromLocal);
   ```
**Note**  
The naming `worldFromLocal` is chosen to indicate how this transform is modifying a position\. For example, if you have a position in the local space of the entity, this transform takes it from local to world space\. The naming style helps debug the multiplication order of transforms and vectors\. Lumberyard uses column major ordering, which is a matrix multiplication that occurs right to left\.  
For example, if you have the vector, `localPosition` and the transform `worldFromLocal`, multiplying `worldFromLocal` \* `localPosition` has the correct output because the `local` identifiers are next to each other\. This transforms the `localPosition` to its position in world space\.

1. \(Optional\) Add the `EntityId` to the manipulator\. This is helpful to track manipulator undo and redo operations on entities\. 

   During each mouse move, the added `EntityIds` are marked as *dirty*\. When a manipulator action ends, Lumberyard compares the entity and component serialized state before and after the event\. If the entity changed, Lumberyard records an undo step\. If not, Lumberyard throws away the potential undo action\. It's important to note that this tracks the change the manipulator caused on the serialized entity state\. If you have other custom operations that you want to undo, create a new `UndoCommand` that derives from `URSequencePoint`\.

   ```
   m_pointMaxDistanceManipulator->AddEntityId(GetEntityId());
   ```

1. For the `SetAxis` function, specify a vector in the local space of the entity\. This defines the vector that the `LinearManipulator` moves along in local space\. The following example uses the x\-axis, but you can specify another vector\.

   ```
   m_pointMaxDistanceManipulator->SetAxis(AZ::Vector3::CreateAxisX());
   ```

1. To set the position of the manipulator, query the `EditorLightComponent`\. You don't have a direct reference \(pointer\) to the component or entity\. All communication is made using EBuses\.

   ```
   // From void EditorPointLightComponentMode::Refresh() 
   float currentMaxDistance = 0.0f;
   EditorLightComponentRequestBus::EventResult(
       currentMaxDistance, GetEntityId(), &EditorLightComponentRequests::GetPointMaxDistance);
   ```
**Note**  
Using EBuses and `EntityIds` offers the following advantages:  
You don't need to couple a Component Mode to a specific component\. For example, **Box Shape** and **PhysX Collider** components need similar editing capabilities, such as the ability to resize the dimensions of an oriented bounding box in the viewport\. The `EditorBoxShapeComponent.h` and `EditorPhysXColliderComponent.h` files include the `BoxManipulatorRequestBus`\. This provides an interface to get the shape or collider transform and get or set its dimensions\. This way, you can apply the `BoxComponentMode` for both files\.
You can avoid difficulties with entities being destroyed and recreated with each undo and redo action\. If an entity changes while recording an undo action, the act of undoing the action destroys the current entity and recreates it by returning the entity to its previous saved state\. If a Component Mode has a direct reference to the `EditorComponent` and not just an `EntityId`, managing the lifetimes would be more complex\. This means that the `EditorComponent` that you want to edit must expose the get and set actions that you need on its request bus\. Otherwise, a Component Mode can't read or write the actions\.

1. The call to `SetLocalTransform` sets the transform of the manipulator\. By default, this value is the same local space of the entity\. To calculate this value, query the current `PointMaxDistance` and offset the manipulator handle by that distance along the x\-axis\. 

   In the following example, the `ManipulatorView` doesn't have an orientation\. You can specify `CreateTranslation` on the `Transform` class\.

   ```
   // From void EditorPointLightComponentMode::Refresh()
   m_pointMaxDistanceManipulator->SetLocalTransform(
       AZ::Transform::CreateTranslation(AZ::Vector3::CreateAxisX() * currentMaxDistance));
   ```

1. Configure the `ManipulatorView`\. 

   The behavior of a manipulator is decoupled from how it appears in the viewport\. This means that a `LinearManipulator` can look like a line, cone, cube, or screen\-aligned quad\. `LinearManipulator` supports multiple views, which is useful with the classic `TranslationManipulator`\. You can draw a line and cone \(an arrow\) to represent the `LinearManipulator` that corresponds to each axis\.

1. Create an `AZStd::vector` of views and a `QuadBillboardView` that specifies the color and dimensions of the shape\.

1. Add the new `views` to the manipulator itself with `SetViews`\.  
**Example**  

   ```
   const AZ::Color manipulatorColor(0.3f, 0.3f, 0.3f, 1.0f);
   const float manipulatorSize = 0.05f;
   
   AzToolsFramework::ManipulatorViews views;
   views.emplace_back(AzToolsFramework::CreateManipulatorViewQuadBillboard(manipulatorColor, manipulatorSize));
   m_pointMaxDistanceManipulator->SetViews(AZStd::move(views));
   ```

1. Save the file\.  
**Example**  

   Your code should look like the following so far\.

   ```
   // EditorPointLightComponentMode::EditorPointLightComponentMode()
   AZ::Transform worldFromLocal = AZ::Transform::CreateIdentity();
   AZ::TransformBus::EventResult(
       worldFromLocal, GetEntityId(), &AZ::TransformInterface::GetWorldTM);
   
   m_pointMaxDistanceManipulator = AzToolsFramework::LinearManipulator::MakeShared>(worldFromLocal);
   m_pointMaxDistanceManipulator->AddEntityId(GetEntityId());
   m_pointMaxDistanceManipulator->SetAxis(AZ::Vector3::CreateAxisX());
   
   // Refresh(); inlined/expanded
   float currentMaxDistance = 0.0f;
   EditorLightComponentRequestBus::EventResult(
       currentMaxDistance, GetEntityId(), &EditorLightComponentRequests::GetPointMaxDistance);
   
   m_pointMaxDistanceManipulator->SetLocalTransform(
       AZ::Transform::CreateTranslation(AZ::Vector3::CreateAxisX() * currentMaxDistance));
   
   const AZ::Color manipulatorColor(0.3f, 0.3f, 0.3f, 1.0f);
   const float manipulatorSize = 0.05f;
   
   AzToolsFramework::ManipulatorViews views;
   views.emplace_back(AzToolsFramework::CreateManipulatorViewQuadBillboard(manipulatorColor, manipulatorSize));
   m_pointMaxDistanceManipulator->SetViews(AZStd::move(views));
   ```

### Manipulator Callbacks<a name="manipulator-callbacks"></a>

Next, set up how the manipulator should respond when you interact with it in the viewport\.

**To set up manipulator callbacks**

1. In the `EditorPointLightComponentMode.cpp` file, enter the following code to create a piece of shared state that each callback can use\.

   ```
   struct SharedState
   {
       float m_startingPointMaxDistance = 0.0f;
   };
     
   auto sharedState = AZStd::make_shared<SharedState>();
   ```
**Note**  
You can add a member to the `EditorPointLightComponentMode` and refer to that in each lambda expression\. However, because only the lambda expressions care about this state, keep its scope as constrained as possible\.

1. Use `AZStd::shared_ptr` to ensure that the lambda expressions capture the pointer by value\. This guarantees that the lambda expressions own the shared state and effectively close over it\. This is similar to a closure in JavaScript\.

   ```
   m_pointMaxDistanceManipulator->InstallLeftMouseDownCallback(
       [this, sharedState] (const AzToolsFramework::LinearManipulator::Action& /*action*/) mutable
   {
       float currentMaxDistance = 0.0f;
       EditorLightComponentRequestBus::EventResult(
           currentMaxDistance, GetEntityId(), &EditorLightComponentRequests::GetPointMaxDistance);
     
       sharedState->m_startingPointMaxDistance = currentMaxDistance;
   });
   ```

1. Reference the data contained in `EditorPointLightComponentMode`\. This provides access to the `EntityId` so that it can capture the `this` pointer\.

   ```
   m_pointMaxDistanceManipulator->InstallMouseMoveCallback(
       [this, sharedState](const AzToolsFramework::LinearManipulator::Action& action)
   {
       const AZ::VectorFloat axisDisplacement = action.LocalPositionOffset().Dot(action.m_fixed.m_axis);
     
       EditorLightComponentRequestBus::Event(
           GetEntityId(), &EditorLightComponentRequests::SetPointMaxDistance,
           (sharedState->m_startingPointMaxDistance + axisDisplacement).GetMax(AZ::VectorFloat(0.1f)));
     
       const AZ::Vector3 localPosition = action.LocalPosition().GetMax(AZ::Vector3(0.1f, 0.0f, 0.0f));
       m_pointMaxDistanceManipulator->SetLocalTransform(AZ::Transform::CreateTranslation(localPosition));
       m_pointMaxDistanceManipulator->SetBoundsDirty();
     
       // ensure property grid values are refreshed
       AzToolsFramework::ToolsApplicationNotificationBus::Broadcast(
           &AzToolsFramework::ToolsApplicationNotificationBus::Events::InvalidatePropertyDisplay,
           AzToolsFramework::Refresh_Values);
   });
   ```

   The callback that you get from the `LinearManipulator` passes a struct called `Action`\. This struct contains information about the current state of the manipulator\.

1. To determine how far you move along the axis, add a `.Dot` between the `LocalPositionOffset` and the fixed axis of the manipulator\. This gives you a projection of the `LocalPositionOffset` onto the axis and the distance moved\.

   ```
   const AZ::VectorFloat axisDisplacement = action.LocalPositionOffset().Dot(action.m_fixed.m_axis);
   ```

   The manipulator action has three parts\. You can specify these properties to control how they should modify your component\.
   + **Fixed** – Contains data associated with the manipulator, which is set at creation\. Often, this is the axis or plane of movement\.
   + **Start** – State of the manipulator at `MouseDown`\.
   + **Current** – Current state of the manipulator during a `MouseMove`\.

1. After you calculate the `axisDisplacement`, specify that value to set the current `PointMaxDistance`, which updates the state of the component\. You must update the `LocalTransform` of the manipulator\. If you don't, the visual representation of the manipulator doesn't change\. To do this, read the `LocalPosition` of the action and set the `LocalTransform` of the manipulator\. 

   ```
   const AZ::Vector3 localPosition = action.LocalPosition().GetMax(AZ::Vector3(0.1f, 0.0f, 0.0f));
   m_pointMaxDistanceManipulator->SetLocalTransform(AZ::Transform::CreateTranslation(localPosition));
   ```

1. After you update the `LocalTransform` of the manipulator, you must mark its bounds as *dirty* so that they can be recalculated for intersection tests\.

   ```
   m_pointMaxDistanceManipulator->SetBoundsDirty();
   ```

1. Enter the following code to notify the editor that you modified a property that needs to be refreshed in the **Entity Inspector**\. If you don't make this update, the component's properties in the **Entity Inspector** don't match with how the component appears in the viewport\.

   ```
   AzToolsFramework::ToolsApplicationNotificationBus::Broadcast(
           &AzToolsFramework::ToolsApplicationNotificationBus::Events::InvalidatePropertyDisplay,
           AzToolsFramework::Refresh_Values);
   ```

1. Register the manipulator with the main `ManipulatorManager`\. This ensures that this manipulator is associated with the main viewport\.

   ```
   m_pointMaxDistanceManipulator->Register(AzToolsFramework::g_mainManipulatorManagerId);
   ```

1. You must unregister the manipulator from the `ManipulatorManager` when it gets destroyed\. To do this, add this function to your Component Mode destructor\.

   ```
   EditorPointLightComponentMode::~EditorPointLightComponentMode()
   {
       m_pointMaxDistanceManipulator->Unregister();
   }
   ```  
**Example**  

   In the following code, override `InstallLeftMouseDownCallback` and `InstallMouseMoveCallback` callbacks to achieve the preferred behavior\. This code lists the callback logic\.

   ```
   struct SharedState
   {
       float m_startingPointMaxDistance = 0.0f;
   };
     
   auto sharedState = AZStd::make_shared<SharedState>();
   m_pointMaxDistanceManipulator->InstallLeftMouseDownCallback(
       [this, sharedState] (const AzToolsFramework::LinearManipulator::Action& /*action*/) mutable
   {
       float currentMaxDistance = 0.0f;
       EditorLightComponentRequestBus::EventResult(
           currentMaxDistance, GetEntityId(), &EditorLightComponentRequests::GetPointMaxDistance);
     
       sharedState->m_startingPointMaxDistance = currentMaxDistance;
   });
     
   m_pointMaxDistanceManipulator->InstallMouseMoveCallback(
       [this, sharedState](const AzToolsFramework::LinearManipulator::Action& action)
   {
       const AZ::VectorFloat axisDisplacement = action.LocalPositionOffset().Dot(action.m_fixed.m_axis);
     
       EditorLightComponentRequestBus::Event(
           GetEntityId(), &EditorLightComponentRequests::SetPointMaxDistance,
           (sharedState->m_startingPointMaxDistance + axisDisplacement).GetMax(AZ::VectorFloat(0.1f)));
     
       const AZ::Vector3 localPosition = action.LocalPosition().GetMax(AZ::Vector3(AZ::VectorFloat(0.1f)));
       m_pointMaxDistanceManipulator->SetLocalTransform(AZ::Transform::CreateTranslation(localPosition));
       m_pointMaxDistanceManipulator->SetBoundsDirty();
     
       // ensure property grid values are refreshed
       AzToolsFramework::ToolsApplicationNotificationBus::Broadcast(
           &AzToolsFramework::ToolsApplicationNotificationBus::Events::InvalidatePropertyDisplay,
           AzToolsFramework::Refresh_Values);
   });
   ```

1. To see a Component Mode in action, switch back to the `EditorPointLightComponent.h` and remove the comment lines that you added to your code\. See [EditorPointLightComponent\.cpp](delegate-component-mode.md#new-component-mode-example)\.

   ```
   #include "EditorPointLightComponentMode"
   
   ...
   
   m_componentModeDelegate.ConnectWithSingleComponentMode<
       EditorPointLightComponent, EditorPointLightComponentMode>(
           AZ::EntityComponentIdPair(GetEntityId(), GetId()), nullptr);
   ```

1. Save your file\.