---
linktitle: Installing O3DE for Linux
title: Installing O3DE for Linux
description: Learn how to install and set up Open 3D Engine (O3DE) for Linux.
weight: 200
---

To get started quickly with O3DE in Linux, download and install the deb package. The following instructions guide you through the installation process. After a successful install, you'll have a stable, pre-built version of the engine and its Gems, and you'll be ready to create new or open existing projects with the **Project Manager** tool.

## Prerequisites

The following instructions assume that you have met all hardware and software requirements listed in [O3DE System Requirements](../requirements).

## Installing O3DE from a deb package

1. Get the latest version of the deb package from the [O3DE download](https://o3de.org/download/#linux) page.

1. Run the installer from your download location.
    ```shell
    sudo apt install <path_to_deb_package>/<debian_package_name>.deb
    ```
    Use the following path substitutions:
    * `<path_to_deb_package>`: The path where you downloaded the deb package. Example: `~/Downloads`.
    * `<debian_package_name>`: The name of the package. Example: `o3de_2310_3.deb`.

    {{< known-issue link="https://bugs.launchpad.net/ubuntu/+source/synaptic/+bug/1522675" >}}
When installing the package, you may observe the following error:
```
N: Download is performed unsandboxed as root as file '/home/<user>/Downloads/o3de_2310_3.deb' 
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
W: Repository is broken: o3de:amd64 (= 23.10.3) has no Size information
```
This is a bug in apt that has already been fixed. The warning should go away once your current Linux distribution takes the fix. The issue is a warning and does not affect installing or removing.
    {{< /known-issue >}}

    O3DE will be installed in the default location: `/opt/O3DE/<version>`, where `<version>` is the version of the installer. Example: `2310_3`.

1. During installation, the installer downloads additional packages as needed. The process can take some time, depending on your internet connection speed and what packages were already installed. An example output looks like the following (versions and paths may not match):
    ```shell
    Reading package lists... Done
    Building dependency tree
    Reading state information... Done
    Note, selecting 'o3de' instead of '/usr/home/<user>/Downloads/o3de_2310_3.deb'
    The following packages were automatically installed and are no longer required:
    gir1.2-ibus-1.0 libasound2-dev libblkid-dev libdbus-1-dev libegl1-mesa-dev libgles2-mesa-dev libglib2.0-dev libglib2.0-dev-bin libibus-1.0-5 libibus-1.0-dev libice-dev libmount-dev libpcre16-3
    libpcre2-16-0 libpcre2-32-0 libpcre2-dev libpcre2-posix2 libpcre3-dev libpcre32-3 libpcrecpp0v5 libpulse-dev libpulse-mainloop-glib0 libsdl2-2.0-0 libsdl2-dev libselinux1-dev libsepol1-dev libsm-dev
    libsndio-dev libsndio7.0 libudev-dev libwayland-bin libwayland-cursor0 libwayland-dev libwayland-egl1 libxcursor-dev libxcursor1 libxfixes-dev libxi-dev libxinerama-dev libxrandr-dev libxrender-dev
    libxt-dev x11proto-input-dev x11proto-randr-dev x11proto-xinerama-dev
    Use 'sudo apt autoremove' to remove them.
    The following NEW packages will be installed:
    o3de
    0 upgraded, 1 newly installed, 0 to remove and 0 not upgraded.
    After this operation, 17.9 GB of additional disk space will be used.
    Get:1 /usr/home/<user>/Downloads/o3de_2310_3.deb o3de amd64 2310_3 [5064 MB]
    Selecting previously unselected package o3de.
    (Reading database ... 48992 files and directories currently installed.)
    Preparing to unpack .../Linux/DEB/o3de_2310_3.deb ...
    Unpacking o3de (2310_3) ...
    Unpacking o3de (2310_3) over (2310_1) ...
    Setting up o3de (2310_3) ...
    ```
    
When installation is complete, you can find **Project Manager** and other tools in `<install-directory>/bin/Linux/profile/Default`.

Example of launching Project Manager from the shell:
```shell
/opt/O3DE/23.10.3/bin/Linux/profile/Default/o3de
```

## Removing O3DE installed from a deb package

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
    After this operation, 17.9 GB disk space will be freed.
    Do you want to continue? [Y/n] Y
    (Reading database ... 66411 files and directories currently installed.)
    Removing o3de (0.0.0.0) ...
    ```

## Installing O3DE from a Snap package

{{< note >}}
The Snap package is experimental and may run into issues on some distros. These instructions have been tested on Ubuntu 20.04 and 22.04 LTS. You will need to install all of the dependencies listed in [Linux requirements](/docs/welcome-guide/requirements/#linux).
{{< /note >}}

1. Download the Snap package from the [O3DE download](https://o3de.org/download/#linux) page or get instructions from the [Snap store](https://snapcraft.io/o3de).

1. Depending on the distro, you will need to install `snapd` in order to install the Snap package. [Refer to this guide for instructions specific to your distro](https://snapcraft.io/docs/installing-snapd).

1. To install the snap from the Snap store, use the following command to install the package (this automatically downloads the package from the store):
   ```shell
   snap install --classic o3de
   ```
   To install the latest development or beta channels, use the following command:
   ```shell
   snap install --classic --<channel name> o3de
   ```
   If you downloaded the Snap package from the O3DE download page, use the following command to install the package:
   ```shell
   snap install --classic --dangerous <o3de snap package filename>.snap
   ```
   The following output will be displayed if successful:
   ```shell
   o3de <version> installed
   ```
   Where `<version>` is the version of the installer. Example: `23.10.3`.

O3DE will be installed in the default location: `/snap/o3de/current/<version>`, where `<version>` is the version of the installer. Example: `23.10.3`.

When installation is complete, you can find **Project Manager** and other tools in `<install-directory>/bin/Linux/profile/Default`. `snapd` will add this `Default` directory to your shell environment's path.

Example of launching Project Manager from the shell:
```shell
o3de
```

## Removing O3DE installed from a Snap package

1. Run `snap` to remove O3DE:
   ```shell
   snap remove o3de
   ```
   The following output will be displayed if successful:
   ```shell
   o3de removed
   ```
