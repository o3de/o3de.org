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
 |  \#3       | `git remote add upstream  https://github.com/o3de/o3de.org` | Sets _upstream_ to the O3DE docs repo. _origin_ is your remote fork. Ultimately, you will push your changes to _origin_, and then submit a PR from your fork (_origin_) to the O3DE docs repo (_upstream_). Any subsequent pushes of changes to the branch you push will be reflected in the PR you made to from _origin_ to _upstream_ &mdash; you don't need to create another PR from _origin_ to _upstream_ as long as the PR for your branch remains open.  |
 |  \#4       | `git fetch upstream` | This updates local Git information about what is available from the upstream repo. |
 |  \#5       | `git switch -c main upstream/main` | Sets your local main branch to track the upstream main branch as its remote repo. This ensures that your local `main` is always in sync with the latest changes to `main` after a `git pull`. |
 |  \#6       | `git checkout -b "your-new-branch-name-here` | Creates a new working branch from `main`. Please give it a useful and easily understood name that indicates its scope and lifetime, such as `style-guide-updates-5-8-2021`. As a best practice, create a new branch from main for every potential PR, and try to scope your work within that branch for easier community review. |
 |  \#7       | Make your changes and confirm them locally. | |  
 |  \#8       | Run `git add` for every file you've edited. | Adds your files to local Git staging. Do not add *any* files that are not work you are submitting for review! |
 |  \#9       | `git commit -s -m "useful-commit-message-here"` | Writes your changes to the branch history in preparation for submission. Make sure the very first part of your commit message is a DCO signature of the form `Signed-off-by: user.name <user.email>"`, where _user.name_ and _user.email_ are the `user.name` and `user.email`, respectively, from your `.gitconfig` file. Your initial commit message should reference the corresponding GitHub Issue and provide a clear assessment of the work you did. |
 |  \#10      | `git push origin \<your branch name\>` | Pushes your commit to your remote fork (_origin_). |
 |  \#11      | Go to your remote fork on [GitHub](https://github.com) and create a PR from your working branch into the main branch for [O3DE docs repo](https://github.com/o3de/o3de.org). | |
 |  \#12      | Check out your new PR on the O3DE docs repo and select a few community reviewers! | Someone from the O3DE community will merge your changes after all review suggestions have been addressed by you. |
