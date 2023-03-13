---
linktitle: Get Started
title: Get Started Contributing to Docs
description: Get started contributing to Open 3D Engine (O3DE) docs by setting up your local repo, setting up your writing environment, and submitting docs. 
toc: true
weight: 200
---

This section will help you get started on contributing to **Open 3D Engine (O3DE)** documentation. You'll learn how to set up your writing environment and about the processes you need to get your documentation from text editor to the official O3DE documentation. 

O3DE documentation uses the [fork and pull model](https://en.wikipedia.org/wiki/Fork_and_pull_model) for contributions. As a contributor, you maintain a fork (your own repository of the O3DE documentation) on GitHub, and work locally to edit documentation. You then submit PRs from your fork for review.

{{< note >}}
The steps on this page use the terminal to run Git commands. You may complete these steps directly on GitHub and refer to the GitHub's [Repositories](https://docs.github.com/en/repositories) documentation, or through an alternative tool of your choice, such as [GitHub Desktop](https://desktop.github.com/) or another client.
Whatever method you choose, ensure that you're completing the correct operations that are outlined on this page.
{{< /note >}}

## Prerequisites

* Sign up for a GitHub account here [Join GitHub](https://github.com/join?ref_cta=Sign+up).

* Install **Git** version control software. Get Git here [Git Downloads](https://git-scm.com/downloads).

* Install an editor for making changes to Markdown (`.md`) files. You can use any editor, but we do recommend one that supports Markdown linting. VS Code is commonly used by contributors and you can get it here [Microsoft VS Code](https://code.visualstudio.com/download).


## Setting up a local o3de.org repo

In this section, you'll learn how to create your own fork of the O3DE documentation. 


### Create a fork

A *fork* is your own copy of the `o3de.org` source repo on GitHub. You can do anything you like within your fork, though it is recommended that you keep your fork synced with the source repo, and work within branches in your fork. Working this way ensures the integrity of `o3de.org` and makes it easy for you to work at your own pace, experiment with changes, and collaborate with other contributors. 

To create a fork, perform the following steps:

1. Go to the [O3DE documentation repository](https://github.com/o3de/o3de.org).

1. Fork `o3de.org`. Choose the **Fork** button in the upper-right corner of the page. For more information on creating forks, refer to GitHub Docs, [Fork a repo](https://docs.github.com/en/get-started/quickstart/fork-a-repo).

You can access your fork in your repositories or by going to `https://github.com/<your-username>/o3de.org`.
For more information on working with forks, refer to GitHub Docs, [Working with forks](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks).


### Clone your fork

*Cloning* is the process of creating a local copy of a repo. To create a clone of your fork, in a terminal, perform the steps below:

1. On the webpage of your fork, choose the green **Code** button and copy the HTTPS URL. 
 
    {{< note >}}
Although an SSH protocol is not required to contribute to docs, you may choose to clone with an SSH URL instead of HTTPS. If so, you must complete additional steps. For more information, refer to GitHub Docs, [Cloning with SSH URLs](https://docs.github.com/en/get-started/getting-started-with-git/about-remote-repositories#cloning-with-ssh-urls). 
    {{< /note >}}

1. In the terminal, navigate to a root directory where you'd like to place your local repository, and clone it there.

    ```shell
    cd <root-directory>
    git clone <https://github.com/<your-username>/o3de.org.git> 
    ```

### Set the upstream for your clone

Your clone must point to two remote repositories: your fork (origin) and the source repo (upstream). By default, your clone's `origin` already points to your fork. However, you must set up `upstream` to point to the source repository for O3DE docs, `o3de/o3de.org`. Setting up upstream allows you to pull new changes into your fork and from `o3de.org:main`. Later, you'll also need to submit changes to upstream in the form of a PR. PRs are the only way you can submit changes, you cannot push directly to upstream. 

In a terminal, perform the steps below:

1. Set the upstream for your clone to the source O3DE docs repo.

    ```shell
    git remote add upstream https://github.com/o3de/o3de.org.git
    ```

1. Disallow pushing to the source O3DE docs repo from your clone.

    ```shell
    git remote set-url --push upstream NONE
    ```
For more information about this step, refer to the GitHub Docs, [Configuring a remote for a fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/configuring-a-remote-repository-for-a-fork). 


### Branches

There are two important branches in `o3de.org` repo: `main` and `development`. Depending on what docs you're contributing, you can choose to contribute your changes to either branch. 

| Branch | Description |
| --- | --- |
| `main` | If you're contributing docs for a feature that already exists in a stable version of O3DE, or [`o3de:main`](https://github.com/o3de/o3de/tree/main). |
| `development` | If you're contributing docs for a feature that's still in development, or in [`o3de:development`](https://github.com/o3de/o3de/tree/development). |

Decide ahead of time which branch you want to contribute your docs to. It's important to know because it can help you keep your local changes synced with the correct upstream branch, especially when you're doing one of the following things: 
- Creating a new branch
- Syncing your branch
- Creating a PR


### Sync your clone

Throughout the writing process, in your clone, you must *sync* whatever branch you're working in with the appropriate upstream branch, `main` or `development`. This ensures that your branch is up-to-date with the latest commits and can help you avoid issues when creating a PR. It's good practice to do this step frequently, such as before creating a new branch, or creating a PR.

To sync your branch:

1. Checkout the local branch that you want to sync.

    ```shell
    git checkout <branch-name>
    ```

1. Fetch the latest commits from upstream, which you set to point to the remote source `o3de.org` in the previous section.

    ```shell
    git fetch upstream
    ```

1. Pull the latest commits from the appropriate upstream branch into your local branch.

    ```shell
    git merge upstream/[main|development]
    ```

Alternatively, the following [`git pull`](https://git-scm.com/docs/git-pull/2.22.0) command fetches and merges: 
```shell
git pull upstream [main|development]
```

As an example workflow, you may want to keep your fork's `main` branch synced with the source `o3de.org:main` branch. The set of operations to do that look like this: 

```shell
git checkout main
git fetch upstream
git merge upstream/main
git push origin main
```


## Writing process

This section covers the technical details of the writing process, such as setting up your writing environment. 

### Create a branch

All your work should be done in branches. You commit from branches in your clone to your fork. Branches help you compartmentalize your contributions, and make it easy for other contributors to collaborate with you. 

As discussed earlier, syncing your branch with an upstream branch keeps your branch up-to-date and helps prevent friction when submitting your changes. You either want to sync with `o3de.org:main` or `o3de.org:development`. 

To create a branch that's already synced with the latest: 

1. Fetch from upstream.

    ```shell
    git fetch upstream
    ```

1. Create a branch that points at the latest `upstream/main` or `upstream/development`, and switch to that branch.

    ```shell
    git switch -c <branch-name> upstream/[main|development]
    ```

    {{< note >}}
When naming branches, we recommend a short dash-separated name that clearly denotes the contents of the branch. For example, `camera-follow-tutorial`.
    {{< /note >}}


1. The previous step creates your branch only in your clone. You must push your branch to your fork, so it appears in your fork on GitHub.

    ```shell
    git push origin <branch-name>
    ```

### Sync, write, add, commit, and push

As you write your docs iteratively and make changes as part of the PR process, you will cycle through the following Git operations: 

1. **`git fetch upstream`** and **`git merge upstream/[main|development]`** -- Keep your branch up-to-date with the latest commits.
1. Write your docs using a text editor. Ensure that your docs are technically accurate and follow the [O3DE Style Guide](./style-guide/). 
1. **`git add`** -- Adds your files to local Git staging. Do not add *any* files that are not work you are submitting for review.
1. **`git commit -s -m "<message>"`** --  Writes your changes to the branch history in preparation for submission. `-s` signs off DCO for your commit. Your initial commit message should reference the corresponding GitHub issue and provide a clear assessment of the work you did.
1. **`git push origin <branch-name>`** -- Pushes your commit to your remote fork (_origin_). 

Repeat these steps as needed. When you're done writing, each of your commits should have a DCO sign-off and contain only the changes that you made. The commits must be pushed to your remote fork. Later, you will submit a PR to merge your changes to the remote source. 


### DCO sign-off your commits

DCO stands for [*Developer Certificate of Origin (DCO)*](https://github.com/apps/dco). The DCO sign-off is your certification that your contribution is your own original work, or that you otherwise have the right to submit the work. At the time of each of your commits, you must add a DCO sign-off by using `-s` or `--signoff`. A PR that contains a commit that wasn't signed off will not be reviewed or merged. DCO sign-off is easy to do, and just as easy to forget.

A DCO signature appears in the last part of your commit message in the form `Signed-off-by: user.name <user.email>"`, where _user.name_ and _user.email_ are the `user.name` and `user.email`, respectively, from your `.gitconfig` file.

{{< important >}}
In some cases, you may need to manually add a `Signed-off-by:` line to your commit message, for example if you're using a GUI tool that doesn't support DCO sign off. 
For GitHub accounts created prior to July 18, 2017, use `username@users.noreply.github.com` as the email address. For accounts created after that date, use your GitHub-provided no-reply email address. The new no-reply email address is a seven-digit ID number and your username in the form of `ID+username@users.noreply.github.com` which can be found in the email tab of your GitHub account settings. For more information about setting your commit email address, refer to the [Setting your commit email address instructions](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-email-preferences/setting-your-commit-email-address).
{{< /important >}}

### Preview your docs

As you write, you should preview of your docs to ensure it's in the correct format. Because the o3de.org website is built on Hugo, the best way to preview your docs is by running Hugo on your local machine. For information on how to set up and use Hugo, refer to the o3de.org [`README.md`](https://github.com/o3de/o3de.org#readme) file. 

Additionally, a quick way to preview your docs is by using VS Code's [Editor and preview synchronization](https://code.visualstudio.com/docs/languages/markdown#_editor-and-preview-synchronization) feature for Markdown. This feature is limited to VS Code's Markdown support, so it won't render any features that are unique to Hugo, such as shortcodes. 

Finally, you can view and share a preview of your docs when they are in a PR. The Netlify web deployment service creates a preview for each PR. This takes a few minutes to deploy after creating the PR, and refreshes every time you push a commit. You can access the deployed preview at the bottom of the PR webpage: Find **netlify/o3deorg/deploy-preview — Deploy Preview ready!** and click **Details**. 


## Submitting docs

When you make changes or create new docs, you must create a pull request (PR) for review before the changes can be merged into `o3de.org`. PRs allow peer contributors to review contributions for several potential issues, including technical accuracy, spelling, grammar, clarity, and style. 

The current list of active PRs is here [O3DE repository pull requests (PRs)](https://github.com/o3de/o3de.org/pulls).


### Create a PR

PRs are created in the GitHub web interface from your branch. Go to your fork on GitHub and perform the steps below.

1. In the **Pull Request** tab, select the green **New pull request** button to create a new PR.

1. In the **Comparing changes** page, you will compare your fork's branch against the remote source's branch. Ensure that the **base**, which you're comparing against, points to `o3de/o3de.org:main` or `o3de/o3de.org:development`. The **head repository** should be your fork. Then, in the **compare** dropdown, choose the branch that you want to submit.

1. Verify that the changed files contains only the changes you want to submit. Only the commits you made should be listed. If there are more commits than you expected, stop here and make sure to properly sync your branch using the fetch, merge, and push commands from the [iteration steps](#sync-write-add-commit-and-push) explained earlier.

1. Choose the green **Create pull request** button to open the **Open a pull request** page. 

1. Add a descriptive title and description. Be sure to include the issue number in the title of the PR if the PR is addressing an existing issue.

1. In **Reviewers**, add **o3de/docs-reviewers** so they can review your PR. Add additional reviewers as appropriate. If you are submitting technical docs, add reviewers who can verify the technical accuracy of your docs. 

1. Choose the **Create pull request** to submit the PR.

If you go to the main o3de.org repo on GitHub and refer to [O3DE repository pull requests (PRs)](https://github.com/o3de/o3de.org/pulls), your new PR appears at the top of the list.

For more information on creating a pull request, refer to [Creating a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request).

### Respond to feedback

Feedback comes in the form of comments that you can address by editing files in your local branch, and *suggestions* that can be committed from the GitHub PR interface. It's important to understand that the PR process is a collaborative discussion. Every comment does not need to be addressed, and every suggestion does not need to be integrated. When the required number of reviewers approve of your contribution, it can be integrated. Here are a few tips for addressing suggestions and comments:

* To commit multiple suggestions, use the batch functionality to integrate multiple suggestions in a single commit.
* Do try to acknowledge all the feedback you are given. This doesn't mean to integrate every comment and commit every suggestion. It simply means to avoid resolving comments and suggestions without action or a response. Embrace collaboration.
* When addressing comments, maintain the relative conversation in the PR, edit the topics as necessary, and commit the changes to your fork/branch. Your new commits will be automatically added to the PR.
* Make sure to request a re-review of your new commits if required.

For more information on incorporating PR feedback, refer to [Incorporating feedback in your pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/incorporating-feedback-in-your-pull-request).

### The PR merge

When you have an approval from at least one docs reviewer and at least one technical reviewer, your PR can be merged. Never merge your own PRs. Docs maintainers are responsible for merging the PR.
