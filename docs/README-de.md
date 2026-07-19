<img width="100%" height="auto" alt="power-flux-card" src="https://github.com/jayjojayson/power-flux-card/blob/main/docs/images/power-flux-card_ger.png" />

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-blue.svg)](https://github.com/hacs/plugin)
[![HACS validation](https://img.shields.io/github/actions/workflow/status/jayjojayson/power-flux-card/validate.yml?label=HACS%20Validation)](https://github.com/jayjojayson/power-flux-card/actions?query=workflow%3Avalidate)
[![GitHub release](https://img.shields.io/github/release/jayjojayson/power-flux-card?include_prereleases=&sort=semver&color=blue)](https://github.com/jayjojayson/power-flux-card/releases)
![Downloads](https://img.shields.io/github/downloads/jayjojayson/power-flux-card/total?label=Downloads&color=blue)
[![README Englisch](https://img.shields.io/badge/README-EN-orange)](https://github.com/jayjojayson/power-flux-card)
[![Support](https://img.shields.io/badge/%20-Support%20Me-steelblue?style=flat&logo=paypal&logoColor=white)](https://www.paypal.me/quadFlyerFW)
[![Stars](https://img.shields.io/github/stars/jayjojayson/power-flux-card)](https://github.com/jayjojayson/power-flux-card/stargazers)


# Power Flux Card 

Die ⚡Power Flux Card ist eine erweiterte, animierte Energiefluss-Karte für Home Assistant. Sie visualisiert die Energieverteilung zwischen Solar, Netz, Batterie und Verbrauchern mit wunderschönen Neon-Effekten und verschiedenen Animationen.

Wenn euch die custom Card gefällt, würde ich mich sehr über eine Sternebewertung ⭐ freuen. 🤗

<img width="49%" height="auto" alt="power-flux-card" src="https://github.com/jayjojayson/power-flux-card/blob/main/docs/images/power-flux-card-ani.gif" /> <img width="49%" height="auto" alt="power-flux-card" src="https://github.com/jayjojayson/power-flux-card/blob/main/docs/images/power-flux-card.jpg" />  
<img width="49%" height="auto" alt="power-flux-card" src="https://github.com/jayjojayson/power-flux-card/blob/main/docs/images/power-flux-card-compact.jpg" /> <img width="49%" height="auto" alt="power-flux-card" src="https://github.com/jayjojayson/power-flux-card/blob/main/docs/images/power-flux-card-compact2.jpg" /> <img width="98%" height="auto" alt="power-flux-card" src="https://github.com/jayjojayson/power-flux-card/blob/main/docs/images/power-flux-card7.png" />

### ✨ Funktionen

- **Echtzeit-Animation**: Visualisiert den Energiefluss mit bewegten Partikeln.
- **Mehrere Quellen & Verbraucher**: Unterstützt Solar, Netz, Batterie und bis zu 3 zusätzliche Verbraucher (z.B. E-Auto, Heizung, Pool).
- **Kompakte Ansicht**: Eine minimalistische Balkendiagramm-Ansicht (inspiriert von evcc).
- **Anpassbares Aussehen**:
  - **Neon Glow**: Leuchteffekte für aktive Stromleitungen.
  - **Donut Chart**: Optionales Donut-Diagramm um das Haus-Icon, das den Energiemix zeigt.
  - **Kometenschweif / Gestrichelte Linien**: Wählen Sie Ihren bevorzugten Animationsstil.
  - **Zoom**: Anpassbare Größe für Ihr Dashboard.
  - **Benutzerdefinierte Farben**: Definiere benutzerdefinierte Farben für jede Quelle und jeden Verbraucher über den Editor.
  - **Hintergrundfarbe**: Aktiviere einen leicht getönten Hintergrund für die Kreise in der Standard-Ansicht.
- **Dynamische Animationsgeschwindigkeit**: Partikelgeschwindigkeit und -dichte passen sich dem aktuellen Energiefluss an.
- **Weitere Informationen**: Klicke auf eine beliebige Quelle/Verbraucher, um detaillierte Informationen in einem More-Info-Dialog anzuzeigen.
- **Netz-Import/Export**: Unterstützt sowohl separate Import/Export-Entitäten als auch eine kombinierte Entität mit positiven/negativen Werten.
- **Netz-zu-Batterie**: Optionaler direkter Sensor für den Netz-zu-Batterie-Fluss, der die Standardberechnung umgeht.
- **Sekundäre Sensoren**: Optional können sekundäre Sensorwerte in den Hauptkreisen (z.B. Tagesertrag für Solar, aktuelle Lade-/Entladeleistung für Batterie) angezeigt werden.
- **Lokalisierung**: Vollständig übersetzt in Deutsch und Englisch.
- **Visueller Editor**: Einfache Konfiguration über die Home Assistant UI.

[![Watch the video](https://img.youtube.com/vi/HGFBJJRWGW0/0.jpg)](https://www.youtube.com/watch?v=HGFBJJRWGW0
)

---

### 🚀 Installation

### HACS (Empfohlen)

- Das github über den Link in Home Assistant einfügen.
 
  [![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=jayjojayson&repository=power-flux-card&category=plugin)

- Das "Power Flux Card" sollte nun in HACS verfügbar sein. Klicke auf "INSTALLIEREN" ("INSTALL").
- Die Ressource wird automatisch zu deiner Lovelace-Konfiguration hinzugefügt.

#### HACS (manuell)
1. Stelle sicher, dass HACS installiert ist.
2. Füge dieses Repository als benutzerdefiniertes Repository in HACS hinzu.
3. Suche nach "Power Flux Card" und installieren Sie es.
4. Lade die Ressourcen neu, falls Sie dazu aufgefordert werden.

#### Manuelle Installation
1. Lade die Datei `power-flux-card.js` von der [Releases](../../releases)-Seite herunter.
2. Lade sie in Ihren `www/community/power-flux-card/`-Ordner in Home Assistant hoch.
3. Füge die Ressource in Ihrer Dashboard-Konfiguration hinzu:
   - URL: `/local/community/power-flux-card/power-flux-card.js`
   - Typ: JavaScript Module


---

### ⚙️ Konfiguration

Du kannst die Karte direkt über den visuellen Editor in Home Assistant konfigurieren.

**Haupt-Entitäten:**
- **Solar**: Erzeugung (W).
- **Netz**: Netzleistung (W). Positiv = Import, Negativ = Export (oder separate Entitäten).
- **Batterie**: Batterieleistung (W) und Ladestand (%).

**Zusätzliche Verbraucher:**
- Du kannst bis zu 3 individuelle Verbraucher (z.B. Auto, Heizung, Pool) mit eigenen Icons und Beschriftungen hinzufügen.

**Optionen:**
- **Zoom**: Passen Sie die Größe der Karte an.
- **Neon Glow**: Aktivieren/Deaktivieren des Leuchteffekts.
- **Donut Chart**: Zeigt den Energiemix als Ring um das Haus an.
- **Kometenschweif / Gestrichelte Linie**: Ändern Sie den Stil der Flussanimation.
- **Kompakte Ansicht**: Wechseln Sie zum Balkendiagramm-Layout.
- **Farboptionen**: Definieren Sie benutzerdefinierte Farben für jede Quelle und Verbraucher.
- **Netz-Import/Export**: Konfigurieren Sie separate oder kombinierte Entitäten.
- **Netz-zu-Batterie**: Optionaler direkter Sensor für den Netz-zu-Batterie-Fluss.
- **Batterie getrennte Sensoren**: Optional separate Sensoren für Batterie-Ladung und -Entladung. 
- **Sekundäre Sensoren**: Zeigen Sie alternative Werte in den Hauptkreisen an (z.B. Tagesertrag, aktuelle Ladeleistung). 


<details>
   <summary> <b>Custom Farben mit card_mod und Jinja2 Templates</b></summary> 

Mit der [card_mod](https://github.com/thomasloven/lovelace-card-mod) Integration können die CSS-Variablen der Power Flux Card dynamisch per Jinja2-Templates überschrieben werden. So lassen sich Farben abhängig von Sensorwerten ändern — z.B. Solar-Icon grün bei Produktion, grau bei Stillstand.

### Verfügbare CSS-Variablen

| Variable | Beschreibung |
|---|---|
| `--neon-yellow` | Bubble-Farbe Solar |
| `--neon-blue` | Bubble-Farbe Grid |
| `--neon-green` | Bubble-Farbe Batterie |
| `--neon-pink` | Bubble-Farbe Haus |
| `--pipe-solar-color` | Pipe-Farbe Solar |
| `--pipe-grid-color` | Pipe-Farbe Grid |
| `--pipe-battery-color` | Pipe-Farbe Batterie |
| `--icon-solar-color` | Icon-Farbe Solar |
| `--icon-grid-color` | Icon-Farbe Grid |
| `--icon-battery-color` | Icon-Farbe Batterie |
| `--icon-house-color` | Icon-Farbe Haus |
| `--icon-consumer-1-color` | Icon-Farbe Consumer 1 |
| `--text-solar-color` | Text-Farbe Solar |
| `--text-grid-color` | Text-Farbe Grid |
| `--text-battery-color` | Text-Farbe Batterie |
| `--text-house-color` | Text-Farbe Haus |
| `--text-consumer-1-color` | Text-Farbe Consumer 1 |
| `--consumer-1-color` | Bubble-Farbe Consumer 1 |
| `--consumer-2-color` | Bubble-Farbe Consumer 2 |
| `--consumer-3-color` | Bubble-Farbe Consumer 3 |
| `--export-color` | Farbe für Export |
| `--pipe-solar-opacity` | Pipe-Transparenz Solar (0 = unsichtbar, 1 = sichtbar) |
| `--pipe-grid-opacity` | Pipe-Transparenz Grid (0 = unsichtbar, 1 = sichtbar) |
| `--pipe-battery-opacity` | Pipe-Transparenz Batterie (0 = unsichtbar, 1 = sichtbar) |
| `--pipe-consumer-1-opacity` | Pipe-Transparenz Consumer 1 (0 = unsichtbar, 1 = sichtbar) |
| `--pipe-consumer-2-opacity` | Pipe-Transparenz Consumer 2 (0 = unsichtbar, 1 = sichtbar) |
| `--pipe-consumer-3-opacity` | Pipe-Transparenz Consumer 3 (0 = unsichtbar, 1 = sichtbar) |
| `--pipe-consumer-4-opacity` | Pipe-Transparenz Consumer 4 (0 = unsichtbar, 1 = sichtbar) |
| `--pipe-consumer-5-opacity` | Pipe-Transparenz Consumer 5 (0 = unsichtbar, 1 = sichtbar) |

### Beispiel 1: Solar-Icon — grün bei Produktion, grau bei Stillstand

```yaml
type: custom:power-flux-card
entities:
  solar: sensor.solar_power
  grid: sensor.grid_power
  battery: sensor.battery_power
  battery_soc: sensor.battery_soc
card_mod:
  style: |
    :host {
      {% if states('sensor.solar_power') | float > 0 %}
        --icon-solar-color: #00ff88 !important;
      {% else %}
        --icon-solar-color: #9e9e9e !important;
      {% endif %}
    }
```

### Beispiel 2: Grid-Textfarbe — rot bei Export, blau bei Import

```yaml
type: custom:power-flux-card
entities:
  solar: sensor.solar_power
  grid_combined: sensor.grid_power_combined
  battery: sensor.battery_power
  battery_soc: sensor.battery_soc
card_mod:
  style: |
    :host {
      {% if states('sensor.grid_power_combined') | float < 0 %}
        --text-grid-color: #ff3333 !important;
      {% else %}
        --text-grid-color: #3b82f6 !important;
      {% endif %}
    }
```

### Beispiel 3: Batterie-Bubble — Farbe nach Ladestand (SoC)

```yaml
type: custom:power-flux-card
entities:
  solar: sensor.solar_power
  grid: sensor.grid_power
  battery: sensor.battery_power
  battery_soc: sensor.battery_soc
card_mod:
  style: |
    :host {
      {% set soc = states('sensor.battery_soc') | float %}
      {% if soc > 80 %}
        --neon-green: #00ff88 !important;
      {% elif soc > 30 %}
        --neon-green: #f59e0b !important;
      {% else %}
        --neon-green: #ff3333 !important;
      {% endif %}
    }
```

### Beispiel 4: Consumer-1-Pipe — sichtbar nur bei hoher Leistung, sonst transparent

```yaml
type: custom:power-flux-card
entities:
  solar: sensor.solar_power
  grid: sensor.grid_power
  battery: sensor.battery_power
  battery_soc: sensor.battery_soc
  consumer_1: sensor.wallbox_power
card_mod:
  style: |
    :host {
      {% if states('sensor.wallbox_power') | float > 500 %}
        --pipe-consumer-1-color: #a855f7 !important;
        --icon-consumer-1-color: #a855f7 !important;
      {% else %}
        --pipe-consumer-1-color: rgba(168, 85, 247, 0.2) !important;
        --icon-consumer-1-color: #9e9e9e !important;
      {% endif %}
    }
```

### Beispiel 5: Solar-Pipe — unter 30 W ausblenden

Blendet die Solar-Pipe aus, wenn die Solar-Leistung unter 30 W liegt.

```yaml
type: custom:power-flux-card
entities:
  solar: sensor.solar_power
  grid: sensor.grid_power
  house: sensor.house_power
card_mod:
  style: |
    :host {
      --pipe-solar-opacity: {{ 1 if (states('sensor.solar_power') | float(0)) >= 30 else 0 }};
    }
```

> **Hinweis:** Die Power Flux Card verwendet Shadow DOM (LitElement). Nur CSS Custom Properties auf `:host` funktionieren. Die Card liest die Opacity-Variablen intern aus und wendet sie direkt auf die Pipe-Pfade an.

### Beispiel 6: Mehrere Pipes — jede einzeln unter 30 W ausblenden

Blendet Solar-, Grid- und Batterie-Pipe jeweils unabhängig aus, sobald ihr Wert unter 30 W fällt.

```yaml
type: custom:power-flux-card
entities:
  solar: sensor.solar_power
  grid: sensor.grid_power
  battery: sensor.battery_power
  house: sensor.house_power
card_mod:
  style: |
    :host {
      --pipe-solar-opacity:   {{ 1 if (states('sensor.solar_power')   | float(0))       >= 30 else 0.2 }};
      --pipe-grid-opacity:    {{ 1 if (states('sensor.grid_power')    | float(0)) | abs >= 30 else 0.2 }};
      --pipe-battery-opacity: {{ 1 if (states('sensor.battery_power') | float(0)) | abs >= 30 else 0.2 }};
    }
```

> **Tipp:** `| abs` wird bei Grid und Batterie verwendet, da diese Sensoren negative Werte liefern können (Export / Entladung). Der Schwellenwert bezieht sich immer auf den Absolutwert.

### Beispiel 7: Alle 5 Consumer-Pipes — individuelle Schwellenwerte

Jede Consumer-Pipe wird unabhängig mit eigenem Schwellenwert gesteuert.

```yaml
type: custom:power-flux-card
entities:
  solar: sensor.solar_power
  grid: sensor.grid_power
  house: sensor.house_power
  consumer_1: sensor.wallbox_power
  consumer_2: sensor.heating_power
  consumer_3: sensor.pool_power
  consumer_4: sensor.dishwasher_power
  consumer_5: sensor.dryer_power
card_mod:
  style: |
    :host {
      --pipe-consumer-1-opacity: {{ 1 if (states('sensor.wallbox_power')    | float(0)) >= 100 else 0 }};
      --pipe-consumer-2-opacity: {{ 1 if (states('sensor.heating_power')    | float(0)) >= 50  else 0 }};
      --pipe-consumer-3-opacity: {{ 1 if (states('sensor.pool_power')       | float(0)) >= 50  else 0 }};
      --pipe-consumer-4-opacity: {{ 1 if (states('sensor.dishwasher_power') | float(0)) >= 30  else 0 }};
      --pipe-consumer-5-opacity: {{ 1 if (states('sensor.dryer_power')      | float(0)) >= 30  else 0 }};
    }
```

> **Hinweis:** Jede `--pipe-consumer-X-opacity` steuert gleichzeitig die Hintergrundpipe und die animierten Partikel. Auf `0` setzen blendet die Pipe vollständig aus, `1` zeigt sie vollständig an.

> **Hinweis:** card_mod muss separat über HACS installiert werden. Die Templates werden bei jedem State-Update ausgewertet, die Farben ändern sich also in Echtzeit.
</details>
