"use client";

import { useState, useEffect } from "react";
import PlantRecommendations from "./components/plant-recommendation/plant-recommendation";
import ZoneForm from "./components/zone-form/zone-form";
import axios from "axios";

async function getZoneFromLocation(latitude: number, longitude: number) {
	try {
		await axios.get(`https://api.weather.gov/points/${latitude},${longitude}`);
		// TODO: Implement proper zone detection from forecast data
		// For now, return a default zone
		return 5;
	} catch (error) {
		console.error("Error getting zone from location:", error);
		return null;
	}
}

export default function Home() {
	const [selectedZone, setSelectedZone] = useState<number | null>(null);
	const [isDetectingLocation, setIsDetectingLocation] = useState(false);

	useEffect(() => {
		if ("geolocation" in navigator) {
			setIsDetectingLocation(true);
			navigator.geolocation.getCurrentPosition(
				async (position) => {
					try {
						const zone = await getZoneFromLocation(
							position.coords.latitude,
							position.coords.longitude,
						);
						if (zone) {
							setSelectedZone(zone);
						}
					} catch (error) {
						console.error("Error getting zone:", error);
					} finally {
						setIsDetectingLocation(false);
					}
				},
				(error) => {
					console.error("Error getting location:", error);
					setIsDetectingLocation(false);
				},
			);
		}
	}, []);

	const handleZoneSubmit = (zone: number) => {
		setSelectedZone(zone);
	};

	return (
		<div className="p-6 max-w-4xl mx-auto">
			<h1 className="text-2xl font-bold mb-6">Plant Recommender</h1>
			<ZoneForm onSubmit={handleZoneSubmit} isLoading={isDetectingLocation} />

			{selectedZone && (
				<div className="mt-8">
					<PlantRecommendations zone={selectedZone} />
				</div>
			)}
		</div>
	);
}
