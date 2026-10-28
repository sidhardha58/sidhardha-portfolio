/** @type {import('next').NextConfig} */
// Dev chunk URLs used to be cached for a year as immutable. Turbopack reuses
// those filenames, so a normal refresh kept the previous client bundle and
// hydrated the new HTML against old experience copy. A prefix the browser has
// never stored forces a fresh script on the next load.
const devAssets = process.env.NODE_ENV !== "production";
const nextConfig = {
  reactStrictMode: true,
  cacheComponents: true,
  ...(devAssets ? { assetPrefix: "/fresh" } : {}),
  async rewrites() {
    return devAssets
      ? [{ source: "/fresh/_next/:path*", destination: "/_next/:path*" }]
      : [];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // SAMEORIGIN (not DENY) so the resume page can embed its own PDF;
          // still blocks other sites from framing us (clickjacking protection).
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        source: "/assets/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600, must-revalidate" },
        ],
      },
      ...(devAssets
        ? [
            {
              source: "/fresh/_next/(.*)",
              headers: [{ key: "Cache-Control", value: "no-store" }],
            },
          ]
        : [
            {
              source: "/_next/static/(.*)",
              headers: [
                { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
              ],
            },
          ]),
    ];
  },
};

export default nextConfig;
