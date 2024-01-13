---
isDraft: false
title: Mit JavaScript Duplikate aus einem Array entfernen
description: Schau dir an, wie du dank ES6 mit einer Zeile Duplikate aus Arrays entfernst.
date: 2020-04-21T22:13:44
tags: ["javascript"]
---

Angenommen du hast ein Array bestehend aus Nummern, manche davon wiederholen sich:

```javascript
const list = [1, 2, 3, 3, 4, 9, 4];
```

Dank `Sets` können wir ganz einfach ein neues Array, ohne Duplikate, erstellen:

```javascript
const uniqueList = [...new Set(list)];
console.log(uniqueList); // [1, 2, 3, 4, 9]
```

## Was passiert hier?

`Sets` können nie doppelte Werte haben, daher bekommen wir von `new Set(list)` ein Set mit einzigartigen Werten. Mit Hilfe von Destructering (…) und den Brackets wandeln wir das Set in ein Array mit einzigartigen Werten um.

Nutze diese Methode, wenn du nur einzigartige Werte brauchst und du mit numbers, strings, booleans oder symbols arbeitest. Lese hier mehr über Sets [https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Set](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Set)
