---
linkTitle: Docs Repo Setup
title: Setup a Local O3DE Docs Repo
description: A guide to working with the Open 3D Engine (O3DE) documentation repository.
weight: 500
toc: true
---

{{< preview-new >}}

In this topic, you'll learn to create your own fork of the Open 3D Engine (O3DE) documentation and get a handful of tips on creating and maintaining branches to ensure your pull request (PR) submissions go smoothly.

## Prerequisites

O3DE documentation uses the *fork and pull model* for contributions. As a contributor, you maintain a fork (your own repository of the O3DE documentation) on GitHub and work locally on your computer to edit documentation. You then submit PRs from your fork for review. You need to set up a few things before you proceed:

* Install **Git** version control software. Get Git here [Git Downloads](https://git-scm.com/downloads).

* Sign up for a GitHub account here [Join GitHub](https://github.com/join?ref_cta=Sign+up).

* Create SSH keys for GitHub. For more information, see [Connecting to GitHub with SSH](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh).

* Install an editor for making changes to Markdown (`.md`) files. You can use any editor, but we do recommend one that supports Markdown linting. VS Code is commonly used by contributors and you can get it here [Microsoft VS Code](https://code.visualstudio.com/download).

## What the fork?

The contribution process hs these four basic steps:

1. Create branches for your changes in your fork of the O3DE docs repo.

1. Commit your changes to branches on your fork.

1. Submit PRs from the branches on your fork to `o3de:main`.

1. Respond to feedback in your PRs until the changes are approved and merged.

A fork is your own copy of `o3de:main` on GitHub. You can do anything you like within your fork, though it is recommend that keep your fork synced with `o3de:main`, and work within branches in your fork. Working this way ensures the integrity of `o3de:main` and makes it easy for you to work at your own pace, experiment with changes along the way, and collaborate with other contributors. To create a fork, perform the steps below:

1. Go to the [O3DE docs repo](https://github.com/o3de/o3de.org).

2. Fork `o3de:main`. Choose the **Fork** button in the upper right hand corner of the page. For more information on creating forks, see [Fork a repo](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo).

3. Find your fork of `o3de:main`. Choose your profile icon in the upper-right corner of the GitHub page. Select **Your repositories** from the list. On your repositories page, choose the **o3de.org** repository. The page displays a directory listing in a table of your fork of `o3de:main`, with some information about recent changes.

{{< important >}}
There is one very important thing to take note about your fork. At the very top of the repo listing, GitHub shows the status of your fork. **"This branch is even with o3de:main."** If your fork or the selected branch has not been synced, the message will tell you how many commits behind it is. If you've made commits to the fork or branch that have not been merged into `o3de:main`, it will tell you how many commits ahead it is. You need to maintain your fork and its branches to keep them current with `o3de:main`. You learn to maintain your fork below in [Sync your clone](#sync-your-clone).
{{< /important >}}

For more information on working with forks, see [Working with forks](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/working-with-forks).
### Clone your fork

*Cloning* is the process of creating a local copy of a repo. To create a clone of your fork, in a terminal, perform the steps below:

1. Get the URL for your clone. On the page for your fork, Choose **Code > Clone > SSH** and copy the URL.

1. Open a terminal and navigate to a root directory where you'd like to place your local repository.

1. In the terminal, run the command below, inserting the URL you copied in Step 2:

    ```shell
    git clone <the SSH URL you copied in step 2> 
    ```

### Set the upstream for your clone

`o3de:main` is the source of record for O3DE docs. You need to be able to pull new changes into your fork and from `o3de:main`, but you should **never** push directly to `o3de:main`. Changes are submitted  through PRs. In a terminal, perform the steps below:

1. `cd` into your new `o3de.org` clone.

    ```shell
    cd o3de.org
    ```

1. Set the upstream for your clone to the main O3DE docs repo.

    ```shell
    git remote add upstream git@github.com:o3de/o3de.org.git
    ```

1. Disallow pushing to the main O3DE docs repo from your clone.

    ```shell
    git remote set-url --push upstream NONE
    ```

### Sync your clone

Now you can *sync* your clone. Syncing is the process of pull the latest changes from a source repository to a clone. In a terminal, in the root of your `o3de.org` clone, perform the steps below:

1. Make sure you are in the main branch.

    ```shell
    git checkout main
    ```

1. Fetch the latest upstream commits from `o3de:main`.

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

{{< important >}}
You must perform the above four steps whenever you need to ensure your fork is synced with `o3de:main`, such as before creating a new branch, or before syncing a branch to submit a PR.
{{< /important >}}

## Set up Hugo

Hugo is the static site builder used by O3DE documentation. Once you have Hugo installed, you can run a local server that will live reload the docs when changes are made, and allow you to preview the changes locally. To setup Hugo, follow the steps below.

1. Get the **extended** Hugo binary here [Hugo release on GitHub](https://github.com/gohugoio/hugo/releases). The extended binary is required for some of the features the O3DE documentation site uses. On Windows, you can use [Chocolatey](https://chocolatey.org/) to install Hugo extended if you prefer.

1. If you do not use Chocolatey, you need to make sure the Hugo binary is in your executable environment path so you can run it from a terminal.

    * On Linux or MacOS place the binary in a subdirectory of your `$PATH` environment variable, such as in `$HOME/bin` or `$HOME/.local/bin`. If you place the binary in a directory that is not in your `$PATH`, you must add the directory to your `$PATH` permanently. To add the directory containing the Hugo extended binary to your `$PATH` , use the command below:

        ```shell
        echo "export PATH=<full path to Hugo binary>:$PATH" >> $HOME/.zshrc
        ```

    * On Windows, you need to add the directory containing the Hugo extended binary to your `%PATH%` environment variable. To add a directory to your `%PATH%`, use the command below:

        ```shell
        setx path "<full path to Hugo binary>:%PATH%"
        ```

1. Open a new terminal to ensure the path environment variable updates.

1. You need to add the Node.js bootstrap package. Bootstrap contains some modules used to style the O3DE documentation site. Get Node.js here [Download Node.js](https://nodejs.org/en/download/) and run the installer.

1. In the terminal `cd` to the root of your o3de.org clone.

1. Use `npm` to install bootstrap with the command below:

    ```shell
    npm install bootstrap
    ```

### Run a Hugo server

Now you can test you set up by running a local Hugo server and viewing the O3DE docs produced by your clone.

1. In the terminal `cd` to the root of your o3de.org clone.

1. Start the server.

    ```shell
    hugo server
    ```

1. The above command starts a server at [http://localhost:1333/](http://localhost:1333/). You can click the link to view your server in a web browser. The server will continue to run as long as the terminal that is running the server remains open. If you need to view the site over a network connection, you can use the command below to specify a server and port.

    ```shell
    hugo server --port 44541 --bind=0.0.0.0
    ```

## Create a branch

Now that you're set up, you can create a branch and start contributing! All your work should be done in branches. You commit from branches in your clone to your fork. Branches will help you compartmentalize your contributions, and make it easy for other contributors to collaborate with you. By default, your clone has a single branch named `main`. To see the list of branches, from your root `o3de.org` directory, use the command below.

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
    When naming branches, use a short dash separated name that clearly denotes the contents of the branch. For example, `camera-follow-tutorial`.
    {{< /note >}}

2. Switch to your new branch.

    ```shell
    git checkout <new-branch-name>
    ```

3. Immediately push your branch to your fork, so it appears in your fork on GitHub.

    ```shell
    git push origin
    ```

If you go to your fork on GitHub, you can see this new branch in the branch list by choosing the **main** button in the upper-left.

## Maintain your branch

As you work on contributions and respond to feedback in the PR process, you may need to get the latest changes from `o3de:main`. To maintain a branch, follow the steps below:

1. Update your fork. Follow the steps in [Sync your clone](#sync-your-clone) to get the latest commits and push them to the main branch of your fork.

1. Switch to the branch you want to update.

    ```shell
    git checkout <branch-name>
    ```

1. Pull the changes from the main branch of your fork into your working branch.

    ```shell
    git pull
    ```

1. Push the changes to your branch on GitHub.

    ```shell
    git push origin
    ```

At this point, you can start making contributions. We highly recommend you continue with this guide, however, so that you understand the directory structure, style, and terminology of the O3DE documentation. To learn more, continue to the next topic, [O3DE Docs Structure](/docs/contributing/to-docs/o3de-docs-structure).
