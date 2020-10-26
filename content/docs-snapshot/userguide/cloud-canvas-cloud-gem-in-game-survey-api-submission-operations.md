# Answer Submission Operations<a name="cloud-canvas-cloud-gem-in-game-survey-api-submission-operations"></a>

You can use answer submission operations to manage answer submissions to your Cloud Canvas in\-game surveys\.

**Topics**
+ [Submit Answers to a Survey](#cloud-canvas-cloud-gem-in-game-survey-api-submission-submit)
+ [Get Answer Submissions to a Survey](#cloud-canvas-cloud-gem-in-game-survey-api-submission-get)
+ [Get a List of Answer Submission IDs](#cloud-canvas-cloud-gem-in-game-survey-api-submission-list-get)
+ [Get an Answer Submission by ID](#cloud-canvas-cloud-gem-in-game-survey-api-submission-get-by-id)
+ [Get Aggregated Answers for a Survey](#cloud-canvas-cloud-gem-in-game-survey-api-submission-aggregation-get)
+ [Update a Submission of Answers](#cloud-canvas-cloud-gem-in-game-survey-api-submission-update)
+ [Delete an Answer Submission](#cloud-canvas-cloud-gem-in-game-survey-api-submission-delete)
+ [Export Answer Submissions to a \.csv File](#cloud-canvas-cloud-gem-in-game-survey-api-submission-export)
+ [Get the Status of an Answer Submission Export](#cloud-canvas-cloud-gem-in-game-survey-api-submission-export-status-get)

## Submit Answers to a Survey<a name="cloud-canvas-cloud-gem-in-game-survey-api-submission-submit"></a>

Submits answers to a survey\. 

```
POST /active/surveys/{survey_id}/answers
```

### Request Parameters<a name="cloud-canvas-cloud-gem-in-game-survey-api-submission-submit-request-parameters"></a>

#### survey\_id<a name="cloud-canvas-cloud-gem-in-game-survey-api-submission-submit-request-parameters-survey-id"></a>

The survey UUID that is returned from creating a survey or querying survey metadata\.

Type: String

Located in: Path

Required: Yes

#### answer\_list<a name="cloud-canvas-cloud-gem-in-game-survey-api-submission-submit-request-parameters-answer-list"></a>

Specifies the answers to the survey with the following syntax:

```
{
   "answers": [
      {
         "question_id": "string",     /* The question UUID returned from querying the survey object. */
         "answer": [
            "string"
         ]
      }
   ]
}
```

### Response<a name="cloud-canvas-cloud-gem-in-game-survey-api-submission-submit-response"></a>

Returns a string that contains a unique submission ID\. You can use the submission ID to submit additional answers or overwrite previous answers\.

```
{
   "submission_id": "string"
}
```

## Get Answer Submissions to a Survey<a name="cloud-canvas-cloud-gem-in-game-survey-api-submission-get"></a>

Gets answer submissions to the survey that has the specified ID\.

```
GET /surveys/{survey_id}/answers
```

### Request Parameters<a name="cloud-canvas-cloud-gem-in-game-survey-api-submission-get-request-parameters"></a>

#### survey\_id<a name="cloud-canvas-cloud-gem-in-game-survey-api-submission-get-request-parameters-survey-id"></a>

The survey UUID that is returned from creating a survey or querying survey metadata\.

Type: String

Located in: Path

Required: Yes

#### limit<a name="cloud-canvas-cloud-gem-in-game-survey-api-submission-get-request-parameters-limit"></a>

Limits the maximum number of answer submissions that are returned\. The default is the maximum allowed value of 1000\.

Type: Integer

Located in: Query

Required: No

#### pagination\_token<a name="cloud-canvas-cloud-gem-in-game-survey-api-submission-get-request-parameters-pagination-token"></a>

A token returned by previous query to get next batch of answer submissions\.

Type: String

Located in: Query

Required: No

#### sort<a name="cloud-canvas-cloud-gem-in-game-survey-api-submission-get-request-parameters-sort"></a>

Specifies ascending or descending sort order for creation time\. Possible values are `ASC` or `DESC`\. The default is `DESC`\.

Type: String

Located in: Query

Required: No

### Response<a name="cloud-canvas-cloud-gem-in-game-survey-api-submission-get-response"></a>

Returns the answer submissions to the survey\.

```
{
   "pagination_token": "string",
   "submissions": [
      {
         "submission_id": "string",
         "creation_time": "number",
         "answers": [
            {
               "answers": [
                  {
                     "question_id": "string",     /* The question UUID returned from querying the survey object. */
                     "answer": [
                        "string"
                     ]
                  }
               ]
            }
         ]
      }
   ]
}
```

## Get a List of Answer Submission IDs<a name="cloud-canvas-cloud-gem-in-game-survey-api-submission-list-get"></a>

Gets a list of answer submission IDs for the specified survey\.

```
GET /active/surveys/{survey_id}/player_submissions
```

### Request Parameters<a name="cloud-canvas-cloud-gem-in-game-survey-api-submission-list-get-request-parameters"></a>

#### survey\_id<a name="cloud-canvas-cloud-gem-in-game-survey-api-submission-list-get-request-parameters-survey-id"></a>

The survey UUID that is returned from creating a survey or querying survey metadata\.

Type: String

Located in: Path

Required: Yes

### Response<a name="cloud-canvas-cloud-gem-in-game-survey-api-submission-list-get-response"></a>

Returns a string that contains a list of submission IDs\.

```
{
    "submission_id_list": [
        "string"
    ]
}
```

## Get an Answer Submission by ID<a name="cloud-canvas-cloud-gem-in-game-survey-api-submission-get-by-id"></a>

Gets a player's submission of answers to a specified survey\.

```
GET /active/surveys/{survey_id}/player_submission/{submission_id}
```

### Request Parameters<a name="cloud-canvas-cloud-gem-in-game-survey-api-submission-get-by-id-request-parameters"></a>

#### survey\_id<a name="cloud-canvas-cloud-gem-in-game-survey-api-submission-get-by-id-request-parameters-survey-id"></a>

The survey UUID that is returned from creating a survey or querying survey metadata\.

Type: String

Located in: Path

Required: Yes

#### submission\_id<a name="cloud-canvas-cloud-gem-in-game-survey-api-submission-get-by-id-request-parameters-submission-id"></a>

The submission ID that is returned when a player posts answers to the survey\.

Type: String

Located in: Path

Required: Yes

### Response<a name="cloud-canvas-cloud-gem-in-game-survey-api-submission-get-by-id-response"></a>

Returns a JSON object that contains a submission of answers from a player\.

```
{
   "submission_id": "string",
   "creation_time": "number",
   "answers": [
      {
         "answers": [
            {
               "question_id": "string",     /* The question UUID returned from querying the survey object. */
               "answer": [
                  "string"
               ]
            }
         ]
      }
   ]
}
```

## Get Aggregated Answers for a Survey<a name="cloud-canvas-cloud-gem-in-game-survey-api-submission-aggregation-get"></a>

Gets answer aggregations to a survey\.

```
GET /surveys/{survey_id}/answer_aggregations
```

### Request Parameters<a name="cloud-canvas-cloud-gem-in-game-survey-api-submission-aggregation-get-request-parameters"></a>

#### survey\_id<a name="cloud-canvas-cloud-gem-in-game-survey-api-submission-aggregation-get-request-parameters-survey-id"></a>

The survey UUID that is returned from creating a survey or querying survey metadata\.

Type: String

Located in: Path

Required: Yes

### Response<a name="cloud-canvas-cloud-gem-in-game-survey-api-submission-aggregation-get-response"></a>

Returns a JSON object that contains answer aggregations to the specified survey\.

```
{
   "question_answer_aggregations": [
      {
         "question_id": "string",
         "answer_aggregations": [
            {
               "answer": "string",
               "count": "integer"
            }
         ]
      }
   ]
}
```

## Update a Submission of Answers<a name="cloud-canvas-cloud-gem-in-game-survey-api-submission-update"></a>

Submits additional answers or overwrites answers from a previous submission to a survey\.

```
PUT /active/surveys/{survey_id}/answers/{submission_id}
```

### Request Parameters<a name="cloud-canvas-cloud-gem-in-game-survey-api-submission-update-request-parameters"></a>

#### survey\_id<a name="cloud-canvas-cloud-gem-in-game-survey-api-submission-update-request-parameters-survey-id"></a>

The survey UUID that is returned from creating a survey or querying survey metadata\.

Type: String

Located in: Path

Required: Yes

#### submission\_id<a name="cloud-canvas-cloud-gem-in-game-survey-api-submission-update-request-parameters-submission-id"></a>

The submission ID that is returned when a player posts answers to the survey\.

Type: String

Located in: Path

Required: Yes

#### answer\_list<a name="cloud-canvas-cloud-gem-in-game-survey-api-submission-update-request-parameters-answer-list"></a>

The answers to the survey in the following format:

```
{
   "answers": [
      {
         "question_id": "string",     /* The question UUID returned from querying the survey object. */
         "answer": [
            "string"
         ]
      }
   ]
}
```

Located in: Body

Required: Yes

### Response<a name="cloud-canvas-cloud-gem-in-game-survey-api-submission-update-response"></a>

Returns a string that contains the submission ID that was specified in the query string\.

```
{
   "submission_id": "string"
}
```

## Delete an Answer Submission<a name="cloud-canvas-cloud-gem-in-game-survey-api-submission-delete"></a>

Deletes the specified answer submission for the specified survey\.

```
DELETE /surveys/{survey_id}/answers/{submission_id}
```

### Request Parameters<a name="cloud-canvas-cloud-gem-in-game-survey-api-submission-delete-request-parameters"></a>

#### survey\_id<a name="cloud-canvas-cloud-gem-in-game-survey-api-submission-delete-request-parameters-survey-id"></a>

The survey UUID that is returned from creating a survey or querying survey metadata\.

Type: String

Located in: Path

Required: Yes

#### submission\_id<a name="cloud-canvas-cloud-gem-in-game-survey-api-submission-delete-request-parameters-submission-id"></a>

The submission ID that is returned when a player posts answers to the survey\.

Type: String

Located in: Path

Required: Yes

### Response<a name="cloud-canvas-cloud-gem-in-game-survey-api-submission-delete-response"></a>

Returns a string that reports the status of the deletion\.

```
{
   "status": "string"
}
```

## Export Answer Submissions to a \.csv File<a name="cloud-canvas-cloud-gem-in-game-survey-api-submission-export"></a>

Exports answer submissions asynchronously to a `.csv` file on Amazon S3\.

```
POST /surveys/{survey_id}/answers/export_csv
```

### Request Parameters<a name="cloud-canvas-cloud-gem-in-game-survey-api-submission-export-request-parameters"></a>

#### survey\_id<a name="cloud-canvas-cloud-gem-in-game-survey-api-submission-export-request-parameters-survey-id"></a>

The survey UUID that is returned from creating a survey or querying survey metadata\.

Type: String

Located in: Path

Required: Yes

### Response<a name="cloud-canvas-cloud-gem-in-game-survey-api-submission-export-response"></a>

Returns a string that contains a request ID that you can use to query the status of the task\.

```
{
   "requestId": "string"
}
```

## Get the Status of an Answer Submission Export<a name="cloud-canvas-cloud-gem-in-game-survey-api-submission-export-status-get"></a>

Gets the status of the export of answer submissions to a `.csv` file\.

```
GET /surveys/{survey_id}/answers/export_csv/{request_id}
```

### Request Parameters<a name="cloud-canvas-cloud-gem-in-game-survey-api-submission-export-status-get-request-parameters"></a>

#### survey\_id<a name="cloud-canvas-cloud-gem-in-game-survey-api-submission-export-status-get-request-parameters-survey-id"></a>

The survey UUID that is returned from creating a survey or querying survey metadata\.

Type: String

Located in: Path

Required: Yes

#### request\_id<a name="cloud-canvas-cloud-gem-in-game-survey-api-submission-export-status-get-request-parameters-request-id"></a>

The request ID that is returned from a request to export answers in a `.csv` file\.

Type: String

Located in: Path

Required: Yes

### Response<a name="cloud-canvas-cloud-gem-in-game-survey-api-submission-export-status-get-response"></a>

When the task is finished, returns a string that contains an Amazon S3 presigned URL\.

```
{
   "num_submissions_exported": "integer",
   "s3_presigned_url": "string"
}
```