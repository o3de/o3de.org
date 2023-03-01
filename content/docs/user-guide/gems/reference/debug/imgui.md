---
linkTitle: Immediate Mode GUI (ImGui)
title: Immediate Mode GUI (ImGui) Gem
description: The Immediate Mode GUI (ImGui) Gem provides the 3rdParty library Dear ImGui which can be used to create runtime immediate mode overlays for debugging and profiling in Open 3D Engine (O3DE) projects.
toc: true
---

The Immediate Mode GUI (ImGui) Gem provides the 3rdParty library [Dear ImGui](https://github.com/ocornut/imgui), which can be used to create run time immediate mode menus and overlays for debugging and profiling information in **Open 3D Engine (O3DE)**. You can use it to access existing O3DE tooling or set up your own ImGui menus for your components or other game code.

One of the great things about ImGui is that there is next to no overhead when the ImGui game overlay is not visible, which is the default state. It is also very lightweight while in use. 

## Accessing ImGui menus

ImGui can be accessed by pressing the **Home** key in the editor, game or server launchers.

![ImGui Menus in Viewport](/images/user-guide/gems/reference/debug/imgui_menus.png)

> Server launchers support ImGui if rendering is active. ImGui requires the `rhi` cvar to not be null.

You can use a keyboard, mouse or controller to navigate the ImGui menus.

### Keyboard navigation

For keyboard use the arrow keys to navigate the menus and **Space** to activate or select an option.

### Game controller navigation

You can use the `imgui_EnableController` [CVAR](#cvars) to enable game controller input support, or use the `imgui_EnableControllerMouse` [CVAR](#cvars) to simulate mouse input with a game controller.

The following inputs are supported when using a game controller:

| Input                 | Description                                                                                                       | 
|-----------------------|-------------------------------------------------------------------------------------------------------------------|
| D-Pad                 | Move Focus / Navigation <br/>Tweak values (when activated with A) <br/> Resize Window (when holding X)            |
| Left Stick            | Scroll <br> Move Window (when holding X)                                                                          |
| X (Left Face Button)  | Tap: Toggle Menu<br>Hold + L1/R1: Focus Window<br>Hold + D-Pad: Resize Window<br />Hold + Left Stick: Move Window |
| Y (Upper Face Button) | Exit text / on-screen keyboard                                                                                    |
| B (Right Face Button) | Cancel / Close / Exit                                                                                             |
| A (Lower Face Button) | Activate / Open / Toggle <br/>Tweak values with D-Pad<br/>(+ L1/R1 to tweak slower/faster)                        |

The following inputs are supported when simulating mouse input with a game controller:

| Input                 | Description               | 
|-----------------------|---------------------------|
| Left stick            | Move Mouse Pointer        |
| A (Lower Face Button) | Left Mouse Button (Btn1)  |
| B (Right Face Button) | Right Mouse Button (Btn2) |

You can adjust the sensitivity using `imgui_ControllerMouseSensitivity`.

## Discrete input mode
When ImGui is visible, input is sent to both ImGui and the O3DE game/editor. Sometimes, it is more desirable to only control either ImGui or the game/editor at any given time. To facilitate this, the ImGui Gem supports a discrete input mode.

By default, discrete input mode is off. It can be turned on in the ImGui O3DE menu, or with the [CVAR](#cvars) `imgui_DiscreteInputMode`.

When this mode is enabled, ImGui will be given a 2nd visibility state, at this point, when toggling ImGui visibility via the HOME button or L3/R3 on a game controller, it will toggle through three states instead of just on and off.

1. ImGui is off - ImGui is not visible.
2. All input goes to ImGui - ImGui is visible and receiving all input.
3. All input goes to the Game - ImGui is visible but input is going to the game. This allows ImGui profiling tools and others to be visible on screen while interacting with O3DE.

> You can look at the upper right hand corner of the ImGui Main Menu bar to see the current state of ImGui input. You can also interact with this menu for some input tips.

![ImGui Input Status](/images/user-guide/gems/reference/debug/imgui_input_and_status.png)

## Using ImGui in your component

You will need to:

1. Ensure the ImGui Gem is active in your project. See the O3DE guide on [Adding Gems in a project](https://www.o3de.org/docs/user-guide/project-config/add-remove-gems/).
2. Sign up for ImGui::ImGuiUpdateListenerBus::Handler or use the `ImGuiLYCommonMenu` class as a base.
3. Inside the handler perform your ImGui actions.

```cpp
        void MyImGuiComponent::OnImGuiUpdate()
        {
            // .. do imgui stuff ...
        }
```

## Example O3DE ImGui tools

O3DE ships with many ImGui tools so the options you see will be dependent on the specific gems active in your project.

* [Debugging PhysX](/docs/user-guide/interactivity/physics/debugging/)
* [Multiplayer helpers](/docs/user-guide/gems/reference/multiplayer/multiplayer-gem/running/#running-locally-using-imgui-options)

## CVARs

ImGui uses the following Console variables (CVARs) either at runtime via the console, or by placing them in configuration. See the general [CVAR guide](/docs/user-guide/appendix/cvars/) for more information on configuring CVARs.

| Name                             | Description                                                                                                                                                               | 
|----------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| imgui_AutoEnableComponents       | _Deprecated_                                                                                                                                                              |
| imgui_ControllerMouseSensitivity | Allows the user to set the sensitivity of the left stick mouse movement when using the Controller Mouse Input mode.                                                       |
| imgui_DiscreteInputMode          | Toggles on or off Discrete Input Mode, which can help pipe input to ImGui, the game, or both, while using ImGui.                                                          |
| imgui_EnableAssetExplorer        | _Deprecated_                                                                                                                                                              |
| imgui_EnableCameraMonitor        | _Deprecated_                                                                                                                                                              | 
| imgui_EnableEntityOutliner       | _Deprecated_                                                                                                                                                              |
| imgui_EnableController           | Toggles Contextual Controller support functionality. This is off by default, but you can use this to customize your experience on any platform that supports controllers. |
| imgui_EnableControllerMouse      | Toggles Virtual Mouse Controller support functionality. Occasionally preferable to the contextual controller support.                                                     |
| imgui_EnableImGui                | Toggles visibility of ImGui, will be visible at startup if in a .cfg file. Roughly equivalent to pressing HOME or L3/R3 as well.                                          |
 
