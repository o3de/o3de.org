---
linktitle: 24.09.0 Release Notes
title: Release Notes for Open 3D Engine 24.09.0
description: Full release notes for Open 3D Engine (O3DE) version 24.09.0.
weight: 890
toc: true
---

# O3DE 24.09.0 Release Notes

Get ready for a game-changing update with the O3DE 24.09 release. This latest version is packed with fantastic enhancements driven by your feedback, focusing on turbocharging performance and elevating your experience. Now, with the installer version, you can build projects using only Script Canvas and Lua—no compiler needed\! But that’s just the beginning. We’ve supercharged editor startup times with up to a jaw-dropping 90% boost for large projects brimming with assets. Mobile developers, rejoice\! Enjoy a staggering 400% increase in performance on both iOS and Android, along with dramatically reduced runtime memory usage. For simulation use cases, we have added the Georeference component, ability to parse Gazebo data, and a ROS2FrameComponent, along with many simulation performance improvements. This release is bursting with hundreds of quality of life improvements and bug fixes. Dive in to explore just a few of the exciting highlights that 24.09 has in store.

See Simulation, Rendering, and AR/VR sections for specific changes in these areas.

## General Changes and Improvements in 24.09.0

**Major Improvements:**

* Quick-Start “Script Only” Projects \- Can build projects using Script Canvas and Lua, without needing a C++ compiler,  using the O3DE installer version.  
* Many optimizations for memory usage on mobile and AR/VR devices  
* Mobile performance \- up to 400% improvement across iOS, Android and AR/VR/XR devices  
* Split PhysX 4 and 5 into separate gems, enabling users to switch between the PhysX versions easily, even when using installer builds.  
* Added a Project Export UI along wth full export support for iOS, Android, Linux, and Windows. Users are no longer required to use a command line.  
* Added options to reduce size of headless server up to 90%, dependent on assets used.   
* Added a mobile specific rendering pipeline, allowing users to easily enable/disable features as needed.  
* Added ability to control quality settings per device. There is a default of 3 performance levels (low, medium, high) based on device specifications for CPU, GPU, and memory.  
* Added shader variants. When setup, this allows the renderer to automatically utilize the most performant shader for a given rendering need.   
* Added Entity Silhouette Feature  
* Added framework allowing users to interface with the LLM (AI model) of their choice.  
* Network heartbeat packets are sent during high CPU usage; avoids network disconnection due to timeout.  


**Improvements:**

* Added support for PGM Image Format  
* Added support for templates level creation  
* Resolved several issues where networked games could ‘timeout’ due to threads being blocked due to loading of a large level.  
* Allowing non anti aliased fonts in Lua Editor  
* Improved Lua Editor syntax highlighting and style updates  
* Many prefab quality of life improvements  
* Prefab Container entities can now be set as Editor Only. Doing so causes them to be skipped at runtime, with only the contents of the prefab spawned into the level.  
* Migrate OffsetKeyPosition for AZ::Vector3 for CTrackViewTrack  
* Improved Asset Processor asset analysis performance  
* Linux Console logging  
* Ability to set different max path lengths per platform (resolves a commonly encountered issue when installing O3DE with a deep path).  
* Improved ability to import models and objects from external sources  
* Project manager add project dialog to target project.json instead of any directory  
* Add r\_fogLayerSupport and r\_fogTurbulenceSupport CVARS for quality  
* Add exponential and exponential squared fog modes  
* ScriptCanvas support Quaternion CreateFromValues  
* Improved HDRiSkybox scripting API  
* Resolved many Script Canvas quality of life issues  
* Improved editor performance with large number of entities  
* Added support for ray-traced reflections in SpecularReflectionsFeatureProcessor  
* Many Asset Browser quality of life improvements  
* Terrain | Add Help Url to components that have docs pages   
* MiniAudio: Added more volume controls and a pause method for Playback component  
* Add quality settings to default project template  
* Many Atom performance improvements for all supported platforms  
* Added support for renaming gems  
* Added Support For Raytracing Against Skinned Meshes  
* Added functionality for material pipeline files to specify custom object SRG members  
* Added support for lighting channels to all light types  
* Added support for configuring anti-aliasing and multi-sample count via CVars  
* Added support of node-searching in script canvas  
* Added support to turn on/off directional lights shadow  
* Added support to run clients headlessly for simulation client  
* MultiplayerSample gamepad player input support  
* Added vertex color support to BasePBR, StandardPBR, EnhancedPBR material types as well as material canvas.  
* Added three new tone-mapping modes: AcesFitted, AcesFilmic and Filmic
* Added shadow support for SimpleSpotLights
* Added Gobo (i.e texture projection) support for simple spot light.
* Added per mesh shader option support when mesh instancing is enabled.  
* Improved RenderDoc and Pix integration

