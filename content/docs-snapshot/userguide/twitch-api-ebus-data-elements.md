# Data Types<a name="twitch-api-ebus-data-elements"></a>

Data Types APIs for Twitch

## Twitch Requests class<a name="twitch-api-ebus-data-elements-twitch-requests-class"></a>

The `Twitch Requests` class that EBus events are based on\.

The following is the definition for the `Twitch Requests` class:

```
class TwitchRequests
    : public AZ::EBusTraits
{
public:
    static const AZ::EBusHandlerPolicy HandlerPolicy = AZ::EBusHandlerPolicy::Single;
    static const AZ::EBusAddressPolicy AddressPolicy = AZ::EBusAddressPolicy::Single;

    // Public functions
    virtual void RequestUserID(ReceiptID& receipt) = 0;
    virtual void RequestOAuthToken(ReceiptID& receipt) = 0;

    // Friends
    virtual void ResetFriendsNotificationCount(ReceiptID& receipt, const AZStd::string& friendID) = 0;
    virtual void GetFriendNotificationCount(ReceiptID& receipt, const AZStd::string& friendID) = 0;
    virtual void GetFriendRecommendations(ReceiptID& receipt, const AZStd::string& friendID) = 0;
    virtual void GetFriends(ReceiptID& receipt, const AZStd::string& friendID, const AZStd::string& cursor) = 0;
    virtual void GetFriendStatus(ReceiptID& receipt, const AZStd::string& friendID) = 0;
    virtual void AcceptFriendRequest(ReceiptID& receipt, const AZStd::string& friendID) = 0;
    virtual void GetFriendRequests(ReceiptID& receipt, const AZStd::string& cursor) = 0;
    virtual void CreateFriendRequest(ReceiptID& receipt, const AZStd::string& friendID) = 0;
    virtual void DeclineFriendRequest(ReceiptID& receipt, const AZStd::string& friendID) = 0;

    // Rich Presence
    virtual void UpdatePresenceStatus(ReceiptID& receipt, PresenceAvailability availability, PresenceActivityType activityType, const AZStd::string& gameContext) = 0;
    virtual void GetPresenceStatusofFriends(ReceiptID& receipt) = 0;
    virtual void GetPresenceSettings(ReceiptID& receipt) = 0;
    virtual void UpdatePresenceSettings(ReceiptID& receipt, bool isInvisible, bool shareActivity) = 0;

    // Channels
    virtual void GetChannel(ReceiptID& receipt) = 0;
    virtual void GetChannelbyID(ReceiptID& receipt, const AZStd::string& channelID) = 0;
    virtual void UpdateChannel(ReceiptID& receipt, const ChannelUpdateInfo & channelUpdateInfo) = 0;
    virtual void GetChannelEditors(ReceiptID& receipt, const AZStd::string& channelID) = 0;
    virtual void GetChannelFollowers(ReceiptID& receipt, const AZStd::string& channelID, const AZStd::string& cursor, AZ::u64 offset) = 0;
    virtual void GetChannelTeams(ReceiptID& receipt, const AZStd::string& channelID) = 0;
    virtual void GetChannelSubscribers(ReceiptID& receipt, const AZStd::string& channelID, AZ::u64 offset) = 0;
    virtual void CheckChannelSubscriptionbyUser(ReceiptID& receipt, const AZStd::string& channelID, const AZStd::string& userID) = 0;
    virtual void GetChannelVideos(ReceiptID& receipt, const AZStd::string& channelID, BroadCastType boradcastType, const AZStd::string& language, AZ::u64 offset) = 0;
    virtual void StartChannelCommercial(ReceiptID& receipt, const AZStd::string& channelID, CommercialLength length) = 0;
    virtual void ResetChannelStreamKey(ReceiptID& receipt, const AZStd::string& channelID) = 0;
    virtual void GetChannelCommunity(ReceiptID& receipt, const AZStd::string& channelID) = 0;
    virtual void SetChannelCommunity(ReceiptID& receipt, const AZStd::string& channelID, const AZStd::string& communityID) = 0;
    virtual void DeleteChannelfromCommunity(ReceiptID& receipt, const AZStd::string& communityID) = 0;
};

using TwitchRequestBus = AZ::EBus<TwitchRequests>;
```

## Twitch Notification class<a name="twitch-api-ebus-data-elements-twitch-notification-class"></a>

All EBus event requests return to this class\. Notification members use the same names as request members\.

The following is the definition for the `Twitch Notification` class:

