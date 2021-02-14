---
description: ' Verify that the assets in your Lumberyard project are properly bundled and
  referenced. '
title: Verifying that Bundles Contain Required Assets
---
# Verifying that Bundles Contain Required Assets {#asset-bundler-assets-verifying}

When your team generates a release build that has bundled game assets, you want to verify that the bundles contain everything required to ship your game\. Use the tools of the Lumberyard asset bundling system throughout the game development process to verify that your asset bundles contain the required assets\.

As a best practice, verify that your bundles contain their required assets during all game development phases:

1. When you start

1. While you develop

1. In development builds

1. In release builds

## When You Start {#asset-bundler-assets-verifying-as-you-start}

As you start building your game, ensure that you create the references to assets that your product requires at runtime\. For information about how to emit product dependencies for your custom asset types, see the [Declare Product Dependencies](/docs/userguide/asset-builder-custom#asset-builder-custom-create-builder-class-optional-declare-product-dependencies) section of the [Creating a Custom Asset Builder](/docs/userguide/asset-builder-custom.md) page\.

## While You Develop Your Game {#asset-bundler-assets-verifying-as-you-develop-your-game}

Errors can occur when assets are bundled later in the development process\. To avoid errors, consider bundling earlier\. However, even before you've defined your seed list or built bundles, you can take steps to avoid unwanted surprises later\.

### Before You Build a Seed List {#asset-bundler-assets-verifying-before-you-have-a-seed-list}

Before you build a seed list, you can use the missing dependency scanner to look for asset references that might have missing dependencies\. For more information, see [Using the Missing Dependency Scanner](/docs/user-guide/features/packaging/asset-bundler/missing-dependency-scanner.md)\.

### After You Have a Seed List {#asset-bundler-assets-verifying-after-you-have-a-seed-list}

After you've built a seed list, but before you bundle your assets, you can use the Asset Validation Gem to verify that asset loads map back to seeds\. For more information, see [Using the Asset Validation Gem to Verify Seeds](/docs/user-guide/features/packaging/asset-bundler/asset-validation-gem.md)\.

## In Development Builds {#asset-bundler-assets-verifying-in-development-builds}

After you've generated bundles for your game, test your game in bundle mode with a development build of the editor or launcher\. With bundle mode active, use the `sys_report_files_not_found_in_paks` console variable to find any asset files that are missing from your game `.pak` files\. For more information, see [Using Bundle Mode to Test Bundles](/docs/user-guide/features/packaging/asset-bundler/bundle-mode.md)\.

## In Release Builds {#asset-bundler-assets-verifying-in-release-builds}

As with development builds, you can use bundle mode and the `sys_report_files_not_found_in_paks` console variable to find missing asset files in release builds\. For more information, see [Using Bundle Mode to Test Bundles](/docs/user-guide/features/packaging/asset-bundler/bundle-mode.md)\.

**Topics**
- [Verifying that Bundles Contain Required Assets {#asset-bundler-assets-verifying}](#verifying-that-bundles-contain-required-assets)
  - [When You Start {#asset-bundler-assets-verifying-as-you-start}](#when-you-start)
  - [While You Develop Your Game {#asset-bundler-assets-verifying-as-you-develop-your-game}](#while-you-develop-your-game)
    - [Before You Build a Seed List {#asset-bundler-assets-verifying-before-you-have-a-seed-list}](#before-you-build-a-seed-list)
    - [After You Have a Seed List {#asset-bundler-assets-verifying-after-you-have-a-seed-list}](#after-you-have-a-seed-list)
  - [In Development Builds {#asset-bundler-assets-verifying-in-development-builds}](#in-development-builds)
  - [In Release Builds {#asset-bundler-assets-verifying-in-release-builds}](#in-release-builds)