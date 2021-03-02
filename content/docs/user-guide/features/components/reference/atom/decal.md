---
description: ' Open 3D Engine (O3DE) Decal component reference. '
title: Decal component
---

The **Decal** component enables an entity to project a material onto a mesh. The decal is projected along the positive Z axis of the entity in local space (denoted by a red X). The decal is projected onto any mesh from any entity that penetrates the bounding box of the entity containing the decal component. The decal can be resized by adjusting the Scale property of the Transform of the entity containing the Decal component.

**Provided by:** [Atom Gem](/docs/user-guide/features/gems/reference/atom)

## Base properties ##

![Decal component base properties](/images/user-guide/features/components/reference/atom/decal-component-ui-01.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Attenuation Angle** | The effect of the angle between the decal and the projection surface on the opacity of the decal material. With the default value of 1.0, the decal will become more transparent as the angle between the decal and the projection surface increases. A value of 0.0 will make the decal opacity uniform regardless of the angle between the decal and the projection surface. | 0.0 - 1.0 | 1.0 |
| **Opacity** | The opacity of the decal. A value of 0.0 is transparent. A value of 1.0 is opaque. | 0.0 - 1.0 | 1.0 |
| **Sort Key** | The sorting order for the decal. Decals with larger Sort Key values will appear on top of decals with smaller Sort Key values. | 0 - Infinity | 16 |
| **Material** | The material to project as a decal. | .material file |  |
