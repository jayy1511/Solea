const fs = require('fs');
const path = require('path');

const files = [
  'Africa.json',
  'Asia.json',
  'Europe.json',
  'NorthAmerica_cities.json',
  'SouthAmerica.json',
  'Oceania.json'
];

const dataDir = path.join(__dirname, '..', 'data');

// Function to generate an image URL for a hotel
const generateHotelImageUrl = (city, hotelName) => {
  const citySlug = city.replace(/\s+/g, '_').toLowerCase();
  const hotelSlug = hotelName.replace(/\s+/g, '_').toLowerCase();
  return `https://your-cdn.com/hotels/${citySlug}_${hotelSlug}.jpg`;
};

for (const file of files) {
  const filePath = path.join(dataDir, file);
  const rawData = fs.readFileSync(filePath, 'utf-8');
  const cities = JSON.parse(rawData);

  const updatedCities = cities.map(city => {
    const hotelsWithImages = {};

    for (const category of ['7_star', '5_star', '4_star', '3_star']) {
      if (!city.hotels || !city.hotels[category]) continue;

      hotelsWithImages[category] = city.hotels[category].map(hotel => ({
        ...hotel,
        image: hotel.image || generateHotelImageUrl(city.city, hotel.name)
      }));
    }

    return {
      ...city,
      hotels: hotelsWithImages
    };
  });

  fs.writeFileSync(filePath, JSON.stringify(updatedCities, null, 2));
  console.log(`✅ Updated hotel images in ${file}`);
}
