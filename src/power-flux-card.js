import { } from "./power-flux-card-editor.js";
import lang_en from "./lang-en.js";
import lang_de from "./lang-de.js";

console.log(
  "%c⚡ Power Flux Card v_2.4.1 ready",
  "background: #d19525ff; color: #000; padding: 2px 6px; border-radius: 4px; font-weight: bold;"
);

(function (lang_en, lang_de) {
  const cardTranslations = {
    "en": lang_en.card,
    "de": lang_de.card
  };

  const LitElement = customElements.get("ha-lit-element") || Object.getPrototypeOf(customElements.get("home-assistant-main"));
  const html = LitElement.prototype.html;
  const css = LitElement.prototype.css;

  class PowerFluxCard extends LitElement {
    static get properties() {
      return {
        hass: {},
        config: {},
        _cardWidth: { state: true },
      };
    }

    _localize(key) {
      const lang = this.hass && this.hass.language ? this.hass.language : 'en';
      const dict = cardTranslations[lang] || cardTranslations['en'];
      return dict[key] || cardTranslations['en'][key] || key;
    }

    static async getConfigElement() {
      return document.createElement("power-flux-card-editor");
    }

    static getStubConfig() {
      return {
        zoom: 0.9,
        compact_view: false,
        compact_details: false,
        consumer_1_unit_kw: false,
        consumer_2_unit_kw: false,
        consumer_3_unit_kw: false,
        show_consumer_always: false,
        consumer_1_hide_pipe: false,
        consumer_1_pipe_threshold: 0,
        consumer_2_hide_pipe: false,
        consumer_2_pipe_threshold: 0,
        consumer_3_hide_pipe: false,
        consumer_3_pipe_threshold: 0,
        consumer_4_hide_pipe: false,
        consumer_4_pipe_threshold: 0,
        consumer_5_hide_pipe: false,
        consumer_5_pipe_threshold: 0,
        show_donut_border: false,
        show_neon_glow: true,
        show_comet_tail: false,
        show_dashed_line: false,
        show_tinted_background: false,
        hide_inactive_flows: true,
        show_flow_rate_solar: true,
        show_flow_rate_grid: true,
        show_flow_rate_battery: true,
        show_label_solar: false,
        show_label_grid: false,
        show_label_battery: false,
        show_label_house: false,
        use_colored_values: false,
        hide_consumer_icons: false,
        entities: {
          solar: "",
          grid: "",
          grid_export: "",
          grid_combined: "",
          battery: "",
          battery_soc: "",
          battery_charge: "",
          battery_discharge: "",
          house: "",
          consumer_1: "",
          consumer_2: "",
          consumer_3: ""
        }
      };
    }

    _handleClick(entityId) {
      if (!entityId) return;
      const event = new Event("hass-more-info", {
        bubbles: true,
        composed: true,
      });
      event.detail = { entityId };
      this.dispatchEvent(event);
    }

    setConfig(config) {
      if (!config.entities) {
        // Init allow
      }
      this.config = config;
    }

    firstUpdated() {
      this._resizeObserver = new ResizeObserver(entries => {
        for (const entry of entries) {
          if (entry.contentRect.width > 0) {
            this._cardWidth = entry.contentRect.width;
          }
        }
      });
      this._resizeObserver.observe(this);
    }

    updated(changedProps) {
      super.updated(changedProps);
      if (changedProps.has('hass') && this.hass) {
        const isDark = this.hass.themes?.darkMode !== false;
        if (isDark) {
          this.removeAttribute('data-theme-light');
        } else {
          this.setAttribute('data-theme-light', '');
        }
      }
      // Apply custom colors from config
      if (this.config) {
        const colorMap = {
          'color_solar': '--neon-yellow',
          'color_grid': '--neon-blue',
          'color_battery': '--neon-green',
          'color_export': '--export-color',
          'color_consumer_1': '--consumer-1-color',
          'color_consumer_2': '--consumer-2-color',
          'color_consumer_3': '--consumer-3-color',
          'color_consumer_4': '--consumer-4-color',
          'color_consumer_5': '--consumer-5-color',
          'color_pipe_solar': '--pipe-solar-color',
          'color_pipe_grid': '--pipe-grid-color',
          'color_pipe_battery': '--pipe-battery-color',
          'color_pipe_consumer_1': '--pipe-consumer-1-color',
          'color_pipe_consumer_2': '--pipe-consumer-2-color',
          'color_pipe_consumer_3': '--pipe-consumer-3-color',
          'color_pipe_consumer_4': '--pipe-consumer-4-color',
          'color_pipe_consumer_5': '--pipe-consumer-5-color',
          'color_house': '--neon-pink',
          'color_icon_solar': '--icon-solar-color',
          'color_icon_grid': '--icon-grid-color',
          'color_icon_battery': '--icon-battery-color',
          'color_icon_house': '--icon-house-color',
          'color_icon_consumer_1': '--icon-consumer-1-color',
          'color_icon_consumer_2': '--icon-consumer-2-color',
          'color_icon_consumer_3': '--icon-consumer-3-color',
          'color_icon_consumer_4': '--icon-consumer-4-color',
          'color_icon_consumer_5': '--icon-consumer-5-color',
          'color_text_solar': '--text-solar-color',
          'color_text_grid': '--text-grid-color',
          'color_text_battery': '--text-battery-color',
          'color_text_house': '--text-house-color',
          'color_text_consumer_1': '--text-consumer-1-color',
          'color_text_consumer_2': '--text-consumer-2-color',
          'color_text_consumer_3': '--text-consumer-3-color',
          'color_text_consumer_4': '--text-consumer-4-color',
          'color_text_consumer_5': '--text-consumer-5-color',
          'color_secondary_solar': '--secondary-solar-color',
          'color_secondary_grid': '--secondary-grid-color',
          'color_secondary_battery': '--secondary-battery-color',
          'color_secondary_house': '--secondary-house-color',
          'color_secondary_consumer_1': '--secondary-consumer-1-color',
          'color_secondary_consumer_2': '--secondary-consumer-2-color',
          'color_secondary_consumer_3': '--secondary-consumer-3-color',
          'color_secondary_consumer_4': '--secondary-consumer-4-color',
          'color_secondary_consumer_5': '--secondary-consumer-5-color',
        };
        for (const [configKey, cssVar] of Object.entries(colorMap)) {
          if (this.config[configKey]) {
            this.style.setProperty(cssVar, this.config[configKey]);
          } else {
            this.style.removeProperty(cssVar);
          }
        }
      }
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      if (this._resizeObserver) {
        this._resizeObserver.disconnect();
      }
    }

    static get styles() {
      return css`
      :host {
        display: block;
        --neon-yellow: #ffdd00;
        --neon-blue: #3b82f6;
        --neon-green: #00ff88;
        --neon-pink: #ff0080;
        --neon-red: #ff3333;
        --export-purple: #a855f7;
        --export-color: #ff3333;
        --consumer-1-color: #a855f7;
        --consumer-2-color: #f97316;
        --consumer-3-color: #06b6d4;
        --consumer-4-color: #eab308;
        --consumer-5-color: #6366f1;
        --pipe-solar-color: var(--neon-yellow);
        --pipe-grid-color: var(--neon-blue);
        --pipe-battery-color: var(--neon-green);
        --pipe-consumer-1-color: var(--consumer-1-color);
        --pipe-consumer-2-color: var(--consumer-2-color);
        --pipe-consumer-3-color: var(--consumer-3-color);
        --pipe-consumer-4-color: var(--consumer-4-color);
        --pipe-consumer-5-color: var(--consumer-5-color);
        --icon-solar-color: var(--neon-yellow);
        --icon-grid-color: var(--neon-blue);
        --icon-battery-color: var(--neon-green);
        --icon-house-color: var(--neon-pink);
        --icon-consumer-1-color: var(--consumer-1-color);
        --icon-consumer-2-color: var(--consumer-2-color);
        --icon-consumer-3-color: var(--consumer-3-color);
        --icon-consumer-4-color: var(--consumer-4-color);
        --icon-consumer-5-color: var(--consumer-5-color);
        --text-solar-color: var(--neon-yellow);
        --text-grid-color: var(--neon-blue);
        --text-battery-color: var(--neon-green);
        --text-house-color: var(--neon-pink);
        --text-consumer-1-color: var(--consumer-1-color);
        --text-consumer-2-color: var(--consumer-2-color);
        --text-consumer-3-color: var(--consumer-3-color);
        --text-consumer-4-color: var(--consumer-4-color);
        --text-consumer-5-color: var(--consumer-5-color);
        --secondary-solar-color: #888888;
        --secondary-grid-color: #888888;
        --secondary-battery-color: #888888;
        --secondary-house-color: #888888;
        --secondary-consumer-1-color: #888888;
        --secondary-consumer-2-color: #888888;
        --secondary-consumer-3-color: #888888;
        --secondary-consumer-4-color: #888888;
        --secondary-consumer-5-color: #888888;
        --flow-dasharray: 0 380; 
      }
      :host([data-theme-light]) {
        --neon-yellow: #c8a800;
        --neon-blue: #2563eb;
        --neon-green: #059669;
        --neon-pink: #db2777;
        --neon-red: #dc2626;
        --export-purple: #7c3aed;
        --export-color: #dc2626;
        --consumer-1-color: #7c3aed;
        --consumer-2-color: #ea580c;
        --consumer-3-color: #0891b2;
        --consumer-4-color: #ca8a04;
        --consumer-5-color: #4f46e5;
      }
      ha-card {
        padding: 0; 
        position: relative;
        overflow: hidden; 
        transition: height 0.3s ease;
      }
      
      /* --- COMPACT VIEW STYLES --- */
      .compact-container {
        padding: 16px 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-height: 120px;
        box-sizing: border-box;
      }

      .compact-bracket {
        height: 24px;
        width: 100%;
        position: relative;
      }
      .bracket-svg {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        overflow: visible; /* Important for icons */
      }
      .bracket-line {
        fill: none;
        stroke-width: 1.5;
        stroke-linecap: round;
        stroke-linejoin: round;
        transition: d 0.5s ease;
      }
      .compact-icon-wrapper {
        position: absolute;
        top: -6px; /* Default top, overridden inline */
        padding: 0 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: left 0.5s ease;
      }
      .compact-icon {
        --mdc-icon-size: 20px;
      }

      .compact-bar-wrapper {
        height: 36px;
        width: 100%;
        background: var(--card-background-color, #333);
        border-radius: 5px;
        margin: 4px 0;
        display: flex;
        overflow: hidden;
        position: relative;
      }

      .bar-segment {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        font-weight: bold;
        color: black; 
        transition: width 0.5s ease;
        white-space: nowrap;
        overflow: hidden;
      }

      /* --- COMPACT DETAILS STYLES --- */
      .compact-details {
        display: flex;
        gap: 12px;
        margin-top: 5px;
        padding: 10px 0px 4px;
      }
      .compact-details-column {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 4px;
        min-width: 0;
        border-right: 1px solid var(--divider-color, #444);
        padding-right: 8px;
      }
      .compact-details-header {
        font-size: 11px;
        font-weight: bold;
        text-transform: uppercase;
        text-align: right;
        opacity: 0.5;
        letter-spacing: 0.5px;
        margin-bottom: 2px;
        border-bottom: 1px solid var(--divider-color, #444);
      }
      .compact-detail-item {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 13px;
      }
      .compact-detail-item ha-icon {
        --mdc-icon-size: 17px;
        flex-shrink: 0;
      }
      .compact-detail-label {
        opacity: 0.7;
        white-space: nowrap;
      }
      .compact-detail-value {
        font-weight: bold;
        margin-left: auto;
      }
      
      /* --- STANDARD VIEW STYLES --- */
      .scale-wrapper {
        width: 420px; 
        transform-origin: top left; 
        transition: transform 0.1s linear;
      }

      .absolute-container {
        position: relative;
        width: 100%;
        transition: top 0.3s ease; 
      }

      .bubble {
        width: 90px;
        height: 90px;
        border-radius: 50%;
        background: transparent;
        border: 2px solid var(--divider-color, #333);
        display: block; 
        position: absolute;
        z-index: 2;
        transition: all 0.3s ease;
        box-sizing: border-box;
        cursor: pointer;
      }
      
      .bubble.tinted { background: rgba(255, 255, 255, 0.05); }
      .bubble.tinted.solar { background: color-mix(in srgb, var(--neon-yellow), transparent 85%); }
      .bubble.tinted.grid { background: color-mix(in srgb, var(--neon-blue), transparent 85%); }
      .bubble.tinted.grid.exporting { background: color-mix(in srgb, var(--export-color), transparent 85%); }
      .bubble.grid.exporting { border-color: var(--export-color); }
      .bubble.tinted.battery { background: color-mix(in srgb, var(--neon-green), transparent 85%); }
      .bubble.tinted.c1 { background: color-mix(in srgb, var(--consumer-1-color), transparent 85%); }
      .bubble.tinted.c2 { background: color-mix(in srgb, var(--consumer-2-color), transparent 85%); }
      .bubble.tinted.c3 { background: color-mix(in srgb, var(--consumer-3-color), transparent 85%); }
      .bubble.tinted.c4 { background: color-mix(in srgb, var(--consumer-4-color), transparent 85%); }
      .bubble.tinted.c5 { background: color-mix(in srgb, var(--consumer-5-color), transparent 85%); }

      .bubble.house { border-color: var(--neon-pink); }
      .bubble.house.tinted { background: color-mix(in srgb, var(--neon-pink), transparent 85%); }
      .bubble.house.donut { border: none !important; --house-gradient: var(--neon-pink); background: transparent; }
      .bubble.house.donut.tinted { background: color-mix(in srgb, var(--neon-pink), transparent 85%); }
      .bubble.house.donut::before {
          content: ""; position: absolute; inset: 0; border-radius: 50%; padding: 4px; 
          background: var(--house-gradient);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude; z-index: -1; pointer-events: none;
      }

      .bubble.grid.donut { border: none !important; background: transparent; }
      .bubble.grid.donut.tinted { background: color-mix(in srgb, var(--neon-blue), transparent 85%); }
      .bubble.grid.donut.tinted.exporting { background: color-mix(in srgb, var(--export-color), transparent 85%); }
      .bubble.grid.donut::before {
          content: ""; position: absolute; inset: 0; border-radius: 50%; padding: 4px;
          background: var(--grid-gradient, var(--neon-blue));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude; z-index: -1; pointer-events: none;
      }
      
      .icon-svg, .icon-custom {
          width: 33px; height: 33px; position: absolute; top: 10px; left: 50%; margin-left: -17px; z-index: 2; display: block;
      }
      .icon-custom { --mdc-icon-size: 34px; }
      
      .sub { 
        font-size: 9px; color: var(--secondary-text-color); text-transform: uppercase; letter-spacing: 0.5px;
        line-height: 1.1; z-index: 2; position: absolute; top: 46px; left: 0; width: 100%; text-align: center; margin: 0; pointer-events: none;
      }
      .sub.secondary-val {
        text-transform: none; letter-spacing: 0; font-weight: 500; font-size: 10px;
      }

      .value { 
        font-weight: bold; font-size: 15px; white-space: nowrap; z-index: 2; transition: color 0.3s ease;
        line-height: 1.2; position: absolute; bottom: 11px; left: 0; width: 100%; text-align: center; margin: 0;
      }
      .bubble.grid .value, .bubble.house .value { bottom: 15px; }
      .direction-arrow { font-size: 12px; margin-right: 0px; vertical-align: top; }
      
      @keyframes spin { 100% { transform: rotate(360deg); } }
      .spin-slow { animation: spin 12s linear infinite; transform-origin: center; }
      
      @keyframes pulse-opacity { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
      .pulse { animation: pulse-opacity 2s ease-in-out infinite; }

      @keyframes float-y { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-2px); } }
      .float { animation: float-y 3s ease-in-out infinite; }

      .solar { border-color: var(--neon-yellow); }
      .battery { border-color: var(--neon-green); }
      .grid { border-color: var(--neon-blue); }
      .c1 { border-color: var(--consumer-1-color); }
      .c2 { border-color: var(--consumer-2-color); }
      .c3 { border-color: var(--consumer-3-color); }
      .c4 { border-color: var(--consumer-4-color); }
      .c5 { border-color: var(--consumer-5-color); }
      .inactive { border-color: var(--secondary-text-color); }

      .glow.solar { box-shadow: 0 0 15px color-mix(in srgb, var(--neon-yellow), transparent 60%); }
      .glow.battery { box-shadow: 0 0 15px color-mix(in srgb, var(--neon-green), transparent 60%); }
      .glow.grid { box-shadow: 0 0 15px color-mix(in srgb, var(--neon-blue), transparent 60%); }
      .glow.grid.exporting { box-shadow: 0 0 15px color-mix(in srgb, var(--export-color), transparent 60%); }
      .glow.c1 { box-shadow: 0 0 15px color-mix(in srgb, var(--consumer-1-color), transparent 60%); }
      .glow.c2 { box-shadow: 0 0 15px color-mix(in srgb, var(--consumer-2-color), transparent 60%); }
      .glow.c3 { box-shadow: 0 0 15px color-mix(in srgb, var(--consumer-3-color), transparent 60%); }
      .glow.c4 { box-shadow: 0 0 15px color-mix(in srgb, var(--consumer-4-color), transparent 60%); }
      .glow.c5 { box-shadow: 0 0 15px color-mix(in srgb, var(--consumer-5-color), transparent 60%); }

      .node-solar { top: 70px; left: 5px; }     
      .node-grid { top: 70px; left: 165px; }     
      .node-battery { top: 70px; left: 325px; }  
      .node-house { top: 220px; left: 165px; }   
      .node-c1 { top: 370px; left: 5px; }
      .node-c2 { top: 370px; left: 165px; }
      .node-c3 { top: 370px; left: 325px; }
      .node-c4 { top: 470px; left: 85px; }
      .node-c5 { top: 470px; left: 245px; }

      svg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; pointer-events: none; }
      
      .bg-path { fill: none; stroke-width: 6; transition: opacity 0.3s ease; }
      .bg-solar { stroke: var(--pipe-solar-color); opacity: var(--pipe-solar-opacity, 1); }
      .bg-grid { stroke: var(--pipe-grid-color); opacity: var(--pipe-grid-opacity, 1); }
      .bg-battery { stroke: var(--pipe-battery-color); opacity: var(--pipe-battery-opacity, 1); }
      .bg-export { stroke: var(--export-color); }
      .bg-c1 { stroke: var(--pipe-consumer-1-color); opacity: var(--pipe-consumer-1-opacity, 1); }
      .bg-c2 { stroke: var(--pipe-consumer-2-color); opacity: var(--pipe-consumer-2-opacity, 1); }
      .bg-c3 { stroke: var(--pipe-consumer-3-color); opacity: var(--pipe-consumer-3-opacity, 1); }
      .bg-c4 { stroke: var(--pipe-consumer-4-color); opacity: var(--pipe-consumer-4-opacity, 1); }
      .bg-c5 { stroke: var(--pipe-consumer-5-color); opacity: var(--pipe-consumer-5-opacity, 1); }
      
      .flow-line { 
        fill: none; stroke-width: var(--flow-stroke-width, 8px); stroke-linecap: round; stroke-dasharray: var(--flow-dasharray);   
        animation: dash linear infinite; opacity: 0; transition: opacity 0.5s;
      }
      .flow-solar { stroke: var(--pipe-solar-color); opacity: var(--pipe-solar-opacity, 1); }
      .flow-grid { stroke: var(--pipe-grid-color); opacity: var(--pipe-grid-opacity, 1); }
      .flow-battery { stroke: var(--pipe-battery-color); opacity: var(--pipe-battery-opacity, 1); }
      .flow-export { stroke: var(--export-color); }

      @keyframes dash { to { stroke-dashoffset: -1500; } }

      .flow-text {
        font-size: 10px; font-weight: bold; text-anchor: middle; fill: #fff; transition: opacity 0.3s ease;
      }
      .flow-text.no-shadow { filter: none; }
      .text-solar { fill: var(--pipe-solar-color); }
      .text-grid { fill: var(--pipe-grid-color); }
      .text-export { fill: var(--export-color); }
      .text-battery { fill: var(--pipe-battery-color); }
    `;
    }

    // --- SVG ICON RENDERER ---
    _renderIcon(type, val = 0, colorOverride = null) {
      if (type === 'solar') {
        const animate = Math.round(val) > 0 ? 'spin-slow' : '';
        const color = colorOverride || 'var(--icon-solar-color)';
        return html`<svg class="icon-svg ${animate}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
      }
      if (type === 'grid') {
        const animate = Math.round(val) > 0 ? 'pulse' : '';
        const color = colorOverride || 'var(--icon-grid-color)';
        return html`<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L12 22"></path><path d="M5 8L19 8"></path><path d="M4 14L20 14"></path><path d="M2 22L22 22"></path><circle class="${animate}" cx="12" cy="4" r="4" fill="${color}" stroke="none"></circle></svg>`;
      }
      if (type === 'battery') {
        const soc = Math.min(Math.max(val, 0), 100) / 100;
        const rectHeight = 14 * soc;
        const rectY = 18 - rectHeight;
        const strokeColor = colorOverride || 'var(--icon-battery-color)';
        const rectColor = soc > 0.2 ? strokeColor : 'var(--neon-red)';
        return html`<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="12" height="16" rx="2" ry="2"></rect><line x1="10" y1="2" x2="14" y2="2"></line><rect x="7" y="${rectY}" width="10" height="${rectHeight}" fill="${rectColor}" stroke="none"></rect></svg>`;
      }
      if (type === 'house') {
        const strokeColor = colorOverride || 'var(--icon-house-color)';
        return html`<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`;
      }
      if (type === 'car') {
        const c = colorOverride || 'var(--icon-consumer-1-color)';
        return html`<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path><circle cx="7" cy="17" r="2"></circle><circle cx="17" cy="17" r="2"></circle><path d="M14 17h-5"></path></svg>`;
      }
      if (type === 'heater') {
        const c = colorOverride || 'var(--icon-consumer-2-color)';
        return html`<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20a4 4 0 0 0 4-4V8a4 4 0 0 0-8 0v8a4 4 0 0 0 4 4z"></path><path class="float" style="animation-delay: 0s;" d="M8 4c0-1.5 1-2 2-2s2 .5 2 2"></path><path class="float" style="animation-delay: 0.5s;" d="M14 4c0-1.5 1-2 2-2s2 .5 2 2"></path></svg>`;
      }
      if (type === 'pool') {
        const c = colorOverride || 'var(--icon-consumer-3-color)';
        return html`<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h20"></path><path class="float" d="M2 16c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2"></path><path d="M12 2v6"></path><path d="M9 5h6"></path></svg>`;
      }
      return html``;
    }

    _formatPower(val) {
      if (val === 0) return "0";
      if (Math.abs(val) >= 1000) {
        return (val / 1000).toFixed(1) + " kW";
      }
      return Math.round(val) + " W";
    }

    _getConsumerColor(index) {
      const style = getComputedStyle(this);
      return style.getPropertyValue(`--consumer-${index}-color`).trim() || ['#a855f7', '#f97316', '#06b6d4', '#eab308', '#6366f1'][index - 1];
    }

    _getConsumerPipeColor(index) {
      const style = getComputedStyle(this);
      return style.getPropertyValue(`--pipe-consumer-${index}-color`).trim() || this._getConsumerColor(index);
    }

    // --- DOM NODE SVG GENERATOR ---
    _renderSVGPath(d, color) {
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", d);
      path.setAttribute("class", "bracket-line");
      path.setAttribute("stroke", color);
      path.setAttribute("stroke-width", "1.5");
      path.setAttribute("fill", "none");
      path.style.stroke = color;
      path.style.fill = "none";
      return path;
    }

    // --- SQUARE BRACKET GENERATOR ---
    _createBracketPath(startPx, widthPx, direction) {
      if (widthPx < 5) return "";

      const r = 5;
      const startX = startPx;
      const endX = startPx + widthPx;

      let yBase, yLine;

      if (direction === 'down') {
        yBase = 24;
        yLine = 4;
      } else {
        yBase = 0;
        yLine = 20;
      }

      const height = Math.abs(yBase - yLine);
      const rEff = Math.min(r, height / 2, widthPx / 2);

      const yCorner = direction === 'down' ? yLine + rEff : yLine - rEff;

      return `
        M ${startX} ${yBase} 
        L ${startX} ${yCorner} 
        Q ${startX} ${yLine} ${startX + rEff} ${yLine} 
        L ${endX - rEff} ${yLine} 
        Q ${endX} ${yLine} ${endX} ${yCorner} 
        L ${endX} ${yBase}
      `;
    }

    // --- RENDER COMPACT VIEW ---
    _renderCompactView(entities) {
      // 1. Get Values
      const getVal = (entity) => {
        const state = this.hass.states[entity];
        return state ? parseFloat(state.state) || 0 : 0;
      };
      const getValUnit = (entity, unitKw) => {
        return getVal(entity) * (unitKw ? 1000 : 1);
      };

      const solar = entities.solar ? Math.max(0, getValUnit(entities.solar, this.config.solar_unit_kw === true)) : 0;
      const hasGridCombined = !!(entities.grid_combined && entities.grid_combined !== "");
      const gridCombinedVal = hasGridCombined ? getValUnit(entities.grid_combined, this.config.grid_unit_kw === true) : 0;
      const gridMain = hasGridCombined ? gridCombinedVal : (entities.grid ? getValUnit(entities.grid, this.config.grid_unit_kw === true) : 0);
      const gridExportSensor = entities.grid_export ? getValUnit(entities.grid_export, this.config.grid_unit_kw === true) : 0;
      let battery = entities.battery ? getValUnit(entities.battery, this.config.battery_unit_kw === true) : 0;
      if (this.config.invert_battery) {
        battery *= -1;
      }
      let c1Val = entities.consumer_1 ? getValUnit(entities.consumer_1, this.config.consumer_1_unit_kw === true) : 0; // EV Value
      if (this.config.invert_consumer_1) { c1Val *= -1; }
      c1Val = Math.abs(c1Val);

      // 2. Logic Calculation
      let gridImport = 0;
      let gridExport = 0;

      if (hasGridCombined) {
        // COMBINED SENSOR: positive = import, negative = export
        gridImport = gridCombinedVal > 0 ? gridCombinedVal : 0;
        gridExport = gridCombinedVal < 0 ? Math.abs(gridCombinedVal) : 0;
      } else if (entities.grid_export && entities.grid_export !== "") {
        gridImport = gridMain > 0 ? gridMain : 0;
        gridExport = Math.abs(gridExportSensor);
      } else {
        gridImport = gridMain > 0 ? gridMain : 0;
        gridExport = gridMain < 0 ? Math.abs(gridMain) : 0;
      }

      // Check for separate battery charge/discharge sensors
      const hasBattChargeSensor = !!(entities.battery_charge && entities.battery_charge !== "");
      const hasBattDischargeSensor = !!(entities.battery_discharge && entities.battery_discharge !== "");

      const batteryCharge = hasBattChargeSensor ? Math.abs(getVal(entities.battery_charge)) : (battery > 0 ? battery : 0);
      const batteryDischarge = hasBattDischargeSensor ? Math.abs(getVal(entities.battery_discharge)) : (battery < 0 ? Math.abs(battery) : 0);

      let solarToBatt = 0;
      let gridToBatt = 0;

      if (batteryCharge > 0) {
        const hasGridToBattSensor = !!(entities.grid_to_battery && entities.grid_to_battery !== "");
        if (this.config.battery_charge_via_house === true) {
          // Battery charges via house: no direct solar→batt or grid→batt pipes
          solarToBatt = 0;
          gridToBatt = 0;
        } else if (hasGridToBattSensor) {
          gridToBatt = Math.abs(getVal(entities.grid_to_battery));
          solarToBatt = Math.max(0, batteryCharge - gridToBatt);
        } else {
          if (solar >= batteryCharge) {
            solarToBatt = batteryCharge;
            gridToBatt = 0;
          } else {
            solarToBatt = solar;
            gridToBatt = batteryCharge - solar;
          }
        }
      }

      const solarTotalToCons = Math.max(0, solar - solarToBatt - gridExport);
      const gridTotalToCons = Math.max(0, gridImport - gridToBatt);
      const battTotalToCons = batteryDischarge;

      const totalCons = solarTotalToCons + gridTotalToCons + battTotalToCons;

      // Calculate Splits
      let evPower = 0;
      let housePower = totalCons;

      if (c1Val > 0 && totalCons > 0) {
        evPower = Math.min(c1Val, totalCons);
        housePower = totalCons - evPower;
      }

      // Calculate Total Bar Width (Flux)
      // The Bar represents: Battery Discharge + Solar + Grid Import
      // This MUST equal: House + EV + Export + Battery Charge

      // SOURCES (for Bar Segments)
      const srcBattery = batteryDischarge;
      const srcSolar = solar; // Solar includes Export + Charge + Cons
      const srcGrid = gridImport;

      const totalFlux = srcBattery + srcSolar + srcGrid;

      // DESTINATIONS (for Bottom Brackets)
      const destHouse = housePower;
      const destEV = evPower;
      const destExport = gridExport;
      // Note: Battery Charge is also a destination (internal flow), but usually not bracketed if we only want "Consumers"
      // If we don't bracket Charge, there will be a gap. We can accept that or add a Charge bracket.
      // Given user request "Only EV... and Grid Export", we stick to those.

      const threshold = 0.1;
      const availableWidth = (this._cardWidth && this._cardWidth > 0) ? this._cardWidth : (this.offsetWidth || 400);
      const fullWidth = availableWidth - 40;

      if (totalFlux <= threshold) {
        return html`<ha-card><div class="compact-container">Waiting for data...</div></ha-card>`;
      }

      // --- GENERATE BAR SEGMENTS (Aggregated by Source) ---
      // Order: Battery -> Solar -> Grid
      const barSegments = [];
      let currentX = 0;

      const addSegment = (val, color, type, label, entityId) => {
        if (val <= threshold) return;
        const pct = val / totalFlux;
        const width = pct * fullWidth;
        barSegments.push({
          val,
          color,
          widthPct: pct * 100,
          widthPx: width,
          startPx: currentX,
          type,
          label,
          entityId
        });
        currentX += width;
      }

      addSegment(srcBattery, 'var(--neon-green)', 'battery', 'battery', entities.battery);
      addSegment(srcSolar, 'var(--neon-yellow)', 'solar', 'solar', entities.solar);
      addSegment(srcGrid, 'var(--neon-blue)', 'grid', 'grid', entities.grid_combined || entities.grid);

      // --- GENERATE TOP BRACKETS (Based on Bar Segments) ---
      const topBrackets = barSegments.map(s => {
        const path = this._createBracketPath(s.startPx, s.widthPx, 'down');
        let icon = '';
        let iconColor = '';
        if (s.type === 'solar') { icon = 'mdi:weather-sunny'; iconColor = 'var(--icon-solar-color)'; }
        if (s.type === 'grid') { icon = 'mdi:transmission-tower'; iconColor = 'var(--icon-grid-color)'; }
        if (s.type === 'battery') { icon = 'mdi:battery-high'; iconColor = 'var(--icon-battery-color)'; }

        return { path, width: s.widthPx, center: s.startPx + (s.widthPx / 2), icon, iconColor, val: s.val, entityId: s.entityId };
      });

      // --- GENERATE BOTTOM BRACKETS (Independent Calculation) ---
      // Order: House -> EV -> Export
      const bottomBrackets = [];
      let bottomX = 0;

      const addBottomBracket = (val, type, entityId = null) => {
        if (val <= threshold) return;
        const pct = val / totalFlux;
        const width = pct * fullWidth;

        let icon = '';
        let iconColor = '';

        if (type === 'house') { icon = 'mdi:home'; iconColor = 'var(--icon-house-color)'; }
        if (type === 'car') { icon = 'mdi:car-electric'; iconColor = 'var(--icon-consumer-1-color)'; }
        if (type === 'export') { icon = 'mdi:arrow-right-box'; iconColor = 'var(--export-color)'; }
        if (type === 'battery') { icon = 'mdi:battery-charging-high'; iconColor = 'var(--icon-battery-color)'; }

        const path = this._createBracketPath(bottomX, width, 'up');
        bottomBrackets.push({
          path,
          width: width,
          center: bottomX + (width / 2),
          icon,
          iconColor,
          val,
          entityId
        });
        bottomX += width;
      };

      addBottomBracket(destHouse, 'house', entities.house);
      addBottomBracket(destEV, 'car', entities.consumer_1);
      addBottomBracket(destExport, 'export', entities.grid_combined || entities.grid_export || entities.grid);
      addBottomBracket(batteryCharge, 'battery', entities.battery);

      // Note: If there is Battery Charging happening, bottomX will not reach fullWidth. 
      // This leaves a gap at the end (or between segments depending on logic), which is visually correct 
      // as "Internal/Stored Energy" is not an external output.

      return html`
        <ha-card>
            <div class="compact-container">
                <!-- TOP BRACKETS -->
                <div class="compact-bracket">
                    <svg class="bracket-svg" width="100%" height="100%">
                        ${topBrackets.map(b => this._renderSVGPath(b.path, b.iconColor))}
                    </svg>
                    ${topBrackets.map(b => b.width > 20 ? html`
                    <div class="compact-icon-wrapper" 
                         style="left: ${b.center}px; transform: translateX(-50%); top: 4px; cursor: ${b.entityId ? 'pointer' : 'default'};"
                         title="${this._formatPower(b.val)}"
                         @click=${() => b.entityId && this._handleClick(b.entityId)}>
                        <ha-icon icon="${b.icon}" class="compact-icon" style="color: ${b.iconColor};"></ha-icon>
                    </div>` : '')}
                </div>

                <!-- MAIN BAR -->
                <div class="compact-bar-wrapper">
                    ${barSegments.map(s => {
                        const textColor = s.type === 'solar' && this.config.color_text_solar ? 'var(--text-solar-color)'
                          : s.type === 'grid' && this.config.color_text_grid ? 'var(--text-grid-color)'
                          : s.type === 'battery' && this.config.color_text_battery ? 'var(--text-battery-color)'
                          : (s.color === 'var(--export-purple)' ? 'white' : 'black');
                        return html`
                        <div class="bar-segment" 
                             style="width: ${s.widthPct}%; background: ${s.color}; color: ${textColor}; cursor: ${s.entityId ? 'pointer' : 'default'};"
                             title="${this._formatPower(s.val)}"
                             @click=${() => s.entityId && this._handleClick(s.entityId)}>
                            ${s.widthPx > 35 ? this._formatPower(s.val) : ''}
                        </div>
                    `})}
                </div>

                <!-- BOTTOM BRACKETS -->
                <div class="compact-bracket">
                    <svg class="bracket-svg" width="100%" height="100%">
                        ${bottomBrackets.map(b => this._renderSVGPath(b.path, b.iconColor))}
                    </svg>
                    ${bottomBrackets.map(b => b.width > 20 ? html`
                    <div class="compact-icon-wrapper" 
                         style="left: ${b.center}px; transform: translateX(-50%); top: -3px; cursor: ${b.entityId ? 'pointer' : 'default'};"
                         title="${this._formatPower(b.val)}"
                         @click=${() => b.entityId && this._handleClick(b.entityId)}>
                        <ha-icon icon="${b.icon}" class="compact-icon" style="color: ${b.iconColor};"></ha-icon>
                    </div>` : '')}
                </div>

                ${this.config.compact_details ? html`
                <!-- COMPACT DETAILS -->
                <div class="compact-details">
                    <!-- IN COLUMN -->
                    <div class="compact-details-column">
                        <div class="compact-details-header">In</div>
                        ${solar > 0 ? html`
                        <div class="compact-detail-item" @click=${() => entities.solar && this._handleClick(entities.solar)} style="cursor: ${entities.solar ? 'pointer' : 'default'};">
                            <ha-icon icon="mdi:weather-sunny" style="color: var(--icon-solar-color);"></ha-icon>
                            <span class="compact-detail-label">Solar</span>
                            <span class="compact-detail-value" style="color: var(--text-solar-color, var(--neon-yellow));">${this._formatPower(solar)}</span>
                        </div>` : ''}
                        ${gridImport > 0 ? html`
                        <div class="compact-detail-item" @click=${() => (entities.grid_combined || entities.grid) && this._handleClick(entities.grid_combined || entities.grid)} style="cursor: ${(entities.grid_combined || entities.grid) ? 'pointer' : 'default'};">
                            <ha-icon icon="mdi:transmission-tower" style="color: var(--icon-grid-color);"></ha-icon>
                            <span class="compact-detail-label">Grid</span>
                            <span class="compact-detail-value" style="color: var(--text-grid-color, var(--neon-blue));">${this._formatPower(gridImport)}</span>
                        </div>` : ''}
                        ${batteryDischarge > 0 ? html`
                        <div class="compact-detail-item" @click=${() => entities.battery && this._handleClick(entities.battery)} style="cursor: ${entities.battery ? 'pointer' : 'default'};">
                            <ha-icon icon="mdi:battery-arrow-down" style="color: var(--icon-battery-color);"></ha-icon>
                            <span class="compact-detail-label">Batterie</span>
                            <span class="compact-detail-value" style="color: var(--text-battery-color, var(--neon-green));">${this._formatPower(batteryDischarge)}</span>
                        </div>` : ''}
                    </div>
                    <!-- OUT COLUMN -->
                    <div class="compact-details-column">
                        <div class="compact-details-header">Out</div>
                        ${destHouse > 0 ? html`
                        <div class="compact-detail-item" @click=${() => entities.house && this._handleClick(entities.house)} style="cursor: ${entities.house ? 'pointer' : 'default'};">
                            <ha-icon icon="mdi:home" style="color: var(--icon-house-color);"></ha-icon>
                            <span class="compact-detail-label">Haus</span>
                            <span class="compact-detail-value" style="color: var(--text-house-color, var(--neon-pink));">${this._formatPower(destHouse)}</span>
                        </div>` : ''}
                        ${batteryCharge > 0 ? html`
                        <div class="compact-detail-item" @click=${() => entities.battery && this._handleClick(entities.battery)} style="cursor: ${entities.battery ? 'pointer' : 'default'};">
                            <ha-icon icon="mdi:battery-arrow-up" style="color: var(--icon-battery-color);"></ha-icon>
                            <span class="compact-detail-label">Batterie</span>
                            <span class="compact-detail-value" style="color: var(--text-battery-color, var(--neon-green));">${this._formatPower(batteryCharge)}</span>
                        </div>` : ''}
                        ${evPower > 0 ? html`
                        <div class="compact-detail-item" @click=${() => entities.consumer_1 && this._handleClick(entities.consumer_1)} style="cursor: ${entities.consumer_1 ? 'pointer' : 'default'};">
                            <ha-icon icon="mdi:car-electric" style="color: var(--icon-consumer-1-color);"></ha-icon>
                            <span class="compact-detail-label">${this.config.consumer_1_label || 'EV'}</span>
                            <span class="compact-detail-value" style="color: var(--consumer-1-color);">${this._formatPower(evPower)}</span>
                        </div>` : ''}
                        ${gridExport > 0 ? html`
                        <div class="compact-detail-item" @click=${() => (entities.grid_combined || entities.grid_export || entities.grid) && this._handleClick(entities.grid_combined || entities.grid_export || entities.grid)} style="cursor: ${(entities.grid_combined || entities.grid_export || entities.grid) ? 'pointer' : 'default'};">
                            <ha-icon icon="mdi:arrow-right-box" style="color: var(--export-color);"></ha-icon>
                            <span class="compact-detail-label">Export</span>
                            <span class="compact-detail-value" style="color: var(--export-color);">${this._formatPower(gridExport)}</span>
                        </div>` : ''}
                    </div>
                </div>` : ''}
            </div>
        </ha-card>
      `;
    }

    // --- RENDER STANDARD VIEW ---
    _renderStandardView(entities) {
      // FIX: Default to hidden unless explicitly set to false
      const hideInactive = this.config.hide_inactive_flows !== false;

      const globalFlowRate = this.config.show_flow_rates !== false;

      // FLOW RATE TOGGLES
      const showFlowSolar = this.config.show_flow_rate_solar !== undefined ? this.config.show_flow_rate_solar : globalFlowRate;
      const showFlowGrid = this.config.show_flow_rate_grid !== undefined ? this.config.show_flow_rate_grid : globalFlowRate;
      const showFlowBattery = this.config.show_flow_rate_battery !== undefined ? this.config.show_flow_rate_battery : globalFlowRate;

      // LABEL TOGGLES
      const showLabelSolar = this.config.show_label_solar === true;
      const showLabelGrid = this.config.show_label_grid === true;
      const showLabelBattery = this.config.show_label_battery === true;
      const showLabelHouse = this.config.show_label_house === true;

      const useColoredValues = this.config.use_colored_values === true;
      const showDonut = this.config.show_donut_border === true;
      const showTail = this.config.show_comet_tail === true;
      const showDashedLine = this.config.show_dashed_line === true;
      const showTint = this.config.show_tinted_background === true;
      const hideConsumerIcons = this.config.hide_consumer_icons === true;
      const showNeonGlow = this.config.show_neon_glow !== false;

      // CUSTOM LABELS
      const labelSolarText = this.config.solar_label || this._localize('card.label_solar');
      const labelGridText = this.config.grid_label || this._localize('card.label_grid');
      const labelBatteryText = this.config.battery_label || (entities.battery && this.hass.states[entities.battery] && this.hass.states[entities.battery].state > 0 ? '+' : '-') + " " + this._localize('card.label_battery');
      const labelHouseText = this.config.house_label || this._localize('card.label_house');
      // Secondary Sensor für Haus
      const hasSecondaryHouse = !!(entities.secondary_house && entities.secondary_house !== "");
      const getSecondaryVal = (entity) => {
        if (!entity) return '';
        const state = this.hass.states[entity];
        if (!state) return '';
        const val = parseFloat(state.state);
        if (isNaN(val)) return state.state + (state.attributes.unit_of_measurement ? ' ' + state.attributes.unit_of_measurement : '');
        const unit = state.attributes.unit_of_measurement || '';
        if (unit === 'W' || unit === 'Wh') {
          return this._formatPower(val);
        }
        if (unit === 'kWh' || unit === 'kW') {
          return val.toFixed(1) + ' ' + unit;
        }
        return val.toFixed(1) + (unit ? ' ' + unit : '');
      };

      // Resolve secondary sensor color based on entity key
      const getSecondaryColor = (entityKey) => {
        const colorMap = {
          'secondary_solar': '--secondary-solar-color',
          'secondary_grid': '--secondary-grid-color',
          'secondary_battery': '--secondary-battery-color',
          'secondary_house': '--secondary-house-color',
          'secondary_consumer_1': '--secondary-consumer-1-color',
          'secondary_consumer_2': '--secondary-consumer-2-color',
          'secondary_consumer_3': '--secondary-consumer-3-color',
          'secondary_consumer_4': '--secondary-consumer-4-color',
          'secondary_consumer_5': '--secondary-consumer-5-color'
        };
        const cssVar = colorMap[entityKey];
        if (cssVar) {
          const style = getComputedStyle(this);
          return style.getPropertyValue(cssVar).trim() || '#888888';
        }
        return '#888888';
      };

      // CUSTOM ICONS
      const iconSolar = this.config.solar_icon;
      const iconGrid = this.config.grid_icon;
      const iconBattery = this.config.battery_icon;

      // SECONDARY SENSORS (display only)
      const hasSecondarySolar = !!(entities.secondary_solar && entities.secondary_solar !== "");
      const hasSecondaryGrid = !!(entities.secondary_grid && entities.secondary_grid !== "");
      const hasSecondaryBattery = !!(entities.secondary_battery && entities.secondary_battery !== "");
      
      // Determine existence of main entities
      const hasSolar = !!(entities.solar && entities.solar !== "");
      const hasGridCombined = !!(entities.grid_combined && entities.grid_combined !== "");
      const hasGrid = !!(entities.grid && entities.grid !== "") || hasGridCombined;
      const hasBattery = !!(entities.battery && entities.battery !== "");

      const styleSolar = hasSolar ? '' : 'display: none;';
      const styleGrid = hasGrid ? '' : 'display: none;';
      const styleBattery = hasBattery ? '' : 'display: none;';

      const textClass = showNeonGlow ? 'flow-text' : 'flow-text no-shadow';

      // Custom Labels for Consumers
      const labelC1 = this.config.consumer_1_label || this._localize('card.label_car');
      const labelC2 = this.config.consumer_2_label || this._localize('card.label_heater');
      const labelC3 = this.config.consumer_3_label || this._localize('card.label_pool');

      const getVal = (entity) => {
        const state = this.hass.states[entity];
        return state ? parseFloat(state.state) || 0 : 0;
      };
      const getValKw = (entity, isKw) => {
        return getVal(entity) * (isKw ? 1000 : 1);
      };
      // Consumer 4 & 5
      let c4Val = entities.consumer_4 ? getValKw(entities.consumer_4, this.config.consumer_4_unit_kw === true) : 0;
      let c5Val = entities.consumer_5 ? getValKw(entities.consumer_5, this.config.consumer_5_unit_kw === true) : 0;
      c4Val = Math.abs(c4Val);
      c5Val = Math.abs(c5Val);

      let c1Val = entities.consumer_1 ? getValKw(entities.consumer_1, this.config.consumer_1_unit_kw === true) : 0;
      if (this.config.invert_consumer_1) { c1Val *= -1; }
      c1Val = Math.abs(c1Val);
      const c2Val = entities.consumer_2 ? getValKw(entities.consumer_2, this.config.consumer_2_unit_kw === true) : 0;
      const c3Val = entities.consumer_3 ? getValKw(entities.consumer_3, this.config.consumer_3_unit_kw === true) : 0;

      const alwaysShowConsumer = this.config.show_consumer_always === true;

      // Consumer 1 pipe threshold
      const hideC1Pipe = this.config.consumer_1_hide_pipe === true;
      const c1PipeThreshold = this.config.consumer_1_pipe_threshold || 0;
      const showC1 = (entities.consumer_1 && (alwaysShowConsumer || Math.round(c1Val) > c1PipeThreshold));
      const c1PipeActive = showC1 && (!hideC1Pipe || c1Val >= c1PipeThreshold);

      // Consumer 2 pipe threshold
      const hideC2Pipe = this.config.consumer_2_hide_pipe === true;
      const c2PipeThreshold = this.config.consumer_2_pipe_threshold || 0;
      const showC2 = (entities.consumer_2 && (alwaysShowConsumer || Math.round(c2Val) > c2PipeThreshold));
      const c2PipeActive = showC2 && (!hideC2Pipe || c2Val >= c2PipeThreshold);

      // Consumer 3 pipe threshold
      const hideC3Pipe = this.config.consumer_3_hide_pipe === true;
      const c3PipeThreshold = this.config.consumer_3_pipe_threshold || 0;
      const showC3 = (entities.consumer_3 && (alwaysShowConsumer || Math.round(c3Val) > c3PipeThreshold));
      const c3PipeActive = showC3 && (!hideC3Pipe || c3Val >= c3PipeThreshold);

      // Consumer 4 pipe threshold
      const hideC4Pipe = this.config.consumer_4_hide_pipe === true;
      const c4PipeThreshold = this.config.consumer_4_pipe_threshold || 0;
      const showC4 = (entities.consumer_4 && (alwaysShowConsumer || Math.round(c4Val) > c4PipeThreshold));
      const c4PipeActive = showC4 && (!hideC4Pipe || c4Val >= c4PipeThreshold);

      // Consumer 5 pipe threshold
      const hideC5Pipe = this.config.consumer_5_hide_pipe === true;
      const c5PipeThreshold = this.config.consumer_5_pipe_threshold || 0;
      const showC5 = (entities.consumer_5 && (alwaysShowConsumer || Math.round(c5Val) > c5PipeThreshold));
      const c5PipeActive = showC5 && (!hideC5Pipe || c5Val >= c5PipeThreshold);
      
      const anyBottomVisible = showC1 || showC2 || showC3 || showC4 || showC5;

      const solar = hasSolar ? getValKw(entities.solar, this.config.solar_unit_kw === true) : 0;
      const gridCombinedVal = hasGridCombined ? getValKw(entities.grid_combined, this.config.grid_unit_kw === true) : 0;
      const gridMain = hasGridCombined ? gridCombinedVal : (hasGrid ? getValKw(entities.grid, this.config.grid_unit_kw === true) : 0);
      const gridExpSensor = (hasGrid && entities.grid_export) ? getValKw(entities.grid_export, this.config.grid_unit_kw === true) : 0;
      let battery = hasBattery ? getValKw(entities.battery, this.config.battery_unit_kw === true) : 0;
      if (this.config.invert_battery) {
        battery *= -1;
      }
      const battSoc = (hasBattery && entities.battery_soc) ? getVal(entities.battery_soc) : 0;

      const solarVal = Math.max(0, solar);

      let gridImport = 0;
      let gridExport = 0;

      if (hasGrid) {
        if (hasGridCombined) {
          // COMBINED SENSOR: positive = import, negative = export
          gridImport = gridCombinedVal > 0 ? gridCombinedVal : 0;
          gridExport = gridCombinedVal < 0 ? Math.abs(gridCombinedVal) : 0;
        } else if (entities.grid_export && entities.grid_export !== "") {
          gridImport = gridMain > 0 ? gridMain : 0;
          gridExport = Math.abs(gridExpSensor);
        } else {
          gridImport = gridMain > 0 ? gridMain : 0;
          gridExport = gridMain < 0 ? Math.abs(gridMain) : 0;
        }
      }

      // Check for separate battery charge/discharge sensors
      const hasBattChargeSensor = !!(entities.battery_charge && entities.battery_charge !== "");
      const hasBattDischargeSensor = !!(entities.battery_discharge && entities.battery_discharge !== "");

      const batteryCharge = hasBattChargeSensor ? Math.abs(getVal(entities.battery_charge)) : (battery > 0 ? battery : 0);
      const batteryDischarge = hasBattDischargeSensor ? Math.abs(getVal(entities.battery_discharge)) : (battery < 0 ? Math.abs(battery) : 0);

      let solarToBatt = 0;
      let gridToBatt = 0;

      // Battery charge via house toggle
      const batteryChargeViaHouse = this.config.battery_charge_via_house === true;

      if (hasBattery && batteryCharge > 0) {
        const hasGridToBattSensor = !!(entities.grid_to_battery && entities.grid_to_battery !== "");
        if (batteryChargeViaHouse) {
          // Battery charges via house: no direct solar→batt or grid→batt pipes
          solarToBatt = 0;
          gridToBatt = 0;
        } else if (hasGridToBattSensor) {
          // Use dedicated grid-to-battery sensor
          gridToBatt = Math.abs(getVal(entities.grid_to_battery));
          solarToBatt = Math.max(0, batteryCharge - gridToBatt);
        } else {
          // Calculate: solar prioritized
          if (solarVal >= batteryCharge) {
            solarToBatt = batteryCharge;
            gridToBatt = 0;
          } else {
            solarToBatt = solarVal;
            gridToBatt = batteryCharge - solarVal;
          }
        }
      }

      const solarToHouse = Math.max(0, solarVal - solarToBatt - gridExport);
      const gridToHouse = Math.max(0, gridImport - gridToBatt);
      const house = solarToHouse + gridToHouse + batteryDischarge;

      // Use house entity for display if defined, otherwise use calculated value
      const houseDisplay = (entities.house && entities.house !== "") ? getVal(entities.house) : house;

      // Solar→Batt arc only visible when battery is actively charging and not via house
      const styleSolarBatt = (hasSolar && hasBattery && batteryCharge > 0 && !batteryChargeViaHouse) ? '' : 'display: none;';
      // Grid→Batt pipe: only hide if entities missing; actual visibility handled by getPipeStyle (hideInactive)
      const styleGridBatt = (hasGrid && hasBattery) ? '' : 'display: none;';

      const isTopArcActive = (solarToBatt > 0) && !batteryChargeViaHouse;
      const hasTopRow = hasSolar || hasGrid || hasBattery;
      const topShift = !hasTopRow ? 190 : ((isTopArcActive || (!hideInactive && hasSolar && hasBattery && batteryCharge > 0 && !batteryChargeViaHouse)) ? 0 : 50);
      const anyRow2Visible = showC4 || showC5;
      let baseHeight = anyRow2Visible ? 580 : (anyBottomVisible ? 480 : 340);
      const contentHeight = baseHeight - topShift;

      const designWidth = 420;
      const availableWidth = this._cardWidth || designWidth;
      let scale = availableWidth / designWidth;
      const userZoom = this.config.zoom !== undefined ? this.config.zoom : 0.9;
      scale = scale * userZoom;

      if (scale < 0.5) scale = 0.5;
      if (scale > 1.5) scale = 1.5;

      const finalCardHeightPx = contentHeight * scale;
      const visualWidth = 420 * scale;
      const centerMarginLeft = Math.max(0, (availableWidth - visualWidth) / 2);

      let houseGradientVal = '';
      let houseTextCol = useColoredValues ? 'var(--neon-pink)' : '';
      const tintClass = showTint ? 'tinted' : '';
      const glowClass = showNeonGlow ? 'glow' : '';

      let houseDominantColor = 'var(--neon-pink)';
      if (house > 0) {
        if (solarToHouse >= gridToHouse && solarToHouse >= batteryDischarge) {
          houseDominantColor = 'var(--neon-yellow)';
        } else if (gridToHouse >= solarToHouse && gridToHouse >= batteryDischarge) {
          houseDominantColor = 'var(--neon-blue)';
        } else if (batteryDischarge >= solarToHouse && batteryDischarge >= gridToHouse) {
          houseDominantColor = 'var(--neon-green)';
        }
      }

      if (showDonut) {
        if (house > 0) {
          const pctSolar = (solarToHouse / house) * 100;
          const pctGrid = (gridToHouse / house) * 100;
          const pctBatt = (batteryDischarge / house) * 100;

          let stops = [];
          let current = 0;
          if (pctSolar > 0) { stops.push(`var(--neon-yellow) ${current}% ${current + pctSolar}%`); current += pctSolar; }
          if (pctBatt > 0) { stops.push(`var(--neon-green) ${current}% ${current + pctBatt}%`); current += pctBatt; }
          if (pctGrid > 0) { stops.push(`var(--neon-blue) ${current}% ${current + pctGrid}%`); current += pctGrid; }
          if (current < 99.9) { stops.push(`var(--neon-pink) ${current}% 100%`); }

          houseGradientVal = `conic-gradient(from 330deg, ${stops.join(', ')})`;

          if (useColoredValues) {
            const maxVal = Math.max(solarToHouse, gridToHouse, batteryDischarge);
            if (maxVal > 0) {
              if (maxVal === solarToHouse) houseTextCol = 'var(--neon-yellow)';
              else if (maxVal === gridToHouse) houseTextCol = 'var(--neon-blue)';
              else if (maxVal === batteryDischarge) houseTextCol = 'var(--neon-green)';
            } else {
              houseTextCol = 'var(--neon-pink)';
            }
          }
        } else {
          houseGradientVal = `var(--neon-pink)`;
          houseTextCol = useColoredValues ? 'var(--neon-pink)' : '';
        }
      } else {
        houseTextCol = useColoredValues ? 'var(--neon-pink)' : '';
      }

      const houseTintStyle = showTint
        ? `background: color-mix(in srgb, ${houseDominantColor}, transparent 85%);`
        : '';

      const houseGlowStyle = showNeonGlow
        ? `box-shadow: 0 0 15px color-mix(in srgb, ${houseDominantColor}, transparent 60%);`
        : `box-shadow: none;`;

      const houseBubbleStyle = `${showDonut ? `--house-gradient: ${houseGradientVal};` : ''} ${houseTintStyle} ${houseGlowStyle}`;

      const isSolarActive = Math.round(solarVal) > 0;
      const isGridActive = Math.round(gridImport) > 0 || Math.round(gridExport) > 0;
      const isGridExporting = Math.round(gridExport) > 0 && Math.round(gridImport) === 0;

      // --- Grid Donut Gradient ---
      let gridGradientVal = '';
      if (showDonut && hasGrid && isGridActive) {
        const gridTotal = gridToHouse + gridToBatt + gridExport;
        if (gridTotal > 0) {
          const gPctToHouse = (gridToHouse / gridTotal) * 100;
          const gPctToBatt = (gridToBatt / gridTotal) * 100;
          const gPctExport = (gridExport / gridTotal) * 100;
          let gStops = [];
          let gCurrent = 0;
          if (gPctToHouse > 0) { gStops.push(`var(--neon-blue) ${gCurrent}% ${gCurrent + gPctToHouse}%`); gCurrent += gPctToHouse; }
          if (gPctToBatt > 0) { gStops.push(`var(--neon-green) ${gCurrent}% ${gCurrent + gPctToBatt}%`); gCurrent += gPctToBatt; }
          if (gPctExport > 0) { gStops.push(`var(--export-color) ${gCurrent}% ${gCurrent + gPctExport}%`); gCurrent += gPctExport; }
          if (gCurrent < 99.9) { gStops.push(`var(--neon-blue) ${gCurrent}% 100%`); }
          gridGradientVal = `conic-gradient(from 330deg, ${gStops.join(', ')})`;
        } else {
          gridGradientVal = isGridExporting ? 'var(--export-color)' : 'var(--neon-blue)';
        }
      }

      const solarColor = isSolarActive ? 'var(--icon-solar-color)' : 'var(--secondary-text-color)';
      const gridColor = isGridExporting ? 'var(--export-color)' : (isGridActive ? 'var(--neon-blue)' : 'var(--secondary-text-color)');
      const gridIconColor = (isGridActive && this.config.color_icon_grid) ? 'var(--icon-grid-color)' : gridColor;
      const gridTextColor = (isGridActive && this.config.color_text_grid) ? 'var(--text-grid-color)' : gridColor;

      const getAnimStyle = (val, opVar = null) => {
        if (val <= 1) return "opacity: 0;";

        // --- Dynamic speed based on power ---
        // Higher power = faster animation (shorter duration)
        // Range: 2s (very fast, ~5000W+) to 12s (slow, ~50W)
        const minDuration = 4;
        const maxDuration = 12;
        const factor = 12000;
        let duration = factor / val;
        duration = Math.max(minDuration, Math.min(maxDuration, duration));

        // --- Dynamic particle density based on power ---
        // Higher power = more/denser particles (shorter gap)
        // Lower power = fewer/sparse particles (longer gap)
        let dashSize, gapSize;
        if (showTail) {
          // Comet tail: vary tail length with power
          dashSize = Math.round(15 + (val / 200) * 25); // 15-40
          dashSize = Math.min(dashSize, 40);
          gapSize = Math.round(380 - (val / 200) * 200); // 380-180
          gapSize = Math.max(gapSize, 180);
        } else if (showDashedLine) {
          // Dashed line: vary dash density
          dashSize = Math.round(8 + (val / 500) * 10); // 8-18
          dashSize = Math.min(dashSize, 18);
          gapSize = Math.round(18 - (val / 1000) * 10); // 18-8
          gapSize = Math.max(gapSize, 8);
          duration = duration * 5; // Dashed lines are slower
        } else {
          // Default dots: vary dot count/density
          dashSize = 0;  // stays as dots
          gapSize = Math.round(380 - (val / 200) * 250); // 380-130
          gapSize = Math.max(gapSize, 130);
        }

        const dynamicDash = `${dashSize} ${gapSize}`;

        const opStr = opVar ? `var(${opVar}, 1)` : '1';
        return `opacity: ${opStr}; animation-duration: ${duration}s; stroke-dasharray: ${dynamicDash};`;
      };

      const getPipeStyle = (val, opVar = null) => {
        const op = opVar ? `calc(var(${opVar}, 1) * 0.2)` : '0.2';
        if (!hideInactive) return `opacity: ${op};`;
        return val > 1 ? `opacity: ${op};` : "opacity: 0;";
      };

      const getTextStyle = (val, type) => {
        let isVisible = false;
        if (type === 'solar') isVisible = showFlowSolar;
        else if (type === 'grid') isVisible = showFlowGrid;
        else if (type === 'battery') isVisible = showFlowBattery;

        if (!isVisible) return "display: none;";
        return val > 5 ? "opacity: 1;" : "opacity: 0;";
      };

      const getColorStyle = (colorVar) => {
        return useColoredValues ? `color: var(${colorVar});` : '';
      };
      const getConsumerColorStyle = (hex) => {
        return useColoredValues ? `color: ${hex};` : '';
      }

      const renderLabel = (text, isVisible) => {
        if (!isVisible) return html``;
        return html`<div class="sub">${text}</div>`;
      };

      const renderSecondaryOrLabel = (labelText, showLabel, secondaryEntity, hasSecondary, entityKey = null) => {
        if (hasSecondary) {
          const secVal = getSecondaryVal(secondaryEntity);
          const secColor = entityKey ? getSecondaryColor(entityKey) : '#888888';
          return html`<div class="sub secondary-val" style="color: ${secColor};">${secVal}</div>`;
        }
        return renderLabel(labelText, showLabel);
      };

      const renderMainIcon = (type, val, customIcon, color = null) => {
        if (customIcon) {
          const style = color ? `color: ${color};` : (type === 'solar' ? 'color: var(--icon-solar-color);' : (type === 'grid' ? 'color: var(--icon-grid-color);' : (type === 'battery' ? 'color: var(--icon-battery-color);' : (type === 'house' ? 'color: var(--icon-house-color);' : ''))));
          return html`<ha-icon icon="${customIcon}" class="icon-custom" style="${style}"></ha-icon>`;
        }
        return this._renderIcon(type, val, color);
      };

      const renderConsumer = (isVisible, cssClass, configKey, label, iconType, val, hexColor) => {
        if (!isVisible) return html``;

        const customIcon = this.config[`${configKey}_icon`];
        let iconContent;

        const iconColorVar = `var(--icon-${configKey.replace(/_/g, '-')}-color)`;

        if (hideConsumerIcons) {
          iconContent = html``;
        } else if (customIcon) {
          iconContent = html`<ha-icon icon="${customIcon}" class="icon-custom" style="color: ${iconColorVar};"></ha-icon>`;
        } else {
          iconContent = this._renderIcon(iconType, val);
        }

        const secEntity = entities[`secondary_${configKey}`];
        const hasSecondary = !!(secEntity && secEntity !== "");

        const textStyle = this.config[`color_text_${configKey}`]
          ? `color: var(--text-${configKey.replace(/_/g, '-')}-color);`
          : getConsumerColorStyle(hexColor);

        return html`
            <div class="bubble ${cssClass} ${cssClass.replace('c', 'node-c')} ${tintClass} ${glowClass}"
                @click=${() => this._handleClick(entities[configKey])}>
                ${iconContent}
                ${renderSecondaryOrLabel(label, true, secEntity, hasSecondary, `secondary_${configKey}`)}
                <div class="value" style="${textStyle}">${this._formatPower(val)}</div>
            </div>
        `;
      };

      const getConsumerPipeStyle = (isActive, val, idx = null) => {
        if (!isActive) return "display: none;";
        return getPipeStyle(val, idx ? `--pipe-consumer-${idx}-opacity` : null);
      };

      const getConsumerAnimStyle = (isActive, val, idx = null) => {
        if (!isActive) return "display: none;";
        return getAnimStyle(val, idx ? `--pipe-consumer-${idx}-opacity` : null);
      };

      const pathSolarHouse = "M 50 160 Q 50 265 165 265";
      const pathSolarBatt = "M 50 70 Q 210 -20 370 70";
      const pathGridImport = "M 210 160 L 210 220";
      const pathGridExport = "M 95 115 Q 130 145 165 115";
      const pathHouseExport = "M 210 220 L 210 160";
      const exportFromSolar = solarVal > 1;
      const activeExportPath = exportFromSolar ? pathGridExport : pathHouseExport;
      const exportTextX = exportFromSolar ? '130' : '185';
      const exportTextY = exportFromSolar ? '145' : '195';
      const pathGridToBatt = "M 255 115 Q 290 145 325 115";
      const pathBattHouse = "M 370 160 Q 370 265 255 265";
      const pathHouseToBatt = "M 255 265 Q 370 265 370 160";
      const pathHouseC1 = "M 165 265 Q 50 265 50 370";
      const pathHouseC2 = "M 210 310 L 210 370";
      const pathHouseC3 = "M 255 265 Q 370 265 370 370";
      const pathHouseC4 = "M 165 265 Q 90 370 130 470";
      const pathHouseC5 = "M 255 265 Q 330 370 290 470";

      const houseTextStyle = this.config.color_text_house
        ? 'color: var(--text-house-color);'
        : (houseTextCol ? `color: ${houseTextCol};` : '');
      const dashArrayVal = showTail ? '30 360' : (showDashedLine ? '13 13' : '0 380');
      const strokeWidthVal = showDashedLine ? 4 : 8;

      return html`
      <ha-card style="height: ${finalCardHeightPx}px; --flow-dasharray: ${dashArrayVal}; --flow-stroke-width: ${strokeWidthVal}px;">
        
        <div class="scale-wrapper" style="transform: scale(${scale}); margin-left: ${centerMarginLeft}px;">
            
            <div class="absolute-container" style="height: ${baseHeight}px; top: -${topShift}px;">
                <svg height="${baseHeight}" viewBox="0 0 420 ${baseHeight}" preserveAspectRatio="xMidYMid meet">
                    
                    <path class="bg-path bg-solar" d="${pathSolarHouse}" style="${getPipeStyle(solarToHouse, '--pipe-solar-opacity')} ${styleSolar}" />
                    <path class="bg-path bg-solar" d="${pathSolarBatt}" style="${getPipeStyle(solarToBatt, '--pipe-solar-opacity')} ${styleSolarBatt}" />
                    
                    <path class="bg-path bg-grid" d="${pathGridImport}" style="${getPipeStyle(gridToHouse, '--pipe-grid-opacity')} ${styleGrid}" />
                    <path class="bg-path bg-export" d="${activeExportPath}" style="${getPipeStyle(gridExport, '--pipe-grid-opacity')} ${styleGrid}" />
                    <path class="bg-path bg-grid" d="${pathGridToBatt}" style="${getPipeStyle(gridToBatt, '--pipe-grid-opacity')} ${styleGridBatt}" />
                    
                    <path class="bg-path bg-battery" d="${pathBattHouse}" style="${getPipeStyle(batteryDischarge, '--pipe-battery-opacity')} ${styleBattery}" />

                    <path class="bg-path bg-battery" d="${pathHouseToBatt}" style="${(batteryChargeViaHouse && batteryCharge > 0) ? getPipeStyle(batteryCharge, '--pipe-battery-opacity') + ' ' + styleBattery : 'display:none;'}" />

                    <path d="${pathHouseC1}" fill="none" stroke="${this._getConsumerPipeColor(1)}" stroke-width="6" style="${getConsumerPipeStyle(c1PipeActive, c1Val, 1)}" />
                    <path d="${pathHouseC2}" fill="none" stroke="${this._getConsumerPipeColor(2)}" stroke-width="6" style="${getConsumerPipeStyle(c2PipeActive, c2Val, 2)}" />
                    <path d="${pathHouseC3}" fill="none" stroke="${this._getConsumerPipeColor(3)}" stroke-width="6" style="${getConsumerPipeStyle(c3PipeActive, c3Val, 3)}" />
                    <path d="${pathHouseC4}" fill="none" stroke="${this._getConsumerPipeColor(4)}" stroke-width="6" style="${getConsumerPipeStyle(c4PipeActive, c4Val, 4)}" />
                    <path d="${pathHouseC5}" fill="none" stroke="${this._getConsumerPipeColor(5)}" stroke-width="6" style="${getConsumerPipeStyle(c5PipeActive, c5Val, 5)}" />

                    <path class="flow-line flow-solar" d="${pathSolarHouse}" style="${getAnimStyle(solarToHouse, '--pipe-solar-opacity')} ${styleSolar}" />
                    <path class="flow-line flow-solar" d="${pathSolarBatt}" style="${getAnimStyle(solarToBatt, '--pipe-solar-opacity')} ${styleSolarBatt}" />
                    
                    <path class="flow-line flow-grid" d="${pathGridImport}" style="${getAnimStyle(gridToHouse, '--pipe-grid-opacity')} ${styleGrid}" />
                    <path class="flow-line flow-export" d="${activeExportPath}" style="${getAnimStyle(gridExport, '--pipe-grid-opacity')} ${styleGrid}" />
                    <path class="flow-line flow-grid" d="${pathGridToBatt}" style="${getAnimStyle(gridToBatt, '--pipe-grid-opacity')} ${styleGridBatt}" />
                    
                    <path class="flow-line flow-battery" d="${pathBattHouse}" style="${getAnimStyle(batteryDischarge, '--pipe-battery-opacity')} ${styleBattery}" />

                    <path class="flow-line flow-battery" d="${pathHouseToBatt}" style="${(batteryChargeViaHouse && batteryCharge > 0) ? getAnimStyle(batteryCharge, '--pipe-battery-opacity') + ' ' + styleBattery : 'display:none;'}" />

                    <path class="flow-line" d="${pathHouseC1}" stroke="${this._getConsumerPipeColor(1)}" style="${getConsumerAnimStyle(c1PipeActive, c1Val, 1)}" />
                    <path class="flow-line" d="${pathHouseC2}" stroke="${this._getConsumerPipeColor(2)}" style="${getConsumerAnimStyle(c2PipeActive, c2Val, 2)}" />
                    <path class="flow-line" d="${pathHouseC3}" stroke="${this._getConsumerPipeColor(3)}" style="${getConsumerAnimStyle(c3PipeActive, c3Val, 3)}" />
                    <path class="flow-line" d="${pathHouseC4}" stroke="${this._getConsumerPipeColor(4)}" style="${getConsumerAnimStyle(c4PipeActive, c4Val, 4)}" />
                    <path class="flow-line" d="${pathHouseC5}" stroke="${this._getConsumerPipeColor(5)}" style="${getConsumerAnimStyle(c5PipeActive, c5Val, 5)}" />

                    <text x="100" y="235" class="${textClass} text-solar" style="${getTextStyle(solarToHouse, 'solar')} ${styleSolar}">${this._formatPower(solarToHouse)}</text>
                    <text x="210" y="45" class="${textClass} text-solar" style="${getTextStyle(solarToBatt, 'solar')} ${styleSolarBatt}">${this._formatPower(solarToBatt)}</text>
                    
                    <text x="235" y="195" class="${textClass} text-grid" style="${getTextStyle(gridToHouse, 'grid')} ${styleGrid}">${this._formatPower(gridToHouse)}</text>
                    <text x="${exportTextX}" y="${exportTextY}" class="${textClass} text-export" style="${getTextStyle(gridExport, 'grid')} ${styleGrid}">${this._formatPower(gridExport)}</text>
                    <text x="290" y="145" class="${textClass} text-grid" style="${getTextStyle(gridToBatt, 'grid')} ${styleGridBatt}">${this._formatPower(gridToBatt)}</text>
                    
                    <text x="320" y="235" class="${textClass} text-battery" style="${getTextStyle(batteryDischarge, 'battery')} ${styleBattery}">${this._formatPower(batteryDischarge)}</text>

                    <text x="320" y="235" class="${textClass} text-battery" style="${(batteryChargeViaHouse && batteryCharge > 0) ? getTextStyle(batteryCharge, 'battery') + ' ' + styleBattery : 'display:none;'}">${this._formatPower(batteryCharge)}</text>

                </svg>

                ${hasSolar ? html`
                <div class="bubble ${isSolarActive ? 'solar' : 'inactive'} node-solar ${tintClass} ${isSolarActive ? glowClass : ''}"
                    @click=${() => this._handleClick(entities.solar)}>
                    ${renderMainIcon('solar', solarVal, iconSolar, solarColor)}
                    ${renderSecondaryOrLabel(labelSolarText, showLabelSolar, entities.secondary_solar, hasSecondarySolar, 'secondary_solar')}
                    <div class="value" style="${isSolarActive ? (this.config.color_text_solar ? 'color: var(--text-solar-color);' : getColorStyle('--neon-yellow')) : `color: ${solarColor};`}">${this._formatPower(solarVal)}</div>
                </div>` : ''}
                
                ${hasGrid ? html`
                <div class="bubble ${isGridActive ? (isGridExporting ? 'grid exporting' : 'grid') : 'inactive'} node-grid ${showDonut && isGridActive ? 'donut' : ''} ${tintClass} ${isGridActive ? glowClass : ''}"
                    style="${showDonut && isGridActive ? `--grid-gradient: ${gridGradientVal};` : ''}"
                    @click=${() => this._handleClick(entities.grid_combined || entities.grid)}>
                    ${renderMainIcon('grid', isGridExporting ? gridExport : gridImport, iconGrid, gridIconColor)}
                    ${renderSecondaryOrLabel(labelGridText, showLabelGrid, entities.secondary_grid, hasSecondaryGrid, 'secondary_grid')}
                    <div class="value" style="color: ${gridTextColor};">
                        ${isGridExporting ? html`<span class="direction-arrow">&#9650;</span>` : (isGridActive ? html`<span class="direction-arrow">&#9660;</span>` : '')}
                        ${this._formatPower(isGridExporting ? gridExport : gridImport)}
                    </div>
                </div>` : ''}
                
                ${hasBattery ? html`
                <div class="bubble battery node-battery ${tintClass} ${glowClass}"
                    @click=${() => this._handleClick(entities.battery)}>
                    ${renderMainIcon('battery', battSoc, iconBattery)}
                    ${renderSecondaryOrLabel(labelBatteryText, showLabelBattery, entities.secondary_battery, hasSecondaryBattery, 'secondary_battery')}
                    <div class="value" style="${this.config.color_text_battery ? 'color: var(--text-battery-color);' : getColorStyle('--neon-green')}">${this.config.battery_show_power ? this._formatPower(battery) : Math.round(battSoc) + '%'}</div>
                </div>` : ''}
                
                <div class="bubble house node-house ${showDonut ? 'donut' : ''} ${tintClass}" 
                    style="${houseBubbleStyle}"
                    @click=${() => this._handleClick(entities.house)}>
                    ${renderMainIcon('house', 0, this.config.house_icon || null, this.config.color_icon_house ? 'var(--icon-house-color)' : houseDominantColor)}
                    ${renderSecondaryOrLabel(labelHouseText, showLabelHouse, entities.secondary_house, hasSecondaryHouse, 'secondary_house')}
                    <div class="value" style="${houseTextStyle}">${this._formatPower(houseDisplay)}</div>
                </div>

                ${renderConsumer(showC1, 'c1', 'consumer_1', labelC1, 'car', c1Val, this._getConsumerColor(1))}
                ${renderConsumer(showC2, 'c2', 'consumer_2', labelC2, 'heater', c2Val, this._getConsumerColor(2))}
                ${renderConsumer(showC3, 'c3', 'consumer_3', labelC3, 'pool', c3Val, this._getConsumerColor(3))}

                ${renderConsumer(showC4, 'c4', 'consumer_4', this.config.consumer_4_label || 'Consumer 4', null, c4Val, this._getConsumerColor(4))}
                ${renderConsumer(showC5, 'c5', 'consumer_5', this.config.consumer_5_label || 'Consumer 5', null, c5Val, this._getConsumerColor(5))}
                
            </div>
        </div>
      </ha-card>
    `;
    }

    render() {
      if (!this.config || !this.hass) return html``;

      // SWITCH VIEW BASED ON CONFIG
      if (this.config.compact_view === true) {
        return this._renderCompactView(this.config.entities || {});
      } else {
        return this._renderStandardView(this.config.entities || {});
      }
    }
  }

  customElements.define("power-flux-card", PowerFluxCard);
})(lang_en, lang_de);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "power-flux-card",
  name: "Power Flux Card",
  description: "Advanced Animated Energy Flow Card",
});
