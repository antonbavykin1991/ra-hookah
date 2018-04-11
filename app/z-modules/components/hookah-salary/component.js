import Component from '@ember/component'
import { inject as service } from '@ember/service'
import { computed, get, observer} from '@ember/object'
import { task } from 'ember-concurrency'
import { FETCH_HOOKAH_REQUESTS } from 'ra/tasks'

export default Component.extend({
  store: service(),
  visitor: service(),
  globalDates: service(),

  didInsertElement(...args) {
    this._super(...args)
    this.get('fetchHookahRequests').perform()
  },

  fetchHookahRequests: task(FETCH_HOOKAH_REQUESTS),

  onChangeStartAt: observer('globalDates.endAt', 'globalDates.startAt', function () {
    this.get('fetchHookahRequests').perform()
  }),

  uid: computed.reads('visitor.uid'),

  hookahRequests: computed.reads('fetchHookahRequests.lastSuccessful.value'),

  hookahRequestsByUID: computed('hookahRequests.[]', 'uid', {
    get () {
      const uid = this.get('uid')

      if (uid) {
        return (this.get('hookahRequests') || [])
          .filter((h) => get(h, 'userId') === uid)
      } else {
        return (this.get('hookahRequests') || [])
      }
    }
  }),

  totalPrice: computed('hookahRequestsByUID.[]', {
    get () {
      return (this.get('hookahRequestsByUID') || [])
        .reduce((total, item) => total + get(item, 'price'), 0)
    }
  }),

  raTotalPrice: computed('hookahRequestsByUID.[]', {
    get () {
      const hookahRequestsLength = this.get('hookahRequestsByUID.length') || 0
      return hookahRequestsLength * 50
    }
  }),

  ownerTotalPrice: computed('totalPrice', 'salaryTotalPrice', 'raTotalPrice', {
    get () {
      const {
        totalPrice = 0,
        salaryTotalPrice = 0,
        raTotalPrice = 0
      } = this.getProperties('totalPrice', 'salaryTotalPrice', 'raTotalPrice')

      return totalPrice - (salaryTotalPrice + raTotalPrice)
    }
  }),

  salaryTotalPrice: computed('hookahRequestsByUID.[]', {
    get () {
      const hookahRequestsLength = this.get('hookahRequestsByUID.length') || 0
      return hookahRequestsLength * 20
    }
  })
})
