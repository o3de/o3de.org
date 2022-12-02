---
title: "Google Test Matchers - Part 2"
date: 2023-01-25
slug: google-test-matchers-part-2
author: Tom Hulton-Harrop
blog_img: "/images/blog/dev-series.JPG"
full_img: ""
---
# Google Test Matchers - Part 2

## Topic

Continuing the introduction to Google Test matchers. Please see [Part 1](/blog/posts/google-test-matchers-part-1/) for more information.

## Motivation

Shorter, clearer tests that take the boilerplate and fragility out of testing.

## Examples

### Math types

Matchers can be very useful when writing unit tests for math types (which nearly always require some sort of epsilon check). We know to use `EXPECT_NEAR` when testing floating point values but this can get unwieldy when working with vector or matrix types. We should not do this:

```c++
EXPECT_TRUE(positionA.IsClose(positionB))
```

If this test fails we get no useful output (what values were `positionA` and `positionB`?). We’d have to update the code or use the debugger to get any idea. If we’d instead written this:

```c++
EXPECT_THAT(positionA, IsClose(positionB))
```

Where `IsClose` is defined as:

```c++
MATCHER_P(IsClose, expected, "")
{
    if (arg.IsClose(expected))
    {
        return true;
    }

    return false;
}
```

If the test fails, the object will be printed to the test output. By default this is just the address of the object (e.g. `12-byte object <00-00 80-3F 00-00 80-3F 00-00 80-3F>`) but it’s possible to overload the `<<` operator for any custom type and now when the test fails you see a friendly human-readable value.

```c++
std::ostream& operator<<(std::ostream& os, const AZ::Vector3& vec)
{
    return os << "(X: " << vec.GetX() << ", Y: " << vec.GetY() << ", Z: " << vec.GetZ() << ")";
}

//outputs

Expected: is close (X: 2, Y: 2, Z: 2)
Actual: (X: 1, Y: 1, Z: 1).
```

(note: A lot of these already exist in `MathTestHelpers.h`)

### Collections of math types

Another very useful matcher is called `Pointwise` which can be used to provide a matcher for each element in a container.

```c++
EXPECT_THAT(actualPositions, Pointwise(ContainerIsClose(), expectedPositions));
```

Where `ContainerIsClose` is defined as:

```c++
MATCHER(ContainerIsClose, "")
{
    const auto& [expected, actual] = arg;
    if (expected.IsClose(actual))
    {
        return true;
    }
    return false;
}
```

We use a structured binding to extract the actual and expected value and then compare each in turn (`arg` is part of the `MATCHER` macro magic). This will work with any type that provides an `IsClose` member function so can be used with numerous `AZ` math types.

## Further Reading

There’s a great reference guide now available for Google Test that can be found here:

- [GoogleTest User’s Guide](https://google.github.io/googletest/)

It has lots of useful documentation and examples to get more acquainted with Google Test.

## To be continued...

In the last installment we’ll look a little more at writing our own matchers and some more examples of where matchers can save time and effort.

_Disclaimer: The views expressed here are those of the individual author and do not represent those of the Open 3D Foundation, Open 3D Engine or individual's respective company._
