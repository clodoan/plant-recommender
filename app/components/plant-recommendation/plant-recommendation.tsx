import type { Plant } from '@/app/types/plant';
import { uniqueId } from 'lodash';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function usePlants(zone: number) {
  const { data, error, isLoading } = useSWR(
    zone ? `/api/trefle-proxy?hardiness_zone=${zone}` : null,
    fetcher
  );

  return {
    plants: data?.data || [],
    isLoading,
    isError: error,
  };
}

type PlantRecommendationsProps = {
  zone: number;
};

function PlantSkeleton() {
  return (
    <div className="animate-pulse space-y-2">
      {[...Array(5)].map(() => (
        <div
          key={uniqueId('skeleton-')}
          className="p-2 border rounded shadow-sm"
        >
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-1/2 mt-1" />
        </div>
      ))}
    </div>
  );
}

const PlantRecommendations = ({ zone }: PlantRecommendationsProps) => {
  const { plants, isLoading, isError } = usePlants(zone);

  if (isLoading) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">
          Recommended Plants for Zone {zone}
        </h2>
        <PlantSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">
          Recommended Plants for Zone {zone}
        </h2>
        <p className="text-red-500">
          Failed to load plants. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">
        Recommended Plants for Zone {zone}
      </h2>
      {plants.length > 0 ? (
        <ul className="mt-2 space-y-2">
          {plants.map((plant: Plant) => (
            <li key={plant.id} className="p-2 border rounded shadow-sm">
              {plant.common_name} ({plant.scientific_name})
            </li>
          ))}
        </ul>
      ) : (
        <p>No plants found for this zone.</p>
      )}
    </div>
  );
};

export default PlantRecommendations;
