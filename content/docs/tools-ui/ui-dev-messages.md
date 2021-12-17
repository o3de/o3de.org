---
linktitle: UI Messages
title: Design Good O3DE UI Messages
description: Learn about the design models and best practices for O3DE UI messages, including error messages and notifications.
weight: 500
toc: true
---

Are you developing user interface (UI) components that extend **Open 3D Engine (O3DE)**? Learn how to craft meaningful and useful user interface (UI) messages that help your users by reviewing the principles and best practices in this topic. UI messages indicate the status of a component, such as error, failure, warning, information, and success messages.

This document covers various types of messaging including *Toast*, *Inline Notification*, *Dialog*, *Console Log*, *Event Log*, *Event Table*, *Component Card*, ** and *Text Input Validation*.

## Design and Deliver Good User Interface Messages for Open 3D Engine (O3DE)

We believe that consistency in O3DE messages is crucial, as it reduces the cognitive load on how issues can be resolved for future scenarios.

As a prerequisite, we recommend having access to the [**Qt Control Gallery**](https://o3de.org/docs/tools-ui/uidev-control-gallery/), a pre-built library which allows you to incorporate additional elements, to get started.

**Jump to a specific section**:

* [Standard Icon Guidelines](#standard-icons)
* [Message Color Guidelines](#message-colors)
* [Toast Guidelines](#toasts)
* [Inline Notification Guidelines](#inline-notifications)
* [Dialog Guidelines](#dialogs)
* [Log Table Guidelines](#log-tables)
* [Console Log Guidelines](#console-logs)
* [Text Input Validation](#text-input-validation)
* [Tooltip Guidelines](#tooltips)
* [Error Message Strings Best Practices](#error-message-strings-best-practices)

**Related Guide:** [**O3DE Qt Control Gallery Tool**](/docs/tools-ui/uidev-control-gallery/)

* * *

### Standard Icons

The standard icons are the **Error**, **Warning**, **Success**, and **Information** icons that are a part of O3DE. They are an important way to communicate severity levels for information to users.

These icons are notable, as they are displayed within various O3DE systems such as *Toast Messages*, *Dialogs*, and *Message Boxes*. They are also commonly displayed within *Event or Console Logs*, and *Component Cards*.

#### Error / Failure Icon

![O3DE Standard Error or Failure Icon](/images/tools-ui/overview/standard-icons/error-or-failure.png)

Indicates that a process has failed, or there is an error that requires immediate user action—that is, the user might be critically impacted, or in a potentially irreversible state.
There might be an irregularity in the engine, a malfunctioning feature, or the user might have to confirm a destructive action.

*Used for: errors, failure, failed processes, emergencies, urgent alerts*

We give two different labels for an issue: *Error* and *Failure*. There are a plurality of different definitions, the one we prefer is that an *Error* is the deviation from the actual and expected output, and a *Failure* is the inability of the system to perform a required function.

#### Warning Icon

![O3DE Standard Warning Icon](/images/tools-ui/overview/standard-icons/warning.png)

Indicates a situation which requires corrective action, to prevent a critical fault in the future, or if a non-critical error has occurred.
There is hardly any impact to the user, but they should perform the preventive action for a streamlined workflow.

*Used for: warnings, unavailability, caution, prevention, instability*

#### Success Icon

![O3DE Standard Success Icon](/images/tools-ui/overview/standard-icons/success.png)

Indicates successfully finished processes, completed tasks, or implies that no issues are present within the system.
There is a need to provide feedback to a certain action, or that no immediate user action is required.

*Used for: success, completion, stability, active status, verification, progress indicator*

#### Information Icon

![O3DE Standard Information Icon](/images/tools-ui/overview/standard-icons/information.png)

Indicates additional (non-critical) information is available, but doesn't need explicit action from the user.
There is something that is ready to view, for system feedback, or to signify changes since the last interaction but don't require explicit action.

*Used for: information, guidance, exceptions*

* * *

### Message Colors

We use semantic colors to indicate purpose; these help users convey specific messages. For instance, green has positive connotations, so it's used to communicate success or confirmation.

![O3DE Message Colors](/images/tools-ui/overview/colors.png)

* * *

### Toasts

Toasts display messages that are used as non-disruptive notifications. That is, these messages can be displayed in the middle of a user's workflow, but should not hinder any actions. They should appear over page content, or above most elements on the bottom-right corner of the window.

![Example of a floating toast in the O3DE Animation Editor](/images/tools-ui/toasts/floating-toast-message-in-animation-editor.png)

O3DE Toasts convey the message intent, and should correspond with an appropriate icon to provide a consistent experience for the users.

![Floating Toasts - Messages](/images/tools-ui/toasts/floating-toasts-messages.png)
![Floating Toasts - Decision Table](/images/tools-ui/toasts/floating-toasts-decision-table.png)

#### General specification for Toasts

* Toasts must disappear after three seconds (or a maximum of five seconds), unless the message includes a link wherein the toast can persist on the screen until action is taken.
* Multiple toasts should not be stacked, as this might block any user action.
* Keep the messages clear and concise, a maximum of two lines.
* The icon within a toast must be a standard icon: error/failure, warning, success, or information icon.
* It must not contain a call-to-action button.
* The toast should appear above page content, and on a screen where overlay layers are appropriate.
* This toast must not be used within a modal, consider using it within larger systems like Animation Editor, Material Editor, Viewport, etc.

![Floating Toast, marked up](/images/tools-ui/toasts/floating-toasts-message-markup.png)

|||
|--|--|
| **Icon Size:** | 24x24px |
| **Padding:** | 12px |
| **Border Radius:** | 6px |
| **Font:** | Open Sans |
| **Weight:** | 400 |
| **Line Height:** | 16px |

#### Best practices for Toasts

* Toasts are passive in nature, and should not hinder the user's workflow
* Keep the messages clear and concise.
* The toast must disappear after five seconds, unless the message contains a link.
* The toast must have a fixed width, and should not expand to fit the content area.
* It should not cover any page content, and multiple toasts must not be stacked horizontally.

![Floating Toast Messages - Best Practices](/images/tools-ui/toasts/floating-toast-messages-best-practices.png)

#### Toasts with links

It is possible that a toast will have a link in its subtitle text, ensure the following:

* Display a manual close button with the text.
* Unlike a standard toast, this message must persist and should not automatically disappear.
* The link must point outside the system, and not to another part of the application.

![Floating Toasts - Messages with Links](/images/tools-ui/toasts/floating-toasts-messages-with-links.png)

* * *

### Inline Notifications

Inline Notifications, similar to Toasts, are non-disruptive; and are confined to a specific area within the interface. These are displayed when there is a need to display immediate feedback to the user. They are frequently used as an alternative to Toasts, in conjunction with Log Tables, and within Component Cards.
![Inline Toast Messages](/images/tools-ui/inline-notifications/inline-toast-messages.png)

#### General specification for Inline Notifications

* Inline notifications can persist until they are dismissed by the user, or until the issue is resolved.
* Keep the messages clear and concise. We recommend one line. If absolutely necessary, an exception can be made.
* They are initiated in response to user action during the user's workflow, or by the system (independent of user action).
* The notification can contain a single call-to-action button which must be related to the message.
* It should only appear on screens which have more than one operational purpose. For instance, they must not appear inside Modal Dialogs, but can appear within Non-Modal Dialogs.
* These messages must not be used in place of a log file.

![Inline Toast - Markup](/images/tools-ui/inline-notifications/inline-toast-markup.png)

|||
|---|---|
| **Icon Size:** | 24x24px |
| **Padding:** | 10px |
| **Fill:** | *Specific Color* Opacity: 10% |
| **Border:** | *Specific Color* |
| **Font:** | Open Sans |
| **Weight:** | 400 |
| **Size:** | 12px |
| **Line Height:** | 20px |

#### Multi-line Inline Notifications

It is possible to have inline notifications with multiple lines, but ensure the following:

* Use a bulleted list to present a list of issues, this will draw the user's focus onto the important information.
* Within the modal itself, provide clear guidance to the
* Provide clear guidance to the user's next steps, and on how to resolve the issue.

![Inline Toast - Multi-line](/images/tools-ui/inline-notifications/inline-toast-multiline.png)

#### Inline Component Card messages

Inline messages in Component Cards are displayed within context, and should provide actions to highlight what the user should take to recover from the error or resolve the outstanding warning. Currently, we don't provide success or information messages for component cards. However these are patterns we are working on next.

|Icon |Acceptable Usage |
|--- |--- |
|Error / Failure |Informs the user of an error or critical failure, and optionally blocks them from proceeding until the issue has been resolved. |
|Warning |Inform users of a non-critical error or unexpected result, or that an action was taken which is not desirable. |

![Inline Error in Component Cards](/images/tools-ui/inline-notifications/inline-notifications-in-component-cards-decision-table.png)

![Inline Error in Component Cards](/images/tools-ui/inline-notifications/inline-notifications-in-component-cards.png)

#### General specification for Inline Component Card messages

* Inline messages must persist in the component cards.
* Multiple inline messages should not be stacked, instead display the messages one after the other as the user resolves their errors.
* Keep the messages clear and concise, a maximum of two lines.
* The icon within the inline message must be a standard icon: error/failure or warning.
* Dependent on the context, the component card should contain a call-to-action button.
* The inline message should appear above the card content.
* Because a component card can be minimized we also show state in the header with a gray caution pattern with the icon that is being used inside the component card.

![Inline Messages in Component Cards - Markup](/images/tools-ui/inline-notifications/inline-messages-in-component-cards-markup.png)

|||
|---|---|
| **Icon Size** | 24x24px |
| **Padding** | 8px |
| **Fill** | Warning Color Opacity: 10% |
| **Border** | Warning color code |
| **Font** | Open Sans |
| **Weight** | 400 or 600 |
| **Size** | 12px |
| **Line Height** | 16px |

#### Best practices for Inline Component Card Messages

* Inline Messages should be placed at the top of the card content, and should not cover any of the content.
* Only one inline message should be shown at a time.
* Keep the message under two lines.
* Be descriptive, and give users guidance on the steps to take to resolve their error.
* Error or warning states can include a helper link. The link should linked outside of O3DE and not to other parts of the applications

#### Best practices for Inline Notifications

* Inline notifications must be placed at the top of the content.
* Do not cover any content with the toast.
* If there are multiple notifications only show them one at a time, sequentially and in order of priority, without blocking any user action.
* The icon within the notification must be one of the standard icons.
* The message must be descriptive, and should give the users explicit next steps.
* Use inline notifications if your intention is to redirect the user's focus on the message, and to take it away from the current interface.

![Inline Error with CTA](/images/tools-ui/inline-notifications/inline-error-with-cta.png)

* * *

### Dialogs

Dialogs are used to inform users about specific tasks, and may include relevant information or request user input. A dialog is highly disruptive in nature, and must be used sparingly so as not to distract the user. It is prompted by the user's action, or also when the system needs input from the user or to give them critical information regarding their workflow.

#### Structure of a Dialog

![Dialog Structure](/images/tools-ui/dialogs/dialog-structure.png)

1. **Header:** Includes a title, and the close button.
2. **Close Button:** This will close the dialog, without resolving the issue.
3. **Icon:** Must be one of the standard icons. Its size must be 48x48px.
4. **Body:** Contains the content and information to help user understand what is needed to complete the dialog's task.
5. **Actions:** The primary and/or secondary call-to-action buttons needed to resolve or exit the dialog task.

#### General specifications for Dialogs

* Dialogs should not include the O3DE Logo Mark in the header.
* There should only be one icon used within the window, and it should be one of the standard icons.
* When using both primary and secondary call-to-actions, the primary must be on the left of the secondary button.
* The buttons must be aligned to the bottom right corner of the window.
* The header title should be brief and must describe the dialog's task or purpose.
* The Title and Body must contain the relevant information to help users to complete the dialog's task.

#### Types of Dialogs

|Type |Usage |
|--- |--- |
|Modal |Used to display critical information, or to request necessary user input. |
|Non-modal |Used to display relevant information, or some user input that might not be needed to complete the user workflow. |

All of our dialog boxes follow, mostly, the same pattern. Please adhere to the spacing guidelines with our modal window. We want to make sure the same spacing, icon size, and text sizes are standardized across all of our modal windows.
Please note that note that having a secondary section (under the line break) is not standard and is a more advanced use case.

#### Example dialogs

##### Dialog without Icon

![O3DE Dialog without icon](/images/tools-ui/dialogs/dialog-without-icon.png)

It is not essential for a dialog to include the Icon, however we recommend using this dialog variation as a non-modal.

##### Dialog with one Action

![O3DE Dialogs with icons, primary](/images/tools-ui/dialogs/dialog-with-one-action-primary.png)

Use the following variant if the user is either accepting/agreeing to something or if the dialog is purely informational.

![O3DE Dialog with icons, secondary](/images/tools-ui/dialogs/dialog-with-one-action-secondary.png)


##### Dialog with two Actions

When using a dialog with two actions, the secondary button is on the right and the primary button is placed on the left.

![O3DE Dialog with two actions](/images/tools-ui/dialogs/dialog-with-two-actions.png)

##### Dialog with multiple Messages

In certain situations, multiple error messages can be consolidated into a single dialog. Consider using this when a set of actions are occurring, and the user doesn't have to evaluate them on at a time. This will help to avoid bombarding the user with modal windows.

![O3DE Dialog with a log of errors](/images/tools-ui/dialogs/dialog-with-multiple-messages-log.png)

Ideally, the dialog message should have a Body that consolidates its purpose. Provide a collapsible table, so they can view details if desired.

![O3DE Dialog with a log of errors, closed state](/images/tools-ui/dialogs/dialog-with-multiple-messages-closed.png)

When possible, link to log file(s) when adding additional details. This will allow users to resolve their issue(s), and will expedite their workflow.

![O3DE Dialog with a log of errors, closed state](/images/tools-ui/dialogs/dialog-with-multiple-messages-open.png)

##### Dialog with a long Message string

In certain situations, the error shown in the dialog might need to be detailed. Consider using a dialog with a scrollbar, as shown in the image below.

![O3DE Dialog with a long message](/images/tools-ui/dialogs/dialog-with-long-message.png)

#### General specifications for Dialogs

* Dialogs should not include the O3DE Logo Mark in the Header.
* The Header title should be brief and must describe the dialog's task or purpose.
* The Title and Body must contain the relevant information to help users to complete the dialog's task.
* A standard icon must be used in a modal dialog, and is optional for a non-modal dialog.
* The Action(s) must include at least one primary and/or secondary button.
* Keep the button text actionable, and that the primary action is highlighted by this button.

#### Best practices for Dialogs

* Keep the wording on the buttons actionable: "Proceed", "Cancel", "OK", "Restart").
  * Do not add a small sentence to the button text. Keep it short and simple.
* In circumstances where you have an actionable button (Blue), it's recommended to have a secondary button to let the user back out of this action button (Cancel - Gray).
* If the modal has a single button consider the following. Is the user accepting or agreeing to something? Do we want them to do something or do something for them?  If the answer is yes then it should be a blue Primary button. If the modal is purely informational, it's okay to us a gray secondary button.
* In some circumstances, multiple message can be consolidated into a single modal window. Please consider this option when a set of actions is occurring and the user doesn't have to evaluate them one at a time. This will help avoid bombarding the users with modal windows.
* Ideally having a simple sentence to consolidate the purpose of this modal, so users can understand what's going on. Then providing them access to a collapsible table so they dig into the details if desired. This might not always be available, and it would be more work to wire up, but when we can present info like that, it helps a ton with debugging.
* Please consider linking to log file(s) when adding additional details. This will help user understand how to resolve these issue(s). Asking for users to pull these file out manually can be difficult and having them directly link to files will help expedite resolving their bugs.  
* In some situations when the error being printed out is a large amount of text. Consider using an internal scrollbar. Some of our user use small monitors like laptop. A very large modal will appear off screen for laptops user and the action buttons will be hard to access.

**When to use:**

**DO**: use modals when the actions of a user must be stopped before proceeding to the next steps.

**DO**: use modals as a part of a positive reinforcement of a workflow.

**DO NOT**: use when the intention of the message is passive.

**DO NOT**: use a modal as a apart of a repetitive normal workflow. This gets annoying to users.

* * *

### Log Tables

Log Tables are used to convey a long stream of notification updates that have occurred in succession. You can see this utilized within the Asset Processor.

These logs are accompanied by a status indicator, which informs the user of items that require the user's attention. These are frequently used to signal errors or failures, warnings, or notification.

![Event Log](/images/tools-ui/event-log/event-log.png)

A log table typically has two sections. First, a table which displays an error and a secondary box that allows users to click specific errors to get their full details. The information in the table gives the user enough context to understand errors. Second, a table which displays how users can recover from errors and fix them, or links which reference help and/or documentation.

### Console Logs

Console Messages are displayed in color, and are represented with a prefix to help users differentiate between the messages.

![Console Log decision table](/images/tools-ui/console-log/console-log-decision-table.png)

![Console Log message example](/images/tools-ui/console-log/console-log-messages.png)

#### General specification for Console Logs

In the Editor's Global Preferences, users can customize their preferred theme for the console background.

![Console Log - Global Preferences](/images/tools-ui/console-log/global-preferences.png)

There are two themes, "Light" and the default "Dark". The light theme uses a White (#FFF) background, and the dark theme uses a Black (#111) background.

Console messages should follow the format:

* \[STATUS\] (System Affected) - [# of Problems] - Problem. Ways to resolve the problem.

The message colors have been specified for the Error / Failure and Warning states.

The message colors for the two states, Error/Failure and Warning have been defined below.

![Console Log - Error and Warning examples](/images/tools-ui/console-log/console-log-state-colors.png)

#### Best practices for Console Logs

* Console messages should not include rich information, such as icons and formatted text.
* These messages are considered passive, and might not be seen by the users.
* Multiple messages of the same type should appear in succession.
* Writing console message should  follow the following format
  * \[STATUS\]\ (System Affected) - \[number of problems\] -  Problem. Ways to resolve problem

* * *

### Text Input Validation

Text input validation is the process where a system checks if the information provided by a user is correct. Effective messages help the user to understand the issue, and how to resolve it. Currently, we don't support success and information messages for input fields.

The message must appear only after the user interacts with the field. If they input incorrect data, inform the user on what has happened by displaying the appropriate icon, and then provide additional information with the use of a tool-tip on hover.

#### Special usage of the Error/Failure icon

![Input Validation Error or Failure](/images/tools-ui/text-input-validation/text-input-validation.png)

As an exception, we utilize this icon to represent an error or failure within a text input validation message. The reason for this is to avoid confusion, as in certain use cases the original icon is situated next to a close icon. It is not required for an error input field to include the icon as some input fields are very small and iconography will take up space. However if your input field allows for the icon please consider using it.

* * *

### Tooltips

A tooltip is a text label which appears when users hover over an element, in this case–the error or warning icon.

* Use the tooltip with the error or warning icon, not with any other element.
* The tooltip should not display rich information, such as images and formatted text.
* Keep the tooltip displayed as long as the user continues to hover over the element. The tooltip will also appear anywhere over a red input field.

![Text Input Validation Tooltips](/images/tools-ui/text-input-validation/text-input-validation-tooltips.png)

* * *

### Error Message Strings Best Practices

In an ideal world, there should be no errors. The customer believes in this utopia, especially if they're using a common workflow. They'd prefer not to acknowledge the idea that the software their success depends on has issues, or that it might not support the way they want to do their work. If they did, they might never use your product!

Great error messages can salve the sting of an unexpected error. Poor ones can lead to negative feedback, or worse: the customer abandons your product and your hard work. Great error messages are little works of respect for the user, telling them "yeah, something went wrong. But you know what? We know some things about what happened, and we'd like to try and help you a bit."

Let's look at a pair of examples for the same issue:

```error
ERROR: Cannot complete operation. Maximum range value exceeded.``
```

```error
This operation requires positive integer values between 0 and 127. Please choose a value in this range before re-building the scene.
```

The first leads to annoying trial-and-error behavior. The second not only makes it immediately clear to the user what they did wrong, it provides useful preventative guidance about application state and encourages a useful but not-so-obvious practice: making sure all of the values you supplied to the widget are correct before building the scene. You've not only helped the user; you may have saved them future frustration! Additionally, bespoke and well-designed error messages implicitly communicate an emphasis on quality and user consideration.

Error messages, when done poorly, erode trust and increase frustration. Done well, they enable the user to continue work and provide implicit guidance around improved behaviors and code. Good error handling and messages can be a lot of work, but they pay solid dividends:

* Reduced user friction and greater productivity across the product experience
* Training better behaviors in code and UI development and use
* Higher quality and more actionable bug reports
* Better code and UI implementation overall!

Let's look at how to write great error messages for O3DE!

#### Error messaging principles

The most common mistake when presenting errors to a user is wrapping low-level errors and exceptions thrown directly by code and displaying them directly and unedited to the user. Often, this is a function of lazy coding, because very few developers enjoy writing code to filter through the details of a low-level error and massaging it into text that any user or developer can understand. It's enough to debug and unit test your own code, and you know what a `NaN` error means, right?

That might be true for some forms of software, but O3DE is a tool for builders. Bubbling up an error like `Handle not recognized` to the end user will not make you any friends. So, we need to think about the development of good error messages strategically, and build good code and UI dev practices and habits early.

To start, we'll look at two categories of error message: error messages for code operations, and error messages for application users (UI).

#### Error messages in code

Error messages often begin their life as code-level error descriptions. Many times, these get "passed through" to the end user in a dialog widget or console interface. Authoring your error messages well for all audiences, not just technical experts, can simplify your code with regards to the overall customer experience.

* Short messages are better than long ones, but don't skimp on any essential details. Make every word count! Use basic, proper English grammar. You want to be clear, not clever. More complex phrasing or the use of idioms can make it difficult for non-native English readers, and make localization more difficult.
  * Consistently favor passive voice and past-tense. "An error occurred..." sounds less judgmental than "We found an error...". Additionally, the error occurred; it is not in the process of occurring.
* Never, ever pass a low-level error's default description through to the end user. Gather some information programmatically, especially if the default error message would be inscrutable or useless by itself. Every little detail helps.
* Format your error messages for readability and clarity. A little white space or a pair of quotation marks can go a long way in reducing user irritation.
* Don't dump code. The reader can probably see the code in their IDE. It just takes up space and makes the message harder to scan.
* Author your error message for the least technical context (within reason, of course). In most cases, this means a code error that gets raised up to the user interface. Choose the right words to represent that context and avoid "deep code" jargon whenever possible. For example, if an O3DE user sees a message like `STACKOVERFLOWEXCEPTION: SYSTEM STATE UNKNOWN," they will be reasonably alarmed, even if the error is raised from some simple secondary menu recursion code failing. A better choice might be "ERROR: A stack overflow error occurred when updating the menu element tree. Please report this error and restart the application." Consider adding a comment that this message should be rewritten for context if it can appear in the UI.
  * Additionally, avoid "compiler-speak". Use the most viable, least specific terms that describe the error. Focus on the way the user perceives the error, not the compiler or the run-time. For example, saying "ERROR: The operation cannot complete due to unsafe type usage when unmarshalling thread context" is more confusing and concerning than "_ERROR: The operation cannot complete as the context cannot be determined. Check to see if any types used to recreate this work are unsafe._" This will make it easier for UI writers to craft an appropriate UI-level message, as well.
* Signal next steps -- either taken by the system or for the user to take -- wherever viable. (See the above example.)
* Hints to code definitions can be really helpful in some contexts: "Expected a type `HANDLE_T *` for the first parameter in `ProcessBlobSync()`. `HANDLE_T` is defined as a shared macro in common.h." Remember, though, that this will be inscrutable (and possibly terrifying!) if surfaced through a user interface.
* If the error originates from a third-party library or other binary you don't control, be savvy. Avoid blaming the code, even passively. Just be clear: "_The operation could not complete due to a misconfiguration between O3DE and the CoolGraphicsV3 Gem. `<link>`Please report this issue on GitHub`</link>`._".
* Write for the user interface or the IDE, not the command-line!

In simple terms, use empathy. If you were sitting at an IDE building or running this code for the first time, would YOU find this error message clear and helpful, or a bit opaque? Rewrite it until it meets your own "new developer experience" standards. This isn't trivial work, as a consistently poor experience with error messages can erode a user's trust in your code over time.

And remember: it might not be an experienced developer who sees your error message!

#### Error messages in UI

Writing useful, actionable error messages for end users working in a user interface is an art form. Too often, error messages are passed through from code and not prepared to be read by users who are NOT experienced developers, or even developers at all. Here are some rules to consider when improving error messages for UI users:

* Avoid jargon and technical terms unless the context is immediately apparent or if the terminology directly applies to the user's code or actions. Don't introduce new technical ideas that aren't covered in the immediate context. If it is a low-level error and some code or algorithm jargon is unavoidable, provide a clause or a sentence that clarifies it in more accessible terms.
* Describe the error in terms of the action the user took. However, do not blame the user. This is a situation where you can use passive voice. For example:
  * BAD: `You entered an incorrect value for Gradient Range.` (active voice)
  * GOOD: `The Gradient Range input field requires a value between 0 and 63.` (passive voice)
* Respect the user's cognitive focus and don't overwrite the error message or provide too much detail. As a simple rule of thumb, aim to keep error messages less than 200 characters if possible. Shorter is always better. However, some errors are thorny and may require detailed explication. Try to limit those; or, if the message reflects a composite or aggregated error, format it clearly and use your space to clarify the issues that occurred and any order or causality.
* If the error is a common one, provide a link to a troubleshooting doc, if one exists. Even if they don't click the URL, they will be reassured that the problem is common enough to warrant documentation.
* If the error requires a lot of detail to understand and resolve, request documentation for it.
* Separate messaging from any essential technical details (such as a file name, path, or other programmatic data).

### Error Message Guidelines

Overall, observe these guidelines when writing error messages at any level:

* Use this pattern: description of error; technical details (optional); next steps or links to further assistance (optional). Favor passive voice.
* Be specific.
* Don't use ALL CAPS. Please. Use proper English syntax.
* Try to keep it under or around 200 characters in most cases. Use good judgment, and always optimize your words.
* Use simple grammar; target an 8th grade reading level.
* Avoid technical jargon in end user UI messages. Be careful with jargon in code-level error messages.
* Focus on the end user's immediate needs, not your own.
* Spellcheck your work!

Here's an example that employs these guidelines, in the context of a user failing to provide correct credentials to a service:

BAD:

```error
ERROR: CREDENTIALS NOT FOUND. WE CANNOT AUTHORIZE YOU.
```

REWRITTEN:

```error
Oops! The password you provided didn't match our records. Can you try again?
```

Here's another example, this time for an error that flows from code to the end user:

BAD (when exposed to devs or an end user):

```error
An error occurred at line 258, col 8 in arglebargle.cpp. Pointer returned null.
```

REWRITTEN AT THE CODE-LEVEL:

```error
An error occurred when the operation received a null pointer. A null pointer is not allowed for the target data when calling RenderToTarget(handle, target, options).

Details:
- File: arglebargle.cpp
- Line: 258
- Column: 8
```

REWRITTEN FOR AN INTERFACE END USER:

```error
Oh no! The target for rendering your scene was not defined. This is a serious error in our code. Please report it at <link>GITHUB-LINK-HERE</link> and provide any relevant details.
```

Notice how more details were provided for a specific audience, and formatted for clarity? The difference between the originating source error description and what the user finally sees is pretty striking. Always think about who might see your error message, and when.

For more reading, check out [Jakob Nielsen's guidance on writing good error messages](https://www.instructionaldesign.org/bad_error_messages/).

### Error Message Best Practices

* Above all else, aim for clarity. Ask yourself: "_If I got this message while doing my job and I was new to this product or code, what would help me move forward or avoid this error in the future?_" Never make the user guess. If you can get further details from the run-time or the existing code, do so, even if it seems tedious. Your extra hour of coding will save your users countless hours in the future.
* If you are working on developer-focused code (as opposed to user interface code), provide detailed code comments around your error handling and messages. This will help UI error message writers better understand the context and craft better end-user messages.
* Use a natural, friendly voice. Write error messages with empathy, as though you were advising a fellow developer or a new user. It's okay to lead with "Sorry" or "Oops!" if you feel that the error might be in a really disruptive context, but likewise consider localization before you employ sympathetic idioms. All-too-typical "just the developer basics" error strings can feel unnatural and frustrating, especially to developers or users who are learning the product. Cold, severe "programmer" text makes the error feel arbitrary and cryptic, like the user shouldn't even be seeing it in the first place. Make the error feel like what it is: an issue we knew might occur, and that we're alerting you, the user, to help you out.
* Avoid hard-coding error messages. Instead, put them in a common JSON (or other format, even a CSV or a flat-text model of your own implementation) "dictionary" file and refer to them based on a unique token or handle. This allows for easier review and maintenance without risking build errors or regressions. It also allows for much easier (and thus significantly cheaper) localization. Document your schema or format for others to easily understand and maintain it.
* Get your error messages reviewed by a technical writer or UX expert! When you open your PR, call out your updated error strings (hopefully in a file specific to error strings, as suggested previously) and request review by someone with technical writing or user interface design experience.
