# Files to Exclude When Upgrading Lumberyard<a name="lumberyard-upgrading-excluded-files"></a>

When adding Lumberyard to source control, there are various files that you should exclude because they are generated, temporary, or programming\-specific\.

File types and folders in the entire repository to exclude
+ `*.ilk`
+ `*.suo`
+ `*.user`
+ `*.o`
+ `*.temp`
+ `*.bootstrap.digests`
+ `*.log`
+ `*.exp`
+ `*.vssettings`
+ `*.exportlog`
+ `*.mayaSwatches`
+ `*.ma.swatches`
+ `*.dds`
+ `*.bak`
+ `*.bak2`
+ `*.options`
+ `*.pyc`
+ `*.db`
+ `Solutions`
+ `BinTemp`
+ `Cache`

File types and folders in the `\dev\Code` directory to exclude\.
+ `SDKs`

File types and folders in each game folder \(SamplesProject, MultiplayerProject, and so on\) to exclude\.
+ Compiled assets
  + `*.dds`
  + `*.caf`
  + `*.$animsettings`
+ Editor backup files – `*.bak*`
+ Pak files that are exported from level files in the editor – `*.pak`