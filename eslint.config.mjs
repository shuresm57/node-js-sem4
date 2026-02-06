import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",  // Changed from "module"
      globals: {
        ...globals.node
      }
    }
  }
];