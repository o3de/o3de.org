---
linkTitle: Submit a PR
title: Submit a PR to Open 3D Engine (O3DE) Docs 
description: A guide to submitting a PR to the Open 3D Engine (O3DE) Documentation repository.
weight: 750
toc: true
---

{{< preview-new >}}

When you've made an edit or created a new topic, you need to submit a pull request (PR) for review before the changes can be merged into `o3de:main`. You can see the current list of active PRs here [O3DE repository pull requests (PRs)](https://github.com/o3de/o3de.org/pulls). PRs allow peer contributors to review contributions for several potential issues:

* technical accuracy
* spelling
* grammar
* clarity
* style

Before submitting a PR, ensure your contributions meet the guidelines below:

* Files in the PR are placed in the proper directories. See [O3DE Docs Structure](/docs/contributing/to-docs/o3de-docs-structure).
* Contributions adhere to the O3DE Documentation style. See [O3DE Documentation Contribution Style Guide](/docs/contributing/to-docs/style-guide).
* Contributions use O3DE terms correctly. See [O3DE Documentation Terminology](/docs/contributing/to-docs/style-guide).
* All commits in the PR have been properly signed off. See [Commit your changes](#commit-your-changes) below.
* The PR only contains commits and changes you want reviewed for the PR.
* If the PR has a related issue, the issue number is incorporated in the title of the PR.

## The PR Process

Despite only having five steps, the PR process can take some time depending on the availability of reviewers and the length and technical depth of the submitted changes. You can help keep PRs moving by quickly responding to feedback and review requests, and by submitting feedback to PRs that aren't getting timely responses. The PR process is summarized below.

1. Commit your changes to a branch on your fork.
1. Create a PR against `o3de:main` from your branch.
1. Request reviewers for your PR.
1. Respond to feedback from reviewers.
1. When the PR receives two approvals, plus a technical review approval for highly technical topics, it can be merged.

{{< important >}}
**Never** merge your own PRs. PRs require two approvals, and may require an additional approval from a technical reviewer. The last reviewer to approve the PR should merge it into `o3de:main`.
{{< /important >}}

### Commit your changes

The first step is to commit your changes to a branch on your fork. You must sign-off on all your commits. If you do not sign-off, your PRs will not be reviewed or merged. The sign-off is a [*Developer Certificate of Origin (DCO)*](https://github.com/apps/dco). The DCO is your certification that your contribution is your own original work, or that you otherwise have the right to submit the work. Sign-off is easy to do, and just as easy to forget. Follow the steps below to properly sign off and commit your changes.

1. Make sure you are in the correct branch.

    ```shell
    git checkout <your branch>
    ```

1. Check your branch for new, modified, and deleted files.

    ```shell
    git status
    ```

1. Add new and modified files to the commit. Use the list generated in step 2 to determine which files to add to the commit.

    ```shell
    git add <space separated list of files>
    ```

1. Remove deleted files to the commit. Use the list generated in step 2 to determine which files to remove from the commit.

    ```shell
    git rm <space separated list of files>
    ```

1. Commit your changes with your DCO sign-off.

    ```shell
    git commit -s -m "<commit message>"
    ```

[//]: # (Seems to be a bug in Hugo. If the following shortcodes are properly indented, the are enclosed in the codeblock.)

{{< note >}}
The `-m` option allows you to add a commit message enclosed in double quotes. Commit messages should be brief and clear.
{{< /note >}}

{{< important >}}
The `-s` option provides the DCO sign-off. A properly signed-off commit will contain the line `Signed-off-by: Your Name <youralias@youremail.com>`
{{< /important >}}

6. Push your changes to the branch on your fork.

    ```shell
    git push origin
    ```

For more information on staging and committing files with Git, see [Git Basics - Recording Changes to the Repository](https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository).

### Create a PR

PRs are created in the GitHub web interface from your branch. Go to your fork on GitHub and perform the steps below.

1. Make sure you are in the appropriate branch on your fork. Choose the **main** button in the upper-left and select the branch from the list.

1. Choose **Pull request** in the upper-right to create a new PR.

1. In the **Open a pull request** dialog, the pull request will automatically point to `o3de:main`. The PR comment will use the message from your commit. Depending on the length of the first sentence in the comment, the message may be improperly split between the title and the body of the message. Make changes to the title and message for clarity, and be sure to include the issue number in the title of the PR if the PR is addressing an existing issue.

1. Add appropriate labels to your PR if necessary. In the column on the right is a section named **Labels**. Choose the **gear button** to view the label list and select labels for your PR. Each label has a short explanation for how it is used. Not all labels are appropriate for PRs. Some are meant to be used on issues. PRs do not always require labels.

1. Choose **Create pull request** to submit the PR.

If you go to the main o3de.org repo on GitHub and view [O3DE repository pull requests (PRs)](https://github.com/o3de/o3de.org/pulls), you will see your new PR at the top of the list.

For more information on creating a pull request, see [Creating a pull request](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

### Request reviewers

PRs require two reviewer approvals to be merged into main. Highly technical topics additionally require review by an O3DE code contributor for technical accuracy. You should request at least two, but no more than five reviewers for your PRs. Keep in mind that as this is a community project, and that interested contributors can add themselves as reviewers to any PR.

"But who do I ask to review my PRs?" you are probably wondering. If you are new to the project, you may not know any other contributors. You can look through the PR list and try to find reviewers who seem responsive, but a better solution is to visit the O3DE Discord and ask for suggestions and volunteers for reviewers. It's a great way to meet new people and introduce yourself to other contributors.

To add reviewers to your PR, find the section in the column to the right of your PR labeled "Reviewers". Choose the **gear button** to open the list of potential reviewers and search for the names of reviewers you'd like to add. Click the reviewer's name to select them and add them to your PR.

For more information on requesting reviewers, see [Requesting a pull request review](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/requesting-a-pull-request-review).

### Respond to feedback

 Feedback will come in the form of comments you can address by editing files in your local branch, and *suggestions* that can be committed from the GitHub PR interface. It's important to understand that the PR process is a collaborative discussion. Every comment does not need to be addressed, and every suggestion does not need to be integrated. When the required number of reviewers approve of your contribution, it can be integrated. Here are a few tips for addressing suggestions and comments:

* To commit multiple suggestions, use the batch functionality to integrate multiple suggestions in a single commit.
* Do try to address all the feedback you are given. This doesn't mean to integrate every comment and commit every suggestion. It simply means don't resolve comments and suggestions without action or a response. Embrace collaboration.
* When addressing comments, maintain the relative conversation in the PR, edit the topics as necessary, and commit the changes to your fork/branch. Your new commits will be automatically added to the PR.
* Make sure to request a re-review of your new commits if required. For more information on the PR review process, see the [Review PRs:](./review-prs)) topic in this guide.

{{< important >}}
If you commit individual suggestions or batch commit suggestions through the GitHub PR interface, be sure to sign-off on the commit by adding your sign-off to the comment. Add the string `Signed-off-by: Your Name <youralias@youremail.com>` to sign-off your commits.
{{< /important >}}

For more information on incorporating PR feedback, see [Incorporating feedback in your pull request](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/incorporating-feedback-in-your-pull-request).

### The PR merge

When you have approval from two reviewers, and approval from a technical reviewer (if necessary), your PR can be merged. Never merge your own PRs. The last reviewer to approve the PR is responsible for merging the PR.

To merge a PR, the reviewer needs to choose **Merge pull request** from the GitHub PR interface.

For more information on merging pull requests, see [Merging a pull request](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/merging-a-pull-request).