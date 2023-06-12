---
title: CMake Settings Reference
description: The reference for Open 3D Engine-specific CMake settings.
weight: 500
---

Open 3D Engine uses custom CMake configuration values in order to detect settings like valid deployment platforms, active projects, and the locations of downloaded packages. This document is a reference for the user-available CMake settings used by O3DE. Settings specific to a Gem are covered in [Gem reference](/docs/user-guide/gems/reference). For general CMake options, see the [cmake-variables documentation](https://cmake.org/cmake/help/v3.18/manual/cmake-variables.7.html).

Keep in mind that every time you change a configuration value, you need to regenerate the project files so that the changes are picked up and apply to your next build.

{{< caution >}}
CMake options like `CMAKE_CXX_STANDARD` are set during configuration automatically by O3DE. Changing these values can break your ability to compile O3DE code, so edit them with care.
{{< /caution >}}

## Cache values

### Required settings

These options are the user-supplied settings that are required to configure O3DE builds. Make sure that these values are set before running your first configure, and only change them later if necessary.

* **`LY_3RDPARTY_PATH`** - The filesystem path to your package directory. Changing this value requires reconfiguration, and will prompt another install of packages. See [packages](./packages/) for more information.
  
  *Type*: `PATH`

### Build configuration

* **`LY_UNITY_BUILD`** - Controls the generation of [unity build](https://cmake.org/cmake/help/latest/prop_tgt/UNITY_BUILD.html) files. Unity builds speed up build times by taking multiple `.cpp` files and merging them together into a single compilation unit.

  {{< note >}}  
  Make sure that this option is turned `ON` if you experience slow build times for your projects, the O3DE engine, or O3DE tools. The impact is most dramatic for systems with lots of available RAM but fewer available cores or low disk throughput.
  {{< /note >}}  

  *Type*: `BOOL`  
  *Default*: `ON`
* **`LY_MONOLITHIC_GAME`** - Controls project library linking. When this value is set to `ON`, it provides a compiler hint to use static libraries where possible. Some libraries, such as PhysX, are only available as shared libraries and can't be statically linked. Some platforms may disable static linking entirely.

  *Type*: `BOOL`  
  *Default*: `OFF`

### Asset configuration

These options control the types of assets that are built, and where projects load assets from at runtime.

* **`LY_ASSET_DEPLOY_TYPE`** - The *default* type of assets to be built by [Asset Processor](/docs/user-guide/assets/asset-processor/). Valid platforms are:
  * `pc` - Windows PC
  * `linux` - Linux
  * `mac` - MacOS
  * `ios` - iOS and iPad OS
  * `android` - Android
  
  *Type*: `STRING`  
  *Default*: The asset type for the current host platform.

* **`LY_ASSET_DEPLOY_MODE`** - Controls how projects load assets at runtime. Allowed values are:  
  * `LOOSE` - Load assets on demand from the asset cache, after sources are processed by the Asset Processor. This setting is appropriate for development.
  * `PAK` - Only load assets from `.pak` asset bundles created by the Asset Bundler. Which directories to load asset bundles from is controlled with the `LY_OVERRIDE_PAK_FOLDER_ROOT` setting.
  * `VFS` - Load data from the virtual filesystem server (VFS).
  
  *Type*: `STRING`  
  *Default*: `LOOSE`

* **`LY_ARCHIVE_FILE_SEARCH_MODE`**  
Defines the default file search mode to locate non-Pak files within the Archive System
  *  `0` = Search file system first, before searching within mounted `.pak` files.
  *  `1` = Search mounted `.pak` files first, before searching file system.
  *  `2` = Search only mounted `.pak` files.

  *Type*: `STRING`  
  *Default*: `0` = (debug/profile configurations), `2` = (release configuration)

### Package system settings

These settings control how the package download system functions.

* **`LY_PACKAGE_DEBUG`** - Produces verbose information about the package download and installation process when `ON`. Set this cache value before filing any bug report against the O3DE package system to make sure that all the necessary information is there to resolve the issue.

  *Type*: `BOOL`  
  *Default*: `OFF`

* **`LY_PACKAGE_DOWNLOAD_CACHE_LOCATION`** - The download cache for packages pulled from a remote server. This cache is never emptied if `LY_PACKAGE_KEEP_AFTER_DOWNLOADING` is `ON`.

  *Type*: `PATH`  
  *Default*: `${LY_3RDPARTY_PATH}/downloaded_packages`

* **`LY_PACKAGE_KEEP_AFTER_DOWNLOADING`** - Whether or not to keep downloaded packages in the cache, even after installation.

  *Type*: `BOOL`  
  *Default*: `ON`

* **`LY_PACKAGE_SERVER_URLS`** - The URLs for servers to pull packages from, as a semi-colon (`;`) separated list. These can be `http`, `https`, `file`, or `s3` URLs. These values are _prepended_ to any `LY_PACKAGE_SERVER_URLS` environment variable.

  *Type*: `STRING`  
  *Default*: `(Empty string)`

* **`LY_PACKAGE_UNPACK_LOCATION`** - The location where downloaded packages are unpacked to, before being relocated to the package folder.

  *Type*: `PATH`  
  *Default*: `${LY_3RDPARTY_PATH}/packages`

* **`LY_PACKAGE_VALIDATE_PACKAGE`** - Validate packages against checksums in the requesting CMake file, redownloading the package from sources as necessary.

  *Type*: `BOOL`
  *Default*: `OFF`

* **`LY_PACKAGE_VALIDATE_CONTENTS`** - Check each file against the hashes contained in the `SHA256SUMS` of the package. When this value is `OFF`, the checksums are validated only on the first package download. Turning this setting on allows for checking for local modifications to the package, but will slow down configuration.

  *Type*: `BOOL`
  *Default*: `OFF`

* **`LY_PACKAGE_DOWNLOAD_RETRY_COUNT`** - The number of times to attempt retrieval from a package source if an error occurs in the transfer.

  *Type*: Integer
  *Default*: 3

### Build/Debugging Tools

* **`LY_BUILD_WITH_ADDRESS_SANITIZER`** - Enables [Address Sanitizer](https://en.wikipedia.org/wiki/AddressSanitizer) (ASan).

  {{< note >}}
  Currently only supported for Windows and "Visual Studio" generators. Documentation can be found [here](https://docs.microsoft.com/en-us/cpp/sanitizers/asan?view=msvc-160)
  {{< /note >}}

  *Type*: `BOOL`
  *Default*: `OFF`

* **`O3DE_BUILD_WITH_DEBUG_SYMBOLS_RELEASE`** - Generates symbol files (`.pdb`) in release configurations and turns off optimizations making it easier to troubleshoot issues in release builds.

  {{< note >}}
  Currently only supported for Windows and "Visual Studio" generators.
  {{< /note >}}

  *Type*: `BOOL`
  *Default*: `OFF`

<!-- 
  TODO: Platform-specific settings - should they go here, on the platform pages, or somewhere else entirely (like in the reference appendix?)
-->

## CMake functions reference

Intellisense support for Visual Studio and Visual Studio Code is available in the O3DE CMake files, located in the `cmake` directory of O3DE source.
