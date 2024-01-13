---
isDraft: false
title: Git Bash Aliases und Functions
description: Arbeite mit git bash aliases und Funktionen noch effektiver!
date: 2020-05-27T22:44:30
tags: ["gitbash"]
---

Wer kennt das nicht:

```javascript
git add .
git commit -m 'changed some stuff'
```

Geht das auch kürzer? Mit aliases schon!  
In unserer `~/.bashrc`:

```javascript
alias gac='git add . && git commit'
// im Terminal (neu starten nach Änderungen in der bashrc) können wir nun:
gac -m 'changed some stuff'
```

Hammer oder? Es geht noch cooler, man kann auch Funktionen schreiben:

```javascript
project() {
    currentPath=$(pwd)
    cd "/c/Users/Hassan/desktop/dev/$1"
    code "."
    cd $currentPath
}
```

Ja, wir können auch mit Variablen arbeiten. Ich nutze diese Funktion um während einer VSCode Sitzung eine weitere (in einem anderen Projekt) zu starten. Danach wechsele ich zurück zum Ausgangspfad. Ich arbeite dabei immer im integrierten Terminal in VSCode. Das ist vergleichbar mit der Extension „Project Manager“. Die ist ganz cool, aber im Terminal geht es letztlich doch viel schneller.

Hier sind noch ein paar andere Aliase die ich benutze:

```javascript
alias gp='git push'
alias lastssh='history | grep ssh'
alias dev='cd ~/desktop/dev'
alias projects='ls ~/desktop/dev'
alias resetmodules='rm -rf node_modules && npm i'
alias nrb='npm run build'
```
