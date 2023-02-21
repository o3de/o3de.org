---
linktitle: Overview
title: Overview of the Docs Contribution Process
description: What you need to know before contributing to the Open 3D Engine (O3DE) documentation project.  
toc: true
weight: 100
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

The o3de.org site uses the [Hugo static site generator](https://gohugo.io/). Documentation for O3DE uses [Goldmark](https://www.markdownguide.org/tools/hugo/), a CommonMark compliant Markdown processor. Contributing to O3DE documentation is easy, quick, and requires no prior experience with web development. The documentation source files are easy to read and require very few markdown elements. For information on setting up an environment so that you can contribute to O3DE documentation, see [Setting up a local o3de.org repo](./get-started#setting-up-a-local-o3deorg-repo).

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

   It's good practice, and very helpful to contributors who might review your PRs, to create a new branch on your fork for each new issue. Having small branches containing only the changes required for the issue can expedite the PR review process and lend themselves to collaboration with other contributors. For large issues, consider breaking the work down into smaller issues, creating new branches for each smaller issue. The smaller the number of changes in your branch, the easier it will be to review and merge into main. For more information on creating a fork and branches, refer to [Get Started Contributing to Doc](./get-started).

1. **Make changes:** The O3DE documentation is written in [CommonMark Markdown](https://commonmark.org/) and processed with [Goldmark](https://www.markdownguide.org/tools/hugo/). We recommend using an editor with robust Markdown support during your writing, so that you can get live previews and catch any linting errors. During your writing, follow our [Style Guide](./style-guide) to help your review go smoothly and quickly.

1. **Commit your changes:** Before you can submit a PR, you must commit your changes and push them to a branch on your o3de.org fork. Make sure to do the following:

   1. Make sure you branch is up-to-date with `o3de.org/main` before committing.

   1. Sign-off on the changes you commit. The sign-off is a [*Developer Certificate of Origin (DCO)*](https://github.com/apps/dco). The DCO is your certification that your contribution is your own original work, or that you otherwise have the right to submit the work. For more information on committing your changes, see the [Writing process](./get-started#writing-process) section in Get Started Contributing to Docs. 
   
      {{< important >}}
   You must sign-off on all commits. When committing changes with `git commit`, use the `-s` option to sign-off. When committing individual suggestions and batch suggestions in the GitHub PR interface, paste your sign-off (`Signed-off-by: Your Name <yourname@yourdomain.com>`) into the comment field before committing the suggestion.
      {{< /important >}}

1. **Submit a pull request:** Once you've committed your changes to your own fork/branch, you can create a pull request to `o3de.org/main`. When submitting a pull request, ensure the following:

   1. The PR only contains commits and changes you want reviewed for the PR.

   2. If the PR has a related issue, the issue number must be included in the PR title.

   3. The PR message briefly and clearly explains the changes you are submitting.

   4. You have requested at least two reviewers. Approval from two reviewers is required to merge a PR - if your contribution is deeply technical, it also requires a third review from an O3DE code contributor for accuracy. The more reviewers on your PR, the sooner you're likely to be signed off on it - but never request more than five reviewers (max 3 editorial, max 2 technical) without prior approval from the D&C SIG.

   5. The PR contains the appropriate *Labels*, if required. Labels make it easier to sort through lists of PRs and may specify whether a PR is a work in progress, seeking feedback and review, that should not be merged into `o3de.org/main`. For more information, refer to [Submitting docs](/docs/contributing/to-docs/get-started#submitting-docs).

1. **Respond to PR feedback:** Feedback will come in the form of comments and *suggestions* that can be committed from the GitHub PR interface. It's important to understand that the PR process is a collaborative discussion. Every comment does not need to be addressed, and every suggestion does not need to be integrated. When the contributor and two reviewers approve of the contribution, it can be integrated. Here are a few tips for addressing suggestions and comments:

   1. To commit multiple suggestions, use the batch functionality to integrate multiple suggestions in a single commit.

   2. When addressing comments, maintain the relative conversation in the PR, edit the topics as necessary, and commit the changes to your fork/branch. Your new commits will be automatically added to the PR.

   3. Make sure to request a re-review of your new commits if required. 

1. **The PR is merged and closed:** When the comments and suggestions have been addressed, and two reviewers have approved the PR, it can be merged into `o3de.org/main`. **Never** merge your own PRs, the final reviewer to sign off is responsible for the merge. The PR is automatically closed when merged.

1. **The related issue is closed:** If you have included a related issue number in the title of your PR, the related issue will be automatically closed when the PR is closed. Your contribution is complete. Congrats!
