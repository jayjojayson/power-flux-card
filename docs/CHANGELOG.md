# Changelog

## v_2.6

### Fixed
- **Horizontale Ansicht:** Die Verbindungslinie von Solar zu Grid wird jetzt als Bogen dargestellt (analog zu Battery→Grid) statt als gerade Linie.
- **Horizontale Ansicht — Solar→Batterie-Röhre:** Der Bogen verlief bisher direkt durch die Bubble-Spalte (über den Grid-Kreis). Er dockt jetzt wie in der vertikalen Ansicht an den Außenkanten von Solar und Batterie an und verläuft durch eine 50 px breite linke Spur, außen an Grid vorbei. Die Spur ist dynamisch (Spiegelbild des vertikalen Verhaltens oben): Nur wenn der Bogen sichtbar ist, rückt der Inhalt nach rechts — ansonsten füllt der Inhalt die Karte wie bisher vollständig aus.
- **Diamant-Ansicht — Flussraten-Positionen:** Die Werte an den Röhren (Schalter „Flussraten (W) anzeigen") sitzen jetzt korrekt an ihren Röhren: Solar→Haus oberhalb der kreuzenden Grid→Batterie-Röhre, Solar→Batterie und Solar→Grid (Export) direkt an ihren Bögen, Grid→Batterie links neben der Solar→Haus-Linie statt mitten auf ihr.
- **Inaktive Röhren in Diamant-/Horizontal-Ansicht:** Bei ausgeschaltetem „Inaktive Röhren ausblenden" bleibt jetzt die Export-Röhre Solar→Grid als inaktiver Bogen sichtbar (zuvor lag sie deckungsgleich auf der Import-Linie). In der Diamant-Ansicht bleibt zusätzlich der Solar→Batterie-Bogen sichtbar, sodass der Diamantring vollständig dargestellt wird; in der horizontalen Ansicht wird dieser bewusst weiter ausgeblendet.

### Added
- **Netzwert invertieren:** Neuer Schalter „Wert umkehren (+/-)" im Netz-Tab des Editors (`invert_grid`). Für Wechselrichter, die Export positiv und Import negativ melden.
- **Sensorwert invertieren für alle Verbraucher:** Der bisher nur für Verbraucher 1 verfügbare Invert-Schalter gibt es jetzt für alle 5 Verbraucher (`invert_consumer_2` bis `invert_consumer_5`). Wird der invertierte Wert negativ, kehrt sich die Animationsrichtung um — der Verbraucher speist dann sichtbar ins Haus ein (z.B. für einen zweiten Solar-/Hybrid-Wechselrichter als "Verbraucher").
- **Pipe-Schwellenwert für alle Verbraucher:** Die bisher nur für Verbraucher 1 verfügbare Funktion „Pipe bei geringer Leistung ausblenden" inkl. Schwellenwert-Slider gibt es jetzt für alle 5 Verbraucher (`consumer_2_hide_pipe` … `consumer_5_hide_pipe` und zugehörige `_pipe_threshold`-Werte). Unterhalb des Schwellenwerts wird der komplette Verbraucher ausgeblendet (außer bei aktivem „Verbraucher bei null Watt anzeigen").
- **Kompakte Ansicht (evcc): alle Verbraucher:** Statt nur Verbraucher 1 ("EV") werden jetzt alle 5 zusätzlichen Verbraucher in der kompakten Ansicht dargestellt — in den unteren Brackets, im Balken-Split und in der Detailübersicht (Out-Spalte), jeweils mit ihrem konfigurierten Icon, Label und ihrer Farbe.
- **Diamant-Ansicht:** Das Layout aus PR #46 ist jetzt als eigene Option verfügbar (`diamond_view`): Solar oben, Netz links, Batterie rechts, Haus unten. Schließt sich mit der horizontalen Ansicht gegenseitig aus (der Editor schaltet die jeweils andere Option ab).
- **Boxen statt Kreise:** Neue Option `use_boxes` — alle Knoten werden als Boxen mit runden Ecken statt als Kreise dargestellt. Die Pfad-Andockpunkte liegen in Standard- und Horizontal-Ansicht ohnehin auf den Kantenmittelpunkten; für die diagonalen Andockpunkte der Diamant-Ansicht werden in Box-Modus angepasste Pfade verwendet, damit die Linien exakt an der Boxkante beginnen. Der Donut-Ring folgt ebenfalls dem Box-Radius.

### Changed
- **Box-Modus Typografie:** Bei aktivierten Boxen mit runden Ecken wird der zusätzliche Platz genutzt: Hauptwert 17 px statt 15 px, zweiter Sensor 12 px statt 10 px, beide Texte 3 px weiter nach unten versetzt.
- **Version auf v_2.6 angehoben** (Konsolen-Banner).
- **Card Editor aufgeräumt:** Der Bereich „Darstellung & Optionen" ist jetzt in vier optisch abgesetzte Gruppen unterteilt: „Layout & Ansicht" (Horizontal, Diamant, Boxen, Zoom), „Effekte & Darstellung" (Neon Glow, Comet Tail, Dashed Line, Donut, Hintergrund, Textfarben), „Röhren & Verbraucher" (inaktive Röhren, Verbraucher bei 0 W, Icons ausblenden) und „Kompakte Ansicht (evcc)" (Aktivierung + Details jetzt zusammen in einem Block).
- README aktualisiert: Hinweis auf bis zu 5 statt 3 zusätzliche Verbraucher, neue Optionen dokumentiert (Invert Grid, Invert Consumer, Hide Pipe für alle Verbraucher, Compact-View-Unterstützung).

### Notes
- Issue #64 ("Wert umkehren bei Netz Import/Export"): behoben durch `invert_grid`.
- Issue #65 ("Feature Anfrage Hybridwechselrichter"): nicht vollständig umgesetzt (würde einen eigenen Hybrid-Knoten mit eigenen Flüssen erfordern). Die neue Invert-Funktion für Verbraucher deckt den Kernanwendungsfall teilweise ab.
- PR #59 ("Hide consumer based on threshold value"): eingearbeitet und an den aktuellen Code-Stand angepasst (Schwellenwert-Logik korrigiert, sodass sie nur bei aktivem Schalter greift).
- PR #58 ("honor consumer_1_icon in compact_view"): nicht gemerged, durch die allgemeine Verbraucher-Unterstützung in der Kompakt-Ansicht (alle 5 statt nur Consumer 1) abgedeckt.
- PR #46 ("Diamond layout"): nachträglich als eigenständige Option `diamond_view` eingearbeitet (statt wie im PR das Standard-Layout zu ersetzen), inkl. Anpassung an horizontale Ansicht und Box-Modus.
