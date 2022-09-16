import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, res: NextResponse) {
  //console.log("middleware");
  const response = NextResponse.next();
  //response.headers.append("Cross-Origin-Embedder-Policy", "require-corp");
  //response.headers.append("Cross-Origin-Opener-Policy", "same-origin");
  return response;
}
