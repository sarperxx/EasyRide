import { sql } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { name, email, clerkId } = await request.json();

    if (!name || !email || !clerkId) {
      return Response.json(
        { error: "Eksik alan: name, email, clerkId zorunlu" },
        { status: 400 }
      );
    }

    const response = await sql`
      INSERT INTO users (name, email, clerk_id)
      VALUES (${name}, ${email}, ${clerkId})
      ON CONFLICT (clerk_id) DO UPDATE
        SET name = ${name}, email = ${email}
      RETURNING *
    `;

    return Response.json({ data: response[0] }, { status: 201 });
  } catch (error) {
    console.error("Kullanıcı kaydı hatası:", error);
    return Response.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
