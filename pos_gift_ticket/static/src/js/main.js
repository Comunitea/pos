 odoo.define('pos_gift_ticket.screens', function (require) {
    // Adding a button to print GiftTicket without prices
    "use strict";
    var screens = require('point_of_sale.screens');
    var core = require('web.core');
    var QWeb = core.qweb;

    screens.ReceiptScreenWidget.include({
        print_web: function() {
            // Render again the PosTicket if its called from normarl print button
            if (!this.printing_gift_ticket){
                this.$('.pos-receipt-container').html(QWeb.render('PosTicket', this.get_receipt_render_env()));
            }
            this._super();
        },
        print_xml: function() {
            if (this.printing_gift_ticket){
                var receipt = QWeb.render('XmlReceiptGift', this.get_receipt_render_env());
                this.pos.proxy.print_receipt(receipt);
                this.pos.get_order()._printed = true;
            }
            else{
                this._super()
            }
        },
        print_gift: function() {
            // Render the PosTicketGift in order to print it
            this.$('.pos-receipt-container').html(QWeb.render('PosTicketGift', this.get_receipt_render_env()));
            this.print_web()
            this.printing_gift_ticket = false;

        },
        renderElement: function() {
            var self = this;
            self.printing_gift_ticket = false;  // To control 
            this._super();

            // Button Print Gift Ticket
            this.$('.button.print-gift').click(function(){
                if (!self._locked) {
                    self.printing_gift_ticket = true
                    self.print_gift();
                }
            });
        },
    });
        
    return screens
   
});
