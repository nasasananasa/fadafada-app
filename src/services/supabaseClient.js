import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://uxakyqwjdexobfxkwnev.supabase.co"; // ✅ رابط مشروعك
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4YWt5cXdqZGV4b2JmeGt3bmV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzMDEzNTUsImV4cCI6MjA1OTg3NzM1NX0.JxKaP0gLXIWjs6_omxRUrjRzwRxyBKm2wQxfwSjx4pc";

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true, // ✅ ضروري لتفعيل التقاط التوكن من عنوان URL
  },
});
