---
linkTitle: Gem loading and the Settings Registry
title: Settings Registry Gem Loading
description: Learn how the Settings Registry is used to load and configure Gems.
weight: 900
---

The Settings Registry is linked with the CMake in order to facilitate the automatic loading of *Gem modules* based on the set of active Gems within a project.  When CMake is configured for a project, it generates a set of `cmake_dependencies.<project-name>.<target>.setreg` files which are used to list the names of Gems that are active. It contains any shared Gem modules filenames, which load the Gems shared libraries into the O3DE application associated with the CMake Target.


## Loading Gems

CMake is used to output a list of tagged `.setreg` files (`cmake_dependencies.<target>.setreg`), which contain the build dependencies of a CMake Target that loads through the O3DE module system.
This is used to automatically load Gems based on the build dependencies of a CMake Target. This section demonstrates how to generate a `.setreg` file that contains a list of Gem build dependencies.

The following is the `CMakeLists.txt` for a *hypothetical* voxel editor feature:

**CMakeLists.txt (Voxel Editor)**

```cmake
# Associate the VoxelEditor CMake target with the ".Tools" variant of Gems to load.
# This will generate a "cmake_dependencies.voxeleditor.setreg" file that contains the path to the shared
# libraries that will need to be loaded by the VoxelEditor, as well as the list paths to the Gem source directory
ly_set_gem_variant_to_load(TARGETS VoxelEditor VARIANTS Tools)

# Adds the VoxelEditor target as a C preprocessor define so that it can be used as a Settings Registry
# specialization to look up the generated .setreg, which contains the dependencies
# specified for the target.
set_source_files_properties(
    Source/VoxelEditorApplication.cpp
    PROPERTIES
        COMPILE_DEFINITIONS LY_CMAKE_TARGET="VoxelEditor"
)
```

Running the CMake command generates a solution and a `cmake_dependencies.voxeleditor.setreg`. It recurses through the list of the Gem's `RUNTIME_DEPENDENCIES` and looks for a `GEM_MODULE` target property to determine the list of required Gems.

For example, the following is how the Atom Bridge Gem is configured in CMake:

**CMakeLists.txt (AtomBridge)**

```cmake
if(PAL_TRAIT_BUILD_HOST_TOOLS)
    ly_add_target(
        NAME Atom_AtomBridge.Editor ${PAL_TRAIT_MONOLITHIC_DRIVEN_MODULE_TYPE}
        NAMESPACE Gem
        ...
        RUNTIME_DEPENDENCIES
            Gem::Atom_RHI.Private
            Gem::Atom_RHI_DX12.Private
            Gem::Atom_RHI_DX12.Builders
            Gem::Atom_Asset_Shader.Builders
            Gem::ImageProcessingAtom.Editor
            Gem::ImguiAtom
            Gem::AtomToolsFramework.Editor
    )


    # Any 'tool' and 'builder' type applications should use Gem::Atom_AtomBridge.Editor:
    ly_create_alias(NAME Atom_AtomBridge.Builders NAMESPACE Gem TARGETS Gem::Atom_AtomBridge.Editor)
    ly_create_alias(NAME Atom_AtomBridge.Tools    NAMESPACE Gem TARGETS Gem::Atom_AtomBridge.Editor)
endif()
```

Configuring CMake for the voxel editor generates the following `.setreg` file in the executable directory `Registry` directory:

**cmake_dependencies.voxeleditor.setreg (Voxel Editor)**
```json
{
    "O3DE": {
        "Gems": {
            "Atom_AtomBridge": {
                "Targets": {
                    "Atom_AtomBridge.Editor": {
                        "Modules":["Atom_AtomBridge.Editor.dll"]
                    },
                    "Atom_AtomBridge.Builders": {
                    }
                }
            },
            "AtomShader": {
                "Targets": {
                    "Atom_Asset_Shader.Builders": {
                        "Modules":["Atom_Asset_Shader.Builders.dll"]
                    }
                }
            },
            "ImageProcessingAtom": {
                "Targets": {
                    "ImageProcessingAtom.Editor": {
                        "Modules":["ImageProcessingAtom.Editor.dll"]
                    }
                }
            },
            "AtomToolsFramework": {
                "Targets": {
                    "AtomToolsFramework.Editor": {
                        "Modules":["AtomToolsFramework.Editor.dll"]
                    }
                }
            },
            "Atom_RHI_DX12": {
                "Targets": {
                    "Atom_RHI_DX12.Builders": {
                        "Modules":["Atom_RHI_DX12.Builders.dll"]
                    },
                    "Atom_RHI_DX12.Private": {
                        "Modules":["Atom_RHI_DX12.Private.dll"]
                    }
                }
            }
        }
    }
}
```

