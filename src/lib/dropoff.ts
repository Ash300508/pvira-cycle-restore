import { supabase } from "@/integrations/supabase/client";
import type { Centre } from "@/lib/queries";

export type CreateDropOffInput = {
  userId: string;
  centre: Centre;
  material: string;
  confidence?: number | null;
  risk?: string | null;
  idolType?: string | null;
  quantity?: number;
  notes?: string | null;
};

/** Registers a drop-off and returns the generated reference row. */
export async function createDropOff(input: CreateDropOffInput) {
  const { data, error } = await supabase
    .from("drop_off_records")
    .insert({
      user_id: input.userId,
      centre_id: input.centre.id,
      detected_material: input.material,
      confidence: input.confidence ?? null,
      environmental_risk: input.risk ?? null,
      idol_type: input.idolType ?? null,
      quantity: input.quantity ?? 1,
      notes: input.notes ?? null,
      status: "Drop-Off Registered",
    })
    .select("id, reference_id, status, centre_id, detected_material, created_at")
    .single();
  if (error) throw error;

  await supabase.from("notifications").insert({
    user_id: input.userId,
    title: "Drop-off registered",
    body: `Reference ${data.reference_id} — take your idol to ${input.centre.name}, ${input.centre.city}. Show the QR code at the counter.`,
    kind: "success",
  });

  return data;
}

export async function updateRecordStatus(id: string, status: string) {
  const { error } = await supabase
    .from("drop_off_records")
    .update({ status, ...(status === "Completed" ? { completed_at: new Date().toISOString() } : {}) })
    .eq("id", id);
  if (error) throw error;
}

export async function cancelRecord(id: string) {
  return updateRecordStatus(id, "Cancelled");
}
