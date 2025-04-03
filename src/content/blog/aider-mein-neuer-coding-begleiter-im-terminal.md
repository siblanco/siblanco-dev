---
isDraft: false
title: "Aider: Mein neuer Coding-Begleiter im Terminal"
description: "AI Pair-Programming-Tool für den Terminal-Workflow"
date: 2025-04-03T21:55:00
tags: ["devlife", "ai"]
---

## Moin!

In meinen letzten Beiträgen habe ich über [Vibe Coding und KI-Agenten](https://siblanco.dev/blog/vibe-coding) sowie deren [praktische Anwendung](https://siblanco.dev/blog/feat-comments) geschrieben. Heute möchte ich euch ein weiteres Tool vorstellen, dass ich lieben gelernt habe: **aider**.

## Was ist aider?

Aider ist ein AI-Pair-Programming-Tool, das direkt im Terminal läuft und sich nahtlos in deinen Git-Workflow integriert. Anders als viele andere KI-Coding-Tools funktioniert aider dort, wo wir Entwickler uns sowieso die meiste Zeit aufhalten - im Terminal.

Der Name "aider" kommt übrigens vom englischen "to aid" (helfen) und genau das tut es: Es hilft dir beim Coden, ohne dich aus deinem gewohnten Workflow zu reißen.

Das Besondere an aider ist, dass es dein Git-Repository versteht. Es kann:

- Mehrere Dateien gleichzeitig bearbeiten
- Neue Dateien erstellen
- Änderungen direkt als Commits vorbereiten
- Mit komplexen Codebasen umgehen

## Wie arbeitet man mit aider?

Die Nutzung ist erfrischend einfach. Nach der Installation startest du aider einfach in deinem Git-Repository:

```bash
cd mein-projekt
aider
```

Danach öffnet sich eine Chat-Schnittstelle, in der du in natürlicher Sprache mit der KI kommunizieren kannst. Zum Beispiel:

````
> Erstelle mir eine Funktion, die prüft, ob ein String ein Palindrom ist

Ich werde eine Funktion erstellen, die prüft, ob ein String ein Palindrom ist.

```javascript
function isPalindrome(str) {
  // Nicht-alphanumerische Zeichen entfernen und alles in Kleinbuchstaben umwandeln
  const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');

  // Umkehren und vergleichen
  const reversed = cleanStr.split('').reverse().join('');

  return cleanStr === reversed;
}
````

Diese Funktion nimmt einen String entgegen, bereinigt ihn von Sonderzeichen und wandelt ihn in Kleinbuchstaben um. Dann wird der String umgekehrt und mit dem Original verglichen.

Soll ich diese Funktion in eine bestimmte Datei einfügen?

## Architect-Mode: Mein absoluter Favorit

Während aider in seinem Standardmodus schon sehr hilfreich ist, hat mich der **Architect-Mode** komplett überzeugt. Starte ihn einfach mit:

```bash
aider --architect

# oder wenn du bereits in einer Sitzung bist:
/architect
```

In diesem Modus agiert die KI als erfahrener Software-Architekt, der dir mit hochwertigeren, durchdachteren Lösungen zur Seite steht. Statt nur Code zu schreiben, gibt die KI hier mehr Kontext, erklärt Designentscheidungen und denkt in größeren Zusammenhängen.

Was ich besonders schätze: Im Architect-Mode hinterfragt die KI manchmal meine Anfragen, wenn sie sieht, dass es bessere Lösungsansätze gibt. Sie gibt mir nicht einfach stumpf das, was ich verlange, sondern das, was mein Code wirklich braucht.

Ein Beispiel aus meinem Alltag:

```
> Erstelle einen Express-Router für die Benutzerauthentifizierung

Ich werde einen Express-Router für die Benutzerauthentifizierung erstellen. Bevor ich mit der Implementierung beginne, möchte ich kurz über die Architektur nachdenken.

Für eine solide Authentifizierungslösung sollten wir folgende Aspekte berücksichtigen:
- Trennung von Routen und Business-Logik
- Sichere Passwort-Handhabung
- Token-basierte Authentifizierung (JWT)
- Middleware für geschützte Routen

Hier ist mein Vorschlag für die Struktur:

1. Ein Router für Auth-Endpoints
2. Ein Middleware-File für Token-Validierung
3. Ein Service für die Authentifizierungslogik

Lass mich diese Komponenten implementieren:

// auth.routes.js
```

Dieser Ansatz entspricht viel mehr dem, was ich in professionellen Projekten umsetzen würde, als wenn ich einfach nur einen grundlegenden Router angefordert hätte.

## Integration mit meinem Workflow

Da ich viel mit Neovim und tmux arbeite (wie ich in [Einmal bitte 180 Grad](https://siblanco.dev/blog/einmal-bitte-180-grad/) beschrieben habe), passt aider perfekt in meinen Terminal-basierten Workflow.

Ich nutze fast immer den Architect-Mode, ein starkes thinking model wie claude 3.7-thought und ein schnelles editor model wie gpt-4.
Claude erarbeitet mit mir die Lösung und GPT setzt es sehr schnell um.

## Fazit

Aider ist für mich mehr als nur ein weiteres KI-Tool. Es ist ein durchdachter Assistent, der sich in meinen bestehenden Workflow einfügt, statt ihn zu ersetzen. Besonders der Architect-Mode hat mir gezeigt, wie wertvoll die richtige Perspektive bei KI-Assistenten sein kann.

Hast du schon Erfahrungen mit aider gemacht? Oder nutzt du andere KI-Tools für deine Entwicklung? Ich bin gespannt auf deine Erfahrungen!

---

_Hinweis: Auch dieser Beitrag wurde mit Unterstützung von KI-Technologien erstellt!_
