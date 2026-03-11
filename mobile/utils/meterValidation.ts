import { checkLocationExistsInDB } from "./locations"

export const meterNumberValidation = (meterNumber : string) : boolean => {
    return /^[A-Za-z0-9]{5,}$/.test(meterNumber)
}

export const validateMeterInput = async (meterNumber : string, locatedAt : string) : Promise<boolean> => {
    const locationInDB : boolean = await checkLocationExistsInDB(locatedAt)
    if (!meterNumberValidation(meterNumber)) { throw new Error('Invalid meter number')} 
    if (!locationInDB) { throw new Error('Create new location first')}
    return meterNumberValidation(meterNumber) && checkLocationExistsInDB(locatedAt)
}