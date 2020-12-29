# CryAction Nodes<a name="ai-scripting-mbt-nodes-cryaction"></a>

These nodes provide MBT functionality for CryAction features\.

## AnimateFragment<a name="ai-scripting-mbt-nodes-cryaction-animatefragment"></a>

Plays a Mannequin animation fragment and waits until the animation finishes\. 

### Parameters<a name="ai-scripting-mbt-nodes-cryaction-animatefragment-parameters"></a>

**name**  
Name of the animation to play\.

### Success/Failure<a name="ai-scripting-mbt-nodes-cryaction-animatefragment-success"></a>

The node SUCCEEDS if the animation is correctly played or if no operation was needed\. The node FAILS if an error occurs while trying to queue the animation request\.

### Example<a name="ai-scripting-mbt-nodes-cryaction-animatefragment-example"></a>

```
<AnimateFragment name="SomeFragmentName" />
```