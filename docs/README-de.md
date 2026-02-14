[![hacs_badge](https://img.shields.io/badge/HACS-Custom-blue.svg)](https://github.com/hacs/plugin)
[![HACS validation](https://img.shields.io/github/actions/workflow/status/jayjojayson/power-flux-card/validate.yml?label=HACS%20Validation)](https://github.com/jayjojayson/power-flux-card/actions?query=workflow%3Avalidate)
[![GitHub release](https://img.shields.io/github/release/jayjojayson/power-flux-card?include_prereleases=&sort=semver&color=blue)](https://github.com/jayjojayson/power-flux-card/releases)
![Downloads](https://img.shields.io/github/downloads/jayjojayson/power-flux-card/total?label=Downloads&color=blue)
[![README Englisch](https://img.shields.io/badge/README-EN-orange)](https://github.com/jayjojayson/power-flux-card)
[![Support](https://img.shields.io/badge/%20-Support%20Me-steelblue?style=flat&logo=paypal&logoColor=white)](https://www.paypal.me/quadFlyerFW)
[![Stars](https://img.shields.io/github/stars/jayjojayson/power-flux-card)](https://github.com/jayjojayson/power-flux-card/stargazers)


# Power Flux Card 

Die ⚡Power Flux Card ist eine erweiterte, animierte Energiefluss-Karte für Home Assistant. Sie visualisiert die Energieverteilung zwischen Solar, Netz, Batterie und Verbrauchern mit wunderschönen Neon-Effekten und flüssigen Animationen.

### ✨ Funktionen

- **Echtzeit-Animation**: Visualisiert den Energiefluss mit bewegten Partikeln.
- **Mehrere Quellen & Verbraucher**: Unterstützt Solar, Netz, Batterie und bis zu 3 zusätzliche Verbraucher (z.B. E-Auto, Heizung, Pool).
- **Kompakte Ansicht**: Eine minimalistische Balkendiagramm-Ansicht (inspiriert von evcc).
- **Anpassbares Aussehen**:
  - **Neon Glow**: Leuchteffekte für aktive Stromleitungen.
  - **Donut Chart**: Optionales Donut-Diagramm um das Haus-Icon, das den Energiemix zeigt.
  - **Kometenschweif / Gestrichelte Linien**: Wählen Sie Ihren bevorzugten Animationsstil.
  - **Zoom**: Anpassbare Größe für Ihr Dashboard.
- **Lokalisierung**: Vollständig übersetzt in Deutsch und Englisch.
- **Visueller Editor**: Einfache Konfiguration über die Home Assistant UI.

### 🚀 Installation

### HACS (Empfohlen)

- Das github über den Link in Home Assistant einfügen.
 
  [![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=jayjojayson&repository=power-flux-card&category=plugin)

- Das "Detailed Charts Panel" sollte nun in HACS verfügbar sein. Klicke auf "INSTALLIEREN" ("INSTALL").
- Die Ressource wird automatisch zu deiner Lovelace-Konfiguration hinzugefügt.
- 
#### HACS (manuell)
1. Stellen Sie sicher, dass HACS installiert ist.
2. Fügen Sie dieses Repository als benutzerdefiniertes Repository in HACS hinzu.
3. Suchen Sie nach "Power Flux Card" und installieren Sie es.
4. Laden Sie die Ressourcen neu, falls Sie dazu aufgefordert werden.

#### Manuelle Installation
1. Laden Sie die Datei `power-flux-card.js` von der [Releases](../../releases)-Seite herunter.
2. Laden Sie sie in Ihren `www`-Ordner in Home Assistant hoch.
3. Fügen Sie die Ressource in Ihrer Dashboard-Konfiguration hinzu:
   - URL: `/local/power-flux-card.js`
   - Typ: JavaScript Module

### ⚙️ Konfiguration

Sie können die Karte direkt über den visuellen Editor in Home Assistant konfigurieren.

**Haupt-Entitäten:**
- **Solar**: Erzeugung (W).
- **Netz**: Netzleistung (W). Positiv = Import, Negativ = Export (oder separate Entitäten).
- **Batterie**: Batterieleistung (W) und Ladestand (%).

**Zusätzliche Verbraucher:**
- Sie können bis zu 3 individuelle Verbraucher (z.B. Auto, Heizung, Pool) mit eigenen Icons und Beschriftungen hinzufügen.

**Optionen:**
- **Zoom**: Passen Sie die Größe der Karte an.
- **Neon Glow**: Aktivieren/Deaktivieren des Leuchteffekts.
- **Donut Chart**: Zeigt den Energiemix als Ring um das Haus an.
- **Kometenschweif / Gestrichelte Linie**: Ändern Sie den Stil der Flussanimation.
- **Kompakte Ansicht**: Wechseln Sie zum Balkendiagramm-Layout.
