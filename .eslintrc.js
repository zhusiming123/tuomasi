module.exports = {
    root: true,
    env: {
        node: true,
        browser: true,
    },
    extends: ['plugin:vue/strongly-recommended',"eslint:recommended"],
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        "indent": ["warn", 2],
        "quotes": ["warn", "double"],
        "semi": ["error", "always"],
    },
    parserOptions: {
        "parser": "babel-eslint",
        "ecmaVersion": 2019,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        },
    }
};
