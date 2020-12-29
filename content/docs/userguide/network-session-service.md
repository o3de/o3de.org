# Sessions<a name="network-session-service"></a>

GridMate session service provides session connectivity and management\. Both hub\-and\-spoke \(client/server\) and P2P full\-mesh topologies are supported\.

You can also create multiple sessions for each GridMate instance\. Each session creates its own carrier and replica manager instances, so there is no interaction between sessions\. GridMate sessions support host migration when running in P2P mode\.

**Topics**
+ [Starting and Stopping the Session Service](network-session-service-start-stop.md)
+ [Hosting a Session](network-session-service-hosting.md)
+ [Searching for a Session](network-session-service-searching.md)
+ [Joining a Session](network-session-service-joining.md)
+ [Reacting to Session Events](network-session-service-events.md)