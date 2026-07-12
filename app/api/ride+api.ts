import { sql } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return Response.json({ error: "userId zorunlu" }, { status: 400 });
    }

    const response = await sql`
      SELECT
        rides.*,
        drivers.first_name AS driver_first_name,
        drivers.last_name AS driver_last_name,
        drivers.car_seats,
        drivers.car_image_url,
        drivers.profile_image_url,
        drivers.rating
      FROM rides
      INNER JOIN drivers ON rides.driver_id = drivers.id
      WHERE rides.user_id = ${userId}
      ORDER BY rides.created_at DESC
    `;

    return Response.json({ data: response }, { status: 200 });
  } catch (error) {
    console.error("Sürüş listesi hatası:", error);
    return Response.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const {
      origin_address,
      destination_address,
      origin_latitude,
      origin_longitude,
      destination_latitude,
      destination_longitude,
      ride_time,
      fare_price,
      payment_status,
      driver_id,
      user_id,
    } = await request.json();

    if (
      !origin_address || !destination_address || !origin_latitude ||
      !origin_longitude || !destination_latitude || !destination_longitude ||
      !ride_time || !fare_price || !payment_status || !driver_id || !user_id
    ) {
      return Response.json({ error: "Eksik alan var" }, { status: 400 });
    }

    const response = await sql`
      INSERT INTO rides (
        origin_address, destination_address,
        origin_latitude, origin_longitude,
        destination_latitude, destination_longitude,
        ride_time, fare_price, payment_status,
        driver_id, user_id
      )
      VALUES (
        ${origin_address}, ${destination_address},
        ${origin_latitude}, ${origin_longitude},
        ${destination_latitude}, ${destination_longitude},
        ${ride_time}, ${fare_price}, ${payment_status},
        ${driver_id}, ${user_id}
      )
      RETURNING *
    `;

    return Response.json({ data: response[0] }, { status: 201 });
  } catch (error) {
    console.error("Sürüş kayıt hatası:", error);
    return Response.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