```
class TwitchNotifications
    : public AZ::EBusTraits
{
public:
    static const AZ::EBusHandlerPolicy HandlerPolicy = AZ::EBusHandlerPolicy::Multiple;
    static const AZ::EBusAddressPolicy AddressPolicy = AZ::EBusAddressPolicy::Single;
    static const bool EnableEventQueue = true;

    // Public functions
    virtual void UserIDNotify(const StringValue& userID) { (void) userID; }
    virtual void OAuthTokenNotify(const StringValue& token) { (void) token; } 

    // Friend notifications
    virtual void ResetFriendsNotificationCountNotify(const Int64Value& result) { (void) result; }
    virtual void GetFriendNotificationCount(const Int64Value& result) { (void) result; }
    virtual void GetFriendRecommendations(const FriendRecommendationValue& result) { (void) result; }
    virtual void GetFriends(const GetFriendValue& result) {(void) result; }
    virtual void GetFriendStatus(const FriendStatusValue& result) { (void) result; };
    virtual void AcceptFriendRequest(const Int64Value& result) { (void)result; };
    virtual void GetFriendRequests(const FriendRequestValue& result) { (void) result; }
    virtual void CreateFriendRequest(const Int64Value& result) { (void)result; }
    virtual void DeclineFriendRequest(const Int64Value& result) { (void)result; }

    // Rich Presence
    virtual void UpdatePresenceStatus(const Int64Value& result) { (void)result; }
    virtual void GetPresenceStatusofFriends(const PresenceStatusValue& result) { (void) result; }
    virtual void GetPresenceSettings(const PresenceSettingsValue& result) { (void) result; }
    virtual void UpdatePresenceSettings(const PresenceSettingsValue& result) { (void) result; }

    // Channels
    virtual void GetChannel(const ChannelInfoValue& result) { (void) result; }
    virtual void GetChannelbyID(const ChannelInfoValue& result) { (void) result; }
    virtual void UpdateChannel(const ChannelInfoValue& result) { (void) result; }
    virtual void GetChannelEditors(const UserInfoListValue& result) { (void) result; }
    virtual void GetChannelFollowers(const FollowerResultValue& result) { (void) result; }
    virtual void GetChannelTeams(const ChannelTeamValue& result) { (void)result; }
    virtual void GetChannelSubscribers(const SubscriberValue& result) { (void)result; }
    virtual void CheckChannelSubscriptionbyUser(const SubscriberbyUserValue& result) { (void)result; }
    virtual void GetChannelVideos(const VideoReturnValue& result) { (void)result; }
    virtual void StartChannelCommercial(const StartChannelCommercialValue& result) { (void)result; }
    virtual void ResetChannelStreamKey(const ChannelInfoValue& result) { (void)result; }
    virtual void GetChannelCommunity(const CommunityInfoValue& result) { (void)result; }
    virtual void SetChannelCommunity(const Int64Value& result) { (void)result; }
    virtual void DeleteChannelfromCommunity(const Int64Value& result) { (void)result; }
};

using TwitchNotifyBus = AZ::EBus<TwitchNotifications>;
```

## Result Codes<a name="twitch-api-ebus-data-elements-result-codes"></a>

The following is the definition for the `ResultCode` return:

```
enum class ResultCode {Success, FuelSDKNotInitialized, FuelNoSession, FuelNoApplicationID, FuelNoIAPClient, FuelMissingCredentals, InvalidParam, TwitchRESTError, TwitchChannelNoUpdatesToMake, Unknown=0x7ffffff};
```

**Error Code Descriptions**
+ `Success` – The call was successful\.
+ `FuelSDKNotInitialized` – The Twitch Commerce SDK could not initialize\. This can result from a bad application ID, inability to find the SDK DLLs during initialization, or errors with Twitch\. If you continue to receive this error, please contact the help forums\.
+ `FuelNoSession` – The Twitch Commerce SDK was initialized but session information was not returned\.
+ `FuelNoApplicationID` – The application ID was not set correctly or contains invalid characters\.
+ `FuelNoIAPClient` – The Twitch Commerce SDK was not initialized successfully\.
+ `FuelMissingCredentials` – Twitch did not return the credentials\.
+ `InvalidParam` – An invalid parameter was passed\.
+ `TwitchRESTError` – An internal REST error occurred\.
+ `TwitchChannelNoUpdatesToMake` – An attempt was made to update a channel but no data was given to update the channel\.
+ `Unknown` – This error is rare and can occur if calls are made asynchronously during initialization\.

## UserInfo struct<a name="twitch-api-ebus-data-elements-userinfo-struct"></a>

