# Function Declarations
Functions can be declared but not defined. Acting as a forward declaration of sorts.
AZSLc will ignore repetitions of declarations. But redefinition is an error (ODR).

## Default parameter values
```cpp
void F(float F = 0.3f, int I);
void F(float f, int i = 6)
{
}
```

This situation converts to the following HLSL. 


```cpp
void Func(float = 0.3f, int = 6);
void Func(float f, int i)
{
}
```