# Channels<a name="twitch-api-ebus-channels"></a>

Channels APIs for Twitch

## GetChannel<a name="twitch-api-ebus-channels-getchannel"></a>

Retrieves a channel object based on the OAuth token for the active Twitch user\.

The following is an example of how to use `GetChannel`:

```
ReceiptID receipt;
EBUS_EVENT(Twitch::TwitchRequestBus, GetChannel, receipt);
 
/*
** Portion of the TwitchNotifications class showing GetChannel.
*/
class TwitchNotifications : public Twitch::TwitchNotifyBus
{
	void GetChannel(const ChannelInfoValue& result) override
	{
		if(result.Result == Twitch::ResultCode::Success)
		{
			const ChannelInfo & info(result.Value);
			cout << "Get Channel info" << endl;
 
			cout << "                NumFollowers: " << AZstd::to_string(info.NumFollowers) << endl;
	        cout << "                    NumViews: " << AZstd::to_string(info.NumViews) << endl;
    	    cout << "            NumItemsRecieved: " << AZstd::to_string(info.NumItemsRecieved) << endl;
	        cout << "                     Partner: " << info.Partner ? "Yes : "No" << endl;
    	    cout << "                      Mature: " << info.Mature ? "Yes" : "No" << endl;
        	cout << "                          Id: " << info.Id << endl;
	        cout << "         BroadcasterLanguage: " << info.BroadcasterLanguage << endl;
    	    cout << "                 DisplayName: " << info.DisplayName << endl;
        	cout << "                       eMail: " << info.eMail << endl;
	        cout << "                    GameName: " << info.GameName << endl;
    	    cout << "                    Lanugage: " << info.Lanugage << endl;
        	cout << "                        Logo: " << info.Logo << endl;
	        cout << "                        Name: " << info.Name << endl;
    	    cout << "               ProfileBanner: " << info.ProfileBanner << endl;
        	cout << "ProfileBannerBackgroundColor: " << info.ProfileBannerBackgroundColor << endl;
	        cout << "                      Status: " << info.Status << endl;
    	    cout << "                   StreamKey: " << info.StreamKey << endl;
        	cout << "                 UpdatedDate: " << info.UpdatedDate << endl;
	        cout << "                 CreatedDate: " << info.CreatedDate << endl;
    	    cout << "                         URL: " << info.URL << endl;
        	cout << "                 VideoBanner: " << info.VideoBanner << endl;
		}
	}
}
```Parameters

**receipt**  
The receipt for the call, which returns in the format `Twitch::ReceiptID`\.

**Return**  
No return value\.GetChannel Callback

**result \- ChannelInfoValue**  
Value – The channel information, which includes the following data:  
+ NumFollowers – The number of followers for the channel\.
+ NumItemsReceived – The number of fields received in this struct\.
+ Partner – If true, the channel is a partner channel\.
+ Mature – If true, the channel contains mature content\.
+ Id – The Twitch channel ID\.
+ BroadcasterLanguage – The two letter code for the broadcaster's language\.
+ DisplayName – The channel's display name\.
+ eMail – The broadcaster's email address\.
+ GameName – Designation of the game that the channel is assigned to\.
+ Language – The two letter code for the channel's language\.
+ Logo – The URL for the logo, if provided\.
+ Name – The channel's name\.
+ ProfileBanner – The URL for the profile banner, if provided\.
+ ProfileBannerBackgroundColor – The URL for the profile banner background color, if provided\.
+ Status – The channel's status message\.
+ StreamKey – The key for the channel's stream\.
+ UpdatedDate – The date the channel was last updated, which displays in the ISO 8601 format\.
+ CreatedDate – The date the channel was created, which displays in the ISO 8601 format\.
+ URL – The URL to access the channel\.
+ VideoBanner – The URL for the channel's banner video, if provided\.
+ NumViews – The total number of views for the channel\.
Result – One of the result code values, which returns in the format `Twitch::ResultCode`\.

## GetChannelID<a name="twitch-api-ebus-channels-getchannelid"></a>

Retrieves the specified channel object\.

The following is an example of how to use `GetChannelID`:

```
ReceiptID receipt;
AZStd::string channelID;	// Must be a valid channel id
EBUS_EVENT(Twitch::TwitchRequestBus, GetChannelbyID, receipt, channelID);
 
/*
** Portion of the TwitchNotifications class showing GetChannelbyID.
*/
class TwitchNotifications : public Twitch::TwitchNotifyBus
{
	void GetChannelbyID(const ChannelInfoValue& result) override
	{
		if(result.Result == Twitch::ResultCode::Success)
		{
			const ChannelInfo & info(result.Value);
			cout << "Get Channel id info" << endl;
 
			cout << "                NumFollowers: " << AZstd::to_string(info.NumFollowers) << endl;
	        cout << "                    NumViews: " << AZstd::to_string(info.NumViews) << endl;
    	    cout << "            NumItemsRecieved: " << AZstd::to_string(info.NumItemsRecieved) << endl;
	        cout << "                     Partner: " << info.Partner ? "Yes : "No" << endl;
    	    cout << "                      Mature: " << info.Mature ? "Yes" : "No" << endl;
        	cout << "                          Id: " << info.Id << endl;
	        cout << "         BroadcasterLanguage: " << info.BroadcasterLanguage << endl;
    	    cout << "                 DisplayName: " << info.DisplayName << endl;
	        cout << "                    GameName: " << info.GameName << endl;
    	    cout << "                    Lanugage: " << info.Lanugage << endl;
        	cout << "                        Logo: " << info.Logo << endl;
	        cout << "                        Name: " << info.Name << endl;
    	    cout << "               ProfileBanner: " << info.ProfileBanner << endl;
        	cout << "ProfileBannerBackgroundColor: " << info.ProfileBannerBackgroundColor << endl;
	        cout << "                      Status: " << info.Status << endl;
        	cout << "                 UpdatedDate: " << info.UpdatedDate << endl;
	        cout << "                 CreatedDate: " << info.CreatedDate << endl;
    	    cout << "                         URL: " << info.URL << endl;
        	cout << "                 VideoBanner: " << info.VideoBanner << endl;
		}
	}
}
```Parameters

