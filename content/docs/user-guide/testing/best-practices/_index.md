---
linkTitle: Best Practices
title: Test Automation Best Practices
description: Advice for automating tests in Open 3D Engine (O3DE).
toc: true
weight: 600
---

This page provides advice on how many independent developers can efficiently maintain the **Open 3D Engine (O3DE)** with automated tests. The advice applies to teams using O3DE who write their own automation and anyone contributing to O3DE. This document does not serve as an exhaustive source of testing advice. It instead provides baseline definitions and heuristics for investing in test automation. Each concept only serves as a brief introduction; you can find numerous in-depth articles on testing best practices in other sources.

## Practices to avoid

### I/O

File access, device input, and network communication are slow operations that can create complex software and hardware dependencies. Tests performing I/O often encounter race conditions such as parallel contention. Prefer configuring mock implementations of I/O interfaces and using in-memory buffers to simulate actual input and output behavior.

### Sleep

Do not rely on `this_thread::sleep` or `time.sleep` in tests. Be immediately suspicious if you notice a sleep in a pull request. Some quick facts:

* Tests relying on sleeps are naturally slow; yielding control to the underlying OS scheduler and returning control is a slow operation.
  * Latency depends on the specific device and can still fluctuate with its physical and digital hardware state.
* Passing a duration to a sleep function requests a *minimum* time the thread should be suspended, not an exact time it will resume.

{{< caution >}}
Avoid invoking sleep in any code; it is almost never the correct tool!
{{< /caution >}}

What are the alternatives?

* If you need to wait for a long-running operation, consider using `AZStd::binary_sempahore` or `AZStd::condition_variable` (semaphore preferred for simplicity) to block until the long-running operation is done.
* If you need to test some time-dependent functionality and advance time, expose the ability to advance time programmatically:
  * It avoids relying on OS performance counters.
  * It allows for more accurate simulation control while testing.
* If you need Python to block until a condition is met, try `ly_test_tools.environment.waiter.wait_for(boolean_function)`.
* If you need to synchronize Python and C++ code inside the O3DE Editor, prefer `azlmbr.legacy.general.idle_wait_frames` over `idle_wait_seconds`.

### Nondeterminism

Tests must minimize random behavior. Test failures should demonstrate obvious and deterministic flaws in a feature. Features should be able to isolate their sources of nondeterminism, allowing tests to bypass or control randomness.

When production code depends on randomness or other nondeterministic behavior:

* Expose an interface to set the seed for the random generator or to provide a different generator.
* Expose the ability to advance through steps programmatically, such as a timestep.
* Create interfaces between deterministic and nondeterministic code
  * Using interfaces, tests can then configure mock dependencies and only verify deterministic code

Tests should have specific expectations, which are declared before the test executes. Tests should never dynamically set expectations, such as fetching a "correct" value from the production code or a network call. Tests should not use randomness.

{{< note >}}
When you don't know what boundaries to check, *Fuzz Tests*, which randomly search different values can be a useful design tool. However, since these tests are unspecific and inefficient, avoid checking them in. Use Fuzz Testing as a precursor to writing specific deterministic tests.
{{< /note >}}

### Platform-specific tests

The majority of code and tests in O3DE should be written to be cross-platform. Platform-specific production code should use the Platform Abstraction Layer (PAL) pattern. Tests should then rely on their production code to use PAL to provide the same functionality across different environments.

A test that must target platform-specific behavior should conditionally disable itself when that dependency is unavailable. Tests ***should AVOID*** performing conditional steps based on their environment, as this makes "the same test" significantly more difficult to investigate when it automatically behaves differently on different machines.

### Negative assertions

Tests should positively verify an expected result instead of trying to confirm that "no bad side-effects" occurred. Failing to do so creates a problem because, unlike the positively-verified result, the set of all potential incorrect results is effectively infinite. Consider the following code:

