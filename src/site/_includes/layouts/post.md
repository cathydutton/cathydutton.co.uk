---
layout: layouts/base.njk
templateEngineOverride: njk, md
---

<h1>{{ title }}</h1>
<p class="post--date">
  Published on <time datetime="{{ date }}">{{ date | dateDisplay }}</time>
</p>
<main>
  {{ content | safe }}
</main>
