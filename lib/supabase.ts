import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// เราจะไม่ throw Error ที่นี่ เพราะจะทำให้ Build พัง
// แต่จะเช็คตอนสร้าง Client แทน
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', // ใส่ URL หลอกไว้ให้ Build ผ่าน
  supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6dmtmZHV4d2FsaGlpZnhubHl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzOTQ1MjAsImV4cCI6MjA4Njk3MDUyMH0.FN3-wMYxkiULlCE_FMsf_gkqHBHHAQeh6whCKTmi3IA'
)