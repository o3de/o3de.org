# Twitch C\+\+ API Reference for Lumberyard<a name="twitch-api-ebus"></a>

Calls that are made on the `TwitchRequestBus` return a unique `ReceiptID` object\. Because calls are made asynchronously, responses are not guaranteed to arrive in the same order as requested\. Each response type includes a `ReceiptID` object as a member\. To determine which response corresponds to a request, you can compare the `ReceiptID` instances from the requests to the `ReceiptID` instances in the responses\.

For information about event buses that Lumberyard uses, see [Working with the Event Bus \(EBus\) system](ebus-intro.md)\.

**Topics**
+ [General](twitch-api-ebus-general.md)
+ [User](twitch-api-ebus-user.md)
+ [Friends](twitch-api-ebus-friends.md)
+ [Rich Presence](twitch-api-ebus-rich-presence.md)
+ [Channels](twitch-api-ebus-channels.md)
+ [Data Types](twitch-api-ebus-data-elements.md)