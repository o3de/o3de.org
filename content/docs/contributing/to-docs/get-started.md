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

1. Fork `o3de.org`. Choose the **Fork** button in the upper-right corner of the page. For more information on creating forks, refer to GitHub Docs, [Fork a repo](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo).

You can access your fork in your repositories or by going to `https://github.com/<your-username>/o3de.org`.
For more information on working with forks, refer to GitHub Docs, [Working with forks](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/working-with-forks).


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

Your clone must point to two remote repositories: your fork (origin) and the source repo (upstream). By default, your clone's `origin` already points to your fork. However, you must set up `upstream` to point to the source repository for O3DE docs, `o3de/o3de.org`. Setting up upstream allows you pull new changes into your fork and from `o3de.org:main`. Later, you'll also need to submit changes to upstream in the form of a PR. PRs are the only way you can submit changes, you cannot push directly to upstream. 

In a terminal, perform the steps below:

1. Set the upstream for your clone to the source O3DE docs repo.

    ```shell
    git remote add upstream https://github.com/o3de/o3de.org.git
    ```

1. Disallow pushing to the source O3DE docs repo from your clone.

    ```shell
    git remote set-url --push upstream NONE
    ```
For more information about this step, refer to the GitHub Docs, [Configuring a remote for a fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/configuring-a-remote-for-a-fork). 


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
For GitHub accounts created prior to July 18, 2017, use `username@users.noreply.github.com` as the email address. For accounts created after that date, use your GitHub-provided no-reply email address. The new no-reply email address is a seven-digit ID number and your username in the form of `ID+username@users.noreply.github.com` which can be found in the email tab of your GitHub account settings. For more information about setting your commit email address, refer to the [Setting your commit email address instructions](https://docs.github.com/en/github/setting-up-and-managing-your-github-user-account/managing-email-preferences/setting-your-commit-email-address).
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

For more information on creating a pull request, refer to [Creating a pull request](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

### Respond to feedback

Feedback comes in the form of comments that you can address by editing files in your local branch, and *suggestions* that can be committed from the GitHub PR interface. It's important to understand that the PR process is a collaborative discussion. Every comment does not need to be addressed, and every suggestion does not need to be integrated. When the required number of reviewers approve of your contribution, it can be integrated. Here are a few tips for addressing suggestions and comments:

* To commit multiple suggestions, use the batch functionality to integrate multiple suggestions in a single commit.
* Do try to acknowledge all the feedback you are given. This doesn't mean to integrate every comment and commit every suggestion. It simply means to avoid resolving comments and suggestions without action or a response. Embrace collaboration.
* When addressing comments, maintain the relative conversation in the PR, edit the topics as necessary, and commit the changes to your fork/branch. Your new commits will be automatically added to the PR.
* Make sure to request a re-review of your new commits if required.

For more information on incorporating PR feedback, refer to [Incorporating feedback in your pull request](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/incorporating-feedback-in-your-pull-request).

### The PR merge

When you have an approval from at least one docs reviewer and at least one technical reviewer, your PR can be merged. Never merge your own PRs. Docs maintainers are responsible for merging the PR.
=======
---
linktitle: Get Started
title: Get Started as an O3DE Documentation Contributor
description: What you need to know before contributing to the Open 3D Engine (O3DE) documentation project.  
toc: true
weight: 200
---

Anyone can be a contributor to **Open 3D Engine (O3DE)** docs and determine their own level of participation. Here, we'll help you navigate the documentation process so you can decide how you'd like to contribute.

## Before you do anything

It's important to be familiar with the O3DE documentation and get a feel for its style. Take some time to browse the [O3DE documentation](/docs). The documentation consists of several guides:

* [Welcome](/docs/welcome-guide): A friendly introduction and overview of O3DE. The purpose of this guide is to get new users, particularly those without much prior experience, comfortable with O3DE. If you have a gift for simplifying technical concepts, this is a great area to investigate for contributions.
* [Tutorials and Examples](/docs/learning-guide): Guided tutorials, samples, and cookbooks to help users learn O3DE. If you are an O3DE user, submitting recipes for the cookbooks is a great way to contribute new documentation without investing much time.
* [User Guide](/docs/user-guide): Feature and reference documentation for the various editors, tools, components and Gems provided with O3DE. Feature reference is in-depth and we sometimes miss coverage on important features and the finer details of O3DE. Contributions to the User Guide are always needed and greatly appreciated.
* [Atom Renderer](/docs/atom-guide): Feature and reference documentation for Atom Renderer and its tools and editors.
* [Tools UI Developer Guide](/docs/tools-ui): The style and implementation guide for the UI used throughout the tools of O3DE and Atom Renderer.
* [API Reference](/docs/api): Automatically generated API reference for O3DE.
* [Contribute](/docs/contributing): You are here. Guidelines for contributing to O3DE and its documentation.
* [Release Notes](/docs/release-notes): Release notes for O3DE including new features, fixes, and known issues.

Some documentation, such as **API Reference**, is generated automatically. Some documentation, such as **Release Notes**, is maintained and provided by O3DE SIGs and governance.

{{< note >}}
Participation as a contributor requires a [GitHub account](https://github.com/signup).
{{< /note >}}

Don't want to read tiresome words, and prefer a snappy video to help you get started? Watch this video, instead!

{{< youtube-width id="DGz9Clo6EKw" title="Contributing to O3DE Documentation" >}}

## Technical information

The o3de.org site uses the [Hugo static site generator](https://gohugo.io/). Documentation for O3DE uses [Goldmark](https://www.markdownguide.org/tools/hugo/), a CommonMark compliant Markdown processor. Contributing to O3DE documentation is easy, quick, and requires no prior experience with web development. The documentation source files are easy to read and require very few markdown elements. For information on setting up an environment so that you can contribute to O3DE documentation, see [Set Up a Local O3DE Docs Repo](./o3de-docs-repo-setup).

## Begin with issues

After you create a GitHub account, your first stop should the current O3DE docs issues. See the [O3DE repository good-first-issues](https://github.com/o3de/o3de.org/issues?q=is%3Aopen+is%3Aissue+label%3A%22good-first-issue%22). Note the search field at the top of the page is specifying issues labeled **good-first-issue**. These are issues that have been determined to be good entry points for new contributors.

Issues aren't just bugs and errors found in the documentation. All contributions, including new feature documentation, tutorials, recipes, site maintenance, and site improvements, are tracked in issues. For more information on issues, see [Work with issues](./work-with-issues).

## Move on to pull requests

After getting familiar with issues, have a look at the current [O3DE repository pull requests (PRs)](https://github.com/o3de/o3de.org/pulls). PRs are contributions that have been submitted to the main repository.

Open PRs are currently being peer reviewed by contributors for several potential issues:

* technical accuracy
* spelling
* grammar
* clarity
* style

Here are some important guidelines you should keep in mind about PRs in O3DE:

* Contributors should **not** merge their own PRs.
* Every PR must have at least **two** approvals by someone other than the contributor before being merged into main.
* Check the open PR list before creating a new one. Browsing the open PR list gives you an idea what the current active topics are, and shows you how different types of content are reviewed. It's a great idea to take a look at current PRs, even if you have not been requested as a reviewer.

## Documentation process overview

Now that you are familiar with the O3DE docs, and have had some exposure to issues and PRs, let's have a look at the high-level process for making a contribution to documentation.

1. **Agree to the O3DE Contributor License Agreement (CLA):** Refer to the project's [CONTRIBUTING.md](https://github.com/o3de/o3de.org/blob/main/CONTRIBUTING.md) for details.

1. **Create a new issue or claim an existing issue:** All contributions begin with a GitHub issue. You can file an issue and then assign it to yourself, or you can claim an existing issue. When creating a new issue, search the current issue list to ensure the issue hasn't already been submitted.

   During issue triage, other community members might ask you for additional information, and being responsive is the best way to make sure your issue stays relevant. When claiming issues for yourself as a contributor, try to be mindful of the PRs and issues your fellow contributors are working with to ensure your contributions are supportive and collaborative. Be communicative on your issues. Leave comments as your work progresses, and respond to comments on your issues, moving discussions to a pull request when you create one. For more information, see [Work with issues](./work-with-issues).

1. **Create a branch on your fork for the issue:** Contributions can't be submitted directly to the main O3DE documentation repository. You must fork the main repository, and submit pull requests to the main repository from your fork/branch.

   It's good practice, and very helpful to contributors who might review your PRs, to create a new branch on your fork for each new issue. Having small branches containing only the changes required for the issue can expedite the PR review process and lend themselves to collaboration with other contributors. For large issues, consider breaking the work down into smaller issues, creating new branches for each smaller issue. The smaller the number of changes in your branch, the easier it will be to review and merge into main. For more information on creating a fork and branches, see the [Set Up a Local O3DE Docs Repo](./o3de-docs-repo-setup) topic in this guide.

1. **Make changes:** The O3DE documentation is written in [CommonMark Markdown](https://commonmark.org/) and processed with [Goldmark](https://www.markdownguide.org/tools/hugo/). We recommend using an editor with robust Markdown support during your writing, so that you can get live previews and catch any linting errors. During your writing, follow our [Style Guide](./style-guide) to help your review go smoothly and quickly.

1. **Commit your changes:** Before you can submit a PR, you must commit your changes and push them to a branch on your o3de.org fork. Make sure to do the following:

   1. Make sure you branch is up-to-date with `o3de.org/main` before committing.

   2. Sign-off on the changes you commit. The sign-off is a [*Developer Certificate of Origin (DCO)*](https://github.com/apps/dco). The DCO is your certification that your contribution is your own original work, or that you otherwise have the right to submit the work. For more information on committing your changes, see the [Submit a PR](./submit-a-pr) topic in this guide.
   {{< important >}}You must sign-off on all commits. When committing changes with `git commit`, use the `-s` option to sign-off. When committing individual suggestions and batch suggestions in the GitHub PR interface, paste your sign-off (`Signed-off-by: Your Name <yourname@yourdomain.com>`) into the comment field before committing the suggestion.
   {{< /important >}}

1. **Submit a pull request:** Once you've committed your changes to your own fork/branch, you can create a pull request to `o3de.org/main`. When submitting a pull request, ensure the following:

   1. The PR only contains commits and changes you want reviewed for the PR.

   2. If the PR has a related issue, the issue number must be included in the PR title.

   3. The PR message briefly and clearly explains the changes you are submitting.

   4. You have requested at least two reviewers. Approval from two reviewers is required to merge a PR - if your contribution is deeply technical, it also requires a third review from an O3DE code contributor for accuracy. The more reviewers on your PR, the sooner you're likely to be signed off on it - but never request more than five reviewers (max 3 editorial, max 2 technical) without prior approval from the D&C SIG.

   5. The PR contains the appropriate *Labels*, if required. Labels make it easier to sort through lists of PRs and may specify whether a PR is a work in progress, seeking feedback and review, that should not be merged into `o3de.org/main`. For more information, see [Submit a PR](./submit-a-pr).

1. **Respond to PR feedback:** Feedback will come in the form of comments and *suggestions* that can be committed from the GitHub PR interface. It's important to understand that the PR process is a collaborative discussion. Every comment does not need to be addressed, and every suggestion does not need to be integrated. When the contributor and two reviewers approve of the contribution, it can be integrated. Here are a few tips for addressing suggestions and comments:

   1. To commit multiple suggestions, use the batch functionality to integrate multiple suggestions in a single commit.

   2. When addressing comments, maintain the relative conversation in the PR, edit the topics as necessary, and commit the changes to your fork/branch. Your new commits will be automatically added to the PR.

   3. Make sure to request a re-review of your new commits if required. 

1. **The PR is merged and closed:** When the comments and suggestions have been addressed, and two reviewers have approved the PR, it can be merged into `o3de.org/main`. **Never** merge your own PRs, the final reviewer to sign off is responsible for the merge. The PR is automatically closed when merged.

1. **The related issue is closed:** If you have included a related issue number in the title of your PR, the related issue will be automatically closed when the PR is closed. Your contribution is complete. Congrats!
