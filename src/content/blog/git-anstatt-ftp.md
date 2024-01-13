---
isDraft: false
title: GIT anstatt FTP
description: Update dein Zeug nicht mehr über FTP, nutze GIT mit vielen Vorteilen
date: 2021-11-18T08:48:24
tags: ["git", "ssh"]
---

Ich habe selbst nie wirklich einen FTP-Clienten genutzt. Kurz bei meinen Anfängen, aber das gehörte ziemlich schnell der Vergangenheit an. Klar, es gibt – zwar sehr selten – noch immer Hosting-Spezialisten, die weder GIT noch SSH-Zugriffe anbieten. Da muss man dann doch leider wieder zu einem FTP-Clienten greifen…aber am besten meidet man die Hoster einfach, Hosting-Angebote gibt es ja mehr als genug.

## SSH

Grundvoraussetzung ist natürlich der SSH-Zugriff. Damit kannst du auch ohne GIT Dateien auf dem Server inkrementell updaten:

```bash
rsync -avP ./dein-projekt user@server.host/pfad
```

Mehr zu rsync findest du hier [https://linux.die.net/man/1/rsync](https://linux.die.net/man/1/rsync).

## GIT

Möchtest du noch eine Versionierung dabei haben (unbedingt 👋🏻), arbeitest du am besten mit GIT. Erstelle dazu auf deinem Server ein Repo, welches du als dein Remote nutzt. Klone dieses auf deinem Server und richte einen post-receive hook ein. Im Terminal:

```bash
# auf den Server
ssh user@server.host
mkdir repos && cd repos

# bare Repo erstellen (kurz: ein Repo, welches als "Original" Repo für externe Nutzer agiert. Das passiert auch wenn du bei github / gitlab ein Repo erstellst)
git init --bare mein-projekt

# hook erstellen
touch mein-projekt/hooks/post-receive
# hook muss ausführbar sein
chmod 755 mein-projekt/hooks/post-receive

# repo klonen
cd .. && mkdir production
cd production && git clone ../git/mein-projekt
```

Der Inhalt für den Hook:

```bash
#!/bin/bash
unset $(git rev-parse --local-env-vars)
cd /pfad-zum-geklonten-repo
git pull
```

So, jetzt hast auf deinem Server dein Repo erstellt, welches du nun lokal bearbeiten kannst. Pushst du darein, wird dein Klon auf dem Server dank des post-receive Hooks automatisch aktualisiert. Einfach gesagt: anstelle von Github / Gitlab nutzt du jetzt deinen Server für dein Repo. Auf deiner lokalen Maschine:

```bash
cd dev
git clone ssh://user@server.host/~/git/mein-projekt
```

Jetzt noch deine Domain korrekt einstellen und es kann losgehen. Den Rest solltest du kennen :-). Den Hook kann man natürlich – wenn nötig – mit mehr Bedingungen verknüpfen, bevor gepullt werden darf (zum Beispiel nur beim Master Branch). Falls du Fragen hast, meld dich gerne!
