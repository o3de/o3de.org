---
title: Setup O3DE from GitHub
description: Learn how to setup Open 3D Engine (O3DE) by cloning the source from GitHub.
weight: 300
---

{{< preview-new >}}

Getting the source for Open 3D Engine (O3DE) from GitHub is a great way to setup your development environment to prepare for easily syncing future engine updates, and for making contributions to the open source project base.

**Prerequisites:**

<!-- TODO: Verify free disk space requirements. -->

* Git client installed.
* 60 GB of free space.
* See also [O3DE System Requirements](./requirements.md).

Use the following instructions to setup O3DE on your PC from GitHub:

1. Start by forking the GitHub repo from [https://github.com/aws/o3de](https://github.com/aws/o3de). We recommend using a fork because, unless you are a SIG member, you will not be able to stage changes and create pull requests directly in the O3DE repo. For general instructions on how to fork a GitHub repo and create pull requests from your fork, see the GitHub Guide on [Forking Projects](https://guides.github.com/activities/forking/).

    <!-- TODO: Should we show an HTTPS or SSH URL? -->
    <!-- TODO: Will the GitHub repo use submodules? -->
    <!-- TODO: What branch should we recommend here? Should we specify main, or a tag? -->
    <!-- TODO: Is it worth specifying --depth 1 (OR --single-branch) in the clone command to skip downloading all the history up to that revision (OR only the history leading to the tip of the tag)? -->
    <!-- TODO: Should lfs (large file storage) be enabled? If so, add commands: cd Lumberyard; git lfs install; git lfs pull -->

1. Clone your forked repo to your PC. Use your preferred Git UI, making sure to clone the submodules, or use the following command line:

    ```cmd
    md o3de
    cd o3de
    git clone https://github.com/YOUR-USERNAME/o3de.git --recurse-submodules --branch main
    ```

    {{< important >}}
    The O3DE GitHub repo contains submodules. Make sure you use the `recurse-submodules` option when cloning to get the entire source code.
    {{< /important >}}

    <!-- TODO: Do they need to pull after the clone? If not, show the pull --recurse-submodules command at the end. -->

1. (Optional) Add a remote to track the upstream repo if you want to keep your cloned fork up to date:

    <!-- TODO: Verify that we are indeed expecting customers to fork. Show them how to disable pushing to upstream, too. -->

    ```cmd
    git remote add upstream https://github.com/aws/o3de.git
    ```

    <!-- TODO: Show how to verify the upstream repository using git remote -v. They should see the URL for the fork as origin, and the URL for the original repository as upstream. -->

1. (Optional) Disable accidental attempts to push to upstream, since pull requests will be required when contributing:

    ```cmd
    git remote set-url --push upstream NONE
    ```
