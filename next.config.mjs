/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        destination: "https://flowflix.pl/:path*",
        permanent: true, // 301 redirect
      },
    ]
  },
}

export default nextConfig