**receipt**  
The receipt for the call, which returns in the format `Twitch::ReceiptID`\.

**channelID**  
The Twitch channel ID\.

**Return**  
No return value\.GetChannelbyID Callback

**result \- ChannelInfoValue**  
Value – The channel information, which includes the following data:  
+ NumFollowers – The number of followers for the channel\.
+ NumItemsReceived – The number of fields received in this struct\.
+ Partner – If true, the channel is a partner channel\.
+ Mature – If true, the channel contains mature content\.
+ Id – The Twitch channel ID\.
+ BroadcasterLanguage – The two letter code for the broadcaster's language\.
+ DisplayName – The channel's display name\.
+ GameName – Designation of the game that the channel is assigned to\.
+ Language – The two letter code for the channel's language\.
+ Logo – The URL for the logo, if provided\.
+ Name – The channel's name\.
+ ProfileBanner – The URL for the profile banner, if provided\.
+ ProfileBannerBackgroundColor – The URL for the profile banner background color, if provided\.
+ Status – The channel's status message\.
+ UpdatedDate – The date the channel was last updated, which displays in the ISO 8601 format\.
+ CreatedDate – The date the channel was created, which displays in the ISO 8601 format\.
+ URL – The URL to access the channel\.
+ VideoBanner – The URL for the channel's banner video, if provided\.
+ NumViews – The total number of views for the channel\.
Result – One of the result code values, which returns in the format `Twitch::ResultCode`\.

## UpdateChannel<a name="twitch-api-ebus-channels-updatechannel"></a>

Updates the specified properties for the games channel\.

The following is an example of how to use `UpdateChannel`:

```
ReceiptID receipt;
ChannelUpdateInfo updateInfo;	// at least one type of update must be done
updateInfo.ChannelFeedEnabled.SetValue(true);	// enable feed
updateInfo.Delay.SetValue(15);					// set delay to 15 seconds
updateInfo.Status.SetValue("Starting game soon!");// Tell everyone the game is about to start
EBUS_EVENT(Twitch::TwitchRequestBus, UpdateChannel, receipt, updateInfo);
 
/*
** Portion of the TwitchNotifications class showing UpdateChannel.
*/
class TwitchNotifications : public Twitch::TwitchNotifyBus
{
	void UpdateChannel(const ChannelInfoValue& result) override
	{
		if(result.Result == Twitch::ResultCode::Success)
		{
			const ChannelInfo & info(result.Value);
			cout << "Update Channel info" << endl;
 
			cout << "                NumFollowers: " << AZstd::to_string(info.NumFollowers) << endl;
	        cout << "                    NumViews: " << AZstd::to_string(info.NumViews) << endl;
    	    cout << "            NumItemsRecieved: " << AZstd::to_string(info.NumItemsRecieved) << endl;
	        cout << "                     Partner: " << info.Partner ? "Yes : "No" << endl;
    	    cout << "                      Mature: " << info.Mature ? "Yes" : "No" << endl;
        	cout << "                          Id: " << info.Id << endl;
	        cout << "         BroadcasterLanguage: " << info.BroadcasterLanguage << endl;
    	    cout << "                 DisplayName: " << info.DisplayName << endl;
	        cout << "                    GameName: " << info.GameName << endl;
    	    cout << "                    Lanugage: " << info.Lanugage << endl;
        	cout << "                        Logo: " << info.Logo << endl;
	        cout << "                        Name: " << info.Name << endl;
    	    cout << "               ProfileBanner: " << info.ProfileBanner << endl;
        	cout << "ProfileBannerBackgroundColor: " << info.ProfileBannerBackgroundColor << endl;
	        cout << "                      Status: " << info.Status << endl;
        	cout << "                 UpdatedDate: " << info.UpdatedDate << endl;
	        cout << "                 CreatedDate: " << info.CreatedDate << endl;
    	    cout << "                         URL: " << info.URL << endl;
        	cout << "                 VideoBanner: " << info.VideoBanner << endl;
		}
	}
}
```Parameters

**receipt**  
The receipt for the call, which returns in the format `Twitch::ReceiptID`\.

**updateInfo**  
The elements to update\. You must update at least one item for the call to succeed\. If unsuccessful, the call returns `ResultCode::TwitchChannelNoUpdatesToMake`\.

**Return**  
No return value\.UpdateChannel Callback

