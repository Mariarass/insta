import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gpzjliipmmodhjufbiua.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwempsaWlwbW1vZGhqdWZiaXVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg0MzU1OTIsImV4cCI6MTk5NDAxMTU5Mn0.fFF-0IA6R5uECD7Rb4xBq46PDdomr_fp3sLZy67AaBk'
export const supabase = createClient(supabaseUrl, supabaseKey)