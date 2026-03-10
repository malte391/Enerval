import { meterNumberValidation } from "@/utils/meterValidation";
import { describe, it, expect } from "vitest";

describe('validateMeterNumber', () => {
    it('wont accept less than 5 letters', () => {
        expect(meterNumberValidation('a2sg')).toBe(false)
        expect(meterNumberValidation('')).toBe(false)
    });
    it('wont accept symbols', () =>{
        expect(meterNumberValidation('11111*')).toBe(false)
        expect(meterNumberValidation('aAaAA<')).toBe(false)
        expect(meterNumberValidation('!!!!!!!!!!')).toBe(false)
    });
    it('will accept lower and uppercase letters', () => {
        expect(meterNumberValidation('askjdhjkashdjklas')).toBe(true)
        expect(meterNumberValidation('AAAAASDSAJHKDHASJKDHJK')).toBe(true)
        expect(meterNumberValidation('sajhkldaskjkjdasHAJKSHDKJHASDKsdhs')).toBe(true)
    });
    it('will accept letters and digits', () => {
        expect(meterNumberValidation('askld44ASKLJHD898sd3')).toBe(true)
    });
});