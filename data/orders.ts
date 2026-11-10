import { Order } from "@/types/types";

export const DUMMY_ORDERS: Order[] = [
  {
    id: "ORD-2026-1001",
    trackingNumber: "TRK984521367",
    courier: "Blue Dart Express",
    date: "2026-11-01T10:30:00Z",
    status: "In Transit",
    statusDate: "2026-11-05T14:20:00Z",
    items: [
      {
        product:   {
        id: "prod_saree_03",
        title: "Banarasi Georgette Saree - Crimson Red",
        slug: "banarasi-georgette-saree-crimson-red",
        description: "Flowy georgette Banarasi saree adorned with floral cutwork motifs.",
        brandId: "brand_heritage_silk",
        status: "ACTIVE",
        attributes: { fabric: "Georgette Silk", weave: "Banarasi", occasion: "Festive" },
        deletedAt: null as unknown as Date,
        createdAt: new Date("2026-02-10T12:00:00Z"),
        updatedAt: new Date("2026-02-10T12:00:00Z"),
        categories: [{ productId: "prod_saree_03", categoryId: "cat_sarees" }],
        variants: [
        {
            id: "var_saree_03_a",
            productId: "prod_saree_03",
            sku: "BGS-RED-01",
            price: 8499,
            mrp: 11999,
            attributes: { color: "Crimson Red" },
            unitOfMeasure: "Piece",
            isActive: true,
        },
        ],
        images: [
        {
            id: "img_saree_03_1",
            productId: "prod_saree_03",
            variantId: "var_saree_03_a",
            url: "https://example.com/images/banarasi-red-1.jpg",
            altText: "Crimson Red Banarasi Georgette Saree",
        },
        ],
        reviews: [],
        },
        quantity: 1,
        includeBlouseStitching: true,
        unitPrice: 18500
      }
    ],
    subtotal: 18500,
    discount: 1500,
    shipping: 0,
    grandTotal: 17000,
    paymentMethod: "Credit Card (Visa ending in 4242)",
    shippingAddress: {
        id:"SAMPLE-003",
        isDefault: false,
        phone: '8779568',
        title: 'Home',
        recipientName: 'home',
        street: "14/B, Residency Road",
        city: "Bengaluru",
        state: "Karnataka",
        postalCode: "560025",
    },
    estimatedDelivery: "2026-11-12",
    timeline: [
      {
        step: "Loom Crafting",
        timestamp: "2026-11-01 11:00 AM",
        location: "Varanasi Artisan Hub",
        completed: true,
        description: "Hand-weaving initiated on traditional wooden looms."
      },
      {
        step: "Quality Inspection",
        timestamp: "2026-11-03 04:00 PM",
        location: "Varanasi QC Center",
        completed: true,
        description: "Zari density and silk purity verified successfully."
      },
      {
        step: "Custom Tailoring",
        timestamp: "2026-11-04 10:00 AM",
        location: "Studio Tailoring Unit",
        completed: true,
        description: "Blouse piece cut and stitched as per custom measurements."
      },
      {
        step: "In Transit",
        timestamp: "2026-11-05 02:20 PM",
        location: "Hub Sorting Facility, Delhi",
        completed: true,
        current: true,
        description: "Package dispatched via express air courier."
      },
      {
        step: "Out for Delivery",
        timestamp: "",
        location: "Local Delivery Hub",
        completed: false,
        description: "Awaiting arrival at destination facility."
      },
      {
        step: "Delivered",
        timestamp: "",
        location: "Recipient Address",
        completed: false,
        description: "Pending final handover."
      }
    ]
  },
  {
    id: "ORD-2026-1002",
    trackingNumber: "TRK456123890",
    courier: "FedEx International",
    date: "2026-11-04T09:15:00Z",
    status: "Quality Inspection",
    statusDate: "2026-11-06T11:00:00Z",
    items: [
      {
        product:  {
            id: "prod_saree_02",
            title: "Chanderi Cotton Silk Printed Saree",
            slug: "chanderi-cotton-silk-printed-saree",
            description: "Lightweight and breathable Chanderi saree decorated with block prints.",
            brandId: "brand_ethnic_vibe",
            status: "ACTIVE",
            attributes: { fabric: "Cotton Silk", weave: "Chanderi", printType: "Block Print" },
            deletedAt: null as unknown as Date,
            createdAt: new Date("2026-02-01T10:30:00Z"),
            updatedAt: new Date("2026-02-01T10:30:00Z"),
            categories: [{ productId: "prod_saree_02", categoryId: "cat_sarees" }],
            variants: [
            {
                id: "var_saree_02_a",
                productId: "prod_saree_02",
                sku: "CHS-MNT-GRN",
                price: 3499,
                mrp: 4999,
                attributes: { color: "Mint Green" },
                unitOfMeasure: "Piece",
                isActive: true,
            },
            ],
            images: [
            {
                id: "img_saree_02_1",
                productId: "prod_saree_02",
                variantId: "var_saree_02_a",
                url: "https://example.com/images/chanderi-green-1.jpg",
                altText: "Mint Green Chanderi Saree",
            },
            ],
            reviews: [
            {
                id: "rev_saree_02_1",
                userId: "user_102",
                productId: "prod_saree_02",
                rating: 4,
                comment: "Comfortable for daily workwear.",
            },
            ],
        },
        quantity: 1,
        includeBlouseStitching: false,
        unitPrice: 24000
      }
    ],
    subtotal: 24000,
    discount: 2000,
    shipping: 500,
    grandTotal: 22500,
    paymentMethod: "UPI / Google Pay",
    shippingAddress: {
      id:'002',
      title: "Office",
      recipientName: "Sample1",
      street: "Flat 402, Lotus Towers, Anna Salai",
      city: "Chennai",
      state: "Tamil Nadu",
      postalCode: "600002",
      isDefault: true,
      phone: '889563525',
    },
    estimatedDelivery: "2026-11-15",
    timeline: [
      {
        step: "Loom Crafting",
        timestamp: "2026-11-04 10:00 AM",
        location: "Kanchipuram Weavers Guild",
        completed: true,
        description: "Pure mulberry silk woven with heavy gold zari."
      },
      {
        step: "Quality Inspection",
        timestamp: "2026-11-06 11:00 AM",
        location: "Chennai Central Depot",
        completed: true,
        current: true,
        description: "Undergoing final silk mark authentication check."
      },
      {
        step: "Custom Tailoring",
        timestamp: "",
        location: "Studio Tailoring Unit",
        completed: false,
        description: "Skipped as blouse stitching was not selected."
      },
      {
        step: "In Transit",
        timestamp: "",
        location: "Courier Hub",
        completed: false,
        description: "Package pickup scheduled."
      },
      {
        step: "Out for Delivery",
        timestamp: "",
        location: "Local Hub",
        completed: false,
        description: "Pending dispatch."
      },
      {
        step: "Delivered",
        timestamp: "",
        location: "Recipient Address",
        completed: false,
        description: "Awaiting final delivery."
      }
    ]
  },
  {
    id: "ORD-2026-1003",
    trackingNumber: "TRK789012345",
    courier: "DHL Express",
    date: "2026-11-06T14:45:00Z",
    status: "Loom Crafting",
    statusDate: "2026-11-06T15:00:00Z",
    items: [
      {
        product: {
        id: "prod_saree_01",
        title: "Kanjivaram Silk Saree - Royal Blue & Gold",
        slug: "kanjivaram-silk-saree-royal-blue-gold",
        description: "Handwoven Kanjivaram silk saree featuring elaborate zari work along the border and pallu.",
        brandId: "brand_heritage_silk",
        status: "ACTIVE",
        attributes: { fabric: "Pure Silk", weave: "Kanjivaram", occasion: "Wedding" },
        deletedAt: null as unknown as Date,
        createdAt: new Date("2026-01-15T08:00:00Z"),
        updatedAt: new Date("2026-01-15T08:00:00Z"),
        categories: [{ productId: "prod_saree_01", categoryId: "cat_sarees" }],
        variants: [
        {
            id: "var_saree_01_a",
            productId: "prod_saree_01",
            sku: "KS-BLU-GOLD-01",
            price: 12999,
            mrp: 18999,
            attributes: { color: "Royal Blue", zariColor: "Gold" },
            unitOfMeasure: "Piece",
            isActive: true,
        },
        ],
        images: [
        {
            id: "img_saree_01_1",
            productId: "prod_saree_01",
            variantId: "var_saree_01_a",
            url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlcggRsrSPMchEeP1I--IFvzD0k9ZXJnf6gP8tlWHUcyuCmX0Jd7QAZrNuJ6tvtJk03Y_gqqUabHCNxjCTeE0TH_5typMj87qSrHdgvgFuSO5KMgE4GQb-9lRkET5XI3V6Fm-xlgEqUfYWMPWHWbuwwG47SxlaNGtMNI6GEoAudeE_NGsMw4q-1ksiM4itItc4Cda18Io3XXGu6OC8McqI_Rekv8pNKE7qK6MHo4bo",
            altText: "Royal Blue Kanjivaram Silk Saree Full View",
        },
        {
            id: "img_saree_01_2",
            productId: "prod_saree_02",
            variantId: "var_saree_01_b",
            url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYaV4OZFQOxl2ihc1JlcYEFfcz7RNrqhDxRq4a3iX30Fezg9wr2QKlEOMeLyz790JpvoPquT4abnYhhNxHrDTknvMHw1gxd6--SVvhoi4c1qems793H2KgV1y0teySFWglL2O2ZY7_I1C_dAOolgaTRxb-D8QRvG6YeOImvhYSUiEt3oFQjsMYRBVacNkmi6hdlC0B0USBzGLlcg_NJHs5j3YxwTrutymp9qcCC1gT",
            altText: "Royal Green Kanjivaram Silk Saree Full View",
        },
        ],
        reviews: [
        {
            id: "rev_saree_01_1",
            userId: "user_101",
            productId: "prod_saree_01",
            rating: 5,
            comment: "Absolutely rich fabric and brilliant shine!",
        },
        ],
      },
      includeBlouseStitching: true,
      quantity: 1,
      unitPrice: 18500
      }
    ],
    subtotal: 32000,
    discount: 3000,
    shipping: 1000,
    grandTotal: 30000,
    paymentMethod: "Net Banking",
    shippingAddress: {
      id: "01",
      title: "Home",
      street: "B-201, Shivalik Heights, CG Road",
      city: "Ahmedabad",
      state: "Gujarat",
      postalCode: "380009",
      isDefault: false,
      phone: "899568457",
      recipientName: "Karthick",
    },
    estimatedDelivery: "2026-11-20",
    timeline: [
      {
        step: "Loom Crafting",
        timestamp: "2026-11-06 03:00 PM",
        location: "Patan Master Loom",
        completed: true,
        current: true,
        description: "Intricate double ikat tie-dye yarn setup in progress."
      },
      {
        step: "Quality Inspection",
        timestamp: "",
        location: "QC Facility",
        completed: false,
        description: "Scheduled upon loom completion."
      },
      {
        step: "Custom Tailoring",
        timestamp: "",
        location: "Studio Unit",
        completed: false,
        description: "Pending tailoring queue."
      },
      {
        step: "In Transit",
        timestamp: "",
        location: "Courier Hub",
        completed: false,
        description: "Awaiting dispatch."
      },
      {
        step: "Out for Delivery",
        timestamp: "",
        location: "Local Hub",
        completed: false,
        description: "Awaiting arrival."
      },
      {
        step: "Delivered",
        timestamp: "",
        location: "Recipient Address",
        completed: false,
        description: "Pending final handover."
      }
    ]
  }
];