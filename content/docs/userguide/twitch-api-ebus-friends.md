# Friends<a name="twitch-api-ebus-friends"></a>

Friends APIs for Twitch

## ResetFriendsNotificationCount<a name="twitch-api-ebus-friends-resetfriendsnotificationcount"></a>

Deletes the count of friends notifications for the specified user\. When deleted, the notification count automatically resets to 0\.

The following is an example of how to use `ResetFriendsNotificationCount`:

```
ReceiptID receipt;
AZStd::string friendID;
EBUS_EVENT(Twitch::TwitchRequestBus, ResetFriendsNotificationCount, receipt, friendID);
 
/*
** Portion of the TwitchNotifications class showing the ResetFriendsNotificationCountNotify callback.
*/
class TwitchNotifications : public Twitch::TwitchNotifyBus
{
	void ResetFriendsNotificationCountNotify(const Int64Value& result) override
	{
		if(result.Result == Twitch::ResultCode::Success)
		{
			// Display user id.
			cout << "Reset Friends Notification Count" << endl;
			cout << "  Request: " << result.GetID() << endl;
			cout << "HTTP Code: " << result.Value << endl;
		}
	}
}
```Parameters

**receipt**  
The receipt for the call, which returns in the format `Twitch::ReceiptID`\.

**friendID**  
The Twitch ID for which to reset the friends notification\. If the `AZStd::string` value is empty, the friend ID for the active user is used\.

**Return**  
No return value\.ResetFriendsNotificationCountNotify Callback

**result \- Int64Value**  
Value – The HTTP response code for this call\. If successful, the value should be 204 \(No Content\)\.  
Result – One of the result code values, which returns in the format `Twitch::ResultCode`\.

## GetFriendNotificationCount<a name="twitch-api-ebus-friends-getfriendnotificationcount"></a>

Retrieves the number of unseen friends notifications for the active user\.

The following is an example of how to use `GetFriendNotificationCount`:

```
ReceiptID receipt;
AZStd::string friendID;
EBUS_EVENT(Twitch::TwitchRequestBus, GetFriendNotificationCount, receipt, friendID);
 
/*
** Portion of the TwitchNotifications class showing the GetFriendNotificationCount callback.
*/
class TwitchNotifications : public Twitch::TwitchNotifyBus
{
	void GetFriendNotificationCount(const Int64Value& result) override
	{
		if(result.Result == Twitch::ResultCode::Success)
		{
			// Display user id.
			cout << "Get Friends Notification Count" << endl;
			cout << "  Request: " << result.GetID() << endl;
			cout << "    Count: " << result.Value << endl;
		}
	}
}
```Parameters

**receipt**  
The receipt for the call, which returns in the format `Twitch::ReceiptID`\.

**friendID**  
The Twitch ID for which to retrieve the friends notification count\. If the `AZStd::string` value is empty, the friend ID for the active user is used\.

**Return**  
No return value\.ResetFriendsNotificationCountNotify Callback

**result \- Int64Value**  
Value – If successful, the notification count for this call\. If unsuccessful, the count will display 0\.  
Result – One of the result code values, which returns in the format `Twitch::ResultCode`\.

## GetFriendRecommendations<a name="twitch-api-ebus-friends-getfriendrecommendations"></a>

Retrieves friend recommendations for the specified user\. Each recommendation includes one of the following reasons:
+ active\_in\_same\_channels – You are both active in the same channels\.
+ bilateral\_follow – You follow each other\.
+ chat\_mentioned – You @mentioned the other user\.
+ hosted – You hosted the other user\.
+ mod\_in\_same\_channels – You are both moderators in the same channels\.
+ team – You are both on the same team on Twitch\.
+ whispered – You whispered to the other user\.

The following is an example of how to use `GetFriendRecommendations`:

