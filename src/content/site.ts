/**
 * Single source of truth for every fact shown on the site.
 * Change a phone number, address or claim here and it updates everywhere,
 * including the structured data search engines read.
 */

export interface Office {
  id: "la" | "tx";
  state: string;
  stateCode: string;
  phone: string;
  phoneHref: string;
  street: string;
  city: string;
  postalCode: string;
}

export const SITE = {
  name: "Miles For Smiles",
  legalName: "Miles For Smiles LLC",
  tagline: "Mobile dental care for correctional facilities",
  description:
    "On-site mobile dental care for correctional facilities in Louisiana and Texas. No inmate transport, no added security risk, full care inside your facility.",
  url: "https://www.mfscdc.com",
  email: "doc@milesforsmiles.com",
  emailHref: "mailto:doc@milesforsmiles.com?subject=Facility%20consultation",
  hours: "Monday to Friday, 8am to 4pm",
  hoursSpec: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "16:00",
  },
  videoId: "HMW4FPLxFpE",
  social: [
    { label: "Facebook", href: "https://www.facebook.com/milesforsmiles318/" },
    { label: "Instagram", href: "https://www.instagram.com/milesforsmiles318" },
  ],
} as const;

export const OFFICES: readonly Office[] = [
  {
    id: "la",
    state: "Louisiana",
    stateCode: "LA",
    phone: "(318) 317-2800",
    phoneHref: "tel:+13183172800",
    street: "3226 Mackey Lane",
    city: "Shreveport",
    postalCode: "71118",
  },
  {
    id: "tx",
    state: "Texas",
    stateCode: "TX",
    phone: "(972) 805-2900",
    phoneHref: "tel:+19728052900",
    street: "3704 W. Camp Wisdom Road, #120",
    city: "Dallas",
    postalCode: "75237",
  },
];

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
  secondary: { value: "16+ years", label: "inside correctional facilities" },
} as const;

export const TESTIMONIAL = {
  quote:
    "Dr. Alexander, his assistants, and office manager are not only knowledgeable, but kind and courteous. This team has a great system, they work efficiently, and do their best to meet your needs.",
  name: "Emily Hamm, LPN",
  org: "Bossier Medium Security Facility",
} as const;
