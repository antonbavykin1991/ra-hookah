import Component from '@ember/component'
import { inject as service } from '@ember/service'

export default Component.extend({
  classNames: [
    'flex',
    'layout-column'
  ],

  elementId: 'main',

  visitor: service(),

  async signOut() {
    await this.get('visitor').signOut()
  }
})
