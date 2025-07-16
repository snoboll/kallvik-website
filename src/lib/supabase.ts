import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      bookings: {
        Row: {
          id: number
          week_start: string
          monday: boolean
          tuesday: boolean
          wednesday: boolean
          thursday: boolean
          friday: boolean
          saturday: boolean
          sunday: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          week_start: string
          monday?: boolean
          tuesday?: boolean
          wednesday?: boolean
          thursday?: boolean
          friday?: boolean
          saturday?: boolean
          sunday?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          week_start?: string
          monday?: boolean
          tuesday?: boolean
          wednesday?: boolean
          thursday?: boolean
          friday?: boolean
          saturday?: boolean
          sunday?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
