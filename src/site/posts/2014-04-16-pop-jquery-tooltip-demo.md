---
title: Pop jQuery tooltip demo
description: jQuery tooltip demo and code
date: 2014-04-16
tags: [JavaScript, Front end development]
---

Pop is a simple to use, responsive jQuery tooltip with css animations. The jQuery is written below and includes a click function as well a hover to support desktop and touch screen devices.

<a href="https://cathydutton.co.uk/pop/" target="_blank" class="button">View demo</a>

```
$(document).ready(function () {

  $(".button").mouseenter(function () {
  $(this).prev("div").fadeIn("slow");
  })

  .click(function () {                 // tablet friendly
  $(this).prev("div").fadeIn("slow");
  })

  .mouseout(function () {
  $(this).prev("div").fadeOut("slow");
  });

  $(".tooltip").click(function () {    // tablet friendly
  $(this).fadeOut("slow");
  });

});
```

The HTML used in the example is also pasted below

```
&lt;div class="wrapper"&gt;
  &lt;h1&gt;Pop&lt;/h1&gt;
  &lt;h2&gt;A simple jQuery and css3 tooltip example&lt;/h2&gt;
  &lt;p&gt;Hover over one of the 3 boxes below to view the tooltip.&lt;/p&gt;
  &lt;div class="container"&gt;
    &lt;div class="inner-wrap"&gt;
      &lt;div class="tooltip"&gt;Pop Out Text One&lt;/div&gt;
      &lt;div class="button"&gt;One&lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="inner-wrap"&gt;
      &lt;div class="tooltip"&gt;Pop Out Text Two&lt;/div&gt;
      &lt;div class="button"&gt;Two&lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="inner-wrap"&gt;
      &lt;div class="tooltip"&gt;Pop Out Text Three&lt;/div&gt;
      &lt;div class="button"&gt;Three&lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;

```

A <a href="https://cathydutton.co.uk/pop/" target="_blank">Demo</a> of the tooltip is available <a href="https://cathydutton.co.uk/pop/" target="_blank">here</a> and can be downloaded from <a href="https://github.com/cathydutton/Pop" target="_blank">GitHub</a> or viewed on <a href="http://codepen.io/cathydutton/pen/yctrI" target="_blank">CodPen</a>.

The sass used in the example is written below&#8230;

```
/* Variabes */  
$orange: #ffa600;
$grey:#f3f3f3;
$white: #fff;
$base-color:$orange ;


/* Mixin */
@mixin clear {
overflow: hidden;
position: relative;
}
 @mixin box-size {
-webkit-box-sizing: border-box;
-moz-box-sizing: border-box;
box-sizing: border-box;
*behavior: url(boxsizing.htc);
}
 @mixin transition {
-webkit-transition: all 0.3s ease-in-out;
-moz-transition: all 0.3s ease-in-out;
transition: all 0.3s ease-in-out;
}
@mixin fade {
-moz-transition: all 1s ease-in;
-moz-transition:all 0.3s ease-in-out;
-webkit-transition:all 0.3s ease-in-out;
}
@mixin opacity {
opacity:0.4;
filter:alpha(opacity=40);
include: fade;
}
@mixin corners ($radius) {
-moz-border-radius: $radius;
-webkit-border-radius: $radius;
border-radius: $radius;
-khtml-border-radius: $radius;
}

/* Grid  */

/* Media Queries    */
$break-large: 767px;
$break-small: 480px;


@mixin break($media, $width) {
	@if $media == tablet {
	@media only screen and (max-width: $break-large) {
	width:$width - $gutter;
	margin-left:0;
	margin: $gutter / 2;
	}
}
	@else if $media == mobile {
	@media only screen and (max-width: $break-small) {
	width:$width - $gutter;
	margin: $gutter / 2;
	}
}

}


$grid-columns: 12;
$unit: (100%  / $grid-columns) ;
$gutter: 2%;
$push: 0 !default;
$gutter2: 0;

@mixin grid($col, $push) {
float: left;
width: (($unit * $col) - $gutter ) + ( $gutter / ( $grid-columns / $col) ) ;
padding:20px;
@include box-size;
@include transition;
margin-right: $gutter;
	@if $push &gt; 1 {
	margin-left:(($unit * $push) ) + ( $gutter / ( $grid-columns / $push) );
	}
	&:last-child {
	margin-right:0;

	}
}


/* Main Layout Blocks */
.wrapper {
@include clear;
max-width: 1000px;
margin: 30px auto;
}
.container {
@include clear;
width: 100%;
margin: 10px 0;
}
.inner-wrap {
	@include clear;
@include grid(4,  0);
@include break(mobile, 100%);
}

.link{
@include grid(6,  0);
@include break(mobile, 100%);
}



body {
background:$base-color;
font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
text-align:center;
color:$white;
height:100%;
@include transition;
}

%headers {
font-family: &#039;Roboto&#039;, sans-serif;
font-weight: 100;
text-transform: uppercase;
padding:0;
margin:0;
}



h2 {
@extend %headers;
font-size: 1.2em;
margin-bottom:10px
}

.inner-wrap{
position:relative;
}

.tooltip{
display:none;
position:absolute;
top: 0;
width:90%;
background:$white;
border: solid 1px $white;
color:$orange;
padding:20px 10px;
@include corners(5px);
@include box-size;


}

.tooltip:after
{
content: &#039;&#039;;
position: absolute;
border-style: solid;
border-width: 15px 15px 0;
border-color: #FFFFFF transparent;
display: block;
width: 0;
z-index: 1;
bottom: -15px;
left: 45%;
}

%buttons{
@include corners(5px);
position:relative;
bottom:0;
text-decoration:none;
cursor:pointer;
font-size:1.2em;
margin-top:100px;
padding:20px 10px;
&:hover{
	@include fade;
	background:$orange;
	border: solid 1px $white;
	color:$white;
	}
}


.button{
@extend %buttons;
background:$orange;
color:$white;
border: solid 1px $white;
}

.link{
@extend %buttons;
background:$white;
color:$orange;
border: solid 1px $orange;
}
```
