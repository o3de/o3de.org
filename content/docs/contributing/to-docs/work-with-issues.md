---
linkTitle: Work with Issues
title: Work with O3DE Documentation Issues
description: Guide to create and work with issues in the Open 3D Engine (O3DE) documentation project.  
toc: true
weight: 300
---

The easiest way to contribute to **Open 3D Engine (O3DE)** documentation is to file an *issue* on GitHub. In O3DE documentation, issues are used to track documentation bugs, requests for new documentation, suggestions, and improvements. You can also search existing O3DE documentation issues for tasks that you would like to address and comment on. To see the current list of O3DE documentation issues, refer to [o3de.org issues](https://github.com/o3de/o3de.org/issues)

Refer to [GitHub issues](https://guides.github.com/features/issues/) for an overview of GitHub issues.

## Search O3DE documentation issues

Always search the existing issues before creating a new issue to avoid duplicating issues. You can search O3DE documentation issues using the search field at the top of the [issues list](https://github.com/o3de/o3de.org/issues). Without any filters, search will return issues and pull requests (PRs). Use `is:issue` and `is:open` to filter the results to show only open issues. You can use the **Filters** list on the left to select some quick filters such as your issues, or every issue mentioning you. You can use `"` enclosed strings to search for specific text in issues. One of the most important filters is `label:`. O3DE documentation issues often have multiple labels to make it easier to find issues of a specific type. Refer to the following example:

[Search results, good first issue](https://github.com/o3de/o3de.org/issues?q=is%3Aopen+is%3Aissue+label%3Agood-first-issue)

In the search results above, the search string `is:open is:issue label:good-first-issue` returns all open O3DE documentation issues with the `good-first-issue` label. These are issues that have been determined to be good entry points for new contributors.

For complete documentation on searching issues on GitHub, refer to [Searching issues and pull requests](https://docs.github.com/en/github/searching-for-information-on-github/searching-issues-and-pull-requests).

## O3DE documentation issue labels

O3DE documentation uses labels to organize issues and pull requests. For the current list of labels, refer to [O3DE documentation labels](https://github.com/o3de/o3de.org/labels).

Labels are provided by the O3DE Documentation and Community Special Interest Group (D&C SIG). Not all labels in the list are meant to be applied to issues, and not every issue must have a label. That said, if you find that one or more labels in the list apply to an issue, we encourage you to add them! Labels make it much easier to find and prioritize issues, and can help contributors address bugs and respond to requests much more quickly.

Though there are dozens of labels available, some labels of particular interest are demonstrated in the table below.

| Label | Usage | Open issues |
| - | - | - |
| `good-first-issue` | Good issues for new contributors. | [Good first issues](https://github.com/o3de/o3de.org/issues?q=is%3Aopen+is%3Aissue+label%3Agood-first-issue) |
| `tutorial` | Requests for new tutorials. | [Tutorial issues](https://github.com/o3de/o3de.org/issues?q=is%3Aopen+is%3Aissue+label%3Atutorial) |
| `enhancement` | Requests for new documentation and website features. | [Enhancement issues](https://github.com/o3de/o3de.org/issues?q=is%3Aopen+is%3Aissue+label%3Aenhancement+) |

## Create O3DE documentation issues

In an ideal scenario, every PR that's submitted to the repository will have an associated issue. Working from issues can improve the quality of PR submissions and the speed of PR reviews because issues can be clarified and refined through discussion before any work is done. For information on creating issues on GitHub, refer to [Creating an issue](https://docs.github.com/en/github/managing-your-work-on-github/creating-an-issue).

When creating new issues keep the following in mind:

* Give the issue a concise title that clearly identifies the request.

* Each issue should be for a single request. If the request is large enough, like a major new feature or site section, it may be split in triage.

* Provide as much information as you think is relevant for resolving your issue. Include things like URLs for the site, and browser versions for rendering issues.

* Use appropriate labels. Correct labels help with triage and make it easier for contributors to find something suited to their skills.

* For technical issues include steps to reproduce the issue along with information that might be relevant, such as your browser version.

* Respond to comments on issues you create. Providing additional information and actively participating with contributors can help address your issues more quickly.

## Assign O3DE documentation issues

If you see an issue in the list that you would like to address, you can assign it to yourself. To assign an issue to yourself, go to the issue's description and choose **assign yourself** in the **Assignees** group on the right. If the issue already has an assignee but does not have recent activity, request a status update by commenting on the issue before making any changes to the issue assignment.
