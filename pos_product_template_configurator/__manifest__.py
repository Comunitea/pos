{
    "name": "POS - Product Template Configurator",
    "version": "16.0.1.0.0",
    "summary": "Manage Product Template in Front End Point Of Sale via Configurator",
    "author": "Ooops, Cetmix, Odoo Community Association (OCA)",
    "contributors": "Cetmix",
    "license": "AGPL-3",
    "category": "Point of Sale",
    "website": "https://github.com/OCA/pos",
    "depends": ["pos_product_template", "web", "point_of_sale"],
    "external_dependencies": {},
    "demo": [],
    "data": [],
    "assets": {
        "point_of_sale.assets": [
            "pos_product_template_configurator/static/src/js/*.js",
            "pos_product_template_configurator/static/src/xml/*.xml",
        ],
    },
    "installable": True,
    "application": False,
}
