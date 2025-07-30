/* eslint-disable */

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
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.eslint.json",
        tsconfigRootDir: __dirname
      }
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
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react-hooks/exhaustive-deps": "off",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/explicit-module-boundary-types": "error",
      "@typescript-eslint/typedef": [
        "error",
        {
          variableDeclaration: true,
          variableDeclarationIgnoreFunction: true,
          parameter: true,
          arrowParameter: true,
          propertyDeclaration: true,
          memberVariableDeclaration: true
        }
      ],
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
      ],
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: [
            "classProperty",
            "objectLiteralProperty",
            "typeProperty",
            "classMethod",
            "objectLiteralMethod",
            "typeMethod",
            "accessor",
            "enumMember"
          ],
          format: null,
          modifiers: ["requiresQuotes"]
        },
        {
          selector: "typeLike",
          format: ["StrictPascalCase"],
          leadingUnderscore: "forbid",
          trailingUnderscore: "forbid"
        },
        {
          selector: "variable",
          types: ["function"],
          format: ["StrictPascalCase", "strictCamelCase"]
        },
        {
          selector: "variable",
          modifiers: ["exported"],
          format: ["UPPER_CASE"]
        },
        {
          selector: ["variable", "property", "parameter", "function", "method"],
          format: ["strictCamelCase"],
          leadingUnderscore: "forbid",
          trailingUnderscore: "forbid"
        },
        {
          selector: "enumMember",
          format: ["UPPER_CASE"]
        }
      ]
    }
  },
  globalIgnores(["**/dist", "**/.eslintrc.cjs"])
]);
