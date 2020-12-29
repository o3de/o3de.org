# Leaderboard Cloud Gem Resources<a name="cloud-canvas-cloud-gem-leaderboard-resources"></a>

The following table lists the resources used by the Leaderboard Cloud Gem\.


****  

| Resource | Description | 
| --- | --- | 
| BannedPlayerTable | A list of players that are no longer allowed to submit scores\. | 
| LeaderboardInfo | Information for each statistic about the state of the leaderboard, including population and maximum sample size\. | 
| LeaderboardTable | A table that contains a set of scores for each statistic\. The set is a sample gathered using a [reservoir sampling method](https://en.wikipedia.org/wiki/Reservoir_sampling)\. The sets are used to estimate where an arbitrary player's score sits within the entire population\. This allows the cloud gem to estimate global rankings\. | 
| MainTable | The main database for scores\. Entries are keyed on userID with a score attribute for each metric\. This table allows you to gather the most up\-to\-date information on a specified set of players\. | 
| RecordsBucket | An Amazon S3 bucket that holds all the records written by ScoreStreamReader\. | 
| RecordSetProcessor | A Lambda function that reads through all pending records and decides whether the samples on LeaderboardTable need to be updated\. This Lambda function is triggered by the timer RecordSetProcessorSchedulerRule that has a default of 10 minutes\. | 
| RecordSetStatus | A table that keeps track of the status of all record sets\. Sets can be OPEN \(accepting new records\), PENDING \(not accepting records, to be processed soon\), or CLOSED \(processed, waiting for cleanup\)\. The information in RecordSetStatus determines which record set RecordSetProcessor processes and where ScoreStreamReader puts its next record\. | 
| ScoreStreamReader | A Lambda function triggered by DynamoDB updates to MainTable\. Writes records to the Amazon S3 RecordsBucket for later processing\. | 
| StatsSettings | A table that specifies how to process specific statistics from submissions\. Holds minimum and maximum values for each statistic and specifies whether it is to be overwritten or incremented on submission\. | 
| UserIdentityMap | Maps user IDs to Amazon Cognito IDs to ensure that scores can't be submitted on another player's behalf\. After an ID is used for the first time, it is maintained by the Amazon Cognito ID\. | 