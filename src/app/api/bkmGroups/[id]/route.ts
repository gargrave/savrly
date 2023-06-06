import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabaseClient";

interface Params {
  params: {
    id: string;
  };
}

export async function DELETE(request: Request, { params }: Params) {
  const { id } = params;

  const { data, error } = await supabase
    .from("bkmGroups")
    .delete()
    .eq("id", id)
    .select();

  // status 204
  return error
    ? NextResponse.json({ error }, { status: 400 })
    : NextResponse.json({ bkmGroup: data[0] });
}
