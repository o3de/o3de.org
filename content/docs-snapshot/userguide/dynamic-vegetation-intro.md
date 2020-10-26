# Dynamic vegetation<a name="dynamic-vegetation-intro"></a>

 The dynamic vegetation system uses vegetation components to customize vegetation coverage for worlds of any size\. To use the dynamic vegetation system, you must enable the **Vegetation** gem for your game project\. 

For more information, see [Enabling Gems](gems-system-using-project-configurator.md)\.

![\[Example of vegetation landscape that you can achieve by using dynamic vegetation.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/dynamic-vegetation-intro.png)

Using combinations of components from vegetation and other categories, you can do the following:
+ Create layers of background vegetation and specify local vegetation areas around environmental objects and points of interest such as buildings\.
+ Place vegetation using live WYSIWYG \(what you see is what you get\) vegetation authoring\.
+ Reconfigure any aspect of vegetation during any development phase without starting from scratch\. All edits are nondestructive and populate rapidly throughout the level\.
+ Create complex ecological biomes all in one nested slice containing many layers of broad coverage for blending across areas or an entire world\.
+ Configure vegetation to grow only on certain surfaces\. Use components to specify where vegetation can grow such as on a range of ground slope angles or at specified altitudes\.

The dynamic vegetation system interacts in several ways with the [static vegetation system](vegetation-intro.md)\. For example, you can do the following:
+ Use the same assets in both dynamic and static vegetation systems
+ Configure static vegetation to block dynamic vegetation

Dynamic vegetation differs from static vegetation in the following ways\.


****  

|  | Dynamic Vegetation | Static Vegetation | 
| --- | --- | --- | 
| World size | Limited only by Lumberyard maximum world size | Maximum of 2K–4K | 
| Templates | Slices | Not templatable | 
| Saved as | Procedural mechanisms | Static placement data | 
| Generated | In\-game just\-in\-time placement | As level data | 

You can further modify dynamic vegetation with components from other categories\. To use the full capabilities of the dynamic vegetation system, enable the following gems\.

**Vegetation gem \(required\)**  
Provides the dynamic vegetation system and the core vegetation components\. These are the foundation for creating areas and registering them with the system\.

**Gradient Signal gem \(dependency\)**  
Provides gradient and gradient modifier components, which are vital to the procedure\-driven methodology of dynamic vegetation\. The gradient components generate various gradient signals, such as random noise and Perlin noise\. The gradient modifier components modify and mix the gradient signals\.   
Using gradient signals with modifier components \(such as positional jitter\) or filter components \(such as vegetation distribution\) produces realistically random expressions of vegetation in the game world\.

**Surface Data gem \(dependency\)**  
Enables surfaces such as terrain or meshes to emit signals, or tags, that communicate its surface type\. Using a vegetation surface mask filter, you can choose to grow vegetation on a particular surface by using an inclusion list or block it from growing by using an exclusion list\. You could also recapture the tags as a gradient signal by using the **Surface Mask Gradient** component\.

**FastNoise gem \(optional\)**  
Provides an expressive **FastNoise Gradient** component that generates many procedural noise variations\. In the Lumberyard **Entity Inspector**, the **FastNoise Gradient** component appears in the **Gradient** category\. You use it like any other gradient component\.

**Topics**
+ [Dynamic Vegetation Concepts](dynamic-vegetation-concepts.md)
+ [Dynamic Vegetation Procedures](dynamic-vegetation-procedures.md)