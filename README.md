# Portfolio-Onepager – Anleitung

## Ordnerstruktur
```
portfolio/
├── index.html
├── css/style.css
├── js/script.js
├── audio/        ← eigene MP3-Dateien hier ablegen
└── images/        ← eigene Cover-Bilder hier ablegen
```
Der gesamte Ordner kann 1:1 bei jedem einfachen Hosting (GitHub Pages,
klassisches FTP-Hosting, Netlify Drop etc.) hochgeladen werden.
`index.html` ist der Einstiegspunkt.

## Einen neuen Track-Eintrag hinzufügen
1. In `index.html` den kompletten Block zwischen
   `<!-- TRACK BLOCK -->` und `<!-- ENDE TRACK BLOCK -->` kopieren
   und direkt darunter wieder einfügen.
2. Im kopierten Block anpassen:
   - `src="audio/track-1.mp3"` → Pfad zu deiner MP3-Datei
   - `src="images/cover-1.jpg"` → Pfad zu deinem Cover-Bild
   - Name, Songtitel, Beschreibungstext
3. Fertig – der Player funktioniert automatisch, ohne dass im
   JavaScript irgendetwas angepasst werden muss.

## Beschreibungstext vs. Rollen-Liste
Standardmäßig ist im Block ein Beschreibungstext (`<p class="track__desc">`)
vorgesehen. Für Einträge, bei denen du nur deine Rolle auflisten möchtest
(z. B. "Gitarre / Production / Mixing Engineer"), gibt es im HTML direkt
darunter eine auskommentierte Alternative (`<ul class="track__roles">`) –
einfach die gewünschte Variante nutzen und die andere entfernen oder
auskommentiert lassen.

## Ausrichtung der Songtitel
Die Songtitel aller Einträge fluchten automatisch untereinander, weil die
Namensspalte in der CSS-Variable `--track-name-col` (in `style.css`) eine
feste Breite hat. Falls ein Name mal deutlich länger ist, ggf. den Wert
dort anpassen.

## Assets
- Bilder sollten im Seitenverhältnis 1:1 (quadratisch) geliefert werden,
  idealerweise mind. 600×600px, damit sie auf Retina-Displays scharf bleiben.
- Für die MP3-Dateien reicht eine mittlere Bitrate (128–192 kbps), da es
  sich um Arbeitsproben handelt, nicht um Masterqualität für Downloads.

## Fonts
Die Seite nutzt "Helvetica Neue" als Systemschrift (kein Font-Download
nötig). Da Helvetica Neue eine kommerzielle Schrift ist, die nicht auf
jedem Gerät installiert ist, greift die Font-Stack in `style.css`
automatisch auf "Helvetica" und danach "Arial" zurück, falls Helvetica
Neue auf dem jeweiligen Gerät nicht verfügbar ist (z. B. auf Windows/
Android). Arial ist metrisch sehr nah an Helvetica, sodass das
Layout dabei stabil bleibt.

Falls du eine gültige Lizenz für Helvetica Neue besitzt und die Schrift
auf allen Geräten identisch anzeigen möchtest, kannst du die Font-Dateien
selbst hosten (z. B. unter `fonts/` ablegen) und in `style.css` per
`@font-face` einbinden.
