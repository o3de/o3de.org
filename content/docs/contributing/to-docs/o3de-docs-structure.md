---
linkTitle: O3DE Docs Structure
title: The O3DE Docs Structure 
description: A guide to the Open 3D Engine (O3DE) documentation repository structure.
weight: 400
---

There are many folders and files in the **Open 3D Engine (O3DE)** docs directory structure. If you are a new contributor, it can be a puzzle to sort out where to find or place topics and images that you'd like to contribute. The structure is easier to navigate when you understand two key high-level directories.

* `/content/docs/`: The root directory of the Markdown (`.md`) files that make up the documentation for the various O3DE guides.

* `/static/images/`: The root directory of the image (`.png`, `jpg`, and `.svg`) files used in the various O3DE guides.

The overwhelming majority of content contributions will reside somewhere in the two directories above. The structure beneath each of these directories is identical and easy to navigate.

{{< note >}}
The directory structure below `/static/images/` mirrors the directory structure below `/content/docs/`. When adding images to your topics, make sure to place them in the appropriate directory. In some instances, you might need to create new directories in `/static/images/` to replicate the structure of `/content/docs/`.
{{< /note >}}

In the structure below `/content/docs/` and `/static/images/`, directories map to the various O3DE documentation guides. You will most likely be interested in just a few specific areas. These areas of interest are highlighted in the diagram below:

![O3DE directory structure diagram.](/images/contributing/to-docs/o3de-directory-structure.svg "O3DE important directories.")

The highlighted directories in the above diagram are where most contributions will be made:

* `atom-guide`: The [**Atom Render**](/docs/atom-guide/) section in the O3DE docs. The Atom Guide contains feature and reference documentation for Atom that is exclusive to Atom Renderer. Topics that deal with the connection between Atom and O3DE, and using Atom within the context of O3DE, are in the various O3DE guides.

* `engine-dev`: The [**Engine Developer Guide**](/docs/engine-dev/) section in the O3DE docs. The Engine Developer Guide contains information about O3DE's internal architecture, design principles, and execution flow for developers who are making custom engine modifications and other contributions to the O3DE project. You can find technical information on O3DE frameworks, Gems, and tools in this guide.

* `learning-guide`: The [**Tutorials & Examples**](/docs/learning-guide/) section in the O3DE docs. Tutorials and Examples contains user tutorials, a cookbook, and sample documentation. Tutorials should only use assets that are part of the O3DE distribution, are freely available, or can be quickly and easily replicated in open source content creation tools. The Cookbook section contains targeted *recipes* that describe and demonstrate how to perform specific tasks, using snippets of Script Canvas graphs, for example. The Cookbook is a fantastic place for O3DE users to make quick, useful contributions. The Samples section contains documentation for samples that are included with the O3DE distribution.

* `user-guide`: The [**User Guide**](/docs/user-guide/) section in the O3DE docs. The User Guide contains feature and reference documentation for the tools, Gems, components, and systems that are part of the O3DE distribution.

* `welcome-guide`: The [**Welcome**](/docs/welcome-guide/) section in the O3DE docs. The Welcome section contains an overview of O3DE, an installation guide, tutorials to help new users get started, and links to various hubs for O3DE users.

{{< note >}}
The structure beneath each of the above directories is reflected in the table of contents that appears on the left in each guide. Keep this in mind when planning and adding new topics.
{{< /note >}}

The remaining directories are less likely to be of interest to individual contributors because their topics are generated through some other process, or because their topics are not directly related to using O3DE. 


* `api`: Maps to the [**API Reference**](/docs/api/) section in the O3DE docs. The API reference for O3DE is generated from Doxygen-formatted comments in the O3DE source code. The generated content is placed in the `/static/docs/api` directory.

* `contributing`: Maps to the [**Contribute**](/docs/contributing/) section in the O3DE docs. This is all the information on contributing to O3DE code and documentation. You are here.

* `release-notes`: The [**Release Notes**](/docs/release-notes/) section in the O3DE docs. The Release Notes contain release-specific information for O3DE that is provided by O3DE Special Interest Groups.

* `tools-ui`: The [**Tools UI Developer's Guide**](/docs/tools-ui/) section in the O3DE docs. This guide has information on design concepts, framework, and UI widgets that are used to create tools and applications for O3DE.
