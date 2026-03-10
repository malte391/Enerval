
/**
 * 
 * @param postalCode Postal Code as String
 * @returns The corresponding city or an empty string if error
 */
export const provideCityByPostalCode = async (postalCode : string) : Promise<string> => {
    try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?postalcode=${encodeURIComponent(postalCode)}&country=Germany&format=json&limit=1`);
        const data = await res.json();
        const display_names : string[] = data[0].display_name.split(',').map((d: string) => d.trim())
        return display_names[2]
    } catch (error) {
        console.error("Error fetching data:", error);
    }
    return ""
}