**Fixes:**

* Many fixes for tone mapping and eye shaders  
* Fixes for Linux Installation errors, particularly around Python installation.  
* Many Trackview bugfixes  
* Fixed several Linux startup crashes  
* Resolved gem dependency issues with versioning  
* Resolved several python issues on Linux  
* Resolved several issues with Physics materials  
* Resolved some Script Canvas Debugging issues  
* Resolved several Lua Editor issues  
* Resolved several Script Canvas crash issues  
* Updated O3DE to support latest versions of Visual Studio  
* Many Vulkan crash fixes  
* Many fixes across various Android chipsets and devices  
* Many fixes across iOS versions and devices  
* Prefabs \- reduced memory consumption on big, deeply nested levels  
* Resolved many editor crash issues  
* Resolved many prefab overrides issues  
* Resolved many issues with headless server  
* Resolved several Mac compilation issues. Note: Mac is not an officially supported platform and is primarily a builder for iOS. However, some work has been accomplished against the editor for Mac. Feel free to use (at your own risk) and report issues that you encounter.   
* Resolved several issues when using the installer version for Windows, Debian packages for Linux, and Snap packages for Linux.  
* Resolved several material canvas issues  
* Resolved several issues with terrain generation and runtime.  
* Updated WWise support for Visual Studio 2022 compatibility  
* Fix multiplayer disconnection due to stream error due to corrupted packets  
* Fix O3DE-Extras Multiplayer Template project  
* Fix audio thread taking 90% frame time

**Removed legacy code:**

* Removed unused legacy slice code  
* Removed legacy perlin noise  
* Remove usage of SendEvent for ObjectManager  
* Removed tools/styleui  
* Removed iRenderAuxGeom  
* Remove unused Viewport cvar from ObjectManager  
* Remove unused interfaces from CryCommon  
* Remove unused CTemplateObjectClassDesc  
* Remove object manager python reflection and tests  
* Remove ITransformDelegate from CTrackViewAnimNode  
* EMFX | remove baseObject and renamed MemoryObject to RefCounted  
* Remove legacy GameExporter (never used or called)  
* Slice Level UI Removal | Remove Legacy Slice Editor Ownership Service and Preemptive Undo Cache classes  
* Slice Level UI Removal | Inspector and Asset Browser cleanup  
* Slice Level UI Removal | Remove slice-related settings from Editor Preferences.  
* Editor Preferences | Remove unused deep selection settings

## Simulation O3DE Gem Changes for 24.09.0 Release:

**Major improvements**

* ROS 2 Gem: added Georeference Component  
* ROS 2 Gem: added possibility to spawn assets using WGS-84 data format in ROS2SpawnerComponent  
* ROS 2 Gem: extended ROS2FrameComponent in Editor (split into Game and Editor components)  
* ROS 2 RobotImporter: added Gazebo data parsing for camera, GNSS, IMU, and Lidar sensors  
* ROS 2 RobotImporter: added Gazebo data parsing for skid steering and Ackermann drive models  
* ROS 2 RobotImporter: added Gazebo data parsing for joint pose trajectory and joint state publisher configuration

**Improvements**

