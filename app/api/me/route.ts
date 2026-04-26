import { headers } from "next/headers";

export async function GET() {
    const h = await headers();

    const ip =
        h.get("x-forwarded-for")?.split(",")[0] ||
        h.get("x-real-ip") ||
        "unknown";

    const ua = h.get("user-agent") || "unknown";

    return Response.json({ ip, userAgent: ua });
}