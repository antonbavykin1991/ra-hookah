import Ember from 'ember'
import Component from '@ember/component';
import { inject as service } from '@ember/service'

export default Component.extend({
  visitor: service(),

  async auth (...args) {
    try {
      await this.get('visitor').auth(...args)
      await this.transitionTo('index')
    } catch (e) {
      Ember.Logger.log(e)
    }
  }
})
