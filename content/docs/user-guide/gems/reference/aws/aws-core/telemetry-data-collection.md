---
linktitle: Telemetry Data Collection
title: AWS Core Telemetry Data Collection
description: Telemetry data collected by the AWS Core Gem in Open 3D Engine.
weight: 500
---

The AWS Core Gem includes an option to send usage metrics to AWS periodically when the Editor is launched. We use this data to better understand how customers use the AWS solutions and related services and products. When enabled, we collect the following information and send it to AWS:

## Collected Metrics

| Field            | Description                | Example                                  |
|------------------|----------------------------|------------------------------------------|
| `version`        | Defines the version of the metric schema this event was produced under. | `Schema Policy 1.1` |
| `o3de_version`   | Defines the O3DE version (if known) providing the metric. | `2107.1` |
| `platform`       | Identifies the platform running the O3DE Editor. | Mac |
| `platform_version` | Identifies the version or sub-platform type. | `10.15.7` |
| `timestamp` | Timestamp for metric generation. | `2007-04-05T14:30` |
| `active_aws_gems` | A list of Gems active in your project, separated by '/'. | `AWSCore/AWSMetrics/AWSClientAuth` |

## Opting Out

You can also opt-out via the Editor preferences found at **Edit** -> **Editor Settings** -> **Global Preferences** -> **AWS**.

Or, you can modify the Editor Registry setting file under `<project>/user/Registry/editorpreferences.setreg` and restart the Editor.

Registry setting:
```json
{
    "Amazon"
    {
        "Telemetry": {
            "SendAWSUsageMetric": True
        }
    }
}
```
