import lang_en from "./lang-en.js";
import lang_de from "./lang-de.js";

const editorTranslations = {
    "en": lang_en.editor,
    "de": lang_de.editor
};


const fireEvent = (node, type, detail, options) => {
    options = options || {};
    detail = detail === null || detail === undefined ? {} : detail;
    const event = new Event(type, {
        bubbles: options.bubbles === undefined ? true : options.bubbles,
        cancelable: Boolean(options.cancelable),
        composed: options.composed === undefined ? true : options.composed,
    });
    event.detail = detail;
    node.dispatchEvent(event);
    return event;
};

const LitElement = customElements.get("ha-lit-element") || Object.getPrototypeOf(customElements.get("home-assistant-main"));
const html = LitElement.prototype.html;
const css = LitElement.prototype.css;

class PowerFluxCardEditor extends LitElement {

    static get properties() {
        return {
            hass: {},
            _config: { state: true },
            _subView: { state: true } // Controls which sub-page is open (null = main)
        };
    }

    setConfig(config) {
        this._config = config;
    }

    _localize(key) {
        const lang = this.hass && this.hass.language ? this.hass.language : 'en';
        const dict = editorTranslations[lang] || editorTranslations['en'];
        return dict[key] || editorTranslations['en'][key] || key;
    }

    _valueChanged(ev) {
        if (!this._config || !this.hass) return;

        const target = ev.target;
        const key = target.configValue || this._currentConfigValue;

        let value;
        if (target.tagName === 'HA-SWITCH') {
            value = target.checked;
        } else if (ev.detail && 'value' in ev.detail) {
            value = ev.detail.value;
        } else {
            value = target.value;
        }

        if (value === null || value === undefined) {
            value = "";
        }

        if (key) {
            const entityKeys = [
                'solar', 'grid', 'grid_export', 'grid_combined',
                'battery', 'battery_soc', 'grid_to_battery',
                'house',
                'consumer_1', 'consumer_2', 'consumer_3',
                'secondary_solar', 'secondary_grid', 'secondary_battery',
                'secondary_consumer_1', 'secondary_consumer_2', 'secondary_consumer_3'
            ];

            let newConfig = { ...this._config };

            if (entityKeys.includes(key)) {
                const currentEntities = newConfig.entities || {};
                const newEntities = { ...currentEntities, [key]: value };
                newConfig.entities = newEntities;
            } else {
                newConfig[key] = value;

                if (key === 'show_comet_tail' && value === true) {
                    newConfig.show_dashed_line = false;
                }
                if (key === 'show_dashed_line' && value === true) {
                    newConfig.show_comet_tail = false;
                }
            }

            this._config = newConfig;
            fireEvent(this, "config-changed", { config: this._config });
        }
    }

    _goSubView(view) {
        this._subView = view;
    }

    _goBack() {
        this._subView = null;
    }

    _clearEntity(key) {
        const newConfig = { ...this._config };
        const currentEntities = newConfig.entities || {};
        const newEntities = { ...currentEntities, [key]: "" };
        newConfig.entities = newEntities;
        this._config = newConfig;
        fireEvent(this, "config-changed", { config: this._config });
    }

    _colorChanged(key, ev) {
        const newConfig = { ...this._config, [key]: ev.target.value };
        this._config = newConfig;
        fireEvent(this, "config-changed", { config: this._config });
    }

    _resetColor(key) {
        const newConfig = { ...this._config };
        delete newConfig[key];
        this._config = newConfig;
        fireEvent(this, "config-changed", { config: this._config });
    }

    _renderEntitySelector(entitySelectorSchema, value, configValue, label) {
        const val = value || "";
        return html`
            <div class="entity-picker-wrapper">
                <ha-selector
                    .hass=${this.hass}
                    .selector=${entitySelectorSchema}
                    .value=${val}
                    .configValue=${configValue}
                    .label=${label}
                    @value-changed=${this._valueChanged}
                ></ha-selector>
                ${val ? html`<ha-icon 
                    class="clear-entity-btn" 
                    icon="mdi:close-circle" 
                    @click=${() => this._clearEntity(configValue)}
                ></ha-icon>` : ''}
            </div>
        `;
    }

