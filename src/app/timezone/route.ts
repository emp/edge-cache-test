import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge"; // 'nodejs' is the default

export function GET(request: NextRequest) {
  const timezone = request.nextUrl.searchParams.get("key");
  revalidateTag(`timezone-${timezone}`);

  return NextResponse.json({
    revalidated: true,
    message: `Edge function ran for '${timezone}'`,
  });
}
