import Component from '@ember/component'
import { inject as service } from '@ember/service'
import { computed, get } from '@ember/object'
import { task } from 'ember-concurrency'
import { FETCH_HOOKAH_REQUESTS } from 'ra/tasks'
import {
  getStartAt,
  getEndAt
} from 'ra/utils/date'

import moment from 'moment'

export function hookahInRange (hookahRequests, start, end) {
  return hookahRequests
    .filter(h => get(h, 'createdAt') > start && get(h, 'createdAt') < end)
}

export default Component.extend({
  store: service(),

  session: service(),

  didInsertElement(...args) {
    this._super(...args)
    this.get('fetchHookahRequests').perform()
  },

  fetchHookahRequests: task(FETCH_HOOKAH_REQUESTS),

  hookahRequests: computed.reads('fetchHookahRequests.lastSuccessful.value'),

  groupedHookahRequests: computed('hookahRequests.[]', {
    get () {
      let startAt = getStartAt()
      const endAt = getEndAt()
      const groupedHookahRequests = []
      const hookahRequests = (this.get('hookahRequests') || []).toArray()

      while(startAt < endAt) {
        const date = startAt.getDate()
        const start = +startAt
        const end = startAt.setDate(date + 1)

        const hookahs = hookahInRange(hookahRequests, start, end)
        const totalPrice = hookahs
          .reduce((total, hookah) => total + get(hookah, 'price'), 0)

        groupedHookahRequests.push({
          title: moment(start).format('DD-MM-YYYY'),
          hookahs: hookahs.length,
          totalPrice
        })
      }

      return groupedHookahRequests
    }
  })

});
