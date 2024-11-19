import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token");
    console.log("Token:", token);
    if (!token) {
        console.log("Redirecting to login");
        return NextResponse.redirect(new URL("/auth/signin", request.url));
    }

    console.log("Token found");
    return NextResponse.next();
}

export const config = {
    matcher: ['/doctors']
};
