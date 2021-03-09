# Open 3D Engine Website & Documentation

This repository contains the website and documentation for Open 3D Engine. During preview, we're serving our documentation out of this git repository only - sorry! If you want to build a local version of the site to browse the documentation there, we can't guarantee it'll be a great experience.

API documentation is stored in this repository at `content/docs/api`, generated using the default Doxygen HTML templates. You can browse the API references without needing to install Hugo, NodeJS, or build the website.

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
