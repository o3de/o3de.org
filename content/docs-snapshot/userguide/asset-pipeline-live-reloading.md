# Live Reloading and VFS<a name="asset-pipeline-live-reloading"></a>

On the PC platform, live reloading does not require virtual file system \(VFS\), since the PC that is running the game is presumably also running the Asset Processor\.

On non\-PC platforms, VFS is required for live reloading to work, because otherwise assets would need to be deployed onto the game device as part of live reloading, incurring platform\-specific costs and different asset pipelines\. VFS enables the same behavior across all platforms using the same workflow\. For debugging purposes, you can also enable VFS on a PC and point it at a remote Asset Processor to serve assets\.

To enable VFS, you use the `bootstrap.cfg` configuration file\.

The game runtimes and all tools can communicate with the Asset Processor through simple interfaces\. Communication involves the following:
+ Notification when assets are built and change, so as to reload them if possible\.
+ Request an immediate compilation of an asset, blocking until processing has completed\.
+ Request asset status, blocking until the status is known\.
+ Query the location of an asset source file, given an asset ID\.
+ Query the destination asset ID, given an asset source file name and path\.

Not all asset types can live reload\. If you are developing new asset types, keep the following guidelines in mind:
+ When an asset loads, be prepared to substitute it for a temporary asset while it is compiling\.
+ If an asset is missing, query the status of the asset from the Asset Processor\. This can determine whether the asset really is missing or whether it is in the queue for processing\. Querying also moves the asset to the front of the queue for processing\.
+ If your asset is essential and it cannot live reload, use the blocking synchronous asset build request to make it build immediately\. This moves the asset to the front of the queue and prevents the call from returning until the asset is compiled\. 
+ Do not discard the original requested name when an asset is missing\.
+ Connect to the notification bus to learn when assets change and reload them when that happens\.