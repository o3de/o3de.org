# Fur Features<a name="shader-ref-fur-features"></a>

Using various [Fur Material Settings](shader-ref-fur-materialsettings.md) and [Fur Console Variables](shader-ref-fur-consolevariables.md), the fur shader can give your furry entities realistic highlights, dynamic shadows, responsive movement, and much more\.

**Topics**
+ [Anisotropic Specular Highlights](#shader-ref-fur-features-highlights)
+ [Subsurface Scattering](#shader-ref-fur-features-subsurface)
+ [Simulated Self\-Shadowing](#shader-ref-fur-features-simulated)
+ [Fur in Shadows](#shader-ref-fur-features-shadows)
+ [Bending](shader-ref-fur-features-bending.md)
+ [Motion Bending](shader-ref-fur-features-bending-motion.md)
+ [Level of Detail](shader-ref-fur-features-levelofdetail.md)

## Anisotropic Specular Highlights<a name="shader-ref-fur-features-highlights"></a>

Anisotropic specular highlights are supported when a mesh provides [fur combing](shader-ref-fur-combing.md) data\. This feature creates highlights that appear "banded" in the direction perpendicular to the fur strands\. Notice the banded highlight from the green light on the bear's fur\.

![\[Example anisotropic highlights for fur rendering.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/shaders/shader-ref-fur-5.png)

Anisotropic highlights are not applied to areas where fur length is set to `0` in the mesh vertex color\. For example, non\-furry areas such as a nose, mouth, or claws will display isotropic, or hotspot, highlights rather than banded, or anisotropic highlights\.

![\[Example fur shader reference for non-furry areas.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/shader-ref-fur-6.png)

## Subsurface Scattering<a name="shader-ref-fur-features-subsurface"></a>

The fur shader simulates subsurface scattering around silhouette edges of the fur, where less inscattering and absorption occurs\. This results in a glow effect when the fur is backlit\. You can tune this feature by adjusting the material parameters **SSS Strength** and **SSS Falloff**\.

![\[Example of subsurface scattering for fur rendering.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/shaders/shader-ref-fur-7.png)

## Simulated Self\-Shadowing<a name="shader-ref-fur-features-simulated"></a>

To simulate the self\-shadowing effect of fur, you can set a blend color or blend layer\. To do this, you can enable **Fur Blendlayer** or **Fur Blend color**\. If both are enabled, only **Fur Blendlayer** is used\. You then set the color using the **Fur Self Shadowing Color** property\. This value is interpolated with the default diffuse texture, where self\-shadowing is stronger toward the mesh surface\. 

The following image shows a furry sphere with no self\-shadowing \(1\), the same sphere with fur blend color \(2\), and again with fur blendlayer \(3\)\.

![\[Example furry sphere without shadowing, fur blend color, and blendlayer.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/shaders/shader-ref-fur-7a.png)

You can adjust the interpolation speed by modifying the material parameter **Fur Self Shadowing Bias**\.

![\[Example adjusting interpolation speed with the Fur Self Shadowing Bias parameter.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/shaders/shader-ref-fur-8.png)

## Fur in Shadows<a name="shader-ref-fur-features-shadows"></a>

When fur casts a shadow, it adds definition to the silhouette\. If fur is not set to cast a shadow, then you would see a smooth edge of the structure that the fur covers\. In the following image, you can see the shadow of the bear's fur on the wall\.

![\[Example fur in shadows.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/shaders/shader-ref-fur-9.png)

Fur can contribute to shadow passes, including bending caused by wind\. Fur is alpha\-tested in shadow passes\. 

You can adjust this by modifying the material parameter **Fur Fins Alpha Test**\.

You can also turn on fur in shadows by toggling the console variable `r_furfinshadowpass`\.