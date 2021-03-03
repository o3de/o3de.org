---
description: ' Create custom events and parameters for use in Amazon Lumberyard''s Animation Editor. '
title: Creating Custom Motion Events and Parameters Using C++
---
# Creating Custom Motion Events and Parameters Using C\+\+ {#char-animation-editor-custom-events-parameters}

You can author custom event classes with custom parameters and reflect them to the edit context for use in Animation Editor\. By creating predefined motion events with known parameters, you minimize the performance impact of complex parameters and reduce the risk of human error\.

In Animation Editor, users can perform the following tasks with the events and parameters that you create:
+ Choose the events to add to motions
+ Provide their own values for the parameters
+ Add additional parameters to an event instead of creating duplicate events when the timing for two events is the same
+ Quickly create events with complex parameters
+ Tag motion events with colors that they choose and create a color scheme that is meaningful for them
+ Save the event and parameter information in an XML file that can be reloaded

**Topics**
+ [Creating Motion Events](/docs/user-guide/features/visualization/animation/character-editor/custom-events-parameters-creating-motion-events.md)
+ [Creating EventData Types](/docs/user-guide/features/visualization/animation/character-editor/custom-events-parameters-creating-eventdata-types.md)