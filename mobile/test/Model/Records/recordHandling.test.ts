import { describe, it, expect, vi, beforeEach } from 'vitest'
import { sumTotalConsumption } from '@/model/Records/recordAccumulation'
import {
  getRecordsForQuartal,
  getConsumptionForMonth,
  getSumOfRecordsForQuartal,
  getConsumptionPerMonth
} from '@/model/Records/recordHandling'

vi.mock('@/supabase/supabasepublic', () => ({
  supabase: {
    from: vi.fn()
  }
}))

import { supabase } from '@/supabase/supabasepublic'

beforeEach(() => {
  vi.clearAllMocks()
})

const mockSupabase = (records: { value: string }[] | null, error: any = null) => {
  vi.mocked(supabase.from).mockReturnValue({
    select: vi.fn().mockReturnValue({
      eq: vi.fn().mockReturnValue({
        gte: vi.fn().mockReturnValue({
          lt: vi.fn().mockResolvedValue({ data: records, error })
        })
      })
    })
  } as any)
}

const mockSupabaseWithSpies = () => {
  const ltMock = vi.fn().mockResolvedValue({ data: [], error: null })
  const gteMock = vi.fn().mockReturnValue({ lt: ltMock })
  vi.mocked(supabase.from).mockReturnValue({
    select: vi.fn().mockReturnValue({
      eq: vi.fn().mockReturnValue({ gte: gteMock })
    })
  } as any)
  return { ltMock, gteMock }
}

// ─── sumRecords ─────────────────────────────────────────────────────────────

describe('sumRecords', () => {
  it('returns total consumption correctly', () => {
    const records = [{ value: '100' }, { value: '200' }, { value: '300' }]
    expect(sumTotalConsumption(records)).toBe(200) // 300 - 100
  })

  it('handles leading zeros correctly', () => {
    const records = [{ value: '000010' }, { value: '000050' }]
    expect(sumTotalConsumption(records)).toBe(40) // 50 - 10
  })

  it('returns 0 for a single record', () => {
    expect(sumTotalConsumption([{ value: '42' }])).toBe(0) // no consumption, only one reading
  })

  it('returns 0 for empty array', () => {
    expect(sumTotalConsumption([])).toBe(0)
  })

  it('handles zero start value', () => {
    const records = [{ value: '0' }, { value: '5' }]
    expect(sumTotalConsumption(records)).toBe(5) // 5 - 0
  })

  it('returns 0 when all readings are the same', () => {
    const records = [{ value: '999999' }, { value: '999999' }]
    expect(sumTotalConsumption(records)).toBe(0) // no consumption
  })
})

// ─── getRecordsForQuartal ───────────────────────────────────────────────────

describe('getRecordsForQuartal', () => {
  it('returns records for Q1', async () => {
    const mockRecords = [{ value: '100' }, { value: '200' }]
    mockSupabase(mockRecords)
    const result = await getRecordsForQuartal('METER-001', 1, 2024)
    expect(result).toEqual(mockRecords)
  })

  it('returns records for Q4', async () => {
    const mockRecords = [{ value: '300' }]
    mockSupabase(mockRecords)
    const result = await getRecordsForQuartal('METER-001', 4, 2024)
    expect(result).toEqual(mockRecords)
  })

  it('throws when supabase returns an error', async () => {
    mockSupabase(null, { message: 'DB error' })
    await expect(getRecordsForQuartal('METER-001', 1, 2024)).rejects.toThrow()
  })

  it('returns empty array when no records exist', async () => {
    mockSupabase([])
    const result = await getRecordsForQuartal('METER-001', 2, 2024)
    expect(result).toEqual([])
  })

  it('queries correct date range for Q1', async () => {
    const { ltMock, gteMock } = mockSupabaseWithSpies()
    await getRecordsForQuartal('METER-001', 1, 2024)
    expect(gteMock).toHaveBeenCalledWith('created_at', new Date(2024, 0, 1).toISOString())
    expect(ltMock).toHaveBeenCalledWith('created_at', new Date(2024, 3, 1).toISOString())
  })

  it('queries correct date range for Q4 (year boundary)', async () => {
    const { ltMock, gteMock } = mockSupabaseWithSpies()
    await getRecordsForQuartal('METER-001', 4, 2024)
    expect(gteMock).toHaveBeenCalledWith('created_at', new Date(2024, 9, 1).toISOString())
    expect(ltMock).toHaveBeenCalledWith('created_at', new Date(2025, 0, 1).toISOString())
  })
})

