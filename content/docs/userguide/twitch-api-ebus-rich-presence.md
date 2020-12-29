# Rich Presence<a name="twitch-api-ebus-rich-presence"></a>

Rich Presence APIs for Twitch

## UpdatePresenceStatus<a name="twitch-api-ebus-rich-presence-updatepresencestatus"></a>

Updates the presence status for a specified user\.

The following is an example of how to use `UpdatePresenceStatus`:

```
/*
** Issue an EBus event to update the presence for the logged in user.
*/

ReceiptID receipt;
PresenceAvailability availability = PresenceAvailability::Online;
PresenceActivityType activityType = PresenceActivityType::Watching;
AZStd::string gameContext;
 
EBUS_EVENT(Twitch::TwitchRequestBus, UpdatePresenceStatus, receipt, availability, activityType, gameContext);
 
/*
** Portion of the TwitchNotifications class showing the UpdatePresenceStatus.
*/
class TwitchNotifications : public Twitch::TwitchNotifyBus
{
	void UpdatePresenceStatus(const Int64Value& result) override
	{
		if(result.Result == Twitch::ResultCode::Success)
		{
			cout << "Decline Friend Request" << endl;
			cout << "Poll Interval: " << result.Value << endl;
		}
	}
}
```Parameters

**receipt**  
The receipt for the call, which returns in the format `Twitch::ReceiptID`\.

**availability**  
The availability status\. Valid values are Online or Idle\.

**activityType**  
The presence activity type\. Valid values are Watching, Playing, or Broadcasting\.

**gameContext**  
\(Optional\) The activity type must be `PresenceActivityType::Playing` for a JSON object\. The keys for each JSON object must be consistent per game because Twitch uses this data to provide friend recommendations\.  
For example, if two players pass the same match ID \(match\_id\) multiple times, we can assume they are intentionally playing together and recommend them as friends on Twitch\. If the string is not a valid JSON object, the call is unsuccessful with `ResultCode::InvalidParam`\.

**Return**  
No return value\.UpdatePresenceStatus Callback

**result \- Int64Value**  
Value – The HTTP response code for this call\. If successful, the value returns the polling interval in seconds\. If unsuccessful, the value returns `Aws::Http::HttpResponseCode`\.  
Result – One of the result code values, which returns in the format `Twitch::ResultCode`\.

## GetPresenceStatusofFriends<a name="twitch-api-ebus-rich-presence-getpresencestatusoffriends"></a>

Retrieves the presence status of a specified user's friends\.

The following is an example of how to use `GetPresenceStatusofFriends`:

```
/*
** Issue an EBus event to get the presence status of all of your friends.
*/

ReceiptID receipt;
EBUS_EVENT(Twitch::TwitchRequestBus, GetPresenceStatusofFriends, receipt);
 
/*
** Portion of the TwitchNotifications class showing the GetPresenceStatusofFriends.
*/
class TwitchNotifications : public Twitch::TwitchNotifyBus
{
	void GetPresenceStatusofFriends(const Int64Value& result) override
	{
		if(result.Result == Twitch::ResultCode::Success)
		{
			cout << "Presence Status of Friends" << endl;
			cosnt PresenceStatusList & info(result.Value);
			
			for(const auto & i: info)
			{
				cout << "ActivityType: " << info.ActivityType << endl;
				cout << "Availability: " << info.Availability << endl;
				cout << "       Index: " << info.Index << endl;
				cout << " UpdatedDate: " << info.UpdatedDate << endl;
				cout << "      UserID: " << info.UserID << endl;
			}
		}
	}
}
```Parameters

**receipt**  
The receipt for the call, which returns in the format `Twitch::ReceiptID`\.

**Return**  
No return value\.GetPresenceStatusofFriends Callback

**result \- PresenceStatusValue**  
Value – The presence status list, which includes the following data:  
+ ActivityType – The user's activity type\. Valid values are Watching, Playing, or Broadcasting\.
+ Availability – The availability status\. Valid values are Online or Idle\.
+ Index – The index for the presence status list\.
+ UpdatedDate – The Linux time stamp, which is the number of seconds since January 1, 1970 UTC\.
+ UserID – The Twitch user ID, which returns in the format `AZStd::string`\.
Result – One of the result code values, which returns in the format `Twitch::ResultCode`\.

## GetPresenceSettings<a name="twitch-api-ebus-rich-presence-getpresencesettings"></a>

Retrieves the presence settings for the active user\.

The following is an example of how to use `GetPresenceSettings`:

```
/*
** Issue an EBus event to get your presence settings.
*/

ReceiptID receipt;
EBUS_EVENT(Twitch::TwitchRequestBus, GetPresenceSettings, receipt);
 
/*
** Portion of the TwitchNotifications class showing GetPresenceSettings.
*/
class TwitchNotifications : public Twitch::TwitchNotifyBus
{
	void GetPresenceSettings(const PresenceSettingsValue& result) override
	{
		if(result.Result == Twitch::ResultCode::Success)
		{
			cout << "Presence Settings" << endl;
			cosnt PresenceSettings & info(result.Value);
			
			cout << "     Invisible: " << info.IsInvisible ? "Yes" : "No" << endl;
			cout << "Share Activity: " << info.ShareActivity ? "Shared" : "Not shared" << endl;
		}
	}
}
```Parameters

**receipt**  
The receipt for the call, which returns in the format `Twitch::ReceiptID`\.

**Return**  
No return value\.PresenceSettingsValue Callback

**result \- PresenceStatusValue**  
Value – The presence settings, which includes the following data:  
+ IsInvisible – If true, the user is invisible to everyone\. If false, the user's presence is visible\.
+ ShareActivity – If true, the user's activity is shareable\. If false, the user's activity cannot be shared\.
Result – One of the result code values, which returns in the format `Twitch::ResultCode`\.

## UpdatePresenceSettings<a name="twitch-api-ebus-type-name"></a>

Retrieves the presence settings for the active user\.

The following is an example of how to use `UpdatePresenceSettings`:

```
/*
** Issue an EBus event to set the presence settings, in this example they are set to be invisible and do not share activity.
*/

ReceiptID receipt;
bool invisibleStatus = true;
bool shareActivity = false;
EBUS_EVENT(Twitch::TwitchRequestBus, UpdatePresenceSettings, receipt, invisibleStatus, shareActivity);
 
/*
** Portion of the TwitchNotifications class showing UpdatePresenceSettings.
*/
class TwitchNotifications : public Twitch::TwitchNotifyBus
{
	void UpdatePresenceSettings(const PresenceSettingsValue& result) override
	{
		if(result.Result == Twitch::ResultCode::Success)
		{
			cout << "Updated Presence Settings" << endl;
			cosnt PresenceSettings & info(result.Value);
			
			cout << "     Invisible: " << info.IsInvisible ? "Yes" : "No" << endl;
			cout << "Share Activity: " << info.ShareActivity ? "Shared" : "Not shared" << endl;
		}
	}
}
```Parameters

**receipt**  
The receipt for the call, which returns in the format `Twitch::ReceiptID`\.

**Return**  
No return value\.UpdatePresenceSettings Callback

**result \- PresenceStatusValue**  
Value – The presence settings, which includes the following data:  
+ IsInvisible – If true, the user is invisible to everyone\. If false, the user's presence is visible\.
+ ShareActivity – If true, the user's activity is shareable\. If false, the user's activity cannot be shared\.
Result – One of the result code values, which returns in the format `Twitch::ResultCode`\.