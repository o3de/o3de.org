---
linkTitle: Remote Content 
title: Remote Content in Open 3D Engine
description: You can share and download Gems, Projects and Templates in Remote Repositories.
weight: 2000
---


The **Open 3D Engine (O3DE)** includes a built-in way to share and download **Gems**, **Projects**, and **Templates** using **Remote Repositories** that can be on your local computer, a web server or in a Git repository like those hosted in [GitHub](https://github.com).  The **Project Manager** and **O3DE CLI** can display and download content from **Remote Repositories** and help you create your own **Remote Repositories** and add content to them.  

The official **O3DE Remote Repository** is [https://canonical.o3de.org](https://canonical.o3de.org/repo.json) and is included in the [`engine.json`](https://github.com/o3de/o3de/blob/development/engine.json) file at the engine root, making it available by default to all users.  Changes to the https://canonical.o3de.org/repo.json file that lists all the available content to download take place through pull requests in the https://github.com/o3de/canonical.o3de.org GitHub repository.

## Section topics

| Topic | Description |
| --- | --- |
| [Use an O3DE Remote Repository](use-a-remote-repository) | Learn how to add and download content from an existing O3DE Remote Repository. |
| [Remote Repository Overview](remote-repository-overview) | Learn about O3DE Remote Repository structure and use cases. |
| [Create an O3DE Remote Repository](create-a-remote-repository) | Learn how to create your own O3DE Remote Repository. |
| [Repo.json Reference](repo-json-reference) | Learn about the repo.json file schema and how it is used. |
| [Update an O3DE Remote Repository](update-a-remote-repository) | Learn how to add, remove and update content in an O3DE Remote Repository. |
| [Contribute to the Official O3DE Remote Repository](/docs/contributing/to-official-remote-repository) | Learn how to submit content to the official O3DE Remote Repository. |