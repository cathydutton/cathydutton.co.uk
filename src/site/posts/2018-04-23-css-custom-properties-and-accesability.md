---
title: CSS custom properties and accessibility
description: A look at CSS custom properties and there uses in building accessible websites
date:   2018-04-02 
tags: CSS, Accessibility
---

Giving users the ability to control the way they see content improves the accessibility and usability of a site. This is traditionally achieved with a <a href="https://en.wikibooks.org/wiki/Cascading_Style_Sheets/User_Style_Sheets" title="User stylesheet information">user stylesheet </a>(although this is no longer supported in Chrome without the use of additional plugins).

In site features that allow a user to change the way content is displayed are nothing new, but with CSS custom properties are much easier to implement. 

CSS custom properties are the improved alternatives to the variables available in pre processing languages like Sass and Less. Unlike compiled variables custom properties allow values to be updated dynamically.

By utilising these real time updates custom properties can be used to allow users to take control of the content they see and customise the experience.

<h2 class="heading">Example 1 - update colour theme </h2>

Themed CSS became common practice with the arrival of Sass variables, by defining a set of colour variables at the top of a partial CSS can be reused quickly and easily. This practice however introduces a lot of duplicate code and CSS bloat.

Because pre processor variables are compiled before build, changes made in the browser have to be pre planned and written out in full. Files like the one below contain duplicate CSS nested under classes that are attached to the body with javaScript.

#### main.css

```
$background-color: #eee;
$text-color: #222;
$link-colour: #3D9970;
$link-colour-hover: #001F3F;

body {
  background-color: $background-color;
  color: $text-color;
}

a {
 colour: $link-colour;
} &:hover {
 Colour: $link-colour-hover;
}

@import 'theme-dark';
@import 'theme-monochrome';

```

#### theme-dark.css

```
$background-color: #111;
$text-color: #FFF;
$link-colour: #FFDC00;
$link-colour-hover: #048386;

.theme-dark {
  background-color: $background-color;
  color: $text-color;

  a {
    color: $link-colour;

    &:hover {
      color: $link-colour-hover;
    }

  }

```

With custom properties this duplication is removed, the property values do not need to be complied meaning they can be updated in real time in the browser. The above Sass example can now be replaced with this…

#### main.css

```
:root {
  --background-color: #111;
  --text-color: #FFF;
  --link-colour: #FFDC00;
  --link-colour-hover: #048386;
}

.theme-dark {
  --background-color: #111;
  --text-color: #FFF;
  --link-colour: #FFDC00;
  --link-colour-hover: #048386;
}

body {
  color: var(--colour-black);
  background: var(--colour-white);
}
```

## Naming things is difficult

On a side note naming CSS variables in a meaningful and user friendly way is difficult, naming colour variables that are used in multiple themes is even harder! Each variable name needs to make sense in each instance, without being overly case specific.

#### Bad examples

```
  --border-colour: #999999;
  --text-colour: #333333;

  --colour-one: #333333;
  --colour-two: #333333;
  --colour-three: #333333;

  --orange: #FB820A;
  --red: #ED0C0C;
```

 The problem with the names like --orange and --red is they aren't reusable, when we switch themes red may no longer be red.
 
 By referencing each property like --border-colour and --text-colour we risk having an unmanageable number of variables to work with, and could end up with duplicate values.
 
 Finally names with no context like  --colour-one and  --colour-two become difficult to work with on large scale projects.

 Colour variable names should be scalable and easy to manage, it also should be obvious what each variable represents in any theme just by looking at it's name.

#### Good examples

```
  --colour-primary: #001F3F;
  --colour-secondary: #E0F0FF;
  --colour-tertiary: #3D9970;

  --colour-dark: #001F3F;
  --colour-light: #E0F0FF;
  --colour-bright: #3D9970;

  --colour-error: #A91919;
```


#### Three theme example


```
:root {
  --colour-black: #001429;
  --colour-dark: #001F3F;
  --colour-medium: #003D7A;
  --colour-light: #E0F0FF;
  --colour-white: #FFFFFF;
  --colour-bright: #3D9970;
  --colour-error: #A91919; 
}

.theme-dark {
  --colour-black: #FFFFFF;
  --colour-dark: #AAAAAA;
  --colour-medium: #2ECC40;
  --colour-light: #048386; 
  --colour-white: #111111;
  --colour-bright: #FFDC00; 
  --colour-error: #FF851B;
}

.theme-monochrome {
  --colour-black: #BD9562;
  --colour-dark: #AB773F;
  --colour-medium: #553C1C;
  --colour-light: #3c240d;
  --colour-white: #211505;
  --colour-bright: #AF8857;
  --colour-error: #A37A48; 
}
```

Once we have the variables properties assigned for each theme we can use JavaScript to add a class name to the body.


```
themeDefault.onclick = function(){
    body.className = "theme-default";
  };

 themeDark.onclick = function(){
    body.className = "theme-dark";
  };

themeMonochrome.onclick = function(){
  body.className = "theme-monochrome";
  };
```

