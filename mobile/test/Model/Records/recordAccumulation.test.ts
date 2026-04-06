import { describe, it, expect } from 'vitest'
import { sumTotalConsumption } from '@/model/Records/recordAccumulation'


describe('sumRecords', () => {

  it('sums a list of records correctly', () => {
    const records = [{ value: '100' }, { value: '200' }, { value: '300' }]
    expect(sumTotalConsumption(records)).toBe(600)
  })

  it('handles leading zeros correctly', () => {
    const records = [{ value: '000050' }, { value: '000010' }]
    expect(sumTotalConsumption(records)).toBe(60)
  })

  it('handles a single record', () => {
    expect(sumTotalConsumption([{ value: '42' }])).toBe(42)
  })

  it('returns 0 for empty array', () => {
    expect(sumTotalConsumption([])).toBe(0)
  })

  it('handles zero values', () => {
    const records = [{ value: '0' }, { value: '0' }, { value: '5' }]
    expect(sumTotalConsumption(records)).toBe(5)
  })

  it('handles max allowed value', () => {
    const records = [{ value: '999999' }, { value: '999999' }]
    expect(sumTotalConsumption(records)).toBe(1999998)
  })
})

