---
isDraft: false
title: Loop in JavaScript verlangsamen
description: Wie du in JavaScript einen Loop langsamer laufen lässt.
date: 2020-05-20T11:08:16
tags: ["javascript"]
---

Du musst eine API 500 mal requesten, kriegst aber Status 429 zurück wegen zu vieler Requests in zu kurzer Zeit? Was auch immer deine Gründe sind, einen Loop langsamer laufen zu lassen ist ganz simpel:

```javascript
const wait = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
```

Wir erstellen eine `wait` Funktion, welche ein Promise returned, welches nach X Millisekunden resolved wird. Jetzt können wir einfach mit `await wait(1000)` eine Sekunde warten bevor es weiter geht:

```javascript
const ids = [1, 2, 3, 4, 5, 6];

const getPosts = async () => {
  for (const id of ids) {
    console.log(id);
    await wait(1000);
  }
};

getPosts();
```
