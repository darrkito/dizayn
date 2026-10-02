import { RootShell, rootMetadata, rootViewport } from "@/components/site/root-shell";

export const metadata = rootMetadata("es");
export const viewport = rootViewport;

export default function EsRootLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="es">{children}</RootShell>;
}
