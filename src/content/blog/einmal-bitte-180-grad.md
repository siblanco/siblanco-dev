---
isDraft: false
title: Einmal bitte 180 Grad
description: Mein neuer Workflow aus i3, tmux, vim und miryoku.
date: 2022-12-23T22:29:13
tags: ["devlife"]
---

# Was aus „Ich will nur von Ubuntu zu Arch Linux wechseln“ wurde

Wechseln auf Arch Linux wollte ich aus Neugierde…bei meinem Bruder habe ich es in Kombination mit Openbox gesehen, was mich ziemlich beeindruckt hat. Dank `stat -c %w /` weiß ich, dass ich am 9.August 2022 mein neues Betriebssystem installiert habe. Ich gebe euch einen kleinen Überblick zu meinen neuen Tools, gehe aber nicht näher darauf ein – zumindest nicht in diesem Beitrag. Falls ihr also nicht wisst, was genau x ist, dann Google!

## Window Manager

Wegen der einfachen Konfigurationsmöglichkeiten, habe ich mich für i3 entschieden. Eine Statusbar o.Ä. hatte ich zu Beginn, aber das Zeug brauche ich nicht mehr. Je weniger, desto besser. Hier [https://gitlab.com/siblanco/i3config/-/tree/master](https://gitlab.com/siblanco/i3config/-/tree/master) könnt ihr meine aktuelle config sehen.  
So jetzt wieder vscode installieren und weiter, wie gehabt?

## Neuer Editor

Nein…ich bin wirklich gerne im Terminal. Ich nutze alacritty, es ist schnell und sieht richtig gut aus. Custom fonts, Farben, ein kleiner Traum, hier meine alacritty config, [https://github.com/siblanco/alacritty](https://github.com/siblanco/alacritty). Gepaart mit tmux und meinem neuen Editor, habe ich den für mich perfekten Workflow gefunden.

Wenn ich nur immer im Terminal bleiben könnte xD…und damit zum neuen Editor: neovim. Omg, was eröffnen sich einem da für rabbit holes, ihr glaubt es nicht.

Nachdem ich gefühlt 100 Jahre meinen neuen Editor konfiguriert habe, bin ich endlich sehr zufrieden damit. Mit Vim ist man so unglaublich schnell, und das beste, es macht einfach ultra Spaß, coden ist wie Gaming. Dank Vim, noch viel mehr als je zuvor. Auch hier meine aktuelles nvim setup: [https://github.com/siblanco/nvim](https://github.com/siblanco/nvim). Als Startpunkt dafür habe ich mich bei craftzdog bedient [https://github.com/craftzdog/dotfiles-public/tree/master/.config/nvim](https://github.com/craftzdog/dotfiles-public/tree/master/.config/nvim).

## Neues Tippen

Als ob das alles zum Umgewöhnen nicht reiche würde, bin ich von qwertz auf qwerty umgestiegen. Dabei habe ich endlich mal richtiges 10 Finger Tippen gelernt.

Festhalten xD…oben habe ich von einem rabbit hole geschrieben, jetzt kommt noch eins – manchmal ein viel größeres als vim – Tastaturen und Tastaturlayouts :D. Um dem ganzen die Krone aufzusetzen, bin ich im Oktober auf Split Tastaturen und Colemak DH umgestiegen. Das war echt die härteste Umstellung.

## Fazit

### i3 und tmux

Mit i3 und tmux bin ich ziemlich schnell gut klar gekommen, wenn nicht sogar am ersten Tag. Natürlich sind jeden Tag neue Sachen und neue Optimierungen dazu gekommen, aber die beiden Tools sind nicht gerade gewöhnungsbedürftig. Ein window manager wie i3 ist echt ein Traum…z.B. kein Fenster ziehen oder Fenster mühsam anordnen mehr, sondern alles blitzschnell per Tastatur.

### Vim

Vim ist natürlich eine ganz andere Nummer als mein alter Editor vscode. Die Umgewöhnung hat etwas gedauert, gefühlt bin ich seit Oktober sehr produktiv damit. Was damit geht und wie du damit abgehen kannst, ist kein Vergleich mit vscode und anderen „normalen“ Editoren. Vim ist echt kranker shit.

### Colemak dh

Mein Umstieg auf colemak dh hat meinen Vim skills natürlich einen Dämpfer gegeben, mal abgesehen davon, dass absolut alles davon einen Dämpfer bekommen hat :D.

Meine wpm ist bei 90, womit ich sehr gut leben kann (bei qwerty war ich bei ca. 120), denn code schreiben geht mit der neuen Tastatur schneller als je zuvor. Ich nutze miryoku mit meiner Minidox [https://github.com/manna-harbour/miryoku/tree/master/docs/reference](https://github.com/manna-harbour/miryoku/tree/master/docs/reference) und hier die Minidox  
[https://falba.tech/customize-your-keyboard-customize-your-minidox-v9b7d173b068d/](https://falba.tech/customize-your-keyboard-customize-your-minidox-v9b7d173b068d/).

### Allgemein

Zusammenfassend lässt sich sagen, dass sich jeder einzelne Schritt wahnsinnig gelohnt hat. Mittlerweile sind insgesamt etwas mehr als 4 Monate um und ich bin echt gut dabei. Ich musste gerade ernsthaft nachschauen, ob wir noch im Jahr 2022 sind, weil mir die 4 Monate viel zu kurz vorkommen. Es ist mittlerweile alles in der muscle memory und fühlt sich deswegen so heimisch an, mehr als 4 Monate klingen.

Was auch echt mega ist, ich nutze meine Maus so gut wie gar nicht mehr..meine Hände verlassen vielleicht 1-2x am Tag die Tastatur. Das liegt zum größten Teil an i3 und vim. Dass ich die Maus mit meiner Tastatur steuern kann, ist aber auch mit ein Grund.

So das war es erst Mal…mit der Zeit schreibe ich bestimmt Mal über einige der Tools nochmal im Detail. Achja, auf die Integration von tmux hat mich ThePrimeagen mit [https://www.youtube.com/watch?v=bdumjiHabhQ](https://www.youtube.com/watch?v=bdumjiHabhQ) gebracht.
