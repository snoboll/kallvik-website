<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <AppHeader />

    <!-- Main Content -->
    <main>
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-8 mt-16">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <h3 class="text-lg font-semibold mb-2">Kallvik</h3>
        <p class="text-gray-400">© 2024 Kallvik. Ett perfekt sommarhus vid havet.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Using Tailwind classes only */
</style>
