[![hacs_badge](https://img.shields.io/badge/HACS-Custom-blue.svg)](https://github.com/hacs/plugin)
[![HACS validation](https://img.shields.io/github/actions/workflow/status/jayjojayson/power-flux-card/validate.yml?label=HACS%20Validation)](https://github.com/jayjojayson/power-flux-card/actions?query=workflow%3Avalidate)
[![GitHub release](https://img.shields.io/github/release/jayjojayson/power-flux-card?include_prereleases=&sort=semver&color=blue)](https://github.com/jayjojayson/power-flux-card/releases)
![Downloads](https://img.shields.io/github/downloads/jayjojayson/power-flux-card/total?label=Downloads&color=blue)
[![README Deutsch](https://img.shields.io/badge/README-DE-orange)](https://github.com/jayjojayson/power-flux-card/blob/main/docs/README-de.md)
[![Support](https://img.shields.io/badge/%20-Support%20Me-steelblue?style=flat&logo=paypal&logoColor=white)](https://www.paypal.me/quadFlyerFW)
[![Stars](https://img.shields.io/github/stars/jayjojayson/power-flux-card)](https://github.com/jayjojayson/power-flux-card/stargazers)


# Power Flux Card

The ⚡ Power Flux Card is an advanced, animated energy flow card for Home Assistant. It visualizes the power distribution between Solar, Grid, Battery, and Consumers with beautiful neon effects and diffrent animations.

<img width="49%" height="auto" alt="power-flux-card" src="https://github.com/jayjojayson/power-flux-card/blob/main/docs/images/power-flux-card-ani.gif" /> <img width="49%" height="auto" alt="power-flux-card" src="https://github.com/jayjojayson/power-flux-card/blob/main/docs/images/power-flux-card.jpg" />  
<img width="50%" height="auto" alt="power-flux-card" src="https://github.com/jayjojayson/power-flux-card/blob/main/docs/images/power-flux-card-compact.jpg" />

### ✨ Features

- **Real-time Animation**: Visualizes energy flow with moving particles.
- **Multiple Sources & Consumers**: Supports Solar, Grid, Battery, and up to 3 additional consumers (e.g., EV, Heater, Pool).
- **Compact View**: A minimalist bar chart view (inspired by evcc).
- **Customizable Appearance**:
  - **Neon Glow**: Glowing effects for active power lines.
  - **Donut Chart**: Optional donut chart around the house icon showing energy mix.
  - **Comet Tail / Dashed Lines**: Choose your preferred animation style.
  - **Zoom**: Adjustable scale to fit your dashboard.
- **Localization**: Fully translated in English and German.
- **Visual Editor**: easy configuration via the Home Assistant UI.

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
