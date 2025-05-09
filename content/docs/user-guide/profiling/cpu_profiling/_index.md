---
title: CPU Profiling Support for Open 3D Engine (O3DE)
linkTitle: CPU Profiling
description: An overview of Open 3D Engine support for CPU Profiling.
weight: 100
---

A CPU Profiler is used to **monitor the performance of your processor** while it is running the editor or the game. It collects timed events in such a way that you can easily identify the sources of slowdowns in the codebase.

{{< tip >}}
The code behaves differently between debug and release build, so it is very likely that you will want to only profile release build to look at the performance issues of your application
{{< /tip >}}

## Overview

### Quick definition of profiler types

There are multiple ways to capture profiling data, each one with their pros and cons :

- **Instrumentation** : You add Start/End events yourself in the code. It is fast, the result is clean, but it might take a few try until you are able to pinpoint the exact problematic area
- **Sampling** : At specified intervals, data collection is done on your running program to know where the code is currently executed. Depending on the interval it can have a big performance impact. It is great to find right away the problematic area, but the amount of data can make it difficult to navigate
- **Tracing** : Similar to sampling with better precision but also bigger performance impact. It will be refered as "Sampling" from now on as we don't need to differenciate the two for this documentation

### Profiler Gems

O3DE currently support multiple profiling tools as Gems to toggle on and off. These are all very capable tools so choosing between them might come down as personal taste. While you can only have one profiling Gem enabled at a time, it is easy to switch in between them so that it should be straightforward to try them all out.

