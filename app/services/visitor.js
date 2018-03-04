import Service from '@ember/service'
import { inject as service } from '@ember/service'
import { computed, get } from '@ember/object'

export default Service.extend({
  session: service(),

  store: service(),

  model: computed.readOnly('session.currentUser'),

  user: computed('model.uid', {
    get () {
      return this.get('store')
        .peekAll('user')
        .find(u => get(u, 'userId') === this.get('model.uid'))
    }
  }),

  isAdmin: computed.readOnly('user.isAdmin'),

  isClient: computed.readOnly('user.isClient'),

  async getUsers() {
    return await this.get('store').findAll('user')
  },

  async fetchSession() {
    try {
      const session = await this.get('session').fetch()
      await this.getUsers()
      return session
    } catch(e) {
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

    await this.getUsers()

    return currentUser
  },

  async signOut() {
    await this.get('session').close()
    window.location.reload()
  }
})
