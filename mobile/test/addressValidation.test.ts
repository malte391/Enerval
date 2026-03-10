import { checkThatCityExists, validatePostalCode, validateHouseNumber } from '../utils/addressValidation';
import { describe, it, expect } from 'vitest';

describe('German Postal Code Validation', () => {
  it('should accept valid 5-digit postal codes', () => {
    const validCodes = ['10115', '50667', '80331', '99999', '01067'];
    validCodes.forEach(code => {
      expect(validatePostalCode(code)).toBe(true);
    });
  });

  it('should reject codes with less than 5 digits', () => {
    const invalidCodes = ['1234', '1', '', '9999'];
    invalidCodes.forEach(code => {
      expect(validatePostalCode(code)).toBe(false);
    });
  });

  it('should reject codes with more than 5 digits', () => {
    const invalidCodes = ['123456', '1234567', '123456789'];
    invalidCodes.forEach(code => {
      expect(validatePostalCode(code)).toBe(false);
    });
  });

  it('should reject codes with non-numeric characters', () => {
    const invalidCodes = ['12a45', 'ABCDE', '12 45', '12-45'];
    invalidCodes.forEach(code => {
      expect(validatePostalCode(code)).toBe(false);
    });
  });

  it('should reject codes with special characters', () => {
    const invalidCodes = ['12@45', '12#45', '!2345'];
    invalidCodes.forEach(code => {
      expect(validatePostalCode(code)).toBe(false);
    });
  });
});

describe('validateCity', () => {
    it('wont accept a wrongly written city', async () => {
        expect(await checkThatCityExists("Haburg")).toBe(false);
    })

    it('will accept an existing city', async () => {
        const germanCities : string[] = [
            "Berlin",
            "München",
            "Köln",
            "Frankfurt am Main",
            "Hamburg",
            "Düsseldorf",
            "Stuttgart",
            "Leipzig",
            "Dresden",
            "Bremen"
            ];
        const results = await Promise.all(germanCities.map(city => checkThatCityExists(city)));
        results.forEach(result => expect(result).toBe(true));
    });

    it('will accept english city names', async () => {
        const germanCitesEnglishNames : string[] = [
            "Berlin",
            "Munich",
            "Cologne",
            "Frankfurt",
            "Hamburg",
            "Dusseldorf",
            "Stuttgart",
            "Leipzig",
            "Dresden",
            "Bremen"
            ];
        const results = await Promise.all(germanCitesEnglishNames.map(city => checkThatCityExists(city)));
        results.forEach(result => expect(result).toBe(true));    
    });
});

describe('validateHouseNumber', () => {
  it('accepts valid house numbers', () => {
    expect(validateHouseNumber("1")).toBe(true)
    expect(validateHouseNumber("12")).toBe(true)
    expect(validateHouseNumber("1b")).toBe(true)
    expect(validateHouseNumber("12B")).toBe(true)
  })

  it('rejects invalid house numbers', () => {
    expect(validateHouseNumber("b")).toBe(false)
    expect(validateHouseNumber("")).toBe(false)
    expect(validateHouseNumber("1bb")).toBe(false)
    expect(validateHouseNumber("12bb")).toBe(false)
    expect(validateHouseNumber("12b3")).toBe(false)
  })
})

