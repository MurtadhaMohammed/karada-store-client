/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      boxShadow: {
        'brand-custom': '0 -2px 4px rgba(122, 57, 235, 0.15), 0 2px 4px rgba(81, 69, 229, 0.15)',
      },
      lineHeight: {
        "tight-custom": "1.1",
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
