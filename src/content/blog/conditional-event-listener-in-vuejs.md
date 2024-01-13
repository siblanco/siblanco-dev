---
isDraft: false
title: Conditional Event Listener in VueJS
description: Wie bindet man in VueJS einen Event Listener nur wenn Bedingung X erfüllt ist? Und wie kann ich dem Listener Argumente mitgeben?
date: 2020-02-16T22:36:23
tags: ["vuejs"]
---

Klar, einen EventListener in VueJS binden ist ein Kinderspiel (in Vanilla JS übrigens auch 😬). Aber ich wollte letztens einen EventListener nur dann binden, wenn wir uns auf einem Gerät mit einer Maximalbreite von 768px befinden.

Kommen wir zum Wie:

```html
<body>
  <div id="app">
    <h1>{{greeting}}</h1>
    <h2>Die Bedingung ist: {{condition}}</h2>

    <button
      @click="condition = !condition; magicText = null; eventText = null;"
    >
      Bedingung auf {{ condition ? 'false' : 'true' }} setzen
    </button>

    <div style="margin: 25px 0;">
      <button
        v-on="{ click: condition ? $event => showMagicText('Leonard Cohen - Tower of Song', $event) : null }"
      >
        Wenn die Bedingung true ist, habe ich einen Event Listener
      </button>
    </div>

    <div>
      <p>{{magicText}}</p>
      <p>{{eventText}}</p>
    </div>

    <div style="margin-top: 50px">
      <a href="/blog/conditional-event-listener-in-vuejs">zurück zum Beitrag</a>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue"></script>
  <script>
    const app = new Vue({
      el: "#app",
      data: {
        greeting:
          "Wie man in VueJS einen Event Listener bindet, sofern eine Bedingung erfüllt ist.",
        condition: false,
        magicText: null,
        eventText: null,
      },
      methods: {
        showMagicText(text, e) {
          this.eventText = `Zugriff auf das Event Objekt haben wir auch. Du hast auf die Positionen x: ${e.x} und y: ${e.y} geklickt!`;
          this.magicText = text;
        },
      },
    });
  </script>
</body>
```

Wir binden ein Click Event sofern die `condition` erfüllt ist: `v-on="{ click: condition ? $event => showMagicText('Leonard Cohen - Tower of Song', $event) : null }"`. Klickt ein User auf den Button, checken wir erst ab, ob `condition = true` ist, falls ja, binden wir die Methode `showMagicText`. Dieser können wir auch Argumente geben, inkl. des Event Objektes.

Viel Spaß!
