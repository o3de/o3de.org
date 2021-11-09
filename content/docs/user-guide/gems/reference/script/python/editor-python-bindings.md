---
linkTitle: Editor Python Bindings
title: Editor Python Bindings Gem
description: The Editor Python Bindings Gem provides Python commands for Open 3D Engine (O3DE) Editor functions.
toc: true
---

Some tasks in **Open 3D Engine (O3DE)** **Editor** are tedious or could easily be automated. To automate Editor tasks, O3DE Editor has support for scripting through Python bindings. These bindings are enabled with the Python Editor Bindings Gem, and used through a Python 3 library embedded within O3DE Editor. You can access a Python read, evaluate, print loop (REPL) through O3DE's Python Console, or launch Editor with an argument that loads and runs a Python script on boot.

## Enable Editor automation

Editor automation is enabled by selecting the Python Editor Bindings Gem for your project, and then rebuilding the editor. No specific configuration (debug, profile, release) is required to enable the Python bindings. Because the bindings are enabled through a Gem that you select for your project, you'll need to make sure that this gem is enabled for all projects that you intend to automate.

## Use Editor automation

The easiest way to get started with Editor automation is to use the REPL that's available from within the O3DE Editor and try out some commands. Open this REPL by choosing **Tools > Other > Python Console**. The Python console opens in a new tab, which gives you access to a console that displays output from Python, the REPL input, and a full reference of available commands. To get access to the reference, choose the **?** icon in the lower-right corner of the Python Console.

You can also access a set of available scripts, including some samples for common tasks in the editor, by selecting **Tools > Other > Python Scripts**. These scripts are stored in a directory depending on their scope. Scripts only for your project are stored in the `<project name>\Editor\Scripts` directory, and scripts meant to be used along with a gem are stored at `\Gems\<gem_name>\Editor\Scripts`.

Editor automation is driven primarily through the Event Bus (EBus) system. Before working with the editor bindings, you should become familiar with the basics of EBus. To learn about some of the specific busses used by the editor automation system, take a look at the Python Editor Bindings gem examples.
