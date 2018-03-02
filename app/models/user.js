import DS from 'ember-data';
import { computed } from '@ember/object'

export default DS.Model.extend({
  userId: DS.attr('string'),

  role: DS.attr('string'),

  name: DS.attr('string'),

  avatar: DS.attr('string'),

  isAdmin: computed.equal('role', 'admin'),

  isClient: computed.equal('role', 'client')
});
