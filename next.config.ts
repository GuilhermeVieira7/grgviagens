import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"], qualities: [75, 82] },
  async redirects() {
    // www.grgviagens.com.br -> grgviagens.com.br (redirecionamento permanente, mantém o caminho)
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.grgviagens.com.br" }],
        destination: "https://grgviagens.com.br/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