You then add a Settings Registry specialization that is used to load the `cmake_dependencies.voxeleditor.setreg` file. This is done in C++ code via the `SettingsRegistryMergeUtils::MergeSettingsToRegistry_AddBuildSystemTargetSpecialization` function as in the following example:

```c++
    //! This function returns the build system target name
    AZStd::string_view GetBuildTargetName()
    {
#if !defined (LY_CMAKE_TARGET)
#error "LY_CMAKE_TARGET must be defined in order to add this source file to a CMake executable target"
#endif
        return AZStd::string_view{ LY_CMAKE_TARGET };
    }

    VoxelEditorApplication::VoxelEditorApplication(int* argc, char*** argv)
        : Application(argc, argv)
        , QApplication(*argc, *argv)
    {
        // The Settings Registry has been created at this point, so add the CMake target "voxeleditor"
        // as a specialization into the Settings Registry
        AZ::SettingsRegistryMergeUtils::MergeSettingsToRegistry_AddBuildSystemTargetSpecialization(
            *AZ::SettingsRegistry::Get(), GetBuildTargetName());
    }
```

The `AZ::ComponentApplication` uses the Gem modules filenames stored within the Settings Registry to load the Gems from the filesystem. It also merges `<GemRootPath>/Registry/*.setreg` files for each Gem. CMake targets based on the game project can also generate a `.setreg` file by using the `ly_enable_gems` function.

The AtomTest project Gem uses the `ly_enable_gems` function to generate `cmake_dependencies.atomtest.<target>.setreg` files. That file contains the list of shared library file paths and Gem source directory to load as shown in the following example:

**CMakeLists.txt (AtomTest)**

```cmake
ly_add_target(
    NAME AtomTest ${PAL_TRAIT_MONOLITHIC_DRIVEN_MODULE_TYPE}
    NAMESPACE Gem
    FILES_CMAKE
        atomtest_files.cmake
    INCLUDE_DIRECTORIES
        PUBLIC
            Include
    BUILD_DEPENDENCIES
        PRIVATE
            AZ::AzGameFramework
            Gem::Atom_LyIntegration.Static
)

# if enabled, AtomTest Gem is used by the Client and Server Launchers as well as Tools
# But it isn't needed in Builders
ly_create_alias(NAME AtomTest.Clients NAMESPACE Gem TARGETS Gem::AtomTest)
ly_create_alias(NAME AtomTest.Servers NAMESPACE Gem TARGETS Gem::AtomTest)
ly_create_alias(NAME AtomTest.Tools   NAMESPACE Gem TARGETS Gem::AtomTest)

################################################################################
# Gem dependencies
################################################################################
# The GameLauncher uses "Clients" Gem variants:
ly_enable_gems(PROJECT_NAME AtomTest GEM_FILE enabled_gems.cmake)
```

The `ly_enable_gems` function adds build and load dependencies to the AtomTest project.

During CMake generation, the Settings Registry files are generated in the `<CMakeBuildDir>/bin/$<CONFIG>` directory based on the `ly_enable_gems` functions. For example, configuring CMake for Windows with only the AtomTest project enabled generates the following `.setreg` files:

```
<CMakeBuildDir>\bin\profile\Registry\cmake_dependencies.atomtest.editor.setreg
<CMakeBuildDir>\bin\profile\Registry\cmake_dependencies.atomtest.assetprocessor.setreg
<CMakeBuildDir>\bin\profile\Registry\cmake_dependencies.atomtest.atomtest_gamelauncher.setreg
...
```

The generated project `.setreg` files are formatted as `cmake_dependencies.<ProjectNameLower>.<CMakeTargetNameLower>.setreg`. The project name is part of the generated `cmake_dependencies.*.setreg` file name because O3DE allows configuring multiple projects at once. The same applications, such as O3DE Editor and Asset Processor, are used for each game project, but the applications need to load a different set of Gems based on the active game project, so the project name is added as part of the CMake build dependencies Settings Registry files.

For example, if CMake is configured with the value of `-DLY_PROJECTS="./AutomatedTesting;D:/o3de/AtomSampleViewer"`, the following `.setreg` files are generated:

