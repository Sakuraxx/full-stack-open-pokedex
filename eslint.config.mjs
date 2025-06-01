import globals from 'globals';
import js from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import pluginJest from "eslint-plugin-jest"; // 导入 Jest 插件

// 如果你想使用 @stylistic 插件处理风格规则 (从你的旧配置看，你有很多风格规则)
import stylisticJs from '@stylistic/eslint-plugin-js';
// import stylisticJsx from '@stylistic/eslint-plugin-jsx'; // 如果有 JSX 特定的风格规则

export default [
  // 1. 全局推荐规则 (等同于 "eslint:recommended")
  js.configs.recommended,

  // 2. Node.js 文件配置 (例如 app.js, server-side scripts)
  {
    files: ['app.js', 'src/server/**/*.js', '*.config.js', '*.config.mjs'], // 匹配你的 Node.js 和配置文件
    languageOptions: {
      sourceType: 'module', // 假设这些文件也是 ESM
      ecmaVersion: 'latest',
      globals: {
        ...globals.node, // Node.js 全局变量
      },
    },
    rules: {
      "no-console": "warn", // 在 Node.js 开发中可能想看到 console，部署时可以改为 "error"
    }
  },

  // 3. 前端 React/JSX 和 Jest 测试文件配置
  // 这个配置块将应用 React 推荐规则、Jest 推荐规则以及你的自定义规则
  {
    files: ['src/**/*.js', 'src/**/*.jsx', 'test/**/*.jsx', '**/*.test.js', '**/*.spec.js'], // 匹配前端 JS/JSX 和 Jest 测试文件
    ...pluginReactConfig,   // 应用 eslint-plugin-react 的推荐配置 (等同于 "plugin:react/recommended")
    plugins: { // 明确声明插件，以便可以使用其规则 (比如 jest/...)
      // 'react' 插件通过 pluginReactConfig 已经间接引入了，但为了清晰或自定义可以写上
      // react: pluginReact, // (需要 import pluginReact from 'eslint-plugin-react') - pluginReactConfig 通常足够
      jest: pluginJest,
    },
    languageOptions: {
      sourceType: 'module',         // 等同于 parserOptions.sourceType
      ecmaVersion: 'latest',        // 等同于 parserOptions.ecmaVersion (2018 会被 'latest' 覆盖)
      globals: {
        ...globals.browser,       // 等同于 env.browser
        ...globals.es2021,        // 等同于 env.es6 (es2021 包含 es6 及更新特性)
        ...pluginJest.environments.globals.globals, // 等同于 env["jest/globals"]
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,              // 等同于 parserOptions.ecmaFeatures.jsx
        },
      },
    },
    settings: {
      react: {
        version: "detect"
      }
    },
    rules: {
      "indent": ["error", 2], // 这些风格规则推荐使用 @stylistic/eslint-plugin-js
    }
  },

  // 4. 使用 @stylistic 插件处理风格规则 (推荐，因为 ESLint 核心不再维护这些)
  {
    // 这个配置块可以应用于所有需要格式化的文件，或者特定文件类型
    files: ['**/*.js', '**/*.jsx'], // 调整文件匹配
    plugins: {
      '@stylistic/js': stylisticJs,
      // '@stylistic/jsx': stylisticJsx, // 如果有 JSX 特定的风格规则
    },
    rules: {
      '@stylistic/js/indent': ['error', 2],
      // '@stylistic/js/linebreak-style': ['error', 'unix'],
      '@stylistic/js/quotes': ['warn', 'single'],
      // '@stylistic/js/semi': ['error', 'never'],
      // '@stylistic/js/object-curly-spacing': ['error', 'always'],
      // '@stylistic/js/arrow-spacing': ['error', { "before": true, "after": true }],
      // 你也可以在这里添加 '@stylistic/jsx/...' 规则
    }
  },

  // 5. 全局忽略
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'coverage/**', // Jest 覆盖率报告
      '.DS_Store',
      'webpack.config.js'
      // '.eslintrc.js', // 迁移完成后，可以删除这个旧文件，所以不需要忽略了
      // 其他需要忽略的文件或目录
    ],
  },
];