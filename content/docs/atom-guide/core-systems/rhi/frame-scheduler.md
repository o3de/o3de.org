---
title: "Frame Scheduler"
description: "The frame scheduler is a system for facilitating efficient GPU work submission."
date: 2021-03-05
toc: false
weight: 200
---

{{< preview-new >}}

The **frame scheduler** is a system for facilitating efficient GPU work submission. It provides a user-facing API for preparing (constructing), compiling, and executing a frame graph. The graph provides knowledge of the whole frame and is processed through phases down to platform-specific actions. Since the graph is known upfront, hazard tracking, memory aliasing, and cross-queue synchronization become much simpler problems. The frame becomes fully deterministic.