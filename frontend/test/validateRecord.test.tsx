import { describe, it, expect } from 'vitest';
import { appendRecord, validateRecord } from '../utils/Records/energyRecordValidator';

describe('validateRecord', () => {
  it('accepts exactly 6 digits', () => {
    expect(validateRecord('123456')).toBe(true);
  });

  it('rejects non-digits', () => {
    expect(validateRecord('12345a')).toBe(false);
  });

  it('rejects over length', () => {
    expect(validateRecord('1234567')).toBe(false);
  });

  it('accepts less than 6 digits', () => {
    expect(validateRecord('355')).toBe(true);
  });

});

describe('appendRecord', () => {
    it('adds 0 to the beginning', () => {
        expect(appendRecord('355')).toBe('000355')
    })

    it('will not append if already 6 figures', () => {
        expect(appendRecord('123456')).toBe('123456')
    })

    it('will append a one-figure-value with exactly 5 zeros', () => {
        expect(appendRecord('1')).toBe('000001')
    })

    it('appends an empty value', () => {
        expect(appendRecord('')).toBe('000000')
    })

    it('will accept a zero', () => {
        expect(appendRecord('0')).toBe('000000')
    })
})