```cpp
int Math::FastSquare( const int number )
{
    return number + number; // bug!
}
```

```cpp
TEST(MathTests, FastSquare_Integer_Squared)
{
    //act
    int result = Math::FastSquare(10);
    //assert
    EXPECT_NE(result, 0);
    EXPECT_NE(result, -1);
    EXPECT_NE(result, 10);
}
```

The example above contains a bug where the code under test does not actually compute the square of a number. The test correctly verifies the computation is not equal to a few values known not to be the square of 10. However, it never attempts to identify the correct answer. Due to this, the test cannot catch the bug!

{{< note >}}
Negative assertions are different from negative test cases. A negative test case should set up an error-scenario, and then positively identify that one correct error-response is emitted. Negative cases should also avoid negative assertions.
{{< /note >}}

It can be okay to include negative assertions when there is also at least one positive assertion, but they should not be relied on alone. Focus on identifying the expected output.

### Disabling and skipping tests

Ideally, all automated test failures prompt immediately fixing the broken feature, or updating the test when underlying expectations have changed. However, sometimes a tradeoff must be made that breaks a feature to enable other functionality. In a case where functionality is known to be broken, automated tests can be temporarily "skipped" or disabled.

Avoid immediately disabling tests when you see a failure. First consider what action the failure blocks, and how critical it is to unblock. Compare that with the risk tradeoff from all contributors ignoring all future bugs the test could catch.

