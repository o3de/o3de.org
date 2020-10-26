# Game Startup Sequence<a name="asset-pipeline-game-sequence"></a>

Compiled Lumberyard games start up in the following sequence:

1. The game reads the `bootstrap.cfg` file, which must contain the following information at a minimum: 
   + Name of the game, and optionally, the name of the game DLL, if it differs from the game name\.
   + Whether or not to connect to the Asset Processor on startup or listen for an incoming connection instead\.
   + Whether or not to wait for an established connection before proceeding\.
   + Whether or not to enable the virtual file system \(VFS\), which allows you to read assets remotely from a connected computer instead of having to deploy them to the game device\. This also is required for live reloading to function on non\-PC operating systems\.
   + Which kind of assets to load\. For example, you could configure the Android runtime to load `es3` assets, or `pc` assets, or `metal` assets\. This determines which directory the game looks in for the assets so that the appropriate directory is also used for VFS\.

1. The `lyconfig_default.xml` file is read\.

1. VFS is started and enabled\. All file access then goes through the VFS system\. Besides the `bootstrap.cfg` file, executable files, DLL files, and associated OS files, nothing else needs to be deployed to the device\. Instead, they can all be accessed remotely\.

1. The `system_game OS_assets.cfg` file is read, where `assets` are the assets specified in the `bootstrap.cfg` file\.