This is great, until the user navigates to a new page or refreshes the browser. To solve this issue we can store the value of the custom property using local storage, and then check for a saved value on page load.

```
body.className = localStorage.getItem("currentTheme");
```

```
themeDefault.onclick = function(){
  body.className = "theme-default";
  localStorage.setItem("currentTheme", 'theme-default');
};

themeDark.onclick = function(){
  body.className = "theme-dark";
  localStorage.setItem("currentTheme", 'theme-dark');
};

themeMonochrome.onclick = function(){
  body.className = "theme-monochrome";
  localStorage.setItem("currentTheme", 'theme-monochrome');
};
```
<h4 class="heading">Demo</h4>

<p data-height="500" data-theme-id="8492" data-slug-hash="paBMBE" data-default-tab="css,result" data-user="cathydutton" data-embed-version="2" data-pen-title="Custom property colour themes" class="codepen">See the Pen <a href="https://codepen.io/cathydutton/pen/paBMBE/">Custom property colour themes</a> by Cathy Dutton (<a href="https://codepen.io/cathydutton">@cathydutton</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>


<h2 class="heading"> Example 2 - update a font</h2>

Updating a font type can also be achieved without custom properties using a body class...

```
const body = document.body;

body.classList.add("comic-sans");

body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

comic-sans {
  font-family: "Comic Sans MS", "Comic Sans", cursive;
}
```

There is nothing wrong with this approach in this instance, but if you are allowing users to update multiple properties for example font type and colour theme you could end up with a lot of additional classes.

An alternative approach is to declare the font just once in CSS using a custom property.

```
:root {
  --font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; 
}

body {
  font-family: var(--font-family);
}

```

And allow users to update this value through javaScript

```
// Global
const body = document.body;
const root = document.querySelector(':root');
const rootStyles = getComputedStyle(root);

dyslexicFont.onclick = function(){
  body.style.setProperty('--font-family', '"Comic Sans MS", "Comic Sans", cursive');
};

defaultFont.onclick = function(){
  body.style.setProperty('--font-family', rootStyles.getPropertyValue('--font-family'));
};

```
When either button is clicked the value of the custom property --font-family is updated across the page, again we can store these values in local storage to save a users preferences...

````
// If no local storage value exists create one
if (!fontFamily) {
    body.style.setProperty("--font-family", localStorage.getItem("fontFamily"));
}

// Get current value
var fontFamily = getComputedStyle(body).getPropertyValue('--font-family');


dyslexicFont.onclick = function(){
  body.style.setProperty('--font-family', '"Comic Sans MS", "Comic Sans", cursive');
  localStorage.setItem("fontFamily", '"Comic Sans MS", "Comic Sans", cursive');
};

defaultFont.onclick = function(){
  body.style.setProperty('--font-family', rootStyles.getPropertyValue('--font-family'));
  localStorage.setItem("fontFamily", rootStyles.getPropertyValue('--font-family'));
};

```

<h4 class="heading">Demo</h4>

<p data-height="500" data-theme-id="8492" data-slug-hash="OQrGab" data-default-tab="css,result" data-user="cathydutton" data-embed-version="2" data-pen-title="Custom property font switcher" class="codepen">See the Pen <a href="https://codepen.io/cathydutton/pen/OQrGab/">Custom property font switcher</a> by Cathy Dutton (<a href="https://codepen.io/cathydutton">@cathydutton</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>


<h2 class="heading">Example 3 - update text size</h2>

Updating the text size for a site is slightly more complex, in this example simply adding a class to the body would not work, (unless you want a stylesheet full of classes for every available size).

The concept here is similar to updating the font, but instead of assigning a new value to the property we amend it.

```
:root {
  --font-size: 1.188em;
}

body {
  font-size: var(--font-size)
}
```

#### Increase text size

```
increaseFont.onclick = function(){
    var number = parseFloat(fontSize) 
    number += 0.2
    fontSize = number;
    body.style.setProperty('--font-size', number + 'em');
    localStorage.setItem("fontSize", number + 'em');
};
```

#### Decrease text size
```

decreaseFont.onclick = function(){
    var number = parseFloat(fontSize) 
    number -= 0.2
    fontSize = number;   
    body.style.setProperty('--font-size', number + 'em');
    localStorage.setItem("fontSize", number + 'em');
};

```

When each button is clicked the current value of --font-size is taken and either increased or decreased. The parseFloat() function is used to first strip the unit from the property and then convert the value from a string to an integer.

<h4 class="heading">Demo</h4>

<p data-height="500" data-theme-id="8492" data-slug-hash="YedMRP" data-default-tab="css,result" data-user="cathydutton" data-embed-version="2" data-pen-title="Custom property text size" class="codepen">See the Pen <a href="https://codepen.io/cathydutton/pen/YedMRP/">Custom property text size</a> by Cathy Dutton (<a href="https://codepen.io/cathydutton">@cathydutton</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>


 