---
linktitle: GitHub Workflow
title: O3DE Code Contribution GitHub Workflow
description: Overview and instructions for contributing code to Open 3D Engine (O3DE) through GitHub.
toc: true
weight: 200
---

Looking to submit new or changed code to **Open 3D Engine (O3DE)**? Exciting! Follow the guidance below to submit your first PR.

### GitHub Code Contribution Workflow

The O3DE base repository is on GitHub at [https://{{< links/o3de-source >}}](https://{{< links/o3de-source >}}).

![GitHub code contribution workflow diagram](/images/contributing/to-code/code-git-workflow.png)

At a high level, the workflow is:

1. Create a branch from the local clone of your fork, do your work, push it to your fork (origin), and submit a pull request from your fork to the O3DE GitHub repo (upstream).

2. Your pull request is checked for merge conflicts. If one is found, the pull request is rejected.

3. If there are no merge conflicts, automated review (AR) is triggered and the pull request is flagged for code review.

4. If the pull requests passes code review, the SIG maintainer (or a delegate) will merge it into the `development` branch of the O3DE GitHub repo.

### Initial Git contribution workflow steps

1. Create a fork of `https://{{< links/o3de-source >}}.git` into your own GitHub account. To do this, go to the O3DE public GitHub repo at [https://{{< links/o3de-source >}}](https://{{< links/o3de-source >}}) and create a fork by selecting the "Fork" button in the upper-right. This will clone the O3DE public repo into your repo, and may take a few minutes. The URL for your fork will be something like `https://github.com/<YOUR GITHUB NAME HERE>/o3de.git`.

1. Now, clone your fork locally by opening GitBash (or a Git-enabled shell or utility). Change directories to the folder you want to clone the repo in and run: `git clone https://github.com/<YOUR GITHUB NAME HERE>/o3de.git`. You will now have the clone of your fork on your local desktop and can work with the files directly.

1. However, to simplify this workflow, you must make some changes to your local Git configuration. In this case, you will be setting your fork's URL as the `origin` repo, and the O3DE public repo as your `upstream` repo, and updating the LFS URL. Run the following Git commands from **your locally cloned fork's path**:

    ```bash
    git remote add upstream https://{{< links/o3de-source >}}.git
    ```

    Confirm that `upstream` points to the O3DE public repo and that `origin` points to your fork:

    ```bash
    git remote -v
    ```

    Minimally, you should see output that looks like this:

    ```bash
    origin  https://github.com/<FORK>/o3de.git (fetch)
    origin  https://github.com/<FORK>/o3de.git (push)
    upstream  https://{{< links/o3de-source >}}.git (fetch)
    upstream  https://{{< links/o3de-source >}}.git (push)
    ```

    You can also configure upstream to target specific branches, as well.

    Update the LFS URL to include your fork.  This will enable you to push changes to large files.  Open the .lfsconfig file at the root of the repository for complete instructions and the **DISTRIBUTION** to use.

    ```cmd
    git config lfs.url https://<DISTRIBUTION>.cloudfront.net/api/v1/fork/<FORK> 
    ```

    You may be prompted to re-authenticate the next time you pull or push. Remember to use your GitHub personal access token not your GitHub password.

    If you need to revert this change later you can run the following command:

    ```cmd
    git config --unset lfs.url 
    ```

1. Now, update your local repo by `git fetch`ing the branches currently active on the O3DE repo. You can get all working branches with `git fetch upstream --all`, or fetch a specific branch with `git fetch upstream <name-of-branch>`.

1. Rebase the commit history to the last commit from the upstream `development` branch:

    ```bash
    git rebase upstream/development
    ```

1. Check out the branch you will be working on and **take your own branch from it** to perform your work.

    ```bash
    git checkout <name-of-fetched-branch>
    ```

    Confirm you have switched branches successfully with `git branch`. If you are on the branch you want, create your own branch from it:

    ```bash
    git checkout -b <name-of-your-working-branch>
    ```

### Ongoing Git workflow steps

Now, you're ready to do some work! After you've made some changes and saved your work, it's time to submit it as a pull request (PR) for review.

1. (Optional): First, depending on how much time has passed since your branch was initially created, you might want to merge the latest from `upstream/development` into your branch. This will ensure your changes don't conflict with any other recent code commits, and also gives your automated review (AR) the best chance of success, because your branch will be closer to the latest development snapshot.

    You can do this with the following commands (**Check which branch you are on with `git branch` first!**):

    ```bash
    git fetch upstream --all
    git pull
    git merge upstream/development --signoff
    ```

1. Next, stage (add) the new or modified code files, commit your changes, and submit a pull request to your fork (origin) with the following commands. (**Check which branch you are on with `git branch` first!**):

    ```bash
    git add .
    git commit -s -m "<commmit_message>"
    git push -u origin <your-branch-name>
    ```

    This will push the update to your fork, and NOT the O3DE code repo.

    {{< note >}}
We require DCO signing on all code commits. This requires that you have both your contributor name and email address in your `.gitconfig` file, or have previously run the following Git commands from a Git-enabled shell: `git config user.name "YOUR CONTRIBUTOR NAME HERE"` `git config user.email "YOUR CONTRIBUTOR CONTACT MAIL HERE"`. (This command updates your `.gitconfig.`) You must use the `-s` option on every commit. If you are using a Git-enabled IDE, such as Visual Studio or Visual Studio Code, turn on commit signing in the preferences.
    {{< /note >}}

1. (Optional): Test your branch with Jenkins.

    The source for the code build pipeline and the required infrastructure is stored in the O3DE repo. Contributors can utilize this to spin up their own build/test pipeline or they can test locally.

    The `Jenkinsfile` (AutomatedReview/Jenkinsfile) is the source for the Automated Review (AR)/Jenkins Pipeline used by O3DE. Refer to [Simulate an automated review run](/docs/user-guide/build/configure-and-build/#simulate-an-automated-review-run) in the user guide for more information on how to run a test locally.

    The scripts to install all the dependencies on the build nodes and other infrastructure setup scripts are also stored in the repo for contributors and customers to use.

1. Submit a pull request from your fork to the O3DE code repo.

    * Navigate to your fork repo in GitHub, click the **Pull Requests** tab and click **New Pull Request**.
    * On the **Compare** page, verify the base repo and branch point is set to `O3DE/development`. (This should be set by default.)
    * In the `head` drop down menu, select your fork repo and branch, and then select **Create Pull Request**.

    ![Creating a pull request from your fork to o3de/development.](/images/contributing/to-code/code-pr-from-fork.png)

    * Add a title and description for your pull request. Provide a clear scope of your changes in as few words as you can.
    * Add reviewers (Note: Required reviewers and other PR requirements will be finalized in a `CONTRIBUTING.md` file).

    ![Adding reviewers to an O3DE pull request.](/images/contributing/to-code/code-add-reviewers.png)

    * Now, select **Create pull request**!

1. The SIG maintainer/reviewer (or a delegate) for the affected component reviews the pull request. At the same time, the automated review (AR) is triggered.

    {{< note >}}
The SIG maintainer/reviewer will review the pull request and must approve the AR run before it can start. This is to required to prevent the pipeline from running malicious code. The AR build that is triggered on pull requests runs on the infrastructure owned by O3DE.
    {{< /note >}}

1. Once all review comments have been addressed, a SIG member will approve the pull request.

    The pull request receives the required approvals from SIG and the AR passes.

    ![An O3DE contribution pull request in a green approved state.](/images/contributing/to-code/code-pr-accepted.png)

    The SIG maintainer (or a delegate) can then merge your pull request into `o3de/development`, and you're done! Nice!

### Reviews and feedback on pull requests

The SIG maintainer/reviewer can request changes by providing feedback. You should engage with the comments and make any valid corrections or updates to your code contribution on the same branch. If the automated review (AR) fails, review the errors, make any necessary fixes, and update the pull request on the same branch.

![An example of a failed AR check in a pull request.](/images/contributing/to-code/code-ar-failed.png)

If you do not make the changes to pass the AR, or ignore the code review feedback, the SIG maintainer may reject the changes in the pull request by marking it closed.
