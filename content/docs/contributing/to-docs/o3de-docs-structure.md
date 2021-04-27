---
linkTitle: O3DE Docs Structure
title: The Open 3D Engine (O3DE) Docs Structure 
description: A guide to the Open 3D Engine (O3DE) Documentation repository structure.
weight: 600
---

{{< preview-new >}}

There are many folders and files in the O3DE docs structure, but as a contributor, you will be interested in some specific areas. The areas of interest are highlighted in the diagram below:

![O3DE directory structure diagram.](/images/contributing/to-docs/o3de-directory-structure.svg "O3DE important directories.")

The are two high level directories of interest:

* `/content/docs/`: The root directory of the Markdown (`.md`) files that make up the documentation for the various O3DE guides.

* `/static/images/`: The root directory of the images (`.png`, `jpg`, and `.svg`) ued in the various O3DE guides.

{{< note >}}
The directory structure below `/static/images/` mirrors the directory structure below `/content/docs/`. When adding images to your topics, make sure to place them in the appropriate directory. In some instances, you may need to create new directories in `/static/images/` to replicate the structure of `/content/docs/`.
{{< /note >}}

The highlighted directories in the above diagram are where most contributions will be made:

* `atom-guide`: Maps to the [**Atom Render**](/docs/atom-guide/) section in the O3DE docs. Atom Guide contains feature and reference documentation for Atom that is exclusive to Atom Renderer. Topics that deal with the connection between Atom and O3DE, and using Atom within the context of O3DE, are in the various O3DE guides.

* `learning-guide`: Maps to the [**Tutorials & Examples**](/docs/learning-guide/) section in the O3DE docs. Tutorials and Examples contains user tutorials, a cookbook, and sample documentation. Tutorials should only use assets that are part of the O3DE distribution, are freely available, or can be quickly and easily replicated in open source content creation tools. The Cookbook section contains targeted recipes that demonstrate how to perform specific tasks, such as script canvas snippets. The Cookbook is a fantastic place for O3DE users to make quick, useful contributions. The Samples section contains documentation for samples that are included with the O3DE distribution.

* `user-guide`: Maps to the [**User Guide**](/docs/user-guide/) section in the O3DE docs. User Guide contains feature and reference documentation for the tools, gems, components, and systems that are part of the O3DE distribution.

* `welcome-guide`: Maps to the [**Welcome**](/docs/welcome-guide/) section in the O3DE docs. Welcome contains an overview of O3DE, an installation guide, tutorials to help new users get started, and links to various hubs for O3DE users.

{{< note >}}
The structure beneath each of the above directories is reflected in the table of contents that appears on the left in each guide. Keep this in mind when planning and adding new topics.
{{< /note >}}

The remaining directories are less likely to be of interest to individual contributors because their topics are generated trough some other process, or because their topics are not directly related to using O3DE.

* `api`: Maps to the [**API Reference**](/docs/api/) section in the O3DE docs. The API reference for O3DE which is generated through automation.

* `contributing`: Maps to the [**Contribute**](/docs/contributing/) section in the O3DE docs. Contribute contains information on contributing to O3DE code and documentation. You are here.

* `release-notes`: Maps to the [**Release Notes**](/docs/release-notes/) section in the O3DE docs. Release Notes are release specific information for O3DE that is provided by the various O3DE Special Interest Groups.

* `tools-ui`: Maps to the [**Tools UI Developer's Guide**](/docs/tools-ui/) section in the O3DE docs. User information on UI design concepts, framework, and widgets used to create tools and applications for O3DE.

With this high-level understanding of the O3DE docs structure, continue to the next topic, [Write Documentation](/docs/contributing/to-docs/write-documentation).