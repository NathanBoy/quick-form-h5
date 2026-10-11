module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module'
  },
  // eslint-plugin-vue recommended + eslint recommended, with prettier
  // turning off any conflicting formatting rules. .vue files are handled
  // by the plugin's own vue-eslint-parser.
  extends: [
    'plugin:vue/recommended',
    'eslint:recommended',
    'prettier'
  ],
  rules: {
    // The form components intentionally mutate the shared `props` object
    // passed in from the parent page, so this rule is disabled.
    'vue/no-mutating-props': 'off',
    // Style-only rules that conflict with the project's existing markup.
    'vue/multi-word-component-names': 'off',
    'vue/require-default-prop': 'off',
    // The form components declare props as a loose options object whose
    // fields are validated at runtime in the parent page, so per-field
    // type annotations aren't required here.
    'vue/require-prop-types': 'off',
    'vue/no-v-html': 'off',
    'vue/attributes-order': 'off',
    'vue/v-on-style': 'off',
    'vue/v-bind-style': 'off',
    'vue/attribute-hyphenation': 'off',
    'vue/component-definition-name-casing': 'off',
    'vue/order-in-components': 'off',
    'no-unused-vars': 'warn'
  },
  ignorePatterns: ['dist/', 'node_modules/', 'docs/']
}
