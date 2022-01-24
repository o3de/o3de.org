---
linkTitle: Bootstrap
title: Bootstrap a Python Asset Builder
description: Add a Python Asset Builder to a bootstrap.py script.
weight: 100
---

To make a **Python Asset Builder** script available to the **Asset Pipeline**, you must add a `bootstrap.py` file to the path or modify an existing `bootstrap.py` file. Placing the Python Asset Builder script and the `bootstrap.py` file in one of the following script locations is recommended:

+ In your project: `Editor\Scripts\bootstrap.py`
+ In a Gem: `Editor\Scripts\bootstrap.py`

To add your Python Asset Builder, import it in the `bootstrap.py` file. The example below assumes that the Python Asset Builder is named `my_py_asset_builder.py`, and that it's in the same directory as the `bootstrap.py` file.

```python
import my_py_asset_builder
```
