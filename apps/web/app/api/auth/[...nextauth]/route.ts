import { handlers } from "@realtyeaseai/auth"
import { NextRequest } from "next/server"

const allowedOrigins = [
    'https://realtyeaseai.com',
    'https://www.realtyeaseai.com',
    'https://app.realtyeaseai.com',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:4000',
]

function addCorsHeaders(response: Response, origin?: string | null) {
    if (origin && allowedOrigins.includes(origin)) {
        response.headers.set('Access-Control-Allow-Origin', origin)
        response.headers.set('Access-Control-Allow-Credentials', 'true')
        response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    }
    return response
}

async function GET_handler(request: NextRequest) {
    const response = await handlers.GET(request)
    return addCorsHeaders(response, request.headers.get('origin'))
}

async function POST_handler(request: NextRequest) {
    const response = await handlers.POST(request)
    return addCorsHeaders(response, request.headers.get('origin'))
}

async function OPTIONS_handler(request: NextRequest) {
    const response = new Response(null, { status: 200 })
    return addCorsHeaders(response, request.headers.get('origin'))
}

export { GET_handler as GET, POST_handler as POST, OPTIONS_handler as OPTIONS }
