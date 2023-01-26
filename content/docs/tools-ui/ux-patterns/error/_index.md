---
linktitle: Error Handling
title: Error Handling in Blue Jay Design System
description: Learn about patterns for error handling using the Blue Jay Design System in Open 3D Engine (O3DE), such as how to design UI messages and notifications, and implement error handling for toasts, inline notifications, dialogs, console logs, event logs, event tables, component cards, and text input validations.
weight: 200
toc: true
---

Learn how to craft user interface (UI) messages that help your users, not frustrate them, by reviewing the principles and best practices in this section. *UI messages* indicate the status of a component such as error, failure, warning, information, and success messages.

The pages in this section covers how to style error messages for various types of UI messages including toast, inline notification, dialog, console log, event log, event table, component card, and text input validation. Consistent styling in O3DE's UI messages is crucial because it assists users to better recognize errors and how to resolve them.

Review these related pages on how style error messages specific to each type of UI message:

| Type | Description | 
| - | - |
| [Console Log](./components/console-log) |  |
| [Dialogs](./components/dialogs) |  |
| [Inline Notifications ](./components/inline-notifications) |  |
| [Log Table](./components/log-table) |  |
| [Text Input Validation](./components/text-input-validation) |  |
| [Toasts](./components/toasts) |  |


## Prerequisites

To aid in your learning, it's recommended that you launch **Qt Control Gallery**, an application that contains UI elements from the Qt widget library and allows you to program and preview additional elements. The QT Control Gallery is built when you build O3DE and is located in the engine's `build/<platform>/bin/<configuration>` directory.

For more information, refer to [O3DE Qt Control Gallery Tool](/docs/tools-ui/uidev-control-gallery).


## Standard icons

The standard icons that come with O3DE are the **Error**, **Warning**, **Success**, and **Information** icons. They communicate different severity levels of information to users.

These icons are displayed on various O3DE UI systems such as toast messages, dialogs, and message boxes. They are also commonly displayed within event logs, console logs, and component cards. You will learn more about these systems on this page. 


### Error / Failure

![O3DE Standard Error or Failure Icon](/images/tools-ui/overview/standard-icons/error-or-failure.png)

Indicates that a process has failed, or there is an error that requires immediate user action---that is, the user might be critically impacted, or in a potentially irreversible state. Errors or failures may be an irregularity in the engine, a malfunctioning feature, or a request from the user to confirm a destructive action.

*Used for: errors, failure, failed processes, emergencies, urgent alerts*

{{< note >}}
In O3DE, we define two different terms to describe an issue: *error* and *failure*. An error is the deviation from the actual and expected output. A failure is the system's inability to perform a required function.
{{< /note >}}

### Warning

![O3DE Standard Warning Icon](/images/tools-ui/overview/standard-icons/warning.png)

Indicates a situation that requires corrective action from the user to prevent a critical fault, or a situation in which a non-critical error has occurred. Warnings don't indicate immediate impact on the user, but they suggest that the user performs a preventive action for a streamlined workflow.

*Used for: warnings, unavailability, caution, prevention, instability*


### Success

![O3DE Standard Success Icon](/images/tools-ui/overview/standard-icons/success.png)

Indicates successfully finished processes and tasks, or implies that no issues are present within the system. It's necessary to provide the user feedback when they complete an action successfully or to indicate that no immediate user action is required.

*Used for: success, completion, stability, active status, verification, progress indicator*


### Information

![O3DE Standard Information Icon](/images/tools-ui/overview/standard-icons/information.png)

Indicates additional (non-critical) information that doesn't require action from the user. This may be used to inform the user that something is ready to view, such as for system feedback or to signify changes since the last interaction.

*Used for: information, guidance, exceptions*


## Semantic colors

In messages, semantic colors indicate the purpose of a message, which users can quickly recognize by the color. For instance, the color green has positive connotations, so it's used to communicate success or confirmation.

- Error: `#FA2727`
- Warning: `#FFAA22`
- Success: `#58BC61`
- Information: `#1E70EB`
- Information icon: `#FFFFFF`

![O3DE Message Colors](/images/tools-ui/overview/colors.png)