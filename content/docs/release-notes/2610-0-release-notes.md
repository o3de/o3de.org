---
linktitle: 26.10.0 Release Notes
title: Release Notes for Open 3D Engine 26.10.0
description: Full release notes for Open 3D Engine (O3DE) version 26.10.0.
weight: xxx 
toc: xxx 
---
# 26.10.0 Release Notes

The O3DE 26.10 release moves the Editor onto Qt 6, adds experimental support for Apple Silicon, and brings a season of work on robotics simulation to the ROS 2 and SimulationInterfaces gems. It also carries more than two hundred fixes and smaller improvements across the engine.

Visit the [Get Started](https://docs.o3de.org/docs/welcome-guide/setup/) page to start using O3DE 26.10.

Here are the notable [highlights](#highlights) for this release, grouped by area. For a comprehensive breakdown, jump to the [full list of changes](#full-list-of-changes), which is organized by Special Interest Group (SIG) and includes links to the relevant Pull Requests (PRs). A short list of [known issues](#known-issues) follows the highlights.

# Highlights

### Editor

- **The Editor runs on Qt 6**. The Editor and all of its tools now build against a standard Qt 6.10.2, replacing the no-longer-maintained Qt 5 build O3DE originally used. The upgrade brought several additional improvements: the Entity Inspector was reworked; keyboard shortcuts are now consistent across the Inspector, Outliner, Asset Editor and LyShine; the Asset Editor gained undo; and a long list of crashes, docking, and styling regressions found during testing were fixed.

- **Creating components and projects**. The Class Wizard can target any project or Gem and any build target, and it generates basic, level, system and LyShine components as well as data assets. Project templates can inherit from one another, and a new GameplayGem template scaffolds component controllers with their buses, reflection and unit tests. Levels can be loaded from and saved to Gem asset directories, not only the project.

### Platforms

- **Experimental support for Apple Silicon**. O3DE now builds natively for Mac ARM64, and macOS builds no longer require Apple's Clang. Treat this as experimental for 26.10.

- **Wayland for the Linux game launcher**. The game launcher has initial Wayland support and can switch between X11 and Wayland at build or run time. The Editor still runs through X11 or XWayland; see the known issues.

- **Groundwork for WebAssembly**. Configuration files for the Emscripten compiler lay the groundwork for a future WebAssembly target. Configuring still stops at the third-party packages, which are being added separately.

### Robotics

- **Full ROS 2 Lyrical Luth support**. All ROS 2-based Gems now fully support ROS 2 Lyrical Luth. SimulationInterfaces supports the simulation_interfaces 2.1.0 package that ships with Lyrical, alongside versions 1.4 through 1.6. It adds the SpawnEntities service for spawning several entities in one call, notifies when entities are spawned, rejects invalid poses instead of producing undefined results, and removes simulated entities before a level unloads. The ROS 2 camera can now publish compressed images.

- **Robot Importer updates**. libsdformat moves to 16.0.1. The Robot Importer code has been refactored to make it easier to read, and files and functions named for URDF have been renamed because the Gem also parses SDF. The importer works the same way as before.

### Physics

- **PhysX 4 has been removed**. The deprecation announced in 26.05 is complete. Projects that still reference the Gem by its old name resolve to PhysX 5 through a gem alias, and the remaining PhysX 4 code, references and upgrade script are gone. PhysX also gains an enhanced-determinism option, off by default and enabled per scene.

- **Navigation and articulation**. DetourCrowd joins the Recast Navigation integration and gives agents collision avoidance and smooth steering. ArticulationLink now computes its inertia tensor from mass and shape, which fixes a long-standing mismatch in joint-chain behaviour between O3DE and Isaac Sim.

### Rendering

- **Ground Truth Ambient Occlusion**. GTAO is available as an alternative to SSAO, following the [SIG-Graphics-Audio RFC](https://github.com/o3de/sig-graphics-audio/blob/main/rfcs/GTAOIntegration/Proposed%20RFC%20Feature%20GTAO%20%28Ground-Truth%20based%20Ambient%20Occlusion%29.md).

- **Materials and decals**. Unlit materials gain cutout and blended opacity, double-sided rendering, optional shadows and a billboard mode. Decals render correctly on metallic surfaces and can set a maximum draw distance.

- **One shader compiler for every platform**. The AZSL shader compiler now lives in the engine source tree and builds as a host tool, so every platform compiles the same compiler.

### Core

- **A smaller, more standard core**. AZStd::move, array, span and pair now alias their standard library counterparts, and C++20 concepts replace the old SFINAE machinery across AZStd. The Sandbox plugin system inherited from CryEngine is gone in favour of Gems, and the first pass of legacy Cry cleanup has landed. The engine builds under C++23 and C++26, and third-party dependencies fetched with FetchContent now share a download cache across build configurations.

# Known issues

- **Linux only: the Editor crashes at startup if forced onto native Wayland** with `QT_QPA_PLATFORM=wayland` ([o3de#19835](https://github.com/o3de/o3de/issues/19835)). It is not specific to one GPU vendor; it has been seen on NVIDIA and AMD. The 26.10 Editor builds support X11 and XWayland only; on a Wayland desktop the Editor uses XWayland automatically, so leave `QT_QPA_PLATFORM` unset or set it to `xcb`. Windows and macOS are not affected.

  If you build the engine yourself, you can enable native Wayland by configuring with `-DPAL_TRAIT_LINUX_WINDOW_MANAGER_WAYLAND=ON`, leaving the XCB option at its default, after cherry-picking [o3de#20204](https://github.com/o3de/o3de/pull/20204), a one-line fix on `development` that lets the option compile on 26.10. The build needs the Wayland headers, the Wayland protocol files and xkbcommon (on Fedora, `wayland-devel`, `wayland-protocols-devel` and `libxkbcommon-devel`); the bundled Qt already includes its Wayland plugin. Treat the result as experimental: the Editor runs as a Wayland client, but the Material Editor and other Atom tools crash, the window cannot be moved by its title bar ([o3de#19820](https://github.com/o3de/o3de/issues/19820)), and the viewport can be drawn at the wrong size after a resize. Native Wayland support is tracked in [o3de#18513](https://github.com/o3de/o3de/issues/18513).

- **DX12 can crash on shutdown** from a descriptor heap being released twice. Fixed in `development` ([o3de#20141](https://github.com/o3de/o3de/pull/20141)).
- **Terrain can flicker on Vulkan** from bindless texture indexing; DX12 is not affected. A fix is in review for `development` ([o3de#20161](https://github.com/o3de/o3de/pull/20161)).

# Thank you

Thank you to everyone who contributed code, reviews, issues, testing and discussion to 26.10.0. None of this happens without you.

# Full list of changes

### SIG-Build
- A workflow builds and tests the simulation Gems on every pull request that touches them, against the engine at the matching branch. [o3de-extras#1089](https://github.com/o3de/o3de-extras/pull/1089)
- repo.json points every Gem released since 2409.0 at its engine release tag instead of the 2.0 placeholder, so o3de download validates them, and the Gems changed for 2610 get new versions (ROS2 4.4.0, ROS2RobotImporter 2.0.0, AzQtComponentsForPython 2.0.0 and others). [o3de-extras#1104](https://github.com/o3de/o3de-extras/pull/1104)
- Configuration files for the Emscripten compiler lay the groundwork for a WebAssembly target; configuring still stops at the third-party packages that are being added separately. [o3de#19109](https://github.com/o3de/o3de/pull/19109)
- The engine compiles with a C++23 toolchain, mainly by completing types that were forward-declared inside unique_ptr. [o3de#19425](https://github.com/o3de/o3de/pull/19425)
- Initial Wayland support for the game launcher on Linux, switchable between X11 and Wayland at build or run time. Editor support waited for Qt6. [o3de#19477](https://github.com/o3de/o3de/pull/19477)
- Automated review gains a macOS build workflow and an iOS build workflow, the latter disabled until MiniAudio builds there. [o3de#19552](https://github.com/o3de/o3de/pull/19552)
- The Android automated review builds on Linux runners with Clang instead of Windows, with its profile, asset and Gradle jobs running in sequence like the other platforms. [o3de#19573](https://github.com/o3de/o3de/pull/19573)
- The Gradle job summary no longer crowds the automated review summary page; it appears only when the step fails. [o3de#19597](https://github.com/o3de/o3de/pull/19597)
- The bundled CMake is 4.2.3, carried over from the 26.05 stabilization branch. [o3de#19599](https://github.com/o3de/o3de/pull/19599)
- The chardet package is dropped; requests uses charset-normalizer instead. [o3de#19606](https://github.com/o3de/o3de/pull/19606)
- O3DE builds on macOS with a standard LLVM Clang, not only AppleClang; the SDK sysroot is detected through xcrun for non-Apple compilers. [o3de#19607](https://github.com/o3de/o3de/pull/19607)
- RecastNavigation's third-party integration follows the same FetchContent pattern as every other dependency. [o3de#19610](https://github.com/o3de/o3de/pull/19610)
- GoogleTest always builds as a static library; another package was switching shared libraries on globally, which broke the second configure. [o3de#19618](https://github.com/o3de/o3de/pull/19618)
- A Linux-only failing test runs serially so that several Asset Processors are not launched at once; it now takes 5 seconds rather than 90. [o3de#19620](https://github.com/o3de/o3de/pull/19620)
- FetchContent third-party dependencies download archives into a cache shared across build configurations instead of cloning each one per configuration, and patch with patch-ng. [o3de#19622](https://github.com/o3de/o3de/pull/19622)
- Assimp compiles with MSVC again; its always-true expression warning is disabled for that target. [o3de#19626](https://github.com/o3de/o3de/pull/19626)
- The GEM_SHARED linking option works again in ly_add_target, and a wrong number of linking options produces a clearer error. [o3de#19649](https://github.com/o3de/o3de/pull/19649)
- RecastNavigation's include directories use the upstream capitalisation, so the engine builds on case-sensitive file systems. [o3de#19666](https://github.com/o3de/o3de/pull/19666)
- Linux automated review builds with Clang 18 and GCC 13, and a nightly canary workflow tests upcoming compilers and runner images across every platform before they break the main review. [o3de#19716](https://github.com/o3de/o3de/pull/19716)
- Two warnings that Clang 21 promotes to errors, deprecated volatile and character conversion, no longer fail the build, so the engine compiles with the Clang shipped by current Linux distributions. [o3de#19748](https://github.com/o3de/o3de/pull/19748)
- The Open Export Settings window no longer depends on the deprecated and often missing tkinter.tix package. [o3de#19794](https://github.com/o3de/o3de/pull/19794)
- The Linux .deb and Snap packages declare the Tk runtime and other system packages that the Project Manager's per-project tools need, so those tools work on a clean install. [o3de#19796](https://github.com/o3de/o3de/pull/19796)
- A duplicated no-fast-math flag that leaked a stray PRIVATE token into GCC's command line is removed. [o3de#19812](https://github.com/o3de/o3de/pull/19812)
- PySide6 moves to 6.10.2. [o3de#19847](https://github.com/o3de/o3de/pull/19847)
- Editing an AutoComponent XML or Jinja file triggers only the autogen step at build time, not a full CMake regenerate. [o3de#19849](https://github.com/o3de/o3de/pull/19849)
- The Android NDK moves from r25 to r27d, bringing Clang 18 and a newer libc++ that the AZStd modernisation needs. [o3de#19857](https://github.com/o3de/o3de/pull/19857)
- An engine named in a project's user settings is used as given, instead of being re-validated by engine discovery and failing in surprising ways. [o3de#19903](https://github.com/o3de/o3de/pull/19903)
- expat moves to 2.7.3, restoring the missing Mac package. [o3de#19914](https://github.com/o3de/o3de/pull/19914)
- The engine builds under C++23 and C++26 as well as the default standard. [o3de#19924](https://github.com/o3de/o3de/pull/19924)
- The Asset Processor no longer scans a custom build directory whose name does not match its built-in pattern, which made it slow and noisy under CLion. [o3de#19940](https://github.com/o3de/o3de/pull/19940)
- GitPython and urllib3 in the Python requirements move to versions without known vulnerabilities. [o3de#19948](https://github.com/o3de/o3de/pull/19948)
- o3de.sh forwards its arguments with their quoting intact, so paths containing spaces or a tilde reach o3de.py correctly. [o3de#19950](https://github.com/o3de/o3de/pull/19950)
- The nightly schedule is removed from the canary workflow so the workflow can run in forks; nightly runs are triggered separately. [o3de#19953](https://github.com/o3de/o3de/pull/19953)
- Mac and iOS automated review no longer fail on too many environment variables. [o3de#19959](https://github.com/o3de/o3de/pull/19959)
- DirectXShaderCompiler moves to 1.8.2505.1. [o3de#19967](https://github.com/o3de/o3de/pull/19967)
- Editor.app and AssetProcessor.app launched outside Xcode no longer hit duplicate Qt library conflicts. [o3de#19970](https://github.com/o3de/o3de/pull/19970)
- FreeType moves to 2.11.1. [o3de#19997](https://github.com/o3de/o3de/pull/19997)
- macOS runners free disk space by removing unused Xcode installations and trimming the compiler cache, so Mac and iOS builds stop running out of space while restoring caches. [o3de#20004](https://github.com/o3de/o3de/pull/20004)
- The installed SDK no longer tries to copy a missing egg-link file, links assimp statically, and includes the motion blur asset. [o3de#20009](https://github.com/o3de/o3de/pull/20009)
- The shader builder launches the engine-built azslc from the binary directory instead of a duplicate copy that could not find its shared libraries. [o3de#20069](https://github.com/o3de/o3de/pull/20069)
- Monolithic builds link again; meshoptimizer was missing from them. [o3de#20070](https://github.com/o3de/o3de/pull/20070)
- Mac automated review fails at the real error when Xcode's post-build step fails, instead of a misleading "AssetProcessorBatch not found" later on. [o3de#20071](https://github.com/o3de/o3de/pull/20071)
- Keyboard shortcuts in the Action Manager are handled as shortcut events rather than key events, which could swallow a shortcut, and CI artifact caches are hardened. [o3de#20093](https://github.com/o3de/o3de/pull/20093)
- The macOS workflow no longer uploads its asset cache after a failed build, which had carried a broken cache into every following run. [o3de#20131](https://github.com/o3de/o3de/pull/20131)
- Third-party packages and LFS objects are fetched from o3debinaries.org endpoints in place of the previous CloudFront URLs. [o3de#20135](https://github.com/o3de/o3de/pull/20135)
- The Editor and launchers carry a new splash screen and product logo for the 26.10.0 release. [o3de#20211](https://github.com/o3de/o3de/pull/20211)

### SIG-Content
- The MachineLearning Gem builds again: its Script Canvas nodes are registered the way engines since 24.09 expect, which fixes #1063. [o3de-extras#1101](https://github.com/o3de/o3de-extras/pull/1101)
- Assimp is built alongside the engine through FetchContent instead of arriving as a prebuilt package, and moves from 5.4.3 to 6.0.2. [o3de#19365](https://github.com/o3de/o3de/pull/19365)
- Scene import checks Assimp's incomplete-scene flag correctly; the test had been reverted to an always-true expression. [o3de#19429](https://github.com/o3de/o3de/pull/19429)
- Drag and drop in the EMotionFX parameter window inserts at the right index under Qt6, without private APIs. [o3de#19523](https://github.com/o3de/o3de/pull/19523)
- The Editor and its tools now build on a standard Qt 6.10.2, replacing the custom Qt 5.15.2 build that O3DE had carried for years. Qt 5 is no longer maintained upstream, so this keeps the Editor on a toolkit that still receives security fixes. [o3de#19567](https://github.com/o3de/o3de/pull/19567)
- Native Mac ARM64 builds: multi-architecture detection, arm64-specific CMake files, and the Qt and moc fixes the platform needed. [o3de#19571](https://github.com/o3de/o3de/pull/19571)
- Cancelling the Lua Editor's settings dialog no longer applies stray values; settings change only when you made changes and confirmed them. [o3de#19590](https://github.com/o3de/o3de/pull/19590)
- Fixed ignored-attribute warnings from EBus instantiation macros in the component mode code. [o3de#19593](https://github.com/o3de/o3de/pull/19593)
- Objects far from the origin can be picked for translate, rotate and scale again. [o3de#19605](https://github.com/o3de/o3de/pull/19605)
- Assimp no longer configures ccache on its own; the engine's compiler launcher handles it, which avoids breakage when ccache lives in a path with spaces. [o3de#19617](https://github.com/o3de/o3de/pull/19617)
- Assimp is patched for a missing include in its tinyusdz code that broke some Linux builds. [o3de#19625](https://github.com/o3de/o3de/pull/19625)
- Opening the Material Editor no longer shows a spurious dialog. [o3de#19627](https://github.com/o3de/o3de/pull/19627)
- Asset types registered with a group appear in nested New menus, with slashes in the group name creating deeper levels. [o3de#19678](https://github.com/o3de/o3de/pull/19678)
- Editor tool windows on Windows Alt-Tab as individual windows instead of all together. [o3de#19681](https://github.com/o3de/o3de/pull/19681)
- Asset Browser fixes: the project folder is the top folder, thumbnail search no longer stops at the first result, favourites persist, the default destination is sensible, and folders support Open in Seconds. [o3de#19684](https://github.com/o3de/o3de/pull/19684)
- Focusing the Asset Browser clears the Outliner's selection, so re-selecting an entity in the Outliner no longer starts a rename. [o3de#19685](https://github.com/o3de/o3de/pull/19685)
- Entity Inspector fields behave consistently: Escape and undo restore the previous value, the mouse wheel is no longer swallowed while scrubbing, mouse editing requires selecting the field first, and Tab skips non-interactive elements. [o3de#19686](https://github.com/o3de/o3de/pull/19686)
- Cut, copy, paste, duplicate and save shortcuts behave the same across the Inspector, Outliner, LyShine Inspector, LyShine editor and Asset Editor. [o3de#19688](https://github.com/o3de/o3de/pull/19688)
- Asset Editor fixes: Open Recent lists each file once and the asset picker accepts wrapped types. [o3de#19689](https://github.com/o3de/o3de/pull/19689)
- The LyShine editor gains the component menu from the main Editor, filtered for UI and canvas components, grouped by category, with Script Canvas available for UI canvases. [o3de#19695](https://github.com/o3de/o3de/pull/19695)
- Assimp moves to 6.0.4. [o3de#19710](https://github.com/o3de/o3de/pull/19710)
- A new colour gradient primitive with its own field editor. Undo of marker position changes is still incomplete. [o3de#19713](https://github.com/o3de/o3de/pull/19713)
- The TIFF loaders use C99 integer types instead of libtiff's deprecated typedefs, which modern Linux distributions reject. [o3de#19734](https://github.com/o3de/o3de/pull/19734)
- Levels can be loaded from and saved to Gem asset directories, not only the project; the Welcome screen, Open Recent, Open Level, Save As and New Level all understand Gem-based levels. [o3de#19735](https://github.com/o3de/o3de/pull/19735)
- Fixed a buffer overflow when the Editor generated a thumbnail for a 3D texture; the depth dimension was not accounted for. [o3de#19741](https://github.com/o3de/o3de/pull/19741)
- Asset Builder processes shut themselves down when the Asset Processor dies, instead of lingering at 300 MB each across restarts. [o3de#19747](https://github.com/o3de/o3de/pull/19747)
- Wrapped tool windows on Linux and Mac show the guest's initial title. [o3de#19750](https://github.com/o3de/o3de/pull/19750)
- Typo fixes: "an empty" rather than "a empty" in several messages. [o3de#19767](https://github.com/o3de/o3de/pull/19767)
- Creating an entity from a tool or Python with no level loaded fails cleanly instead of crashing the Editor. [o3de#19797](https://github.com/o3de/o3de/pull/19797)
- Fixed an intermittent Editor crash when assigning a Lua script that exposes properties to a Lua Script component. [o3de#19800](https://github.com/o3de/o3de/pull/19800)
- Particle Editor fixes: no crash when toggling View menu actions after closing every tab, and emitters re-dock correctly. [o3de#19811](https://github.com/o3de/o3de/pull/19811)
- The Editor transform component notifies when a child is added or removed, as the runtime component already did. [o3de#19816](https://github.com/o3de/o3de/pull/19816)
- Generated Python stubs include argument names for EBus events, not only their types. [o3de#19817](https://github.com/o3de/o3de/pull/19817)
- Fixed a crash in Track View on a click without mouse movement. [o3de#19819](https://github.com/o3de/o3de/pull/19819)
- Tests for entity activation behaviour, written alongside the multiplayer initialisation fixes. [o3de#19827](https://github.com/o3de/o3de/pull/19827)
- The Asset Editor supports undo. [o3de#19833](https://github.com/o3de/o3de/pull/19833)
- The Asset Processor no longer freezes or crashes when a job fails or is cancelled while its builder is already defunct, and logs more about builder state. [o3de#19839](https://github.com/o3de/o3de/pull/19839)
- Graph Canvas search returns only real matches; it had treated every valid regular expression match object as a hit. [o3de#19844](https://github.com/o3de/o3de/pull/19844)
- WhiteBox's Draw Shape tool shows live dimension readouts while dragging, adds sphere and staircase shapes, and supports boolean operations. [o3de#19848](https://github.com/o3de/o3de/pull/19848)
- Cancelling Script Canvas's Save As dialog closes it instead of reopening it in a loop. [o3de#19850](https://github.com/o3de/o3de/pull/19850)
- Title bars highlight correctly on hover under Qt6. [o3de#19864](https://github.com/o3de/o3de/pull/19864)
- Scroll bars are styled correctly under Qt6. [o3de#19868](https://github.com/o3de/o3de/pull/19868)
- The Document Property Editor hides properties marked hidden; it had compared the visibility attribute against the wrong type. [o3de#19869](https://github.com/o3de/o3de/pull/19869)
- Qt6 fixes for the New Level dialog's icon tinting, the Welcome screen's recent level names, and the Entity Inspector. [o3de#19875](https://github.com/o3de/o3de/pull/19875)
- Mouse wheel scrolling works in the components tree; a Qt5 workaround that forwarded scroll events was now consuming them. [o3de#19876](https://github.com/o3de/o3de/pull/19876)
- Drop-down indicators on tool buttons are aligned correctly under Qt6. [o3de#19877](https://github.com/o3de/o3de/pull/19877)
- Combo box drawing in the open state moves fully into a delegate, with dead code removed. [o3de#19878](https://github.com/o3de/o3de/pull/19878)
- Several undo and redo problems in the Inspector are fixed, including crashes and a state where edits silently stopped saving. [o3de#19880](https://github.com/o3de/o3de/pull/19880)
- The Inspector has a Collapse All button. [o3de#19883](https://github.com/o3de/o3de/pull/19883)
- Menu item spacing, icon alignment and hover behaviour are restored under Qt6 for every kind of menu. [o3de#19889](https://github.com/o3de/o3de/pull/19889)
- Tab widgets render correctly under Qt6. [o3de#19892](https://github.com/o3de/o3de/pull/19892)
- LuaIDE no longer crashes on exit from a double free of its style object. [o3de#19900](https://github.com/o3de/o3de/pull/19900)
- The Asset Processor's PAK rule uses a plain file pattern; the previous negative-lookahead expression cost over a thousand regex steps per path and slowed startup. [o3de#19904](https://github.com/o3de/o3de/pull/19904)
- The ImGui toggle moves from Home to the tilde key, which no longer conflicts with text input. [o3de#19908](https://github.com/o3de/o3de/pull/19908)
- The File menu opens faster; the Recent Files submenu is populated only when it is about to show. [o3de#19912](https://github.com/o3de/o3de/pull/19912)
- Undo is no longer left open between frames in the Inspector, which could crash the Editor or leave it unable to save edits, and an unused Cry "super undo" API is removed. [o3de#19925](https://github.com/o3de/o3de/pull/19925)
- The Inspector queues model resets instead of rebuilding on every change, improving performance with large components. [o3de#19932](https://github.com/o3de/o3de/pull/19932)
- Non-unity builds compile again after missing includes and forward declarations were added. [o3de#19933](https://github.com/o3de/o3de/pull/19933)
- SmoothCriticallyDamped and a new SmoothStep are available to Lua and Script Canvas for numbers, Vector2, Vector3 and Quaternion. [o3de#19934](https://github.com/o3de/o3de/pull/19934)
- Fixed a crash when entering prefab focus mode from the Outliner, and the flicker and inconsistent Outliner state that came with it. [o3de#19947](https://github.com/o3de/o3de/pull/19947)
- The Sandbox IPlugin system inherited from CryEngine, with its four Editor plugin DLLs, is removed; Gems are the way to extend the Editor. [o3de#19951](https://github.com/o3de/o3de/pull/19951)
- Templates can inherit from other registered templates. The shared engine-finder CMake lives in its own template that project templates inherit. [o3de#19954](https://github.com/o3de/o3de/pull/19954)
- Fixed a debug assert in LyShine when an asset picker's autocompleter was destroyed before its signal was disconnected. [o3de#19981](https://github.com/o3de/o3de/pull/19981)
- Remaining #ifndef include guards are replaced with #pragma once. [o3de#19984](https://github.com/o3de/o3de/pull/19984)
- FetchContent packages are patched with patch-ng rather than git, which works the same whether the source came from an archive or a clone. [o3de#19998](https://github.com/o3de/o3de/pull/19998)
- UI canvases block only navigation input events over interactables unless the canvas consumes all input, so Escape works while the pointer hovers a button. [o3de#20013](https://github.com/o3de/o3de/pull/20013)
- Gamepads connected while the Windows Editor is outside Game Mode are detected. [o3de#20021](https://github.com/o3de/o3de/pull/20021)
- The LyShine Preview Action Log has a dark background so its text stays readable. [o3de#20022](https://github.com/o3de/o3de/pull/20022)
- Class Wizard fixes: the new template directories are deployed with the install, PySide and shiboken bootstrap works on every platform, and console logging is cleaner. [o3de#20075](https://github.com/o3de/o3de/pull/20075)
- Instantiating a prefab whose file cannot be loaded returns a failure instead of crashing the Editor. [o3de#20099](https://github.com/o3de/o3de/pull/20099)
- The Class Wizard finds PySide6 under a custom third-party package path and reports clearly when it cannot. [o3de#20117](https://github.com/o3de/o3de/pull/20117)
- Unfiltered asset database product queries no longer read an uninitialised job status. [o3de#20126](https://github.com/o3de/o3de/pull/20126)
- The Class Wizard's Add Editor Component output compiles; a misplaced declaration is removed. [o3de#20138](https://github.com/o3de/o3de/pull/20138)

### SIG-Core
- Fixed a wrong AZ::IO::Path construction in the Robot Importer's asset lookup that could produce a bad lookup key. [o3de-extras#1087](https://github.com/o3de/o3de-extras/pull/1087)
- The Component Creation Class Wizard can now target a project or any Gem, choose the build target, infer the namespace, and generate basic, level, system and LyShine components as well as data assets. [o3de#19361](https://github.com/o3de/o3de/pull/19361)
- First pass of removing duplicate and unused CryEngine code, including the Linux and Mac Win32 wrapper types and the legacy memory-status helpers. [o3de#19510](https://github.com/o3de/o3de/pull/19510)
- AZStd::array and AZStd::span are now std::array and std::span. [o3de#19581](https://github.com/o3de/o3de/pull/19581)
- AZStd::move is now std::move, which lets the compiler's own diagnostics see moves and surfaced several real bugs that are fixed alongside. [o3de#19585](https://github.com/o3de/o3de/pull/19585)
- AZStd::pair is now std::pair, so standard algorithms, C++20 ranges and third-party libraries that expect the real type work without conversion. [o3de#19602](https://github.com/o3de/o3de/pull/19602)
- AZStd allocators are reworked to C++20 conventions. The implicit allocator(const char*) constructor is gone; it silently turned a string literal into an allocator and produced empty containers. [o3de#19614](https://github.com/o3de/o3de/pull/19614)
- The project export script's error for engine asset bundling now says "engine" rather than "game". [o3de#19631](https://github.com/o3de/o3de/pull/19631)
- AZ::Curve is now a core math type with its own property editor, moved out of the OpenParticleSystem Gem. [o3de#19671](https://github.com/o3de/o3de/pull/19671)
- ScriptContext no longer includes an internal Lua header; the alignment macro it needed is part of Lua's public API. [o3de#19733](https://github.com/o3de/o3de/pull/19733)
- ProcessWatcher documents that tethering a child process's lifetime binds it to the launching thread, not the parent process, so launching from a short-lived thread kills the child immediately. [o3de#19746](https://github.com/o3de/o3de/pull/19746)
- The o3de Python package honours the O3DE_ENGINE_PATH environment variable when resolving the engine root, so packaged installs where the package lives in a virtual environment find the right engine. [o3de#19751](https://github.com/o3de/o3de/pull/19751)
- Configuring a project against a read-only, system-installed engine no longer fails: the engine's Python packages install from a source distribution instead of in editable mode. [o3de#19752](https://github.com/o3de/o3de/pull/19752)
- AZ::Transform shrinks from 48 to 32 bytes, with translation and uniform scale packed into one SIMD lane. [o3de#19764](https://github.com/o3de/o3de/pull/19764)
- EditorComponentAPI get, set and compare property calls work on components that do not derive from EditorComponentBase, such as Input Configuration, instead of reading the wrapper's memory. [o3de#19771](https://github.com/o3de/o3de/pull/19771)
- Gamepads work on Linux systems that have only the libevdev runtime package installed; the loader now tries the versioned library name. [o3de#19801](https://github.com/o3de/o3de/pull/19801)
- Fixed a crash on quit when a scripted entity was deactivated after the script system had already shut down. [o3de#19805](https://github.com/o3de/o3de/pull/19805)
- AZStd compiles with GCC again after a declval issue in the vendored standard library code. [o3de#19809](https://github.com/o3de/o3de/pull/19809)
- Gameplay scripts can read and set the absolute system cursor position and cursor state, making cursor-aimed top-down controls possible from script. [o3de#19818](https://github.com/o3de/o3de/pull/19818)
- Console commands can supply a callback that autocompletes their arguments on Tab. [o3de#19853](https://github.com/o3de/o3de/pull/19853)
- Fixed crashes in network-related entity initialisation and in child entities left dangling by the 26.05 transform behaviour change. [o3de#19856](https://github.com/o3de/o3de/pull/19856)
- The ImGui console no longer collects stray text while the ImGui layer is hidden; input is queued and delivered only when it is visible. [o3de#19882](https://github.com/o3de/o3de/pull/19882)
- AZStd replaces its SFINAE machinery with C++20 concepts and drops the type traits, atomic aliases and iterator helpers that the standard library now covers. [o3de#19890](https://github.com/o3de/o3de/pull/19890)
- Fixed a crash in the Inspector when modifying values, caused by a callback type mismatch in the Document Property Editor that had gone unnoticed for years. [o3de#19895](https://github.com/o3de/o3de/pull/19895)
- Engine registration no longer consults the engines_path field deprecated in 22.10, which fixes a silent failure when registering an engine whose name already existed at a different path. [o3de#19905](https://github.com/o3de/o3de/pull/19905)
- The Inspector refreshes when a property's ChangeNotify attribute says it should. [o3de#19929](https://github.com/o3de/o3de/pull/19929)
- A new GameplayGem template scaffolds C++ gameplay components in a controller architecture, with EBus interfaces, serialisation and Editor reflection, visual scripting reflection, unit test skeletons and platform abstraction files. [o3de#19943](https://github.com/o3de/o3de/pull/19943)
- The Groundplane asset folder is spelled correctly, and the 28 prefabs, levels and templates that referenced the misspelled path are updated. [o3de#19952](https://github.com/o3de/o3de/pull/19952)
- LuaIDE works with the Editor on Linux: inter-process communication now has a Linux implementation, and two bugs in document invalidation and file lookup are fixed. [o3de#19963](https://github.com/o3de/o3de/pull/19963)
- dlmalloc and nedmalloc are removed from AzCore; they are unmaintained upstream and slower than native allocators on modern platforms. [o3de#19985](https://github.com/o3de/o3de/pull/19985)
- Fixed a crash when detaching a prefab, and an ImGui crash. [o3de#19993](https://github.com/o3de/o3de/pull/19993)
- Lua scripts can construct an InputDeviceId with a name and index, so they can address a specific device such as the second gamepad. [o3de#20027](https://github.com/o3de/o3de/pull/20027)
- Fixed a crash in Restore Default Layout when no Console view pane exists. [o3de#20052](https://github.com/o3de/o3de/pull/20052)
- SystemFile reads and writes larger than 2 GB are chunked on Linux and Mac instead of failing or truncating. [o3de#20113](https://github.com/o3de/o3de/pull/20113)

### SIG-Graphics-Audio
- The Tracy profiler Gem moves to Tracy 1.14.1 and marks the frame end at the RHI's end-of-frame event for more accurate frame times. [o3de-extras#1090](https://github.com/o3de/o3de-extras/pull/1090)
- Vulkan result assertions are now a macro, so a failure is reported at the line of the call rather than inside a helper. [o3de#17169](https://github.com/o3de/o3de/pull/17169)
- Per-mesh and per-material info move from the ray tracing feature processor into the general mesh feature processor, so shaders other than ray tracing hit shaders can read scene geometry and material data. [o3de#19123](https://github.com/o3de/o3de/pull/19123)
- Ground Truth Ambient Occlusion is available as an alternative to SSAO, following the [SIG-Graphics-Audio RFC](https://github.com/o3de/sig-graphics-audio/blob/main/rfcs/GTAOIntegration/Proposed%20RFC%20Feature%20GTAO%20%28Ground-Truth%20based%20Ambient%20Occlusion%29.md), with the spatial filter and multi-bounce approximation and without a temporal filter. [o3de#19167](https://github.com/o3de/o3de/pull/19167)
- Atom hair renders again: the PPLL fill fragment shader returns a colour instead of void, which the shader builder rejected. [o3de#19201](https://github.com/o3de/o3de/pull/19201)
- Vertex and index buffers can be stored compressed with meshoptimizer, as a proof of concept. [o3de#19224](https://github.com/o3de/o3de/pull/19224)
- Unused TressFX source files that no target built are removed from the AtomTressFX Gem. [o3de#19509](https://github.com/o3de/o3de/pull/19509)
- The ImGui pass tree view can hide disabled passes and shows each pass's draw list name. [o3de#19598](https://github.com/o3de/o3de/pull/19598)
- Unlit materials gain cutout and blended opacity modes, double-sided rendering, optional shadow casting and an optional billboard mode. [o3de#19629](https://github.com/o3de/o3de/pull/19629)
- imgui.ini files are ignored by git. [o3de#19630](https://github.com/o3de/o3de/pull/19630)
- The RPI Python tooling works on Python 3.14, which removed sqlite3.version. [o3de#19645](https://github.com/o3de/o3de/pull/19645)
- The Stars component's exposure, radius factor and twinkle rate can be read and set from the EBus and from scripts. [o3de#19654](https://github.com/o3de/o3de/pull/19654)
- Opaque Unlit materials render through their own shader path, which removes the white edge artifacts the shared path produced. [o3de#19656](https://github.com/o3de/o3de/pull/19656)
- The Stars component rejects negative values passed to its new setters. [o3de#19659](https://github.com/o3de/o3de/pull/19659)
- FlyCameraInputComponent accumulates mouse deltas across a frame, which removes choppy movement at high polling rates, and no longer uses Cry math types. [o3de#19709](https://github.com/o3de/o3de/pull/19709)
- UV transforms on Vulkan work correctly: material parameters store the matrix as float4 rows instead of a float3x3, and shaders rebuild it. [o3de#19725](https://github.com/o3de/o3de/pull/19725)
- Editor tools built with Wayland enabled can force the XCB platform plugin through a CVar instead of crashing. [o3de#19729](https://github.com/o3de/o3de/pull/19729)
- The Microphone Gem depends on libsamplerate only on platforms whose implementation uses it. [o3de#19737](https://github.com/o3de/o3de/pull/19737)
- Particle assets declare their material dependency by path, so on a cold cache the Asset Processor builds the material before the particle. [o3de#19756](https://github.com/o3de/o3de/pull/19756)
- Particles no longer crash the GPU on the low-end render pipeline, and mesh particles render per instance through a structured buffer. [o3de#19786](https://github.com/o3de/o3de/pull/19786)
- The Material component gains a secondary variable list keyed by the mesh's material slot labels, so generated prefabs can bind materials without knowing slot order. [o3de#19789](https://github.com/o3de/o3de/pull/19789)
- Sampler state material property values serialise to and from JSON; the case had been missing since the type was added. [o3de#19795](https://github.com/o3de/o3de/pull/19795)
- Ribbon particles no longer overflow their vertex and index buffers, and a stopped particle can be played again. [o3de#19807](https://github.com/o3de/o3de/pull/19807)
- Fixed a dangling string pointer that GCC warned about. [o3de#19810](https://github.com/o3de/o3de/pull/19810)
- The engine builds against system libtiff 4.5 and newer, whose legacy typedefs collided with CryCommon's. [o3de#19825](https://github.com/o3de/o3de/pull/19825)
- Fixed a reference to a dangling temporary iterator that GCC warned about. [o3de#19831](https://github.com/o3de/o3de/pull/19831)
- Particle systems preload their material asset so it is ready when the system activates on level load. [o3de#19865](https://github.com/o3de/o3de/pull/19865)
- meshoptimizer moves to 1.2; the sparse and lock-border LOD options meant for meshlets are removed. [o3de#19891](https://github.com/o3de/o3de/pull/19891)
- Tidied an import and an unreachable return in the RPI Python utilities. [o3de#19927](https://github.com/o3de/o3de/pull/19927)
- Track View no longer deletes keyframe 1 when keyframe 0 is selected for removal on a compound spline track. [o3de#19949](https://github.com/o3de/o3de/pull/19949)
- Unlit shader inputs are refactored; tiled UVs behave correctly again and the shader uses the standard fallback draw SRG. [o3de#19961](https://github.com/o3de/o3de/pull/19961)
- The LyShine editor no longer crashes at startup when Qt lays out a zero-size viewport, which made Vulkan swapchain creation fail. [o3de#19964](https://github.com/o3de/o3de/pull/19964)
- Fixed an assert and undefined behaviour in the Audio Controls writer, which modified set elements in place. [o3de#19975](https://github.com/o3de/o3de/pull/19975)
- Changing the audio language no longer leaves a dangling pointer in the file cache that broke subsequent loads, and the Audio Controls Editor shows custom connection property widgets. [o3de#19976](https://github.com/o3de/o3de/pull/19976)
- D3D12MemoryAllocator is fetched with FetchContent instead of shipped as a package. [o3de#19992](https://github.com/o3de/o3de/pull/19992)
- Cutout Unlit materials are no longer darkened by SSAO, and blended Unlit materials no longer cast fully opaque shadows. [o3de#19994](https://github.com/o3de/o3de/pull/19994)
- The AZSL shader compiler now lives in the engine source tree and builds as a host tool, instead of arriving as a prebuilt package per platform. [o3de#20018](https://github.com/o3de/o3de/pull/20018)
- A pass with nothing to submit no longer produces zero command lists on DX12, Vulkan and Metal, which violated the execution group's minimum. [o3de#20031](https://github.com/o3de/o3de/pull/20031)
- Metal no longer corrupts output when a render scope has no draw items but must still clear or resolve a colour attachment. [o3de#20034](https://github.com/o3de/o3de/pull/20034)
- The screen-space subsurface scattering shader no longer deadlocks the GPU on hardware such as Intel Iris Xe; its group barrier now runs before any thread exits early. [o3de#20036](https://github.com/o3de/o3de/pull/20036)
- Terrain detail layers blend correctly at their falloff edges when there is no macro material, instead of switching hard between materials. [o3de#20049](https://github.com/o3de/o3de/pull/20049)
- Decals render on metallic surfaces, the decal texture array cap rises from 5 to 16, decals gain a maximum draw distance, and the diffuse probe grid shaders are recompiled. [o3de#20090](https://github.com/o3de/o3de/pull/20090)
- Fixed random Editor crashes on macOS when opening a level, caused by a Metal command buffer completion handler writing into a freed frame object. [o3de#20119](https://github.com/o3de/o3de/pull/20119)
- The viewport no longer turns green with the motion blur component at ultra sampling quality. [o3de#20130](https://github.com/o3de/o3de/pull/20130)
- MiniAudio works in unified launcher builds. [o3de#20158](https://github.com/o3de/o3de/pull/20158)
- Spawning and despawning entities no longer freezes the simulation at random; streaming-image upload callbacks notify their owner through a per-image notification instead of holding a pointer that could deadlock against texture release. [o3de#20179](https://github.com/o3de/o3de/pull/20179)

### SIG-Network
- The Multiplayer project template compiles again; float literals in the generated camera component now carry the required suffix. [o3de-extras#1055](https://github.com/o3de/o3de-extras/pull/1055)
- The server now validates the component input count in client input packets, closing an out-of-memory denial of service that a malicious client could trigger. [o3de#19677](https://github.com/o3de/o3de/pull/19677)
- Multiplayer AutoComponents with vector network properties compile again; narrowing conversions in the generated code no longer fail the build. [o3de#19879](https://github.com/o3de/o3de/pull/19879)
- Fixed a server crash during level load or unload when the level contains a Network Rigid Body component. [o3de#19944](https://github.com/o3de/o3de/pull/19944)
- A failed DTLS handshake now fails the connection instead of crashing the process. [o3de#20146](https://github.com/o3de/o3de/pull/20146)
- Encrypted connections are established one to two seconds faster: the server now processes the ClientHello carried in the initial connection packet instead of waiting for the client's retransmission. [o3de#20147](https://github.com/o3de/o3de/pull/20147)
- Packets near the MTU are no longer truncated after DTLS encryption, which dropped both the packet and the one after it. The default SSL inflation overhead is now 64 bytes. [o3de#20148](https://github.com/o3de/o3de/pull/20148)

### SIG-Simulation
- libsdformat moves from 13.5.0 to 16.0.1. [o3de-extras#1024](https://github.com/o3de/o3de-extras/pull/1024)
- The Panda robot prefab spawns at rest instead of rocking, by starting its articulation in the initial pose. [o3de-extras#1025](https://github.com/o3de/o3de-extras/pull/1025)
- ROS 2 manipulation components and controllers use fully namespaced joint names throughout, with better joint configuration and import fixes. [o3de-extras#1034](https://github.com/o3de/o3de-extras/pull/1034)
- ROS2FrameComponent again normalises a namespace name when needed; the call had been lost in a refactor. [o3de-extras#1037](https://github.com/o3de/o3de-extras/pull/1037)
- SimulationInterfaces supports the SpawnEntities service, spawning several entities in one call. [o3de-extras#1039](https://github.com/o3de/o3de-extras/pull/1039)
- SimulationInterfaces rejects an invalid pose in spawn requests instead of producing undefined results such as a scaled object. [o3de-extras#1040](https://github.com/o3de/o3de-extras/pull/1040)
- SimulationInterfaces supports the 2.1.0 package that ships with ROS 2 Lyrical Luth, alongside 1.4.0, 1.5.0 and 1.6.0, selected at configure time. [o3de-extras#1044](https://github.com/o3de/o3de-extras/pull/1044)
- The Tracy profiler Gem moves to Tracy 0.13.1, fixing a compile error on Windows. [o3de-extras#1046](https://github.com/o3de/o3de-extras/pull/1046)
- SimulationInterfaces runtime tests no longer link AzToolsFramework and Qt, which crashed them at load time in Conda environments carrying their own Qt. [o3de-extras#1051](https://github.com/o3de/o3de-extras/pull/1051)
- Linking against the SimulationInterfaces API target no longer fails on a missing physics header. [o3de-extras#1059](https://github.com/o3de/o3de-extras/pull/1059)
- The ROS 2 Gems build on ROS 2 Lyrical Luth, where TF broadcaster initialisation changed. [o3de-extras#1061](https://github.com/o3de/o3de-extras/pull/1061)
- GetFrameTransform is back on the public ROS2Frame EBus. [o3de-extras#1065](https://github.com/o3de/o3de-extras/pull/1065)
- ROS 2 package dependencies are declared through O3DE's third-party convention, so they survive packaging a Gem for distribution. [o3de-extras#1066](https://github.com/o3de/o3de-extras/pull/1066)
- The ROS 2 camera can publish compressed images. The encoding conversion component lets you choose the conversion, converts 32-bit depth to mono16 or mono8, and the compression component falls back to a conversion at runtime when none is configured. [o3de-extras#1067](https://github.com/o3de/o3de-extras/pull/1067)
- Files and functions in the Robot Importer named for URDF are renamed; the Gem has parsed SDF for some time. [o3de-extras#1068](https://github.com/o3de/o3de-extras/pull/1068)
- The Robot Importer's utility code is split into focused files for SDF queries, plugin queries and visitors, with unused functions and dependencies removed. [o3de-extras#1070](https://github.com/o3de/o3de-extras/pull/1070)
- A notification bus reports entities spawned through the SimulationInterfaces services, so additional child entities can be registered without replacing the spawn handler. [o3de-extras#1071](https://github.com/o3de/o3de-extras/pull/1071)
- All of the Robot Importer's parsing code, for SDF, URDF fixes and Xacro, lives in one Parsing folder, and each maker includes only the headers it uses. [o3de-extras#1072](https://github.com/o3de/o3de-extras/pull/1072)
- The Robot Importer's prefab-building code moves from a folder named URDF to Building, with the makers in their own subfolder. [o3de-extras#1073](https://github.com/o3de/o3de-extras/pull/1073)
- Entities spawned through SimulationInterfaces are removed explicitly before a level unloads; on 26.05 they survived a level restart. [o3de-extras#1074](https://github.com/o3de/o3de-extras/pull/1074)
- The Robot Importer tracks referenced assets and prefab build status through two new EBuses handled by an import session, instead of passing a map down through every layer. [o3de-extras#1075](https://github.com/o3de/o3de-extras/pull/1075)
- SimulationInterfaces tests build with newer googletest, which rejects the deprecated Invoke wrapper. [o3de-extras#1076](https://github.com/o3de/o3de-extras/pull/1076)
- The ResetSimulation service treats its scope argument as a bitmask, so combinations of scopes reset correctly. [o3de-extras#1078](https://github.com/o3de/o3de-extras/pull/1078)
- Duplicate asset detection and copying code in the Robot Importer's import paths is consolidated, and the wizard checks whether a source asset is already in the project before searching by content. [o3de-extras#1085](https://github.com/o3de/o3de-extras/pull/1085)
- The Robot Importer reads the inertia tensor from URDF and SDF inertial data and applies it to articulation links, instead of leaving PhysX to compute one (needs o3de#20053, also in this release). [o3de-extras#1088](https://github.com/o3de/o3de-extras/pull/1088)
- ROS 2 topic QoS can set the history policy; previously every topic was hard-coded to KeepLast. [o3de-extras#1098](https://github.com/o3de/o3de-extras/pull/1098)
- The Robot Importer shows a warning banner when the project registry settings differ from the robotics templates, since that changes how .dae and .stl files are read, and the warning for more than 64 articulations uses the same style. [o3de-extras#1099](https://github.com/o3de/o3de-extras/pull/1099)
- The SimulationInterfaces editor tests build their spawnable in memory, so the test target no longer runs AssetProcessorBatch or pulls the engine builders into CI, and the TestSimulationEntity prefab that shipped with the Gem is removed. [o3de-extras#1100](https://github.com/o3de/o3de-extras/pull/1100)
- MotionMatching debug drawing is off by default; it cost a great deal of performance and can be switched on when needed. [o3de#19591](https://github.com/o3de/o3de/pull/19591)
- The MotionMatching Script Canvas demo files are migrated to current node types and open again. [o3de#19613](https://github.com/o3de/o3de/pull/19613)
- DetourCrowd from Recast Navigation is now available: a component that steers agents with collision avoidance between them and smooth movement, usable from C++ and Script Canvas. [o3de#19707](https://github.com/o3de/o3de/pull/19707)
- The PhysX 4 deprecation is complete. Projects that reference the Gem by its old name resolve to PhysX 5 through a gem alias. [o3de#19726](https://github.com/o3de/o3de/pull/19726)
- MotionMatching Gem initialisation uses parallel_for, avoiding a deadlock in the Jobs-based path on machines with few worker threads. [o3de#19732](https://github.com/o3de/o3de/pull/19732)
- The remaining PhysX 4 debug code, references and the upgrade script are removed. [o3de#19742](https://github.com/o3de/o3de/pull/19742)
- Every reflected field of the physics ColliderConfiguration can now have its Editor visibility set, including Tag and the rest and contact offsets, so other physics engines can hide what they do not use. [o3de#19769](https://github.com/o3de/o3de/pull/19769)
- PhysX enhanced determinism can be enabled per scene, through SceneConfiguration or the Editor's PhysX configuration. It is off by default. [o3de#19826](https://github.com/o3de/o3de/pull/19826)
- ArticulationLink computes its inertia tensor automatically from mass and shape, removing a large discrepancy in joint-chain behaviour between O3DE and Isaac Sim. [o3de#20053](https://github.com/o3de/o3de/pull/20053)

### SIG-UI-UX
- Spin boxes no longer repaint themselves endlessly. The suffix dimming was changing the input-method state during painting, which also interfered with Chinese, Japanese and Korean text input. [o3de#19938](https://github.com/o3de/o3de/pull/19938)
