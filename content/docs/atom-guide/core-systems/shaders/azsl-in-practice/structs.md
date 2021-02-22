# Nested Structures

In AZSL it is possible to use nested struct or class because it is supported in dxc. However, we are not bound by the features or limitations of the platform compiler. Nested structs are not supported as vertex shader entry point input. In Metal, nested structs are also not supported in ConstantBuffers. 

# struct vs. class
AZSL supports both `struct` and `class`. A struct must be POD (plain old data -- a fundamental type, pointer, union, struct, array, or class awithout a constructor). On the other hand, a class can have object-oriented features and methods. Classes can also inherit multiple interfaces and class-to-class inheritance is allowed. 