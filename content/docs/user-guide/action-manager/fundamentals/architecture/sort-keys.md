---
title: Sort Keys
linktitle: Sort Keys
description: 
weight: 204
---

The Menu Manager and ToolBar Manager APIs provide ways to add actions and other items to the UI. To allow custom ordering with an eye to extensibility, these calls use the concept of sort keys.

A Sort Key is an integer that is used to determine the absolute ordering of elements in a menu or toolbar.
When the menu or toolbar is generated, items will be shown in order by their sort key. If multiple elements share the same sort key, they will then be shown in order as they were added.
In general, it is recommended to leave some space between items when populating a menu that is likely to be extended from a Gem, so that there is enough leeway to introduce items in-between.


### Querying Sort Keys

To add items in relative ordering, the APIs provide functions to retrieve the sort key of existing actions in the menu or toolbar.


```

```