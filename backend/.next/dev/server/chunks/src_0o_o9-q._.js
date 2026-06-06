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
"[project]/src/app/api/auth/login/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OPTIONS",
    ()=>OPTIONS,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/prisma.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$bcrypt__$5b$external$5d$__$28$bcrypt$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$bcrypt$29$__ = __turbopack_context__.i("[externals]/bcrypt [external] (bcrypt, cjs, [project]/node_modules/bcrypt)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jsonwebtoken/index.js [app-route] (ecmascript)");
;
;
;
;
const corsHeaders = {
    // 🛑 ማስተካከያ፦ ከ localhost ወደ ቀጥታ የክላውድ ሊንክዎ ይለውጡት
    'Access-Control-Allow-Origin': 'https://aletcloud.com',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true'
};
async function OPTIONS() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({}, {
        headers: corsHeaders
    });
}
async function POST(request) {
    try {
        const { email, password } = await request.json();
        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
            where: {
                email
            }
        });
        if (!user) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'የተሳሳተ ኢሜይል ወይም ፓስወርድ'
            }, {
                status: 400,
                headers: corsHeaders
            });
        }
        const isPasswordValid = await __TURBOPACK__imported__module__$5b$externals$5d2f$bcrypt__$5b$external$5d$__$28$bcrypt$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$bcrypt$29$__["default"].compare(password, user.password);
        if (!isPasswordValid) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'የተሳሳተ ኢሜይል ወይም ፓስወርድ'
            }, {
                status: 400,
                headers: corsHeaders
            });
        }
        const token = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].sign({
            userId: user.id,
            email: user.email,
            name: user.name
        }, process.env.JWT_SECRET || 'secret', {
            expiresIn: '1d'
        });
        // 🛑 ማስተካከያ፦ የ corsHeaders እዚህ ጋር በደንብ መያያዝ አለበት
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            }
        }, {
            status: 200,
            headers: corsHeaders
        });
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'የመግቢያ ስህተት ተከስቷል'
        }, {
            status: 500,
            headers: corsHeaders
        });
    }
}
}),
];

//# sourceMappingURL=src_0o_o9-q._.js.map