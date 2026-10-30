
"use client";

import React, { useState } from "react";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { CartItem } from "@/types/cartTypes";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];

  onUpdateQty: (cartItemId: string, delta: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
}

const FREE_SHIPPING_THRESHOLD = 15000;
const SHIPPING_CHARGE = 450;

const formatPrice = (price: number) =>
  `₹${price.toLocaleString("en-IN")}`;

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
}) => {
  const [promoCode, setPromoCode] = useState("");
  const [discountRate, setDiscountRate] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState("");
  const [isCheckingOutOnline, setIsCheckingOutOnline] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderId, setOrderId] = useState("");

  // Calculations
    const subtotal = cart.reduce((total, item) => {
    return total + item.variant.price * item.qty;
    }, 0);

    const totalItems = cart.reduce(
    (total, item) => total + item.qty,
    0
    );

    const discountAmount = Math.round(subtotal * discountRate);

    const shipping =
    subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0
        ? 0
        : SHIPPING_CHARGE;

    const grandTotal = subtotal - discountAmount + shipping;

  const freeShippingRemaining = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - subtotal
  );

  const freeShippingPercent = Math.min(
    100,
    Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  );

  // Promo Code
  const handleApplyPromo = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const code = promoCode.trim().toUpperCase();

    if (code === "ROYALGOLD") {
      setDiscountRate(0.1);
      setPromoSuccess("ROYALGOLD applied: 10% VIP Discount!");
      setPromoError("");
    } else if (code === "FESTIVE15") {
      setDiscountRate(0.15);
      setPromoSuccess("FESTIVE15 applied: 15% Festive Privilege!");
      setPromoError("");
    } else {
      setDiscountRate(0);
      setPromoError(
        'Invalid promo code. Try "ROYALGOLD" or "FESTIVE15"'
      );
      setPromoSuccess("");
    }
  };

  // WhatsApp Checkout
    const handleWhatsAppCheckout = () => {
    const itemsSummary = cart.map((item, index) => {
        const product = item.variant.product;

        return `${index + 1}. ${product.title}
    SKU: ${item.variant.sku}
    Quantity: ${item.qty}
    Price: ₹${(item.variant.price * item.qty).toLocaleString("en-IN")}`;
    }).join("\n\n");

    const message = encodeURIComponent(
        `SRI GOWRI TEXTILES ORDER\n\n${itemsSummary}\n\nTotal: ${formatPrice(grandTotal)}`
    );

    window.open(
        `https://wa.me/919845012345?text=${message}`,
        "_blank"
    );
    };

  // Online Checkout Simulation
  const handleOnlineCheckout = () => {
    if (!cart.length || isCheckingOutOnline) return;

    setIsCheckingOutOnline(true);

    setTimeout(() => {
      setIsCheckingOutOnline(false);
      setOrderId(
        `SG-ORD-${Math.floor(100000 + Math.random() * 900000)}`
      );
      setOrderCompleted(true);
      onClearCart();
    }, 1500);
  };

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <SheetContent
        side="right"
        className="flex h-full w-full flex-col gap-0 border-l-2 border-brand-gold-muted bg-white p-0 sm:max-w-md"
      >
        {/* Header */}
        <SheetHeader className="flex flex-row items-center justify-between space-y-0 border-b border-brand-gold-muted/40 bg-brand-burgundy-dark px-6 py-4 text-text-brand-cream">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="size-5 text-text-brand-gold-dark" />

            <SheetTitle className="font-display text-lg font-bold text-text-brand-cream">
              Your Saree Selection
            </SheetTitle>

            <Badge className="border border-brand-gold-muted bg-brand-burgundy text-text-brand-cream">
              {totalItems}
            </Badge>
          </div>

          <SheetDescription className="sr-only">
            View and manage your shopping cart.
          </SheetDescription>
        </SheetHeader>

        {/* Order Success */}
        {orderCompleted ? (
          <div className="flex flex-1 flex-col items-center justify-center bg-[#faf6ea] p-8 text-center">
            <div className="mb-4 flex size-16 items-center justify-center rounded-full border-2 border-[#25D366] bg-[#25D366]/20 text-[#075E54]">
              <CheckCircle2 className="size-8" />
            </div>

            <h3 className="font-display text-2xl font-bold text-brand-burgundy">
              Order Placed Successfully!
            </h3>

            <p className="mt-2 max-w-xs text-sm text-brand-brown">
              Thank you for trusting Sri Gowri Royal Textiles.
              Our master weavers will prepare your sarees with care.
            </p>

            <div className="mt-4 rounded-xl border border-brand-gold-muted/50 bg-white p-3 text-xs text-brand-burgundy">
              Order ID: <strong>{orderId}</strong>
            </div>

            <Button
              onClick={() => {
                setOrderCompleted(false);
                onClose();
              }}
              className="mt-6 rounded-full bg-text-brand-gold-dark px-6 font-bold text-brand-burgundy hover:bg-brand-gold"
            >
              Continue Exploring
            </Button>
          </div>
        ) : (
          <>
            {/* Free Shipping */}
            <div className="border-b border-brand-gold-muted/30 bg-text-brand-cream px-6 py-3">
              <div className="mb-2 flex items-center justify-between gap-2 text-xs font-semibold text-brand-burgundy">
                <span>
                  {freeShippingRemaining === 0 ? (
                    <span className="font-bold text-[#075E54]">
                      🎉 Free Express Shipping Unlocked!
                    </span>
                  ) : (
                    `Add ${formatPrice(freeShippingRemaining)} more for FREE Shipping`
                  )}
                </span>

                <span className="font-mono text-[10px] text-brand-brown">
                  {freeShippingPercent}%
                </span>
              </div>

              <Progress
                value={freeShippingPercent}
                className="h-2 bg-/30 [&>div]:bg-brand-burgundy-dark"
              />
            </div>

            {/* Cart Items */}
            <ScrollArea className="min-h-0 flex-1">
              <div className="space-y-4 p-4 sm:p-6">
                {cart.length === 0 ? (
                  <div className="flex min-h-64 flex-col items-center justify-center text-center">
                    <div className="mb-3 flex size-16 items-center justify-center rounded-full border border-brand-gold-muted bg-text-brand-cream text-brand-brown">
                      <ShoppingBag className="size-8 opacity-50" />
                    </div>

                    <p className="font-display text-base font-bold text-brand-burgundy">
                      Your bag is empty
                    </p>

                    <p className="mt-1 max-w-xs text-xs text-brand-brown">
                      Explore our handwoven Banarasi and Kanjeevaram
                      sarees to add exquisite pieces to your wardrobe.
                    </p>
                  </div>
                ) : (
        
            cart && cart.map((item) => {
            const product = item.variant.product;

            const image =
                product.images.find(
                (img) => img.variantId === item.variant.id
                ) ?? product.images[0];

            return (
                <div
                key={item.id}
                className="flex gap-3 rounded-xl border p-3"
                >
                {/* Product Image */}
                <div className="relative size-24 shrink-0 overflow-hidden rounded-lg">
                    {image?.url && (
                    <Image
                        src={image.url}
                        alt={image.altText ?? product.title}
                        className="h-full w-full object-cover"
                    />
                    )}
                </div>

                {/* Product Details */}
                <div className="flex flex-1 flex-col justify-between">

                    <div>
                    <p className="text-xs text-muted-foreground">
                        {item.variant.sku}
                    </p>

                    <h3 className="line-clamp-1 text-sm font-semibold">
                        {product.title}
                    </h3>

                    <p className="text-sm font-bold">
                        ₹{item.variant.price.toLocaleString("en-IN")}
                    </p>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center justify-between">

                    <div className="flex items-center gap-2">
                        <Button
                        size="icon"
                        variant="outline"
                        onClick={() => onUpdateQty(item.id, -1)}
                        >
                        <Minus className="size-3" />
                        </Button>

                        <span>{item.qty}</span>

                        <Button
                        size="icon"
                        variant="outline"
                        onClick={() => onUpdateQty(item.id, 1)}
                        >
                        <Plus className="size-3" />
                        </Button>
                    </div>

                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => onRemoveItem(item.id)}
                    >
                        <Trash2 className="size-4 text-red-500" />
                    </Button>

                    </div>
                </div>
                </div>
            );
                })
        )
    }
              </div>
            </ScrollArea>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="space-y-3 border-t-2 border-brand-gold-muted bg-[#faf6ea] p-4 sm:p-6">
                {/* Promo Code */}
                <form
                  onSubmit={handleApplyPromo}
                  className="flex gap-2"
                >
                  <Input
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter Coupon: ROYALGOLD"
                    className="h-10 flex-1 rounded-xl border-brand-gold-muted bg-white text-xs uppercase"
                  />

                  <Button
                    type="submit"
                    className="h-10 rounded-xl bg-brand-burgundy text-xs font-bold text-text-brand-cream hover:bg-brand-burgundy-dark"
                  >
                    Apply
                  </Button>
                </form>

                {promoSuccess && (
                  <p className="text-[11px] font-semibold text-green-700">
                    {promoSuccess}
                  </p>
                )}

                {promoError && (
                  <p className="text-[11px] text-red-700">
                    {promoError}
                  </p>
                )}

                {/* Price Summary */}
                <div className="space-y-2 pt-2 text-xs text-brand-burgundy">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between font-semibold text-green-700">
                      <span>
                        Privilege Discount ({discountRate * 100}%)
                      </span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Shipping & Insurance</span>
                    <span>
                      {shipping === 0 ? "FREE" : formatPrice(shipping)}
                    </span>
                  </div>

                  <Separator className="bg-brand-gold-muted/40" />

                  <div className="flex justify-between text-base font-bold text-brand-burgundy-dark">
                    <span className="font-display">Total Amount</span>
                    <span className="font-display">
                      {formatPrice(grandTotal)}
                    </span>
                  </div>
                </div>

                {/* WhatsApp Checkout */}
                <Button
                  type="button"
                  onClick={handleWhatsAppCheckout}
                  className="h-12 w-full rounded-xl bg-[#25D366] text-sm font-bold text-white shadow-md hover:bg-[#20ba59] active:scale-[0.98]"
                >
                  <MessageCircle className="mr-2 size-4" />
                  Send Order to WhatsApp Boutique
                </Button>

                {/* Online Checkout */}
                <Button
                  type="button"
                  onClick={handleOnlineCheckout}
                  disabled={isCheckingOutOnline}
                  className="h-11 w-full rounded-xl border border-brand-gold-muted bg-brand-burgundy-dark text-xs font-bold text-text-brand-cream hover:bg-brand-burgundy"
                >
                  {isCheckingOutOnline ? (
                    "Confirming with Weavers..."
                  ) : (
                    <>
                      Instant Secure Checkout
                      <ArrowRight className="ml-1 size-3.5" />
                    </>
                  )}
                </Button>
              </div>
            )}
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
