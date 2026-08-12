export const CONTACT = {
  // TODO: replace with the real numbers/emails
  whatsapp: "5213300000000",
  whatsappDisplay: "+52 33 0000 0000",
  email: "hola@dizayn.mx",
  instagram: "https://www.instagram.com/dizayn_mx/",
  city: "Guadalajara, Jalisco, México",
};

export const waLink = (message: string) =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
