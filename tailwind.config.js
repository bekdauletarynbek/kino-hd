module.exports = {
    purge: [
        './public/**/*.html',
        './src/**/*.vue',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        textColor: theme=> ({
            ...theme('colors'),
            'overview': '#f5f3f4',

        }),
        extend: {
            height: {
                "10v": "10vh",
                "20v": "20vh",
                "30v": "30vh",
                "40v": "40vh",
                "50v": "50vh",
                "60v": "60vh",
                "70v": "70vh",
                "80v": "80vh",
                "90v": "90vh",
                "100v": "100vh",
                "120v": "120vh"
            },
        },
        backgroundColor: theme=> ({
            ...theme('colors'),
            'header-bg': '#1f1f1f',
            'content-bg': '#141414',
            'button-play': '#f60'
        })
    },
    variants: {
        extend: {
        },
    },
    plugins: [],
}
