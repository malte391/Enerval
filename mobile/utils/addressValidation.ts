
export const checkThatCityExists = async (city: string): Promise<boolean> => {
    const res = await fetch(
        `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(city)}&country=Germany&format=json&limit=1`,
        {
            headers: {
                'User-Agent': 'enerval-app/1.0 (dev@enerval.app)'
            }
        }
    );
    const data = await res.json();
    return data.length !== 0;
}

export const checkThatStreetExists = async (street: string, city?: string): Promise<boolean> => {
    const params = new URLSearchParams({
        street: street,
        country: 'Germany',
        format: 'json',
        limit: '1',
        ...(city && { city })
    })

    const res = await fetch(
        `https://nominatim.openstreetmap.org/search?${params}`,
        {
            headers: {
                'User-Agent': 'YourAppName/1.0 (your@email.com)'
            }
        }
    );
    const data = await res.json();
    return data.length !== 0;
}

export const validatePostalCode = (postalCode : string) : boolean => {
    return /^\d{5}$/.test(postalCode) && postalCode !== "00000"
}

export const validateHouseNumber = (houseNr : string) : boolean => {
      return /^[1-9]\d{0,3}[a-z]?$/.test(houseNr)


}

export const authentificateAddress = async (country : string, 
    postalCode : string, 
    city : string, 
    street : string, 
    housenr : string, 
    additional? : string, 
    remarks? : string) : Promise<boolean> => {
        const validPostalCode : boolean = validatePostalCode(postalCode)
        const cityExists : boolean = await checkThatCityExists(city)
        const streetExists : boolean = await checkThatStreetExists(street, city)
        if(!validPostalCode) {throw new Error('invalid postal code')}
        if(!cityExists) {throw new Error(`City ${city} could not be found`)}
        if(!validateHouseNumber(housenr)) {throw new Error(`${housenr} is not Number`)}
        return validPostalCode && cityExists && validateHouseNumber(housenr)
}