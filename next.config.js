/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  experimental: { appDir: true },
  compiler: {
    styledComponents: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  modularizeImports: {
    "@mui/icons-material": {
      transform: "@mui/icons-material/{{member}}",
    },
    "@mui/material": {
      transform: "@mui/material/{{member}}",
    },
  },
  env: {
    customKey: "my-value",
  },
  images:{
    domains: ['wallpaper-cache.nyc3.cdn.digitaloceanspaces.com'],
  }
};

module.exports = nextConfig;
