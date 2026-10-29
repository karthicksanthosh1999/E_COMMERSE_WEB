import { UserProfile, Order, Address } from '../types/types';
import { INITIAL_PRODUCTS } from './products';

export const DEFAULT_ADDRESSES: Address[] = [
  {
    id: 'addr-1',
    title: 'Home',
    recipientName: 'Karthick Subramanian',
    phone: '+91 98450 99882',
    street: '42, Royal Palm Avenue, 3rd Cross, Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    postalCode: '560038',
    isDefault: true,
  },
  {
    id: 'addr-2',
    title: 'Boutique',
    recipientName: 'Karthick Fashion Studio',
    phone: '+91 98450 99882',
    street: '18, Heritage Weaver Lane, T. Nagar',
    city: 'Chennai',
    state: 'Tamil Nadu',
    postalCode: '600017',
    isDefault: false,
  },
];

export const MOCK_USER: UserProfile = {
  id: 'usr-901',
  name: 'Karthick Subramanian',
  email: 'karthick.scita@gmail.com',
  phone: '+91 98450 99882',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  tier: 'VIP Trousseau Circle',
  loyaltyPoints: 3450,
  joinedDate: 'November 2023',
  addresses: DEFAULT_ADDRESSES,
};

export const MOCK_ORDERS: Order[] = [
  {
    id: 'SG-ORD-882914',
    trackingNumber: 'BD-AIR-948201',
    courier: 'BlueDart Aviation Express',
    date: '26 Oct 2026',
    status: 'In Transit',
    statusDate: '28 Oct 2026, 09:30 AM',
    items: [
      {
        product: INITIAL_PRODUCTS[0], // Kanjeevaram Magenta
        quantity: 1,
        includeBlouseStitching: true,
        unitPrice: 14999,
      },
    ],
    subtotal: 15998,
    discount: 1500,
    shipping: 0,
    grandTotal: 14498,
    paymentMethod: 'WhatsApp UPI Verified (GPay)',
    shippingAddress: DEFAULT_ADDRESSES[0],
    estimatedDelivery: '30 Oct 2026 (Before 6:00 PM)',
    timeline: [
      {
        step: 'Order Confirmed & Loom Assigned',
        timestamp: '26 Oct 2026, 11:15 AM',
        location: 'Kanchipuram Master Guild No. 4',
        completed: true,
        description: 'Assigned to master generational weaver Natarajan. Pure mulberry silk warp mounted.',
      },
      {
        step: 'Silk Mark & Zari Purity Inspection',
        timestamp: '27 Oct 2026, 02:40 PM',
        location: 'Central Silk Board Testing Facility',
        completed: true,
        description: 'Passed 2G silver-dipped gold zari purity test. Holographic Silk Mark certificate stamped.',
      },
      {
        step: 'Boutique Custom Blouse Stitching',
        timestamp: '27 Oct 2026, 06:15 PM',
        location: 'Sri Gowri Atelier Studio',
        completed: true,
        description: 'Finished with royal boat neck, elbow sleeve zari border, and pure cotton lining.',
      },
      {
        step: 'Sealed in Eco-Muslin Box & Dispatched',
        timestamp: '28 Oct 2026, 08:00 AM',
        location: 'Chennai Air Cargo Terminal',
        completed: true,
        description: 'Packed in unbleached herbal muslin pouch with neem bark moth protection & cedar chips.',
      },
      {
        step: 'In Transit to Destination Delivery Hub',
        timestamp: '28 Oct 2026, 11:45 AM',
        location: 'Bengaluru Central Sorting Gateway',
        completed: false,
        current: true,
        description: 'Package en route aboard flight BD-402. Dispatched to local delivery depot.',
      },
      {
        step: 'Out for Doorstep Handover',
        timestamp: 'Pending',
        location: 'Bengaluru Indiranagar Hub',
        completed: false,
        description: 'Assigned to priority air express courier rider.',
      },
    ],
  },
  {
    id: 'SG-ORD-741920',
    trackingNumber: 'BD-EXP-662109',
    courier: 'BlueDart Air Express',
    date: '14 Oct 2026',
    status: 'Delivered',
    statusDate: '18 Oct 2026, 03:45 PM',
    items: [
      {
        product: INITIAL_PRODUCTS[1], // Crimson Banarasi
        quantity: 1,
        includeBlouseStitching: false,
        unitPrice: 18500,
      },
      {
        product: INITIAL_PRODUCTS[3], // Blush Chanderi Tissue
        quantity: 1,
        includeBlouseStitching: false,
        unitPrice: 7499,
      },
    ],
    subtotal: 25999,
    discount: 2600,
    shipping: 0,
    grandTotal: 23399,
    paymentMethod: 'Prepaid NetBanking (HDFC Bank)',
    shippingAddress: DEFAULT_ADDRESSES[0],
    estimatedDelivery: '18 Oct 2026 (Delivered)',
    timeline: [
      {
        step: 'Order Confirmed',
        timestamp: '14 Oct 2026, 10:20 AM',
        location: 'Varanasi Loom Guild',
        completed: true,
        description: 'Artisan order booked with Certificate of Authenticity.',
      },
      {
        step: 'Quality Certified',
        timestamp: '15 Oct 2026, 04:00 PM',
        location: 'Handloom Quality Council',
        completed: true,
        description: 'Tested 100% pure Katan silk with gold brocade pallu.',
      },
      {
        step: 'Dispatched via Air',
        timestamp: '16 Oct 2026, 09:30 AM',
        location: 'Varanasi Gateway',
        completed: true,
        description: 'Handed over to BlueDart express flight.',
      },
      {
        step: 'Delivered to Customer',
        timestamp: '18 Oct 2026, 03:45 PM',
        location: 'Bengaluru, Indiranagar',
        completed: true,
        current: false,
        description: 'Signed and accepted by Karthick Subramanian. Seal unbroken.',
      },
    ],
  },
  {
    id: 'SG-ORD-991204',
    trackingNumber: 'BD-AIR-551029',
    courier: 'BlueDart Aviation Express',
    date: '28 Oct 2026',
    status: 'Loom Crafting',
    statusDate: '28 Oct 2026, 01:15 PM',
    items: [
      {
        product: INITIAL_PRODUCTS[4], // Patola Double Ikat
        quantity: 1,
        includeBlouseStitching: true,
        unitPrice: 24500,
      },
    ],
    subtotal: 25499,
    discount: 2500,
    shipping: 0,
    grandTotal: 22999,
    paymentMethod: 'WhatsApp UPI Verified',
    shippingAddress: DEFAULT_ADDRESSES[1],
    estimatedDelivery: '05 Nov 2026',
    timeline: [
      {
        step: 'Order Received & Master Weaver Allocated',
        timestamp: '28 Oct 2026, 01:15 PM',
        location: 'Patan Master Guild, Gujarat',
        completed: true,
        current: true,
        description: 'Rare double ikat sacred lotus pattern assigned to master craftsman Salvi Guild.',
      },
      {
        step: 'Quality & Silk Purity Inspection',
        timestamp: 'Pending',
        location: 'Silk Board Verification',
        completed: false,
        description: 'Purity inspection scheduled.',
      },
      {
        step: 'Custom Atelier Tailoring',
        timestamp: 'Pending',
        location: 'Sri Gowri Atelier',
        completed: false,
        description: 'Blouse measurements review.',
      },
      {
        step: 'Dispatched in Wooden Heirloom Box',
        timestamp: 'Pending',
        location: 'Ahmedabad Air Hub',
        completed: false,
        description: 'Dispatched via secure air courier.',
      },
    ],
  },
];
