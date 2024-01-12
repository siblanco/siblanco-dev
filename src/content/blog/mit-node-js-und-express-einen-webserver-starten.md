---
isDraft: false
title: "Mit Node.js und Express einen Webserver starten"
description: "Wie starte ich mit Node.js und Express einen Server? Grober Einstieg in Express.js!"
date: 2019-11-28
tags: ["expressjs", "nodejs"]
---

## Express

Express ist ein "Schnelles, offenes, unkompliziertes Web-Framework für Node.js". Mit Express können wir innerhalb weniger Minuten einen Server starten und verschiedene Routen abdecken. Ohne Framework ist es in Node.js wirklich mühselig. Meiner Meinung nach hat damals Express das Node.js Fieber entfacht. Ich zeige euch anhand eines Beispiels die Schönheit von Express im Gegensatz zu vanilla Node.js. Wir starten einen Server, welcher bei POSTs auf die Route `/save` Daten verarbeitet und an den User ein Hi <name>zurücksendet.</name>

```javascript
// index.js
const express = require("express");
const app = express();

// body-parser ist seit Express 4.16? integriert
// zum Parsen von beispielsweise JSON
app.use(express.json());

app.post("/save", (req, res) => {
  res.send(`Hi ${req.body.name}!`);
});

app.listen(3000, () => console.log("Server listening on port 3000!"));

// index.js
const http = require("http");

const server = http.createServer((req, res) => {
  // Prüfen ob die Url korrekt ist und ob es POST ist
  if (req.url === "/save" || (req.url === "/save/" && req.method === "POST")) {
    let body = "";
    // Data kommt in Stücken rein, diese führen wir zusammen
    req.on("data", (chunk) => {
      // Buffer zu String konvertieren
      body += chunk.toString();
    });
    // und nachdem das letzte Stück angekommen ist, können wir die Daten bearbeiten / nutzen
    req.on("end", () => {
      const { name } = JSON.parse(body);
      // Header müssen wir ohne Express.js auch setzen
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(`Hi ${name}!`);
    });
  }
});

server.listen(3000, () => console.log("Server listening on port 3000!"));
```

### Middleware

Bei Express dreht sich im Grunde genommen alles um Middlewares. `app.use(express.json());` ist beispielsweise eine Middleware. Jede Middleware Funktion hat Zugriff auf unsere `request, response` Objekte sowie, mit `next()` auf die der Reihe nach folgende nächste Middleware Funktion. **Auf die der Reihe nach folgende nächste Middleware**...das ist wichtig. Bei Express spielt die Reihenfolge des Codes eine Rolle. Ein kleines Beipiel:

```javascript
app.get("/", (req, res) => {
  console.log(req.test);
  res.send("Hello World");
});

// Middleware nach GET auf '/' deklariert
app.use((req, res, next) => {
  req.test = "Hallo von Middleware";
  next();
});
```

Sobald wir die Startseite unserer APP besuchen, kriegen wir zwar ein Hello World zu sehen, aber im Terminal bekommen wir ein `undefined`. Schreiben wir die Middleware über unseren GET handler, bekommen wir `Hallo von Middleware` im Terminal zu sehen!

Nutze Middlewares um zB. User zu authentifizieren, bevor sie weitergeleteit werden oder um - wie wir es gemacht haben - das Request Objekt zu modifizieren, oder, oder.

### Express Router

express.Router ist ein eigenständiges und modulares Middleware- und Routingsystem. Eine sog. "mini-app" in unserer eigentlichen APP. Der Router funktioniert aber - wie gesagt - komplett unabhängig, dh. wir könnten diesen beispielsweise auch in einem anderem Projekt wiederverwenden.

Schreiben wir unsere `index.js` mal so um, dass Sie für alle Routen unter `/save` einen Router namens `saver` nutzt:

```javascript
// index.js
const express = require("express");
const app = express();

// wir schreiben unseren express Router in einer anderen Datei
// und importieren ihn hier
const saver = require("./saver");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Online Shop");
});

app.use("/save", saver);

app.listen(3000, () => console.log("Server listening on port 3000!"));
```

Der Code ist selbsterklärend :-P. Unser Router:

```javascript
// ./saver.js
const express = require("express");
const router = express.Router();

// Middleware, die nur in diesem Router Anwendung findet
// Kein Body? Redirect mit Status 401
router.use((req, res, next) => {
  if (!req.body) {
    return res.redirect(401, "/");
  }

  // ansonsten weiter
  next();
});

// Produkt in Kategorie X anlegen
router.post("/:category", (req, res) => {
  const { category } = req.params;

  // zB. prüfen ob authentifiziert, Kategorie existiert

  // dann
  const { product } = req.body;

  // zB. Produkt in DB speichern

  // dann im JSON Format antworten
  res.json({
    success: true,
    product: product.name,
    price: product.price,
    category: category,
  });
});

module.exports = router;
```

Posten wir jetzt mit einem JSON Objekt auf die Route `/save/shoes`, erhalten wir:

```json
// JSON Objekt
{
  "product": {
    "name": "Converse",
    "price": "69.90"
  }
}

// Antwort
{
  "success": true,
  "product": "Converse",
  "price": "69.90",
  "category": "shoes"
}
```

Das war's erst mal mit einem groben Überblick zu Express.js.
