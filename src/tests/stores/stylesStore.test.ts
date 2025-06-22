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

  it('sets and gets toast details', () => {
    const store = useStylesStore()

    expect(store.toastDetails).toBe(undefined)
    
    store.setToastDetails({title: 'Error', type: 'error', description: 'Something went wrong'})
    expect(store.toastDetails).toEqual({title: 'Error', type: 'error', description: 'Something went wrong'})
    
    store.resetToastDetails()
    expect(store.toastDetails).toBe(undefined)
  })
})