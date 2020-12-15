--------

This guide is a work in progress\. Please provide feedback using the **Feedback** link at the top of the web page\. More coverage of the Lumberyard UI component library is coming\!

--------

# Lumberyard UI reflected property editor<a name="uidev-reflected-property-editor-component"></a>

A **reflected property editor** automatically lays out controls for user\-editable properties that are reflected using the edit context\. It is frequently used as a content widget to populate [card](uidev-card-component.md) components\.

![\[component reflected property editor in card\]](http://docs.aws.amazon.com/lumberyard/latest/ui/images/component-reflected-property-editor-in-card.png)

For more information about reflecting and the edit context, see the **Lumberyard User Guide** topic on [Reflecting a Component for Serialization and Editing](https://docs.aws.amazon.com/lumberyard/latest/userguide/component-entity-system-reflect-component.html)\.

## Reflected property editor in a card<a name="reflected-property-editor-basic"></a>

The following code shows how to add a simple **reflected property editor** to a **card**, like the one pictured in the image at the beginning of this topic\.

For a complete working example, which demonstrates the concepts of edit context and reflection, see the **Reflected Property Editor** page in the [Lumberyard Qt control gallery tool](uidev-control-gallery.md), and browse the source code for that page\. This can be found in your Lumberyard dev directory: `Code\Framework\AzQtComponents\AzQtComponents\Gallery\ReflectedPropertyEditorPage.cpp`\.

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