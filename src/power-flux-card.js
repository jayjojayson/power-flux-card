import { } from "./power-flux-card-editor.js";
import lang_en from "./lang-en.js";
import lang_de from "./lang-de.js";

console.log(
  "%c⚡ Power Flux Card v_2.1 ready",
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
          battery: "",
          battery_soc: "",
          house: "",
          consumer_1: "",
          consumer_2: "",
          consumer_3: ""
        },
        consumer_tree: []
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
        --grid-grey: #9e9e9e; 
        --export-purple: #a855f7;
        --flow-dasharray: 0 380; 
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
        background: #333;
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
      
      /* Source Colors */
      .src-solar { background: var(--neon-green); color: black; }
      .src-grid { background: var(--grid-grey); color: black; }
      .src-battery { background: var(--neon-yellow); color: black; }

      /* --- STANDARD VIEW STYLES --- */
      .scale-wrapper {
        width: 420px; 
        transform-origin: top center; 
        transition: transform 0.1s linear; 
        margin: 0 auto;
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
      }
      
      .bubble.tinted { background: rgba(255, 255, 255, 0.05); }
      .bubble.tinted.solar { background: color-mix(in srgb, var(--neon-yellow), transparent 85%); }
      .bubble.tinted.grid { background: color-mix(in srgb, var(--neon-blue), transparent 85%); }
      .bubble.tinted.battery { background: color-mix(in srgb, var(--neon-green), transparent 85%); }
      .bubble.tinted.c1 { background: color-mix(in srgb, #a855f7, transparent 85%); }
      .bubble.tinted.c2 { background: color-mix(in srgb, #f97316, transparent 85%); }
      .bubble.tinted.c3 { background: color-mix(in srgb, #06b6d4, transparent 85%); }

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
      
      .icon-svg, .icon-custom {
          width: 34px; height: 34px; position: absolute; top: 13px; left: 50%; margin-left: -17px; z-index: 2; display: block;
      }
      .icon-custom { --mdc-icon-size: 34px; }
      
      .sub { 
        font-size: 9px; color: var(--secondary-text-color); text-transform: uppercase; letter-spacing: 0.5px;
        line-height: 1.1; z-index: 2; position: absolute; top: 48px; left: 0; width: 100%; text-align: center; margin: 0; pointer-events: none;
      }

      .value { 
        font-weight: bold; font-size: 15px; white-space: nowrap; z-index: 2; transition: color 0.3s ease;
        line-height: 1.2; position: absolute; bottom: 11px; left: 0; width: 100%; text-align: center; margin: 0;
      }
      
      @keyframes spin { 100% { transform: rotate(360deg); } }
      .spin-slow { animation: spin 12s linear infinite; transform-origin: center; }
      
      @keyframes pulse-opacity { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
      .pulse { animation: pulse-opacity 2s ease-in-out infinite; }

      @keyframes float-y { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-2px); } }
      .float { animation: float-y 3s ease-in-out infinite; }

      .solar { border-color: var(--neon-yellow); }
      .battery { border-color: var(--neon-green); }
      .grid { border-color: var(--neon-blue); }
      .c1 { border-color: #a855f7; }
      .c2 { border-color: #f97316; }
      .c3 { border-color: #06b6d4; }
      .inactive { border-color: var(--secondary-text-color); }

      .glow.solar { box-shadow: 0 0 15px rgba(255, 221, 0, 0.4); }
      .glow.battery { box-shadow: 0 0 15px rgba(0, 255, 136, 0.4); }
      .glow.grid { box-shadow: 0 0 15px rgba(59, 130, 246, 0.4); }
      .glow.c1 { box-shadow: 0 0 15px rgba(168, 85, 247, 0.4); }
      .glow.c2 { box-shadow: 0 0 15px rgba(249, 115, 22, 0.4); }
      .glow.c3 { box-shadow: 0 0 15px rgba(6, 182, 212, 0.4); }

      .node-solar { top: 70px; left: 5px; }     
      .node-grid { top: 70px; left: 165px; }     
      .node-battery { top: 70px; left: 325px; }  
      .node-house { top: 220px; left: 165px; }   
      .node-c1 { top: 370px; left: 5px; }
      .node-c2 { top: 370px; left: 165px; }
      .node-c3 { top: 370px; left: 325px; }

      svg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; pointer-events: none; }
      
      .bg-path { fill: none; stroke-width: 6; transition: opacity 0.3s ease; }
      .bg-solar { stroke: var(--neon-yellow); }
      .bg-grid { stroke: var(--neon-blue); }
      .bg-battery { stroke: var(--neon-green); }
      .bg-export { stroke: var(--neon-red); }
      .bg-c1 { stroke: #a855f7; }
      .bg-c2 { stroke: #f97316; }
      .bg-c3 { stroke: #06b6d4; }
      
      .flow-line { 
        fill: none; stroke-width: var(--flow-stroke-width, 8px); stroke-linecap: round; stroke-dasharray: var(--flow-dasharray);   
        animation: dash linear infinite; opacity: 0; transition: opacity 0.5s;
      }
      .flow-solar { stroke: var(--neon-yellow); }
      .flow-grid { stroke: var(--neon-blue); }
      .flow-battery { stroke: var(--neon-green); }
      .flow-export { stroke: var(--neon-red); }

      @keyframes dash { to { stroke-dashoffset: -1500; } }

      .flow-text {
        font-size: 10px; font-weight: bold; text-anchor: middle; fill: #fff; filter: drop-shadow(0px 1px 2px rgba(0,0,0,0.8)); transition: opacity 0.3s ease;
      }
      .flow-text.no-shadow { filter: none; }
      .text-solar { fill: var(--neon-yellow); }
      .text-grid { fill: var(--neon-blue); }
      .text-export { fill: var(--neon-red); }
      .text-battery { fill: var(--neon-green); }
    `;
    }

    // --- SVG ICON RENDERER ---
    _renderIcon(type, val = 0, colorOverride = null) {
      if (type === 'solar') {
        const animate = Math.round(val) > 0 ? 'spin-slow' : '';
        const color = colorOverride || 'var(--neon-yellow)';
        return html`<svg class="icon-svg ${animate}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
      }
      if (type === 'grid') {
        const animate = Math.round(val) > 0 ? 'pulse' : '';
        const color = colorOverride || 'var(--neon-blue)';
        return html`<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L12 22"></path><path d="M5 8L19 8"></path><path d="M4 14L20 14"></path><path d="M2 22L22 22"></path><circle class="${animate}" cx="12" cy="4" r="4" fill="${color}" stroke="none"></circle></svg>`;
      }
      if (type === 'battery') {
        const soc = Math.min(Math.max(val, 0), 100) / 100;
        const rectHeight = 14 * soc;
        const rectY = 18 - rectHeight;
        const rectColor = soc > 0.2 ? 'var(--neon-green)' : 'var(--neon-red)';
        return html`<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="var(--neon-green)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="12" height="16" rx="2" ry="2"></rect><line x1="10" y1="2" x2="14" y2="2"></line><rect x="7" y="${rectY}" width="10" height="${rectHeight}" fill="${rectColor}" stroke="none"></rect></svg>`;
      }
      if (type === 'house') {
        const strokeColor = colorOverride || 'var(--neon-pink)';
        return html`<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`;
      }
      if (type === 'car') {
        return html`<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="#a855f7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path><circle cx="7" cy="17" r="2"></circle><circle cx="17" cy="17" r="2"></circle><path d="M14 17h-5"></path></svg>`;
      }
      if (type === 'heater') {
        return html`<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20a4 4 0 0 0 4-4V8a4 4 0 0 0-8 0v8a4 4 0 0 0 4 4z"></path><path class="float" style="animation-delay: 0s;" d="M8 4c0-1.5 1-2 2-2s2 .5 2 2"></path><path class="float" style="animation-delay: 0.5s;" d="M14 4c0-1.5 1-2 2-2s2 .5 2 2"></path></svg>`;
      }
      if (type === 'pool') {
        return html`<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h20"></path><path class="float" d="M2 16c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2"></path><path d="M12 2v6"></path><path d="M9 5h6"></path></svg>`;
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

      const solar = entities.solar ? Math.max(0, getVal(entities.solar)) : 0;
      const gridMain = entities.grid ? getVal(entities.grid) : 0;
      const gridExportSensor = entities.grid_export ? getVal(entities.grid_export) : 0;
      let battery = entities.battery ? getVal(entities.battery) : 0;
      if (this.config.invert_battery) {
        battery *= -1;
      }
      const c1Val = entities.consumer_1 ? getVal(entities.consumer_1) : 0; // EV Value

      // 2. Logic Calculation
      let gridImport = 0;
      let gridExport = 0;

      if (entities.grid_export && entities.grid_export !== "") {
        gridImport = gridMain > 0 ? gridMain : 0;
        gridExport = Math.abs(gridExportSensor);
      } else {
        gridImport = gridMain > 0 ? gridMain : 0;
        gridExport = gridMain < 0 ? Math.abs(gridMain) : 0;
      }

      const batteryCharge = battery > 0 ? battery : 0;
      const batteryDischarge = battery < 0 ? Math.abs(battery) : 0;

      let solarToBatt = 0;
      let gridToBatt = 0;

      if (batteryCharge > 0) {
        if (solar >= batteryCharge) {
          solarToBatt = batteryCharge;
          gridToBatt = 0;
        } else {
          solarToBatt = solar;
          gridToBatt = batteryCharge - solar;
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

      addSegment(srcBattery, 'var(--neon-yellow)', 'battery', 'battery', entities.battery);
      addSegment(srcSolar, 'var(--neon-green)', 'solar', 'solar', entities.solar);
      addSegment(srcGrid, 'var(--grid-grey)', 'grid', 'grid', entities.grid);

      // --- GENERATE TOP BRACKETS (Based on Bar Segments) ---
      const topBrackets = barSegments.map(s => {
        const path = this._createBracketPath(s.startPx, s.widthPx, 'down');
        let icon = '';
        let iconColor = '';
        if (s.type === 'solar') { icon = 'mdi:weather-sunny'; iconColor = 'var(--neon-green)'; }
        if (s.type === 'grid') { icon = 'mdi:transmission-tower'; iconColor = 'var(--grid-grey)'; }
        if (s.type === 'battery') { icon = 'mdi:battery-high'; iconColor = 'var(--neon-yellow)'; }

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

        if (type === 'house') { icon = 'mdi:home'; iconColor = 'var(--primary-text-color)'; }
        if (type === 'car') { icon = 'mdi:car-electric'; iconColor = '#a855f7'; }
        if (type === 'export') { icon = 'mdi:arrow-right-box'; iconColor = 'var(--export-purple)'; }
        if (type === 'battery') { icon = 'mdi:battery-charging-high'; iconColor = 'var(--neon-green)'; }

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
      addBottomBracket(destExport, 'export', entities.grid_export || entities.grid);
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
                    ${barSegments.map(s => html`
                        <div class="bar-segment" 
                             style="width: ${s.widthPct}%; background: ${s.color}; color: ${s.color === 'var(--export-purple)' ? 'white' : 'black'}; cursor: ${s.entityId ? 'pointer' : 'default'};"
                             title="${this._formatPower(s.val)}"
                             @click=${() => s.entityId && this._handleClick(s.entityId)}>
                            ${s.widthPx > 35 ? this._formatPower(s.val) : ''}
                        </div>
                    `)}
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
      const labelGridText = this.config.grid_label || this._localize('card.label_import');
      const labelBatteryText = this.config.battery_label || (entities.battery && this.hass.states[entities.battery] && this.hass.states[entities.battery].state > 0 ? '+' : '-') + " " + this._localize('card.label_battery');
      const labelHouseText = this.config.house_label || this._localize('card.label_house');

      // CUSTOM ICONS
      const iconSolar = this.config.solar_icon;
      const iconGrid = this.config.grid_icon;
      const iconBattery = this.config.battery_icon;

      // Determine existence of main entities
      const hasSolar = !!(entities.solar && entities.solar !== "");
      const hasGrid = !!(entities.grid && entities.grid !== "");
      const hasBattery = !!(entities.battery && entities.battery !== "");

      const styleSolar = hasSolar ? '' : 'display: none;';
      const styleSolarBatt = (hasSolar && hasBattery) ? '' : 'display: none;';
      const styleGrid = hasGrid ? '' : 'display: none;';
      const styleGridBatt = (hasGrid && hasBattery) ? '' : 'display: none;';
      const styleBattery = hasBattery ? '' : 'display: none;';

      const textClass = showNeonGlow ? 'flow-text' : 'flow-text no-shadow';

      const MAX_CONSUMER_TREE_LEVEL = 3; // House = 1, consumers = 2, children = 3
      const CONSUMER_NODE_SIZE = 90;
      const CONSUMER_FIRST_ROW_TOP = 370;
      const CONSUMER_ROW_GAP = 150;
      const CONSUMER_UNIT_WIDTH = 130;
      const CONSUMER_MARGIN_X = 50;
      const CONSUMER_DEFAULT_COLORS = ['#a855f7', '#f97316', '#06b6d4', '#10b981', '#f43f5e', '#0ea5e9', '#eab308', '#8b5cf6'];

      const getVal = (entity) => {
        const state = this.hass.states[entity];
        return state ? parseFloat(state.state) || 0 : 0;
      };

      const toPositive = (val) => {
        if (!Number.isFinite(val)) return 0;
        return val > 0 ? val : 0;
      };

      const isMdiIcon = (icon) => typeof icon === 'string' && icon.startsWith('mdi:');

      const createLegacyConsumerTree = () => {
        const legacyList = [
          {
            id: 'consumer_1',
            entity: entities.consumer_1 || '',
            label: this.config.consumer_1_label || "E-Auto",
            icon: this.config.consumer_1_icon || 'car',
            color: '#a855f7',
            children: []
          },
          {
            id: 'consumer_2',
            entity: entities.consumer_2 || '',
            label: this.config.consumer_2_label || "Heizung",
            icon: this.config.consumer_2_icon || 'heater',
            color: '#f97316',
            children: []
          },
          {
            id: 'consumer_3',
            entity: entities.consumer_3 || '',
            label: this.config.consumer_3_label || "Pool",
            icon: this.config.consumer_3_icon || 'pool',
            color: '#06b6d4',
            children: []
          }
        ];
        return legacyList.filter((item) => item.entity && item.entity !== "");
      };

      const normalizeConsumerNode = (node, fallbackId, treeLevel, fallbackColor) => {
        if (!node || typeof node !== 'object') return null;

        const rawId = typeof node.id === 'string' && node.id.trim() ? node.id.trim() : fallbackId;
        const safeId = rawId.replace(/[^a-zA-Z0-9_-]/g, "_");
        const entity = typeof node.entity === 'string' ? node.entity : '';
        const label = typeof node.label === 'string' && node.label.trim() ? node.label.trim() : (entity || safeId);
        const icon = typeof node.icon === 'string' ? node.icon : '';
        const color = typeof node.color === 'string' && node.color.trim() ? node.color.trim() : fallbackColor;

        const rawChildren = (treeLevel < MAX_CONSUMER_TREE_LEVEL && Array.isArray(node.children)) ? node.children : [];
        const children = rawChildren.map((child, index) => {
          return normalizeConsumerNode(child, `${safeId}_${index + 1}`, treeLevel + 1, color);
        }).filter(Boolean);

        return { id: safeId, entity, label, icon, color, children };
      };

      const rawConsumerTree = (Array.isArray(this.config.consumer_tree) && this.config.consumer_tree.length > 0)
        ? this.config.consumer_tree
        : createLegacyConsumerTree();

      const consumerTree = rawConsumerTree.map((node, index) => {
        const fallbackColor = CONSUMER_DEFAULT_COLORS[index % CONSUMER_DEFAULT_COLORS.length];
        return normalizeConsumerNode(node, `consumer_${index + 1}`, 2, fallbackColor);
      }).filter(Boolean);

      const computeConsumerFlow = (node, pathSeed) => {
        const nodeKey = `${pathSeed}/${node.id}`;
        const mappedChildren = node.children.map((child, index) => {
          return computeConsumerFlow(child, `${nodeKey}-${index + 1}`);
        }).filter((child) => child.visible);

        const ownValue = node.entity ? toPositive(getVal(node.entity)) : 0;
        const childrenValue = mappedChildren.reduce((sum, child) => sum + child.value, 0);
        let nodeValue = ownValue > 0 ? ownValue : childrenValue;
        let remaining = nodeValue;

        const boundedChildren = mappedChildren.map((child) => {
          const boundedValue = ownValue > 0 ? Math.min(child.value, Math.max(0, remaining)) : child.value;
          if (ownValue > 0) remaining -= boundedValue;
          return { ...child, value: boundedValue, visible: boundedValue > 0 };
        }).filter((child) => child.visible);

        if (ownValue <= 0 && boundedChildren.length > 0) {
          nodeValue = boundedChildren.reduce((sum, child) => sum + child.value, 0);
        }

        return {
          ...node,
          key: nodeKey,
          value: nodeValue,
          children: boundedChildren,
          visible: nodeValue > 0
        };
      };

      const visibleConsumerTree = consumerTree.map((node, index) => {
        return computeConsumerFlow(node, `root-${index + 1}`);
      }).filter((node) => node.visible);

      const getLeafUnits = (node) => {
        if (!node.children || node.children.length === 0) return 1;
        return node.children.reduce((sum, child) => sum + getLeafUnits(child), 0);
      };

      const totalLeafUnits = visibleConsumerTree.reduce((sum, node) => sum + getLeafUnits(node), 0);
      const dynamicWidth = totalLeafUnits > 0
        ? (CONSUMER_MARGIN_X * 2) + (CONSUMER_UNIT_WIDTH * totalLeafUnits)
        : 420;
      const designWidth = Math.max(420, dynamicWidth);

      const consumerPositionMap = new Map();
      let leafCursor = (designWidth / 2) - (((Math.max(totalLeafUnits, 1) - 1) * CONSUMER_UNIT_WIDTH) / 2);
      const assignConsumerX = (node, depth) => {
        if (!node.children || node.children.length === 0) {
          const leafX = leafCursor;
          leafCursor += CONSUMER_UNIT_WIDTH;
          consumerPositionMap.set(node.key, { x: leafX, depth });
          return leafX;
        }

        const childXs = node.children.map((child) => assignConsumerX(child, depth + 1));
        const x = (childXs[0] + childXs[childXs.length - 1]) / 2;
        consumerPositionMap.set(node.key, { x, depth });
        return x;
      };
      visibleConsumerTree.forEach((node) => assignConsumerX(node, 1));

      const consumerParents = new Map();
      const consumerNodes = [];
      const collectConsumerNodes = (node, parentKey = null) => {
        const layout = consumerPositionMap.get(node.key);
        if (!layout) return;

        const top = CONSUMER_FIRST_ROW_TOP + ((layout.depth - 1) * CONSUMER_ROW_GAP);
        consumerNodes.push({
          ...node,
          x: layout.x,
          depth: layout.depth,
          top
        });
        consumerParents.set(node.key, parentKey);
        node.children.forEach((child) => collectConsumerNodes(child, node.key));
      };
      visibleConsumerTree.forEach((node) => collectConsumerNodes(node, null));

      const consumerDepthVisible = consumerNodes.reduce((maxDepth, node) => {
        return Math.max(maxDepth, node.depth);
      }, 0);
      const anyBottomVisible = consumerNodes.length > 0;

      const solar = hasSolar ? getVal(entities.solar) : 0;
      const gridMain = hasGrid ? getVal(entities.grid) : 0;
      const gridExpSensor = (hasGrid && entities.grid_export) ? getVal(entities.grid_export) : 0;
      let battery = hasBattery ? getVal(entities.battery) : 0;
      if (this.config.invert_battery) {
        battery *= -1;
      }
      const battSoc = (hasBattery && entities.battery_soc) ? getVal(entities.battery_soc) : 0;

      const solarVal = Math.max(0, solar);

      let gridImport = 0;
      let gridExport = 0;

      if (hasGrid) {
        if (entities.grid_export && entities.grid_export !== "") {
          gridImport = gridMain > 0 ? gridMain : 0;
          gridExport = Math.abs(gridExpSensor);
        } else {
          gridImport = gridMain > 0 ? gridMain : 0;
          gridExport = gridMain < 0 ? Math.abs(gridMain) : 0;
        }
      }

      const batteryCharge = battery > 0 ? battery : 0;
      const batteryDischarge = battery < 0 ? Math.abs(battery) : 0;

      let solarToBatt = 0;
      let gridToBatt = 0;

      if (hasBattery && batteryCharge > 0) {
        if (solarVal >= batteryCharge) {
          solarToBatt = batteryCharge;
          gridToBatt = 0;
        } else {
          solarToBatt = solarVal;
          gridToBatt = batteryCharge - solarVal;
        }
      }

      const solarToHouse = Math.max(0, solarVal - solarToBatt - gridExport);
      const gridToHouse = Math.max(0, gridImport - gridToBatt);
      const house = solarToHouse + gridToHouse + batteryDischarge;

      const isTopArcActive = (solarToBatt > 0);
      const topShift = (isTopArcActive || (!hideInactive && hasSolar && hasBattery)) ? 0 : 50;
      let baseHeight = 340;
      if (anyBottomVisible) {
        const lastConsumerRowTop = CONSUMER_FIRST_ROW_TOP + ((consumerDepthVisible - 1) * CONSUMER_ROW_GAP);
        baseHeight = lastConsumerRowTop + CONSUMER_NODE_SIZE + 20;
      }
      const contentHeight = baseHeight - topShift;

      const availableWidth = this._cardWidth || designWidth;
      const userZoom = this.config.zoom !== undefined ? this.config.zoom : 0.9;
      let scale = (availableWidth / designWidth) * userZoom;

      if (scale < 0.5) scale = 0.5;
      if (scale > 1.5) scale = 1.5;

      const finalCardHeightPx = contentHeight * scale;

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
          if (pctGrid > 0) { stops.push(`var(--neon-blue) ${current}% ${current + pctGrid}%`); current += pctGrid; }
          if (pctBatt > 0) { stops.push(`var(--neon-green) ${current}% ${current + pctBatt}%`); current += pctBatt; }
          if (current < 99.9) { stops.push(`var(--neon-pink) ${current}% 100%`); }

          houseGradientVal = `conic-gradient(${stops.join(', ')})`;

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
      const isGridActive = Math.round(gridImport) > 0;

      const solarColor = isSolarActive ? 'var(--neon-yellow)' : 'var(--secondary-text-color)';
      const gridColor = isGridActive ? 'var(--neon-blue)' : 'var(--secondary-text-color)';

      const getAnimStyle = (val) => {
        if (val <= 1) return "opacity: 0;";
        const userMinDuration = 7;
        const userMaxDuration = 11;
        const userFactor = 20000;
        let duration = userFactor / val;
        duration = Math.max(userMinDuration, Math.min(userMaxDuration, duration));

        // Adjust speed for dashed line (Factor to slow down: 5x)
        if (showDashedLine) {
          duration = duration * 5;
        }

        return `opacity: 1; animation-duration: ${duration}s;`;
      };

      const getPipeStyle = (val) => {
        if (!hideInactive) return "opacity: 0.2;";
        return val > 1 ? "opacity: 0.2;" : "opacity: 0;";
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

      const renderMainIcon = (type, val, customIcon, color = null) => {
        if (customIcon) {
          const style = color ? `color: ${color};` : (type === 'solar' ? 'color: var(--neon-yellow);' : (type === 'grid' ? 'color: var(--neon-blue);' : (type === 'battery' ? 'color: var(--neon-green);' : '')));
          return html`<ha-icon icon="${customIcon}" class="icon-custom" style="${style}"></ha-icon>`;
        }
        return this._renderIcon(type, val, color);
      };

      const getCustomClass = (icon) => icon ? 'has-custom-icon' : '';

      const bubblePositionStyle = (centerX, topY) => `left: ${centerX - (CONSUMER_NODE_SIZE / 2)}px; top: ${topY}px;`;

      const renderConsumerIcon = (node) => {
        if (hideConsumerIcons) return html``;
        if (isMdiIcon(node.icon)) {
          return html`<ha-icon icon="${node.icon}" class="icon-custom" style="color: ${node.color};"></ha-icon>`;
        }
        if (node.icon) {
          return this._renderIcon(node.icon, node.value);
        }
        return html`<ha-icon icon="mdi:flash" class="icon-custom" style="color: ${node.color};"></ha-icon>`;
      };

      const renderConsumerNode = (node) => {
        const tintStyle = showTint ? `background: color-mix(in srgb, ${node.color}, transparent 85%);` : '';
        const glowStyle = showNeonGlow ? `box-shadow: 0 0 15px color-mix(in srgb, ${node.color}, transparent 60%);` : 'box-shadow: none;';
        const bubbleStyle = `${bubblePositionStyle(node.x, node.top)} border-color: ${node.color}; ${tintStyle} ${glowStyle}`;
        const customClass = (!hideConsumerIcons && isMdiIcon(node.icon)) ? 'has-custom-icon' : '';

        return html`
          <div class="bubble node ${customClass}" style="${bubbleStyle}">
            ${renderConsumerIcon(node)}
            ${renderLabel(node.label, true)}
            <div class="value" style="${getConsumerColorStyle(node.color)}">${this._formatPower(node.value)}</div>
          </div>
        `;
      };

      const houseX = designWidth / 2;
      const solarX = houseX - 160;
      const gridX = houseX;
      const batteryX = houseX + 160;
      const mainTopY = 70;
      const mainBottomY = 160;
      const mainCenterY = 115;
      const houseTopY = 220;
      const houseCenterY = 265;
      const houseBottomY = 310;

      const buildHouseToConsumerPath = (targetX, targetTop) => {
        if (Math.abs(targetX - houseX) < 1) {
          return `M ${houseX} ${houseBottomY} L ${targetX} ${targetTop}`;
        }
        const startX = targetX < houseX ? houseX - 45 : houseX + 45;
        return `M ${startX} ${houseCenterY} Q ${targetX} ${houseCenterY} ${targetX} ${targetTop}`;
      };

      const buildConsumerToChildPath = (parentNode, childNode) => {
        const parentBottomY = parentNode.top + CONSUMER_NODE_SIZE;
        if (Math.abs(parentNode.x - childNode.x) < 1) {
          return `M ${parentNode.x} ${parentBottomY} L ${childNode.x} ${childNode.top}`;
        }
        const controlY = parentBottomY + ((childNode.top - parentBottomY) * 0.45);
        return `M ${parentNode.x} ${parentBottomY} Q ${childNode.x} ${controlY} ${childNode.x} ${childNode.top}`;
      };

      const consumerNodeByKey = new Map(consumerNodes.map((node) => [node.key, node]));
      const consumerConnections = consumerNodes.map((node) => {
        const parentKey = consumerParents.get(node.key);
        if (!parentKey) {
          return {
            path: buildHouseToConsumerPath(node.x, node.top),
            color: node.color,
            value: node.value
          };
        }
        const parentNode = consumerNodeByKey.get(parentKey);
        if (!parentNode) return null;
        return {
          path: buildConsumerToChildPath(parentNode, node),
          color: node.color,
          value: node.value
        };
      }).filter(Boolean);

      const pathSolarHouse = `M ${solarX} ${mainBottomY} Q ${solarX} ${houseCenterY} ${houseX - 45} ${houseCenterY}`;
      const pathSolarBatt = `M ${solarX} ${mainTopY} Q ${houseX} -20 ${batteryX} ${mainTopY}`;
      const pathGridImport = `M ${gridX} ${mainBottomY} L ${gridX} ${houseTopY}`;
      const pathGridExport = `M ${houseX - 45} ${mainCenterY} Q ${houseX - 80} ${mainCenterY + 30} ${houseX - 115} ${mainCenterY}`;
      const pathGridToBatt = `M ${houseX + 45} ${mainCenterY} Q ${houseX + 80} ${mainCenterY + 30} ${houseX + 115} ${mainCenterY}`;
      const pathBattHouse = `M ${batteryX} ${mainBottomY} Q ${batteryX} ${houseCenterY} ${houseX + 45} ${houseCenterY}`;

      const solarHouseTextX = houseX - 110;
      const solarBattTextX = houseX;
      const gridHouseTextX = houseX + 25;
      const gridExportTextX = houseX - 80;
      const gridBattTextX = houseX + 80;
      const battHouseTextX = houseX + 110;

      const houseTextStyle = houseTextCol ? `color: ${houseTextCol};` : '';
      const dashArrayVal = showTail ? '30 360' : (showDashedLine ? '13 13' : '0 380');
      const strokeWidthVal = showDashedLine ? 4 : 8;

      return html`
      <ha-card style="height: ${finalCardHeightPx}px; --flow-dasharray: ${dashArrayVal}; --flow-stroke-width: ${strokeWidthVal}px;">
        
        <div class="scale-wrapper" style="width: ${designWidth}px; transform: scale(${scale});">
             
            <div class="absolute-container" style="width: ${designWidth}px; height: ${baseHeight}px; top: -${topShift}px;">
                <svg height="${baseHeight}" viewBox="0 0 ${designWidth} ${baseHeight}" preserveAspectRatio="xMidYMid meet">
                    
                    <path class="bg-path bg-solar" d="${pathSolarHouse}" style="${getPipeStyle(solarToHouse)} ${styleSolar}" />
                    <path class="bg-path bg-solar" d="${pathSolarBatt}" style="${getPipeStyle(solarToBatt)} ${styleSolarBatt}" />
                    
                    <path class="bg-path bg-grid" d="${pathGridImport}" style="${getPipeStyle(gridToHouse)} ${styleGrid}" />
                    <path class="bg-path bg-export" d="${pathGridExport}" style="${getPipeStyle(gridExport)} ${styleGrid}" />
                    <path class="bg-path bg-grid" d="${pathGridToBatt}" style="${getPipeStyle(gridToBatt)} ${styleGridBatt}" />
                     
                    <path class="bg-path bg-battery" d="${pathBattHouse}" style="${getPipeStyle(batteryDischarge)} ${styleBattery}" />

                    ${consumerConnections.map((conn) => html`
                      <path d="${conn.path}" fill="none" stroke="${conn.color}" stroke-width="6" style="${getPipeStyle(conn.value)}" />
                    `)}

                    <path class="flow-line flow-solar" d="${pathSolarHouse}" style="${getAnimStyle(solarToHouse)} ${styleSolar}" />
                    <path class="flow-line flow-solar" d="${pathSolarBatt}" style="${getAnimStyle(solarToBatt)} ${styleSolarBatt}" />
                    
                    <path class="flow-line flow-grid" d="${pathGridImport}" style="${getAnimStyle(gridToHouse)} ${styleGrid}" />
                    <path class="flow-line flow-export" d="${pathGridExport}" style="${getAnimStyle(gridExport)} ${styleGrid}" />
                    <path class="flow-line flow-grid" d="${pathGridToBatt}" style="${getAnimStyle(gridToBatt)} ${styleGridBatt}" />
                     
                    <path class="flow-line flow-battery" d="${pathBattHouse}" style="${getAnimStyle(batteryDischarge)} ${styleBattery}" />

                    ${consumerConnections.map((conn) => html`
                      <path class="flow-line" d="${conn.path}" stroke="${conn.color}" style="${getAnimStyle(conn.value)}" />
                    `)}

                    <text x="${solarHouseTextX}" y="235" class="${textClass} text-solar" style="${getTextStyle(solarToHouse, 'solar')} ${styleSolar}">${this._formatPower(solarToHouse)}</text>
                    <text x="${solarBattTextX}" y="45" class="${textClass} text-solar" style="${getTextStyle(solarToBatt, 'solar')} ${styleSolarBatt}">${this._formatPower(solarToBatt)}</text>
                    
                    <text x="${gridHouseTextX}" y="195" class="${textClass} text-grid" style="${getTextStyle(gridToHouse, 'grid')} ${styleGrid}">${this._formatPower(gridToHouse)}</text>
                    <text x="${gridExportTextX}" y="145" class="${textClass} text-export" style="${getTextStyle(gridExport, 'grid')} ${styleGrid}">${this._formatPower(gridExport)}</text>
                    <text x="${gridBattTextX}" y="145" class="${textClass} text-grid" style="${getTextStyle(gridToBatt, 'grid')} ${styleGridBatt}">${this._formatPower(gridToBatt)}</text>
                    
                    <text x="${battHouseTextX}" y="235" class="${textClass} text-battery" style="${getTextStyle(batteryDischarge, 'battery')} ${styleBattery}">${this._formatPower(batteryDischarge)}</text>

                </svg>

                ${hasSolar ? html`
                <div class="bubble ${isSolarActive ? 'solar' : 'inactive'} node node-solar ${tintClass} ${isSolarActive ? glowClass : ''} ${getCustomClass(iconSolar)}" style="${bubblePositionStyle(solarX, mainTopY)}">
                    ${renderMainIcon('solar', solarVal, iconSolar, solarColor)}
                    ${renderLabel(labelSolarText, showLabelSolar)}
                    <div class="value" style="${isSolarActive ? getColorStyle('--neon-yellow') : `color: ${solarColor};`}">${this._formatPower(solarVal)}</div>
                </div>` : ''}
                
                ${hasGrid ? html`
                <div class="bubble ${isGridActive ? 'grid' : 'inactive'} node node-grid ${tintClass} ${isGridActive ? glowClass : ''} ${getCustomClass(iconGrid)}" style="${bubblePositionStyle(gridX, mainTopY)}">
                    ${renderMainIcon('grid', gridImport, iconGrid, gridColor)}
                    ${renderLabel(labelGridText, showLabelGrid)}
                    <div class="value" style="${isGridActive ? getColorStyle('--neon-blue') : `color: ${gridColor};`}">${this._formatPower(gridImport)}</div>
                </div>` : ''}
                
                ${hasBattery ? html`
                <div class="bubble battery node node-battery ${tintClass} ${glowClass} ${getCustomClass(iconBattery)}" style="${bubblePositionStyle(batteryX, mainTopY)}">
                    ${renderMainIcon('battery', battSoc, iconBattery)}
                    ${renderLabel(labelBatteryText, showLabelBattery)}
                    <div class="value" style="${getColorStyle('--neon-green')}">${Math.round(battSoc)}%</div>
                </div>` : ''}
                
                <div class="bubble house node node-house ${showDonut ? 'donut' : ''} ${tintClass}" 
                    style="${bubblePositionStyle(houseX, houseTopY)} ${houseBubbleStyle}">
                    ${renderMainIcon('house', 0, null, houseDominantColor)}
                    ${renderLabel(labelHouseText, showLabelHouse)}
                    <div class="value" style="${houseTextStyle}">${this._formatPower(house)}</div>
                </div>

                ${consumerNodes.map((node) => renderConsumerNode(node))}
                
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
