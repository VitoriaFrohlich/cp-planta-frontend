import typescriptEslint from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-plugin-prettier";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "next/core-web-vitals"
  ),
  {
    plugins: [
      "@typescript-eslint",
      "prettier"
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      quotes: ["error", "single"],
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
          semi: true,
          singleQuote: true,
          tabWidth: 2,
          trailingComma: "none",
          printWidth: 80,
        },
        {
          usePrettierrc: true,
        }
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        }
      ],
      "no-console": [
        "warn",
        {
          allow: ["warn", "error"],
        }
      ],
    },
  }
];