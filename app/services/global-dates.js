import Service from '@ember/service'
import {
  getStartAt,
  getEndAt,
  removeHours
} from 'ra/utils/date'

import moment from 'moment'

export default Service.extend({
  init () {
    this._super(...arguments)
    this.set('startAt', getStartAt())
    this.set('endAt', getEndAt())
  },

  selectStartAt (selectedDate) {
    const data = removeHours(moment(selectedDate).toDate())
    this.set('startAt', data)
  },

  selectEndAt (selectedDate) {
    const data = removeHours(moment(selectedDate).toDate())
    this.set('endAt', data)
  }
})
