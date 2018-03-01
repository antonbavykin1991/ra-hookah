import { connect } from 'ember-redux'
import { task } from 'ember-concurrency'

import Component from '@ember/component'
import { computed } from '@ember/object'
import { inject as service } from '@ember/service'

const stateToComputed = state => {
  return {
    selectedHookahs: state.hookahs.data,
    hookahList: state.hookahList.data,
  }
}

const dispatchToActions = dispatch => {
  return {
    add: ({price, name}) => dispatch({ type: 'HOOKAH/ADD', price, name }),
    remove: (tempId) => dispatch({ type: 'HOOKAH/REMOVE', tempId }),
    clear: () => dispatch({ type: 'HOOKAH/CLEAR' })
  }
}

const SAVE_FN = function * () {
  const selectedHookahs = this.get('selectedHookahs').toArray()

  for (let i=0; i < selectedHookahs.length; i++) {
    yield this.get('store').createRecord('hookah-request', {
      ...selectedHookahs[i],
      userId: this.get('session.currentUser.uid')
    }).save()
  }

  yield this.send('clear')
}

const AddHookahComponent = Component.extend({
  store: service(),

  session: service(),

  totalPrice: computed('selectedHookahs.@each.price', {
    get () {
      return this.get('selectedHookahs').reduce((total, hookah) => total + hookah.price, 0)
    }
  }),

  save: task(SAVE_FN)
})

export default connect(stateToComputed, dispatchToActions)(AddHookahComponent)
