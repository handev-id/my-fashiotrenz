import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import withAuth from "./middlewares/withAuth";

export function mainMiddleware(req: NextRequest) {
  const response = NextResponse.next();
  return response;
}

export default withAuth(mainMiddleware, [
  "/dashboard",
  "/dashboard/products",
  "/dashboard/upload",
  "/dashboard/orders",
]);
