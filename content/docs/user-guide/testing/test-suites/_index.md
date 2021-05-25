---
description: ' Use test suites to define when your tests are run. '
title: Test Suites
---

Test Suite | Test Content | Gating | Frequency | Notes
:--| :--| :--| :--| :--
Smoke | Build verification, high level smoke | Yes | Every Automated Review | The minimal set of tests that prove basic functionality
Main | Critical path functional, unmarked Google tests | Yes | Every Automated Review | The default Suite for all new tests that are not specifically tagged to be in any other suite.
Periodic | All functional tests, performance, load, stress | No | Nightly | Other type of non functional tests may be added.
Benchmark | Benchmark | No | Nightly | 
Sandbox | Flaky tests | No | Nightly | Tests in this suite should be actively worked on, and live here only a short time

### Smoke Test Suite

Comprises of the bare minimum tests that provides the basic level of confidence that the build is in a usable state for further testing. The Smoke Test Suite aims to quickly run through a set of tests that validates the smallest critical testable units to ensure product stability and can perform the most basic functions (i.e. loading the editor without crashing).

In general Smoke Tests will cover all product level tests:

1. **Build Verification Tests**: Are basic boot tests.
2. **Unit Tests**: Are automated tests that covers the smallest testable unit of code, i.e. single function calls, API, or product core functionality. Unit tests of single functions can be in the smoke suite, but only when they are critically important, and that unit tests can live in the main suite.

All submissions to mainline will be tested against the Smoke Tests Suite first before any other test suites. Any submission that fails the Smoke Testing will be rejected.

**Maximum total time to run**: 10 minutes.

If this maximum time is exceeded, the suite needs to be brought back under 10 minutes by optimizing tests and/or moving less-critical tests out of Smoke and into Main.

**Run cadence**: Triggers with every AR Submission Run.

### Main Test Suite

Comprises of tests that defines the Acceptance Criteria (AC) of the feature or system within the whole product. The tests should only comprise of Happy Path Functional test cases and should not have any negative tests.  

All new tests submitted into mainline through Pull Request will be grouped within the Main Test Suite by default.

All submissions to mainline will be tested against the Main Tests Suite. Any submission that fails the Main Testing will be rejected.

**Maximum total time to run**: 20 minutes.

First, tests of the test tools are run.

Then, feature area tests are run. The total time to run per feature area is 3 minutes. Current feature areas are:

* PhysX
* Large Worlds
* Helios
* EMFX
* Editor
* Script Canvas
* Atom

If this maximum time is exceeded, the suite needs to be brought back under 20 minutes by optimizing tests and/or moving less-critical tests out of Main and into Periodic.

**Run cadence**: Triggers with every AR Submission Run.

### Periodic Test Suite

Comprises of tests that do not gate mainline submissions but provide general health checks on the overall product as well as each system.

Current functional tests that are already automated will for now stay in Periodic Test Suite. This is subject to change as we are actively working to move Functional tests that should really be in Main Suite and gate submissions. The long term goal is to only write gating Functional tests and save on automation cycles.

The Periodic Test Suite runs at a separate cadence from Smoke and Main Test Suite.

**Run cadence**: Depends on the type of tests being executed. Soak tests and Stress tests may take from several hours to days to give results. Unless such tests are setup, the cadence cannot be determined. There could be multiple periodic jobs setup with each job testing a different aspect.

### Benchmark Test Suite

The types of tests are:

* Performance tests
* Stress tests
* Load tests

**Run cadence**: Nightly

### Sandbox Test Suite

Comprises of automated tests that are buggy, or unstable. The Sandbox Test Suite exist to move flaky tests off from the Smoke and Main Test Suite to remove any disruptions and blockages in the submission AR pipeline. The Sandbox Test Suite does not gate mainline submissions. There will be a separate AR job setup to execute the flaky tests in the Sandbox Suite on a regular cadence and surface the execution metrics to MARS.

**Run cadence**: Nightly

### User Expectation from Different Suites

Once the Smoke Test Suite passes, users should have a strong level of confidence that the build is ready to use.

To obtain a build that has all system functionalities tested, users will have to wait until the Main Suite passes.

If a user is looking for deeper functional validation, they should pick the last successful build from Periodic Suite.