```
ReceiptID receipt;
AZStd::string friendID;
EBUS_EVENT(Twitch::TwitchRequestBus, GetFriendRecommendations, receipt, friendID);
 
/*
** Portion of the TwitchNotifications class showing the GetFriendRecommendations callback.
*/
class TwitchNotifications : public Twitch::TwitchNotifyBus
{
	void GetFriendRecommendations(const FriendRecommendationValue& result) override
	{
		if(result.Result == Twitch::ResultCode::Success)
		{
			cout << "Get Friend Recommendations" << endl;
			// Display results
			
			for(const auto & i: result.Value)
			{
				cout << "               Reason: " << i.Reason << endl;
				cout << " UserInfo-         ID: " << i.User.ID << endl;
				cout << " UserInfo-       Name: " << i.User.Name << endl;
				cout << " UserInfo-        Bio: " << i.User.Bio << endl;
				cout << " UserInfo-CreatedDate: " << i.User.CreatedDate << endl;
				cout << " UserInfo-DisplayName: " << i.User.DisplayName << endl;
				cout << " UserInfo-UpdatedDate: " << i.User.UpdatedDate << endl;
				cout << " UserInfo-       Logo: " << i.User.Logo << endl;
				cout << " UserInfo-       Type: " << i.User.Type << endl;
				cout << " UserInfo- ProfileBnr: " << i.User.ProfileBanner << endl;
				cout << " UserInfo-ProfileBnrC: " << i.User.ProfileBannerBackgroundColor << endl;
			}
		}
	}
}
```Parameters

**receipt**  
The receipt for the call, which returns in the format `Twitch::ReceiptID`\.

**friendID**  
The user's Twitch ID\. If the `AZStd::string` value is empty, the friend ID for the active user is used\.

**Return**  
No return value\.GetFriendRecommendations Callback

**result \- FriendRecommendationValue**  
Value – The friend recommendation list, which includes the following data:  
+ Reason – The recommendation reason, which returns in the format `AZStd::string`\.
+ User – The user information, which includes the following data:
  + ID – The Twitch user ID, which returns in the format `AZStd::string`\.
  + Bio – The user's description, if provided\. This value returns in the format `AZStd::string`\.
  + CreatedDate – The date the user was created, which displays in the ISO 8601 format\.
  + DisplayName – The user's display name, which returns in the format `AZStd::string`\.
  + Logo – The URL for the user's logo, if provided\.
  + Name – The user's name, which returns in the format `AZStd::string`\.
  + ProfileBanner – The URL for the user's profile banner, if provided\.
  + ProfileBannerBackgroundColor – The URL for the user's profile banner background color, if provided\.
  + Type – The type can be staff, user, partner, moderator, or administrator\. This list is not absolute and may be updated with additional values\. 
  + UpdatedDate – The date the user was last updated, which displays in the ISO 8601 format\.
Result – One of the result code values, which returns in the format `Twitch::ResultCode`\.

## GetFriends<a name="twitch-api-ebus-friends-getfriends"></a>

Retrieves the specified user's friends and returns a maximum of 256 friends\. You can use the result from the `cursor` parameter to retrieve the next block of friends\.

The following is an example of how to use `GetFriends`:

```
ReceiptID receipt;
AZStd::string friendID;
AZStd::string cursor;	// must be an empty string on initial call
EBUS_EVENT(Twitch::TwitchRequestBus, GetFriends, receipt, friendID, cursor);
 
/*
** Portion of the TwitchNotifications class showing the GetFriends callback.
*/
class TwitchNotifications : public Twitch::TwitchNotifyBus
{
	void GetFriends(const GetFriendValue& result) override
	{
		if(result.Result == Twitch::ResultCode::Success)
		{
			const GetFriendReturn & info(result.Value);
			// Display results
			cout << "Get Friends" << endl;
			cout << "Cursor for next block" << info.Cursor << endl;
						
			for(const auto & i: info.Friends)
			{
				cout << "          CreatedDate: " << i.createdDate << endl;
				cout << " UserInfo-         ID: " << i.User.ID << endl;
				cout << " UserInfo-       Name: " << i.User.Name << endl;
				cout << " UserInfo-        Bio: " << i.User.Bio << endl;
				cout << " UserInfo-CreatedDate: " << i.User.CreatedDate << endl;
				cout << " UserInfo-DisplayName: " << i.User.DisplayName << endl;
				cout << " UserInfo-UpdatedDate: " << i.User.UpdatedDate << endl;
				cout << " UserInfo-       Logo: " << i.User.Logo << endl;
				cout << " UserInfo-       Type: " << i.User.Type << endl;
				cout << " UserInfo- ProfileBnr: " << i.User.ProfileBanner << endl;
				cout << " UserInfo-ProfileBnrC: " << i.User.ProfileBannerBackgroundColor << endl;
			}
		}
	}
}
```Parameters

