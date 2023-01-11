---
linktitle: Guidelines for Writing Error Messages
title: Guidelines for Writing Error Messages in Open 3D Engine
description: Learn how to write error messages, alerts, and notifications using the Blue Jay Design System (BJDS) in Open 3D Engine (O3DE).
weight: 200
toc: true
---


In this section, you will learn how to write great error messages for O3DE. Why are error messages so important? Shouldn't the user figure out why their code failed or their operation didn't work? Not at all. The users expect a seamless experience without any errors. Nevertheless, errors occur and error messages can ease and help users overcome them.

Great error messages can salve the sting of an unexpected error. Poor ones can lead to negative feedback or cause the customer to abandon your product completely. An effective and helpful error message acknowledges the inconvenience on the user and reassures them with guidance to work around it.

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


## Writing principles

The most common mistake when presenting errors to a user is displaying low-level errors and exceptions thrown by code directly to the user without editing them to make it user friendly. The most effective error messages are ones that any user and developer can understand. O3DE is a tool for builders, so it's important that error messages can reach a wide audience.

The writing principles on this page will help you think strategically about developing good error messages and practice good development habits for code and UI.

To start, we'll look at two categories of error message: error messages for code operations and error messages for application users (UI).

### Error messages for code operations

Error messages first appear as code-level error descriptions. A poor error message simply passes this error message to the end-user in a dialog widget or console interface. Instead, you can improve the user's overall experience with your code by authoring your error messages that's suitable for all audiences, not just technical experts.

The following points help you author good error messages for code operations: 

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
  
* Use an empathetic tone as though the error message appears in the user interface or the IDE, and not the command-line. To help you establish this tone, imagine that you are encountering this error for the first time as a new developer. Ask yourself whether or not you would find this error message clear and helpful, or opaque. Remember, it may not be an experienced developer who sees your error message.

### Error messages in UI

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


## Error message guidelines

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


### Example

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


## Best practices

To summarize the key points when writing error messages: 

* Above all else, aim for clarity. Ask yourself: "_If I got this message while doing my job and I was new to this product or code, what would help me move forward or avoid this error in the future?_" Never make the user guess. If you can get further details from the run-time or the existing code, do so, even if it seems tedious. Your extra effort will save your users countless hours in the future.

* If you are working on developer-focused code (as opposed to UI code), provide detailed code comments around your error handling and messages. This will help UI error message writers better understand the context and create better end-user messages.

* Use a natural, friendly voice. Write error messages with empathy, as though you were advising a fellow developer or a new user. It's okay to lead with "Sorry" or "Oops!" if you feel that the error might be in a really disruptive context. Consider localization before you employ sympathetic idioms. Don't assume the user's technical knowledge. Even terminology that seems standard for developers can feel unnatural and frustrating, especially to developers or users who are learning the product. Be aware of including "programmer" text, which makes the error feel arbitrary and cryptic, as though it's not intended for the user to see. Remember the purpose of an error message and write them with respect to that: an error is an issue we knew might occur and we're alerting you, the user, to help you out.

* Avoid hard-coding error messages. Instead, store error message in data objects, such as a JSON file, a CSV, or a flat-text model of your own implementation. This acts as a "dictionary" file that you can refer to and access using a unique token or handle. This system makes it easier for developers to do code reviews and maintenance without risking build errors or regressions. It also allows for more straightforward and cheaper localization. Document your schema or format to help others understand and maintain it.

* Ask a technical writer or UX expert to review your error messages. When receiving a review in a GitHub pull request (PR), call out your updated error strings and add comments to provide any relevant information. This improves collaboration between you and your reviewer and eases the process to get your updates approved.


## More resources

For more reading, check out [Jakob Nielsen's guidance on writing good error messages](https://www.instructionaldesign.org/bad_error_messages/).