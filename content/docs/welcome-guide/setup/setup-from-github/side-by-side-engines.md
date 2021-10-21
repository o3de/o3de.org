---
title: Side-by-side Engines
description: Learn how to setup multiple configurations of Open 3D Engine (O3DE) on your computer.
weight: 500
toc: true
---

In the preceding topics, you learned how to set up and configure the O3DE engine as either a source engine or a pre-built SDK engine. You also have the option of registering both engines in a side-by-side configuration. This is one way to isolate your engine source code development from your project development.

For example, if the engine source is in `C:\o3de` and the pre-built SDK engine is in `C:\o3de-install`, you can give each engine its own engine name so that you can register both in the O3DE manifest using the `o3de` script's `register` command. To test your engine modifications, you can build a test project using the source engine project creation instructions, which builds the engine in the project directory. When you're ready to update the SDK engine that your production project uses, you can build a new version of the SDK engine from `C:\o3de` using the `INSTALL` target. This updates the binaries in `C:\o3de-install`.

To update the name of an engine, open `engine.json` in the engine root directory and change the `engine_name` field. Then run `scripts\o3de.bat register --this-engine` again from that directory. New projects that you create from this engine will use the new engine name. To update the configured engine for an existing project, open `project.json` in the project root directory and change the `engine` field to use the new engine name.
