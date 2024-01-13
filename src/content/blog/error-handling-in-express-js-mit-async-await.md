---
isDraft: false
title: Error Handling in Express.js mit async/await
description: Async/await Syntax in express.js ohne try / catch Blöcke?
date: 2020-05-07T22:43:21
tags: ["expressjs"]
---

Schreibst du Express mit dem async/await Syntax, sollte dir das hier sehr bekannt sein:

```javascript
app.get("/api/posts/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.query().findById(id);
    if (post) {
      return res.json(post);
    } else {
      return res.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});
```

Passiert in unserem try Block ein Fehler, geben wir diesen zunächst zu einem Error Handler weiter, zB.:

```javascript
app.get("/api/posts/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.query().findById(id);
    if (post) {
      return res.json(post);
    } else {
      return res.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

const errorHandler = (err, req, res, next) => {
  if (err.name === "NotNullViolationError") {
    return res.status(400).send({ error: "missing data" });
  } else if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }

  next(err);
};

app.use(errorHandler);
```

Greift keine Kondition von unserem eigenen `errorHandler` geben wir den Fehler weiter zum Error Handler von Express. Dieser ist „von Haus“ integriert und wird als letzte Middleware automatisch in unsere APP integriert. Dieser gibt einen Status 500 zurück und ein paar Infos zum Fehler (je nach Umgebung, detailliertere bzw. grobere Infos).

Ok, kommen wir zurück zum try/catch Block. Das immer wieder zu schreiben, wird auf Dauer echt ätzend und ist auch nicht schön zu lesen.

## Express.js Version 5 zur Rettung

Ich zitiere mal von expressjs.com: „Starting with Express 5, route handlers and middleware that return a Promise will call next(value) automatically when they reject or throw an error.“ Das bedeutet, dass wir uns ab Express 5 die try/catch Blöcke sparen können, da fehlgeschlagene Promises automatisch `next(error)` aufrufen werden (siehe oben in unserem catch Block).

Bis dahin musst du aber nicht auf Express 5 warten :-D…es gibt da ein cooles Package, dass genau das macht: [https://github.com/davidbanham/express-async-errors](https://github.com/davidbanham/express-async-errors). Damit können wir unsere Routehandler von nun an so schreiben:

```javascript
require("express-async-errors");

app.get("/api/posts/:id", async (req, res) => {
  const { id } = req.params;
  const post = await Post.query().findById(id);
  if (post) {
    return res.json(post);
  } else {
    return res.status(404).end();
  }
});
```

Viel Spaß!
