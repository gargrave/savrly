import { NextRequest, NextResponse } from "next/server";

import { supabase } from "@/lib/supabaseClient";

interface Params {
  params: {
    id: string;
  };
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const { id } = params;
  const json = await request.json();

  const { data, error } = await supabase
    .from("bookmarks")
    .update(json)
    .eq("id", id)
    .select();

  return error
    ? NextResponse.json({ error }, { status: 400 })
    : NextResponse.json({ bookmark: data[0] });
}
