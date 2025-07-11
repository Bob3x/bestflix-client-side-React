import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://paidchtphacjtymynnqj.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhaWRjaHRwaGFjanR5bXlubnFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyMzk2MjUsImV4cCI6MjA2NzgxNTYyNX0.Q6JC1wC_8LAimhsoYELKIOrpmkowh3kq9n8GJ5w6GAw";

export const supabase = createClient(supabaseUrl, supabaseKey);