**result \- ChannelInfoValue**  
Value – The channel information, which includes the following data:  
+ NumFollowers – The number of followers for the channel\.
+ NumItemsReceived – The number of fields received in this struct\.
+ Partner – If true, the channel is a partner channel\.
+ Mature – If true, the channel contains mature content\.
+ Id – The Twitch channel ID\.
+ BroadcasterLanguage – The two letter code for the broadcaster's language\.
+ DisplayName – The channel's display name\.
+ GameName – Designation of the game that the channel is assigned to\.
+ Language – The two letter code for the channel's language\.
+ Logo – The URL for the logo, if provided\.
+ Name – The channel's name\.
+ ProfileBanner – The URL for the profile banner, if provided\.
+ ProfileBannerBackgroundColor – The URL for the profile banner background color, if provided\.
+ Status – The channel's status message\.
+ UpdatedDate – The date the channel was last updated, which displays in the ISO 8601 format\.
+ CreatedDate – The date the channel was created, which displays in the ISO 8601 format\.
+ URL – The URL to access the channel\.
+ VideoBanner – The URL for the channel's banner video, if provided\.
+ NumViews – The total number of views for the channel\.
Result – One of the result code values, which returns in the format `Twitch::ResultCode`\.

## GetChannelEditors<a name="twitch-api-ebus-channels-getchanneleditors"></a>

Retrieves a list of users who are editors for the specified channel\.

The following is an example of how to use `GetChannelEditors`:

```
ReceiptID receipt;
AZStd::string channelID;		// must be a valid channel id
EBUS_EVENT(Twitch::TwitchRequestBus, GetChannelEditors, receipt, channelID);
 
/*
** Portion of the TwitchNotifications class showing GetChannelEditors.
*/
class TwitchNotifications : public Twitch::TwitchNotifyBus
{
	void GetChannelEditors(const UserInfoListValue& result) override
	{
		cout << "Get Channel Editors" << endl;
		if(result.Result == Twitch::ResultCode::Success)
		{
            for(const auto & i: result.Value)
			{
                cout << " UserInfo-         ID: " << i.User.ID << endl;
                cout << " UserInfo-       Name: " << i.User.Name << endl;
                cout << " UserInfo-        Bio: " << i.User.Bio << endl;
                cout << " UserInfo-CreatedDate: " << i.User.CreatedDate << endl;
                cout << " UserInfo-DisplayName: " << i.User.DisplayName << endl;
                cout << " UserInfo-UpdatedDate: " << i.User.UpdatedDate << endl;
                cout << " UserInfo-       Logo: " << i.User.Logo << endl;
                cout << " UserInfo-       Type: " << i.User.Type << endl;
            }
		}
	}
}
```Parameters

**receipt**  
The receipt for the call, which returns in the format `Twitch::ReceiptID`\.

**channelID**  
The Twitch channel ID\.

**Return**  
No return value\.GetChannelEditors Callback

**result \- UserInfoListValue**  
Value – The user information list, which includes the following data:  
+ ID – The Twitch user ID, which returns in the format `AZStd::string`\.
+ Bio – The user's description, if provided\. This value returns in the format `AZStd::string`\.
+ CreatedDate – The date the user was created, which displays in the ISO 8601 format\.
+ DisplayName – The user's display name, which returns in the format `AZStd::string`\.
+ Logo – The URL for the user's logo, if provided\.
+ Name – The user's name, which returns in the format `AZStd::string`\.
+ Type – The type can be staff, user, partner, moderator, or administrator\. This list is not absolute and may be updated with additional values\.
+ UpdatedDate – The date the user was last updated, which displays in the ISO 8601 format\.
Result – One of the result code values, which returns in the format `Twitch::ResultCode`\.

## GetChannelFollowers<a name="twitch-api-ebus-channels-getchannelfollowers"></a>

Retrieves a list of users who follow the specified channel and returns a maximum of 100 followers\. The list is sorted by the date that users started following the channel, with newest followers first\. You can use the `offset` and `cursor` parameters to retrieve the next block of followers\.

The following is an example of how to use `GetChannelFollowers`:

```
ReceiptID receipt;
AZStd::string channelID;		// must be a valid channel id
AZStd::string cursor;			// must be empty on initial call, on subsequent calls use value
								// from the Cursor member from FollowerResult in the call back.
AZ::u64 offset = 0;				// must be 0 on initial call, on subsequent calls use value from
								// the Total member from FollowerResult in the call back.
EBUS_EVENT(Twitch::TwitchRequestBus, GetChannelFollowers, receipt, channelID, cursor, offset);

/*
** Portion of the TwitchNotifications class showing GetChannelFollowers.
*/
class TwitchNotifications : public Twitch::TwitchNotifyBus
{
	void GetChannelFollowers(const FollowerResultValue& result) override
	{
		cout << "Get Channel Followers" << endl;
		if(result.Result == Twitch::ResultCode::Success)
		{
			const FollowerResult & info(result.Value);
			cout << "   Total: " << AZStd::to_string(info.Total) << endl;
			cout << "  Cursor: " << info.Cursor << endl;
 
            for(const auto & i: info.Followers)
			{
				cout << "        Notifications: " << i.Notifications ? "Yes" : "No" << endl;
				cout << "         Created Date: " << i.CreatedDate << endl;
                cout << " UserInfo-         ID: " << i.User.ID << endl;
                cout << " UserInfo-       Name: " << i.User.Name << endl;
                cout << " UserInfo-        Bio: " << i.User.Bio << endl;
                cout << " UserInfo-CreatedDate: " << i.User.CreatedDate << endl;
                cout << " UserInfo-DisplayName: " << i.User.DisplayName << endl;
                cout << " UserInfo-UpdatedDate: " << i.User.UpdatedDate << endl;
                cout << " UserInfo-       Logo: " << i.User.Logo << endl;
                cout << " UserInfo-       Type: " << i.User.Type << endl;
            }
		}
	}
}
```Parameters

