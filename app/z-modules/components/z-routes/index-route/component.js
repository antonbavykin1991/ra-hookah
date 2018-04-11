import Component from '@ember/component'
import { inject as service } from '@ember/service'
import { computed } from '@ember/object'
import moment from 'moment'

export default Component.extend({
  visitor: service(),

  globalDates: service(),

  classNames: [
    'flex',
    'layout-column'
  ],

  elementId: 'main',

  startAt: computed('globalDates.startAt', {
    get () {
      return moment(this.get('globalDates.startAt')).format('YYYY-MM-DD')
    }
  }),

  endAt: computed('globalDates.endAt', {
    get () {
      return moment(this.get('globalDates.endAt')).format('YYYY-MM-DD')
    }
  }),

  selectStartAt (selectedDate) {
    this.get('globalDates').selectStartAt(moment(selectedDate).toDate())
  },

  selectEndAt (selectedDate) {
    this.get('globalDates').selectEndAt(moment(selectedDate).toDate())
  },

  async signOut() {
    await this.get('visitor').signOut()
  }
})
