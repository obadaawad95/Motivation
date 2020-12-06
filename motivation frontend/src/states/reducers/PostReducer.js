export default (state, action) => {
  switch (action.type) {
    case "REMOVE_POST":
      return {
        ...state,
        Posts: state.Posts.filter((post) => post._id !== action.payload),
      };
    case "ADD_POST":
      return {
        ...state,
        Posts: [...state.Posts, action.payload],
      };
    case "EDIT_POST":
      return {
        ...state,
        Posts: state.Posts.map((post) =>
          post._id === action.payload.id ? action.payload : post
        ),
      };
    case "GET_POSTS":
      return {
        ...state,
        Posts: action.payload,
      };
    default:
      return state;
  }
};
