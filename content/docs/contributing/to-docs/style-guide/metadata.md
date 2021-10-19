---
title: Metadata Used in Open 3D Engine Documentation
description: A reference for the metadata fields used in Open 3D Engine (O3DE) documentation, including those required in the header.
linktitle: Metadata
weight: 400
toc: true
---

Each Markdown file in **Open 3D Engine (O3DE)** documentation must begin with Hugo front matter (metadata) that provides information about the content. For all the available variables, refer to [Front Matter](https://gohugo.io/content-management/front-matter/) in the Hugo Content Management Guide. In O3DE docs, there are five commonly used front matter variables, as follows:

```yaml
---
linkTitle: Rigid Bodies
title: Dynamic Rigid Body Simulation with PhysX
description: An introductory tutorial for rigid body simulation with PhysX in Open 3D Engine (O3DE).
weight: 300
toc: true
---
```

Place front matter variables at the top of the Markdown source file and enclose them in three dashes `---`. Each O3DE topic must have at least the `linkTitle`, `title`, and `description` variables, in that order.

Variable | Usage
:--| :-----
`linktitle:` | A short title that appears in links such as a table of contents.
`title:` | A long title that appears on-page and the H1 heading.
`description:` | A short description of the topic content.
`weight:` | A value used to sort the content for lists, such as a table of contents. Lower weight values are sorted higher in lists. It's good practice to use increments of 100 for weight values to ensure additional topics can be inserted and sorted properly in the future.
`toc:` | When true, a table of contents is generated from the section headings in the right gutter of the page.
