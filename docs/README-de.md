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

Wenn euch die Card gefällt, würde ich mich sehr über eine Sternebewertung ⭐ freuen. 🤗

<img width="49%" height="auto" alt="power-flux-card" src="https://github.com/jayjojayson/power-flux-card/blob/main/docs/images/power-flux-card-ani.gif" /> <img width="49%" height="auto" alt="power-flux-card" src="https://github.com/jayjojayson/power-flux-card/blob/main/docs/images/power-flux-card.jpg" />  
<img width="49%" height="auto" alt="power-flux-card" src="https://github.com/jayjojayson/power-flux-card/blob/main/docs/images/power-flux-card-compact.jpg" /> <img width="49%" height="auto" alt="power-flux-card" src="https://github.com/jayjojayson/power-flux-card/blob/main/docs/images/power-flux-card-compact2.jpg" /> <img width="98%" height="auto" alt="power-flux-card" src="https://github.com/jayjojayson/power-flux-card/blob/main/docs/images/power-flux-card7.png" />

### ✨ Funktionen

**Darstellung**
- **Echtzeit-Animation**: Energieflüsse werden als bewegte Partikel dargestellt. Geschwindigkeit und Dichte passen sich der aktuellen Leistung an — je mehr Leistung, desto schneller der Fluss.
- **Mehrere Layouts**: Standard-Ansicht, **horizontale** Ansicht (um 90° gedreht), **Diamant**-Ansicht (Solar oben, Netz links, Batterie rechts, Haus unten), **Boxen mit runden Ecken** statt Kreise und die minimalistische **Kompakte Ansicht** (Balkendiagramm, inspiriert von evcc).
- **Anpassbares Aussehen**: Neon Glow, Donut-Diagramm um Haus/Netz, Kometenschweif oder gestrichelte Flusslinien, getönter Bubble-Hintergrund, farbige Textwerte, Zoom und individuelle Farben je Quelle und Verbraucher (Bubble, Röhre, Text, Icon, Secondary).
- **Flussraten an den Röhren**: Die Leistung (W/kW) lässt sich direkt an den Röhren anzeigen — je Quelle schaltbar.
- **Einheiten**: Werte wechseln automatisch zwischen W und kW (kW ab 1000 W) — oder du erzwingst eine Einheit für die gesamte Karte.
- **Label, Icons & Zusatzsensoren**: Jeder Knoten bekommt eigenes Label und Icon sowie einen optionalen zweiten Sensor (z.B. Tagesertrag, Ladeleistung); Verbraucher und Haus unterstützen zusätzlich einen **dritten Sensor**.
- **Styling mit UIX**: Alle Farben, Größen und Röhren-Transparenzen sind CSS-Variablen — auch dynamisch per Jinja2-Template (siehe [Styling mit UIX](#-styling-mit-uix)).

**Quellen, Speicher & Verbraucher**
- **Solar**: Ein oder **mehrere Solar-Sensoren** (z.B. mehrere Wechselrichter) werden zu einem Wert addiert.
- **Netz**: Separate Import-/Export-Entitäten **oder** eine kombinierte Entität (positiv = Bezug, negativ = Einspeisung), optionale Wertumkehr und ein optionaler **Netz-Schwellenwert**, der Rauschen um 0 W unterdrückt.
- **Mehrere Batterien (bis zu 4)**: Im Card-Editor lassen sich bis zu drei weitere Batterien hinzufügen. Die Röhre zeigt stets die **Summe**; die Batterie-Bubble lässt sich optional in **Ring-Segmente** oder einen **Kuchen** aufteilen, der den SOC jeder Batterie zeigt.
- **Batterie-Details**: Ein kombinierter Sensor oder getrennte Lade-/Entlade-Sensoren, SOC, optionaler Netz-zu-Batterie-Sensor, Ladung über das Haus leiten, Leistung statt SOC anzeigen, unterhalb eines Ladestands ausblenden.
- **Bis zu 5 zusätzliche Verbraucher** (z.B. E-Auto, Heizung, Pool) mit eigenen Icons, Labels, Farben, zweitem/drittem Sensor, Standby-Filter und Röhren-Schwellenwert.
- **Bidirektionale Verbraucher**: Wird der Sensorwert eines Verbrauchers invertiert, kehrt sich die Flussrichtung um und speist ins Haus ein (z.B. ein zweiter Solar-/Hybrid-Wechselrichter als „Verbraucher“).
- **Haus**: Wird automatisch berechnet oder aus einem eigenen Gesamtverbrauchs-Sensor übernommen.

**Bedienung**
- **Weitere Informationen**: Tippe auf eine Bubble, um den More-Info-Dialog des zugehörigen Sensors zu öffnen.
- **Visueller Editor**: Alles oben Genannte lässt sich in der Home-Assistant-Oberfläche konfigurieren — YAML ist nicht nötig.
- **Lokalisierung**: Deutsch und Englisch.

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

Du kannst die gesamte Karte im visuellen Editor von Home Assistant konfigurieren — YAML ist nicht nötig. Füge die Karte einem Dashboard hinzu (**Karte hinzufügen → Power Flux Card**) und nutze den Editor links. Wer lieber YAML schreibt: Jedes Editor-Feld hat einen passenden Schlüssel, aufgelistet in der [YAML-Referenz](#yaml-referenz).

**Inhalt:** [Schnellstart](#schnellstart) · [Editor-Überblick](#editor-überblick) · [Solar](#solar) · [Netz](#netz) · [Batterie](#batterie) · [Haus & zusätzliche Verbraucher](#haus--zusätzliche-verbraucher) · [Labels, Icons & Zusatzsensoren](#labels-icons--zusatzsensoren) · [Farben](#farben) · [Darstellung & Optionen](#darstellung--optionen) · [Kompakte Ansicht](#kompakte-ansicht-evcc) · [YAML-Referenz](#yaml-referenz) · [Vollständiges Beispiel](#vollständiges-beispiel) · [Fehlerbehebung](#fehlerbehebung) · [Styling mit UIX](#-styling-mit-uix)

#### Schnellstart

Eine minimale Konfiguration braucht nur deine Leistungs-Sensoren:

```yaml
type: custom:power-flux-card
entities:
  solar: sensor.solar_power
  grid_combined: sensor.grid_power   # positiv = Bezug, negativ = Einspeisung
  battery: sensor.battery_power      # positiv = laden, negativ = entladen
  battery_soc: sensor.battery_soc
```

Alles andere ist optional. Der Hausverbrauch wird automatisch aus Solar, Netz und Batterie berechnet, solange du keinen eigenen Sensor angibst.

> **Einheiten:** Die Karte erwartet **Watt**. Meldet ein Sensor kW, aktiviere die kW-Option des jeweiligen Knotens (siehe unten) — die Karte rechnet dann um.

#### Editor-Überblick

Der Editor hat zwei Bereiche:

| Bereich | Inhalt |
|---|---|
| **Haupt Entitäten** | Vier Unterseiten: **Solar/PV**, **Netz Import/Export**, **Batterie** und **Zusätzliche Verbraucher** (dort steht auch der optionale Haus-Sensor). Jede Unterseite enthält die Sensoren, Beschriftung, Icon, zweiten Sensor, Farben und die knotenspezifischen Schalter. |
| **Darstellung & Optionen** | Kartenweite Einstellungen in vier Gruppen: **Layout & Ansicht**, **Effekte & Darstellung**, **Röhren & Verbraucher** und **Kompakte Ansicht (evcc)**. |

#### Solar

*Editor: Haupt Entitäten → Solar/PV*

| Einstellung | YAML-Schlüssel | Funktion |
|---|---|---|
| Solar-Sensor (W) | `entities.solar` | Aktuelle Solarerzeugung. |
| Weitere Solaranlage hinzufügen | `entities.solar_extra` (Liste) | Zusätzliche Solar-Sensoren für mehrere Wechselrichter. **Alle Sensoren werden addiert** und als ein Solarwert angezeigt. Ein Tipp auf die Bubble öffnet den ersten konfigurierten Sensor. |
| Beschriftung / Icon | `solar_label`, `solar_icon` | Name und Icon der Bubble. |
| Zweiter Sensor | `entities.secondary_solar` | Wird zusätzlich zum Hauptwert in der Bubble angezeigt, z.B. der Tagesertrag. |
| Farben Bubble / Pipe / Text / Icon / Secondary | `color_solar`, `color_pipe_solar`, `color_text_solar`, `color_icon_solar`, `color_secondary_solar` | Siehe [Farben](#farben). |
| Label statt secondary entity anzeigen | `show_label_solar` | Siehe [Labels, Icons & Zusatzsensoren](#labels-icons--zusatzsensoren). |
| Solar in kW anzeigen | `solar_unit_kw` | Aktivieren, wenn deine Solar-Sensoren **kW melden**. Die Karte rechnet in W um. Gilt für *alle* Solar-Sensoren, gemischte Einheiten werden nicht unterstützt. |
| Flussraten an Röhren anzeigen | `show_flow_rate_solar` | Zeigt die Leistung an den Solar-Röhren (Standard: an). |

```yaml
entities:
  solar: sensor.wechselrichter_1_leistung
  solar_extra:
    - sensor.wechselrichter_2_leistung
    - sensor.wechselrichter_3_leistung
```

#### Netz

*Editor: Haupt Entitäten → Netz Import/Export*

Die Karte unterstützt drei Arten, den Netzanschluss zu beschreiben. Wähle die, die zu deinen Sensoren passt:

| Deine Sensoren | Konfiguration | Verhalten |
|---|---|---|
| **Ein Sensor** mit positiv = Bezug und negativ = Einspeisung | **Kombinierter Netz-Sensor** (`entities.grid_combined`) | Die einfachste Variante. Ist er gesetzt, hat er Vorrang vor den folgenden Sensoren. |
| **Zwei Sensoren**, einer für Bezug und einer für Einspeisung | **Import** (`entities.grid`) und **Export** (`entities.grid_export`) | Beide Werte werden unabhängig gelesen (das Vorzeichen des Export-Werts wird ignoriert). |
| **Ein Sensor** mit Vorzeichen (positiv = Bezug, negativ = Einspeisung) | Nur **Import** (`entities.grid`) | Negative Werte gelten als Einspeisung. |

Weitere Optionen auf dieser Seite:

- **Beschriftung / Icon** (`grid_label`, `grid_icon`), **Zweiter Sensor** (`entities.secondary_grid`) und die fünf **Farben** (`color_grid`, `color_pipe_grid`, `color_text_grid`, `color_icon_grid`, `color_secondary_grid`).
- **Export-Farben und -Icon** (`color_export`, `color_pipe_export`, `color_text_export`, `color_icon_export`, `color_secondary_export`, `export_icon`): Netz-Bubble, Röhre, Wert und Icon können beim Einspeisen eine andere Farbe haben — und die Export-Klammer der kompakten Ansicht ein anderes Icon. Solange sie nicht gesetzt sind, folgen sie der Export-*Bubble*-Farbe.
- **Label statt secondary entity anzeigen** (`show_label_grid`), **Flussraten an Röhren anzeigen** (`show_flow_rate_grid`).
- **Grid in kW anzeigen** (`grid_unit_kw`): Aktivieren, wenn deine Netz-Sensoren **kW melden**. Die Karte rechnet in W um.
- **Wert umkehren (+/-)** (`invert_grid`): Kehrt das Vorzeichen des Netz-Sensors (und des kombinierten Sensors) um — für Wechselrichter, die Einspeisung positiv und Bezug negativ melden. Der separate Export-Sensor wird nicht umgekehrt.
- **Netz-Schwellenwert (W)** (`grid_threshold`, 0–500 W, Standard `0` = aus): Bezug oder Einspeisung **unterhalb dieses Werts gilt als 0 W**. Ein ausgeglichenes Netz pendelt oft um wenige Watt um null, wodurch die Bubble ständig zwischen Bezug und Einspeisung wechselt. Setze z.B. `10`, um die Anzeige zu beruhigen. Bezug und Einspeisung werden getrennt geprüft. Der Schwellenwert wirkt in der Standard- und der Kompakten Ansicht; der berechnete Hausverbrauch nutzt die bereinigten Werte und kann deshalb um bis zu den Schwellenwert vom realen Wert abweichen.

```yaml
entities:
  grid_combined: sensor.netz_leistung
grid_threshold: 10
```

#### Batterie

*Editor: Haupt Entitäten → Batterie*

**Einzelne Batterie**

| Einstellung | YAML-Schlüssel | Funktion |
|---|---|---|
| Kombinierter Batterie Sensor (W) | `entities.battery` | Ein Sensor mit Vorzeichen: **positiv = laden, negativ = entladen**. |
| Batterie-Ladung / -Entladung Sensor | `entities.battery_charge`, `entities.battery_discharge` | Optionale getrennte Sensoren. Wenn gesetzt, ersetzen sie den kombinierten Sensor für die Berechnung. |
| Ladestand (%) | `entities.battery_soc` | Wird in der Bubble angezeigt. |
| Beschriftung / Icon | `battery_label`, `battery_icon` | Name und Icon der Bubble. |
| Netz-zu-Batterie Sensor (W) | `entities.grid_to_battery` | Optional. Wenn leer, wird der aus dem Netz geladene Anteil berechnet (Solar wird zuerst genutzt, der Rest kommt aus dem Netz). |
| Zweiter Sensor | `entities.secondary_battery` | Zusätzlicher Wert in der Bubble (z.B. die aktuelle Leistung). |
| Farben | `color_battery`, `color_pipe_battery`, `color_text_battery`, `color_icon_battery`, `color_secondary_battery` | Siehe [Farben](#farben). |
| Label statt secondary entity anzeigen | `show_label_battery` | Siehe [Labels, Icons & Zusatzsensoren](#labels-icons--zusatzsensoren). |
| Batterie Leistung in kW anzeigen | `battery_unit_kw` | Aktivieren, wenn deine Batterie-Sensoren **kW melden**. Die Karte rechnet in W um. |
| Flussraten an Röhren anzeigen | `show_flow_rate_battery` | Zeigt die Leistung an den Batterie-Röhren (Standard: an). |
| Wert umkehren (+/-) | `invert_battery` | Für Sensoren mit umgekehrtem Vorzeichen (Laden negativ / Entladen positiv, z.B. GivTCP oder Solax). Stimmt die Flussrichtung nicht — etwa eine Solar-/Netz → Batterie-Röhre beim Entladen — schalte dies ein. |
| Batterie-Ladung über Hausverbrauch umleiten | `battery_charge_via_house` | Entfernt die direkten Röhren Solar → Batterie und Netz → Batterie. Die Ladeenergie wird stattdessen über das Haus geführt. |
| Zeige Leistung statt SoC | `battery_show_power` | Die Bubble zeigt die Batterieleistung statt des Ladestands. |

**Mehrere Batterien (bis zu 4)**

Mit **Weitere Batterie hinzufügen** konfigurierst du bis zu drei weitere Batterien — insgesamt vier. Jede zusätzliche Batterie hat — wie die Hauptbatterie — einen eigenen Sensor (kombiniert **oder** getrennt für Laden/Entladen), einen eigenen SOC-Sensor, einen „meldet kW“-Schalter und einen „Wert umkehren“-Schalter. Die zusätzlichen Batterien werden in `entities.batteries_extra` gespeichert.

```yaml
entities:
  battery: sensor.batterie_1_leistung
  battery_soc: sensor.batterie_1_soc
  batteries_extra:
    - power: sensor.batterie_2_leistung
      soc: sensor.batterie_2_soc
    - charge: sensor.batterie_3_ladeleistung       # getrennte Sensoren statt "power"
      discharge: sensor.batterie_3_entladeleistung
      soc: sensor.batterie_3_soc
      unit_kw: false
      invert: false
```

So werden mehrere Batterien zusammengefasst:

- **Leistung:** Lade- und Entladeleistung aller Batterien werden **addiert**. Röhre, Flussrate und Hausberechnung nutzen immer die Summe.
- **SOC:** Die Bubble zeigt den **Durchschnitt** aller Batterien, die einen SOC-Sensor haben.
- **Klick:** Ein Tipp auf die Bubble öffnet den More-Info-Dialog des Batterie-Sensors (der Hauptbatterie bzw. der ersten zusätzlichen, falls kein Hauptsensor gesetzt ist).
- Das funktioniert in jedem Layout, auch in der Kompakten Ansicht.

**Den SOC jeder Batterie anzeigen — zwei optionale Ansichten** (ab 2 Batterien aktiv, die Schalter schließen sich gegenseitig aus):

| Schalter | YAML-Schlüssel | Ergebnis |
|---|---|---|
| Aufteilung: Ring-Segmente (SOC je Batterie) | `battery_split_ring` | Der Rand der Bubble wird in gleich große Bögen geteilt — einer je Batterie. Jeder Bogen füllt sich nach dem SOC der Batterie (rot bei 20 % oder weniger). Icon, Name und der Durchschnitts-SOC bleiben in der Mitte. Im Box-Modus folgt der Ring dem abgerundeten Rechteck. |
| Aufteilung: Kuchensegmente (max 4) | `battery_split_quarters` | Die Bubble wird in Sektoren geteilt, die den Kreis immer vollständig füllen: 2 Batterien = zwei Hälften, 3 = zwei obere Viertel + eine untere Hälfte, 4 = vier Viertel. Jeder Sektor zeigt nur den SOC-Wert der Batterie (nach Ladestand eingefärbt, rot bei 20 % oder weniger). Die große Zahl in der Mitte ist der Durchschnitts-SOC. |

**Batterie bei leerem Speicher ausblenden:** Schalte *Erzeuger bei null Watt anzeigen* aus (siehe [Darstellung & Optionen](#darstellung--optionen)) und setze **Batterie ausblenden unter Ladestand (%)** (`battery_hide_soc_threshold`).

**Kompakte Ansicht:** Bei aktivierter Kompakter Ansicht bietet diese Seite zwei vollständige Farbreihen — eine für **Ladung** und eine für **Entladung** (`color_battery_charge…` und `color_battery_discharge…`).

#### Haus & zusätzliche Verbraucher

*Editor: Haupt Entitäten → Zusätzliche Verbraucher*

**Haus (Gesamtverbrauch, optional)**

- **Sensor für Hausverbrauch** (`entities.house`): Ohne Sensor berechnet die Karte den Verbrauch (Solar → Haus + Netz → Haus + Batterie-Entladung). Mit eigenem Sensor wird der gemessene Wert angezeigt — und die Haus-Bubble wird anklickbar (More-Info).
- **Beschriftung, Icon** (`house_label`, `house_icon`), **Zweiter** und **Dritter Sensor** (`entities.secondary_house`, `entities.tertiary_house`), **Farben** (`color_house`, `color_text_house`, `color_icon_house`, `color_secondary_house`) und **Label statt secondary entity anzeigen** (`show_label_house`).

**Verbraucher 1–5**

Bis zu fünf Verbraucher mit festen Positionen: 1 = links (lila), 2 = Mitte (orange), 3 = rechts (türkis), 4 = zweite Reihe links (gelb), 5 = zweite Reihe rechts (indigo). Klicke im Editor auf einen Verbraucher, um seine Einstellungen aufzuklappen. `N` steht für 1–5:

| Einstellung | YAML-Schlüssel | Funktion |
|---|---|---|
| Entität | `entities.consumer_N` | Leistungs-Sensor des Verbrauchers. |
| Beschriftung / Icon | `consumer_N_label`, `consumer_N_icon` | Name und Icon. |
| Sensorwert invertieren (+/-) | `invert_consumer_N` | Macht den Verbraucher zum **Erzeuger**: Ist der (invertierte) Wert negativ, kehrt sich der Fluss um und speist ins Haus ein (z.B. ein zweiter Solar- oder Hybrid-Wechselrichter). |
| Sensor meldet in kW | `consumer_N_unit_kw` | Aktivieren, wenn der Sensor kW meldet. |
| Standby-Werte ausblenden + Schwellenwert | `consumer_N_standby`, `consumer_N_standby_threshold` | Werte unterhalb des Schwellenwerts (0–100 W) gelten als 0 W, ein Gerät im Standby (z.B. 1–3 W) verschwindet damit vollständig (Bubble und Röhre). |
| Pipe bei geringer Leistung ausblenden + Schwellenwert | `consumer_N_hide_pipe`, `consumer_N_pipe_threshold` | Blendet nur die Röhre unterhalb des Schwellenwerts (0–2000 W) aus — die Bubble bleibt sichtbar. |
| Zweiter / Dritter Sensor | `entities.secondary_consumer_N`, `entities.tertiary_consumer_N` | Beide werden in einer Zeile, getrennt durch ` / `, in der Secondary-Farbe angezeigt. |
| Farben | `color_consumer_N`, `color_pipe_consumer_N`, `color_text_consumer_N`, `color_icon_consumer_N`, `color_secondary_consumer_N` | Siehe [Farben](#farben). |

Ob ruhende Verbraucher überhaupt angezeigt werden, steuerst du global unter [Darstellung & Optionen](#darstellung--optionen).

#### Labels, Icons & Zusatzsensoren

- **Beschriftung** und **Icon** lassen sich für Solar, Netz, Batterie, Haus und jeden Verbraucher setzen. In der Kompakten Ansicht werden die gesetzten Icons in den Klammern und in der Detailliste verwendet.
- Der **zweite Sensor** wird in der Bubble angezeigt. Der **dritte Sensor** (nur Verbraucher und Haus) teilt sich die Zeile, getrennt durch ` / `.
- Die Beschriftung erscheint in der Bubble **nur, wenn kein zweiter Sensor konfiguriert ist** — ein konfigurierter zweiter Sensor hat Vorrang. Soll stattdessen die Beschriftung erscheinen, schalte **Label statt secondary entity anzeigen** ein (`show_label_solar`, `show_label_grid`, `show_label_battery`, `show_label_house`). In der Kompakten Ansicht werden Beschriftungen nur in der Detailliste verwendet.

#### Farben

Jede Quelle und jeder Verbraucher hat bis zu fünf Farbwähler:

| Wähler | Bedeutung |
|---|---|
| **Bubble** | Rand/Leuchten der Bubble (Kompakte Ansicht: das Balkensegment). |
| **Pipe** | Die Röhre und die Flusspartikel (Kompakte Ansicht: die Klammerlinie, die der Icon-Farbe folgt, bis eine Pipe-Farbe gesetzt ist). |
| **Text** | Der Wert. |
| **Icon** | Das Icon. |
| **Secondary** | Zweiter Wert bzw. Beschriftung (Kompakte Ansicht: Beschriftung in der Detailliste). |

Die Schlüssel folgen dem Muster `color_<knoten>`, `color_pipe_<knoten>`, `color_text_<knoten>`, `color_icon_<knoten>` und `color_secondary_<knoten>`; `<knoten>` ist `solar`, `grid`, `export`, `battery`, `battery_charge`, `battery_discharge`, `house` (ohne Pipe-Farbe) oder `consumer_1` … `consumer_5`. Mit **Farbige Textwerte** (`use_colored_values`) werden die Werttexte in den Knotenfarben dargestellt. Für Farben, die sich mit Sensorwerten ändern (z.B. eine Batterie, die bei niedrigem Ladestand rot wird), siehe [Styling mit UIX](#-styling-mit-uix).

#### Darstellung & Optionen

*Editor: Darstellung & Optionen*

**Layout & Ansicht**

| Einstellung | YAML-Schlüssel | Standard | Funktion |
|---|---|---|---|
| Horizontale Ansicht | `horizontal_view` | aus | Dreht das Standard-Layout um 90°. |
| Diamant Ansicht | `diamond_view` | aus | Solar oben, Netz links, Batterie rechts, Haus unten. Wird ignoriert, wenn die horizontale Ansicht aktiv ist. |
| Boxen mit runden Ecken statt Kreise | `use_boxes` | aus | Stellt jeden Knoten als Box mit runden Ecken dar. |
| Zoom (Standard View) | `zoom` | `0.9` | Skaliert die Karte zwischen 0,3 und 1,0. |

**Effekte & Darstellung**

| Einstellung | YAML-Schlüssel | Standard | Funktion |
|---|---|---|---|
| Neon Glow | `show_neon_glow` | an | Leuchten um aktive Bubbles und Röhren. |
| Donut Chart (Grid/Haus) | `show_donut_border` | aus | Ring um Netz- und Haus-Bubble, der den Energiemix zeigt. |
| Comet Tail Effect | `show_comet_tail` | aus | Flusspartikel mit Schweif. |
| Dashed Line Effect | `show_dashed_line` | aus | Fluss als bewegte Striche. |
| Farbiger Hintergrund in Kreisen | `show_tinted_background` | aus | Leicht getönter Bubble-Hintergrund in der Standard-Ansicht. |
| Farbige Textwerte | `use_colored_values` | aus | Werttexte in den Knotenfarben. |

**Röhren & Verbraucher**

| Einstellung | YAML-Schlüssel | Standard | Funktion |
|---|---|---|---|
| Inaktive Röhren ausblenden | `hide_inactive_flows` | an | Röhren ohne Fluss werden ausgeblendet. |
| Verbraucher bei null Watt anzeigen | `show_consumer_always` | aus | Verbraucher bleiben bei 0 W sichtbar. Aus: Ruhende Verbraucher verschwinden. |
| Erzeuger bei null Watt anzeigen | `show_producer_always` | an | Aus: Solar und Netz verschwinden bei 0 W. Die Batterie blendet sich dann nach ihrem Ladestand aus (`battery_hide_soc_threshold`, 0–100 %), da ihre Leistung um null pendeln kann. |
| Icons unten ausblenden | `hide_consumer_icons` | aus | Blendet die Icons der Verbraucher aus. |
| Alle Werte in Watt / kW anzeigen | `force_watt_display`, `force_kw_display` | aus | Standardmäßig werden Werte bis 1000 W in W und darüber in kW angezeigt. Diese Schalter erzwingen eine Einheit für die ganze Karte. Das Einschalten des einen schaltet den anderen aus. |
| Flussraten an Röhren (global) | `show_flow_rates` | an | Nur per YAML. Standardwert für alle `show_flow_rate_*`-Schalter; die Schalter je Knoten überschreiben ihn. |

#### Kompakte Ansicht (evcc)

*Editor: Darstellung & Optionen → Kompakte Ansicht (evcc)*

Die Kompakte Ansicht ersetzt die Bubbles durch ein minimalistisches Balkendiagramm: Die Klammern über dem Balken zeigen die Quellen (Solar, Netz, Batterie), der Balken in der Mitte zeigt, woher die Energie kommt, und die Klammern darunter zeigen, wohin sie geht (Haus, Batterie-Ladung, Einspeisung).

| Einstellung | YAML-Schlüssel | Funktion |
|---|---|---|
| Kompakte Ansicht aktivieren | `compact_view` | Schaltet die Karte auf das kompakte Layout. |
| Details für Kompakte Ansicht | `compact_details` | Fügt unter dem Balken eine Detailliste mit allen Werten hinzu. |
| Neon Glow in kompakter Ansicht | `compact_glow` | Leuchteffekt für den Balken. |
| Icons in die Klammern setzen | `compact_icons_in_bracket` | Aus: Die Icons stehen innerhalb der Klammern, die Klammerlinie läuft durchgehend. An: Die Icons sitzen mittig auf der Klammerlinie und unterbrechen sie. |
| Einspeisung in den Balken aufnehmen | `compact_bar_selfuse` | Aus: Der Balken zeigt die Quellen in voller Höhe, die Einspeisung erscheint als Klammer darunter. An: Die Einspeisung wird ein farbiges Segment im Balken, Solar und Batterie zeigen nur den im Haus genutzten Anteil. |

In der Kompakten Ansicht erscheinen Verbraucher mit ihren konfigurierten Icons, Beschriftungen und Farben, und die Batterie kann getrennte Farben für Ladung und Entladung nutzen.

#### YAML-Referenz

Alle Optionen im Überblick. Optionen ohne Standardwert sind aus bzw. leer, sofern nichts anderes angegeben ist.

**`entities`**

| Schlüssel | Beschreibung |
|---|---|
| `solar` | Solar-Leistungssensor |
| `solar_extra` | Liste weiterer Solar-Sensoren (werden mit `solar` addiert) |
| `grid` | Netz-Sensor (Bezug, bzw. mit Vorzeichen, wenn kein Export-Sensor gesetzt ist) |
| `grid_export` | Separater Export-Sensor |
| `grid_combined` | Kombinierter Netz-Sensor (positiv = Bezug, negativ = Einspeisung); hat Vorrang |
| `battery` | Batterie-Leistungssensor (positiv = laden, negativ = entladen) |
| `battery_charge`, `battery_discharge` | Getrennte Lade-/Entlade-Sensoren |
| `battery_soc` | Ladestand der Batterie (%) |
| `grid_to_battery` | Direkter Netz-zu-Batterie-Sensor |
| `batteries_extra` | Liste von bis zu 3 weiteren Batterien: `power` **oder** `charge` + `discharge`, dazu `soc`, `unit_kw`, `invert` |
| `house` | Gesamtverbrauchs-Sensor (sonst berechnet) |
| `consumer_1` … `consumer_5` | Verbraucher-Sensoren |
| `secondary_solar`, `secondary_grid`, `secondary_battery`, `secondary_house`, `secondary_consumer_N` | Zweite Anzeige-Sensoren |
| `tertiary_house`, `tertiary_consumer_N` | Dritte Anzeige-Sensoren |

**Knoten**

| Schlüssel | Standard | Beschreibung |
|---|---|---|
| `solar_label`, `grid_label`, `battery_label`, `house_label`, `consumer_N_label` | – | Beschriftung |
| `solar_icon`, `grid_icon`, `battery_icon`, `house_icon`, `consumer_N_icon`, `export_icon` | – | Icon (z.B. `mdi:solar-power`) |
| `show_label_solar`, `show_label_grid`, `show_label_battery`, `show_label_house` | `false` | Beschriftung statt zweitem Sensor anzeigen |
| `solar_unit_kw`, `grid_unit_kw`, `battery_unit_kw`, `consumer_N_unit_kw` | `false` | Der Sensor meldet kW (wird in W umgerechnet) |
| `show_flow_rate_solar`, `show_flow_rate_grid`, `show_flow_rate_battery` | `true` | Flussrate an den Röhren |
| `invert_grid`, `invert_battery`, `invert_consumer_N` | `false` | Vorzeichen des Sensors umkehren |
| `grid_threshold` | `0` | Netzbezug/-einspeisung unterhalb dieses Werts (W) gilt als 0 |
| `battery_charge_via_house` | `false` | Batterie-Ladung über das Haus führen |
| `battery_show_power` | `false` | Leistung statt SOC in der Batterie-Bubble anzeigen |
| `battery_hide_soc_threshold` | `0` | Batterie bei diesem Ladestand oder darunter ausblenden (benötigt `show_producer_always: false`) |
| `battery_split_ring`, `battery_split_quarters` | `false` | Ansichten für mehrere Batterien (ab 2 Batterien, schließen sich aus) |
| `consumer_N_standby`, `consumer_N_standby_threshold` | `false`, `0` | Standby-Filter (W) |
| `consumer_N_hide_pipe`, `consumer_N_pipe_threshold` | `false`, `0` | Röhre unterhalb eines Schwellenwerts (W) ausblenden |
| `color_<knoten>`, `color_pipe_<knoten>`, `color_text_<knoten>`, `color_icon_<knoten>`, `color_secondary_<knoten>` | – | Farben (siehe [Farben](#farben)) |

**Karte**

| Schlüssel | Standard | Beschreibung |
|---|---|---|
| `zoom` | `0.9` | Skalierung 0,3–1,0 |
| `horizontal_view`, `diamond_view`, `use_boxes` | `false` | Layout |
| `show_neon_glow` | `true` | Neon Glow |
| `show_donut_border`, `show_comet_tail`, `show_dashed_line`, `show_tinted_background`, `use_colored_values` | `false` | Effekte |
| `hide_inactive_flows` | `true` | Röhren ohne Fluss ausblenden |
| `show_consumer_always` | `false` | Verbraucher bei 0 W anzeigen |
| `show_producer_always` | `true` | Solar/Netz bei 0 W anzeigen |
| `hide_consumer_icons` | `false` | Verbraucher-Icons ausblenden |
| `force_watt_display`, `force_kw_display` | `false` | Eine Einheit erzwingen |
| `show_flow_rates` | `true` | Globaler Standard für Flussraten (nur YAML) |
| `compact_view`, `compact_details`, `compact_glow`, `compact_icons_in_bracket`, `compact_bar_selfuse` | `false` | Kompakte Ansicht |

#### Vollständiges Beispiel

```yaml
type: custom:power-flux-card
zoom: 0.9
show_neon_glow: true
show_donut_border: true
entities:
  solar: sensor.wechselrichter_1_leistung
  solar_extra:
    - sensor.wechselrichter_2_leistung
  secondary_solar: sensor.solar_ertrag_heute
  grid_combined: sensor.netz_leistung
  secondary_grid: sensor.netzbezug_heute
  battery: sensor.batterie_1_leistung
  battery_soc: sensor.batterie_1_soc
  batteries_extra:
    - power: sensor.batterie_2_leistung
      soc: sensor.batterie_2_soc
  house: sensor.hausverbrauch
  consumer_1: sensor.wallbox_leistung
  consumer_2: sensor.waermepumpe_leistung
  consumer_3: sensor.poolpumpe_leistung
grid_threshold: 10
battery_split_quarters: true
consumer_1_label: Wallbox
consumer_1_icon: mdi:car-electric
consumer_2_standby: true
consumer_2_standby_threshold: 20
consumer_3_hide_pipe: true
consumer_3_pipe_threshold: 100
show_producer_always: true
hide_inactive_flows: true
```

#### Fehlerbehebung

- **Die Batterie-Röhre zeigt in die falsche Richtung** (z.B. eine Solar → Batterie-Röhre, während die Batterie entlädt, oder keine Batterie → Haus-Röhre): Deine Integration meldet das umgekehrte Vorzeichen. Schalte auf der *Batterie*-Seite **Wert umkehren** ein (`invert_battery`). Der Schalter auf der *Netz*-Seite gilt nur für den Netz-Sensor.
- **Die Netz-Bubble flackert bei ausgeglichenem Netz zwischen Bezug und Einspeisung:** Setze einen kleinen **Netz-Schwellenwert (W)**, z.B. 10.
- **Werte sind um den Faktor 1000 zu klein oder zu groß:** Der Sensor meldet kW. Aktiviere den kW-Schalter des Knotens (`solar_unit_kw`, `grid_unit_kw`, `battery_unit_kw`, `consumer_N_unit_kw`).
- **Ein Verbraucher verschwindet im Ruhezustand nicht:** Nutze **Standby-Werte ausblenden** für diesen Verbraucher und prüfe, dass **Verbraucher bei null Watt anzeigen** aus ist.
- **Nach einem Update zeigt der Editor noch alte Texte oder Optionen:** Leere den Browser-Cache oder lade das Dashboard hart neu — Home Assistant cached die Karten-Datei.
- **Der zweite Sensor verdeckt meine Beschriftung:** Ein konfigurierter zweiter Sensor hat Vorrang. Schalte für den Knoten **Label statt secondary entity anzeigen** ein.

---

### 🎨 Styling mit UIX

Neben dem Editor kannst du die Karte mit CSS gestalten — auch mit **dynamischen Farben abhängig von Sensorwerten**. Das geht mit **[UIX (UI eXtension)](https://uix.lf.technology/)**, dem Nachfolger des nicht mehr weiterentwickelten card-mod. UIX unterstützt Jinja2-Templates in den Styles, sodass sich Farben, Größen und Röhren-Transparenzen abhängig von Zuständen ändern lassen.

<details>
   <summary> <b>UIX installieren / von card-mod umsteigen</b></summary>

1. Installiere **UI eXtension** über HACS ([Repository](https://github.com/Lint-Free-Technology/uix)).
2. UIX ist eine Integration: Füge sie nach dem Download unter **Einstellungen → Geräte & Dienste** hinzu und lade den Browser neu. Folge dem [Quick Start](https://uix.lf.technology/quick-start/) der UIX-Dokumentation.
3. **Von card-mod gekommen?** Deinstalliere card-mod (und entferne ggf. den Eintrag `extra_module_url`, danach Home Assistant neu starten). Ersetze im YAML der Karte den Schlüssel `card_mod:` durch `uix:` — der Inhalt bleibt gleich:

```yaml
# vorher
card_mod:
  style: |
    :host {
      --neon-green: #00ff88;
    }

# nachher
uix:
  style: |
    :host {
      --neon-green: #00ff88;
    }
```

Die Kompatibilität zu card-mod beschreibt UIX in den [FAQ](https://uix.lf.technology/faq/). Alle folgenden Beispiele verwenden den Schlüssel `uix:`.
</details>

<details>
   <summary> <b>Custom Farben, Größen und Röhren-Transparenz mit UIX und Jinja2 Templates</b></summary>

Mit UIX können die CSS-Variablen der Power Flux Card dynamisch per Jinja2-Templates überschrieben werden. Die Templates werden von Home Assistant ausgewertet und aktualisieren sich bei Zustandsänderungen. So lassen sich Farben abhängig von Sensorwerten ändern — z.B. Solar-Icon grün bei Produktion, grau bei Stillstand.

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
| `--export-color` | Basisfarbe Export (Netz-Kreis beim Einspeisen) |
| `--pipe-export-color` | Farbe der Export-Röhre (folgt `--export-color`) |
| `--text-export-color` | Farbe des Export-Werts (folgt `--export-color`) |
| `--icon-export-color` | Farbe des Export-Icons (folgt `--export-color`) |
| `--secondary-export-color` | Export-Beschriftung in der Detailliste der kompakten Ansicht (folgt `--text-export-color`) |
| `--pipe-solar-opacity` | Pipe-Transparenz Solar (0 = unsichtbar, 1 = sichtbar) |
| `--pipe-grid-opacity` | Pipe-Transparenz Grid (0 = unsichtbar, 1 = sichtbar) |
| `--pipe-battery-opacity` | Pipe-Transparenz Batterie (0 = unsichtbar, 1 = sichtbar) |
| `--pipe-consumer-1-opacity` | Pipe-Transparenz Consumer 1 (0 = unsichtbar, 1 = sichtbar) |
| `--pipe-consumer-2-opacity` | Pipe-Transparenz Consumer 2 (0 = unsichtbar, 1 = sichtbar) |
| `--pipe-consumer-3-opacity` | Pipe-Transparenz Consumer 3 (0 = unsichtbar, 1 = sichtbar) |
| `--pipe-consumer-4-opacity` | Pipe-Transparenz Consumer 4 (0 = unsichtbar, 1 = sichtbar) |
| `--pipe-consumer-5-opacity` | Pipe-Transparenz Consumer 5 (0 = unsichtbar, 1 = sichtbar) |
| `--battery-charge-color` | Batterie-Ladung, Balkensegment (kompakte Ansicht) |
| `--pipe-battery-charge-color` | Batterie-Ladung, Klammerlinie (kompakte Ansicht) |
| `--text-battery-charge-color` | Batterie-Ladung, Wert (kompakte Ansicht) |
| `--icon-battery-charge-color` | Batterie-Ladung, Icon (kompakte Ansicht) |
| `--secondary-battery-charge-color` | Batterie-Ladung, Beschriftung in der Detailliste |
| `--battery-discharge-color` | Batterie-Entladung, Balkensegment (kompakte Ansicht) |
| `--pipe-battery-discharge-color` | Batterie-Entladung, Klammerlinie (kompakte Ansicht) |
| `--text-battery-discharge-color` | Batterie-Entladung, Wert (kompakte Ansicht) |
| `--icon-battery-discharge-color` | Batterie-Entladung, Icon (kompakte Ansicht) |
| `--secondary-battery-discharge-color` | Batterie-Entladung, Beschriftung in der Detailliste |
| `--font-size-value` | Schriftgröße des Hauptwerts in den Kreisen (Standard 15px, 17px im Box-Modus) |
| `--font-size-label` | Schriftgröße der Beschriftung unter dem Icon (Standard 9px) |
| `--font-size-secondary` | Schriftgröße des zweiten Sensorwerts (Standard 10px, 12px im Box-Modus) |
| `--font-size-secondary-dual` | Schriftgröße, wenn zweiter **und** dritter Sensor eine Zeile teilen (Standard 8px, 9px im Box-Modus) |
| `--font-size-flow` | Schriftgröße der Flussraten an den Röhren (Standard 10px) |
| `--icon-size` | Icon-Größe in den Knoten (Standard 33px) |
| `--circle-size` | Durchmesser der Kreise, unabhängig vom Zoom (Standard 90px) |

> **Hinweis zu den Größen:** `--font-size-*` und `--icon-size` sind rein optisch und können frei angepasst werden. `--circle-size` hält jeden Knoten auf seinem Ankerpunkt zentriert, die Röhren docken aber weiterhin am Standard-Radius (90px) an — kleine Anpassungen (etwa 80–100px) sehen gut aus, größere lösen die Röhren von den Knoten.

**Beispiel: größere Schrift ohne die ganze Karte zu skalieren** (siehe Discussion #74)

```yaml
type: custom:power-flux-card
uix:
  style: |
    :host {
      --font-size-value: 19px;
      --font-size-secondary: 13px;
      --font-size-flow: 12px;
    }
```

### Beispiel 1: Solar-Icon — grün bei Produktion, grau bei Stillstand

```yaml
type: custom:power-flux-card
entities:
  solar: sensor.solar_power
  grid: sensor.grid_power
  battery: sensor.battery_power
  battery_soc: sensor.battery_soc
uix:
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
uix:
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
uix:
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
uix:
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
uix:
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
uix:
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
uix:
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

> **Hinweis:** UIX muss separat über HACS installiert werden (siehe oben). Die Templates werden von Home Assistant ausgewertet, die Farben ändern sich also in Echtzeit, sobald sich die Zustände ändern.
</details>
