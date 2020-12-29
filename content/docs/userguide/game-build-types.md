# Game Build Types in Amazon Lumberyard<a name="game-build-types"></a>

Amazon Lumberyard lets you create different types of game builds for each step in your development process:

**Profile mode builds for game developers, designers, and artists**
+ Provides an optimized build meant for game development\.
+ Contains performance instrumentation and debugging output\.
+ Compiles shaders at run time, which may require the remote shader compiler\.
+ Communicates with Asset Processor and compiles as needed\.
+ Has logging, crash reporting, metrics, and other troubleshooting features\.

**Debug mode builds for programmers**
+ Provides a non\-optimized version of the game engine that provides the same features as the profile version\.
+ Has additional memory checks and tests\.
+ Provides step\-by\-step code that programmers can use to debug the execution\.

**Release mode builds for customer previews, demos, and launches**
+ Loads assets and data only from `.pak` files\.
+ Loads shaders from `.pak` files for better performance but may compile shaders for DirectX at run time if a shader is not found in the `.pak` files\.
+ Can't use virtual file system \(VFS\) or remote asset access\.
+ Doesn't communicate with Asset Processor because Asset Processor doesn't ship with the game\.
+ Removes most logging, instrumentation, profiling, and other measurement metrics\.
+ Removes all game developer and programmer features such as console usage, cheat commands, command line parsing, and batch mode processing\.
+ Combines everything into a single executable file instead of DLLs\.

To learn how to perform each type of build and about build configuration, see [Waf Commands and Options](waf-commands.md) 