**receipt**  
The receipt for the call, which returns in the format `Twitch::ReceiptID`\.

**friendID**  
The user's Twitch ID\. If the `AZStd::string` value is empty, the friend ID for the active user is used\.

**cursor**  
Used to retrieve the next block of data\. When initially called, an empty string is used\. Subsequent calls require you to pass the cursor value from the callback\. This allows you to continue retrieving results\.

**Return**  
No return value\.GetFriends Callback

**result \- GetFriendValue**  
Value – The result of the `GetFriendReturn` call, which includes the following data:  
+ Cursor – If a value is present, use the value to retrieve the next block of data\.
+ Friends – The friends list, which includes the following data:
  + CreatedDate – The date the friend was added, which displays in the ISO 8601 format\.
  + User – The user's information, which includes the following data:
    + ID – The Twitch user ID, which returns in the format `AZStd::string`\.
    + Bio – The user's description, if provided\. This value returns in the format `AZStd::string`\.
    + CreatedDate – The date the user was created, which displays in the ISO 8601 format\.
    + DisplayName – The user's display name, which returns in the format `AZStd::string`\.
    + Logo – The URL for the user's logo, if provided\.
    + Name – The user's name, which returns in the format `AZStd::string`\.
    + ProfileBanner – The URL for the user's profile banner, if provided\.
    + ProfileBannerBackgroundColor – The URL for the user's profile banner background color, if provided\.
    + Type – The type can be staff, user, partner, moderator, or administrator\. This list is not absolute and may be updated with additional values\.
    + UpdatedDate – The date the user was last updated, which displays in the ISO 8601 format\.
Result – One of the result code values, which returns in the format Twitch::ResultCode\.

## GetFriendStatus<a name="twitch-api-ebus-friends-getfriendstatus"></a>

Retrieves the friendship status between the specified user \(sourceFriendID\) and another user \(targetFriendID\)\.

The following is an example of how to use `GetFriendStatus`:

```
ReceiptID receipt;
AZStd::string sourceFriendID;	// if an empty string,  the friend ID for the active user is used
AZStd::string targetFriendID;	// This must be a valid id.
EBUS_EVENT(Twitch::TwitchRequestBus, GetFriendStatus, receipt, sourceFriendID, targetFriendID);
 
/*
** Portion of the TwitchNotifications class showing the GetFriendStatus callback.
*/
class TwitchNotifications : public Twitch::TwitchNotifyBus
{
	void GetFriendStatus(const FriendStatusValue& result) override
	{
		if(result.Result == Twitch::ResultCode::Success)
		{
			const FriendStatus & info(result.Value);
			// Display results
			cout << "Get Friend Status" << endl;
			cout << "               Status: " << i.Status << endl;
			cout << " UserInfo-         ID: " << i.User.ID << endl;
			cout << " UserInfo-       Name: " << i.User.Name << endl;
			cout << " UserInfo-        Bio: " << i.User.Bio << endl;
			cout << " UserInfo-CreatedDate: " << i.User.CreatedDate << endl;
			cout << " UserInfo-DisplayName: " << i.User.DisplayName << endl;
			cout << " UserInfo-UpdatedDate: " << i.User.UpdatedDate << endl;
			cout << " UserInfo-       Logo: " << i.User.Logo << endl;
			cout << " UserInfo-       Type: " << i.User.Type << endl;
			cout << " UserInfo- ProfileBnr: " << i.User.ProfileBanner << endl;
			cout << " UserInfo-ProfileBnrC: " << i.User.ProfileBannerBackgroundColor << endl;
		}
	}
}
```Parameters

**receipt**  
The receipt for the call, which returns in the format `Twitch::ReceiptID`\.

**sourceFriendID**  
The user's Twitch ID\. If the `AZStd::string` value is empty, the friend ID for the active user is used\.

**targetFriendID**  
The Twitch ID for which to obtain status\. You must provide a valid Twitch ID\.

**Return**  
No return value\.GetFriends Callback

