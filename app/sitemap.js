import { SITE_URL } from "../lib/contact.mjs";

export default function sitemap() {
  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/precos`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];
}
