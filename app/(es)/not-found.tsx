import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <h1 className="font-display text-5xl text-primary">404</h1>
      <p className="mt-3 text-lg font-semibold">Página no encontrada</p>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        La página que buscas no existe o fue movida. Visita nuestro portafolio o servicios para ver lo que hacemos.
      </p>
      <Link href="/" className="mt-6 text-sm font-semibold text-primary hover:underline">
        Volver al inicio
      </Link>
      <p className="mt-8 text-sm text-muted-foreground">
        También puedes revisar{" "}
        <Link href="/portafolio" className="underline hover:text-foreground">el portafolio</Link>,{" "}
        <Link href="/servicios" className="underline hover:text-foreground">servicios</Link>,{" "}
        <Link href="/blog" className="underline hover:text-foreground">el blog</Link>,{" "}
        <a href="/sitemap.xml" className="underline hover:text-foreground">el mapa del sitio</a>{" "}
        o <a href="/llms.txt" className="underline hover:text-foreground">llms.txt</a>.
      </p>
    </section>
  );
}
