import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createNewAdress, getAddressesByUserId } from '@/model/Addresses/addressHandling'

// Mock dependencies
vi.mock('../../supabase/supabasepublic', () => ({
  supabase: {
    from: vi.fn()
  }
}))

vi.mock('@/supabase/auth', () => ({
  getSignedInUser: vi.fn()
}))

vi.mock('../../utils/addressValidation', () => ({
  authentificateAddress: vi.fn()
}))

import { supabase } from '../../supabase/supabasepublic'
import { getSignedInUser } from '@/supabase/auth'
import { authentificateAddress } from '../../utils/addressValidation'

const mockUser = { id: 'user-123' }

const mockAddress = {
  country: 'Germany',
  postalCode: '24103',
  city: 'Kiel',
  street: 'Hauptstraße',
  housenr: '12',
  remarks: 'Ring twice'
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('createNewAdress', () => {

  it('inserts a new address successfully', async () => {
    vi.mocked(getSignedInUser).mockResolvedValue(mockUser as any)
    vi.mocked(authentificateAddress).mockResolvedValue(undefined as any)
    vi.mocked(supabase.from).mockReturnValue({
      insert: vi.fn().mockReturnValue({
        select: vi.fn().mockResolvedValue({ data: [{}], error: null })
      })
    } as any)

    await expect(
      createNewAdress(
        mockAddress.country,
        mockAddress.postalCode,
        mockAddress.city,
        mockAddress.street,
        mockAddress.housenr,
        mockAddress.remarks
      )
    ).resolves.toBeUndefined()
  })

  it('throws if supabase insert returns an error', async () => {
    vi.mocked(getSignedInUser).mockResolvedValue(mockUser as any)
    vi.mocked(authentificateAddress).mockResolvedValue(undefined as any)
    vi.mocked(supabase.from).mockReturnValue({
      insert: vi.fn().mockReturnValue({
        select: vi.fn().mockResolvedValue({ data: null, error: { message: 'Insert failed' } })
      })
    } as any)

    await expect(
      createNewAdress(
        mockAddress.country,
        mockAddress.postalCode,
        mockAddress.city,
        mockAddress.street,
        mockAddress.housenr
      )
    ).rejects.toThrow('Insert failed')
  })

  it('throws if getSignedInUser fails', async () => {
    vi.mocked(getSignedInUser).mockRejectedValue(new Error('Not authenticated'))
    
    await expect(
      createNewAdress(
        mockAddress.country,
        mockAddress.postalCode,
        mockAddress.city,
        mockAddress.street,
        mockAddress.housenr
      )
    ).rejects.toThrow('Not authenticated')
  })

  it('throws if authentificateAddress fails', async () => {
    vi.mocked(getSignedInUser).mockResolvedValue(mockUser as any)
    vi.mocked(authentificateAddress).mockRejectedValue(new Error('Invalid address'))

    await expect(
      createNewAdress(
        mockAddress.country,
        mockAddress.postalCode,
        mockAddress.city,
        mockAddress.street,
        mockAddress.housenr
      )
    ).rejects.toThrow('Invalid address')
  })

  it('works without optional remarks', async () => {
    vi.mocked(getSignedInUser).mockResolvedValue(mockUser as any)
    vi.mocked(authentificateAddress).mockResolvedValue(undefined as any)
    vi.mocked(supabase.from).mockReturnValue({
      insert: vi.fn().mockReturnValue({
        select: vi.fn().mockResolvedValue({ data: [{}], error: null })
      })
    } as any)

    await expect(
      createNewAdress(
        mockAddress.country,
        mockAddress.postalCode,
        mockAddress.city,
        mockAddress.street,
        mockAddress.housenr
        // no remarks
      )
    ).resolves.toBeUndefined()
  })
})

describe('getAddressesByUserId', () => {

  it('returns addresses for a given user id', async () => {
    const mockAddresses = [{ country: 'Germany', postal_code: '24103', city: 'Kiel', street: 'Hauptstraße', additional: null }]
    vi.mocked(supabase.from).mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockResolvedValue({ data: mockAddresses, error: null })
      })
    } as any)

    const result = await getAddressesByUserId('user-123')
    expect(result).toEqual(mockAddresses)
  })

  it('throws if supabase returns an error', async () => {
    vi.mocked(supabase.from).mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockResolvedValue({ data: null, error: { message: 'DB error' } })
      })
    } as any)

    await expect(getAddressesByUserId('user-123')).rejects.toThrow('Error getting users address')
  })

  it('returns empty array if user has no addresses', async () => {
    vi.mocked(supabase.from).mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockResolvedValue({ data: [], error: null })
      })
    } as any)

    const result = await getAddressesByUserId('user-123')
    expect(result).toEqual([])
  })
})