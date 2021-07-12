---
title: Open 3D Engine on Linux
linkTitle: Linux
description: An overview of Open 3D Engine support for development on Linux.
weight: 200
---

## Prerequisite packages

In order to install O3DE on Linux, you need the following packages for your distribution.

### Ubuntu 18.04 LTS

O3DE requires a more recent version of CMake than those distributed for 18.04 LTS. In order to get
the proper version of CMake, follow the instructions on the [Kitware APT repository](https://apt.kitware.com/).

To install the dependencies distributed with Ubuntu 18.04 LTS, run the following command.

```shell
sudo apt-get update
sudo apt-get install -y \
    build-essential clang-6.0 uuid-dev libz-dev libncurses5-dev libcurl4-openssl-dev \
    mesa-common-dev libglu1-mesa-dev libjpeg-dev libjbig-dev libsdl2-dev \
    libxcb-xinerama0 libxcb-xinput0 libfontconfig1-dev \
    libopus-dev libwebp-dev 
```

{{< note >}}
O3DE will also run on Ubuntu 20.04 LTS, but requires the installation of [libffi6](http://mirrors.kernel.org/ubuntu/pool/main/libf/libffi/libffi6_3.2.1-8_amd64.deb).
{{< /note >}}

O3DE also requires that it have its own Python runtime installed. Before running any O3DE scripts or performing a CMake operation, install the O3DE Python runtime package.

```shell
cd <o3de-source-dir>
./python/get_python.sh
```

## Configuration and build

O3DE supports using the "Unix Makefiles" generator with CMake.

## Install O3DE from source

```shell
cd <o3de-source-directory>
mkdir -p build/linux-dedicated
cmake -B build/linux-dedicated -S . \
    -DLY_3RDPARTY_PATH=<absolute-path-to-packages> \
    -DLY_UNITY_BUILD=ON \
    -DCMAKE_INSTALL_PREFIX=<install-location> \
cmake --build build/linux-dedicated --config profile --target install
```

The installation is located in the path used for `<install-location>`.

## Project build

```shell
cd <project-directory>
mkdir -p build/linux-dedicated
cmake -B build/linux-dedicated -S . \
    -DLY_3RDPARTY_PATH=<absolute-path-to-packages> \
    -DLY_UNITY_BUILD=ON
cmake --build build/linux-dedicated --config profile --target <ProjectName>.ServerLauncher
```

Output from the build is located in `<project-directory>/build/linux-dedicated/bin`.
