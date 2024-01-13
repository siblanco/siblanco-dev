---
isDraft: false
title: Einfache Lightbox erstellen
description: Hier zeige ich dir, wie du mit Vanilla JS / CSS eine simple Lightbox erstellst.
date: 2019-12-27T12:11:53
tags: ["css", "javascript"]
---

Zunächst erstellen wir das HTML:

```html
<!doctype html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Lightbox</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <button id="open-lightbox">Lightbox öffnen</button>
    <div class="lightbox">
      <!-- ein X zum schließen der Lightbox -->
      <span>×</span>
      <h2>Ich bin eine Lightbox</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi, aliquid
        repudiandae fugit corporis culpa molestiae. Unde doloremque voluptatum,
        blanditiis similique ipsum, harum est autem quo laboriosam tempora
        labore esse hic?
      </p>
    </div>
    <div class="overlay"></div>

    <script src="main.js" type="text/javascript"></script>
  </body>
</html>
```

Nichts besonderes, ein Button, welcher die Lightbox öffnen soll, eine Lightbox mit etwas Content, ein Overlay und unsere style.css / main.js. Die Lightbox sowie das Overlay sollen natürlich erst zu sehen sein, wenn man auf den Button klickt…kommen wir also zum CSS:

```css
.lightbox {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: indianred;
  padding: 3rem;
  color: #fff;
  box-shadow: 0 7px 12px rgba(0, 0, 0, 0.5);
  z-index: 2;

  /* zunächst versteckt */
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease-out;
}

/* active Klasse zeigt die Lightbox */
.lightbox.active {
  opacity: 1;
  visibility: visible;
}

.lightbox span {
  display: inline-block;
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 2rem;
  cursor: pointer;
}

.overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1;

  /* zunächst versteckt */
  opacity: 0;
  visibility: hidden;
  transition: all 0.1s;
}

/* active Klasse zeigt das Overlay */
.overlay.active {
  opacity: 1;
  visibility: visible;
}
```

Unsere Lightbox wird in der Mitte des Viewports fixiert und ausgeblendet. Der Overlay wird ebenfalls relativ zum Viewport fixiert, nimmt die ganze Breite / Höhe ein und wird auch ausgeblendet. Beides wird mit einer Klasse `active` angezeigt. Damit kommen wir zum JavaScript:

```javascript
const button = document.getElementById("open-lightbox");
const lightbox = document.querySelector(".lightbox");
const overlay = document.querySelector(".overlay");
const closer = document.querySelector(".lightbox span");

// Lightbox öffnen bei Klick auf Button
button.addEventListener("click", () => {
  lightbox.classList.add("active");
  overlay.classList.add("active");
});

// Lightbox schließen bei Klick auf X
closer.addEventListener("click", () => {
  lightbox.classList.remove("active");
  overlay.classList.remove("active");
});

// Lightbox schließen bei Klick auf overlay
overlay.addEventListener("click", () => {
  lightbox.classList.remove("active");
  overlay.classList.remove("active");
});
```

Das sollte selbsterklärend sein! Wir geben auch dem Overlay einen Eventlistener, sodass der User auch auf Klick auf diesen, die Lightbox schließen kann.
