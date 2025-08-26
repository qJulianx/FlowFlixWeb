/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "https://flowflix.pl",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