**receipt**  
The receipt for the call, which returns in the format `Twitch::ReceiptID`\.

**channelID**  
The Twitch channel ID\.

**offset**  
The object offset to use when paginating results\. When initially called, the value must be 0\. Subsequent calls require you to pass the `total` member value from the `FollowerResult` struct in the callback\. If the `cursor` parameter is an empty string, this value is ignored\.

**cursor**  
Used to retrieve the next block of data\. When initially called, an empty string is used\. Subsequent calls require you to pass the `cursor` value from the `FollowerResult` struct in the callback\.

**Return**  
No return value\.GetChannelFollowers Callback

**result \- FollowerResultValue**  
Value – The result of the FollowerResult call, which includes the following data:  
+ Total – The total number of results returned\. You can request more results by passing this value as the offset in the next call\.
+ Cursor – If empty, there are no more results\. Otherwise, you can request the next block of followers by passing this value with the offset\.
+ Followers – The list of followers, which includes the following data:
  + Notifications – If true, the follower will receive notifications for the channel\.
  + CreatedDate – The date the user started following the channel, which displays in the ISO 8601 format\.
  + User – The user's information, which includes the following data:
    + ID – The Twitch user ID\.
    + Bio – The user's description, if provided\.
    + CreatedDate – The date the user was created, which displays in the ISO 8601 format\.
    + DisplayName – The user's display name\.
    + Logo – The URL for the user's logo, if provided\.
    + Name – The user's name\.
    + Type – The type can be staff, user, partner, moderator, or administrator\. This list is not absolute and may be updated with additional values\.
    + UpdatedDate – The date the user was last updated, which displays in the ISO 8601 format\.
Result – One of the result code values, which returns in the format `Twitch::ResultCode`\.

## GetChannelTeams<a name="twitch-api-ebus-channels-getchannelteams"></a>

Retrieves a list of teams that belong to the specified channel\.

The following is an example of how to use `GetChannelTeams`:

```
ReceiptID receipt;
AZStd::string channelID;		// must be a valid channel id
EBUS_EVENT(Twitch::TwitchRequestBus, GetChannelTeams, receipt, channelID);

/*
** Portion of the TwitchNotifications class showing GetChannelFollowers.
*/
class TwitchNotifications : public Twitch::TwitchNotifyBus
{
	void GetChannelTeams(const ChannelTeamValue& result) override
	{
		cout << "Get Channel Teams" << endl;
		if(result.Result == Twitch::ResultCode::Success)
		{
			const TeamInfoList& teamList(result.Value);
			 
            for(const auto & i: teamList)
			{
                cout << "    Team ID: " << i.ID << endl;
                cout << " Background: " << i.Background << endl;
                cout << "     Banner: " << i.Banner << endl;
                cout << "CreatedDate: " << i.CreatedDate << endl;
                cout << "DisplayName: " << i.DisplayName << endl;
                cout << "       Info: " << i.Info << endl;
                cout << "       Logo: " << i.Logo << endl;
                cout << "       Name: " << i.Name << endl;
                cout << "UpdatedDate: " << i.UpdatedDate << endl;
            }
		}
	}
}
```Parameters

**receipt**  
The receipt for the call, which returns in the format `Twitch::ReceiptID`\.

**channelID**  
The Twitch channel ID\.

**Return**  
No return value\.GetChannelFollowers Callback

**result \- ChannelTeamValue**  
Value – The team information list, which includes the following data:  
+ ID – The Twitch team ID\.
+ Background – The URL for the team's background\.
+ Banner – The URL for the team's banner\.
+ CreatedDate – The date the team was created, which displays in the ISO 8601 format\.
+ DisplayName – The full team name\.
+ Info – A generic message that you can customize for your viewers\. For example, "Thanks for visiting my channel\!"
+ Logo – The URL for the logo, if provided\.
+ Name – The team name\.
+ UpdatedDate – The date the team was last updated, which displays in the ISO 8601 format\.
Result – One of the result code values, which returns in the format `Twitch::ResultCode`\.

## GetChannelSubscribers<a name="twitch-api-ebus-channels-getchannelsubscribers"></a>

Retrieves a list of users who subscribe to the specified channel\. The list is sorted by the date that users subscribe to the channel\.

The following is an example of how to use `GetChannelSubscribers`:

