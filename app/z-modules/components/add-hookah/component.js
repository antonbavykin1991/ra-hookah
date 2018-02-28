import Component from '@ember/component'
import { computed } from '@ember/object'
import { connect } from 'ember-redux'

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

const AddHookahComponent = Component.extend({
  totalPrice: computed('selectedHookahs.@each.price', {
    get () {
      return this.get('selectedHookahs').reduce((total, hookah) => total + hookah.price, 0)
    }
  }),

  save (selectedHookahs) {
    console.log(selectedHookahs)
    this.send('clear')
  }
})

export default connect(stateToComputed, dispatchToActions)(AddHookahComponent)
