# Open 3D Engine Website & Documentation

This repository contains the website and documentation for **Open 3D Engine (O3DE)**. 

If you would like to build a local version of the site, all it takes is cloning this repo, following the local instructions, and under a minute for a build.
For more information, refer to [Contributing to O3DE Documentation](https://www.o3de.org/docs/contributing/to-docs/) 

Otherwise, documentation is browsable in this repository at `content/docs`. API documentation is stored in this repository at `static/docs/api`, generated using the default Doxygen HTML templates. You can browse the API references without needing to install Hugo, NodeJS, or build the website.

## Build the website locally
If you are working on the documentation or interested in seeing a specific branch of the documentation, you can build the O3DE website on your local machine. 

To build the O3DE website locally, you need the items below.
- `o3de.org` repository
- **Hugo (extended version)**, a static site generator that builds the website.
- **npm** (or another package manager) to install the **bootstrap** package, which Hugo needs for styling.

### Download the repository
You can download this repository or clone it onto your local machine. Cloning the repository will copy the whole repository to your local machine. This allows you to contribute to the documentation, such as pull the latest changes, create branches, and make pull requests. 
- To download, click on the green **Code** button on this website and select **Download ZIP**. 
- To clone
  1. Open a terminal or shell in the directory where you want this repository to be in. 
  2. Run the command `git clone https://github.com/o3de/o3de.org.git`.

### Setup Hugo, npm, and dependencies
1. To install **Hugo (extended version)**, follow the instructions for your machine in the [Hugo documentation](https://gohugo.io/getting-started/installing). 
   
    *Note: You must install the **extended version** of Hugo.*

2. To install **npm**, follow the instructions in the [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) documentation. Installing npm also installs **Node.js**.

3. To install dependencies, run the following command from the `o3de.org` repository:

    ```shell
    cd <path-to-repo>/o3de.org
    npm install
    ```


### Build the site
1. Open a terminal or shell and navigate to the `o3de.org` repository.
   
    ```shell
    cd <path-to-repo>/o3de.org
    ```
   
2. Run the command `hugo server`. 
      
    ```shell
    $ hugo server
    Start building sites …

                      |  EN
    -------------------+--------
      Pages            |   902
      Paginator pages  |     0
      Non-page files   |     0
      Static files     | 17173
      Processed images |     0
      Aliases          |     0
      Sitemaps         |     1
      Cleaned          |     0

    Built in 10394 ms
    Watching for changes in C:\O3DE\o3de.org\{assets,content,layouts,package.json,static}
    Watching for config changes in C:\O3DE\o3de.org\config.toml
    Environment: "development"
    Serving pages from memory
    Running in Fast Render Mode. For full rebuilds on change: hugo server --disableFastRender
    Web Server is available at http://localhost:1313/ (bind address 127.0.0.1)
    Press Ctrl+C to stop
    ```

3. To view a local build of the O3DE website, open a web browser and go to http://localhost:1313/.

You can now view the O3DE website on your local machine! Find the O3DE documentation under the **Learn** section of the O3DE website.

## Troubleshooting

### Issue

Running `hugo server` outputs the following error:

```cmd
Error: Error building site: TOCSS: failed to transform "blah.sass" (text/x-sass): SCSS processing failed: file "stdin", line 26, col 1: File to import not found or unreadable: bootstrap/scss/functions.
```

### Description

This indicates that your local `o3de.org` repository may be missing bootstrap, or that the wrong version is installed. Similar errors may indicate that other dependent packages are missing.

For a complete list of required dependencies, see `package.json`.

### Steps to fix

1. Open a shell or terminal and navigate to `o3de.org` repository: `cd <path-to-repo>/o3de.org`

2. Verify that the required dependencies have been installed by running the command, `npm list`. This outputs the list of dependencies and indicates whether or not they've been installed.

3. Install missing dependencies. You can install all of the dependencies by running the command, `npm install`. Or, you can install a specific dependency. For example: `npm install bootstrap@4.6.1`

