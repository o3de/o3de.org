# General<a name="twitch-api-ebus-general"></a>

General APIs for Twitch

## SetApplicationID<a name="twitch-api-ebus-general-setapplicationid"></a>

Sets the Twitch application ID\. You can call `SetApplicationID` only once and you must call it before any other API operations\. You will not receive a notification from this call\.

The following is an example of how to use `SetApplicationID`:

```
/*
** Set a string to hold our Twitch Application ID
*/
 
AZStd:string applicationID = "0123456789abcdef0123456789";
 
EBUS_EVENT(Twitch::TwitchRequestBus, SetApplicationID, applicationID);
```Parameters

**twitchApplicationID**  
The Twitch application ID that you obtain from Twitch when you create an application\.

**Return**  
No return value\.

## RequestUserID<a name="twitch-api-ebus-general-requestuserid"></a>

Requests the Twitch user ID of the active user and caches the value internally\. Subsequent calls will return the cached value\. When you obtain the user ID, a new EBus event is generated and `TwitchNotifyBus::UserIDNotify()` is called\.

The following is an example of how to use `RequestUserID`:

```
ReceiptID receipt;
EBUS_EVENT(Twitch::TwitchRequestBus, RequestUserID, receipt);

/*
** Portion of the TwitchNotifications class but with code that will receive the RequestUserID notify
*/
class TwitchNotifications : public Twitch::TwitchNotifyBus
{
	void UserIDNotify(const StringValue& userID) override
	{
		// check to see if this is our response.
		if( receipt.GetID() == userID.GetID() )
		{
			// Display user id.
			cout << "Request Twitch User ID" << endl;
			if(userID.Result == Twitch::ResultCode::Success)
			{
				cout << "Request: " << userID.GetID() << endl;
				cout << " UserID: " << userid.Value << endl;
			}
			else
			{
				cout << "Failed Result: " << userID.Result << endl;
			}
		}
	}
}
```Parameters

**receipt**  
The receipt for the call, which returns in the format `Twitch::ReceiptID`\.

**Return**  
No return value\.UserIDNotify Callback

**StringValue\-userID**  
Value – The user ID, which returns in the format `AZStd::string`\.  
Result – One of the result code values, which returns in the format `Twitch::ResultCode`\.

## RequestOAuthToken<a name="twitch-api-ebus-general-requestoauthtoken"></a>

Requests the OAuth token for the Twitch user\. When you obtain the token, a new EBus event is generated and `TwitchNotifyBus::OAuthTokenNotify()` is called\.

The following is an example of how to use `RequestOAuthToken`:

```
ReceiptID receipt;
EBUS_EVENT(Twitch::TwitchRequestBus, OAuthTokenNotify, receipt);
 
/*
** Portion of the TwitchNotifications class showing the OAuthTokenNotify callback.
*/
class TwitchNotifications : public Twitch::TwitchNotifyBus
{
	void OAuthTokenNotify(const StringValue& token) override
	{
		if( token.Result == Twitch::ResultCode::Success)
		{
			// Display oauth token
			cout << "Request OAuth Token" << endl;
			cout << "Request: " << token.GetID() << endl;
			cout << "  Token: " << token.Value << endl;
		}
	}
}
```Parameters

**receipt**  
The receipt for the call, which returns in the format `Twitch::ReceiptID`\.

**Return**  
No return value\.OAuthTokenNotify Callback

**token \- ResultCode**  
Value – The OAuth token, which returns in the format `AZStd::string`\.  
Result – One of the result code values, which returns in the format `Twitch::ResultCode`\.

## RequestEntitlement<a name="twitch-api-ebus-general-requestentitlement"></a>

Requests the entitlement ID for the Twitch user\. When you obtain the entitlement ID, a new EBus event is generated and `TwitchNotifyBus::EntitlementNotify()` is called\.

The following is an example of how to use `RequestEntitlement`:

```
ReceiptID receipt;
EBUS_EVENT(Twitch::TwitchRequestBus, RequestEntitlement, receipt);
 
/*
** Portion of the TwitchNotifications class showing the RequestEntitlement callback.
*/
class TwitchNotifications : public Twitch::TwitchNotifyBus
{
	void EntitlementNotify(const StringValue& entitlement) override
	{
		if( entitlement.Result == Twitch::ResultCode::Success)
		{
			// Display entitlement id.
			cout << "Request Entitlement ID" << endl;
			cout << "    Request: " << entitlement.GetID() << endl;
			cout << "Entitlement: " << entitlement.Value << endl;
		}
	}
}
```Parameters

