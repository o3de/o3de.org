---
linkTitle: Human Worker
title: Human Worker Gem
description: The Human Worker Gem provides a collection of animated human worker assets that can be used in robotic simulations with Robot Operating System (ROS) 2 in Open 3D Engine (O3DE).
toc: true
---

# Human Worker Gem

![O3DE showing a level with HumanWorkerNavigation prefab](/static/images/user-guide/gems/humanworker-demo.png)

This Gem provides a simulated human worker who can navigate between waypoints in the scene and is visible to any robots that maneuver in the same area. The navigation paths of the non-player characters (NPC) are pre-calculated at the start using [Recast framework](../ai/recast/recast-navigation.md).

Human worker assets are delivered as O3DE prefabs, containing visual models and physics, and required O3DE components. This includes:
* Human worker mesh with textures
* Mesh animations of human standing
* Mesh animations of human walking
* O3DE components for basic navigation of the human worker in a scene

There are multiple prefabs that you can directly import to the scene. The simplest one, `HumanWorkerStatic.prefab`, is a prefab combining mesh and textures. You can use it as a decoration only. `HumanWorker.prefab` is additionally extended by the idle animations. It does not move around the set, as it does not contain any navigation-related components. Add `HumanWorkerNavigation.prefab` to your scene to achieve the fully functional NPC. By default, it comes with a placeholder for two navigation points. The worker walks between these points and stops for the idle animation in each. You can extend the number of waypoints and modify their positions with prefab overrides. Check the [tutorial](/content/docs/learning-guide/tutorials/entities-and-prefabs/override-a-prefab.md) for more details.

You can find an example of this Gem use in [ROSCon2023Demo](https://github.com/RobotecAI/ROSCon2023Demo). This Gem project has a [GitHub repository](https://github.com/RobotecAI/o3de-humanworker-gem). For more information, refer to the _README_ file of the Gem.

## License

The Gem is licensed under [Apache License, Version 2.0](https://opensource.org/licenses/Apache-2.0). You may elect at your option to use the [MIT License](https://opensource.org/licenses/MIT) instead. Contributions must be made under both licenses.