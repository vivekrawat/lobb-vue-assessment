import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from '@/stores/user'

global.fetch = vi.fn() as any
const mockSessionStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn()
}
Object.defineProperty(window, 'sessionStorage', {
  value: mockSessionStorage
})

describe('UserStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('getToken stores token on success', async () => {
    const store = useUserStore();
    
    (global.fetch as any).mockResolvedValueOnce({
      json: () => Promise.resolve({ token: 'abc123' })
    })

    const result = await store.getToken({ email: "user1@gmail.com"})
    
    expect(result).toBe(true)
    expect(mockSessionStorage.setItem).toHaveBeenCalledWith('token', 'abc123')
  })

  it('getToken returns false on error', async () => {
    const store = useUserStore();
    
    (global.fetch as any).mockRejectedValueOnce(new Error('Network error'))

    const result = await store.getToken({ email: "user1@gmail.com" })
    
    expect(result).toBe(false)
  })

  it('toggles logout dialog', () => {
    const store = useUserStore()
    
    store.toggleLogoutConfirmationDialog(true)
    expect(store.logoutConfirmationDialog).toBe(true)
    
    store.toggleLogoutConfirmationDialog(false)
    expect(store.logoutConfirmationDialog).toBe(false)
  })

  it('logout clears token and closes dialog', () => {
    const store = useUserStore()
    
    store.logout()
    
    expect(store.logoutConfirmationDialog).toBe(false)
    expect(mockSessionStorage.removeItem).toHaveBeenCalledWith('token')
  })
})