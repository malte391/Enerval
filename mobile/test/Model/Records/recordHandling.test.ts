import { describe, it, expect, vi, beforeEach } from 'vitest'
import { sumRecords } from '@/model/Records/recordAccumulation'
import { getRecordsForQuartal, getSumOfRecordsForMonth, getSumOfRecordsForQuartal } from '@/model/Records/recordHandling'

vi.mock('@/supabase/supabasepublic', () => ({
  supabase: {
    from: vi.fn()
  }
}))

import { supabase } from '@/supabase/supabasepublic'

beforeEach(() => {
  vi.clearAllMocks()
})

describe('sumRecords', () => {

  it('sums a list of records correctly', () => {
    const records = [{ value: '100' }, { value: '200' }, { value: '300' }]
    expect(sumRecords(records)).toBe(600)
  })

  it('handles leading zeros correctly', () => {
    const records = [{ value: '000050' }, { value: '000010' }]
    expect(sumRecords(records)).toBe(60)
  })

  it('handles a single record', () => {
    expect(sumRecords([{ value: '42' }])).toBe(42)
  })

  it('returns 0 for empty array', () => {
    expect(sumRecords([])).toBe(0)
  })

  it('handles zero values', () => {
    const records = [{ value: '0' }, { value: '0' }, { value: '5' }]
    expect(sumRecords(records)).toBe(5)
  })

  it('handles max allowed value', () => {
    const records = [{ value: '999999' }, { value: '999999' }]
    expect(sumRecords(records)).toBe(1999998)
  })
})

// ─── getRecordsForQuartal ───────────────────────────────────────────────────

describe('getRecordsForQuartal', () => {

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
    const ltMock = vi.fn().mockResolvedValue({ data: [], error: null })
    const gteMock = vi.fn().mockReturnValue({ lt: ltMock })
    vi.mocked(supabase.from).mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({ gte: gteMock })
      })
    } as any)

    await getRecordsForQuartal('METER-001', 1, 2024)

    expect(gteMock).toHaveBeenCalledWith('created_at', new Date(2024, 0, 1).toISOString())
    expect(ltMock).toHaveBeenCalledWith('created_at', new Date(2024, 3, 1).toISOString())
  })

  it('queries correct date range for Q4 (year boundary)', async () => {
    const ltMock = vi.fn().mockResolvedValue({ data: [], error: null })
    const gteMock = vi.fn().mockReturnValue({ lt: ltMock })
    vi.mocked(supabase.from).mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({ gte: gteMock })
      })
    } as any)

    await getRecordsForQuartal('METER-001', 4, 2024)

    expect(gteMock).toHaveBeenCalledWith('created_at', new Date(2024, 9, 1).toISOString())
    expect(ltMock).toHaveBeenCalledWith('created_at', new Date(2025, 0, 1).toISOString())
  })
})

// ─── getSumOfRecordsForMonth ────────────────────────────────────────────────

describe('getSumOfRecordsForMonth', () => {

  const mockSupabase = (records: { value: string }[]) => {
    vi.mocked(supabase.from).mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          gte: vi.fn().mockReturnValue({
            lt: vi.fn().mockResolvedValue({ data: records, error: null })
          })
        })
      })
    } as any)
  }

  it('returns the sum of records for a month', async () => {
    mockSupabase([{ value: '100' }, { value: '200' }])
    const result = await getSumOfRecordsForMonth('METER-001', 3, 2024)
    expect(result).toBe(300)
  })

  it('returns 0 when no records exist', async () => {
    mockSupabase([])
    const result = await getSumOfRecordsForMonth('METER-001', 3, 2024)
    expect(result).toBe(0)
  })
})

// ─── getSumOfRecordsForQuartal ──────────────────────────────────────────────

describe('getSumOfRecordsForQuartal', () => {

  const mockSupabase = (records: { value: string }[]) => {
    vi.mocked(supabase.from).mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          gte: vi.fn().mockReturnValue({
            lt: vi.fn().mockResolvedValue({ data: records, error: null })
          })
        })
      })
    } as any)
  }

  it('returns the sum of records for a quartal', async () => {
    mockSupabase([{ value: '100' }, { value: '150' }, { value: '250' }])
    const result = await getSumOfRecordsForQuartal('METER-001', 2, 2024)
    expect(result).toBe(500)
  })

  it('returns 0 when no records exist', async () => {
    mockSupabase([])
    const result = await getSumOfRecordsForQuartal('METER-001', 1, 2024)
    expect(result).toBe(0)
  })
})