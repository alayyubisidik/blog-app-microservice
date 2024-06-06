import axios from "axios";
import { NextResponse } from "next/server";

export async function middleware(req) {

    const host = req.headers.get('host');
    const cookie = req.headers.get('cookie');

    const { data } = await axios.get('http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser', {
        headers: {
            Host: host,
            Cookie: cookie
        }
    }); 

    const user = data.currentUser;

    if (req.nextUrl.pathname == '/auth/signup' || req.nextUrl.pathname == '/auth/signin') {
        if (user) {
            return NextResponse.redirect(new URL("/", req.url))
        }
        return NextResponse.next();
    }
    
    if (!user) {
        return NextResponse.redirect(new URL("/", req.url))
    }

    if (req.nextUrl.pathname.startsWith("/dashboard/admin")) {
        if (user.role !== 'admin') {
            return NextResponse.redirect(new URL("/", req.url))
        }
    }

    if (req.nextUrl.pathname.startsWith("/dashboard/author")) {
        if (user.role !== 'author') {
            return NextResponse.redirect(new URL("/", req.url))
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [ 
        '/auth/signup',
        '/auth/signin',
        '/profile',
        '/dashboard/author/:path*',
        '/dashboard/admin/:path*',
    ],
}