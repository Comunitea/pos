/** @odoo-module **/


import {PosGlobalState} from "point_of_sale.models";
import Registries from 'point_of_sale.Registries';

const {markRaw} = owl;

export const PosGlobalStateExtend2 = (OriginalPosGlobalState) =>
    class extends OriginalPosGlobalState {
        constructor(obj) {
            super(obj);
            this.db = markRaw(this.db);
        }

        async _processData(loadedData) {
            await super._processData(...arguments);
            if (this.env.pos.config.iface_show_product_template) {
                this.db.add_product_attribute_values(this.product_attribute_value);
            }
        }
    };

Registries.Model.extend(PosGlobalState, PosGlobalStateExtend2);
