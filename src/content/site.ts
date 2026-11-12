/**
 * Single source of truth for every fact shown on the site.
 * Change a phone number, address or claim here and it updates everywhere,
 * including the structured data search engines read.
 */

export interface Phone {
  display: string;
  href: string;
}

export interface Address {
  /** Building name shown above the street line, e.g. "City View". */
  building?: string;
  street: string;
  city: string;
  stateCode: string;
  postalCode: string;
}

/**
 * A location the site lists. Phone and address are each optional: Texas is listed by phone only.
 */
export interface Office {
  id: "la-north" | "la-south" | "tx" | "ga";
  name: string;
  /** Short form for "Call …" buttons. */
  shortName: string;
  phone?: Phone;
  address?: Address;
  /** Shown in the phone-only sticky call bar (keep to two for readable buttons). */
  inCallBar?: boolean;
}

export const SITE = {
  name: "Miles For Smiles",
  legalName: "Miles For Smiles LLC",
  tagline: "Mobile dental care for correctional facilities",
  description:
    "On-site mobile dental care for correctional facilities in Louisiana, Texas and Georgia. No patient transport, no added security risk, full care inside your facility.",
  /** States served, for copy ("Louisiana, Texas and Georgia") and structured data. */
  areaServed: ["Louisiana", "Texas", "Georgia"],
  url: "https://www.mfscdc.com",
  email: "doc@milesforsmiles.com",
  emailHref: "mailto:doc@milesforsmiles.com?subject=Facility%20consultation",
  hours: "Monday to Friday, 8am to 4pm",
  hoursSpec: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "16:00",
  },
  // Self-hosted from public/video: H.264/AAC MP4s (faststart) plus English WebVTT captions.
  // 1080p (~2.5 Mbps) for wide screens; 720p (~1 Mbps) for everyone else and for the download
  // link, which only appears if playback fails.
  video: {
    src: "/video/miles-for-smiles.mp4",
    srcSd: "/video/miles-for-smiles-720p.mp4",
    captions: "/video/miles-for-smiles.en.vtt",
    sizeLabel: "MP4, 17 MB",
  },
  social: [
    { network: "facebook", label: "Facebook", href: "https://www.facebook.com/milesforsmiles318/" },
    {
      network: "instagram",
      label: "Instagram",
      href: "https://www.instagram.com/milesforsmiles318",
    },
  ],
} as const;

export const OFFICES: readonly Office[] = [
  {
    id: "la-north",
    name: "North Louisiana",
    shortName: "North LA",
    phone: { display: "(318) 317-2800", href: "tel:+13183172800" },
    address: {
      street: "3226 Mackey Lane",
      city: "Shreveport",
      stateCode: "LA",
      postalCode: "71118",
    },
    inCallBar: true,
  },
  {
    id: "la-south",
    name: "South Louisiana",
    shortName: "South LA",
    phone: { display: "(225) 230-4707", href: "tel:+12252304707" },
    address: {
      street: "2314 Weymouth Dr #A",
      city: "Baton Rouge",
      stateCode: "LA",
      postalCode: "70809",
    },
    inCallBar: true,
  },
  {
    id: "tx",
    name: "Texas",
    shortName: "Texas",
    phone: { display: "(972) 805-2900", href: "tel:+19728052900" },
  },
  {
    id: "ga",
    name: "Georgia",
    shortName: "Georgia",
    phone: { display: "(770) 933-6929", href: "tel:+17709336929" },
    address: {
      building: "City View",
      street: "3330 Cumberland Blvd, Suite 500",
      city: "Atlanta",
      stateCode: "GA",
      postalCode: "30339",
    },
  },
];

/** Locations with a phone number, for "Call …" buttons. */
export const CALLABLE_OFFICES = OFFICES.filter(
  (o): o is Office & { phone: Phone } => o.phone !== undefined,
);

/** "Louisiana, Texas and Georgia" (house style: no serial comma, unlike Intl.ListFormat). */
export const AREA_SERVED_TEXT = `${SITE.areaServed.slice(0, -1).join(", ")} and ${SITE.areaServed.at(-1)}`;

export const NAV = [
  { label: "Services", href: "#services" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Oral health", href: "#oral-health" },
  { label: "About", href: "#about" },
  { label: "Locations", href: "#contact" },
] as const;

export const STATS = {
  primary: {
    value: "Up to 40",
    label: "patients treated in a single two-day visit,",
    aside: "without a single transport off site.",
  },
  secondary: { value: "20+ years", label: "inside correctional facilities" },
} as const;

export const TESTIMONIAL = {
  quote:
    "Dr. Alexander, his assistants, and office manager are not only knowledgeable, but kind and courteous. This team has a great system, they work efficiently, and do their best to meet your needs.",
  name: "Emily Hamm, LPN",
  org: "Bossier Medium Security Facility",
} as const;
