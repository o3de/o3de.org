# Debugging Lua Scripts<a name="lua-scripting-ces-debugging-scripts"></a>

Lumberyard provides Lua scripts with several functions to make debugging easier\.

## Logging to the Console<a name="lua-scripting-ces-logging-to-the-console"></a>

To print text to Lumberyard Editor and the game console, use the `Debug.Log()` function\.

The following example shows the use of the `Debug.Log()` function\.

```
local LoggingTest = { }
function LoggingTest:OnActivate()
    componentName = "MyComponent"
    Debug.Log(componentName .. " has been activated.")
end

return LoggingTest
```

## Using an Assert to Detect Potential Issues<a name="lua-scripting-ces-using-an-assert-to-detect-potential-issues"></a>

You can use the `assert` function to display an error message in the console when conditions are detected that might result in an execution fault\. The `assert` function takes two arguments: a condition that evaluates to true or false, and a message to display if the condition is false\.

The following example shows the use of the `assert` function\.

```
function SampleScript:DoStuff()
    -- This value should never be negative
    assert( self.positiveValue >= 0, "Expected a positive value! Got: " .. self.positiveValue )
end

-- Console output when the value of self.positiveValue is -5:
-- [Error] Lua error (2 - [string "q:/lyengine/branches/systems/dev/samplespro..."]:61: Expected a positive value! Got: -5) during call samplescript:DoStuff
```

## Communicating Errors<a name="lua-scripting-ces-communicating-errors"></a>

You can use the `Debug.Error()` function to display an error in the console and halt execution of the current script function\. This does not halt all execution of the script\. If you have active handlers, they can still be called when the engine posts notifications\. The `Debug.Error()` function takes arguments similar to the `Debug.Assert` function: a condition and a message\. The message is displayed in bright red and execution halts only if the condition is false\.

The following example shows the use of the `Debug.Error()` function\.

```
function SampleScript:CheckAndError()
    -- This value should never be negative
    Debug.Error( self.positiveValue >= 0, "Detected a negative value: " .. self.positiveValue )
end

-- Console output when the value of self.positiveValue is -5:
-- [Error] Error on argument 0: Detected a negative value: -5
```

## Displaying a Warning When User Attention Is Required<a name="lua-scripting-ces-displaying-a-warning"></a>

A script condition can occur that does not adversely affect the execution of the script but might be useful for the user to know about\. The `Debug.Warning()` function uses arguments similar to those of the `Error` and `Assert` functions but just displays an orange warning message in the console\. It does not halt execution\.

The following example shows the use of the `Debug.Warning()` function\.

```
function SampleScript:CheckValue()
    -- This value should probably never be negative
    Debug.Warning( self.positiveValue >= 0, "Detected a negative value: " .. self.positiveValue )
end

-- Console output when the value of self.positiveValue is -5:
-- [Warning] Warning on argument 0: Detected a negative value: -5
```