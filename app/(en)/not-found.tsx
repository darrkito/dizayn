import Link from "next/link";

export default function NotFoundEn() {
  return (
    <section className="container-x flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <h1 className="font-display text-5xl text-primary">404</h1>
      <p className="mt-3 text-lg font-semibold">Page not found</p>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        The page you are looking for does not exist or was moved. Visit our portfolio or services to see what we do.
      </p>
      <Link href="/en" className="mt-6 text-sm font-semibold text-primary hover:underline">
        Back to home
      </Link>
    </section>
  );
}