```
ReceiptID receipt;
AZStd::string channelID;		// must be a valid channel id
AZ::u64 offset = 0;				// must be 0 on the initial call, on subsequent calls use value from
								// the Total member from Subscription struct in the call back.
EBUS_EVENT(Twitch::TwitchRequestBus, GetChannelSubscribers, receipt, channelID, offset);

/*
** Portion of the TwitchNotifications class showing GetChannelSubscribers.
*/
class TwitchNotifications : public Twitch::TwitchNotifyBus
{
	void GetChannelSubscribers(const SubscriberValue& result) override
	{
		cout << "Get Channel Followers" << endl;
		if(result.Result == Twitch::ResultCode::Success)
		{
			const Subscription & info(result.Value);
			cout << "   Total: " << AZStd::to_string(info.Total) << endl;
 
            for(const auto & i: info.Followers)
			{
				cout << "                   ID: " << i.ID << endl;
				cout << "         Created Date: " << i.CreatedDate << endl;
                cout << " UserInfo-         ID: " << i.User.ID << endl;
                cout << " UserInfo-       Name: " << i.User.Name << endl;
                cout << " UserInfo-        Bio: " << i.User.Bio << endl;
                cout << " UserInfo-CreatedDate: " << i.User.CreatedDate << endl;
                cout << " UserInfo-DisplayName: " << i.User.DisplayName << endl;
                cout << " UserInfo-UpdatedDate: " << i.User.UpdatedDate << endl;
                cout << " UserInfo-       Logo: " << i.User.Logo << endl;
                cout << " UserInfo-       Type: " << i.User.Type << endl;
            }
		}
	}
}
```Parameters

**receipt**  
The receipt for the call, which returns in the format `Twitch::ReceiptID`\.

**channelID**  
The Twitch channel ID\.

**offset**  
The object offset to use when paginating results\. When initially called, the value must be 0\. Subsequent calls require you to pass the `total` member value from the `Subscription` struct in the callback\.

**Return**  
No return value\.GetChannelSubscribers Callback

**result \- SubscriberValue**  
Value – The result of the `Subscription` call, which includes the following data:  
+ Total – The total number of results returned\. You can request more results by passing this value as the offset in the next call\.
+ Subscribers – The list of subscribers, which includes the following data:
  + ID – The Twitch subscriber ID\.
  + CreatedDate – The date the user subscribed to the channel, which displays in the ISO 8601 format\.
  + User – The user's information, which includes the following data:
    + ID – The Twitch user ID\.
    + Bio – The user's description, if provided\.
    + CreatedDate – The date the user was created, which displays in the ISO 8601 format\.
    + DisplayName – The user's display name\.
    + Logo – The URL for the user's logo, if provided\.
    + Name – The user's name\.
    + Type – The type can be staff, user, partner, moderator, or administrator\. This list is not absolute and may be updated with additional values\.
    + UpdatedDate – The date the user was last updated, which displays in the ISO 8601 format\.
Result – One of the result code values, which returns in the format `Twitch::ResultCode`\.

## CheckChannelSubscriptionbyUser<a name="twitch-api-ebus-channels-checkchannelsubscriptionbyuser"></a>

Verifies if the specified user is subscribed to the specified channel\. If the user is subscribed, a subscription object is returned\. This call is for channel owners\.

The following is an example of how to use `GetChannelSubscribers`:

```
ReceiptID receipt;
AZStd::string channelID;		// must be a valid channel id
AZStd::string userID;			// must be a valid twitch user id
EBUS_EVENT(Twitch::TwitchRequestBus, CheckChannelSubscriptionbyUser, receipt, channelID, userID);

/*
** Portion of the TwitchNotifications class showing CheckChannelSubscriptionbyUser.
*/
class TwitchNotifications : public Twitch::TwitchNotifyBus
{
	void CheckChannelSubscriptionbyUser(const SubscriberbyUserValue& result) override
	{
		cout << "Check Channel Subscription by User" << endl;
		if(result.Result == Twitch::ResultCode::Success)
		{
			const SubscriberInfo & info(result.Value);
            cout << "                   ID: " << i.ID << endl;
            cout << "         Created Date: " << i.CreatedDate << endl;
            cout << " UserInfo-         ID: " << i.User.ID << endl;
            cout << " UserInfo-       Name: " << i.User.Name << endl;
            cout << " UserInfo-        Bio: " << i.User.Bio << endl;
            cout << " UserInfo-CreatedDate: " << i.User.CreatedDate << endl;
            cout << " UserInfo-DisplayName: " << i.User.DisplayName << endl;
            cout << " UserInfo-UpdatedDate: " << i.User.UpdatedDate << endl;
            cout << " UserInfo-       Logo: " << i.User.Logo << endl;
            cout << " UserInfo-       Type: " << i.User.Type << endl;
		}
	}
}
```Parameters

**receipt**  
The receipt for the call, which returns in the format `Twitch::ReceiptID`\.

**channelID**  
The Twitch channel ID\.

**userID**  
The Twitch user ID for whom to verify the subscription status\.

**Return**  
No return value\.CheckChannelSubscriptionbyUser Callback

**result \- SubscriberValue**  
Value – The subscriber's information, which includes the following data:  
+ ID – The Twitch subscriber ID\.
+ CreatedDate – The date the user subscribed to the channel, which displays in the ISO 8601 format\.
+ User – The user's information, which includes the following data:
  + ID – The Twitch user ID\.
  + Bio – The user's description, if provided\.
  + CreatedDate – The date the user was created, which displays in the ISO 8601 format\.
  + DisplayName – The user's display name\.
  + Logo – The URL for the user's logo, if provided\.
  + Name – The user's name\.
  + Type – The type can be staff, user, partner, moderator, or administrator\. This list is not absolute and may be updated with additional values\.
  + UpdatedDate – The date the user was last updated, which displays in the ISO 8601 format\.
Result – One of the result code values, which returns in the format `Twitch::ResultCode`\.

