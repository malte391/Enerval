import { checkLocationExistsInDB } from "./locations"

export const meterNumberValidation = (meterNumber : string) : boolean => {
    return /^[A-Za-z0-9]{5,}$/.test(meterNumber)
}

export const validateMeterInput = (meterNumber : string, locatedAt : string) : boolean => {
    if (!meterNumberValidation(meterNumber)) { throw new Error('Invalid meter number')} 
    if (!checkLocationExistsInDB(locatedAt)) { throw new Error('Create new location first')}
    return meterNumberValidation(meterNumber) && meterNumberValidation(meterNumber)
}