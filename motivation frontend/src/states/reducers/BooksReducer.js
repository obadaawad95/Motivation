export default (state, action) => {
  switch (action.type) {
    case "GET_BOOKS":
      return {
        ...state,
        Books: action.payload,
      };
    default:
      return state;
  }
};
