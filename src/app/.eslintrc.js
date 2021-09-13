/* eslint-disable */
const style = require("eslint-config-airbnb-base/rules/style");
module.exports = {
    extends: ["airbnb", "airbnb/hooks"],
    env: {
        "es6": true,
        "browser": true
    },
    plugins: [
        "react-hooks"
    ],
    rules: {
        "indent": ["error", 4, style.rules.indent[2]],
        "react/jsx-indent": ["error", 4],
        "react/jsx-indent-props": ["error", 4],
        "quotes": ["error", "double"],
        "react/no-unused-prop-types": "warn",
        "no-underscore-dangle": "off",
        "comma-dangle": ["error", "only-multiline"],
        "import/no-unresolved": ["error", { "ignore": ["^[~@]"] }],
        "max-len": ["error", 150],
        "linebreak-style": "off",
        "import/extensions": "off"
    },
    settings: {
        "import/ignore": ["^[~@]"]
    }
};
