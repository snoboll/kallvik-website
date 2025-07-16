import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabase'

export interface WeeklyBooking {
  id?: number
  week_start: string
  monday: boolean
  tuesday: boolean
  wednesday: boolean
  thursday: boolean
  friday: boolean
  saturday: boolean
  sunday: boolean
  created_at?: string
  updated_at?: string
}

export const useBookingStore = defineStore('booking', () => {
  // State
  const currentWeek = ref<WeeklyBooking>({
    week_start: getCurrentWeekStart(),
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  })

  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Computed
  const selectedDays = computed(() => {
    const days = []
    if (currentWeek.value.monday) days.push('Måndag')
    if (currentWeek.value.tuesday) days.push('Tisdag')
    if (currentWeek.value.wednesday) days.push('Onsdag')
    if (currentWeek.value.thursday) days.push('Torsdag')
    if (currentWeek.value.friday) days.push('Fredag')
    if (currentWeek.value.saturday) days.push('Lördag')
    if (currentWeek.value.sunday) days.push('Söndag')
    return days
  })

  // Helper function to get current week start
  function getCurrentWeekStart(): string {
    const now = new Date()
    const monday = new Date(now.setDate(now.getDate() - now.getDay() + 1))
    return monday.toISOString().split('T')[0]
  }

  // Actions
  async function loadWeeklyBooking(weekStart?: string) {
    isLoading.value = true
    error.value = null

    const targetWeek = weekStart || getCurrentWeekStart()

    try {
      const { data, error: supabaseError } = await supabase
        .from('bookings')
        .select('*')
        .eq('week_start', targetWeek)
        .single()

      if (supabaseError && supabaseError.code !== 'PGRST116') {
        throw supabaseError
      }

      if (data) {
        currentWeek.value = data
      } else {
        // If no data found, create a new week entry
        currentWeek.value = {
          week_start: targetWeek,
          monday: false,
          tuesday: false,
          wednesday: false,
          thursday: false,
          friday: false,
          saturday: false,
          sunday: false,
        }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load booking data'
      console.error('Error loading booking:', err)
    } finally {
      isLoading.value = false
    }
  }

  async function saveWeeklyBooking() {
    isLoading.value = true
    error.value = null

    try {
      const bookingData = {
        week_start: currentWeek.value.week_start,
        monday: currentWeek.value.monday,
        tuesday: currentWeek.value.tuesday,
        wednesday: currentWeek.value.wednesday,
        thursday: currentWeek.value.thursday,
        friday: currentWeek.value.friday,
        saturday: currentWeek.value.saturday,
        sunday: currentWeek.value.sunday,
        updated_at: new Date().toISOString(),
      }

      if (currentWeek.value.id) {
        // Update existing booking
        const { data, error: supabaseError } = await supabase
          .from('bookings')
          .update(bookingData)
          .eq('id', currentWeek.value.id)
          .select()
          .single()

        if (supabaseError) throw supabaseError
        if (data) currentWeek.value = data
      } else {
        // Insert new booking
        const { data, error: supabaseError } = await supabase
          .from('bookings')
          .insert({
            ...bookingData,
            created_at: new Date().toISOString(),
          })
          .select()
          .single()

        if (supabaseError) throw supabaseError
        if (data) currentWeek.value = data
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to save booking data'
      console.error('Error saving booking:', err)
    } finally {
      isLoading.value = false
    }
  }

  function toggleDay(
    day: keyof Omit<WeeklyBooking, 'id' | 'week_start' | 'created_at' | 'updated_at'>,
  ) {
    currentWeek.value[day] = !currentWeek.value[day]
  }

  function resetWeek() {
    currentWeek.value = {
      ...currentWeek.value,
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    }
  }

  return {
    // State
    currentWeek,
    isLoading,
    error,

    // Computed
    selectedDays,

    // Actions
    loadWeeklyBooking,
    saveWeeklyBooking,
    toggleDay,
    resetWeek,
  }
})
