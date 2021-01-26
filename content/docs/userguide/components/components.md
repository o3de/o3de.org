---
description: ' Choose components to add to your entities and enhance your level with
  Amazon Lumberyard''s component entity system. '
title: Component Reference
---
# Component Reference {#component-components}

You can use the **Entity Inspector** to add the following components to you entities\.

**Note**
Some components are only available through gems\. For example, you must enable the [Rain](/docs/userguide/gems/builtin/rain.md) gem for your project, so that the **[Rain](/docs/userguide/components/rain.md)** component is available\.
For more information, see [Add modular features and assets with Gems](/docs/userguide/gems/builtin/s.md)\.

## AI {#component-entity-AI}
+ [Behavior Tree](/docs/userguide/components/behavior-tree.md)
+ [Navigation](/docs/userguide/components/navigation.md)
+ [Navigation Area](/docs/userguide/components/nav-area.md)
+ [Navigation Seed](/docs/userguide/components/nav-seed.md)

## Animation {#component-entity-animation}
+ [Actor](/docs/userguide/components/actor.md)
+ [AnimGraph](/docs/userguide/components/animgraph.md)
+  [Anim Graph Net Sync](/docs/userguide/components/animgraph-netsync.md)
+ [Attachment](/docs/userguide/components/attachment.md)
+ [Simple Motion](/docs/userguide/components/simple-motion.md)

## Audio {#component-entity-audio}
+ [Audio Area Environment](/docs/userguide/components/audio-area-environment.md)
+ [Audio Environment](/docs/userguide/components/audio-environment.md)
+ [Audio Listener](/docs/userguide/components/audio-listener.md)
+ [Audio Preload](/docs/userguide/components/audio-preload.md)
+ [Audio Proxy](/docs/userguide/components/audio-proxy.md)
+ [Audio Rtpc](/docs/userguide/components/audio-rtpc.md)
+ [Audio Switch](/docs/userguide/components/audio-switch.md)
+ [Audio Trigger](/docs/userguide/components/audio-trigger.md)

## Camera {#component-entity-camera}
+ [Camera](/docs/userguide/components/camera.md)
+ [Camera Rig](/docs/userguide/components/camera-rig.md)

## Editor {#component-entity-editor}
+ [Comment](/docs/userguide/components/comment.md)

## Environment {#component-entity-environment}
+ [Fog Volume](/docs/userguide/components/fog-volume.md)
+  [Infinite Ocean](/docs/userguide/components/infinite-ocean.md)
+ [Lightning](/docs/userguide/components/lightning.md)
+ [Lighting Arc](/docs/userguide/components/lightning-arc.md)
+ [Rain](/docs/userguide/components/rain.md)
+ [Sky Cloud](/docs/userguide/components/sky-cloud.md)
+  [Sky Highlight](/docs/userguide/components/sky-highlight.md)
+ [Snow](/docs/userguide/components/snow.md)
+  [Water Volume](/docs/userguide/components/water-volume.md)

## Gameplay {#component-entity-gameplay}
+ [Input](/docs/userguide/components/input.md)
+ [Random Timed Spawner](/docs/userguide/components/random-timed-spawner.md)
+ [Simple State](/docs/userguide/components/simple-state.md)
+ [Spawner](/docs/userguide/components/spawner.md)
+ [Tag](/docs/userguide/components/tag.md)

## Network {#component-entity-network}
+ [Network Binding](/docs/userguide/components/network-binding.md)

## PhysX {#component-entity-physx}

The following components support the PhysX system, which is not compatible with the legacy physics system\. You can't use components interchangeably between each system\.

