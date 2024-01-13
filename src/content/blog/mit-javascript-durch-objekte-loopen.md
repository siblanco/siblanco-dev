---
isDraft: false
title: Mit JavaScript durch Objekte loopen
description: Wie loope ich mit JavaScript am besten durch Objekte?
date: 2019-12-19T14:55:09
tags: ["javascript"]
---

## Arrays

Um durch Arrays zu loopen gibt es zahlreiche Wege, hier mal 2 davon:

```javascript
// index.js

const arr = [1, 2, 3, 4, 5];

// wenn wir keinen Index brauchen
for (const item of arr) {
  console.log(item);
}

// wenn wir einen Index brauchen
arr.forEach((item, index) => {
  console.log(`${item} auf Position: ${index}`);
});
```

Auf die anderen Möglichkeiten gehe ich hier nicht ein. Ok cool, und was ist mit Objekten?

```javascript
const obj = {
  name: "Hassan",
  age: 29,
  job: "Webdev",
  hobby: "Cats",
};

// pre ES6
// Object.keys erstellt ein Array mit allen Keys eines Objektes
const objKeys = Object.keys(obj);

// Dadurch können wir loopen und dabei auf jede property des obj zugreifen
for (const key of objKeys) {
  console.log(`${key} : ${obj[key]}`);
}
```

Mit ES6, also EcmaScript 2015 haben wir weitere, tolle Möglichkeiten erhalten:

```javascript
// post ES6
// wir können uns den Schritt mit Object.keys sparen
for (const key in obj) {
  // sollten dafür aber prüfen, ob der key wirklich von unserem Objekt stammt, da der for in loop die
  // constructor- Eigenschaften zurückgibt, die das Objekt von seinem prototype geerbt hat.
  if (obj.hasOwnProperty(key)) {
    console.log(`${key} : ${obj[key]}`);
  }
}
```

Die Prototype Chain in JavaScript gehört zu den Basics, ich gehe da ein andermal in einem anderen Post drauf ein und gehe jetzt davon aus, dass du weißt was die Prototype Chain ist. Hier ist trotzdem ein kurzes Beispiel dafür, was genau ich mit „…properties, die das Objekt vom Constructor seines prototypes geerbt hat“ meine:

```javascript
const vaterObj = { position: "Vater", alter: 30 };

function Opa() {
  this.position = "Opa";
  this.rentner = "ja";
}

Opa.prototype = vaterObj;

const obj2 = new Opa();

for (const key in obj2) {
  if (obj2.hasOwnProperty(key)) {
    console.log(`${key} : ${obj2[key]}`);
  }
}
// Ergebnis
// position : Opa
// rentner : ja

// ohne hasOwnProperty
for (const key in obj2) {
  console.log(`${key} : ${obj2[key]}`);
}
// Ergebnis
// position : Opa
// rentner : ja
// alter : 30
```

Der Constructor unseres prototypes vom neuen Objekt `obj2` ist hier unser `vaterObj`. Loggen wir alle Keys unseres Objektes, werden auch die aufzählbaren Eigenschaften geloggt, welche zwar nicht in unserem obj2 existieren, dafür aber in der prototype chain. Mehr dazu [hier](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Statements/for...in).

Ist es uns wichtig, dass wir nur die direkten Eigenschaften eines Objektes bearbeiten / sehen und nicht auch die der „Eltern“, können wir die Methode `getOwnPropertyNames` nutzen:

```javascript
// Object.getOwnPropertyNames gibt uns ein Array mit allen
// direkten keys unseres Objektes zurück
Object.getOwnPropertyNames(obj).forEach((key) => {
  console.log(`${key}:${obj[key]}`);
});
```

Damit können wir uns den Check mit `hasOwnProperty` sparen. Interessieren uns nur die Werte eines Objektes, gehen wir wie folgt vor:

```javascript
// Object.values gibt uns ebenfalls ein Array zurück,
// jedoch nicht mit keys, sondern mit Werten
Object.values(obj).forEach((value) => {
  console.log(value);
});
```

Dann gibt es noch die Methode `Object.entries`:

```javascript
// Wir bekommen ein Array mit den Eigenschaften des Objektes zurück.
// In diesem Array ist für jede Eigenschaft jeweils ein Array mit key-value-paaren
Object.entries(obj).forEach((keyValuePair) => {
  console.log(`${keyValuePair[0]} : ${keyValuePair[1]}`);
});

// Mit Destructuring können wir die Werte direkt rausholen und bearbeiten / nutzen
Object.entries(obj).forEach(([key, value]) => {
  console.log(`${key} : ${value}`);
});
```
