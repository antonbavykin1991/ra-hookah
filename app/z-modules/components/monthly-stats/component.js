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

  uid: computed.reads('session.currentUser.uid'),

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

  groupedHookahRequests: computed('hookahRequestsByUID.[]', {
    get () {
      let startAt = getStartAt()
      const endAt = getEndAt()
      const groupedHookahRequests = []
      const hookahRequestsByUID = (this.get('hookahRequestsByUID') || []).toArray()

      while(startAt < endAt) {
        const date = startAt.getDate()
        const start = +startAt
        const end = startAt.setDate(date + 1)

        const hookahs = hookahInRange(hookahRequestsByUID, start, end)
        const totalPrice = hookahs
          .reduce((total, hookah) => total + get(hookah, 'price'), 0)

        groupedHookahRequests.push({
          title: moment(start).format('DD MMM'),
          hookahs: hookahs.length,
          totalPrice
        })
      }

      return groupedHookahRequests
    }
  }),

  chartData: computed('groupedHookahRequests.[]', {
    get () {
      const groupedHookahRequests = this.get('groupedHookahRequests')

      return {
        labels: groupedHookahRequests.map(g => get(g, 'title')),
        datasets: [{
          label: '# кол-во кальянов',
          data: groupedHookahRequests.map(g => get(g, 'hookahs')),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1
        }]
      }
    }
  }),

  chartOptions: computed({
    get () {
      return {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero:true
            }
          }]
        }
      }
    }
  })
});
