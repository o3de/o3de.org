---
linkTitle: Wind forces
title: Create Global or Localized Wind Forces
description: ' Create global or localized wind forces with PhysX. '
weight: 500
toc: true
---

You can create global wind forces or localized wind forces contained within a collider volume with the **PhysX Force Region** component. Wind forces act on entities with components that can be affected by wind such as [Cloth](/docs/user-guide/components/reference/physx/cloth/) components.

{{< note >}}
**PhysX Rigid Body** components can't be affected by wind, but can be affected by forces from a PhysX Force Region component.
{{< /note >}}

## Create a wind provider entity

{{< tip >}}
Make sure you have the **NVIDIA Cloth** Gem enabled in your project so that you can easily test the results the wind provider entity.
{{< /tip >}} 

1. Create an entity for the wind provider.

1. Add a **Tag** component to the entity. The Tag component is used to specify whether the wind force is global or localized.

1. Specify whether the wind provider is global or localized with a tag value. To determine what value to use for the Tag component, from the **Tools** menu, choose **PhysX Configuration**. At the bottom of the **Global Configuration** tab there is a section labeled **Wind Configuration**.

    ![PhysX Wind Configuration tags](/images/user-guide/interactivity/physics/nvidia-physx/physx-wind-configuration-tags.png)

    Wind Configuration has properties for a **Global wind tag** and a **Local wind tag**. You can use the default values or set them as desired. These tags are used by the PhysX system to identify entities that provide wind forces.

    For this example, use the Global wind tag property value. In the Tag component of the entity, click the {{< icon "add.svg" >}} **Add** button to add a tag element. Give it the value `global_wind`.

    {{< note >}}
    If you choose to use the Local wind tag, the wind force only affects entities that are inside the volume of the **PhysX Collider** you create in the next step.
    {{< /note >}}

1. Add a PhysX Collider component. If you are using the Local wind tag, this collider defines the volume that contains the wind force. With the Global wind tag, the size and position of this collider isn't critical because the wind force is global. However, the collider does provide a useful visualization for the global wind force.

1. Set the PhysX Collider component's **Shape** property to `Box`.

1. Position and scale the PhysX Collider component. Use the move tool to place the entity in the level. Set the **Box Dimensions** property in the PhysX Collider component as desired. If you are creating a localized wind force, you should enlarge the collider dimensions to a size that is large enough to contain the entity that receives the wind force.

1. Add a PhysX Force Region component to the entity. The PhysX Force Region component creates the wind force.

1. In the PhysX Force Region component, click the {{< icon "add.svg" >}} **Add** button to add a new force.

1. In the PhysX Force Region component, in the **Direction** property's **Y** component, set a value of `10.0` to create a direction for the wind force.

1. In the PhysX Force Region component, in the **Magnitude** property, set a value of `50.0` to create magnitude for the wind force.

   The PhysX collider box displays cones representing the wind force direction.

    {{< image-width "/images/user-guide/interactivity/physics/nvidia-physx/physx-wind-entity.png" "800" "PhysX Wind entity setup" >}}

1. To test the wind provider, add an entity with an NVIDIA Cloth mesh. There is an example cloth prefab included in the NVIDIA Cloth Gem that you can drag into the viewport from **Asset Browser**. Navigate to `Gems\NvCloth\Assets\prefabs\Cloth` in Asset Browser. Locate the `cloth_locked_corners_two.prefab` and drag and drop the prefab into the viewport.

1. Use the **Move** tool to place the cloth entity. If you are using the Local wind tag, you must place the cloth asset inside the PhysX Collider volume of the wind provider entity.

    {{< image-width "/images/user-guide/interactivity/physics/nvidia-physx/physx-wind-cloth-entity.png" "500" "PhysX wind cloth entity setup" >}}

1. The `cloth_locked_corners_two.prefab` has the local wind property enabled on it's **Cloth** component. This generates a local wind force from the Cloth component that overrides the wind force from the wind provider you created. The following steps disable the local wind force of the prefab so that you can view the results of the wind provider you created:
        
    1. In **Entity Outliner**, double click the {{< icon "prefab.svg" >}} **cloth_locked_corners_two** prefab to edit it.

    2. Click the {{< icon "entity.svg" >}} **cloth_locked_corners_two** child entity to select it.

    3. With the {{< icon "entity.svg" >}} **cloth_locked_corners_two** entity selected, in **Entity Inspector**, in the Cloth component, disable the **Enable local wind** toggle.

1. Click the {{< icon "simulate-physics.svg" >}} simulate button or press **CTRL + G** to test the wind simulation. The cloth object might flip and stretch wildly as the simulation begins but it quickly settles into a breezy wind simulation.

    ![PhysX Wind entity test](/images/user-guide/interactivity/physics/nvidia-physx/physx-wind-cloth-simulate.png)
