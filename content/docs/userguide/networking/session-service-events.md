---
description: ' Learn how to react to GridMate session service events in Amazon Lumberyard. '
title: Reacting to Session Events
---
# Reacting to Session Events {#network-session-service-events}

Much of the session functionality is asynchronous because functions can be called, but the response is often not immediately available\. For example, messages may be slowed by network transfer time, server processing, or the required response time\.

The [Working with the Event Bus \(EBus\) system](/docs/userguide/programming/ebus/intro.md) in Lumberyard is an event bus system that can send out events when asynchronous session functions are complete\. This topic shows you how to set up your application to use the event bus and to connect and disconnect from it\.

## Setup {#network-session-service-events-setup}

Your application must derive a class from `GridMate::SessionEventBus::Handler`\. This class must contain certain overridden session events\. However, not all events need to be implemented\. An example follows\.

```
class MyClass : public GridMate::SessionEventBus::Handler
{
    public:
        void OnSessionJoined(GridMate::GridSession* session) override;
        void OnMemberJoined(GridMate::GridSession* session, GridMate::GridMember* member) override;
        void OnMemberLeaving(GridMate::GridSession* session, GridMate::GridMember* member) override;
};
```

## Connect {#network-session-service-events-connect}

The following example shows how to connect to the session event bus and start receiving session events\.

```
void MyClass::Init()
{
    GridMate::IGridMate* gridMate = gEnv->pNetwork->GetGridMate();

    if(gridMate)
    {
        GridMate::SessionEventBus::Handler::BusConnect(gridMate);
    }
}
```

## Disconnect {#network-session-service-events-disconnect}

The following example shows how to disconnect from the session event bus and stop receiving session events\.

```
void MyClass::Term()
{
    GridMate::IGridMate* gridMate = gEnv->pNetwork->GetGridMate();

    if(gridMate)
    {
        GridMate::SessionEventBus::Handler::BusDisconnect(gridMate);
    }
}
```