---
description: ' Learn how to apply the Lumberyard UI 2.0 style for radio buttons in
  Lumberyard gems and tools. '
title: Lumberyard UI radio button style
---
# Lumberyard UI radio button style<a name="uidev-radio-button-component"></a>

Use radio buttons to enable users to select from two or more options, when users must select exactly one choice\. Choosing a radio button deselects the previously selected button\.

![\[component radio button style\]](/images/tools-ui/component-radio-button-style.png)

## Usage guidelines<a name="radio-button-usage"></a>

Follow these guidelines as you design your UI with radio buttons:

1.  Use radio buttons when you have two or more mutually exclusive options\. 

1.  Ensure that clicking or tapping the label selects the radio button\. 

1.  One radio button should always be selected by default\. 

1.  Keep radio buttons from the same radio group in close proximity\. 

Avoid these design choices when using radio buttons:
+ Don’t order radio buttons horizontally\.
+ Don’t trigger an event upon selection of a radio button, such as spawning a popover, popup, new page, or new window\.

## Basic radio button<a name="radio-button-basic"></a>

![\[component radio button basic\]](/images/tools-ui/component-radio-button-basic.png)

Set up and control radio buttons in Qt Designer or in code\.

Radio buttons that belong to the same parent will automatically be part of an exclusive group\. You can create your own groups too, using a `QButtonGroup`\.

 **Example** 

```
#include <QRadioButton>
#include <QButtonGroup>

QRadioButton* radioButton1 = new QRadioButton(parent);
QRadioButton* radioButton2 = new QRadioButton(parent);

// Create a mutually exclusive group.
QButtonGroup* buttonGroup = new QButtonGroup(this);
buttonGroup->addButton(radioButton1);
buttonGroup->addButton(radioButton2);

// To set a radio button to the selected state:
radioButton1->setChecked(true);

// To disable a radio button:
radioButton1->setEnabled(false);
```

## C\+\+ API reference<a name="radio-button-api-ref"></a>

For details on the **radio button** API, see the following topic in the [Lumberyard UI Extensions C\+\+ API Reference](https://d3bqhfbip4ze4a.cloudfront.net/api/ui/namespace_az_qt_components.html):
+  [AzQtComponents::RadioButton](https://d3bqhfbip4ze4a.cloudfront.net/api/ui/class_az_qt_components_1_1_radio_button.html) 

Relevant Qt documentation includes the following topics:
+  [QRadioButton Class](https://doc.qt.io/qt-5/qradiobutton.html) 
