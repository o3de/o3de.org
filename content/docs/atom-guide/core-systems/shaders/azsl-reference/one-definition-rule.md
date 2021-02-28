# One Definition Rule (ODR)

AZSLc enforces One Definition Rule (ODR), meaning objects must have only one definition in the whole program. 

For example, in the following code, `i` is defined multiple times and leads to a compilation error. 
```cpp
void G()
{
    int i, i;
}
```

AZSLc outputs the following error. 
```
/tmp/tmp-8761qOeVI0uo89CU(3,) : Semantic error #32: ODR (One Definition Rule) violation. Redeclaration of Variable i in /G()/ first seen line 3
```