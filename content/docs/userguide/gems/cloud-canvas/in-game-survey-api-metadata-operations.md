---
description: ' Use metadata operations to get metadata from your &cloud; in-game surveys
  in &ALYlong;. '
title: Metadata Operations
---
# Metadata Operations {#cloud-canvas-cloud-gem-in-game-survey-api-metadata-operations}

You can use metadata operations to get metadata from your Cloud Canvas in\-game surveys\.

**Topics**
+ [Get Active Survey Metadata](#cloud-canvas-cloud-gem-in-game-survey-api-metadata-active-get)
+ [Get Survey Metadata by Survey Name](#cloud-canvas-cloud-gem-in-game-survey-api-metadata-get-by-survey-name)

## Get Active Survey Metadata {#cloud-canvas-cloud-gem-in-game-survey-api-metadata-active-get}

Gets a list of active survey metadata\.

```
GET /active/survey_metadata
```

### Request Parameters {#cloud-canvas-cloud-gem-in-game-survey-api-metadata-active-get-request-parameters}

#### limit {#cloud-canvas-cloud-gem-in-game-survey-api-metadata-active-get-request-parameters-limit}

Specifies the maximum number of survey metadata returned\. The default value is 1000\.

Type: Integer

Located in: Query

Required: No

#### pagination\_token {#cloud-canvas-cloud-gem-in-game-survey-api-metadata-active-get-request-parameters-pagination-token}

The pagination token that is returned by the previous query to get the next batch of survey metadata\.

Type: String

Located in: Query

Required: No

#### sort {#cloud-canvas-cloud-gem-in-game-survey-api-metadata-active-get-request-parameters-sort}

Specifies ascending or descending sort order for creation time\. Possible values are `ASC` or `DESC`\. The default is `DESC`\.

Type: String

Located in: Query

Required: No

### Response {#cloud-canvas-cloud-gem-in-game-survey-api-metadata-active-get-response}

Returns a JSON object that contains the list of active survey metadata\.

```
{
  "pagination_token": "string",
  "metadata_list": [
    {
      "survey_id": "string",
      "survey_name": "string",
      "num_questions": "integer",
      "creation_time": "integer",
      "activation_start_time": "integer",
      "activation_end_time": "integer"
    }
  ]
}
```

## Get Survey Metadata by Survey Name {#cloud-canvas-cloud-gem-in-game-survey-api-metadata-get-by-survey-name}

Searches survey metadata by survey name\.

```
GET /survey_metadata
```

### Request Parameters {#cloud-canvas-cloud-gem-in-game-survey-api-metadata-get-by-survey-name-request-parameters}

#### survey\_name {#cloud-canvas-cloud-gem-in-game-survey-api-metadata-get-by-survey-name-request-parameters-survey-name}

Specifies a string that is searched on survey names\. If `survey_name` is not passed or is empty, all survey metadata is returned sorted by creation time\.

Type: String

Located in: Query

Required: No

#### limit {#cloud-canvas-cloud-gem-in-game-survey-api-metadata-get-by-survey-name-request-parameters-limit}

Limits the maximum number of survey metadata items that are returned\. The default is the maximum allowed value of 1000\.

Type: Integer

Located in: Query

Required: No

#### pagination\_token {#cloud-canvas-cloud-gem-in-game-survey-api-metadata-get-by-survey-name-request-parameters-pagination-token}

A pagination token returned by the previous query to get the next batch of survey metadata\.

Type: String

Located in: Query

Required: No

#### sort {#cloud-canvas-cloud-gem-in-game-survey-api-metadata-get-by-survey-name-request-parameters-sort}

Specifies the ascending or descending sort order by creation time\. Possible values are `ASC` or `DESC`\. The default is `DESC`\.

Type: String

Located in: Query

Required: No

### Response {#cloud-canvas-cloud-gem-in-game-survey-api-metadata-get-by-survey-name-response}

Returns a list of survey metadata items\. When additional metadata exists that can be queried, returns a pagination token\.

```
{
   "pagination_token": "string",
   "metadata_list": [
      {
         "survey_id": "string",
         "survey_name": "string",
         "num_questions": "integer",
         "creation_time": "integer",
         "activation_start_time": "integer",
         "activation_end_time": "integer",
         "published": "boolean"
      }
   ]
}
```