## GetChannelVideos<a name="twitch-api-ebus-channels-getchannelvideos"></a>

Retrieves a list of videos from the specified channel\.

The following is an example of how to use `GetChannelVideos`:

```
ReceiptID receipt;
AZStd::string channelID;		// must be a valid channel id
BroadCastType boradcastType	= BroadCastType::Default;
AZStd::string language = "en";
AZ::u64 offset = 0;				// must be 0 on the initial call, on subsequent calls use value from
								// the Total member from Subscription struct in the call back.
EBUS_EVENT(Twitch::TwitchRequestBus, GetChannelSubscribers, receipt, channelID, offset);

/*
** Portion of the TwitchNotifications class showing GetChannelSubscribers.
*/
class TwitchNotifications : public Twitch::TwitchNotifyBus
{
	void GetChannelSubscribers(const VideoReturnValue& result) override
	{
		cout << "Get Channel Videos" << endl;
		if(result.Result == Twitch::ResultCode::Success)
		{
			const VideoReturn& info(result.Value);
			cout << "   Total: " << AZStd::to_string(info.Total) << endl;
 
            for(const auto & i: info.Videos)
			{
				cout << "                   ID: " << i.ID << endl;
				cout << "         Created Date: " << i.CreatedDate << endl;
				.
				.
				.
           }
		}
	}
}
```Parameters

**receipt**  
The receipt for the call, which returns in the format `Twitch::ReceiptID`\.

**channelID**  
The Twitch channel ID\.

**broadcastType**  
Valid values for the broadcast type are: Default, Archive, Highlight, Upload, ArchiveAndHighlight, ArchiveAndUpload, ArchiveAndHighlightAndUpload, or HightlightAndUpload\.

**offset**  
The object offset to use when paginating results\. When initially called, the value must be 0\. Subsequent calls require you to pass the `total` member value from the `Subscription` struct in the callback\.

**Return**  
No return value\.GetChannelSubscribers Callback

**result \- VideoReturnValue**  
Value – The result of the `VideoReturn` call, which includes the following data:  
+ Total – The total number of results returned\. You can request more results by passing this value as the offset in the next call\.
+ Videos – The video information list, which includes the following data:
  + Length – The video duration, in seconds\.
  + Views – The total number of views for the video\.
  + BroadcastID – The identifier for the broadcast\.
  + Type – Valid values for the broadcast type are: Archive, Highlight, Upload, ArchiveAndHighlight, ArchiveAndUpload, ArchiveAndHighlightAndUpload, or HighlightAndUpload\.
  + CreatedDate – The date the user subscribed to the channel, which displays in the ISO 8601 format\.
  + Description – A plain text description of the video\.
  + Description – An HTML description of the video\.
  + ID – The identifier for the video\.
  + Game – The game name for which this video is associated\.
  + Language – The two letter code for the video language\.
  + PublishedDate – The date the video was published, which displays in the ISO 8601 format\.
  + Status – The video's status\.
  + TagList – A string that contains the tags for the video\.
  + Title – The title of the video\.
  + URL – The URL to access the video\.
  + Viewable – Valid values for the accessibility of the video are: Public or Private\.
  + ViewableAt – The date when the video can be viewed, if provided\. The date is formatted using ISO 8601 standard\.
  + Channel – The video channel information, which includes the following data:
    + ID – The video channel ID\.
    + DisplayName – The full display name for the video channel\.
    + Name – The simple name for the video channel\.
  + FPS – The frame rate, measured in frames\-per\-second \(FPS\):
    + Chunked
    + High
    + Low
    + Medium
    + Mobile
  + Preview – The image information, including size and the URL for the preview image:
    + Large
    + Medium
    + Small
    + Template
  + Thumbnails – The image thumbnail information, including size, how the thumbnail was created \(Type\), and the URL for the thumbnail \(Url\): 
    + Large
    + Medium
    + Small
    + Template
  + Resolutions – The video resolution information, which includes the following data: 
    + Chunked – For example, 1920 x 1080\.
    + High – For example, 1280 x 720\.
    + Medium – For example, 852 x 480\.
    + Low – For example, 640 x 360\.
    + Mobile – For example, 400 x 226\.
Result – One of the result code values, which returns in the format `Twitch::ResultCode`\.

## StartChannelCommercial<a name="twitch-api-ebus-channels-startchannelcommercial"></a>

Plays a commercial \(advertisement\) on the specified channel \(Twitch partners only\)\. You can play a commercial once every eight minutes\. You will receive an error response \(422 Unprocessable Entity\) if any of the following occur:
+ You specify an invalid length\.
+ You attempt to play a commercial less than eight minutes after the previous commercial\.
+ You specify a channel that is not a Twitch partner\.

The following is an example of how to use `StartChannelCommercial`:

```
ReceiptID receipt;
AZStd::string channelID;		// must be a valid channel id
CommercialLength length = CommercialLength::T30Seconds;
EBUS_EVENT(Twitch::TwitchRequestBus, StartChannelCommercial, receipt, channelID, length);

/*
** Portion of the TwitchNotifications class showing StartChannelCommercial.
*/
class TwitchNotifications : public Twitch::TwitchNotifyBus
{
	void StartChannelCommercial(const StartChannelCommercialValue& result) override
	{
		cout << "Start Channel Commercial" << endl;
		if(result.Result == Twitch::ResultCode::Success)
		{
			const StartChannelCommercialResult& info(result.Value);
            cout << "   Duration (s): " << AZStd::to_string(info.Duration) << endl;
            cout << "Retry after (s): " << AZStd::to_string(info.RetryAfter) << endl;
            cout << "        Message: " << info.Message << endl;
		}
		else
		{
			cout << "Failure: " << AZStd::to_string(result.Result) << endl;
            cout << "Message: " << info.Message << endl;
		}
	}
}
```Parameters

