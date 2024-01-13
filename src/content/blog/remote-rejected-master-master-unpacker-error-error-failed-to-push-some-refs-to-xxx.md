---
isDraft: false
title: "[remote rejected] master -> master (unpacker error) error: failed to push some refs to &#8218;xxx&#8216;"
description: Ich zeige dir kurz wie du den o.g. Fehler umgehen kannst.
date: 2022-06-20T13:59:06
tags: ["git"]
---

Moin, lange nicht mehr gesehen ;-)…

Wer kennt es nicht, ein Projekt soll live gehen und du installierst GIT beim Kunden, erstellst ein bare Repo, fügst in deinem lokalen Repo einen neuen remote host „kunde“ hinzu und ab gehts, `git push kunde` und dann kommt das `[remote rejected] master -> master (unpacker error) error: failed to push some refs to 'xxx'`.

Spaß bei Seite…ich kannte das bisher noch nicht, das passierte letztens das erste Mal. Ich vermute dahinter eine Sicherheitsvorkehrung des Serverhosts, der Fehler kam nämlich immer nur dann, wenn ich versucht habe ne Menge Dateien auf einmal zu pushen (ich habe bei dem Projekt den build Ordner mit versioniert, da kein Node zur Verfügung).

Ich habe das Problem leider nicht lösen können, der Anbieter konnte / wollte(?) auch nicht weiterhelfen. Über Umwege habe ich am Ende dann doch noch mein Repo erstellt und Dateien pushen können:

Nachdem du das bare Repo erstellt hast, lädst du alle Dateien (ausgenommen node_modules und .git) über z.b. rsync hoch: `rsync -avP mein-ordner hostname:~/pfad/zu/ordner/ --exclude node_modules --exclude .git`. Jetzt per SSH rüber auf den Server und in den gerade hochgeladenen Ordner switchen. Jetzt initialisierst (ja, die History ist leider weg) du hier dein Repo und pushst es:

```bash
git init
git remote add kunde hostname:~/pfad/zu/ordner/#
git add .
git commit -m 'initial commit'
git push -u origin master
```

Jetzt taucht der Fehler nicht mehr auf…wahrscheinlich weil von „lokal“ gepusht wird? Ich weiß es nicht…jetzt noch bei dir auf dem Rechner das neue Repo klonen und du kannst weiterarbeiten 🤝🏼
