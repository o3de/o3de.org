---
title: Sky Atmosphere Component
linktitle: Sky Atmosphere
description: 'Open 3D Engine (O3DE) Sky Atmosphere component reference.'
toc: true
---

The **Sky Atmosphere** component provides physically-based sky and atmosphere rendering capabilities.

The sky is rendered by sampling points on rays that start at the camera and intersect with the atmosphere.  Because sampling many rays every frame is an expensive operation, luminence and volume look up tables are used to perform fewer calculations.  

![Sky atmosphere in desert mountain scene](/images/user-guide/components/reference/atom/sky-atmosphere/desert-day.jpg)

## Provider

[Atom Gem](/docs/user-guide/gems/reference/rendering/atom/atom/)

## Properties

![sky-atmosphere-component-properties](/images/user-guide/components/reference/atom/sky-atmosphere/sky-atmosphere-component-properties.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Origin** | The origin to use for the atmosphere.  When `Ground at world origin` (default) is selected, the bottom of the atmosphere - the ground - will be at the world origin, or `0,0,0`.  If `Ground at local origin` is used, then the bottom of the atmosphere will be at the world position of the Transform Component for the entity the Sky Atmosphere component is on.  Using `Ground at local origin` gives you an easy way to control the position of the bottom of the atmosphere.  One practical use for `Ground at local origin` is to move the ground position down so you have a more gradual gradient transition from surface to sky.  Try using `Ground at local origin` and moving the entity transform down by setting the `Z` value to `-100` to get a smoother transition. The `Planet center at local origin` is makes the center of the planet for the atmosphere at the world position of the Transform component for the entity the Sky Atmosphere component is on.  The `Planet center at local origin` is useful when you want to have atmosphere for planets. | `Ground at world origin`,`Ground at local origin`, `Planet center at local origin`| `Ground at world origin` |
| **Ground radius** | The ground radius for planet in kilometers. | `0.0 km` - `100000.0 km`  | `6360.0 km`  |
| **Ground albedo** | Additional light color from the surface of the ground. |  | `0.0 0.0 0.0` |
| **Atmosphere height** | Atmosphere height in kilometers. | `0.0 km` - `10000.0 km` | `100.0 km` |
| **Illuminance factor** | An additional factor to brighten or darken the overall atmosphere | | `0.0 0.0 0.0` |
| **Rayleigh scattering scale** | Raleigh scattering scale used to get the Rayleigh scattering values into a range that can easily be controlled with a color picker. | `0.0` - `1.0` | `0.0331` |
| **Rayleigh scattering** | Raleigh scattering coefficients from air molecules at surface of the planet. | | `0.175287 0.409607 1.0` |
| **Rayleigh exponential distribution** | Altitude at which Rayleigh scattering is reduced to roughly 40% in kilometers. | | `8 km` |
| **Mie scattering scale** | Mie scattering scale used to get the Mie scattering values into a range that can easily be controlled with a color picker. | | `0.003996` |
| **Mie scattering** | Mie scattering coefficients from aerosole molecules at surface of the planet. | | `1.0 1.0 1.0` |
| **Mie absorption scale** | Mie absorption scale used to get the Mie absorption values into a range that can easily be controlled with a color picker. | | `0.004440` |
| **Mie absorption** | Mie absorption coefficients from aerosole molecules at surface of the planet. | | `1.0 1.0 1.0` |
| **Mie exponential distribution** | "Altitude at which Mie scattering is reduced to roughly 40% in kilometers. | | `1.2 km` |
| **Ozone absorption scale** | Ozone molecule absorption scale used to get the ozone absorption values into a range that can easily be controlled with a color picker. | | `0.001881` |
| **Ozone absorption** | Absorption coefficients from ozone molecules in a layer most dense at roughly the middle height of the atmosphere. | | `0.345561 1.0 0.045188` |
| **Aerial depth factor** | A factor applied to the scene depth to increase or decrease aeriel perspective. | | `1.0` |
| **Show sun** | Whether to show the sun or not. | | `True` |
| **Sun orientation** | Optional entity to use for the orientation of the sun.  When set, the sun will use the entity's rotation.  If no entity is specified, the rotation in the transform component from the entity the component is on will be used for the sun rotation. | | |
| **Sun color** | Sun color. | | `1.0 1.0 1.0 1.0` |
| **Sun luminance factor** | Sun luminance factor, used to increase the brightness of the sun. | `0.0` - `1000000.0` | `0.05` |
| **Sun limb color** | Sun limb color - the outer edge color of the sun. | | `1.0 1.0 1.0 1.0` |
| **Sun radius factor** | Sun radius factor, used to set the size of the sun disk. | `0.0001` - `100.0` | `1.0` |
| **Sun falloff factor** | Sun falloff factor, used to control the inner falloff when less than `1.0` and outer falloff when greater than `1.0`. | `0.0` - `200.0`| `1.0` |
| **Fast sky** | Enable to use a less accurate but faster performing sky algorithm that uses a small look up table to approximate the color of the visible sky. When not active, a ray is cast into the sky for every pixel instead of using the look up table. | | `True` |
| **Fast aerial perspective** | Enable to use a volume look-up-texture for faster performance but more memory. | | `True` |
| **Aerial perspective** | Enable to draw the effect of atmosphere scattering on objects in the scene. | | `True` |
| **Enable shadows** | Enable sampling of shadows in the atmosphere. | | `False` |
| **Near clip** | Distance at which to start drawing the atmosphere.  This can be useful to prevent the affect of atmosphere scattering inside buildings. | | `0.0` |
| **Near fade distance** | Distance over which to fade in the atmosphere in meters. If set to `0.0` no fade is performed.  This can be useful when using the near clip setting to fade in the atmosphere aerial perspective. | | `0.0` |
| **Min samples** | Minimum number of samples when tracing.  More samples improves accuracy at a higher performance cost. | `1` - `64`| `4` |
| **Max samples** | Maximum number of samples when tracing. More samples improves accuracy at a higher performance cost. | `1` - `64`| `14` |


## Examples

### Desert sun 

![Sky atmosphere in desert mountain scene](/images/user-guide/components/reference/atom/sky-atmosphere/desert-day.jpg)

#### Step 1. Turn off the existing skybox
If your scene has an **HDRI skybox** component you may want to remove or disable the component unless it has content in it you want to see through the sky like clouds.

#### Step 2. Add the **Sky atmosphere** component 
Add the **Sky atmosphere** component to the entity in your scene that has the light component on it for the sun.

#### Step 3. Rotate the sun as needed 
Rotate the sun entity by setting the **Rotate** field in the **Transform component**, in the example image above the values are set to X: `-151.0` Y: `0.0` Z: `16.0`.

#### Step 4. Adjust the atmosphere altitude
 Set the **Sky atmosphere** origin to **Ground at local origin** and set the sun entity `Z` component of the **Transform Component** to `-500.0` so the perspective is higher in the atmosphere and the transition between sky and ground is smoother.
#### Step 5. Add **Bloom** 
Add **Bloom** and **Post FX Layer** components to the sun entity and turn the **Enable Bloom** setting on. Set the **Intensity** to `0.1`.

#### Step 6. Make the sun yellow
Adjust the **Sky Atmosphere** sun settings to be more orange with a softer falloff:
* Sun color: `255,235,176`
* Sun luminance factor: `10.0`
* Sun limb color: `215,87,12`
* Sun radius factor: `7.0`
* Sun falloff factor: `102.0`

Adjust the **Directional light Sky Atmosphere** color to be `251,247,220`.

(Optional) If you are casting shadows in a large scene you will also want to increase your **Shadow far clip** and adjust the split ratio so your shadows adequately cover the objects in the scene.



### Sunset sky with exaggerated aerial perspective 

![Sky atmosphere in sunset mountain scene](/images/user-guide/components/reference/atom/sky-atmosphere/sunset-aerial-perspective-shadows.jpg)

#### Step 1. Turn off the existing skybox
If your scene has an **HDRI skybox** component you may want to remove or disable the component unless it has content in it you want to see through the sky like clouds.

#### Step 2. Add the **Sky atmosphere** component 
Add the **Sky atmosphere** component to the entity in your scene that has the light component on it for the sun.

#### Step 3. Rotate the sun to the horizon
Rotate the sun entity so that the sun is just above the horizon by setting the **Rotate** field to X: `180.0` Y: `0.0` Z: `0.0`
#### Step 4. Adjust the atmosphere altitude
 Set the **Sky atmosphere** origin to **Ground at local origin** and set the sun entity `Z` component of the **Transform Component** to `-500.0` so the perspective is higher in the atmosphere and the transition between sky and ground is smoother.
#### Step 5. Add **Bloom** 
Add **Bloom** and **Post FX Layer** components to the sun entity and turn the **Enable Bloom** setting on. Set the **Intensity** to `1.0`.
#### Step 6. Make the sun yellow
Adjust the **Sky Atmosphere** sun settings to get a sunset that looks more like sunset:
* Sun color: `255,235,176`
* Sun luminance factor: `1.0`
* Sun limb color: `234,86,0`
* Sun radius factor: `6.0`
* Sun falloff factor: `3.0`

Adjust the **Directional light Sky Atmosphere** color to be `216,69,20`.

(Optional) If you are casting shadows in a large scene you will also want to increase your **Shadow far clip** and adjust the split ratio so your shadows adequately cover the objects in the scene.

#### Step 8. Increase the aerial perspective

Set the **Aerial depth factor** to `5.0` to really increase the thickness of the atmosphere in front of distant objects. Note that at this time increasing the atmosphere thickness with this setting will not take into account shadowed regions so if the sun goes behind a mountain you may get an unwanted glow where there should be none.

### Multiple sky atmospheres on miniature planets

![miniature planet atomspheres](/images/user-guide/components/reference/atom/sky-atmosphere/planet-atmosphere.png)

Multiple atmospheres can exist in a scene such as the one above if you use set the **Sky atmosphere** origin to `Planet center at local origin` and scale the **Ground radius** to fit the planets and the **Atmosphere height** to an appropriate value.  In order to get the desired transition of thick atmosphere to space you will need to adjust the **Mie exponential distribution** and **Rayleigh exponential distribution** to be values that are inside the new atmosphere height.  In an earth-like atmosphere the **Rayleigh exponential distribution** is roughly 8% the height of the overall atmosphere height, and the **Mie exponential distribution** 1.2% the height.

When outside the atmosphere you will likely need to turn off **Fast sky** and **Fast aerial perspective** to avoid graphic artifacts as the look up tables have not been optimized for use when outside the atmosphere.