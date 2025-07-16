<script setup lang="ts">
import { onMounted } from 'vue'
import { useBookingStore } from '@/stores/booking'

const bookingStore = useBookingStore()

onMounted(() => {
  bookingStore.loadWeeklyBooking()
})

const days = [
  { key: 'monday', label: 'Måndag', abbr: 'Mån' },
  { key: 'tuesday', label: 'Tisdag', abbr: 'Tis' },
  { key: 'wednesday', label: 'Onsdag', abbr: 'Ons' },
  { key: 'thursday', label: 'Torsdag', abbr: 'Tor' },
  { key: 'friday', label: 'Fredag', abbr: 'Fre' },
  { key: 'saturday', label: 'Lördag', abbr: 'Lör' },
  { key: 'sunday', label: 'Söndag', abbr: 'Sön' },
] as const

async function handleSave() {
  await bookingStore.saveWeeklyBooking()
  if (!bookingStore.error) {
    alert('Bokning sparad!')
  }
}

function handleReset() {
  bookingStore.resetWeek()
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <div class="bg-white rounded-lg shadow-sm p-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Boka Stuga</h1>

      <!-- Week Display -->
      <div class="mb-8">
        <h2 class="text-lg font-semibold text-gray-700 mb-4">
          Vecka som börjar: {{ bookingStore.currentWeek.week_start }}
        </h2>
      </div>

      <!-- Loading State -->
      <div v-if="bookingStore.isLoading" class="text-center py-8">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p class="mt-2 text-gray-600">Laddar...</p>
      </div>

      <!-- Error State -->
      <div v-if="bookingStore.error" class="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">Error</h3>
            <p class="mt-1 text-sm text-red-700">{{ bookingStore.error }}</p>
          </div>
        </div>
      </div>

      <!-- Days Selection -->
      <div v-if="!bookingStore.isLoading" class="mb-8">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Välj dagar:</h3>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-4">
          <div v-for="day in days" :key="day.key" class="relative">
            <input
              :id="day.key"
              type="checkbox"
              :checked="bookingStore.currentWeek[day.key]"
              @change="bookingStore.toggleDay(day.key)"
              class="sr-only peer"
            />
            <label
              :for="day.key"
              class="flex flex-col items-center justify-center p-4 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 peer-checked:bg-blue-50 peer-checked:border-blue-300 peer-checked:ring-2 peer-checked:ring-blue-200 transition-all"
            >
              <div class="text-sm font-medium text-gray-900 mb-1">
                {{ day.abbr }}
              </div>
              <div class="text-xs text-gray-600">
                {{ day.label }}
              </div>
              <div class="mt-2">
                <div
                  class="w-4 h-4 rounded-full border-2 transition-colors"
                  :class="
                    bookingStore.currentWeek[day.key]
                      ? 'bg-blue-600 border-blue-600'
                      : 'border-gray-300'
                  "
                >
                  <svg
                    v-if="bookingStore.currentWeek[day.key]"
                    class="w-full h-full text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>

      <!-- Selected Days Summary -->
      <div v-if="bookingStore.selectedDays.length > 0" class="mb-8">
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Valda dagar:</h3>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="day in bookingStore.selectedDays"
            :key="day"
            class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
          >
            {{ day }}
          </span>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
        <button
          @click="handleSave"
          :disabled="bookingStore.isLoading"
          class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {{ bookingStore.isLoading ? 'Sparar...' : 'Spara Bokning' }}
        </button>

        <button
          @click="handleReset"
          :disabled="bookingStore.isLoading"
          class="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
        >
          Rensa Allt
        </button>
      </div>

      <!-- Debug Info (remove in production) -->
      <div v-if="false" class="mt-8 p-4 bg-gray-100 rounded-lg">
        <h4 class="font-semibold mb-2">Debug Info:</h4>
        <pre class="text-sm text-gray-600">{{
          JSON.stringify(bookingStore.currentWeek, null, 2)
        }}</pre>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Additional styles if needed */
</style>
