module.exports = [
"[project]/src/lib/prisma.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "prisma",
    ()=>prisma
]);
// ❌ ይህንን የድሮውን መስመር ያጥፉት፦
// import { PrismaClient } from '@prisma/client';
// 👇 በፕሪስማ 7 አሰራር መሰረት በዚህ አዲሱ መስመር ይተኩት፦
var __TURBOPACK__imported__module__$5b$project$5d2f$prisma$2f$generated$2f$client$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/prisma/generated/client/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$adapter$2d$mariadb$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@prisma/adapter-mariadb/dist/index.mjs [app-route] (ecmascript)");
;
;
const globalForPrisma = /*TURBOPACK member replacement*/ __turbopack_context__.g;
let prismaInstance;
if (!globalForPrisma.prisma) {
    if (!process.env.DATABASE_URL) {
        throw new Error('DATABASE_URL must be set');
    }
    const adapter = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$adapter$2d$mariadb$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PrismaMariaDb"](process.env.DATABASE_URL);
    // አዲሱን ክሊየንት በአዳፕተሩ ማስነሳት
    prismaInstance = new __TURBOPACK__imported__module__$5b$project$5d2f$prisma$2f$generated$2f$client$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PrismaClient"]({
        adapter
    });
    if ("TURBOPACK compile-time truthy", 1) {
        globalForPrisma.prisma = prismaInstance;
    }
} else {
    prismaInstance = globalForPrisma.prisma;
}
const prisma = prismaInstance;
}),
"[project]/src/app/api/tasks/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "OPTIONS",
    ()=>OPTIONS,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/prisma.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jsonwebtoken/index.js [app-route] (ecmascript)");
;
;
;
const corsHeaders = {
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true'
};
async function OPTIONS() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({}, {
        headers: corsHeaders
    });
}
function getUserIdFromToken(request) {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
    // 🛑 ማስተካከያ፦ አሬይ ውስጥ ያለውን ሁለተኛውን ክፍል [1] (ንጹህ ቶከኑን) መውሰድ አለብን
    const parts = authHeader.split(' ');
    if (parts.length !== 2) return null;
    const token = parts[1];
    try {
        const decoded = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].verify(token, process.env.JWT_SECRET || 'secret');
        return decoded.userId;
    } catch (err) {
        console.error("JWT Verification Failed:", err);
        return null;
    }
}
async function GET(request) {
    const userId = getUserIdFromToken(request);
    if (!userId) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'ያልተፈቀደ እቅስቃሴ'
        }, {
            status: 401,
            headers: corsHeaders
        });
    }
    try {
        const tasks = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].task.findMany({
            where: {
                userId
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(tasks, {
            headers: corsHeaders
        });
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to fetch tasks'
        }, {
            status: 500,
            headers: corsHeaders
        });
    }
}
async function POST(request) {
    const userId = getUserIdFromToken(request);
    if (!userId) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'ያልተፈቀደ እቅስቃሴ'
        }, {
            status: 401,
            headers: corsHeaders
        });
    }
    try {
        const { title, description } = await request.json();
        if (!title) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'ርዕስ ያስፈልጋል'
            }, {
                status: 400,
                headers: corsHeaders
            });
        }
        const newTask = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].task.create({
            data: {
                title,
                description,
                userId
            }
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(newTask, {
            status: 201,
            headers: corsHeaders
        });
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to create task'
        }, {
            status: 500,
            headers: corsHeaders
        });
    }
}
}),
];

//# sourceMappingURL=src_1siolog._.js.map