import Link from "next/link";

const navigateLinks = [
  { label: "Platform", href: "/platform" },
  { label: "Company", href: "/company" },
  { label: "Newsroom", href: "/newsroom" },
  { label: "Careers", href: "/careers" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export default function Footer() {
  return (
    <footer className="bg-[#fafaf8] border-t border-black/[0.05] px-6 md:px-10 py-16 md:py-20">
      <div className="mx-auto max-w-[1524px]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 lg:gap-16 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#1a2b2c] text-white text-[10px] font-semibold tracking-wide">
                iA
              </span>
              <span className="text-[#1a2b2c] text-[14px] font-medium tracking-[-0.2px]">
                InferraAI
              </span>
            </Link>
            <p className="text-[13px] text-[#1a2b2c]/40 font-light leading-[1.6]">
              AI infrastructure intelligence
              <br />
              for the African continent.
            </p>
          </div>

          {/* Navigate */}
          <div>
            <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-[#1a2b2c]/40 mb-5">
              Navigate
            </p>
            <ul className="flex flex-col gap-3">
              {navigateLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[14px] font-light text-[#1a2b2c]/60 hover:text-[#1a2b2c] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-[#1a2b2c]/40 mb-5">
              Connect
            </p>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] font-light text-[#1a2b2c]/60 hover:text-[#1a2b2c] transition-colors inline-flex items-center gap-2"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] font-light text-[#1a2b2c]/60 hover:text-[#1a2b2c] transition-colors inline-flex items-center gap-2"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  X / Twitter
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@inferraai.com"
                  className="text-[14px] font-light text-[#1a2b2c]/60 hover:text-[#1a2b2c] transition-colors"
                >
                  hello@inferraai.com
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-[#1a2b2c]/40 mb-5">
              Legal
            </p>
            <ul className="flex flex-col gap-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[14px] font-light text-[#1a2b2c]/60 hover:text-[#1a2b2c] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-black/[0.05]">
          <p className="text-[12px] text-[#1a2b2c]/35 font-light">
            &copy; 2026 Inferra AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
