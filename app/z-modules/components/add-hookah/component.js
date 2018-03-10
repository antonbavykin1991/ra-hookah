import { connect } from 'ember-redux'
import { task } from 'ember-concurrency'

import Component from '@ember/component'
import { computed } from '@ember/object'
import { inject as service } from '@ember/service'
import $ from 'jquery'

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
      userId: this.get('visitor.uid')
    }).save()
  }

  yield this.send('clear')
  this.set('showAnimatedDialog', false)

  const hookah = selectedHookahs[0]

  this.set('showToast', true)

  yield $.post('/notify', {
    username: this.get('visitor.user.name'),
    message: `${hookah.name} - ${hookah.price}грн`
  })
}

const AddHookahComponent = Component.extend({
  store: service(),

  visitor: service(),

  totalPrice: computed('selectedHookahs.@each.price', {
    get () {
      return this.get('selectedHookahs').reduce((total, hookah) => total + hookah.price, 0)
    }
  }),

  save: task(SAVE_FN),

  selectHookah (hookah) {
    this.send('clear')
    this.send('add', hookah)
    this.set('showAnimatedDialog', true)
  }
})

export default connect(stateToComputed, dispatchToActions)(AddHookahComponent)
