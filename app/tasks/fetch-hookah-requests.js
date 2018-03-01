import {
  getStartAt,
  getEndAt
} from 'ra/utils/date'

const FETCH_HOOKAH_REQUESTS = function * () {
  return yield this.get('store').query('hookah-request', {
    orderBy: 'createdAt',
    startAt: +getStartAt(),
    endAt: +getEndAt()
  })
}

export default FETCH_HOOKAH_REQUESTS