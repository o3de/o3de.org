---
title: Getting Sound Duration at Runtime
description: Load information about a sound in the Open 3D Engine Audio system at runtime.
---

In order to get a sound's duration at runtime, an event to play that sound needs to be posted to the audio middleware first. Once it has been posted, the middleware will callback to the audio system with the duration information. If you are interested in this information, you can simply connect to the `AudioTriggerNotificationBus` by the ATL trigger Id that was used.

By overriding the `ReportDurationInfo` function, you will be notified with that information.

## C++ Example: Getting a Sound's Duration

```cpp
class MyClass
    : protected AudioTriggerNotificationBus::Handler
{
public:
    MyClass()
    {
        m_triggerId = ...;
        AudioTriggerNotificationBus::Handler::BusConnect(m_triggerId);
 
        // execute the m_triggerId ...
    }
 
    ~MyClass()
    {
        AudioTriggerNotificationBus::Handler::BusDisconnect();
    }
 
protected:
    void ReportDurationInfo(TAudioEventID eventId, float duration, float estimatedDuration) override
    {
        // ...
    }
 
private:
    TAudioControlID m_triggerId;
};
```
