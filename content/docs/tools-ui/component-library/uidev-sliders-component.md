---
description: ' Learn about the O3DE UI 2.0 style of sliders, including the slider
  and slider combo components. '
title: O3DE UI sliders
---

{{< preview-migrated >}}

Use a slider to enable users to control a variable by moving a knob or lever horizontally or vertically\. The visual feedback shows users where the current value is within the range of valid values\.

 **Slider**

The basic slider is a styled version of the `QSlider` widget from the Qt library\.

![\[component slider style\]](/images/tools-ui/component-slider-style.png)

Use the `SliderInt` class for signed integer values, and the `SliderDouble` class for double values\.

 **Slider combo**

A slider combo is a combination of the slider and spinbox widgets\. In practice, sliders can be difficult for the user to manipulate with precision\. Therefore, it is recommended that for fine control, you use a slider combo, which combines the visual feedback of the slider with the precise fine\-tuning capability of the spinbox\.

![\[component slider combo style\]](/images/tools-ui/component-slider-combo-style.png)

Use the `SliderCombo` class for signed integer values, and the `SliderDoubleCombo` class for double values\.

## Usage guidelines<a name="sliders-usage"></a>

Follow these guidelines as you design your UI with sliders:

1.  Sliders work best when the specific value does not matter to the user, and an approximate value is good enough\. Example: selecting a volume or defining the color gradient\.

1.  When placing a slider control on the UI, it's best to show the outcome side by side with the control, so a user can review and confirm if the value they select matches their expectation\.

Avoid these design choices when using sliders:
+ Don't use the slider when picking an exact value is important to the goal of the interface\.
+ Don't use the slider if you don't have the start and end value for your use case\. Use the number edit input box instead\.

## Basic slider with midpoint<a name="slider-basic"></a>

![\[component slider basic\]](/images/tools-ui/component-slider-basic.png)

The following example demonstrates the creation of a simple, integer slider using the optional midpoint style\.

 **Example**

```
#include <AzQtComponents/Components/Widgets/Slider.h>

// Create a new integer slider widget.
AzQtComponents::SliderInt* sliderInt = new AzQtComponents::SliderInt(parent);

// Set its range from -10 to 10 and its initial value to 2.
sliderInt->setRange(-10, 10);
sliderInt->setValue(2);

// Apply the optional midpoint style to visually represent the midpoint along the slider.
AzQtComponents::Slider::applyMidPointStyle(sliderInt);

// Use setEnabled to disable a slider.
sliderInt->setEnabled(false);
```

## Slider with tooltip<a name="slider-tooltip"></a>

![\[component slider tooltip\]](/images/tools-ui/component-slider-tooltip.png)

Add a tooltip to provide context for the value in the slider\.

 **Example**

```
#include <AzQtComponents/Components/Widgets/Slider.h>

sliderInt->setToolTipFormatting("Opacity", "%");
```

## Basic slider combo<a name="slider-combo-basic"></a>

![\[component slider combo basic\]](/images/tools-ui/component-slider-combo-basic.png)

The following example demonstrates the creation of a double slider combo\.

 **Example**

```
#include <AzQtComponents/Components/Widgets/SliderCombo.h>

// Create a new integer slider widget.
SliderDoubleCombo* sliderDoubleCombo = new SliderDoubleCombo(parent);

// Set the range of the slider from 0.0 to 100.0.
sliderDoubleCombo->setSoftRange(0.0, 100.0);

// Set the initial value shown in the input box and the slider to 75.0.
sliderDoubleCombo->setValue(75.0);

// (Optional) Set the range of valid values for the input box.
// While the slider can adjust the value between the min and max of the soft range,
// the min and max of the range determine what can be entered in the input box.
sliderDoubleCombo->setRange(-1.0, 100.0);
```

## C\+\+ API reference<a name="sliders-api-ref"></a>

For details on the **slider** API's, see the following topic in the [O3DE UI Extensions C\+\+ API Reference](/docs/api/frameworks/azqtcomponents/namespace_az_qt_components.html):

 **Slider:**
+  [AzQtComponents::Slider](/docs/api/frameworks/azqtcomponents/class_az_qt_components_1_1_slider.html)
+  [AzQtComponents::SliderInt](/docs/api/frameworks/azqtcomponents/class_az_qt_components_1_1_slider_int.html)
+  [AzQtComponents::SliderDouble](/docs/api/frameworks/azqtcomponents/class_az_qt_components_1_1_slider_double.html)

 **Slider combo:**
+  [AzQtComponents::SliderCombo](/docs/api/frameworks/azqtcomponents/class_az_qt_components_1_1_slider_combo.html)
+  [AzQtComponents::SliderDoubleCombo](/docs/api/frameworks/azqtcomponents/class_az_qt_components_1_1_slider_double_combo.html)

Relevant Qt documentation includes the following topics:
+  [QSlider Class](https://doc.qt.io/qt-5/qslider.html)
