const initialState = {
  data: [{
    price: 160,
    name: 'Serbetli',
    img: '/images/serbetli.png',
  },{
    price: 180,
    name: 'Fumary',
    img: '/images/fumari.jpg',
  },{
    price: 200,
    name: 'Starbuzz',
    img: '/images/star.jpg',
  },{
    price: 180,
    name: 'Daily hookah',
    img: '/images/daily.jpg',
  }]
}

export default function hookahList(state, { type }) {
  switch (type) {
    default: {
      return state || initialState
    }
  }
}