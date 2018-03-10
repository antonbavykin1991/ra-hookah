import Route from '@ember/routing/route'
import RcomponentMixin from 'ra/mixins/r-component'
import { inject as service } from '@ember/service'

export default Route.extend(RcomponentMixin, {
  visitor: service(),

  beforeModel () {
    return this.get('visitor').fetchSession()
  }
})
