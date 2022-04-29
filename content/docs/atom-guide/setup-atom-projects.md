---
linkTitle: "Setup"
title: "Setting up Atom Renderer"
description: "Get started with Atom Renderer with an Open 3D Engine project or AtomSampleViewer, Atom's standalone application."
toc: true
weight: 200
---

Get started with **Atom Renderer** through **Open 3D Engine (O3DE)** by creating a new *O3DE project* or building **Atom Sample Viewer**, Atom's standalone application. 

## Prerequisites

Before setting up a new O3DE project or Atom Sample Viewer, you must install O3DE on your computer. Follow the instructions in [Setting Up O3DE](/docs/welcome-guide/setup) of the Get Started Guide.


## O3DE Project

Creating an O3DE project provides you the full suite of tools, including **O3DE Editor**, **Material Editor**, and a collection of Gems essential to building a simulation or game. This is a great way to test out Atom's features among other objects and mechanics in a level. 

![Default level prefab](/images/learning-guide/tutorials/environments/create-a-level-C.png)

### Setup 

1. Follow the instructions in[Creating a project](/docs/welcome-guide/create/) of the Get Started guide. Atom is built into O3DE via the **Atom Gem**, a core Gem that's enabled in your project by default.

2. After you set up your project, check out the following pages to explore Atom's features via the O3DE Editor:
   - [Create a Level](/docs/learning-guide/tutorials/environments/create-a-level/): An introduction to your first level. Whenever you create a level in your project, the default environment consists of many Atom components. 
   - [Component Reference - Atom](/docs/user-guide/components/reference/#atom): The full list of Atom components provided by the Atom Gem. 


## Atom Sample Viewer

Atom Sample Viewer is a good place to start if you're interested in evaluating Atom's features in a controlled environment. It's a standalone application, meaning you don't need to open it with O3DE Editor. Rather, it showcases samples that demonstrate each feature individually and with parameters you can tweak and configure. 

Check out the [`o3de-atom-sampleviewer`](https://github.com/o3de/o3de-atom-sampleviewer) repository in GitHub.

![An example of Atom Sample Viewer, a standalone application. This image showcases the Shadow sample.](/images/atom-guide/atom-sample-viewer/shadow.png)


### Setup

1. In a command line window, clone the [`o3de-atom-sampleviewer`](https://github.com/o3de/o3de-atom-sampleviewer) repository onto your local machine.

    ```cmd
    git clone https://github.com/o3de/o3de-atom-sampleviewer.git
    ```

2. Update your local repository by pulling the the latest changes, if any.

    ```cmd    
    git pull origin main
    ```

3. Use CMake to generate a Visual Studio solution, which is used in the next step to build the Atom project. 

    ```cmd
    cmake -B build/windows_vs2019 -S . -G "Visual Studio 16" -DLY_3RDPARTY_PATH=C:/o3de-packages
    ```

4. Use CMake to build Atom Sample Viewer Standalone. Specify the `profile` configuration for your build.

    ```cmd
    cmake --build build/windows_vs2019 --target AtomSampleViewerStandalone --config profile -- -m
    ```

When the project is done building, you can find the build files in the directory `o3de-atom-sampleviewer/build/bin/profile/`. From there, you can launch `AtomSampleViewerStandalone.exe`.