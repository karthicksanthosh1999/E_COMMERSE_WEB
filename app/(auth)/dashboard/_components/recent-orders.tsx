'use client';

import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { DUMMY_ORDERS as orders } from "@/data/orders";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import InvoiceModal from '@/components/invoice-model';
import { Order } from '@/types/types';

const RecentOrdersForDashboard = () => {
    
    const navigate = useRouter();

    const [openInvoice, setOpenInvoice] = useState(false)
    const [selectedInvoice, setSelectedInvoice] = useState<Order | null>(null)

    const handleInvoice = (order: Order) => {
        setOpenInvoice(true)
        if(order){
            setSelectedInvoice(order)
        }
    }
    
  return (
    <>
        <div className="w-full bg-white rounded-3xl p-6 sm:p-7 border border-brand-gold-muted/40/40 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-xl font-bold text-brand-burgundy-dark">Recent Saree Orders</h3>
                <p className="text-xs text-brand-brown">View your previous purchases and verified Silk Mark invoices</p>
              </div>
              <button
                onClick={()=>navigate.push('/dashboard/orders')}
                className="text-xs font-bold text-brand-burgundy-dark hover:text-brand-brown flex items-center gap-1"
              >
                <span>View All ({orders.length})</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 pt-2">
              {orders.slice(0, 3).map((order) => (
                <div
                  key={order.id}
                  className="p-4 rounded-2xl border border-brand-gold-muted/40/30 bg-[#faf6ea]/40 hover:bg-[#faf6ea] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5">
                    <Image
                      src={order.items[0]?.product.image}
                      alt=""
                      height={100}
                      width={100}
                      className="w-12 h-16 object-cover object-top rounded-xl border border-brand-gold-muted/40/40 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-brand-burgundy">{order.id}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          order.status === 'Delivered' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-brand-gold-dark/30 text-burgundy-dark'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <h4 className="font-display text-sm font-bold text-brand-burgundy line-clamp-1 mt-0.5">
                        {order.items[0]?.product.name}
                        {order.items.length > 1 && ` + ${order.items.length - 1} more`}
                      </h4>
                      <p className="text-[11px] text-brand-brown">
                        Ordered on {order.date} • Total: ₹{order.grandTotal.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => navigate.push(`/dashboard/tracker/${order.id}`)}
                      className="px-3.5 py-1.5 rounded-full border border-brand-gold-muted/40 text-xs font-semibold text-brand-burgundy hover:bg-white transition-colors cursor-pointer"
                    >
                      Track
                    </button>
                    <button
                      onClick={()=>handleInvoice(order)}
                      className="px-3.5 py-1.5 rounded-full bg-burgundy-dark text-brand-cream hover:text-brand-gold bg-brand-burgundy text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Invoice
                    </button>
                  </div>
                </div>
              ))}
            </div>
        </div>
        {
            openInvoice && 
            <InvoiceModal 
                modelOpen={openInvoice}
                closeInvoice={setOpenInvoice}
                selectedInvoice={selectedInvoice ? selectedInvoice : null}
            />
        }
    </>
  )
}

export default RecentOrdersForDashboard
