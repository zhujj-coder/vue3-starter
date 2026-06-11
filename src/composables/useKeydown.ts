import { onMounted, onUnmounted } from 'vue'

type Handler = (event: KeyboardEvent) => void

export function useKeydown(key: string | string[], handler: Handler) {
  const keys = Array.isArray(key) ? key : [key]

  function onKeydown(e: KeyboardEvent) {
    if (keys.includes(e.key)) handler(e)
  }

  onMounted(() => window.addEventListener('keydown', onKeydown))
  onUnmounted(() => window.removeEventListener('keydown', onKeydown))
}
