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
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      ...generateGrid(24),
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        tcglist: "1580px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
