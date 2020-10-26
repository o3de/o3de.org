# Searching for a Session<a name="network-session-service-searching"></a>

You search for a session by calling `GridMate::StartGridSearch()` after the session service has been started\. The session settings and configuration are set in the `GridMate::SearchParams`, which acts as a base class for certain implementations of `GridMate::SessionService`\.


****  

| Implementation of `GridMate::SessionService` | Implementation of `GridMate::SearchParams` | 
| --- | --- | 
| GridMate::LANSessionService | GridMate::LANSearchParams | 

## GridMate::SearchParams<a name="network-session-service-searching-gridmatesearchparams"></a>

The following table shows the supported parameters in `GridMate::SearchParams`\.


****  

| Parameter | Required | Default | 
| --- | --- | --- | 
| m\_localMember | Yes |  | 
| m\_maxSessions | No | 8 | 
| m\_timeOutMs | No | 2000 | 
| m\_version | No | 1 | 

## GridMate::LANSearchParams<a name="network-session-service-searching-gridmatelansearchparams"></a>

`GridMate::LANSessionParams` has the following additional parameters\.


****  

| Parameter | Required | Default | Description | 
| --- | --- | --- | --- | 
| m\_serverAddress | No | Empty | The address of a server to search for\. If empty, a broadcast address is used\. | 
| m\_serverPort | Yes |  | The port that game servers monitor for searches\. | 
| m\_broadcastFrequencyMs | No | 1000 | The interval, in milliseconds, between search broadcast requests\. | 

## Search Results<a name="network-session-service-searching-results"></a>

When a search is complete, the `OnGridSearchComplete()` event is called\. The results are found in the `GridMate::GridSearch` argument\.

`GridMate::GridSearch` contains an array of search results\.

To query the size of the array, use `GridMate::GridSearch::NumResults()`\.

To query individual results, use `GridMate::GridSearch::GetResult()`\.

The `GridMate::SearchInfo` object contains more details about the session \(for example, the number of used and free player slots\) and can be used when [Joining a Session](network-session-service-joining.md)\.

## Events<a name="network-session-service-searching-events"></a>

The following table describes GridMate session search events\.


****  

| Event | Description | 
| --- | --- | 
| OnGridSearchStart | A grid search has started\. | 
| OnGridSearchComplete | A grid search has finished and contains the results\. | 

## Examples<a name="network-session-service-searching-examples"></a>

The following example searches for all available sessions\. The example assumes that GridMate has been initialized, a session service has been registered, and the class `MyClass` is listening for session events\.

```
void MyClass::StartSearch()
{
    GridMate::IGridMate* gridMate = gEnv->pNetwork->GetGridMate();

    if(gridMate)
    {
        GridMate::LANSearchParams params;
        params.m_serverPort = 20000;
        params.m_localMember = gridMate->GetOnlineService()->GetUser();
        gridMate->StartGridSearch(&params);
    }
}

void MyClass::OnGridSearchComplete(GridMate::GridSearch* search)
{
    if(search->GetNumResults() > 0)
    {
        // Found sessions that match the specified criteria
    }
}
```