<script setup lang="ts">
// Simple home page component
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-12">
    <!-- Hero Section -->
    <section class="text-center mb-16">
      <h2 class="text-4xl font-bold text-gray-900 mb-4">Välkommen till Kallvik</h2>
      <p class="text-xl text-gray-600 max-w-2xl mx-auto">
        Ett mysigt sommarhus beläget vid den vackra svenska kusten. Perfekt för avkoppling och
        minnen som varar livet ut.
      </p>
    </section>

    <!-- Features Grid -->
    <section class="grid md:grid-cols-3 gap-8 mb-16">
      <div class="bg-white p-6 rounded-lg shadow-sm">
        <div class="text-3xl mb-4">🌊</div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">Havsnära</h3>
        <p class="text-gray-600">
          Bara några minuters promenad till stranden och det kristallklara vattnet.
        </p>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm">
        <div class="text-3xl mb-4">🌲</div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">Naturens mitt</h3>
        <p class="text-gray-600">Omgivet av vacker skog och skärgårdsmiljö för naturälskare.</p>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm">
        <div class="text-3xl mb-4">🏡</div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">Mysigt hem</h3>
        <p class="text-gray-600">Alla bekvämligheter för en avkopplande och minnesrik semester.</p>
      </div>
    </section>

    <!-- Quick Action -->
    <section class="text-center">
      <router-link
        to="/boka-stuga"
        class="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
      >
        Boka din vistelse
      </router-link>
    </section>
  </div>
</template>

<style scoped>
/* Using Tailwind classes only */
</style>
