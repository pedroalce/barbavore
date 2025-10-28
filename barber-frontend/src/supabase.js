import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vpwgydisyudoogdobddz.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwd2d5ZGlzeXVkb29nZG9iZGR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyNTk1MzYsImV4cCI6MjA3NDgzNTUzNn0.tRyXjp-AKBwHbIBXIn44dZ0CmAeYpTa9ZziJ2OEthN8";

export const supabase = createClient(supabaseUrl, supabaseKey);