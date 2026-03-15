import { guessFirstName, guessSecondName } from '@/utils/checkIn';
import { describe, it, expect } from 'vitest';

describe('guessFirstName', () => {

  it('extracts and capitalizes first name from email', () => {
    expect(guessFirstName('karsten.meier@gmail.com')).toBe('Karsten');
  });

  it('handles already capitalized first name', () => {
    expect(guessFirstName('Karsten.Meier@gmail.com')).toBe('Karsten');
  });

  it('handles all uppercase', () => {
    expect(guessFirstName('KARSTEN.MEIER@gmail.com')).toBe('Karsten');
  });

  it('handles german special characters', () => {
    expect(guessFirstName('jürgen.müller@gmail.com')).toBe('Jürgen');
  });

  it('returns empty if empty string', () => {
    expect(guessFirstName('')).toBe('');
  });

});

describe('guessSecondName', () => {

  it('extracts and capitalizes second name from email', () => {
    expect(guessSecondName('karsten.meier@gmail.com')).toBe('Meier');
  });

  it('handles already capitalized second name', () => {
    expect(guessSecondName('Karsten.Meier@gmail.com')).toBe('Meier');
  });

  it('handles all uppercase', () => {
    expect(guessSecondName('KARSTEN.MEIER@gmail.com')).toBe('Meier');
  });

  it('handles german special characters', () => {
    expect(guessSecondName('jürgen.müller@gmail.com')).toBe('Müller');
  });

  it('returns empty if empty string', () => {
    expect(guessSecondName('')).toBe('');
  });

});