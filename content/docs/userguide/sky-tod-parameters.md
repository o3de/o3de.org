# Time of Day Parameters<a name="sky-tod-parameters"></a>

Set the following parameters to customize your sun, fog, and shadow settings\.

**Topics**
+ [Sun Parameters](#sun-time-of-day-parameters)
+ [Fog Parameters](#fog-time-of-day-parameters)
+ [Volumetric Fog Parameters](#volumetric-fog-time-of-day-parameters)
+ [Sky Light Parameters](#sky-light-time-of-day-parameters)
+ [Night Sky Parameters](#night-sky-time-of-day-parameters)
+ [Night Sky Multiplier Parameters](#night-sky-multiplier-time-of-day-parameters)
+ [Cloud Shading Parameters](#cloud-shading-time-of-day-parameters)
+ [Sun Ray Effects Parameters](#sun-ray-effects-time-of-day-parameters)
+ [Advanced Parameters](#advanced-time-of-day-parameters)
+ [Filters Parameters](#filters-time-of-day-parameters)
+ [Depth of Field Parameters](#depth-of-field-time-of-day-parameters)
+ [Shadows Parameters](#shadows-time-of-day-parameters)

## Sun Parameters<a name="sun-time-of-day-parameters"></a>


****  

| Sun | Type | Value | Description | 
| --- | --- | --- | --- | 
| Sun color | R,G,B | 0 to 254 |  Sets the color \(RGB values\) of the sun\. You can use this parameter along with **Sun intensity** to provide the preferred scene luminance\.  This parameter is also used to control the color and intensity of the light from the moon\.   | 
| Sun intensity \(lux\) | float | 0\.00 to 550000\.00 |  Sets the brightness of the sun\. This value is multiplied by the sun color to yield the overall color\.  | 
| Sun specular multiplier | float | 0\.0 to 4\.0 |  Controls the brightness and intensity of the sun on specular materials in your scene\.  | 

## Fog Parameters<a name="fog-time-of-day-parameters"></a>


****  

| Fog | Type | Value | Description | 
| --- | --- | --- | --- | 
| Color \(bottom\) | R,G,B | 0 to 254 |  Specifies the bottom color for the fog\.  | 
| Color \(bottom\) multiplier | float | 0\.0 to 16\.0 |  Specifies the intensity of the bottom fog color\. This value is multiplied by the top fog color to set the brightness of the bottom fog color\.  You can set this value to `3` for midday and add three keys to the timeline with the values set at `0.02`\. This creates a localized orange bloom around the sun as it descends\.  | 
| Height \(bottom\) | float | \-5000 to 30000 |  Specifies a reference height for the vertical fog gradient\. This is the height at which the fog color reaches the specified color at the top\.  For fog density, this value is the height at which the vertical density falloff reaches the specified density\.  | 
| Density \(bottom\) | float | 0\.0 to 1\.0 |  Specifies the fog density at the bottom\. Values greater than 0 or less than 1 cause the fog to gradually fall off\.  | 
| Color \(top\) | R,G,B | 0 to 254 |  Specifies the color of the fog component that produces halos around the sun and sunlight scatter\.  | 
| Color \(top\) multiplier | float | 0\.0 to 16\.0 |  Specifies the intensity of the top fog color\. This value is multiplied by the bottom fog color to set the brightness of the top fog color\.  | 
| Height \(top\) | float | \-5000 to 30000 |  Sets the reference height for the vertical fog gradient\. For fog color, this value is the height at which the specified color reaches at the top\. For fog density, this value is the height at which the vertical density falloff reaches the specified density\.  | 
| Density \(top\) | float | 0\.0 to 1\.0 |  Specifies the fog density at the top\. You can set the top density to a higher value than the bottom density\. Doing so would reverse the vertical falloff and produce thick fog in the sky and clear views at the bottom\. You can also set the top and bottom density values to be equal\.  Volumetric fog computations treat a level as a continuous unbound volume\. If you specify a density greater than 0 at the specified top height, the fog won't suddenly stop at that height\. Instead the fog will continue to fall off gradually\. The same action is true for bottom boundary or density values that are less than 1\.  | 
| Color height offset | float | \-1\.0 to 1\.0 |  Offsets the height of the vertical fog gradient between the top and bottom colors\.  | 
| Color \(radial\) | R,G,B | 0 to 254 |  Specifies the color of the fog component that produces halos around the sun and sunlight scatter\.  | 
| Color \(radial\) multiplier | float | 0\.0 to 16\.0 |  Specifies the multiplier of the fog color component\. Radial fog is more noticeable as the light intensity decreases, so you can decrease the multiplier towards the end of the timeline\. Radial fog is also applied to the moon at night, so you can create two keys on the timeline and set the value to `0`\.  | 
| Radial size | float | 0\.0 to 1\.0 |  Specifies the size of the radial fog glow \(bloom around the sun\), perpendicular to the camera\. This value can also enhance effects such as the colors around the sun at sunrise or sunset\.  | 
| Radial lobe | float | 0\.0 to 1\.0 |  Specifies the size of the radial fog glow towards the camera or how much the radial fog is affected by distance\. Higher values create a foggier scene\.  Lower values affect only the horizon\.  | 
| Final density clamp | float | 0\.0 to 1\.0 |  Sets the maximum density that the fog can reach\. This enables the sky, horizon, and other bright, distant objects to be visible through dense fog\.  Setting this value too low can compromise depth perception and result in implausible visuals and apparent artifacts, especially when moving the camera\.  | 
| Global density | float | 0\.0 to 100\.0 |  Sets the density of the global fog\. Higher values create denser fog\.  | 
| Ramp start | float | 0\.0 to 30000\.0 |  Specifies the distance from the camera at which the fog starts to render at `0` density\.  This allows you to remove the fog around the camera and fade in at a specified distance\.  | 
| Ramp end | float | 0\.0 to 30000\.0 |  Specifies the distance from the camera at which the fog ceases to render at `0` density\.  This allows you to remove the fog around the camera and fade out at a specified distance\.  | 
| Ramp influence | float | 0\.0 to 1\.0 |  Specifies how much the ramp values affect the rendering of the fog\.  | 
| Shadow darkening | float | 0\.0 to 1\.0 |  Controls the appearance of the fog in shadow areas\. Specifies how much the fog color is darkened per pixel based on the volumetric shadow value per pixel\.  This value is applied after calculating the darkened fog color using the sun and ambient darkening factor\. See the next two parameters\.  | 
| Shadow darkening sun | float | 0\.0 to 1\.0 |  Specifies how much the sun influences the radial fog color\.  | 
| Shadow darkening ambient | float | 0\.0 to 1\.0 |  Specifies how much the environment influences the ambient fog color height gradient\.  | 
| Shadow range | float | 0\.0 to 1\.0 |  Sets the distance that the volumetric shadows are rendered until 10% \(0\.1\) of the level's clipping plane distance is reached\.  Lower values produce more accurate results; however, the shadows are not rendered as far as with higher values\.  | 

## Volumetric Fog Parameters<a name="volumetric-fog-time-of-day-parameters"></a>


****  

| Volumetric fog | Type | Value | Description | 
| --- | --- | --- | --- | 
| Height \(bottom\) | float | \-5000\.0 to 30000\.0 |  Specifies a reference height for the vertical fog gradient\. This is the height at which the fog color reaches the specified color at the top\.  For fog density, this value is the height at which the vertical density falloff reaches the specified density\.  | 
| Density \(bottom\) | float | 0\.0 to 1\.0 |  Specifies the fog density at the bottom\. Values greater than `0` or less than `1` cause the fog to gradually fall off\.  | 
| Height \(top\) | float | \-5000\.0 to 30000\.0 |  Sets the reference height for the vertical fog gradient\. For fog color, this value is the height at which the specified color reaches the top\.  For fog density, this value is the height at which the vertical density falloff reaches the specified density\.  | 
| Density \(top\) | float | 0\.0 to 1\.0 |  Specifies the fog density at the top\. You can set the top density to a higher value than the bottom density\. Doing so would reverse the vertical falloff and produce thick fog in the sky and clear views at the bottom\. You can also set the top and bottom density values to be equal\. Volumetric fog computations treat a level as a continuous unbound volume\.  If you specify a density greater than `0` at the specified top height, the fog won't suddenly stop at that height\. Instead the fog will continue to fall off gradually\. The same action is true for bottom boundary or density values that are less than `1`\.  | 
| Global density | float | 0\.0 to 100\.0 |  Sets the density of the global volumetric fog\. Higher values create denser fog\.  | 
| Ramp start | float | 0\.0 to 30000\.0 |  Specifies the distance from the camera at which the fog starts to render at `0` density\.  | 
| Ramp end | float | 0\.0 to 30000\.0 |  Specifies the distance from the camera at which the fog ceases to render at `0` density\.  | 
| Color \(atmosphere\) | R,G,B | 0 to 254 |  Specifies the fog color for the atmosphere\.  For example, you can set the fog color to light blue \(`140`, `230`, `255`\) for midday, darker blue \(`90`, `148`, `164`\) for sunset or sunrise, and white for night time\.  | 
| Anisotropy \(atmosphere\) | float | \-1\.0 to 1\.0 |  Adjusts the anisotropy for sun atmosphere scattering\.  Valid values: `-1` to `1` Values less than `0` will shift the fog in the opposite direction of the sun\. Values greater than `0` create a consistent appearance of atmospheric fog\.  | 
| Color \(sun radial\) | R,G,B | 0 to 254 |  Specifies the color of the glow around the sun\.  | 
| Anisotropy \(sun radial\) | float | \-1\.0 to 1\.0 |  Adjusts the anisotropy for sun radial scattering\. Values less than `0` will shift the glow effect to the opposite side of the sun\. Values greater than `0` make the radial color visible even when looking away from the sun\.  | 
| Radial blend factor | float | 0\.0 to 1\.0 |  Blends the sun radial color with the atmosphere color\.  Valid values: 0 to 1\.  Set the value to 0 to turn off radial fog\.  | 
| Radial blend mode | float | 0\.0 to 1\.0 |  Adjusts the blend mode for blending between atmosphere fog and radial fog\.  Set the value to `0` to use additive blending\.  Set the value to `1` to use linear interpolation\.  | 
| Color \(entities\) | R,G,B | 0 to 254 |  Specifies the global fog color for volumetric lights, excluding the sun\.  | 
| Anisotropy \(entities\) | float | \-1\.0 to 1\.0 |  Adjusts the appearance of volumetric fog entities based on the viewing angle in relation to the sun\. 0 = isotropic \| 1 = perfect forward \| \-1 = perfect backward in\-scattering\.  | 
| Range | float | 0\.0 to 8192\.0 |  Adjusts the maximum radius of volumetric fog\.  The default setting is `64`\.  | 
| In\-scattering | float | 0\.0 to 100\.0 |  Specifies how much light \(including sun\) is scattered by fog\. Higher values create a foggier scene \(fog density remains unchanged\) with bigger and brighter glow effects\.  | 
| Extinction | float | 0\.0 to 100\.0 |  Specifies how much light the fog absorbs\. Higher values create a thick, atmosphere effect that is tough for sun light to penetrate\.  | 
| Analytical fog visibility | float | 0\.0 to 1\.0 |  Adjusts the global visibility of analytical fog\. Set the value to `0` to hide analytical volumetric fog\. Set the value to `1` to display analytical volumetric fog\.  | 
| Final density clamp | float | 0\.0 to 1\.0 |  Sets the maximum density that the fog can reach\. This enables the sky, horizon, and other bright, distant objects to be visible through dense fog\.  Setting this value too low can compromise depth perception and result in implausible visuals and apparent artifacts, especially when moving the camera\.  | 

## Sky Light Parameters<a name="sky-light-time-of-day-parameters"></a>


****  

| Sky Light | Type | Value | Description | 
| --- | --- | --- | --- | 
| Sun intensity | R,G,B | 0 to 254 |  Sets the illuminance of the sun and uses an RGB sun color value to compute the atmosphere color\. You can use this parameter in conjunction with Sun color to provide desired scene luminance\. For bright sunlight, you can use an average illuminance value of 120000 lux\. The intensity of the sun decreases as it nears the horizon, so you can add keys to the timeline to lower the intensity value appropriately\.  To accurately render shadows at night time, you can add keys to the timeline and set the value to `5`\.  | 
| Sun intensity multiplier | float | 0\.0 to 1000\.0 |  Sets the brightness of the sun\. The brightness is multiplied by the sun intensity to yield the overall color\. You can use this parameter in conjunction with Sun color multiplier to provide desired scene luminance\.  Higher values result in brighter skies\. Lower values simulate an eclipse\.  | 
| Mie scattering | float | 0\.0 to 1000\.0 |  Controls mie scattering, which is caused by pollen, dust, smoke, water droplets, and other particles in the lower portion of the atmosphere\. Mie scattering occurs when the particles that cause the scattering are larger than the wavelengths of radiation that are in contact with them\. Mie scattering is responsible for the white appearance of clouds\.  Higher values create a hazy sky\. Lower values create a clear sky\. For a balanced sky, you can set this value to `4.8`\.  | 
| Rayleigh scattering | float | 0\.0 to 1000\.0 |  Controls rayleigh scattering, which is sunlight scattering from atmospheric gases\. Rayleigh scattering occurs when the particles that cause the scattering are smaller than the wavelengths of radiation that are in contact with them\.  As the wavelength decreases, the amount of scattering increases\. Rayleigh scattering is responsible for the blue appearance of the sky\.  Higher values create a red\-yellow sky\. Lower values create a blue sky\. For a blue daytime sky and red\-yellow sunset sky, you can use the default value of `2.0`\.  | 
| Sun anisotropy factor | float | \-0\.9999 to 0\.9999 |  Controls the sun's apparent size\. As this value approaches \-`1.0`, the sun's disk becomes sharper and smaller\. Higher values create a larger, fuzzier disk\.  For a balanced size, you can set this value to `-0.995`\.  | 
| Wavelength \(R\) | float | 380\.0 to 780\.0 |  Sets the hue \(RGB values\) of the atmosphere\. You can create different atmospheres by adjusting the color values and gradients\. This can be particularly useful with rayleigh scattering, when you choose a sun intensity of pure, bright white\.  | 
| Wavelength \(G\) | float | 380\.0 to 780\.0 |  Sets the hue \(RGB values\) of the atmosphere\. You can create different atmospheres by adjusting the color values and gradients\. This can be particularly useful with rayleigh scattering, when you choose a sun intensity of pure, bright white\.  | 
| Wavelength \(B\) | float | 380\.0 to 780\.0 |  Sets the hue \(RGB values\) of the atmosphere\. You can create different atmospheres by adjusting the color values and gradients\. This can be particularly useful with rayleigh scattering, when you choose a sun intensity of pure, bright white\.  | 

## Night Sky Parameters<a name="night-sky-time-of-day-parameters"></a>


****  

| Night Sky | Type | Value | Description | 
| --- | --- | --- | --- | 
| Horizon color | R,G,B | 0 to 254 |  Specifies the horizon color of the night sky gradient\. The RGB value is scaled by the multiplier\.  You can make a light pollution effect more pronounced by setting this value to a dark blue color \(`20`, `36`, `51`\)\.  | 
| Zenith color | R,G,B | 0 to 254 |  Specifies the zenith color of the night sky gradient\. The RGB value is scaled by the multiplier\. You can make the night sky gradually appear darker further from the horizon by setting this value to black\.  | 
| Zenith shift | float | 0\.0 to 16\.0 |  Sets the transition for the two colors in a night sky gradient\. Smaller values shift the transition towards the bottom\.  Larger values shift the transition towards the top\. You can create a smooth transition by setting this value to `0.8`\.  | 
| Star intensity | float | 0\.0 to 16\.0 |  Sets the overall brightness of the stars\. Star flickering is by design and cannot be controlled\. You can make the stars bright for night time by setting this value to `0.01` between 00:00 – 06:00 and 18:00 – 23:59\.  | 
| Moon color | R,G,B | 0 to 254 |  Specifies the moon's emissive color\. The RGB value is scaled by the multiplier\. You can make the moon a less saturated blue by setting this value to 51, 58, 65\. You can create a light blue transition color by creating two keys at 07:00 and 17:00 and setting the value to `200`, `228`, `255`\. Setting this value to `0` removes the moon texture\.  | 
| Moon inner corona color | R,G,B | 0 to 254 |  Specifies the color of the moon's inner corona \(glow around the moon\)\. The RGB value is scaled by the multiplier\.  | 
| Moon inner corona scale | float | 0\.0 to 2\.0 |  Specifies the size and blurriness of the moon's inner corona\. Smaller values create a bigger, blurry corona\. Larger values create a smaller, focused corona\.  | 
| Moon outer corona color | R,G,B | 0 to 254 |  Specifies the color of the moon's outer corona\. The RGB value is scaled by the multiplier\.  | 
| Moon outer corona scale | float | 0\.0 to 2\.0 |  Specifies the size and blurriness of the moon's outer corona\. Smaller values create a bigger, blurry corona\. Larger values create a smaller, focused corona\.  | 

## Night Sky Multiplier Parameters<a name="night-sky-multiplier-time-of-day-parameters"></a>


****  

| Night Sky Multiplier | Type | Value | Description | 
| --- | --- | --- | --- | 
| Horizon color | float | 0\.0 to 1\.0 |  Specifies the multiplier for the Night Sky's **Horizon color**\.  | 
| Zenith color | float | 0\.0 to 1\.0 |  Specifies the multiplier for the Night Sky's **Zenith color**\.  | 
| Moon color | float | 0\.0 to 1\.0 |  Specifies the multiplier for the Night Sky's **Moon color**\.  | 
| Moon inner corona color | float | 0\.0 to 1\.0 |  Specifies the multiplier for the Night Sky's **Moon inner corona color**\.  | 
| Moon outer corona color | float | 0\.0 to 1\.0 |  Specifies the multiplier for the Night Sky's **Moon outer corona color**\.  | 

## Cloud Shading Parameters<a name="cloud-shading-time-of-day-parameters"></a>


****  

| Cloud Shading | Type | Value | Description | 
| --- | --- | --- | --- | 
| Sun contribution | float | 0\.0 to 16\.0 |  Specifies how much the sun affects the cloud brightness\.  | 
| Sun custom color | R,G,B | 0 to 254 |  Sets the RGB sun color\.  | 
| Sun custom color multiplier | float | 0\.0 to 16\.0 |  Sets the brightness of the sun, which is multiplied by the sun custom color\.  | 
| Sun custom color influence | float | 0\.0 to 1\.0 |  Sets the degree to which the color of the sun contributes to the color of the clouds\.  | 

## Sun Ray Effects Parameters<a name="sun-ray-effects-time-of-day-parameters"></a>


****  

| Sun Ray Effects | Type | Value | Description | 
| --- | --- | --- | --- | 
| Sun shafts visibility | float | 0\.0 to 1\.0 |  Sets the visibility of the sun shafts\. Higher values accentuate the shadow streaks that are caused by the sun light penetrating objects\.  | 
| Sun rays visibility | float | 0\.0 to 10\.0 |  Sets the visibility of the sun rays\. Higher values create brighter rays around the sun\.  | 
| Sun rays attenuation | float | 0\.0 to 10\.0 |  Sets the length of the sun rays\. Higher values create shorter rays around the sun\.  | 
| Sun rays suncolor influence | float | 0\.0 to 1\.0 |  Sets the degree to which the color of the sun contributes to the color of the sun rays\.  Set this value to `1` to use the color of the sun for the sun rays\.  Set this value to `0` to use a custom color\.  Set this value to any number between `0` and `1` to use a color between the sun color and custom color\.  | 
| Sun rays custom color | R,G,B | 0 to 254 |  Specifies a custom color for the sun rays\. To use this parameter, you must set the **Sun rays sun color influence** parameter to a value greater than `0`\.  | 

## Advanced Parameters<a name="advanced-time-of-day-parameters"></a>


****  

| Advanced | Type | Value | Description | 
| --- | --- | --- | --- | 
|  **Skybox multiplier**  | float | 0\.0 to 1\.0 |  Controls the brightness of a static skybox\. Does not affect a dynamic sky\.  | 

## Filters Parameters<a name="filters-time-of-day-parameters"></a>


****  

| Filters | Type | Value | Description | 
| --- | --- | --- | --- | 
| Grain | float | 0\.0 to 8\.0 |  Controls the strength of the grain filter to apply to the final image\.  | 
| Photofilter color | R,G,B | 0 to 254 |  Sets the RGB of the color filter to apply to the final image\.  | 
| Photofilter density | float | 0\.0 to 1\.0 |  Controls the strength of the color filter to apply to the final image\.  | 

## Depth of Field Parameters<a name="depth-of-field-time-of-day-parameters"></a>


****  

| Depth of Field | Type | Value | Description | 
| --- | --- | --- | --- | 
| Focus range | float | 0\.0 to 10000 |  Specifies the distance at which the background starts to lose focus and become blurry\.  | 
| Blur amount | float | 0\.0 to 1\.0 |  Controls the strength of blur in areas that are out of focus\.  | 

## Shadows Parameters<a name="shadows-time-of-day-parameters"></a>


****  

| Shadows | Type | Value | Description | 
| --- | --- | --- | --- | 
| Cascade N: Bias | float | 0\.0 to 10\.0 |  Sets the amount to move the shadow cascade away from the shadow\-casting object\. For a more realistic effect, set the value between `0.01` and `0.05`\.  | 
| Cascade N: Slope Bias | float | 0\.0 to 500\.0 |  Adjusts the gradient \(slope\-based\) bias used to compute the shadow bias\. Higher values reduce shadows that are cast from an object with a high light angle\. For a more realistic effect, set the value between `32` and `64`\. Slope bias has little to no impact on performance\.  | 
| Shadow jittering | float | 0\.0 to 10\.0 |  Specifies shadow sharpness\. Higher values may impact performance\.  | 