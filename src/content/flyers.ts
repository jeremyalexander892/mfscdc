/**
 * Printed flyers shown on the site. Source artwork lives in src/assets/flyers/ and Astro
 * builds optimized web versions of it.
 *
 * - louisiana-service-map.png: rendered from the owner's "PrisonFlyer.pdf".
 * - systemic-diseases-april-2024.png: the April 2024 "Breaking News" flyer, with the closed
 *   Dallas, TX office address line removed (the Texas phone number is still listed).
 */
import serviceMap from "../assets/flyers/louisiana-service-map.png";
import systemicDiseases from "../assets/flyers/systemic-diseases-april-2024.png";

export const FLYERS = {
  serviceMap: {
    id: "service-map",
    image: serviceMap,
    kicker: "Flyer · Louisiana service map",
    title: "Where we've provided care",
    description:
      "Miles For Smiles flyer: a map of Louisiana marking the communities where the team has provided on-site dental services, alongside the benefits of mobile correctional dental care (no inmate transport, compliance with state and federal offender-care standards, a set monthly budget) and the Shreveport office contact details.",
  },
  systemicDiseases: {
    id: "systemic-diseases",
    image: systemicDiseases,
    kicker: "Flyer · April 2024",
    title: "Oral health and systemic diseases",
    description:
      'Miles For Smiles "Breaking News" flyer from April 2024 explaining that poor oral health is associated with systemic diseases such as cardiovascular disease, Alzheimer\'s and dementia, diabetes, rheumatoid arthritis and several cancers, and that Miles For Smiles offers proven solutions to help manage systemic diseases for incarcerated populations.',
  },
} as const;
