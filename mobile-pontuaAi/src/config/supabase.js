import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_KEY } from './constants';

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabaseClient;
