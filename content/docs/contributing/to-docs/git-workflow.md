---
linkTitle: Git Runbook
title: "O3DE Docs Contributions: Runbook"
description: A checklist of actions to take to start working with the Open 3D Engine (O3DE) documentation repository.
weight: 500
toc: true
---

## Quick Start: Runbook for O3DE Docs Contributions

| Step | Action | Notes |
|-|-|-|
|  \#1       | Fork the [O3DE docs repo](https://github.com/o3de/o3de.org) to your personal GitHub account. | A GitHub account is required. Sign up [here](https://github.com/join). |
|  \#2       | Clone _your_ fork of the O3DE docs repo to your local workstation. | Make sure you remember the file path to the cloned repo on your local workstation. What's "cloning"? Read our [detailed Getting started with O3DE docs contributions guidance](./get-started)! |
 |  \#3       | `git remote add upstream  https://github.com/o3de/o3de.org` | Sets _upstream_ to the O3DE docs repo. _origin_ is your remote fork. Ultimately, you will push your changes to _origin_, and then submit a pull request (PR) from your fork (_origin_) to the O3DE docs repo (_upstream_). Any subsequent pushes of changes to the branch you push will be reflected in the PR you made to from _origin_ to _upstream_ &mdash; you don't need to create another PR from _origin_ to _upstream_ as long as the PR for your branch remains open.  |
 |  \#4       | `git fetch upstream` | This updates local Git information about what is available from the upstream repo. |
 |  \#5       | `git switch -c development upstream/development` | Sets your local development branch to track the upstream development branch as its remote repo. This ensures that your local `development` is always in sync with the latest changes to `development` after a `git pull`. |
 |  \#6       | `git switch -c your-new-branch-name-here upstream/development` | Creates a new working branch from `development`. Please give it a useful and easily understood name that indicates its scope and lifetime, such as `style-guide-updates`. As a best practice, create a new branch from development for every potential PR, and try to scope your work within that branch for easier community review. |
 |  \#7       | Make your changes and confirm them locally. | |  
 |  \#8       | Run `git add` for every file you've edited. | Adds your files to local Git staging. You can use `git add .` to add every file you've edited, but be careful with this. Do not add *any* files that are not work you are submitting for review! |
 |  \#9       | Use `git status` to verify the list of files to commit. | Before you commit your changes, it's a good idea to make sure you have not staged any changes that you did not intend to include in your PR. Use `git restore --staged your-filename-here` to remove a modified file from staging. |
 |  \#10      | `git commit -s -m "useful-commit-message-here"` | Writes your changes to the branch history in preparation for submission. The `-s` parameter will add a DCO signature of the form `Signed-off-by: user.name <user.email>"` to your commit, where _user.name_ and _user.email_ are the `user.name` and `user.email`, respectively, from your `.gitconfig` file. Your commit message should provide a clear assessment of the work you did. |
 |  \#11      | `git push origin` | Pushes your commit to your remote fork (_origin_). |
 |  \#12      | To create a PR, use the URL that was part of the `git push` output, or go to your remote fork on [GitHub](https://github.com) and create a PR from your working branch into the development branch for [O3DE docs repo](https://github.com/o3de/o3de.org). | Make sure that the _base_ in your PR targets the development branch of o3de.org. <br> ![Base branch is set to development in most PRs](/images/contributing/to-docs/pr-base-target.png) |
 |  \#13      | Check out your new PR on the O3DE docs repo. | Your PR will be auto-assigned reviewers. Keep a lookout for comments and requested change, and respond to them promptly so that the PR does not become "stale". Someone from the O3DE community will merge your changes after all review suggestions have been addressed by you. |
