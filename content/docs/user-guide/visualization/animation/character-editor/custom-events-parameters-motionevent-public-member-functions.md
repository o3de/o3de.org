---
description: null
title: MotionEvent Public Member Functions
---

The `MotionEvent` class includes the following public member functions.

**Topics**
+ [MotionEvent](#char-animation-editor-custom-events-parameters-motionevent)
+ [SetStartTime](#char-animation-editor-custom-events-parameters-setstarttime)
+ [SetEndTime](#char-animation-editor-custom-events-parameters-setendtime)
+ [GetStartTime](#char-animation-editor-custom-events-parameters-getstarttime)
+ [GetEndTime](#char-animation-editor-custom-events-parameters-getendtime)
+ [GetIsTickEvent](#char-animation-editor-custom-events-parameters-getistickevent)
+ [ConvertToTickEvent](#char-animation-editor-custom-events-parameters-converttotickevent)
+ [GetIsSyncEvent](#char-animation-editor-custom-events-parameters-getissyncevent)
+ [SetIsSyncEvent](#char-animation-editor-custom-events-parameters-setissyncevent)
+ [HashForSyncing](#char-animation-editor-custom-events-parameters-hashforsyncing)

## MotionEvent 

You can use the `MotionEvent` function to trigger an event at a specific point in time (a tick event) or during a specified time range (a range event). To specify the data that the event emits, you can use pointers or datasets.

**Syntax**

```
MotionEvent (float timeValue, EventDataPtr &&data)
```

Creates a tick event and uses a data pointer.


****

| Parameter | Description |
| --- | --- |
| timeValue | The time value, in seconds, when the motion event should occur. |
| data | The values to emit when the event is triggered. |

**Syntax**

```
MotionEvent (float startTimeValue, float endTimeValue, EventDataPtr &&data)
```

Creates a ranged event and uses a data pointer.


****

| `Parameter` | Description |
| --- | --- |
| startTimeValue | The start time value, in seconds, when the motion event should start. |
| endTimeValue | The end time value, in seconds, when the motion event should end. When equal to the start time value, a start event is triggered, but no end event occurs. |
| data | The values to emit when the event is triggered. |

**Syntax**

```
MotionEvent (float timeValue, EventDataSet &&datas)
```

Creates a tick event and uses a dataset.


****

| Parameter | Description |
| --- | --- |
| timeValue | The time value, in seconds, when the motion event should occur. |
| datas | The values to emit when the event is triggered. |

**Syntax**

```
MotionEvent (float startTimeValue, float endTimeValue, EventDataSet &&datas)
```

Creates a ranged event and uses a dataset.


****

| `Parameter` | Description |
| --- | --- |
| startTimeValue | The start time value, in seconds, when the motion event should start. |
| endTimeValue | The end time value, in seconds, when the motion event should end. When equal to the start time value, a start event is triggered, but no end event occurs. |
| datas | The values to emit when the event is triggered. |

## SetStartTime 

Sets the start time value of the event, which is when the event should be processed.

**Syntax**

```
void SetStartTime (float timeValue)
```

## SetEndTime 

Sets the end time value of the event, which is when the event should be processed.

**Syntax**

```
void SetEndTime (float timeValue)
```

## GetStartTime 

Gets the start time value of this event, which is when the event should be executed.

**Syntax**

```
float GetStartTime () const
```

## GetEndTime 

Gets the end time value of this event, which is when the event should stop.

**Syntax**

```
float GetEndTime () const
```

## GetIsTickEvent 

Checks whether this is a tick event.

**Syntax**

```
bool GetIsTickEvent () const
```

## ConvertToTickEvent 

Converts this event into a tick event.

**Syntax**

```
void ConvertToTickEvent ()
```

## GetIsSyncEvent 

Checks whether this event is a sync event.

**Syntax**

```
bool GetIsSyncEvent () const
```

## SetIsSyncEvent 

Specifies whether this event is a sync event.

**Syntax**

```
void SetIsSyncEvent (bool newValue)
```

## HashForSyncing 

Creates a hash on the sync track of a motion.

**Syntax**

```
size_t HashForSyncing (bool isMirror) const
```

