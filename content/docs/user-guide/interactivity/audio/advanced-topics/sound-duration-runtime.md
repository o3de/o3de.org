---
title: Getting Sound Duration at Runtime
description: Load information about a sound in the Open 3D Engine audio system at runtime.
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
        TAudioControlID triggerId = ...;
        AudioTriggerNotificationBus::Handler::BusConnect(TriggerNotificationIdType{ this });
 
        // execute the m_triggerId ...
        if (auto audioSystem = AZ::Interface<IAudioSystem>::Get();
            audioSystem != nullptr)
        {
            // Example 1: via raw Audio Request
            Audio::ObjectRequest::ExecuteTrigger execTrigger;
            execTrigger.m_triggerId = triggerId;
            execTrigger.m_owner = this;
            audioSystem->PushRequest(AZStd::move(execTrigger));

            // Example 2: via AudioProxy
            IAudioProxy* proxy = audioSystem->GetAudioProxy();
            if (proxy)
            {
                // The second parameter is the "owner" override, which matches
                // what Id is connected to on the notification bus.
                proxy->Initialize("Example Sound", this);
                proxy->ExecuteTrigger(triggerId);
                proxy->Release();
            }
        }
    }
 
    ~MyClass()
    {
        AudioTriggerNotificationBus::Handler::BusDisconnect();
    }
 
protected:
    void ReportDurationInfo(
        TAudioControlID triggerId,
        TAudioEventID eventId,
        float duration,
        float estimatedDuration) override
    {
        // ...
    }
};
```
