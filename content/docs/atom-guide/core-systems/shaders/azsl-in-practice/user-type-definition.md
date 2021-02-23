# User-Type Definition (UDT)
## Combined UDT definition and immediate usage
<!-- [WRITER NOTE: Reword] -->
note: UDT = User Defined Type

Code of this form may be used and is valid:
```cpp
struct S { int i; } var;   // declare variable named var of type S, and also define a new type S of kind struct with a member i
```
Such new type definition may be introduced where a type is expected, it is ill-formed in function parameters however:
```cpp
void func(struct S { int i; } param)    // Semantic error #40: introducing new type (S) within function arguments is ill-f
```