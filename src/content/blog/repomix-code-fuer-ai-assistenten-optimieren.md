---
title: "Repomix: Code für AI-Assistenten optimal aufbereiten"
pubDate: 2025-03-16
description: "Mit Repomix kannst du dein gesamtes Repository in ein einziges, AI-freundliches Format umwandeln - perfekt für die Zusammenarbeit mit KI-Tools wie ChatGPT, Claude oder Gemini."
---

# Repomix: Code für AI-Assistenten optimal aufbereiten

Du kennst das sicher: Du möchtest von einem AI-Assistenten wie ChatGPT, Claude oder Gemini Hilfe bei einem Coding-Problem bekommen. Doch dein Projekt besteht aus Dutzenden oder sogar Hunderten von Dateien. Einzeln hochladen? Viel zu aufwendig. Hier kommt Repomix ins Spiel - ein Tool, das ich kürzlich entdeckt habe und das mir die Arbeit mit KI-Assistenten erheblich erleichtert hat.

## Was ist Repomix?

Repomix (früher bekannt als Repopack) ist ein Tool, das dein gesamtes Repository in eine einzige, für KIs optimierte Textdatei umwandelt. Das Besondere: Es behält dabei die Struktur deines Codes bei und formatiert alles so, dass Language Models wie GPT-4 oder Claude den Code besser verstehen können.

Die Hauptfunktionen auf einen Blick:

- **AI-optimierte Ausgabe**: Formatiert deinen Code für besseres Verständnis durch KIs
- **Token-Zählung**: Zeigt an, wie viele Tokens die Ausgabe enthält (wichtig für Kontextlimits)
- **Einfache Nutzung**: Ein einziger Befehl genügt, um dein Repository aufzubereiten
- **Anpassbar**: Du entscheidest, welche Dateien ein- oder ausgeschlossen werden
- **Git-Integration**: Berücksichtigt deine `.gitignore`-Dateien automatisch
- **Sicherheitsprüfung**: Integriert [Secretlint](https://github.com/secretlint/secretlint) zur Erkennung sensibler Informationen
- **Code-Komprimierung**: Mit der Option `--compress` werden nur die wichtigsten Codeteile extrahiert

## Schnellstart mit Repomix

Die Installation und Nutzung ist denkbar einfach:

```bash
# Ohne Installation sofort nutzen
npx repomix

# Oder global installieren
npm install -g repomix

# In jedem Projektverzeichnis ausführen
repomix
```

Nach der Ausführung erstellt Repomix eine `repomix-output.txt` Datei, die du direkt an deine KI senden kannst. Keine mühsame Auswahl einzelner Dateien mehr!

## Was ich besonders praktisch finde

Was mich an Repomix besonders begeistert, ist die Möglichkeit, Remote-Repositories zu verarbeiten. Du kannst direkt ein GitHub-Repository angeben, ohne es vorher zu klonen:

```bash
repomix --remote yamadashy/repomix
```

Auch die Komprimierungsoption ist super nützlich. Mit `--compress` extrahiert Repomix nur die wichtigsten Elemente wie Funktions- und Klassensignaturen, was die Token-Anzahl erheblich reduziert:

```bash
repomix --compress
```

## Ausgabeformate

Repomix unterstützt drei verschiedene Ausgabeformate:

1. **Plain Text** (Standard): Einfaches Textformat mit klaren Trennzeichen
2. **XML**: Strukturiertes Format, das besonders gut für Claude funktioniert
3. **Markdown**: Gut lesbar für Mensch und Maschine

Die Formatwahl erfolgt mit der `--style`-Option, zum Beispiel:

```bash
repomix --style markdown
```

## Praktische Anwendungsfälle

Hier sind einige Szenarien, in denen ich Repomix besonders hilfreich finde:

1. **Code-Reviews**: Lass einen AI-Assistenten deinen Code überprüfen und Verbesserungen vorschlagen
2. **Refactoring**: Lass dir helfen, komplexe Codeteile umzustrukturieren
3. **Dokumentationserstellung**: Generiere README-Dateien oder Dokumentation für dein Projekt
4. **Testerstellung**: Lass Tests für deinen Code vorschlagen
5. **Architektur-Überblick**: Verschaffe dir einen Überblick über ein unbekanntes Projekt

## Mein Fazit

Repomix hat meinen Workflow mit KI-Tools deutlich verbessert. Die Zeit, die ich früher damit verbracht habe, einzelne Dateien hochzuladen, kann ich jetzt für produktivere Aufgaben nutzen. Die Ausgabe ist sauber formatiert und enthält genau die Informationen, die eine KI braucht, um meinen Code zu verstehen.

Besonders gefällt mir, dass das Tool Open Source ist und aktiv weiterentwickelt wird. Mit mittlerweile über 13.000 Sternen auf GitHub scheint es auch bei anderen Entwicklern gut anzukommen.

Für alle, die regelmäßig mit KI-Assistenten an Codeprojekten arbeiten, ist Repomix definitiv einen Blick wert. Du findest es auf GitHub unter [yamadashy/repomix](https://github.com/yamadashy/repomix) oder kannst die Online-Version auf [repomix.com](https://repomix.com) ausprobieren.

Hast du bereits Erfahrungen mit Repomix oder ähnlichen Tools gesammelt? Ich bin gespannt auf deine Meinung in den Kommentaren!
