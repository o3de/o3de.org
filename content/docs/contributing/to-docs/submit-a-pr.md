---
linkTitle: Submit a PR
title: Submit a PR to O3DE Docs 
description: A guide to submitting a PR to the Open 3D Engine (O3DE) documentation repository.
weight: 450
toc: true
---

When you make an edit or create a new topic in the **Open 3D Engine (O3DE)** docs, you need to submit a pull request (PR) for review before the changes can be merged into `o3de.org:main`. The current list of active PRs is here [O3DE repository pull requests (PRs)](https://github.com/o3de/o3de.org/pulls). PRs allow peer contributors to review contributions for several potential issues, including the following:

* Technical accuracy
* Spelling
* Grammar
* Clarity
* Style

Before submitting a PR, ensure your contributions meet the guidelines below:

* Files in the PR are placed in the proper directories. Refer to [O3DE Docs Structure](/docs/contributing/to-docs/o3de-docs-structure).
* Contributions adhere to the O3DE Documentation style. Refer to [O3DE Documentation Contribution Style Guide](/docs/contributing/to-docs/style-guide/overview).
* Contributions use O3DE terms correctly. Refer to [O3DE Documentation Terminology](/docs/contributing/to-docs/terminology).
* All commits in the PR have a proper *DCO sign-off*. Refer to [Commit your changes](#commit-your-changes) below.

* The PR only contains commits and changes you want reviewed for the PR.
* If the PR has a related issue, the issue number is part of the PR title.

## The PR Process

Despite only having five steps, the PR process can take some time depending on the availability of reviewers and the length and technical depth of the submitted changes. You can help keep PRs moving by quickly responding to feedback and review requests. The PR process is summarized below.

1. Commit your changes to a branch on your fork.
1. Create a PR against `o3de.org:main` from your branch.
1. Respond to feedback from reviewers.
1. When the PR receives two approvals, plus any additional required approval such as copyedit or technical review, it can be merged.

{{< important >}}
**Never** merge your own PRs. PRs require two approvals, and may require an additional approval from a technical reviewer. The last reviewer to approve the PR should merge it into `o3de.org:main`.
{{< /important >}}

### Commit your changes

The first step in the PR process is to commit your changes to a branch on your fork. You must add a DCO sign-off to all of your commits, otherwise your PRs will not be reviewed or merged. DCO stands for [*Developer Certificate of Origin (DCO)*](https://github.com/apps/dco). The DCO sign-off is your certification that your contribution is your own original work, or that you otherwise have the right to submit the work. DCO sign-off is easy to do, and just as easy to forget.

{{< important >}}
If you use the GitHub web UI to make your commit, you must add a `Signed-off-by:` line to your commit message or the DCO check will fail. For GitHub accounts created prior to July 18, 2017, use `username@users.noreply.github.com` as the email address. For accounts created after that date, use your GitHub-provided no-reply email address. The new no-reply email address is a seven-digit ID number and your username in the form of `ID+username@users.noreply.github.com` which can be found in the email tab of your GitHub account settings. For more information about setting your commit email address, refer to the [Setting your commit email address instructions](https://docs.github.com/en/github/setting-up-and-managing-your-github-user-account/managing-email-preferences/setting-your-commit-email-address).
{{< /important >}}

For an introductory tutorial on Git, refer to [A tutorial introduction to Git](https://git-scm.com/docs/gittutorial).

For complete reference on the `commit` command, refer to the [Git commit reference](https://git-scm.com/docs/git-commit).

For more information on staging and committing files with Git, refer to [Git Basics - Recording Changes to the Repository](https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository).

### Create a PR

PRs are created in the GitHub web interface from your branch. Go to your fork on GitHub and perform the steps below.

1. Make sure you are in the appropriate branch on your fork. Choose the **main** button in the upper-left and select the branch from the list.

1. Choose **Pull request** in the upper-right to create a new PR.

1. In the **Open a pull request** dialog, the pull request will automatically point to `o3de.org:main`. The PR comment will use the message from your commit. Depending on the length of the first sentence in the comment, the message might be improperly split between the title and the body of the message. Make changes to the title and message for clarity, and be sure to include the issue number in the title of the PR if the PR is addressing an existing issue.

1. Add appropriate labels to your PR if necessary. In the column on the right is a section named **Labels**. Choose the **gear button** to show the label list and select labels for your PR. Each label has a short explanation for how it is used. Not all labels are appropriate for PRs. Some are meant to be used on issues. PRs do not always require labels.

1. Choose **Create pull request** to submit the PR.

If you go to the main o3de.org repo on GitHub and refer to [O3DE repository pull requests (PRs)](https://github.com/o3de/o3de.org/pulls), your new PR appears at the top of the list.

For more information on creating a pull request, refer to [Creating a pull request](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

### Respond to feedback

 Feedback will come in the form of comments you can address by editing files in your local branch, and *suggestions* that can be committed from the GitHub PR interface. It's important to understand that the PR process is a collaborative discussion. Every comment does not need to be addressed, and every suggestion does not need to be integrated. When the required number of reviewers approve of your contribution, it can be integrated. Here are a few tips for addressing suggestions and comments:

* To commit multiple suggestions, use the batch functionality to integrate multiple suggestions in a single commit.
* Do try to acknowledge all the feedback you are given. This doesn't mean to integrate every comment and commit every suggestion. It simply means to avoid resolving comments and suggestions without action or a response. Embrace collaboration.
* When addressing comments, maintain the relative conversation in the PR, edit the topics as necessary, and commit the changes to your fork/branch. Your new commits will be automatically added to the PR.
* Make sure to request a re-review of your new commits if required. More guidance on how to traverse our PR process is coming!

{{< important >}}
If you commit individual suggestions or batch commit suggestions through the GitHub PR interface, be sure to sign off on the commit by adding your sign-off to the comment. Add the string `Signed-off-by: Your Name <youralias@youremail.com>` to sign-off your commits. Check your GitHub profile email settings to ensure you use the correct email address.
{{< /important >}}

For more information on incorporating PR feedback, refer to [Incorporating feedback in your pull request](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/incorporating-feedback-in-your-pull-request).

### The PR merge

When you have approval from two reviewers, and approval from a technical reviewer (if necessary), your PR can be merged. Never merge your own PRs. The last reviewer to approve the PR is responsible for merging the PR.
