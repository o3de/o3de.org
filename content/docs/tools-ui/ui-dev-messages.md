---
linktitle: UI Messages
title: Design Guidelines for UI Messages in Open 3D Engine
description: Learn about the design models and best practices for O3DE UI messages, including error messages and notifications.
weight: 500
toc: true
---

Are you developing user interface (UI) components that extend **Open 3D Engine (O3DE)**? Learn how to craft meaningful and useful user interface (UI) messages that help your users by reviewing the principles and best practices in this topic. UI messages indicate the status of a component, such as error, failure, warning, information, and success messages. This document covers various types of messaging including *Toast*, *Inline Notification*, *Dialog*, *Console Log*, *Event Log*, *Event Table*, *Component Card*, and *Text Input Validation*.

Consistent styling in O3DE messages is crucial because it reduces the cognitive load on users to know how to resolve issues in future scenarios.
 
## Prerequisites

To aid in your learning, we recommend opening the **Qt Control Gallery**, a Qt widget library that demonstrates UI elements and allows you to program and preview additional elements. The QT Control Gallery is built when you build O3DE and is located in the engine's `build/<platform>/bin/<configuration>` directory.

For more information, refer to [O3DE Qt Control Gallery Tool](/docs/tools-ui/uidev-control-gallery/)


## Standard Icons

The standard icons built into O3DE are the **Error**, **Warning**, **Success**, and **Information** icons. They communicate different severity levels of information to users.

These icons are displayed on various O3DE UI systems such as *Toast Messages*, *Dialogs*, and *Message Boxes*. They are also commonly displayed within *Event Logs*, *Console Logs*, and *Component Cards*.

### Error / Failure Icon

![O3DE Standard Error or Failure Icon](/images/tools-ui/overview/standard-icons/error-or-failure.png)

Indicates that a process has failed, or there is an error that requires immediate user action---that is, the user might be critically impacted, or in a potentially irreversible state. Errors or failures may be an irregularity in the engine, a malfunctioning feature, or a request from the user to confirm a destructive action.

*Used for: errors, failure, failed processes, emergencies, urgent alerts*

In O3DE, we define two different terms to describe an issue: *Error* and *Failure*. An *Error* is the deviation from the actual and expected output. A *Failure* is the inability of the system to perform a required function.

### Warning Icon

![O3DE Standard Warning Icon](/images/tools-ui/overview/standard-icons/warning.png)

Indicates a situation that requires corrective action from the user to prevent a critical fault, or a situation in which a non-critical error has occurred. Warnings don't indicate immediate impact on the user, but they suggest that the user performs a preventive action for a streamlined workflow.

*Used for: warnings, unavailability, caution, prevention, instability*


### Success Icon

![O3DE Standard Success Icon](/images/tools-ui/overview/standard-icons/success.png)

Indicates successfully finished processes and tasks, or implies that no issues are present within the system.
There is a need to provide feedback to a certain action, or that no immediate user action is required.

*Used for: success, completion, stability, active status, verification, progress indicator*


### Information Icon

![O3DE Standard Information Icon](/images/tools-ui/overview/standard-icons/information.png)

Indicates additional (non-critical) information that doesn't require action from the user. This may be used to inform the user that something is ready to view, such as for system feedback or to signify changes since the last interaction.

*Used for: information, guidance, exceptions*


## Message colors

In messages, semantic colors indicate the purpose of a message, which users can quickly recognize by the color. For instance, the color green has positive connotations, so it's used to communicate success or confirmation.

- Error: `#FA2727`
- Warning: `#FFAA22`
- Success: `#58BC61`
- Information: `#1E70EB`
- Information icon: `#FFFFFF`

![O3DE Message Colors](/images/tools-ui/overview/colors.png)


## Toasts

In O3DE, *toast messages* are non-disruptive notifications. They can be displayed in the middle of a user's workflow without hindering the user's actions. They should appear over page content or above most elements on the bottom-right corner of the window.

