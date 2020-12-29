# Setting Global \(Time of Day\) Volumetric Fog<a name="rendering-graphics-fog-volumetric-global"></a>

You can use global volumetric fog to simulate particles that are distributed uniformly along the ground and fall off exponentially with height above sea level\. Global volumetric fog accurately accounts for time of day lighting and for scattered sunlight rays to produce halos around the sun\.

Use the **Anisotropy** parameters to control the amount of sunlight that is scattered through fog and the direction\. Set the **Anisotropy \(atmosphere\)** parameter close to 0 to achieve a uniform look across the entire sky\. Set the **Anisotropy \(sun radial\)** parameter close to 1 to create a bloom effect around the sun\.

The **Radial blend** parameters blend the **Anisotropy** parameters to create various effects\. For example, you can create sun radial scattering by setting **Radial blend mode** to `1` and **Radial blend factor** to `1`\. 

**To set global volumetric fog parameters**

1. In Lumberyard Editor, click **Tools**, **Other**, **Time Of Day\.**

1. In the **Parameters** pane, for **Volumetric fog**, adjust the [Volumetric Fog Parameters](sky-tod-parameters.md#volumetric-fog-time-of-day-parameters) as needed\.

1. Close the **Time of Day** editor\.