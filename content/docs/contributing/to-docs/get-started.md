---
linktitle: Get Started
title: Get started as an O3DE documentation contributor
description: What you need to know before contributing to the Open 3D Engine (O3DE) documentation project.  
toc: true
weight: 200
---

{{< preview-new >}}

Take some time to browse the [Open 3D Engine (O3DE) documentation](https://www.o3de.org/docs) to understand how the documentation is organized and how it is written. There are several guides in the O3DE documentation:

* [Welcome:](https://www.o3de.org/docs/welcome-guide) Provides an introduction and overview of O3DE.
* [Tutorials and Examples:](https://www.o3de.org/docs/learning-guide) Guided tutorials, samples, and cookbooks to help users learn O3DE.
* [User Guide:](https://www.o3de.org/docs/user-guide) Feature and reference documentation for the various editors, tools, components and Gems provided with O3DE.
* [Atom Renderer:](https://www.o3de.org/docs/atom-guide) Feature and reference documentation for Atom Renderer and its tools and editors.
* [Tools UI Developer Guide:](https://www.o3de.org/docs/tools-ui) The style and implementation guide for the UI used throughout the tools of O3DE and Atom Renderer.
* [API Reference:](https://www.o3de.org/docs/api) Automatically generated API reference for O3DE.
* [Contribute:](https://www.o3de.org/docs/contributing) Guidelines for contributing to O3DE and its documentation.
* [Release Notes:](https://www.o3de.org/release-notes) Release notes for O3DE including new features, fixes, and known issues.

Some documentation, such as **API Reference**, is generated automatically. Some documentation, such as **Release Notes**, is provided by various O3DE SIGs.

{{< note >}}
Whether you would like to fix an issue, contribute new documentation or tutorials, or simply file an issue, participation as a contributor requires a [GitHub account](https://github.com/signup).
{{< /note >}}

## Technical information

The o3de.org site uses the [Hugo static site generator](https://gohugo.io/). Documentation for O3DE uses [Goldmark](https://www.markdownguide.org/tools/hugo/), a CommonMark compliant Markdown processor. Contributing to O3DE documentation is easy, quick, and requires no prior experience with web development. The documentation source files are easy to read and require very few markdown elements. Information on setting up an environment so that you can contribute to O3DE documentation can be found in the [O3DE documentation repository](./o3de-documentation-repository) topic in this guide.

## Begin with issues

Once you have a GitHub account, your first stop should be the [O3DE repository issues](https://github.com/o3de/o3de.org/issues). Issues aren't just bugs and errors found in the documentation. All contributions, including new feature documentation, tutorials, recipes, site maintenance, and site improvements, are tracked in issues. Browsing the current issues can familiarize you with the O3DE documentation, it's current state and future direction, and provides ideas where you can best contribute. For more information on issues, see the [Work with issues](./work-with-issues) topic in this guide.

## Move on to pull requests

After getting familiar with issues, have a look at the current [O3DE repository pull requests (PRs)](https://github.com/o3de/o3de.org/pulls). PRs are contributions that have been submitted to the main repository. The open PRs are currently being peer reviewed by contributors. PRs must be edited by peer contributors for technical accuracy, spelling, grammar, clarity, and style. Contributors should **not** merge their own PRs, and any given PR should have at least two approved reviews before being merged into main. Browsing the open PR list can give you an idea what the current active areas are for other contributors, can help you collaborate and prioritize your own contributions, and shows you how different types of content are reviewed.

## Documentation process overview

With a basic understanding of the documentation structure, and with exposure to issues and PRs, consider the high level view of the documentation process. The process for contributing documentation is as follows:

1. **Create a new issue or claim an existing issue:** It's important to maintain a public record for the development of O3DE and its documentation. Using issues to document discussions and contributor efforts is critical to that goal. All contributions begin with an issue. As a contributor, you can file an issue and then assign it to yourself, or you can claim an existing issue. When creating a new issue, search the current issue list to ensure the issue hasn't already been submitted. When claiming issues for yourself as a contributor, try to be mindful of the PRs and issues your fellow contributors are working with to ensure your contributions are supportive and collaborative. Be communicative on your issues. Leave comments as your work progresses, and respond to comments on your issues. For more information on issues, see the [Work with issues](./work-with-issues) topic in this guide.
2. **Create a branch on your fork for the issue:** Contributions can't be submitted directly to the main O3DE documentation repository. You must fork the main repository, and submit pull requests to the main repository from your fork/branch. It's good practice, and very helpful to contributors who might review your PRs, to create a new branch on your fork for each new issue. Having small branches containing only the changes required for the issue can expedite the PR review process and lend themselves to collaboration with other contributors. For large issues, consider breaking the work down into smaller issues, creating new branches for each smaller issue. The smaller the number of changes in your branch, the easier it will be to review and merge into main. For more information on creating a fork and branches, see the [O3DE documentation repository](./o3de-documentation-repository) topic in this guide.
3. **Make changes:** [Goldmark](https://www.markdownguide.org/tools/hugo/) is very easy to use. Because it is CommonMark compliant, you can use any editor that supports Markdown syntax highlighting to edit content for o3de.org. Be sure to reference the [Style Guide](./style-guide) to ensure your content is ready for review.
4. **Commit your changes:** Before you can submit a PR, you must commit your changes and push them to a branch on your o3de.org fork. Make sure to do the following:
   1. Make sure you branch is up-to-date with `o3de.org/main` before committing your content. 
   2. Sign-off on the changes you commit. The sign-off is a [*Developer Certificate of Origin (DCO)*](https://github.com/apps/dco). The DCO is your certification that your contribution is your own original work, or that you otherwise have the right to submit the work. For more information on committing your changes, see the [Submit a PR](./submit-a-pr) topic in this guide.
5. **Submit a pull request:** Once you've committed your changes to your own fork/branch, you can create a pull request again `o3de.org/main`. When submitting a pull request, ensure the following:
   A. The PR only contains commits and changes you want reviewed for the PR.
   B. The PR message briefly and clearly explains the changes you are submitting.
   C. You have requested at least three reviewers. Approval from two reviewers is required to merge a PR. Requesting more than two reviewers but no more than six, depending on the requirements of the review, increases the probability that your PR will be reviewed quickly.
   D. The PR contains the appropriate *Labels* if required. Labels make it easier to sort through lists of PRs and may specify whether a PR is a work in progress, seeking feedback and review, that should not be merged into `o3de.org/main`. For more information on committing your changes, see the [Submit a PR](./submit-a-pr) topic in this guide.
6. **Respond to PR feedback:** Feedback will come in the form of *suggestions* that can be committed from the GitHub PR interface, or comments you must address. To commit multiple suggestions, use the batch functionality to commit all the suggestions at once in a single commit. When addressing comments, maintain the relative conversation in the PR, edit the topics as necessary, and commit the changes to your fork/branch. Your new commits will be automatically added to the PR. Make sure to request a re-review of your new commits if required. For more information on the PR review process, see the [Review PRs:](./review-prs)) topic in this guide.
7. **Merge the PR:** When the comments and suggestions have be addressed, and two reviewers have approved the PR, it can be merged into `o3de.org/main`. You should not merge your own PRs, the second reviewer to approve the PR should be the person to merge the PR.
8. **Close the related issue:** Now that the PR has been merged, the issue can be closed. Find the issue in the issues list, and add a comment. It's good practice to link the related PR before you close the issue.

 {{< important >}}You must sign-off on all commits. When committing changes with `git commit`, use the `-s` option to sign-off. When committing individual suggestions and batch suggestions in the GitHub PR interface, paste your sign-off (`Signed-off-by: Your Name <yourname@yourdomain.com>`) into the comment field before committing the suggestion.
{{< /important >}}

## Next step

Now that you have high level understanding of the O3DE documentation, and the documentation process, start the contribution process with a closer look at [working with issues](./work-with-issues).