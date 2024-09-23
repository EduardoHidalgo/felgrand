import type { Config } from "tailwindcss";

const generateGrid = (size: number) => {
  const gridColumn = {} as any;
  const gridColumnEnd = {} as any;
  const gridColumnStart = {} as any;
  const gridRow = {} as any;
  const gridRowEnd = {} as any;
  const gridRowStart = {} as any;
  const gridTemplateColumns = {} as any;
  const gridTemplateRows = {} as any;

  for (let i = 1; i <= size; i++) {
    gridColumnEnd[i] = `${i}`;
    gridColumnStart[i] = `${i}`;
    gridColumn[`span-${i}`] = `span ${i} / span ${i}`;
    gridRowEnd[i] = `${i}`;
    gridRowStart[i] = `${i}`;
    gridRow[`span-${i}`] = `span ${i} / span ${i}`;
    gridTemplateColumns[i] = `repeat(${i}, minmax(0, 1fr))`;
    gridTemplateRows[i] = `repeat(${i}, minmax(0, 1fr))`;
  }
  return {
    gridColumn,
    gridColumnEnd,
    gridColumnStart,
    gridRow,
    gridRowEnd,
    gridRowStart,
    gridTemplateColumns,
    gridTemplateRows,
  };
};

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        tcglist: "1580px",
      },
      colors: {
        effect: "#FF8B53",
        normal: "#FDE68A",
        spell: "#6aa84f",
        ritual: "#9DB5CC",
        link: "#0b5394",
        fusion: "#9900FF",
        trap: "#a64d79",
        synchro: "#CCCCCC",
        token: "#C0C0C0",
        xyz: "#323232",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      animation: {
        shiny: "shiny 2s ease infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        shiny: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("tailwindcss-animate")],
};
export default config;
