<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { supabase } from '@/lib/supabase'

// Vedlager status
const vedlager = ref({
  hoger: {
    status: 'full' as 'tom' | 'halvfull' | 'full',
    lastUpdated: '2024-01-20 14:30',
    updatedBy: 'Magnus',
  },
  vanster: {
    status: 'halvfull' as 'tom' | 'halvfull' | 'full',
    lastUpdated: '2024-01-20 12:15',
    updatedBy: 'Anna',
  },
})

// Bastustatus
const bastu = ref({
  id: 1,
  isStarted: false,
  startTime: '',
  startedBy: '',
  temperature: 78,
  temperatureTime: '',
  temperatureBy: '',
})

// Ny temperatur input
const newTemperature = ref('')

// Ladda bastunstatus från databasen
const loadSaunaStatus = async () => {
  try {
    const { data, error } = await supabase
      .from('sauna_status')
      .select('*')
      .order('id', { ascending: false })
      .limit(1)

    if (error) {
      console.error('Error loading sauna status:', error)
      return
    }

    if (data && data.length > 0) {
      const saunaData = data[0]
      bastu.value = {
        id: saunaData.id,
        isStarted: saunaData.is_started,
        startTime: saunaData.start_time || '',
        startedBy: saunaData.started_by || '',
        temperature: saunaData.temperature || 78,
        temperatureTime: saunaData.temperature_time || '',
        temperatureBy: saunaData.temperature_by || '',
      }
    }
  } catch (error) {
    console.error('Error loading sauna status:', error)
  }
}

// Ladda data när komponenten mountas
onMounted(() => {
  loadSaunaStatus()
})

// Hjälpfunktioner för att få rätt färg och text
const getStatusColor = (status: string) => {
  switch (status) {
    case 'full':
      return 'text-green-600'
    case 'halvfull':
      return 'text-yellow-600'
    case 'tom':
      return 'text-red-600'
    default:
      return 'text-gray-600'
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'full':
      return 'Full'
    case 'halvfull':
      return 'Halvfull'
    case 'tom':
      return 'Tom'
    default:
      return 'Okänd'
  }
}

const getProgressWidth = (status: string) => {
  switch (status) {
    case 'full':
      return '100%'
    case 'halvfull':
      return '50%'
    case 'tom':
      return '0%'
    default:
      return '0%'
  }
}

const getProgressColor = (status: string) => {
  switch (status) {
    case 'full':
      return 'bg-green-500'
    case 'halvfull':
      return 'bg-yellow-500'
    case 'tom':
      return 'bg-red-500'
    default:
      return 'bg-gray-500'
  }
}

