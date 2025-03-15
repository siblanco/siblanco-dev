---
isDraft: false
title: "Vibe Coding in Action: Integration von Giscus in meinen Blog"
description: "Ein praktisches Beispiel, wie ich mit KI-Agenten eine Kommentarfunktion für meinen Blog implementiert habe - ohne eine Zeile Code selbst zu schreiben."
date: 2024-03-20
tags: ["devlife", "ai", "astro"]
---

# Vibe Coding in Action: Integration von Giscus in meinen Blog

## Moin!

In meinem letzten Beitrag habe ich euch von [Vibe Coding und KI-Agenten](https://siblanco.dev/blog/vibe-coding) erzählt. Heute zeige ich euch, wie ich diese Techniken konkret genutzt habe, um meinen Blog mit einer Kommentarfunktion zu erweitern.

## Ein praktisches Beispiel

Nach meinem Rewrite meiner Website mit Astro fehlte noch etwas Wichtiges: Eine Kommentarfunktion für meine Blogbeiträge. Ich wollte keine komplizierte Lösung mit eigenem Backend, sondern etwas Schlankes, das sich gut in mein bestehendes Setup einfügt. Meine Wahl fiel auf [Giscus](https://giscus.app) - ein Kommentarsystem, das auf GitHub Discussions basiert.

Anstatt mir die Dokumentation durchzulesen und alles selbst zu implementieren, habe ich einfach meinen KI-Agenten gefragt: "Erstelle mir eine Astro-Komponente für Giscus-Kommentare, die ich in meinem Blog verwenden kann."

## Der generierte Code

Innerhalb weniger Sekunden hatte ich eine vollständige `Comments.astro`-Komponente, die genau das tat, was ich brauchte:

```astro
---
interface Props {
  theme?: "dark" | "light" | "dark_dimmed" | "transparent_dark";
}

const { theme = "dark" } = Astro.props;
---

<section class="comments my-8 md:my-12">
  <h2 class="text-xl sm:text-2xl lg:text-3xl mb-4 font-medium">Kommentare</h2>
  <div class="giscus"></div>
</section>

<script is:inline>
  function loadGiscus() {
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.dataset.repo = "siblanco/siblanco-dev";
    script.dataset.repoId = "R_kgDOLDp6tA";
    script.dataset.category = "Announcements";
    script.dataset.categoryId = "DIC_kwDOLDp6tM4CoFFk";
    script.dataset.mapping = "pathname";
    script.dataset.strict = "0";
    script.dataset.reactionsEnabled = "1";
    script.dataset.emitMetadata = "0";
    script.dataset.inputPosition = "bottom";
    script.dataset.theme = "dark";
    script.dataset.lang = "de";
    script.crossOrigin = "anonymous";
    script.async = true;

    const container = document.querySelector(".giscus");
    if (container) {
      container.innerHTML = "";
      container.appendChild(script);
    }
  }

  // Load Giscus after the page has fully loaded
  window.addEventListener("load", loadGiscus);

  // Handle theme changes if your site has theme switching functionality
  document.addEventListener("astro:after-swap", loadGiscus);
</script>

<style>
  .comments {
    border-top: 1px solid rgba(59, 186, 149, 0.2);
    padding-top: 2rem;
  }

  /* Ensures proper spacing when giscus loads */
  .giscus {
    min-height: 150px;
  }
</style>
```

Die Komponente enthält alles, was ich brauchte:

1. Eine saubere Interface-Definition mit optionalem Theme-Parameter
2. Ein Abschnitt für die Kommentare mit ansprechendem Styling
3. Ein inline-Script, das Giscus dynamisch lädt und korrekt initialisiert
4. Event-Listener für die Seiten-Navigation und Theme-Wechsel
5. CSS für ein konsistentes Layout

## Integration in mein Blog-Layout

Die Integration in mein bestehendes `PostLayout.astro` war denkbar einfach:

```astro
import Comments from "../components/Comments.astro";
```

Und dann einfach vor meinem Link "« Alle Beiträge" einfügen:

```astro
<Comments />
```

Das Erstaunliche dabei: Der KI-Agent hat nicht nur funktionierenden Code generiert, sondern auch alle wichtigen Edge Cases berücksichtigt:

- Das Neuladen der Kommentare nach Navigation mit Astro
- Konsistentes Styling, das zu meinem bestehenden Design passt
- Eine saubere, wartbare Komponenten-Struktur

## Fazit

Was früher eine Stunde Recherche, Dokumentation lesen und Debugging bedeutet hätte, war in etwa fünf Minuten erledigt. Der generierte Code funktionierte auf Anhieb und fügte sich nahtlos in mein bestehendes Projekt ein.

Das ist für mich der entscheidende Vorteil von Vibe Coding: Ich konnte mich auf das "Was" konzentrieren (Kommentarfunktion hinzufügen) und musste mich nicht mit dem "Wie" beschäftigen. Die KI hat die Details übernommen und sauber implementiert.

Ich nutze diese Technik mittlerweile für viele Aspekte meiner Entwicklungsarbeit - von Komponenten-Erstellung bis hin zur Implementierung komplexer Funktionen. Das spart nicht nur Zeit, sondern reduziert auch den kognitiven Aufwand erheblich.

Hast du schon Erfahrungen mit KI-gestützter Codegenerierung für deine Projekte gemacht? Ich bin gespannt auf deine Erfahrungen!

---

_Hinweis: Auch dieser Beitrag wurde mithilfe von KI-Technologien erstellt – eine Metaebene, die das Konzept des Vibe Coding perfekt veranschaulicht!_
