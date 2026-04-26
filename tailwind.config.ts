import type { Config } from "tailwindcss";

export default {
    content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#131313",
                secondary: "#2C2C2D",
                success: "#40C4AA",
                error: "#DF1C41",
                info: "#33CFFF",
                warning: "#FFBE4C",
            },
        },
    },
    plugins: [],
} satisfies Config;