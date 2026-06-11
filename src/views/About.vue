<script setup lang="ts">
import Card from '@/components/ui/Card.vue'
import CardHeader from '@/components/ui/CardHeader.vue'
import CardTitle from '@/components/ui/CardTitle.vue'
import CardContent from '@/components/ui/CardContent.vue'

const stack = [
  { name: 'Vue 3', desc: 'Composition API + <script setup>' },
  { name: 'Vite', desc: '极速开发服务器与构建工具' },
  { name: 'Vue Router', desc: '官方路由' },
  { name: 'Pinia', desc: 'Vue 官方状态管理' },
  { name: 'shadcn-vue', desc: '可复制、可定制的组件（基于 Radix Vue）' },
  { name: 'Tailwind CSS', desc: '原子化 CSS 框架' },
  { name: '@vueuse/core', desc: 'Vue 组合式工具集' },
]
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>技术栈</CardTitle>
    </CardHeader>
    <CardContent>
      <ul class="space-y-2">
        <li v-for="s in stack" :key="s.name" class="flex items-baseline gap-3">
          <span class="w-32 shrink-0 font-semibold text-gray-800">{{ s.name }}</span>
          <span class="text-sm text-gray-500">{{ s.desc }}</span>
        </li>
      </ul>
    </CardContent>
  </Card>
</template>
