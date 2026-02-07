[![hacs_badge](https://img.shields.io/badge/HACS-Default%20✔-brightgreen.svg)](https://github.com/hacs/plugin)
[![HACS validation](https://img.shields.io/github/actions/workflow/status/jayjojayson/Sun-Position-Card/validate.yml?label=HACS%20Validation)](https://github.com/jayjojayson/Sun-Position-Card/actions?query=workflow%3Avalidate)
![Downloads](https://img.shields.io/github/downloads/jayjojayson/Sun-Position-Card/total?label=Downloads&color=blue) 
[![GitHub release](https://img.shields.io/github/release/jayjojayson/Sun-Position-Card?include_prereleases=&sort=semver&color=blue)](https://github.com/jayjojayson/Sun-Position-Card/releases/)
[![README Deutsch](https://img.shields.io/badge/README-DE-orange)](https://github.com/jayjojayson/Sun-Position-Card/blob/main/docs/README-de.md)
[![Support](https://img.shields.io/badge/%20-Support%20Me-steelblue?style=flat&logo=paypal&logoColor=white)](https://www.paypal.me/quadFlyerFW)
![stars](https://img.shields.io/github/stars/jayjojayson/Sun-Position-Card)

<img width="85%" height="auto" alt="sun-position-card-ubersicht" src="https://github.com/jayjojayson/Sun-Position-Card/blob/main/docs/sun-position-card-ubersicht.png" />

![File size](https://img.shields.io/github/size/jayjojayson/Sun-Position-Card/dist/sun-position-card.js?label=Card%20Size)
[![HA Community thread](https://img.shields.io/badge/HA%20Community-Sun%20/%20Moon%20Position%20Card-blue?logo=discourse&logoColor=white)](https://community.home-assistant.io/t/sun-moon-position-card-another-implementation/965201)
[![CSH Forum thread](https://img.shields.io/badge/Community%20Smart%20Home-Custom%20Sun%20Position%20Card-orange?logo=discourse&logoColor=white)](https://community-smarthome.com/t/custom-sun-position-card-fuer-home-assistant-sonnenstand-card-hacs/9389)


---

Die 🔆 Sun Position Card ist eine benutzerdefinierte Lovelace-Karte zur Visualisierung der aktuellen Sonnenposition mit verschiedenen Optionen, sowie der aktuellen Mondphase und Anzeige weiterer relevanter Sonnenzeiten.  

Die Karte ist vollständig über die Benutzeroberfläche des Karteneditors konfigurierbar.
Du benötigst die sun.sun-Entität, die von Home Assistant bereitgestellt wird, sobald dein Home-Standort konfiguriert ist. Die moon.phase-Entität ist optional und wird nur benötigt, um die aktuelle Mondphase anzuzeigen.
Um den Mond-Sensor zu erhalten, gehe zu Einstellungen → Geräte & Dienste → Integration hinzufügen und suche nach Mond. Dies ist die integrierte Mond-Integration von Home Assistant.

Wenn euch die custom Card gefällt, würde ich mich sehr über eine Sternebewertung ⭐ freuen. 🤗

## Features

- ### 🔆 **Sonnestand klassische Darstellung**  
- ### 🌅 **Sonnestand berechnete Darstellung**  
- ### 🌄 **Sonnestand berechneter Bogen**  
- ### 🌙 **Mondphasen – visuelle Darstellung**  
- ### 🎞️ **Animierter Sonnenstand**  
- ### ⏰ **Anpassbare Zeiten**  
- ### 🌤️ **Wetter Status** - NEU
- ### 📐 **Flexibles Layout**  
- ### 📍 **Anpassbare Schwellenwerte**  
- ### ⚙️ **UI-Konfiguration**  


<img width="48%" height="auto" alt="image" src="https://github.com/jayjojayson/Sun-Position-Card/blob/main/docs/sun-positiion-card.png" /> <img width="48%" height="auto" alt="image" src="https://github.com/jayjojayson/Sun-Position-Card/blob/main/docs/sun-positiion-card2.png" />
<img width="48%" height="auto" alt="image" src="https://github.com/jayjojayson/Sun-Position-Card/blob/main/docs/sun-positiion-card4.png" /> <img width="48%" height="auto" alt="image" src="https://github.com/jayjojayson/Sun-Position-Card/blob/main/docs/sun-positiion-card5.png" />

<details>
  <summary> <b>Animierte Card anschauen</b></summary>  
  
<img width="48%" height="auto" alt="image" src="https://github.com/jayjojayson/Sun-Position-Card/blob/main/docs/sun-positiion-card-animation.gif" />
</details>


---

## Installation

### HACS (Empfohlen)

- Das github über den Link in Home Assistant einfügen.
 
  [![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=jayjojayson&repository=Sun-Position-Card&category=plugin)

- Die "Sun Position Card" sollte nun in HACS verfügbar sein. Klicke auf "INSTALLIEREN" ("INSTALL").
- Die Ressource wird automatisch zu deiner Lovelace-Konfiguration hinzugefügt.

<details>
  <summary> <b>Manuelle Installation über Hacs</b></summary>  

### Manuelle Installation über Hacs 
Öffne HACS in Home Assistant.

- Gehe zu "Frontend" und klicke auf die drei Punkte in der oberen rechten Ecke.
- Wähle "Benutzerdefinierte Repositories" ("Custom repositories") aus.
- Füge die URL zu Ihrem GitHub-Repository hinzu und wähle "Lovelace" als Kategorie.
- Klicke auf "HINZUFÜGEN" ("ADD").
- Die "Sun Position Card" sollte nun in HACS verfügbar sein. Klicke auf "INSTALLIEREN" ("INSTALL").
- Die Ressource wird automatisch zu deiner Lovelace-Konfiguration hinzugefügt.
</details>

<details>
  <summary> <b>Manuelle Installation in HA</b></summary>  
 
### Manuelle Installation in HA
1.  **Dateien herunterladen:**
    *   Lade die `sun-position-card.js`, `sun-position-card-editor.js` und die PNG-Bilddateien aus diesem Repository herunter.

2.  **Dateien in Home Assistant hochladen:**
    *   Erstelle einen neuen Ordner namens `Sun-Position-Card` im `www`-Verzeichnis deiner Home Assistant-Konfiguration. (Das `www`-Verzeichnis befindet sich im selben Ordner wie deine `configuration.yaml`).
    *   Kopiere **alle heruntergeladenen Dateien** in diesen neuen Ordner. Deine Ordnerstruktur sollte wie folgt aussehen:
        ```
        /config/www/Sun-Position-Card/sun-position-card.js
        /config/www/Sun-Position-Card/sun-position-card-editor.js
        /config/www/Sun-Position-Card/images/morgen.png
        /config/www/Sun-Position-Card/images/mittag.png
        ... (alle anderen Bilder)
        ```

3.  **Ressource zu Home Assistant hinzufügen:**
    *   Gehe in Home Assistant zu **Einstellungen > Dashboards**.
    *   Klicke auf das Menü mit den drei Punkten oben rechts und wähle **Ressourcen**.
    *   Klicke auf **+ Ressource hinzufügen**.
    *   Gebe als URL `/local/Sun-Position-Card/sun-position-card.js` ein.
    *   Wähle als Ressourcentyp **JavaScript-Modul**.
    *   Klicke auf **Erstellen**.
</details>

---

## Konfiguration

Nach der Installation kannst du die Karte zu deinem Dashboard hinzufügen:

1.  **Bearbeitungsmodus aktivieren:**
    *   Öffne das Dashboard, zu dem die Karte hinzufügt werden soll, und klicke auf **Bearbeiten**.

2.  **Karte hinzufügen:**
    *   Klicke auf **+ Karte hinzufügen** und suche nach der **"Sun Position Card"**.

3.  **Optionen konfigurieren:**
    *   Ein Konfigurationsfenster wird angezeigt, in dem alle Einstellungen bequem über Dropdown-Menüs, Kontrollkästchen und Eingabefelder angepasst werden können.
    *   **Sun Entity:** Die Entität Sonne (normalerweise `sun.sun`).
    *   **Times to Display:** Wähle die Zeiten aus, die du anzeigen möchtest.
    *   **Time Position:** Lege fest, wo die Zeiten angezeigt werden sollen.
    *   **Thresholds (Advanced):** Passe bei Bedarf die Azimut- und Höhenwerte an.

<img width="70%" height="auto" alt="image" src="https://github.com/jayjojayson/Sun-Position-Card/blob/main/docs/sun-positiion-card%20config.gif" />

---

## YAML-Modus (Alternative)

Obwohl die UI-Konfiguration empfohlen wird, kann die Karte auch manuell über den YAML-Editor konfiguriert werden:

### Optionen

| name                  | typ      | required   | description                                                                                                 | standard                                 |
| --------------------- | -------- | ---------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `type`                | `string` | Yes        | `custom:sun-position-card`                                                                                  |                                          |
| `entity`              | `string` | Yes        | Die Entität Sonne, normalerweise `sun.sun`.                                         		                  |                                          |
| `moon_entity`			| `string` | No         | Die Entität Mond, normalerweise `sensor.moon_phase`. 										                  | 										 |
| `moon_phase_position` | `string` | No         | Position Text Mondphase im Verhältnis zum Bild. 											                  | `above`, `in_list`   					 |
| `times_to_show`       | `list`   | No         | Eine Liste von Zeiten, die angezeigt werden sollen. 														  | `daylight_duration, next_rising`, `next_setting`, `next_dawn`, `next_dusk`, `next_noon`, `next_midnight`       |
| `time_position`       | `string` | No         | Position der Zeitangaben im Verhältnis zum Bild. 											                  | `above`, `below`, `right`                |
| `time_list_format`	| `string` | No         | Format der Zeitangaben Blocksatz oder Zentriert											 				  | `block`, `centered`  					 |
| `state_position` 		| `string` | No         | Position des aktuellen Status (über dem Bild, in der Time-Liste).							 				  | `above`, `in_list` 						 |
| `show_degrees` 		| `boolean` | No         | Zeige Gradzahlen für Azimuth und Elevation. 																  | `true`, `false`                          |
| `show_degrees_in_list`| `boolean` | No         | Zeige Gradzahlen in der Timeliste.																		  | `true`, `false`                          |
| `show_dividers` 		| `boolean` | No         | Zeige Trennlinien zwischen den Zeiten. 																	  | `true`, `false`                          |
| `animate_images` 		| `boolean` | No         | Animiere die Sonnenstandsbilder.																			  | `true`, `false`                          |
| `view_mode`			| `string` | No         | Ansichtsoption klassich mit Bildern oder berechneter Sonnenstand. 										  | `classic`, `calculated`, `arc`			 |
| `morning_azimuth`     | `number` | No         | Azimut-Grenzwert für den Morgen.                                                                            | `150`                                    |
| `noon_azimuth`        | `number` | No         | Azimut-Grenzwert für den Mittag.                                                                            | `200`                                    |
| `afternoon_azimuth`   | `number` | No         | Azimut-Grenzwert für den Nachmittag.                                                                        | `255`                                    |
| `dusk_elevation`      | `number` | No         | Höhen-Grenzwert für die Dämmerung.                                                                          | `10`                                     |


### Beispielkonfiguration

einfaches Beispiel:

```yaml
type: custom:sun-position-card
entity: sun.sun
times_to_show:
  - next_rising
  - next_setting
time_position: right
show_image: false
```

erweitertes Beispiel:

```yaml
type: custom:sun-position-card
entity: sun.sun
moon_entity: sensor.moon_phase
moon_phase_position: above
state_position: above
show_dividers: true
show_degrees: true
show_degrees_in_list: false
times_to_show:
  - next_rising
  - next_setting
  - daylight_duration
  - moon_phase
time_position: right
show_image: true
morning_azimuth: 155
dusk_elevation: 5
noon_azimuth: 200
afternoon_azimuth: 255
animate_images: false
time_list_format: block
view_mode: arc
```

---

## CSS Elemente die bearbeitet werden können:

| Selector                | Description                                                                 |
| ----------------------- | --------------------------------------------------------------------------- |
| `ha-card`               | The entire card container.                                                  |
| `.card-content`         | The main container wrapping all elements inside the card.                   |
| `.sun-image-container`  | The container `<div>` for the sun image.                                    |
| `.sun-image`            | The image `<img>` element itself.                                           |
| `.times-container`      | The container for the list of times.                                        |
| `.time-entry`           | An individual row/entry in the times list (e.g., "Aufgang: 06:30").         |
| `.state`                | The current state text (e.g., "Mittag") when positioned above the image.    |
| `.moon-phase-state`     | The current state text (e.g., "Full-Moon") when positioned above the image. |
| `.degrees`              | The Azimuth/Elevation text when positioned above the image.                 |
| `.degrees-in-list`      | The Azimuth/Elevation text when positioned inside the times list.           |
| `.divider`              | The horizontal line `<hr>` used as a separator between time entries.        |

### Beispiele

Hier sind einige Beispiele, wie du `card-mod` in der YAML-Konfiguration deiner Card verwenden kannst.

#### Schriftgröße und Farbe ändern

Macht den Hauptstatus-Text größer und blau und die Zeiteinträge etwas kleiner und grau.

<img width="30%" height="auto" alt="image" src="https://github.com/jayjojayson/Sun-Position-Card/blob/main/docs/sun-positiion-card3.png" />


```yaml
type: custom:sun-position-card
entity: sun.sun
state_position: above # State must be 'above' to see the effect on .state
card_mod:
  style: |
    .state {
      font-size: 24px;
      color: dodgerblue;
    }
    .time-entry {
      font-size: 14px;
      color: #888;
    }
```

#### Bild bearbeiten

Fügt dem Bild einen Rahmen hinzu und macht es leicht transparent.

```yaml
type: custom:sun-position-card
entity: sun.sun
card_mod:
  style: |
    .sun-image {
      border: 2px solid var(--primary-color);
      border-radius: 10px;
      opacity: 0.9;
    }
```

#### Background ändern und Shadows entfernen

Setzt einen hellgelben Hintergrund für die Card und entfernt den standardmäßigen Schatten (Box Shadow).

```yaml
type: custom:sun-position-card
entity: sun.sun
card_mod:
  style: |
    ha-card {
      background: #FFFACD;
      box-shadow: none;
    }
```

#### Trennlinien bearbeiten

Macht die Trennlinie dicker und formatiert sie als gestrichelte rote Linie.

```yaml
type: custom:sun-position-card
entity: sun.sun
show_dividers: true
card_mod:
  style: |
    .divider {
      border-top: 2px dashed red;
    }
```

---

## Forum-Discussion 

[![Forum smarthome-community](https://img.shields.io/badge/Forum-smarthome--community-blue)](https://community-smarthome.com/t/custom-sun-position-card-fuer-home-assistant-sonnenstand-card-hacs/9389) [![Forum simon42-community](https://img.shields.io/badge/Forum-simon42--community-blue)](https://community.simon42.com/t/custom-sun-position-card-fuer-home-assistant-sonnenstand-card-hacs/72199)
