---
isDraft: false
title: NuxtJS Webseite mit Blog powered by headless WordPress
description: Ein paar Zeilen über die Erstellung und Strukturierung einer SPA mit Blog, basierend auf einem Headless CMS. Wie bekomme ich die SPA SEO-freundlich? Was muss ich mit WordPress machen? Wo hoste ich das Projekt? Wie, wo, was?
date: 2019-11-23T21:39:54
tags: ["nuxtjs", "wordpress"]
---

## Stack

Wie der Titel schon sagt, werde ich in diesem Beitrag über eine NuxtJS Applikation schreiben, welche mit der REST API von WordPress kommuniziert. Ich habe bereits mehrere Projekte dieser Art live gestellt und dabei viele Erfahrungen sammeln können. Dieser Stack wird auch [JAMStack](https://jamstack.org) genannt. Meine eigene Webseite nutzt genau diese Technologie. Natürlich kann man hier jetzt sehr sehr tief eintauchen…so tief möchte ich aber gerade nicht tauchen, daher begrenze ich den Beitragsumfang nur auf die Einbindung der WordPress REST API für Blogbeiträge. Der restliche Inhalt der Seite ist statisch. Solltest du aber gerne auch wissen wollen, wie du deine komplette Seite anhand der Daten von WordPress erstellst – lass es mich wissen!

[NuxtJS](https://nuxtjs.org/ "NuxtJS"), [WordPress](https://de.wordpress.com/ "WordPress") – unter den Links könnt ihr euch – falls noch nicht geschehen – erst mal über NuxtJS und WordPress informieren. Darauf werde ich im Folgenden nicht eingehen.

## WordPress

Wir möchten WordPress (folgend WP) nicht klassisch nutzen. WP soll unser Frontend nicht rendern, im Gegenteil, unser Frontend soll komplett unabhängig von unserem Backend sein. Alles was das Frontend von WP möchte, sind Daten.

WP wiederum ist es auch völlig egal, wo, wie oder wann das Frontend angezeigt wird. Es ist nur dazu da, Daten / Content zu managen. In anderen Worten, WP ist nur dazu da um mit der Datenbank zu kommunizieren…wenn man es so will, trifft die Bezeichnung CMS „Content Management System“ erst in der Variante eines Headless CMS wirklich zu.

Die WP REST API ist seit Version 4.7 (? – ich weiß es nicht genau) fest im Core verankert. Die „rohe“, unmodifizierte REST API von WP gibt uns schon viele Informationen und ist über den Pfad `/wp-json/wp/v2/` erreichbar. Beispielsweise könnt ihr unter [https://blog.siblanco.dev/wp-json/wp/v2/posts](https://blog.siblanco.dev/wp-json/wp/v2/posts) die letzten 10 Posts meines Blogs im JSON Format einsehen. Weitere Infos darüber gibt’s im WP Codex unter [https://developer.wordpress.org/rest-api/#routes-endpoints](https://developer.wordpress.org/rest-api/#routes-endpoints).

### Basics

WP hosten wir auf eine Subdomain und sorgen dafür, dass ein Besuch auf der Webseite „wp.domain.de“ direkt zum Login redirected wird. Dafür bedienst du dich am besten der im WP Core integrierten Funktionen `is_admin()` und `wp_safe_redirect()` mit dem Argument `get_admin_url()`. Außerdem solltest du unter Einstellungen > Permalinks die Option „Beitragsname“ wählen und Speichern. Beim Speichern schreibt WP in die .htaccess um Zugriffe auf die REST API abzufangen und zu handeln.

#### Theme

…genau! Welches Theme du benutzt ist völlig egal. Im Idealfall erstellst du dein eigenes Theme und aktivierst darin den Featured Image Support, es sei denn, du weißt von vorneherein, dass du keine Bilder verwenden wirst! Nutze dafür den action hook `after_setup_theme` und führe `add_theme_support('post_thumbnails')` aus.

#### Plugins

Wir brauchen das Plugin `Better REST API Featured Images`, welches unsere Featured Images mit in die REST API aufnimmt, sodass wir zB. unter /wp-json/wp/v2/posts unsere hochgeladenen Bilder mit URLs etc. zu sehen kriegen! Außerdem nutze ich auch gerne das Plugin `TinyMCE Advanced`, womit ich den WP Gutenberg Editor ausschalten und weitere Einstellungen für den tinymce Editor vornehmen kann.

Damit ist WP jetzt bereit für unsere Blogfunktion.

## NuxtJS

Wir wollen unser Frontend mit dem Befehl `npm run generate` builden und am Ende statische HTML Seiten haben, die wir auf einen Server – egal welcher Art – hosten können. Somit wälzen wir die Arbeit beim ersten Seitenaufruf durch einen Besucher auf den Server ab. Sobald die Seite geladen wurde, übernimmt unser JavaScript und damit der Client. Das bringt unter anderem neben SEO Vorteilen, auch eine hervorragende Geschwindigkeit mit sich.

Bzgl. der SEO Vorteile – Google hat die Chromium Version des Google Bots jetzt endlich auf die aktuellste Version gebracht und auch angekündigt, diesen immer aktuell zu halten. Das bedeutet wir könnten unsere SPAs komplett vom Clienten rendern lassen und müssten keine SEO Nachteile mehr in Kauf nehmen. Auch der Bingbot ist jetzt auf dem aktuellsten Stand. Leider gibt es aber noch Social Media Kanäle, aka FB, IG und Twitter. Bei meinen letzten Tests hat zumindest FB kein JavaScript gecrawlt…das bedeutet wir bleiben vorerst bei statischen Dateien – aber lange wird das nicht mehr dauern! Yay 😛

### Setup

Wie oben bereits erwähnt, wird nur unser Blog von WP gefüttert, der Rest der App ist statisch. Wir erstellen eine NuxtJS APP mit dem Befehl `npx create-nuxt-app <name>`. Weiterhin werden wir die Pakete @nuxtjs/axios & sitemap benötigen – `npm install --save @nuxtjs/axios @nuxtjs/sitemap`.  
Axios nutzen wir, um mit unserer WP REST API zu kommunizieren. Warum nicht `fetch()`? Browserseitig ja, aber unser Server ist bei dem Builden auch auf die WP API angewiesen und `fetch()` funktioniert nur browserseitig.  
Mit dem Modul @nuxtjs/sitemap wird nach jedem build automatisch eine Sitemap erstellt – das spart uns Arbeit! Docs zum Nutzen der beiden Pplugins – [@nuxtjs/sitemap](https://www.npmjs.com/package/@nuxtjs/sitemap), [@nuxtjs/axios](https://axios.nuxtjs.org/).

### Blog

Als nächstes erstellen wir eine Seite für alle Blogbeiträge. Dazu legen wir die Datei `pages/blog/index.vue` an. In der `asyncData` Funktion besorgen wir uns alle Posts von unserer WP API:

```javascript
export default {
  async asyncData({ $axios }) {
    const posts = await $axios.$get("/posts?per_page=100");
    return { posts };
  },
};
```

Ich habe in der `nuxt.config.js` die Axios Base URL auf `https://blog.domain.de/wp-json/wp/v2` gesetzt und kann deshalb einfach `get('/posts/...')` schreiben. Für mehr Details zu den Axios Einstellungen kannst du dir die og. verlinkten Axios Docs durchlesen.

Die asyncData Funktion wird beim Seitenaufruf serverseitig und danach bei jedem Routenwechsel clientseitig aufgerufen. Wir wollen ja mit `nuxt generate` eine statische Seite hosten, also nur HTML Dateien. Was ich damit sagen will ist, dass du hier keine serverseiten Aktionen benutzen kannst (wie zum Beispiel das request Objekt auslesen etc.), diese werden nicht funktionieren. Anders wäre es natürlich, wenn wir unsere App mit `nuxt build & nuxt start` auf einem Server mit NodeJS hosten würden.

Ok, zurück zur Blogseite. Wir haben nun in unserem Data Objekt ein Array names posts. Durch dieses können wir loopen und alle Posts darstellen.

```html
<ul>
  <li v-for="post in posts" :key="post.id">
    <h2>{{post.title.rendered}}</h2>
    <div v-html="post.excerpt.rendered"></div>
    <nuxt-link :to="`/blog/${post.slug}/`">Lesen</nuxt-link>
  </li>
</ul>
```

Welche Felder du sonst noch anzeigst, liegt ganz an dir…Datum, Bilder etc. Nun erstellen wir die Datei `pages/blog/_slug.vue`. Hier haben wir innerhalb der asyncData Funktion Zugriff auf den Paramater slug (vom Link post.slug).

```javascript
async asyncData({ $axios, params, payload }) {
    const [post] = await $axios.$get(`/posts?slug=${params.slug}`);
    return { post };
}
```

Wir holen uns den Parameter slug und fetchen damit den Inhalt des Beitrages. Dabei gibt die WP API zum Filtern unter anderem den Parameter „slug“. Mit `const [post]` hole ich mir direkt den Beitrag aus dem Array raus, „[Destructuring“](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Operators/Destrukturierende_Zuweisung "Mehr über destructuring").

Jetzt können wir, mit Hilfe des post Objektes, den Inhalt unseres Beitrages anzeigen:

```html
<div>
  <h1>{{post.title.rendered}}</h1>
  <p>
    <small>{{post.date.substr(0, 10)}}</small>
  </p>
  <div v-html="post.excerpt.rendered"></div>
</div>
<div v-html="post.content.rendered"></div>
```

### Nuxt generate

Wie bereits erwähnt, können wir mit `nuxt generate` statische HTML Dateien für jede unserer Seiten erstellen. Das geht für alle, nicht dynamischen, Seiten, die wir im Ordner `pages` anlegen. Dynamische Seiten, wie zum Beispiel unsere `pages/blog/_slug.vue` werden nicht berücksichtigt, es sei denn, wir übergeben diese dynamischen Routen an die `generate.routes` property in der `nuxt.config.js`. Kein Thema bei 10~ Beiträgen, aber müssen wir wirklich bei jedem neuen Beitrag eine neue Route hinzufügen? Nein, zum Glück nicht. Die `generate.routes` property kann zum Glück auch eine Funktion sein, welche ein Array returned:

```javascript
generate: {
    async routes() {
        const posts = await axios.get(
            "https://blog.domain.de/wp-json/wp/v2/posts?per_page=100"
        );
        return posts.data.map(post => {
            return {
                route: "/blog/" + post.slug,
                payload: post
            };
        });
    },
    fallback: "404.html"
}
```

Hier holen wir uns die ersten 100 Posts unseres Blogs, loopen dadurch und returnen ein Array. Für jeden Beitrag erstellen wir ein Objekt mit dessen slug und `payload: post`. Hier solltet du spätestens, wenn du mehr als 100 Einträge hast, dafür sorgen, dass du auch weitere Beiträge reinholst, sofern weitere existieren. Ich schreib dir am Ende kurz auf, wie ich das machen würde. Unsere property `payload` nutzen wir, um den Prozess `nuxt generate` zu beschleunigen und um unsere WP API nicht unnötig zu belasten. Dazu rufen wir nochmal die Datei `pages/blog/_slug.vue` auf und ergänzen folgendes:

```javascript
async asyncData({ $axios, params, payload }) {
    if (payload) {
        return { post: payload };
    }

    const [post] = await $axios.$get(`/posts?slug=${params.slug}`);
    return { post };
}
```

Beim generieren der HTML Dateien wird der payload das jeweilige post Objekt beinhalten und wir können es uns sparen, die WP API für jeden Beitrag erneut anzufragen. `fallback: "404.html"` geben wir an, um eine 404.html im Rootverzeichnis zu erstellen. Diese können wir stylen / bearbeiten mithilfe der Datei `layouts/error.vue`. Siehe hierzu die NuxtJS Docs.

Ok, super. Jetzt haben wir alles soweit eingerichtet und können in der Konsole unseren Befehl `npm run generate` ausführen. Alle unsere Seiten erscheinen als HTML Dateien im Ordner `dist`. Das schöne daran ist, dass diese HTML Dateien auch den kompletten Content beinhalten. Auch für unsere Beiträge wurden HTML Dateien erstellt, yeah! Eine sitemap.xml sehen wir auch, gefüllt mit all unseren Seiten.

Diesen `dist` Ordner kannst du jetzt einfach auf deinen Server werfen, eine Domain darauf pointen und die Seite funktioniert. Solltest du Apache nutzen, musst du noch über das ErrorDocument informieren, beispielsweise in der .htaccess `ErrorDocument 404 /404.html`.

Nochmal zurück zum Punkt „mehr als 100 Posts“. Wenn du die WP API ansprichst, siehst du in den Response Headern den Wert `x-wp-totalpages: x`. Dieser zeigt dir, ob es weitere Seiten gibt:

```javascript
async routes() {
    let i = 1;
    let allPosts = [];

    let content = await axios.get(`https://blog.domain.de/wp-json/wp/v2/posts?page=${i}&per_page=100`);
    allPosts = allPosts.concat(content.data);

    let totalPages = content.headers['x-wp-totalpages'];

    while (totalPages > i) {
        i++;
        let response = await axios.get(`https://blog.domain.de/wp-json/wp/v2/posts?page=${i}&per_page=100`);
        allPosts = allPosts.concat(response.data);
    }

    return allPosts.map(post => {
        return {
            route: "/blog/" + post.slug,
            payload: post
        };
    });
}
```

Wir holen uns die ersten 100 Beiträge und führen sie mit unserem Array allPosts zusammen. Der Header `x-wp-totalpages` zeigt uns, wie viele Seiten es insgesamt gibt. Solange unsere Variable `totalpages > i` ist, fragen wir die WP API nach den nächsten Posts, page=2, page=3 etc…und führen diese mit allPosts zusammen. Am Ende returnen wir ein neues Array, für jeden Post ein Objekt, mit den properties `route & payload`.
