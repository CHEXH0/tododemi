// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://edmekawuejasnnreiwkw.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkbWVrYXd1ZWphc25ucmVpd2t3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2Mzk3MTUsImV4cCI6MjA1MDIxNTcxNX0.XsN81Ef_ZT8ihgltFYnjymOdu0HpI7H8dt6nS7JlHfk";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);