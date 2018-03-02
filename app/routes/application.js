import Route from '@ember/routing/route'
import { inject as service } from '@ember/service'

export default Route.extend({
  session: service(),

  store: service(),

  async beforeModel() {
    try {
      const session = await this.get('session').fetch()
      await this.getPermissions()
      return session
    } catch(e) {
      return e
    }
  },

  async getPermissions () {
    return await this.get('store').findAll('user')
  },

  actions: {
    async signIn(provider) {
      await this.get('session').open('firebase', { provider: provider})
      await this.getPermissions()
    },

    async signOut() {
      await this.get('session').close()
      window.location.reload()
    }
  }
})
