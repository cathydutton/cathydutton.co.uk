---
title: Structuring your Sass
description: How to structure a Sass project
date: 2014-03-25
---

When setting up a new web project getting things right from the beginning is hugely important. Using Sass, style sheets can now be split into more manageable chunks without adding extra http requests. The Bear boilerplate (created following <a href="https://cathydutton.co.uk/css/the-dreaded-front-end-framework" >this</a> earlier post) splits CSS into the following 5 sections&#8230;

<ul class="list">
  <li>
    Vendor
  </li>
  <li>
    Base
  </li>
  <li>
    Framework
  </li>
  <li>
    Modules
  </li>
  <li>
    Theme
  </li>
</ul>

**Vendor** &#8211; This folder contains third party Sass files such as normalize and Font Awesome. More files can be added as and when they are needed such as print resets and browser fallbacks.

**Base** &#8211; This folder contains the starting points for the project, global variables, mixins and placeholders.

**Framework** &#8211; Here the layout of the site is defined with a grid function (<a href="http://get-maze.co.uk/">Maze</a>) and breakpoints. The layout.scss file is used to create the page wireframe blocks.

**Modules** &#8211; Reusable blocks of code are defined including list items, buttons and typography.

**Theme** &#8211; The theme files contain the sites unique styling elements broken down in to site sections including Header, Footer, Nav etc.

Below is the start up style.scss file used to pull in each sub file&#8230;

```
/* ==========================================================================

  	Bear Scss Structure
 	   - https://cathydutton.co.uk
  	Version: 0.1.1


/* VENDOR - Default fall backs & external .scss files.
========================================================================== */

	@import &#039;vendor/_normalize.scss&#039;;


/* Base - Base variable file along with starting points mixins & placeholders.
========================================================================== */

	@import &#039;base/_base.scss&#039;;
	@import &#039;base/_mixins.scss&#039;;
	@import &#039;base/_placeholders.scss&#039;;



/* FRAMEWORK - Structure & layout files including the Maze grid function.
========================================================================== */

	@import &#039;framework/_grid.scss&#039;;
	@import &#039;framework/_layout.scss&#039;;
	@import &#039;framework/_breakpoints.scss&#039;;


/* MODULES - Individual site elements.
========================================================================== */

	@import &#039;modules/_buttons.scss&#039;;
	@import &#039;modules/_lists.scss&#039;;
	@import &#039;modules/_color-manipulation.scss&#039;;


/* Theme - Theme styles for each area of the site.
========================================================================== */
	@import &#039;theme/_header.scss&#039;;
	@import &#039;theme/_nav.scss&#039;;
	@import &#039;theme/_main.scss&#039;;
	@import &#039;theme/_footer.scss&#039;;
	@import &#039;theme/_shame.scss&#039;;


/* WEB FONTS - Google web font include.
========================================================================== */

	@import url(http://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,400italic,500,900italic,900,500italic,700,700italic);

```

<h2 class="heading">Expansion</h2>

The structured folders make future development much easier, allowing anybody to quickly find the files they wish to edit or to add new mixins and placeholders.

The site structure can also be expanded for larger or more complex projects, each theme component for example can be expanded to include a layout and style section, replacing the generic layout file used for smaller projects.

The full set of files can be viewed or downloaded from <a href="https://github.com/cathydutton/bear" target="_blank">GitHub</a>.
