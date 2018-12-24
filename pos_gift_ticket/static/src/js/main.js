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
            if (!this.pos.config.iface_print_via_proxy) { // browser (html) printing

                // The problem is that in chrome the print() is asynchronous and doesn't
                // execute until all rpc are finished. So it conflicts with the rpc used
                // to send the orders to the backend, and the user is able to go to the next 
                // screen before the printing dialog is opened. The problem is that what's 
                // printed is whatever is in the page when the dialog is opened and not when it's called,
                // and so you end up printing the product list instead of the receipt... 
                //
                // Fixing this would need a re-architecturing
                // of the code to postpone sending of orders after printing.
                //
                // But since the print dialog also blocks the other asynchronous calls, the
                // button enabling in the setTimeout() is blocked until the printing dialog is 
                // closed. But the timeout has to be big enough or else it doesn't work
                // 1 seconds is the same as the default timeout for sending orders and so the dialog
                // should have appeared before the timeout... so yeah that's not ultra reliable. 
    
                this.lock_screen(true);
    
                setTimeout(function(){
                    self.lock_screen(false);
                }, 1000);
    
                this.print_web();
            } else {    // proxy (xml) printing
                this.print_xml();
                this.lock_screen(false);
            }

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
