import type { Plant } from '@/app/types/plant';

type PlantCardProps = {
  plant: Plant;
};

const PlantCard = ({ plant }: PlantCardProps) => {
  return (
    <li key={plant.id} className="p-2 border rounded shadow-sm">
      {plant.common_name} ({plant.scientific_name})
    </li>
  );
};

export default PlantCard;
