import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL,
	process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY,	
);

const plantData = [
    {
        common_name: 'Sugar Maple',
        scientific_name: 'Acer saccharum',
        type: 'tree',
        region: 'Northeast',
        zone: 4,
        description: 'Large deciduous tree known for colorful fall foliage.'
    },
    {
        common_name: 'Blueberry Bush',
        scientific_name: 'Vaccinium corymbosum',
        type: 'shrub',
        region: 'Northeast',
        zone: 5,
        description: 'Fruit-bearing shrub with sweet, edible berries.'
    }
];

async function seedPlants(data) {
    for (const plant of data) {
        const { data: insertedData, error } = await supabase
            .from('plants')
            .insert([{
                common_name: plant.common_name,
                scientific_name: plant.scientific_name,
                plant_type: plant.type,
                native_region: plant.region,
                hardiness_zone: plant.zone,
                description: plant.description
            }]);

        if (error) {
            console.error('Error inserting plant:', error.message);
		} else {
			console.log("Inserted plant:", insertedData);
		}
	}
}

seedPlants(plantData);
