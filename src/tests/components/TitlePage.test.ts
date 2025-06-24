import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount } from '@vue/test-utils'
import Title from "@/components/title.vue";
import { createTestingPinia } from "@pinia/testing";

describe('TitlePage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('rendering title details correctly', () => {
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
    const wrapper = mount(Title, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              content: {
                content: data,
              },
              user: {
                  logoutConfirmationDialog: false
              },
            },
          }),
        ],
      },
    })

    expect(wrapper.text()).toContain('naruto')
    expect(wrapper.text()).toContain('gfgd')
  })
})