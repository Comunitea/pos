from odoo import api, models, _, fields
from itertools import groupby

class PosSession(models.Model):

    _inherit = "pos.session"

    def _loader_params_product_attribute(self):
        res = super()._loader_params_product_attribute()
        res["search_params"]["fields"].append("display_type")
        return res
    
    def _loader_params_product_attribute_value(self):
        res = super()._loader_params_product_attribute_value()
        res["search_params"]["fields"].append("sequence")
        return res
    
    def _loader_params_product_template_attribute_value(self):
        res = super()._loader_params_product_template_attribute_value()
        fields = ["price_extra","html_color","is_custom"]
        res["search_params"]["fields"].extend(fields)
        return res
