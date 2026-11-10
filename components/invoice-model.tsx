"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Award,
  Printer,
  ReceiptText,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { Order } from "@/types/types";
import { formatCurrency } from "@/lib/format-currency";
import Image from "next/image";

// Use your existing invoice type here
interface InvoiceModalProps {
  modelOpen: boolean,
  selectedInvoice: Order | null;
  closeInvoice: (open: boolean) => void;
}

const InvoiceModal = ({ modelOpen = false, selectedInvoice, closeInvoice }: InvoiceModalProps) => {

  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog
      open={modelOpen}
      onOpenChange={closeInvoice}
    >
      <DialogContent className="w-full max-h-[90vh] overflow-auto border-2 border-brand-gold-muted bg-white p-0 rounded-2xl">
        {selectedInvoice && (
          <div className="text-brand-burgundy w-full">

            {/* Header */}
            <div className="bg-burgundy-dark text-brand-cream p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full border-2 border-brand-gold-dark bg-brand-burgundy flex items-center justify-center text-brand-gold-dark font-bold text-lg">
                    <Image src={"/Code_Generated_Image.png"} alt="logo" width={100} height={100} className="p-0.5" />
                  </div>
                  <div>
                    <DialogHeader>
                      <DialogTitle className="text-xl font-bold tracking-wide text-brand-burgundy-dark">
                        SRI GOWRI
                      </DialogTitle>
                    </DialogHeader>
                    <p className="text-[10px] tracking-[0.2em] text-brand-brown uppercase">
                      CK Royal Enterprises
                    </p>
                    <p className="text-[10px] text-brand-burgundy-dark/70">
                      Tax Invoice & Silk Certificate
                    </p>
                  </div>
                </div>

                <Badge className="bg-brand-gold-dark text-burgundy-dark hover:bg-brand-gold-dark">
                  <ReceiptText className="w-3 h-3 mr-1" />
                  INVOICE
                </Badge>
              </div>
            </div>

            <div className="p-5 sm:p-8 space-y-6">

              {/* Invoice Information */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 rounded-xl border border-brand-gold-muted/40 bg-[#faf6ea] p-4">
                <div>
                  <p className="text-xs text-brand-brown mb-1">Invoice Number</p>
                  <p className="text-sm font-bold font-mono">
                    INV-{selectedInvoice?.id?.replace("SG-ORD-", "")}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-brand-brown mb-1">Order Date</p>
                  <p className="text-sm font-bold">
                    {selectedInvoice.date}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-brand-brown mb-1">Payment</p>
                  <p className="text-sm font-bold text-[#075E54]">
                    {selectedInvoice.paymentMethod}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-brand-brown mb-1">Product</p>
                  <p className="text-sm font-bold text-burgundy-dark">
                    Silk Collection
                  </p>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-brown" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-burgundy-dark">
                    Billed & Shipped To
                  </h3>
                </div>

                <div className="rounded-xl border border-brand-gold-muted/30 p-4">
                  <p className="font-bold text-sm">
                    {selectedInvoice.shippingAddress.recipientName}
                  </p>

                  <p className="text-xs text-brand-brown mt-1">
                    {selectedInvoice.shippingAddress.street},{" "}
                    {selectedInvoice.shippingAddress.city},{" "}
                    {selectedInvoice.shippingAddress.state} -{" "}
                    {selectedInvoice.shippingAddress.postalCode}
                  </p>

                  <p className="text-xs text-brand-brown mt-1">
                    Phone: {selectedInvoice.shippingAddress.phone}
                  </p>
                </div>
              </div>

              <Separator className="bg-brand-gold-muted/40" />

              {/* Products */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-burgundy-dark">
                  Order Items
                </h3>

                <div className="border border-brand-gold-muted/40 rounded-xl overflow-hidden">
                  <div className="grid grid-cols-12 bg-burgundy-dark text-brand-burgundy-dark/60 p-3 text-xs font-bold">
                    <span className="col-span-6">Description</span>
                    <span className="col-span-2 text-center">Qty</span>
                    <span className="col-span-2 text-right">Price</span>
                    <span className="col-span-2 text-right">Total</span>
                  </div>

                  {selectedInvoice.items.map((item, index: number) => {
                    const unitPrice =
                      item.unitPrice +
                      (item.includeBlouseStitching ? 999 : 0);

                    return (
                      <div
                        key={index}
                        className="grid grid-cols-12 items-center p-3 text-xs border-t border-brand-gold-muted/20"
                      >
                        <div className="col-span-6 pr-2">
                          <p className="font-bold text-brand-burgundy">
                            {item.product.description}
                          </p>

                          <p className="text-[10px] text-brand-brown mt-1">
                            {item.product.code} • {item.product.fabric}
                          </p>

                          {item.includeBlouseStitching && (
                            <Badge className="mt-1 bg-[#faf6ea] text-brand-brown border border-brand-gold-muted/40 hover:bg-[#faf6ea] text-[9px]">
                              Custom Blouse
                            </Badge>
                          )}
                        </div>

                        <span className="col-span-2 text-center font-semibold">
                          {item.quantity}
                        </span>

                        <span className="col-span-2 text-right">
                          {formatCurrency(unitPrice)}
                        </span>

                        <span className="col-span-2 text-right font-bold text-burgundy-dark">
                          {formatCurrency(unitPrice * item.quantity)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Invoice Totals */}
              <div className="flex justify-end">
                <div className="w-full max-w-sm space-y-3 text-sm">

                  <div className="flex justify-between text-brand-brown">
                    <span>Subtotal</span>
                    <span className="font-semibold text-brand-burgundy">
                      {formatCurrency(selectedInvoice.subtotal)}
                    </span>
                  </div>

                  {selectedInvoice.discount > 0 && (
                    <div className="flex justify-between text-green-700">
                      <span>Discount</span>
                      <span className="font-semibold">
                        -{formatCurrency(selectedInvoice.discount)}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between text-brand-brown">
                    <span>Shipping</span>
                    <span className="font-semibold text-brand-burgundy">
                      {selectedInvoice.shipping === 0
                        ? "FREE"
                        : formatCurrency(selectedInvoice.shipping)}
                    </span>
                  </div>

                  <Separator className="bg-brand-gold-muted" />

                  <div className="flex justify-between items-center rounded-lg bg-[#faf6ea] border border-brand-gold-muted/40 p-4">
                    <span className="font-bold text-burgundy-dark">
                      Total Paid
                    </span>
                    <span className="text-xl font-bold text-burgundy-dark">
                      {formatCurrency(selectedInvoice.grandTotal)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Authentication */}
              <div className="rounded-xl border border-brand-gold-muted/40 bg-[#faf6ea] p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-brand-gold-dark flex items-center justify-center">
                    <Award className="w-6 h-6 text-burgundy-dark" />
                  </div>

                  <div>
                    <p className="font-bold text-xs text-burgundy-dark">
                      Authenticated Silk Certificate
                    </p>
                    <p className="text-[10px] text-brand-brown">
                      Certificate Serial: CSB-IND-2026-992014
                    </p>
                    <div className="flex items-center gap-1 mt-1 text-[10px] text-green-700">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Certificate information</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handlePrint}
                  className="bg-burgundy-dark hover:bg-brand-burgundy text-brand-gold-dark rounded-full px-5"
                >
                  <Printer className="w-4 h-4 mr-2" />
                  Print Invoice
                </Button>
              </div>

              {/* Footer */}
              <div className="text-center text-[10px] text-brand-brown">
                Thank you for shopping with Sri Gowri Royal Textiles.
                <br />
                We appreciate your trust and support.
              </div>

            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceModal;
