import globals from 'globals';
import js from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js"; // 导入 React 插件的推荐配置
// 如果你之前安装了 @stylistic/eslint-plugin-js 并想用它，也需要导入
// import stylisticJs from '@stylistic/eslint-plugin-js';

export default [
  // 1. 全局推荐规则 (适用于所有 JS/JSX/TS/TSX 文件)
  js.configs.recommended,

  // 2. Node.js 文件配置 (例如 app.js, server-side scripts)
  {
    files: ['app.js', 'src/server/**/*.js'], // 根据你的项目结构调整，确保匹配到你的 Node.js 文件
                                           // 如果你的 Node.js 文件都在根目录或特定目录下，可以更精确
                                           // 例如：['*.js', 'config/**/*.js'] (如果根目录 .js 是 Node.js)
    languageOptions: {
      sourceType: 'module', // 因为你的 app.js 是 ESM
      ecmaVersion: 'latest',
      globals: {
        ...globals.node, // Node.js 全局变量 (process, console, etc.)
      },
    },
    // 你可以在这里为 Node.js 文件覆盖或添加特定规则
    // rules: {
    //   "no-console": "off", // 示例：允许在 Node.js 文件中使用 console
    // }
  },

  // 3. 前端 React/JSX/TSX 文件配置
  {
    files: ['src/**/*.jsx', 'src/**/*.js', 'src/**/*.ts', 'src/**/*.tsx'], // 假设前端代码在 src 目录下
                                                                         // 确保这里的 .js 也匹配前端的 JS 文件
    ...pluginReactConfig, // 应用 eslint-plugin-react 的推荐配置
    languageOptions: {
      sourceType: 'module', // 前端代码通常是 ES Modules
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser, // 浏览器全局变量 (window, document, etc.)
        // 如果你的前端代码也用到了 Node.js 的某些全局变量 (不常见，但可能通过 polyfill)
        // ...globals.node, // 谨慎添加
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // 启用 JSX 解析
        },
      },
    },
    settings: { // React 插件通常需要这个
      react: {
        version: "detect" // 自动检测项目中使用的 React 版本
      }
    },
    // 你可以在这里为 React/JSX 文件覆盖或添加特定规则
    // rules: {
    //   "react/prop-types": "off", // 示例：如果你不使用 prop-types
    // }
  },

  // 4. Stylistic rules (如果你想使用 @stylistic/eslint-plugin-js)
  // {
  //   plugins: {
  //     '@stylistic/js': stylisticJs
  //   },
  //   rules: {
  //     '@stylistic/js/indent': ['error', 2],
  //     '@stylistic/js/linebreak-style': ['error', 'unix'],
  //     '@stylistic/js/quotes': ['error', 'single'],
  //     '@stylistic/js/semi': ['error', 'never'],
  //     // ...其他 @stylistic 规则
  //   }
  // },

  // 5. 全局忽略
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '**/coverage/**', // 通常忽略测试覆盖率报告
      '**/*.config.js', // 忽略配置文件本身，除非你想 lint 它们
      '**/*.config.mjs',
      '.webpack/',      // 如果有 webpack 缓存等
      // 其他需要忽略的文件或目录
    ],
  },
];