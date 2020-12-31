[![MIT License](https://raw.githubusercontent.com/hacker-coop/website/master/.github/license.svg?sanitize=true)](https://git.vebit.xyz/vebit/website/src/branch/master/LICENCE)
[![Build and Deploy vebit website](https://github.com/hacker-coop/website/workflows/Build%20and%20Deploy%20vebit%20website/badge.svg)](https://github.com/hacker-coop/website/actions?query=workflow%3A%22Build+and+Deploy+vebit+website%22)
[![lektor check](https://github.com/hacker-coop/website/workflows/lektor%20check/badge.svg)](https://github.com/hacker-coop/website/actions?query=workflow%3A%22lektor+check%22)


# VEBIT Webseite

Hier findet ihr den Static Side Generator zur [vebit.xyz](https://vebit.xyz) Webseite.<br/>
<!-- Diese Webseite wird automatisch mitels [Github Actions](https://github.com/hacker-coop/website/actions) gebaut und deployed. aktuell leider kaputt.--> Die Webseite wird manuell auf den Webserver gepushed. Dies müsste man mal™ automatisieren.

## Verwenden

Die Webseite erweitert man, in dem man mit dem static side generator eine lokale Kopie der Webseite generiert und diese bequem per eingebauten Webeditor bearbeitet und erweitert.

Um dies zu tun muss man Lektor [lektor](https://getlektor.com) installieren und den Webserver starten.

Zur Installation der Abhängigkeiten gibt es ein Makefile. ``sudo make install`` und lektor so wie ein paar abhängigkeiten werden installiert.

Gut zu Wissen ist auch, das dieses Repo zB Podcastfolgen mit Hilfe von  [git-lfs](https://git-lfs.github.com) speichert.
Daher muss `git-lfs` installiert sein.

### lokaler Webserver starten

```
make server
```

Starte einen lokalen Webserver und ermöglicht dir die geklonte Webseite bequem auf [localhost:5000](http://localhost:5000/) zu bearbeiten.

*Mehre Tricks zum bedienen von Lektor in der `Makefile`!*


 Beitragen:
-------------
Reiche dein Pull-Request bei [git.vebit.xyz/vebit/website](https://git.vebit.xyz/vebit/website.git) ein, wenn du dort einen Account hast. Oder auf [github.com/hacker-coop/website.git](https://github.com/hacker-coop/website.git).
<br/><i>Die Repos sollten den selben Stand enthalten.</i>

 Podcast Meta
--------------
Podcast Meta Infos lassen sich gut mit `picard` bearbeiten ;-) Eine genauere Anleitung zur Podcast Pipeline gibt es unter [content/podcast/](https://git.vebit.xyz/vebit/website/src/branch/master/content/podcast) im README.
