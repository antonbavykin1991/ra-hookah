const initialState = {
  data: [{
    price: 160,
    name: 'Serbetli',
  },{
    price: 180,
    name: 'Fumary',
  },{
    price: 180,
    name: 'Starbuzz',
  },{
    price: 180,
    name: 'Daily hookah',
  }]
}

export default function hookahList(state, { type }) {
  switch (type) {
    default: {
      return state || initialState
    }
  }
}