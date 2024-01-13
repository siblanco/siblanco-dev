---
isDraft: false
title: Array mit Drag and Drop sortieren
description: Wie man sich das Leben auch schwer machen kann.
date: 2020-09-17T23:19:08
tags: ["javascript"]
---

Ich musste heute bei einer Webapp die Funktion bestehende Elemente per Drag & Drop umsortieren zu können integrieren. Ich habe das zwar schon öfter gemacht, aber das letzte mal ist schon wieder zu lange her, jetzt schreibe ich es mir auf 😬. Angenommen wir haben folgende Daten:

```javascript
const elements = [
  {
    id: 1,
    label: "Hello World",
  },
  {
    id: 2,
    label: "John doe",
  },
  {
    id: 3,
    label: "Chuck",
  },
  {
    id: 4,
    label: "Susi",
  },
];
```

Stell dir vor, für jedes Objekt in dem Array gibt es ein Quadrat mit dem Label in der mitte. Wenn du ein Quadrat „draggst“ und damit über ein anderes „hoverst“ hast du alles was du brauchst, um das Array neu zu sortieren: der index vom gedraggten Element und der index vom Ziel, wo das Element hin soll. Top, jetzt **nur** noch umsortieren 😬.

Ok ok, also wenn das gedraggte Element zum Beispiel Susi (**index 3**) ist und wir damit auf John (**index 1**) hovern, muss Susi auf index 1 und John auf Index 2 und Chuck auf Index 3. Ok, wenn wir 50 Elemente hätten, müssten wir alle Elemente mit index > 1 um 1 erhöhen.

So oder so ähnlich habe ich mich bestimmt ne Stunde lang reingedacht und damit rumgeschlagen. Wir können es doch viel simpler haben. Anstatt jedes Element zu bearbeiten, erstellen wir einfach ein neues Array mit allen Elementen vom gefilterten (ohne das gedraggte Element) Array bis zum Zielindex (hier 1), fügen dann an dieser Stelle das gedraggte Element ein und am Ende die restlichen Elemente des Arrays (nach dem Zielindex).

Ok, das ist vielleicht etwas schlecht formuliert 😵, schauen wir uns das lieber im Code an:

```javascript
// unser gedraggtes Element
const draggedElement = elements[draggedElementIndex];

// unser gefiltertes Array, ohne unser gedraggtes Element
const remainingElements = elements.filter(
  (item, index) => index !== draggedElementIndex,
);

const reorderedElements = [
  // alle Elemente bis zum neuen Ziel
  ...remainingElements.slice(0, targetElementIndex),

  // das gedraggte Elemente am Ziel ablegen
  draggedElement,

  // die restlichen Elemente nach dem neuen Ziel
  ...remainingElements.slice(targetElementIndex),
];
```

Ganz simpel oder? Bis zum nächsten Mal!
