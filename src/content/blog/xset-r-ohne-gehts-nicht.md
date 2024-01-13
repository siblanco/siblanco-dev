---
isDraft: false
title: xset r. ohne geht es nicht!
description: xset r rate - du bist nicht du wenn du das nicht einstellst
date: 2023-05-11T23:40:50
tags: ["devlife", "linux"]
---

Seit ein paar Monaten habe ich xset r entdeckt…Hier mal von `man xset`:

```bash
This program is used to set various user preference options of the display.

The r option controls the autorepeat.  Invoking with "-r", or "r off", will disable autorepeat, whereas "r", or "r on" will enable autorepeat.  Following the "-r" or "r" option with an integer keycode between 0and 255 will disable or enable autorepeat on that key respectively, but only if it makes sense for the particular keycode.  Keycodes below 8 are not typically valid for this command.  Example: "xset -r 10" will
disable autorepeat for the "1" key on the top row of an IBM PC keyboard.

If  the  server  supports the XFree86-Misc extension, or the XKB extension, then a parameter of 'rate' is accepted and should be followed by zero, one or two numeric values. The first specifies the delay before
autorepeat starts and the second specifies the repeat rate.  In the case that the server supports the XKB extension, the delay is the number of milliseconds before autorepeat starts, and the rate is the  number
of repeats per second.  If the rate or delay is not given, it will be set to the default value.
```

Mit anderen Worten, erreichst du z.B. mit `xset r rate 150 33`, dass deine Tastatureingaben innerhalb von 150ms mit dem Autorepeat – mit einer Wiederholungsrate von 33 Tastendrücken pro Sekunde – beginnen. Damit fühlt sich alles gleich viel flüssiger an und das Navigieren – wenn du mal die Pfeiltasten o.ä. nutzt – geht viel schneller. Probier es mal aus, du wirst es lieben!
