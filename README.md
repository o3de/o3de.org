# Open 3D Engine Website & Documentation

This repository contains the website and documentation for Open 3D Engine (O3DE). During preview, the site and documentation are under heavy development - so don't be surprised if information is missing or sometimes breaks. If you would like to visit our official website in preview, please contact us directly for the information.

If you would like to build a local version of the site, all it takes is cloning this repo, following the local instructions, and under a minute for a build.

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

### Setup Hugo, npm, and bootstrap
1. To install **Hugo (extended version)**, follow the instructions for your machine in the [Hugo documentation](https://gohugo.io/getting-started/installing). 
   
    *Note: You must install the **extended version** of Hugo.*

1. To install **npm**, following the instructions in the [npm](hhttps://docs.npmjs.com/downloading-and-installing-node-js-and-npm) documentation. Installing npm also installs **nodejs**. 

2. To install **bootstrap**, run the following command in a terminal or shell: `npm install bootstrap`.

    *Note: `npm` is only one way to install bootstrap. You can use other package managers to install bootstrap, such as [yarn](https://yarnpkg.com/package/bootstrap).*

### Build the site
1. Open a terminal or shell and navigate to the `o3de.org` repository.
   
```shell
$ cd <path-to-repo>\o3de.org
```
   
2. Run the command `hugo serve`. 
   
```shell
$ hugo serve
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