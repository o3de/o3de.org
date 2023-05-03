---
title: "Get Ready to Level Up Your 3D Game and Robotics Simulations with Open 3D Engine Version 23.05 and Join the O3DE Jam for Creative Fun"
date: 2023-05-04
slug: 23-05-release
author: Royal O’Brien
blog_img: "/images/blog/announcement_thumbnail.jpg"
full_img: ""
---

We’re excited to announce the newest release of the [Open 3D Engine (O3DE)](https://www.o3de.org/), Version 23.05, which is jam-packed with enhancements and new features. In addition to usability and stability improvements, new capabilities will help enable developers to build games, robotic simulations and other 3D applications alike.

To celebrate, we’re holding our first-ever [O3DE Jam](https://o3d.foundation/blog/calling-all-open-source-3d-developers-lets-jam-in-the-wasteland/) beginning tomorrow where the community can come together to build some seriously cool 3D experiences using all the new features of this latest release.

Read on for a few of the highlights, get the details in the [release notes](https://www.o3de.org/docs/release-notes/22-10-0/), and join the jam!

**Empowering Game and Robotics Simulation Devs to Create Amazing Experiences**

In addition to many enhancements to the core engine, the O3DE 23.05 release brings some cool new features for game creators and robotics simulation developers to level up their authoring experience. 

The new [Multiplayer Sample Game (MPS)](https://github.com/o3de/o3de-multiplayersample) provides client and dedicated server reference implementations of common game elements at play to help game developers jumpstart new projects. This game also delivers key examples of integrations with O3DE systems like terrain, lighting, audio, scripting, VFX and more. It also utilizes the Atom Renderer's advanced features to achieve its visual goals, including global illumination, cascade shadows, emissive surfaces, bounce lighting, temporal anti-aliasing, and hybrid reflections (screen space and ray tracing). And with support for up to 10 players, it's like a big party where everyone can join in on the fun. We can’t wait to see how the O3DE community mods, expands, and contributes to this game!

{{< image-width src="/images/blog/23-05-release/image01.png" width="100%" alt="Mulitplayer Sample Game" >}}

Plus, O3DE’s integration with the Robot Operating System (ROS) via the [ROS2 Gem](https://github.com/o3de/o3de-extras/tree/development/Gems/ROS2) means robotics simulation developers can also get in on the action, with tools, components and assets to build [robotics simulations](https://development--o3deorg.netlify.app/docs/user-guide/interactivity/robotics/overview/) with O3DE. This Gem now offers increased stability and new features, from an importer, project templates and additional sensors to multi-camera and physics enhancements. And, comprehensive documentation is now available.

Adam Dabrowski, VP of Robotics and Simulation at Robotec.ai, said this about the new capabilities: "With O3DE, you can actually write ROS 2 code inside your simulation project. We made use of the fact that O3DE is C++ based so it is quite easy to have a direct integration with ROS 2.”

{{< image-width src="/images/blog/23-05-release/image02.png" width="100%" alt="ROS Gem" >}}

**Increased Usability and Performance for a Diversity of 3D Applications**

This latest release makes it even easier for developers to harness O3DE for a multitude of 3D projects:

●	**Craft your own unique shaders and materials** using [Material Canvas](https://github.com/o3de/sig-graphics-audio/issues/51), a fresh, easy-to-use visual scripting interface that blends the power of Script Canvas and the Material Editor. 
●	**Customize the render pipeline more easily than ever** with a Material Pipeline.
●	**Manage assets like a boss** using the Asset Browser, with different layout options, file operations, an asset inspector panel, and other operations.
●	**Install multiple versions of O3DE on the same drive**, with projects aware of which O3DE version they were created in and last used with.
●	**Specify compatible platforms for gems you create**, which can be filtered in the Gem Catalog.
●	**Add menus, hotkeys and contextual actions from Gems and Python scripts** with enhanced extensibility of the Editor though a new [Action Manager API](https://www.o3de.org/docs/user-guide/action-manager/).

{{< image-width src="/images/blog/23-05-release/image03.png" width="100%" alt="Material Canvas" >}}

*Material Canvas, a new, intuitive visual scripting interface, combines the powerful, familiar capabilities of Script Canvas and the Material Editor, allowing users to create generative materials and custom shaders.*

{{< image-width src="/images/blog/23-05-release/image04.png" width="100%" alt="Material Canvas Example" >}}

*This striped design, created with Material Canvas, uses vertex offset to give the material a wavy pattern, which also highlights the material offset when creating a new shader.* 

*The Material Pipeline further simplifies customization to balance the performance and quality of the render pipeline regardless of the platform or hardware.*

{{< image-width src="/images/blog/23-05-release/image05.png" width="100%" alt="Project Manager" >}}

*Using the Project Manager, users can install multiple versions of O3DE on the same drive, with projects aware of which O3DE version they were created in and last used with.* 

*Developers can also add commercial, personal, and open source project repositories in one place, allowing them to find more gems without having to download or manually install them.*

{{< image-width src="/images/blog/23-05-release/image06.png" width="100%" alt="Gem Manager" >}}

**Users can now specify compatible platforms for gems they create, which can be filtered in the Gem Catalog, using the Project Manager.**

O3DE picks up the pace with this latest release, boasting increased performance and new features such as:

●	**Physics:** In addition to improvements in multiple PhysX authoring workflows, users can now enable support for [PhysX 5.1](https://github.com/o3de/o3de/issues/13624) with a simple flag in O3DE, which shows a 15% increase in simulation performance compared with PhysX 4, as well as improvements in multiple PhysX authoring workflows.
●	**Animations:** Along with a more consistent [Animation Editor](https://github.com/o3de/o3de/issues/10666) experience and a more robust, streamlined [Animation Asset Import](https://github.com/o3de/o3de/issues/12387) process, the Animation Editor AnimGraph now has a [Performance Visualizer](https://github.com/o3de/o3de/pull/13490) to help users profile and optimize their AnimGraphs.
●	**Terrain System:** A new [paintbrush](https://www.o3de.org/docs/user-guide/components/reference/paintbrush/paintbrush/) tool enables users to paint inside the viewport to create or modify terrain, while a new [Terrain Developer Guide](https://www.o3de.org/docs/user-guide/visualization/environments/terrain/terrain-developer-guide/) aids developers in using and extending the terrain system.
●	**VR/XR and Mobile Support:** New [OpenXR and OpenXRVk Gems](https://github.com/o3de/o3de/issues/12372) deliver support for OpenXR-compatible devices, such as Meta Quest 2, including stereoscopic rendering, while the addition of half-float support for the Atom renderer improves the performance on mobile devices.

{{< image-width src="/images/blog/23-05-release/image07.png" width="100%" alt="Paintbrush Tool" >}}

**Users can paint inside the viewport to create or modify terrain, aided by the new paintbrush tool.** 

From improvements in the authoring experience and core workflow enhancements to a plethora of new features and capabilities, this release offers a treasure trove of goodness for 3D developers around the globe. We’ve highlighted only a fraction of what’s included in this newest release. To dive into all of its features, read the [release notes](https://www.o3de.org/docs/release-notes/22-10-0/), or join the community on [Discord](https://bit.ly/o3deDiscord). You can [download](https://www.o3de.org/download/) the 22.03 Release today. 

And get ready to flex your creativity and let your imagination run wild with the newest O3DE release in the [O3DE Jam](https://o3d.foundation/blog/calling-all-open-source-3d-developers-lets-jam-in-the-wasteland/), which starts tomorrow! With a “Navigating the Wasteland” theme, the Jam will bring the community together for a fun-filled adventure of experimentation, where you can create the most wacky and wild 3D experiences using all the incredible new features. Winners will receive open source cred, visibility, free IGDA membership and credits to spend on O3DE-branded merchandise. We can't wait to see what you'll come up with! [Register today](https://itch.io/jam/o3de-jam).

{{< image-width src="/images/blog/23-05-release/image08.jpg" width="100%" alt="03DE Jam" >}}

Our community has been the fuel that has accelerated the Open 3D Engine's growth, paving the way for creators seeking a flexible, modular approach to crafting captivating 3D worlds. We’re deeply grateful for their tireless efforts and inspired by their achievements with this latest release. We can’t wait to see what they accomplish next!