    _renderColorPicker(key, label, defaultColor) {
        const currentColor = this._config[key] || defaultColor;
        const hasCustom = !!this._config[key];
        return html`
            <div class="color-picker-row">
                <input type="color" 
                       .value=${currentColor}
                       @input=${(e) => this._colorChanged(key, e)}>
                <span class="color-label">${label}</span>
                ${hasCustom ? html`<ha-icon class="color-reset-btn" 
                    icon="mdi:refresh" 
                    @click=${() => this._resetColor(key)}></ha-icon>` : ''}
            </div>
        `;
    }

    static get styles() {
        return css`
      .card-config {
        display: flex;
        flex-direction: column;
        padding-bottom: 24px;
      }
      .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
      }
      .back-btn {
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: bold;
          color: var(--primary-color);
      }
      .menu-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          border-bottom: 1px solid var(--divider-color);
          margin-bottom: 13px;
          cursor: pointer;
          transition: background 0.2s;
      }
      .menu-item:hover {
          background: rgba(var(--rgb-primary-text-color), 0.05);
      }
      .menu-icon {
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: bold;
      }
      .switch-row {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 8px 0;
        margin-top: 8px;
      }
      .switch-label {
        font-weight: bold;
      }
      .section-title {
        font-size: 1.1em;
        font-weight: bold;
        margin-top: 15px;
        margin-bottom: 15px;
        padding-bottom: 4px;
        border-bottom: 1px solid var(--divider-color);
      }
      ha-selector {
        width: 100%;
        display: block;
        margin-bottom: 12px;
      }
      .consumer-group {
        padding: 10px;
        border-radius: 8px;
        border-bottom: 1px solid var(--divider-color);
        margin-bottom: 12px;
      }
      .consumer-title {
        font-weight: bold; 
        margin-bottom: 8px;
        color: var(--primary-text-color);
      }
      .separator {
          border-bottom: 1px solid var(--divider-color);
          margin: 10px 0;
      }
      .entity-picker-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          gap: 4px;
      }
      .entity-picker-wrapper ha-selector {
          flex: 1;
      }
      .clear-entity-btn {
          --mdc-icon-size: 20px;
          color: var(--secondary-text-color);
          cursor: pointer;
          flex-shrink: 0;
          margin-top: -12px;
      }
      .clear-entity-btn:hover {
          color: var(--error-color, #db4437);
      }
      .color-picker-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 0;
      }
      .color-picker-row input[type="color"] {
          -webkit-appearance: none;
          border: 2px solid var(--divider-color);
          border-radius: 50%;
          width: 36px;
          height: 36px;
          padding: 2px;
          cursor: pointer;
          background: transparent;
      }
      .color-picker-row input[type="color"]::-webkit-color-swatch-wrapper {
          padding: 0;
      }
      .color-picker-row input[type="color"]::-webkit-color-swatch {
          border: none;
          border-radius: 50%;
      }
      .color-label {
          flex: 1;
          font-size: 14px;
      }
      .color-reset-btn {
          --mdc-icon-size: 20px;
          color: var(--secondary-text-color);
          cursor: pointer;
      }
      .color-reset-btn:hover {
          color: var(--primary-color);
      }
    `;
    }

    // --- SUBVIEW RENDERING ---

