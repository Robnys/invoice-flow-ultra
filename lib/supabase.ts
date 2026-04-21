import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      invoices: {
        Row: {
          id: string
          client_name: string
          client_email: string
          amount: number
          due_date: string
          status: 'pending' | 'paid' | 'overdue'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          client_name: string
          client_email: string
          amount: number
          due_date: string
          status?: 'pending' | 'paid' | 'overdue'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          client_name?: string
          client_email?: string
          amount?: number
          due_date?: string
          status?: 'pending' | 'paid' | 'overdue'
          updated_at?: string
        }
      }
    }
  }
}
