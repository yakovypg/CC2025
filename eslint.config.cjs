const { defineConfig, globalIgnores } = require("eslint/config");
const { fixupConfigRules } = require("@eslint/compat");

const globals = require("globals");

const reactRefresh = require("eslint-plugin-react-refresh");
const tsParser = require("@typescript-eslint/parser");
const js = require("@eslint/js");

const { FlatCompat } = require("@eslint/eslintrc");

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

module.exports = defineConfig([
  {
    languageOptions: {
      globals: {
        ...globals.browser
      },

      parser: tsParser
    },

    extends: fixupConfigRules(
      compat.extends(
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:import/recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier"
      )
    ),

    plugins: {
      "react-refresh": reactRefresh
    },

    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json"
        }
      },
      react: {
        version: "detect"
      }
    },

    rules: {
      "import/order": [
        "error",
        {
          "newlines-between": "always",
          groups: ["builtin", "external", "internal"],

          alphabetize: {
            order: "asc",
            caseInsensitive: true
          }
        }
      ]
    }
  },
  globalIgnores(["**/dist", "**/.eslintrc.cjs"])
]);
