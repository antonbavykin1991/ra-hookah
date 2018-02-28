import Route from '@ember/routing/route'
import { inject as service } from '@ember/service'

export default Route.extend({
  session: service(),

  beforeModel() {
    return this.get('session')
      .fetch()
      .catch(function() {})
  },

  actions: {
    signIn(provider) {
      this.get('session')
        .open('firebase', { provider: provider})
        .then(function(data) {
          console.log(data.currentUser);
        })
    },

    signOut() {
      this.get('session').close()
    }
  }
});
