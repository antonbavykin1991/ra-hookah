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
        .findBy('userId', get(this.get('model'), 'uid'), true)
    }
  }),

  isAdmin: computed.readOnly('user.isAdmin'),

  isClient: computed.readOnly('user.isClient')
})
