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
<img width="49%" height="auto" alt="power-flux-card" src="https://github.com/jayjojayson/power-flux-card/blob/main/docs/images/power-flux-card-compact.jpg" /> <img width="49%" height="auto" alt="power-flux-card" src="https://github.com/jayjojayson/power-flux-card/blob/main/docs/images/power-flux-card-compact2.jpg" />

### ✨ Features

- **Real-time Animation**: Visualizes energy flow with moving particles.
- **Multiple Sources & Consumers**: Supports Solar, Grid, Battery, and up to 3 additional consumers (e.g., EV, Heater, Pool).
- **Compact View**: A minimalist bar chart view (inspired by evcc).
- **Customizable Appearance**:
  - **Neon Glow**: Glowing effects for active power lines.
  - **Donut Chart**: Optional donut chart around the house icon showing energy mix.
  - **Comet Tail / Dashed Lines**: Choose your preferred animation style.
  - **Zoom**: Adjustable scale to fit your dashboard.
  - **Custom Colors**: Define custom colors for each source and consumer via the editor.
  - **Background Color**: Enable a slightly tinted background for the circles in the default view.
- **More Info**: Click on any source/consumer for detailed information in a more-info dialog.
- **Grid Import/Export**: Supports both separate Import/Export entities or a combined entity with positive/negative values.
- **Grid-to-Battery**: Optional direct sensor for Grid-to-Battery flow, bypassing the standard calculation.
- **Secondary Sensors**: Optionally display a secondary sensor value in the main circles (e.g., daily yield for Solar, current charge/discharge power for Battery) and consumer bubbles.
- **Localization**: Fully translated in English and German.
- **Visual Editor**: easy configuration via the Home Assistant UI.

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

You can configure the card directly via the visual editor in Home Assistant.

**Main Entities:**
- **Solar**: Power generation (W).
- **Grid**: Grid power (W). Positive = Import, Negative = Export (or separate entities).
- **Battery**: Battery power (W) and State of Charge (%).

**Additional Consumers:**
- You can add up to 3 individual consumers (e.g., Car, Heater, Pool) with custom icons and labels.

**Options:**
- **Zoom**: Adjust the size of the card.
- **Neon Glow**: Enable/disable the glowing effect.
- **Donut Chart**: Show the energy mix as a ring around the house.
- **Comet Tail / Dashed Line**: Change the flow animation style.
- **Compact View**: Switch to the bar chart layout.
- **Color Options**: Define custom colors for each source and consumer.
- **Grid Import/Export**: Configure separate or combined entities.
- **Grid-to-Battery**: Optional direct sensor for Grid-to-Battery flow.
- **Separate Battery Sensors**: Optional separate sensors for battery charge and discharge.
- **Secondary Sensors**: Display alternative values in the main circles (e.g., daily yield, current charge power).


<details>
   <summary> <b>Custom Colors with card_mod and Jinja2 Templates</b></summary> 

With the [card_mod](https://github.com/thomasloven/lovelace-card-mod) integration, you can dynamically override the CSS variables of the Power Flux Card using Jinja2 templates. This allows you to change colors based on sensor values — e.g., green solar icon during production, grey when idle.

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
| `--export-color` | Color for Export |

### Example 1: Solar Icon — green during production, grey when idle

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
        --icon-solar-color: #00ff88;
      {% else %}
        --icon-solar-color: #9e9e9e;
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
card_mod:
  style: |
    :host {
      {% if states('sensor.grid_power_combined') | float < 0 %}
        --text-grid-color: #ff3333;
      {% else %}
        --text-grid-color: #3b82f6;
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
card_mod:
  style: |
    :host {
      {% set soc = states('sensor.battery_soc') | float %}
      {% if soc > 80 %}
        --neon-green: #00ff88;
      {% elif soc > 30 %}
        --neon-green: #f59e0b;
      {% else %}
        --neon-green: #ff3333;
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
card_mod:
  style: |
    :host {
      {% if states('sensor.wallbox_power') | float > 500 %}
        --pipe-consumer-1-color: #a855f7;
        --icon-consumer-1-color: #a855f7;
      {% else %}
        --pipe-consumer-1-color: rgba(168, 85, 247, 0.2);
        --icon-consumer-1-color: #9e9e9e;
      {% endif %}
    }
```

### Example 5: Multiple colors at once — night mode (everything dimmed when Solar = 0)

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
      {% if states('sensor.solar_power') | float == 0 %}
        --icon-solar-color: #555555;
        --text-solar-color: #777777;
        --neon-yellow: #666633;
        --pipe-solar-color: #444422;
      {% endif %}
    }
```

> **Note:** card_mod must be installed separately via HACS. Templates are evaluated on every state update, so colors change in real time.
</details>
