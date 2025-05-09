// app/api/plants/route.js
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const zone = searchParams.get('zone');

	if (!zone) {
		return NextResponse.json(
			{ error: "Hardiness zone is required" },
			{ status: 400 }
		);
	}

    try {
        // Fetch plant data from Trefle based on the hardiness zone
        const response = await axios.get(`https://trefle.io/api/v1/plants?filter[hardiness_zone]=${zone}&token=${process.env.NEXT_PUBLIC_TREFLE_API_KEY}`);

		if (response.data?.data) {
			return NextResponse.json(response.data.data, { status: 200 });
		}

		return NextResponse.json(
			{ error: "No plants found for this zone" },
			{ status: 404 }
		);
	} catch (error) {
		console.error("API error:", error.message);
		return NextResponse.json(
			{ error: "Failed to fetch plant data" },
			{ status: 500 }
		);
	}
}