```
D:\o3de\o3de\windows_vs2019\bin\profile\Registry\cmake_dependencies.atomsampleviewer.assetbuilder.setreg
D:\o3de\o3de\windows_vs2019\bin\profile\Registry\cmake_dependencies.atomsampleviewer.assetprocessor.setreg
D:\o3de\o3de\windows_vs2019\bin\profile\Registry\cmake_dependencies.atomsampleviewer.assetprocessorbatch.setreg
D:\o3de\o3de\windows_vs2019\bin\profile\Registry\cmake_dependencies.atomsampleviewer.atomsampleviewer_gamelauncher.setreg
D:\o3de\o3de\windows_vs2019\bin\profile\Registry\cmake_dependencies.atomsampleviewer.editor.setreg

D:\o3de\o3de\windows_vs2019\bin\profile\Registry\cmake_dependencies.automatedtesting.assetbuilder.setreg
D:\o3de\o3de\windows_vs2019\bin\profile\Registry\cmake_dependencies.automatedtesting.assetprocessor.setreg
D:\o3de\o3de\windows_vs2019\bin\profile\Registry\cmake_dependencies.automatedtesting.assetprocessorbatch.setreg
D:\o3de\o3de\windows_vs2019\bin\profile\Registry\cmake_dependencies.automatedtesting.automatedtesting_gamelauncher.setreg
D:\o3de\o3de\windows_vs2019\bin\profile\Registry\cmake_dependencies.automatedtesting.editor.setreg
```

### Gems outside of `<EngineRoot>/Gems`

The list of Gem root directory paths is populated by CMake when it generates the build files for a platform. Since CMake knows the `CMakeLists.txt` location for each Gem, it's able to generate a `.setreg` file with a list of Gems for each CMake target that sets a "Gem Variant" to load. This done by using the `ly_set_gem_variant_to_load` command. This list includes the filename of the Gem and the relative path to the Gem directory based on the source directory supplied to CMake during configuration.

