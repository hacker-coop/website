 Beschreibung der Podcast Audio Pipeline
================================

 1 - Aufnahme des Podcast
----------------------
Aufgenommen wird der Podcast mit [studio-link](https://www.studio-link.de/). Hier nimmt jeder Gesprächsteilnehmer seine lokale Tonspur auf und diese wird anschließend an L3D geschickt und wie in den nächsten Schritten zum Podcast gewandelt.

 2 - "Normalisieren" der rohen Audiodateien
-------------------------------------
Zum ausbalancieren und normalisieren der Audiodateien wird auf [Empfehlung des sendegate Forum](https://sendegate.de/t/podcast-toolchain-unter-linux/12263) die  **Open Source Podcast Audio Chain** - [github.com/sritterbusch/ospac.git](https://github.com/sritterbusch/ospac.git) verwendet.

TL;DR: Die hier verwendeten befehle lauten:
```
ospac local.flac --output local-improved.flac
```

 3 - Schneiden und 'ähms' teilweise entfernen
--------------------
Die Exportierten Dateien werden alle ins Audacity importiert, geschnitten, mit intro versehen und 'Ähms' werden weg optimiert.
Anschließend wird die Folge als mp3 und ogg exportiert.

 4 - Metadaten
--------------
Mit picard werden die Metadaten ergänzt so wie das Albumcover hinzugefügt.

 4.1 - Kapitelmarken *(optional)*
-----------------------
https://github.com/dskrad/mp3chaps

 5 - Veröffentlichen
----------------
Zu guter letzt hier im Lektor passend einfügen. Mit Shownotes und Metadaten ergänzen und veröffentlichen.



**Lizenz:** MIT (C) 2020 L3D <l3d@c3woc.de>