// Funktion för att uppdatera vedlår
const updateVedlar = (side: 'hoger' | 'vanster', newStatus: 'tom' | 'halvfull' | 'full') => {
  vedlager.value[side].status = newStatus
  vedlager.value[side].lastUpdated = new Date().toLocaleString('sv-SE', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
  vedlager.value[side].updatedBy = 'Du' // I en riktig app skulle detta vara inloggad användare
}

// Formatera tid för visning
const formatTime = (timestamp: string) => {
  const date = new Date(timestamp)
  const now = new Date()
  const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

  if (diffHours < 1) return 'Nyss'
  if (diffHours < 24) return `${diffHours}h sedan`
  return date.toLocaleDateString('sv-SE', { month: 'short', day: 'numeric' })
}

// Formatera tid för bastun (visa exakt klockslag)
const formatExactTime = (timestamp: string) => {
  const date = new Date(timestamp)
  return date.toLocaleString('sv-SE', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// Bastufunktioner
const startBastu = async () => {
  try {
    const now = new Date().toISOString()
    
    const { error } = await supabase
      .from('sauna_status')
      .update({
        is_started: true,
        start_time: now,
        started_by: 'Du'
      })
      .eq('id', bastu.value.id)

    if (error) {
      console.error('Error starting sauna:', error)
      return
    }

    // Uppdatera lokal state
    bastu.value.isStarted = true
    bastu.value.startTime = now
    bastu.value.startedBy = 'Du'
  } catch (error) {
    console.error('Error starting sauna:', error)
  }
}

const stopBastu = async () => {
  try {
    const { error } = await supabase
      .from('sauna_status')
      .update({
        is_started: false,
        start_time: null,
        started_by: null
      })
      .eq('id', bastu.value.id)

    if (error) {
      console.error('Error stopping sauna:', error)
      return
    }

    // Uppdatera lokal state
    bastu.value.isStarted = false
    bastu.value.startTime = ''
    bastu.value.startedBy = ''
  } catch (error) {
    console.error('Error stopping sauna:', error)
  }
}

const updateTemperature = async () => {
  if (!newTemperature.value || isNaN(Number(newTemperature.value))) return

  try {
    const now = new Date().toISOString()
    const temperature = Number(newTemperature.value)

    const { error } = await supabase
      .from('sauna_status')
      .update({
        temperature: temperature,
        temperature_time: now,
        temperature_by: 'Du'
      })
      .eq('id', bastu.value.id)

    if (error) {
      console.error('Error updating temperature:', error)
      return
    }

    // Uppdatera lokal state
    bastu.value.temperature = temperature
    bastu.value.temperatureTime = now
    bastu.value.temperatureBy = 'Du'
    newTemperature.value = ''
  } catch (error) {
    console.error('Error updating temperature:', error)
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-12">
    <div class="text-center mb-12">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">Ved och Bastu</h1>
      <p class="text-lg text-gray-600 max-w-2xl mx-auto">
        Aktuell status för vedlager, bastutemperatur och användning
      </p>
    </div>

    <div class="grid md:grid-cols-3 gap-6 mb-8">
      <!-- Vedlager Status -->
      <div class="bg-white p-6 rounded-lg shadow-sm">
        <div class="flex items-center mb-6">
          <div class="text-3xl mr-3">🪵</div>
          <h3 class="text-xl font-semibold text-gray-900">Vedlager</h3>
        </div>

        <div class="space-y-6">
          <!-- Höger vedlår -->
          <div class="border-b border-gray-100 pb-4">
            <div class="flex justify-between items-center mb-3">
              <span class="text-gray-700 font-medium">Höger vedlår</span>
              <span class="font-medium" :class="getStatusColor(vedlager.hoger.status)">
                {{ getStatusText(vedlager.hoger.status) }}
              </span>
            </div>

            <div class="w-full bg-gray-200 rounded-full h-3 mb-3">
              <div
                class="h-3 rounded-full transition-all duration-300"
                :class="getProgressColor(vedlager.hoger.status)"
                :style="{ width: getProgressWidth(vedlager.hoger.status) }"
              ></div>
            </div>

            <div class="flex justify-between items-center mb-2">
              <span class="text-xs text-gray-500">
                Uppdaterad av {{ vedlager.hoger.updatedBy }} •
                {{ formatTime(vedlager.hoger.lastUpdated) }}
              </span>
            </div>

            <div class="flex gap-2">
              <button
                @click="updateVedlar('hoger', 'tom')"
                class="flex-1 px-3 py-2 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                :class="{ 'bg-red-500 text-white': vedlager.hoger.status === 'tom' }"
              >
                Tom
              </button>
              <button
                @click="updateVedlar('hoger', 'halvfull')"
                class="flex-1 px-3 py-2 text-sm bg-yellow-100 text-yellow-700 rounded-md hover:bg-yellow-200 transition-colors"
                :class="{ 'bg-yellow-500 text-white': vedlager.hoger.status === 'halvfull' }"
              >
                Halvfull
              </button>
              <button
                @click="updateVedlar('hoger', 'full')"
                class="flex-1 px-3 py-2 text-sm bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
                :class="{ 'bg-green-500 text-white': vedlager.hoger.status === 'full' }"
              >
                Full
              </button>
            </div>
          </div>

          <!-- Vänster vedlår -->
          <div>
            <div class="flex justify-between items-center mb-3">
              <span class="text-gray-700 font-medium">Vänster vedlår</span>
              <span class="font-medium" :class="getStatusColor(vedlager.vanster.status)">
                {{ getStatusText(vedlager.vanster.status) }}
              </span>
            </div>

            <div class="w-full bg-gray-200 rounded-full h-3 mb-3">
              <div
                class="h-3 rounded-full transition-all duration-300"
                :class="getProgressColor(vedlager.vanster.status)"
                :style="{ width: getProgressWidth(vedlager.vanster.status) }"
              ></div>
            </div>

            <div class="flex justify-between items-center mb-2">
              <span class="text-xs text-gray-500">
                Uppdaterad av {{ vedlager.vanster.updatedBy }} •
                {{ formatTime(vedlager.vanster.lastUpdated) }}
              </span>
            </div>

            <div class="flex gap-2">
              <button
                @click="updateVedlar('vanster', 'tom')"
                class="flex-1 px-3 py-2 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                :class="{ 'bg-red-500 text-white': vedlager.vanster.status === 'tom' }"
              >
                Tom
              </button>
              <button
                @click="updateVedlar('vanster', 'halvfull')"
                class="flex-1 px-3 py-2 text-sm bg-yellow-100 text-yellow-700 rounded-md hover:bg-yellow-200 transition-colors"
                :class="{ 'bg-yellow-500 text-white': vedlager.vanster.status === 'halvfull' }"
              >
                Halvfull
              </button>
              <button
                @click="updateVedlar('vanster', 'full')"
                class="flex-1 px-3 py-2 text-sm bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
                :class="{ 'bg-green-500 text-white': vedlager.vanster.status === 'full' }"
              >
                Full
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Bastutemperatur -->
      <div class="bg-white p-6 rounded-lg shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center">
            <div class="text-3xl mr-3">🌡️</div>
            <h3 class="text-xl font-semibold text-gray-900">Bastu</h3>
          </div>
          <div
            class="w-3 h-3 rounded-full"
            :class="bastu.isStarted ? 'bg-green-500 animate-pulse' : 'bg-gray-400'"
          ></div>
        </div>

        <!-- Bastustatus -->
        <div class="mb-4">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium text-gray-700">Status:</span>
            <span
              class="px-2 py-1 rounded-full text-xs font-medium"
              :class="bastu.isStarted ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'"
            >
              {{ bastu.isStarted ? 'Påslagen' : 'Avslagen' }}
            </span>
          </div>

          <div v-if="bastu.isStarted" class="text-xs text-gray-500 mb-3">
            Startad {{ formatExactTime(bastu.startTime) }} av {{ bastu.startedBy }}
          </div>

          <div class="flex gap-2">
            <button
              @click="startBastu"
              :disabled="bastu.isStarted"
              class="flex-1 px-3 py-2 text-sm bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              :class="{ 'bg-green-500 text-white': bastu.isStarted }"
            >
              Tänd bastu
            </button>
            <button
              @click="stopBastu"
              :disabled="!bastu.isStarted"
              class="flex-1 px-3 py-2 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Släck bastu
            </button>
          </div>
        </div>

        <!-- Temperatur -->
        <div class="border-t border-gray-200 pt-4">
          <div class="text-center mb-4">
            <div class="text-3xl font-bold text-gray-900 mb-1">{{ bastu.temperature }}°C</div>
            <div class="text-xs text-gray-500">
              Registrerad {{ formatExactTime(bastu.temperatureTime) }} av {{ bastu.temperatureBy }}
            </div>
          </div>

          <!-- Temperatur input -->
          <div class="flex gap-2">
            <input
              v-model="newTemperature"
              type="number"
              placeholder="Ange temp"
              class="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              max="120"
            />
            <button
              @click="updateTemperature"
              :disabled="!newTemperature || isNaN(Number(newTemperature))"
              class="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Uppdatera
            </button>
          </div>
        </div>
      </div>

      <!-- Bastustatus -->
      <div class="bg-white p-6 rounded-lg shadow-sm">
        <div class="flex items-center mb-4">
          <div class="text-3xl mr-3">🧖‍♂️</div>
          <h3 class="text-xl font-semibold text-gray-900">Bastustatus</h3>
        </div>

        <div class="space-y-4">
          <div class="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div class="flex items-center">
              <div class="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <span class="font-medium text-gray-900">Anna</span>
            </div>
            <span class="text-sm text-gray-600">Sedan 19:15</span>
          </div>

          <div class="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div class="flex items-center">
              <div class="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
              <span class="font-medium text-gray-900">Erik</span>
            </div>
            <span class="text-sm text-gray-600">Sedan 19:20</span>
          </div>

          <div class="text-center text-sm text-gray-600">2 personer i bastun</div>
        </div>

        <button
          class="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Checka in/ut
        </button>
      </div>
    </div>

    <!-- Senaste aktivitet -->
    <div class="bg-white p-6 rounded-lg shadow-sm">
      <h3 class="text-xl font-semibold text-gray-900 mb-4">Senaste aktivitet</h3>

      <div class="space-y-3">
        <div class="flex items-center justify-between py-2 border-b border-gray-100">
          <div class="flex items-center">
            <div class="text-lg mr-3">🧖‍♂️</div>
            <span class="text-gray-700">Anna checkade in i bastun</span>
          </div>
          <span class="text-sm text-gray-500">19:15</span>
        </div>

        <div class="flex items-center justify-between py-2 border-b border-gray-100">
          <div class="flex items-center">
            <div class="text-lg mr-3">🧖‍♂️</div>
            <span class="text-gray-700">Erik checkade in i bastun</span>
          </div>
          <span class="text-sm text-gray-500">19:20</span>
        </div>

        <div class="flex items-center justify-between py-2 border-b border-gray-100">
          <div class="flex items-center">
            <div class="text-lg mr-3">🪵</div>
            <span class="text-gray-700">Vedlager uppdaterat av Magnus</span>
          </div>
          <span class="text-sm text-gray-500">14:30</span>
        </div>

        <div class="flex items-center justify-between py-2 border-b border-gray-100">
          <div class="flex items-center">
            <div class="text-lg mr-3">🌡️</div>
            <span class="text-gray-700">Bastu påslagen - uppvärmning startad</span>
          </div>
          <span class="text-sm text-gray-500">18:45</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Using Tailwind classes only */
</style>
