---
linkTitle: Creating Load Screens
description: ' Create game and level loading screens with Open 3D Engine''s UI Editor, and then add the canvas file paths to settings in the game.cfg and level.cfg files. '
title: Creating Game and Level Load Screens
weight: 300
---

You can create a game or level loading screen with the **UI Editor**. The game loading screen is displayed while the game loads. The level loading screen is displayed while a level loads. You can create and define a loading screen for each level.

Load screens support more than just UI canvases when using RAD Game Tools' Bink video files. You can specify a path to either a UI canvas or a Bink video file. Additionally, multi-threaded load screens are supported for Bink videos, enabling a load screen to render hitch-free while levels load.

To define the game and level loading screens, you set the file paths as parameters in `game.cfg` and `level.cfg`.

## Defining a Game Loading Screen 

To define a game loading screen, first do one of the following:
+ Create the loading screen canvas in the **UI Editor** and save it in your O3DE project directory.
+ Save a Bink video file in your O3DE project directory.

You then add or modify parameters in `game.cfg`, which is at the root of your project directory.

**To add game loading screen parameters to `game.cfg`**

1. In a text editor, open `game.cfg` at the root of your project directory.

1. Add or modify the following parameters in `game.cfg`:
   + `game_load_screen_uicanvas_path` - File path to the `.uicanvas` game load screen file relative to your project path. Use this if you are using a UI canvas for your loading screen.
   + `game_load_screen_bink_path` - File path to the .bk2 game load screen file relative to your project path. Use this if you are using a Bink video for your loading screen.
   + `game_load_screen_minimum_time` - Minimum amount of time to show the game load screen, in seconds. Important to prevent short loads from flashing the load screen. 0 means there is no minimum. The default is 0.
   + `game_load_screen_sequence_to_auto_play` - Name of the game load screen animation sequence to play on load.
   + `game_load_screen_sequence_fix_fps` - A fixed frame rate for the game load screen animation to play on load. Default is `60`. To ignore this setting and use the real time-delta, specify `-1`.
   + `ly_EnableLoadingThread` - Experimental. Set to 1 to enable fully threaded loading where the load screen is drawn on a thread that isn't loading data. Currently only supported for Bink load screens.

The following are examples of these parameters in a `game.cfg` file:

```
game_load_screen_uicanvas_path="UI\Canvases\UiAnimMultiSequence.uicanvas"
game_load_screen_minimum_time=5
game_load_screen_sequence_to_auto_play="TopRowMove"
game_load_screen_sequence_fix_fps=4.0
```

```
game_load_screen_bink_path="Videos\GameLoadingScreen.bk2"
game_load_screen_minimum_time=5
```

## Modifying a Splash Screen (Renderer Loading Screen) on Linux

A splash screen serves as a loading screen for the renderer. Typically, the renderer takes a few seconds to boot up, during which time even the game's loading screen cannot be displayed. To prevent an awkward black screen during this period, you can use the splash screen settings to display a static PNG image. Please note that transparency will not be respected and should be replaced with black.

It is required that `xdd` linux utility is installed for this feature to work.

To set a custom splash screen, place your logo in your project under `Resources/Splash.png`. Alternatively, set the `SPLASH_FILE` environment variable to the path of such a file. The only image requirement is that it must be an 8-Bit PNG. This image will be injected into the O3DE code during compilation, so a rebuild is necessary for the change to take effect.

For the best results, follow up this splash screen with a UI-based game loading screen, as it loads quickly. If you don't, you may still see a black screen during the period when Atom has started loading, taken control over the display, but has not yet begun to output the rendered scene.


## Defining a Level Loading Screen 

To define a level loading screen, first do one of the following:
+ Create the loading screen canvas in the **UI Editor** and save it in your level's directory.
+ Save a Bink video file in your level's directory.

You then add or modify parameters in `level.cfg`, which is at the root of your level directory.

**To add level loading screen parameters to `level.cfg`**

1. In a text editor, open `level.cfg` at the root of your level directory.

1. Add or modify the following parameters in `level.cfg`:
   + `level_load_screen_uicanvas_path` - File path to the `.uicanvas` level load screen file relative to your project path. Use this if you are using a UI canvas for your loading screen.
   + `level_load_screen_bink_path` - File path to the .bk2 level load screen file relative to your project path. Use this if you are using a Bink video for your loading screen.
   + `level_load_screen_minimum_time` - Minimum amount of time to show the level load screen, in seconds. Important to prevent short loads from flashing the load screen. 0 means there is no minimum. The default is 0.
   + `level_load_screen_sequence_to_auto_play` - The name of the level load screen animation sequence to play on load.
   + `level_load_screen_sequence_fix_fps` - A fixed frame rate for the level load screen animation to play on load. Default is `60`. To ignore this setting and use the real time-delta, specify `-1`.
   + `ly_EnableLoadingThread` - Experimental. Set to 1 to enable fully threaded loading where the load screen is drawn on a thread that isn't loading data. Currently only supported for Bink load screens.

The following are examples of these parameters in a `level.cfg` file:

```
level_load_screen_uicanvas_path="Levels\StarterGame\UiAnimMultiSequence.uicanvas"
level_load_screen_minimum_time=3
level_load_screen_sequence_to_auto_play="TopRowMove"
level_load_screen_sequence_fix_fps=4.0
```

```
level_load_screen_bink_path="Videos\IntroLevelLoadingScreen.bk2"
level_load_screen_minimum_time=3
```
