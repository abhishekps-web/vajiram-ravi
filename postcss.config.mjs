export default {
  plugins: {
    // Tailwind v4, used by the Programmes section only (components/sections/Programmes/programmes.css): the rest of the site is
    // plain stylesheets served from public/css, which do not go through PostCSS.
    "@tailwindcss/postcss": {},
  },
};
