---
isDraft: false
title: Der etwas andere WordPress Loop
description: "Ein kurzer Einblick: Wie ich in WordPress mithilfe von ACF arbeite."
date: 2020-06-04T19:37:57
tags: ["wordpress"]
---

Wenn du schon mit WordPress gearbeitet hast, sollte dir „the loop“ bekannt sein:

```php
<?php
while (have_posts()) : the_post(); ?>
    <main>
        <?php
            the_title();
            the_content();
            // etc.
        ?>
    </main>
<?php endwhile; ?>
```

Hat unsere jetzige Seite, oder besser unser aktueller Post – in WP ist ja alles ein Post – Inhalte, so zeigen wir sie an. Wer mehr Details möchte, schaut hier [https://codex.wordpress.org/The_Loop](https://codex.wordpress.org/The_Loop).

Dabei bist du aber auf die Standard-Felder von WP begrenzt, sprich Titel, Auszug, Inhalt und Bild. Jetzt kannst du natürlich selbst „custom fields“ integrieren und im Frontend anzeigen oder aber du nutzt das – Achtung, voreingenommene Meinung – beste WordPress Plugin für Entwickler, [Advanced Custom Fields](https://www.advancedcustomfields.com/). Ganz grob zusammengefasst: mit ACF kannst du neben den Standard-Feldern von WP ganz einfach in einem schönen User Interface extra Felder hinzufügen. Dabei rede ich nicht nur von einfachen Textfeldern o.Ä., nein, du kannst auch komplizierte Felder wie Repeater, Flexible Content und so weiter nutzen (PRO Version) – siehe [hier](https://www.advancedcustomfields.com/pro/).

Das sollte als kleines Intro über ACF reichen, hier geht es schließlich nur darum, wie ich damit arbeite. Dabei setze ich eigentlich voraus, dass du ACF bereits kennst / nutzt. Meistens nutze ich bloß die `index.php` und sonst keine anderen Templates (natürlich gibt’s hier und da Ausnahmen). Und die sieht dann so aus:

```php
<?php get_header(); ?>
<main>
    <?php if (have_rows('komponenten')) : ?>
        <?php while (have_rows('komponenten')) : $row = the_row(true); ?>
            <?php include get_template_directory() . '/components/' . get_row_layout() . '.php'; ?>
        <?php endwhile; ?>
    <?php endif; ?>
</main>
<?php get_footer(); ?>
```

Ich nutze das [Flexible Content Feld](https://www.advancedcustomfields.com/resources/flexible-content/), in welchem ich Komponenten definiere, welche mit diesem Loop automatisch importiert werden. So kannst du bspw. die Komponente „Abstandshalter“, mit den Optionen „klein, mittel, groß“ erstellen. Gleichzeitig legst du in `/dein-theme/components/abstandshalter.php` ab. Die könnte so aussehen:

```php
<div class="abstandshalter <?php the_sub_field('abstand'); ?>"></div>
```

Das passende CSS dazu und dein Content-Editor kann „page-builder“-mäßig Abstände einfügen, wo er möchte :-P. Das schönste an ACF ist, dass der Content auch über die WP REST API zugänglich gemacht werden kann. Willst du also gar nicht innerhalb WP dein Frontend aufbauen, also WP als Headless CMS nutzen, wirst du – neben den Standard-Feldern – auch mit den ACF-Feldern keine Probleme haben. Wie du einen Blog mit Nuxt + Headless WP startest, kannst du [hier](/blog/nuxtjs-mit-headless-wordpress/) nachlesen.