For more information, see [Simulating physics behavior with the PhysX system](/docs/userguide/nvidia/physx/intro.md)\.
+ [PhysX Ball Joint component](/docs/userguide/components/physx-ball-joint.md)
+ [Cloth component](/docs/userguide/components/cloth.md)
+ [Blast Family component](/docs/userguide/components/blast-family.md)
+ [Blast Family Mesh Data component](/docs/userguide/components/blast-family-mesh-data.md)
+ [PhysX Character Controller](/docs/userguide/components/physx-character-controller.md)
+ [PhysX Collider](/docs/userguide/components/physx-collider.md)
+ [PhysX Fixed Joint component](/docs/userguide/components/physx-fixed-joint.md)
+ [PhysX Force Region](/docs/userguide/components/physx-force-region.md)
+ [PhysX Hinge Joint component](/docs/userguide/components/physx-hinge-joint.md)
+ [PhysX Ragdoll](/docs/userguide/components/physx-ragdoll.md)
+ [PhysX Rigid Body](/docs/userguide/components/physx-rigid-body-physics.md)
+ [PhysX Shape Collider](/docs/userguide/components/physx-shape-collider.md)
+ [PhysX Terrain](/docs/userguide/components/physx-terrain.md)

## Physics \(Legacy\) {#component-entity-physics-legacy}

The components for the legacy physics system are not compatible with the PhysX system\. For more information, see [Physics](https://docs.aws.amazon.com/lumberyard/latest/legacyreference/physics-intro.html) in the *Amazon Lumberyard Legacy Reference*\.

## Rendering {#component-entity-rendering}
+ [Area Light](/docs/userguide/components/area-light.md)
+ [Decal](/docs/userguide/components/decal.md)
+ [Environment Probe](/docs/userguide/components/environment-probe.md)
+ [Geom Cache](/docs/userguide/components/geom-cache.md)
+ [High Quality Shadow](/docs/userguide/components/high-quality-shadow.md)
+ [Lens Flare](/docs/userguide/components/lens-flare.md)
+ [Mesh](/docs/userguide/components/static-mesh.md)
+ [OccluderArea](/docs/userguide/components/occluder-area.md)
+ [Particle](/docs/userguide/components/particle.md)
+ [Point Light](/docs/userguide/components/point-light.md)
+ [Portal](/docs/userguide/components/portal.md)
+ [Projector Light](/docs/userguide/components/projector-light.md)
+ [Render to Texture](/docs/userguide/components/render-to-texture.md)
+ [VisArea](/docs/userguide/components/vis-area.md)

## Scripting {#component-entity-scripting}
+ [Lua Script](/docs/userguide/components/lua-script.md)
+  [Script Canvas](/docs/userguide/components/script-canvas.md)
+ [Trigger Area](/docs/userguide/components/triggerarea.md)

## Shape {#component-entity-shape}
+ [Box Shape](/docs/userguide/components/shapes.md)
+ [Capsule Shape](/docs/userguide/components/shapes.md)
+ [Compound Shape](/docs/userguide/components/shapes.md)
+ [Cylinder Shape](/docs/userguide/components/shapes.md)
+ [Polygon Prism Shape](/docs/userguide/components/polygon-prism.md)
+ [Sphere Shape](/docs/userguide/components/shapes.md)
+  [Spline](/docs/userguide/components/spline.md)
+  [Tube Shape](/docs/userguide/components/tube-shape.md)
+  [White Box component](/docs/userguide/components/white-box.md)
+  [White Box Collider component](/docs/userguide/components/white-box-collider.md)

## Terrain {#component-entity-terrain}
+ [Legacy Terrain level component](/docs/userguide/components/legacy-terrain.md)
+ [River](/docs/userguide/components/river.md)
+ [Road](/docs/userguide/components/road.md)

## UI {#component-entity-UI}
+ [UI Canvas Asset Ref](/docs/userguide/components/ui-canvas-asset-ref.md)
+ [UI Canvas Proxy Ref](/docs/userguide/components/ui-canvas-proxy-ref.md)
+ [UI Canvas on Mesh](/docs/userguide/components/ui-canvas-on-mesh.md)

## VR {#component-entity-vr}
+ [VR Preview](/docs/userguide/components/vrpreview-component.md)

## Miscellaneous {#component-entity-miscellaneous}
+ [Transform](/docs/userguide/components/transform.md)
