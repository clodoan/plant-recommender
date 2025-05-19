import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const hardiness_zone = searchParams.get('hardiness_zone');
  const token = process.env.NEXT_PUBLIC_TREFLE_API_KEY;

  if (!hardiness_zone) {
    return NextResponse.json(
      { error: 'Missing hardiness_zone parameter' },
      { status: 400 }
    );
  }

  if (!token) {
    console.error('Trefle API token is missing');
    return NextResponse.json(
      { error: 'API token is not configured' },
      { status: 500 }
    );
  }

  // Using the correct Trefle API v1 endpoint structure
  const url = `https://trefle.io/api/v1/plants?token=${token}&filter[hardiness_zone]=${hardiness_zone}`;

  try {
    console.log('Fetching from Trefle with URL:', url);
    const trefleRes = await fetch(url);

    if (!trefleRes.ok) {
      const errorText = await trefleRes.text();
      console.error('Trefle API error:', {
        status: trefleRes.status,
        statusText: trefleRes.statusText,
        body: errorText,
      });
      return NextResponse.json(
        {
          error: `Trefle API error: ${trefleRes.status} ${trefleRes.statusText}`,
        },
        { status: trefleRes.status }
      );
    }

    const data = await trefleRes.json();
    console.log('Trefle response:', JSON.stringify(data, null, 2));
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching from Trefle:', error);
    return NextResponse.json(
      { error: 'Failed to fetch from Trefle' },
      { status: 500 }
    );
  }
}
