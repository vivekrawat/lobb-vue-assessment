// tests/components/ContentPage.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { createRouter, createWebHistory } from 'vue-router'
import ContentPage from '@/views/Content.vue' // adjust path as needed
import LogoutConfirmation from '@/components/LogoutConfirmation.vue'
import { nextTick } from 'vue'
import { useContentStore } from '@/stores/content'

// Mock the composables
vi.mock('@/Composables/useDates', () => ({
  dates: () => ({
    dayName: 'Monday',
    dayNumber: '15',
    monthName: 'January',
  }),
}))

// Mock child components
vi.mock('@/components/title.vue', () => ({
  default: { template: '<div data-testid="title-component">Title Component</div>' },
}))

vi.mock('@/components/logoutConfirmation.vue', () => ({
  default: { template: '<div data-testid="logout-confirmation">Logout Confirmation</div>' },
}))

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: { template: '<div>Home</div>' } },
    { path: '/details', component: { template: '<div>Details</div>' } },
  ],
})

describe('ContentPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders date correctly', () => {
    const wrapper = mount(ContentPage, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              content: {
                state: () => {
                  content: null
                },
              },
              user: {
                state: () => {
                  logoutConfirmationDialog: false
                },
              },
            },
          }),
          router,
        ],
      },
    })

    expect(wrapper.text()).toContain('Monday 15 January')
  })

  it('displays user initials when content is loaded', async () => {
    const data = {
      title: 'naruto',
      userName: 'John Doe',
      mainImage: 'test-image.jpg',
      logo: 'test-logo.jpg',
      text: 'test',
      subTitle: 'gfgd',
      id: 123,
      thumbNailImage: 'test-image.jpg',
    }
    const wrapper = mount(ContentPage, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              // content: { content: null },
              // user: { logoutConfirmationDialog: false }
              content: {
                // state: () => ({
                content: data,
                // })
              },
              user: {
                state: () => {
                  logoutConfirmationDialog: false
                },
              },
            },
          }),
          router,
        ],
      },
    })

    const contentStore = useContentStore()

    const button = wrapper.find('button')
    await nextTick()
    expect(button.text()).toContain('JD')
  })

  it('shows logout confirmation when button is clicked', async () => {
    const wrapper = mount(ContentPage, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              content: {
                state: () => {
                  content: {
                    userName: "John Doe";
                    mainImage: "test-image.jpg";
                    logo: "test-logo.jpg";
                    text: "test";
                    subTitle: "gfgd";
                    id: "fsfsd";
                    thumbNailImage: "test-image.jpg";
                  }
                }
              },
              user: {
                logoutConfirmationDialog: true
              }
            }
          }),
          router
        ]
      }
    })
    // await nextTick()

    const button = wrapper.find('button')
    await button.trigger('click')

    // Check if logout confirmation dialog appears
    expect(wrapper.findComponent(LogoutConfirmation).exists()).toBe(true)
  })

  // it('navigates to details when image is clicked', async () => {
  //   const mockPush = vi.fn()
  //   const mockRouter = {
  //     push: mockPush
  //   }

  //   const wrapper = mount(ContentPage, {
  //     global: {
  //       plugins: [
  //         createTestingPinia({
  //           initialState: {
  //             content: {
  //               content: {
  //                 userName: 'John Doe',
  //                 mainImage: 'test-image.jpg'
  //               }
  //             },
  //             user: { logoutConfirmationDialog: false }
  //           }
  //         })
  //       ],
  //       mocks: {
  //         $router: mockRouter
  //       }
  //     }
  //   })

  //   const image = wrapper.find('img')
  //   await image.trigger('click')

  //   expect(mockPush).toHaveBeenCalledWith('/details')
  // })

  // it('displays main image when content is loaded', () => {
  //   const wrapper = mount(ContentPage, {
  //     global: {
  //       plugins: [
  //         createTestingPinia({
  //           initialState: {
  //             content: {
  //               content: {
  //                 userName: 'John Doe',
  //                 mainImage: 'https://example.com/image.jpg'
  //               }
  //             },
  //             user: { logoutConfirmationDialog: false }
  //           }
  //         }),
  //         router
  //       ]
  //     }
  //   })

  //   const image = wrapper.find('img')
  //   expect(image.attributes('src')).toBe('https://example.com/image.jpg')
  // })

  // it('handles empty content gracefully', () => {
  //   const wrapper = mount(ContentPage, {
  //     global: {
  //       plugins: [
  //         createTestingPinia({
  //           initialState: {
  //             content: { content: null },
  //             user: { logoutConfirmationDialog: false }
  //           }
  //         }),
  //         router
  //       ]
  //     }
  //   })

  //   // Should render without errors
  //   expect(wrapper.find('.text-3xl').text()).toBe('Today')
  // })
})
