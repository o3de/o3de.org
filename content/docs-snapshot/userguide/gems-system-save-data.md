# SaveData Gem<a name="gems-system-save-data"></a>

The SaveData gem encapsulates all the functionality in Lumberyard for saving game and individual user data under a single platform\-agnostic set of API operations\.

![\[The SaveData gem in Project Configurator.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/gems-system-save-data-1.png)

To enable gems, see [Enabling Gems](gems-system-using-project-configurator.md)\.

The SaveData gem uses the [Event Bus \(EBus\)](ebus-intro.md), Lumberyard's general\-purpose communication system for dispatching notifications and receiving requests\. To make requests related to saving or loading persistent user data, use the SaveData gem's `SaveDataRequests` bus\. To listen for notifications related to saving persistent user data, use the `SaveDataNotifications` bus\.

## Making Requests to Save Data<a name="gems-system-save-data-requests"></a>

When making requests to save or load data using the `SaveDataRequestBus`, keep the following points in mind:
+ The SaveData gem is responsible only for saving and loading generic data buffers\. Your game must serialize or deserialize data using a data format, such as JSON or XML, that you deem appropriate\. However, convenience functions are provided that save or load an object that has been reflected using an [`AZ::SerializeContext`](component-entity-system-reflection-serialization-context.md)\.
+ Each save data buffer must be uniquely identified by a string\. On most operating systems and devices, this string is the name of the file to which the data buffer is written\.

### Saving Data for Local User IDs<a name="gems-system-save-data-local-user-ids"></a>

SaveData gem communications that deal with local user profiles depend on the local user ID that uniquely identifies a user on the local device\. When using local user IDs, keep in mind the following points:
+ A save data buffer can optionally be associated with a local user ID\.
+ Data buffers that have the same name can be stored separately for each local user ID\.
+ When you call the save data functions, you must either specify a local user ID or pass in the value `AzFramework::LocalUserIdNone`\. This requirement helps you to consider whether the data that you are saving should be associated with a user\.
+ Data associated with a local user ID is saved into a container or directory that is unique to the local user ID and the application\.
+ Data not associated with a local user ID is saved into a 'global' container or directory unique to the application\.

For more information about the `SaveDataRequests` bus, see the commented source code at `lumberyard_version\dev\Gems\SaveData\Code\Include\SaveData\SaveDataRequestBus.h`\.

## Getting Save Data Notifications<a name="gems-system-save-data-notifications"></a>

All save and load operations performed by the SaveData gem are asynchronous\. Therefore, you must either subscribe to receive Save Data notifications or supply a callback function that notifies you when a save or load operation completes\. This action is always performed in the main thread\.

For more information about the `SaveDataNotifications` bus, see the commented source code at `lumberyard_version\dev\Gems\SaveData\Code\Include\SaveData\SaveDataNotificationBus.h`\.

## Save Data Code Example<a name="gems-system-save-data-code-example"></a>

The following example code uses the SaveData gem to save and load buffers and objects to and from persistent storage\.

```
const AZ::u64 testSaveDataSize = 9;
const char* testSaveDataName = "TestSaveData";
char testSaveData[testSaveDataSize] = {'a', 'b', 'c', '1', '2', '3', 'x', 'y', 'z'};

void SaveBufferToPersistentStorage()
{
    SaveData::SaveDataRequests::SaveDataBufferParams params;
    params.dataBuffer.reset(testSaveData);
    params.dataBufferSize = testSaveDataSize;
    params.dataBufferName = testSaveDataName;
    params.callback = [](const SaveData::SaveDataNotifications::DataBufferSavedParams& onSavedParams)
    {
        if (onSavedParams.result != SaveData::SaveDataNotifications::Result::Success)
        {
            // Error handling
        }
    };
    SaveData::SaveDataRequestBus::Broadcast(&SaveData::SaveDataRequests::SaveDataBuffer, params);
}

void LoadBufferFromPersistentStorage()
{
    SaveData::SaveDataRequests::LoadDataBufferParams params;
    params.dataBufferName = testSaveDataName;
    params.callback = [](const SaveData::SaveDataNotifications::DataBufferLoadedParams& onLoadedParams)
    {
        if (onLoadedParams.result == SaveData::SaveDataNotifications::Result::Success)
        {
            // SaveDataNotifications::DataBuffer is a shared_ptr, so you can choose to either preserve the
            // buffer (by keeping a reference to it), or just let it go out of scope so it will be deleted.
                        SaveDataNotifications::DataBuffer loadedDataBuffer = onLoadedParams.dataBuffer;
            // Use the loaded data buffer...
        }
        else
        {
            // Error handling
        }
    };
    SaveData::SaveDataRequestBus::Broadcast(&SaveData::SaveDataRequests::LoadDataBuffer, params);
}

class TestObject
{
public:
    AZ_RTTI(TestObject, "{9CE29971-8FE2-41FF-AD5B-CB15F1B92834}");
    static void Reflect(AZ::SerializeContext& sc)
    {
        sc.Class<TestObject>()
            ->Version(1)
            ->Field("testString", &TestObject::testString)
            ->Field("testFloat", &TestObject::testFloat)
            ->Field("testInt", &TestObject::testInt)
            ->Field("testBool", &TestObject::testBool)
        ;
    }
    AZStd::string testString;
    float testFloat = 0.0f;
    int testInt = 0;
    bool testBool = false;
}; 

void SaveObjectToPersistentStorage()
{
    // Reflect the test object class (if not already done).
    AZ::SerializeContext serializeContext;
    TestObject::Reflect(serializeContext);

    // Create a test object instance to save.
    AZStd::shared_ptr<TestObject> testObject = AZStd::make_shared<TestObject>();

    // Setup the save data params
    SaveData::SaveDataRequests::SaveOrLoadObjectParams<TestObject> params;
    params.serializableObject = testObject;
    params.serializeContext = &serializeContext; // Omit to use the global AZ::SerializeContext instance
    params.dataBufferName = "TestSaveObject";
    params.callback = [](const SaveData::SaveDataRequests::SaveOrLoadObjectParams<TestObject>& callbackParams,
                         SaveData::SaveDataNotifications::Result callbackResult)
    {
        if (callbackResult != SaveData::SaveDataNotifications::Result::Success)
        {
            // Error handling
        }
    };
    SaveData::SaveDataRequests::SaveObject(params);
}

void LoadObjectFromPersistentStorage(const AzFramework::LocalUserId& localUserId = AzFramework::LocalUserIdNone)
{
    // Reflect the test object class (if not already done).
    AZ::SerializeContext serializeContext;
    TestObject::Reflect(serializeContext);

    // Create a test object to load.
    AZStd::shared_ptr<TestObject> testObject = AZStd::make_shared<TestObject>();

    // Setup the load data params
    SaveData::SaveDataRequests::SaveOrLoadObjectParams<TestObject> params;
    params.serializableObject = testObject;
    params.serializeContext = &serializeContext; // Omit to use the global AZ::SerializeContext instance
    params.dataBufferName = "TestSaveObject";
    params.callback = [](const SaveData::SaveDataRequests::SaveOrLoadObjectParams<TestObject>& callbackParams,
                         SaveData::SaveDataNotifications::Result callbackResult)
    {
        if (onLoadedParams.result == SaveData::SaveDataNotifications::Result::Success)
        {
            // Use the loaded data buffer...
            callbackParams.serializableObject;
        }
        else
        {
            // Error handling
        }
    };
    SaveData::SaveDataRequests::LoadObject(params);
}
```