# Structs
Structs are a user-defined type and are used in a similar way as classes. They are defined by the keyword `struct`. Unlike classes, structs must be POD ([plain old data](http://wiki.c2.com/?PlainOldData)); they do not contain a constructor, destructor, or virtual member functions. Due to these limitations, structs offer better performance. One common use case for structs in AZSL is to group shader inputs and outputs. 

<!-- [NOTE TO DEVS: Do you have another concrete example for when structs are useful?] -->

## Nested Structures
In AZSL, it is possible to define a nested struct (or class). However, nested structs are not supported as vertex shader entry point input. Also, in Metal, nested structs are not supported in ConstantBuffers. 

<!-- [NOTE TO DEVS: I want to provide a useful example of nested structs. Can you suggest improvements to the sample below?] -->
Below is an example of a nested struct. 
```glsl
struct VSInput
{
    struct myColor {
        float r;
        float g;
        float b;
    } MyColor;

    MyColor color1;
    MyColor color1;
};
```