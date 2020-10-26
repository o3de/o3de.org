# NVIDIA Cloth Gem<a name="gems-system-gem-nv-physx-cloth"></a>


****  

|  | 
| --- |
| This feature is an [experimental](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#experimental) release and is subject to change\.  | 

![\[NVIDIA Cloth Gem in Amazon Lumberyard.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/gems/nvidiacloth/anim-nvidia-cloth-lyflag-1.23.gif)

Physical cloth simulations can create more immersive environments and characters\. The NVIDIA Cloth Gem uses the NVIDIA Cloth library to provide fast, robust cloth simulation in Amazon Lumberyard\.

**Note**  
The NVIDIA Cloth Gem is currently available only for Windows\. 

## Enable the NVIDIA Cloth Gem<a name="enable-gem-cloth"></a>

Cloth simulations are created through a familiar, intuitive component that you can add to entities that contain **Mesh** or **Actor** components\. To make the **Cloth** component available in Lumberyard, you must build and configure your project with the NVIDIA Cloth Gem enabled\. 

**To enable the NVIDIA Cloth Gem**

1. Use Project Configurator to add the NVIDIA Cloth Gem to your project\. 
**Note**  
The NVIDIA Cloth Gem also requires the **LmbrCentral** and **EmotionFX** gems\. 

1. Configure your project\. Use the following command\.

   ```
   lmbr_waf configure
   ```

1. Build your project\. Use the following command\.

   ```
   lmbr_waf build_win_x64_vs2019_profile -p all --progress
   ```

For more information on Gems, see the [Gems documentation](gems-system-gems.md)\. 

For information and tutorials on the **NVIDIA Cloth** component, see [Cloth](component-cloth.md)\.