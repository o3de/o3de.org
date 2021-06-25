---
title: Metadata Used in Open 3D Engine Documentation
description: A reference for the metadata fields used by the Open 3D Engine documentation, including those required in the header.
linktitle: Metadata
weight: 400
toc: true
---

Each Markdown file must begin with Hugo Front Matter (metadata) that provides information about the content. You can learn about all the available variables in the [Front Matter](https://gohugo.io/content-management/front-matter/) topic of the Hugo Content Management Guide. In O3DE documentation, there are five Front Matter variables that are commonly used in the format below.

```yaml
---
linkTitle: Rigid Bodies
title: Dynamic Rigid Body Simulation with PhysX
description: An introductory tutorial for rigid body simulation with PhysX in Open 3D Engine (O3DE).
weight: 300
toc: true
---
```

Front Matter is placed at the topic of the Markdown source file and enclosed in three dashes `---`. Each O3DE topic should at least have `linkTitle`, `title`, and `description` in that order.

Variable | Usage
:--| :-----
`linktitle:` | A short title that appears in links such as a table of contents.
`title:` | A long title that appears on-page and the H1 heading.
`description:` | A short description of the topic content.
`weight:` | A value used to sort the content for lists, such as a table of contents. Lower weight values are sorted higher in lists. It's good practice to use increments of 100 for weight values to ensure additional topics can be inserted and sorted properly in the future.
`toc:` | When true, a table of contents is generated from the section headings in the right gutter of the page.
