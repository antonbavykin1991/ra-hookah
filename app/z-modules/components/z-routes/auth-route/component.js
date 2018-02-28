import Component from '@ember/component';
import { inject as service } from '@ember/service'

export default Component.extend({
  session: service(),

  auth (email, password) {
    this
      .get('session')
      .open('firebase', {
        provider: 'password',
        email,
        password
      })
      .then(() => this.transitionTo('index'))
  }
})
