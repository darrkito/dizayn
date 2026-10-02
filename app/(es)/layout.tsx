import { RootShell, rootMetadata } from "@/components/site/root-shell";

export const metadata = rootMetadata("es");

export default function EsRootLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="es">{children}</RootShell>;
}
