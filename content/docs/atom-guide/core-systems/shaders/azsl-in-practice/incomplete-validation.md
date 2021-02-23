# Incomplete Validation
<!-- [WRITER NOTE: Reword] -->
AZSLc will do some validation, sometimes stricter than DXC, but it will certainly not enforce all of HLSL rules. This is by design to keep it flexible and tolerant of future changes in HLSL down the build chain. Also to limit the amount of responsibility we bear, and need to maintain.
Example:
```cpp
void f()
{
    if (false)
    {
        int i;
    }
    ++i;   // this is not an error in AZSL but it prints a warning of level 3 (undeclared sub-symbol in idexpression)
}
```