**receipt**  
The receipt for the call, which returns in the format `Twitch::ReceiptID`\.

**Return**  
No return value\.EntitlementNotify Callback

**entitlement \- ResultCode**  
Value – The entitlement ID, which may contain numbers, letters, and a hyphen\.  
Result – One of the result code values, which returns in the format `Twitch::ResultCode`\.

## RequestProductCatalog<a name="twitch-api-ebus-general-requestproductcatalog"></a>

Requests the available SKUs for the user and product\. When you obtain the list, a new EBus event is generated and the `TwitchNotifyBus::RequestProductCatalog()` is called\.

The following is an example of how to use `RequestProductCatalog`:

```
ReceiptID receipt;
EBUS_EVENT(Twitch::TwitchRequestBus, RequestProductCatalog, receipt);
 
/*
** Portion of the TwitchNotifications class showing the RequestProductCatalog callback.
*/
class TwitchNotifications : public Twitch::TwitchNotifyBus
{
	void RequestProductCatalog(const ProductDataReturnValue& productData) override
	{
		if( productData.Result == Twitch::ResultCode::Success )
		{
			// Display catalog
			cout << "RequestProductCatalog " << endl;
			cout << "Request: " << productData.GetID() << endl;
			cout << "Product List:" << endl;
			
			for(const auto & i: productData.Value.ProductList)
			{
				cout << "         Sku: " << i.Sku << endl;
				cout << "       Title: " << i.Title << endl;
				cout << " Description: " << i.Description << endl;
				cout << "       Price: " << i.Price << endl;
				cout << "SmallIconUrl: " << i.SmallIconUrl << endl;
				cout << " ProductType: " << i.ProductType << endl;
			}
 
			cout << "Unavailable Skus List:" << endl;
			
			for(const auto & i: productData.Value.UnavailableSkus)
			{
				cout << "Unavailable Sku: " << i << endl;
			}
		}
	}
}
```Parameters

**receipt**  
The receipt for the call, which returns in the format `Twitch::ReceiptID`\.

**Return**  
No return value\.RequestProductCatalog Callback

**productData \- ProductDataReturnValue**  
Value – The product list, which includes the following data:  

**ProductList \(ProductInfoList\)**
+ Sku \(FuelSku\) – The item's SKU, which is a unique ID similar to a GUID\.
+ Description – The item's description, which returns in the format `AZStd::string`\.
+ Price – The item's price based on the billing locale\. The value returns in the format `AZStd::string`\.
+ SmallIconUrl – The URL of the item's icon, which returns in the format `AZStd::string`\.
+ Title – The title of the item, which returns in the format `AZStd::string`\.
+ ProductType \(FuelProductType\) – One of the product types that defines the item\.

**UnavailableSkus \(FuelSkuList\)**
+ A list of SKUs that are attached to the product\. The SKUs are not available to customers\.
Result – One of the result code values, which returns in the format `Twitch::ResultCode`\.

## PurchaseProduct<a name="twitch-api-ebus-general-purchaseproduct"></a>

Requests to purchase a product based on the SKU\. Purchase options are overlaid on the existing screen from the Twitch desktop application\. When the purchase is completed, the EBus event `TwitchNotifyBus::PurchaseProduct()` provides the result \(successful or unsuccessful\)\.

The following is an example of how to use `PurchaseProduct`:

```
ReceiptID receipt;
Twitch::FuelSku productSku = "<place product sku here>";
EBUS_EVENT(Twitch::TwitchRequestBus, PurchaseProduct, receipt, productSku);
 
/*
** Portion of the TwitchNotifications class showing the PurchaseProduct callback.
*/
class TwitchNotifications : public Twitch::TwitchNotifyBus
{
	void PurchaseProduct(const PurchaseReceiptReturnValue& purchaseReceipt) override
	{
		if( purchaseReceipt.Result == Twitch::ResultCode::Success )
		{
			// Display purchase result
			cout << "PurchaseProduct" << endl;
			cout << "     Request: " << purchaseReceipt.GetID() << endl;
			cout << "   ReceiptId: " << purchaseReceipt.Value.ReceiptId << endl;
			cout << "PurchaseDate: " << purchaseReceipt.Value.PurchaseDate << endl;
			cout << "  CancelDate: " << purchaseReceipt.Value.CancelDate << endl;
			cout << "        Type: " << purchaseReceipt.Value.Type << endl;
		}
	}
}
```Parameters

