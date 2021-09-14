---
title: "Debug Menu Samples"
description: "This section dives into the debug menu samples demonstrated in the Atom Sample Viewer."
toc: true
---  

This section dives into the debug menu samples demonstrated in the Atom Sample Viewer. 

{{< placeholder >}}
{{< todo issue="https://github.com/o3de/o3de.org/issues/687" >}}
{{< /todo >}}

## CPU Profiler

The Atom Renderer's built-in CPU Profiler widget can be used to collect running statistics and visualize profiling data collected from the renderer. 

To open the CPU Profiler widget, click on `Profile` &rarr; `CPU Profiler` from the ImGui debug menu.

### High-level Toolbar

The CPU profiler widget has two views, a statistics view and a visualizer. These two views share a common header for controlling the profiler.

![CPU Profiler Views](/images/atom-guide/atom-sample-viewer/cpu-profiler-views.png)

* Swap to statistics is used to swap between the statistics view and the visualizer.
* Resume can be used to start or stop profiling data collection from Atom.
* Capture takes a single-frame capture of CPU profiling data and saves it to a location on disk, by default into /<project>/user/CpuProfiler/.
* Begin can be used to start a continuous capture of CPU profiling data, during which Atom is storing many frames of data. End will end the continuous capture and save the data that was collected to disk, by default into /<project>/user/CpuProfiler/.
* Load File will bring up the file picker window which will list all of the.json files in /<project>/user/CpuProfiler/. This list of files is sorted in decreasing order according to modification time, so the most recent capture is at the top.

### Loading Captures

![CPU Profiler File Picker](/images/atom-guide/atom-sample-viewer/cpu-profiler-file-picker.png)

* Load Selected will load the selected capture into memory, after which the data will be visible in the statistics and visualizer views.

### Statistics

![CPU Profiler Statistics](/images/atom-guide/atom-sample-viewer/cpu-profiler-statistics.png)

The statistics view focuses on processing and displaying the quantitative data collected by Atom's CPU profiler. Each row in the table represents a specific profiling region, and all columns in the table can be sorted by clicking on the column headers:
* Group: The overall renderer area (ex. RPI, RHI, DX12) that the profiling region occurs in.
* Region: The lower-level name of the profiling region, often the name of a function call.
* MTPC: The mean time per call in milliseconds of the profiling region aggregated across all of the data collected while the CPU profiler widget has been active.
* Max: The maximum execution time of the region in milliseconds during the last frame's execution. For regions that only appeared once in the last frame, this will be equal to the total time.
* Invocations: The number of times that the profiling region was executed in the last frame.
* Total: The overall time spent in milliseconds executing this profiling region on the last frame, summing up each invocation of the region.

Rows in the table with a specific group or region name can also be searched for with the filter, which can be easily cleared by clicking  Clear Filter. Reset Table will clear all of the table's saved data and is recommended when switching samples.

### Visualizer

![CPU Profiler Statistics](/images/atom-guide/atom-sample-viewer/cpu-profiler-visualizer.png)

The visualizer presents the CPU profiling data in a timeline format similar to other profilers like RAD Telemetry and Tracy. Each active render thread is laid out horizontally, with every profiling event corresponding to a block in the visualizer. Time increases going to the right.

To scroll throughout the data, hold **RMB+Drag**. To zoom in and out, use **Control+Mouse Wheel**.

The histogram at the top of the widget can be used to easily find frames with poor performance. The height of each individual block corresponds to the amount of time it took for the frame to execute. The orange line corresponds to a frame time of 16.6 ms, or 60 FPS, and the red line corresponds to a frame time of 33.3 ms (30 FPS).

To quickly see the statistics for a given region, clicking on a region in the visualizer will jump to the statistics window with the targeted region's name filled in the filter. The Saved Frames slider controls the number of frames to save within the profiler. Find Region can be used as a filter to only draw specific regions of interest.

## Culling Debug Window

## GPU Profiler

## Pass Tree

## Transient Attachment Profiler
