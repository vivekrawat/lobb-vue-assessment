import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useContentStore } from '@/stores/content'

global.fetch = vi.fn()

describe('ContentStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('getContent fetches and stores content', async () => {
    const store = useContentStore()
    const mockContent = { title: 'Test', body: 'Content' }
    
    ;(global.fetch as any).mockResolvedValueOnce({
      json: () => Promise.resolve({ content: mockContent })
    })

    const result = await store.getContent()
    
    expect(result).toBe(true)
    expect(store.content).toEqual(mockContent)
  })

  it('getContent handles errors', async () => {
    const store = useContentStore()
    
    ;(global.fetch as any).mockRejectedValueOnce(new Error('API Error'))

    const result = await store.getContent()
    
    expect(result).toBe(false)
  })
})