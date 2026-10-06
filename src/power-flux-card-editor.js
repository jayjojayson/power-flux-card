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
            _subView: { state: true }, // Controls which sub-page is open (null = main)
            _openConsumer: { state: true } // Index of the expanded consumer group (null = all collapsed)
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
        const key = target.configValue;

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
                'battery_charge', 'battery_discharge',
                'house',
                'consumer_1', 'consumer_2', 'consumer_3',
                'consumer_4', 'consumer_5',
                'secondary_solar', 'secondary_grid', 'secondary_battery',
                'secondary_consumer_1', 'secondary_consumer_2', 'secondary_consumer_3',
                'secondary_consumer_4', 'secondary_consumer_5',
                'secondary_house',
                'tertiary_consumer_1', 'tertiary_consumer_2', 'tertiary_consumer_3',
                'tertiary_consumer_4', 'tertiary_consumer_5',
                'tertiary_house'
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
                if (key === 'horizontal_view' && value === true) {
                    newConfig.diamond_view = false;
                }
                if (key === 'diamond_view' && value === true) {
                    newConfig.horizontal_view = false;
                }
                if (key === 'force_watt_display' && value === true) {
                    newConfig.force_kw_display = false;
                }
                if (key === 'force_kw_display' && value === true) {
                    newConfig.force_watt_display = false;
                }
                if (key === 'battery_split_ring' && value === true) {
                    newConfig.battery_split_quarters = false;
                }
                if (key === 'battery_split_quarters' && value === true) {
                    newConfig.battery_split_ring = false;
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

    // Additional solar sensors (entities.solar_extra), summed together with the primary solar sensor.
    _addSolarExtra() {
        const currentEntities = this._config.entities || {};
        const list = Array.isArray(currentEntities.solar_extra) ? [...currentEntities.solar_extra] : [];
        list.push("");
        const newConfig = { ...this._config, entities: { ...currentEntities, solar_extra: list } };
        this._config = newConfig;
        fireEvent(this, "config-changed", { config: this._config });
    }

    _removeSolarExtra(index) {
        const currentEntities = this._config.entities || {};
        const list = Array.isArray(currentEntities.solar_extra) ? [...currentEntities.solar_extra] : [];
        list.splice(index, 1);
        const newConfig = { ...this._config, entities: { ...currentEntities, solar_extra: list } };
        this._config = newConfig;
        fireEvent(this, "config-changed", { config: this._config });
    }

    _solarExtraChanged(index, ev) {
        const value = (ev.detail && 'value' in ev.detail) ? ev.detail.value : ev.target.value;
        const currentEntities = this._config.entities || {};
        const list = Array.isArray(currentEntities.solar_extra) ? [...currentEntities.solar_extra] : [];
        list[index] = value || "";
        const newConfig = { ...this._config, entities: { ...currentEntities, solar_extra: list } };
        this._config = newConfig;
        fireEvent(this, "config-changed", { config: this._config });
    }

    // Additional batteries (entities.batteries_extra). Each battery carries its own
    // combined/charge/discharge/soc sensors plus unit_kw and invert flags. Max 3 extra (4 total).
    _addBattery() {
        const currentEntities = this._config.entities || {};
        const list = Array.isArray(currentEntities.batteries_extra) ? [...currentEntities.batteries_extra] : [];
        if (list.length >= 3) return;
        list.push({ power: "", charge: "", discharge: "", soc: "", unit_kw: false, invert: false });
        const newConfig = { ...this._config, entities: { ...currentEntities, batteries_extra: list } };
        this._config = newConfig;
        fireEvent(this, "config-changed", { config: this._config });
    }

    _removeBattery(index) {
        const currentEntities = this._config.entities || {};
        const list = Array.isArray(currentEntities.batteries_extra) ? [...currentEntities.batteries_extra] : [];
        list.splice(index, 1);
        const newConfig = { ...this._config, entities: { ...currentEntities, batteries_extra: list } };
        this._config = newConfig;
        fireEvent(this, "config-changed", { config: this._config });
    }

    _batteryExtraChanged(index, field, ev) {
        let value;
        if (ev.target && ev.target.tagName === 'HA-SWITCH') {
            value = ev.target.checked;
        } else {
            value = (ev.detail && 'value' in ev.detail) ? ev.detail.value : ev.target.value;
        }
        if (value === null || value === undefined) value = "";
        const currentEntities = this._config.entities || {};
        const list = Array.isArray(currentEntities.batteries_extra) ? [...currentEntities.batteries_extra] : [];
        const item = { ...(list[index] || {}) };
        item[field] = value;
        list[index] = item;
        const newConfig = { ...this._config, entities: { ...currentEntities, batteries_extra: list } };
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

    _renderColorPickerQuint(bubbleKey, pipeKey, textKey, iconKey, secondaryKey, defaultColor) {
        const items = [
            { key: bubbleKey, label: this._localize('editor.color_picker'), default: defaultColor },
            ];
        if (pipeKey) items.push({ key: pipeKey, label: this._localize('editor.pipe_color'), default: defaultColor });
        items.push({ key: textKey, label: this._localize('editor.text_color'), default: defaultColor });
        items.push({ key: iconKey, label: this._localize('editor.icon_color'), default: defaultColor });
        items.push({ key: secondaryKey, label: this._localize('editor.secondary_color'), default: '#888888' });
        return html`
            <div class="color-picker-quint">
                ${items.map(item => {
                    const color = this._config[item.key] || item.default;
                    const hasCustom = !!this._config[item.key];
                    return html`
                        <div class="color-picker-row">
                            <input type="color" 
                                   .value=${color}
                                   @input=${(e) => this._colorChanged(item.key, e)}>
                            <span class="color-label">${item.label}</span>
                            ${hasCustom ? html`<ha-icon class="color-reset-btn" 
                                icon="mdi:refresh" 
                                @click=${() => this._resetColor(item.key)}></ha-icon>` : ''}
                        </div>
                    `;
                })}
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
      /* compensates the text/number selector's extra reserved helper-text height (84px vs 56px) */
      ha-selector.tight-label-field {
        margin-bottom: -16px;
      }
      .consumer-group {
        padding: 4px 10px;
        border-radius: 8px;
        border-bottom: 1px solid var(--divider-color);
        margin-bottom: 8px;
      }
      .consumer-group.open {
        padding-bottom: 10px;
        background: rgba(var(--rgb-primary-text-color, 255, 255, 255), 0.03);
      }
      .consumer-header {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 0;
        cursor: pointer;
      }
      .consumer-header:hover .consumer-chevron {
        color: var(--primary-color);
      }
      .consumer-summary {
        flex: 1;
        text-align: right;
        font-size: 0.85em;
        color: var(--secondary-text-color);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .consumer-chevron {
        --mdc-icon-size: 20px;
        color: var(--secondary-text-color);
        flex-shrink: 0;
      }
      .consumer-title {
        font-weight: bold;
        color: var(--primary-text-color);
        white-space: nowrap;
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
      .add-entity-btn {
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: bold;
          color: var(--primary-color);
          padding: 8px 0;
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
          width: 30px;
          height: 30px;
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
      .color-picker-quint {
          display: flex;
          gap: 6px;
      }
      .color-picker-quint .color-picker-row {
          flex: 1;
      }
      .color-picker-quint input[type="color"] {
          width: 26px;
          height: 26px;
      }
      .color-row-title {
          font-size: 0.9em;
          font-weight: bold;
          margin-top: 10px;
          color: var(--primary-text-color);
      }
      .option-group {
          border: 1px solid var(--divider-color);
          border-radius: 12px;
          padding: 4px 16px 10px;
          margin-bottom: 14px;
          background: rgba(var(--rgb-primary-text-color, 255, 255, 255), 0.03);
      }
      .option-group-title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: bold;
          padding: 10px 0 8px;
          border-bottom: 1px solid var(--divider-color);
          margin-bottom: 4px;
      }
      .option-group-title ha-icon {
          --mdc-icon-size: 18px;
          color: var(--primary-color);
      }
      .option-group .switch-row {
          padding: 6px 0;
          margin-top: 0;
      }
      .option-group ha-selector {
          margin-top: 8px;
          margin-bottom: 4px;
      }
    `;
    }

    // One configuration block for an additional consumer (1-5)
    _renderConsumerGroup(idx, defaultColor, entities, entitySelectorSchema, textSelectorSchema, iconSelectorSchema) {
        const cfg = this._config;
        const inlineSwitch = (configKey, labelKey) => html`
            <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 8px;">
                <span>${this._localize(labelKey)}</span>
                <ha-switch
                    .checked=${cfg[configKey] === true}
                    .configValue=${configKey}
                    @change=${this._valueChanged}
                ></ha-switch>
            </div>`;
        const slider = (configKey, labelKey, max, step) => html`
            <ha-selector
                .hass=${this.hass}
                .selector=${{ number: { min: 0, max: max, step: step, mode: "slider" } }}
                .value=${cfg[configKey] !== undefined ? cfg[configKey] : 0}
                .configValue=${configKey}
                .label=${this._localize(labelKey)}
                @value-changed=${this._valueChanged}
            ></ha-selector>`;

        const isOpen = this._openConsumer === idx;
        const entityId = entities[`consumer_${idx}`];
        const summary = cfg[`consumer_${idx}_label`] || (entityId ? entityId : this._localize('editor.consumer_not_set'));

        return html`
        <div class="consumer-group ${isOpen ? 'open' : ''}">
            <div class="consumer-header" @click=${() => this._toggleConsumer(idx)}>
                <div class="consumer-title" style="color: ${defaultColor};">${this._localize(`editor.consumer_${idx}_title`)}</div>
                <div class="consumer-summary">${summary}</div>
                <ha-icon class="consumer-chevron" icon="${isOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'}"></ha-icon>
            </div>
            ${!isOpen ? '' : html`
            ${this._renderEntitySelector(entitySelectorSchema, entities[`consumer_${idx}`], `consumer_${idx}`, this._localize('editor.entity'))}

            <ha-selector
                .hass=${this.hass}
                .selector=${textSelectorSchema}
                .value=${cfg[`consumer_${idx}_label`]}
                .configValue=${`consumer_${idx}_label`}
                .label=${this._localize('editor.label')}
                @value-changed=${this._valueChanged}
            ></ha-selector>

            <ha-selector
                .hass=${this.hass}
                .selector=${iconSelectorSchema}
                .value=${cfg[`consumer_${idx}_icon`]}
                .configValue=${`consumer_${idx}_icon`}
                .label=${this._localize('editor.icon')}
                @value-changed=${this._valueChanged}
            ></ha-selector>

            ${inlineSwitch(`invert_consumer_${idx}`, 'editor.invert_consumer')}

            ${inlineSwitch(`consumer_${idx}_standby`, 'editor.consumer_standby')}
            ${cfg[`consumer_${idx}_standby`] === true ? html`
                ${slider(`consumer_${idx}_standby_threshold`, 'editor.consumer_standby_threshold', 100, 1)}
                <div style="font-size: 0.8em; color: var(--secondary-text-color); margin-top: -4px; margin-bottom: 4px;">
                    ${this._localize('editor.consumer_standby_hint')}
                </div>` : ''}

            ${inlineSwitch(`consumer_${idx}_hide_pipe`, 'editor.consumer_hide_pipe')}
            ${cfg[`consumer_${idx}_hide_pipe`] === true
                ? slider(`consumer_${idx}_pipe_threshold`, 'editor.consumer_pipe_threshold', 2000, 10)
                : ''}

            <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 8px; margin-bottom: 8px;">
                <span>${this._localize('editor.consumer_unit_kw')}</span>
                <ha-switch
                    .checked=${cfg[`consumer_${idx}_unit_kw`] === true}
                    .configValue=${`consumer_${idx}_unit_kw`}
                    @change=${this._valueChanged}
                ></ha-switch>
            </div>

            ${this._renderEntitySelector(entitySelectorSchema, entities[`secondary_consumer_${idx}`] || "", `secondary_consumer_${idx}`, this._localize('editor.secondary_sensor'))}
            ${this._renderEntitySelector(entitySelectorSchema, entities[`tertiary_consumer_${idx}`] || "", `tertiary_consumer_${idx}`, this._localize('editor.tertiary_sensor'))}
            <div style="font-size: 0.8em; color: var(--secondary-text-color); margin-top: -4px; margin-bottom: 4px;">
                ${this._localize('editor.tertiary_sensor_hint')}
            </div>

            ${this._renderColorPickerQuint(`color_consumer_${idx}`, `color_pipe_consumer_${idx}`, `color_text_consumer_${idx}`, `color_icon_consumer_${idx}`, `color_secondary_consumer_${idx}`, defaultColor)}
            `}
        </div>`;
    }

    _toggleConsumer(idx) {
        this._openConsumer = this._openConsumer === idx ? null : idx;
    }

    _renderSwitch(configKey, labelKey, checked) {
        return html`
        <div class="switch-row">
            <ha-switch
                .checked=${checked}
                .configValue=${configKey}
                @change=${this._valueChanged}
            ></ha-switch>
            <div class="switch-label">${this._localize(labelKey)}</div>
        </div>`;
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
        
        ${this._renderEntitySelector(entitySelectorSchema, entities.solar, 'solar', this._localize('editor.solar_sensor_label'))}

        ${(entities.solar_extra || []).map((val, i) => html`
        <div class="entity-picker-wrapper">
            <ha-selector
                .hass=${this.hass}
                .selector=${entitySelectorSchema}
                .value=${val || ""}
                .label=${this._localize('editor.solar_extra_label')}
                @value-changed=${(ev) => this._solarExtraChanged(i, ev)}
            ></ha-selector>
            <ha-icon
                class="clear-entity-btn"
                icon="mdi:close-circle"
                @click=${() => this._removeSolarExtra(i)}
            ></ha-icon>
        </div>
        `)}

        <div class="add-entity-btn" @click=${() => this._addSolarExtra()}>
            <ha-icon icon="mdi:plus-circle-outline"></ha-icon> ${this._localize('editor.add_solar_sensor')}
        </div>
        <div style="font-size: 0.8em; color: var(--secondary-text-color); margin-top: 4px;">
            ${this._localize('editor.solar_extra_hint')}
        </div>
        
        <div class="separator"></div>

        <ha-selector
            class="tight-label-field"
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

        ${this._renderColorPickerQuint('color_solar', 'color_pipe_solar', 'color_text_solar', 'color_icon_solar', 'color_secondary_solar', '#ffdd00')}

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
                .checked=${this._config.solar_unit_kw === true}
                .configValue=${'solar_unit_kw'}
                @change=${this._valueChanged}
            ></ha-switch>
            <div class="switch-label">${this._localize('editor.solar_unit_kw')}</div>
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
        
        <div class="separator"></div>

        <div style="font-size: 0.8em; color: var(--secondary-text-color); margin-top: 4px;">
            ${this._localize('editor.grid_combined_hint')}
        </div>


        ${this._renderEntitySelector(entitySelectorSchema, entities.grid, 'grid', this._localize('card.label_import') + " (W)")}

        ${this._renderEntitySelector(entitySelectorSchema, entities.grid_export, 'grid_export', this._localize('card.label_export') + " (W, Optional)")}

        <div class="separator"></div>

        <ha-selector
            class="tight-label-field"
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

        ${this._renderColorPickerQuint('color_grid', 'color_pipe_grid', 'color_text_grid', 'color_icon_grid', 'color_secondary_grid', '#3b82f6')}

        <div class="color-row-title">${this._localize('editor.export_color')}</div>
        ${this._renderColorPickerQuint('color_export', 'color_pipe_export', 'color_text_export', 'color_icon_export', 'color_secondary_export', '#ff3333')}
        <div style="font-size: 0.8em; color: var(--secondary-text-color); margin-bottom:10px;">
            ${this._localize('editor.export_color_hint')}
        </div>

        <ha-selector
            .hass=${this.hass}
            .selector=${iconSelectorSchema}
            .value=${this._config.export_icon}
            .configValue=${'export_icon'}
            .label=${this._localize('editor.export_icon') + " (Optional)"}
            @value-changed=${this._valueChanged}
        ></ha-selector>
        <div style="font-size: 0.8em; color: var(--secondary-text-color);">
            ${this._localize('editor.export_icon_hint')}
        </div>

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
                .checked=${this._config.grid_unit_kw === true}
                .configValue=${'grid_unit_kw'}
                @change=${this._valueChanged}
            ></ha-switch>
            <div class="switch-label">${this._localize('editor.grid_unit_kw')}</div>
        </div>

        <div class="switch-row">
            <ha-switch
                .checked=${this._config.invert_grid === true}
                .configValue=${'invert_grid'}
                @change=${this._valueChanged}
            ></ha-switch>
            <div class="switch-label">${this._localize('editor.invert_grid')}</div>
        </div>

        <div class="switch-row">
            <ha-switch
                .checked=${this._config.show_flow_rate_grid !== false}
                .configValue=${'show_flow_rate_grid'}
                @change=${this._valueChanged}
            ></ha-switch>
            <div class="switch-label">${this._localize('editor.flow_rate_title')}</div>
        </div>

        <div class="separator"></div>

        <ha-selector
            class="tight-label-field"
            .hass=${this.hass}
            .selector=${{ number: { min: 0, max: 500, step: 5, mode: "box", unit_of_measurement: "W" } }}
            .value=${this._config.grid_threshold !== undefined ? this._config.grid_threshold : 0}
            .configValue=${'grid_threshold'}
            .label=${this._localize('editor.grid_threshold')}
            @value-changed=${this._valueChanged}
        ></ha-selector>
        <div style="font-size: 0.8em; color: var(--secondary-text-color); margin-top: -4px; margin-bottom: 4px;">
            ${this._localize('editor.grid_threshold_hint')}
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

        <div class="separator"></div>

        <div style="font-size: 0.8em; color: var(--secondary-text-color); margin-top: 4px;">
            ${this._localize('editor.battery_separate_hint')}
        </div>
        ${this._renderEntitySelector(entitySelectorSchema, entities.battery_charge || "", 'battery_charge', this._localize('editor.battery_charge_sensor'))}
        ${this._renderEntitySelector(entitySelectorSchema, entities.battery_discharge || "", 'battery_discharge', this._localize('editor.battery_discharge_sensor'))}

        <div class="separator"></div>

        <ha-selector
            class="tight-label-field"
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

        ${this._renderEntitySelector(entitySelectorSchema, entities.battery_soc, 'battery_soc', this._localize('editor.battery_soc_label'))}

        <div class="separator"></div>

        <div style="font-size: 0.8em; color: var(--secondary-text-color); margin-top: 4px;">
            ${this._localize('editor.grid_to_battery_hint')}
        </div>
        ${this._renderEntitySelector(entitySelectorSchema, entities.grid_to_battery || "", 'grid_to_battery', this._localize('editor.grid_to_battery_sensor'))}

        ${this._renderEntitySelector(entitySelectorSchema, entities.secondary_battery || "", 'secondary_battery', this._localize('editor.secondary_sensor'))}

        <div class="separator"></div>

        <div class="color-row-title">${this._localize('editor.battery_multi_title')}</div>
        <div style="font-size: 0.8em; color: var(--secondary-text-color); margin-top: 4px; margin-bottom: 8px;">
            ${this._localize('editor.battery_multi_hint')}
        </div>

        ${(entities.batteries_extra || []).map((b, i) => html`
        <div class="option-group">
            <div class="option-group-title" style="justify-content: space-between;">
                <span><ha-icon icon="mdi:battery-plus-variant"></ha-icon> ${this._localize('editor.battery_extra_title')} ${i + 2}</span>
                <ha-icon class="clear-entity-btn" style="margin-top: 0;" icon="mdi:delete-outline" @click=${() => this._removeBattery(i)}></ha-icon>
            </div>
            <ha-selector
                .hass=${this.hass}
                .selector=${{ text: {} }}
                .value=${(b && b.label) || ""}
                .label=${this._localize('editor.label') + " (Optional)"}
                @value-changed=${(ev) => this._batteryExtraChanged(i, 'label', ev)}
            ></ha-selector>
            <ha-selector
                .hass=${this.hass}
                .selector=${entitySelectorSchema}
                .value=${(b && b.power) || ""}
                .label=${this._localize('editor.entity')}
                @value-changed=${(ev) => this._batteryExtraChanged(i, 'power', ev)}
            ></ha-selector>
            <div style="font-size: 0.8em; color: var(--secondary-text-color); margin-top: -4px; margin-bottom: 4px;">
                ${this._localize('editor.battery_separate_hint')}
            </div>
            <ha-selector
                .hass=${this.hass}
                .selector=${entitySelectorSchema}
                .value=${(b && b.charge) || ""}
                .label=${this._localize('editor.battery_charge_sensor')}
                @value-changed=${(ev) => this._batteryExtraChanged(i, 'charge', ev)}
            ></ha-selector>
            <ha-selector
                .hass=${this.hass}
                .selector=${entitySelectorSchema}
                .value=${(b && b.discharge) || ""}
                .label=${this._localize('editor.battery_discharge_sensor')}
                @value-changed=${(ev) => this._batteryExtraChanged(i, 'discharge', ev)}
            ></ha-selector>
            <ha-selector
                .hass=${this.hass}
                .selector=${entitySelectorSchema}
                .value=${(b && b.soc) || ""}
                .label=${this._localize('editor.battery_soc_label')}
                @value-changed=${(ev) => this._batteryExtraChanged(i, 'soc', ev)}
            ></ha-selector>
            <div class="switch-row">
                <ha-switch
                    .checked=${!!(b && b.unit_kw)}
                    @change=${(ev) => this._batteryExtraChanged(i, 'unit_kw', ev)}
                ></ha-switch>
                <div class="switch-label">${this._localize('editor.battery_unit_kw')}</div>
            </div>
            <div class="switch-row">
                <ha-switch
                    .checked=${!!(b && b.invert)}
                    @change=${(ev) => this._batteryExtraChanged(i, 'invert', ev)}
                ></ha-switch>
                <div class="switch-label">${this._localize('editor.invert_battery')}</div>
            </div>
        </div>
        `)}

        ${(entities.batteries_extra || []).length < 3 ? html`
        <div class="add-entity-btn" @click=${() => this._addBattery()}>
            <ha-icon icon="mdi:plus-circle-outline"></ha-icon> ${this._localize('editor.add_battery')}
        </div>` : html`
        <div style="font-size: 0.8em; color: var(--secondary-text-color); margin-top: 4px;">
            ${this._localize('editor.battery_max_hint')}
        </div>`}

        <div class="switch-row">
            <ha-switch
                .checked=${this._config.battery_split_ring === true}
                .configValue=${'battery_split_ring'}
                @change=${this._valueChanged}
            ></ha-switch>
            <div class="switch-label">${this._localize('editor.battery_split_ring')}</div>
        </div>
        <div class="switch-row">
            <ha-switch
                .checked=${this._config.battery_split_quarters === true}
                .configValue=${'battery_split_quarters'}
                @change=${this._valueChanged}
            ></ha-switch>
            <div class="switch-label">${this._localize('editor.battery_split_quarters')}</div>
        </div>
        <div style="font-size: 0.8em; color: var(--secondary-text-color); margin-top: 4px; margin-bottom: 4px;">
            ${this._localize('editor.battery_split_hint')}
        </div>

        <div class="separator"></div>

        ${this._config.compact_view === true ? html`
            <div style="font-size: 0.8em; color: var(--secondary-text-color); margin-top: 8px;">
                ${this._localize('editor.battery_split_color_hint')}
            </div>
            <div class="color-row-title">${this._localize('editor.battery_discharge_color')}</div>
            ${this._renderColorPickerQuint('color_battery_discharge', 'color_pipe_battery_discharge', 'color_text_battery_discharge', 'color_icon_battery_discharge', 'color_secondary_battery_discharge', '#00ff88')}
            <div class="color-row-title">${this._localize('editor.battery_charge_color')}</div>
            ${this._renderColorPickerQuint('color_battery_charge', 'color_pipe_battery_charge', 'color_text_battery_charge', 'color_icon_battery_charge', 'color_secondary_battery_charge', '#00ff88')}
        ` : html`
            ${this._renderColorPickerQuint('color_battery', 'color_pipe_battery', 'color_text_battery', 'color_icon_battery', 'color_secondary_battery', '#00ff88')}
        `}

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
                .checked=${this._config.battery_unit_kw === true}
                .configValue=${'battery_unit_kw'}
                @change=${this._valueChanged}
            ></ha-switch>
            <div class="switch-label">${this._localize('editor.battery_unit_kw')}</div>
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
        <div style="font-size: 0.8em; color: var(--secondary-text-color); margin-top: -4px; margin-bottom: 4px;">
            ${this._localize('editor.invert_battery_hint')}
        </div>
            <div class="switch-row">
                <ha-switch
                    .checked=${this._config.battery_charge_via_house === true}
                    .configValue=${'battery_charge_via_house'}
                    @change=${this._valueChanged}
                ></ha-switch>
                <div class="switch-label">${this._localize('editor.battery_charge_via_house')}</div>
            </div>
            <div class="switch-row">
                <ha-switch
                    .checked=${this._config.battery_show_power === true}
                    .configValue=${'battery_show_power'}
                    @change=${this._valueChanged}
                ></ha-switch>
                <div class="switch-label">${this._localize('editor.battery_show_power')}</div>
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

        <div class="consumer-group open">
            <div class="consumer-title" style="padding: 10px 0 8px;">${this._localize('editor.house_total_title')}</div>
            ${this._renderEntitySelector(entitySelectorSchema, entities.house || "", 'house', this._localize('editor.house_sensor_label'))}
             <div style="font-size: 0.8em; color: var(--secondary-text-color); margin-top: 4px;">
                ${this._localize('editor.house_sensor_hint')}
            </div>

            <ha-selector
                .hass=${this.hass}
                .selector=${textSelectorSchema}
                .value=${this._config.house_label}
                .configValue=${'house_label'}
                .label=${this._localize('editor.label') + " (Optional)"}
                @value-changed=${this._valueChanged}
            ></ha-selector>

            <ha-selector
                .hass=${this.hass}
                .selector=${iconSelectorSchema}
                .value=${this._config.house_icon}
                .configValue=${'house_icon'}
                .label=${this._localize('editor.icon') + " (Optional)"}
                @value-changed=${this._valueChanged}
            ></ha-selector>

            ${this._renderEntitySelector(entitySelectorSchema, entities.secondary_house || "", 'secondary_house', this._localize('editor.secondary_sensor'))}
            ${this._renderEntitySelector(entitySelectorSchema, entities.tertiary_house || "", 'tertiary_house', this._localize('editor.tertiary_sensor'))}
            <div style="font-size: 0.8em; color: var(--secondary-text-color); margin-top: -4px; margin-bottom: 4px;">
                ${this._localize('editor.tertiary_sensor_hint')}
            </div>
            ${this._renderColorPickerQuint('color_house', null, 'color_text_house', 'color_icon_house', 'color_secondary_house', '#ff0080')}
        </div>

        ${[
            { idx: 1, color: '#a855f7' },
            { idx: 2, color: '#f97316' },
            { idx: 3, color: '#06b6d4' },
            { idx: 4, color: '#eab308' },
            { idx: 5, color: '#6366f1' },
        ].map(c => this._renderConsumerGroup(c.idx, c.color, entities, entitySelectorSchema, textSelectorSchema, iconSelectorSchema))}
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

        <div class="option-group">
            <div class="option-group-title"><ha-icon icon="mdi:view-quilt-outline"></ha-icon> ${this._localize('editor.group_layout')}</div>
            ${this._renderSwitch('horizontal_view', 'editor.horizontal_view', this._config.horizontal_view === true)}
            ${this._renderSwitch('diamond_view', 'editor.diamond_view', this._config.diamond_view === true)}
            ${this._renderSwitch('use_boxes', 'editor.use_boxes', this._config.use_boxes === true)}
            <ha-selector
                .hass=${this.hass}
                .selector=${{ number: { min: 0.3, max: 1.0, step: 0.05, mode: "slider" } }}
                .value=${this._config.zoom !== undefined ? this._config.zoom : 0.9}
                .configValue=${'zoom'}
                .label=${this._localize('editor.zoom_label')}
                @value-changed=${this._valueChanged}
            ></ha-selector>
        </div>

        <div class="option-group">
            <div class="option-group-title"><ha-icon icon="mdi:palette-outline"></ha-icon> ${this._localize('editor.group_appearance')}</div>
            ${this._renderSwitch('show_neon_glow', 'editor.neon_glow', this._config.show_neon_glow !== false)}
            ${this._renderSwitch('show_comet_tail', 'editor.comet_tail', this._config.show_comet_tail === true)}
            ${this._renderSwitch('show_dashed_line', 'editor.dashed_line', this._config.show_dashed_line === true)}
            ${this._renderSwitch('show_donut_border', 'editor.donut_chart', this._config.show_donut_border === true)}
            ${this._renderSwitch('show_tinted_background', 'editor.tinted_background', this._config.show_tinted_background === true)}
            ${this._renderSwitch('use_colored_values', 'editor.colored_values', this._config.use_colored_values === true)}
        </div>

        <div class="option-group">
            <div class="option-group-title"><ha-icon icon="mdi:pipe"></ha-icon> ${this._localize('editor.group_pipes')}</div>
            ${this._renderSwitch('hide_inactive_flows', 'editor.hide_inactive', this._config.hide_inactive_flows !== false)}
            ${this._renderSwitch('show_consumer_always', 'editor.show_consumer_always', this._config.show_consumer_always === true)}
            ${this._renderSwitch('show_producer_always', 'editor.show_producer_always', this._config.show_producer_always !== false)}
            ${this._config.show_producer_always === false ? html`
            <ha-selector
                .hass=${this.hass}
                .selector=${{ number: { min: 0, max: 100, step: 1, mode: "slider" } }}
                .value=${this._config.battery_hide_soc_threshold !== undefined ? this._config.battery_hide_soc_threshold : 0}
                .configValue=${'battery_hide_soc_threshold'}
                .label=${this._localize('editor.battery_hide_soc_threshold')}
                @value-changed=${this._valueChanged}
            ></ha-selector>
            <div style="font-size: 0.8em; color: var(--secondary-text-color); margin-top: -4px; margin-bottom: 4px;">
                ${this._localize('editor.battery_hide_soc_threshold_hint')}
            </div>` : ''}
            ${this._renderSwitch('hide_consumer_icons', 'editor.hide_consumer_icons', this._config.hide_consumer_icons === true)}
            ${this._renderSwitch('force_watt_display', 'editor.force_watt_display', this._config.force_watt_display === true)}
            ${this._renderSwitch('force_kw_display', 'editor.force_kw_display', this._config.force_kw_display === true)}
            <div style="font-size: 0.8em; color: var(--secondary-text-color); margin-top: 4px;">
                ${this._localize('editor.force_unit_display_hint')}
            </div>
        </div>

        <div class="option-group">
            <div class="option-group-title"><ha-icon icon="mdi:chart-timeline"></ha-icon> ${this._localize('editor.group_compact')}</div>
            ${this._renderSwitch('compact_view', 'editor.compact_view_enable', this._config.compact_view === true)}
            ${this._renderSwitch('compact_details', 'editor.compact_details', this._config.compact_details === true)}
            ${this._renderSwitch('compact_glow', 'editor.compact_glow', this._config.compact_glow === true)}
            ${this._renderSwitch('compact_icons_in_bracket', 'editor.compact_icons_in_bracket', this._config.compact_icons_in_bracket === true)}
            <div style="font-size: 0.8em; color: var(--secondary-text-color); margin-top: 4px; margin-bottom: 8px;">
                ${this._localize('editor.compact_icons_in_bracket_hint')}
            </div>
            ${this._renderSwitch('compact_bar_selfuse', 'editor.compact_bar_selfuse', this._config.compact_bar_selfuse === true)}
            <div style="font-size: 0.8em; color: var(--secondary-text-color); margin-top: 4px;">
                ${this._localize('editor.compact_bar_selfuse_hint')}
            </div>
        </div>
		
      </div>
    `;
    }
}

customElements.define("power-flux-card-editor", PowerFluxCardEditor);