    _renderSolarView(entities, entitySelectorSchema, textSelectorSchema, iconSelectorSchema) {
        return html`
        <div class="header">
            <div class="back-btn" @click=${this._goBack}>
                <ha-icon icon="mdi:arrow-left"></ha-icon> ${this._localize('editor.back')}
            </div>
            <h2>${this._localize('editor.solar_section')}</h2>
        </div>
        
        ${this._renderEntitySelector(entitySelectorSchema, entities.solar, 'solar', this._localize('editor.entity'))}
        
        <div class="separator"></div>

        <ha-selector
            .hass=${this.hass}
            .selector=${textSelectorSchema}
            .value=${this._config.solar_label}
            .configValue=${'solar_label'}
            .label=${this._localize('editor.label') + " (Optional)"}
            @value-changed=${this._valueChanged}
        ></ha-selector>

        <ha-selector
            .hass=${this.hass}
            .selector=${iconSelectorSchema}
            .value=${this._config.solar_icon}
            .configValue=${'solar_icon'}
            .label=${this._localize('editor.icon') + " (Optional)"}
            @value-changed=${this._valueChanged}
        ></ha-selector>

        ${this._renderEntitySelector(entitySelectorSchema, entities.secondary_solar || "", 'secondary_solar', this._localize('editor.secondary_sensor'))}

        ${this._renderColorPicker('color_solar', this._localize('editor.color_picker'), '#ffdd00')}

        <div class="separator"></div>

        <div class="switch-row">
            <ha-switch
                .checked=${this._config.show_label_solar === true} 
                .configValue=${'show_label_solar'}
                @change=${this._valueChanged}
            ></ha-switch>
            <div class="switch-label">${this._localize('editor.label_toggle')}</div>
        </div>

        <div class="switch-row">
            <ha-switch
                .checked=${this._config.show_flow_rate_solar !== false} 
                .configValue=${'show_flow_rate_solar'}
                @change=${this._valueChanged}
            ></ha-switch>
            <div class="switch-label">${this._localize('editor.flow_rate_title')}</div>
        </div>
      `;
    }

    _renderGridView(entities, entitySelectorSchema, textSelectorSchema, iconSelectorSchema) {
        return html`
        <div class="header">
            <div class="back-btn" @click=${this._goBack}>
                <ha-icon icon="mdi:arrow-left"></ha-icon> ${this._localize('editor.back')}
            </div>
            <h2>${this._localize('editor.grid_section')}</h2>
        </div>
        
        ${this._renderEntitySelector(entitySelectorSchema, entities.grid_combined || "", 'grid_combined', this._localize('editor.grid_combined_sensor'))}
        <div style="font-size: 0.8em; color: var(--secondary-text-color); margin-top: 4px;">
            ${this._localize('editor.grid_combined_hint')}
        </div>

        <div class="separator"></div>

        ${this._renderEntitySelector(entitySelectorSchema, entities.grid, 'grid', this._localize('card.label_import') + " (W)")}

        ${this._renderEntitySelector(entitySelectorSchema, entities.grid_export, 'grid_export', this._localize('card.label_export') + " (W, Optional)")}

        <div class="separator"></div>

        <ha-selector
            .hass=${this.hass}
            .selector=${textSelectorSchema}
            .value=${this._config.grid_label}
            .configValue=${'grid_label'}
            .label=${this._localize('editor.label') + " (Optional)"}
            @value-changed=${this._valueChanged}
        ></ha-selector>

        <ha-selector
            .hass=${this.hass}
            .selector=${iconSelectorSchema}
            .value=${this._config.grid_icon}
            .configValue=${'grid_icon'}
            .label=${this._localize('editor.icon') + " (Optional)"}
            @value-changed=${this._valueChanged}
        ></ha-selector>

        ${this._renderEntitySelector(entitySelectorSchema, entities.secondary_grid || "", 'secondary_grid', this._localize('editor.secondary_sensor'))}

        ${this._renderColorPicker('color_grid', this._localize('editor.color_picker'), '#3b82f6')}

        <div class="separator"></div>
        
        <div class="switch-row">
            <ha-switch
                .checked=${this._config.show_label_grid === true} 
                .configValue=${'show_label_grid'}
                @change=${this._valueChanged}
            ></ha-switch>
            <div class="switch-label">${this._localize('editor.label_toggle')}</div>
        </div>

        <div class="switch-row">
            <ha-switch
                .checked=${this._config.show_flow_rate_grid !== false} 
                .configValue=${'show_flow_rate_grid'}
                @change=${this._valueChanged}
            ></ha-switch>
            <div class="switch-label">${this._localize('editor.flow_rate_title')}</div>
        </div>
      `;
    }

