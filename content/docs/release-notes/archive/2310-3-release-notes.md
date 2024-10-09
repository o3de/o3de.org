The **Open 3D Engine (O3DE)** 23.10.3 This release is a point release (primarily bug fixes) for the 23.10 major release. This point release focuses on bug fixes for the Document Property Editor (DPE), crashes across Windows and Linux, optimization for decals, minor improvements for editor startup times, address control input inconsistencies, quality of life improvements for the Asset Browser, and resolves some build issues with clang versions.


# PR's for point release

# o3de/o3de
* Cherry pick DPE fixes from development [17525](https://github.com/o3de/o3de/pull/17525)
  * handle dynamic container elements [17411](https://github.com/o3de/o3de/pull/17411)
  * re-enable recycling, esp for prefab override labels [17343](https://github.com/o3de/o3de/pull/17343)
  * fix element add for containers with DynamicElementType [17441](https://github.com/o3de/o3de/pull/17441)
  * Handle ClassElement::FLG_POINTER in DPE-based Inspector [17457](https://github.com/o3de/o3de/pull/17457)
  * Speed up DPE's color picker handling by 2-3x and disallow redundant updates [17493](https://github.com/o3de/o3de/pull/17493)
  * added recycling capability to several common handlers [17512](https://github.com/o3de/o3de/pull/17512)

* Cherry-pick DPE fixes to point-release 23.10.3 #17545 [17545](https://github.com/o3de/o3de/pull/17545)
  * Add simple assert
  * Revert previous assert 
  * Fix GrowTextEdit sizing and sizeHint implementation to correctly work with the DPE's size detection code
  * Add static variables so it's easier to track and edit min/max sizes. 
  * WIP - DPE Layout classes rewrite 
  * Minor refactoring 
  * Remove repeated code, remove TODOs 
  * Remove debug prints 
  * Update Code/Framework/AzToolsFramework/AzToolsFramework/UI/DocumentPropertyEditor/ContainerActionButtonHandler.cpp
  * Update Code/Framework/AzToolsFramework/AzToolsFramework/UI/DocumentPropertyEditor/DocumentPropertyEditor.cpp
  * Detect whether the Property Editor is being instanced in the Editor or in a Unit Test and handle deletion differently
  * Fix int conversion warnings.
    
* Ensure Collider widgets correctly signal when they're being edited #17670 [17670](https://github.com/o3de/o3de/pull/17343)
* Fix the proportions of the Editor splashscreen for 23.10.3 [17712](https://github.com/o3de/o3de/pull/17712)
* Cherry pick PR #17819 Fix decal material loading when asset is already loaded [17828](https://github.com/o3de/o3de/pull/17828)
* Fixes the bug causing asset browser to be unable to delete/move/rename/etc.[17817](https://github.com/o3de/o3de/pull/17817)
  * Adds a toggle for source control notification in AP, so that if you toggle the Editor to not use Source Control, the AP will not either.
  * Uses the same setting in AP as the Editor, to determine whether Source Control should be used or not, and sets it to false by default, just like the Editor.
* Fix mouse wheel being intepreted as x-axis movement on linux [17816](https://github.com/o3de/o3de/pull/17816)
* A few small improvements for the editor startup time [17815](https://github.com/o3de/o3de/pull/17815)
* Fixes Input handler is handling mouse_delta inputs inconsistently [17814](https://github.com/o3de/o3de/pull/17814)
* Fix a potential crash and memory leak [17813](https://github.com/o3de/o3de/pull/17813)
* Add missing cmake preset file from installer [17812](https://github.com/o3de/o3de/pull/17812)
* Asset Processor startup time improvements on Linux [17811](https://github.com/o3de/o3de/pull/17811)
* Fixes the ALT key being held down after alt-tabbing back into the editor [17809](https://github.com/o3de/o3de/pull/17809)
* Fix some random crashes if ScriptCanvasDeveloper Gem is active.[17808](https://github.com/o3de/o3de/pull/17808)
* Allow direct selection of entities inside prefabs in Entity Pick mode [17799](https://github.com/o3de/o3de/pull/17799)
* Cherry-pick - Allow for Entity creation and Prefab instantiation in place via viewport interactions. [17798](https://github.com/o3de/o3de/pull/17798)
* Prefabs - Select the container of a prefab after instantiation [17797](https://github.com/o3de/o3de/pull/17797)
* Cherry Pick fix linux editor first time crash [17787](https://github.com/o3de/o3de/pull/17787)
* Cherry pick fix for python bindings on Linux for methods that return size_t [17786](https://github.com/o3de/o3de/pull/17786)
* Cherry pick fix for bootstrap.py files that are invoked from non-Editor tools [17785](https://github.com/o3de/o3de/pull/17785)
* Cherry Pick Fix logic for determining the file extension for shader files [17784](https://github.com/o3de/o3de/pull/17784)
* Cherry-pick clang 17 compiler errors fix from development [17780](https://github.com/o3de/o3de/pull/17780)
* Cherrypick my linux/clang compile fixes from dev to point release [17771](https://github.com/o3de/o3de/pull/17771)
* Cherry-pick fix to ChangeValidate functions not triggering in Property Editors [17763](https://github.com/o3de/o3de/pull/17763)
* Fix crash when full refreshing from AssetProcessor [17869](https://github.com/o3de/o3de/pull/17869)
* Fix script canvas error when saving scripts in Linux [17853](https://github.com/o3de/o3de/pull/17853)

# o3de/o3de-extras

* https://github.com/o3de/o3de-extras/pull/690 - This PR collects changes that should be integrated into the next point-release. [690](https://github.com/o3de/o3de-extras/pull/690)
  * updates in the documentation that are common for main and development [663](https://github.com/o3de/o3de-extras/pull/633)
  * fix for rclcpp SIGINT and SIGTERM handling (it was not handled in 2310.2) [636](https://github.com/o3de/o3de-extras/pull/636)
  * fix in Twist Robot Control that allows to move the robot more smoothly [645](https://github.com/o3de/o3de-extras/pull/645)
  * fix of the ROS2 Python tests that did not work in 2310.2 [663](https://github.com/o3de/o3de-extras/pull/663)
  * fix in scale calculation applied to a sensor (sensors were not placed correctly when scaled) [677](https://github.com/o3de/o3de-extras/pull/677)
  * fix of the multiplayer template which did not work in 2310.2 [680](https://github.com/o3de/o3de-extras/pull/680)
  * removal of the unused texture files that were duplicated along different Gems [682](https://github.com/o3de/o3de-extras/pull/682)
 * Enable compilation of WarehouseAutomationGem with a project-centric approach. [665](https://github.com/o3de/o3de-extras/pull/665)
