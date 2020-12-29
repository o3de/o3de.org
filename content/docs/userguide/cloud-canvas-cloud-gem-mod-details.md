# Cloud Gem Message of the Day Implementation Details<a name="cloud-canvas-cloud-gem-mod-details"></a>

This section describes the entity, component, Lua script, and resources used by the Message of the Day Cloud Gem\.

## Entity and Component<a name="cloud-canvas-cloud-gem-mod-details-entity-and-component"></a>

The Message of the Day sample uses an entity called `MOTDMenu` that contains the `CloudGemMessageOfTheDayClientComponent`\.

![\[Message of the day entity and client component\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-mod-testing-client-component.png)

The `CloudGemMessageOfTheDayClientComponent` component gives the entity access to the game client API operations so that it can receive callback results\.

## The motdmainmenu\.lua Script<a name="cloud-canvas-cloud-gem-mod-details-lua-script"></a>

The `MOTDmenu` entity also contains a Lua script component that executes the `dev\CloudGemSamples\Scripts\motdmainmenu.lua` script\.

The following code from the script shows how `CloudGemMessageOfTheDayRequestBus` is used to call `GetPlayerMessages`\.

```
function motdmainmenu:OnAction(entityId, actionName)
    Debug.Log(tostring(entityId) .. ": " .. actionName)

    if actionName == "GetMessages" then
        if CloudGemMessageOfTheDayRequestBus.Event == nil then
            Debug.Log("No Message Request Event found")
            return
        end
        
        local timeVal = os.date("%b %d %Y %H:%M")
        local lang = "Eng"
        Debug.Log(timeVal);
        CloudGemMessageOfTheDayRequestBus.Event.GetPlayerMessages(self.entityId, timeVal, lang, nil)
    end
end
```

The following code from the script shows the `CloudGemMessageOfTheDayNotificationBus` and the result callback functions `OnGetPlayerMessagesRequestSuccess(response)` and `OnGetPlayerMessagesRequestError(errorMsg)` that it connects to\.

```
function motdmainmenu:OnActivate()
...
    self.notificationHandler = CloudGemMessageOfTheDayNotificationBus.Connect(self, self.entityId)
end

...

function motdmainmenu:OnGetPlayerMessagesRequestSuccess(response)
    Debug.Log("GetPlayerMessages succeeded")
    self.messageQueue = {}
    self.displayTimer = 0.0
    Debug.Log("Response messages: "..tostring(#response.list));
    --This is a callback from C++ with an object containing a vector called list.
    --Therefore we cannot treat it as a regular Lua table and must rely on the reflected methods and operators of the reflected vector class 
    --for msgCount = 1, table.getn(response) do
    --    Debug.Log(response[msgCount])
    --    table.insert(self.messageQueue, response[msgCount])
    for msgCount = 1, #response.list do
        Debug.Log(tostring(response.list[msgCount].message))
		table.insert(self.messageQueue, response.list[msgCount])
	
    end
end

function motdmainmenu:OnGetPlayerMessagesRequestError(errorMsg)
    Debug.Log("GetPlayerMessages Error")
end
```

## Cloud Gem Message of the Day Resources<a name="cloud-canvas-cloud-gem-mod-details-resources"></a>

The Cloud Canvas Message of the Day sample has a resource group that contains an Amazon DynamoDB table called Main Table, which is the database for the messages\. Table entries are keyed on a server\-generated unique message ID\. Each entry has the following attributes\.


**Main Table Attributes**  

| Attribute | Type | Description | 
| --- | --- | --- | 
| UniqueMsgID | string | The server\-generated unique message ID\. | 
| startTime | datetime | Time when the message should start appearing\. | 
| endTime | datetime | Time when the message expires\. | 
| priority | integer | Relative priority of the message\. 0 is the highest priority\. | 
| message | string | The message body\. The string size is limited to 768 characters\. | 