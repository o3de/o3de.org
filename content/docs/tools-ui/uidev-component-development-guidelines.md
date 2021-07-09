---
linktitle: Component Development Guidelines
title: O3DE UI Component Development Guidelines
description: Get a high-level overview of the concepts behind Open 3D Engine (O3DE) UI component development using the custom Qt widget library.
weight: 200
toc: true
---

{{< preview-migrated >}}

For many of the basic components (such as check boxes, push buttons, and line edits), you will use the base Qt widgets (such as `QCheckBox`, `QPushButton`, `QLineEdit`) to develop your UI. The custom styling and behavior of these widgets is applied automatically. Components that require extended functionality, or are unique to Open 3D Engine (O3DE), are custom classes that can be subclassed and can include a combination of Qt widgets. In these cases, the class definitions live in this folder: `<engine>/Code/Framework/AzQtComponents/AzQtComponents/Components/.`

## Style sheets and StyleManager

The O3DE UI is built upon [Qt Style Sheets](https://doc.qt.io/qt-5/stylesheet.html), which is a powerful mechanism for customizing the appearance of widgets. The concepts and syntax are similar to Cascading Style Sheets (CSS).

In Qt Style Sheets, the `AzQtComponents` module has a `StyleManager` class, which installs a custom [QProxyStyle class](https://doc.qt.io/qt-5/qproxystyle.html) at the application level. The `QProxyStyle` class overrides the styling of all widgets with custom styling. This is how you can use a basic Qt widget (such as `QPushButton` or `QCheckBox`) and give it custom styling.

The StyleManager class is pre-loaded with a series of base style sheets, starting with `<engine>/Code/Framework/AzQtComponents/AzQtComponents/Components/Widgets/BaseStyleSheet.qss`.

This style sheet applies custom styling for each individual widget, each of which is separated into files such as "`CheckBox.qss`" and "`PushButton.qss`". This styling is applied down through the entire widget hierarchy, starting from the top application layer. Additional custom style sheets can be applied at lower levels (such as in your own custom tool) that affect only that widget and any of its children.

## Get started with UI component development

Depending on your tools and existing code, accessing the new library of components might require some initial setup.

If your tool is part of the core O3DE Editor or is part of a Gem which uses the Editor's Qt Application, you're already set up and ready to go. Just include the header for the component that you need to use from the `<engine>/Code/Framework/AzQtComponents/AzQtComponents/Components` folder.

For standalone tools with their own Qt Application, you must take some extra steps to make sure that the new styling is applied correctly.

1. Set the attributes to correctly handle high DPI screens before creating the QApplication.

  ```cpp
  #include <QApplication>

  QCoreApplication::setAttribute(Qt::AA_EnableHighDpiScaling);
  QCoreApplication::setAttribute(Qt::AA_UseHighDpiPixmaps);
  QGuiApplication::setHighDpiScaleFactorRoundingPolicy(Qt::HighDpiScaleFactorRoundingPolicy::PassThrough);
  AzQtComponents::Utilities::HandleDpiAwareness(AzQtComponents::Utilities::PerScreenDpiAware);

  QApplication app(argc, argv);
  ```

1. Instantiate a StyleManager, which loads the style sheets and custom settings for the new UI.

   ```cpp
   #include <AzQtComponents/Components/StyleManager.h>

   AzQtComponents::StyleManager* styleManager = new AzQtComponents::StyleManager(this);
   const bool useLegacyStyle = false;
   styleManager->initialize(app, useLegacyStyle);
   ```

   The StyleManager automatically loads the base style sheets, but you can add other resources as well.

## UI development best practices

Writing code to extend the core O3DE Editor? Here are some high-level suggestions to comply with the UI guidelines:

+ The UI styling uses an O3DE standard color palette, which includes grays and blues. Creating a custom style and color override will have your tool looking inconsistent with the rest of the O3DE Editor. We suggest avoiding custom style overrides whenever possible so that O3DE appears as one cohesive application.
+ The Editor now supports vector file formats for icons, which prevents them from appearing blurry or pixelated on high DPI displays. Make sure to use SVG files for your icons, and replace old PNGs and JPGs with vector graphics images in existing tools if possible.
+ When using a custom icon not provided by O3DE, the icon should be a multiple of 16 x 16.
+ Moving forward, we want to make sure the user experience is cohesive and familiar throughout the whole O3DE Editor. You should avoid making one-off custom changes; and when you add new features, add them to the library so that they are available to the whole Editor instead of just a single tool.
+ Avoid subclassing or encapsulating the widgets from the component library. If you need some specific behavior, check our resources to verify if it's already available in the component library via specific settings.

## Frequently asked questions

### Can I copy the code example directly from the O3DEQtControlGallery?

Yes. Please note that not all settings will be covered by this tool. Use this extensions guide and the [O3DE UI Extensions C++ API Reference](/docs/api/frameworks/azqtcomponents/namespace_az_qt_components.html) to find additional examples and documentation.

### What about visual and color modifications to the controls?

We do not endorse custom modifications to the layout and visual design, because we want to support an experience that feels unified across all of our tooling. Still, sometimes minor spacing and style adjustments might be needed.

### Why should I use the existing widget styling instead of creating my own?

We've listened to feedback from all kinds of game developers, and one common note was that user experience across the different tools of the Editor should be consistent. The component library was built with this feedback in mind, and aims to bring unified and coherent standards to the whole Editor.

On the development side, this solution allows for better modularity and code reuse, with the objective of reducing the work needed from developers to create interfaces. Unifying the UI controls also allows improvements to be easily shared, since the whole Editor automatically uses them once applied, and likewise reduces the possibility of issues during library updates or core changes.

### Why should I not create subclasses or encapsulate the existing widgets?

The component library aims to simplify development and streamline the user experience. By subclassing or encapsulating the UI components to change their behavior or add features, special cases are added to the code base. These cases would then need special documentation and testing to avoid regressions. Subclassing or encapsulating UI components provides very little benefit, compared to keeping all UI components together in one place.

Subclassing is also detrimental to discoverability, since it is much harder for a new developer to find, import and re-use code that was built specifically in a tool without creating new dependencies or duplicating code. In the past, this has lead to multiple tools creating their own special controls that did very similar things, but in wildly different ways that made it hard to unify them and verify their behavior.
