const initialState = {
  posts: [],
  sidebarShow: 'responsive'
}

const postReducer = (state = initialState, action) => {
  const {type, payload} = action
  switch(type) {
    case "GET_POSTS":
      return {
        ...state, posts: payload
      }
    default:
      return {
        ...state
      }
  }
}

export default postReducer
