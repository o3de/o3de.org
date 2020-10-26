# Hosting a Session<a name="network-session-service-hosting"></a>

A session can be hosted by calling `IGridMate::HostSession()` after the session service has been started\. The session settings and configuration are set in the `GridMate::SessionParams` argument, which acts as a base class for certain implementations of `GridMate::SessionService.`


****  

| Implementation of `GridMate::SessionService` | Implementation of `GridMate::SessionParams` | 
| --- | --- | 
| GridMate::LANSessionService | GridMate::LANSessionParams | 

## GridMate::SessionParams<a name="network-session-service-hosting-gridmatesessionparams"></a>

The following table shows the supported parameters in `GridMate::SessionParams`\.


****  

| **Parameter** | **Required** | **Default** | **Description** | 
| --- | --- | --- | --- | 
| m\_localMember | Yes |  | This is not required for a LAN session, only for consoles\. | 
| m\_topology | No | ST\_PEER\_TO\_PEER | ST\_CLIENT\_SERVER: A client is only connected to the server\. ST\_PEER\_TO\_PEER: A client is connected to all other clients\. | 
| m\_peerToPeerTimeout | No | 10000 | The time without a response, in seconds, after which a peer is disconnected\. | 
| m\_numPublicSlots | Yes |  | The maximum number of players that can join the session\. | 

## GridMate::LANSessionParams<a name="network-session-service-hosting-gridmatelansessionparams"></a>

`GridMate::LANSessionParams` has the following additional parameter\.


****  

| **Parameter** | **Required** | **Default** | **Description** | 
| --- | --- | --- | --- | 
| m\_port | No | 0 | The port to monitor for search requests from other clients\. If 0, this session is hidden to searches\. Otherwise, the port number falls in the range from 1 through 65536\. | 

## Events<a name="network-session-service-hosting-events"></a>

The following table describes GridMate session service events\.


****  

| **Event** | **Description** | 
| --- | --- | 
| OnSessionCreated | A new session has just been created\. | 
| OnMemberJoined | A player has joined the session\. | 
| OnMemberLeaving | A player has left the session\. | 

## Examples<a name="network-session-service-hosting-examples"></a>

The following example hosts a session\. The example assumes that GridMate has been initialized and a session service registered\.

```
bool MyClass::HostSession()
{
    GridMate::IGridMate* gridMate = gEnv->pNetwork->GetGridMate();

    if(gridMate)
    {
        GridMate::LANSessionParams params;
        params.m_topology = Gridmate:ST_CLIENT_SERVER;
        params.m_numPublicSlots = 10;
        params.m_port = 10000;
        params.m_flags = 0;
        params.m_localMember = gridMate->GetOnlineService()->GetUser();

        GridMate::Session session = gridMate->HostSession(&params, GridMate::CarrierDesc());
        if(session != nullptr)
        {
            // Failed to create the session..
            return true;
        }
    }
    return false;
}
```