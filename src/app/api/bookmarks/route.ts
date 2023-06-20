import * as cheerio from "cheerio";
import { NextResponse } from "next/server";

import type {
  BookmarkFields,
  BookmarkPostData,
} from "@/app/bookmarks/bookmarks.types";
import { supabase } from "@/lib/supabaseClient";

const TABLE = "bookmarks";

export async function GET() {
  const { data, error } = await supabase.from(TABLE).select();

  return error
    ? NextResponse.json({ error }, { status: 400 })
    : NextResponse.json({ bookmarks: data });
}

export async function POST(request: Request) {
  const json = await request.json();

  const bkm: BookmarkPostData = json || {};
  const { url = "" } = bkm;

  // load the page into Cheerio
  const res = await fetch(url);
  const body = await res.text();
  const $ = cheerio.load(body);

  // read <title> element
  let title = "[Untitled]";
  try {
    title = $("head").find("title").text();
  } catch (err) {
    // error handled in UI
  }

  // try to read meta "description" tag, if it exists
  let description = null;
  try {
    description =
      $('[name="description"]').attr("content") ||
      $('[name="Description"]').attr("content") ||
      $('[name="twitter:description"]').attr("content") ||
      null;
  } catch (err) {
    // error handled in UI
  }

  const bookmark: BookmarkFields = {
    description,
    groupId: null,
    title,
    url,
  };

  const { data, error } = await supabase.from(TABLE).insert(bookmark).select();

  return error
    ? NextResponse.json({ error }, { status: 400 })
    : NextResponse.json({ bookmark: data[0] });
}
