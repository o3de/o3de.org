---
description: ' Create global or localized wind forces with PhysX. '
title: Create global or localized wind forces with PhysX
weight: 500
---

{{< preview-migrated >}}

You can create global wind forces or wind forces contained within a collider volume with the **PhysX Force Region** component. Wind forces act on PhysX entities, such as **Cloth**, that can be affected by wind.

1. Create an entity for the wind provider.

1. Add a **Tag** component to the entity. The **Tag** component will specify whether the wind force is global or localized to a collider volume.

1. Specify whether the wind provider will be global or localized. To determine what value to use for the tag component, from the **File** menu, choose **PhysX Configuration**. At the bottom of the **Global Configuration** tab there is a section labeled **Wind Configuration**.
![\[PhysX Wind Configuration\]](/images/user-guide/physx/physx/ui-physx-wind-configuration.png)

   **Wind Configuration** has properties for a **Global wind tag** and a **Local wind tag**. You many use the default values or set them as desired. These tags are used by the PhysX wind system to detect entities that provide wind data.

   For this example use the **Global wind tag** property value. In the **Tag** component of the entity, add a tag element and give it the value **global\_wind**.
**Note**
If you choose to use the **Local wind tag**, the wind will only affect entities that are inside the volume of the **PhysX Collider** you create in the next step.

1. Add a **PhysX Collider** component. If you are using the **Local wind tag**, this collider will define the volume of the wind force. With the **Global wind tag**, the size and position of this collider does not matter because the wind will be global, however, the collider will provide a useful visualization for the global wind force.

1. Set the **PhysX Collider** component's **Shape** property to **Box**.

1. Scale and position the **PhysX Collider** component. Use the move tool to place the entity in the level, and set the **Box Dimensions** property in the **PhysX Collider** component as desired.

1. Add a **PhysX Force Region** component to the entity. The **PhysX Force Region** component creates the wind force.

1. In the **PhysX Force Region** component, specify **10.0** in the **Direction** property's **Y** component to set a direction for the wind force.

1. In the **PhysX Force Region** component, specify **50.0** in the **Magnitude** property to create magnitude for the wind force.

   The PhysX collider box in **Perspective** displays cones and vectors representative of the wind force direction.
![\[PhysX Wind entity setup\]](/images/user-guide/physx/physx/ui-physx-wind-entity.png)

1. To test the wind provider, add an entity with a **Cloth** mesh. There is an example slice asset you can drag into **Perspective** from **Asset Browser**. Navigate to `Gems\NvCloth\Assets\slices` in **Asset Browser**. Locate the `cloth_locked_corners_two.slice` and drag and drop the slice into **Perspective**.

1. Use the **Move** tool to place the cloth entity. If you are using the **Local wind tag**, you must place the cloth asset inside the **PhysX Collider** volume.
![\[PhysX Wind entity setup\]](/images/user-guide/physx/physx/ui-physx-wind-cloth-entity.png)

1. Press **Control + G** to test the wind simulation.

![\[PhysX Wind entity test\]](/images/user-guide/physx/physx/anim-wind-example.gif)
