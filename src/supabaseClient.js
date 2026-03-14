import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://hawjjiyerfdxzbinjrgj.supabase.co"
const supabaseKey = "YOUR_PUBLIC_ANON_KEYeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhhd2pqaXllcmZkeHpiaW5qcmdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1MDMxNzQsImV4cCI6MjA4OTA3OTE3NH0.XLa6YdgF-CJ_5w0pGHq7Pvv6PQhrjOSK0dH-g-hwG5U"

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)