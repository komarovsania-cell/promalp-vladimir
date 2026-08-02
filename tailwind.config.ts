import type { Config } from "tailwindcss";

const config: Config = {
    content: [
          "./src/**/*.{js,ts,jsx,tsx,mdx}",
        ],
    theme: {
          extend: {
                  colors: {
                            ink: {
                                        DEFAULT: "#0a0b0d",
                                        soft: "#121418",
                                        surface: "#181b20",
                                        border: "#262a31",
                            },
                            paper: {
                                        DEFAULT: "#f3f1ea",
                                        muted: "#9aa0a8",
                            },
                            gold: {
                                        DEFAULT: "#c9a24a",
                                        bright: "#e6c778",
                                        dim: "#8a7031",
                            },
                            flame: {
                                        DEFAULT: "#ff5a1f",
                                        soft: "#ff7a45",
                            },
                  },
                  fontFamily: {
                            display: ["var(--font-unbounded)", "sans-serif"],
                            body: ["var(--font-inter)", "sans-serif"],
                  },
                  backgroundImage: {
                            "grain": "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
                  },
          },
    },
    plugins: [],
};
export default config;
