import { inject as service } from '@ember/service'
import { computed } from '@ember/object'

const FETCH_HOOKAH_REQUESTS = {
  store: service(),

  globalDates: service(),

  startAt: computed.reads('globalDates.startAt'),

  endAt: computed.reads('globalDates.endAt'),

  *perform() {
    try {
      return yield this.get('store').query('hookah-request', {
        orderBy: 'createdAt',
        startAt: +this.get('startAt'),
        endAt: +this.get('endAt')
      })
    } catch (e) {
      console.log(e)
    }
  }
}

export default FETCH_HOOKAH_REQUESTS