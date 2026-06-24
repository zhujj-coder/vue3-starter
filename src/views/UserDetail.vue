<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { getUser, listUsers, type User } from '@/api/user'
import { ApiError } from '@/lib/request'
import { toastError, toastSuccess, toastInfo } from '@/lib/toast'
import Button from '@/components/ui/Button.vue'
import Card from '@/components/ui/Card.vue'
import CardHeader from '@/components/ui/CardHeader.vue'
import CardTitle from '@/components/ui/CardTitle.vue'
import CardContent from '@/components/ui/CardContent.vue'
import Input from '@/components/ui/input/Input.vue'
import Badge from '@/components/ui/Badge.vue'

const userId = ref(1)
const user = ref<User | null>(null)
const list = ref<User[]>([])
const listTotal = ref(0)
const loading = ref(false)
const listLoading = ref(false)
const abortRef = ref<AbortController | null>(null)

function describeError(err: unknown): string {
  if (err instanceof ApiError) return err.message
  if (err instanceof Error) return err.message
  return String(err)
}

async function fetchUser() {
  abortRef.value?.abort()
  const controller = new AbortController()
  abortRef.value = controller
  loading.value = true
  user.value = null
  try {
    const data = await getUser(userId.value, { signal: controller.signal })
    user.value = data
    toastSuccess(`已加载用户 #${data.id}`)
  } catch (err) {
    if (controller.signal.aborted) return
    const code = err instanceof ApiError ? err.code : 0
    if (code === 404) {
      toastError(`用户 #${userId.value} 不存在`, '换一个 ID 试试')
    } else {
      toastError(describeError(err))
    }
  } finally {
    if (abortRef.value === controller) abortRef.value = null
    loading.value = false
  }
}

async function fetchList() {
  listLoading.value = true
  try {
    const data = await listUsers({ page: 1, pageSize: 5 })
    list.value = data.items
    listTotal.value = data.total
    toastInfo(`共 ${data.total} 条，已加载 ${data.items.length} 条`)
  } catch (err) {
    toastError(describeError(err))
  } finally {
    listLoading.value = false
  }
}

async function fetchAll() {
  await Promise.all([fetchUser(), fetchList()])
}

function cancel() {
  abortRef.value?.abort()
  toastInfo('已取消请求')
}

onUnmounted(() => abortRef.value?.abort())
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold text-gray-800">API 调用示例</h1>
      <p class="mt-2 text-gray-500">演示 request() 封装、错误处理、取消请求、并发调用。</p>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>getUser(id)</CardTitle>
      </CardHeader>
      <CardContent class="space-y-3">
        <div class="flex items-center gap-2">
          <Input v-model.number="userId" type="number" min="1" class="w-32" placeholder="用户 ID" />
          <Button :disabled="loading" @click="fetchUser">加载</Button>
          <Button variant="outline" :disabled="!loading" @click="cancel">取消</Button>
        </div>

        <div v-if="loading" class="text-sm text-gray-500">加载中…</div>

        <div v-else-if="user" class="rounded border bg-gray-50 p-3 text-sm">
          <p><span class="text-gray-500">ID：</span>{{ user.id }}</p>
          <p><span class="text-gray-500">姓名：</span>{{ user.name }}</p>
          <p><span class="text-gray-500">邮箱：</span>{{ user.email }}</p>
        </div>

        <div v-else class="text-sm text-gray-400">点击「加载」获取用户</div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>listUsers()</CardTitle>
      </CardHeader>
      <CardContent class="space-y-3">
        <Button variant="outline" :disabled="listLoading" @click="fetchList">
          {{ listLoading ? '加载中…' : '加载列表' }}
        </Button>
        <p v-if="listTotal" class="text-sm text-gray-500">
          总数 <Badge>{{ listTotal }}</Badge>
        </p>
        <ul v-if="list.length" class="divide-y rounded border text-sm">
          <li v-for="u in list" :key="u.id" class="flex items-center justify-between p-2">
            <span>#{{ u.id }} {{ u.name }}</span>
            <span class="text-gray-400">{{ u.email }}</span>
          </li>
        </ul>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Promise.all 并发</CardTitle>
      </CardHeader>
      <CardContent>
        <Button @click="fetchAll">同时加载用户和列表</Button>
      </CardContent>
    </Card>
  </div>
</template>
