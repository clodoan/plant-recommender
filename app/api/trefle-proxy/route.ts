import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const hardiness_zone = searchParams.get("hardiness_zone");
	const token = process.env.NEXT_PUBLIC_TREFLE_API_KEY;

	if (!hardiness_zone) {
		return NextResponse.json(
			{ error: "Missing hardiness_zone parameter" },
			{ status: 400 },
		);
	}

	const url = `https://trefle.io/api/v1/plants?filter[hardiness_zone]=${hardiness_zone}&token=${token}`;

	try {
		const trefleRes = await fetch(url);
		const data = await trefleRes.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error("Error fetching from Trefle:", error);
		return NextResponse.json(
			{ error: "Failed to fetch from Trefle" },
			{ status: 500 },
		);
	}
}
