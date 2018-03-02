import Component from '@ember/component'
import { inject as service } from '@ember/service'
import { computed, get} from '@ember/object'

export default Component.extend({
  store: service(),

  visitor: service(),

  users: computed({
    get () {
      return this
        .get('store')
        .peekAll('user')
        .filter(u => get(u, 'isClient'))
    }
  })
})
