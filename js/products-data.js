/**
 * AURA Storefront - Product Seed Catalog
 * Curated by Agent 1 (Product Architect) & Agent 5 (Back-End Engineer)
 * Verified by Flaw Hunter
 */

const PRODUCTS_DATA = [
  {
    id: "aura-pro-headphones",
    name: "AURA Pro Spatial Headphones",
    category: "Headphones",
    tagline: "Studio sound in true 3D space.",
    description: "Experience music and movies as if you were in the center of the recording studio. Ultra-soft memory foam, titanium drivers, and custom noise cancellation.",
    price: 299,
    originalPrice: 349,
    badge: "Best Seller",
    rating: 4.9,
    reviewCount: 248,
    inStock: true,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    colors: [
      { name: "Obsidian Black", hex: "#121316", threeColor: 0x121316 },
      { name: "Cyber Silver", hex: "#d1d5db", threeColor: 0xd1d5db },
      { name: "Cosmic Gold", hex: "#d4af37", threeColor: 0xd4af37 },
      { name: "Neon Cyan", hex: "#22d3ee", threeColor: 0x22d3ee }
    ],
    specs: {
      "Battery Life": "40 Hours Playback",
      "Drivers": "45mm Custom Titanium",
      "Noise Control": "Adaptive Active Noise Cancelling",
      "Charging": "Fast USB-C (3 hrs in 10 mins)",
      "Weight": "260g (Ultra Light)"
    },
    features: [
      "Custom 3D Spatial Audio with head tracking",
      "Plush breathable memory foam ear cushions",
      "Crystal clear microphones for phone calls",
      "Seamless pairing with phone, laptop, and tablet"
    ]
  },
  {
    id: "aura-air-earbuds",
    name: "AURA Air Wireless Earbuds",
    category: "Headphones",
    tagline: "Pocket-sized acoustic perfection.",
    description: "Tiny in size, massive in sound. Ergonomic in-ear contour ensures secure fit for gym, travel, and everyday calls.",
    price: 179,
    originalPrice: 219,
    badge: "New Release",
    rating: 4.8,
    reviewCount: 112,
    inStock: true,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80",
    colors: [
      { name: "Obsidian Black", hex: "#121316", threeColor: 0x121316 },
      { name: "Cyber Silver", hex: "#e5e7eb", threeColor: 0xe5e7eb }
    ],
    specs: {
      "Battery Life": "32 Hours with Case",
      "Water Resistance": "IPX7 Sweat & Rain Proof",
      "Connectivity": "Bluetooth 5.3",
      "Weight": "4.5g per earbud"
    },
    features: [
      "Touch tap controls for volume and tracks",
      "Wireless charging case with battery LED",
      "Wind reduction microphone array"
    ]
  },
  {
    id: "aura-vision-glasses",
    name: "AURA Vision Smart Audio Glasses",
    category: "Glasses",
    tagline: "Open-ear directional audio in luxury frames.",
    description: "Listen to your favorite podcasts, GPS directions, and make phone calls while staying completely aware of your surroundings.",
    price: 389,
    originalPrice: 449,
    badge: "Staff Pick",
    rating: 4.7,
    reviewCount: 94,
    inStock: true,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80",
    colors: [
      { name: "Midnight Matte", hex: "#18181b", threeColor: 0x18181b },
      { name: "Tortoise Shell", hex: "#78350f", threeColor: 0x78350f }
    ],
    specs: {
      "Lenses": "UVA/UVB Polarized Protection",
      "Battery Life": "8 Hours Audio Playback",
      "Frame Material": "Lightweight TR-90 Polymer",
      "Weight": "42g"
    },
    features: [
      "Discreet directional micro-speakers",
      "Prescription lens compatible",
      "Voice assistant one-touch activation"
    ]
  },
  {
    id: "aura-horizon-watch",
    name: "AURA Horizon Titanium Smartwatch",
    category: "Watches",
    tagline: "Elegance meets comprehensive health tracking.",
    description: "Machined from aerospace-grade titanium with an edge-to-edge AMOLED display. Continuous heart rate, sleep stages, and GPS tracking.",
    price: 269,
    originalPrice: 320,
    badge: "Trending",
    rating: 4.9,
    reviewCount: 165,
    inStock: true,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    colors: [
      { name: "Brushed Titanium", hex: "#9ca3af", threeColor: 0x9ca3af },
      { name: "Space Black", hex: "#111827", threeColor: 0x111827 }
    ],
    specs: {
      "Display": "1.43-inch Always-on AMOLED",
      "Battery Life": "14 Days on Single Charge",
      "Water Resistance": "50m Water Resistance (5 ATM)",
      "Sensors": "Heart Rate, SpO2, Sleep, ECG"
    },
    features: [
      "Over 100 customizable clock faces",
      "Daily activity and recovery score",
      "Instant notification alerts with vibration"
    ]
  },
  {
    id: "aura-pulse-band",
    name: "AURA Pulse Minimalist Fitness Tracker",
    category: "Watches",
    tagline: "Ultra-slim wellness monitoring.",
    description: "Designed for those who want deep health insights without a bulky screen on their wrist. Woven breathable fabric band.",
    price: 99,
    originalPrice: 129,
    badge: "Great Value",
    rating: 4.6,
    reviewCount: 78,
    inStock: true,
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=600&q=80",
    colors: [
      { name: "Graphite", hex: "#374151", threeColor: 0x374151 },
      { name: "Deep Navy", hex: "#1e3a8a", threeColor: 0x1e3a8a }
    ],
    specs: {
      "Battery Life": "7 Days Continuous Tracking",
      "Weight": "24g (Featherweight)",
      "Charging": "Magnetic Snap-On Charger"
    },
    features: [
      "Continuous skin temperature and strain tracking",
      "Automatic workout recognition",
      "Silent gentle haptic wake-up alarm"
    ]
  },
  {
    id: "aura-cinema-soundbar",
    name: "AURA Cinema 3D Soundbar",
    category: "Headphones",
    tagline: "Bring theater sound into your living room.",
    description: "Dolby Atmos enabled spatial acoustic array with wireless subwoofer. Fills your room with crystal-clear dialogue and deep bass.",
    price: 449,
    originalPrice: 499,
    badge: "Premium Pick",
    rating: 4.9,
    reviewCount: 67,
    inStock: true,
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80",
    colors: [
      { name: "Obsidian Black", hex: "#18181b", threeColor: 0x18181b }
    ],
    specs: {
      "Channels": "5.1.2 Spatial System",
      "Total Power": "380 Watts Peak",
      "Inputs": "eARC HDMI, Optical, Bluetooth"
    },
    features: [
      "Up-firing speakers for height audio channels",
      "Smart dialogue clarity mode for movies",
      "Compact wireless bass module"
    ]
  },
  {
    id: "aura-power-dock",
    name: "AURA 3-in-1 Fast Wireless Dock",
    category: "Accessories",
    tagline: "Charge phone, watch, and earbuds all at once.",
    description: "Anodized aluminum stand with magnetic wireless fast charging. Keeps your desk or bedside table tidy and cord-free.",
    price: 69,
    originalPrice: 89,
    badge: "Essential",
    rating: 4.8,
    reviewCount: 142,
    inStock: true,
    image: "https://images.unsplash.com/photo-1622445262464-84b1456045b6?auto=format&fit=crop&w=600&q=80",
    colors: [
      { name: "Space Grey", hex: "#4b5563", threeColor: 0x4b5563 },
      { name: "Silver Frost", hex: "#d1d5db", threeColor: 0xd1d5db }
    ],
    specs: {
      "Output": "15W Fast Charge",
      "Material": "Anodized Aerospace Aluminum",
      "Safety": "Overheat and foreign object protection"
    },
    features: [
      "Magnetic alignment snaps device into sweet spot",
      "Weighted base prevents tipping",
      "Includes 30W USB-C braided power cord"
    ]
  },
  {
    id: "aura-carry-case",
    name: "AURA Armor Weatherproof Travel Case",
    category: "Accessories",
    tagline: "Maximum protection on the go.",
    description: "Custom molded hard-shell case lined with soft microfiber to protect your headphones and cables from drops and moisture.",
    price: 39,
    originalPrice: 49,
    badge: "Popular Add-on",
    rating: 4.7,
    reviewCount: 89,
    inStock: true,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80",
    colors: [
      { name: "Carbon Weave", hex: "#1f2937", threeColor: 0x1f2937 }
    ],
    specs: {
      "Shell": "Impact-resistant EVA composite",
      "Waterproofing": "YKK sealed water-resistant zipper",
      "Dimensions": "22 x 18 x 7 cm"
    },
    features: [
      "Internal mesh pocket for cables and adapter",
      "Ergonomic silicone carry handle",
      "Scratch-proof velvet lining"
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PRODUCTS_DATA };
}
