# Individual AI: Tactical Points<a name="ai-concepts-example-dynamic-tactical-points"></a>

**Example: A very shy civilian who always wants to hide from the player**
+ Tactical point system \(TPS\) query:

  ```
  AI.RegisterTacticalPointQuery({
      Name = "Civilian_HideFromEnemy",
      {
          Generation =
          {
              cover_from_attentionTarget_around_puppet = 25
          },
              Conditions =
          {
              reachable = true,
          },
          Weights =
          {
              distance_from_puppet = -1,
          },
      },
  });
  ```
+ Useful AI debug draw: 
  + ai\_DebugTacticalPoints=1
  + ai\_StatsTarget=Grunt1
  + ai\_TacticalPointsDebugTime=10
+ For more realism, add the following before goalop TacticalPos:

  ```
  <Speed id="Sprint"/>
  ```