The basic Twitch user information object is returned from different calls as a single user or a list of users\. Not all APIs that return a value for `UserInfo` will fill all the members\. The following members are not used and the values will return empty: `GetChannelEditors`, `ProfileBanner`, and `ProfileBannerBackgroundColor`\.

The following is the definition for the `UserInfo` struct:

```
struct UserNotifications
{
	UserNotifications() : EMail(false), Push(false) { }

    bool EMail;
    bool Push;
};
 
struct UserInfo
{
	UserInfo() : EMailVerified(false), Partnered(false), TwitterConnected(false) { }
   	 AZStd::string       ID;							// Twitch ID
     AZStd::string       Bio;							// May be empty otherwise contains user generated bio
     AZStd::string       CreatedDate;					// ISO 8601 format.
     AZStd::string       DisplayName;					// The name to display for this user
     AZStd::string       Logo;							// May be empty otherwise URL to user's logo.
     AZStd::string       Name;							// Users full name
     AZStd::string       ProfileBanner;					// May be empty otherwise URL to user's banner
     AZStd::string       ProfileBannerBackgroundColor;	// May be empty otherwise URL to user's banner background color
     AZStd::string       Type;							// user type, known values are "user"
     AZStd::string       UpdatedDate;					// ISO 8601 format.
     UserNotifications   Notifications;					// May be empty
     bool                EMailVerified;
     bool                Partnered;
     bool                TwitterConnected;
};
 
using UserInfoList = AZStd::list<UserInfo>;
```

## FriendRecommendation struct<a name="twitch-api-ebus-data-elements-friendrecommendation-struct"></a>

The following is the definition for the `FriendRecommendation` struct:

```
struct FriendRecommendation
{
	AZStd::string       Reason;
	UserInfo            User;
};

using FriendRecommendationList = AZStd::list<FriendRecommendation>;
```

## FriendRequest struct<a name="twitch-api-ebus-data-elements-friendrequest-struct"></a>

The following is the definition for the `FriendRequest` struct:

```
struct FriendRequest
{
	FriendRequest() : IsRecommended(false), IsStranger(false) {}

	bool            IsRecommended;
	bool            IsStranger;
	AZStd::string   NonStrangerReason;
	AZStd::string   RequestedDate;
	UserInfo        User;
};

using FriendRequestList = AZStd::list<FriendRequest>;

struct FriendRequestResult
{
	AZ::u64             Total;
	AZStd::string       Cursor;
	FriendRequestList   Requests;
};
```

## PresenceAvailability enum<a name="twitch-api-ebus-data-elements-presenceavailability-enum"></a>

The following is the definition for the `PresenceAvailability` enum: 

```
enum class PresenceAvailability { Unknown, Online, Idle };
```

## PresenceActivityType enum<a name="twitch-api-ebus-data-elements-presenceactivitytype-enum"></a>

The following is the definition for the `PresenceActivityType` enum:

```
enum class PresenceActivityType { Unknown, Watching, Playing, Broadcasting};
```

## PresenceStatus struct<a name="twitch-api-ebus-data-elements-presencestatus-struct"></a>

The following is the definition for the `PresenceStatus` struct:

```
struct PresenceStatus
{
	PresenceStatus() : ActivityType(PresenceActivityType::Unknown), Availability(PresenceAvailability::Unknown), Index(0), UpdatedDate(0) { }

	PresenceActivityType    ActivityType;
	PresenceAvailability    Availability;
	AZ::s64                 Index;
	AZ::s64                 UpdatedDate;
	AZStd::string           UserID;
};
```

## PresenceSettings struct<a name="twitch-api-ebus-data-elements-presencesettings-struct"></a>

The `PresenceSettings` struct is used in `TwitchNotifyBus GetPresenceSettings` and methods\.

The following is the definition for the `PresenceSettings` struct: 

```
struct PresenceSettings
{
    PresenceSettings() : IsInvisible(false), ShareActivity(false) { }

    bool            IsInvisible;
    bool            ShareActivity;
};
```

## ChannelInfo<a name="twitch-api-ebus-data-elements-channelinfo"></a>

The `ChannelInfo` struct is used in `TwitchNotifyBus GetChannel` and the following methods: `GetChannelbyID`, `UpdateChannel`, and `ResetChannelStreamKey`\.

The following is the definition for the `ChannelInfo` struct:

