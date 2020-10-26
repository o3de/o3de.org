# UIElementComponent<a name="lua-scripting-ces-api-ui-uielementcomponent"></a>

Provides functionality for UI elements\.

## UiElementBus<a name="lua-scripting-ces-api-ui-uielementcomponent-uielementbus"></a>

Services messages for the `UiElementComponent`\.

### DestroyElement<a name="lua-scripting-ces-api-ui-uielementcomponent-destroyelement"></a>

Deletes this element and removes it from its parent element\.

**Syntax**

```
void DestroyElement()
```

### FindChildByName<a name="lua-scripting-ces-api-ui-uielementcomponent-findchildbyname"></a>

Returns the first immediate child with the specified name\. Returns `AZ::InvalidEntityId` if no match is found\.

**Syntax**

```
AZ::EntityId FindChildByName(const AZStd::string & name)
```

### FindDescendantByName<a name="lua-scripting-ces-api-ui-uielementcomponent-finddescendantbyname"></a>

Returns the first descendent entity with the specified name\. Returns `AZ::InvalidEntityId` if no match is found\.

**Syntax**

```
AZ::EntityId FindDescendantByName(const AZStd::string & name)
```

### GetCanvas<a name="lua-scripting-ces-api-ui-uielementcomponent-getcanvas"></a>

Returns the canvas that contains this element\. Returns `AZ::InvalidEntityId` if the element has no canvas\.

**Syntax**

```
AZ::EntityId GetCanvas()
```

### GetChild<a name="lua-scripting-ces-api-ui-uielementcomponent-getchild"></a>

Returns the child entity ID at the specified index\. The specified index must be less than `GetNumChildElements()`\.

**Syntax**

```
AZ::EntityId GetChild(int index)
```

### GetChildren<a name="lua-scripting-ces-api-ui-uielementcomponent-getchildren"></a>

Returns the child entity IDs of this element\.

**Syntax**

```
AZStd::vector<AZ::EntityId> GetChildren()
```

### GetIndexOfChildByEntityId<a name="lua-scripting-ces-api-ui-uielementcomponent-getindexofchildbyentityid"></a>

Returns the index of the specified child element\.

**Syntax**

```
int GetIndexOfChildByEntityId(AZ::EntityId childId) 
```

### GetName<a name="lua-scripting-ces-api-ui-uielementcomponent-getname"></a>

Returns the name of this element\.

**Syntax**

```
AZStd::string GetName()
```

### GetNumChildElements<a name="lua-scripting-ces-api-ui-uielementcomponent-getnumchildelements"></a>

Returns the number of child elements of this element\.

**Syntax**

```
int GetNumChildElements()
```

### GetParent<a name="lua-scripting-ces-api-ui-uielementcomponent-getparent"></a>

Returns the parent entity ID of this element\. Returns an invalid entity ID if the element has no parent\.

**Syntax**

```
AZ::EntityId GetParent()
```

### IsAncestor<a name="lua-scripting-ces-api-ui-uielementcomponent-isancestor"></a>

Returns whether a specified element is an ancestor of this element\.

**Syntax**

```
bool IsAncestor(AZ::EntityId id)
```

### IsEnabled<a name="lua-scripting-ces-api-ui-uielementcomponent-isenabled"></a>

Returns true if the element is enabled; false otherwise\.

**Syntax**

```
bool IsEnabled()
```

### Reparent<a name="lua-scripting-ces-api-ui-uielementcomponent-reparent"></a>

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

### SetIsEnabled<a name="lua-scripting-ces-api-ui-uielementcomponent-setisenabled"></a>

Sets the enabled state of the element\.

**Syntax**

```
void SetIsEnabled(bool isEnabled)
```