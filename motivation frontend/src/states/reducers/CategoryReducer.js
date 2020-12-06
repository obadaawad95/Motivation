export default (state, action) => {
  switch (action.type) {
    case "GET_CAT":
      return {
        ...state,
        Cats: action.payload,
      };
    default:
      return state;
  }
};
