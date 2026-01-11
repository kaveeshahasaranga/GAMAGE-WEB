/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                omega: {
                    red: '#c41e3a', // Approximate Omega Red
                    dark: '#1a1a1a',
                    gold: '#d4af37',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'], // Premium font
            }
        },
    },
    plugins: [],
}