The following example demonstrates a toast that appears at the bottom-right corner of the **O3DE Animation Editor** window.
![Example of a floating toast in the O3DE Animation Editor](/images/tools-ui/toasts/floating-toast-message-in-animation-editor.png)

### Using standard icons

Toasts convey the message's intent and must correspond with an appropriate icon to provide a consistent experience for the users. The following image shows toasts of different message intents: error/failure, warning, success, and information. 

Refer to the following table to determine what icon to use in your toast, depending on the message's use case. 

![Floating Toasts - Decision Table](/images/tools-ui/toasts/floating-toasts-decision-table.png)

#### Examples

![Floating Toasts - Messages](/images/tools-ui/toasts/floating-toasts-messages.png)

### Specifications

* Toasts are passive and non-disruptive messages. They shouldn't hinder the user's workflow.
* Toast messages must be clear and concise---a maximum of two lines.
* Toasts must disappear after three seconds (or a maximum of five seconds). An exception is if the message includes a link that requires the user to take action for the toast to disappear.
* Multiple toasts should not be stacked horizontally or vertically, as this may block the user's workflow.
* The icon within a toast must be a standard icon: error/failure, warning, success, or information icon.
* The toast must have a fixed width and should not expand to fit the content area.
* Toasts must not contain a call-to-action button.
* Toasts must appear above page content and on a screen where overlay layers are appropriate.
* Toasts must not be used within a modal. Consider using them within larger systems like **O3DE Editor**, **Material Editor**, **Viewport**, and so on.


![Floating Toast Messages - Best Practices](/images/tools-ui/toasts/floating-toast-messages-best-practices.png)


### UI dimensions

| Property | Specification |
|--|--|
| Icon Size | 24 x 24px |
| Padding | 12px |
| Border Radius | 6px |
| Font | Open Sans |
| Weight | 400 |
| Line Height | 16px |

![Floating Toast, marked up](/images/tools-ui/toasts/floating-toasts-message-markup.png)


### Toasts with links

Toasts that contain links in the subtitle text must do the following:

* Persistantly display and don't automatically disappear, unlike a standard toast.
* Display a manual close button.
* Point outside the system, not to another part of the application.

![Floating Toasts - Messages with Links](/images/tools-ui/toasts/floating-toasts-messages-with-links.png)


## Inline notifications

Inline notifications are non-disruptive messages that are confined to a specific area within the interface. These are displayed when there is a need to display immediate feedback to the user. They are frequently used as an alternative to toasts, in conjunction with log tables, and within component cards.

![Inline Toast Messages](/images/tools-ui/inline-notifications/inline-toast-messages.png)

### Specifications

* Inline notifications persistantly display until they are dismissed by the user, or until the issue is resolved.
* Inline notification messages must be clear and concise---one line is recommended.
* Inline notifications are initiated in response to user action during the user's workflow, or by the system (independent of user action).
* Inline notifications can contain a single call-to-action button that's related to the message.
* Inline notifications must appear appear only on screens that have more than one operational purpose. For instance, they can appear within non-modal dialogs, but cannot appear inside modal dialogs.
* Inline notification messages must not be used in place of a log file.


### UI dimensions

| Property | Specification|
|---|---|
| Icon Size | 24 x 24px |
| Padding | 10px |
| Fill | Specific color opacity: 10% |
| Border | Specific Color |
| Font | Open Sans |
| Weight | 400 |
| Size | 12px |
| Line Height | 20px |

![Inline Toast - Markup](/images/tools-ui/inline-notifications/inline-toast-markup.png)

### Best practices

* Place inline notifications at the top of the content.
* Inline notifications must not cover any content. 
* Do not stack multiple inline notifications. Instead, show them one at a time, sequentially and in order of priority, without blocking any user action.
* The icon within the notification must be one of the following standard icons: error/failure or warning.
* Messages must be descriptive and guide users with explicit next steps.
* Use inline notifications to redirect the user's focus from the current interface and onto the message.
* Messages can include a helper link that points outside of the system and not to another part of the application.

![Inline Error with CTA](/images/tools-ui/inline-notifications/inline-error-with-cta.png)

