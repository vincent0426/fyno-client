/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            height: {
                onePage: "calc(100vh - 5rem)", // height that is full page except for header.
            },
        },
    },
    plugins: [],
};
