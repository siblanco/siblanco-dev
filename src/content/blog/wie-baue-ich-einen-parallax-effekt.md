---
isDraft: false
title: "Prismjs in einem Nuxt Projekt"
description: "Code syntax hightlightning mit PrismJS in Nuxt integrieren"
date: 2019-12-15
tags: ["nuxtjs"]
---

## Prismjs

[prismjs.com](https://prismjs.com/)

> "Prism is a lightweight, extensible syntax highlighter, built with modern web standards in mind. It’s used in thousands of websites, including some of those you visit daily."

Ich denke mehr brauche ich über Prism nicht zu sagen :-)

## Integration in Nuxtjs

Zunächst installieren wir prismjs sowie das Paket "babel-plugin-prismjs" - `npm i --save prismjs babel-plugin-prismjs`. Mit babel-plugin-prismjs können wir prismjs - da wo es nötig ist - als Modul importieren und nutzen. Bevor wir dazu kommen, konfigurieren wir prism in unserer nuxt.config.js:

```javascript
// nuxt.config.js
build: {
  extend(config, ctx) {},
  babel: {
    plugins: [
      [
        "prismjs",
          {
            languages: ["javascript", "scss", "html", "json"],
            plugins: ["line-numbers", "show-language"],
            theme: "okaidia",
            css: true
          }
      ]
    ]
  }
}
```

Das sind die Einstellungen, die ich zurzeit für meinen Blog nutze. Eine Übersicht über alle möglichen Einstellungen gibt's hier [https://github.com/mAAdhaTTah/babel-plugin-prismjs](https://github.com/mAAdhaTTah/babel-plugin-prismjs).

Nun gilt es Primjs dort zu importieren, wo du es benötigst.

```javascript
// _slug.vue

import Prism from "prismjs";

export default {
  mounted() {
    document.body.classList.add("line-numbers"); // für das Plugin line-numbers - siehe prism docs
    setTimeout(() => {
      Prism.highlightAll();
    }, 150);
  },
};
```

Warum `setTimeout`? Im mounted hook ist Vue soweit, dass das root Element zB. "#app" durch eine neue Vue Instanz ersetzt wurde. Damit ist aber nicht garantiert, dass auch schon alle Kinder im DOM zu finden sind. Damit würden wir highlightAll() evtl. aufrufen, obwohl unser Code noch nicht im DOM angekommen ist - Prism würde keinen Effekt haben. Ok, ok, warum nutzen wir dann nicht einfach `this.$nextTick` von Vuejs? Gute Frage! this.$nextTick läuft erst, sobald der komplette View gerendert wurde - das funktioniert auch wunderbar, wenn wir zu unserem Post navigieren. Jedoch nicht bei harten Seitenaufrufen. Falls du eine elegantere Lösung als setTimeout kennst, lass es mich wissen!

Damit Code auch von Prism hervorgehoben wird, müsst ihr ihn wie folgt schreiben:

```html
<pre><code class="language-javascript">
  function log(msg) {
    console.log(msg);
  }

  log('Danke prism!')
</code></pre>
```

Weiteres entnehmt ihr am besten den Docs auf prism.js!
