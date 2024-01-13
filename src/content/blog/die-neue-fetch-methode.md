---
isDraft: false
title: Die neue fetch Methode
description: Seit der Nuxt Version 2.12 gibt es eine neue fetch() Methode. Vorneweg -> Hammer!
date: 2020-05-02T14:54:54
tags: ["nuxtjs"]
---

Lass mich zuerst sagen, dass du deine alte fetch() Methode auch weiterhin nutzen kannst, auch wenn du auf >= 2.12 updatest.

`fetch` wird wie bisher serverseitig aufgerufen. Seit 2.12 hast du in der Methode auch Zugriff auf die Vue Instanz mit `this`, da die Methode ab sofort nach dem Vue `created()` startet.

Anders als zuvor und auch anders als `asyncData`, ist die neue fetch Methode in allen Komponenten (layout, pages, components) verwendbar! Das heißt Kinder Komponenten können nun ihre eigenen Daten requesten und sind nicht mehr ausschließlich von pages abhängig.

Fetch() kann auch nur clientseitig aufgerufen werden, indem du die property `fetchOnServer` auf false setzt:

```javascript
export default {
  fetchOnServer: false,
};
```

Für das Error Handling haben wir im Template Zugriff auf `$fetchState`:

```html
<template>
  <!-- solange $fetchState.pending true ist, läuft unser request noch -->
  <p v-if="$fetchState.pending">Lade Daten...</p>

  <!-- gibt es Fehler beim request, wird pending false, error true -->
  <p v-else-if="$fetchState.error">
    Fehler beim fetchen der Daten: {{$fetchState.error.message }}
  </p>

  <!-- sind wir fertig und es gibt kein error -> -->
  <div v-else>
    <p>Die Daten sind jetzt da!</p>
  </div>
</template>
```

Außerdem können wir `fetch()` jederzeit clientseitig aufrufen:

```javascript
export default {
  methods: {
    refreshData() {
      this.$fetch();
    },
  },
};
```

Wenn wir unserem `nuxt` view ein keep-alive property geben, können wir dafür sorgen, dass die fetches gecached werden:

```html
<!-- layouts/default.vue -->
<template>
  <div>
    <nuxt keep-alive />
  </div>
</template>
```

Wird nun eine Seite mit dem Layout default.vue hart aufgerufen, wird zuerst serverseitig unsere fetch() Methode aufgerufen. Navigiert der User weg und kommt später wieder, sind die Daten immer noch im Cache, sie werden nicht neu requested. Bei harten Seitenaufrufen werden sie natürlich immer neu requested. Aber was ist, wenn unsere Daten sich ständig ändern? Wir können auch bspw. nur alle 5 Minuten die fetch() Methode aufrufen:

```javascript
export default {
  activated() {
    // führe fetch wieder aus, wenn das letzte Mal 5minuten her ist
    if (this.$fetchState.timestamp <= Date.now() - 300000) {
      this.$fetch();
    }
  },
};
```

Jedes mal, wenn der User zurück auf die Seite navigiert (nicht mit harten Seitenaufrufen), wird der `activated()` Hook getriggert. Hier prüft man, ob der timestamp älter ist als 5minuten. Falls ja, werden die Daten neu requested, ansonsten zeigen wir die alten Daten. Der `$fetchState.timestamp` wird bei jedem fetch automatisch gesetzt.

Das Beste hieran ist, dass wir jetzt endlich serverseitige Requests auch außerhalb von pages Komponenten ausführen können. Wir können jetzt viel mehr Perfomance rausholen, indem wir die Requests schön verteilen.
