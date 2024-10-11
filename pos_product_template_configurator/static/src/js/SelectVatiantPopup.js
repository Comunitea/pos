/** @odoo-module **/

import Registries from "point_of_sale.Registries";
import SelectVariantPopup from "@pos_product_template/js/SelectVariantPopup.esm";


const SelectVariantPopupConfigurator = (OriginalSelectVariantPopup) =>
    class extends OriginalSelectVariantPopup {
        setup() {
            super.setup();
            /**NO EXISTE EL CAMPO PRODUCT CONFIGURATOR EN ODOO 16***/
            console.log("PRODUCT CONFIGURATOR", this.props.product);
            this.state.product = this.props.products;
        }
    };

Registries.Component.extend(SelectVariantPopup, SelectVariantPopupConfigurator);