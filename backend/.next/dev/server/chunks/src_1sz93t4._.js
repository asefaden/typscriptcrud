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
"[project]/src/app/api/tasks/[id]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "OPTIONS",
    ()=>OPTIONS,
    "PUT",
    ()=>PUT
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
    const parts = authHeader.split(' ');
    if (parts.length !== 2) return null;
    const token = parts[1];
    try {
        const decoded = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].verify(token, process.env.JWT_SECRET || 'secret');
        return decoded.userId;
    } catch  {
        return null;
    }
}
async function PUT(request, { params } // 👈 እዚህ ጋር Promise መደረጉን ያረጋግጡ
) {
    const userId = getUserIdFromToken(request);
    if (!userId) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: 'Unauthorized'
    }, {
        status: 401,
        headers: corsHeaders
    });
    try {
        // 🛑 ማስተካከያ፦ መጀመሪያ paramsን አዌይት (await) እናደርገዋለን
        const resolvedParams = await params;
        const taskId = parseInt(resolvedParams.id, 10);
        if (isNaN(taskId)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Invalid Task ID'
            }, {
                status: 400,
                headers: corsHeaders
            });
        }
        const body = await request.json();
        const { title, description, isCompleted } = body;
        // 1. መጀመሪያ ተግባሩ የዚህ ተጠቃሚ መሆኑን ማረጋገጥ
        const existingTask = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].task.findFirst({
            where: {
                id: taskId,
                userId: userId
            }
        });
        if (!existingTask) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Task not found'
            }, {
                status: 404,
                headers: corsHeaders
            });
        }
        // 2. መረጃውን ማስተካከል
        const updatedTask = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].task.update({
            where: {
                id: taskId
            },
            data: {
                title: title !== undefined ? title : existingTask.title,
                description: description !== undefined ? description : existingTask.description,
                isCompleted: isCompleted !== undefined ? isCompleted : existingTask.isCompleted
            }
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(updatedTask, {
            status: 200,
            headers: corsHeaders
        });
    } catch (error) {
        console.error("Update SQL Error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to update database record'
        }, {
            status: 500,
            headers: corsHeaders
        });
    }
}
async function DELETE(request, { params } // 👈 እዚህም ጋር Promise መደረጉን ያረጋግጡ
) {
    const userId = getUserIdFromToken(request);
    if (!userId) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: 'Unauthorized'
    }, {
        status: 401,
        headers: corsHeaders
    });
    try {
        // 🛑 ማስተካከያ፦ መጀመሪያ paramsን አዌይት (await) እናደርገዋለን
        const resolvedParams = await params;
        const taskId = parseInt(resolvedParams.id, 10);
        if (isNaN(taskId)) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Invalid ID'
        }, {
            status: 400,
            headers: corsHeaders
        });
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].task.deleteMany({
            where: {
                id: taskId,
                userId: userId
            }
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: 'Deleted'
        }, {
            status: 200,
            headers: corsHeaders
        });
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to delete'
        }, {
            status: 500,
            headers: corsHeaders
        });
    }
}
}),
];

//# sourceMappingURL=src_1sz93t4._.js.map