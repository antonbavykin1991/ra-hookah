import config from 'ra/config/environment'

export function removeHours(date) {
  let newDate = new Date(date)

  newDate.setHours(0)
  newDate.setMinutes(0)
  newDate.setSeconds(0)
  newDate.setMilliseconds(0)

  return newDate
}

export function getStartAt() {
  const {
    APP: {
      salaryMonthStart
    }
  } = config

  let startAt = new Date()

  const startAtDate = startAt.getDate()

  if (startAtDate < salaryMonthStart) {
    startAt.setMonth(startAt.getMonth() - 1)
  }

  startAt.setMonth(startAt.getMonth() - 1)

  startAt.setDate(salaryMonthStart)

  return removeHours(startAt)
}

export function getEndAt() {
  let endAt = new Date()
  const endAtDate = endAt.getDate()

  endAt.setDate(endAtDate + 1)

  return removeHours(endAt)
}