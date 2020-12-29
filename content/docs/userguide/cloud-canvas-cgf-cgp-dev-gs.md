# Getting Started With Game Development on the Cloud Gem Portal<a name="cloud-canvas-cgf-cgp-dev-gs"></a>

To help you get started with game development on the Cloud Gem Portal \(CGP\), this tutorial shows you how to do the following:
+ Set up your environment to use the Cloud Gem Portal\.
+ Create a cloud gem and a dynamic Cloud Gem Portal\.
+ Test your Cloud Gem Portal locally\.
+ Deploy your Cloud Gem Portal to AWS and view it in production\.

## Setting Up Your Environment<a name="cloud-canvas-cgf-cgp-dev-gs-setup"></a>

Setting up your environment includes installing Node\.js packages, Git, creating a test URL, and configuring Microsoft Visual Studio if you are using it\.

### Installing Node\.js and Git<a name="cloud-canvas-cgf-cgp-dev-gs-setup-installing-node-js"></a>

The Cloud Gem Portal uses the Angular 2 version of [AngularJS](https://en.wikipedia.org/wiki/AngularJS) for programming and the Node\.js package manager \(npm\) for managing dependencies\. 

**To install Node\.js and git**

1. Download and install Node\.js from the [Node\.js website](https://nodejs.org/)\.

1. Download and install Git from the [Git download page](https://git-scm.com/downloads)\.

1. Obtain a [GitHub](https://github.com/) account if you do not have one\. You must have a GitHub account to download the GitHub packages for the Cloud Gem Portal and for the optional [jspm](http://jspm.io/) package management tool\. jspm is a package manager for the [SystemJS universal module loader](https://github.com/systemjs/systemjs) and is built on the dynamic [ES6 Module Loader](https://github.com/ModuleLoader/es-module-loader)\.

### Updating Packages and Running a Local Server<a name="cloud-canvas-cgf-cgp-dev-gs-setup-updating-packages-and-running-a-local-server"></a>

From a command prompt, run the following commands to change to the `CloudGemPortal` directory, install packages, and run a [gulp](https://en.wikipedia.org/wiki/Gulp.js) server\. gulp is a toolkit for automating tedious or time\-consuming programming tasks\.<a name="cloud-canvas-cgf-cgp-dev-gs-setup-updating-packages-and-running-a-local-server-proc"></a>

**To update packages and run a local server**

1. Enter the following command to change to the `CloudGemPortal` directory\.

   ```
   cd <Lumberyard directory path>\dev\Gems\CloudGemFramework\v<N>\Website\CloudGemPortal
   ```

1. If you want to use JSPM, enter the following command\.

   ```
   npm install -g jspm
   ```

1. Run the following commands\.

   ```
   npm install -g gulp
   npm install
   gulp serve
   ```

   The `npm install` command installs the packages that you need to run the Cloud Gem Portal website\. If you are using perforce, you must checkout the `package.json` and `config.js` files so that they are writable\.The `gulp serve` command runs the default gulp task to set up a [browsersync](https://www.browsersync.io/) server\. You do not have to run `npm install` again unless you add or update packages\.

1. The output of the `gulp serve` command looks like the following\.

   ```
   [  ] Access URLs:
   -----------------------------------
          Local: http://localhost:3000
          External: http://00.00.00.0:3000
   -----------------------------------
          UI: http://localhost:3001
         UI External: http://00.00.00.0:3001
   -----------------------------------
   ```

1. Open a browser and navigate to `http://localhost:3000`\. A login page should appear\.

### Creating an Administrator Account<a name="cloud-canvas-cgf-cgp-dev-gs-setup-creating-admin-account"></a>

Now you are ready to create an administrator account so that you can sign in on the page that you just opened\.

**To create an administrator account**

1. Enter the following from a command prompt window:

   ```
   cd Lumberyard_directory\dev
   ```

   ```
   lmbr_aws cloud-gem-framework cloud-gem-portal --show-configuration --show-url
   ```

   These commands create an administrator account so that you can sign in\. It also generates a project settings JSON string and an HTTPS URL\. The project settings string is the text between the `{}` braces, as you can see in the following example\.  
![\[Sample project settings string\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cgf-cgp-dev-gs-setup-creating-admin-account-1a.png)

   Before you can sign in with your administrator credentials, you must copy this project settings string to a file in your Cloud Gem Portal code\.

1. Open the `\dev\Gems\CloudGemFramework\v<N>\Website\CloudGemPortal\cgp_bootstrap.js` file for editing in a text editor\.

1. Set the variable `cgpBootstrap` to the project settings JSON string that you generated, as in the following example\.  
![\[Set cgpBootstrap to your project settings string\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cgf-cgp-dev-gs-setup-creating-admin-account-2.png)
**Note**  
The HTTPS URL that was generated is not required\. Be sure not to paste it into the `cgp_bootstrap.js` file\. 

1. Save your changes\.

1. With your browser open to `http://localhost:3000`, sign in with the temporary administrator credentials that were generated\.  
![\[Sign in to the Cloud Gem Portal\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cgf-cgp-dev-gs-setup-creating-admin-account-3.png)

1. Your password is temporary, so create a new one\.  
![\[Change password\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cgf-cgp-dev-gs-setup-creating-admin-account-4.png)

   After you change the administrator password, you are automatically logged in and redirected to the cloud gems page, which lists your active gems\.  
![\[List of cloud gems\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cgf-cgp-dev-gs-setup-creating-admin-account-5.png)

Now you can start editing your code\. Your changes should appear when you reload the site\.

To learn how to set up Microsoft Visual Studio for creating cloud gems, see the following section\. To start creating your own cloud gems right away, see [Creating Cloud Gems](#cloud-canvas-cgf-cgp-dev-gs-developing-cloud-gems)\.

### Microsoft Visual Studio Setup<a name="cloud-canvas-cgf-cgp-dev-gs-setup-visual-studio"></a>

You can edit your code with any text editor, but for creating cloud gems, you might prefer Microsoft Visual Studio for its Typescript support\. To use Visual Studio 2017 to create cloud gems, you configure it to work with Node\.js, add some TypeScript extensions, and optionally install Task Runner Explorer to run gulp tasks\.

#### Configuring Visual Studio to Work with Node\.js<a name="cloud-canvas-cgf-cgp-dev-gs-setup-visual-studio-node.js"></a>

Perform the following steps to configure Visual Studio to work with Node\.js\.

**To configure Visual Studio to work with Node\.js**

1. Open the `<lumberyard>\dev\Gems\CloudGemFramework\v<N>\Website\CloudGemPortal\Portal.csproj` solution file from Visual Studio\.

1. In the navigation bar, click **Tools**, **Options**, **Projects and Solutions**, **External Web Tools**\.

1. Add your `nodejs` and `node_modules\.bin` directories to the external tools configuration so that Visual Studio can find them\. The ordering of the paths is important\. Move your `nodejs` and `.node_modules/.bin` paths above the defaut Visual Studio paths, as shown in the following image\.  
![\[Expose Node.js directories to Visual Studio\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cgf-cgp-dev-gs-6.png)

#### Tools and Extensions Setup<a name="cloud-canvas-cgf-cgp-dev-gs-setup-visual-studio-tools-and-extensions"></a>

Next, you must install TypeScript\-related extensions for Visual Studio\.

**To install TypeScript\-related extensions**

1. Click **Tools**, **NuGet Package Manager**, **Manage NuGet Packages for Solution**\.

1. Install the following packages:
   + **angularjs\.TypeScript\.DefinitelyTyped**
   + **es6\-shim\.TypeScript\.DefinitelyTyped**
   + **jquery\.TypeScript\.DefinitelyTyped**

      
![\[Install NuGet packages\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cgf-cgp-dev-gs-7.png)

   After you install these packages, you can create cloud gems in Visual Studio\.

#### Using the Task Runner Explorer \(Optional\)<a name="cloud-canvas-cgf-cgp-dev-gs-setup-visual-studio-task-runner-explorer"></a>

To run the gulp task, you can use [Task Runner Explorer](https://visualstudiogallery.msdn.microsoft.com/8e1b4368-4afb-467a-bc13-9650572db708s), a Visual Studio UI extension that executes any grunt or gulp task or target\.

**To use Task Runner Explorer**

1. In Visual Studio, right\-click **gulpfile\.js**\.

1. Choose **Task Runner Explorer**\. The tool displays all the current gulp tasks\.

1. To start a task, double\-click the task\.

1. To start a server, run **default** or **gulp serve** in the list of gulp **Tasks**\.  
![\[Run the default gulp task to start a server\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cgf-cgp-dev-gs-8.png)

#### Troubleshooting<a name="cloud-canvas-cgf-cgp-dev-gs-setup-visual-studio-troubleshooting"></a>

If opening a `.ts` file causes Visual Studio to crash, make sure that no other Visual Studio plugins are installed that open `.ts` files \(QT Visual Studio and QT Linguist are two examples\)\.

## Creating Cloud Gems<a name="cloud-canvas-cgf-cgp-dev-gs-developing-cloud-gems"></a>

Now you are ready to create cloud gems, which you can easily modify and redistribute to other game developers\. To create a cloud gem, you add base files and set up your TypeScript, `.html`, and `.css` files\.

### Adding Base Files<a name="cloud-canvas-cgf-cgp-dev-gs-developing-cloud-gems-adding-base-files"></a>

From a command prompt window, create a symbolic link to your cloud gem source directory\. The link should point to the `cgp-resource-code` directory within your cloud gem\.

On Windows, use the following syntax\.

```
mklink /J <Workspace Path>\dev\Gems\CloudGemFramework\v<N>\Website\CloudGemPortal\external\<gem-name> <Workspace Path>\dev\Gems\<gem-name>\AWS\cgp-resource-code
```

The following example syntax creates a symbolic link to the `cgp-resource-code` directory for the Message of the Day Cloud Gem\.

```
mklink /J <Workspace Path>\dev\Gems\CloudGemFramework\v<N>\Website\CloudGemPortal\external\CloudGemMessageOfTheDay <Workspace Path>\dev\Gems\CloudGemMessageOfTheDay\AWS\cgp-resource-code
```

At this point, your file system is ready\. Now you can add skeleton code to the TypeScript, `.html`, and `.css` files\.

### Creating TypeScript Files<a name="cloud-canvas-cgf-cgp-dev-gs-developing-cloud-gems-creating-typescript-files"></a>

The Cloud Gem Portal is built on the Angular 2 version of [AngularJS](https://en.wikipedia.org/wiki/AngularJS)\. The default language for Angular 2 is [TypeScript](https://www.typescriptlang.org/)\. TypeScript is a typed superset of the JavaScript language\. TypeScript files have a `.ts` extension\. To build your cloud gem, you must create a number of \.ts files\.

#### Basic Cloud Gem<a name="cloud-canvas-cgf-cgp-dev-gs-developing-cloud-gems-creating-typescript-files-basic-cloud-gem"></a>

The following diagram shows the recommended directory structure for a basic cloud gem and the `.ts` and other files that it contains\.

```
<gem name>
      <gem name>.ts
      <gem name>.module.ts
      api-handler.class.ts
      index.component.html
      index.component.scss
      index.component.ts
      index.ts
      model.class.ts
      thumbnail.component.html
      thumbnail.component.ts
```


**Basic Cloud Gem File Descriptions**  

| File | Description | 
| --- | --- | 
| <gem name>\.module\.ts | The main cloud gem module\. | 
|  `<gem name>.ts`  | Required\. The factory entry point for the gem\. | 
| api\-handler\.class\.ts | A custom service API handler class\. | 
| index\.component\.html | HTML for the index component\. | 
| index\.component\.scss | Style sheet definition for the index component\. | 
| index\.component\.ts | The index component \(the main component for the gem\)\. | 
| index\.ts | The export barrel\. | 
| model\.class\.ts | Contains component model classes\. | 
| thumbnail\.component\.html | HTML markup for the thumbnail component that appears on the Cloud Gems page\. | 
| thumbnail\.component\.ts | The thumbnail component that appears on the Cloud Gems page\. | 

#### Advanced Cloud Gem<a name="cloud-canvas-cgf-cgp-dev-gs-developing-cloud-gems-creating-typescript-files-advanced-cloud-gem"></a>

 If you plan on creating a more complex cloud gem \(for example, one with many components, services, and pipes\), we recommend the following file structure\.

```
<gem name>
      <gem name>.ts
      <gem name>.module.ts
      component
            *.component.ts
            *.component.html
            *.component.scss
      module
            *.module.ts
      directive
            *.directive.ts
      service
            *.service.ts
      pipes
            *.pipe.ts
```

#### Example Starter Cloud Gem \.ts Files<a name="cloud-canvas-cgf-cgp-dev-gs-developing-cloud-gems-creating-typescript-files-examples"></a>

The following example `.ts` files are for the Message of the Day Cloud Gem\.

```
// cloudgemmessageoftheday.module.ts
import { GemModule } from 'app/view/game/module/cloudgems/gem.module';
import { MessageOfTheDayIndexComponent, MessageOfTheDayThumbnailComponent } from './index'
import { GameSharedModule } from 'app/view/game/module/shared/shared.module'
import { NgModule } from '@angular/core';
 
/*
*  The Cloud Gem Angular 2 NgModule defines context for the cloud gem
*/
@NgModule({
    imports: [
        GameSharedModule,
        GemModule
    ],
    declarations: [
        MessageOfTheDayIndexComponent,
        MessageOfTheDayThumbnailComponent
    ],
    providers: [
 
    ],
    bootstrap: [MessageOfTheDayThumbnailComponent, MessageOfTheDayIndexComponent]
})
export class CloudGemMessageOfTheDayModule { }
```

```
// cloudgemmessageoftheday.ts
import { CloudGemMessageOfTheDayModule } from './index'
import { NgModule } from '@angular/core';
 
/*
*  Entry point for the cloud gem factory
*/
export function definition(context: any): NgModule {
    return CloudGemMessageOfTheDayModule;
}
```

```
// index.component.ts
import { Input, Component } from '@angular/core';
import { AbstractCloudGemIndexComponent } from 'app/view/game/module/cloudgems/class/index';
  
@Component({
    selector: 'message-of-the-day-index',
    template: `Welcome to the message of the day index page`
    // OR you can use a templateUrl: 'external/cloudgemmessageoftheday/index.component.html'
})
export class MessageOfTheDayIndexComponent extends AbstractCloudGemIndexComponent {
    @Input() context: any;  //REQUIRED
  
    constructor() {
        super()
    }
  
    //Your component controller code
}
```

```
// thumbnail.component.ts (without a REST API handler)
import { AbstractCloudGemThumbnailComponent, TackableStatus, TackableMeasure, Measurable } from 'app/view/game/module/cloudgems/class/index';
import { Component, Input, OnInit } from '@angular/core'
import { Observable } from 'rxjs/rx'
 
@Component({
    selector: 'cloudgemmessageoftheday-thumbnail',
    template: `
    <thumbnail-gem
        [title]="displayName"
        [cost]="'High'"
        [srcIcon]="srcIcon"
        [metric]="metric"
        [state]="state"
        >
    </thumbnail-gem>`
})
export class MessageOfTheDayThumbnailComponent implements AbstractCloudGemThumbnailComponent{
    @Input() context: any
    @Input() displayName: string = "Your first Cloud Gem";
    @Input() srcIcon: string = "https://m.media-amazon.com/images/G/01/cloudcanvas/images/message_of_the_day._V536715120_.png"
               
    public state: TackableStatus = new TackableStatus();
    public metric: TackableMeasure = new TackableMeasure();
 
    constructor() {
        super()
    }
 
    ngOnInit() {       
        this.report(this.metric)
        this.assign(this.state)
    }
 
    public report(metric: Measurable) {
        metric.name = "My Metric";
        metric.value = "1million!";
 
        new Observable<any>(observer => {
            setTimeout(() => {
                observer.next({
                    value: '100,000,000'
                });
            }, 3000);
 
            setTimeout(() => {
                observer.complete();
            }, 1000);
        }).subscribe(response => {
            metric.value = response.value;
        })
    }
 
    public assign(status: TackableStatus) {
        status.label = "My Status";
        status.styleType = "Enabled";
 
        new Observable<any>(observer => {
            setTimeout(() => {
                observer.next({
                    status: 'Online'
                });
            }, 3000);
 
            setTimeout(() => {
                observer.complete();
            }, 1000);
        }).subscribe(response => {
            status.label = response.status;
            status.styleType = response.status;
        })
    }
 
}
```

```
// index.ts (export barrel)
export * from './thumbnail.component'
export * from './index.component'
export * from './cloudgemmessageoftheday.module
```

#### Testing the Results<a name="cloud-canvas-cgf-cgp-dev-gs-developing-cloud-gems-testing-the-results"></a>

After your setup of the `.ts` files is complete, you can test the results\. If you are running your local server with `gulp serve` or `gulp serve-watch`, navigate to `localhost:3000`\. Your new gem should appear in the **Cloud Gems** section\.

![\[Your cloud gem in the portal\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cgf-cgp-dev-gs-12.png)

If you click the gem thumbnail, the page that appears is blank, but that's expected at this point\.

### Creating an HTML File<a name="cloud-canvas-cgf-cgp-dev-gs-developing-cloud-gems-creating-an-html-file"></a>

You can verify that your gem is working by adding a header like the following to your `.html` file\.

```
<h1> Hello welcome to my new gem! </h1> 
```

If you reload the Cloud Gem Portal page and navigate to your gem, your new text appears\.

![\[HTML header showing\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cgf-cgp-dev-gs-13.png)

#### Creating Dynamic Content<a name="cloud-canvas-cgf-cgp-dev-gs-developing-cloud-gems-creating-dynamic-content"></a>

To make your content more dynamic, you can use Angular 2 directives in your `.html` and `.ts` files\. To see this in action, modify the `.html` and `.ts` files to create a test button on the Message of the Day Cloud Gem, as in the following example\.

In the `.html` file, add the following markup\.

```
<h1> Hello welcome to my new gem! </h1>
<h2 *ngIf="testButton"> Why oh why would you touch that? </h2>

<form>
    <button class="btn l-primary" (click)="testButton = !testButton">
        Check out this fancy button
    </button>
</form>
```

Modify your `.ts` file as in the following example\.

```
export class Motd extends DynamicGem {
    ...
    private testButton: boolean;

      ngOnInit() {
          this.testButton = false;
      }
}
```

The following image shows what happens when the button is clicked\.

![\[Test button\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cgf-cgp-dev-gs-14-anim.gif)

### Creating a CSS File<a name="cloud-canvas-cgf-cgp-dev-gs-developing-cloud-gems-creating-a-css-file"></a>

You can use standard CSS to style your cloud gems\. For convenience, Lumberyard's cloud gems use the [Bootstrap 4](https://v4-alpha.getbootstrap.com/) CSS framework\. When you use standard HTML tags, the your tags automatically pick up CSS changes that provide a professional looking, consistent user interface\.

## Deploying Your Changes<a name="cloud-canvas-cgf-cgp-dev-gs-deploying"></a>

After you are satisfied with your gem, you can upload it to AWS to verify that it is working\. Deploying your changes includes three steps: packaging your changes, copying your files to a local AWS directory, and uploading your cloud gem and Cloud Gem Portal files to AWS\.

### 1\. Packaging Your Changes<a name="cloud-canvas-cgf-cgp-dev-gs-deploying-packaging"></a>

To package your changes, perform one of the following tasks:
+ In Visual Studio, run the gulp task `build_deploy`\.
+ From a command line prompt, run `gulp build_deploy`\.

Doing so packages the three Cloud Gem Portal files `index.html`, `bundles\app.bundle.js`, and `bundles\dependencies.bundles.js` and copies them to the `lumberyard\Gems\CloudGemFramework\AWS\www` publishing directory\.

### 3\. Uploading the Cloud Gem With Your Cloud Gem Portal Content<a name="cloud-canvas-cgf-cgp-dev-gs-deploying-uploading-the-cloud-gem"></a>

Before you upload your cloud gem to AWS, make sure you have you added your new cloud gem to your project with the Project Configurator\. To perform the upload, you can use either Lumberyard Editor or a command\-line prompt\.

**To use Lumberyard Editor to upload your cloud gem and Cloud Gem Portal content to AWS**

1. In Lumberyard Editor, click **AWS**, **Cloud Canvas**, **Resource Manager**\.

1. Under **Administration**, **Deployments**, click your active deployment\. If you don't have a deployment, create one first\.

1. Click **Upload All Resources**\.  
![\[Upload all resources\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cgf-cgp-dev-gs-16.png)

1. After the upload has completed, click **AWS**, **Open Cloud Gem Portal** in Lumberyard Editor to access the Cloud Gem Portal that you uploaded\. Your changes should be visible on the live website\.

**To use a command line prompt to upload your cloud gem and Cloud Gem Portal content to AWS**

1. To update all of the files in the `Gems\cgp-resource-code` directory in the cloud, enter the following command:

   ```
   lmbr_aws cloud-gem-framework upload-portal
   ```

1. To update your Amazon S3 Cloud Gem Portal bucket with the latest files from your `lumberyard\Gems\CloudGemFramework\AWS\www` directory, enter the following command\.

   ```
   lmbr_aws cloud-gem-framework upload-portal --project
   ```

## Summary<a name="cloud-canvas-cgf-cgp-dev-gs-summary"></a>

In this tutorial, you accomplished the following tasks:

1. Added a gem to the `CloudGemPortal` framework\.

1. Used TypeScript and Angular 2 to create three required `.js`, `.html`, and `.css` files\.

1. Used Lumberyard Editor to upload your changes to Amazon S3\.

1. Viewed your changes in production\.