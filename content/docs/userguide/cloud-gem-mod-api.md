# Cloud Gem Message of the Day API Calls<a name="cloud-gem-mod-api"></a>

The game client and Cloud Gem Portal use Amazon API Gateway to securely invoke service API Lambda functions\. The game client can read messages while the Cloud Gem Portal can add, list, edit, and delete messages\.

![\[Game client and Cloud Gem Portal call Lambda functions through API Gateway\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-mod-details-diag.png)

## The Game Client Service API Calls: /player/messages<a name="cloud-canvas-cloud-gem-mod-api-game-client"></a>

The game client read\-message functionality is implemented by the `player_messages.py` file located in the `\dev\Gems\CloudGemMessageOfTheDay\AWS\lambda-function-code\api` directory\.

### get \(Read Messages\)<a name="cloud-canvas-cloud-gem-mod-api-game-client-get"></a>

The `get` function reads messages for the player\.

#### Parameters<a name="cloud-canvas-cloud-gem-mod-api-game-client-get-parameters"></a>

The `get` function has the following parameters\.

```
{
    "clientTime" : datetime as string : Opt [default UTC] : The datetime value used to retrieve the messages. The default is UTC.
    "clientLanguage" : String : Opt [default "Eng"] : The language used for localization.
}
```

#### Description<a name="cloud-canvas-cloud-gem-mod-api-game-client-get-description"></a>

The `get` function returns a list of messages whose `startTime` <= `clientTime` <= `endTime`\.

#### Return Value<a name="cloud-canvas-cloud-gem-mod-api-game-client-get-return-value"></a>

The `get` function returns a list of messages of the day\.

```
{
    "list" : a list of objects
    {
        "message": string
        "priority": integer,
        "startTime": datetime,
        "endTime": datetime
    }
}
```

## Cloud Gem Portal Admin Service API Calls: /admin/messages<a name="cloud-canvas-cloud-gem-mod-api-admin"></a>

The Cloud Gem Portal message functionality is implemented by code in the `admin_messages.py` file located in the `\dev\Gems\CloudGemMessageOfTheDay\AWS\lambda-function-code\api` directory\.

### post \(Add Message\)<a name="cloud-canvas-cloud-gem-mod-api-admin-post"></a>

The `post` function adds a message of the day\.

#### Parameters<a name="cloud-canvas-cloud-gem-mod-api-admin-post-parameters"></a>

The `post` function has the following parameters\.

```
{
    "message": String: Required
    "priority": Integer, : Opt [default 0]
    "startTime": datetime: Opt [default Jan 01 1900 00:00 ]
    "endTime": datetime: Opt [default Dec 31 2100 23:59 ]
}
```

#### Description<a name="cloud-canvas-cloud-gem-mod-api-admin-post-description"></a>

The `post` function adds a message entry to the main table in DynamoDB and returns a `UniqueMsgID` string\.

### put \(Edit Message\)<a name="cloud-canvas-cloud-gem-mod-api-admin-put"></a>

The `put` function edits an existing message\.

#### Parameters<a name="cloud-canvas-cloud-gem-mod-api-admin-put-parameters"></a>

The `put` function has the following parameters\.

```
{
    "UniqueMsgID": String: Required
    "message": String: Opt [default leaves current message unchanged]
    "priority": Integer, : Opt [default 0]
    "startTime": datetime: Opt [default Jan 01 1900 00:00 ]
    "endTime": datetime: Opt [default Dec 31 2100 23:59 ]
}
```

#### Description<a name="cloud-canvas-cloud-gem-mod-api-admin-put-description"></a>

The `put` function updates the message in the main table that matches the specified message ID\. To update the message, the function overwrites its attributes\. You can also use the `put` function to reschedule and reprioritize a message by updating the start time, end time, and priority values\.

#### Return Value<a name="cloud-canvas-cloud-gem-mod-api-admin-put-return-value"></a>

The `put` function returns a string that indicates the result status of the operation\.

### delete \(Delete Message\)<a name="cloud-canvas-cloud-gem-mod-api-admin-delete"></a>

The `delete` function deletes the specified message\.

#### Parameters<a name="cloud-canvas-cloud-gem-mod-api-admin-delete-parameters"></a>

The `delete` function has the following parameters\.

```
{
    "UniqueMsgID": String: Required
}
```

#### Description<a name="cloud-canvas-cloud-gem-mod-api-admin-delete-description"></a>

Deletes the message from the main table that matches the specified message ID\.

#### Return Value<a name="cloud-canvas-cloud-gem-mod-api-admin-delete-return-value"></a>

The `delete` function returns a string that indicates the result status of the operation\.

### get \(List Messages\)<a name="cloud-canvas-cloud-gem-mod-api-admin-get"></a>

The `get` function retrieves a list of messages of the day\.

#### Parameters<a name="cloud-canvas-cloud-gem-mod-api-admin-get-parameters"></a>

The `get` function has the following parameters\.

```
{
    "index": Integer: Opt [default 0]
    "count": Integer: Opt [default 9999999]
    "filter": Opt [default all] Can be one of the following: "active", "expired", "planned" or "all"
}
```

#### Description<a name="cloud-canvas-cloud-gem-mod-api-admin-get-description"></a>

The `get` function returns the filtered count of entries in the table, including all fields starting at the specified index\.

#### Return Value<a name="cloud-canvas-cloud-gem-mod-api-admin-get-return-value"></a>

The `get` function returns a list of messages of the day in the following format\.

```
{
    "list" : a list of objects
    {
        "UniqueMsgID": String
        "message": String
        "priority": Integer,
        "startTime": datetime,
        "endTime": datetime
    }
}
```