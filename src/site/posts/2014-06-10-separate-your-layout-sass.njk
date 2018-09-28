---
title: Separate Your Layout and skin Sass files
description: A look at CSS layout and styling files
date: 2014-06-10
tags: [CSS, Front end development]
---

One of the greatest things about Sass is the ability it provides to separate large files in to more manageable chunks of code. When working on large or complex sites and future proofing code this becomes even more significant.

Without adding any additional requests to the web site&#8217;s head or effecting site speed and load times, css can be split out in to easy to manage folders and files. Developers should never again be faced with an endless css file packed with all the theming, styles, colours, typography, structure and media queries of an entire website.

This provides the perfect opportunity to separate the layout and structural css from the style or &#8216;skin&#8217; css. In doing this the code becomes much easier to maintain, and if necessary to change or update in the future.

<h2 class="heading">Layout.scss </h2>

The layout file should be for structural styles only, building the wireframe of a page without applying any of it&#8217;s look or feel. The layout.scss file will therefore remain small and easy to follow for any developer picking up the project and needing to make a quick edit to the page layout.

<h2 class="heading">Example</h2>

The example code below uses the Maze grid system to demonstrate. The example shows three layout blocks **.logo**, **.search** and **.social-share** within the row **.container**. Using the grid mixin each selector in the row is assigned a column span with all 3 adding up to 12. (More information on the grid set up can be found <a href="https://cathydutton.co.uk/css/maze-responsive-grid-framework" title="Maze - Sass grid system" target="_blank">here</a>).

<header class="container">

<div class="demo-logoo">
  Logo
</div>

<div class="demo-searchh">
  Search
</div>

<div class="demo-social-share">
  Social
</div></header>

```
&lt;!-- Header --&gt;
&lt;header class="container"&gt;
    &lt;div class="logo"&gt;Logo&lt;/div&gt;
    &lt;div class="search"&gt;Search&lt;/div&gt;
     &lt;div class="social-share"&gt;Social&lt;/div&gt;
  &lt;/header&gt;
&lt;!--End  Header --&gt;
```

```
.container {
	@include clearfix;
	width: 100%;
	margin: 10px 0;
}

.logo {
   @include grid(3);
}

.search {
   @include grid(6);
}

.social-share {
   @include grid(3);
}
```

The css above is easy to read as each selector has only the layout includes assigned to it. As pages get bigger and more elements are added keeping the grid includes clear and easy to find becomes essential. Making changes to the widths or even adding in a new column can be easily done by adjusting the values passed to the grid mixin.

<h3 class="heading">Adding a new column&#8230; </h3>
<header class="container">

<div class="demo-logoo">
  Logo
</div>

<div class="demo2-search">
  Search
</div>

<div class="demo2-social-share">
  Social
</div>

<div class="demo2-call-us">
  Call Us
</div></header>

```
.logo {
   @include grid(3);
}
.search {
   @include grid(3);
}
.social-share {
   @include grid(3);
}
.call-us {
   @include grid(3);
}
```

<h3 class="heading">Taking things a step further </h3>

The break point mixin can also be added to the layout file helping to keep all the layout properties together. For responsive sites I also recommend creating a third style sheet to deal solely with the media queries.

```
.logo {
  @include grid(3);
  @include breakpoint(tablet, 6);
}
```

The separate Sass files can be compiled using a base style.scss file. Below is an example of how that stylesheet would look using folders for the three separated sass files on each page.

```
/* PRODUCT PAGE - Unique product page styles
========================================================================== */

	@import &#039;product-page/_layout.scss&#039;;
	@import &#039;product-page/_theme.scss&#039;;
	@import &#039;product-page/_responsive.scss&#039;;


/* CATEGORY PAGE - Unique category page styles
========================================================================== */

	@import &#039;category-page/_layout.scss&#039;;
	@import &#039;category-page/_theme.scss&#039;;
	@import &#039;category-page/_responsive.scss&#039;;

```
