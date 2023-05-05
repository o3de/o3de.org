---
title: Sort Keys
linktitle: Sort Keys
description: An overview of sort keys in the Action Manager in the Open 3D Engine (O3DE).
weight: 204
---

The menu manager and toolBar manager APIs provide ways to add actions and other items to the UI. To allow custom ordering with an eye to extensibility, these calls use the concept of sort keys.

A sort key is an integer that is used to determine the absolute ordering of elements in a menu or toolbar.
When the menu or toolbar is generated, items will be shown in order by their sort key. If multiple elements share the same sort key, they will then be shown in order as they were added.
In general, it is recommended to leave some space between items when populating a menu that is likely to be extended from a Gem, so that there is enough leeway to introduce items in-between.