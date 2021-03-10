# Open 3D Engine Website & Documentation

This repository contains the website and documentation for Open 3D Engine. During preview, the site and documentation are under heavy development - so don't be surprised if information is missing or sometimes breaks. If you would like to visit our official website in preview, please contact us directly for the information.

If you would like to build a local version of the site, all it takes is cloning this repo, following the local instructions, and under a minute for a build.

Otherwise, documentation is browsable in this repository at `content/docs`. API documentation is stored in this repository at `content/docs/api`, generated using the default Doxygen HTML templates. You can browse the API references without needing to install Hugo, NodeJS, or build the website.

## Running locally

You'll need:

* **[Hugo (extended version)](https://gohugo.io/)** as a static site generator.
* [NodeJS](https://nodejs.org), [npm](https://www.npmjs.com/), and [yarn](https://yarnpkg.com/).
 
Clone this repository and run the following two commands in its directory:

```shell
# Install npm assets (just Bulma for Sass/CSS)
yarn

# Run the server locally
make serve
```
