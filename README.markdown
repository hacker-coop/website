[![MIT License](https://raw.githubusercontent.com/hacker-coop/website/master/.github/license.svg?sanitize=true)](https://git.vebit.xyz/vebit/website/src/branch/master/LICENCE)
[![Build and Deploy vebit website](https://github.com/hacker-coop/website/workflows/Build%20and%20Deploy%20vebit%20website/badge.svg)](https://github.com/hacker-coop/website/actions?query=workflow%3A%22Build+and+Deploy+vebit+website%22)
[![lektor check](https://github.com/hacker-coop/website/workflows/lektor%20check/badge.svg)](https://github.com/hacker-coop/website/actions?query=workflow%3A%22lektor+check%22)


# VEBIT Webseite

Hier findet ihr den Static Side Generator zur [vebit.xyz](https://vebit.xyz) Webseite.<br/>
Die Webseite wird automatisch mitels [Github Actions](https://github.com/hacker-coop/website/actions) gebaut und deployed.

## Verwenden

Zum Erweitern der Webseite empfielt sich das Installieren von [lektor](https://getlektor.com); *am besten via `sudo pip3 install lektor`*.
Dieses Repo speichert Podcastfolgen mit Hilfe von  [git-lfs](https://git-lfs.github.com).
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
Podcast Meta Infos lassen sich gut mit `picard` bearbeiten ;-)
