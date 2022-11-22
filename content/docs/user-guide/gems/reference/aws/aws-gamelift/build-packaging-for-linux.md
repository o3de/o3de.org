---
linkTitle: Build Packaging for Linux
title: AWS GameLift Gem Build Packaging for Linux
description: Learn how to package your Linux dedicated server builds with the AWS GameLift Gem in Open 3D Engine (O3DE).
toc: true
weight: 800
---

This topic describes how to package your Linux dedicated server builds, which is required to install and run them on Amazon GameLift. 

Creating a dedicated server package includes the following steps:
1.  Prepare an installation folder, and copy the assets, runtime binaries, levels, settings file(s) and additional 3rd party libraries.
2.  Create an install script to handle tasks that are required to fully install the game build onto GameLift hosting servers.
3.  Test the dedicated server package on your local machine.

{{< note >}}  
Linux dedicated server build with the Release configuration is not supported currently. Please make sure to build your dedicated server with the Profile configuration.
{{< /note >}}

## Prerequisites
The instructions that follow assume the following:
- You have built your project with the AWS GameLift Gem enabled. For more information on building projects, refer to [Build the O3DE Project](/docs/welcome-guide/create/creating-projects-using-cli/#build-the-o3de-project). 
- You have built the Profile version of your project's server launcher.
- You have run the **Asset Processor** and compiled all of the project's assets.

## Prepare installation folder

You must create a separate installation folder to copy over the required assets, profile runtime binaries, registry settings files, and redistributables. In this example, the installation folder is denoted as `<package base folder>`.

1. Create the required subfolders in your installation folder. The launcher looks for fixed subfolder locations to find assets and registry files, so the installation folder must have the following structure:

   - `<package base folder>/assets`
   - `<package base folder>/assets/linux`
   - `<package base folder>/lib64`

2. Copy the following files to the package base folder:

    -   All the executables and `*.so` files from `o3de/build/linux/bin/profile`.
    -   The `Registry` folder from `o3de/build/linux/bin/profile/Registry`.
  
3. Copy all of the files (loose assets) in your project's cache folder, `<project folder>/Cache/linux`, to the `<package base folder>/assets/linux` folder.

4. Copy the following 3rd party libraries from `/usr/lib/x86_64-linux-gnu`/ to `<package base folder>/lib64/`:

    -   libc++*
    -   libxkb*
    -   libxcb*
    -   libX*
    -   libbsd*
    -   libstdc++*

    To copy libary files, use the following CLI command:

    ```cmd
    cp -a /usr/lib/x86_64-linux-gnu/<library name>* <package base folder>/lib64/.
    ```

5. Create a build install script called `install.sh` in the package base folder and add the following content to the file. For more information about the build install script, please check [Upload a custom server build to GameLift](https://docs.aws.amazon.com/gamelift/latest/developerguide/gamelift-build-cli-uploading.html)

    ```bash
    #!/bin/sh

    sudo cp -a ./lib64/libX* /lib64/.
    sudo cp -a ./lib64/libbsd* /lib64/.

    if cat /etc/system-release | grep -qFe 'Amazon Linux release 2'
    then
        sudo yum update -y
        sudo yum groupinstall 'Development Tools' -y
        sudo yum install python3 -y

        echo 'Update outdated make package'
        mkdir make && cd make
        wget http://ftp.gnu.org/gnu/make/make-4.2.1.tar.gz
        tar zxvf make-4.2.1.tar.gz
        mkdir make-4.2.1-build make-4.2.1-install
        cd make-4.2.1-build
        /local/game/make/make-4.2.1/configure --prefix='/local/game/make/gmake-4.2.1-install'
        make -j 8
        make -j 8 install
        export PATH=/local/game/make/gmake-4.2.1-install/bin:$PATH
        sudo ln -sf /local/game/make/gmake-4.2.1-install/bin/make /local/game/make/gmake-4.2.1-install/bin/gmake
        cd /local/game/

        echo 'Installing missing libs for AL2'
        mkdir glibc && cd glibc
        wget http://mirror.rit.edu/gnu/libc/glibc-2.29.tar.gz
        tar zxvf glibc-2.29.tar.gz
        mkdir glibc-2.29-build glibc-2.29-install
        cd glibc-2.29-build
        /local/game/glibc/glibc-2.29/configure --prefix='/local/game/glibc/glibc-2.29-install'
        make -j 8
        make -j 8 install
        sudo ln -sf /local/game/glibc/glibc-2.29-install/lib/libm.so.6 /local/game/lib64/libm.so.6
        cd /local/game/
    fi
        
    echo 'Install Success'
    ```

## Test server package

To test the local server package:

1.  Start GameLift Local by following the Amazon GameLift documentation, [Testing Your Integration](https://docs.aws.amazon.com/gamelift/latest/developerguide/integration-testing-local.html). 
2.  Run the CLI command to start your server:
    ```
    <package base folder>/<server-launcher-executable> --engine-path=<package base folder> --project-path=<package base folder> --project-cache-path=<package base folder>/assets -bg_ConnectToAssetProcessor=0 -rhi=null
    ```

3.  Start a client and test the server behavior locally by following the Amazon GameLift [Testing Your Integration](https://docs.aws.amazon.com/gamelift/latest/developerguide/integration-testing-local.html) documentation. The server log can be found at `<package base folder>/<unique server process id>/user/log/Server.log`.

{{< caution >}}  
Make sure to replace `<package base folder>` with the path to the installation folder that you created earlier. 
{{< /caution >}}

{{< note >}}  
If you are using virtualbox to build linux server, you would not be able to test the networking connection across host pc and virtualbox. Instead after launching server, you can use AWS cli to test gamelift session on server side. (see details in [Test a Game Server](https://docs.aws.amazon.com/gamelift/latest/developerguide/integration-testing-local.html#integration-testing-local-server))
{{< /note >}}
