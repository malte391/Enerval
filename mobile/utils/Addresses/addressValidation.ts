
export const checkThatCityExists = async (city : string) : Promise<boolean> => {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(city)}&format=json`);
    const data = await res.json();
    return data.length !== 0
}

export const validatePostalCode = (postalCode : string) : boolean => {
    return /^\d{5}$/.test(postalCode) && postalCode !== "00000"
}