### Multiple line messages

It's recommended that inline notification messages fit on one line. However, if they fit on multiple lines, ensure the following:

* Use a bulleted list to present a list of issues. A list is helpful to draw the user's attention to important information.
* Within the non-modal dialog, guide the user towards their next steps and on how to resolve the issue.

![Inline Toast - Multi-line](/images/tools-ui/inline-notifications/inline-toast-multiline.png)


## Inline notifications in component cards

Inline messages in component cards are displayed to indicate an error/failure or warning status. Inline messages inform users on how to recover or resolve the issue.

![Inline Error in Component Cards](/images/tools-ui/inline-notifications/inline-notifications-in-component-cards-decision-table.png)

#### Examples 

![Inline Error in Component Cards](/images/tools-ui/inline-notifications/inline-notifications-in-component-cards.png)

### Specifications

* Inline messages must persist in the component cards.
* Avoid stacking multiple inline messages horizontally or vertically. Instead, display the messages one after the other as the user resolves each issue.
* Keep the messages clear and concise---a maximum of two lines.
* The icon within the inline message must be a standard icon: error/failure or warning.
* Inline messages can contain a call-to-action button only when necessary.
* The inline message must appear above the component card's content.
* The component card's header has a gray caution pattern background and displays the icon. This indicates the status of the component card even when it's collapsed.

### UI dimensions

| Property | Specification |
|---|---|
| Icon size | 24 x 24px |
| Padding | 8px |
| Fill | Warning color opacity: 10% |
| Border | Warning color code |
| Font | Open Sans |
| Weight | 400 or 600 |
| Size | 12px |
| Line weight | 16px |

![Inline Messages in Component Cards - Markup](/images/tools-ui/inline-notifications/inline-messages-in-component-cards-markup.png)


## Dialogs

*Dialogs* inform users about specific tasks and can contain other relevant information or request user input. A dialog is highly disruptive to the user and must be used sparingly. Dialogs may be prompted by the user's action, or by the system to request input from the user or to give users critical information about their workflow.

### Structure of a dialog

1. **Header**: Contains a title and close button.
2. **Close Button**: Closes the dialog without resolving the issue.
3. **Icon**: One of the standard icons and has a size of 48 x 48px.
4. **Body**: Contains information reagrding the user's task and how to resolve it. 
5. **Actions**: The primary and/or secondary call-to-action buttons needed to resolve or exit the dialog task.

![Dialog Structure](/images/tools-ui/dialogs/dialog-structure.png)

### Types of dialogs

| Type | Usage |
|--- |--- |
| Modal | Displays critical information or requests necessary input from the user. |
| Non-modal | Displays relevant information or requests non-critical input from the user that might not be needed to complete the user workflow. |

![Modal and non-modal dialogs](/images/tools-ui/dialogs/modal-dialog-and-non-modal-dialog.png)

### Specifications

* Dialogs should not include the O3DE Logo Mark in the header.
* The title in the dialog's header must briefly describe the dialog's task or purpose.
* The title and body must contain relevant information to help users complete the dialog's task. Refer to the [Writing Messages](todo) for more details. 
* A dialog must contain only one icon, which must be from the standard icons. 
* The dialog's action(s) must have a primary button and may include a secondary button. 
* Keep the button text actionable, and that the primary action is highlighted by this button.

### Example dialogs

#### Dialog without Icon

![O3DE Dialog without icon](/images/tools-ui/dialogs/dialog-without-icon.png)

It is not essential for a dialog to include the Icon, however we recommend using this dialog variation as a non-modal.

#### Dialog with one Action

![O3DE Dialogs with icons, primary](/images/tools-ui/dialogs/dialog-with-one-action-primary.png)

Use the following variant if the user is either accepting/agreeing to something or if the dialog is purely informational.

![O3DE Dialog with icons, secondary](/images/tools-ui/dialogs/dialog-with-one-action-secondary.png)


#### Dialog with two Actions

When using a dialog with two actions, the secondary button is on the right and the primary button is placed on the left.

