const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",

  images: {
    unoptimized: true,
  },

  basePath: isProd ? "/electrum-observatory" : "",
  assetPrefix: isProd ? "/electrum-observatory/" : "",

  trailingSlash: true,
};

export default nextConfig;