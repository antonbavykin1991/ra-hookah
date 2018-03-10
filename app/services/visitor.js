import Service from '@ember/service'
import { inject as service } from '@ember/service'
import { computed, get } from '@ember/object'

export const F_UID = 'f_uid'

export default Service.extend({
  session: service(),

  store: service(),

  fastboot: service(),

  cookies: service(),

  model: computed.readOnly('session.currentUser'),

  isFastBoot: computed.readOnly('fastboot.isFastBoot'),

  uid: computed('isFastBoot', `fastboot.request.cookies.${F_UID}`, 'model.uid', {
    get () {
      return this.get('isFastBoot') ?
        this.get(`fastboot.request.cookies.${F_UID}`) :
        this.get('model.uid')
    }
  }),

  isAuthenticated: computed.bool('uid'),

  user: computed('uid', 'model.uid', {
    get () {
      if (!this.get('uid')) {
        return null
      }

      return this.get('store')
        .peekAll('user')
        .find(u => get(u, 'userId') === this.get('uid'))
    }
  }),

  isAdmin: computed.readOnly('user.isAdmin'),

  isClient: computed.readOnly('user.isClient'),

  async getUsers() {
    await this.get('store').query('user', {})
    this.notifyPropertyChange('user')
  },

  setUIDToCookies (uid) {
    this.get('cookies').write(F_UID, uid)
  },

  clearUIDFromCookies () {
    this.get('cookies').clear(F_UID)
  },

  async fetchSession() {
    try {
      if (!this.get('isFastBoot')) {
        await this.get('session').fetch()
      }

      await this.getUsers()
    } catch(e) {
      console.log(e)
      return e
    }
  },

  async auth(email, password) {
    const currentUser = await this
      .get('session')
      .open('firebase', {
        provider: 'password',
        email,
        password
      })

    this.setUIDToCookies(currentUser.uid)

    await this.getUsers()

    return currentUser
  },

  async signOut() {
    await this.get('session').close()
    this.clearUIDFromCookies()
    window.location.reload()
  }
})
