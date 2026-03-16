import type { NextConfig } from "next";

const securityHeaders = [
  // Prevent browsers from MIME-sniffing the content type
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // Deny framing entirely — prevents clickjacking
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  // Limit referrer info sent to third parties
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // Disable browser features not needed by the app
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  // Force HTTPS for 1 year (only effective in production)
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
  // Content Security Policy
  // - default-src self: only allow resources from own origin
  // - script-src: Next.js needs 'unsafe-inline' for inline scripts + 'unsafe-eval' for dev HMR
  //   (tighten to nonce-based in production when ready)
  // - style-src: Tailwind injects inline styles at runtime
  // - img-src: allow data URIs (inline SVGs) and blob: (canvas exports)
  // - media-src: allow local video files (hero-bg.mp4, auth-bg.mp4)
  // - connect-src: allow Mapbox tiles and Supabase (pre-wired for when auth lands)
  // - frame-ancestors: belt-and-suspenders clickjack protection alongside X-Frame-Options
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://api.mapbox.com https://events.mapbox.com",
      "media-src 'self'",
      "connect-src 'self' https://api.mapbox.com https://events.mapbox.com https://*.supabase.co wss://*.supabase.co",
      "font-src 'self'",
      "worker-src blob:",
      "frame-ancestors 'none'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Apply to all routes
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
