import {
  getStartAt,
  getEndAt
} from 'ra/utils/date'

const FETCH_HOOKAH_REQUESTS = function * () {
  try {
    return yield this.get('store').query('hookah-request', {
      orderBy: 'createdAt',
      startAt: +getStartAt(),
      endAt: +getEndAt()
    })
  } catch (e) {
    console.log(e)
  }
}

export default FETCH_HOOKAH_REQUESTS