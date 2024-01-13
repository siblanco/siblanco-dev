---
isDraft: false
title: Wie baue ich einen Parallax Effekt?
description: Parallax Effekt mit vanilla JavaScript und CSS
date: 2019-11-30T00:51:53
tags: ["css", "javascript"]
---

## Parallax?

Bei einem Parallax Effekt lauschen wir auf das Scrolling des Users und passen die Position eines Bildes entsprechend an – entweder `translaten` wir es runter, oder eben hoch. Ein bisschen HTML:

```html
<div class="parallax">
  <img src="./spacebg" alt="Bild eines Planeten" />
</div>
```

Dazu das passende CSS:

```css
.parallax {
  /* damit man unser Bild nicht außerhalb dieses Containers sieht */
  overflow: hidden;
}
.parallax img {
  display: block;
  max-width: 100%;
}
```

Nichts besonderes, alles selbsterklärend. Kommen wir zum spaßigen Teil, dem JavaScript:

```javascript
// index.js
document.addEventListener("scroll", () => {
  const img = document.querySelector(".parallax img"),
    imgPos = img.getBoundingClientRect().top + window.pageYOffset,
    scrollHeight = window.pageYOffset;

  if (scrollHeight <= imgPos) {
    img.style.transform = "translateY(0)";
    return;
  }

  const newImgPos = (scrollHeight - imgPos) * 0.8;
  img.style.transform = `translateY(${newImgPos}px)`;
});
```

Die Methode `getBoundingClientRect()` gibt die Größe eines Elementes und dessen relative Position zum Viewport zurück. Beim Scrollen ändert sich dieser Wert also, wie gesagt, relativ zum Viewport. Wir hören auf das scroll Event und transformen die Position des Bildes, wenn der User weiter gescrollt hat, als `imgPos`. Sobald `getBoundingClientRect().top <= 0` ist, ist das Bild im Viewport ganz oben und die `scrollHeight`wird größer als `imgPos`. Wir verschieben das Bild parallel zum Scrollen, mit `* 0.8` stellen wir die Intensität ein.