![O3DE Dialog with two actions](/images/tools-ui/dialogs/dialog-with-two-actions.png)

#### Dialog with multiple Messages

In certain situations, multiple error messages can be consolidated into a single dialog. Consider using this when a set of actions are occurring, and the user doesn't have to evaluate them on at a time. This will help to avoid bombarding the user with modal windows.

![O3DE Dialog with a log of errors](/images/tools-ui/dialogs/dialog-with-multiple-messages-log.png)

Ideally, the dialog message should have a Body that consolidates its purpose. Provide a collapsible table, so they can view details if desired.

![O3DE Dialog with a log of errors, closed state](/images/tools-ui/dialogs/dialog-with-multiple-messages-closed.png)

When possible, link to log file(s) when adding additional details. This will allow users to resolve their issue(s), and will expedite their workflow.

![O3DE Dialog with a log of errors, closed state](/images/tools-ui/dialogs/dialog-with-multiple-messages-open.png)

#### Dialog with a long Message string

In certain situations, the error shown in the dialog might need to be detailed. Consider using a dialog with a scrollbar, as shown in the image below.

![O3DE Dialog with a long message](/images/tools-ui/dialogs/dialog-with-long-message.png)

### Best practices for Dialogs

* Use dialogs sparingly. Dialogs are disruptive and can annoy the user if used incorrectly or repeatedly.
* Use modal dialogs to stop the user's workflow until they resolve the dialog. 
* Use modal dialogs as a part of a positive reinforcement of a workflow.
* Only use dialogs if the purpose of message is actionable. 

## Log tables

Log tables are used to convey a long stream of notification updates that occurred in succession. Each item in the log table is accompanied by a status indicator, which informs the user of items that require the user's attention. These are frequently used to signal errors/failures, warnings, or notification. As an example, the following image shows a log table with status indicators next to each item in the **Asset Processor**.

![Event Log](/images/tools-ui/event-log/event-log.png)

A log table may contain two sections. In the first section, a table that displays an error will show a secondary box that allows users to expand on specific errors to get their full details. The importance of this section is it gives users enough information to understand the errors. The second section contains a table that displays how users can resolve errors or links to help documentation.

## Console log

A console log is a log table that consists of console messages. Console messages are color-coded and prefixed with their status to help users differentiate between the messages.

The following table shows the prefix and color for each use case:

![Console Log decision table](/images/tools-ui/console-log/console-log-decision-table.png)

**Example**

![Console Log message example](/images/tools-ui/console-log/console-log-messages.png)

#### Specification

- Console messages must follow the format:
  
  ```
  [STATUS] (System Affected) - [# of Problems] - Problem. Ways to resolve the problem.
  ```

- Use the following colors for the text, depending on the console message's status and console log's theme:
  - Dark theme: 
    - **Error/Failure**: `#FA2727`
    - **Warning**: `#FFAA22`
  - Light theme: 
    - **Error/Failure**: `#C80000`
    - **Warning**: `#807000`

  ![Console Log - Error and Warning examples](/images/tools-ui/console-log/console-log-state-colors.png)

#### Best practice

* Console messages should use plain text. Do not use rich text, such as icons and formatted text.
* Console messages are considered passive and may not be seen by the users.
* Multiple messages of the same status should appear in succession. For example, list all warnings, then list all errors/failures. 


### Custom theme

You can customize the theme of the console log to suit your preference. There are two themes, **Light** and the default **Dark**.
- Light theme background color: `#FFFFFF`
- Dark theme background color: `#111111`

![Console Log - Global Preferences](/images/tools-ui/console-log/global-preferences.png)

To customize the background: 

1. In the Editor, open the **Edit** dropdown in the tools menu. 

2. Select **Editor Settings** > **Global Preferences...** to open the **Preferences** dialog.

3. For **Console Background** under the **General Settings** group, select a theme option. 

4. Save your settings by clicking **OK**. 

* * *

## Text input validation

