import { sql } from "@/lib/db";

export async function GET() {
  try {
    const response = await sql`
      SELECT * FROM drivers ORDER BY rating DESC
    `;

    return Response.json({ data: response }, { status: 200 });
  } catch (error) {
    console.error("Sürücü listesi hatası:", error);
    return Response.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
