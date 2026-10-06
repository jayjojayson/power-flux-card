<img width="100%" height="auto" alt="power-flux-card" src="https://github.com/jayjojayson/power-flux-card/blob/main/docs/images/power-flow-card_eng.png" />  

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-blue.svg)](https://github.com/hacs/plugin)
[![HACS validation](https://img.shields.io/github/actions/workflow/status/jayjojayson/power-flux-card/validate.yml?label=HACS%20Validation)](https://github.com/jayjojayson/power-flux-card/actions?query=workflow%3Avalidate)
[![GitHub release](https://img.shields.io/github/release/jayjojayson/power-flux-card?include_prereleases=&sort=semver&color=blue)](https://github.com/jayjojayson/power-flux-card/releases)
![Downloads](https://img.shields.io/github/downloads/jayjojayson/power-flux-card/total?label=Downloads&color=blue)
[![README Deutsch](https://img.shields.io/badge/README-DE-orange)](https://github.com/jayjojayson/power-flux-card/blob/main/docs/README-de.md)
[![Support](https://img.shields.io/badge/%20-Support%20Me-steelblue?style=flat&logo=paypal&logoColor=white)](https://www.paypal.me/quadFlyerFW)
[![Stars](https://img.shields.io/github/stars/jayjojayson/power-flux-card)](https://github.com/jayjojayson/power-flux-card/stargazers)


# Power Flux Card 

The ⚡ Power Flux Card is an advanced, animated energy flow card for Home Assistant. It visualizes the power distribution between Solar, Grid, Battery, and Consumers with beautiful neon effects and diffrent animations.

If you like the Card, I would appreciate a Star rating ⭐ from you. 🤗

<img width="49%" height="auto" alt="power-flux-card" src="https://github.com/jayjojayson/power-flux-card/blob/main/docs/images/power-flux-card-ani.gif" /> <img width="49%" height="auto" alt="power-flux-card" src="https://github.com/jayjojayson/power-flux-card/blob/main/docs/images/power-flux-card.jpg" />  
<img width="49%" height="auto" alt="power-flux-card" src="https://github.com/jayjojayson/power-flux-card/blob/main/docs/images/power-flux-card-compact.jpg" /> <img width="49%" height="auto" alt="power-flux-card" src="https://github.com/jayjojayson/power-flux-card/blob/main/docs/images/power-flux-card-compact2.jpg" /> <img width="98%" height="auto" alt="power-flux-card" src="https://github.com/jayjojayson/power-flux-card/blob/main/docs/images/power-flux-card7.png" />

### ✨ Features

**Visualization**
- **Real-time animation**: Energy flows are drawn as moving particles. Speed and density follow the current power — the more power, the faster the flow.
- **Several layouts**: standard view, **horizontal** view (rotated 90°), **diamond** view (solar on top, grid left, battery right, house at the bottom), **rounded boxes** instead of circles, and the minimalist **compact view** (bar chart inspired by evcc).
- **Customizable appearance**: neon glow, donut chart around the house/grid, comet tail or dashed flow lines, tinted bubble background, colored text values, zoom, and individual colors per source and consumer (bubble, pipe, text, icon, secondary).
- **Flow rates on the pipes**: show the power (W/kW) directly on the pipes — switchable per source.
- **Units**: values switch automatically between W and kW (kW above 1000 W), or you force one unit for the whole card.
- **Labels, icons & secondary sensors**: every node gets its own label and icon, plus an optional secondary sensor (e.g. daily yield, charge power); consumers and the house also accept a **third sensor**.
- **Styling with UIX**: all colors, sizes and pipe opacities are CSS variables — including dynamic Jinja2 templates (see [Styling with UIX](#-styling-with-uix)).

**Sources, storage & consumers**
- **Solar**: one or **several solar sensors** (e.g. multiple inverters) are summed into one value.
- **Grid**: separate import/export entities **or** one combined entity (positive = import, negative = export), optional value inversion and an optional **grid threshold** that suppresses noise around 0 W.
- **Multiple batteries (up to 4)**: add up to three further batteries in the card editor. The pipe always shows the **sum**; the battery bubble can optionally be split into **ring segments** or a **pie** that shows the SoC of every battery.
- **Battery details**: a combined sensor or separate charge/discharge sensors, SoC, optional grid-to-battery sensor, charge routing via the house, power instead of SoC, hide below a charge level.
- **Up to 5 additional consumers** (e.g. EV, heater, pool) with their own icons, labels, colors, secondary/third sensor, standby filter and pipe threshold.
- **Bidirectional consumers**: invert a consumer's sensor value and the flow reverses into the house (e.g. a second solar/hybrid inverter modeled as a consumer).
- **House**: calculated automatically, or taken from your own total-consumption sensor.

**Operation**
- **More info**: tap any bubble to open the more-info dialog of its sensor.
- **Visual editor**: everything above is configurable in the Home Assistant UI — no YAML required.
- **Localization**: English and German.

[![Support](https://img.shields.io/badge/Features-Video%20german-steelblue?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/watch?v=HGFBJJRWGW0)

---

### 🚀 Installation

### HACS (Recommended)

- Add this repository via the link in Home Assistant.
 
   [![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=jayjojayson&repository=power-flux-card&category=plugin)

- The "Power Flux Card" should now be available in HACS. Click on "INSTALL".
- The resource will be automatically added to your Lovelace configuration.
- Create the file `power-flux-card.js` in the `/config/www/` folder.

#### HACS (manual)
1. Ensure HACS is installed.
2. Add this repository as a custom repository in HACS.
3. Search for "Power Flux Card" and install it.
4. Reload resources if prompted.

#### Manual Installation
1. Download `power-flux-card.js` from the [Releases](../../releases) page.
2. Upload it to `www/community/power-flux-card/` folder in Home Assistant.
3. Add the resource in your Dashboard configuration:
   - URL: `/local/community/power-flux-card/power-flux-card.js`
   - Type: JavaScript Module

---

### ⚙️ Configuration

You can configure the whole card in the visual editor of Home Assistant — no YAML needed. Add the card to a dashboard (**Add card → Power Flux Card**) and use the editor on the left. If you prefer YAML, every editor field has a matching key, listed in the [YAML reference](#yaml-reference).

**Contents:** [Quick start](#quick-start) · [Editor overview](#editor-overview) · [Solar](#solar) · [Grid](#grid) · [Battery](#battery) · [House & consumers](#house--additional-consumers) · [Labels, icons & secondary sensors](#labels-icons--secondary-sensors) · [Colors](#colors) · [Appearance & options](#appearance--options) · [Compact view](#compact-view-evcc) · [YAML reference](#yaml-reference) · [Full example](#full-example) · [Troubleshooting](#troubleshooting) · [Styling with UIX](#-styling-with-uix)

#### Quick start

A minimal configuration only needs your power sensors:

```yaml
type: custom:power-flux-card
entities:
  solar: sensor.solar_power
  grid_combined: sensor.grid_power   # positive = import, negative = export
  battery: sensor.battery_power      # positive = charging, negative = discharging
  battery_soc: sensor.battery_soc
```

Everything else is optional. The house consumption is calculated automatically from solar, grid and battery unless you provide your own sensor.

> **Units:** the card expects **Watts**. If one of your sensors reports kW, switch on the kW option of that node (see below) — the card then converts it for you.

#### Editor overview

The editor has two areas:

| Area | Contents |
|---|---|
| **Main Entities** | Four sub-pages: **Solar**, **Grid Connection**, **Battery** and **Additional Consumers** (which also holds the optional house sensor). Each sub-page contains the sensors, label, icon, secondary sensor, colors and the node-specific switches. |
| **Appearance & Options** | Card-wide settings in four groups: **Layout & View**, **Effects & Appearance**, **Pipes & Consumers** and **Compact View (evcc)**. |

#### Solar

*Editor: Main Entities → Solar*

| Setting | YAML key | What it does |
|---|---|---|
| Solar Sensor (W) | `entities.solar` | Current solar production. |
| Add another solar system | `entities.solar_extra` (list) | Additional solar sensors for multiple inverters. **All sensors are summed** and shown as one solar value. Tapping the bubble opens the first configured sensor. |
| Label / Icon | `solar_label`, `solar_icon` | Name and icon of the bubble. |
| Secondary Sensor | `entities.secondary_solar` | Shown in the bubble in addition to the main value, e.g. the daily yield. |
| Bubble / Pipe / Text / Icon / Secondary color | `color_solar`, `color_pipe_solar`, `color_text_solar`, `color_icon_solar`, `color_secondary_solar` | See [Colors](#colors). |
| Show label instead of secondary entity | `show_label_solar` | See [Labels, icons & secondary sensors](#labels-icons--secondary-sensors). |
| Show Solar in kW | `solar_unit_kw` | Enable it if your solar sensors **report kW**. The card converts to W. Applies to *all* solar sensors, so mixed units are not supported. |
| Show flow rates on pipes | `show_flow_rate_solar` | Shows the power on the solar pipes (default: on). |

```yaml
entities:
  solar: sensor.inverter_1_power
  solar_extra:
    - sensor.inverter_2_power
    - sensor.inverter_3_power
```

#### Grid

*Editor: Main Entities → Grid Connection*

The card supports three ways to describe the grid connection. Pick the one that matches your sensors:

| Your sensors | Configure | Behavior |
|---|---|---|
| **One sensor** with positive = import and negative = export | **Combined Grid Sensor** (`entities.grid_combined`) | The simplest setup. If set, it takes priority over the sensors below. |
| **Two sensors**, one for import and one for export | **Import** (`entities.grid`) and **Export** (`entities.grid_export`) | Both values are read independently (the sign of the export value is ignored). |
| **One sensor** that is signed (positive = import, negative = export) | **Import** (`entities.grid`) only | Negative values are treated as export. |

Further options on this page:

- **Label / Icon** (`grid_label`, `grid_icon`), **Secondary Sensor** (`entities.secondary_grid`) and the five **colors** (`color_grid`, `color_pipe_grid`, `color_text_grid`, `color_icon_grid`, `color_secondary_grid`).
- **Export colors and icon** (`color_export`, `color_pipe_export`, `color_text_export`, `color_icon_export`, `color_secondary_export`, `export_icon`): the grid bubble, its pipe, value and icon can use a different color — and the export bracket in the compact view a different icon — while power is being exported. Until you set them they follow the export *bubble* color.
- **Show label instead of secondary entity** (`show_label_grid`), **Show flow rates on pipes** (`show_flow_rate_grid`).
- **Show Grid in kW** (`grid_unit_kw`): enable it if your grid sensors **report kW**. The card converts to W.
- **Invert Power Value (+/-)** (`invert_grid`): flips the sign of the grid sensor (and the combined sensor) — for inverters that report export as positive and import as negative. The separate export sensor is not inverted.
- **Grid threshold (W)** (`grid_threshold`, 0–500 W, default `0` = off): import or export **below this value counts as 0 W**. A grid held at balance often hovers a few watts around zero, which makes the bubble flip between import and export all the time. Set e.g. `10` to calm the display. Import and export are checked separately. It applies to both the standard and the compact view; the calculated house consumption uses the cleaned values, so it can differ from the real value by up to the threshold.

```yaml
entities:
  grid_combined: sensor.grid_power
grid_threshold: 10
```

#### Battery

*Editor: Main Entities → Battery*

**Single battery**

| Setting | YAML key | What it does |
|---|---|---|
| Combined Battery Sensor (W) | `entities.battery` | One signed sensor: **positive = charging, negative = discharging**. |
| Battery Charge / Discharge Sensor | `entities.battery_charge`, `entities.battery_discharge` | Optional separate sensors. If set, they replace the combined sensor for the calculation. |
| State of Charge (%) | `entities.battery_soc` | Shown in the bubble. |
| Label / Icon | `battery_label`, `battery_icon` | Name and icon of the bubble. |
| Grid to Battery Sensor (W) | `entities.grid_to_battery` | Optional. If empty, the share charged from the grid is calculated (solar is used first, the rest comes from the grid). |
| Secondary Sensor | `entities.secondary_battery` | Additional value in the bubble (e.g. the current power). |
| Colors | `color_battery`, `color_pipe_battery`, `color_text_battery`, `color_icon_battery`, `color_secondary_battery` | See [Colors](#colors). |
| Show label instead of secondary entity | `show_label_battery` | See [Labels, icons & secondary sensors](#labels-icons--secondary-sensors). |
| Show battery power in kW | `battery_unit_kw` | Enable it if your battery sensors **report kW**. The card converts to W. |
| Show flow rates on pipes | `show_flow_rate_battery` | Shows the power on the battery pipes (default: on). |
| Invert Power Value (+/-) | `invert_battery` | For sensors with the opposite sign (charging negative / discharging positive, e.g. GivTCP or Solax). If the flow direction is wrong — for example a solar/grid → battery pipe while the battery discharges — switch this on. |
| Battery charge via house consumption | `battery_charge_via_house` | Removes the direct solar → battery and grid → battery pipes. The charging energy is routed through the house instead. |
| Show power instead of SoC | `battery_show_power` | The bubble shows the battery power instead of the state of charge. |

**Multiple batteries (up to 4)**

Use **Add another battery** to configure up to three more batteries — four in total. Every additional battery has its own sensor (combined **or** separate charge/discharge), its own SoC sensor, a "reports kW" switch and an "invert" switch, just like the primary battery. The additional batteries are stored in `entities.batteries_extra`.

```yaml
entities:
  battery: sensor.battery_1_power
  battery_soc: sensor.battery_1_soc
  batteries_extra:
    - power: sensor.battery_2_power
      soc: sensor.battery_2_soc
    - charge: sensor.battery_3_charge_power       # separate sensors instead of "power"
      discharge: sensor.battery_3_discharge_power
      soc: sensor.battery_3_soc
      unit_kw: false
      invert: false
```

How several batteries are combined:

- **Power:** charge and discharge power of all batteries are **summed**. The pipe, the flow rate and the house calculation always use the total.
- **SoC:** the bubble shows the **average** SoC of all batteries that have an SoC sensor.
- **Click:** tapping the bubble opens the more-info dialog of the battery sensor (the primary battery, or the first additional one if no primary sensor is set).
- This works in every layout, including the compact view.

**Showing every battery's SoC — two optional views** (active from 2 batteries, the switches exclude each other):

| Switch | YAML key | Result |
|---|---|---|
| Split: ring segments (SoC per battery) | `battery_split_ring` | The edge of the bubble is divided into equal arcs — one per battery. Each arc fills according to that battery's SoC (red at 20 % or below). Icon, name and the average SoC stay in the center. In box mode the ring follows the rounded rectangle. |
| Split: pie segments (max 4) | `battery_split_quarters` | The bubble is divided into sectors that always fill the whole circle: 2 batteries = two halves, 3 = two upper quarters + one lower half, 4 = four quarters. Each sector shows only that battery's SoC value (colored by charge level, red at 20 % or below). The large number in the center is the average SoC. |

**Hide the battery when it is empty:** switch off *Show Producers at zero watts* (see [Pipes & Consumers](#appearance--options)) and set **Hide battery below charge level (%)** (`battery_hide_soc_threshold`).

**Compact view:** with the compact view enabled, this page offers two full color rows — one for **charge** and one for **discharge** (`color_battery_charge…` and `color_battery_discharge…`).

#### House & additional consumers

*Editor: Main Entities → Additional Consumers*

**House (total consumption, optional)**

- **Sensor for House Consumption** (`entities.house`): without a sensor the card calculates the consumption (solar → house + grid → house + battery discharge). Set your own sensor to show the measured value — and to make the house bubble clickable (more-info).
- **Label, Icon** (`house_label`, `house_icon`), **Secondary** and **Third Sensor** (`entities.secondary_house`, `entities.tertiary_house`), **colors** (`color_house`, `color_text_house`, `color_icon_house`, `color_secondary_house`) and **Show label instead of secondary entity** (`show_label_house`).

**Consumers 1–5**

Up to five consumers with fixed positions: 1 = left (purple), 2 = center (orange), 3 = right (cyan), 4 = second row left (yellow), 5 = second row right (indigo). Click a consumer in the editor to expand its settings. Replace `N` with 1–5:

| Setting | YAML key | What it does |
|---|---|---|
| Entity | `entities.consumer_N` | The consumer's power sensor. |
| Label / Icon | `consumer_N_label`, `consumer_N_icon` | Name and icon. |
| Invert Sensor Value (+/-) | `invert_consumer_N` | Turns the consumer into a **producer**: if the (inverted) value is negative, the flow reverses and feeds the house (e.g. a second solar or hybrid inverter). |
| Sensor reports in kW | `consumer_N_unit_kw` | Enable it if the sensor reports kW. |
| Hide standby values + threshold | `consumer_N_standby`, `consumer_N_standby_threshold` | Readings below the threshold (0–100 W) count as 0 W, so a device idling at 1–3 W disappears completely (bubble and pipe). |
| Hide pipe at low power + threshold | `consumer_N_hide_pipe`, `consumer_N_pipe_threshold` | Hides only the pipe below the threshold (0–2000 W) — the bubble stays visible. |
| Secondary / Third Sensor | `entities.secondary_consumer_N`, `entities.tertiary_consumer_N` | Both are shown in one line, separated by ` / `, in the secondary color. |
| Colors | `color_consumer_N`, `color_pipe_consumer_N`, `color_text_consumer_N`, `color_icon_consumer_N`, `color_secondary_consumer_N` | See [Colors](#colors). |

Whether idle consumers are shown at all is controlled globally, see [Pipes & Consumers](#appearance--options).

#### Labels, icons & secondary sensors

- **Label** and **Icon** can be set for solar, grid, battery, house and every consumer. In the compact view the icons you set are used in the brackets and in the details list.
- The **secondary sensor** is shown inside the bubble. The **third sensor** (consumers and house only) shares its line, separated by ` / `.
- The label shows up in the bubble **only if no secondary sensor is configured** — a configured secondary sensor wins. To show the label instead, switch on **Show label instead of secondary entity** (`show_label_solar`, `show_label_grid`, `show_label_battery`, `show_label_house`). In the compact view, labels are only used in the details list.

#### Colors

Every source and consumer has up to five color pickers:

| Picker | Meaning |
|---|---|
| **Bubble** | Border/glow of the bubble (in the compact view: the bar segment). |
| **Pipe** | The pipe and the flow particles (compact view: the bracket line, which follows the icon color until you set a pipe color). |
| **Text** | The value text. |
| **Icon** | The icon. |
| **Secondary** | The secondary value or label (compact view: the label in the details list). |

The keys follow the pattern `color_<node>`, `color_pipe_<node>`, `color_text_<node>`, `color_icon_<node>` and `color_secondary_<node>`, where `<node>` is `solar`, `grid`, `export`, `battery`, `battery_charge`, `battery_discharge`, `house` (no pipe color) or `consumer_1` … `consumer_5`. Switch on **Colored Text Values** (`use_colored_values`) to color the value texts with the node colors. For colors that change with sensor values (e.g. a battery that turns red when it is nearly empty), see [Styling with UIX](#-styling-with-uix).

#### Appearance & options

*Editor: Appearance & Options*

**Layout & View**

| Setting | YAML key | Default | What it does |
|---|---|---|---|
| Horizontal View | `horizontal_view` | off | Rotates the standard layout by 90°. |
| Diamond View | `diamond_view` | off | Solar on top, grid left, battery right, house at the bottom. Ignored if the horizontal view is on. |
| Rounded boxes instead of circles | `use_boxes` | off | Draws every node as a rounded box. |
| Zoom (Standard View) | `zoom` | `0.9` | Scales the card between 0.3 and 1.0. |

**Effects & Appearance**

| Setting | YAML key | Default | What it does |
|---|---|---|---|
| Neon Glow | `show_neon_glow` | on | Glow around active bubbles and pipes. |
| Donut Chart (Grid/House) | `show_donut_border` | off | Ring around the grid and house bubble showing the energy mix. |
| Comet Tail Effect | `show_comet_tail` | off | Flow particles with a tail. |
| Dashed Line Effect | `show_dashed_line` | off | Flow shown as moving dashes. |
| Tinted Background in Bubbles | `show_tinted_background` | off | Slightly tinted bubble background in the standard view. |
| Colored Text Values | `use_colored_values` | off | Value texts use the node colors. |

**Pipes & Consumers**

| Setting | YAML key | Default | What it does |
|---|---|---|---|
| Hide Inactive Pipes | `hide_inactive_flows` | on | Pipes without flow are hidden. |
| Show Consumers at zero watts | `show_consumer_always` | off | Keeps consumers visible at 0 W. Off: consumers disappear when idle. |
| Show Producers at zero watts | `show_producer_always` | on | Off: solar and grid disappear at 0 W. The battery then hides based on its charge level (`battery_hide_soc_threshold`, 0–100 %), because its power can swing around zero. |
| Hide Consumer Icons | `hide_consumer_icons` | off | Hides the consumer icons. |
| Always show values in Watt / kW | `force_watt_display`, `force_kw_display` | off | By default values up to 1000 W are shown in W and above in kW. These switches force one unit for the whole card. Switching on one switches off the other. |
| Flow rates on pipes (global) | `show_flow_rates` | on | YAML only. Default for all `show_flow_rate_*` switches; the per-node switches override it. |

#### Compact view (evcc)

*Editor: Appearance & Options → Compact View (evcc)*

The compact view replaces the bubbles with a minimalist bar chart: the brackets above the bar show the sources (solar, grid, battery), the bar in the middle shows where the energy comes from, and the brackets below show where it goes (house, battery charging, export).

| Setting | YAML key | What it does |
|---|---|---|
| Enable Compact View | `compact_view` | Switches the card to the compact layout. |
| Compact View Details | `compact_details` | Adds a details list with all values below the bar. |
| Neon Glow in Compact View | `compact_glow` | Glow effect for the bar. |
| Place icons on the bracket line | `compact_icons_in_bracket` | Off: icons sit inside the brackets and the bracket line stays unbroken. On: icons are centered on the bracket line and interrupt it. |
| Include export in the bar | `compact_bar_selfuse` | Off: the bar shows the sources at full size and the export appears as a bracket below. On: the export becomes a colored segment in the bar, and solar/battery show only the share used in the house. |

In the compact view, consumers appear with their configured icons, labels and colors, and the battery can use separate charge and discharge colors.

#### YAML reference

All options at a glance. Options without a default are off/empty unless stated otherwise.

**`entities`**

| Key | Description |
|---|---|
| `solar` | Solar power sensor |
| `solar_extra` | List of additional solar sensors (summed with `solar`) |
| `grid` | Grid sensor (import, or signed if no export sensor is set) |
| `grid_export` | Separate export sensor |
| `grid_combined` | Combined grid sensor (positive = import, negative = export); takes priority |
| `battery` | Battery power sensor (positive = charging, negative = discharging) |
| `battery_charge`, `battery_discharge` | Separate charge / discharge sensors |
| `battery_soc` | Battery state of charge (%) |
| `grid_to_battery` | Direct grid → battery sensor |
| `batteries_extra` | List of up to 3 additional batteries: `power` **or** `charge` + `discharge`, plus `soc`, `unit_kw`, `invert` |
| `house` | Total consumption sensor (otherwise calculated) |
| `consumer_1` … `consumer_5` | Consumer sensors |
| `secondary_solar`, `secondary_grid`, `secondary_battery`, `secondary_house`, `secondary_consumer_N` | Secondary display sensors |
| `tertiary_house`, `tertiary_consumer_N` | Third display sensors |

**Nodes**

| Key | Default | Description |
|---|---|---|
| `solar_label`, `grid_label`, `battery_label`, `house_label`, `consumer_N_label` | – | Label |
| `solar_icon`, `grid_icon`, `battery_icon`, `house_icon`, `consumer_N_icon`, `export_icon` | – | Icon (e.g. `mdi:solar-power`) |
| `show_label_solar`, `show_label_grid`, `show_label_battery`, `show_label_house` | `false` | Show the label instead of the secondary sensor |
| `solar_unit_kw`, `grid_unit_kw`, `battery_unit_kw`, `consumer_N_unit_kw` | `false` | The sensor reports kW (converted to W) |
| `show_flow_rate_solar`, `show_flow_rate_grid`, `show_flow_rate_battery` | `true` | Flow rate on the pipes |
| `invert_grid`, `invert_battery`, `invert_consumer_N` | `false` | Invert the sensor sign |
| `grid_threshold` | `0` | Grid import/export below this value (W) counts as 0 |
| `battery_charge_via_house` | `false` | Route battery charging through the house |
| `battery_show_power` | `false` | Show power instead of SoC in the battery bubble |
| `battery_hide_soc_threshold` | `0` | Hide the battery at or below this SoC (needs `show_producer_always: false`) |
| `battery_split_ring`, `battery_split_quarters` | `false` | Multi-battery views (from 2 batteries, mutually exclusive) |
| `consumer_N_standby`, `consumer_N_standby_threshold` | `false`, `0` | Standby filter (W) |
| `consumer_N_hide_pipe`, `consumer_N_pipe_threshold` | `false`, `0` | Hide the pipe below a threshold (W) |
| `color_<node>`, `color_pipe_<node>`, `color_text_<node>`, `color_icon_<node>`, `color_secondary_<node>` | – | Colors (see [Colors](#colors)) |

**Card**

| Key | Default | Description |
|---|---|---|
| `zoom` | `0.9` | Scale 0.3–1.0 |
| `horizontal_view`, `diamond_view`, `use_boxes` | `false` | Layout |
| `show_neon_glow` | `true` | Neon glow |
| `show_donut_border`, `show_comet_tail`, `show_dashed_line`, `show_tinted_background`, `use_colored_values` | `false` | Effects |
| `hide_inactive_flows` | `true` | Hide pipes without flow |
| `show_consumer_always` | `false` | Show consumers at 0 W |
| `show_producer_always` | `true` | Show solar/grid at 0 W |
| `hide_consumer_icons` | `false` | Hide consumer icons |
| `force_watt_display`, `force_kw_display` | `false` | Force one unit |
| `show_flow_rates` | `true` | Global default for flow rates (YAML only) |
| `compact_view`, `compact_details`, `compact_glow`, `compact_icons_in_bracket`, `compact_bar_selfuse` | `false` | Compact view |

#### Full example

```yaml
type: custom:power-flux-card
zoom: 0.9
show_neon_glow: true
show_donut_border: true
entities:
  solar: sensor.inverter_1_power
  solar_extra:
    - sensor.inverter_2_power
  secondary_solar: sensor.solar_yield_today
  grid_combined: sensor.grid_power
  secondary_grid: sensor.grid_import_today
  battery: sensor.battery_1_power
  battery_soc: sensor.battery_1_soc
  batteries_extra:
    - power: sensor.battery_2_power
      soc: sensor.battery_2_soc
  house: sensor.house_power
  consumer_1: sensor.wallbox_power
  consumer_2: sensor.heat_pump_power
  consumer_3: sensor.pool_pump_power
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

#### Troubleshooting

- **The battery pipe points the wrong way** (e.g. a solar → battery pipe while the battery discharges, or no battery → house pipe): your integration reports the opposite sign. Switch on **Invert Power Value** in the *Battery* page (`invert_battery`). Use the one in the *Grid* page only for the grid sensor.
- **The grid bubble flickers between import and export** at a balanced grid: set a small **Grid threshold (W)**, e.g. 10.
- **Values are 1000× too small or large:** the sensor reports kW. Enable the kW switch of that node (`solar_unit_kw`, `grid_unit_kw`, `battery_unit_kw`, `consumer_N_unit_kw`).
- **A consumer never disappears although it is idle:** use **Hide standby values** for that consumer, and make sure **Show Consumers at zero watts** is off.
- **The editor still shows the old texts or options after an update:** clear the browser cache or hard-refresh the dashboard — Home Assistant caches the card file.
- **The secondary sensor hides my label:** a configured secondary sensor has priority. Switch on **Show label instead of secondary entity** for that node.

---

### 🎨 Styling with UIX

Besides the editor, you can style the card with CSS — including **dynamic colors based on sensor values**. This is done with **[UIX (UI eXtension)](https://uix.lf.technology/)**, the successor of the no-longer-developed card-mod. UIX supports Jinja2 templates in its styles, so you can change colors, sizes and pipe opacities depending on states.

<details>
   <summary> <b>Install UIX / migrate from card-mod</b></summary>

1. Install **UI eXtension** via HACS ([repository](https://github.com/Lint-Free-Technology/uix)).
2. UIX is an integration: after the download, add it in **Settings → Devices & services** and refresh your browser. Follow the [Quick Start](https://uix.lf.technology/quick-start/) of the UIX documentation.
3. **Coming from card-mod?** Uninstall card-mod (and remove its `extra_module_url` entry, if you used one, then restart Home Assistant). In your card YAML replace the key `card_mod:` with `uix:` — the contents stay the same:

```yaml
# before
card_mod:
  style: |
    :host {
      --neon-green: #00ff88;
    }

# after
uix:
  style: |
    :host {
      --neon-green: #00ff88;
    }
```

UIX documents its card-mod compatibility in the [FAQ](https://uix.lf.technology/faq/). All examples below use the `uix:` key.
</details>

<details>
   <summary> <b>Custom colors, sizes and pipe opacities with UIX and Jinja2 templates</b></summary>

With UIX you can dynamically override the CSS variables of the Power Flux Card using Jinja2 templates. The templates are evaluated by Home Assistant and update when the states change.

### Available CSS Variables

| Variable | Description |
|---|---|
| `--neon-yellow` | Bubble color Solar |
| `--neon-blue` | Bubble color Grid |
| `--neon-green` | Bubble color Battery |
| `--neon-pink` | Bubble color House |
| `--pipe-solar-color` | Pipe color Solar |
| `--pipe-grid-color` | Pipe color Grid |
| `--pipe-battery-color` | Pipe color Battery |
| `--icon-solar-color` | Icon color Solar |
| `--icon-grid-color` | Icon color Grid |
| `--icon-battery-color` | Icon color Battery |
| `--icon-house-color` | Icon color House |
| `--icon-consumer-1-color` | Icon color Consumer 1 |
| `--text-solar-color` | Text color Solar |
| `--text-grid-color` | Text color Grid |
| `--text-battery-color` | Text color Battery |
| `--text-house-color` | Text color House |
| `--text-consumer-1-color` | Text color Consumer 1 |
| `--consumer-1-color` | Bubble color Consumer 1 |
| `--consumer-2-color` | Bubble color Consumer 2 |
| `--consumer-3-color` | Bubble color Consumer 3 |
| `--export-color` | Export base color (grid node while exporting) |
| `--pipe-export-color` | Export pipe color (falls back to `--export-color`) |
| `--text-export-color` | Export value color (falls back to `--export-color`) |
| `--icon-export-color` | Export icon color (falls back to `--export-color`) |
| `--secondary-export-color` | Export label in the compact details list (falls back to `--text-export-color`) |
| `--pipe-solar-opacity` | Pipe opacity Solar (0 = hidden, 1 = visible) |
| `--pipe-grid-opacity` | Pipe opacity Grid (0 = hidden, 1 = visible) |
| `--pipe-battery-opacity` | Pipe opacity Battery (0 = hidden, 1 = visible) |
| `--pipe-consumer-1-opacity` | Pipe opacity Consumer 1 (0 = hidden, 1 = visible) |
| `--pipe-consumer-2-opacity` | Pipe opacity Consumer 2 (0 = hidden, 1 = visible) |
| `--pipe-consumer-3-opacity` | Pipe opacity Consumer 3 (0 = hidden, 1 = visible) |
| `--pipe-consumer-4-opacity` | Pipe opacity Consumer 4 (0 = hidden, 1 = visible) |
| `--pipe-consumer-5-opacity` | Pipe opacity Consumer 5 (0 = hidden, 1 = visible) |
| `--battery-charge-color` | Battery charge, bar segment (compact view) |
| `--pipe-battery-charge-color` | Battery charge, bracket line (compact view) |
| `--text-battery-charge-color` | Battery charge, value text (compact view) |
| `--icon-battery-charge-color` | Battery charge, icon (compact view) |
| `--secondary-battery-charge-color` | Battery charge, details label (compact view) |
| `--battery-discharge-color` | Battery discharge, bar segment (compact view) |
| `--pipe-battery-discharge-color` | Battery discharge, bracket line (compact view) |
| `--text-battery-discharge-color` | Battery discharge, value text (compact view) |
| `--icon-battery-discharge-color` | Battery discharge, icon (compact view) |
| `--secondary-battery-discharge-color` | Battery discharge, details label (compact view) |
| `--font-size-value` | Font size of the main value in the nodes (default 15px, 17px in box mode) |
| `--font-size-label` | Font size of the labels below the icons (default 9px) |
| `--font-size-secondary` | Font size of the secondary sensor value (default 10px, 12px in box mode) |
| `--font-size-secondary-dual` | Font size when the second **and** third sensor share one line (default 8px, 9px in box mode) |
| `--font-size-flow` | Font size of the flow rates on the pipes (default 10px) |
| `--icon-size` | Icon size inside the nodes (default 33px) |
| `--circle-size` | Node diameter, independent of zoom (default 90px) |

> **Note on sizes:** `--font-size-*` and `--icon-size` are purely visual and safe to change. `--circle-size` keeps each node centered on its anchor point, but the pipes always dock at the default 90px rim — small adjustments (roughly 80–100px) look fine, larger ones detach the pipes from the nodes.

**Example: larger text without scaling the whole card** (see Discussion #74)

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

### Example 1: Solar Icon — green during production, grey when idle

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

### Example 2: Grid text color — red on export, blue on import

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

### Example 3: Battery bubble — color based on State of Charge (SoC)

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

### Example 4: Consumer 1 pipe — visible only at high power, otherwise transparent

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

### Example 5: Solar pipe — hide below 30 W threshold

Hides the solar pipe when solar power falls below 30 W.

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

> **Note:** The Power Flux Card uses Shadow DOM (LitElement). Only CSS Custom Properties on `:host` work. The card reads the opacity variables internally and applies them directly to the pipe paths.

### Example 6: Multiple pipes — each hidden individually below 30 W

Hides solar, grid and battery pipes independently as soon as their value falls below 30 W.

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

> **Tip:** `| abs` is used for grid and battery since these sensors can report negative values (export / discharge). The threshold always refers to the absolute value.

### Example 7: All 5 consumer pipes — hide below individual thresholds

Each consumer pipe is controlled independently with its own threshold.

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

> **Note:** Each `--pipe-consumer-X-opacity` controls both the background pipe and the animated flow particles together. Set to `0` to fully hide, `1` to fully show.

> **Note:** UIX must be installed separately via HACS (see above). Templates are evaluated by Home Assistant, so colors change in real time when the states change.
</details>
