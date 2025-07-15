<script setup lang="ts">
// Clean and simple - no JavaScript needed for this static design
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header with Navigation -->
    <header class="bg-white shadow-sm">
      <div class="max-w-4xl mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <h1 class="text-3xl font-bold text-gray-900">Kallvik</h1>
          <nav class="flex space-x-8">
            <a href="#hem" class="text-gray-600 hover:text-gray-900 transition-colors">Hem</a>
            <a href="#boka" class="text-gray-600 hover:text-gray-900 transition-colors"
              >Boka stuga</a
            >
            <a href="#ved" class="text-gray-600 hover:text-gray-900 transition-colors"
              >Ved och bastu</a
            >
            <a href="#kalender" class="text-gray-600 hover:text-gray-900 transition-colors"
              >Kalender</a
            >
          </nav>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto px-4 py-12">
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
          <p class="text-gray-600">
            Alla bekvämligheter för en avkopplande och minnesrik semester.
          </p>
        </div>
      </section>
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
/* No custom CSS - using only Tailwind classes */
</style>