Text input validation is the process in which a system checks if the user provides the correct information. For invalid text, effective notification messages help the user understand the issue and how to resolve it. 

The message must appear only after the user interacts with the field. If they input incorrect data, inform the user on what has happened by displaying the appropriate icon by the input field. In addition, provide further information in a tooltip, which appears when the user hovers over the input field. 

**Example**

![Input Validation Error or Failure](/images/tools-ui/text-input-validation/text-input-validation.png)

### Error/failure icon

![Error/failure icon for text input validation](/images/tools-ui/text-input-validation/input-validation-error-or-failure.png)

Use this icon to represent an error or failure within a text input validation message. You may exclude this icon for smaller input fields that don't have space icons. The error/failure icon for text input validation differs from the standard error/failure icon to avoid confusion when both icons are used.


### Tooltips

For text input validation, tooltips appear when users hover over the icon or input field. 
In this case, a tooltip contains information to help users resolve invalid input fields. 

#### Specifications

* Use the tooltip with the error or warning icon, not with any other element.
* The tooltip message must contain plain text. Don't include rich information, such as images and formatted text.
* Display the tooltip as long as the user hovers over the element.

![Text Input Validation Tooltips](/images/tools-ui/text-input-validation/text-input-validation-tooltips.png)

## Guidelines for writing effective messages

In this section, you will learn how to write great error messages for O3DE. 

Why do we care about error messages? Shouldn't the user figure out why their code failed or their operation didn't work? Not at all. The customers expect a seamless experience without any errors. However, errors occur and error messages can ease and help customers overcome them.

Great error messages can salve the sting of an unexpected error. Poor ones can lead to negative feedback or cause the customer to abandon your product completely. An effective and helpful error message acknowledges the inconvinience on the user and reassures them with guidance to work around it.

Handling errors well and writing good error messages requires more effort, but produces the following worthwhile advantages: 

* Reduces user frustration and improves productivity throughout the product's experience.
* Leads users towards better behaviors in code and UI development and use.
* More informative and actionable bug reports.
* Better code and UI implementation overall.

**Example**

Consider the following pair of examples for the same issue.

Bad example:

```error
ERROR: Cannot complete operation. Maximum range value exceeded.
```

Good example:

```error
This operation requires positive integer values between 0 and 127. Please choose a value in this range before rebuilding the scene.
```

The first example is discouraged because it forces the user to figure out the problem through trial and error without providing any information that leads them towards the correct solution. The second example makes it immediately clear to the user what they did wrong and provides guidance on how to prevent the error next time. This error message helps the user and may save them from future frustration. Additionally, bespoke and well-designed error messages implicitly communicates consideration for the user. 

Poor error messages erode trust and increase frustration. Great error messages enable the user to continue work and provide implicit guidance around improved practices. 


### Writing principles

The most common mistake when presenting errors to a user is displaying low-level errors and exceptions thrown by code directly to the user without editing them to make it user friendly. The most effective error messages are ones that any user and developer can understand. O3DE is tool for builders, so it's important that error messages can reach a wide audience.

The writing principles on this page will help you think strategically about developing good error messages and practice good development habits for code and UI.

To start, we'll look at two categories of error message: error messages for code operations and error messages for application users (UI).

#### Error messages for code operations

Error messages first appear as code-level error descriptions. A poor error message simply passes this error message to the end-user in a dialog widget or console interface. Instead, you can improve the user's overall experience with your code by authoring your error messages that's suitable for all audiences, not just technical experts.

The following points help you authore good error messages for code operations: 

* Be clear and concise. Short messages are better than long ones, but don't leave out any essential details. Make every word count! Use basic, proper English grammar. Avoid  complex phrasing or idioms.

  * Consistently use a passive voice and past-tense. For an example of passive voice, use "An error occurred...", instead of "We found an error...". This mitigates judgement in the tone of voice. Additionally, use past-tense, such as "occurred", because the error has already happened and is not in the process of occurring.
  
* Don't pass the default description of a low-level error to the end user. An effective error message may contain technical information transcribed for end-users of varying levels of knowledge. This is especially important if the default error message is inscrutable or useless by itself. Every little detail helps.

