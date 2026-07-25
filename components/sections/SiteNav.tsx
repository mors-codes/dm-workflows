import Link from "next/link";

const links = [
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Process" },
  { href: "/#why", label: "Why us" },
];

export function SiteNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-8 py-4">
        <Link
          href="/"
          className="font-mono text-[13px] uppercase tracking-[0.16em]"
        >
          DM<span className="text-accent">.</span>Workflows
        </Link>

        <div className="flex items-center gap-8">
          <ul className="hidden items-center gap-8 sm:flex">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute transition-colors hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/#contact"
            className="rounded-sm bg-ink px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-paper transition-colors hover:bg-accent"
          >
            Get in touch
          </Link>
        </div>
      </nav>
    </header>
  );
}