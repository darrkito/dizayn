import { RootShell, rootMetadata } from "@/components/site/root-shell";
import NotFound from "./(es)/not-found";

export const metadata = { ...rootMetadata("es"), title: "Página no encontrada", robots: { index: false } };

// Unmatched URLs have no route group (and so no root layout) — render the Spanish shell + 404.
export default function GlobalNotFound() {
  return (
    <RootShell lang="es">
      <NotFound />
    </RootShell>
  );
}
