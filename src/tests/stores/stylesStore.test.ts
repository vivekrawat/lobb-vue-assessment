import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useStylesStore } from '@/stores/styles'

describe('StylesStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('sets and gets loading message', () => {
    const store = useStylesStore()
    
    expect(store.loadingMessage).toBe('')
    
    store.setLoadingMessage('Loading...')
    expect(store.loadingMessage).toBe('Loading...')
  })
})