# Verifying that Bundles Contain Required Assets<a name="asset-bundler-assets-verifying"></a>

When your team generates a release build that has bundled game assets, you want to verify that the bundles contain everything required to ship your game\. Use the tools of the Lumberyard asset bundling system throughout the game development process to verify that your asset bundles contain the required assets\.

As a best practice, verify that your bundles contain their required assets during all game development phases:

1. When you start

1. While you develop

1. In development builds

1. In release builds

## When You Start<a name="asset-bundler-assets-verifying-as-you-start"></a>

As you start building your game, ensure that you create the references to assets that your product requires at runtime\. For information about how to emit product dependencies for your custom asset types, see the [Declare Product Dependencies](asset-builder-custom.md#asset-builder-custom-create-builder-class-optional-declare-product-dependencies) section of the [Creating a Custom Asset Builder](asset-builder-custom.md) page\.

## While You Develop Your Game<a name="asset-bundler-assets-verifying-as-you-develop-your-game"></a>

Errors can occur when assets are bundled later in the development process\. To avoid errors, consider bundling earlier\. However, even before you've defined your seed list or built bundles, you can take steps to avoid unwanted surprises later\.

### Before You Build a Seed List<a name="asset-bundler-assets-verifying-before-you-have-a-seed-list"></a>

Before you build a seed list, you can use the missing dependency scanner to look for asset references that might have missing dependencies\. For more information, see [Using the Missing Dependency Scanner](asset-bundler-missing-dependency-scanner.md)\.

### After You Have a Seed List<a name="asset-bundler-assets-verifying-after-you-have-a-seed-list"></a>

After you've built a seed list, but before you bundle your assets, you can use the Asset Validation Gem to verify that asset loads map back to seeds\. For more information, see [Using the Asset Validation Gem to Verify Seeds](asset-bundler-asset-validation-gem.md)\.

## In Development Builds<a name="asset-bundler-assets-verifying-in-development-builds"></a>

After you've generated bundles for your game, test your game in bundle mode with a development build of the editor or launcher\. With bundle mode active, use the `sys_report_files_not_found_in_paks` console variable to find any asset files that are missing from your game `.pak` files\. For more information, see [Using Bundle Mode to Test Bundles](asset-bundler-bundle-mode.md)\.

## In Release Builds<a name="asset-bundler-assets-verifying-in-release-builds"></a>

As with development builds, you can use bundle mode and the `sys_report_files_not_found_in_paks` console variable to find missing asset files in release builds\. For more information, see [Using Bundle Mode to Test Bundles](asset-bundler-bundle-mode.md)\.

**Topics**
+ [When You Start](#asset-bundler-assets-verifying-as-you-start)
+ [While You Develop Your Game](#asset-bundler-assets-verifying-as-you-develop-your-game)
+ [In Development Builds](#asset-bundler-assets-verifying-in-development-builds)
+ [In Release Builds](#asset-bundler-assets-verifying-in-release-builds)
+ [Using the Missing Dependency Scanner](asset-bundler-missing-dependency-scanner.md)
+ [Using the Asset Validation Gem to Verify Seeds](asset-bundler-asset-validation-gem.md)
+ [Using Bundle Mode to Test Bundles](asset-bundler-bundle-mode.md)