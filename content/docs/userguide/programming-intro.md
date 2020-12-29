# Programming in Lumberyard<a name="programming-intro"></a>

## Programming with Lumberyard<a name="ly-programming-intro"></a>

Learn about the game development APIs and integrations available with Lumberyard \(and for Lumberyard\)\. This documentation covers the EBus messaging infrastructure for in\-game communications between game systems, memory management and debugging, extending and customizing the Lumberyard editor and tools, networking, localization, and Twitch integration\.

These topics are for game developers who have experience with C\+\+ programming and common game design patterns\.


**In this section:**  

| Topic Area | Description | 
| --- | --- | 
| [Systems APIs](systems-intro.md) | Learn about the AZ C\+\+ APIs used for console variables, event notifications, and simple pub/sub messaging within your game project\. Note: These systems APIs were introduced with Lumberyard 1\.24 and focus on a simplified model for in\-game messaging and events\. | 
| [Event Bus](ebus-intro.md) \(EBus\) | Learn about EBus, the messaging infrastructure for notifications and messaging\.  | 
| [AZ Code Generator](az-code-gen-intro.md) | Learn about AZ Code Generator, a utility for generating source code \(or any data or text\) from specially tagged source code\. | 
| [Input](input-intro.md) | Documentation on incorporating different control devices and configurations for your Lumberyard game\. | 
| [AI](ai-intro.md) | Learn how to add AI systems to your game that provide different actor and character behaviors\. | 
| [Memory management](memory-allocators.md) | Learn how Lumberyard allocates and manages memory resources for games, as well as memory debugging and overrun detection\. | 
| [Profiling, testing, and debugging](testing-debugging-intro.md) | Learn about Lumberyard tools that are used for testing builds, profiling performance, and debugging various issues that may be encountered\. | 
|  [UI 2\.0](ui20.md) | Learn about extending the Lumberyard editor and tools user interface with UI 2\.0 and Qt\. Note: This documentation was introduced with Lumberyard 1\.25, and will be updated with the full set of guidance for the next release\. | 
| [Networking](network-intro.md) | Learn about GridMate, Lumberyard's game networking infrastructure\. Learn about how to synchronize game state across clients, manage bandwidth usage, provide data encryption over the wire, and integrate with Amazon GameLift \(for multiplayer lobbies and matchmaking\)\. | 
| [Twitch integration](twitch-intro.md) | Learn how to incorporate Twitch into your Lumberyard game project\. | 
| [Cloud connected features](cloud-canvas-intro.md) | Learn about Cloud Canvas, a set of gems, scripting features, and resource groups that you can use with AWS Cloud Services and Lumberyard to create cloud\-enabled games\. | 
| [Localization](localization-intro.md) | Learn how to create multiple\-language, region\-specific versions of your game using Lumberyard's localization system\. | 