---
linktitle: Installing O3DE for Linux
title: Installing O3DE for Linux from a deb package
description: Learn how to install and set up Open 3D Engine (O3DE) for Linux using a deb package.
weight: 200
---

To get started quickly with O3DE in Linux, download and install the deb package. The following instructions guide you through the installation process. After a successful install, you'll have a stable, pre-built version of the engine and its Gems, and you'll be ready to create new or open existing projects with the **Project Manager** tool.

## Prerequisites

The following instructions assume that you have met all hardware and software requirements listed in [O3DE System Requirements](../requirements).

## Installing O3DE

1. Get the latest version of the deb package from the [O3DE download](https://o3de.org/download/#linux) page.

1. Run the installer from your download location.
    ```shell
    sudo apt install <path_to_deb_package>/<debian_package_name>.deb
    ```
    Use the following path substitutions:
    * `<path_to_deb_package>`: The path where you downloaded the deb package. Example: `~/Downloads`.
    * `<debian_package_name>`: The name of the package. Example: `o3de_2210_0.deb`.

    {{< known-issue link="https://bugs.launchpad.net/ubuntu/+source/synaptic/+bug/1522675" >}}
When installing the package, you may observe the following error:
```
N: Download is performed unsandboxed as root as file '/home/<user>/Downloads/o3de_2210_0.deb' 
   couldn't be accessed by user '_apt'. - pkgAcquire::Run (13: Permission denied)
```
This is a bug in apt that has already been fixed. The error should go away once your current Linux distribution takes the fix.
Until your distribution takes the fix, you can workaround the issue by repairing folder permissions with the following commands:
```
sudo chown -Rv _apt:root /var/cache/apt/archives/partial/
sudo chmod -Rv 700 /var/cache/apt/archives/partial/
```
    {{< /known-issue >}}

    {{< known-issue link="https://salsa.debian.org/apt-team/apt/-/merge_requests/177" >}}
If removing and installing the package, you may observe a warning like the following:
```
W: Repository is broken: o3de:amd64 (= 22.10.0) has no Size information
```
This is a bug in apt that has already been fixed. The warning should go away once your current Linux distribution takes the fix. The issue is a warning and does not affect installing or removing.
    {{< /known-issue >}}

    O3DE will be installed in the default location: `/opt/O3DE/<version>`, where `<version>` is the version of the installer. Example: `2210_0`.

1. During installation, the installer downloads additional packages as needed. The process can take some time, depending on your internet connection speed and what packages were already installed. An example output looks like the following (versions and paths may not match):
    ```shell
    Reading package lists... Done
    Building dependency tree
    Reading state information... Done
    Note, selecting 'o3de' instead of '/usr/home/<user>/Downloads/o3de_2210_0.deb'
    The following packages were automatically installed and are no longer required:
    gir1.2-ibus-1.0 libasound2-dev libblkid-dev libdbus-1-dev libegl1-mesa-dev libgles2-mesa-dev libglib2.0-dev libglib2.0-dev-bin libibus-1.0-5 libibus-1.0-dev libice-dev libmount-dev libpcre16-3
    libpcre2-16-0 libpcre2-32-0 libpcre2-dev libpcre2-posix2 libpcre3-dev libpcre32-3 libpcrecpp0v5 libpulse-dev libpulse-mainloop-glib0 libsdl2-2.0-0 libsdl2-dev libselinux1-dev libsepol1-dev libsm-dev
    libsndio-dev libsndio7.0 libudev-dev libwayland-bin libwayland-cursor0 libwayland-dev libwayland-egl1 libxcursor-dev libxcursor1 libxfixes-dev libxi-dev libxinerama-dev libxrandr-dev libxrender-dev
    libxt-dev x11proto-input-dev x11proto-randr-dev x11proto-xinerama-dev
    Use 'sudo apt autoremove' to remove them.
    The following NEW packages will be installed:
    o3de
    0 upgraded, 1 newly installed, 0 to remove and 0 not upgraded.
    After this operation, 18.2 GB of additional disk space will be used.
    Get:1 /usr/home/<user>/Downloads/o3de_2210_0.deb o3de amd64 2210_0 [4506 MB]
    Selecting previously unselected package o3de.
    (Reading database ... 48992 files and directories currently installed.)
    Preparing to unpack .../Linux/DEB/o3de_2210_0.deb ...
    Unpacking o3de (2210_0) ...
    Unpacking o3de (2210_0) over (2210_0) ...
    Setting up o3de (2210_0) ...
    ```

When installation is complete, you can find **Project Manager** and other tools in `<install-directory>/bin/Linux/profile/Default`.

Example of launching Project Manager from the shell:
```shell
/opt/O3DE/2210_0/bin/Linux/profile/Default/o3de
```

## Removing O3DE

1. Run apt to remove o3de:
    ```shell
    sudo apt remove o3de
    ```
    An output like the following will be displayed:
    ```shell
    Reading package lists... Done
    Building dependency tree
    Reading state information... Done
    The following packages were automatically installed and are no longer required:
      gir1.2-ibus-1.0 libasound2-dev libblkid-dev libdbus-1-dev libegl1-mesa-dev libgles2-mesa-dev libglib2.0-dev libglib2.0-dev-bin libibus-1.0-5 libibus-1.0-dev libice-dev libmount-dev libpcre16-3
      libpcre2-16-0 libpcre2-32-0 libpcre2-dev libpcre2-posix2 libpcre3-dev libpcre32-3 libpcrecpp0v5 libpulse-dev libpulse-mainloop-glib0 libsdl2-2.0-0 libsdl2-dev libselinux1-dev libsepol1-dev libsm-dev
      libsndio-dev libsndio7.0 libudev-dev libwayland-bin libwayland-cursor0 libwayland-dev libwayland-egl1 libxcb-render0 libxcb-render0-dev libxcb-shape0-dev libxcb-xfixes0-dev libxcb-xinput-dev
      libxcb-xkb-dev libxcb-xkb1 libxcursor-dev libxcursor1 libxfixes-dev libxi-dev libxinerama-dev libxkbcommon-dev libxkbcommon-x11-0 libxkbcommon-x11-dev libxkbcommon0 libxrandr-dev libxrender-dev
      libxt-dev x11proto-input-dev x11proto-randr-dev x11proto-xinerama-dev
    Use 'sudo apt autoremove' to remove them.
    The following packages will be REMOVED:
      o3de
    0 upgraded, 0 newly installed, 1 to remove and 0 not upgraded.
    After this operation, 18.5 GB disk space will be freed.
    Do you want to continue? [Y/n] Y
    (Reading database ... 66411 files and directories currently installed.)
    Removing o3de (0.0.0.0) ...
    ```