* ROS 2 Gem: added position control for joints (possible to set initial configuration; ROS 2 subscription and handler added)  
* ROS 2 Gem: added camera stabilization (preventing tilting)  
* ROS 2 Gem: added the option to transmit ROS 2 camera image using various image encodings  
* ROS 2 Gem: modified clock designed  
* ROS 2 RobotImporter: added Gazebo data parsing for topics, frames and namespaces  
* ROS 2 RobotImporter: redesigned wizard

**Fixes**

* ROS 2 Gem: fixed ROS2SpawnerComponent  
* ROS 2 Gem: fixed Lidar data publishing  
* ROS 2 related Gems and project templates: cleaned-up versioning, updated to work with ROS 2 Jazzy  
* ROS 2 related Gems and project templates: updated prefabs to match O3DE \>= 2310.0

**Removed code**

* ROS 2 Gem: removed outdated and duplicated documentation files from the Gem

**Other Gems worth noticing:**

* Pointcloud https://github.com/RobotecAI/robotec-o3de-tools/tree/main/Gems/Pointcloud  
* ROS2ScriptIntegration https://github.com/RobotecAI/robotec-o3de-tools/tree/main/Gems/ROS2ScriptIntegration  
* VehicleDynamics https://github.com/RobotecAI/o3de-vehicle-dynamics-gem

## Rendering Specific Changes for 24.09.0 Release

**Mobile Render Pipeline \-** Add support for an extremely performant mobile render pipeline built for tiled GPUs.

* Optimised BRDF for mobile \- Added a new optimised BRDF for mobile as well as support for analytical Env IBL approximation.  
* Added Gobo (i.e texture projection) support for simple spot light.
* Added CPU culling for decals
* Added shadow support for SimpleSpotLights
* Added support for decal color and decal color factor to help modulate final calculated decal color.
* Added shader options for simple point/spot lights and decals
* Added support for cpu culling for simple-point and simple-punctual lights
* Added support for deferred fog within the mobile pipeline.  
* Added exponential and exponential squared fog modes.   
* Added support for shader options within PCF filtering for directional light shadows
* Added Silhouette support to the mobile render pipeline. For more details about the Silhouette feature see the section about Rendering additions.  
* Added particles support to the mobile render pipeline.  
* Added support for postFX effects within the pipeline  
* Various half float optimizations for the mobile render pipeline.  
* Render scale related support and fixes across various mobile devices.


**Rendering additions/improvements \-** Various rendering improvements for all the render pipelines and general Atom improvements.

* Initial scaffolding for Multi-GPU support within RHI and RPI layers of the engine. A lot of this work includes initial plumbing for Multi-GPU objects and initial support for basic GPU-GPU synchronisation when transferring resources between devices.  
* Silhouette Feature \- Add support for Silhouette material type that, when applied to a mesh, draws an outline and filled-in silhouette in various modes: Always, XRay, Visible and Never.  
* Added vertex colour support  to BasePBR, StandardPBR, EnhancedPBR material types as well as material canvas.  
* Added three new tone-mapping modes: AcesFitted, AcesFilmic and Filmic. Mobile render pipeline defaults to Filmic mode.  
* Added android and ios registry settings for four tiers (low, medium, high, very high) of graphics quality.  
* Added support for geometry shader within DX12 and Vulkan RHI backends.  
* Added support for intersection shaders within DX12 and Vulkan RHI backends.
* Shadow culling outside view frustum \- Improve performance by skipping unnecessary work for all shadows that won't be visible. This is achieved by cpu culling of lights to limit the amount of lights that require processing.  
* r\_antiAliasing \- Add support to switch anti-aliasing modes via CVar r\_antiAliasing  
* Add support for lighting channels \- This feature introduces 3 channels for each kind of light and light-able objects. The objects and lights in the same channel are grouped and as a result the lights in the group affect the objects in the same group. The default behaviour is all lights and objects in channel 0, so it should not change the current way to work with lighting, but it will provide a further option to grant the artists the flexibility to control which light shines on which objects.  
* Enable and disable ContrastAdaptiveSharpening pass as well along with temporal anti aliasing (i.e TAA).  
* Added support to allow passing customised derivatives to texture sampling functions.  
* Added device attribute for the GPU model. This allows us to provide better device filtering for graphics quality tiers.  
* Added per mesh shader option support when mesh instancing is enabled. This allows us to build optimised shader variants for a scene with mesh instancing.  
* Added support for timeline semaphores within Vulkan RHI to help with low level synchronisation.  
* Added ability to disable creating a native window for game launchers for null renderers.

