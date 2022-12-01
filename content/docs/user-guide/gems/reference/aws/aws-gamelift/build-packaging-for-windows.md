---
linkTitle: Build Packaging for Windows
title: AWS GameLift Gem Build Packaging for Windows
description: Learn how to package your Windows dedicated server builds with the AWS GameLift Gem in Open 3D Engine (O3DE).
toc: true
weight: 700
---

This topic describes how to package your Windows dedicated server builds, which is required to install and run them on Amazon GameLift. 

Creating a dedicated server package includes the following steps:
1.  Prepare an installation folder, and copy the assets, runtime binaries, levels, settings file(s) and redistributables.
2.  Create an install script to handle tasks that are required to fully install the game build onto GameLift hosting servers.
3.  Test the dedicated server package on your local machine.

{{< note >}}  
Debug dedicated servers are not supported as they require the debug visual studio redistributables which cannot be resdistributed. See [Distributable Code for Visual Studio 2019](https://docs.microsoft.com/en-us/visualstudio/releases/2019/redistribution) for more details.
{{< /note >}}

## Prerequisites
The instructions that follow assume the following:
- You have built your project with the AWS GameLift Gem enabled. For more information on building projects, refer to [Build the O3DE Project](/docs/welcome-guide/create/creating-projects-using-cli/#build-the-o3de-project). 
- You have built the profile or release version of your project's server launcher.
- You have run the **Asset Processor** and compiled all of the project's assets.

## Prepare installation folder

You must create a separate installation folder to copy over the required assets, runtime binaries, registry settings files, and redistributables. In this example, the installation folder is denoted as `<package base folder>`.

### Profile Build

1. Create the required subfolders in your installation folder. The launcher looks for fixed subfolder locations to find assets and registry files, so the installation folder must have the following structure:

   - `<package base folder>/bin`
   - `<package base folder>/assets`
   - `<package base folder>/assets/pc`

2. Copy the following files to the `/bin` folder:

    -   All the `*.exe` and `*.dll` files from `o3de/build/windows/bin/profile`.
    -   The `Registry` folder from `o3de/build/windows/bin/profile/Registry/`.
  
3. Copy all of the files (loose assets) in your project's cache folder, `<project folder>/Cache/pc`, to the `<package base folder>/assets/pc` folder.

4. Copy the `VC_redist.x64.exe` file from `o3de/Tools/Redistributables/Visual Studio 2015-2019` to the package base folder.

5. Create a build install script called `install.bat` in the package base folder and add the following content to the file. For more information about the build install script, please check [Upload a custom server build to GameLift](https://docs.aws.amazon.com/gamelift/latest/developerguide/gamelift-build-cli-uploading.html)

    ```bash
    VC_redist.x64.exe /q
    ```

### Release build

1. Create the required subfolders in your installation folder. The launcher looks for fixed subfolder locations to find assets and registry files, so the installation folder must have the following structure:

   - `<package base folder>/bin`
   - `<package base folder>/assets`
   - `<package base folder>/assets/pc`

2. Copy the following files to the `/bin` folder:

    -   All the `*.exe` and `*.dll` files from `o3de/build/windows/bin/release`.
  
3. Zip all the assets under `<project folder>/Cache/pc` as well as the `Registry` folder from `o3de/build/windows/bin/release/Registry/` into a package called `engine.pak`. Then add `engine.pak` to the `<package base folder>/assets/pc` folder.

4. Copy the `VC_redist.x64.exe` file from `o3de/Tools/Redistributables/Visual Studio 2015-2019` to the package base folder.

5. Create a build install script called `install.bat` in the package base folder and add the following content to the file. For more information about the build install script, please check [Upload a custom server build to GameLift](https://docs.aws.amazon.com/gamelift/latest/developerguide/gamelift-build-cli-uploading.html)

    ```bash
    VC_redist.x64.exe /q
    ```

## Test server package

To test the local server package:

1.  Start GameLift Local by following the Amazon GameLift documentation, [Testing Your Integration](https://docs.aws.amazon.com/gamelift/latest/developerguide/integration-testing-local.html). 
2.  Run the CLI command to start your server:
    ```
    <package base folder>\bin\<server-launcher-executable> --engine-path=<package base folder> --project-path=<package base folder> --project-cache-path=<package base folder>\assets -bg_ConnectToAssetProcessor=0
    ```

3.  Start a client and test the server behavior locally by following the Amazon GameLift [Testing Your Integration](https://docs.aws.amazon.com/gamelift/latest/developerguide/integration-testing-local.html) documentation. The server log can be found at `<package base folder>/<unique server process id>/user/log/Server.log`.


{{< caution >}}  
Make sure to replace `<package base folder>` with the path to the installation folder that you created earlier. 
{{< /caution >}}
