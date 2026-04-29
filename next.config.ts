import type { NextConfig } from "next";

function parsePublicStorageHost(): string | undefined {
  const url = process.env.NEXT_PUBLIC_STORAGE_URL;
  if (!url) return undefined;
  try {
    return new URL(url).hostname;
  } catch {
    return undefined;
  }
}

const storageHost = parsePublicStorageHost();

const nextConfig: NextConfig = {
  images: {
    // Bypass Next image optimizer for remote images. R2 already serves
    // pre-processed assets, so going through /_next/image just adds latency
    // and breaks under Next 16's stricter optimizer rules (quality must be
    // declared, remotePatterns must match exactly, etc.).
    unoptimized: true,
    remotePatterns: storageHost
      ? [
          {
            protocol: "https",
            hostname: storageHost,
            pathname: "/**",
          },
        ]
      : [],
  },
};

export default nextConfig;
