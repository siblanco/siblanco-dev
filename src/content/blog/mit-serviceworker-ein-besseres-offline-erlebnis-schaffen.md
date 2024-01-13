---
isDraft: false
title: Mit ServiceWorker ein besseres Offline-Erlebnis schaffen
description: Sind deine Besucher gerade offline? Leite sie auf eine Seite weiter. Extra für Offline User!
date: 2020-03-27T22:52:18
tags: ["javascript"]
---

Ich bin ein großer Fan von Progressive Web Apps (PWAs). Jetzt wo auch Microsoft mit Google an einem Strang zieht, ist es nur eine Frage der Zeit, bis Apple den Support für iOS mal ausbaut.

## User ist Offline? Zeige eine Custom Page

Jeder kennt sie, die „Kein Internet“ Seite:

![Kein Internet](https://blog.siblanco.dev/wp-content/uploads/2020/03/offline.jpg)

Wie wäre es, wenn wir unseren Besuchern stattdessen eine total individuelle Seite zeigen?

Installieren wir zunächst unseren ServiceWorker:

```javascript
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js");
  });
}
```

Wir prüfen ob serviceWorker überhaupt vom Browser supported werden und falls ja, laden wir unseren Worker rein. Ach btw. – ServiceWorker klingt so spacig, das sind aber nur JavaScript Dateien die außerhalb des Hauptprozesses (main thread) des Browsers laufen. Dh. sie laufen ohne die Perfomance des Browsers und damit die UX zu beeinträchtigen.

Installieren wir zunächst den ServiceWorker und cachen unsere offline.html:

```javascript
const CACHE_NAME = "offline-cache";
const FALLBACK_HTML_URL = "/offline.html";

this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.add(FALLBACK_HTML_URL)),
  );
});
```

Jetzt gilt es Requests vom Browser abzufangen, zu bearbeiten und unser Wunschergebnis zurückzugeben:

```javascript
this.addEventListener("fetch", (event) => {
  // Accept: text/html header check für Browser, die request.mode nicht unterstützen
  if (
    event.request.mode === "navigate" ||
    (event.request.method === "GET" &&
      event.request.headers.get("accept").includes("text/html"))
  ) {
    // Haben wir die angeforderte Page im Cache? Falls ja, returne diese, ansonsten lasse den Request durch
    event.respondWith(
      caches
        .match(event.request)
        .then(function (response) {
          return response || fetch(event.request);

          // Der User ist offline und der Request geht nicht durch? Zeige unsere Offline Seite
        })
        .catch(() => caches.match(FALLBACK_HTML_URL)),
    );
  }
});
```

Die Kommentare sind selbsterklärend. ServiceWorker sind ziemlich hartnäckig – sprich veröffentlichst du einen, und machst danach noch Änderungen an deiner Seite, musst du dafür sorgen, dass der alte Cache des ServiceWorkers geleert wird. Sonst werden deine Nutzer niemals neuen Content sehen. Dazu können wir das `activate` Event nutzen:

```javascript
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function (cacheName) {
            cacheName === "offline-cache";
          })
          .map(function (cacheName) {
            return caches.delete(cacheName);
          }),
      );
    }),
  );
});
```

Das Activate Event feuert sobald ein neuer ServiceWorker installiert wurde. Hier ist der ideale Zeitpunkt, den alten Cache zu löschen bzw. zu erweitern oder was auch immer :-). Dieses Beispiel ist ganz plump und auf keinen Fall prod ready: Es sucht nach dem Cache „offline-cache“ und löscht diesen.

Ich habe natürlich wieder eine Demo vorbereitet: [Offline-Page](/blog-demos/offline-page). Teste die Seite. Gehe danach offline und schaue was passiert (Tipp: in Chrome die Developer Tools > Application > Service Workers > Offline anhaken)!

Gefällt dir das ganze Konzept, lies dich schlau: [Fundamentals of Service Workers](https://developers.google.com/web/fundamentals/primers/service-workers). Schau dir auch die [WorkBox Library von Google](https://developers.google.com/web/tools/workbox) an. Bis dann!
