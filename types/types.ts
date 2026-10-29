export type SareeCategory = 
  | 'All'
  | 'Silk Sarees'
  | 'Daily Wear'
  | 'Designer Sarees'
  | 'Cotton Sarees'
  | 'Party Wear'
  | 'Festive Weaves'
  | 'Bridal Heritage';

export interface SareeProduct {
  id: string;
  code: string;
  name: string;
  category: SareeCategory;
  price: number;
  originalPrice: number;
  discountPercent: number;
  image: string;
  additionalImages?: string[];
  fabric: string;
  zariType: string;
  tag?: string;
  rating: number;
  reviewsCount: number;
  description: string;
  weaveOrigin: string;
  blousePiece: string;
  length: string;
  careInstructions: string;
  colors: string[];
  inStock: number;
  isFeatured?: boolean;
  isFlashDeal?: boolean;
  claimedPercent?: number;
  dateAdded?: string;
}

export interface CartItem {
  product: SareeProduct;
  quantity: number;
  includeBlouseStitching: boolean;
  selectedColor?: string;
}

export interface VideoCallBooking {
  name: string;
  phone: string;
  date: string;
  timeSlot: string;
  interestedCategory: string;
  notes?: string;
}

export interface Address {
  id: string;
  title: 'Home' | 'Boutique' | 'Office';
  recipientName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  isDefault: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  tier: 'Royal Connoisseur' | 'Loom Patron' | 'VIP Trousseau Circle';
  loyaltyPoints: number;
  joinedDate: string;
  addresses: Address[];
}

export type OrderStatus = 
  | 'Loom Crafting'
  | 'Quality Inspection'
  | 'Custom Tailoring'
  | 'In Transit'
  | 'Out for Delivery'
  | 'Delivered';

export interface OrderItem {
  product: SareeProduct;
  quantity: number;
  includeBlouseStitching: boolean;
  unitPrice: number;
}

export interface OrderTimelineEvent {
  step: string;
  timestamp: string;
  location: string;
  completed: boolean;
  current?: boolean;
  description: string;
}

export interface Order {
  id: string;
  trackingNumber: string;
  courier: string;
  date: string;
  status: OrderStatus;
  statusDate: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  grandTotal: number;
  paymentMethod: string;
  shippingAddress: Address;
  estimatedDelivery: string;
  timeline: OrderTimelineEvent[];
}

export type AppView = 'store' | 'dashboard' | 'orders' | 'tracking' | 'auth';