    _renderBatteryView(entities, entitySelectorSchema, textSelectorSchema, iconSelectorSchema) {
        return html`
        <div class="header">
            <div class="back-btn" @click=${this._goBack}>
                <ha-icon icon="mdi:arrow-left"></ha-icon> ${this._localize('editor.back')}
            </div>
            <h2>${this._localize('editor.battery_section')}</h2>
        </div>
        
        ${this._renderEntitySelector(entitySelectorSchema, entities.battery, 'battery', this._localize('editor.entity'))}

        ${this._renderEntitySelector(entitySelectorSchema, entities.battery_soc, 'battery_soc', this._localize('editor.battery_soc_label'))}

        ${this._renderEntitySelector(entitySelectorSchema, entities.grid_to_battery || "", 'grid_to_battery', this._localize('editor.grid_to_battery_sensor'))}
        <div style="font-size: 0.8em; color: var(--secondary-text-color); margin-top: 4px;">
            ${this._localize('editor.grid_to_battery_hint')}
        </div>
        
        <div class="separator"></div>

        <ha-selector
            .hass=${this.hass}
            .selector=${textSelectorSchema}
            .value=${this._config.battery_label}
            .configValue=${'battery_label'}
            .label=${this._localize('editor.label') + " (Optional)"}
            @value-changed=${this._valueChanged}
        ></ha-selector>

        <ha-selector
            .hass=${this.hass}
            .selector=${iconSelectorSchema}
            .value=${this._config.battery_icon}
            .configValue=${'battery_icon'}
            .label=${this._localize('editor.icon') + " (Optional)"}
            @value-changed=${this._valueChanged}
        ></ha-selector>

        ${this._renderEntitySelector(entitySelectorSchema, entities.secondary_battery || "", 'secondary_battery', this._localize('editor.secondary_sensor'))}

        ${this._renderColorPicker('color_battery', this._localize('editor.color_picker'), '#00ff88')}
        
        <div class="separator"></div>
        
        <div class="switch-row">
            <ha-switch
                .checked=${this._config.show_label_battery === true} 
                .configValue=${'show_label_battery'}
                @change=${this._valueChanged}
            ></ha-switch>
            <div class="switch-label">${this._localize('editor.label_toggle')}</div>
        </div>

        <div class="switch-row">
            <ha-switch
                .checked=${this._config.show_flow_rate_battery !== false} 
                .configValue=${'show_flow_rate_battery'}
                @change=${this._valueChanged}
            ></ha-switch>
            <div class="switch-label">${this._localize('editor.flow_rate_title')}</div>
        </div>

        <div class="switch-row">
            <ha-switch
                .checked=${this._config.invert_battery === true} 
                .configValue=${'invert_battery'}
                @change=${this._valueChanged}
            ></ha-switch>
            <div class="switch-label">${this._localize('editor.invert_battery')}</div>
        </div>
      `;
    }

