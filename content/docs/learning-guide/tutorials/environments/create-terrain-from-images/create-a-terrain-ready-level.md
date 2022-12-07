---
linkTitle: Create a Terrain-Ready Level
title: Create a Terrain-Ready Level
description: Create a new level that is ready for authoring terrain.
weight: 100
toc: true
---

In this tutorial section, you will create a new level that is ready for authoring terrain.

## Create a new level

1. In **O3DE Editor**, create a new level. (Refer to the [Create a new level](/docs/learning-guide/tutorials/reference/environments/create-a-level) tutorial for more details)

2. Delete the **Grid**, **Ground**, and **Shader Ball** entities underneath the **Atom Default Environment** so that the terrain you will build is fully visible.

    {{< image-width src="/images/learning-guide/tutorials/environments/terrain-from-images/delete-default-entities.png" alt="Delete several default entities." >}}

3. On the **Global Sky** entity, delete the [**HDRi Skybox**](/docs/user-guide/components/reference/atom/hdri-skybox/) component. The default skybox has terrain in the skybox image which will clash with the terrain that you'll create below. Instead, you'll use the **Sky Atmosphere** component, which provides an empty sky background.

    {{< image-width src="/images/learning-guide/tutorials/environments/terrain-from-images/delete-hdri-skybox.png" alt="Delete the HDRi Skybox component." >}}

4. In **Entity Outliner**, select the **Sun** entity.

5. In **Entity Inspector**, choose **Add Component** and add the **Sky Atmosphere** component. By adding it to the **Sun** entity, the sky lighting will automatically align with the sun's orientation in the sky.

    {{< image-width src="/images/learning-guide/tutorials/environments/terrain-from-images/add-sky-atmosphere.png" alt="Add the Sky Atmosphere component." >}}

You now have an empty level except for a sun and blue sky.

{{< image-width src="/images/learning-guide/tutorials/environments/terrain-from-images/terrain-empty-level.png" alt="Illustration of the new empty level with the sky component configured." >}}

## Enable the terrain system

To enable the terrain system, you must add two level components to the **Level** entity. After adding these components, the terrain system will be enabled, but no terrain will be visible yet.

1. In **Entity Outliner**, select the **Level** entity.

    {{< image-width src="/images/learning-guide/tutorials/environments/terrain-from-images/enable-terrain-select.png" alt="Select the Level entity." >}}

2. In **Entity Inspector**, choose **Add Component** and add both the [**Terrain World**](/docs/user-guide/components/reference/terrain/world) and [**Terrain World Renderer**](/docs/user-guide/components/reference/terrain/world-renderer) level components to the **Level** entity.

    {{< image-width src="/images/learning-guide/tutorials/environments/terrain-from-images/enable-terrain-components.png" width="600" alt="Add terrain level components." >}}

There are many properties available in the terrain level components that configure the terrain system settings for the level. For now, leave the settings at the default values. They are easier to tune once a terrain exists in the level.