**Atom (O3DE renderer) Memory optimizations**

* Added support to dump information about loaded assets.  
* Various Metal RHI related memory optimizations.  
* Added support to release BufferAssets owned by ModelAssets. This allows us to release mesh related memory on the cpu once it is transferred to the gpu.  
* Ring buffer support for RayTracing buffers.

## VR/OpenXR Improvements for 24.09.0 Release.

**Improvements**

* \[OpenXR\] New data driven APIs (Lua and C++) to manage Actions (I/O) and Spaces (world transform anchors) across all OpenXR Compatible Hardware.  
* \[Android \+ OpenXR\] New Android Project Generator UI, integrated into the ProjectManager. Facilitates the generation of all the files required to compile and deploy a project on Android. Optionally, the Android project can be generated for Meta Quest  family of devices. Developer iteration times, on device, improved from \~1m:30s to less than 10s.

**Fixes**

* Many crash fixes for Quest devices  
* \[OpenXR\] MSAA resolve can be done directly into the Swapchain attachment. 

## Known Issues

* Audio WWise Not Working Until Removing and Re-Adding Gem
* Enabling PhysX 4 and PhysX 5 will result in an editor crash. Please note that the ROS2 gem automatically enables PhysX 5, please make sure PhysX 4 is disabled before enabling the ROS2 gem.
* On first load of a project, the asset processor, by default, will use all available CPU cores resulting in large memory usage. This can lead to an initial performance drop in the editor for large projects, until the assets are processed. This is particularly noticeable on Linux. If this is an issue it is advised to wait until the assets are processed.

## Thanks to all of our contributors for making the 24.09.0 release possible\!

