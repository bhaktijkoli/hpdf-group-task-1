var initialState = {
  check: false,
  user: [],
  loading: true
}
export default function reducer(state=initialState, action) {

  switch (action.type) {
    case "AUTH_USER": {
      return {...state, user: action.payload, check: action.payload.check, loading: false}
    }
    case "LOADED": {
      return {...state, loading: false}
    }
  }

  return state
}
