# Power Flux Card v2.0 ⚡

The **Power Flux Card** is an advanced, animated energy flow card for Home Assistant. It visualizes the power distribution between Solar, Grid, Battery, and Consumers with beautiful neon effects and smooth animations.

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

#### HACS (Recommended)
1. Ensure HACS is installed.
2. Add this repository as a custom repository in HACS.
3. Search for "Power Flux Card" and install it.
4. Reload resources if prompted.

#### Manual Installation
1. Download `power-flux-card.js` from the [Releases](../../releases) page.
2. Upload it to your `www` folder in Home Assistant.
3. Add the resource in your Dashboard configuration:
   - URL: `/local/power-flux-card.js`
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
