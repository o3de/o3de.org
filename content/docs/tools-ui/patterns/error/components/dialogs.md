---
linktitle: Dialogs
title: Error Messages in Dialogs
description: Learn how to design Error/Warning/Success/Information messages in dialogs using the BlueJay Design System (BJDS) in Open 3D Engine (O3DE).
weight: 200
toc: true
---

*Dialogs* inform users about specific tasks and can contain other relevant information or request user input. A dialog is highly disruptive to the user and must be used sparingly. Dialogs may be prompted by the user's action, or by the system to request input from the user or to give users critical information about their workflow.

## Structure of a dialog

1. **Header**: Contains a title and close button.
2. **Close Button**: Closes the dialog without resolving the issue.
3. **Icon**: One of the standard icons and has a size of 48 x 48px.
4. **Body**: Contains information reagrding the user's task and how to resolve it. 
5. **Actions**: The primary and/or secondary call-to-action buttons needed to resolve or exit the dialog task.

![Dialog Structure](/images/tools-ui/dialogs/dialog-structure.png)

## Types of dialogs

| Type | Usage |
|--- |--- |
| Modal | Displays critical information or requests necessary input from the user. |
| Non-modal | Displays relevant information or requests non-critical input from the user that might not be needed to complete the user workflow. |

![Modal and non-modal dialogs](/images/tools-ui/dialogs/modal-dialog-and-non-modal-dialog.png)

## Specifications

* Dialogs should not include the O3DE Logo Mark in the header.
* The title in the dialog's header must briefly describe the dialog's task or purpose.
* The title and body must contain relevant information to help users complete the dialog's task. Refer to the [Writing Messages](todo) for more details. 
* A dialog must contain only one icon, which must be from the standard icons. 
* The dialog's action(s) must have a primary button and may include a secondary button. 
* Keep the button text actionable, and that the primary action is highlighted by this button.

## Example dialogs

### Dialog without Icon

![O3DE Dialog without icon](/images/tools-ui/dialogs/dialog-without-icon.png)

It is not essential for a dialog to include the Icon, however we recommend using this dialog variation as a non-modal.

### Dialog with one Action

![O3DE Dialogs with icons, primary](/images/tools-ui/dialogs/dialog-with-one-action-primary.png)

Use the following variant if the user is either accepting/agreeing to something or if the dialog is purely informational.

![O3DE Dialog with icons, secondary](/images/tools-ui/dialogs/dialog-with-one-action-secondary.png)


### Dialog with two Actions

When using a dialog with two actions, the secondary button is on the right and the primary button is placed on the left.

![O3DE Dialog with two actions](/images/tools-ui/dialogs/dialog-with-two-actions.png)

### Dialog with multiple Messages

In certain situations, multiple error messages can be consolidated into a single dialog. Consider using this when a set of actions are occurring, and the user doesn't have to evaluate them on at a time. This will help to avoid bombarding the user with modal windows.

![O3DE Dialog with a log of errors](/images/tools-ui/dialogs/dialog-with-multiple-messages-log.png)

Ideally, the dialog message should have a Body that consolidates its purpose. Provide a collapsible table, so they can view details if desired.

![O3DE Dialog with a log of errors, closed state](/images/tools-ui/dialogs/dialog-with-multiple-messages-closed.png)

When possible, link to log file(s) when adding additional details. This will allow users to resolve their issue(s), and will expedite their workflow.

![O3DE Dialog with a log of errors, closed state](/images/tools-ui/dialogs/dialog-with-multiple-messages-open.png)

### Dialog with a long Message string

In certain situations, the error shown in the dialog might need to be detailed. Consider using a dialog with a scrollbar, as shown in the image below.

![O3DE Dialog with a long message](/images/tools-ui/dialogs/dialog-with-long-message.png)

## Best practices for Dialogs

* Use dialogs sparingly. Dialogs are disruptive and can annoy the user if used incorrectly or repeatedly.
* Use modal dialogs to stop the user's workflow until they resolve the dialog. 
* Use modal dialogs as a part of a positive reinforcement of a workflow.
* Only use dialogs if the purpose of message is actionable. 
