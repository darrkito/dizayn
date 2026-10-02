import { RootShell, rootMetadata, rootViewport } from "@/components/site/root-shell";

export const metadata = rootMetadata("en");
export const viewport = rootViewport;

export default function EnRootLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>;
}
