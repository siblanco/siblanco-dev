---
isDraft: false
title: Slots in Vue.js
description: Wie du u.a. mit Slots in Vue.js wiederverwendbare Komponenten schreibst
date: 2020-04-25T00:12:46
tags: ["vuejs"]
---

Angenommen du hast eine Komponente „Card“:

```html
<template>
  <section class="card">
    <h2>
      <slot></slot>
    </h2>
  </section>
</template>
```

Wenn du diese nun irgendwo importierst und benutzt, kannst du die H2-Headline bestimmen:

```html
<Card> Hello World </Card>
<!-- wird gerendert als: -->
<section class="card">
  <h2>Hello World</h2>
</section>
```

Natürlich kannst du auch mehrere Slots benutzen. Gebe dazu deinen Slots ganz einfach Namen:

```html
<template>
  <section class="card">
    <h2>
      <slot name="title">Fallback title</slot>
      <!-- Wir können unseren Slots auch einen Standart Wert geben, 
welcher gerendert wird, sollte der Slot nicht ausgefüllt worden sein.  -->
    </h2>
    <p>
      <slot name="description"></slot>
    </p>
  </section>
</template>
```

Genutzt werden die Slots dann so:

```html
<Card>
  <template v-slot="title"> Hello World </template>
  <template v-slot="description">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero optio
    dolorem, obcaecati laborum.
  </template>
</Card>
<!-- wird gerendert als: -->
<section class="card">
  <h2>Hello World</h2>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero optio
    dolorem, obcaecati laborum.
  </p>
</section>
```

Hast du in deiner in Komponente „Card“ Daten, die du dem Parent (wo du Card importierst) mitgeben möchtest? Nutze dafür scoped slots:

```html
<template>
  <section class="card">
    <h2>
      <slot v-bind:user="user"></slot>
    </h2>
  </section>
</template>

<script>
  export default {
    name: "Card",
    data: () => ({
      user: {
        name: "Hassan",
        age: 29,
      },
    }),
  };
</script>
```

Jetzt haben wir im Parent ebenfalls Zugriff auf das Objekt „user“:

```html
<template>
  <Card v-slot="slotProps"> {{ slotProps.user.name }} </Card>
  <!-- oder mit destructering direkt auf user zugreifen: -->
  <Card v-slot="{ user }"> {{ user.name }} </Card>
</template>

<script>
  export default {
    name: "Page",
    components: {
      Card: () => import("@/components/Card"),
    },
  };
</script>
```

Dabei ist der Name „slotProps“ egal, du kannst den Namen selbst bestimmen. Mehr über slots findest du hier: [https://vuejs.org/v2/guide/components-slots.html](https://vuejs.org/v2/guide/components-slots.html).
