---
isDraft: false
title: siblanco.dev rewrite in Astro
description: Umstieg von Nuxt 2 auf Astro
date: 2024-01-13
tags: ["astro", "javascript", "html5"]
---

## Warum umsteigen?

Ich weiß gar nicht, ob ich jemals erwähnt habe auf welchem Stack die alte Version von siblanco.dev basierte.
Ich habe Nuxt 2 zusammen mit der WP Rest API genutzt, ähnlich wie hier beschrieben: [NuxtJS Webseite mit Blog powered by headless WordPress](https://siblanco.dev/blog/nuxtjs-mit-headless-wordpress).

Damit war ich auch sehr zufrieden, aber ich wollte gerne mal was mit Astro machen und habe mich daher entschieden, die Seite komplett neu zu bauen. Zum Glück ist es eine sehr simple Seite, das ging also echt zügig.

Für den content habe ich mich für markdown entschieden, das ist für mich einfach und schneller zu schreiben und ich muss nicht den Editor verlassen. Das spart mir auch das Hosten von WordPress.

Für die Migration des Contents habe ich ein kleines Skript geschrieben, welches du hier einsehen kannst: [https://github.com/siblanco/siblanco-dev-wp-to-md](https://github.com/siblanco/siblanco-dev-wp-to-md)

Ich habe die neue Version open source auf GitHub veröffentlicht: [https://github.com/siblanco/siblanco-dev](https://github.com/siblanco/siblanco-dev). Da kannst du dich gerne mal durchklicken :)

## Fazit

Astro macht richtig Spaß und ist mega schnell. Das integrierte syntax-highlighting in markdown files kam mir auch mega gelegen. Die Seite performed auf jeden Fall besser als die alte - auch wenn das jetzt nicht der Knackpunkt war, die war schon schnell genug.

Ich musste aber auch über Javascript schmunzeln. Wir drehen und machen und am Ende - mit Astro - sind wir wieder bei oldschool SSR gelandet. Manchmal fühlt Astro sich wie PHP "on steroids" an.

Nvim ließ sich auch gut einstellen, der Astro language server macht echt einen guten Job.

Mehr zu Astro findest du hier: [https://astro.build/](https://astro.build/)
