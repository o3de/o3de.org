---
description: ' Learn to use the &cloud; In-Game Survey Cloud Gem API in &ALYlong;. '
title: In-Game Survey Cloud Gem Service API Reference
---
# In\-Game Survey Cloud Gem Service API Reference {#cloud-canvas-cloud-gem-in-game-survey-service-api}

You can use API operations on the Cloud Canvas in\-game survey service to manage survey, question, answer submission, and metadata operations\. Requests that succeed return an HTTP 200 response\.

**Topics**
+ [Get Service Status](#cloud-canvas-cloud-gem-in-game-survey-api-service-status)
+ [Survey Operations](/docs/userguide/gems/cloud-canvas/in-game-survey-api-survey-operations.md)
+ [Question Operations](/docs/userguide/gems/cloud-canvas/in-game-survey-api-question-operations.md)
+ [Answer Submission Operations](/docs/userguide/gems/cloud-canvas/in-game-survey-api-submission-operations.md)
+ [Metadata Operations](/docs/userguide/gems/cloud-canvas/in-game-survey-api-metadata-operations.md)

## Get Service Status {#cloud-canvas-cloud-gem-in-game-survey-api-service-status}

To get status of the service, use the following syntax\.

```
GET /service/status
```

This API operation returns the service's status and is useful for testing connectivity\.

### Request Parameters {#cloud-canvas-cloud-gem-in-game-survey-api-service-status-request-parameters}

This operation does not have request parameters\.

### Response {#cloud-canvas-cloud-gem-in-game-survey-api-service-status-response}

Returns a string that reports the service's status\.

```
{
  "status": "string"
}
```