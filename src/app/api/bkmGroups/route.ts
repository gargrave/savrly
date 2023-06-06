import { NextResponse } from "next/server";

import type { BkmGroupPostData } from "@/app/bookmarks/bookmarks.types";
import { supabase } from "@/lib/supabaseClient";

export async function POST(request: Request) {
  const json = await request.json();
  const postData: BkmGroupPostData = json || {};
  const { name = "" } = postData;

  const bkmGroup: BkmGroupPostData = {
    name,
  };

  const { data, error } = await supabase
    .from("bkmGroups")
    .insert(bkmGroup)
    .select();

  return error
    ? NextResponse.json({ error }, { status: 400 })
    : NextResponse.json({ bkmGroup: data[0] });
}