| Profiler | Description | Type | Platform |
| - | - | - | - |
| Built-in | Provides a quick overview of the CPU and GPU events. It is embedded via the [ImGui tools](https://docs.o3de.org/docs/user-guide/gems/reference/debug/imgui/) | Instrumentation | All |
| [Tracy](https://youtu.be/ghXk3Bk5F2U?si=h2j82B6EDma3rNs7&t=36) | An external free and open-source profiler which combines many features making it an hybrid profiler. [Online demo](https://tracy.nereid.pl/) | Instrumentation (with optional sampling support) | All |
| [Optick](https://github.com/bombomby/optick) | An external free and open-source profiler widely used in the games industry. The development has halted since the past few years. | Instrumentation (with optional sampling support) | Windows |
| [Superluminal](https://superluminal.eu/) | An external commercial profiler with strong sampling performance and UX. Widely used in the games industry | Sampling (with Instrumentation support) | Windows |
| [Pix](https://devblogs.microsoft.com/pix/) | The official Microsoft profiler used on XBox consoles | Sampling (with Instrumentation support) | Windows |

### Adding Instrumentation marker in your code

You have to include `<AzCore/Debug/Profiler.h>` in your C++ file to access the profiling markers. These markers are then forwarded to the currently enabled profiler Gem (we never use a specific profiler API). You can have a look in this file to see what is exposed, but most of your use case can be covered using these two macros :

- **AZ_PROFILE_FUNCTION** : To place at the start of a function, it will automatically grab the name of the function and take the duration of the whole function execution.
- **AZ_PROFILE_SCOPE** : To place at the start of a scope "{}". You have to provide a name, and it will take the duration of the scope it is in (so from the AZ_PROFILE_SCOPE to the next "}").

These two macros take a "Budget" as argument, it is used to group these tags under the same category. You can see the available budgets if you look for `AZ_DEFINE_BUDGET`.

Here is an example of API in action :

```cpp
#include <AzCore/Debug/Profiler.h>

void AssetDataStream::Open(const AZStd::vector<AZ::u8>& data)
{
    AZ_PROFILE_FUNCTION(AzCore);

    // ...
    while (!m_isSuspended)
    {
        AZ_PROFILE_SCOPE(AzCore, "Scheduler main loop.");
        // ...
    }
}
```

While these markers are not required if you use a sampling profiler, it is always nice to have them around for sensitive codepaths as it does make the navigation in the profiler easier (sampling profilers often supports instrumentation tags on top of their sampled data).

## Using the Built-in profiler (All platforms)

### Enabling the Built-in Profiler Gem

The built-in profiler is an optional Gem from the core O3DE repository. You can follow [this documentation](/docs/user-guide/project-config/add-remove-gems) to learn how to use the project manager to enable gems. If you search for "Profiler" you will see the Gem listed and you will able to enable it.

![Imgui profiler enable](/images/user-guide/profiling/enable-gem.jpg)

### Opening the Profiler

The Profiler is embedded inside the **[ImGui tools](/docs/user-guide/gems/reference/debug/imgui)**. Please refer to the documentation to open the ImGui tools. Once opened, you should see a "Profiler" entry in the ImGui menu, click on it to Open the CPU Profiler.

![Imgui profiler overview](/images/user-guide/profiling/imgui/cpu-profiler-open.png)

### Launch a capture

Upon being opened the profiler will be showing the performance for last few frames. Click on the **"Resume/Pause"** button in the top left to toggle the update.

If you want to capture more than a few frames, press the **"Begin"** button and let the profiler run, maybe jump into gameplay to perform specific actions. Once that you have enough data, you can press the **"End"** button to stop the capture and be able to navigate it.

![Imgui profiler overview](/images/user-guide/profiling/imgui/overview.png)

### Navigate your capture

The navigation within the profiler is done using the mouse. You can click on the **"Swap to visualizer/statistics"** to switch between the two primary views of the Profiler. Clicking on an item in the visualizer view will switch to the statistics view, as seen below.

![Imgui profiler statistics](/images/user-guide/profiling/imgui/start.png)

Use the **Find Region** in the visualizer to search for specific events. The timeline is interactive, click on it with the left mouse button to have it focused, then :

- Hold left mouse button to move around the timeline
- Hold the ctrl key and use the mouse wheel to change the timeline scale

![Imgui profiler search](/images/user-guide/profiling/imgui/profile-event-search.jpg)

When the timeline is scaled-out, you will be able to see the frametime in ms for every captured frame in the profiler. This is an easy way to find frames which are over your budget.

### Save your capture

Press the "Capture" button to save your captured data in a json file. The path will be indicated right above the button. You can load any previous capture thanks to the "Load file" button.

![Imgui profiler save](/images/user-guide/profiling/imgui/save.png)

## Prerequisites for Tracy, Optick and Superluminal

These profiler Gems are located in the [o3de-extras](https://github.com/o3de/o3de-extras) github repository. 

1. This repository follows the Remote Content format, you can follow [this documentation](/docs/user-guide/remote-content/use-a-remote-repository) to learn how to **register a remote repository**.

2. Else if you prefer to download o3de-extra yourself, you can follow [this documentation](/docs/user-guide/project-config/register-gems). Within o3de-extra folder, the profiler gems are located in "*Gems/ExternalProfilers*".

Once that the profiler gem that you want to use has been registered, you need to enable it for your project and rebuild the project. Refer to the [first steps of enabling the Built-In profiler](#enabling-the-built-in-profiler-gem) to see how to enable a gem for your project.

## Using Tracy profiler (All platforms)

The "client" is the game or the editor while the "server" is the external Tracy application used to visualize the captured data. This application is available on windows but need to be built for other platforms.

### (Windows) Grabbing the server application

You can download [the latest release](https://github.com/wolfpld/tracy/releases) from github, pick the `windows-x.x.zip` file. Once downloaded, extract it, the server application is `tracy-profiler.exe`, you will have to launch it anytime you want to make a new capture.

### (Linux) Building the server application

You will have to build the application yourself, this process is outlined in the documentation file under "2.3 Building the server". You can find a summary below :

1. Install git, CMake and clang (you can learn how to set them up via the [o3de documentation](/docs/welcome-guide/requirements))

Then you can open a terminal in the folder of your choice to :

2. Clone the Tracy repository. Sync to the same version used by the Gem (visible in the o3de-extra repository, under `Gems/ExternalProfilers/TracyProfiler/Code/CMakeLists.txt`). Then go inside the server application folder.

```bash
git clone https://github.com/wolfpld/tracy.git
git checkout 5d542dc09f3d9378d005092a4ad446bd405f819a
cd tracy/profiler
```

3. Install required libraries and configure the build

```bash
echo $XDG_SESSION_TYPE
```

If "X11" was shown

```bash
sudo apt install libdbus-1-dev libfreetype-dev libtbb-dev
cmake -B build -DLEGACY=1 -DCMAKE_BUILD_TYPE=Release -DCMAKE_C_COMPILER:FILEPATH=/usr/bin/clang -DCMAKE_CXX_COMPILER:FILEPATH=/usr/bin/clang++
```

If "Wayland" was shown

```bash
sudo apt install libglfw3-dev
cmake -B build -DCMAKE_BUILD_TYPE=Release -DCMAKE_C_COMPILER:FILEPATH=/usr/bin/clang -DCMAKE_CXX_COMPILER:FILEPATH=/usr/bin/clang++ 
```

{{< tip >}}
The `DCMAKE_C_COMPILER` arguments are not usually required, but you can run into linker issues at the end of the build when they are not set
{{< /tip >}}

5. Build Tracy

```bash
cmake --build build --parallel --config Release --target all
```

If the build succeeded, you can launch the Tracy application via the following command

```bash
./build/tracy-profiler 
```

If the build failed, it might be because of missing libraries which you can usually install via `sudo apt install libNAME-dev`. Else you might want to try to build using Visual Studio Code as outlined in the Tracy documentation.

### Launch a capture

While not required, **launching the editor or game as Administrator** will allow the profiler to gather sampling data on top of the instrumentation tags (at the time of writing, tracy sampling only works on linux).

On Windows:
- Right click on the editor shortcut that you use, and select **Run as administrator**. You will likely want to use `--project-path="C:/Path_To_Your_Project"` as launch argument if it is not present yet.

On Linux:
- Open a terminal next to your editor build. Then launch it with sudo `sudo ./Editor --project-path="/home/Path_To_Your_Project"`

Then you can launch the **tracy-profiler** application that you downloaded or built. Under the **"connect"** button you should see the **"Editor"** process being listed. Click on it to start the capture of profiling data.

![Tracy connect](/images/user-guide/profiling/tracy/connect.jpg)

### Navigate your capture

![Tracy overview](/images/user-guide/profiling/tracy/overview.jpg)

- **Frame Navigator** : Allow you to quickly jump to a frame which is above your 16ms target.
- **Sampling Info** : Allow to see the context switches, callstacks or areas without instrumenting events.
- **Event Timeline** : Contains all of the instrumenting events recorded. This is the main view.
- **Sub-Windows** : Undocked by default, these are used for advanced filtering and statistics options.

### Basic navigation

Navigation is done using the mouse :

- Hold right click to move through the Event Timeline
- Use the mouse wheel to zoom-in and out of the Event Timeline

Add the middle mouse button is used to **focus** :

- Click on the middle mouse button to focus on the event below the cursor
- Click and drag the middle mouse button to focus on the drawn area

### Basic Search

If you want to **find a specific event**, press `ctrl + F` to open the "Find zone" window. 

1. You will want to tick the **"Ignore case"** option.
2. Enter the name of event that you want to inspect and press enter.
3. Scroll at the bottom, open the dropdown with the threads name. Click with the middle mouse button to **focus** the timeline on the event.

![Tracy search](/images/user-guide/profiling/tracy/find.jpg)

### Basic Analysis

You might want to see for a given time range the most expensive events. In order to do so, open the **Statistics** panel

1. You can order by time spent if you click on the **"Total time"** column.
2. Click on the **"Limits"** button to access advanced filtering
3. Tick the **"Statistics"** button and click on **Limit to view**.

The event shown in the statistics will now only contain the range in red in the timeline.

![Tracy limit view](/images/user-guide/profiling/tracy/limit-view.jpg)

Tracy offers many advanced features that you will discover while using the tool. If needed, you can refer to the [official documentation](https://github.com/wolfpld/tracy).

## Using Optick profiler (Windows-only)

{{< tip >}}
It is possible to profile and save the profile data for any platform, but the GUI Application used to visualize this capture is only available on windows (built with WPF). It might be possible to run it via [Wine](https://en.wikipedia.org/wiki/Wine_(software)) on linux, but this is outside of the scope of this documentation.
{{< /tip >}}

The creator of Optick [made this youtube video](https://www.youtube.com/watch?v=p57TV5342fo) to showcase the tool if you want to get a quick overview.

### Grabbing the application

You can download [the latest release](https://github.com/bombomby/optick/releases) from github, pick the `Optick_x.x.zip` file. Once downloaded, extract it, the application is `Optick.exe`, you will have to launch it anytime you want to make a new capture.

### Launch a capture

While not required, **launching the editor or game as Administrator** will allow the profiler to gather sampling data on top of the instrumentation tags. Right click on the editor shortcut that you use, and select "Run as administrator". You will likely want to use `--project-path="C:/Path_To_Your_Project"` as launch argument.

You can now launch Optick. Click on the **play button in the top left corner to start the capture**. Jump into game and move around until you have enough data.

![Optick connect](/images/user-guide/profiling/optick/connect.jpg)

Clicking on the same button will stop the capture. Make sure you **click on the editor/game window afterwards** so that it is able to send the last captured data to finish the profile capture.

### Navigate your capture

![Optick overview](/images/user-guide/profiling/optick/overview.jpg)

- **Frame Navigator**: Allow to quickly see which frames are above your budget.
- **Sampling Info**: Displays the CPU load, context switches and callstacks.
- **Event Timeline**: The main view with all of the instrumeting events.
- **Sub-Windows**: Advanced filtering and data search option. The "Function Flamegraph" displays sampling data.

### Basic navigation

Navigation is done using the mouse :

- Hold right click to move through the Event Timeline
- Use the mouse wheel to zoom-in and out of the Event Timeline

## Using Superluminal profiler (Windows-only)

Superluminal is a Commercial profiler, it offers a trial period but you have to buy a license past this trial if you want to continue using it. To prevent licensing issues we won't attach screenshots and we recommend you to have a look [at the official documentation](https://www.superluminal.eu/docs/documentation.html).

The **Superluminal Gem is not required** to use Superluminal with 03DE, it will only offer some instrumentation data on top of the existing sampling data.

### Grabbing the application

You can download Superluminal [from the main website](https://superluminal.eu/). During the installation process, if you decide to not use the default installation folder (`C:/Program Files/Superluminal`) you will have to update the CMake variable `SUPERLUMINAL_API_PATH` if you enable the Superluminal 03DE Gem.

### Launch a capture

You can open `Superluminal` directly, it will be in charge of launching 03DE. Under the **Start** menu on the left click on the **Run** button and fill-up the following fields :

- Application: The path to your `Editor.exe` or your exported game
- Working Directory: You can use the same folder as your executable
- Commandline Arguments: If you use the editor, enter `--project-path="C:/path/to/your/project"`

Then under **Capture Options**

- Tick "Enable PerformanceAPI events" if you enabled the Superluminal Gem
- Untick "Enable child process profiling" so that the asset processor don't add noise to your capture
- Untick "Start profiling immediately"

You are ready to press `Run` ! The editor or your game will boot. When you are ready, click the `Start Recording` button and the capture will start. Stop it when you are done, after a bit the capture will be ready to navigate.

### Navigate your capture

Todo

## Using Pix profiler (Windows-only)

### Prerequisites



### Grabbing the application

### Launch a capture

Todo

### Navigate your capture

Todo
