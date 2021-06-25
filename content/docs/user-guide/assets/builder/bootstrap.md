---
description: ' Learn to create or modify a bootstrap file for a Python Asset Builder. '
title: Create or modify a bootstrap script
weight: 200
---

{{< preview-migrated >}}

To make your Python Asset Builder script available to the asset processing system, you must add a `bootstrap.py` file to the path or modify an existing `bootstrap.py` file\. We recommend you use a location that is relative to where your Python Asset Builder scripts will be stored, such as one of the following:
+ In your project: `Editor\Scripts\bootstrap.py`
+ In a Gem: `Editor\Scripts\bootstrap.py`

To add your Python Asset Builder, import it in the `bootstrap.py` file\.

```
import asset_builder_my_asset_type
```

The above example assumes that the Python Asset Builder is named `asset_builder_my_asset_type.py`, and that it's in the same directory as the `bootstrap.py` file\.
