export default (state, action) => {
  switch (action.type) {
    case "GET_ARTICLES":
      return {
        ...state,
        Articles: action.payload,
      };
    default:
      return state;
  }
};
