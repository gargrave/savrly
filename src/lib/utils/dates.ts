import dfFormat from "date-fns/format/index.js";
import dfParseIso from "date-fns/parseISO/index.js";

export const Format = {
  ApiTimestamp: "yyyy-MM-dd HH:mm:ss.SSSSSS+00",
  Readable: "MMM dd, yyyy",
  ReadableWithTime: "MMM dd, yyyy h:mm aaa",
};

export function format(dt: string, formatter = Format.Readable): string {
  const date = dfParseIso(dt);
  return dfFormat(date, formatter);
}
