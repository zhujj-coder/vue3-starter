#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { resolve, basename, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const projectName = basename(process.cwd())

if (projectName === 'vue3-starter') {
  console.error('\u274c 请先通过 degit 把模板复制到新目录:\n   npx degit spark/vue3-starter my-new-project')
  process.exit(1)
}

const validate = /^(?:@[a-z0-9-*~][a-z0-9-*.\~]*\/)?[a-z0-9-~][a-z0-9-.\~]*$/
if (!validate.test(projectName)) {
  console.error(`\u274c 目录名 "${projectName}" 不是合法的 npm 包名`)
  process.exit(1)
}

const titleCase = projectName
  .replace(/[-_]+/g, ' ')
  .replace(/\b\w/g, (c) => c.toUpperCase())

const envFiles = ['.env', '.env.example', '.env.development', '.env.production']
const targets = [
  { file: 'package.json', transform: (c) => c.replace(/"name":\s*"vue3-starter"/, `"name": "${projectName}"`) },
  { file: 'index.html', transform: (c) => c.replace(/<title>vue3-starter<\/title>/, `<title>${titleCase}</title>`) },
  { file: 'README.md', transform: (c) => c.replace(/^# vue3-starter$/m, `# ${titleCase}`) },
  ...envFiles.map((file) => ({
    file,
    transform: (c) => c.replace(/^(VITE_APP_TITLE=).*$/m, `$1${projectName}`),
  })),
]

for (const { file, transform } of targets) {
  const path = join(root, file)
  if (!existsSync(path)) continue
  const before = await readFile(path, 'utf8')
  const after = transform(before)
  if (before !== after) {
    await writeFile(path, after, 'utf8')
    console.log(`\u2728 ${file} \u2192 ${projectName}`)
  }
}

console.log(`\n\u2705 已初始化项目: ${projectName}`)
console.log('   下一步: npm install')
