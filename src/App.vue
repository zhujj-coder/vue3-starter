<script setup lang="ts">
import ErrorBoundary from '@/components/ErrorBoundary.vue'
</script>

<template>
  <ErrorBoundary>
    <div class="min-h-screen bg-gray-50">
      <nav class="flex items-center gap-4 border-b bg-white px-6 py-3 shadow-sm">
        <router-link to="/" class="font-semibold text-blue-600 hover:text-blue-800"
          >Home</router-link
        >
        <router-link to="/about" class="font-semibold text-blue-600 hover:text-blue-800"
          >About</router-link
        >
      </nav>
      <main class="mx-auto max-w-4xl p-6">
        <router-view />
      </main>
    </div>
  </ErrorBoundary>
</template>
