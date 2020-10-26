# Step 5: Handle Selection in the Viewport<a name="handling-selection-viewport"></a>

In the following procedure, make changes to your code so that you can enter Component Mode by double\-clicking the component in the viewport\.

 In Component Mode, you can modify the dimensions of the **Point Light** component directly in the viewport\.

**To handle selection in the viewport**

1. In a text editor, open the `EditorPointLightComponent.h` file\.

1. For the last parameter, add the `EditorComponentSelectionRequestsBus::Handler`\.

   ```
   class EditorPointLightComponent
           : public EditorLightComponent
           , private AzToolsFramework::EditorComponentSelectionRequestsBus::Handler
   ```

1. To implement the `EditorComponentSelectionRequests`, you must override the following four functions:

   1. `GetEditorSelectionBoundsViewport` – Returns an AABB encompassing the visible extents of your component

   1. `EditorSelectionIntersectRayViewport` – Where you implement selection for the component

   1. `SupportsEditorRayIntersect` – Override this function and return `true` if you implemented `EditorSelectionIntersectRayViewport`

   1. `GetBoundingBoxDisplayType` – Used for debugging to ensure that the AABB is the correct fit\. This example sets the function to `NoBoundingBox`

   ```
   // EditorComponentSelectionRequests
   AZ::Aabb GetEditorSelectionBoundsViewport(
       const AzFramework::ViewportInfo& viewportInfo) override;
   bool EditorSelectionIntersectRayViewport(
       const AzFramework::ViewportInfo& viewportInfo,
       const AZ::Vector3& src, const AZ::Vector3& dir, AZ::VectorFloat& distance) override;
   bool SupportsEditorRayIntersect() override;
   AZ::u32 GetBoundingBoxDisplayType() override;
   ```

1. Save the file\.

1. In a text editor, open the `EditorPointLightComponent.cpp` file\.

1. Connect and disconnect from the `EditorComponentSelectionRequestsBus` in the `Activate` and `Deactivate` functions of the component\.

   ```
   void EditorPointLightComponent::Activate()
   {
       ...
       AzToolsFramework::EditorComponentSelectionRequestsBus::Handler::BusConnect(GetEntityId());
       ...
   }
     
   void EditorPointLightComponent::Deactivate()
   {
       ...
       AzToolsFramework::EditorComponentSelectionRequestsBus::Handler::BusDisconnect();
       ...
   }
   ```

1. Add the following changes to your code:
   + Add an implementation of `SupportsEditorRayIntersect` to return `true`\. By default, this function returns `false`\.
   + Add an implementation of `GetBoundingBoxDisplayType` to return `AzToolsFramework::EditorComponentSelectionRequests::BoundingBoxDisplay::NoBoundingBox`\. 

   ```
   bool EditorPointLightComponent::SupportsEditorRayIntersect()
   {
       return true;
   }
   
       AZ::u32 EditorPointLightComponent::GetBoundingBoxDisplayType()
   {
           return AzToolsFramework::EditorComponentSelectionRequests::BoundingBoxDisplay::NoBoundingBox;}
   ```
**Note**  
It's possible to instead return the `AzToolsFramework::EditorComponentSelectionRequests::BoundingBoxDisplay:BoundingBox` for debugging, but you shouldn't leave it enabled\.

   The next two functions show how to implement the picking and selection support\.

1. Add the implementation for the `GetEditorSelectionBoundsViewport` function\. 

1. Create an AABB centered around the component covering its extents\. In this case, get the position in world space of the entity and create an AABB with the radius of the point light\. Because the point light is represented as a sphere, use the `GetPointMaxDistance` function\.  
**Example**  

   Your code should look like the following\.

   ```
   AZ::Aabb EditorPointLightComponent::GetEditorSelectionBoundsViewport(
       const AzFramework::ViewportInfo& viewportInfo)
   {
       AZ::Vector3 worldTranslation = AZ::Vector3::CreateZero();
       AZ::TransformBus::EventResult(
           worldTranslation, GetEntityId(), &AZ::TransformInterface::GetWorldTranslation);
     
       return AZ::Aabb::CreateCenterRadius(worldTranslation, GetPointMaxDistance());
   }
   ```

   In the next step, make changes to the `EditorSelectionIntersectRayViewport` function\.  
**Example**  

   ```
   // top of file
   <AzToolsFramework/Picking/Manipulators/ManipulatorBounds.h>
   
   
   ...
   
   bool EditorPointLightComponent::EditorSelectionIntersectRayViewport(
       const AzFramework::ViewportInfo& viewportInfo,
       const AZ::Vector3& src, const AZ::Vector3& dir, AZ::VectorFloat& distance)
   {
       AZ::Transform worldFromLocal = AZ::Transform::CreateIdentity();
       AZ::TransformBus::EventResult(
           worldFromLocal, GetEntityId(), &AZ::TransformInterface::GetWorldTM);
     
       const float minorRadius = 0.1f;
       const float majorRadius = GetPointMaxDistance();
     
       const AZ::Vector3 axes[] = {
           AZ::Vector3::CreateAxisX(), AZ::Vector3::CreateAxisY(), AZ::Vector3::CreateAxisZ()
       };
     
       enum { AxisCount = 3 };
       float distances[AxisCount] = { FLT_MAX, FLT_MAX, FLT_MAX };
       bool intersection = false;
       for (size_t axisIndex = 0; axisIndex < AxisCount; ++axisIndex)
       {
            intersection = intersection
                || AzToolsFramework::Picking::IntersectHollowCylinder(
                    src, dir, worldFromLocal.GetTranslation(), axes[axisIndex],
                    minorRadius, majorRadius, distances[axisIndex]);
       }
     
       distance = AZ::GetMin(AZ::GetMin(distances[0], distances[1]), distances[2]);
        
       return intersection;
   }
   ```

1. Get the position of the entity in world space and approximate a torus or flat hollow cylinder to represent the rings of the **Point Light** component\. The minor radius corresponds to the tube part of the torus, which is its thickness\.

   ```
   const float minorRadius = 0.1f;
   const float majorRadius = GetPointMaxDistance();
   ```

1. You want a radius that is a reasonable size so that you can easily select it in the viewport\. The major radius is the distance from the center of the torus to the middle of the tube\. Because you have a ring for each axis, check that each one is using the `IntersectHollowCylinder` function, which basically approximates a torus\. 

1. Test a ring for each axis and store the intersection distances to find the closest intersection\. 

   ```
   {
       intersection = intersection
            || AzToolsFramework::Picking::IntersectHollowCylinder(
                src, dir, worldFromLocal.GetTranslation(), axes[axisIndex],
                minorRadius, majorRadius, distances[axisIndex]);
   }
   ```

   If a successful intersection occurred, the shortest distance is returned\.

1. Save the file\.