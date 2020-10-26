# Enabling Asset Processor's Faster Scanning Mode<a name="asset-processor-faster-scanning"></a>

Asset Processor's **Faster Scanning Mode** speeds up Lumberyard's startup scan by disabling checking for cache changes that occurred while Asset Processor was not running\. This can save you time when processing many assets in your project\.

By default, **Faster Scanning Mode** is enabled\. You can enable or disable this mode any time without restarting the Asset Processor, including during the scan\. Asset Processor saves your preference between sessions\.

**To disable Faster Scanning Mode**

1. Open [Asset Processor](asset-pipeline-processor.md)\.

1. Select **Tools** and clear **Faster Scanning Mode**\.   
![\[Disable Faster Scanning Mode in Asset Processor.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/asset_processor/faster-scanning.png)

**To perform a full scan**
+ Click **Start Scan**\. This starts a full scan immediately, which checks for files missing from the cache and rebuilds the appropriate source files\.

Asset Processor's batch version also supports a command line parameter for **Faster Scanning Mode**\.

```
AssetProcessorBatch.exe --zeroAnalysisMode
```

When you enable the feature you can also use console mode `stdout` as well as open GUI log windows that indicate the effectiveness of **Faster Scanning Mode**\. The output message displays the number of files that required full analysis and the total number of files\.

**Example**  

```
~~Debug~~5303 files reported from scanner.  2903 unchanged files skipped, 2400 files processed
```

For more information, see [Configuring the Asset Pipeline](asset-pipeline-configuring.md)\.

## Performing a Full Scan<a name="asset-processor-full-scan"></a>

When you choose a full scan, Asset Processor performs the following actions\. Low cost actions contribute to less than 1% of the total time\.
+ \(Low\) Determines which builders are responsible for building a file\. Asset Processor examines builder patterns, such as `*.tif` or `*.fbx` when they register\.
+ \(Low\) Lookup the file in the database to determine what happened to it the previous time\.
+ \(Low\) Compares the new job fingerprints to the previously emitted jobs to check for differences\.
+ \(Moderate\) Generates a job fingerprint that includes modtimes of source files and dependencies and the versions of the involved builders\.
+ \(High\) Checks the cache directory and ensures that every product that was emitted last time for this source file is still present\.
+ \(Very high\) Sends the file to the registered builders so that they can spawn jobs for the job queue\.

If all of the following are true for a given source file found during the scan, then that file can be excluded from reanalysis\.
+ The source file hasn't changed on disk \(it has the same modtime as previously\)\.
+ The files on which the source file depends haven't changed on disk \(it has the same modtime as previously\)\.
+ The builders assigned to that source file successfully processed it last time\. This means there were no failures or errors\.
+ The builders assigned to that source file didn't get a new version or a new analysis fingerprint\.
+ There are no new builders that may operate on that source file\.
+ There are no builders that were previously enabled which could have operated on that source file but have since been removed\.
+ There are no builders that have changed the set of source files\.

Asset Processor performs a check at the beginning of the scan and does the following actions\. These actions are low cost\.
+ \(Very low\) Collects modtime information for every file scanned as part of Asset Processor startup\.
+ \(Very low\) Checks whether the source file in question had any builders version change or analysis fingerprint by comparing the data from the previous time\.
+ \(Very low\) Compares the modtime with the previously recorded time in the database\.
+ \(Low\) Queries the database files table to get a list of every file and its modtime from previous runs\.
+ \(Low\) Queries the database sources table to get a list of every source asset and its builder\-fingerprint signature\.

If any of these checks fail, the source goes through the normal, unchanged analysis pipeline\. This means that **Faster Scanning Mode** makes no changes to the actual analysis\.