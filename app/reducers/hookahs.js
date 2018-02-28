import counter from 'ra/utils/counter'

const initialState = {
  data: []
}

export default function hookahs(state, {type, name, price, tempId}) {
  switch (type) {
    case 'HOOKAH/ADD': {
      return {
        data: [
          ...state.data,
          {
            tempId: counter(),
            createdAt: new Date(),
            price,
            name
          }
        ]
      }
    }

    case 'HOOKAH/REMOVE': {
      return {
        ...state,
        data: state.data.filter(d => d.tempId !== tempId)
      }
    }

    case 'HOOKAH/CLEAR': {
      return {
        ...initialState
      }
    }

    default: {
      return state || initialState
    }
  }
}