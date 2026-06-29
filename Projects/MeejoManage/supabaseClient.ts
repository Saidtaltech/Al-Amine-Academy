
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rhvksuzfnucphxcfrrye.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJodmtzdXpmbnVjcGh4Y2ZycnllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwMTQ1OTksImV4cCI6MjA4MTU5MDU5OX0.aXbXAuQFWTx65La91HfOHuo7CUhVMadam3NoCgRBen0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
