import { supabase } from "@/integrations/supabase/client";

export type Centre = {
  id: string;
  name: string;
  address: string;
  city: string;
  pincode: string;
  latitude: number | null;
  longitude: number | null;
  opening_hours: string;
  accepted_materials: string[];
  facilities: string[];
  instructions: string | null;
  contact_phone: string | null;
  contact_email: string | null;
  capacity: number;
  current_load: number;
  status: string;
};

export type DropOffRecord = {
  id: string;
  reference_id: string;
  user_id: string;
  centre_id: string | null;
  idol_type: string | null;
  detected_material: string;
  confidence: number | null;
  environmental_risk: string | null;
  quantity: number;
  status: string;
  notes: string | null;
  created_at: string;
  completed_at: string | null;
  drop_off_centres?: Pick<Centre, "id" | "name" | "city" | "address" | "opening_hours"> | null;
};

const CENTRE_COLUMNS =
  "id, name, address, city, pincode, latitude, longitude, opening_hours, accepted_materials, facilities, instructions, contact_phone, contact_email, capacity, current_load, status";

export const centresQuery = () => ({
  queryKey: ["centres"],
  queryFn: async (): Promise<Centre[]> => {
    const { data, error } = await supabase.from("drop_off_centres").select(CENTRE_COLUMNS).order("name");
    if (error) throw error;
    return (data ?? []) as Centre[];
  },
});

export const centreQuery = (id: string) => ({
  queryKey: ["centre", id],
  queryFn: async (): Promise<Centre | null> => {
    const { data, error } = await supabase.from("drop_off_centres").select(CENTRE_COLUMNS).eq("id", id).maybeSingle();
    if (error) throw error;
    return (data as Centre) ?? null;
  },
});

export const impactQuery = () => ({
  queryKey: ["impact"],
  queryFn: async () => {
    const { data, error } = await supabase.from("impact_metrics").select("metric_name, metric_value, unit, is_demo");
    if (error) throw error;
    return data ?? [];
  },
});

const RECORD_COLUMNS =
  "id, reference_id, user_id, centre_id, idol_type, detected_material, confidence, environmental_risk, quantity, status, notes, created_at, completed_at, drop_off_centres(id, name, city, address, opening_hours)";

export const myRecordsQuery = (userId: string | undefined) => ({
  queryKey: ["my-records", userId],
  enabled: Boolean(userId),
  queryFn: async (): Promise<DropOffRecord[]> => {
    const { data, error } = await supabase
      .from("drop_off_records")
      .select(RECORD_COLUMNS)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data ?? []) as DropOffRecord[];
  },
});

export const allRecordsQuery = () => ({
  queryKey: ["all-records"],
  queryFn: async (): Promise<DropOffRecord[]> => {
    const { data, error } = await supabase
      .from("drop_off_records")
      .select(RECORD_COLUMNS)
      .order("created_at", { ascending: false })
      .limit(500);
    if (error) throw error;
    return (data ?? []) as DropOffRecord[];
  },
});

export const recordByReferenceQuery = (reference: string) => ({
  queryKey: ["record", reference],
  enabled: reference.trim().length > 3,
  queryFn: async (): Promise<DropOffRecord | null> => {
    const { data, error } = await supabase
      .from("drop_off_records")
      .select(RECORD_COLUMNS)
      .eq("reference_id", reference.trim().toUpperCase())
      .maybeSingle();
    if (error) throw error;
    return (data as DropOffRecord) ?? null;
  },
});

export const notificationsQuery = (userId: string | undefined) => ({
  queryKey: ["notifications", userId],
  enabled: Boolean(userId),
  queryFn: async () => {
    const { data, error } = await supabase
      .from("notifications")
      .select("id, title, body, kind, read, created_at")
      .order("created_at", { ascending: false })
      .limit(30);
    if (error) throw error;
    return data ?? [];
  },
});

export const ecoPointsQuery = (userId: string | undefined) => ({
  queryKey: ["eco-points", userId],
  enabled: Boolean(userId),
  queryFn: async () => {
    const { data, error } = await supabase
      .from("eco_points")
      .select("id, points, reason, created_at")
      .order("created_at", { ascending: false })
      .limit(50);
    if (error) throw error;
    return data ?? [];
  },
});

export const recoveryQuery = (dropOffId: string | undefined) => ({
  queryKey: ["recovery", dropOffId],
  enabled: Boolean(dropOffId),
  queryFn: async () => {
    const { data, error } = await supabase
      .from("recovery_records")
      .select("id, material, quantity, recovery_method, status, recovery_date")
      .eq("drop_off_id", dropOffId!)
      .order("created_at");
    if (error) throw error;
    return data ?? [];
  },
});

export async function notify(userId: string, title: string, body: string, kind = "info") {
  await supabase.from("notifications").insert({ user_id: userId, title, body, kind });
}
