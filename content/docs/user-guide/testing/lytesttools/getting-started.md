---
description: ' Follow this guide for the first steps to start using LyTestTools. '
title: Getting Started with LyTestTools
---

This guide outlines the first steps to start using LyTestTools. By the end of this guide, you will be ready to write and run tests.

## Prerequisites

This guide requires that you've completed the following:

 * [Open 3D Engine - Getting Started](/docs/user-guide)
 * [Configure and Build](/docs/user-guide/build/configure-and-build)

## Start Testing

Once you have the prerequisites finished, you should have everything for testing configured and ready. You can verify this by running the following command. 

```shell
~/python/python -m pytest <path_to_test_file> --build-directory <path_to_build_output>
```

Open 3D Engine ships with a sample test that demonstrates the use of `LyTestTools`, located in the `Tools/LyTestTools/tests/integ/sanity_tests.py` file. After compiling O3DE, you can run the sample test against your build output with the following command (run from your O3DE directory):

```shell
python -m pytest Tools/LyTestTools/tests/integ/sanity_tests.py --build-directory <cmake-build-directory>
```

## More Information

* [PyTest framework](https://docs.pytest.org/) - Information about the framework used by LyTestTools and how it helps with writing tests.
