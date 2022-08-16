---
linkTitle: Docs Repo Setup
title: Set Up a Local O3DE Docs Repo
description: A guide to working with the Open 3D Engine (O3DE) documentation repository.
weight: 300
toc: true
---

In this topic, you'll learn to create your own fork of the **Open 3D Engine (O3DE)** documentation and get a handful of tips on creating and maintaining branches to ensure your pull request (PR) submissions go smoothly.

## Prerequisites

O3DE documentation uses the *fork and pull model* for contributions. As a contributor, you maintain a fork (your own repository of the O3DE documentation) on GitHub, and work locally to edit documentation. You then submit PRs from your fork for review.

You need to set up a few things before you proceed:

* Install **Git** version control software. Get Git here [Git Downloads](https://git-scm.com/downloads).

* Sign up for a GitHub account here [Join GitHub](https://github.com/join?ref_cta=Sign+up).

* Install an editor for making changes to Markdown (`.md`) files. You can use any editor, but we do recommend one that supports Markdown linting. VS Code is commonly used by contributors and you can get it here [Microsoft VS Code](https://code.visualstudio.com/download).

## What the fork?

The contribution process has these four basic steps:

1. Create branches for your changes in your fork of the O3DE docs repo.

1. Commit your changes to branches on your fork.

1. Submit PRs from the branches on your fork to `o3de.org:main`.

1. Respond to feedback in your PRs until the changes are approved and merged.

A fork is your own copy of `o3de.org:main` on GitHub. You can do anything you like within your fork, though it is recommended that you keep your fork synced with `o3de.org:main`, and work within branches in your fork. Working this way ensures the integrity of `o3de.org:main` and makes it easy for you to work at your own pace, experiment with changes, and collaborate with other contributors. To create a fork, perform the following steps:

1. Go to the [O3DE docs repo](https://github.com/o3de/o3de.org).

1. Fork `o3de.org:main`. Choose the **Fork** button in the upper right hand corner of the page. For more information on creating forks, refer to [Fork a repo](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo).

1. Find your fork of `o3de.org:main`. Choose your profile icon in the upper-right corner of the GitHub page. Select **Your repositories** from the list. On your repositories page, choose the **o3de.org** repository. The page displays a directory listing of your fork with information about recent changes.

{{< important >}}
There is one very important thing to take note about your fork. At the very top of the repo listing, GitHub shows the status of your fork. **"This branch is even with o3de.org:main."** If your fork or the selected branch has not been synced, the message will tell you how many commits behind it is. If you've made commits to the fork or branch that have not been merged into `o3de.org:main`, it will tell you how many commits ahead it is. You need to maintain your fork and its branches to keep them current with `o3de.org:main`. You learn to maintain your fork below in [Sync your clone](#sync-your-clone).
{{< /important >}}

For more information on working with forks, refer to [Working with forks](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/working-with-forks).

### Clone your fork

*Cloning* is the process of creating a local copy of a repo. To create a clone of your fork, in a terminal, perform the steps below:

1. Get the URL for your clone. On the page for your fork, Choose **Code > Clone > HTTPS** and copy the URL.

1. Open a terminal and navigate to a root directory where you'd like to place your local repository.

1. In the terminal, run the command below, inserting the URL you copied in Step 2:

    ```shell
    git clone <the URL you copied in step 1> 
    ```

### Set the upstream for your clone

`o3de.org:main` is the source of record for O3DE docs. You need to be able to pull new changes into your fork and from `o3de.org:main`, and contributors don't have direct push access to `o3de.org:main`. Changes are submitted  through PRs. In a terminal, perform the steps below:

1. `cd` into your new `o3de.org` clone.

    ```shell
    cd o3de.org
    ```

1. Set the upstream for your clone to the main O3DE docs repo.

    ```shell
    git remote add upstream https://github.com/o3de/o3de.org.git
    ```

1. Disallow pushing to the main O3DE docs repo from your clone.

    ```shell
    git remote set-url --push upstream NONE
    ```

### Sync your clone

Now you can *sync* your clone. Syncing is the process of pulling the latest changes from a source repository to a clone. Use one of the two options outlined below:

#### Option 1: Sync your fork and pull to your branch

1. Make sure you are in the main branch.

    ```shell
    git checkout main
    ```

1. Fetch the latest upstream commits from `o3de.org:main`.

    ```shell
    git fetch upstream
    ```

1. Merge the latest upstream commits into your clone.

    ```shell
    git merge upstream/main
    ```

1. Push the commits to your fork on GitHub.

    ```shell
    git push origin
    ```

1. If you are working in a branch, refer to [Maintain your branch](#maintain-your-branch) for information on syncing your branch.

#### Option 2: Pull to your branch directly from `o3de:main`

1. Set the upstream of your branch to `o3de:main`. You only need to do this step one time.

    ```shell
    git switch -c main upstream/main
    ```

1. Fetch the latest upstream commits from `o3de.org:main`.

    ```shell
    git fetch upstream
    ```

1. Pull the latest to your branch.

    ```shell
    git pull
    ```

{{< important >}}
You must perform one of the above options whenever you need to ensure your branch is synced with `o3de:main`, such as before creating a new branch, or before syncing a branch to submit a PR.
{{< /important >}}

## Set up Hugo

Hugo is the static site builder that O3DE documentation uses. When you have Hugo installed, you can run a local server that will live reload the docs when changes are made, and allow you to preview the changes locally. To set up Hugo, follow the steps below.

1. Get the **extended** Hugo binary. For Hugo installation, refer to [Install Hugo](https://gohugo.io/getting-started/installing/). The extended binary is required for some of the features that the O3DE documentation site uses.

1. To install **npm**, follow the instructions in the [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) documentation. Installing npm also installs **Node.js**.

1. To install dependencies, run the following command from the `o3de.org` repository:

    ```shell
    cd <path-to-repo>/o3de.org
    npm install
    ```

### Run a Hugo server

Now you can test your setup by running a local Hugo server and viewing the O3DE docs produced by your clone.

1. In the terminal `cd` to the root of your o3de.org clone.

1. Start the server.

    ```cmd
    $ hugo server
    Start building sites …

                    |  EN
    -------------------+--------
    Pages            |   902
    Paginator pages  |     0
    Non-page files   |     0
    Static files     | 17173
    Processed images |     0
    Aliases          |     0
    Sitemaps         |     1
    Cleaned          |     0

    Built in 10394 ms
    Watching for changes in C:\O3DE\o3de.org\{assets,content,layouts,package.json,static}
    Watching for config changes in C:\O3DE\o3de.org\config.toml
    Environment: "development"
    Serving pages from memory
    Running in Fast Render Mode. For full rebuilds on change: hugo server --disableFastRender
    Web Server is available at http://localhost:1313/ (bind address 127.0.0.1)
    Press Ctrl+C to stop
    ```

1. The above command starts a server on `localhost` using an available port (usually `1313`). The command prints the address and port in the console. You can view your server in a web browser. The server will continue to run as long as the terminal that is running the server remains open. If you need to view the site over a network connection, you can use the command below to specify a server and port.

    ```shell
    hugo server --port 44541 --bind=0.0.0.0
    ```

    {{< note >}}
If you use the **macOS** platform for docs development, you must run Hugo with the `--watch=false` switch enabled. For example:

```bash
hugo server --port 44541 --bind=0.0.0.0 --watch=false
```
    {{< /note >}}

## Create a branch

Now that you're set up, you can create a branch and start contributing! All your work should be done in branches. You commit from branches in your clone to your fork. Branches will help you compartmentalize your contributions, and make it easy for other contributors to collaborate with you. By default, your clone has a single branch named `main`. To view the list of branches, from your root `o3de.org` directory, use the command below.

```shell
git branch
```

Create a new branch:

{{< important >}}
As a general rule follow, the steps in [Sync your clone](#sync-your-clone) before creating a new branch to ensure your new branch is based on the latest from `o3de:main`.
{{< /important >}}

1. Create a new branch.

    ```shell
    git branch <new-branch-name> upstream/main
    ```

    {{< note >}}
When naming branches, we recommend a short dash separated name that clearly denotes the contents of the branch. For example, `camera-follow-tutorial`.
    {{< /note >}}

1. Switch to your new branch.

    ```shell
    git checkout <new-branch-name>
    ```

1. Immediately push your branch to your fork, so it appears in your fork on GitHub.

    ```shell
    git push origin
    ```

If you go to your fork on GitHub, you can view this new branch in the branch list by choosing the **main** button in the upper-left.

## Maintain your branch

As you work on contributions and respond to feedback in the PR process, you may need to get the latest changes from `o3de.org:main`. To maintain a branch, follow the steps below:

1. Update your fork. Follow the steps in [Sync your clone](#sync-your-clone) to get the latest commits and push them to the main branch of your fork.

1. Switch to the branch you want to update.

    ```shell
    git checkout <branch-name>
    ```

1. Pull the changes from the main branch of your fork into your working branch.

    ```shell
    git pull
    ```

1. Push the changes to your fork on GitHub.

    ```shell
    git push origin
    ```

At this point, you can start making contributions. We highly recommend you continue reading this guide, however, so that you understand the directory structure, style, and terminology of the O3DE documentation. To learn more, continue to the next topic, [O3DE Docs Structure](/docs/contributing/to-docs/o3de-docs-structure).
