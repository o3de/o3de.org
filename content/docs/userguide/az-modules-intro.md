# Using AZ Modules to Initialize Gems<a name="az-modules-intro"></a>

AZ modules are code libraries designed to plug into Lumberyard games and tools\. An AZ module is a collection of C\+\+ code built as a static or dynamic library \(`.lib` or `.dll` file\) that implements specific initialization functions\. When a Lumberyard application starts, it loads each module and calls these initialization functions\. These initialization functions allow the module to connect to core technologies such as reflection, serialization, [event buses](ebus-intro.md), and the [Working with component entities](component-intro.md)\.

Lumberyard uses the AZ module interface to extract the contents of your gem into the global environment\. Each application has a single entity associated with it that is referred to as the [system entity](az-module-system-entities-configuring.md)\. AZ modules can add components to this entity before it is activated\. Components that are added to the system entity are called system components\. System components are often singleton/manager\-type objects that aggregate or provide resources to game components or other systems\. Like other entities, a system entity must have its dependencies present\. You can assume that any systems that you depend on are booted and available when your system component is activated\.

Modules are not a new concept in Lumberyard\. In fact, the Lumberyard game engine is a collection of older style modules\. These legacy modules have served the game engine well, but they have a number of shortcomings which are addressed by AZ modules, as presented in the next section\.

Lumberyard currently supports both legacy modules and AZ modules but going forward will use AZ modules\. Beginning in Lumberyard 1\.5, a gem can contain AZ module code\. Creating a new gem is the easiest way to get up a new AZ module up and running\.

**Note**  
AZ is the namespace of the AZCore C\+\+ library upon which AZ modules are built\. The letters *AZ* refer to Amazon; the term is a preview name that has nothing to do with [Amazon Availability Zones](https://aws.amazon.com/about-aws/global-infrastructure/) and may be subject to change\. 

## Comparing AZ Modules to Legacy Modules<a name="az-modules-intro-az-vs-legacy"></a>

AZ modules have significant advantages over legacy modules, as the following table shows:


****  

|  |  |  | 
| --- |--- |--- |
| Topic | Legacy Modules | AZ Modules | 
| Compatibility | Modules can be converted to AZ modules with no loss of functionality\.  | Anything that can be done in a legacy module can also be done in an AZ module\. Most AZ module code could live within a legacy module, but legacy modules are not likely to be compatible with future AZ module–based Lumberyard tools\. | 
| Ease of adding services \(singleton classes\) to modules | Adding services usually requires editing files in CryCommon\. A file for the singleton's class interface must exist in the CryCommon directory, and a variable to hold the singleton in gEnvmust exist\.  | Modules create components and attach them to the system entity\. No editing of game engine files is required\. | 
| Ease of use for low\-level application features |  Modules load late, which prevents them from contributing low\-level features to an application\. All critical features must be in a single module that loads before others\.  | Modules load early in the application's startup sequence and are initialized in discrete stages\. This allows any module to provide a low\-level feature at an early stage that other modules can take advantage of later\. | 
| Exposure of properties | Modules have no uniform way to let users control settings for their service\. Some services read settings from \.xml files in the assets directory, which must be edited by hand\. | AZ modules expose the properties of system components to the Lumberyard reflection system\. The reflection system makes information about these properties available to all other components\. | 
| Game engine dependency | Modules must run in the game engine and are difficult to extend for use in tools that do not have game code\. | Modules are not specific to the game engine and can be used outside it\. | 
| Initialization functions | Function parameters are specific to CryEngine\. | Function parameters are specific to the AZ framework; for more information, see the following section\.  | 
| Order of initialization | Singleton code often depends on services offered by other singletons, so modules must be initialized in a very particular order\. However, the order is not obvious\. If someone is unfamiliar with the code in the modules, their loading order is difficult to ascertain\. | Each module explicitly states its dependencies on system components\. After all system components are examined, they are sorted according to these dependencies and initialized in the appropriate order\. Each module is a first\-class citizen\. | 

### A Self\-Aware Method of Initialization<a name="az-modules-intro-az-vs-legacy-initialization-order"></a>

Legacy modules are loaded in a particular order\. Because `CrySystem` is loaded and initialized before the game module, it must provide all low\-level systems such as logging and file I/O that a subsequent module might depend on\. The game module itself cannot provide such low\-level systems because it’s initialized too late\. 

AZ modules, on the other hand, are all loaded as early as possible, and then initialized in stages\. Because each module explicitly states its dependencies on system components, all system components can be examined beforehand, sorted according to dependencies, and [initialized in the appropriate order](az-module-system-components.md#az-module-system-components-smart-initialization-order)\. This makes it possible for low\-level functionality \(like a custom logging system\) to be implemented from a game module\. For more information about the initialization order of components, see [The AZ Bootstrapping Process](az-module-bootstrap.md)\.

## Relationship with the AZ Framework<a name="az-modules-intro-az-fwk"></a>

AZ modules are designed to work with the AZ framework, which is a collection of Lumberyard technologies such as reflection, serialization, [event buses](ebus-intro.md), and the [Working with component entities](component-intro.md)\. The AZ framework supports game development but can also be used outside it\. For example, Lumberyard tools like the Lumberyard Setup Assistant, [Using Asset Processor](asset-pipeline-processor.md) and the component entity system use the AZ framework and AZ modules, but contain no game code\. When the Resource Compiler builds slices, it loads AZ modules to extract reflection information about components within them\.

AZ modules are code libraries that are built to use the AZ framework\. When an AZ framework application loads an AZ module, the AZ module knows how to perform tasks such as gathering reflection information about the data types defined within that library\. 

## Smarter Singletons<a name="az-modules-intro-smarter-singletons"></a>

 AZ modules build their services \(which are singleton classes\) by using the same component entity system that Lumberyard uses to build in\-game entities\. A module simply places a system component on the system entity\. This solves many of the problems associated with singletons in legacy modules\. 

 The GUI in Lumberyard Editor uses the reflection system to expose the properties of entities \(gameplay components\) to designers\. In the same way, Lumberyard uses the reflection system to expose the properties of system components so that you can customize your settings for a particular game\. Because system components are really no different from gameplay components, you can [use the Project Configurator to edit the properties of system components](az-module-system-entities-configuring.md) just as you edit the properties of in\-game components\. 

## Current Lumberyard AZ Modules<a name="az-modules-intro-current-az-modules"></a>

 The [gems](az-module-gems.md) provided with Lumberyard are all built as AZ modules\. In addition, there are two AZ modules that are not built as Gems\. 

### LmbrCentral<a name="az-modules-intro-current-az-modules-lmbrcentral"></a>

`LmbrCentral` contains components that wrap functionality from legacy modules\. For example, the `MeshComponent` utilizes `IRenderNode` under the hood\. `LmbrCentral` is used by game applications\. 

### LmbrCentralEditor<a name="az-modules-intro-current-az-modules-lmbrcentraleditor"></a>

Components can have editor\-specific implementations that integrate with technology not available in the game runtime environment\. Therefore, a separate module, `LmbrCentralEditor`, is used by Lumberyard Editor\. This module contains all the code from `LmbrCentral`, plus code that is only for use in tools\. The `LmbrCentralEditor` module is not for use in standalone game applications\. 