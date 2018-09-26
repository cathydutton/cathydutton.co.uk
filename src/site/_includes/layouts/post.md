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


<h3>Share this post</h3>
<p>Share this on this post on Twitter, Facebook or Google</p>

<div class="share-post">
  
  <a href="https://twitter.com/intent/tweet?text={{ title }}&url={{ post.url }}&via=cathy_dutton&related=cathy_dutton" rel="external"  target="_blank" class="share-post__anchor share-post__twitter" title="Share on Twitter"><span class="visually-hidden">Share on </span>Twitter</a>
    
  <a href="https://facebook.com/sharer.php?u={{ post.url }}" class="share-post__anchor share-post__facebook" rel="external" target="_blank" title="Share on Facebook"><span class="visually-hidden">Share on </span>Facebook</a>
    
  <a href="https://plus.google.com/share?url={{ post.url }}" class="share-post__anchor share-post__google" rel="external" target="_blank" title="Share on Google+"><span class="visually-hidden">Share on </span>Google+</a>

</div>
