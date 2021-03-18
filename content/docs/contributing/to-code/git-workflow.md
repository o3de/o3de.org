---
linktitle: Code Contributions
title: O3DE Code COntribution GitHub Workflow
description: ' Overview and instructions for contributing code to Open 3D Engine (O3DE) through GitHub. '
date: 2021-03-02T00:23:51-05:00
toc: true
weight: 200
---

{{< preview-new >}}

## Open 3D Engine Code Contribution: Git Workflow

Looking to submit new or changed code to O3DE? Exciting! Follow the guidance below to submit your first PR.

### GitHub Code Contribution Workflow

The O3DE base repository is on GitHub at [https://github.com/o3de/o3de](https://github.com/o3de/o3de).

![GitHub code contribution workflow diagram](/images/contributing/code-git-workflow.png)

At a high level, the workflow is:

    1. Create a branch from the local clone of your fork, do your work, push it to your fork (origin), and submit a pull request from your fork to the O3DE GitHub repo (upstream).
    2. Your pull request is checked for merge conflicts. If one is found, the pull request is rejected.
    3. If there are no merge conflicts, automated review (AR) is triggered and the pull request is flagged for code review.
    4. If the pull requests passes code review, the SIG owner (or a delegate) will merge it into the `main` branch of the O3DE GitHub repo.

### Prerequisites

To create your first pull request, you must have completed the following:

* Created a fork of `https://github.com/o3de/o3de.git` into your own GitHub account
* Cloned your fork to your local development environment
* Created a branch from the `main` branch (or other development branch) scoped to your code additions or changes
* Made some code changes!

{{< /note >}}
    As a best practice, set `origin` to your forked repo, and `upstream` to `https://github.com/o3de/o3de.git`. We will assume this configuration in the following steps.

### Workflow Steps

1. First, stage (add) the new or modified code files, commit your changes, and submit a pull request to your fork (origin):

        ```git
        git checkout -b <your_branch_name>
        git add .
        git commit -s -m "<commmit_message>"
        git push -u origin <your_branch_name>
        ```

    This will push the update to your fork, and NOT the O3DE code repo.

    {{< /note >}}
        We require DCO signing on all code commits. This requires that you have both your contributor name and email address in your `.gitconfig` file, or have previously run the following Git commands from a Git-enabled shell: `git config user.name "YOUR CONTRIBUTOR NAME HERE"` `git config user.email "YOUR CONTRIBUTOR CONTACT MAIL HERE"`. (This command updates your `.gitconfig.`) You must use the `-s` option on every commit. If you are using a Git-enabled IDE, such as Visual Studio 2019 or Visual Studio Code, turn on commit signing in the preferences.

2. (Optional): Test your branch with Jenkins.

    <!-- Need specific locations here! -->
    The source for the code build pipeline and the required infrastructure is stored in the O3DE repo. Contributors can utilize this to spin up their own build/test pipeline or they can test locally.

    The `Jenkinsfile` (AutomatedReview/Jenkinsfile) is the source for the AR/Jenkins Pipeline used by O3DE.

    The scripts to install all the dependencies on the build nodes and other infrastructure setup scripts are also stored in the repo for contributors and customers to use.

3. Submit a pull request from your fork to the O3DE code repo.

    * Navigate to your fork repo in GitHub, click the **Pull Requests** tab and click **New Pull Request**.
    * On the **Compare** page, verify the base repo and branch point is set to `O3DE/main`. (This should be set by default.)
    * In the `head` drop down menu, select your fork repo and branch, and then select **Create Pull Request**.

    ![Creating a pull request from your fork to o3de/main.](/images/contributing/code-pr-from-fork.png)

    * Add a title and description for your pull request. Provide a clear scope of your changes in as few words as you can.
    * Add reviewers (Note: Required reviewers and other PR requirements will be finalized in a `CONTRIBUTING.md` file).

    ![Adding reviewers to an O3DE pull request.](/images/contributing/code-add-reviewers.png)

    * Now, select **Create pull request**!

4. The SIG owner (or a delegate) for the affected component reviews the pull request. At the same time, the automated review (AR) is triggered.

    {{< /note >}}
    The SIG owner will review the pull request and must approve the AR run before it can start. This is to required to prevent the pipeline from running malicious code. The AR build that is triggered on pull requests runs on the infrastructure owned by O3DE.

5. Once all review comments have been addressed, a SIG member will approve the pull request.

    The pull request receives the required approvals from SIG and the AR passes.

    ![An O3DE contribution pull request in a green approved state.](/images/contributing/code-pr-accepted.png)

    The SIG owner (or a delegate) can then merge your pull request into `o3de/main`, and you're done! Nice!

### Reviews and Feedback on Pull Requests

The SIG owner can request changes by providing feedback. You should engage with the comments and make any valid corrections or updates to your code contribution on the same branch. If the automated review (AR) fails, review the errors, make any necessary fixes, and update the pull request on the same branch.

![An example of a failed AR check in a pull request.](/images/contributing/code-ar-failed.png)

If you do not make the changes to pass the AR, or ignore the code review feedback, the SIG owner may reject the changes in the pull request by marking it closed.

### Frequently Asked Questions

**Q:** __QUESTION HERE.__
**A:** ANSWER HERE.