// ─── getSumOfRecordsForMonth ────────────────────────────────────────────────

describe('getSumOfRecordsForMonth', () => {
  it('returns the sum of records for a month', async () => {
    mockSupabase([{ value: '100' }, { value: '200' }])
    const result = await getConsumptionForMonth('METER-001', 3, 2024)
    expect(result).toBe(100)
  })

  it('returns 0 when no records exist', async () => {
    mockSupabase([])
    const result = await getConsumptionForMonth('METER-001', 3, 2024)
    expect(result).toBe(0)
  })
})

// ─── getSumOfRecordsForQuartal ──────────────────────────────────────────────

describe('getSumOfRecordsForQuartal', () => {
  it('returns the sum of records for a quartal', async () => {
    mockSupabase([{ value: '100' }, { value: '150' }, { value: '250' }])
    const result = await getSumOfRecordsForQuartal('METER-001', 2, 2024)
    expect(result).toBe(150)
  })

  it('returns 0 when no records exist', async () => {
    mockSupabase([])
    const result = await getSumOfRecordsForQuartal('METER-001', 1, 2024)
    expect(result).toBe(0)
  })
})

// ─── getConsumptionPerMonth ─────────────────────────────────────────────────

describe('getConsumptionPerMonth', () => {
  it('returns difference between current and previous month', async () => {
    mockSupabase([{ value: '100' }, { value: '200' }])
    mockSupabase([{ value: '200' }, { value: '200' }])
    vi.mocked(supabase.from)
        .mockReturnValueOnce({
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              gte: vi.fn().mockReturnValue({
                lt: vi.fn().mockResolvedValue({ data: [{ value: '100' }], error: null })
              })
            })
          })
        } as any)
        .mockReturnValueOnce({
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              gte: vi.fn().mockReturnValue({
                lt: vi.fn().mockResolvedValue({ data: [{ value: '150' }], error: null })
              })
            })
          })
        } as any)

    const result = await getConsumptionPerMonth('METER-001', 6, 2024)
    expect(result).toBe(50)
  })

  it('wraps to December of previous year when month is January', async () => {
    const { ltMock, gteMock } = mockSupabaseWithSpies()

    ltMock
        .mockResolvedValueOnce({ data: [{ value: '80' }], error: null })
        .mockResolvedValueOnce({ data: [{ value: '120' }], error: null })

    const result = await getConsumptionPerMonth('METER-001', 1, 2024)
    expect(result).toBe(40)

    expect(gteMock).toHaveBeenCalledWith('created_at', new Date(2023, 11, 1).toISOString())
    expect(gteMock).toHaveBeenCalledWith('created_at', new Date(2024, 0, 1).toISOString())
  })

  it('returns negative value when consumption decreased', async () => {
    vi.mocked(supabase.from)
        .mockReturnValueOnce({
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              gte: vi.fn().mockReturnValue({
                lt: vi.fn().mockResolvedValue({ data: [{ value: '200' }], error: null })
              })
            })
          })
        } as any)
        .mockReturnValueOnce({
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              gte: vi.fn().mockReturnValue({
                lt: vi.fn().mockResolvedValue({ data: [{ value: '150' }], error: null })
              })
            })
          })
        } as any)

    const result = await getConsumptionPerMonth('METER-001', 6, 2024)
    expect(result).toBe(-50)
  })

  it('falls back to first reading of current month when no previous month records exist', async () => {
    vi.mocked(supabase.from)
        .mockReturnValueOnce({
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              gte: vi.fn().mockReturnValue({
                lt: vi.fn().mockResolvedValue({data: [], error: null}) // no prev month records
              })
            })
          })
        } as any)
        .mockReturnValueOnce({
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              gte: vi.fn().mockReturnValue({
                lt: vi.fn().mockResolvedValue({data: [{value: '100'}, {value: '160'}], error: null})
              })
            })
          })
        } as any)

    const result = await getConsumptionPerMonth('METER-001', 6, 2024)
    expect(result).toBe(60)
  })
})