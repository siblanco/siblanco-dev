---
isDraft: false
title: Wie baue ich einen Slider?
description: Kurz und knackig &#8211; Slider mit Überblenden
date: 2020-02-13T23:08:43
tags: ["css", "javascript"]
---

## Moin!

Habe etwas länger nichts mehr hören lassen, aber du weißt ja wie das ist.  
Ich probiere jetzt auf jeden Fall mehr am Ball zu bleiben.

## HTML Markup

Fangen wir mit dem HTML Markup an. Unser Slider wird nur aus Bildern und Indikatoren bestehen.

```html
<section class="slider">
  <div class="images">
    <img class="active" src="images/1.jpg" alt="1" />
    <img src="images/2.jpg" alt="2" />
    <img src="images/3.jpg" alt="3" />
    <img src="images/4.jpg" alt="4" />
    <img src="images/5.jpg" alt="5" />
  </div>
  <ul class="indicators">
    <li class="active"> </li>
    <li> </li>
    <li> </li>
    <li> </li>
    <li> </li>
  </ul>
</section>
```

5 Bilder mit 5 Indikatoren, wobei die jeweils ersten eine `active` Klasse haben.

## Das passende CSS

```css
*,
*::after,
*::before {
  box-sizing: inherit;
  margin: 0;
  padding: 0;
}

body {
  box-sizing: border-box;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: bisque;
}

footer {
  position: fixed;
  bottom: 10px;
  right: 10px;
}

footer p {
  color: chocolate;
}

footer p a {
  color: chocolate;
}

.slider {
  width: 320px;
  height: 320px;
  box-shadow: 0 7px 12px rgba(0, 0, 0, 0.15);
}

@media screen and (min-width: 768px) {
  .slider {
    width: 750px;
    height: 600px;
  }
}

.slider .images {
  height: 100%;
  width: 100%;
  position: relative;
}

.slider .images img {
  position: absolute;
  object-fit: cover;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.3s ease-out;
}

.slider .images img.active {
  z-index: 1;
  opacity: 1;
}

.indicators {
  list-style: none;
  display: flex;
  justify-content: center;
  margin-top: 25px;
}

.indicators li {
  width: 20px;
  height: 20px;
  border: 2px solid chocolate;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease-out;
}

.indicators li.active,
.indicators li:hover {
  background-color: chocolate;
}

.indicators li:not(:first-child) {
  margin-left: 10px;
}
```

Anstatt Background-Images zu nutzen, nutzen wir ganz normale `img` Tags. Das ist unter anderem besser für SEO. Mit einem Container drumherum und `object-fit: cover; position: absolute;` können wir den gleichen Effekt, wie bei Background-Images erreichen.

## Der JavaScript Part

```javascript
const slideShow = {
  images: [...document.querySelectorAll(".slider .images img")],
  indicators: [...document.querySelectorAll(".slider .indicators li")],

  clearAllImages() {
    this.images.forEach((image, index) => {
      image.classList.remove("active");
      this.indicators[index].classList.remove("active");
    });
  },

  changeImage(index) {
    this.clearAllImages();
    this.images[index].classList.add("active");
    this.indicators[index].classList.add("active");
  },

  handleClicks() {
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", (e) => {
        this.changeImage(index);
      });
    });
  },
};

slideShow.handleClicks();
```

Ich denke das ist selbsterklärend. Falls du irgendeine Frage dazu hast, meld dich einfach. Wir könnten auch ein AutoPlay einbauen:

```javascript
const slideShow = {
  images: [...document.querySelectorAll(".slider .images img")],
  indicators: [...document.querySelectorAll(".slider .indicators li")],
  activeImage: 0,
  autoPlayer: null,

  clearAllImages() {
    this.images.forEach((image, index) => {
      image.classList.remove("active");
      this.indicators[index].classList.remove("active");
    });
  },

  changeImage(index) {
    this.clearAllImages();
    this.activeImage = index;

    this.images[index].classList.add("active");
    this.indicators[index].classList.add("active");
  },

  handleClicks() {
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", (e) => {
        this.resetAutoPlay();
        this.changeImage(index);
      });
    });
  },

  initAutoPlay() {
    this.autoPlayer = setInterval(() => {
      let nextImage;
      if (this.activeImage < this.images.length - 1) {
        nextImage = this.activeImage + 1;
      } else if (this.activeImage === this.images.length - 1) {
        nextImage = 0;
      }
      this.changeImage(nextImage);
    }, 3000);
  },

  resetAutoPlay() {
    window.clearInterval(this.autoPlayer);
    this.initAutoPlay();
  },

  init() {
    this.handleClicks();
    this.initAutoPlay();
  },
};

slideShow.init();
```

Dafür erweitern wir unser Objekt mit den properties `activeImage und autoPlayer`. Die property autoPlayer wird unser Interval sein, damit wir dieses bei Klick auf einen Indikator auch wieder resetten können.

Wir sehen uns beim nächsten Beitrag!
