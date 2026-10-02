import { RootShell, rootMetadata } from "@/components/site/root-shell";

export const metadata = rootMetadata("en");

export default function EnRootLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>;
}
