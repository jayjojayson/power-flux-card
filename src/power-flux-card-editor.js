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
            'solar', 'grid', 'grid_export', 
            'battery', 'battery_soc', 
            'consumer_1', 'consumer_2', 'consumer_3'
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
    `;
  }

  // --- SUBVIEW RENDERING ---

  _renderSolarView(entities, entitySelectorSchema, textSelectorSchema, iconSelectorSchema) {
      return html`
        <div class="header">
            <div class="back-btn" @click=${this._goBack}>
                <ha-icon icon="mdi:arrow-left"></ha-icon> Zurück
            </div>
            <h2>${this._localize('editor.solar_section')}</h2>
        </div>
        
        <ha-selector
            .hass=${this.hass}
            .selector=${entitySelectorSchema}
            .value=${entities.solar}
            .configValue=${'solar'}
            .label=${this._localize('editor.entity')}
            @value-changed=${this._valueChanged}
        ></ha-selector>
        
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

        <div class="separator"></div>

        <div class="switch-row">
            <ha-switch
                .checked=${this._config.show_label_solar !== false} 
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
                <ha-icon icon="mdi:arrow-left"></ha-icon> Zurück
            </div>
            <h2>${this._localize('editor.grid_section')}</h2>
        </div>
        
        <ha-selector
            .hass=${this.hass}
            .selector=${entitySelectorSchema}
            .value=${entities.grid}
            .configValue=${'grid'}
            .label=${this._localize('card.label_import') + " (W)"}
            @value-changed=${this._valueChanged}
        ></ha-selector>

        <ha-selector
            .hass=${this.hass}
            .selector=${entitySelectorSchema}
            .value=${entities.grid_export}
            .configValue=${'grid_export'}
            .label=${this._localize('card.label_export') + " (W, Optional)"}
            @value-changed=${this._valueChanged}
        ></ha-selector>

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

        <div class="separator"></div>
        
        <div class="switch-row">
            <ha-switch
                .checked=${this._config.show_label_grid !== false} 
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
                <ha-icon icon="mdi:arrow-left"></ha-icon> Zurück
            </div>
            <h2>${this._localize('editor.battery_section')}</h2>
        </div>
        
        <ha-selector
            .hass=${this.hass}
            .selector=${entitySelectorSchema}
            .value=${entities.battery}
            .configValue=${'battery'}
            .label=${this._localize('editor.entity')}
            @value-changed=${this._valueChanged}
        ></ha-selector>

        <ha-selector
            .hass=${this.hass}
            .selector=${entitySelectorSchema}
            .value=${entities.battery_soc}
            .configValue=${'battery_soc'}
            .label=${"Ladestand (%)"}
            @value-changed=${this._valueChanged}
        ></ha-selector>
        
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
        
        <div class="separator"></div>
        
        <div class="switch-row">
            <ha-switch
                .checked=${this._config.show_label_battery !== false} 
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
      `;
  }

  _renderConsumersView(entities, entitySelectorSchema, textSelectorSchema, iconSelectorSchema) {
      return html`
        <div class="header">
            <div class="back-btn" @click=${this._goBack}>
                <ha-icon icon="mdi:arrow-left"></ha-icon> Zurück
            </div>
            <h2>${this._localize('editor.consumers_section')}</h2>
        </div>

        <div class="consumer-group">
            <div class="consumer-title" style="color: #a855f7;">🚗 Links (Lila)</div>
            <ha-selector
                .hass=${this.hass}
                .selector=${entitySelectorSchema}
                .value=${entities.consumer_1}
                .configValue=${'consumer_1'}
                .label=${this._localize('editor.entity')}
                @value-changed=${this._valueChanged}
            ></ha-selector>
            
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
        </div>

        <div class="consumer-group">
            <div class="consumer-title" style="color: #f97316;">♨️ Mitte (Orange)</div>
            <ha-selector
                .hass=${this.hass}
                .selector=${entitySelectorSchema}
                .value=${entities.consumer_2}
                .configValue=${'consumer_2'}
                .label=${this._localize('editor.entity')}
                @value-changed=${this._valueChanged}
            ></ha-selector>

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
        </div>

        <div class="consumer-group">
            <div class="consumer-title" style="color: #06b6d4;">🏊 Rechts (Türkis)</div>
            <ha-selector
                .hass=${this.hass}
                .selector=${entitySelectorSchema}
                .value=${entities.consumer_3}
                .configValue=${'consumer_3'}
                .label=${this._localize('editor.entity')}
                @value-changed=${this._valueChanged}
            ></ha-selector>

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
                .label=${"🔍 Zoom (Standard View)"}
                @value-changed=${this._valueChanged}
            ></ha-selector>
        </div>

        <div class="switch-row">
            <ha-switch
                .checked=${this._config.show_neon_glow !== false} 
                .configValue=${'show_neon_glow'}
                @change=${this._valueChanged}
            ></ha-switch>
            <div class="switch-label">Neon Glow</div>
        </div>
        
        <div class="switch-row">
            <ha-switch
                .checked=${this._config.show_donut_border === true}
                .configValue=${'show_donut_border'}
                @change=${this._valueChanged}
            ></ha-switch>
            <div class="switch-label">Donut Chart (Grid/Haus)</div>
        </div>
        
        <div class="switch-row">
            <ha-switch
                .checked=${this._config.show_comet_tail === true}
                .configValue=${'show_comet_tail'}
                @change=${this._valueChanged}
            ></ha-switch>
            <div class="switch-label">Comet Tail Effect</div>
        </div>
        
        <div class="switch-row">
            <ha-switch
                .checked=${this._config.show_dashed_line === true}
                .configValue=${'show_dashed_line'}
                @change=${this._valueChanged}
            ></ha-switch>
            <div class="switch-label">Dashed Line Animation</div>
        </div>
        
        <div class="switch-row">
            <ha-switch
                .checked=${this._config.use_colored_values === true}
                .configValue=${'use_colored_values'}
                @change=${this._valueChanged}
            ></ha-switch>
            <div class="switch-label">Farbige Textwerte</div>
        </div>
        
        <div class="switch-row">
            <ha-switch
                .checked=${this._config.hide_consumer_icons === true}
                .configValue=${'hide_consumer_icons'}
                @change=${this._valueChanged}
            ></ha-switch>
            <div class="switch-label">Icons unten ausblenden</div>
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