* Format your error messages for readability and clarity. For example, white space or a pair of quotation marks can clarify text and reduce user irritation.

* Don't dump code into an error message. Code takes up space in the error message and makes the message harder to scan. Rather, the user can see the code in their integrated development environment (IDE).
  
* Write error messages with the least technical context and terminology possible. For example, errors that raise up to the user interface should concern the user's interaction and not problems at the code-level. Choose words that best fit that context and avoid deeper code-level jargon whenever possible. 
    
    For example, suppose a developer encounters an error with the user interface, such as a secondary menu failure. An unhelpful message may be `STACKOVERFLOWEXCEPTION: SYSTEM STATE UNKNOWN". This message is highly alarming to the user and does not help them understand the problem. A better message may be "ERROR: A stack overflow error occurred when updating the menu element tree. Please report this error and restart the application." Users may need additional context, so consider adding a comment that this message should be rewritten depending on the context if it can appear in the UI.

  * Avoid "compiler-speak". Use the most viable and least specific terms that describe the error. Focus on the way the user perceives the error, not the compiler or the run-time. For example, a message with compiler jargon may be "ERROR: The operation cannot complete due to unsafe type usage when unmarshalling thread context". This is confusing and concerning to the user. A better message may be "ERROR: The operation cannot complete as the context cannot be determined. Check to see if any types used to recreate this work are unsafe." Also, this makes it easier for UI writers to craft an appropriate UI-level message.
  
* Signal next steps that the system takes or for the user to take wherever viable.

* Provide hints to code definitions if the context of the message is appropriate. For example, "Expected a type HANDLE_T * for the first parameter in ProcessBlobSync(). HANDLE_T is defined as a shared macro in common.h." This message is appropriate to developers, but may be inscrutable on the UI-level.

* Avoid judgement in the tone of the message, especially if the error originates from a third-party library or binary. Instead of blaming the code, state the problem clearly and objectively. For example, "The operation could not complete due to a misconfiguration between O3DE and the CoolGraphicsV3 Gem. Please report this issue on GitHub".
  
* Use an empathetic tone as though the error message appears in the user interface or the IDE, and not the command-line. To help you establish this tone, imagine that you are enountering this error for the first time as a new developer. Ask yourself whether or not you would find this error message clear and helpful, or opaque. Remember, it may not be an experienced developer who sees your error message.

#### Error messages in UI

Writing informative and actionable error messages for end users who are working in a UI is an art form. Too often, developers send error messages from the code directly to the user interface without writing a simplified and helpful message that all users can comprehend. This is important because not all users are experienced developers or developers at all.

The following rules will help you write better messages in the UI:

* Avoid jargon and technical terms unless the context is immediately apparent or if the terminology directly applies to the user's code or actions. Don't introduce new technical ideas that aren't covered in the immediate context. If it is a low-level error and some code or algorithm jargon is unavoidable, provide a clause or a sentence that clarifies it in more accessible terms.
* Describe the error in terms of the action that the user took. Avoid a tone that blames the user. You can achieve this by using a passive voice, rather than an active voice. For example:
  * BAD (active voice): "You entered an incorrect value for Gradient Range."
  * GOOD (passive voice): "The Gradient Range input field requires a value between 0 and 63."
* To respect the user's cognitive focus, don't overwrite the error message or provide too much detail. Aim to shorten error messages to less than 200 characters, if possible. Shorter is often better, but some errors may require detailed explanation --- try to limit the number of long error messages. 
* If the message reflects a composite or aggregated error, format it clearly and clarify the issues that occurred and its causality.
* If the error is common, provide a clickable link to a troubleshooting document, if one exists. Providing a link reassures the user that the problem is common and they can find help from a documentation.
* If the error requires a lot of detail to understand and resolve, consider requesting a troubleshooting documentation for it. Don't try to fit all the information in the UI message.
* Separate messaging from any essential technical details (such as a file name, path, or other programmatic data).


### Error message guidelines

Error messages commonly occur in low-level code, in APIs, and in the UI. Writing error messages at each levels can vary as they appear at different levels of technical context and for different user roles.

Overall, observe these guidelines when writing error messages at any level:

* Include the following elements in the error message: 
  * Description of error
  * Technical details (optional)
  * Next steps or links to further assistance (optional)
  
* Use passive voice.

* Be specific.

* Don't use all uppercased text. 

* Use proper U.S. English syntax.

* Try to keep error message at a maximum of 200 characters. Short messages are better, but use your judgement when longer error messages are needed. Optimize your character space by simplifying sentences where possible.

* Use simple grammar. Target a U.S. 8th grade reading level.

* Avoid technical jargon in end user UI messages. Be considerate of the developer's understanding when using jargon in code-level error messages. Consider including a clause of sentence to explain jargon if helpful. 

* Focus on the end user's immediate needs, not your own.

* Reread your work to check for spelling or grammatical errors.


#### Example

The following examples demonstrate how to apply these guidelines in an error message. 

**Example 1**

Consider the context in which a user fails to provide correct credentials to a service.

BAD:

```error
ERROR: CREDENTIALS NOT FOUND. WE CANNOT AUTHORIZE YOU.
```

REWRITTEN:

```error
Oops! The password you provided didn't match our records. Can you try again?
```

**Example 2**

Consider an error that flows from low-level code to developers or other end users at the API level and UI level

BAD (low-level code):

```error
An error occurred at line 258, col 8 in arglebargle.cpp. Pointer returned null.
```

REWRITTEN (API level):

```error
An error occurred when the operation received a null pointer. A null pointer is not allowed for the target data when calling RenderToTarget(handle, target, options).

