import DS from 'ember-data';

export default DS.Model.extend({
  userId: DS.attr('string'),

  createdAt: DS.attr('number'),

  price: DS.attr('number'),

  name: DS.attr('string')
});
