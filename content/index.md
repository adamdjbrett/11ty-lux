---
title: 11ty Lux
description: A 11ty Lux starter themes for eleventy projects.
layout: start.njk
image: 
pagination:
  data: collections.posts
  size: 5
  reverse: true
testdata:
 - item1
 - item2
 - item3
 - item4
permalink: "/{% if pagination.pageNumber > 0 %}/{{ pagination.pageNumber + 1 }}/{% endif %}index.html"
---