**result \- FriendStatusValue**  
Value – The result of the `FriendStatus` call, which includes the following data:  
+ Status – The status of the call, which can be one of the following values:
  + friends – The users are friends\.
  + no\_relation – The users are not friends and do not have a pending friend request\.
  + requested\_by – The target user sent a friend request to the source user\.
  + sent\_request – The source user sent a friend request to the target user\.
+ User – The user's information, which includes the following data:
  + ID – The Twitch user ID, which returns in the format `AZStd::string`\.
  + Bio – The user's description, if provided\. This value returns in the format `AZStd::string`\.
  + CreatedDate – The date the user was created, which displays in the ISO 8601 format\.
  + DisplayName – The user's display name, which returns in the format `AZStd::string`\.
  + Logo – The URL for the user's logo, if provided\.
  + Name – The user's name, which returns in the format `AZStd::string`\.
  + ProfileBanner – The URL for the user's profile banner, if provided\.
  + ProfileBannerBackgroundColor – The URL for the user's profile banner background color, if provided\.
  + Type – The type can be staff, user, partner, moderator, or administrator\. This list is not absolute and may be updated with additional values\.
  + UpdatedDate – The date the user was last updated, which displays in the ISO 8601 format\.
Result – One of the result code values, which returns in the format Twitch::ResultCode\.

## AcceptFriendRequest<a name="twitch-api-ebus-friends-acceptfriendrequest"></a>

Accepts a friend request and creates a friends relationship between the active user \(source\) and another user \(targetFriendID\)\. The target user must have an open friend request to the source user\.

The following is an example of how to use `GetFriendStatus`:

```
ReceiptID receipt;
AZStd::string targetFriendID;	// This must be a valid id.
EBUS_EVENT(Twitch::TwitchRequestBus, AcceptFriendRequest, receipt, targetFriendID);
 
/*
** Portion of the TwitchNotifications class showing the AcceptFriendRequest callback.
*/
class TwitchNotifications : public Twitch::TwitchNotifyBus
{
	void AcceptFriendRequest(const Int64Value& result) override
	{
		if(result.Result == Twitch::ResultCode::Success)
		{
			cout << "Accept Friend Request" << endl;
			cout << "Code: " << result.Value << endl;
		}
	}
}
```Parameters

**receipt**  
The receipt for the call, which returns in the format `Twitch::ReceiptID`\.

**targetFriendID**  
The Twitch ID of the friend who will accept the friendship\.

**Return**  
No return value\.GetFriends Callback

**result \- Int64Value**  
Value – The HTTP response code for this call\. If successful, the value should be 201 \(`HttpResponseCode::CREATED`\)\.  
Result – One of the result code values, which returns in the format `Twitch::ResultCode`\.

## GetFriendRequests<a name="twitch-api-ebus-friends-getfriendrequests"></a>

Retrieves open friend requests, which are requests that the active user has not yet accepted or declined\. A maximum of 2000 requests are returned, with non\-strangers first, followed by strangers\. You can use the result from the `cursor` parameter to retrieve the next block of friends\.

For example, if Alice sends a friend request to Bob, she is considered a non\-stranger if:
+ Alice is a moderator or editor of Bob's channel\.
+ Alice is a Twitch staff member, administrator, global moderator, or partner\.
+ Bob follows Alice or has sent Alice a whisper\.

The following is an example of how to use `GetFriendRequests`:

```
ReceiptID receipt;
AZStd::string cursor;	// This must be empty on the initial call
EBUS_EVENT(Twitch::TwitchRequestBus, GetFriendRequests, receipt, cursor);
 
/*
** Portion of the TwitchNotifications class showing the GetFriendRequestscallback.
*/
class TwitchNotifications : public Twitch::TwitchNotifyBus
{
	void GetFriendRequests(const FriendRequestValue& result) override
	{
		if(result.Result == Twitch::ResultCode::Success)
		{
			cout << "Accept Friend Request" << endl;
			cout << "Code: " << result.Value << endl;
		}
	}
}
```Parameters

**receipt**  
The receipt for the call, which returns in the format `Twitch::ReceiptID`\.

**cursor**  
Used to retrieve the next block of data\. When initially called, an empty string is used\. Subsequent calls require you to pass the cursor value from the callback\. This allows you to continue retrieving results\.

