---
description: ' Learn how to join a GridMate session in &ALYlong;. '
title: Joining a Session
---
# Joining a Session {#network-session-service-joining}

You have two ways to join a session:
+ By [Searching for a Session](/docs/userguide/networking/session-service-searching.md) and using a `GridMate::SearchInfo` object from the results\.
+ Directly to an existing game session by using a `GridMate::SessionIdIffo` object\.

Regardless of the method, a session is joined using one of the overloaded `IGridMate::JoinSession()` functions after the session service has been started\.

**Note**  
The argument `GridMate::JoinParams` currently has no supported parameters\.

## Events {#network-session-service-joining-events}

The following table describes GridMate session join events\.


****  

| **Event** | **Description** | 
| --- | --- | 
| OnSessionJoined | The client has been successfully added to the session\. | 
| OnMemberJoined | A player has joined the session\. | 
| OnMemberLeaving | A player has left the session\. | 

## Example {#network-session-service-joining-example}

The following example joins a session that has been found as the result of a session search\.

```
void MyClass::OnGridSearchComplete(const GridMate::GridSearch* search)
{
    GridMate::IGridMate* gridMate = gEnv->pNetwork->GetGridMate();

    if(gridMate)
    {
        if(search->GetNumResults() > 0)
        {
            GridMate::Session* session = gridMate->JoinSession(search->GetResult(0), GridMate::JoinParams(), GridMate::CarrierDesc());
        }
    }
}

void MyClass:OnSessionJoined(GridMate::GridSession* session)
{
    // Joined the session successfully
}
```