import type { Plant } from '@/app/types/plant';
import Image from 'next/image';

type PlantCardProps = {
  plant: Plant;
};

const PlantCard = ({ plant }: PlantCardProps) => {
  return (
    <li
      key={plant.id}
      className="p-2 border border-color-border-primary rounded shadow-sm flex flex-col gap-2 bg-color-bg-secondary"
    >
      <div className="flex items-center justify-center rounded-md overflow-hidden w-full h-[200px] relative">
        <Image
          src={plant.image_url}
          alt={plant.common_name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col">
        <h1 className="text-xl font-bold leading-relaxed text-color-text-primary">
          {plant.common_name}
        </h1>
        <p className="text-body-2 text-color-text-secondary">
          {plant.scientific_name} ({plant.scientific_name})
        </p>
      </div>
    </li>
  );
};

export default PlantCard;
