# Carrier Message Structure<a name="network-carrier-message-structure"></a>

This topic describes the message structure used by the `CarrierImpl` networking class found in the `Carrier.cpp` file in the GridMate source code\. 

In the following sections, values in parentheses indicate the field's length in bits\. For fields with variable length, the value indicates the minimum length\.

## Datagram Format<a name="network-carrier-message-structure-datagram-format"></a>

The overall datagram has the following structure\.

```
DgramID (16) | Msg1 (64+) | Msg2 (24+) | ...
```

## Message Format<a name="network-carrier-message-structure-general-message-format"></a>

The following diagram shows the possible message fields\. Only the first two fields are present in every message header\. All the other fields are sent only as necessary\. In general, `ChannelId` and `NumChunks` are rarely sent\. `SeqNum` and `RelSeqNum` are usually sent once per datagram\.

```
Flags (8) | Length (16) | ChannelId (8) | NumChunks (16) | SeqNum (16) | RelSeqNum (16) | Payload (0+)
```

## System Messages<a name="network-carrier-message-structure-system-messages"></a>

Carrier system messages include `ACK` and `ClockSync`\.

### ACK<a name="network-carrier-message-structure-system-ack"></a>

The ACK system message is used to ACK any received messages and to keep the connection alive\. When there is no activity, an ACK containing only the first two fields is sent, otherwise, the actual fields sent vary depending on the pattern being ack'ed\. At the very least, `LastToAck` is sent\. If the sequence acke'd contains gaps, a variable\-length bit set is used; otherwise, the first sequence number being ack'ed is included\. These possible message formats are shown in the following diagram\.

```
MsgId (8) | Flags (8)
MsgId (8) | Flags (8) | LastToAck (16) | AckHistoryBits (1+)
MsgId (8) | Flags (8) | LastToAck (16) | (FirstToAck (16)
```

### ClockSync<a name="network-carrier-message-structure-system-clocksync"></a>

A `ClockSync` message is sent about once per second to keep all the clocks in the session in sync\. The message format is as follows\.

```
MsgId (8) | Time (32)
```