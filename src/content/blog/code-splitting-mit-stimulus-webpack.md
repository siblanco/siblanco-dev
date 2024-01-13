---
isDraft: false
title: Code splitting mit Stimulus & Webpack
description: Wie du dein Bundle ganz einfach aufteilen kannst und damit bessere Perfomance erreichst.
date: 2021-04-16T09:25:45
tags: ["javascript"]
---

Stimulus empfiehlt ja mithilfe von `defnitionsFromContext` alle Controller innerhalb eines Ordners in der Stimulus App automatisch registrieren zu lassen. Das ist cool und praktisch, einfach einen neuen Controller im Ordner erstellen und schon kanns los gehen. Mehr dazu hier [Stimulus JS mit Typescript – Setup Intro](https://siblanco.dev/blog/stimulus-js-mit-typescript-setup-intro/).

Angenommen wir haben einen Controller namens „dateHandler“ geschrieben, welcher mit moment.js arbeitet (schau dir lieber dayjs oder date-fns an :-D):

```typescript
import { Controller } from "stimulus";
import moment from "moment";

export default class extends Controller {
  connect() {
    console.log(moment().format("dddd"));
  }
}
```

Den Controller wollen wir aber nur auf wenigen Seiten in unserem Projekt nutzen. Diesen in unser main bundle zu packen, würde unser bundle um !71kb! gzipped vergrößern ([https://bundlephobia.com/result?p=moment@2.29.1](https://bundlephobia.com/result?p=moment@2.29.1)). Wir sollten den Controller mithilfe von Webpack und `import()` zum richtigen Zeitpunkt nachladen („Lazy Controller“). Dafür schreiben wir einen „root“ Controller, welche dafür verantwortlich ist, unsere Lazy Controller nachzuladen:

```typescript
import { ApplicationController } from "stimulus-use";

export default class extends ApplicationController {
  declare readonly lazyloadTargets: HTMLElement[];

  static targets = ["lazyload"];

  loadedControllers: string[] = [];

  initialize() {
    this.lazyloadControllers();
  }

  lazyloadControllers() {
    this.lazyloadTargets.forEach((target) => {
      const controllerName = target.dataset.lazyload!;

      if (!this.loadedControllers.includes(controllerName)) {
        // load controller and register it
        import(`../lazy/${controllerName}`).then((controller) =>
          this.application.register(controllerName, controller.default),
        );

        this.loadedControllers.push(controllerName);
      }
    });
  }
}
```

Unser Root Controller wrapped unsere ganze App, bei mir deklariere ich ihn beim body-tag. Er sucht nach lazyloadTargets und – falls er welche findet – registriert diese. Hier ein Beispiel für ein lazyloadTarget:

```html
<section
  data-controller="dateHandler"
  data-root-target="lazyload"
  data-lazyload="dateHandler"
></section>
```

Das war’s schon…Webpack kümmert sich jetzt darum, extra JS Dateien (Chunks) zu erstellen und diese zu den richtigen Zeitpunkten nachzuladen. Wie genau sie nachgeladen werden sollen und weitere Einstellungen lassen sich mit den sog. „magic comments“ treffen: [https://webpack.js.org/api/module-methods/#import-1](https://webpack.js.org/api/module-methods/#import-1). Wie bzw. wo die Chunks gespeichert werden, kannst du im output in deiner webpack config einstellen: [https://webpack.js.org/api/module-methods/#import-1](https://webpack.js.org/api/module-methods/#import-1).
