import type { SVGProps } from "react";

export type IconName =
  | "home"
  | "receipt"
  | "qr"
  | "tree"
  | "gift"
  | "bell"
  | "sparkle"
  | "leaf"
  | "globe"
  | "account"
  | "card"
  | "savings"
  | "loan"
  | "wallet"
  | "investment"
  | "insurance"
  | "asset"
  | "transport"
  | "food"
  | "shopping"
  | "travel"
  | "utilities"
  | "box"
  | "bag"
  | "lock"
  | "check";

const paths: Record<IconName, React.ReactNode> = {
  home: (
    <>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 10v10h14V10" />
      <path d="M9 20v-6h6v6" />
    </>
  ),
  receipt: (
    <>
      <path d="M6 3h12v18l-3-1.8-3 1.8-3-1.8L6 21V3Z" />
      <path d="M9 8h6" />
      <path d="M9 12h6" />
    </>
  ),
  qr: (
    <>
      <rect x="4" y="4" width="6" height="6" rx="1" />
      <rect x="14" y="4" width="6" height="6" rx="1" />
      <rect x="4" y="14" width="6" height="6" rx="1" />
      <path d="M14 14h2v2" />
      <path d="M20 14v6h-6" />
      <path d="M17 17h3" />
    </>
  ),
  tree: (
    <>
      <path d="M12 3c2.6 0 4.5 2 4.5 4.4 0 .8-.2 1.5-.6 2.1 1.4.5 2.4 1.8 2.4 3.4 0 2-1.7 3.6-3.8 3.6H7.5C5.6 16.5 4 15 4 13c0-1.6 1-2.9 2.4-3.4-.4-.6-.6-1.3-.6-2.1C5.8 5 7.7 3 12 3Z" />
      <path d="M12 16.5V21" />
    </>
  ),
  gift: (
    <>
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M5 12v9h14v-9" />
      <path d="M12 8v13" />
      <path d="M12 8C12 5 10.5 3.5 9 3.5S6.5 4.8 6.5 6 8 8 12 8Z" />
      <path d="M12 8c0-3 1.5-4.5 3-4.5S17.5 4.8 17.5 6 16 8 12 8Z" />
    </>
  ),
  bell: (
    <>
      <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z" />
      <path d="M10.5 19a1.5 1.5 0 0 0 3 0" />
    </>
  ),
  sparkle: (
    <>
      <path d="M12 3.5c.4 3.6 1.9 5.1 5.5 5.5-3.6.4-5.1 1.9-5.5 5.5-.4-3.6-1.9-5.1-5.5-5.5 3.6-.4 5.1-1.9 5.5-5.5Z" />
      <path d="M18 14c.2 1.8 1 2.6 2.8 2.8-1.8.2-2.6 1-2.8 2.8-.2-1.8-1-2.6-2.8-2.8 1.8-.2 2.6-1 2.8-2.8Z" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19c0-8 5.5-13 14-13 0 8.5-5 14-13 14" />
      <path d="M5 19c3.5-5 7-7.5 11-9" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.6 2.6 2.6 15.4 0 18M12 3c-2.6 2.6-2.6 15.4 0 18" />
    </>
  ),
  account: (
    <>
      <path d="M3 9.5 12 4l9 5.5" />
      <path d="M5 10v8M19 10v8M9 10v8M15 10v8" />
      <path d="M3 20h18" />
    </>
  ),
  card: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="M3 10h18" />
      <path d="M7 15h4" />
    </>
  ),
  savings: (
    <>
      <path d="M3 11c0-3 2.5-5 6-5h2c3.5 0 6 2.4 6 5.5S14.5 17 11 17H9l-2 3v-3.2A5.4 5.4 0 0 1 3 11Z" />
      <path d="M18 9.5h2" />
      <path d="M9 9h.01" />
    </>
  ),
  loan: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M6 12h.01M18 12h.01" />
    </>
  ),
  wallet: (
    <>
      <path d="M4 7a2 2 0 0 1 2-2h11a1 1 0 0 1 1 1v2" />
      <rect x="3" y="7" width="18" height="12" rx="2" />
      <path d="M16 12.5h.01" />
      <path d="M21 11h-4a1.5 1.5 0 0 0 0 3h4" />
    </>
  ),
  investment: (
    <>
      <path d="M4 19V5" />
      <path d="M4 19h16" />
      <path d="m7 15 3-4 3 2 5-6" />
      <path d="M18 7h2v2" />
    </>
  ),
  insurance: (
    <>
      <path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  asset: (
    <>
      <path d="M4 21V8l8-5 8 5v13" />
      <path d="M4 21h16" />
      <path d="M9 21v-5h6v5" />
      <path d="M9 11h.01M15 11h.01" />
    </>
  ),
  transport: (
    <>
      <rect x="4" y="4" width="16" height="13" rx="2" />
      <path d="M4 11h16" />
      <path d="M7 17v2M17 17v2" />
      <path d="M8 14h.01M16 14h.01" />
    </>
  ),
  food: (
    <>
      <path d="M5 3v7a2 2 0 0 0 4 0V3" />
      <path d="M7 11v10" />
      <path d="M17 3c-1.7 0-3 2-3 5s1.3 4 3 4" />
      <path d="M17 3v18" />
    </>
  ),
  shopping: (
    <>
      <path d="M4 7h16l-1.3 11a2 2 0 0 1-2 1.8H7.3a2 2 0 0 1-2-1.8L4 7Z" />
      <path d="M8.5 7a3.5 3.5 0 0 1 7 0" />
    </>
  ),
  travel: (
    <>
      <path d="M3 13.5 21 4l-4.5 16-4-6.5L3 13.5Z" />
      <path d="m12.5 13 2.5-2.5" />
    </>
  ),
  utilities: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />,
  box: (
    <>
      <path d="M3 8 12 3l9 5v8l-9 5-9-5V8Z" />
      <path d="m3 8 9 5 9-5" />
      <path d="M12 13v8" />
    </>
  ),
  bag: (
    <>
      <path d="M6 8h12l1 12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1L6 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </>
  ),
  check: <path d="m5 12 5 5L20 7" />,
};

export function Icon({
  name,
  className = "h-6 w-6",
  ...props
}: { name: IconName; className?: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