The benefit of this is that if a Gem is added outside of the `<EngineRoot>` location using the [`cmake add_subdirectory`](https://cmake.org/cmake/help/v3.24/command/add_subdirectory.html) command, then the Settings Registry can load any `.setreg` files within the `<GemRoot>/Registry` directory.

This can be used to include a specific Gem outside of the O3DE `<EngineRoot>` directory, as in the following example:

```cmake
add_subdirectory(<AbsolutePathToMoleculeGem> <AbsolutePathToMoleculeGem>) # This doesn't have to be in the O3DE engine root
add_subdirectory(../<RelativePathToElectronGem> ../<RelativePathToElectronGem>)
```

### Platform-specific Gem loading

Gems can be built and loaded on a per-platform basis by calling the `ly_enable_gems` function multiple times for a given variant with Platform Abstraction Layer (PAL) paths.
CMake supports several Platform Abstraction variables that can be used to include specific enabled Gems based on the current platform (Windows, Linux, Android, and so on).

The following example demonstrates how to specify general and platform-specific Gem dependencies together:

```cmake
o3de_pal_dir(pal_dir ${CMAKE_CURRENT_LIST_DIR}/Platform/${PAL_PLATFORM_NAME} "${gem_restricted_path}" "${gem_path}" "${gem_parent_relative_path}")
# Read a platform-specific CMake file that contains the names of Gems to activate
ly_enable_gems(PROJECT_NAME AtomTest GEM_FILE ${pal_dir}/enabled_gems.cmake)
```

### Explicit Gem activation

As mentioned in [Loading gems](#loading-gems), Gem builds are determined by the list of Gems in the `enabled_gems.cmake` file. This file should not be manually modified. Instead, use the `o3de.py`, `enable-gem`, and `disable-gem` commands or **Project Manager** to add or remove Gems. This section explains how to enable and disable a Gem for building, as well as how to turn off autoloading of Gems using the Settings Registry.

The following example demonstrates using the `o3de.py` Python script commands to add and remove explicit Gem activation for a Gem named "Sponza" in the AutomatedTesting project:

```bash
# The following command adds explicit activation of the Sponza Gem within the AutomatedTesting project
# It will modify the enabled_gems.cmake file and conditionally the project.json file if the Gem being activated is registered with the global o3de_manifest.json
[engine-root]> scripts\o3de.bat enable-gem --gem-name Sponza --project-path AutomatedTesting
# The following command removes explicit activation of the Sponza Gem within the AutomatedTesting project
# It will modify the enabled_gems.cmake file and conditionally the project.json file if the Gem being activated is registered with the global o3de_manifest.json
[engine-root]> scripts\o3de.bat disable-gem --gem-name Sponza --project-path AutomatedTesting
```

### Disable Gem autoloading

During the CMake project generation step, a `cmake_dependencies.*.setreg` file that contains a list of Gems to load is generated. To prevent autoloading of a specific Gem, set a JSON boolean value of `false` at the in JSON pointer format for the Gem using the path of `"/O3DE/Gems/${GemName}/${TargetModule}/AutoLoad"`. For example, you can add a `.setreg` file in the `"<project-root>/Registry/"` directory that sets the `"/O3DE/Gems/${GemName}/${TargetModule}/AutoLoad=false"` value.

The following is a snippet of the generated `cmake_dependencies.automatedtesting.assetproccessor.setreg` that is generated when O3DE is configured with for the Automated Testing project (`-DLY_PROJECTS=AutomatedTesting`).

**cmake_dependencies.automatedtesting.assetproccessor.setreg**

```json

{
    "O3DE": {
        "Gems": {
            "ChatPlay": {
                "ChatPlay": {
                    "Modules": ["ChatPlay.dll"]
                }
            },
            "QtForPython": {
                "QtForPython.Editor": {
                    "Modules": ["QtForPython.Editor.dll"]
                }
            },
            //...
        }
    }
}
```

The ChatPlay Client and QtForPython Tools modules can be disabled from autoloading on a *per user* basis by placing a `.setreg` file either in the `<project_root>/User/Registry` (per project override) or in the `~/.o3de/Registry` global user override as in the following example:

**gem_autoload.setreg**

```json
{
    "O3DE": {
        "Gems": {
            "ChatPlay": {
                "ChatPlay": {
                    "AutoLoad": false
                }
            },
            "QtForPython": {
                "QtForPython.Editor": {
                    "AutoLoad": false
                }
            }
        }
    }
}
```

To disable Gem autoloading at the *project* level, a `.setreg` file, such as the preceding example, can be placed in `<project_root>/Registry`, the project's `Registry` directory.

To disable Gem autoloading at the *platform* level, a `.setreg` file, such as the preceding example, can be placed in the `<O3DE root>/Registry/Platform/${PAL_PLATFORM_NAME}` directory.

### Load Gems in C++

You can manually load Gems in an application through C++ if needed. `SettingsRegistryMergeUtils.cpp` contains a function, [MergeSettingsToRegistry_TargetBuildDependencyRegistry](https://github.com/o3de/o3de/blob/02846cf44347cbf4fae0faacc4a2ba74284908ff/Code/Framework/AzCore/AzCore/Settings/SettingsRegistryMergeUtils.h#L216-L220), that loads the `cmake_dependencies.<tag1>.<tag2>.setreg` files that contains the list of Gems to load. Gems are loaded based on the values in the "specialization" tag structure. The list of Gem modules is stored in the Setting Registry.

```c++
void MergeSettingsToRegistry_TargetBuildDependencyRegistry(SettingsRegistryInterface& registry, const AZStd::string_view platform,
    const SettingsRegistryInterface::Specializations& specializations, AZStd::vector<char>* scratchBuffer);
```

`ComponentApplication.cpp` is responsible for loading the required Gems through the [LoadDynamicModule](https://github.com/o3de/o3de/blob/02846cf44347cbf4fae0faacc4a2ba74284908ff/Code/Framework/AzCore/AzCore/Component/ComponentApplication.h#L297-L299) function, which reads the Settings Registry for all array keys at the paths of `/O3DE/Gems/${GemName}/Modules` and aggregates them into a list of Gems to load.

```c++
void ComponentApplication::LoadDynamicModules()
{
    // Queries the Settings Registry to get the list of Gem modules to load
    struct GemModuleLoadData
    {
        AZ::OSString m_gemName;
        AZStd::vector<AZ::OSString> m_dynamicLibraryPaths;
        bool m_autoLoad{ true };
    };
    // ...
}
```

## Add a Gems scan folder

The Settings Registry supports configuring settings for Asset Processor. The `AssetProcessorPlatformConfig.setreg` file can be used as a reference for available settings: [AssetProcessorPlatformConfig.setreg](https://github.com/o3de/o3de/blob/development/Registry/AssetProcessorPlatformConfig.setreg).

### Gem asset scan folders

To add additional Scan Folders for an active Gem, a `.setreg` file can add a "ScanFolder \<name>" under the "/Amazon/AssetProcessor/Settings" field. The "\<name>" portion can be anything as long as it doesn't collide with another scan folder entry.

The following example adds the `<Blast Gem Root>/Editor/Scripts` folder as a Scan Folder for the Asset Processor:

```json
{
    "Amazon": {
        "AssetProcessor": {
            "Settings": {
                "ScanFolder Blast/Scripts": {
                    "watch": "@GEMROOT:Blast@/Editor/Scripts",
                    "display": "Blast/Scripts",
                    "recursive": 1,
                    "order": 101
                }
            }
        }
    }
}
```
