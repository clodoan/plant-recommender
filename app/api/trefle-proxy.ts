// pages/api/trefle-proxy.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { hardiness_zone } = req.query;
	const token = process.env.NEXT_PUBLIC_TREFLE_API_KEY;

	if (!hardiness_zone) {
		return res
			.status(400)
			.json({ error: "Missing hardiness_zone parameter" });
	}

  const url = `https://trefle.io/api/v1/plants?filter[hardiness_zone]=${hardiness_zone}&token=${token}`;

	try {
		const trefleRes = await fetch(url);
		const data = await trefleRes.json();
		res.status(trefleRes.status).json(data);
	} catch {
		res.status(500).json({ error: "Failed to fetch from Trefle" });
	}
}
