---
description: ' Use the auto-disable feature in Amazon Lumberyard to control updates. '
title: Auto-Disable
---
# Auto\-Disable {#ai-auto-disable}

 You can save CPU time by not updating distant AI agents\. Use the auto\-disable feature to controlled updates either on a per\-AI basis or globally\.

## Global auto\-disable {#ai-auto-disable-global}
+ To control auto\-disable for all vehicles: use the console variable `v_autoDisable`\.
+ To control auto\-disable for all AI agents: use the console variable `ai_UpdateAllAlways`\.

## Per\-AI auto\-disable {#ai-auto-disable-perAI}

Per\-AI auto\-disable is controlled by the entity property AutoDisable\. You can also change this property \(and behavior\) at run time\.
+ C\+\+: `pAIActorProxy->UpdateMeAlways(true);`
+ Lua: `AI.AutoDisable(entity.id, 1);`