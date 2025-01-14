import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ncnxkdpfljidgbixmfwg.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5jbnhrZHBmbGppZGdiaXhtZndnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4NDg5NDIsImV4cCI6MjA1MjQyNDk0Mn0.FIg3AkU-9Axm0RYMSuG9ddO1ciBjMcVgSrbIt-Z6SZU";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);