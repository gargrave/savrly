import { supabase } from "@/lib/supabaseClient";

export async function fetchAll<T>(db: string): Promise<T[]> {
  const result = await supabase.from(db).select();
  return result.data as T[];
}
