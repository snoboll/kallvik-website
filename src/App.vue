<script setup lang="ts">
import { ref } from 'vue'
import BookingPage from './components/BookingPage.vue'

const currentView = ref('home')

function navigateTo(view: string) {
  currentView.value = view
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header with Navigation -->
    <header class="bg-white shadow-sm">
      <div class="max-w-4xl mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <h1 class="text-3xl font-bold text-gray-900 cursor-pointer" @click="navigateTo('home')">
            Kallvik
          </h1>
          <nav class="flex space-x-8">
            <button
              @click="navigateTo('home')"
              :class="
                currentView === 'home'
                  ? 'text-blue-600 font-medium'
                  : 'text-gray-600 hover:text-gray-900'
              "
              class="transition-colors"
            >
              Hem
            </button>
            <button
              @click="navigateTo('boka')"
              :class="
                currentView === 'boka'
                  ? 'text-blue-600 font-medium'
                  : 'text-gray-600 hover:text-gray-900'
              "
              class="transition-colors"
            >
              Boka stuga
            </button>
            <button
              @click="navigateTo('ved')"
              :class="
                currentView === 'ved'
                  ? 'text-blue-600 font-medium'
                  : 'text-gray-600 hover:text-gray-900'
              "
              class="transition-colors"
            >
              Ved och bastu
            </button>
            <button
              @click="navigateTo('kalender')"
              :class="
                currentView === 'kalender'
                  ? 'text-blue-600 font-medium'
                  : 'text-gray-600 hover:text-gray-900'
              "
              class="transition-colors"
            >
              Kalender
            </button>
          </nav>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main>
      <!-- Home Page -->
      <div v-if="currentView === 'home'" class="max-w-4xl mx-auto px-4 py-12">
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

        <!-- Quick Action -->
        <section class="text-center">
          <button
            @click="navigateTo('boka')"
            class="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Boka din vistelse
          </button>
        </section>
      </div>

      <!-- Booking Page -->
      <BookingPage v-if="currentView === 'boka'" />

      <!-- Placeholder for other pages -->
      <div v-if="currentView === 'ved'" class="max-w-4xl mx-auto px-4 py-12">
        <div class="bg-white rounded-lg shadow-sm p-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-4">Ved och Bastu</h1>
          <p class="text-gray-600">Denna sida är under utveckling...</p>
        </div>
      </div>

      <div v-if="currentView === 'kalender'" class="max-w-4xl mx-auto px-4 py-12">
        <div class="bg-white rounded-lg shadow-sm p-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-4">Kalender</h1>
          <p class="text-gray-600">Denna sida är under utveckling...</p>
        </div>
      </div>
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
