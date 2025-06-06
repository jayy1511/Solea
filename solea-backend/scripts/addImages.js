const fs = require('fs');
const path = require('path');

const files = [
  'Africa.json',
  'Asia.json',
  'europe_cities.json',
  'NorthAmerica_cities.json',
  'SouthAmerica.json',
  'Oceania.json'
];


const dataDir = path.join(__dirname, '..', 'data');

// Generate relative city image path
const generateCityImagePath = (continent, city) => {
  const safeName = city.replace(/\s+/g, '_');
  return `assets/${continent}/${safeName}.jpg`;
};

// Generate repeated hotel image paths
const getHotelImage = (index) => {
  return `assets/Hotels/hotel${11 + (index % 10)}.jpg`;
};

for (const file of files) {
  const filePath = path.join(dataDir, file);
  const rawData = fs.readFileSync(filePath, 'utf-8');
  const cities = JSON.parse(rawData);

  const updated = cities.map(city => {
    // Assign city image
    city.image = generateCityImagePath(city.continent, city.city);

    // Assign hotel images
    for (const category of ['7_star', '5_star', '4_star', '3_star']) {
      if (!city.hotels[category]) continue;

      city.hotels[category] = city.hotels[category].map((hotel, i) => ({
        ...hotel,
        image: getHotelImage(i)
      }));
    }

    return city;
  });

  fs.writeFileSync(filePath, JSON.stringify(updated, null, 2));
  console.log(`✅ Updated ${file}`);
}
