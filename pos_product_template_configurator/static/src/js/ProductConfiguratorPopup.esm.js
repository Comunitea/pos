/** @odoo-module **/

import {patch} from '@web/core/utils/patch';
import { ProductConfiguratorPopup,BaseProductAttribute  } from "point_of_sale.ProductConfiguratorPopup";

patch(ProductConfiguratorPopup.prototype, 'pos_product_template_configurator.ProductConfiguratorPopup',
    {
        setup() {
            this._super();
        },
        getPayload(){
            var selected_attributes = [];
            var selected_attribute_value_ids = [];
            var price_extra = 0.0;

            this.env.attribute_components.forEach((attribute_component) => {
                const {value, extra, id} = attribute_component.getValue();
                selected_attribute_value_ids.push(id);
                selected_attributes.push(value);
                price_extra += extra;
            });

            return {
                selected_attributes,
                selected_attribute_value_ids,
                price_extra,
            };
        }
    })

patch(BaseProductAttribute.prototype,'pos_product_template_configurator.BaseProductAttribute',
    {
        setup() {
            this._super();
        },
        getValue() {
            var result = this._super();
            const selected_value = this.values.find(
                (val) => val.id === parseFloat(this.state.selected_value)
            );
            result.id = selected_value.id;
            return result;
        }
    }
)
