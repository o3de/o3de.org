# TPS Query Execution Flow<a name="ai-tactical-point-execution-flow"></a>

The following steps summarize the definition and execution stages of a TPS query\. Note that only stages 3 and 4 have a significant impact on performance\.

1. Parse query:
   + Parse query strings and values\.
   + This step is usually performed once and cached\.

1. Make query request:
   + Query is made using C\+\+, ScriptBind, goalops, etc\.
   + A query is stateless; it does not imply a movement operation\.

1. Generate points:
   + Create a set of candidate points\.
   + Point candidates are based on the query's Generation criteria\.

1. Evaluate points \(this is by far the most intensive stage\):
   + Accept or reject points based on Conditions criteria\.
   + Assign relative scores to points based on Weights criteria\.

1. Consider query fallbacks:
   + If no point matches the Conditions criteria, consider fallback options\.
   + Where there is a fallback, return to step 3\.

1. Visualize points:
   + If visualization is required, draw all points to screen\.
   + Include point data such as its accepted/rejected status and relative scores\.

1. Return results:
   + Return one or more points, if any fit the query conditions\.
   + Each point is returned as a structure that describes the selected point\.

There are some optimizations possible that depend on the execution flow\. For example, relevant query results can be cached between fallback queries\.