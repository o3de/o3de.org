# Calling a Game API<a name="cloud-canvas-cgf-service-api-calling-apis"></a>

To call your API operations, you can use C\+\+, the client component, a request job, or Lua\.

**Topics**
+ [Calling an API from C\+\+](#cloud-canvas-cgf-service-api-game-clients-calling-apis-c)
+ [Using Lua to Call an API](#cloud-canvas-cgf-service-api-game-clients-calling-apis-lua)

## Calling an API from C\+\+<a name="cloud-canvas-cgf-service-api-game-clients-calling-apis-c"></a>

To invoke a service API from C\+\+, you can use an EBus event handler from the generated client component\. You can also use the generated service request job class directly\. If you want to make requests from a component, consider using the client component\. If you want to perform a sequence of operations, consider using the job class\.

### Using the Client Component to Call an API<a name="cloud-canvas-cgf-service-api-game-clients-calling-apis-client-component"></a>

The following example from the `CloudGemLeaderboard` service API shows a component that invokes `GetServiceStatusRequestJob`\. There are two ways to receive the request's response:

1. Use an object that inherits from the service's response handler\.

1. Connect to the generated component's notification bus\.

The example shows both methods\.

```
// Sample API Caller 
#include <AzCore/Component/Component.h>
#include <AzCore/Component/Entity.h>
#include <AzCore/Serialization/EditContext.h>
#include <AzCore/Serialization/SerializeContext.h>
#include <AzCore/EBus/EBus.h>


#include <AWS/ServiceAPI/CloudGemLeaderboardClientComponent.h>
#include <CloudGemLeaderboard/CloudGemLeaderboardBus.h>
class SampleResponseHandler
    : public CloudGemLeaderboard::ServiceAPI::CloudGemLeaderboardResponseHandler
{
public:
    void HandleGetServiceStatusSuccess(CloudGemLeaderboard::ServiceAPI::GetServiceStatusRequestJob* job, AZ::Entity* entity) override
    {
        //Look at job->result for response data
        AZ_Printf("Got response: %s", job->result.status.c_str());
    }

    void HandleGetServiceStatusError(CloudGemLeaderboard::ServiceAPI::GetServiceStatusRequestJob* job, AZ::Entity* entity) override
    {
        //Look at job->error for error data
    }
};

class SampleAPICallerComponent
    : public AZ::Component
    , public CloudGemLeaderboard::ServiceAPI::CloudGemLeaderboardNotificationBus::Handler
{
public:
    SampleResponseHandler* m_responseHandler;
    AZ_COMPONENT(SampleAPICallerComponent, "{aedd6408-e2f0-4250-a181-b0ef41085a94}");
    virtual ~SampleAPICallerComponent() = default;
    static void Reflect(AZ::ReflectContext* reflection)
    {
        AZ::SerializeContext* serializeContext = azrtti_cast<AZ::SerializeContext*>(reflection);
        if (serializeContext)
        {
            // We must include any fields we want to expose to the editor or Lua in the serialize context
            serializeContext->Class<SampleAPICallerComponent>()
                ->Version(1);

            AZ::EditContext* editContext = serializeContext->GetEditContext();
            if (editContext)
            {
                editContext->Class<SampleAPICallerComponent>("SampleAPICallerComponent", "Component to call CloudGemLeaderboard GetServiceStatus")
                    ->ClassElement(AZ::Edit::ClassElements::EditorData, "")
                        ->Attribute(AZ::Edit::Attributes::AppearsInAddComponentMenu, AZ_CRC("Game"));
            }
        }
    }
    void Activate() override
    {
        CloudGemLeaderboard::ServiceAPI::CloudGemLeaderboardNotificationBus::Handler::BusConnect(m_entity->GetId());
        CallGetServiceStatus();
    }

    void CallGetServiceStatus()
    {
        // To get the response on the CloudGemLeaderboardNotificationBus
        EBUS_EVENT_ID(m_entity->GetId(), CloudGemLeaderboard::ServiceAPI::CloudGemLeaderboardRequestBus, GetServiceStatus, nullptr);
        // To get the response in a special response handler
        m_responseHandler = new SampleResponseHandler();
        EBUS_EVENT_ID(m_entity->GetId(), CloudGemLeaderboard::ServiceAPI::CloudGemLeaderboardRequestBus, GetServiceStatus, m_responseHandler);
    }

    void OnGetServiceStatusRequestSuccess(const CloudGemLeaderboard::ServiceAPI::ServiceStatus response) override
    {
        // handle success
        AZ_Printf("Got response: %s", response.status.c_str());
    }

    void OnGetServiceStatusRequestError(const CloudGemFramework::Error error) override
    {
        // handle failure
    }

    void Deactivate() override
    {
        CloudGemLeaderboard::ServiceAPI::CloudGemLeaderboardNotificationBus::Handler::BusDisconnect();
        delete m_responseHandler;
    }
};
```

### Using the Request Job to Call an API<a name="cloud-canvas-cgf-service-api-game-clients-calling-apis-request-job"></a>

In some situations you might want more control over how your background jobs are executed\. For example, you might want to change the thread pool that certain requests use or perform multiple requests on a background thread\. You can use the generated request job classes directly to make these changes\.

In its simplest form, you can use the request job class in the following example\. This is the same code that is in line 452 of the generated request component\.

```
PutAdminMessagesRequestJob* job = PutAdminMessagesRequestJob::Create(
    [responseHandler, this](PutAdminMessagesRequestJob* job)
    {
        // Handle success
        responseHandler->HandlePutAdminMessagesSuccess(job, m_entity);
    },
    [responseHandler, this](PutAdminMessagesRequestJob* job)
    {
        // Handle error
        responseHandler->HandlePutAdminMessagesError(job, m_entity);
    }
);
            
job->parameters.msg = msg;
job->parameters.msg_id = msg_id;
            
job->Start();
```

To learn about other ways to use the request job class, explore the `ServiceApiRequestJob` class definition and see [Running AWS API Jobs Using the Cloud Gem Framework ](cloud-canvas-cgf-aws-api-jobs.md)\.

## Using Lua to Call an API<a name="cloud-canvas-cgf-service-api-game-clients-calling-apis-lua"></a>

The following code example shows how to call a service API from a Lua script\.

```
-- Service status getter 
local leaderboardstatusgetter = {
    Properties = {
    }
}

function leaderboardstatusgetter:OnActivate()
    self.notificationHandler = CloudGemLeaderboardNotificationBus.Connect(self, self.entityId)
    CloudGemLeaderboardRequestBus.Event.GetServiceStatus(self.entityId, nil)
end

function leaderboardstatusgetter:OnDeactivate()
    self.notificationHandler:Disconnect()
end

function leaderboardstatusgetter:OnGetServiceStatusRequestSuccess(response)
    Debug.Log(response.status)
end

function leaderboardstatusgetter:OnGetServiceStatusRequestError(error)
    Debug.Log(error.message)
end

return leaderboardstatusgetter
```