**receipt**  
The receipt for the call, which returns in the format `Twitch::ReceiptID`\.

**channelID**  
The Twitch channel ID\.

**length**  
Valid values for the commercial length are: T30Seconds, T60Seconds, T90Seconds, T120Seconds, T150Seconds, or T180Seconds\.

**Return**  
No return value\.StartChannelCommercial Callback

**result \- StartChannelCommercialValue**  
Value – The result of the `StartChannelCommercialResult` call, which includes the following data:  
+ Duration – The commercial duration, in seconds\.
+ RetryAfter – The wait time, in seconds, before calling the API again\.
+ Message – Optional message or error description\.
Result – One of the result code values, which returns in the format `Twitch::ResultCode`\.

## ResetChannelStreamKey<a name="twitch-api-ebus-channels-resetchannelstreamkey"></a>

Deletes the stream key \(also known as authorization key\) for the specified channel\. Once deleted, the stream key automatically resets\. Stream keys uniquely identify streams and are assigned by Twitch\. Each broadcast uses an RTMP URL that includes the stream key\.

The following is an example of how to use `ResetChannelStreamKey`:

```
ReceiptID receipt;
AZStd::string channelID;			// this must be a valid channel id.
EBUS_EVENT(Twitch::TwitchRequestBus, ResetChannelStreamKey, receipt, channelID);
 
/*
** Portion of the TwitchNotifications class showing ResetChannelStreamKey
*/
class TwitchNotifications : public Twitch::TwitchNotifyBus
{
	void ResetChannelStreamKey(const ChannelInfoValue& result) override
	{
		if(result.Result == Twitch::ResultCode::Success)
		{
			const ChannelInfo & info(result.Value);
			cout << "Reset Channel Stream Key" << endl;
 
			cout << "                NumFollowers: " << AZstd::to_string(info.NumFollowers) << endl;
	        cout << "                    NumViews: " << AZstd::to_string(info.NumViews) << endl;
    	    cout << "            NumItemsRecieved: " << AZstd::to_string(info.NumItemsRecieved) << endl;
	        cout << "                     Partner: " << info.Partner ? "Yes : "No" << endl;
    	    cout << "                      Mature: " << info.Mature ? "Yes" : "No" << endl;
        	cout << "                          Id: " << info.Id << endl;
	        cout << "         BroadcasterLanguage: " << info.BroadcasterLanguage << endl;
    	    cout << "                 DisplayName: " << info.DisplayName << endl;
        	cout << "                       eMail: " << info.eMail << endl;
	        cout << "                    GameName: " << info.GameName << endl;
    	    cout << "                    Lanugage: " << info.Lanugage << endl;
        	cout << "                        Logo: " << info.Logo << endl;
	        cout << "                        Name: " << info.Name << endl;
    	    cout << "               ProfileBanner: " << info.ProfileBanner << endl;
        	cout << "ProfileBannerBackgroundColor: " << info.ProfileBannerBackgroundColor << endl;
	        cout << "                      Status: " << info.Status << endl;
    	    cout << "                   StreamKey: " << info.StreamKey << endl;
        	cout << "                 UpdatedDate: " << info.UpdatedDate << endl;
	        cout << "                 CreatedDate: " << info.CreatedDate << endl;
    	    cout << "                         URL: " << info.URL << endl;
        	cout << "                 VideoBanner: " << info.VideoBanner << endl;
		}
	}
}
```Parameters

**receipt**  
The receipt for the call, which returns in the format `Twitch::ReceiptID`\.

**channelID**  
The Twitch channel ID\.

**Return**  
No return value\.ResetChannelStreamKey Callback

**result \- ChannelInfoValue**  
Value – The channel information, which includes the following data:  
+ NumFollowers – The number of followers for the channel\.
+ NumItemsReceived – The number of fields received in this struct\.
+ Partner – If true, the channel is a partner channel\.
+ Mature – If true, the channel contains mature content\.
+ Id – The Twitch channel ID\.
+ BroadcasterLanguage – The two letter code for the broadcaster's language\.
+ DisplayName – The channel's display name\.
+ eMail – The broadcaster's email address\.
+ GameName – Designation of the game that the channel is assigned to\.
+ Language – The two letter code for the channel's language\.
+ Logo – The URL for the logo, if provided\.
+ Name – The channel's name\.
+ ProfileBanner – The URL for the profile banner, if provided\.
+ ProfileBannerBackgroundColor – The URL for the profile banner background color, if provided\.
+ Status – The channel's status message\.
+ StreamKey – The key to access the channel's stream\.
+ UpdatedDate – The date the channel was last updated, which displays in the ISO 8601 format\.
+ CreatedDate – The date the channel was created, which displays in the ISO 8601 format\.
+ URL – The URL to access the channel\.
+ VideoBanner – The URL for the channel's banner video, if provided\.
+ NumViews – The total number of views for the channel\.
Result – One of the result code values, which returns in the format `Twitch::ResultCode`\.

