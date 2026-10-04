export const CONTACT = {
  whatsapp: "524621922778",
  whatsappDisplay: "+52 462 192 2778",
  email: "sebasesc5@gmail.com",
  instagram: "https://www.instagram.com/dizayn_mx/",
  /** Official profiles beyond Instagram. Empty = not linked anywhere yet (footer, schema sameAs,
   * llms.txt all skip empty entries), so a profile goes live sitewide by filling in its URL. */
  facebook: "",
  tiktok: "",
  googleBusinessProfile: "",
  city: { es: "Guadalajara, Jalisco, México", en: "Guadalajara, Jalisco, Mexico" },
};

/** Every official profile URL that is actually set — the schema.org `sameAs` list. */
export const SAME_AS = [CONTACT.instagram, CONTACT.facebook, CONTACT.tiktok, CONTACT.googleBusinessProfile].filter(Boolean);

export const waLink = (message: string) =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
