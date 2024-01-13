---
isDraft: false
title: Entwicklungsumgebung auf Linux (1)
description: Begleite mich beim Umstieg von Windows auf Linux (Ubuntu 20.04) &#8211; Part 1
date: 2020-06-20T15:09:30
tags: ["apache2", "linux"]
---

Warum ich von Windows auf Linux umsteige? Ich schreibe da mal bei Gelegenheit einen Beitrag zu. Jedenfalls hat die Warnung von Webpack `there are multiple modules with names that only differ in casing` das Fass zum Überlaufen gebracht. Ich hatte einfach keine Lust mehr, meine Zeit mit „Windows-Debug“ spezifischen Problemen zu verschwenden. Linux läuft jetzt auf meiner zweiten Festplatte, Windows gibt’s noch für Adobe & Co, wenn ich mal nicht den ganzen Tag im Editor stecke.

## Entwicklungsumgebung

Mit Linux, speziell Ubuntu, bin ich bisher nur auf Servern in Berührung gekommen: LAMP Stack einrichten, Nginx, Node.js Apps laufen lassen etc. Meine Linux-Kenntnisse sind also eher begrenzt. Zumal ich auch nicht jeden Tag mit den Servern zu tun habe. Das wird sich jetzt gezwungenermaßen ändern (auch mit ein Grund, warum ich umsteige).

### LAMP Stack

Da wir bei meinem Job vorranging mit dem LAMP Stack arbeiten, fange ich bei der Einrichtung damit an. Zur Orientierung habe ich folgenden Beitrag von digitalocean genutzt [https://www.digitalocean.com/community/tutorials/how-to-install-linux-apache-mysql-php-lamp-stack-ubuntu-18-04](https://www.digitalocean.com/community/tutorials/how-to-install-linux-apache-mysql-php-lamp-stack-ubuntu-18-04). Der Beitrag ist zwar auf die Einrichtung eines Servers ausgelegt, aber das macht nichts, auch für unsere Zwecke sind dort sehr viele nützliche Informationen.

#### MAMP Pro „Ersatz“?

Auf Windows nutze ich MAMP Pro für die Verwaltung meines Apache Servers. Hier brauchen wir sowas nicht, wir können uns die nötigen Packages einfach mit apt installieren und nach Wunsch einrichten:

```bash
sudo apt-get install apache2 php7.4 mysql-server mysql-client
```

Ich will hier mehr auf die Einrichtung von mehreren virtuellen Hosts eingehen. Wie du die „basics“, also einen LAMP Stack zum Laufen bringst, kannst du perfekt im verlinkten Beitrag erfahren. Dort ist auch die Rede von virtuellen hosts (Punkt 4) – für meine Entwicklungsumgebung dauert mir der Weg jedoch zu lang / gefällt er mir nicht. Ich möchte möglichst schnell neue Projekte anlegen und loslegen. Am liebsten in einem Ordner meiner Wahl und nicht unter `/var/www/` (die Voreinstellung von apache).

Mein Ziel ist es, alle meine Projekte in einem dev Ordner innerhalb meines Home Ordners, also ~/dev, zu haben. Fangen wir an mit der Hauptkonfigurationsdatei von apache2:

```bash
sudo echo -e "\nServerName localhost\nIncludeoptional /home/hassan/dev/*/host.conf" >> /etc/apache2/apache2.conf
```

Klar, du musst die Pfade bei dir noch anpassen. Wir sagen Apache, dass der globale ServerName localhost ist. Außerdem soll apache alle Konfigurationsdateien (sofern vorhanden) innerhalb von ~/dev/\*/ berücksichtigen. Diese deklarieren unsere VirtualHosts, ein Beispiel:

```html
<VirtualHost *:80>
    ServerName lamp-example
    DocumentRoot /home/hassan/dev/lamp-example

    ErrorLog /home/hassan/dev/lamp-example/logs/error.log
	CustomLog /home/hassan/dev/lamp-example/logs/access.log combined

    <Directory /home/hassan/dev/lamp-example>
        Options Indexes FollowSymLinks MultiViews
        AllowOverride All
        Require all granted
    </Directory>

</VirtualHost>
```

Wir haben in unserem Ordner „lamp-example“ ein Projekt mit dem Servernamen „lamp-example“. Logs wollen wir im Unterordner /logs speichern. Mit `AllowOverride All`, erlauben wir mit einer .htaccess Apache Einstellungen vorzunehmen.

In `/etc/apache2/sites-available/000-default.conf` findest du die Standard-Einstellung für Apache (wo dein localhost hinzeigen soll). Erstelle hier eine neue Datei: `sudo touch /etc/apache2/sites-available/dev.conf` und öffne sie zum Bearbeiten:

```html
<VirtualHost *:80>
    ServerAdmin webmaster@localhost
    DocumentRoot /home/hassan/dev

    <Directory />
        Options FollowSymLinks
        AllowOverride None
    </Directory>

    <Directory /home/hassan/dev>
        Options Indexes FollowSymLinks MultiViews
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>

```

Anders als beim `lamp-example` definieren wir hier keinen ServerNamen, diese Einstellung soll für unseren globalen ServerNamen gelten (localhost, definiert in apache2.conf – s.o.). Nun noch diese Config aktivieren und den Apache2-Server neustarten:

```bash
sudo a2dissite 000-default.conf && a2ensite dev.conf && systemctl restart apache2
```

a2dis…was? Ganz einfach a2 = apach2, dis = disable und site (mod gibt’s auch, mehr habe ich bisher noch nicht gebraucht). Jetzt kannst du `http://localhost` besuchen und du solltest die Inhalte deines dev Ordners sehen. Besuchst du `http://lamp-example` bekommst du einen Fehler: `DNS_PROBE_FINISHED_NXDOMAIN`. Wir müssen unseren virtuellen Servernamen „lamp-example“ noch in der hosts Datei anlegen und definieren wo er hinzeigen soll (auf unseren localhost):

```bash
sudo echo -e "\n127.0.0.1 lamp-example" >> /etc/hosts && systemctl restart apache2
```

Probierst du es jetzt, siehst du die Inhalte von ~/dev/lamp-example. Und das wars auch schon! Hier nochmal zusammengefasst, was du tun musst, wenn du ein neues Projekt anlegen willst:

1.  Neuen Ordner in ~/dev/ anlegen
2.  In diesem Ordner einen Ordner „logs“ erstellen (sofern logs gewünscht sind)
3.  host.conf erstellen und entsprechend anpassen
4.  Neuen Servernamen in /etc/hosts eintragen und auf localhost pointen
5.  apache2 neu starten

Ich habe mir für meine Projekte (welche alle auf git liegen) ein Skript geschrieben. Das zeige ich euch das nächste mal!
