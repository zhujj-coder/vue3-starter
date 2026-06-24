# vue3-starter

Vue 3 + Vite + Pinia + shadcn-vue + Tailwind CSS 脚手架。

## 技术栈

| 名称 | 用途 |
|---|---|
| [Vue 3](https://vuejs.org/) | Composition API + `<script setup>` |
| [Vite](https://vitejs.dev/) | 开发服务器与构建工具 |
| [Vue Router](https://router.vuejs.org/) | 官方路由 |
| [Pinia](https://pinia.vuejs.org/) | 状态管理（Setup Store 风格） |
| [shadcn-vue](https://www.shadcn-vue.com/) | 可复制、可定制的组件 |
| [Tailwind CSS](https://tailwindcss.com/) | 原子化 CSS |
| [@vueuse/core](https://vueuse.org/) | 组合式工具集 |
| [axios](https://axios-http.com/) | HTTP 客户端（`src/lib/request.ts` 统一封装） |
| [vue-sonner](https://github.com/wobsoriano/vue-sonner) | 全局 Toast 通知 |
| ESLint + Prettier | 代码规范与格式化 |

## 环境要求

- Node.js **>= 20.19.0**
- npm / pnpm / yarn 任选

## 使用脚手架

通过 [degit](https://github.com/Rich-Harris/degit) 直接拉取模板（无需克隆整个 git 历史）：

```bash
npx degit zhujj-coder/vue3-starter my-new-project
cd my-new-project
npm install
npm run init          # 把 package.json / index.html / README 的名字改成 my-new-project
cp .env.example .env.development   # 可选
npm run dev
```

`npm run init` 会用**当前目录名**作为新项目名，写入 `package.json`、`index.html` 的 `<title>` 与 `README.md` 标题。该脚本只会修改以上三处，**不会**重命名目录本身，所以建议在 degit 时就指定最终名字。

打开 [http://localhost:3000](http://localhost:3000)。

## 常用脚本

| 命令 | 说明 |
|---|---|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 类型检查 + 生产构建 |
| `npm run preview` | 预览生产产物 |
| `npm run lint` | ESLint 检查 |
| `npm run lint:fix` | ESLint 自动修复 |
| `npm run format` | Prettier 格式化 |
| `npm run format:check` | 检查格式是否符合规范 |
| `npm run typecheck` | TypeScript 类型检查 |

## 目录结构

```
src/
├── components/
│   ├── ErrorBoundary.vue   ← 全局错误边界
│   └── ui/                 ← shadcn-vue 组件（CLI 管理）
├── composables/            ← 组合式函数（useXxx）
├── lib/
│   └── utils.ts            ← cn() 工具
├── stores/                 ← Pinia stores
├── views/                  ← 路由页面
├── router/
│   └── index.ts
├── App.vue
├── main.ts
├── env.ts                  ← 类型化环境变量
├── env.d.ts                ← TS 类型声明
└── style.css               ← Tailwind + 主题变量
```

## HTTP 请求

`src/lib/request.ts` 基于 axios 做了统一封装：

- 请求拦截器自动注入 `Authorization: Bearer <token>`（从 `localStorage.token` 读取）
- 响应拦截器约定业务响应 `{ code, message, data }`：
  - `code` 在 `200-299` 之间时直接返回 `data`
  - 其它情况自动弹窗提示 `message`，并以 `ApiError` reject
- 网络错误 / HTTP 状态码错误也会 toast 提示

```ts
import { request } from '@/lib/request'
import { getUser } from '@/api/user'

const user = await getUser(1)
```

业务 API 写在 `src/api/<module>.ts`，按域拆分。

## 添加 shadcn-vue 组件

```bash
npx shadcn-vue@latest add <component>
# 例：npx shadcn-vue@latest add select
```

可用组件清单见 [shadcn-vue 文档](https://www.shadcn-vue.com/docs/components)。

## 路径别名

| 别名 | 指向 |
|---|---|
| `@/*` | `src/*` |
| `@/comps` | `src/components`（含子目录） |

## 环境变量

1. 在 `.env.example` 写好变量列表
2. 在 `src/env.d.ts` 的 `ImportMetaEnv` 接口加类型
3. 在 `src/env.ts` 导出常量（业务代码从这里导入，**不要直接用 `import.meta.env`**）

## 错误处理

- `src/main.ts` 注册了 `app.config.errorHandler` + `unhandledrejection` 监听
- `<ErrorBoundary>` 包裹整个 App，子组件抛错会渲染降级 UI 而非白屏

## License

MIT