    _renderConsumersView(entities, entitySelectorSchema, textSelectorSchema, iconSelectorSchema) {
        return html`
        <div class="header">
            <div class="back-btn" @click=${this._goBack}>
                <ha-icon icon="mdi:arrow-left"></ha-icon> ${this._localize('editor.back')}
            </div>
            <h2>${this._localize('editor.consumers_section')}</h2>
        </div>

        <div class="consumer-group">
            <div class="consumer-title">${this._localize('editor.house_total_title')}</div>
            ${this._renderEntitySelector(entitySelectorSchema, entities.house || "", 'house', this._localize('editor.house_sensor_label'))}
             <div style="font-size: 0.8em; color: var(--secondary-text-color); margin-top: 4px;">
                ${this._localize('editor.house_sensor_hint')}
            </div>
        </div>

        <div class="consumer-group">
            <div class="consumer-title" style="color: #a855f7;">${this._localize('editor.consumer_1_title')}</div>
            ${this._renderEntitySelector(entitySelectorSchema, entities.consumer_1, 'consumer_1', this._localize('editor.entity'))}
            
            <ha-selector
                .hass=${this.hass}
                .selector=${textSelectorSchema}
                .value=${this._config.consumer_1_label}
                .configValue=${'consumer_1_label'}
                .label=${this._localize('editor.label')}
                @value-changed=${this._valueChanged}
            ></ha-selector>

            <ha-selector
                .hass=${this.hass}
                .selector=${iconSelectorSchema}
                .value=${this._config.consumer_1_icon}
                .configValue=${'consumer_1_icon'}
                .label=${this._localize('editor.icon')}
                @value-changed=${this._valueChanged}
            ></ha-selector>

            <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 8px;">
                <span>${this._localize('editor.invert_consumer_1')}</span>
                <ha-switch
                    .checked=${this._config.invert_consumer_1 === true}
                    .configValue=${'invert_consumer_1'}
                    @change=${this._valueChanged}
                ></ha-switch>
            </div>

            ${this._renderEntitySelector(entitySelectorSchema, entities.secondary_consumer_1 || "", 'secondary_consumer_1', this._localize('editor.secondary_sensor'))}

            ${this._renderColorPicker('color_consumer_1', this._localize('editor.color_picker'), '#a855f7')}
        </div>

        <div class="consumer-group">
            <div class="consumer-title" style="color: #f97316;">${this._localize('editor.consumer_2_title')}</div>
            ${this._renderEntitySelector(entitySelectorSchema, entities.consumer_2, 'consumer_2', this._localize('editor.entity'))}

            <ha-selector
                .hass=${this.hass}
                .selector=${textSelectorSchema}
                .value=${this._config.consumer_2_label}
                .configValue=${'consumer_2_label'}
                .label=${this._localize('editor.label')}
                @value-changed=${this._valueChanged}
            ></ha-selector>

            <ha-selector
                .hass=${this.hass}
                .selector=${iconSelectorSchema}
                .value=${this._config.consumer_2_icon}
                .configValue=${'consumer_2_icon'}
                .label=${this._localize('editor.icon')}
                @value-changed=${this._valueChanged}
            ></ha-selector>

            ${this._renderEntitySelector(entitySelectorSchema, entities.secondary_consumer_2 || "", 'secondary_consumer_2', this._localize('editor.secondary_sensor'))}

            ${this._renderColorPicker('color_consumer_2', this._localize('editor.color_picker'), '#f97316')}
        </div>

        <div class="consumer-group">
            <div class="consumer-title" style="color: #06b6d4;">${this._localize('editor.consumer_3_title')}</div>
            ${this._renderEntitySelector(entitySelectorSchema, entities.consumer_3, 'consumer_3', this._localize('editor.entity'))}

            <ha-selector
                .hass=${this.hass}
                .selector=${textSelectorSchema}
                .value=${this._config.consumer_3_label}
                .configValue=${'consumer_3_label'}
                .label=${this._localize('editor.label')}
                @value-changed=${this._valueChanged}
            ></ha-selector>

            <ha-selector
                .hass=${this.hass}
                .selector=${iconSelectorSchema}
                .value=${this._config.consumer_3_icon}
                .configValue=${'consumer_3_icon'}
                .label=${this._localize('editor.icon')}
                @value-changed=${this._valueChanged}
            ></ha-selector>

            ${this._renderEntitySelector(entitySelectorSchema, entities.secondary_consumer_3 || "", 'secondary_consumer_3', this._localize('editor.secondary_sensor'))}

            ${this._renderColorPicker('color_consumer_3', this._localize('editor.color_picker'), '#06b6d4')}
        </div>
      `;
    }

