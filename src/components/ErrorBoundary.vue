<script setup lang="ts">
import { onErrorCaptured, ref } from 'vue'
import Card from '@/components/ui/Card.vue'
import CardHeader from '@/components/ui/CardHeader.vue'
import CardTitle from '@/components/ui/CardTitle.vue'
import CardContent from '@/components/ui/CardContent.vue'
import Button from '@/components/ui/Button.vue'

const error = ref<Error | null>(null)

onErrorCaptured((err) => {
  error.value = err instanceof Error ? err : new Error(String(err))
  console.error('[ErrorBoundary]', err)
  return false
})

function reset() {
  error.value = null
}

function reload() {
  location.reload()
}
</script>

<template>
  <slot v-if="!error" />
  <div v-else class="mx-auto max-w-2xl p-6">
    <Card>
      <CardHeader>
        <CardTitle class="text-red-600">出错了</CardTitle>
      </CardHeader>
      <CardContent class="space-y-3">
        <p class="text-sm text-gray-600">页面渲染时捕获到错误，可以重置或刷新页面。</p>
        <pre class="max-h-60 overflow-auto rounded bg-gray-100 p-3 text-xs">{{ error.stack }}</pre>
        <div class="flex gap-2">
          <Button @click="reset">重试</Button>
          <Button variant="outline" @click="reload">刷新页面</Button>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
