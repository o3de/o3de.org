---
linktitle: Log Tables
title: Error Messages in Log Tables
description: Learn how to design Error/Warning/Success/Information messages in log tables using the Blue Jay Design System (BJDS) in Open 3D Engine (O3DE).
weight: 400
toc: true
---

*Log tables* are used to convey a long stream of notification updates that occurred in succession. Each item in the log table is accompanied by a status indicator, which informs the user of items that require the user's attention. These are frequently used to signal errors/failures, warnings, or information. 

For example, the following image shows a log table with status indicators next to each item in the **Asset Processor**.

![Event Log](/images/tools-ui/log-table/event-log.png)

A log table may contain two sections. In the first section, a table that displays an error will show a secondary box that allows users to expand on specific errors to get their full details. The importance of this section is it gives users enough information to understand the errors. The second section contains a table that displays how users can resolve errors or links to help documentation.