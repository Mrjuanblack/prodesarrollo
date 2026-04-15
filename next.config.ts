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
