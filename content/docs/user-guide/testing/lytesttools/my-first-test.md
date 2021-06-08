---
description: ' Follow these steps to write your first test in LyTestTools. '
title: My First Test
---

This guide will walk you through writing your first test with LyTestTools.

## Prerequisites ##

+ [Getting Started](/docs/user-guide/testing/lytesttools/getting-started)

## Example Test Code ##

We will be using an example test file to help familiarize you with the code, how its written, and how to utilize LyTestTools in writing test cases. Most of this guide will be driven by the provided example test and explore extra configuration options and setups for your tests. This example test file is located located in the following directory as part of your Open 3D Engine build:

```shell
~/Tools/LyTestTools/tests/example/tests/test_system_example.py
```

Helper functions and other useful code that you will see referenced can be found in the test_lib folder. This concept is demonstrated by an example located at:

```shell
~/Tools/LyTestTools/tests/example/test_lib/
```

After compiling the O3DE project, run the example test using the following command inside of your development path. Remember, we want to target Windows for our test even though it could support any platform:

```shell
~/python/python.cmd -m pytest ~/Tools/LyTestTools/tests/example/tests/test_system_example.py --build-directory [path_to_build_output]
```

Once you've got the example test working, you should try modifying it to add more capabilities.

## Further Reading ##

* https://automatetheboringstuff.com/ - This site is great for learning when to apply test automation and when not to.