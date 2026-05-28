export default function Footer() {
  return (
    <footer className="relative py-8">
      <div
        className="absolute left-0 right-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, var(--color-border) 20%, var(--color-accent-2) 50%, var(--color-border) 80%, transparent 100%)',
        }}
      />
      <div className="mx-auto max-w-[1120px] px-7">
        <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <span className="text-[13px] text-[var(--color-t3)]">
            © 2026 Yanis Oukaci · Béjaïa, Algeria
          </span>
          <div className="hidden items-center gap-4 sm:flex">
            <a
              href="https://github.com/YanisCodes"
              target="_blank"
              rel="noopener"
              className="text-[13px] text-[var(--color-t3)] transition-colors hover:text-[var(--color-t2)]"
            >
              GitHub
            </a>
            <a
              href="mailto:yanisoukaci667@gmail.com"
              className="text-[13px] text-[var(--color-t3)] transition-colors hover:text-[var(--color-t2)]"
            >
              Email
            </a>
          </div>
          <a
            href="#"
            className="text-[13px] text-[var(--color-t3)] transition-colors hover:text-[var(--color-t2)]"
          >
            ↑ Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