Details:
- File: arglebargle.cpp
- Line: 258
- Column: 8
```

REWRITTEN (UI level):

```error
Oh no! The target for rendering your scene was not defined. This is a serious error in our code. Please report it at <link to GitHub issues> and provide any relevant details.
```

The examples above demonstrate how you can provide clear, informative, and actionable details, and adapt it for a specific audience. Always think about who might see your error message and when it might occur.


### Best practices

To summarize the key points when writing error messages: 

* Above all else, aim for clarity. Ask yourself: "_If I got this message while doing my job and I was new to this product or code, what would help me move forward or avoid this error in the future?_" Never make the user guess. If you can get further details from the run-time or the existing code, do so, even if it seems tedious. Your extra effort will save your users countless hours in the future.

* If you are working on developer-focused code (as opposed to UI code), provide detailed code comments around your error handling and messages. This will help UI error message writers better understand the context and create better end-user messages.

* Use a natural, friendly voice. Write error messages with empathy, as though you were advising a fellow developer or a new user. It's okay to lead with "Sorry" or "Oops!" if you feel that the error might be in a really disruptive context. Consider localization before you employ sympathetic idioms. Don't assume the user's technical knowledge. Even terminology that seems standard for developers can feel unnatural and frustrating, especially to developers or users who are learning the product. Be aware of including "programmer" text, which makes the error feel arbitrary and cryptic, as though it's not intended for the user to see. Remember the purpose of an error message and write them with respect to that: an error is an issue we knew might occur and we're alerting you, the user, to help you out.

* Avoid hard-coding error messages. Instead, store error message in data objects, such as a JSON file, a CSV, or a flat-text model of your own implementation. This acts as a "dictionary" file that you can refer to and access using a unique token or handle. This system makes it easier for developers to do code reviews and maintenance without risking build errors or regressions. It also allows for more straightforward and cheaper localization. Document your schema or format to help others understand and maintain it.

* Ask a technical writer or UX expert to review your error messages. When receiving a review in a GitHub pull request (PR), call out your updated error strings and add comments to provide any relevent information. This improves collaboration between you and your reviewer and eases the process to get your updates approved.


### More resources

For more reading, check out [Jakob Nielsen's guidance on writing good error messages](https://www.instructionaldesign.org/bad_error_messages/).