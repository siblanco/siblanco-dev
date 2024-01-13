---
isDraft: false
title: SCSS mit BEM | self Trick
description: Schreibe weniger Code mit diesem kleinen Trick bei nested BEM Selektoren
date: 2021-07-29T10:18:18
tags: ["scss"]
---

Falls du auch manchmal noch Projekte ohne Tailwind 👾 hast, dann benutzt du höchstwahrscheinlich SCSS mit BEM. Dazu habe ich letztens einen ganz praktischen Trick gefunden. Schauen wir uns folgendes Markup an:

```html
<section class="teaser-with-button">
  <div class="teaser-with-button__header">
    <h1>Sup sib</h1>
    <hr />
  </div>

  <div class="teaser-with-button__body">
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut obcaecati
      mollitia labore assumenda corporis tenetur expedita cupiditate! Sequi
      quaerat suscipit provident enim voluptates debitis ipsam blanditiis
      cupiditate iure, facilis placeat.
    </p>
  </div>

  <div class="teaser-with-button__footer">
    <a href="/">Back home</a>
  </div>
</section>
```

Jetzt das SCSS dazu:

```scss
.teaser-with-button {
  padding: 5rem;
  background-color: indianred;
  color: #fff;

  &:hover {
    .teaser-with-button__footer a {
      background-color: greenyellow;
    }
  }

  &__header {
    h1 {
      font-size: 36px;
      font-family: Arial, Helvetica, sans-serif;
    }
  }

  &__body {
    p {
      font-size: 18px;
    }
  }

  &__footer {
    a {
      display: inline-block;
      padding: 1rem 5rem;

      background-color: purple;
      color: #fff;
      font-weight: bold;
    }
  }
}
```

Wenn jemand über unseren Teaser hovert, soll der Button einen grüngelben Hintergrund bekommen. Dazu müssen wir im `&:hover` den kompletten Selektor, also `.teaser-with-button__footer a` schreiben. Das geht auch kürzer:

```scss
.teaser-with-button {
  padding: 5rem;
  background-color: indianred;
  color: #fff;

  $self: &;

  &:hover {
    #{$self}__footer a {
      background-color: greenyellow;
    }
  }

  &__header {
    h1 {
      font-size: 36px;
      font-family: Arial, Helvetica, sans-serif;
    }
  }

  &__body {
    p {
      font-size: 18px;
    }
  }

  &__footer {
    a {
      display: inline-block;
      padding: 1rem 5rem;

      background-color: purple;
      color: #fff;
      font-weight: bold;
    }
  }
}
```

Wir können einer Variable (hier $self) den Klassennamen geben, also „teaser-with-button“. Mit `#{$self}` kann man sie dann verwenden.

Ich nutze den Trick immer dann, wenn es sich lohnt, also wenn ich dadurch deutlich weniger schreiben kann. In meinen Beispielen würde ich auf das $self verzichten, da ich es nur einmal verwende.
