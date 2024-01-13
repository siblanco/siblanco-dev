---
isDraft: false
title: Composition API. Ein kleiner Einblick
description: Mit Vue.js 3 kommt die Composition API. Schauen wir es uns an!
date: 2020-04-30T16:46:36
tags: ["vuejs"]
---

Moin! Bald kommt Vue.js 3 raus (es soll im Sommer soweit sein) und damit auch die Composition API. Die Options API wird aber auch weiterhin unterstützt. Ich freu mich riesig auf die Composition API, da wir damit ohne viel Struggle unter anderem Typescript nutzen können. Auch unsere Tests werden einfacher zu schreiben sein, als zuvor. Warum es überhaupt eine neue API gibt, und mehr über die neue API, könnt ihr hier nachlesen: [https://composition-api.vuejs.org/](https://composition-api.vuejs.org/).

## Composition API basics

Ich gehe davon aus, dass du mit Single-File-Components (SFC) arbeitest. Dein bisheriges Template kannst du mit der neuen API 1zu1 übernehmen. Bloß der Inhalt im script-tag ändert sich. Hier ein Beispiel mit der alten API:

```html
<template>
  <div>
    <h1>{{activeListItem.title}}</h1>
    <button v-for="item in list" :key="item.id" @click="setId(item.id)">
      Change active list item to ID {{item.id}}
    </button>
  </div>
</template>
```

```javascript
export default {
  data: () => ({
    id: 0,
    list: [
      {
        id: 0,
        title: "Hello World",
      },
      {
        id: 1,
        title: "Good night",
      },
      {
        id: 2,
        title: "Vue.js",
      },
    ],
  }),

  methods: {
    setId(id) {
      this.id = id;
    },
  },

  computed: {
    activeListItem() {
      return this.list.filter((item) => item.id === this.id)[0];
    },
  },
};
```

Wir haben hier 3 Buttons welche das aktive Item in der liste switchen können. Der Titel des aktiven Items wird angezeigt. Lass uns den Code in die Composition API umschreiben:

```html
<template>
  <!-- Template kann alles so bleiben -->
  <div>
    <h1>{{activeListItem.title}}</h1>
    <button v-for="item in list" :key="item.id" @click="setId(item.id)">
      Change active list item to ID {{item.id}}
    </button>
  </div>
</template>
```

```javascript
import { ref, reactive, computed } from "vue";

export default {
  // unser Einstiegspunkt um die composition API zu nutzen
  setup() {
    // state wird jetzt mit "ref" oder "reactive" deklariert
    // reactive bei objekten, ref bei primitives. Du kannst aber
    // auch ref für Objekte nutzen (vue wandelt es zu reactive um)
    const id = ref(0);
    const list = reactive([
      {
        id: 0,
        title: "Hello World",
      },
      {
        id: 1,
        title: "Good night",
      },
      {
        id: 2,
        title: "Vue.js",
      },
    ]);

    const setId = (newId) => {
      // state deklariert mit "ref" hat immer eine value property,
      // die den tatsächlichen Wert von id zurückgibt
      id.value = newId;
    };

    // computed properties werden mit der neuen Function computed deklariert
    // auf state deklariert mit reactive kann ohne .value zugegriffen werden
    // es handelt sich um ein proxy zum original Objekt!
    const activeListItem = computed(
      () => list.filter((item) => item.id === id.value)[0],
    );

    // am Ende müssen wir alles returnen, was wir im Template nutzen möchten
    return {
      id,
      list,
      setId,
      activeListItem,
    };
  },
};
```

Falls du schon mit react hooks gearbeitet hast, sollte dich das hier stark daran erinnern! Auch in Vue.js werden wir in Zukunft Hooks schreiben, in diesem Sinne const { awesome } = useVue()!
