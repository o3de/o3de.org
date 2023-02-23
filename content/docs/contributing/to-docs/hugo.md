---
linkTitle: Hugo
title: O3DE Documentation Contribution with Hugo
description: Learn to work with Hugo, the static site generator for O3DE documentation.
toc: true
weight: 600
---

The **Open 3D Engine (O3DE)** documentation website uses the [Hugo](https://gohugo.io/) static site generator and deploys using [Netlify](https://netlify.com).

Refer to the o3de.org [README.md](https://github.com/o3de/o3de.org#readme) for build instructions and prerequisites, and [the Git workflow](git-workflow.md) for more information on how the project works.

## Adding new pages 

1. Navigate to the directory under `/content/docs` for the new page.
2. Create a new markdown file for the page:
    - If the page is a new sub-section of documentation, create a directory for that subsection and then create a file titled `_index.md`. 
    - If the page is adding to an existing section of documentation, create a file with an appropriate title. 

    In both cases, the markdown file name and directory name are a part of the page's URL.

3. At a minimum, add the following front matter at the top of your file:

    ```yaml
    ---
    title: Page title
    toc: true
    ---
    ```
    
    This will add the page to the main docs menu as well as generate a table of contents on each page.

    Some sections use the `weight` frontmatter property to order pages and the `description` property. For more information, see [Hugo's documentation](https://gohugo.io/content-management/front-matter#front-matter-variables).

## Adding new guides

Only add new guides with approval from maintainers or if you are a maintainer yourself. 

1. Add a new directory directly under `/content/docs` and create an `_index.md` file in that directory. 

2. Add the following frontmatter:

    ```yaml
    ---
    linktitle: Title that appears in the left hand navigation
    title: Title that appears at the top of the page
    description: Short description of the page
    weight: Numerical value 
    menu_uuid: example //see below
    guide_img: "/images/example/guide_img.svg" //see below
    ---
    ```

    - The `menu_uuid` field is a short, unique identifier for the guide, with no spaces or special characters. This field is used for generating a CSS class for the menu's accordion.

    - The `guide_img` field is a relative URL to an image in    the `/static` directory which serves as the guide's image on the Learn landing page. 

## Adding redirects 

If you move or rename a page, it's a good idea to add a redirect from the old page to the new one. This is done via the `/static/_redirects` file. This file maps to a standard Apache redirects file (.htaccess) and uses the same syntax for adding redirects.

To add a redirect, add a line to the `_redirects` file:

```
/old_url/partial/      /new_url/partial

```


## Adding top navigation menu items 

Add a new item to the top navigation via the `config.toml` file in the root of the website repository:

```toml
[[menu.main]] // menu.main is the main navigation menu
name = "Learn" //name of the menu item 
url = "#" // relative URL – for example, `/docs` links to the docs homepage
weight = 4 // menu ordering
identifier = "learn" // Identifier used for building menus with submenu items
```

For more information, see [Hugo's documentation on menus](https://gohugo.io/content-management/menus/).

### Menu subitems

If you want to have a menu with a dropdown of submenu items, define the label for the drop-down menu as a menu item, then define its subitems using the `parent` field to point to the item they should appear under:

```toml
[[menu.main]]
name = "Community"
url = "#"
weight = 3 // menu ordering for the top nav itself
identifier = "community" //matches the parent fields below

[[menu.main]]
name = "Community subitem"
url = "#"
weight = 1 // menu ordering for items in the dropdown
parent = "community" //matches the identifier above

[[menu.main]]
name = "Community subitem 2"
url = "#"
weight = 2 // menu ordering for items in the dropdown
parent = "community" //matches the identifier above
```

## Adding or updating social media accounts 

Social media accounts are stored as data in the `config.toml` file and read into the layouts via a loop. You can add any social media account you can find an icon for!

```toml
[[params.social]]
name = "Discord" // The name of the social media account
url = "#" // The URL to point to 
icon = "fas fa-envelope" // the FontAwesome Icon classes 
```

Icons for social media accounts are [FontAwesome Icons](https://fontawesome.com/icons?d=gallery&p=2). The social media parameters store the CSS classes used to fetch the icon from the FontAwesome library. To find these:

1. Navigate to the FontAwesome page for a specific icon. For example, [Here's Discord](https://fontawesome.com/icons/discord?style=brands).

2. Locate the HTML snipped for the icon. in this case it's the following:

    ```html
    <i class="fab fa-discord"></i>
    ```

3. Extract the two classes - for example, `fab fa-discord`. 

4. Add these to the `icon` field.

## Updating top level pages 

O3DE's top level pages – `/docs`, `/download` and `/community` – all use custom layouts. You'll need basic knowledge of HTML and CSS (and [Bootstrap](https://getbootstrap.com/)) to update the look and feel of these pages. 

In all cases, the following files are key:

* `/assets/sass/custom.sass`: Stores all custom SCSS for layouts. 
* `/assets/js/app.js`: Stores Javascript for pages. This is important if you need to update the downloads page, which uses Javascript to parse the browser's user agent. 
*  `/layouts/partials/javascript.html`: Adds Javascript files to pages. Important if you want to add a new script to the site. 

### Updating top level page content

The body content (free-form text) of each page is stored in the page's `/content/.../_index.md` file. This is regular markdown content and can be updated at will.

### Updating top level page layout structure

This section is a very brief overview of Hugo's layout/templating engine. For more information, see [Hugo's templating documentation](https://gohugo.io/templates/introduction/).

#### Understanding Hugo layout structure 

Hugo layouts follow a [lookup order](https://gohugo.io/templates/lookup-order/). The `/layouts/_default` directory contains the base layouts, which is what Hugo renders if nothing more specific is available. If Hugo finds a layout directory, for example `/layouts/download` that matches the same file path as a content directory, `/content/download`, it applies the layouts to that content page and its subpages. If it can't find that, it applies a layout from `/layouts/_default`.

Within a layout directory, Hugo looks for one of 4 basic types: 

* `baseof.html`: The "base" template. Do not override this unless you know what you're doing!
* `section.html`: The template for `_index.md` files, or section homepages. 
* `single.html`: The template for files in a directory which are _not_ `_index.md` files – i.e., regular pages.
* `list.html`: The template for lists of subpages. As this gets a bit confusing with `section.html`, only use this layout for blog sections.

Most of the top level pages in the O3DE site are `section.html` pages with no subpages.

#### Understanding Hugo layout inheritance

As described above, Hugo looks for progressively more specific layouts and applies the most specific one it can find. However, it also does this _within_ layout files by allowing you to override a section called `main`.

For example, let's look at `/layouts/_default/baseof.html`:

```html
{{ $lang := site.LanguageCode }}
<!DOCTYPE html>
<html{{ with $lang }} lang="{{ . }}"{{ end }}>
  <head>
    <title>
      {{ block "title" . }}
        {{ site.Title }}
      {{ end }}
    </title>
    {{ partial "css.html" . }}
    {{ partial "favicon.html" . }}
  </head>

    <body>
      {{ partial "navbar.html" . }}
    <main>
      {{ block "main" . }}
      {{ end }}
    </main>
    {{ partial "javascript.html" }}
  </body>
</html>
```

Next, let's look at `/layouts/_default/section.html`:

```html
{{ define "main" }}
  <div class="container">
      <section class="row">
        <section class="col col-8">
          <h1 class="title">{{ .Page.Title | markdownify }}</h1>
          {{ with .Content }}
          <div class="content">
            {{ . }}
          </div>
          {{ end }}
        </section>
      </section>
    </div>
{{ end }}
```

Note that `section.html` only defines the `main` block. In absence of any other blocks, Hugo looks to `baseof.html` to provide the rest of the page's layout.

This works in a similar manner on other subpages, for example `/layouts/download.html`:

```html
{{ define "main" }}
{{ partial "download/hero.html" . }}
{{ with .Content }}
<section class="container-xl mt-5 pt-5">
  <div class="row">
    <div class="col-12">
      {{ . }}
    </div>
  </div>
</section>
{{ end }}   
{{ partial "footer.html" . }}  
{{ end }}

```

In this case, the layout does the following:

* Overrides the `main` section of `/layouts/_default/section.html`.
* Calls the `/download/hero.html` partial (For more on layout partials, see [Hugo's partial template documentation](https://gohugo.io/templates/partials/))
* Adds a div for the body content (`{{ with .Content }}`)
* Calls the `footer.html` partial 

Hence, if you wanted to update the way the Downloads page works, you'd start with `/layouts/downloads/section.html`. If you needed to add something to the `<head>` section of the downloads page, however, you'd need to copy `layouts/_default/baseof.html` to the `/layouts/downloads` directory and override it there. 



