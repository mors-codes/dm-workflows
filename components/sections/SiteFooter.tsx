import Link from "next/link";

const links = [
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Process" },
  { href: "/#why", label: "Why us" },
  { href: "/#contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ink px-8 py-14 text-paper">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link href="/" className="inline-block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-light.svg"
              alt="DM Workflows"
              className="h-6 w-auto"
            />
          </Link>
          <p className="mt-3 max-w-xs text-sm text-paper/45">
            Operational automation for growing businesses.
          </p>
        </div>

        <ul className="flex flex-wrap gap-x-8 gap-y-3">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-mono text-[11px] uppercase tracking-[0.14em] text-paper/50 transition-colors hover:text-paper"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto mt-12 max-w-6xl border-t border-paper/10 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper/30">
          © {new Date().getFullYear()} DM Workflows
        </p>
      </div>
    </footer>
  );
}