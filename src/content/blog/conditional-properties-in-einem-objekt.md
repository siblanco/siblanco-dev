---
isDraft: false
title: Conditional Properties in einem Objekt
description: Füge einem Objekt nur unter bestimmten Voraussetzungen Properties hinzu.
date: 2021-01-24T16:56:25
tags: ["javascript"]
---

Du hast ein Objekt, welches du nur unter bestimmten Voraussetzungen mit Properties XYZ füllen willst? Los geht’s

```javascript
const obj = {
  age: 30,
  name: "Hassan El Siblani",
  job: ["software engineer", "freak", "dad"],

  // ist myCondition truthy? Dann füge die prop conditional_prop hinzu!
  ...(myCondition && { conditional_prop: "yeaaah" }),
};
```

Noch mehr Props, selbe Bedingung?

```javascript
const obj = {
  age: 30,
  name: "Hassan El Siblani",
  job: ["software engineer", "freak", "dad"],

  ...(myCondition && {
    conditional_prop: "yeaaah",
    skill: "Flying",
    food: "vegetables",
  }),
};
```
