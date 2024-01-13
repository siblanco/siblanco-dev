---
isDraft: false
title: Stimulus Controller in und außerhalb von anderen Controllern nutzen
description: Wie du mit einem simplen one-liner deine Stimulus Controller in und auch außerhalb von anderen Controllern nutzen kannst.
date: 2021-02-26T10:54:10
tags: ["javascript", "stimulusjs"]
---

Stimulus stellt einen Weg – auch wenn nicht dokumentiert – zur Verfügung, mit dem man von Controller X den Controller Y ansprechen kann. Angenommen Controller Y wird so gemounted:

```html
<section id="y" data-controller="y"></section>
```

Dann können wir diesen in unserem Controller X so ansteuern:

```javascript
// zur Verdeutlichung, mache ich mal ein paar extra steps
const controllerYElement = document.getElementById("y");
const controllerYIdentifier = "y";
const controllerY = this.application.getControllerForElementAndIdentifier(
  controllerYElement,
  controllerYIdentifier,
);
```

Jetzt könnten wir in Controller X `controllerY.methode()` aufrufen. Ich vermute das erscheint nicht in der Dokumentation, weil der Name so unglaublich lang ist 😬. Wenn du in deiner `connect()` Methode einen anderen Controller ansprechen möchtest, musst du darauf achten, dass dieser zu dem Zeitpunkt bereits gemounted wurde, sonst erhälst du null zurück.

Das ist wirklich aufwendig und mMn. nicht sehr schön / angenehm zu nutzen. Es gibt einen viel besseren Weg:

```javascript
// in deiner connect() Methode
this.element[this.identifier] = this;
```

Damit wird dem Element, bei dem du deinen Controller mountest, deine Controller Instanz angehangen. Diese kannst du nun von überall ansprechen, von anderen Controllern, außerhalb Stimulus, einfach überall wo du auch Zugriff auf dein Element hast. Hier mal ein Beispiel, wie man das nutzt:

```javascript
// beispiel_controller.ts
import { Controller } from "stimulus";

export default class extends Controller {
  connect() {
    // this.identifier ist "beispiel"
    this.element[this.identifier] = this;
  }

  yo() {
    console.log(`Ich bin controller ${this.identifier}`);
  }
}
```

Den Controller mounten:

```html
<section id="beispiel" data-controller="beispiel"></section>
```

Und nun den Controller ansprechen. In deiner Konsole:

```javascript
document.getElementById("beispiel").beispiel.yo();
```
