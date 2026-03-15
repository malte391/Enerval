
/**
 * 
 * @param postalCode Postal Code as String
 * @returns The corresponding city or an empty string if error
 */
export const provideCityByPostalCode = async (postalCode : string) : Promise<string> => {
    try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?postalcode=${encodeURIComponent(postalCode)}&country=Germany&format=json&limit=1&addressdetails=1`);
        const data = await res.json();

        if(!data.length) return ''

        const address = data[0].address;
        console.log(address)

        const city =
        address.city       ?? 
        address.town       ?? 
        address.village    ?? 
        address.suburb     ?? 
        address.municipality ??
        '';

        return city
        
    } catch (error) {
        console.error("Error fetching data:", error);
    }
    return ""
}