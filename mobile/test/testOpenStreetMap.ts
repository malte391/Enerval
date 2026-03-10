async function testOpenStreetMapApi(postalCode:string) {
    try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?postalcode=${postalCode}&country=Germany&format=json&limit=1`);
        const data = await res.json();
        console.log(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

async function testCityValidation (city : string) {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(city)}&format=json`);
    const data = await res.json();
    console.log(data)
}

testCityValidation("Munich")