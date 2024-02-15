---
linkTitle: To the Official O3DE Remote Repository 
title: Contributing to the official O3DE remote repository
description: O3DE maintains an official remote repository for O3DE owned content.
weight: 500
toc: true
---

O3DE maintains an official remote repository for O3DE owned content.  The `repo.json` for the repository is managed at https://github.com/o3de/canonical.o3de.org and any changes are made using GitHub pull requests.  

{{< note >}}
Only O3DE owned content in an O3DE owned GitHub repository can be added to the official remote repository.  Follow the [contributor guidelines](/docs/contributing/to-code/git-workflow/) to add your content to an O3DE GitHub repository such as `o3de-extras` first before submitting the content for inclusion in the official remote repository.
{{< /note >}}

#### Remote repository content approval process:
1. Create a branch from the local clone of your fork of https://github.com/o3de/canonical.o3de.org
1. Make the change to the `repo.json` file locally using the `o3de edit-repo-properties` command and push the change to your fork.
1. Create a pull request to merge your change into the `development` branch of https://github.com/o3de/canonical.o3de.org and follow the instructions in the pull request template which will ask you to provide some required information.
1. Automated and human reviews will be run to check your change.
1. After reviews pass the changes will be merged and the content can be tested using the staging URL.
1. After testing is complete, the change will be merged to the `main` branch making the content available to all users.
