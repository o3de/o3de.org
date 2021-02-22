# Function Declarations
Functions can be declared but not defined. They act similarly to a forward declaration. AZSLc will ignore repetitions of declarations. However, redefinition leads to an error. 

## Default parameter values
```cpp
void F(float F = 0.3f, int I);
void F(float f, int i = 6)
{
}
```

This is converted to the following HLSL code.

```cpp
void Func(float = 0.3f, int = 6);
void Func(float f, int i)
{
}
```

AZSLc performs a step called "Merge default parameters" at each encounter of a declaration for a given function. In the final emission, they are regenerated on the first appearance of the symbol.

The parameter names have been removed from the first re-emitted line, that's an artefact of an internal trick to avoid symbol collisions because they would end up with the same mangled name. This might lead to side effects as shown in the following example. 

```cpp
void Func(float F = 0.3f, int I);
static typeof(Func)::F g_f;
 
void Func(float F2, int I2)
{}
static typeof(Func)::F g_f2;
```

The compiler complains with the following warning: 
    /tmp/tmp-127915h0Nwkp0K0HE(7,22) : warning: undeclared sub-symbol in idexpression: F
    /tmp/tmp-127915h0Nwkp0K0HE(7,22) : warning: type tracking fail: F is not a member of /Func(?float,?int)

It produces the following HLSL. 
```cpp
void Func(float = 0.3f, int);
static float g_f;
void Func(float F2, int I2)
{}
static <fail> g_f2;
```

As you can see `/Func/F` got erased from the symbol table after the apparition of the final definition of the symbol `Func`. This is a rare occurrence of a destructive mutation on the symbol table. We try to avoid this mutation because the symbol table is supposed to be an immutable concept. Further code may never alter previous code. Since semantic checks happen simultaneously to that table's construction, they cannot be retroactively amended. Functions with named parameters which were declared early are the only known exceptions. 