    render() {
        if (!this.hass || !this._config) {
            return html``;
        }

        const entities = this._config.entities || {};

        const entitySelectorSchema = { entity: { domain: ["sensor", "input_number"] } };
        const textSelectorSchema = { text: {} };
        const iconSelectorSchema = { icon: {} };

        // SUBVIEW ROUTING
        if (this._subView === 'solar') return this._renderSolarView(entities, entitySelectorSchema, textSelectorSchema, iconSelectorSchema);
        if (this._subView === 'grid') return this._renderGridView(entities, entitySelectorSchema, textSelectorSchema, iconSelectorSchema);
        if (this._subView === 'battery') return this._renderBatteryView(entities, entitySelectorSchema, textSelectorSchema, iconSelectorSchema);
        if (this._subView === 'consumers') return this._renderConsumersView(entities, entitySelectorSchema, textSelectorSchema, iconSelectorSchema);


        // MAIN MENU VIEW
        return html`
      <div class="card-config">
        
        <div class="section-title">${this._localize('editor.main_title')}</div>

        <div class="menu-item" @click=${() => this._goSubView('solar')}>
            <div class="menu-icon"><ha-icon icon="mdi:solar-power"></ha-icon> ${this._localize('editor.solar_section')}</div>
            <ha-icon icon="mdi:chevron-right"></ha-icon>
        </div>

        <div class="menu-item" @click=${() => this._goSubView('grid')}>
            <div class="menu-icon"><ha-icon icon="mdi:transmission-tower"></ha-icon> ${this._localize('editor.grid_section')}</div>
            <ha-icon icon="mdi:chevron-right"></ha-icon>
        </div>

        <div class="menu-item" @click=${() => this._goSubView('battery')}>
            <div class="menu-icon"><ha-icon icon="mdi:battery-high"></ha-icon> ${this._localize('editor.battery_section')}</div>
            <ha-icon icon="mdi:chevron-right"></ha-icon>
        </div>
        
        <div class="menu-item" @click=${() => this._goSubView('consumers')}>
            <div class="menu-icon"><ha-icon icon="mdi:devices"></ha-icon> ${this._localize('editor.consumers_section')}</div>
            <ha-icon icon="mdi:chevron-right"></ha-icon>
        </div>

        <div class="section-title">${this._localize('editor.options_section')}</div>
        
        <div>
            <ha-selector
                .hass=${this.hass}
                .selector=${{ number: { min: 0.5, max: 1.5, step: 0.05, mode: "slider" } }}
                .value=${this._config.zoom !== undefined ? this._config.zoom : 0.9}
                .configValue=${'zoom'}
                .label=${this._localize('editor.zoom_label')}
                @value-changed=${this._valueChanged}
            ></ha-selector>
        </div>

        <div class="switch-row">
            <ha-switch
                .checked=${this._config.show_neon_glow !== false} 
                .configValue=${'show_neon_glow'}
                @change=${this._valueChanged}
            ></ha-switch>
            <div class="switch-label">${this._localize('editor.neon_glow')}</div>
        </div>
        
        <div class="switch-row">
            <ha-switch
                .checked=${this._config.show_donut_border === true}
                .configValue=${'show_donut_border'}
                @change=${this._valueChanged}
            ></ha-switch>
            <div class="switch-label">${this._localize('editor.donut_chart')}</div>
        </div>
        
        <div class="switch-row">
            <ha-switch
                .checked=${this._config.show_comet_tail === true}
                .configValue=${'show_comet_tail'}
                @change=${this._valueChanged}
            ></ha-switch>
            <div class="switch-label">${this._localize('editor.comet_tail')}</div>
        </div>
        
        <div class="switch-row">
            <ha-switch
                .checked=${this._config.show_dashed_line === true}
                .configValue=${'show_dashed_line'}
                @change=${this._valueChanged}
            ></ha-switch>
            <div class="switch-label">${this._localize('editor.dashed_line')}</div>
        </div>
        
        <div class="switch-row">
            <ha-switch
                .checked=${this._config.show_tinted_background === true}
                .configValue=${'show_tinted_background'}
                @change=${this._valueChanged}
            ></ha-switch>
            <div class="switch-label">${this._localize('editor.tinted_background')}</div>
        </div>
        
        <div class="switch-row">
            <ha-switch
                .checked=${this._config.use_colored_values === true}
                .configValue=${'use_colored_values'}
                @change=${this._valueChanged}
            ></ha-switch>
            <div class="switch-label">${this._localize('editor.colored_values')}</div>
        </div>
        
        <div class="switch-row">
            <ha-switch
                .checked=${this._config.hide_consumer_icons === true}
                .configValue=${'hide_consumer_icons'}
                @change=${this._valueChanged}
            ></ha-switch>
            <div class="switch-label">${this._localize('editor.hide_consumer_icons')}</div>
        </div>
        
        <div class="switch-row">
            <ha-switch
                .checked=${this._config.hide_inactive_flows !== false}
                .configValue=${'hide_inactive_flows'}
                @change=${this._valueChanged}
            ></ha-switch>
            <div class="switch-label">${this._localize('editor.hide_inactive')}</div>
        </div>

        <div class="switch-row">
            <ha-switch
                .checked=${this._config.compact_view === true} 
                .configValue=${'compact_view'}
                @change=${this._valueChanged}
            ></ha-switch>
            <div class="switch-label">${this._localize('editor.compact_view')}</div>
        </div>
		
      </div>
    `;
    }
}

customElements.define("power-flux-card-editor", PowerFluxCardEditor);
