# One Definition Rule (ODR)

AZSLc will enforce One Definition Rule (ODR) through hard errors, on any declarative segment. 

Example:
```cpp
void G()
{
    int i, i;
}
```

This will give the following output. 
    /tmp/tmp-8761qOeVI0uo89CU(3,) : Semantic error #32: ODR (One Definition Rule) violation. Redeclaration of Variable i in /G()/ first seen line 3

## ODR in Unnamed scopes
Prior to AZSLc version 1.7, *unnamed blocks*, which are wrapped with curly braces, and *structured programming blocks*, such as `if` and `while`, did not introduce scopes. It would lead to an ODR violation warning. 

The following shows an example of an unnamed scope
```cpp
void G()
{
    int i;

    {              // unnamed scope
        int i;
    }
}
```

AZSLc version 1.7 introduces support for such constructs. The following shows two variables as denoted by the --dumpsym output. The block received a unique internal name of `$bk0` which effectively separates both `int i;` identities, 

```cpp
Symbol '/G()/i':
  kind: Variable
  line: 8
  type:
    core: {name: "?int", validity: found, tclass: Scalar, underlying_scalar: int}
Symbol '/G()/$bk0/i':
  kind: Variable
  line: 10
  type:
    core: {name: "?int", validity: found, tclass: Scalar, underlying_scalar: int}
```


