
export const checkThatCityExists = async (city : string) : Promise<boolean> => {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(city)}&format=json`);
    const data = await res.json();
    return data.length !== 0
}

export const validatePostalCode = (postalCode : string) : boolean => {
    return /^\d{5}$/.test(postalCode) && postalCode !== "00000"
}

export const validateHouseNumber = (houseNr : number) : boolean => {
      return !isNaN(houseNr)
}

export const authentificateAddress = async (country : string, 
    postalCode : string, 
    city : string, 
    street : string, 
    housenr : number, 
    additional? : string, 
    remarks? : string) : Promise<boolean> => {
        const validPostalCode : boolean = validatePostalCode(postalCode)
        const cityExists : boolean = await checkThatCityExists(city)
        console.log(cityExists)
        if(!validPostalCode) {throw new Error('invalid postal code')}
        if(!cityExists) {throw new Error(`City ${city} could not be found`)}
        if(!validateHouseNumber(housenr)) {throw new Error(`${housenr} is not Number`)}
        return validPostalCode && cityExists && validateHouseNumber(housenr)
}