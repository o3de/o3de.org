# Network Session Service Event Descriptions<a name="network-session-service-events-descriptions"></a>

A description of each session event follows\.

**`virtual void OnSessionServiceReady()`**  
Callback that occurs when the session service is ready to process sessions\.

**`virtual void OnGridSearchStart(GridSearch* gridSearch)`**  
Callback when a grid search begins\.

**`virtual void OnGridSearchComplete(GridSearch* gridSearch)`**  
Callback that notifies the title when a game search query is complete\. 

**`virtual void OnGridSearchRelease(GridSearch* gridSearch)`**  
Callback when a grid search is released \(deleted\)\. It is not safe to hold the grid pointer after this event\.

**`virtual void OnMemberJoined(GridSession* session, GridMember* member)`**  
Callback that notifies the title when a new member joins the game session\.

**`virtual void OnMemberLeaving(GridSession* session, GridMember* member)`**  
Callback that notifies the title that a member is leaving the game session\.   
The member pointer is not valid after the callback returns\.

**`virtual void OnMemberKicked(GridSession* session, GridMember* member)`**  
Callback that occurs when a host decides to kick a member\. An `OnMemberLeaving` event is triggered when the actual member leaves the session\.

**`virtual void OnSessionCreated(GridSession* session)`**  
Callback that occurs when a session is created\. After this callback it is safe to access session features\. The host session is fully operational if client waits for the `OnSessionJoined` event\.

**`virtual void OnSessionJoined(GridSession* session)`**  
Called on client machines to indicate that the session has been joined successfully\.

**`virtual void OnSessionDelete(GridSession* session)`**  
Callback that notifies the title when a session is about to be terminated\.  
The session pointer is not valid after the callback returns\.

**`virtual void OnSessionError(GridSession* session, const string& errorMsg )`**  
Called when a session error occurs\.

**`virtual void OnSessionStart(GridSession* session)`**  
Called when the game \(match\) starts\.

**`virtual void OnSessionEnd(GridSession* session)`**  
Called when the game \(match\) ends\.

**`virtual void OnMigrationStart(GridSession* session)`**  
Called when a host migration begins\.

**`virtual void OnMigrationElectHost(GridSession* session,GridMember*& newHost)`**  
Called to enable the user to select a member to be the new Host\.  
The value is ignored if it is null, if the value is the current host, or if the member has an invalid connection ID\.

**`virtual void OnMigrationEnd(GridSession* session,GridMember* newHost)`**  
Called when the host migration is complete\.

**`virtual void OnWriteStatistics(GridSession* session, GridMember* member, StatisticsData& data)`**  
Called at the last opportunity to write statistics data for a member in the session\.