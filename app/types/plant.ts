export interface Plant {
  id: string;
  common_name: string;
  scientific_name: string;
  species: string;
  genus: {
    name: string;
    family: {
      name: string;
      order: {
        name: string;
        class: {
          name: string;
          division: {
            name: string;
            subkingdom: {
              name: string;
              kingdom: {
                name: string;
              };
            };
          };
        };
      };
    };
  };
  image_url: string;
}

export type PlantResponse = Plant[];