Whenever a test provided with O3DE gets disabled, please [create an issue](https://github.com/o3de/o3de/issues/new/choose) to track fixing the feature and re-enabling the test.

## Practices to remember

### Insanity checks

Ensure a new test is configured to run and report failures by temporarily editing the production code. Intentionally break the code in one way that the test should detect, and then run the test suite. If no failure occurs, investigate why!

{{< caution >}}
Immediately revert any intentionally broken code, after verifying that the failure can be detected by the test.
{{< /caution >}}

### Floating-point assertions

Floating-point numbers have problems expressing exact equality, as two floats can represent the "same" value but have slightly different rounding errors. Test frameworks provide special assertions that already account for many common issues:

* C++ distinguishes between floats and doubles since they are assessed differently `EXPECT_FLOAT_EQ(val1, val2)` and `EXPECT_DOUBLE_EQ(val1, val2)`.
  * Custom error tolerance can also be provided to `EXPECT_NEAR(val1, val2, abs_error)`.
* Python only has one floating point primitive, which is easily checked with `assert val1 == pytest.approx(val2)` or `unittest.assertAlmostEqual(val1, val2)`
  * In-editor Python tests interacting with C++ code can call `azlmbr.math.Math_IsClose(val1, val2, tolerance)`.

### Assertion messages

By default, test assertions output a terse message about the compared values. Add a human-readable message to help someone quickly understand a future failure. Assertion messages can also include information about other variables to assist in debugging:

```cpp
TEST(WaterTests, LeakChecker_WaterAdded_DoesNotLeak)
{
    // (arrange and act omitted to focus on the assert below)
    EXPECT_LE(difference, 0) << "Unexpectedly leaked " << difference << " units of Water from " << target.m_waterContainers;
}
```

```python
def test_LeakChecker_WaterAdded_DoesNotLeak():
    # (arrange and act omitted to focus on the assert below)
    assert difference <= 0, f"Unexpectedly leaked {difference} units of Water from {target.water_container_dict}"
```

### Hard-coding helps

Tests should clearly declare their own ground truth that they expect to verify. To keep a test simple and legible, prefer directly using hard-coded values over values obtained from another file or function. Reducing complexity in this way also reduces the chance of accidentally creating an incorrect assumption. Consider the following example code:

```cpp
int Math::FastSquare( const int number )
{
    return number + number; // bug!
}
```

```cpp
// This other file contains hard-coded versions of invalid data
enum PrecomputedSquares
{
    pcs_one = 2;
    pcs_two = 4;
    // ...
    pcs_ten = 20;
}
```

```cpp
int CalculateTestSquare( const int number)
{
    return number + number;
}

TEST(MathTests, FastSquare_Integer_Squared1)
{
    // Assumes the function is correct, thus only proves an identity property
    int tenSquared = Math::FastSquare(10);
    int result = Math::FastSquare(10);
    ASSERT_EQ(result, tenSquared);
}

TEST(MathTests, FastSquare_Integer_Squared2)
{
    // Relies on a duplicate implementation of the production code that contains
    // the same bug, thus only proves the production bug was not changed
    int tenSquared = CalculateTestSquare(10);
    int result = Math::FastSquare(10);
    ASSERT_EQ(result, tenSquared);
}

TEST(MathTests, FastSquare_Integer_Squared3)
{
    // Uses incorrectly computed squares from another file, thus only
    // proves the production bug was not changed
    int result = Math::FastSquare(10);
    ASSERT_EQ(result, pcs_ten);
}

TEST(MathTests, FastSquare_Integer_Squared4)
{
    // directly states that 10^2 = 20, which is incorrect but also *easy to notice*
    int tenSquared = 20;
    int result = FastSquare(10);
    ASSERT_EQ(result, tenSquared);
}

TEST(MathTests, FastSquare_Integer_Squared5)
{
    // tersely verifies 10^2 results in 20, which is incorrect but should be *easy to notice*
    ASSERT_EQ(FastSquare(10), 20);
}
```

The incorrect math of the production code is trusted in every test above; all tests will pass! Each test is written incorrectly, in different ways, where the bug cannot be caught. The first test ends up only checking the identity property. No matter how the code is changed, it will only ever verify the code returns the same value. The second test duplicates the production code, which will become an annoying pattern to maintain as the code changes in complex ways. The third test uses a static value but hides it in an enum in another file. However, since the fourth and fifth tests hard-code the expectation, it is easier to see the error. Avoid burying assumptions in other files and functions.

## Sizes of automated tests in O3DE

Size (or scope) is one of the more useful ways to classify a test. When automating tests, prefer writing many small tests over writing fewer, larger tests. Larger tests take more initial effort to write and continuously consume magnitudes more time to execute and debug. If you can catch an issue with a smaller test, write the smaller test!

### Unit tests

The most straightforward automated tests are unit tests. Unit tests have a very simple mantra: **One input, one call, one output**

The purpose of a unit test is to be small, specific, and fast. They are easy to run, and when they fail, it tends to be easy to determine why. This ease of use primarily comes from the "one call" aspect. Different interactions are treated as additional tests rather than different steps within the same test with a more extended workflow. Think of a unit test as creating an extremely simple robot that quickly reports if one specific behavior breaks. Each robot allows the author to reduce expending mental resources worrying about a design concern. It also documents and monitors that concern for anyone unfamiliar with the area. This allows developers to focus on changing production code while trusting their robots will efficiently help them detect and debug issues as they get introduced. Consider unit tests when writing code intended to exist for more than a week.

A good pattern to follow when writing unit tests is ***Arrange, Act, Assert***:

1. Set up your environmental state (Arrange)
2. Call the function under test (Act)
3. Verify the expected side effects occurred (Assert)

This simple structure leads to short, focused tests which are easy to understand. Below is a simple example in C++:

```cpp
TEST(VectorTests, PushBack_ContainsTwoItems_ThreeTotalItems)
{
    std::vector<int> testVector {1, 2};  // Arrange
    testVector.push_back(3);             // Act
    EXPECT_EQ(3, testVector.size());     // Assert
}
```

The test above verifies that adding one item to a vector that already had two items results in the vector reporting that it has three items. Here is a similar example in Python:

```python
def test_ListAppend_ContainsTwoItems_ThreeTotalItems(self):
    testList = [1, 2]          # Arrange
    testList.append(3)         # Act
    assert 3 == len(testList)  # Assert
```

Note that neither of the preceding tests are good candidates to include with O3DE, as they test the behavior of non-O3DE libraries (STL containers and Python built-ins). External dependencies should have their own automated tests that live in their own projects. When writing a unit test, focus on one specific behavior of *your* code. Here are real-world examples of O3DE's unit tests in [C++](https://github.com/o3de/o3de/blob/development/Code/Framework/AzCore/Tests/Geometry2DUtils.cpp) and [Python](https://github.com/o3de/o3de/blob/development/Tools/LyTestTools/tests/unit/test_codeowners_hint.py). These tests take milliseconds to verify automatically!

### Integration tests

Integration tests are the next level up after unit tests. These higher-order tests focus on interactions between multiple components and dependencies. Integration tests cover a slightly wider workflow, though they are exponentially broader in scope and far more sensitive to changes across the codebase. This means that they can catch many bugs, which is both a benefit and a drawback. The main drawbacks come from how slow these tests can be to run and debug. When a test chains multiple calls and verifications interacting with different concerns, any test failures will provide a more complex debugging experience.

Integration tests are helpful for areas of critical functionality and for detecting failures that unit tests cannot catch. As code approaches major functional milestones, add or update integration tests. As you identify features that emit many bugs, consider adding integration tests to detect issues quicker. If you find an integration test frustrating to investigate and debug, consider changes to the underlying feature and its unit tests.

Here are real-world examples of O3DE's integration tests in [C++](https://github.com/o3de/o3de/blob/development/Gems/EMotionFX/Code/Tests/MotionEventTrackTests.cpp) and [Python](https://github.com/o3de/o3de/blob/development/AutomatedTesting/Gem/PythonTests/largeworlds/dyn_veg/EditorScripts/RotationModifierOverrides_InstancesRotateWithinRange.py), which each require examining many sibling files. These tests take on the order of one minute to verify automatically.

#### Mitigating drawbacks

1. To reduce overall debugging time, unit tests can act as a filter to catch simple issues before they appear as confusing integration test failures.
    * Investigate unit test failures first.
    * When an integration test failure is identified, take a moment to ask, "how could this be caught with a unit test?"
2. Tests should remain focused on the behavior of one specific feature.
    * Structurally, an integration test should try to follow the simple pattern of `Arrange, Act, Assert` and avoid taking many different actions.
    * While integration tests are intended to cover multiple dependencies, reducing the scope of actions and assertions reduces the risk of spending more time debugging tests than fixing the underlying problem.
3. Reduce the amount of code necessary for the integration test.
    * Consider refactoring the production interface to make it easier to write (unit) tests.
    * Combine highly-similar integration tests into one test, though be careful about complexity tradeoffs.
4. Batch tests with large startup times.
    * Share startup cost once in a fixture provided to each test, with a tradeoff of allowing shared state to interfere with other tests.
    * For in-editor Python tests, refer to the documentation on [editor tests](https://www.o3de.org/docs/user-guide/testing/parallel-pattern).
5. Parallelize small tests which have few external dependencies.
    * Can expose intermittent failures from parallel contention.
    * Unit test libraries execute in parallel by default.

### System tests

System tests focus on high-level requirements of the entire fully-integrated product and make a holistic assessment of technical quality. These tests cover major workflows of functionality between systems. This increased scope significantly amplifies everything that makes integration tests slow and expensive to maintain. Also, humans excel at assessing these workflows, where robotic scripts are often not ideal. Due to this, O3DE relies primarily on humans to verify most high-level functional requirements. In other words: remember to manually test the changes you propose!

Due to their costs, there should only be a small number of automated system-wide tests in O3DE. System tests should also avoid exhaustively verifying lower-level requirements, as specific unit and integration tests can better detect specific issues. The unit and integration tests can filter for known lower-level concerns, with automated system tests as the final least-specific check for unexpected problems.

If you are planning to write a large automated test broadly targeting many systems, please reach out to [SIG-Testing on Discord](https://{{< links/o3de-discord >}}) for design support!

### Acceptance tests

Acceptance tests focus on the user experience. O3DE has no automated acceptance tests, as robots are poorly suited to simulating actual human users. This is due to the extreme complexity and cost of Artificial General Intelligence, summed up in observations such as Moravec's Paradox, "it is comparatively easy to make computers exhibit adult level performance on intelligence tests or playing checkers, and difficult or impossible to give them the skills of a one-year-old when it comes to perception and mobility."

O3DE relies on contributors and SIGs to help verify that their code provides a good user experience. Subsequently, O3DE depends on user feedback to inform how the code satisfies the needs of many different users. Whenever you identify somewhere the code could be improved, please [create an issue](https://github.com/o3de/o3de/issues/new/choose) or [propose a pull request](/docs/contributing/)!

## Other automated test categories in O3DE

### User interface (UI) tests

{{< caution >}}
Automated UI tests are prone to false failures and false passes. This can lead to the anti-patterns of "when anyone changes any part of the code, they have to change all of the tests" or "this test never catches any real bugs." Due to these risks, only start investing in automated UI tests after automating lower-complexity tests.
{{< /caution >}}

While there is a significant amount of UI code in O3DE, we recommend that automated tests avoid targeting the UI layer. UI tests are relatively complex and expensive to maintain. It is also easy to write acceptance-style tests for the UI, where robotic scripts struggle to provide useful feedback. Such tests can quickly consume more human effort to debug than it would to manually test the UI.

Relying on UI tests to verify features tends to be brittle and can prompt many confusing debugging sessions. In an ideal scenario, there would already be non-UI integration tests, which thoroughly test the underlying logic of a feature. Then any UI tests above that layer would not be responsible for testing the system but only for how the interface reacts to simple interactions. Whenever possible, prefer implementing that lower layer of non-UI automation.

### Performance, load, and stress tests

Performance testing targets the efficiency of a process, hardware configuration, or fleet of machines. This category of tests focuses on monitoring throughput and detecting breaking points. Since the focus is on recording metrics, performance tests differ from functional tests such as unit tests. Functional tests seek an objective boolean pass/fail state. Performance tests instead log subjective metrics, which require additional analysis as they change over time.

O3DE's performance testing tools focus on two layers of creating metrics on the local machine:

1. [Micro-benchmarks](/docs/user-guide/testing/getting-started/#googlebenchmark) of individual functions with GoogleBenchmark, similar to unit tests.
2. [Profiling markers](/docs/user-guide/testing/profiler/) annotated into different systems of the engine, similar to system tests.

## Which tests are best?

{{< note >}}
Don't get paralyzed by test design! The most useful automated test is usually a unit test. Write a small test now and adjust your approach while iterating on the feature. If a bug slips through your tests, revise them to catch it next time.
{{< /note >}}

There is often no easy answer to which types of tests are the most important for a feature. Automated tests are helpful because they reduce the human effort to write working code, quickly detecting when functionality regresses to a broken state. Automating many tests of each kind can help ensure the highest quality products, but all code comes with its own maintenance cost. We recommend a balance of tests based on their effectiveness and resilience:

* Unit tests should account for the vast majority of tests, they are:
  * The most efficient to write, execute, and maintain.
  * The first line of automated defense against newly introduced bugs.
  * Often referred to as the base of a *Testing Pyramid*.
* Integration tests should account for most of the remaining automated tests.  Remember the following tradeoffs:
  * Integration tests often catch the largest variety of bugs, but require significantly more effort to write and maintain.
  * Automated UI tests should be limited, and rely on humans to verify the UI. Most integration tests can be written just below the UI layer to verify system functionality.
* System tests should account for few tests.  When writing system tests:
  * Only the most critical workflows should be included.
  * System tests should not aim to be exhaustive.
* Only add performance metrics and other specialized tests when you identify a specific need.

## Where do you write new tests?

Low-level tests such as Unit Tests and Micro-Benchmarks should live adjacent to the code being tested in a folder named `/Tests/`. Test-specific dependencies, like mock interfaces, should exist in a similar location, such as `/Mocks/`. When modifying code for an existing feature, look for tests that already exist.

Higher-level tests have more dependencies and should live in a directory common to their set of dependencies. This is often an [O3DE Project](/docs/user-guide/project-config/).

For more information on writing and registering automated tests, refer to the [Testing Quickstart Guide](/docs/user-guide/testing/getting-started/).

## Test names

Tests should have unique, obvious names to help document what they perform. One highly recommended pattern is the [Osherove Naming](http://osherove.com/blog/2005/4/3/naming-standards-for-unit-tests.html) structure of `<UnitOfWork>_<StateUnderTest>_<ExpectedBehavior>`. This maps to the "Arrange, Act, Assert" test structure and keeps test names readable at a glance:

1. UnitOfWork: The critical interaction to verify. (Act)
   * Typically named for a single action, often including the name of the target function.
   * Easy to read since it comes first.
2. StateUnderTest: Unique configuration steps. (Arrange)
   * Describes what makes the test vary from "normal" conditions in similar tests.
     * When nothing seems extraordinary use a placeholder such as `Default`, or `HappyPath`, or omit this term.
3. ExpectedBehavior: The expected outcome of the test. (Assert)
   * Often describes the type of assertion made or highlights the most important of multiple asserted values.
   * Easy to read since it comes last.

An alternative way to think about this pattern is `<WhatIsTested>_<NotableConfigurationStep>_<ImportantAssertion>`

There are two main reasons to use this naming method:

1. When a test fails, a human can look at a report summary and quickly understand what went wrong.
   * If test `MatrixDotProduct_SecondMatrixInvalidRows_InvalidDimensions` starts failing, someone may immediately suspect what caused the issue before navigating through code.
2. The name documents what makes the test uniquely important.
   * This makes it easier to assess what is currently tested and then create a new test that is not a duplicate.

{{< caution >}}
While the pattern above recommends using underscores, never start or end test names with underscores! This can result in [GoogleTest creating an invalid function name](http://google.github.io/googletest/faq.html#why-should-test-suite-names-and-test-names-not-contain-underscore) or [PyTest not discovering the test](https://docs.python.org/3/tutorial/classes.html#private-variables).
{{< /caution >}}

## Test-Driven development (TDD)

*Test-Driven Development* (TDD) is a software writing workflow that prompts engineers to iteratively develop code. The Red-Green-Refactor process can carve up questions such as "what should be done next?" and "is this complete?" into actionable tasks. This helps avoid getting lost in the ambiguity of software design. TDD also has the extra benefit of leaving behind tests that target critical requirements. Repeating these three steps can help design new features:

1. Red: Write a new failing (unit) test for new functionality.
   * What does success look like?
   * Who is going to use this code? How will they use it?
2. Green: Write production code to make the test pass.
   * What is the simplest code that works?
3. Refactor: Improve the code and tests.
   * Are there obvious gaps, repetitions, or inconsistencies?
   * Was the correct functionality actually achieved? Can it be better demonstrated?
   * Taking a step back, are there any better approaches?

{{< note >}}
TDD is one small, effective tool to help with software design. It is best employed alongside other design tools, such as the [SOLID design principles](https://en.wikipedia.org/wiki/SOLID). TDD helps focus on lower-level concerns and prompts asking broader questions. However, it also assumes that high-level requirements gathering has already provided initial direction for a task.
{{< /note >}}

The primary benefit of TDD is writing code that is easy to use and maintain, plus tests to prove it functions correctly in the future. If you don't already use TDD, try it out for your next feature!
