---
title: O3DE Packages
description: Integrate dependencies as packages into Open 3D Engine (O3DE) Gems or projects using the CMake build system.
weight: 300
---

**Open 3D Engine (O3DE)** offers a packaging system to allow for shipping pre-compiled libraries or other external sources. With the
packaging system, you can more easily add external binaries as dependencies for your Gem or project without having to maintain them in source control. If you plan to add a static dependency that can't be shipped as source code, the packaging system offers consistency checks and target generation in addition to the fetching of resources.

{{< note >}}
The CMake files that define the package system are located at `cmake/3rdParty.cmake` and `cmake/3rdPartyPackages.cmake` in the O3DE source.
{{< /note >}}

## Overview

The O3DE package system is used to deliver source and binary dependencies from external sources. These dependencies are needed by Gems, projects, and even the O3DE engine itself. The dependency system correctly detects dependencies and version requirements, making sure that you have the packages needed on your system at compile-time.

The dependency system runs through the following steps when invoked:

1. It checks for a valid package location at the `LY_3RDPARTY_PATH` value. Any directory can be used for storing packages, but it's recommended that you avoid changing your `LY_3RDPARTY_PATH` value once it's set. After a directory has contents downloaded into it by the O3DE build system, a cache file is created there to make future dependency checks easily, so changing the package location will re-download all packages.

1. The build system loads the available package sources. This is a semi-colon (`;`) separated list of package sources that are stored in the `LY_PACKAGE_SERVER_URLS` CMake cache value. If the `LY_PACKAGE_SERVER_URLS` environment variable is set, it's _prepended_ to the cached value.

1. For each package:
 
   1. The next source in `LY_PACKAGE_SERVER_URLS` is checked. If a matching package is found in the source, the package is downloaded to `LY_PACKAGE_DOWNLOAD_CACHE_LOCATION`.
    
   1. The package tarball is downloaded from the source, and checked against the checksum contained in the requesting CMake file. If there's a checksum mismatch, the tarball is deleted and the next available package source is checked for the package.
   
   1. The package is extracted into `LY_PACKAGE_UNPACK_LOCATION/<full-package-name>`. By default `LY_PACKAGE_UNPACK_LOCATION` is `LY_3RDPARTY_PATH/packages`.
   
   1. Each individual file in the package is checked against a checksum file contained in the package. If a checksum fails, the package tarball and unpacked contents are deleted and the next source is checked for the package.

You can also add Python module requirements so that `pip` is used to automatically to retrieve packages that are required by tools or other libraries.

{{< note >}}
Package downloads and target creation run only as part of CMake configuration and generation. If a new dependency is added to a Gem or project, you need to reconfigure your CMake cache and regenerate.
{{< /note >}}

See the [CMake settings reference](reference/) for the full list of available settings that affect the package system.

## Create a Package

To create a package for consumption by O3DE, you need to provide the following:

* The package contents themselves - source, binaries, assets, and any other components.
* A manifest describing the package (`PackageInfo.json`).
* A `LICENSE` file contained the software license for the package.
* Checksums for each file in the package (`SHA256SUMS`).
* A CMake file run when then package is used in another CMake file (`Find<Package>.cmake`).

Packages must be distributed as tarfiles compressed with XZ or LZMA (`.tar.xz`).

### O3DE package structure

O3DE packages are required to have the following structure:

```cmd
.
├── PackageInfo.json          # A manifest file describing the package.
├── Find<Package>.cmake       # CMake file defining targets for this package.
├── <Package content dir>     # Directory containing package contents.
└── SHA256SUMS                # SHA256 checksums for each file in package. This includes the manifest and Find CMake files.
```

### The `PackageInfo.json` file

`PackageInfo.json` is a minimalist manifest file that describes a package. Any key in the following block without
`[optional]` as part of its description doesn't need to be included.

```json
{
    "PackageName" : "The full name of the package. This is the name of the generated target and the folder package that contents are extracted to.",
    "URL"         : "URL for the package project. This doesn't need to be the same as the URL the package is stored at. [optional]",
    "License"     : "The SPDX license for the package.",
    "LicenseFile" : "Path to the LICENSE file. This path should start with the package content directory and use the `/` path separator."
}
```

