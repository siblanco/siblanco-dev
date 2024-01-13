---
isDraft: false
title: Arrays basierend auf anderen Arrays sortieren
description: Sortiere ein Array nach den Vorgaben eines anderen Arrays!
date: 2020-05-16T19:58:57
tags: ["javascript"]
---

Heute mal mit kleiner Einleitung :-D…bei der von [Wagtail](https://wagtail.io/) (CMS basierend auf Django) bereitgestellten REST API kann man mit dem Parameter `?search` eine Volltextsuche durchführen. Angenommen du hast ein Array wie folgt:

```javascript
const titles = ["KL500", "GU200", "MB210"];
```

Suchst du nach Beiträgen mit diesen Titeln (die Titel sind in diesem Fall unique identifiers), kannst du die API von Wagtail wie folgt querien:

```javascript
const posts = axios.get(
  `/api/posts/?search=${titles.join(" ")}&search_operator=or`,
);
```

Axios kümmert sich um die Serialisierung unseres Strings (aus space wird +). Du erhälst alle Beiträge mit den gesuchten Titeln zurück. Jetzt ist es aber auch wichtig, dass die Beiträge so sortiert sind, wie unser `titles` Array. Das macht Wagtail nicht, du bekommst die Ergebnisse nach den Titeln alphabetisch sortiert zurück.

Das heißt, wir müssen das Ergebnis unseres Requests anhand des Arrays `titles` sortieren:

```javascript
// wir erstellen zuerst ein Objekt mit allen Beiträgen
// key für die Objekte werden die Titel sein
const postsMap = posts.data.reduce(
  (result, current) => ({
    ...result,
    [current.title]: current,
  }),
  {},
);

// jetzt erstellen wir ein neues Array anhand des Arrays titles
const sortedPosts = titles.map((title) => postsMap[title]);
```

Das wars schon! Unsere Beiträge sind nun in `sortedPosts` in der gewünschten Reihenfolge 👾
