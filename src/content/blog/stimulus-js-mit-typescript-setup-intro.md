---
isDraft: false
title: Stimulus JS mit Typescript &#8211; Setup intro
description: Ohne Typescript geht nichts mehr, es ist einfach zu gut. Deswegen zeige ich dir heute, wie du Stimulus mit Typescript nutzen kannst.
date: 2020-12-20T22:58:04
tags: ["stimulusjs", "typescript"]
---

Vor einer Weile habe ich in einem Podcast von Turbolinks ([https://github.com/turbolinks/turbolinks](https://github.com/turbolinks/turbolinks)) gehört. Wenn du nicht gerade eine SPA baust, könnte das auch für dich sehr interessant sein. Ganz grob: Turbolinks übernimmt das Navigieren auf deiner Webseite. Links werden mit `XMLHttpRequests` angefragt und angezeigt. So erhälst du mit relativ wenig Aufwand ein „SPA“-Gefühl und noch vieles mehr, lies dich gerne selbst ein.

Auf der Arbeit haben wir das Routing bisher mit Vanilla JS betrieben, was auch super funktioniert hat. Die ganzen extra Features, die Turbolinks bietet, haben uns jedoch überzeugt umzusteigen. In dem Zusammenhang bin ich auch auf Stimulus JS ([https://github.com/stimulusjs/stimulus](https://github.com/stimulusjs/stimulus)) gestoßen, das Schwester-Framework von Turbolinks und habe mich sofort verliebt. Schau es dir an und lass mich gerne wissen, was du darüber denkst! Natürlich kann es nicht mit React & Co mithalten, aber für einfache bis mittlere Webseiten ist Stimulus mehr als gut genug. Spaß bringt es auch 😁

## Stimulus JS mit Typescript

Wir nutzen Typescript nur zur Prüfung unserer Typen und Webpack / Babel zum bundeln unseres codes.

### Webpack mit Babel

Über Webpack (5) sprechen wir ein anderes mal. Deine Babel Config sollte unter anderem folgende Presets & Plugins beinhalten:

```javascript
// Mega Preset damit Babel TS verarbeiten kann
presets: ['@babel/preset-typescript'],
plugins: [
    [
        // das Plugin wird mit dem preset-typescript automatisch genutzt,
        // wir brauchen declareFields, später mehr dazu
        '@babel/plugin-transform-typescript',
        { allowDeclareFields: true },
    ],

    // Stimulus JS nutzt class properties (in JS gibt's eigentlich nur Klassen methoden)
    '@babel/plugin-proposal-class-properties',

    // für Rest / Spread properties support
    // https://babeljs.io/docs/en/babel-plugin-proposal-object-rest-spread
    '@babel/proposal-object-rest-spread',
],
```

Deine tsconfig.json sollte so aussehen:

```javascript
{
    "compilerOptions": {
        // Target latest version of ECMAScript.
        "target": "esnext",
        // Search under node_modules for non-relative imports.
        "moduleResolution": "node",
        // Process & infer types from .js files.
        "allowJs": true,
        // Don't emit; allow Babel to transform files.
        "noEmit": true,
        // Enable strictest settings like strictNullChecks & noImplicitAny.
        "strict": true,
        // Disallow features that require cross-file information for emit.
        "isolatedModules": true,
        // Import non-ES modules as default imports.
        "esModuleInterop": true,
        "strictPropertyInitialization": false
    },
    // pass das auf deine Pfade an
    "include": ["./**/*.ts"]
}
```

In deiner package.json fügst du dann noch folgende Skripte ein:

```json
"ts": "tsc --watch",
"dev": "webpack --mode development",
"build": "tsc && webpack --mode production"
```

In einem Terminal läuft `npm run ts` zum Typen checken, während im anderen Terminal `npm run dev` zum kompelieren läuft. -> Webpack + Babel interessiert es nicht, wenn du Typ Fehler hast, es wird trotzdem erfolgreich kompeliert (beim dev Skript). Beim build Skript führen wir tsc zuerst aus – hier schlägt der Prozess fehl, sollte Typescript Fehler finden, da es nie zu webpack kommt.

### Stimulus

Mit Webpack require.context kannst du alle Controller in einem Ordner automatisch importieren (siehe Stimulus docs):

```javascript
import { Application } from "stimulus";
import { definitionsFromContext } from "stimulus/webpack-helpers";

const application = Application.start();
const context = require.context("./controllers", true, /\.ts$/);
application.load(definitionsFromContext(context));
```

Schauen wir uns jetzt noch einen Controller an und gehen an die für Typescript relevanten Punkte:

```javascript
// hello_controller.ts
import { Controller } from 'stimulus';

export default class extends Controller {
    // Damit wir declare nutzen können, haben wir allowDeclareFields auf true gesetzt (siehe oben)
    // Babel löscht "imageTarget" beim Kompelieren komplett raus, so gibt es keine
    // Konflikte bei Stimulus, da Stimulus "imageTarget" erst im super() der Klasse zuweist.
    // So haben wir nun schönes Typing für "this.imageTarget".
    declare readonly imageTarget: HTMLElement;
    static targets = ['image'];

    // das gleiche machen wir für alle properties, die Stimulus wie von Zauberhand automatisch erstellt
    declare readonly activeClass: string;
    static classes = ['active'];

    // es muss natürlich nicht readonly sein, wenn wir es ändern wollen,
    // dann ohne readonly, sonst meckert TS
    declare nameValue: string;
    static values = {
        name: String
    };

    connect() {
        console.log('hello world');
    }
}
```

Falls du Fragen oder Anregungen hast, meld dich gerne. Bis zum nächsten mal!
