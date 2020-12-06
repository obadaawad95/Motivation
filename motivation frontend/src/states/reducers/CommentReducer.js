export default (state, action) => {
  switch (action.type) {
    case "REMOVE_COMMENT":
      return {
        ...state,
        Comments: state.Comments.filter(
          (comment) => comment._id !== action.payload
        ),
      };
    case "ADD_COMMENT":
      return {
        ...state,
        Comments: [...state.Comments, action.payload],
      };
    case "EDIT_COMMENT":
      return {
        ...state,
        Comments: state.Comments.map((comment) =>
          comment._id === action.payload.id ? action.payload : comment
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
