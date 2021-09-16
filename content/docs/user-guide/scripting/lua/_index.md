---
linktitle: Lua
title: Writing Lua Scripts in Open 3D Engine
description: Use Lua in Open 3D Engine to automate your game project.
toc: true
weight: 100
---

## Topics

+ [Learning Lua](#learning-lua)
+ [Learning Lua in O3DE](#learning-lua-in-o3de)
+ [Adding Lua Scripts to Component Entities](./add-lua-script)
+ [Basic Structure of a Lua Script](./basic-lua-script)
+ [Lua Editor](./lua-editor)
+ [Properties Table](./properties)
+ [Using EBuses in Lua](./ebus)
+ [The Lua Environment (Advanced)](./environment)
+ [Debugging Lua Scripts](./debugging-scripts)
+ [Debugging with the Lua Editor](./debugging-tutorial)

You can use Lua in O3DE to facilitate quick iteration of your game project. Lua is a powerful, fast, lightweight, embeddable scripting language. When you construct new gameplay and game systems, you can run your changes immediately, without compiling your source code.

O3DE uses Lua version {{< versions/lua >}}.

## Learning Lua 

For learning the Lua language itself, the [lua.org](http://www.lua.org) website is a good place to start.
+ [Official Lua Documentation](http://www.lua.org/docs.html) - Provides a central location for information about Lua, including a [Getting started](http://www.lua.org/start.html) page.
+ [Programming in Lua](http://www.lua.org/pil/) - This text is a resource for getting started with Lua programming.
+ [Lua {{< versions/lua >}} Reference Manual](http://www.lua.org/manual/{{< versions/lua >}}/) - Provides a reference of all the functions that are available by default in Lua.

## Learning Lua in O3DE 

After you read through this tutorial on writing Lua scripts for the component entity system, learn more about using Lua in O3DE by consulting the following resources.

  + For information on O3DE's built-in Lua editor, refer to [Lua Editor](./lua-editor).
  + For information about the O3DE EBus, refer to [Working with the Event Bus (EBus) system](/docs/user-guide/engine/ebus).
