import Component from '@ember/component'
import { inject as service } from '@ember/service'
import { computed, get } from '@ember/object'
import { task } from 'ember-concurrency'
import { FETCH_HOOKAH_REQUESTS } from 'ra/tasks'

export default Component.extend({
  store: service(),
  session: service(),

  didInsertElement(...args) {
    this._super(...args)
    this.get('fetchHookahRequests').perform()
  },

  fetchHookahRequests: task(FETCH_HOOKAH_REQUESTS),

  uid: computed.reads('session.currentUser.uid'),

  hookahRequests: computed.reads('fetchHookahRequests.lastSuccessful.value'),

  hookahRequestsByUID: computed('hookahRequests.[]', 'uid', {
    get () {
      return (this.get('hookahRequests') || [])
        .filter((h) => get(h, 'userId') === this.get('uid'))
    }
  }),

  totalPrice: computed('hookahRequestsByUID.[]', {
    get () {
      return (this.get('hookahRequestsByUID') || [])
        .reduce((total, item) => total + get(item, 'price'), 0)
    }
  }),

  salaryTotalPrice: computed('hookahRequestsByUID.[]', {
    get () {
      const hookahRequestsLength = this.get('hookahRequestsByUID.length') || 0
      return hookahRequestsLength * 20
    }
  })
})
