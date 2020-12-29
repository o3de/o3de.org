# In\-Game Survey Cloud Gem Service API Reference<a name="cloud-canvas-cloud-gem-in-game-survey-service-api"></a>

You can use API operations on the Cloud Canvas in\-game survey service to manage survey, question, answer submission, and metadata operations\. Requests that succeed return an HTTP 200 response\.

**Topics**
+ [Get Service Status](#cloud-canvas-cloud-gem-in-game-survey-api-service-status)
+ [Survey Operations](cloud-canvas-cloud-gem-in-game-survey-api-survey-operations.md)
+ [Question Operations](cloud-canvas-cloud-gem-in-game-survey-api-question-operations.md)
+ [Answer Submission Operations](cloud-canvas-cloud-gem-in-game-survey-api-submission-operations.md)
+ [Metadata Operations](cloud-canvas-cloud-gem-in-game-survey-api-metadata-operations.md)

## Get Service Status<a name="cloud-canvas-cloud-gem-in-game-survey-api-service-status"></a>

To get status of the service, use the following syntax\.

```
GET /service/status
```

This API operation returns the service's status and is useful for testing connectivity\.

### Request Parameters<a name="cloud-canvas-cloud-gem-in-game-survey-api-service-status-request-parameters"></a>

This operation does not have request parameters\.

### Response<a name="cloud-canvas-cloud-gem-in-game-survey-api-service-status-response"></a>

Returns a string that reports the service's status\.

```
{
  "status": "string"
}
```