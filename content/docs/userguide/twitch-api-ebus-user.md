# User<a name="twitch-api-ebus-user"></a>

User APIs for Twitch

## GetUser<a name="twitch-api-ebus-user-getuser"></a>

Requests the Twitch `UserInfo` object for the active user\. This call requires the Twitch scope `user_read`\.

The following is an example of how to use `GetUser`:

```
ReceiptID receipt;
EBUS_EVENT(Twitch::TwitchRequestBus, GetUser, receipt);
 
/*
** Portion of the TwitchNotifications class but with code that will receive the GetUser notify
*/
class TwitchNotifications : public Twitch::TwitchNotifyBus
{
    void GetUser(const UserInfoValue& info) override
    {
        // check to see if this is our response.
        if( receipt.GetID() == userID.GetID() )
        {
            // Display userInfo (not all fields are shown)
            cout << "Request Twitch UserInfo" << endl;
            if(userID.Result == Twitch::ResultCode::Success)
            {
                cout << " UserInfo-         ID: " << info.Value.ID << endl;
                cout << " UserInfo-       Name: " << info.Value.Name << endl;
                cout << " UserInfo-        Bio: " << info.Value.Bio << endl;
                cout << " UserInfo-CreatedDate: " << info.Value.CreatedDate << endl;
                cout << " UserInfo-UpdatedDate: " << info.Value.UpdatedDate << endl;
                cout << " UserInfo-DisplayName: " << info.Value.DisplayName << endl;
                cout << " UserInfo-      EMail: " << info.Value.EMail << endl;
                cout << " UserInfo-       Logo: " << info.Value.Logo << endl;
                cout << " UserInfo-       Type: " << info.Value.Type << endl;
                cout << " UserInfo- ProfileBnr: " << info.Value.ProfileBanner << endl;
                cout << " UserInfo-ProfileBnrC: " << info.Value.ProfileBannerBackgroundColor << endl;
            }
            else
            {
                cout << "Failed Result: " << info.Result << endl;
            }
        }
    }
}
```Parameters

**receipt**  
The receipt for the call, which returns in the format `Twitch::ReceiptID`\.

**Return**  
No return value\.GetUser Callback

**UserInfoValue \- UserInfo**  
Value – The user information, which includes the following data:  
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