Steve Pham  
alexpete  
Guthrie Adams  
moudgils  
Michał Pełka  
Michael McGarrah  
Nicholas Lawson  
Gene Walters  
jhmueller-huawei  
Jan Hanca  
Akio Gaule  
Adam Dąbrowski  
ANT\\daimini  
Luis Sempé  
Mike Chang  
galibzon  
T.J. Kotha  
mbalfour  
Michael Pollind  
Alex Montgomery  
Martin Winter  
lemonade-dm  
guillaume-haerinck  
Akio Gaule  
Junhao Wang  
Danilo Aimini  
Shauna Gordon  
Joe Bryant  
Markus Prettner  
Martin Winter  
colinb\[APMG\]  
antonmic  
Joerg H. Mueller  
antonmic  
Hongshan Li  
Artur Kamieniecki  
siliconvoodoo  
Martin Sattlecker  
Chris Galvan  
Qing Tao  
Pawel Liberadzki  
Nicholas Lawson  
pwalterscarb  
Sarah Anderson  
André L. Alvares  
Reece Hagan  
Adi Bar-Lev  
omacx  
Olex Lozitskiy  
phuchau1989  
Patryk  
Xichen Zhou  
kursad-k  
Paulina Kubera  
carbonated-niko  
stevo26  
Djfos  
TheTopHat26  
Mateusz Żak  
Naomi Washington  
Vincent  
Antoni-Robotec  
0x14307  
Kacper Lewandowski  
o3de-issues-bot  
Patryk Antosz  
ShalokShalom  
jjs-home  
ExMatics HydrogenC  
realJavabot  
Nathan Brooks  
idclosed  
rhuthCarb  
AaronRuizMoraUK  
Umesh Rajesh Ramchandani  
Guy MacGeorges  
Alexander  
Lloyd Tullues  
Huawei-CarlosCarbone  
Shao Biyao  
Antoni Puch  
Andre Mitchell  
solo1967  
LB-MichalRodzos  
Luis Gutierrez  
Wiktor Bajor  
Maciej Aleksandrowicz  
CarbAndrewD  
Roderick Kieley  
konkuk kim  
Caleb Leak  
TheShed412  
Fergal  
utk-hua  
Tobias Alexander Franke  
Yaakuro  
Adam Krawczyk  
alexeykostin  
Joshua Rainbolt  
Erik Jacobs  
kberg-amzn  
yosagi  
TechnoPorg  
arvrschool  
floroeske  
JaviNunsys  
zchengw  
jeremy-kubota  
Mateusz Szweda  
Derikson  
iByte-ua  
Boy-Ma  
Nicholas Van Sickle  
Mahdi Safarmohammadloo  
Ganidhu Abey  
timstullich  
Khaled  
Filip Vavera  
Mike Sanders  
Oreloth  
skleembof  
colinb-accesspointmg  
Umesh Rajesh Ramchandani  
osmaneTKT  
shazhenyu123  
Lloyd T  
NanaYellen  
chanmosq  
Jeremy Pritts  
Aleks Starykh  
Krzysztof Rymski  
Xichen Zhou  
lemonade-dm  
Frede H  
michabr  
IVasilets  
Jyothish Kumar M S  
oym1994  
Piotr Jaroszek  
Mark \[Hilliness Studios\]  
maj-tom  
Kacper Dąbrowski  
yumigenack  
Egor Zelenkov  
Getue  
Archer Allstars  
gituser1024  
gerroon  
Kacper Bieniek  
yunni  
marszhao  
Bartek Boczek  
RicardasSim  
UsmanTariq2  
Greg O  
Marc Bestmann  
Yves Silva  
Samuel Porras  
Vivien Oddou  
alukyanov-tr  
Mirage-c  
Ulkesh Solanki  
bingbingmasdhg  
illiteratesquid  
Tortenschachtel  
Cody St Pierre  
antonkai  
carbfeng  
Gamers-Cafe  
Bartlomiej Styczen  
itachi-73m  
alexeykostin  
Reece Hagan  
Alexander Efimov  
Tailgunnnmer  
Cameron Angus  
Mohammad Nakshbandi  
jonbitzen  
Yufei Jiao  
Matthias Fauconneau  
vmednonogov  
chinepun  
scorp  
Riccardo m. Bonato  
apmontgo  
Gaël Écorchard  
Khalid Hanif   
Eric  
KokkakNiphon  
IndieDev99  
nicholas-rh  
MajesticGames  
Amy Finch  
Michał Borowiecki  
angel eyes  
Mayumi1988  
Jarvis  
Patryk  
VinnyVicious  
feng  
Krzysztof Rymski  
ZielIhu  
Łukasz Mróz  
CBBosman  
Pedro Henrique Andrade da Silva  
Tony Balandiuk  
jjs-home  
BlastBlaster17  
Vladimir Ziablitskii  
pjhusky  
Anshul  
Clayton Walker  
dKumin  
Anna Fąferek  
VladimirLagutin  
Przemyslaw Poljanski  
conradax451  
Nahuel Espinosa  
Gene Walters  
tarboss  
Benjamin Yde  
Blackmaster1988  
Cefatus  
albertdai-rf  
Valentin Bas  
michael-chen2010  
Nathan Brooks  
Robin Johnson  
w1t1  
Przemysław Poljański  
jckand-amzn  
Trung Nguyen  
Eric  
Branden J Brown  
anon-oss  
boberfly  
Xichen(Sichem) Zhou  
Sai Kumar  
Amy Finch  
IllustrisJack  
Tyler Jaacks  
ash7977  
Wiktor Bajor  
Mohamed Ali  
fasfasafaffasfa  
loopaq