```
struct ChannelInfo
{
    ChannelInfo() : NumFollowers(0), NumViews(0), NumItemsRecieved(0), Partner(false), Mature(false) { }

    AZ::u64                 NumFollowers;
    AZ::u64                 NumViews;
    AZ::u64                 NumItemsRecieved;
    bool                    Partner;
    bool                    Mature;
    AZStd::string           Id;
    AZStd::string           BroadcasterLanguage;
    AZStd::string           DisplayName;
    AZStd::string           eMail;
    AZStd::string           GameName;
    AZStd::string           Lanugage;
    AZStd::string           Logo;
    AZStd::string           Name;
    AZStd::string           ProfileBanner;
    AZStd::string           ProfileBannerBackgroundColor;
    AZStd::string           Status;
    AZStd::string           StreamKey;
    AZStd::string           UpdatedDate;
    AZStd::string           CreatedDate;
    AZStd::string           URL;
    AZStd::string           VideoBanner;
};
```

## UpdateChannelInfo<a name="twitch-api-ebus-data-elements-updatechannelinfo"></a>

The following is the definition for the `ChannelUpdateInfo` struct: 

```
/*
** UpdateChanelinfo - Updates specified properties of a specified channel.
**   Note: Only call SetValue() on the item that you want to update, at least one
**   of the items must be set to update the channel info or the call to UpdateChannelInfo
**   will fail with a result code of ResultCode::TwitchChannelNoUpdatesToMake
**     
*/

template<class T>
class UpdateValue
{
public:
    UpdateValue() : IsUpdated(false) { }
    virtual ~UpdateValue() {}
    void SetValue(const T & v) { Action = true; Value = v; }
    T GetValue() const { return Value; }
    bool ToBeUpdated() const { return IsUpdated; }

private:
    T               Value;
    bool            IsUpdated;
};

struct ChannelUpdateInfo
{
    UpdateValue<bool>           ChannelFeedEnabled;     // If true, the channel’s feed is turned on. Default: false.
    UpdateValue<AZ::u64>        Delay;                  // Channel delay, in seconds. This inserts a delay in the live feed.
    UpdateValue<AZStd::string>  Status;                 // Description of the broadcaster’s status, displayed as a title on the channel page.
    UpdateValue<AZStd::string>  GameName;               // Name of game
};
```

## TeamInfoList<a name="twitch-api-ebus-data-elements-teaminfolist"></a>

The following is the definition for the `TeamInfoList` struct:

```
struct TeamInfo
{
    AZStd::string       ID;
    AZStd::string       Background;
    AZStd::string       Banner;
    AZStd::string       CreatedDate;
    AZStd::string       DisplayName;
    AZStd::string       Info;
    AZStd::string       Logo;
    AZStd::string       Name;
    AZStd::string       UpdatedDate;
};

using TeamInfoList = AZStd::list<TeamInfo>;
```

## Subscriber<a name="twitch-api-ebus-data-elements-subscriber"></a>

The following is the definition for the `Subscription` struct:

```
struct SubscriberInfo
{
    AZStd::string       ID;
    AZStd::string       CreatedDate;
    UserInfo            User;
};

using SubscriberInfoList = AZStd::list<SubscriberInfo>;

struct Subscription
{
    AZ::u64             Total;
    SubscriberInfoList  Subscribers;
};
```

## VideoReturn<a name="twitch-api-ebus-data-elements-videoreturn"></a>

The following is the definition for the `VideoReturn` struct:

```
enum class BroadCastType
{
    Default                         = 0x00,
    Archive                         = 0x01, 
    Highlight                       = 0x02, 
    Upload                          = 0x04,
    ArchiveAndHighlight             = Archive | Highlight,
    ArchiveAndUpload                = Archive | Upload,
    ArchiveAndHighlightAndUpload    = Archive | Highlight | Upload,
    HighlightAndUpload              = Highlight | Upload,
};

struct VideoChannelInfo
{
    AZStd::string           ID;
    AZStd::string           DisplayName;
    AZStd::string           Name;
};

struct FPSInfo
{
    FPSInfo() : Chunked(0.0f), High(0.0f), Low(0.0f), Medium(0.0f), Mobile(0.0f) {}
    double                  Chunked;
    double                  High;
    double                  Low;
    double                  Medium;
    double                  Mobile;
};

struct PreviewInfo
{
    AZStd::string           Large;
    AZStd::string           Medium;
    AZStd::string           Small;
    AZStd::string           Template;
};

struct ResolutionsInfo
{
    AZStd::string           Chunked;
    AZStd::string           High;
    AZStd::string           Low;
    AZStd::string           Medium;
    AZStd::string           Mobile;
};

struct ThumbnailInfo
{
    AZStd::string           Type;
    AZStd::string           Url;
};

struct ThumbnailsInfo
{
    ThumbnailInfo			Large;
    ThumbnailInfo           Medium;
    ThumbnailInfo           Small;
    ThumbnailInfo           Template;
};

struct VideoInfo
{
    VideoInfo() : Length(0), Views(0), BroadcastID(0), Type(BroadCastType::Default) {}

    AZ::u64                 Length;
    AZ::u64                 Views;
    AZ::u64                 BroadcastID;
    BroadCastType           Type;
    AZStd::string           CreatedDate;
    AZStd::string           Description;
    AZStd::string           DescriptionHTML;
    AZStd::string           ID;
    AZStd::string           Game;
    AZStd::string           Language;
    AZStd::string           PublishedDate;
    AZStd::string           Status;
    AZStd::string           TagList;
    AZStd::string           Title;
    AZStd::string           URL;
    AZStd::string           Viewable;
    AZStd::string           ViewableAt;
    VideoChannelInfo        Channel;
    FPSInfo                 FPS;
    PreviewInfo             Preview;
    ThumbnailsInfo			Thumbnails;
    ResolutionsInfo         Resolutions;
};

using VideoInfoList = AZStd::list<VideoInfo>;

struct VideoReturn
{
    VideoReturn() : Total(0) {}

    AZ::u64             Total;
    VideoInfoList       Videos;
};
```

