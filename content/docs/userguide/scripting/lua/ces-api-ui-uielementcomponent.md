---
description: ' Use the UIElementComponent to provide functionality for UI elements
  in &ALYlong;. '
title: UIElementComponent
---
# UIElementComponent {#lua-scripting-ces-api-ui-uielementcomponent}

Provides functionality for UI elements\.

## UiElementBus {#lua-scripting-ces-api-ui-uielementcomponent-uielementbus}

Services messages for the `UiElementComponent`\.

### DestroyElement {#lua-scripting-ces-api-ui-uielementcomponent-destroyelement}

Deletes this element and removes it from its parent element\.

**Syntax**

```
void DestroyElement()
```

### FindChildByName {#lua-scripting-ces-api-ui-uielementcomponent-findchildbyname}

Returns the first immediate child with the specified name\. Returns `AZ::InvalidEntityId` if no match is found\.

**Syntax**

```
AZ::EntityId FindChildByName(const AZStd::string & name)
```

### FindDescendantByName {#lua-scripting-ces-api-ui-uielementcomponent-finddescendantbyname}

Returns the first descendent entity with the specified name\. Returns `AZ::InvalidEntityId` if no match is found\.

**Syntax**

```
AZ::EntityId FindDescendantByName(const AZStd::string & name)
```

### GetCanvas {#lua-scripting-ces-api-ui-uielementcomponent-getcanvas}

Returns the canvas that contains this element\. Returns `AZ::InvalidEntityId` if the element has no canvas\.

**Syntax**

```
AZ::EntityId GetCanvas()
```

### GetChild {#lua-scripting-ces-api-ui-uielementcomponent-getchild}

Returns the child entity ID at the specified index\. The specified index must be less than `GetNumChildElements()`\.

**Syntax**

```
AZ::EntityId GetChild(int index)
```

### GetChildren {#lua-scripting-ces-api-ui-uielementcomponent-getchildren}

Returns the child entity IDs of this element\.

**Syntax**

```
AZStd::vector<AZ::EntityId> GetChildren()
```

### GetIndexOfChildByEntityId {#lua-scripting-ces-api-ui-uielementcomponent-getindexofchildbyentityid}

Returns the index of the specified child element\.

**Syntax**

```
int GetIndexOfChildByEntityId(AZ::EntityId childId)
```

### GetName {#lua-scripting-ces-api-ui-uielementcomponent-getname}

Returns the name of this element\.

**Syntax**

```
AZStd::string GetName()
```

### GetNumChildElements {#lua-scripting-ces-api-ui-uielementcomponent-getnumchildelements}

Returns the number of child elements of this element\.

**Syntax**

```
int GetNumChildElements()
```

### GetParent {#lua-scripting-ces-api-ui-uielementcomponent-getparent}

Returns the parent entity ID of this element\. Returns an invalid entity ID if the element has no parent\.

**Syntax**

```
AZ::EntityId GetParent()
```

### IsAncestor {#lua-scripting-ces-api-ui-uielementcomponent-isancestor}

Returns whether a specified element is an ancestor of this element\.

**Syntax**

```
bool IsAncestor(AZ::EntityId id)
```

### IsEnabled {#lua-scripting-ces-api-ui-uielementcomponent-isenabled}

Returns true if the element is enabled; false otherwise\.

**Syntax**

```
bool IsEnabled()
```

### Reparent {#lua-scripting-ces-api-ui-uielementcomponent-reparent}

Makes this element the child of a different parent\. The element is removed from its current parent and added as a child of the parent specified by `newParent`\.

**Syntax**

```
void Reparent(AZ::EntityId newParent, AZ::EntityId insertBefore)
```


****

| Parameter | Description |
| --- | --- |
| newParent | Specifies the entity ID of the new parent element\. If newParent is invalid, the element becomes a top\-level element \(that is, the canvas becomes the parent\)\. |
| insertBefore | Child element of the new parent before which to insert this element\. If null, the element is put at the end of the child list\. |

### SetIsEnabled {#lua-scripting-ces-api-ui-uielementcomponent-setisenabled}

Sets the enabled state of the element\.

**Syntax**

```
void SetIsEnabled(bool isEnabled)
```