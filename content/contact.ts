export const CONTACT = {
  whatsapp: "524621922778",
  whatsappDisplay: "+52 462 192 2778",
  email: "sebasesc5@gmail.com",
  instagram: "https://www.instagram.com/dizayn_mx/",
  city: { es: "Guadalajara, Jalisco, México", en: "Guadalajara, Jalisco, Mexico" },
};

export const waLink = (message: string) =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
