---
linktitle: Installing O3DE for Linux
title: Installing O3DE for Linux from a deb package
description: Learn how to install and set up Open 3D Engine (O3DE) for Linux using a deb package.
weight: 200
---

To get started quickly with O3DE in Linux, download and install the deb package. The following instructions guide you through the installation process. After a successful install, you'll have a stable, pre-built version of the engine and its Gems, and you'll be ready to create new or open existing projects with the **Project Manager** tool.

## Prerequisites

The instructions here assume that you have met all hardware and software requirements listed in [O3DE System Requirements](../requirements#linux).

## Installing O3DE

1. Get the latest version of the deb package from the [O3DE download](https://o3de.org/download/#linux) page.

1. Run the installer from your download location.
    ```shell
    sudo apt install <path_to_deb_package>/<debian_package_name>.deb
    ```
Where:
* `<path_to_deb_package>` is the path where the deb package was downloaded to, e.g. `~/Downloads`
* `<debian_package_name>` is the name of the package, e.g. `O3DE_2111_1.deb`

1. The default install location is: `/opt/O3DE/<version>`. Where `<version>` is the version of the installer, e.g. `2111_1`.

1. During installation, the installer downloads additional packages as needed. The process can take some time, depending on your internet connection speed and what packages were already installed. An example output looks like the following (versions and paths may not match):
```shell
Reading package lists... Done
Building dependency tree
Reading state information... Done
Note, selecting 'o3de' instead of '/usr/home/<user>/Downloads/o3de_2111_1.deb'
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
Get:1 /usr/home/<user>/Downloads/o3de_2111_1.deb o3de amd64 2111_1 [4506 MB]
Selecting previously unselected package o3de.
(Reading database ... 48992 files and directories currently installed.)
Preparing to unpack .../Linux/DEB/o3de_2111_1.deb ...
Unpacking o3de (2111_1) ...
Unpacking o3de (2111_1) over (2111_1) ...
Setting up o3de (2111_1) ...
```

1. Project Manager can be located in `/opt/O3DE/<version>/bin/Linux/profile/Default/o3de`. Can be launched by invoking it from the shell, example:
```shell
/opt/O3DE/2111_1/bin/Linux/profile/Default/o3de
```
