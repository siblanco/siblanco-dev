---
isDraft: false
title: Elemente im DOM verschieben
description: Wie du Elemente im DOM ganz einfach hin und her verschiebst.
date: 2020-04-22T13:50:11
tags: ["javascript"]
---

Gehen wir von folgendem HTML Code aus:

```html
<section>
  <h1>Hello World</h1>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam possimus
    expedita aliquid sit eveniet impedit qui dolorem deleniti magni magnam?
  </p>
</section>

<div class="absolute">
  <img src="..." alt="Bild" />
</div>
```

Lass uns die div.absolute in die section verschieben:

```javascript
const div_absolute = document.querySelector("div");
document.querySelector("section").appendChild(div_absolute);
```

Unsere div ist nun das letzte Kind der section. Lass uns die div wieder in die section verschieben. Dieses Mal soll sie aber an erster Stelle stehen (ausgehend von Originalzustand):

```javascript
const div_absolute = document.querySelector("div");
const section = document.querySelector("section");

section.insertBefore(div_absolute, section.firstElementChild);
```

Tada, unsere div ist jetzt an erster Stelle in der section. Lies dich hier schlauer über `nodes`: [https://developer.mozilla.org/en-US/docs/Web/API/Node](https://developer.mozilla.org/en-US/docs/Web/API/Node).
