import Route from '@ember/routing/route'
import { inject as service } from '@ember/service'

export default Route.extend({
  session: service(),

  visitor: service(),

  async beforeModel() {
    return await this.get('visitor').fetchSession()
  },

  actions: {
    async signOut() {
      await this.get('visitor').signOut()
    }
  }
})
