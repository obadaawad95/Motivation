export default (state, action) => {
  switch (action.type) {
    case "REMOVE_COMMENT":
      return {
        ...state,
        Comments: state.Comments.filter(
          (comment) => comment._id !== action.payload
        ),
      };
    case "GET_COMMENTS":
      return {
        ...state,
        Comments: action.payload,
      };
    default:
      return state;
  }
};