**receipt**  
The receipt for the call, which returns in the format `Twitch::ReceiptID`\.

**productSku**  
The SKU to purchase, which returns in the format `Twitch::FuelSku`\.

**Return**  
No return value\.PurchaseProduct Callback

**purchaseReceipt \- PurchaseReceiptReturnValue**  
Value – The purchase receipt, which includes the following data:  
+ Sku \(FuelSku\) – The item's SKU, which is a unique ID similar to a GUID\.
+ ReceiptId – The item's purchase ID, which returns in the format `AZStd::string`\.
+ PurchaseDate – The Linux serial date when the purchase was made\. The value returns in the format `AZ::u64`\.
+ CancelDate – The Linux serial date when the purchase was canceled\. The value returns in the format `AZ::u64`\.
+ Type \(FuelProductType\) – One of the product types that defines the item\.
Result – One of the result code values, which returns in the format `Twitch::ResultCode`\.

## GetPurchaseUpdates<a name="twitch-api-ebus-general-getpurchaseupdates"></a>

Requests to retrieve updates about a customer's purchased items or canceled orders\. Each request includes a sync token, which is an opaque string that determines which purchase updates were synced\. When `GetPurchaseUpdates` is initially called, an empty sync token is used\. Subsequent calls to `GetPurchaseUpdates` will return a sync token that you can use in the next request\. The EBus event `TwitchNotifyBus::PurchaseProduct()` provides the update list\.

The following is an example of how to use `GetPurchaseUpdates`:

```
ReceiptID receipt;
AZStd::string syncToken = "<empty for first call or sync token from previous call>";
EBUS_EVENT(Twitch::TwitchRequestBus, GetPurchaseUpdates, receipt, syncToken);
 
/*
** Portion of the TwitchNotifications class showing the GetPurchaseUpdates callback.
*/
class TwitchNotifications : public Twitch::TwitchNotifyBus
{
	void GetPurchaseUpdates(const PurchaseUpdateReturnValue& purchaseUpdate) override
	{
		if( purchaseUpdate.Result == Twitch::ResultCode::Success )
		{
			// Display update result
			cout << "GetPurchaseUpdates" << endl;
			cout << "  Request: " << purchaseUpdate.GetID() << endl;
			cout << "SyncToken: " << purchaseUpdate.Value.SyncToken << endl;
			cout << "Purchase Receipt List:" << endl;
			
			for(const auto & i: purchaseUpdate.Value.Products)
			{
				cout << "         Sku: " << i.Sku << endl;
				cout << "   ReceiptId: " << i.ReceiptId << endl;
				cout << "PurchaseDate: " << i.PurchaseDate << endl;
				cout << "  CancelDate: " << i.CancelDate << endl;
				cout << "        Type: " << i.Type << endl;
			}
		}
	}
}
```Parameters

**receipt**  
The receipt for the call, which returns in the format `Twitch::ReceiptID`\.

**syncToken**  
The sync token, which returns in the format `AZStd::string`\.

**Return**  
No return value\.PurchaseProduct Callback

**purchaseReceipt \- PurchaseReceiptReturnValue**  
Value – The purchase update, which includes the following data:  
+ SyncToken – An opaque string that you can use in your request when calling `GetPurchaseUpdates`\. The value returns in the format `AZStd::string`\.
+ Products – The purchase receipt list, which includes the following data:
  + Sku \(FuelSku\) – The item's SKU, which is a unique ID similar to a GUID\.
  + ReceiptId – The item's purchase ID, which returns in the format `AZStd::string`\.
  + PurchaseDate – The Linux serial date when the purchase was made\. The value returns in the format `AZ::u64`\.
  + CancelDate – The Linux serial date when the purchase was canceled\. The value returns in the format `AZ::u64`\.
  + Type \(FuelProductType\) – One of the product types that defines the item\.
Result – One of the result code values, which returns in the format `Twitch::ResultCode`\.