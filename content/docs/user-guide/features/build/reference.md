---
title: CMake Build Settings Reference
description: The complete reference guide to Open 3D Engine-specific CMake settings.
---

Open 3D Engine uses custom CMake configuration values in order to detect settings like valid deployment platforms, active projects, and the locations of downloaded third party packages. This document is a reference for the user-available CMake settings used by O3DE. Settings specific to a Gem are covered in [Gem reference](/docs/user-guide/features/gems/reference). For general CMake options, see the [cmake.variables documentation](https://cmake.org/cmake/help/v3.18/manual/cmake-variables.7.html).

Keep in mind that every time you change a configuration value, you need to regenerate the project files so that the changes are picked up and apply to your next build.

{{< caution >}}
CMake options like `CMAKE_CXX_STANDARD` are set during configuration by the O3DE build infrastructure. Changing these values can break your ability to compile the engine or Gems, so edit them with care. Change any values beginning with `CMAKE_` that appear in your CMake cache after the initial configuration at your own risk.
{{< /caution >}}

## Required settings

These options are the user-supplied settings required to configure O3DE builds. Make sure that these values are set before running your first configure, and only change them later if necessary.

* **`LY_3RDPARTY_PATH`** - The filesystem path to your 3rd party library directory. Changing this value requires reconfiguration, and will prompt another install of 3rd party packages.
  
  *Type*: `PATH`
* **`LY_PROJECTS`** - The O3DE projects to include as build targets and scan for dependencies, as a `;`-separated string. For example, `Project1;Project2;Project3` generates targets for `Project1Launcher`, `Project2Launcher`, and `Project3Launcher` and correctly identifies the dependencies for each. Each dependency also produces a target in the generated project.
  
  *Type*: `STRING`

## Build configuration

* **`LY_UNITY_BUILD`** - Controls the generation of [unity build](https://cmake.org/cmake/help/v3.20/prop_tgt/UNITY_BUILD.html) files, designed to speed up build times. Unity builds take multiple `.cpp` files and merge them together into a single compilation unit in order to speed up build times.

  {{< note >}}  
  Make sure that this option is turned `ON` if you experience slow build times for your projects, the O3DE engine, or O3DE tools. The impact is most dramatic for systems with lots of available RAM but fewer available cores or low disk throughput.
  {{< /note >}}  

  *Type*: `BOOL`  
  *Default*: `OFF`
* **`LY_MONOLITHIC_GAME`** - Controls project library linking. When this value is set to `ON`, it provides a compiler hint to use static libraries where possible. Some libraries, such as PhysX, are only available as shared libraries and can't be statically linked.

  *Type*: `BOOL`  
  *Default*: `OFF`

## Asset configuration

These options control the types of assets built, and where projects load assets from at runtime.

* **`LY_ASSET_DEPLOY_TYPE`** - The *default* type of assets to be built by the [asset processor](/docs/user-guide/features/assets/pipeline/intro). Valid platforms are:
  * `pc` - Windows PC
  * `osx_gl` - MacOS
  * `ios` - iOS and iPad OS
  * `es3` - Android
  
  You can change the types of assets built by the Asset Processor, or build for multiple platforms, by [configuring the asset pipeline](/docs/user-guide/features/assets/pipeline/configuring).
  
  *Type*: `STRING`  
  *Default*: The asset type for the current host platform.

* **`LY_ASSET_DEPLOY_MODE`** - Controls how projects load assets at runtime. Allowed values are:  
  * `LOOSE` - Load assets on demand from the asset cache, after sources are processed by the Asset Processor. This setting is appropriate for development.
  * `PAK` - Only load assets from `.pak` asset bundles created by the Asset Bundler. Which directories to load asset bundles from is controlled with the `LY_OVERRIDE_PAK_FOLDER_ROOT` setting.
  * `VFS` - Load data from the virtual filesystem (VFS). See the documentation on using the VFS with [iOS](/docs/user-guide/features/platforms/ios/virtual-file-system) for more details.
  
  *Type*: `STRING`  
  *Default*: `LOOSE`

* **`LY_OVERRIDE_PAK_FOLDER_ROOT`**  
Controls where asset `.pak` files are loaded from. An empty string uses the predefined `paks` root.  

  *Type*: `STRING`  
  *Default*: Predefined `paks` root under your O3DE installation

## Third party package settings

These settings control how the third party package download system functions.

* **`LY_PACKAGE_DEBUG`** - Produces verbose information about the 3rd party package download and installation process for debugging when `ON`.

  *Type*: `BOOL`  
  *Default*: `OFF`

* **`LY_PACKAGE_DOWNLOAD_CACHE_LOCATION`** - The download cache for packages pulled from a remote server. This cache is never emptied if `LY_PACKAGE_KEEP_AFTER_DOWNLOADING` is `ON`.

  *Type*: `PATH`  
  *Default*: `${LY_3RDPARTY_PATH}/downloaded_packages`

* **`LY_PACKAGE_KEEP_AFTER_DOWNLOADING`** - Whether or not to keep downloaded packages in the cache, even after installation.

  *Type*: `BOOL`  
  *Default*: `ON`

* **`LY_PACKAGE_SERVER_URLS`** - The URLs for servers to pull packages from, as a `;`-separated list. These can be `http`, `https`, `file`, or `s3` URLs. These values are added to any `LY_PACKAGE_SERVER_URLS` environment variable.

  *Type*: `STRING`  
  *Default*: `(Empty string)`

* **`LY_PACKAGE_UNPACK_LOCATION`** - The location where downloaded packages are unpacked to, before being relocated to the 3rd party folder.

  *Type*: `PATH`  
  *Default*: `${LY_3RDPARTY_PATH}/packages`

* **`LY_PACKAGE_VALIDATE_CONTENTS`** - Whether or not to perform a full validation of every file contained in a package. When this option is disabled, files are checked based on name only, rather than checksum. This option offers extra security to check if your local files have been poisoned, but can make configuration much slower.

  *Type*: `BOOL`  
  *Default*: `OFF`

* **`LY_PACKAGE_VALIDATE_CONTENTS_FROM_SERVER`** - Whether or not to request a new set of manifest information from the server with every new CMake configuration. This option offers extra security to check if your local files have been poisoned, but makes configuration slower.

  *Type*: `BOOL`  
  *Default*: `OFF`