## GetChannelCommunity<a name="twitch-api-ebus-channels-getchannelcommunity"></a>

Retrieves the community for the specified channel\.

The following is an example of how to use `GetChannelCommunity`:

```
ReceiptID receipt;
AZStd::string channelID;		// must be a valid channel id
EBUS_EVENT(Twitch::TwitchRequestBus, GetChannelCommunity, receipt, channelID);

/*
** Portion of the TwitchNotifications class showing GetChannelCommunity.
*/
class TwitchNotifications : public Twitch::TwitchNotifyBus
{
	void GetChannelCommunity(const CommunityInfoValue& result) override
	{
		cout << "Get Channel Community" << endl;
		if(result.Result == ResultCode::Success)
		{
			const CommunityInfo& info(result.Value);
            cout << "             ID: " << info.ID << endl;
            cout << " AvatarImageURL: " << info.AvatarImageURL << endl;
            cout << "  CoverImageURL: " << info.CoverImageURL << endl;
            cout << "    Description: " << info.Description << endl;
            cout << "DescriptionHTML: " << info.DescriptionHTML << endl;
            cout << "       Language: " << info.Language << endl;
            cout << "           Name: " << info.Name << endl;
            cout << "        OwnerID: " << info.OwnerID << endl;
            cout << "          Rules: " << info.Rules << endl;
            cout << "      RulesHTML: " << info.RulesHTML << endl;
            cout << "        Summary: " << info.Summary << endl;
		}
		else
		{
			cout << "Failure: " << AZStd::to_string(result.Result) << endl;
		}
	}
}
```Parameters

**receipt**  
The receipt for the call, which returns in the format `Twitch::ReceiptID`\.

**channelID**  
The Twitch channel ID\.

**Return**  
No return value\.GetChannelCommunity Callback

**result \- CommunityInfoValue**  
Value – The community information, which includes the following data:  
+ ID – The identifier for the community\.
+ AvatarImageURL – The URL for the avatar image, if provided\.
+ CoverImageURL – The URL for the cover image, if provided\.
+ Description – A plain text description of the community\.
+ DescriptionHTML – An HTML description of the community\.
+ Language – The two letter code for the community language\.
+ Name – The name of the community\.
+ OwnerID – The Twitch user that owns the community\.
+ Rules – A plain text version of the community rules\.
+ RulesHTML – An HTML version of the community rules\.
+ Summary – A summary description of the community\.
Result – One of the result code values, which returns in the format `Twitch::ResultCode`\.

## SetChannelCommunity<a name="twitch-api-ebus-channels-setchannelcommunity"></a>

Adds a specified channel to the specified community\.

The following is an example of how to use `SetChannelCommunity`:

```
ReceiptID receipt;
AZStd::string channelID;		// must be a valid channel id
AZStd::string communityID;		// must be a valid community id
EBUS_EVENT(Twitch::TwitchRequestBus, SetChannelCommunity, receipt, channelID, communityID);

/*
** Portion of the TwitchNotifications class showing SetChannelCommunity.
*/
class TwitchNotifications : public Twitch::TwitchNotifyBus
{
	void SetChannelCommunity(const Int64Value& result) override
	{
		cout << "Set Channel Community" << endl;
		if(result.Result == ResultCode::Success)
		{
			cout << "Success" << endl;
		}
		else
		{
			cout << "Failure: " << AZStd::to_string(result.Result) << endl;
		}
	}
}
```Parameters

**receipt**  
The receipt for the call, which returns in the format `Twitch::ReceiptID`\.

**channelID**  
The Twitch channel ID\.

**communityID**  
The Twitch community ID\.

**Return**  
No return value\.SetChannelCommunity Callback

**result \- Int64Value**  
Value – The HTTP response code for this call\. If successful, the value should be 204 \(No Content\)\.  
Result – One of the result code values, which returns in the format `Twitch::ResultCode`\.

## DeleteChannelfromCommunity<a name="twitch-api-ebus-channels-deletechannelfromcommunity"></a>

Deletes the specified channel from its community\.

The following is an example of how to use `DeleteChannelfromCommunity`:

```
ReceiptID receipt;
AZStd::string channelID;		// must be a valid channel id
EBUS_EVENT(Twitch::TwitchRequestBus, DeleteChannelfromCommunity, receipt, channelID);

/*
** Portion of the TwitchNotifications class showing DeleteChannelfromCommunity.
*/
class TwitchNotifications : public Twitch::TwitchNotifyBus
{
	void DeleteChannelfromCommunity(const Int64Value& result) override
	{
		cout << "Delete Channel from Community" << endl;
		if(result.Result == ResultCode::Success)
		{
			cout << "Success" << endl;
		}
		else
		{
			cout << "Failure: " << AZStd::to_string(result.Result) << endl;
		}
	}
}
```Parameters

**receipt**  
The receipt for the call, which returns in the format `Twitch::ReceiptID`\.

**channelID**  
The Twitch channel ID\.

**Return**  
No return value\.DeleteChannelfromCommunity Callback

**result \- Int64Value**  
Value – The HTTP response code for this call\. If successful, the value should be 204 \(No Content\)\.  
Result – One of the result code values, which returns in the format `Twitch::ResultCode`\.