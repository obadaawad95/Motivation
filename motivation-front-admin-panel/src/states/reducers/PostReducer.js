export default (state, action) => {
  switch (action.type) {
    case "REMOVE_POST":
      return {
        ...state,
        Posts: state.Posts.filter((post) => post._id !== action.payload),
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
