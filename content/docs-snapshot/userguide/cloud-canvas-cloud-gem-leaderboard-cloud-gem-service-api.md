# Leaderboard Cloud Gem Service API<a name="cloud-canvas-cloud-gem-leaderboard-cloud-gem-service-api"></a>

The following table lists the service API calls for the Leaderboard Cloud Gem\.


****  

| API | Verb | Description | 
| --- | --- | --- | 
| /score | POST |  Submits a new score\. Expects a payload including `user`, `value`, and `stat` fields\. Returns the updated score for that statistic\. The updated score returned is not necessarily the score that was submitted\. This operation is player callable\.  The leaderboard can store integer scores up to the maximum integer value or decimal scores up to `1e+20`\.   | 
| /score/\{stat\}/\{player\} | GET | Gets a specific score for the provided player\. This operation is player callable\. | 
| /score/\{stat\}/\{player\} | DELETE | Deletes a specific score for the provided player\. | 
| /scores/\{player\} | GET | Gets all scores \(multiple statistics\) for the provided player\. This operation is player callable\. | 
| /stats | GET | Lists all valid statistics that are registered with the leaderboard\. | 
| /stats | POST | Register a new statistic\. Expects a payload with name, and mode fields\. The min and max fields are optional\. Returns the list of all valid statistics\. | 
| /stats/\{stat\_name\} | DELETE | Deletes the specified statistic definition\. Returns the list of all valid stats\. | 
| /player/ban\_list | GET | Lists all the banned players\. | 
| /player/ban/\{player\} | POST | Bans the specified player\. | 
| /player/ban/\{player\} | DELETE | Lifts the ban on the specified player\. | 
| /leaderboard/\{stat\} | POST | Takes an optional payload that expects a users field\. The users fields is a list of the user IDs to include in the leaderboard sample\. Returns a leaderboard sample for the provided statistic with estimated ranks\. This operation is player callable\. | 