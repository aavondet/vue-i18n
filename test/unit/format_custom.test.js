import { createLocalVue, mount } from 'vue-test-utils'
import VueI18n from '../../src/index'
import messages from './fixture/index'

describe('custom formatter', () => {
  const localVue = createLocalVue()
  VueI18n.install.installed = false
  localVue.use(VueI18n)

  describe('via i18n instance API calling', () => {
    it('should allows for specifying a custom formatter', done => {
      class CustomFormatter {
        interpolate (message, values) {
          assert.deepEqual({ name: 'joe' }, values)
          done()
        }
      }
      const formatter = new CustomFormatter()
      const i18n = new VueI18n({
        locale: 'en',
        messages,
        formatter
      })
      i18n.t('message.hello', 'ja', { name: 'joe' })
    })
  })

  describe('via vue instance calling', () => {
    it('should allows for specifying a custom formatter', done => {
      const formatter = {
        interpolate: (message, values) => {
          assert.deepEqual([1, 2, 3], values)
          done()
        }
      }
      const i18n = new VueI18n({
        locale: 'en',
        messages,
        formatter
      })
      const wrapper = mount({}, { localVue, i18n })
      wrapper.vm.$t('message.hello', [1, 2, 3])
    })
  })

  describe('i18n format getter/settter', () => {
    it('should be worked', done => {
      const i18n = new VueI18n({
        locale: 'en',
        messages
      })

      assert(i18n.formatter.constructor.name === 'BaseFormatter')
      const formatter = {
        interpolate: (message, values) => {
          assert.deepEqual([1, 2, 3], values)
          done()
        }
      }
      i18n.formatter = formatter
      i18n.t('message.hello', [1, 2, 3])
    })
  })
})
