import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL || 'https://ntnitsabgwdgtbgfajgc.supabase.co').trim();
const SUPABASE_ANON_KEY = (import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_PXnCIHYyRX3MgNllf-5GwA_XuS1dq05').trim();

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const supabaseConfig = {
  url: SUPABASE_URL,
  anonKey: SUPABASE_ANON_KEY,
  isUsingFallback: !import.meta.env.VITE_SUPABASE_URL,
  projectRef: (() => {
    try {
      const hostname = new URL(SUPABASE_URL).hostname;
      return hostname.split('.')[0];
    } catch {
      return 'your-supabase-project';
    }
  })()
};

export interface Appointment {
  id?: string;
  name: string;
  phone: string;
  service: string;
  date: string;
  slot: string;
  message?: string;
  created_at?: string;
}

/**
 * Saves a new appointment to the Supabase database.
 * Attempts to insert into the 'appointments' table.
 */
export async function saveAppointment(appointment: Appointment) {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .insert([
        {
          name: appointment.name,
          phone: appointment.phone,
          service: appointment.service,
          date: appointment.date,
          slot: appointment.slot,
          message: appointment.message || '',
        }
      ])
      .select();

    return { data, error };
  } catch (err: any) {
    return { data: null, error: err };
  }
}
