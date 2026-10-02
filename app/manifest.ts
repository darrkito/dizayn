import type { MetadataRoute } from "next";

// Installable without a service worker (display: standalone). Shortcuts are same-origin paths.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dizayn",
    short_name: "Dizayn",
    description: "Agencia de marketing en Guadalajara: sitios web, SEO, IA, redes sociales, embudos, foto y video.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/icon.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Cotizar proyecto", url: "/contacto" },
      { name: "Servicios", url: "/servicios" },
    ],
  };
}
