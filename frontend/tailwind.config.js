/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
      },
      fontFamily: {
        display: ["Space Grotesk", "ui-sans-serif", "system-ui"],
        body: ["IBM Plex Sans", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        glow: "0 10px 30px rgba(37, 99, 235, 0.2)",
        lift: "0 12px 30px rgba(15, 23, 42, 0.08)",
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(circle at top, rgba(59, 130, 246, 0.18), transparent 55%), radial-gradient(circle at 20% 10%, rgba(14, 165, 233, 0.12), transparent 45%)",
      },
    },
  },
  plugins: [],
};
