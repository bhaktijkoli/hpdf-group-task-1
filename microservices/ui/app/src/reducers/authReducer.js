var initialState = {
  check: 0,
  user: [],
  loading: true
}
export default function reducer(state=initialState, action) {

  switch (action.type) {
    case "AUTH_USER": {
      return {...state, user: action.payload.user[0], check: action.payload.auth, loading: false}
    }
    case "LOADED": {
      return {...state, loading: false}
    }
  }

  return state
}
