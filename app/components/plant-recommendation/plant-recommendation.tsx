import type { Plant } from '@/app/types/plant';
import { usePlants } from './hooks';
import { uniqueId } from 'lodash';
import PlantCard from './components/plant-card';

type PlantRecommendationsProps = {
  zone: number;
};

const PlantRecommendations = ({ zone }: PlantRecommendationsProps) => {
  const { plants, isLoading, isError } = usePlants(zone);
  console.log(plants);

  if (isLoading) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">
          Recommended Plants for Zone {zone}
        </h2>
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
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-primary">
        Recommended Plants for Zone {zone}
      </h2>
      {plants.length > 0 ? (
        <ul className="mt-2 space-y-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {plants.map((plant: Plant) => (
            <PlantCard key={plant.id} plant={plant} />
          ))}
        </ul>
      ) : (
        <p>No plants found for this zone.</p>
      )}
    </div>
  );
};

export default PlantRecommendations;
