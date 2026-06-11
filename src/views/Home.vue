<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/counter'
import Button from '@/components/ui/Button.vue'
import Card from '@/components/ui/Card.vue'
import CardHeader from '@/components/ui/CardHeader.vue'
import CardTitle from '@/components/ui/CardTitle.vue'
import CardContent from '@/components/ui/CardContent.vue'
import Badge from '@/components/ui/Badge.vue'

const counter = useCounterStore()
const { count, doubleCount } = storeToRefs(counter)
const { increment, decrement, reset } = counter
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold text-gray-800">Vue 3 + Vite + Pinia + shadcn-vue</h1>
      <p class="mt-2 text-gray-500">A clean starting point for your next project.</p>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Pinia 示例</CardTitle>
      </CardHeader>
      <CardContent class="space-y-3">
        <p class="text-sm text-gray-500">
          用 <code class="rounded bg-gray-100 px-1">storeToRefs</code> 解构状态以保持响应性。
        </p>
        <div class="btn-row">
          <Button variant="outline" size="sm" @click="decrement">-</Button>
          <span class="counter-value">{{ count }}</span>
          <Button variant="outline" size="sm" @click="increment">+</Button>
          <Button variant="ghost" size="sm" @click="reset">Reset</Button>
        </div>
        <p class="text-sm text-gray-500">
          Double: <Badge>{{ doubleCount }}</Badge>
        </p>
      </CardContent>
    </Card>
  </div>
</template>
