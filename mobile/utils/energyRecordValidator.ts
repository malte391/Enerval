

export const validateRecord = (record: string): boolean => {
    const value = Number(record);
    console.log(value)
    return /^[0-9]{1,6}$/.test(record)
}   

export const appendRecord = (record : string) : string => {
    if (!validateRecord(record)) {
        console.log("Record could not be validated");
    }

    return record.padStart(6, '0')
}