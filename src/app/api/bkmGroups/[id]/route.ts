import { NextRequest, NextResponse } from "next/server";

import { supabase } from "@/lib/supabaseClient";

const TABLE = "bkmGroups";

interface Params {
  params: {
    id: string;
  };
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const { id } = params;
  const json = await request.json();

  const { data, error } = await supabase
    .from(TABLE)
    .update(json)
    .eq("id", id)
    .select();

  return error
    ? NextResponse.json({ error }, { status: 400 })
    : NextResponse.json({ bkmGroup: data[0] });
}

export async function DELETE(request: Request, { params }: Params) {
  const { id } = params;

  const { data, error } = await supabase
    .from(TABLE)
    .delete()
    .eq("id", id)
    .select();

  // status 204
  return error
    ? NextResponse.json({ error }, { status: 400 })
    : NextResponse.json({ bkmGroup: data[0] });
}
