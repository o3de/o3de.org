---
title: "Google Test Matchers - Part 3"
date: 2023-02-08
slug: google-test-matchers-part-3
author: Tom Hulton-Harrop
blog_img: "/images/blog/dev-series.JPG"
full_img: ""
---
# Google Test Matchers - Part 3

## Topic

Wrapping up the introduction to Google Test matchers. Please see Parts [1](/blog/posts/google-test-matchers-part-1/) and [2](/blog/posts/google-test-matchers-part-2/) for more information.

## Motivation

Making use of helpful library features to improve the readability, succinctness and maintainability of our tests.

## Examples

### Custom Matchers

In [Part 2](/blog/posts/google-test-matchers-part-2/) we touched on writing our own custom matchers with certain math types but didn’t really explain them. In this entry we’ll look a bit closer at what’s required.

To define a custom matcher, the `MATCHER` macro provided by the Google Test Matchers library must be used. The first parameter is the name of the matcher and the last parameter is the string to use for when the test fails. If this is left empty a formatted version of the matcher name will be used instead.

```c++
MATCHER(AnswerToTheUltimateQuestion, "") { return arg == 42; }

EXPECT_THAT(5, AnswerToTheUltimateQuestion());

// gives

Expected: answer to the ultimate question
Actual: 5
```

Whereas we could have written this:

```c++
MATCHER(
    AnswerToTheUltimateQuestion, "Answer to the ultimate question of life, the universe and everything")
{
    return arg == 42;
}

EXPECT_THAT(43, AnswerToTheUltimateQuestion());

// gives

Expected: Answer to the ultimate question of life, the universe and everything
Actual: 43
```

From the snippets above we can see `arg` corresponds to the value provided to the matcher from the `EXPECT` call. There are several _overloads_ of `MATCHER` that control how many parameters the matchers can take (`MATCHER_P` accepts one additional parameter, `MATCHER_P2` accepts two and so on...). These named parameters can then be used in the body of the matcher, for example:

```c++
MATCHER_P2(InsideRadius, center, radius, "Point to be inside radius") {
    *result_listener << "is outside radius of " << radius << ", distance is " << arg.GetDistance(center);
    return arg.GetDistance(center) < radius;
}

EXPECT_THAT(AZ::Vector3(10.0, 0.0, 0.0), InsideRadius(AZ::Vector3(0.0, 0.0, 0.0), 5.0));

// gives

Value of: AZ::Vector3(10.0, 0.0, 0.0)
Expected: Point to be inside radius
Actual: AZ::Vector3(10, 0, 0) (of type AZ::Vector3), is outside radius of 5, distance from center is 10
```

Above we create a special purpose matcher for checking if a point is inside a given radius. It’s a toy example and isn’t something we might do all the time but it can be used very effectively in certain situations. By using `result_listener` we can append additional information to the failure to give more context when things go wrong.

## Conclusion

In this series we’ve been focused primarily on matchers in the context of Google Test, but there’s a plethora of features we haven’t touched on that dovetail nicely with what we’ve learnt. Both mocks and parameterized tests can be incredibly useful when it comes to writing concise tests. These may well be a subject of a future ly-goodreads article.

_Disclaimer: The views expressed here are those of the individual author and do not represent those of the Open 3D Foundation, Open 3D Engine or individual's respective company._
