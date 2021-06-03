---
description: ' Follow this guide for the first steps to start using LyTestTools. '
title: Getting Started with LyTestTools
---

This guide outlines the first steps to start using LyTestTools. By the end of this guide, you will be ready to begin writing tests by following the LyTestTools - My First Test guide or to run tests by following the CTest documentation.

## Prerequisites ##

This guide requires you have completed the following:

 * [Getting Started](/docs/user-guide)
 * [Configure and build](/docs/user-guide/build/configure-and-build)

## Start Testing ##

Once you have the prerequisites finished, you should have everything for testing configured and ready. You can test this by running the following command. Replace [path_to_test_file] with the appropriate path to the test file and [path_to_build_output] with the appropriate path to the build output.

```shell
Tools\Python\python3.cmd -m pytest [path_to_test_file] --build-directory [path_to_build_output]
```

When your tools are ready, configured, and working, proceed to the next guide appropriate for you:

 * [LyTestTools - My First Test](/docs/user-guide/testing/lytesttools/my-first-test) to learn how to create your first tests with LyTestTools
 * Ctest - Running tests

Visit [PyTest framework](https://docs.pytest.org/en/latest/) for further information about the framework and how it helps in writing tests.

## Support ##

For additional questions and troubleshooting, please reach out in the sig-testing channel in the Open 3D Engine Foundation Discord.