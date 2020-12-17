

# Introduction to Lumberyard UI development<a name="ui-dev-intro"></a>

Introduced with Amazon Lumberyard version 1\.25 and the release of UI 2\.0, Lumberyard’s **custom Qt widget library** provides developers with access to the same UI components used throughout Lumberyard\. Using this library, UI developers can build their own tools and extensions for Lumberyard, while maintaining a coherent and standardized UI experience\. This custom library provides new and extended widgets, and includes a set of styles and user interaction patterns that are applied on top of the Qt framework \- the C\+\+ library that Lumberyard relies on for its UI\. The library can be extended to support your own customizations and modifications\.

![\[uidev intro\]](http://docs.aws.amazon.com/lumberyard/latest/ui/images/uidev-intro.png)

Our objective with this UI extensions guide is to provide you with extensive documentation on all aspects of Lumberyard user interface development using the custom widget library, covering both the design and development sides of your implementation\. We intend to cover as many use cases, workflows, code samples, and usage guidelines as possible to explain how to use these components efficiently and effectively\. We also provide links throughout the guide to the separate, C\+\+ API reference documentation, for when you need detailed information about each method and property available to you in the library\. And finally, we intend to continue adding to this source of information over time, to extend the wealth of information found in these pages\.
