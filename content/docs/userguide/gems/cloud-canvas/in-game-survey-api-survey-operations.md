---
description: ' Use survey operations to manage your Cloud Canvas in-game surveys in Amazon Lumberyard. '
title: Survey Operations
---
# Survey Operations {#cloud-canvas-cloud-gem-in-game-survey-api-survey-operations}

You can use survey operations to manage your Cloud Canvas in\-game surveys\.

**Topics**
+ [Create or Clone a Survey](#cloud-canvas-cloud-gem-in-game-survey-api-survey-create-or-clone)
+ [Publish or Unpublish a Survey](#cloud-canvas-cloud-gem-in-game-survey-api-survey-publish-unpublish)
+ [Get an Active Survey by ID](#cloud-canvas-cloud-gem-in-game-survey-api-survey-active-get)
+ [Get a Survey by ID](#cloud-canvas-cloud-gem-in-game-survey-api-survey-get-by-id)
+ [Update the Activation Period for a Survey](#cloud-canvas-cloud-gem-in-game-survey-api-survey-activation-period-update)
+ [Rename a Survey](#cloud-canvas-cloud-gem-in-game-survey-api-survey-rename)
+ [Delete a Survey](#cloud-canvas-cloud-gem-in-game-survey-api-survey-delete)

## Create or Clone a Survey {#cloud-canvas-cloud-gem-in-game-survey-api-survey-create-or-clone}

Creates or clones a survey that has the name provided in the request body\.

```
POST /surveys
```

### Request Parameters {#cloud-canvas-cloud-gem-in-game-survey-api-survey-create-or-clone-request-parameters}

#### create\_survey\_input {#cloud-canvas-cloud-gem-in-game-survey-api-survey-create-or-clone-request-parameters-create-survey-input}

Creates a survey input object\. Use the `survey_name` field for the survey name\. Use the optional `survey_id_to_clone` field if you want to clone the new survey from an existing survey\.

```
{
   "survey_name": "string",           /* Survey name */
   "survey_id_to_clone": "string"     /* Optional. If specified, the new survey is cloned from the specified survey ID. */
}
```

Located in: Body

Required: Yes

### Response {#cloud-canvas-cloud-gem-in-game-survey-api-survey-create-or-clone-response}

Returns a unique ID for the survey that is created\.

```
{
   "survey_id": "string",
   "creation_time": "integer"
}
```

## Publish or Unpublish a Survey {#cloud-canvas-cloud-gem-in-game-survey-api-survey-publish-unpublish}

Publishes or unpublishes the survey that has the specified ID\. Returns the status of the change\.

```
PUT /surveys/{survey_id}/published
```

### Request Parameters {#cloud-canvas-cloud-gem-in-game-survey-api-survey-publish-unpublish-request-parameters}

#### survey\_id {#cloud-canvas-cloud-gem-in-game-survey-api-survey-publish-unpublish-request-parameters-survey-id}

The survey UUID that is returned from creating a survey or querying survey metadata\.

Type: String

Located in: Path

Required: Yes

#### survey\_published\_status {#cloud-canvas-cloud-gem-in-game-survey-api-survey-publish-unpublish-request-parameters-survey-published-status}

The published status object that indicates whether the survey is published\.

```
{
   "published": "boolean"     /* Determines if the survey is published */
}
```

Located in: Body

Required: Yes

### Response {#cloud-canvas-cloud-gem-in-game-survey-api-survey-publish-unpublish-response}

Returns a string that reports the status of the change\.

```
{
   "format": "string"
}
```

## Get an Active Survey by ID {#cloud-canvas-cloud-gem-in-game-survey-api-survey-active-get}

```
GET /active/surveys/{survey_id}
```

Gets the active survey that has the specified survey ID\.

### Request Parameters {#cloud-canvas-cloud-gem-in-game-survey-api-survey-active-get-request-parameters}

#### survey\_id {#cloud-canvas-cloud-gem-in-game-survey-api-survey-active-get-request-parameters-survey-id}

The survey UUID that is returned from creating a survey or querying survey metadata\.

Type: String

Located in: Path

Required: Yes

#### question\_index {#cloud-canvas-cloud-gem-in-game-survey-api-survey-active-get-request-parameters-question-index}

The index of the question from which to start the query\.

Type: Integer

Located in: Query

Required: No

#### question\_count {#cloud-canvas-cloud-gem-in-game-survey-api-survey-active-get-request-parameters-question-count}

The number of questions to query starting with `question_index`\.

Type: Integer

Located in: Query

Required: No

### Response {#cloud-canvas-cloud-gem-in-game-survey-api-survey-active-get-response}

Returns the active survey that has the specified ID in a JSON object\.

```
{
   "survey_id": "string",
   "survey_name": "string",
   "questions": [
      {
         "question_id": "string",     /* Unique question id. */
         "title": "string",           /* Question title. */
         "type": "string",            /* Question type. Can be predefined, scale, or text. */
         "min": "integer",            /* Minimum value for scale type question. */
         "max": "integer",            /* Maximum value for scale type question. */
         "min_label": "string",       /* Minimum value label for scale type question. Optional. */
         "max_label": "string",       /* Maximum value label for scale type question. Optional. */
         "max_chars": "integer",      /* Maximum allowed characters for text type question. */
         "predefines": [              /* Predefined options for predefined type question. */
            "string"
         ],
         "multiple_select": "boolean" /* Determines whether the predefined type question is single choice or multiple choice. */
      }
   ]
}
```

## Get a Survey by ID {#cloud-canvas-cloud-gem-in-game-survey-api-survey-get-by-id}

Gets the survey with the specified survey ID\.

```
GET /surveys/{survey_id}
```

### Request Parameters {#cloud-canvas-cloud-gem-in-game-survey-api-survey-get-by-id-request-parameters}

#### survey\_id {#cloud-canvas-cloud-gem-in-game-survey-api-survey-get-by-id-request-parameters-survey-id}

Type: String

Located in: Path

Required: Yes

The survey UUID that is returned from creating a survey or querying survey metadata\.

#### question\_index {#cloud-canvas-cloud-gem-in-game-survey-api-survey-get-by-id-request-parameters-question-index}

Type: Integer

Located in: Query

Required: No

Specifies the question from which to start querying\.

#### question\_count {#cloud-canvas-cloud-gem-in-game-survey-api-survey-get-by-id-request-parameters-question-count}

Type: Integer

Located in: Query

Required: No

Specifies the number of questions to query starting from `question_index`\.

### Response {#cloud-canvas-cloud-gem-in-game-survey-api-survey-get-by-id-response}

Returns the survey that has the specified ID in a JSON object\.

```
{
   "survey_id": "string",
   "survey_name": "string",
   "questions": [
      {
         "enabled": "boolean",
         "question_id": "string",
         "title": "string",
         "type": "string",
         "min": "integer",
         "max": "integer",
         "min_label": "string",
         "max_label": "string",
         "max_chars": "integer",
         "predefines": [
            "string"
         ],
         "multiple_select": "boolean"
      }
   ]
}
```

## Update the Activation Period for a Survey {#cloud-canvas-cloud-gem-in-game-survey-api-survey-activation-period-update}

Updates the activation period for the survey\.

```
PUT /surveys/{survey_id}/activation_period
```

### Request Parameters {#cloud-canvas-cloud-gem-in-game-survey-api-survey-activation-period-update-request-parameters}

#### survey\_id {#cloud-canvas-cloud-gem-in-game-survey-api-survey-activation-period-update-request-parameters-survey-id}

The survey UUID that is returned from creating a survey or querying survey metadata\.

Type: String

Located in: Path

Required: Yes

#### update\_activation\_period\_input {#cloud-canvas-cloud-gem-in-game-survey-api-survey-activation-period-update-request-parameters-update-activation-period-input}

Specifies the activation start time and activation end time using the following syntax:

```
{
   "activation_start_time": "integer",     /* Survey active window start epoch time. Optional. Starts from the current time if not supplied. */
   "activation_end_time": "integer"        /* Survey active window end epoch time. Optional. Does not end if not supplied. */
}
```

Located in: Body

Required: Yes

### Response {#cloud-canvas-cloud-gem-in-game-survey-api-survey-activation-period-update-response}

Returns a string that reports the status of the update\.

```
{
   "format": "string"
}
```

## Rename a Survey {#cloud-canvas-cloud-gem-in-game-survey-api-survey-rename}

Renames the survey that has the specified ID\.

```
PUT /surveys/{survey_id}/name
```

### Request Parameters {#cloud-canvas-cloud-gem-in-game-survey-api-survey-rename-request-parameters}

#### survey\_id {#cloud-canvas-cloud-gem-in-game-survey-api-survey-rename-request-parameters-survey-id}

The survey UUID that is returned from creating a survey or querying survey metadata\.

Type: String

Located in: Path

Required: Yes

#### rename\_survey\_input {#cloud-canvas-cloud-gem-in-game-survey-api-survey-rename-request-parameters-rename-survey-input}

A rename survey object that specifies the new name for the survey\.

```
{
   "survey_name": "string"     /* New survey name */
}
```

Located in: Body

Required: Yes

### Response {#cloud-canvas-cloud-gem-in-game-survey-api-survey-rename-response}

Returns a string that reports the status of the renaming\.

```
{
   "format": "string"
}
```

## Delete a Survey {#cloud-canvas-cloud-gem-in-game-survey-api-survey-delete}

Deletes the survey that has the specified survey ID\.

```
DELETE /surveys/{survey_id}
```

### Request Parameters {#cloud-canvas-cloud-gem-in-game-survey-api-survey-delete-request-parameters}

#### survey\_id {#cloud-canvas-cloud-gem-in-game-survey-api-survey-delete-request-parameters-survey-id}

Type: String

Located in: Path

Required: Yes

The survey UUID that is returned from creating a survey or querying survey metadata\.

### Response {#cloud-canvas-cloud-gem-in-game-survey-api-survey-delete-response}

 Returns a string that reports the status of the deletion\.

```
{
   "status": "string"
}
```