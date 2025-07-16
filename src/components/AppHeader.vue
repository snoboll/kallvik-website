<script setup lang="ts">
// No props needed for this simple header
</script>

<template>
  <header class="bg-white shadow-sm">
    <div class="max-w-4xl mx-auto px-4 py-6">
      <div class="flex items-center justify-between">
        <router-link
          to="/"
          class="text-3xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
        >
          Kallvik
        </router-link>
        <nav class="flex space-x-8">
          <router-link
            to="/"
            class="text-gray-600 hover:text-gray-900 transition-colors"
            active-class="text-blue-600 font-medium"
          >
            Hem
          </router-link>
          <router-link
            to="/boka-stuga"
            class="text-gray-600 hover:text-gray-900 transition-colors"
            active-class="text-blue-600 font-medium"
          >
            Boka stuga
          </router-link>
          <router-link
            to="/bada-bastu"
            class="text-gray-600 hover:text-gray-900 transition-colors"
            active-class="text-blue-600 font-medium"
          >
            Ved och bastu
          </router-link>
          <router-link
            to="/kalender"
            class="text-gray-600 hover:text-gray-900 transition-colors"
            active-class="text-blue-600 font-medium"
          >
            Kalender
          </router-link>
        </nav>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* Using Tailwind classes only */
</style>