## StartChannelCommercialResult<a name="twitch-api-ebus-data-elements-startchannelcommercialresult"></a>

The following is the definition for the `StartChannelCommercialResult` struct:

```
enum class CommercialLength {T30Seconds, T60Seconds, T90Seconds, T120Seconds, T150Seconds, T180Seconds};

struct StartChannelCommercialResult
{
    StartChannelCommercialResult() : Duration(0), RetryAfter(0) {}
    AZ::u64         Duration;
    AZ::u64         RetryAfter;
    AZStd::string   Message;
};
```

## CommunityInfo<a name="twitch-api-ebus-data-elements-communityinfo"></a>

The following is the definition for the `CommunityInfo` struct:

```
struct CommunityInfo
{
    AZStd::string       ID;
    AZStd::string       AvatarImageURL;
    AZStd::string       CoverImageURL;
    AZStd::string       Description;
    AZStd::string       DescriptionHTML;
    AZStd::string       Language;
    AZStd::string       Name;
    AZStd::string       OwnerID;
    AZStd::string       Rules;
    AZStd::string       RulesHTML;
    AZStd::string       Summary;
};
```

## CommerceInfo<a name="twitch-api-ebus-data-elements-commerce-info"></a>

The following is the definition for the `CommerceInfo` struct:

```
using FuelSku = AZStd::string;
using FuelSkuList = AZStd::list<FuelSku>;

enum class FuelProductType { Consumable, Entitlement, Subscription, Unknown, Undefined };
enum class FulfillmentResult { Fulfilled, Unavailable, Undefined };
 
struct ProductInfo
{
	ProductInfo() : ProductType(FuelProductType::Unknown) { }

	FuelSku             Sku;
	AZStd::string       Description;
    AZStd::string       Price;
    AZStd::string       SmallIconUrl;
    AZStd::string       Title;
    FuelProductType     ProductType;
};

using ProductInfoList = AZStd::list<ProductInfo>;

struct ProductData
{
	ProductInfoList         ProductList;
	FuelSkuList             UnavailableSkus;
};
 
/*
** Represents the purchase of consumable content, entitlement content or
** subscription content, as well as the renewal of a subscription. All strings
** are UTF-8.
*/
 
struct PurchaseReceipt
{
	PurchaseReceipt() : PurchaseDate(0), CancelDate(0), Type(FuelProductType::Unknown)  { }
        
	FuelSku             Sku;
	AZStd::string       ReceiptId;
	AZ::u64             PurchaseDate;
	AZ::u64             CancelDate;
	FuelProductType     Type;
};


using PurchaseReceiptList = AZStd::list<PurchaseReceipt>;

/*
** Initiates a request to retrieve updates about items the customer has purchased or canceled.
** The request includes a sync token, an opaque string that the backend services created and use to
** determine which purchase updates were synced. The first time GetPurchaseUpdates is called, a empty 
** sync token should be used. The response contains a new sync token that you can use in the
** request of the next call to GetPurchaseUpdates. In each subsequent call to GetPurchaseUpdates, 
** you can use the sync token that is returned in the request for the next.
**
** After you have all the receipts, you can fulfill or revoke the orders if you have
** not done so previously. Then you should mark the order as fulfilled or unavailable,
** using NotifyFulfillment. After a consumable order is marked as fulfilled, it no longer is returned
** by GetPurchaseUpdates.
**/

struct PurchaseUpdate
{
	AZStd::string           SyncToken;
	PurchaseReceiptList     Products;
};
```