**Return**  
No return value\.GetFriends Callback

**result \- FriendRequestValue**  
Value – The result of the `FriendRequestResult` call, which includes the following data:  
+ Total – The total number of requests\.
+ Cursor – If a value is present, use the value to retrieve the next block of data\.
+ Requests – The friends request list, which includes the following data:
  + IsRecommended – If true, the friend is recommended\.
  + IsStranger – If true, the friend is a stranger\.
  + NonStrangerReason – The reason for the request\.
  + RequestedDate – The date the request was made, which displays in the ISO 8601 format\.
  + User – The user's information, which includes the following data:
    + ID – The Twitch user ID, which returns in the format `AZStd::string`\.
    + Bio – The user's description, if provided\. This value returns in the format `AZStd::string`\.
    + CreatedDate – The date the user was created, which displays in the ISO 8601 format\.
    + DisplayName – The user's display name, which returns in the format `AZStd::string`\.
    + Logo – The URL for the user's logo, if provided\.
    + Name – The user's name, which returns in the format `AZStd::string`\.
    + ProfileBanner – The URL for the user's profile banner, if provided\.
    + ProfileBannerBackgroundColor – The URL for the user's profile banner background color, if provided\.
    + Type – The type can be staff, user, partner, moderator, or administrator\. This list is not absolute and may be updated with additional values\.
    + UpdatedDate – The date the user was last updated, which displays in the ISO 8601 format\.
Result – One of the result code values, which returns in the format `Twitch::ResultCode`\.

## CreateFriendRequest<a name="twitch-api-ebus-friends-createfriendrequest"></a>

Sends a friend request from the active user \(source\) to another user \(targetID\)\.

The following is an example of how to use CreateFriendRequest:

```
ReceiptID receipt;
AZStd::string targetID;	// This must be a valid Twitch User ID
EBUS_EVENT(Twitch::TwitchRequestBus, CreateFriendRequest, receipt, targetID);
 
/*
** Portion of the TwitchNotifications class showing the CreateFriendRequest.
*/
class TwitchNotifications : public Twitch::TwitchNotifyBus
{
	void CreateFriendRequest(const Int64Value& result) override
	{
		if(result.Result == Twitch::ResultCode::Success)
		{
			cout << "Create Friend Request" << endl;
			cout << "Code: " << result.Value << endl;
		}
	}
}
```Parameters

**receipt**  
The receipt for the call, which returns in the format `Twitch::ReceiptID`\.

**targetID**  
The Twitch ID of the user to whom you want to send a request\.

**Return**  
No return value\.CreateFriendRequest Callback

**result \- Int64Value**  
Value – The HTTP response code for this call\. If successful, the value should be 201 \(`HttpResponseCode::CREATED`\)\.  
Result – One of the result code values, which returns in the format `Twitch::ResultCode`\.

## DeclineFriendRequest<a name="twitch-api-ebus-friends-declinefriendrequest"></a>

Declines a friend request from the active user \(source\) to another user \(targetID\)\.

The following is an example of how to use `CreateFriendRequest`:

```
ReceiptID receipt;
AZStd::string targetID;	// This must be a valid Twitch User ID
EBUS_EVENT(Twitch::TwitchRequestBus, DeclineFriendRequest, receipt, targetID);
 
/*
** Portion of the TwitchNotifications class showing the DeclineFriendRequest.
*/
class TwitchNotifications : public Twitch::TwitchNotifyBus
{
	void DeclineFriendRequest(const Int64Value& result) override
	{
		if(result.Result == Twitch::ResultCode::Success)
		{
			cout << "Decline Friend Request" << endl;
			cout << "Code: " << result.Value << endl;
		}
	}
}
```Parameters

**receipt**  
The receipt for the call, which returns in the format `Twitch::ReceiptID`\.

**targetID**  
The Twitch ID of the user to whom you want to send a request\.

**Return**  
No return value\.DeclineFriendRequest Callback

**result \- Int64Value**  
Value – The HTTP response code for this call\. If successful, the value should be 201 \(`HttpResponseCode::CREATED`\)\.  
Result – One of the result code values, which returns in the format `Twitch::ResultCode`\.