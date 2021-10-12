---
linktitle: Reflected Property Editor
title: O3DE UI Reflected Property Editor
description: Use the O3DE UI reflected property editor to automatically lay out user-editable properties in O3DE tools and Gems.
toc: true
---

A **reflected property editor** automatically lays out controls for user-editable properties that are reflected using the edit context. It is frequently used as a content widget to populate [card](uidev-card-component/) components.

![component reflected property editor in card](/images/tools-ui/component-reflected-property-editor-in-card.png)

For more information about reflecting and the edit context, see the **O3DE User Guide** topic on [Reflecting a Component for Serialization and Editing](/docs/user-guide/components/development/reflection/).

## Reflected property editor in a card<a name="reflected-property-editor-basic"></a>

The following code shows how to add a simple **reflected property editor** to a **card**, like the one pictured in the image at the beginning of this topic.

 **Example**

```
#include <AzToolsFramework/UI/PropertyEditor/ReflectedPropertyEditor.hxx>
#include <AzCore/Serialization/SerializeContext.h>
#include <AzCore/Serialization/EditContext.h>
#include <AzQtComponents/Components/Widgets/Card.h>

// Create a card component and set its title and header icon.
AzQtComponents::Card* card = new AzQtComponents::Card(parent);
card->setTitle(QStringLiteral("Card"));
card->header()->setIcon(QIcon(QStringLiteral(":/Gallery/Grid-small.svg")));

// Create a reflected property editor.
auto cardPropertyEditor = aznew AzToolsFramework::ReflectedPropertyEditor(card);

// Add the reflected property editor to the card as a content widget.
card->setContentWidget(cardPropertyEditor);
```

## C++ API reference<a name="card-api-ref"></a>

For details on the **card** API, see the following topics in the [O3DE UI Extensions C++ API Reference](/docs/api/frameworks/azqtcomponents/namespace_az_qt_components.html):
+  [AzQtComponents::Card](/docs/api/frameworks/azqtcomponents/class_az_qt_components_1_1_card.html)
+  [AzQtComponents::CardHeader](/docs/api/frameworks/azqtcomponents/class_az_qt_components_1_1_card_header.html)
+  [AzQtComponents::CardNotification](/docs/api/frameworks/azqtcomponents/class_az_qt_components_1_1_card_notification.html)

## Related links<a name="reflected-property-editor-related-links"></a>

For additional information related to the **reflected property editor** component, see the following topics:
+  [Card Component](uidev-card-component/)
