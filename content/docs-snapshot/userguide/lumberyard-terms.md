# Key Lumberyard Terminology<a name="lumberyard-terms"></a>

If you are new to working with Lumberyard, see the following list to learn about key terms and concepts for Lumberyard\. For more information, see the additional topics for in\-depth descriptions and procedures\.

**Actor**  
An actor is an entity that you create for characters in your game\. You can then add the **Anim Graph**, **Character Physics**, **Lua Script**, and **Actor** components to the entity to control your actor's movements\. An **Actor** component exposes nodes that Lumberyard uses for animation\. You work with the nodes in the **Animation Editor** to create motion sets that determine the motions for the characters \(run, walk, idle, and so on\)\.   

**Example Actor**  
The entity in the Lumberyard Editor viewport has an **Actor** component attached\.  

![\[You can add an Actor component to an entity to create a character for your game.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/terms/example-actor-entity-and-component.png)
For more information, see [Create and animate characters](char-intro.md)\.

**Asset Builder API**  
The Asset Builder API is an interface for creating custom types of assets\. With the Asset Builder API, you create a custom asset, and register the asset in the asset pipeline\. Asset Processor processes the asset like any other file \(for example, `.tif` file to a `.dds` file\), so that you can use it in Lumberyard\. The Asset Builder API lets you leverage all the benefits of the asset pipeline, such as Asset Processor and the **Asset Browser**\.  
For more information, see [Creating a Custom Asset Builder](asset-builder-custom.md)\. 

**Asset Processor**  
This utility is a background service that monitors changes to your source files and updates the cache with any changes\. For example, if you replace an existing mesh asset with a new version of the asset, Asset Processor detects and processes the change for you\.   

**Example Importing Assets**  
When you import assets into your game project, Asset Processor automatically detects the change and processes them\.  

![\[You can import assets for your game with Asset Processor.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/assets/pipeline/asset-pipeline-importing.png)
For more information, see [Working with the Asset Pipeline and asset files](asset-pipeline-intro.md)\.

**AZ Code Generator**  
This command line utility accepts a tagged source code file and creates a text, data, or code file\. AZ Code Generator parses through a list of existing C\+\+ source files and/or header files and generates the intermediate data in JSON format\. It passes the intermediate data to a series of templates, which provide the format for the code that is generated\.   
For example, you can use the AZ Code Generator feature to create a component that you can use in the **Entity Inspector**\.  

**Example AZ Code Generator Process**  

![\[You can create your own components with the AZ Code Generator.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/az-code-gen-workflow.png)
For more information, see [Automating boilerplate with AZ Code Generator](az-code-gen-intro.md)\.

**Behavior Context**  
You can use the [Behavior Context](component-entity-system-reflection-behavior-context.md) to reflect runtime code to make it accessible to scripting languages like Lua or scripting environments like Lumberyard's **Script Canvas** editor\. The behavior context provides bindings that invoke runtime C\+\+ code\.

**Dedicated Server Build**  
This Lumberyard build option is a minimal Waf build of your Lumberyard project for gameplay only\. This configuration can be deployed to act as a server locally or hosted on AWS\. Your Lumberyard dedicated server can use the Amazon GameLift to manage your multiplayer queues\.   
For more information, see [Creating Dedicated Servers](network-dedicated-server.md)\.

**Entity**  
An entity is a game object with a unique ID and a container\. An entity contains one or more components that provide functionality\. For example, you can add a **Mesh** component to an entity to add visual geometry, such as creating a door or tree for your game\.  

**Example Entities and Components**  
You can see entities in the **Entity Outliner** and the components attached to that entity in the **Entity Inspector**\.  

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/entity_system/component-entity-inspector.png)
For more information about entities and components, see [Working with component entities](component-intro.md)\.

**Event Bus System**  
Event buses \(EBuses\) are a general\-purpose communication system that Lumberyard uses to dispatch notifications and receive requests\. EBuses are configurable and support many different use cases\. For example, you can use EBuses to notify other parts of the engine about an event, such as changes to a component's configuration\.   
You can use the event bus system by adding a component to an entity, as a call in C\+\+, or by including the API header\.   
For more information, see [Working with the Event Bus \(EBus\) system](ebus-intro.md)\.

**GameLift**  
Amazon GameLift is an AWS service that you can use to host server\-based games, scale servers up and down, allow players to connect, and provide matchmaking services\. You can enable the GameLift gem for Lumberyard\.   
For more information, see [ Using Amazon GameLift](network-gamelift-using.md) and [GameLift Gem](gems-system-gem-gamelift.md)\.

**Gem**  
Gems are reusable packages of code and assets that can be added, modified, or removed from a Lumberyard game\. A gem is a module based on the [AZ Module system](az-modules-intro.md)\. You can enable gems for your game for additional assets and code\. For example, you can enable the Rain gem so that you can add the **Rain** and **Snow** components to your entities\. Gems can be enabled in other game projects or distributed to other game developers\. Lumberyard builds gems with the Waf build system\. Some gems are required for Lumberyard\.  
Cloud gems are Lumberyard gems that provide AWS cloud\-connected functionality for a game\. For more information, see [Cloud Gems](cloud-canvas-cloud-gems-intro.md)\.  
For more information, see [Creating a Gem](gems-system-gems.md)\.  

**Example Gems**  
You can enable gems for your game project with the Project Configurator\.  

![\[Gems provide your project with packages of assets and code.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/gems-system-gems-select-gems.png)

**GridMate Networking System**  
GridMate is the Lumberyard networking library for hosting multiplayer gameplay on client\-server or peer\-to\-peer architectures\. You can enable the Multiplayer gem to include this library and the NetBindable interface for your project\.   
For more information, see [Using Lumberyard Networking](network-intro.md) and [Multiplayer Gem](gems-system-gem-multiplayer.md)\.

**Slice**  
A slice is a collection of configured entities that are stored as a single unit in a reusable asset\. You can use slices to group entities and other slices for reuse\. With slices, you can edit, create, and spawn multiple entities as a set\. Your project can use a slice in a similar way that you used prefabs and layers in previous versions of Lumberyard\.   
Slices contain entities, including their components and properties, and may also contain instances of other slices\. This ability to nest slices without flattening the hierarchy is a feature unique to Lumberyard\.   

**Example Slice**  
**Simple\_JackLocomotion** is a slice that contains two entities – **Jack** and **Camera**\. You can find this slice in the [Samples Project](sample-project-samples.md)\.  

![\[A slice shown in the viewport and in the Entity Outliner.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/terms/term-slice-cube-outliner.png)
For more information, see [Working with Slices](component-slices.md)\.

**Virtual File System \(VFS\)**  
This system is designed for non\-PC platforms to handle game assets for live reloading\. The virtual file system streams and loads your assets from your development machine as needed\. You do not have to load your entire level or game to the device ahead of time and you can avoid deploying assets to a target device\. When you make a change on your development machine, live reloading automatically updates the asset in Lumberyard Editor and for the target device\.  
For example, if you want to run your game on an iOS device and you change an asset, Asset Processor uses the virtual file system to stream the updated asset from your development machine to the iOS device\.   
For more information, see [Live Reloading and VFS](asset-pipeline-live-reloading.md) and [Serving assets over the Virtual File System \(VFS\)](android-configure-project.md#android-vfs)\.