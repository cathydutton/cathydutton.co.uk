---
title: 'Sass structure &#8211; layout and theme files'
description: Structuring a frontend project - CSS
date: 2014-06-13
---

Following on from this post <a href="https://cathydutton.co.uk/css/separate-your-layout-sass" target="_blank" title="Layout Sass file" >&#8216;Separate Your Layout and skin Sass files&#8217;</a> I put together a larger working example to further demonstrate the theory.

<a href="https://cathydutton.co.uk/grid/" target="_blank" class="button">View demo</a>

<h2 class="heading">Base stylesheet &#8211; style.scss </h2>

Style.scss is used to pull in all the usual folders for base styles, framework mixins, modules and vendor includes. There is also a folder for each page or section of the website which is broken down into 3 sections, layout, theme and responsive.

```
/* DEMO STYLESHEET
==========================================================================


/* VENDOR - Default fall backs & external .scss files.
========================================================================== */

	@import &#039;vendor/_normalize.scss&#039;;


/* BASE - Base variable file along with starting point mixins & placeholders.
========================================================================== */

	@import &#039;base/_base.scss&#039;;
	@import &#039;base/_mixins.scss&#039;;
	@import &#039;base/_placeholders.scss&#039;;


/* FRAMEWORK - Structure & layout files including the Maze grid function.
========================================================================== */

	@import &#039;framework/_grid.scss&#039;;
	@import &#039;framework/_breakpoints.scss&#039;;


/* MODULES - Reusable site elements.
========================================================================== */

	@import &#039;modules/_buttons.scss&#039;;
	@import &#039;modules/_lists.scss&#039;;
	@import &#039;modules/_tabs.scss&#039;;


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

<h2 class="heading">Layout stylesheet &#8211; layout.scss </h2>

This stylesheet holds all of the structural css for a specific page or section of a website. separating the wireframe from the styling css keeps it clean and easy to edit/maintain.

```
/* LAYOUT STYLES
==========================================================================

// Seperated layout styles to create the page framework.


/* CONTAINERS
========================================================================== */

.full-width{
	margin: 30px auto;
	padding: 0 10px;
  @include clearfix;
}

.wrapper{
	margin: 30px auto;
	padding: 0 10px;
	@include clearfix;
}


/* 3 COLUMNS
========================================================================== */

.logo {
	@include grid(3);
	@include breakpoint(tablet, 12);
}

.search {
	@include grid(6);
	@include breakpoint(tablet, 6);
}

.contact {
	@include grid(3);
	@include breakpoint(tablet, 6);
}


/* 4 COLUMNS
========================================================================== */

.tab {
	@include grid(3);
	@include breakpoint(desktop, 6);
}


/* EQUAL HEIGHT
========================================================================== */

.equal-height {
	@include grid(4);
	@include breakpoint(tablet, 12);
	margin-bottom: -99999px;
	padding-bottom: 99999px;
}

/* NESTED
========================================================================== */

.nest-left{
	@include grid(6);
	@include breakpoint(desktop, 12);
}

.nest-right{
	@include grid(6);
	@include breakpoint(desktop, 12);
}

.nest-right-one{
	@include grid(6);
	@include breakpoint(tablet, 12);
}

.nest-right-two{
	@include grid(6);
	@include breakpoint(tablet, 12);
}


/* GRID - CENTERED
========================================================================== */

.center-child {
	@include grid(2);
}

.center-child2 {
	@include grid(4);
}

```

<h3 class="heading">Skin stylesheet &#8211; theme.scss </h3>

The theme sass file contains all of the styling or theme css for a specific page or section of a website.

```
/* THEME STYLES
==========================================================================

// Page specific styles and theming.


/* TYPE
========================================================================== */

%header {
	text-align: center;
	font-family: ozBold, Arial, Helvetica, sans-serif;
	font-weight: normal;
	color:#fff;
}

h1 {
	@extend %header;
	font-size: 36px;
	line-height: 36px;
	margin-bottom:20px;
}

h2,h3, h4 {
	@extend %header;
	font-size: 26px;
	line-height: 26px;
	margin-bottom:20px;
}

h6 {
	@extend %header;
	font-size: 20px;
	line-height: 20px;
	margin-bottom:40px;
	margin-top:0;
}

p {
	font-family: Arial, Helvetica, sans-serif;
	font-weight: normal;
	font-size:16px;
}


/* 3 COLUMNS
========================================================================== */

.logo, .search, .contact {
	height:70px;
	background: #fff;
	text-align:center;
}


/* 4 COLUMNS
========================================================================== */

.tab {
	height:70px;
	background: #fff;
	text-align:center;
}


/* EQUAL HEIGHT
========================================================================== */

.equal-height {
	background: #fff;
	text-align:center;
	padding-top:25px;
	padding-right:10px;
	padding-left:10px;
}

/* NESTED
========================================================================== */

.nest-left {
	height:90px;
	background: #fff;
}

.nest-right {
	background: #fff;
	padding:10px;
}

.nest-right-one {
	height:70px;
	background: #f3f3f3;
	border:solid 1px #e3e3e3;
}

.nest-right-two {
	height:70px;
	background: #f3f3f3;
	border:solid 1px #e3e3e3;
}

/* CENTERED
========================================================================== */

.center-child, .center-child2 {
	height: 100px;
	background:#fff;
}
```

<h3 class="heading">Media query stylesheet &#8211; respond.scss </h3>

The media query sass file holds all the device dependant css. Keeping this in a separate file to the skin and layout css allows for specific device styles to be located and edited easily.

```
/* RESPONSIVE STYLES
==========================================================================

// Media queries arranged in size order largest to smallest.


/* WIDE SCREEN
========================================================================== */
@media (min-width:($break-desktop))  {
	body {
		background:#ffa600;
		p {
			color:#ffa600;
		}
	}
}

/* DESKTOP
========================================================================== */

@media (max-width:$break-desktop) and (min-width : $break-tablet) {
	body {
		background:#82d2e5;
		p{
			color:#82d2e5;
		}
	}
}

/* TABLET
========================================================================== */

@media (max-width:$break-tablet) and (min-width : $break-mobile) {
	body {
		background:#c1d72e;
		p{
			color:#c1d72e;
		}
	}
	.equal-height{
		margin-bottom: 0;
		padding-bottom: 0;
	}
}


/* MOBILE
========================================================================== */

@media (max-width:$break-mobile) {
	body {
		background:#333;
		p{
			color:#333;
		}
	}
	.equal-height{
		margin-bottom: 0;
		padding-bottom: 0;
	}
}
```
