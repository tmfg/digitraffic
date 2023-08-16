module.exports = {
    printWidth: 110,
    endOfLine: "auto",
    singleQuote: false,

    // For ES5, trailing commas cannot be used in function parameters
    trailingComma: "none",
    overrides: [
        {
            files: ["*.json", "*.yml", "*.yaml", "*.css", "*.scss", "*.html"],
            options: {
                tabWidth: 2
            }
        }
    ]
};
