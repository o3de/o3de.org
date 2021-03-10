---
title: "Frame Rendering Process"
description: "The frame rendering process describes the step-by-step process that the Atom renderer takes to compute each frame."
date: 2020-01-07
toc: true
weight: 200
---

{{< preview-new >}}

The frame rendering process describes the step-by-step process that the Atom renderer takes to compute each frame. For visual aid, please refer to the RPI Overview Diagram below. 

![RPI Overview Diagram](/images/atom-guide/core-systems/rpi/atom-rpi-overview.svg)

## Render Component &rarr; Feature Processor

As a renderer, Atom receives and processes data from its associated simulation and determines how to render the data. A simulation refers to the engine that Atom is rendering items for (such as Atom Sample Viewer and Open 3D Engine). At the start of each render, the simulation sends data to Atom. **Render Components** and **Feature Processors** handle this data flow. Render Components live in the simulation and are responsible for sending data to their corresponding Feature Processor. Feature Processors live in the renderer and are responsible for storing any data that's needed by the renderer to draw the Render Component. Feature Processors can store data in any way they see fit (such as arrays of structures, structure of arrays, one-to-one, one-to-many, and so on) *For example, the mesh Feature Processor stores the transform matrix of the mesh entity.*

When a Render Component is first created, it registers its Feature Processor and receives a unique, identifying index (usually represented by an array). This index allows the Feature Processor to recognize the Render Component in subsequent renders. At every render, the Render Component sends its updated data to the Feature Processor.  

*Example: An animated mesh Component will send new bone matrices to the animated mesh Feature Processor for that frame’s animation.*

## Feature Processor &rarr; Draw Item, Draw Packet
At this point, a Render Component registers with a Feature Processor and before handing an index to the Render Component, the Feature Processor creates corresponding Draw Items and Draw Packets. A **Draw Item** contains the data necessary to render one object in a single pass. In some cases, it's necessary to render one object in multiple passes. *For example, opaque objects should be rendered in the pre-depth, shadow, and forward passes.* When rendering an object in multiple passes, a different Draw Item is rendered for each pass. This collection of Draw Items that pertain to a single object is called a **Draw Packet**. A single mesh might create several Draw Packets (such as LODs or multiple submeshes with different materials). Draw Packets can be recreated if the object swaps shaders or materials. However, since this is not a per-frame update, it is more common that shader and material updates are taken care of by updating and recompiling a Shader Resource Group (SRG). 

Developers writing a new feature must implement their own versions of that feature's Feature Processor and Render Component. Although Draw Items and Draw Packets are universal and apply to all Feature Processors, *how* Feature Processors create them may vary. 

*Example (continued): When an animated mesh Render Component is created, it first registers with the animated mesh Feature Processor. Then, it creates corresponding Draw Packets and Draw Items and hands back a unique, identifying index to the Render Component.*

## Draw Items &rarr; Views, Draw Lists
When Draw Items are ready to be rendered, they need to be filtered first into Views and then into Draw Lists. At this point, Render Components have updated the Feature Processors and the Feature Processors must now hand their Draw Packets over to the Views. **Views** represent a perspective from which the Draw Item should be rendered. *For example, most objects will be seen through the main view and objects with shadows must also be seen through a shadow view.* **Draw Lists** represents which pass or passes a Draw Item will be rendered in. To find out which views the Feature Processor needs to talk to, it queries Views from the `Scene` using a `View List Tag`. Each View culls the Draw Packet using both spatial culling (frustum test) and a `Draw List Mask`. These masks filter out Draw Items and Draw Packets from Views that don't have relevant Draw Lists. *For example, the shadow View should cull out Draw Packets that don't contain any shadow Draw Items.*

When the Draw Packet is accepted to the View, its Draw Items are filtered in Draw Lists using a `Draw List Context`. A Draw List Context is a thread safe container that is used to accumulate Draw Items from multiple threads in Draw Lists. 

*Example (continued): The animated mesh Feature Processor will query main Views and shadow Views from the Scene and submit its Draw Packets to those Views. The Views cull out Draw Packets using spatial culling and Draw List Masks, and then pass the Draw Packets to their Draw List Context. The Draw List Context takes the Draw Items from the Draw Packets and uses their Draw List Masks to filter them in Draw Lists. Shadow Draw Items will get filtered into the shadow Draw Lists inside the shadow Views. Pre-depth and forward Draw Items will get filtered into the pre-depth and forward Draw Lists inside the main Views.*

## Passes
A **Pass** is a group of render work that is responsible for rendering the Draw Lists. When a Pass renders, it queries Views from its **Pipeline** using a `View List Tag`. (A Pipeline is a container around Passes and Views.) It then queries those Views from the Draw Lists using a `Draw List Tag`. 

Passes also create Scopes for the RHI backend. **Scopes** are similar to passes, except that they live in the RHI. When those Scopes get executed, Passes will take Draw Items from the Draw Lists they queries and submit them to an RHI Command List, a list of rendering commands. From there, the RHI finishes off the rendering of the frame. 