See the [SPDX License List](https://spdx.org/licenses/) for allowed values of `License`.

### The `Find<Package>.cmake` file

To create a target and allow it to be referenced from the O3DE build system, packages need to include a `Find<Package>.cmake` file, where
`<Package>` must be the name of the package content directory. This CMake file is responsible for identifying the target in the package
namespace, setting any cache or build values required, and registering the target with the O3DE build system.

For a package with the structure:

```cmd
example-0.1
├── PackageInfo.json
├── FindExample.cmake
└── example
    ├── LICENSE.txt
    ├── lib
    │   └── hello.dll
    └── include
        └── hello.h
```

A minimal `FindExample.cmake` file should look something like the following. Values related specifically to the example
structure are contained in angle brackets `<...>`.

```cmake
set(MY_NAME "<example>")
set(TARGET_WITH_NAMESPACE "3rdParty::${MY_NAME}")
if (TARGET ${TARGET_WITH_NAMESPACE})
    return()
endif()

add_library(${TARGET_WITH_NAMESPACE} INTERFACE IMPORTED GLOBAL)

# --- Package-specific starts ---
set(${MY_NAME}_LIB_DIR ${CMAKE_CURRENT_LIST_DIR}/${MY_NAME}/<lib>)
set(${MY_NAME}_INCLUDE_DIR ${CMAKE_CURRENT_LIST_DIR}/${MY_NAME}/<include>)

ly_add_target_files(TARGETS ${TARGET_WITH_NAMESPACE} FILES ${${MY_NAME}_LIB_DIR})
ly_target_include_system_directories(TARGET ${TARGET_WITH_NAMESPACE} INTERFACE ${${MY_NAME}_INCLUDE_DIR}
# --- Package-specific ends ---

set(${MY_NAME}_FOUND True)
```

In general, you need to:

* Short-circuit if the `Find` file was invoked while building the target that it defines.
* Add a library as `IMPORTED INTERFACE GLOBAL`. This library must be in the `3rdParty::` namespace,
  to avoid naming conflicts and assist in dependency detection.
* Perform any package-specific configuration. Use `ly_add_target_files` to add libraries or binaries to the package target,
  and `ly_target_include_system_directories` to add include directories.
* Set the value of `<package name>_FOUND` to be `True`.

{{< note >}}
CMake functions used in this example:

* `ly_add_target_files`: Adds files to an existing target. See the definition in `cmake/LYWrappers.cmake`.
* `ly_target_include_system_directories`: This is a thin wrapper around [target_include_directories](https://cmake.org/cmake/help/latest/command/target_include_directories.html), providing support for this feature on platforms that don't include it.

For the full details of functions declared in O3DE CMake files, see [CMake reference - functions](/docs/user-guide/build/reference/#cmake-functions-reference).
{{< /note >}}

### Checksums file

This file is a plain text file containing one SHA256 checksum per line, for each file contained in the package. This list **must**
include checksums for the Find cmake file and the `PackageInfo.json`.

This file uses the output format produced by the Linux `sha256sum` tool, with one checksum and file per line:

```
<hash> *<full path to file>
```

As an example excerpt from the `cityhash` package:

```
f6adb0dfdbfd4b404d19e61fa86c4eda3e46aa06cfc98eefa0403fa397dd1db5 *PackageInfo.json
af173c7e6c28551679f6676cd923731b514f02c8a29980cb54987be8479a251e *cityhash/src/citycrc.h
```

## Add a Package as a Dependency

When a package is uploaded to a source that's available from `LY_PACKAGE_SERVER_URLS`, you need to register the package with the build system in the Gem or Project build file. Package registration is done with the `ly_associate_package` function.

For a Gem that would use the `example-0.1` package using `ly_associate_package`, this would look like the following:

```cmake
ly_associate_package(PACKAGE_NAME <example-0.1> TARGETS <example> PACKAGE_HASH <a0e852b21668bae2f5259a5e4a866db0488b0ef28e4559d4cc7b427f6c61a0b0>)
```

These are the minimal required arguments:

* **PACKAGE_NAME**: The name of the package. This must match the name of the `.tar.xz` file uploaded to the package repository.
* **TARGETS**: The name of the target associated with the package.
* **PACKAGE_HASH**: The SHA256 checksum of the `.tar.xz` file.

{{< note >}}
CMake functions used in this example:

* `ly_associate_package`: Links a package name to a CMake target. See the definition in `cmake/3rdPartyPackages.cmake`.
{{< /note >}}

## Pip Integration

For Gems, projects, or packages that rely on Python modules or tools from [PyPi](https://pypi.org/) or another `pip` repository, the O3DE build system offers the functions `update_pip_requirements` and `ly_pip_install_local_package_editable`.

* `update_pip_requirements`: Processes a `requirements.txt` file, and associates the requirements with a name in the O3DE build system.
* `ly_pip_install_local_package_editable`: Creates a symbolic link from a Python module in a non-standard location to a path inside of the user's "local" `pip` Site-Packages directory, allowing the system Python to behave as if the module is installed.  If the linked Python module has any requirements, you **must** call `update_pip_requirements` before this function to ensure that Python dependencies are correctly tracked.

{{< important >}}
You can't declare another source for `pip` to download your Python modules from for those listed in `requirements.txt`. If your Python dependencies are hosted on a service other than PyPi, manually configure the O3DE Python install's `pip` to use the appropriate CDN.
{{< /important >}}

For example, say that your Gem contains a Python module called `example-py`, with a setup file at `example-py/setup.py`.  To give O3DE access to this module, the CMake file for this Gem would require the following snippet:

```cmake
update_pip_requirements(${CMAKE_CURRENT_LIST_DIR}/requirements.txt <ExamplePyGem>)
ly_pip_install_local_package_editable(${CMAKE_CURRENT_LIST_DIR}/<example-py> <ExamplePyGem>)
```

The `<ExamplePyGem>` can be any unique identifier for the Python module, but is conventionally the name of the Gem followed by `Gem`.

Changing the `requirements.txt` file or the identifier used for the module will re-run the registration.

{{< note >}}
CMake functions used in this example:

* `update_pip_requirements`: See the definition in `cmake/LYPython.cmake`.
* `ly_pip_install_local_package_editable`: See the definition in `cmake/LYPython.cmake`.

{{< /note >}}

## License file generation
License attribution files (often called the NOTICES file) can be generated during the project development process to properly attribute any code or downloadable packages that were imported. To scan project and package directories for licenses, you can run a script located in the engine's `scripts\license_scanner` subdirectory. This script will look for the `PackageInfo.json` file in order to create a summary file of all package licenses with SPDX tags for easy reference. 

Refer to the instructions in [Engine and Project Distribution](./distributable-engine#license-file-generation) for more details.
