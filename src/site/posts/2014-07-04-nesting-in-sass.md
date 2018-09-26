---
title: Say no to nesting
description: The problems with Sass nesting
date: 2014-07-04
tags: [CSS]
---

Sass, as well as making style sheets awesome, was created to take some of the pain out of writing css. It&#8217;s main purpose is to make code easier and quicker to write, modify and build upon. There are a lot of features within Sass which help achieve this, Variables, Lists, Mixins and loops to name a few.

Nesting however does none of the above and has to be my least favourite and least used feature of Sass. Nesting delivers the complete opposite of the desired Sass effect, adding confusion to stylesheets and increasing code repetition.

Scrolling through a stylesheet full of nested selectors is every bit as painful as the old fashioned 1000 plus lined css file. The Sass used is no more usable then vanilla css, is difficult to expand upon and creates selectors which are over reliant on HTML.

<h2 class="heading">Nested example </h2>

The example below demonstrates the effect of nesting selectors on a simple navigation&#8230;

**HTML**

```
&lt;nav class="primary-navigation"&gt;
&lt;ul&gt;
&lt;li&gt;Home&lt;/li&gt;
&lt;li&gt;About us&lt;/li&gt;
&lt;li&gt;Services&lt;/li&gt;
&lt;li&gt;Contact&lt;/li&gt;
&lt;/ul&gt;
&lt;/nav&gt;
```

**Sass**

```
.primary-navigation {

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
  	float:left;
  }

  a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
    color:grey;
    background:white;
  }

    a:hover {
    text-decoration: undeline;
  }

}
```

**CSS**

```
.primary-navigation ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.primary-navigation li {
  float:left;
}

.primary-navigation a {
  display: block;
  padding: 6px 12px;
  text-decoration: none;
  color:grey;
  background:white;
}

.primary-navigation a:hover {
  text-decoration: underline;
}
```

The nested Sass creates the very specific css selectors above, this css output is difficult to re-use and relies completely on the HTML structure. The problem with this becomes apparent when a secondary navigation is added&#8230;.

**HTML**

```
&lt;nav class="secondary-navigation"&gt;
&lt;ul&gt;
&lt;li&gt;Terms and conditions&lt;/li&gt;
&lt;li&gt;Privacy Policy&lt;/li&gt;
&lt;li&gt;Sitemap&lt;/li&gt;
&lt;/ul&gt;
&lt;/nav&gt;
```

None of the css already written can be used on this secondary navigation as the selectors are too specific due to the nested Sass approach. To style this navigation we would need to add the below Sass creating another chunk of css which is mostly duplicated code&#8230;

**Sass**

```
.secondary-navigation {

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
  	float:left;
  }

  a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
    color:white;
    background:black;
  }

    a:hover {
    text-decoration: undeline;
  }

}
```

**CSS**

```
.secondary-navigation ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.secondary-navigation li {
  float:left;
}

.secondary-navigation a {
  display: block;
  padding: 6px 12px;
  text-decoration: none;
  color:white;
  background:black;
}

.secondary-navigation a:hover {
  text-decoration: underline;
}

```

<h2 class="heading"> A better way </h2>

A much cleaner approach would be to add a class to each HTML element creating selectors with no reliance or hierarchy&#8230;

**HTML**

```
&lt;nav class="primary-navigation"&gt;
&lt;ul&gt;
&lt;li class="navigation-item"&gt;Home&lt;/li&gt;
&lt;li class="navigation-item"&gt;About us&lt;/li&gt;
&lt;li class="navigation-item"&gt;Services&lt;/li&gt;
&lt;li class="navigation-item"&gt;Contact&lt;/li&gt;
&lt;/ul&gt;
&lt;/nav&gt;

&lt;nav class="secondary-navigation"&gt;
&lt;ul&gt;
&lt;li class="navigation-item"&gt;Terms and conditions&lt;/li&gt;
&lt;li class="navigation-item"&gt;Privacy Policy&lt;/li&gt;
&lt;li class="navigation-item"&gt;Sitemap&lt;/li&gt;
&lt;/ul&gt;
&lt;/nav&gt;

```

**CSS**

```
/* Styling for both navigation areas */
nav ul  {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .navigation-item{
    float:left;
  }

  .navigation-item a{
     display: block;
     padding: 6px 12px;
     text-decoration: none;
  }

  .navigation-item a:hover{
       text-decoration: undeline;
  }

/* Styling for primary navigation */
.primary-navigation {
  color:grey;
  background:white;
}

/* Styling for secondary navigation */
.secondary-navigation {
  color:white;
  background:black;
}
```

<h3 class="heading"> Not all bad </h3>

Nesting however is not all bad, if used correctly. Sticking with the example from above we can use nesting to style the **a** and **a:hover** selectors. These selectors will always be associated with the **.navigation-item** class and by using nesting are easier to maintain should that class change in the future

**Sass**

```
.navigation-item{
    float:left;

    a{
     display: block;
     padding: 6px 12px;
     text-decoration: none;
  }

    a:hover{
       text-decoration: undeline;
  }

}
```

<h3 class="heading"> Keep it simple </h3>

In summary becoming to reliant on nesting can create over specific css selectors making it almost impossible to re-use code. It can also create large un manageable chunks of css that other developers will find difficult to work with (particularly if the code doesn&#8217;t fit neatly into a coding window). Nesting however does have a place if kept to a minimum (2 or 3 layers deep) and used only where necessary.
