---
isDraft: false
title: Arbeiten mit APIs in Nuxt
description: Wie du deine API Calls in Nuxt strukturieren und abkoppeln kannst.
date: 2020-05-12T15:05:49
tags: ["nuxtjs"]
---

Je mehr deine Nuxt Applikation wächst, desto mehr API Endpunkte wirst du haben. Angenommen du musst bei einem Call etwas anpassen, dann musst du jeden API Call suchen und die Anpassung vornehmen. Das ist sehr suboptimal. Lass uns unsere API Calls von Nuxt entkoppeln und separat organisieren:

```javascript
// ~/plugins/api.js
const API = ($axios) => (type) => ({
  all() {
    return $axios.$get(`/${type}`);
  },

  create(data) {
    return $axios.$post(`/${type}`, data);
  },

  show(id) {
    return $axios.$get(`/${type}/${id}`);
  },

  // ...delete, update
});
```

Wir haben hier eine Funktion, welche einen HTTP Clienten (du kannst sonst was für deine API Calls benutzen, hier werden wir @nuxtjs/axios nutzen) als Argument nimmt und eine weitere Funktion returned. Diese erwartet den Resourcentyp, z.B. `'videos'`. Mithilfe dieser „closure“ Funktion, garantieren wir die maximale Wiederverwendbarkeit dieses Plugins (dazu gleich mehr).

Plugins können in Nuxt in die Vue Instanz, in den `context` oder einfach überall `injected` werden. Wir haben hier ein API Plugin welches wir voraussichtlich sowohl in der Vue Instanz, im `context` und auch auch im Vuex Store nutzen möchten. Daher werden wir das Plugin mit einem `combined inject` importieren. Unter unserer Funktion API exportieren wir unsere Plugin Funktion:

```javascript
// context und inject werden in der Plugin Funktion von Nuxt zur Verfügung gestellt
export default (ctx, inject) => {
  const apiWithAxios = API(ctx.$axios);

  const videosAPI = apiWithAxios("videos");
  const postsAPI = apiWithAxios("posts");

  // dank inject können wir nun
  // in unserer Vue Instanz this.$videosAPI / this.$postsAPI nutzen
  // im context ctx.app.$videosAPI / ctx.app.$postsAPI nutzen
  inject("videosAPI", videosAPI);
  inject("postsAPI", postsAPI);
};
```

Nuxt muss natürlich vom Plugin erfahren, dh. wir gehen in die `nuxt.config.js` und fügen dort das Plugin ein, wie in den Nuxt Docs beschrieben:

```javascript
// nuxt.config.js
module.exports = {
  // ...

  plugins: ["~/plugins/api.js"],
};
```

Nachdem du die `nuxt.config.js` bearbeitet hast, solltest du den Server neustarten. Nutzen wir unsere API Plugin:

```javascript
export default {
  // in einer Page Komponente
  async asyncData({ app }) {
    return {
      videos: app.$videosAPI.all(),
    };
  },

  // in allen Komponenten mit dem neuen fetch
  async fetch() {
    this.videos = await this.$videosAPI.all();
  },

  // in Methoden
  methods: {
    async getAllVideos() {
      this.videos = await this.$videosAPI.all();
    },
  },
};

// im Vuex Store
export const actions = {
  async getAllPosts({ commit }) {
    const posts = await this.$postsAPI.all();
    commit("SET_POSTS", posts);
  },
};
```

Solltest du die API erweitern wollen, etwas ändern müssen etc. musst du ab sofort nur noch in dein Plugin rein und es an einer Stelle anpassen 🥳
