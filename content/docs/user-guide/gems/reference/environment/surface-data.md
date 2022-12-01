---
linkTitle: Surface Data
title: Surface Data Gem
description: The Surface Data Gem provides functionality to emit signals or tags from surfaces such as meshes and terrain in Open 3D Engine (O3DE) projects.
weight: 400
toc: true
---

The Surface Data Gem enables surfaces and meshes to emit signals or tags that communicate various attributes. These signals and tags have various uses such as creating inclusion and exclusion areas, aligning and positioning objects such as vegetation, and applying physics materials.

## Adding Surface Tag Names

New **Surface Tag** names can be added by creating a new **Surface Tag Name List** asset. This can be done with the following steps:

1. Open the **Asset Editor** from the **Tools** menu.
1. Select **File** -> **New** -> **Surface Tag Name List**.
1. Click the {{< icon "add.svg" >}} **Add** button to the right of the **Surface Tag Name List** row, which adds a custom **Surface Tag** name element.
1. Fill in the **Surface Tag** name elements with tag names you would like to use.

![Adding surface tag names.](/images/user-guide/gems/reference/surface-data/surface-data-custom-tag.png)

Once you save the **Surface Tag Name List** asset, the tag(s) you added are available in any **Surface Tag** data field.

![Using surface tag names.](/images/user-guide/gems/reference/surface-data/surface-data-tag-usage.png)
