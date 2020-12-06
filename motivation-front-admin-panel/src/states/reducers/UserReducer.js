export default (state, action) => {
  switch (action.type) {
    case "EDIT_USERINFO":
      return {
        ...state,
        Users: state.Users.map((user) =>
          user._id === action.payload.id ? action.payload : user
        ),
      };
    case "DELETE_USER":
      return {
        ...state,
        Users: state.Users.filter((user) => user._id !== action.payload),
      };

    case "GET_USER":
      return {
        ...state,
        Users: action.payload,
      };
    default:
      return state;
  }
};
