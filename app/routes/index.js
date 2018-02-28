import Route from '@ember/routing/route'
import AuthRouteMixin from 'ra/mixins/auth-route'
import RcomponentMixin from 'ra/mixins/r-component'

export default Route.extend(AuthRouteMixin, RcomponentMixin, {})
